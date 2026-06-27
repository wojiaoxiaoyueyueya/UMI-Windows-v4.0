// UmiGripper.hpp - UMI 手动夹爪 V4.0 驱动（Windows 版）
// 通过 Win32 串口 API 与夹爪 MCU 通信，支持 AA 55 帧头、CRC16-Modbus 校验的新协议。

#pragma once

#include <winsock2.h>
#include <windows.h>

#include "IGripper.hpp"
#include <mutex>
#include <string>
#include <vector>
#include <atomic>
#include <thread>
#include <cstdint>

struct ComPortVidInfo {
    std::string portName;  // "COM3"
    uint16_t vid = 0;
    uint16_t pid = 0;
};

class UmiGripper : public IGripper {
public:
    UmiGripper();
    ~UmiGripper() override;

    bool open(const std::string& port, int baudRate = 460800) override;
    void close() override;
    bool isConnected() const override;
    void getState(GripperState& out) const override;
    std::string getGripperType() const override { return "manual"; }
    std::string getPortName() const override { return portName_; }
    void setLed(uint8_t r, uint8_t g, uint8_t b, uint8_t brightness = 100) override;
    bool sendV4Action(const std::string& action);
    static std::vector<std::string> scanSerialPorts();

    // USB VID detection
    static std::vector<ComPortVidInfo> enumerateComPortsWithVid();
    static uint16_t queryVidForPort(const std::string& portName);
    std::string getHandSide() const { return handSide_; }

private:
    enum class ProtocolVersion {
        Unknown,
        LegacyV1,
        V4
    };

    void pollLoop();
    bool sendCommand(const uint8_t* data, size_t len);
    bool sendV4Frame(uint8_t command, const uint8_t* payload, size_t payloadLen);
    bool tryStartV4WithFallbackBauds();
    bool tryStartLegacyProtocol();
    bool parseV4Frame(const uint8_t* frame, size_t frameLen);
    bool configurePort(int baudRate);
    void detectHandSide();

    HANDLE hSerial_ = INVALID_HANDLE_VALUE;
    std::atomic<bool> connected_{false};
    std::atomic<bool> running_{false};
    std::thread pollThread_;
    mutable std::mutex stateMutex_;
    std::mutex serialMutex_;
    GripperState state_;
    std::string portName_;
    std::string handSide_;  // "left" / "right" / "unknown"，优先由 USB VID 判断，未知 VID 时由槽位分配兜底。
    bool vidConfirmed_ = false;  // VID 已确认左右手时，不再被协议帧尾或设备标识覆盖。
    ProtocolVersion protocol_ = ProtocolVersion::Unknown;
    std::vector<uint8_t> v4RxBuffer_;
    bool hasSmoothedPosition_ = false;
    float smoothedPosition_ = 0.0f;
    bool hasSmoothedRawPosition_ = false;
    float smoothedRawPosition_ = 0.0f;
    uint8_t lastLedR_ = 0, lastLedG_ = 0, lastLedB_ = 0, lastLedBrightness_ = 0;
};
