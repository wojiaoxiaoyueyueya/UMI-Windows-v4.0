// UmiGripper.cpp - UMI 手动夹爪 V4.0 驱动（Windows 版）
// 基于 Win32 串口 API（CreateFile/DCB/ReadFile/WriteFile）

#include "UmiGripper.hpp"

#include <windows.h>
#include <setupapi.h>

// 某些 MinGW 头文件未定义该 GUID，这里补充声明用于 SetupAPI 枚举串口设备。
#ifndef GUID_DEVINTERFACE_COMPORT
static const GUID GUID_DEVINTERFACE_COMPORT = \
    {0x86E0D1E0, 0x8089, 0x11D0, {0x9C, 0xE4, 0x08, 0x00, 0x3E, 0x30, 0x1F, 0x73}};
#endif
#include <cstring>
#include <chrono>
#include <cstdio>
#include <string>
#include <set>
#include <algorithm>
#include <cmath>
#include <vector>

namespace {
constexpr int kLegacyBaudRate = 115200;
constexpr size_t kLegacyFrameSize = 8;
constexpr uint8_t kLegacyPacketHead = 0x0A;
constexpr uint8_t kLegacyTailLeft = 0x0A;
constexpr uint8_t kLegacyTailRight = 0x0C;
constexpr uint8_t kLegacyLedTail = 0x0B;
constexpr int kV4BaudRate = 460800;
constexpr int kV4WirelessBaudRate = 230400;
constexpr uint8_t kV4Header0 = 0xAA;
constexpr uint8_t kV4Header1 = 0x55;
constexpr uint8_t kV4Tail = 0x0D;
constexpr uint8_t kV4CommandStartReport = 0x01;
constexpr uint8_t kV4CommandStopReport = 0x02;
constexpr uint8_t kV4CommandSingleReport = 0x03;
constexpr uint8_t kV4CommandSetLed = 0x10;
constexpr uint8_t kV4CommandForceSetting = 0x12;
constexpr uint8_t kV4CommandReadParams = 0x13;
constexpr size_t kV4MinFrameSize = 7;
constexpr size_t kV4MaxFrameSize = 128;
constexpr float kV4PositionDeadband = 0.0100f;
constexpr float kV4PositionSmoothAlpha = 0.12f;
constexpr float kV4RawSmoothAlpha = 0.06f;

constexpr int kMaxFailCount = 10;

constexpr uint16_t kVidLeft  = 0x0E01;
constexpr uint16_t kVidRight = 0x0E02;
constexpr uint16_t kPidGripper = 0xA001;

bool isLikelyManualDataVid(uint16_t vid) {
    return vid == 0x1A86 || vid == 0x10C4 || vid == 0x0403 || vid == 0x067B;
}

bool isValidLegacyTail(uint8_t value) {
    return value == kLegacyTailLeft || value == kLegacyTailRight;
}

bool isPlausibleLegacyFrame(const uint8_t* frame) {
    if (!frame) return false;
    if (frame[0] != kLegacyPacketHead || !isValidLegacyTail(frame[kLegacyFrameSize - 1])) return false;

    float position = 0.0f;
    memcpy(&position, frame + 1, sizeof(position));
    if (!std::isfinite(position)) return false;
    if (position < -1000.0f || position > 1000.0f) return false;
    if (frame[5] > 0x0F || frame[6] > 0x0F) return false;
    return true;
}

bool findLegacyFrameInBuffer(const uint8_t* data, DWORD len, uint8_t outFrame[kLegacyFrameSize]) {
    if (!data || !outFrame || len < kLegacyFrameSize) return false;
    for (DWORD i = 0; i + kLegacyFrameSize <= len; ++i) {
        if (isPlausibleLegacyFrame(data + i)) {
            memcpy(outFrame, data + i, kLegacyFrameSize);
            return true;
        }
    }
    return false;
}

uint16_t crc16Modbus(const uint8_t* data, size_t len) {
    uint16_t crc = 0xFFFF;
    for (size_t i = 0; i < len; ++i) {
        crc ^= data[i];
        for (int bit = 0; bit < 8; ++bit) {
            if (crc & 0x0001) {
                crc = (crc >> 1) ^ 0xA001;
            } else {
                crc >>= 1;
            }
        }
    }
    return crc;
}

uint32_t readU32BE(const uint8_t* data) {
    return ((uint32_t)data[0] << 24) |
           ((uint32_t)data[1] << 16) |
           ((uint32_t)data[2] << 8) |
           (uint32_t)data[3];
}

uint32_t readU32LE(const uint8_t* data) {
    return ((uint32_t)data[3] << 24) |
           ((uint32_t)data[2] << 16) |
           ((uint32_t)data[1] << 8) |
           (uint32_t)data[0];
}

float readFloat32LE(const uint8_t* data) {
    uint32_t raw = readU32LE(data);
    float value = 0.0f;
    memcpy(&value, &raw, sizeof(value));
    return value;
}

uint16_t readU16BE(const uint8_t* data) {
    return ((uint16_t)data[0] << 8) | (uint16_t)data[1];
}

int16_t readI16BE(const uint8_t* data) {
    return (int16_t)readU16BE(data);
}

bool isValidV4Frame(const uint8_t* frame, size_t frameLen) {
    if (!frame || frameLen < kV4MinFrameSize) return false;
    if (frame[0] != kV4Header0 || frame[1] != kV4Header1 || frame[frameLen - 1] != kV4Tail) return false;

    const uint8_t payloadLen = frame[3];
    const size_t expectedLen = kV4MinFrameSize + payloadLen;
    if (expectedLen != frameLen) return false;

    const uint16_t expectedCrc = crc16Modbus(frame + 2, 2 + payloadLen);
    const uint16_t frameCrc = ((uint16_t)frame[4 + payloadLen] << 8) | frame[5 + payloadLen];
    if (expectedCrc != frameCrc) {
        static int crcFailCount = 0;
        if (++crcFailCount <= 5) {
            fprintf(stderr, "[UMI夹爪] V4 CRC校验失败#%d: expected=0x%04X got=0x%04X frameLen=%zu cmd=0x%02X payloadLen=%d\n",
                    crcFailCount, expectedCrc, frameCrc, frameLen, frame[2], (int)payloadLen);
        }
        return false;
    }
    return true;
}

bool findV4FrameInBuffer(const uint8_t* data, DWORD len, std::vector<uint8_t>& outFrame) {
    outFrame.clear();
    if (!data || len < kV4MinFrameSize) return false;

    for (DWORD i = 0; i + kV4MinFrameSize <= len; ++i) {
        if (data[i] != kV4Header0 || data[i + 1] != kV4Header1) continue;

        uint8_t payloadLen = data[i + 3];
        size_t frameLen = kV4MinFrameSize + payloadLen;
        if (frameLen > kV4MaxFrameSize || i + frameLen > len) continue;
        if (!isValidV4Frame(data + i, frameLen)) continue;
        const uint8_t command = data[i + 2];
        const bool isRealtimeFrame = (command == kV4CommandStartReport || command == kV4CommandSingleReport) && payloadLen >= 7;
        const bool isParamFrame = command == kV4CommandReadParams && payloadLen >= 6;
        const bool isAckFrame = command == kV4CommandSetLed || command == kV4CommandForceSetting || command == kV4CommandStopReport;
        if (!isRealtimeFrame && !isParamFrame && !isAckFrame) continue;

        outFrame.assign(data + i, data + i + frameLen);
        return true;
    }
    return false;
}

bool popV4FrameFromBuffer(std::vector<uint8_t>& buffer, std::vector<uint8_t>& outFrame) {
    outFrame.clear();
    if (buffer.size() < kV4MinFrameSize) return false;

    for (size_t i = 0; i + kV4MinFrameSize <= buffer.size(); ++i) {
        if (buffer[i] != kV4Header0 || buffer[i + 1] != kV4Header1) continue;

        uint8_t payloadLen = buffer[i + 3];
        size_t frameLen = kV4MinFrameSize + payloadLen;
        if (frameLen > kV4MaxFrameSize) {
            buffer.erase(buffer.begin(), buffer.begin() + i + 1);
            return false;
        }
        if (i + frameLen > buffer.size()) {
            if (i > 0) buffer.erase(buffer.begin(), buffer.begin() + i);
            return false;
        }
        if (!isValidV4Frame(buffer.data() + i, frameLen)) {
            buffer.erase(buffer.begin(), buffer.begin() + i + 1);
            return false;
        }

        const uint8_t command = buffer[i + 2];
        const bool isRealtimeFrame = (command == kV4CommandStartReport || command == kV4CommandSingleReport) && payloadLen >= 7;
        const bool isParamFrame = command == kV4CommandReadParams && payloadLen >= 6;
        const bool isAckFrame = command == kV4CommandSetLed || command == kV4CommandForceSetting || command == kV4CommandStopReport;
        if (!isRealtimeFrame && !isParamFrame && !isAckFrame) {
            buffer.erase(buffer.begin(), buffer.begin() + i + frameLen);
            return false;
        }

        outFrame.assign(buffer.begin() + i, buffer.begin() + i + frameLen);
        buffer.erase(buffer.begin(), buffer.begin() + i + frameLen);
        return true;
    }

    if (buffer.size() > kV4MinFrameSize) {
        buffer.erase(buffer.begin(), buffer.end() - (kV4MinFrameSize - 1));
    }
    return false;
}

std::string extractComPortFromFriendlyName(const std::string& friendly) {
    auto comPos = friendly.find("(COM");
    if (comPos == std::string::npos) return "";

    auto endPos = friendly.find(')', comPos);
    if (endPos == std::string::npos) return "";

    return friendly.substr(comPos + 1, endPos - comPos - 1);
}

void parseVidPidFromHardwareId(const std::string& hwIdStr, uint16_t& vid, uint16_t& pid) {
    auto vidPos = hwIdStr.find("VID_");
    auto pidPos = hwIdStr.find("PID_");
    if (vidPos != std::string::npos) {
        unsigned int v = 0;
        sscanf(hwIdStr.c_str() + vidPos + 4, "%x", &v);
        vid = (uint16_t)v;
    }
    if (pidPos != std::string::npos) {
        unsigned int p = 0;
        sscanf(hwIdStr.c_str() + pidPos + 4, "%x", &p);
        pid = (uint16_t)p;
    }
}

void addComPortInfo(std::vector<ComPortVidInfo>& result,
                    std::set<std::string>& seenPorts,
                    const std::string& portName,
                    uint16_t vid,
                    uint16_t pid,
                    const char* source) {
    if (portName.empty() || seenPorts.count(portName) > 0) return;

    ComPortVidInfo info;
    info.portName = portName;
    info.vid = vid;
    info.pid = pid;
    result.push_back(info);
    seenPorts.insert(portName);

    (void)source;
}
} // namespace

// ---- 通过 SetupAPI 按 USB VID 检测左右手 ----

std::vector<ComPortVidInfo> UmiGripper::enumerateComPortsWithVid() {
    std::vector<ComPortVidInfo> result;
    std::set<std::string> seenPorts;

    HDEVINFO hDevInfo = SetupDiGetClassDevs(&GUID_DEVINTERFACE_COMPORT, NULL, NULL,
        DIGCF_PRESENT | DIGCF_DEVICEINTERFACE);
    if (hDevInfo != INVALID_HANDLE_VALUE) {
        SP_DEVICE_INTERFACE_DATA ifcData = {};
        ifcData.cbSize = sizeof(ifcData);

        for (DWORD i = 0; SetupDiEnumDeviceInterfaces(hDevInfo, NULL, &GUID_DEVINTERFACE_COMPORT, i, &ifcData); i++) {
            // 第一次调用只获取缓冲区大小，随后再读取属性内容。
            DWORD reqSize = 0;
            SetupDiGetDeviceInterfaceDetailA(hDevInfo, &ifcData, NULL, 0, &reqSize, NULL);

            SP_DEVINFO_DATA devData = {};
            devData.cbSize = sizeof(devData);

            std::vector<uint8_t> buf(std::max(reqSize, (DWORD)sizeof(SP_DEVICE_INTERFACE_DETAIL_DATA_A)));
            auto* detail = reinterpret_cast<SP_DEVICE_INTERFACE_DETAIL_DATA_A*>(buf.data());
            detail->cbSize = sizeof(SP_DEVICE_INTERFACE_DETAIL_DATA_A);

            if (!SetupDiGetDeviceInterfaceDetailA(hDevInfo, &ifcData, detail, (DWORD)buf.size(), NULL, &devData))
                continue;

            CHAR hwId[512] = {};
            if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo, &devData, SPDRP_HARDWAREID,
                NULL, (PBYTE)hwId, sizeof(hwId), NULL))
                continue;

            uint16_t vid = 0, pid = 0;
            parseVidPidFromHardwareId(std::string(hwId), vid, pid);

            CHAR friendly[256] = {};
            if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo, &devData, SPDRP_FRIENDLYNAME,
                NULL, (PBYTE)friendly, sizeof(friendly), NULL))
                continue;

            addComPortInfo(result, seenPorts, extractComPortFromFriendlyName(std::string(friendly)),
                           vid, pid, "interface");
        }

        SetupDiDestroyDeviceInfoList(hDevInfo);
    }

    // 部分 ESP32-S3 USB Serial/JTAG 或 CH340 设备不会出现在 GUID_DEVINTERFACE_COMPORT
    // 枚举结果中，但设备管理器的“端口(COM和LPT)”里能看到。这里再按 Ports
    // 设备类做一次备用枚举，保证 ESP32-CAN 串口桥也能被扫描到。
    HDEVINFO hPortInfo = SetupDiGetClassDevsA(NULL, "Ports", NULL, DIGCF_PRESENT | DIGCF_ALLCLASSES);
    if (hPortInfo != INVALID_HANDLE_VALUE) {
        for (DWORD i = 0;; ++i) {
            SP_DEVINFO_DATA devData = {};
            devData.cbSize = sizeof(devData);
            if (!SetupDiEnumDeviceInfo(hPortInfo, i, &devData)) break;

            CHAR friendly[256] = {};
            if (!SetupDiGetDeviceRegistryPropertyA(hPortInfo, &devData, SPDRP_FRIENDLYNAME,
                NULL, (PBYTE)friendly, sizeof(friendly), NULL))
                continue;

            std::string portName = extractComPortFromFriendlyName(std::string(friendly));
            if (portName.empty()) continue;

            CHAR hwId[512] = {};
            uint16_t vid = 0, pid = 0;
            if (SetupDiGetDeviceRegistryPropertyA(hPortInfo, &devData, SPDRP_HARDWAREID,
                NULL, (PBYTE)hwId, sizeof(hwId), NULL)) {
                parseVidPidFromHardwareId(std::string(hwId), vid, pid);
            }

            addComPortInfo(result, seenPorts, portName, vid, pid, "ports-class");
        }

        SetupDiDestroyDeviceInfoList(hPortInfo);
    }

    return result;
}

uint16_t UmiGripper::queryVidForPort(const std::string& portName) {
    auto ports = enumerateComPortsWithVid();
    for (auto& p : ports) {
        if (p.portName == portName) return p.vid;
    }
    return 0;
}

// ---- 构造与析构 ----

UmiGripper::UmiGripper()
    : hSerial_(INVALID_HANDLE_VALUE), connected_(false), running_(false),
      lastLedR_(0), lastLedG_(0), lastLedB_(0) {
    memset(&state_, 0, sizeof(state_));
}

UmiGripper::~UmiGripper() { close(); }

bool UmiGripper::sendV4Frame(uint8_t command, const uint8_t* payload, size_t payloadLen) {
    if (payloadLen > 255) return false;

    std::vector<uint8_t> frame;
    frame.reserve(kV4MinFrameSize + payloadLen);
    frame.push_back(kV4Header0);
    frame.push_back(kV4Header1);
    frame.push_back(command);
    frame.push_back((uint8_t)payloadLen);
    for (size_t i = 0; i < payloadLen; ++i) frame.push_back(payload[i]);

    const uint16_t crc = crc16Modbus(frame.data() + 2, 2 + payloadLen);
    frame.push_back((uint8_t)((crc >> 8) & 0xFF));
    frame.push_back((uint8_t)(crc & 0xFF));
    frame.push_back(kV4Tail);

    return sendCommand(frame.data(), frame.size());
}

bool UmiGripper::parseV4Frame(const uint8_t* frame, size_t frameLen) {
    if (!isValidV4Frame(frame, frameLen)) return false;

    const uint8_t command = frame[2];
    const uint8_t payloadLen = frame[3];
    const uint8_t* payload = frame + 4;
    if (command == kV4CommandReadParams) {
        std::lock_guard<std::mutex> lock(stateMutex_);
        state_.connected = true;
        state_.hasData = true;
        state_.hasExtendedData = true;
        state_.protocolVersion = 4;
        state_.lastV4Command = command;
        state_.payloadLength = payloadLen;
        state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
        if (payloadLen >= 6) {
            state_.hasDeviceParams = true;
            state_.txAddress = readU16BE(payload + 0);
            state_.txFrequency = payload[2];
            state_.rxAddress = readU16BE(payload + 3);
            state_.rxFrequency = payload[5];
        }
        fprintf(stderr,
                "[UMI夹爪 %s] V4读参响应 tx=0x%04X/%u rx=0x%04X/%u\n",
                portName_.c_str(), state_.txAddress, state_.txFrequency,
                state_.rxAddress, state_.rxFrequency);
        return true;
    }

    if (command == kV4CommandSetLed || command == kV4CommandForceSetting || command == kV4CommandStopReport) {
        std::lock_guard<std::mutex> lock(stateMutex_);
        state_.connected = true;
        state_.hasData = true;
        state_.hasExtendedData = true;
        state_.protocolVersion = 4;
        state_.lastV4Command = command;
        state_.payloadLength = payloadLen;
        state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
        return true;
    }

    if (command != kV4CommandStartReport && command != kV4CommandSingleReport) return false;
    if (payloadLen < 7) return false;

    // V4.0 帧格式自适应：根据 payloadLen 判断是否含 deviceId 字节
    // payloadLen == 18 → 无 deviceId（老固件）：[btn2][enc4][imu12]
    // payloadLen >= 19 → 含 deviceId（新固件）：[devId][btn2][enc4][imu/force...]
    const bool hasDeviceId = (payloadLen >= 19);
    const int btnOffset = hasDeviceId ? 1 : 0;
    const int encOffset = hasDeviceId ? 3 : 2;
    const int imuOffset = hasDeviceId ? 7 : 6;
    const bool isSingleReport = (command == kV4CommandSingleReport);

    // V4 帧原始数据 dump（仅前 3 帧），用于验证 payload 布局
    {
        static int frameDumpCount = 0;
        if (frameDumpCount < 3) {
            fprintf(stderr, "[UMI夹爪 %s] V4帧原始数据#%d cmd=0x%02X len=%d deviceId=%s:",
                    portName_.c_str(), frameDumpCount + 1, command, payloadLen,
                    hasDeviceId ? "yes" : "no");
            for (size_t j = 0; j < frameLen && j < 40; ++j)
                fprintf(stderr, " %02X", frame[j]);
            fprintf(stderr, "\n");
            frameDumpCount++;
        }
    }

    const uint8_t deviceId = hasDeviceId ? payload[0] : 0;
    const uint8_t button1 = payload[btnOffset];
    const uint8_t button2 = payload[btnOffset + 1];

    // V4.0 按键原始字节诊断日志，用于排查新硬件按键值变体
    static uint8_t lastLoggedBtn1 = 0xFF, lastLoggedBtn2 = 0xFF;
    if (button1 != lastLoggedBtn1 || button2 != lastLoggedBtn2) {
        fprintf(stderr, "[UMI夹爪 %s] V4按键原始值: btn1=0x%02X(%d) btn2=0x%02X(%d) payloadLen=%d cmd=0x%02X\n",
                portName_.c_str(), button1, button1, button2, button2, payloadLen, command);
        lastLoggedBtn1 = button1;
        lastLoggedBtn2 = button2;
    }

    const uint32_t encoder = readU32LE(payload + encOffset);
    const float encoderPosition = readFloat32LE(payload + encOffset);
    bool validEncoderPosition = std::isfinite(encoderPosition)
        && encoderPosition >= -0.05f
        && encoderPosition <= 1.05f;

    uint32_t displayPositionRaw = 0;
    float position = 0.0f;

    int16_t accel[3] = {0, 0, 0};
    int16_t gyro[3] = {0, 0, 0};
    int16_t forceValues[12] = {};
    uint8_t forceCount = 0;
    int forceMaxAbs = 0;

    if (isSingleReport) {
        // 0x03 单次上报：力传感(24B) + LED(4B)，从 imuOffset 开始
        const size_t forceEnd = imuOffset + 24;
        if ((size_t)payloadLen >= forceEnd) {
            for (size_t i = imuOffset; i + 1 < forceEnd && i + 1 < (size_t)payloadLen; i += 2) {
                int16_t rawForce = readI16BE(payload + i);
                if (forceCount < 12) forceValues[forceCount++] = rawForce;
                int v = std::abs((int)rawForce);
                if (v > forceMaxAbs) forceMaxAbs = v;
            }
        }
    } else {
        // 0x01 连续上报：IMU 数据(gyro6B+accel6B=12B)，从 imuOffset 开始
        if ((size_t)payloadLen >= imuOffset + 12) {
            for (int i = 0; i < 3; ++i) gyro[i] = readI16BE(payload + imuOffset + i * 2);
            for (int i = 0; i < 3; ++i) accel[i] = readI16BE(payload + imuOffset + 6 + i * 2);
        }
    }

    std::lock_guard<std::mutex> lock(stateMutex_);
    if (validEncoderPosition) {
        float samplePosition = std::max(0.0f, std::min(1.0f, encoderPosition));
        if (!hasSmoothedRawPosition_) {
            smoothedRawPosition_ = samplePosition;
            hasSmoothedRawPosition_ = true;
        } else {
            float rawDelta = samplePosition - smoothedRawPosition_;
            if (std::fabs(rawDelta) > kV4PositionDeadband) {
                smoothedRawPosition_ += rawDelta * kV4RawSmoothAlpha;
            }
        }
    }
    displayPositionRaw = hasSmoothedRawPosition_
        ? (uint32_t)std::max(0.0f, std::round(smoothedRawPosition_ * 10000.0f))
        : 0;

    if (validEncoderPosition || hasSmoothedRawPosition_) {
        position = displayPositionRaw / 10000.0f;
        position = std::max(0.0f, std::min(1.0f, position));

        if (!hasSmoothedPosition_) {
            smoothedPosition_ = position;
            hasSmoothedPosition_ = true;
        } else if (std::fabs(position - smoothedPosition_) > kV4PositionDeadband) {
            smoothedPosition_ += (position - smoothedPosition_) * kV4PositionSmoothAlpha;
        }
    }

    state_.position = smoothedPosition_;
    // V4.0 协议按键归一化：0x00=松开，非零=按下 → 标准化为 0/1
    // 向后兼容旧固件可能使用的不同键值约定（bit-mapped、active-low 等）
    state_.button1 = (button1 != 0) ? 1 : 0;
    state_.button2 = (button2 != 0) ? 1 : 0;
    state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();
    state_.hasData = true;
    state_.connected = true;
    state_.hasExtendedData = true;
    state_.protocolVersion = 4;
    state_.lastV4Command = command;
    state_.payloadLength = payloadLen;
    state_.deviceId = deviceId;
    state_.encoderRaw = encoder;
    state_.positionRaw = displayPositionRaw;
    state_.positionFallback = !validEncoderPosition;
    if (command == kV4CommandSingleReport && payloadLen >= 23) {
        state_.ledR = payload[payloadLen - 4];
        state_.ledG = payload[payloadLen - 3];
        state_.ledB = payload[payloadLen - 2];
        state_.ledBrightness = payload[payloadLen - 1];
    }
    for (int i = 0; i < 3; ++i) {
        state_.accel[i] = accel[i];
        state_.gyro[i] = gyro[i];
    }
    state_.forceCount = forceCount;
    state_.forceMaxAbs = forceMaxAbs;
    for (int i = 0; i < 12; ++i) state_.force[i] = forceValues[i];

    // V4.0 有线模式设备标识通常为 0x00，左右手主要靠 USB VID。
    // 如果是无线模式，设备标识 0x01/0x02 可作为左右手补充信息。
    if (!vidConfirmed_) {
        if (deviceId == 0x01) {
            handSide_ = "left";
            vidConfirmed_ = true;
            fprintf(stderr, "[UMI夹爪 %s] V4 设备标识=0x01 -> 左手\n", portName_.c_str());
        } else if (deviceId == 0x02) {
            handSide_ = "right";
            vidConfirmed_ = true;
            fprintf(stderr, "[UMI夹爪 %s] V4 设备标识=0x02 -> 右手\n", portName_.c_str());
        } else {
            handSide_ = "unknown";
        }
    }
    return true;
}

bool UmiGripper::tryStartV4WithFallbackBauds() {
    // V4.0 协议的有线 CDC 固定使用 460800，无线射频桥接使用 230400。
    // 115200 用作 Windows CDC 驱动没有成功切换波特率时的兜底参数。
    for (int baud : {kV4BaudRate, kV4WirelessBaudRate, 115200}) {
        if (!configurePort(baud)) continue;

        // 握手阶段不先发送停止上报，避免打断已经开始连续上报的 V4.0 设备。
        PurgeComm(hSerial_, PURGE_TXCLEAR | PURGE_TXABORT);
        ClearCommError(hSerial_, NULL, NULL);
        if (!sendV4Frame(kV4CommandStartReport, nullptr, 0)) continue;

        COMMTIMEOUTS timeouts;
        timeouts.ReadIntervalTimeout = 5;
        timeouts.ReadTotalTimeoutMultiplier = 0;
        timeouts.ReadTotalTimeoutConstant = 35;
        SetCommTimeouts(hSerial_, &timeouts);

        uint8_t rawBuf[512] = {};
        DWORD totalRead = 0;
        for (int attempt = 0; attempt < 5 && totalRead < sizeof(rawBuf); ++attempt) {
            DWORD n = 0;
            ReadFile(hSerial_, rawBuf + totalRead, (DWORD)(sizeof(rawBuf) - totalRead), &n, NULL);
            totalRead += n;

            std::vector<uint8_t> frame;
            if (findV4FrameInBuffer(rawBuf, totalRead, frame) && parseV4Frame(frame.data(), frame.size())) {
                protocol_ = ProtocolVersion::V4;
                setLed(10, 10, 10, 64);
                // 部分固件处理 LED 指令后会暂停连续上报，再次启动数据流以保持稳定连接。
                sendV4Frame(kV4CommandStartReport, nullptr, 0);
                fprintf(stderr, "[UMI夹爪] V4.0 协议握手成功: %s, baud=%d, side=%s\n",
                        portName_.c_str(), baud, handSide_.c_str());
                return true;
            }
        }

        // 连续上报没有返回有效帧时，用单次上报再验证一次，兼容只响应单次查询的固件状态。
        totalRead = 0;
        memset(rawBuf, 0, sizeof(rawBuf));
        if (sendV4Frame(kV4CommandSingleReport, nullptr, 0)) {
            for (int attempt = 0; attempt < 3 && totalRead < sizeof(rawBuf); ++attempt) {
                DWORD n = 0;
                ReadFile(hSerial_, rawBuf + totalRead, (DWORD)(sizeof(rawBuf) - totalRead), &n, NULL);
                totalRead += n;

                std::vector<uint8_t> frame;
                if (findV4FrameInBuffer(rawBuf, totalRead, frame) && parseV4Frame(frame.data(), frame.size())) {
                    protocol_ = ProtocolVersion::V4;
                    setLed(10, 10, 10, 64);
                    sendV4Frame(kV4CommandStartReport, nullptr, 0);
                    fprintf(stderr, "[UMI澶圭埅] V4.0 鍗忚鎻℃墜鎴愬姛: %s, baud=%d, side=%s\n",
                            portName_.c_str(), baud, handSide_.c_str());
                    return true;
                }
            }
        }

        if (totalRead > 0) {
            DWORD dumpLen = std::min<DWORD>(totalRead, 32);
            fprintf(stderr, "[UMI澶圭埅] %s baud=%d 鎻℃墜鏈В鏋愬埌 V4 甯э紝鍘熷鍓?%lu 瀛楄妭:",
                    portName_.c_str(), baud, (unsigned long)dumpLen);
            for (DWORD i = 0; i < dumpLen; ++i) {
                fprintf(stderr, " %02X", rawBuf[i]);
            }
            fprintf(stderr, "\n");
        }
    }

    return false;
}

// ---- 打开与关闭串口 ----

bool UmiGripper::tryStartLegacyProtocol() {
    uint16_t vid = queryVidForPort(portName_);
    if (vid != kVidLeft && vid != kVidRight && !isLikelyManualDataVid(vid)) return false;
    if (!configurePort(kLegacyBaudRate)) return false;

    PurgeComm(hSerial_, PURGE_RXCLEAR | PURGE_TXCLEAR | PURGE_RXABORT | PURGE_TXABORT);
    ClearCommError(hSerial_, NULL, NULL);

    uint8_t startCmd[7] = {kLegacyPacketHead, 0x01, 0x00, 0x00, 0x00, 0x00, kLegacyLedTail};
    DWORD written = 0;
    WriteFile(hSerial_, startCmd, sizeof(startCmd), &written, NULL);
    FlushFileBuffers(hSerial_);

    COMMTIMEOUTS timeouts;
    timeouts.ReadIntervalTimeout = 5;
    timeouts.ReadTotalTimeoutMultiplier = 0;
    timeouts.ReadTotalTimeoutConstant = 60;
    timeouts.WriteTotalTimeoutMultiplier = 0;
    timeouts.WriteTotalTimeoutConstant = 100;
    SetCommTimeouts(hSerial_, &timeouts);

    uint8_t rawBuf[128] = {};
    DWORD totalRead = 0;
    for (int attempt = 0; attempt < 5 && totalRead < sizeof(rawBuf); ++attempt) {
        DWORD n = 0;
        ReadFile(hSerial_, rawBuf + totalRead, (DWORD)(sizeof(rawBuf) - totalRead), &n, NULL);
        totalRead += n;

        uint8_t frame[kLegacyFrameSize] = {};
        if (!findLegacyFrameInBuffer(rawBuf, totalRead, frame)) continue;

        {
            std::lock_guard<std::mutex> lock(stateMutex_);
            memcpy(&state_.position, frame + 1, sizeof(float));
            state_.button1 = frame[5];
            state_.button2 = frame[6];
            state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
                std::chrono::system_clock::now().time_since_epoch()).count();
            state_.hasData = true;
            state_.connected = true;
            state_.hasExtendedData = false;
            state_.protocolVersion = 1;
        }

        if (!vidConfirmed_) {
            uint8_t tail = frame[kLegacyFrameSize - 1];
            if (tail == kLegacyTailRight) {
                handSide_ = "right";
                vidConfirmed_ = true;
            } else if (tail == kLegacyTailLeft) {
                handSide_ = "left";
                vidConfirmed_ = true;
            }
        }

        protocol_ = ProtocolVersion::LegacyV1;
        fprintf(stderr, "[UMI] legacy protocol connected: %s, side=%s\n",
                portName_.c_str(), handSide_.c_str());
        return true;
    }

    return false;
}

bool UmiGripper::open(const std::string& port, int baudRate) {
    close();

    std::string winPort = "\\\\.\\" + port;

    // 新 V4.0 CDC 主控板不需要预打开复位；连续打开/关闭反而可能让 Windows CDC 驱动短暂返回 error=31。
    if (false) {
        HANDLE hInit = CreateFileA(winPort.c_str(), GENERIC_READ | GENERIC_WRITE,
                                   0, NULL, OPEN_EXISTING, 0, NULL);
        if (hInit != INVALID_HANDLE_VALUE) {
            PurgeComm(hInit, PURGE_RXCLEAR | PURGE_TXCLEAR | PURGE_RXABORT | PURGE_TXABORT);
            CloseHandle(hInit);
        }
        Sleep(500);
    }

    hSerial_ = CreateFileA(winPort.c_str(), GENERIC_READ | GENERIC_WRITE,
                           0, NULL, OPEN_EXISTING, 0, NULL);
    if (hSerial_ == INVALID_HANDLE_VALUE) {
        fprintf(stderr, "[UMI夹爪] 无法打开 %s (error=%lu)\n", port.c_str(), GetLastError());
        return false;
    }

    portName_ = port;
    protocol_ = ProtocolVersion::Unknown;
    v4RxBuffer_.clear();
    hasSmoothedPosition_ = false;
    smoothedPosition_ = 0.0f;
    hasSmoothedRawPosition_ = false;
    smoothedRawPosition_ = 0.0f;
    detectHandSide();

    // 新主控板 V4.0 使用 460800 波特率和 AA55 带 CRC 帧。
    // 当前项目只支持新协议，握手失败时直接关闭串口，避免误占用设备。
    if (tryStartV4WithFallbackBauds()) {
        COMMTIMEOUTS timeouts;
        timeouts.ReadIntervalTimeout = MAXDWORD;
        timeouts.ReadTotalTimeoutMultiplier = 0;
        timeouts.ReadTotalTimeoutConstant = 50;
        SetCommTimeouts(hSerial_, &timeouts);

        connected_ = true;
        state_.connected = true;
        running_ = true;
        pollThread_ = std::thread(&UmiGripper::pollLoop, this);

        fprintf(stderr, "[UMI夹爪] 已连接 %s (V4.0, side=%s)\n", port.c_str(), handSide_.c_str());
        return true;
    }

    fprintf(stderr, "[UMI夹爪] %s 未完成 V4.0 握手，跳过该串口\n", port.c_str());
    fprintf(stderr, "[UMI] %s V4 handshake failed, try legacy protocol\n", port.c_str());
    if (tryStartLegacyProtocol()) {
        COMMTIMEOUTS timeouts;
        timeouts.ReadIntervalTimeout = MAXDWORD;
        timeouts.ReadTotalTimeoutMultiplier = 0;
        timeouts.ReadTotalTimeoutConstant = 50;
        SetCommTimeouts(hSerial_, &timeouts);

        connected_ = true;
        state_.connected = true;
        running_ = true;
        pollThread_ = std::thread(&UmiGripper::pollLoop, this);
        return true;
    }

    uint16_t vid = queryVidForPort(portName_);
    if (false && (vid == kVidLeft || vid == kVidRight)) {
        // VID 已经确认是 UMI 手动夹爪时，不因为刚插上时首帧延迟就放弃槽位。
        // Windows CDC 重新枚举后可能短时间不回数据，先挂入槽位，轮询线程继续等待 AA55 数据帧。
        protocol_ = ProtocolVersion::V4;
        COMMTIMEOUTS timeouts;
        timeouts.ReadIntervalTimeout = MAXDWORD;
        timeouts.ReadTotalTimeoutMultiplier = 0;
        timeouts.ReadTotalTimeoutConstant = 50;
        SetCommTimeouts(hSerial_, &timeouts);
        sendV4Frame(kV4CommandStartReport, nullptr, 0);

        {
            std::lock_guard<std::mutex> lock(stateMutex_);
            state_.connected = true;
            state_.hasData = false;
            state_.hasExtendedData = true;
            state_.protocolVersion = 4;
            state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
                std::chrono::system_clock::now().time_since_epoch()).count();
        }

        connected_ = true;
        running_ = true;
        pollThread_ = std::thread(&UmiGripper::pollLoop, this);
        fprintf(stderr, "[UMI] %s VID=0x%04X trusted, assign slot first and wait V4 data\n",
                port.c_str(), vid);
        return true;
    }

    CloseHandle(hSerial_);
    hSerial_ = INVALID_HANDLE_VALUE;
    protocol_ = ProtocolVersion::Unknown;
    return false;
}

void UmiGripper::close() {
    running_ = false;
    connected_ = false;
    state_.connected = false;
    if (pollThread_.joinable()) pollThread_.join();
    if (hSerial_ != INVALID_HANDLE_VALUE) {
        setLed(0, 0, 0, 0);
        if (protocol_ == ProtocolVersion::V4) {
            sendV4Frame(kV4CommandStopReport, nullptr, 0);
        }
        CloseHandle(hSerial_);
        hSerial_ = INVALID_HANDLE_VALUE;
    }
    protocol_ = ProtocolVersion::Unknown;
}

bool UmiGripper::isConnected() const { return connected_; }

void UmiGripper::getState(GripperState& out) const {
    std::lock_guard<std::mutex> lock(stateMutex_);
    out = state_;
}

void UmiGripper::setLed(uint8_t r, uint8_t g, uint8_t b, uint8_t brightness) {
    lastLedR_ = r;
    lastLedG_ = g;
    lastLedB_ = b;
    lastLedBrightness_ = brightness;

    {
        std::lock_guard<std::mutex> lock(stateMutex_);
        state_.ledR = r;
        state_.ledG = g;
        state_.ledB = b;
        state_.ledBrightness = brightness;
        state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
        if (protocol_ == ProtocolVersion::V4) {
            state_.hasExtendedData = true;
            state_.protocolVersion = 4;
            state_.lastV4Command = kV4CommandSetLed;
        }
    }

    if (protocol_ != ProtocolVersion::V4) return;
    uint8_t payload[4] = {r, g, b, brightness};
    sendV4Frame(kV4CommandSetLed, payload, sizeof(payload));
}

bool UmiGripper::sendV4Action(const std::string& action) {
    if (!connected_ || hSerial_ == INVALID_HANDLE_VALUE || protocol_ != ProtocolVersion::V4) {
        return false;
    }

    if (action == "v4_single_report") {
        return sendV4Frame(kV4CommandSingleReport, nullptr, 0);
    }
    if (action == "v4_read_params") {
        return sendV4Frame(kV4CommandReadParams, nullptr, 0);
    }
    if (action == "v4_force_zero") {
        uint8_t payload[1] = {0x01};
        return sendV4Frame(kV4CommandForceSetting, payload, sizeof(payload));
    }
    if (action == "v4_start_stream") {
        return sendV4Frame(kV4CommandStartReport, nullptr, 0);
    }
    return false;
}

// ---- 串口扫描 ----

std::vector<std::string> UmiGripper::scanSerialPorts() {
    std::vector<std::string> ports;
    for (int i = 1; i <= 256; i++) {
        std::string portName = "\\\\.\\COM" + std::to_string(i);
        HANDLE h = CreateFileA(portName.c_str(), GENERIC_READ | GENERIC_WRITE,
                               0, NULL, OPEN_EXISTING, 0, NULL);
        if (h != INVALID_HANDLE_VALUE) {
            CloseHandle(h);
            ports.push_back("COM" + std::to_string(i));
        }
    }
    return ports;
}

// ---- 左右手识别 ----

void UmiGripper::detectHandSide() {
    handSide_ = "unknown";
    vidConfirmed_ = false;

    // 优先通过 USB VID 判断左右手。
    uint16_t vid = queryVidForPort(portName_);
    if (vid == kVidLeft) {
        handSide_ = "left";
        vidConfirmed_ = true;
        fprintf(stderr, "[UMI夹爪] VID=0x%04X -> 左手\n", vid);
        return;
    } else if (vid == kVidRight) {
        handSide_ = "right";
        vidConfirmed_ = true;
        fprintf(stderr, "[UMI夹爪] VID=0x%04X -> 右手\n", vid);
        return;
    }

    // 兜底：如果端口名为空，首次收到数据帧后再根据帧尾字节判断左右手。
    fprintf(stderr, "[UMI夹爪] VID=0x%04X 未知，等待从数据帧尾针检测左右手\n", vid);
}

// ---- 串口参数配置 ----

bool UmiGripper::configurePort(int baudRate) {
    DCB dcb;
    memset(&dcb, 0, sizeof(dcb));
    dcb.DCBlength = sizeof(dcb);
    if (!GetCommState(hSerial_, &dcb)) {
        fprintf(stderr, "[UMI夹爪] GetCommState 失败 baud=%d error=%lu\n", baudRate, GetLastError());
        return false;
    }

    // 显式关闭所有流控，保证 MCU 协议按裸串口方式收发。
    dcb.BaudRate = (DWORD)baudRate;
    dcb.ByteSize = 8;
    dcb.Parity = NOPARITY;
    dcb.StopBits = ONESTOPBIT;
    dcb.fBinary = TRUE;
    dcb.fParity = FALSE;
    dcb.fOutxCtsFlow = FALSE;
    dcb.fOutxDsrFlow = FALSE;
    dcb.fDtrControl = DTR_CONTROL_ENABLE;
    dcb.fDsrSensitivity = FALSE;
    dcb.fOutX = FALSE;
    dcb.fInX = FALSE;
    dcb.fRtsControl = RTS_CONTROL_ENABLE;
    dcb.fAbortOnError = FALSE;

    if (!SetCommState(hSerial_, &dcb)) {
        DWORD err = GetLastError();
        fprintf(stderr, "[UMI夹爪] SetCommState 警告 baud=%d error=%lu，继续按 CDC 默认参数通信\n", baudRate, err);
    }

    COMMTIMEOUTS timeouts;
    timeouts.ReadIntervalTimeout = MAXDWORD;
    timeouts.ReadTotalTimeoutMultiplier = 0;
    timeouts.ReadTotalTimeoutConstant = 50;
    timeouts.WriteTotalTimeoutMultiplier = 0;
    timeouts.WriteTotalTimeoutConstant = 100;
    SetCommTimeouts(hSerial_, &timeouts);

    SetupComm(hSerial_, 4096, 4096);
    return true;
}

// ---- 串口轮询循环 ----

void UmiGripper::pollLoop() {
    int failCount = 0;
    auto lastValidFrameTime = std::chrono::steady_clock::now();
    auto lastStreamRestartTime = lastValidFrameTime;
    while (running_) {
        if (hSerial_ == INVALID_HANDLE_VALUE) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            continue;
        }

        uint8_t chunk[64] = {};
        DWORD bytesRead = 0;
        if (!ReadFile(hSerial_, chunk, sizeof(chunk), &bytesRead, NULL)) {
            failCount++;
            if (failCount >= kMaxFailCount) {
                fprintf(stderr, "[UMI夹爪] 串口连续读取失败，标记为断开 (%s)\n", portName_.c_str());
                connected_ = false;
                state_.connected = false;
                return;
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(20));
            continue;
        }

        failCount = 0;
        if (bytesRead == 0) {
            // 读取超时只代表当前没有新数据。静默超过一秒时低频补发连续上报命令，
            // 兼容在 LED 或查询指令后暂停数据流的 V4 固件。
            auto now = std::chrono::steady_clock::now();
            if (protocol_ == ProtocolVersion::V4
                && now - lastValidFrameTime >= std::chrono::seconds(1)
                && now - lastStreamRestartTime >= std::chrono::seconds(1)) {
                sendV4Frame(kV4CommandStartReport, nullptr, 0);
                lastStreamRestartTime = now;
            }
            continue;
        }

        if (protocol_ == ProtocolVersion::LegacyV1) {
            uint8_t frame[kLegacyFrameSize] = {};
            if (findLegacyFrameInBuffer(chunk, bytesRead, frame)) {
                std::lock_guard<std::mutex> lock(stateMutex_);
                memcpy(&state_.position, frame + 1, sizeof(float));
                state_.button1 = frame[5];
                state_.button2 = frame[6];
                state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
                    std::chrono::system_clock::now().time_since_epoch()).count();
                state_.hasData = true;
                state_.connected = true;
                lastValidFrameTime = std::chrono::steady_clock::now();
            }
            continue;
        }

        v4RxBuffer_.insert(v4RxBuffer_.end(), chunk, chunk + bytesRead);
        if (v4RxBuffer_.size() > 512) {
            v4RxBuffer_.erase(v4RxBuffer_.begin(), v4RxBuffer_.end() - 256);
        }

        std::vector<uint8_t> frame;
        while (popV4FrameFromBuffer(v4RxBuffer_, frame)) {
            if (parseV4Frame(frame.data(), frame.size())) {
                lastValidFrameTime = std::chrono::steady_clock::now();
            }
        }
    }
}

// ---- 命令发送 ----

bool UmiGripper::sendCommand(const uint8_t* data, size_t len) {
    if (hSerial_ == INVALID_HANDLE_VALUE || data == nullptr) return false;
    std::lock_guard<std::mutex> lock(serialMutex_);
    DWORD written = 0;
    if (!WriteFile(hSerial_, data, (DWORD)len, &written, NULL)) return false;
    FlushFileBuffers(hSerial_);
    return written == len;
}
