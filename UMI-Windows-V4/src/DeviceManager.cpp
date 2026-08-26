// DeviceManager.cpp - 设备管理器实现
// 检测海康/Orbbec相机和夹爪，分配左右槽位

#include "DeviceManager.hpp"
#include "HikCameraAdapter.hpp"
#include <set>
#include "OrbbecCamera.hpp"
#include "UmiGripper.hpp"
#include "ElectricGripper.hpp"
#include "ECanVciWrapper.hpp"
#include "utils/JsonHelper.hpp"
#include "utils/WinFsUtils.hpp"

#include <cstdio>
#include <algorithm>
#include <chrono>

#ifndef NO_ORBBEC_CAMERA
#include <libobsensor/ObSensor.h>
#include <libobsensor/h/Context.h>
#include <libobsensor/h/Device.h>
#include <libobsensor/h/Error.h>

#else
#include <libobsensor/ObSensor.h>
#include <libobsensor/Context.h>
#include <libobsensor/Device.h>
#include <libobsensor/Error.h>
#endif

#ifndef NO_HIK_CAMERA
#include "MvCameraControl.h"
#endif

namespace {
bool isManualGripperVid(uint16_t vid) {
    return vid == 0x0E01 || vid == 0x0E02;
}

bool isLikelyEsp32CanBridgeVid(uint16_t vid) {
    // 0x303A: Espressif USB Serial/JTAG；0x1A86/0x10C4/0x0403/0x067B: 常见 USB-UART 桥。
    // vid=0 表示系统没有提供 VID，也保留为低优先级候选。
    return vid == 0 || vid == 0x303A || vid == 0x1A86 || vid == 0x10C4 || vid == 0x0403 || vid == 0x067B;
}

bool isLikelyManualDataPortVid(uint16_t vid) {
    return vid == 0x1A86 || vid == 0x10C4 || vid == 0x0403 || vid == 0x067B;
}

std::string currentExecutableDirectory() {
    wchar_t executablePath[MAX_PATH] = {};
    DWORD length = GetModuleFileNameW(nullptr, executablePath, MAX_PATH);
    if (length == 0) return ".";
    std::wstring directory(executablePath, length);
    size_t lastSlash = directory.find_last_of(L"\\/");
    if (lastSlash != std::wstring::npos) directory.resize(lastSlash);
    return winfs::wideToUtf8(directory);
}
}

// ---- 构造/析构 ----

bool isManualSlotName(const std::string& side) {
    return side == "left" || side == "right";
}

std::string firstEmptyManualSlot(const std::map<std::string, GripperSlot>& slots,
                                 const std::set<std::string>& plannedSides) {
    for (const auto& side : {std::string("left"), std::string("right")}) {
        auto it = slots.find(side);
        if (it == slots.end()) continue;
        if (it->second.connected) continue;
        if (plannedSides.count(side) > 0) continue;
        return side;
    }
    return "";
}

DeviceManager::DeviceManager(const Config& cfg) : cfg_(cfg) {
    slots_["left"]  = DeviceSlot("left");
    slots_["right"] = DeviceSlot("right");
    slots_["head"]  = DeviceSlot("head");
    gripperSlots_["left"]  = GripperSlot("left");
    gripperSlots_["right"] = GripperSlot("right");
    gripperSlots_["extra"] = GripperSlot("extra");
}

DeviceManager::~DeviceManager() { shutdown(); }

void DeviceManager::shutdown() {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);
    if (shutdownCompleted_) return;
    shutdownCompleted_ = true;

    fprintf(stderr, "[DeviceManager] 正在释放相机、串口和 CAN 设备...\n");
    for (auto& kv : slots_) {
        auto& slot = kv.second;
        if (slot.camera) {
            slot.camera->stopStreaming();
            slot.camera->close();
            slot.camera.reset();
        }
        slot.connected = false;
        slot.deviceType = "none";
    }
    for (auto& camera : retiredCameras_) {
        if (camera) {
            camera->stopStreaming();
            camera->close();
        }
    }
    retiredCameras_.clear();

    for (auto& kv : gripperSlots_) {
        auto& slot = kv.second;
        if (slot.gripper) {
            slot.gripper->close();
            slot.gripper.reset();
        }
        slot.connected = false;
        slot.gripperType = "none";
    }
    for (auto& gripper : retiredGrippers_) {
        if (gripper) gripper->close();
    }
    retiredGrippers_.clear();
    detectedDevices_.clear();
    detectedGrippers_.clear();
    fprintf(stderr, "[DeviceManager] 所有设备句柄已释放\n");
}

// ---- 设备检测 ----

bool DeviceManager::detectAll() {
    detectedDevices_.clear();

    fprintf(stderr, "[DeviceManager] 开始检测设备...\n");

    detectOrbbecDevices();
    detectHikvisionDevices();

    fprintf(stderr, "[DeviceManager] 检测到 %d 个相机设备 (%d Orbbec, %d Hikvision)\n",
            (int)detectedDevices_.size(), getOrbbecCount(), getHikvisionCount());

    assignSlots();
    detectAndAssignGrippers();
    return !detectedDevices_.empty();
}

bool DeviceManager::reDetectCameras() {
    fprintf(stderr, "[DeviceManager] 重新检测相机...\n");

    // 停止现有流
    for (auto& kv : slots_) {
        if (kv.second.connected && kv.second.camera) {
            kv.second.camera->stopStreaming();
            kv.second.camera->close();
        }
        kv.second.connected = false;
        kv.second.camera.reset();
        kv.second.deviceType = "none";
    }

    detectedDevices_.clear();
    detectOrbbecDevices();
    detectHikvisionDevices();
    assignSlots();
    return !detectedDevices_.empty();
}

bool DeviceManager::refreshDetectedCameras() {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);
    uint64_t nowUs = std::chrono::duration_cast<std::chrono::microseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();
    if (lastCameraRefreshUs_ > 0 && nowUs > lastCameraRefreshUs_
        && (nowUs - lastCameraRefreshUs_) < 3000000ULL) {
        return !detectedDevices_.empty();
    }
    lastCameraRefreshUs_ = nowUs;

    // 这里只更新检测列表，不关闭 slots_ 中已经打开的相机对象。
    // 主采集线程在服务启动时会持有相机指针；如果扫描按钮直接重置这些对象，
    // 页面会表现为所有设备断开，部分 SDK 还需要重启服务才能恢复。
    detectedDevices_.clear();
    detectOrbbecDevices();
    detectHikvisionDevices();

    std::set<std::string> detectedSerials;
    for (const auto& d : detectedDevices_) {
        if (!d.serialNumber.empty()) {
            detectedSerials.insert(d.serialNumber);
            cameraMissingScanCounts_.erase(d.serialNumber);
        }
    }
    for (auto& kv : slots_) {
        auto& slot = kv.second;
        if (!slot.connected || !slot.camera) continue;
        std::string slotSerial = slot.camera->getSerialNumber();
        if (!slotSerial.empty() && detectedSerials.count(slotSerial) > 0) continue;

        // USB 设备插入时，Windows 和相机 SDK 可能短暂重新枚举同一控制器上的设备。
        // 单次漏检不能立即关闭正在采集的相机，否则奥比插入时会把海康流误判为断开。
        int& missingScans = cameraMissingScanCounts_[slotSerial];
        missingScans++;
        constexpr int kMissingScansBeforeDetach = 3;
        if (missingScans < kMissingScansBeforeDetach) {
            if (missingScans == 1) {
                fprintf(stderr,
                        "[DeviceManager] %s 槽相机本轮未枚举到，暂时保留并等待确认 (SN=%s)\n",
                        kv.first.c_str(), slotSerial.c_str());
            }
            continue;
        }

        fprintf(stderr, "[DeviceManager] %s slot camera is no longer detected, releasing slot (SN=%s)\n",
                kv.first.c_str(), slotSerial.c_str());
        slot.camera->stopStreaming();
        slot.camera->close();
        retiredCameras_.push_back(std::move(slot.camera));
        slot.connected = false;
        slot.deviceType = "none";
        cameraMissingScanCounts_.erase(slotSerial);
    }

    return !detectedDevices_.empty();
}

bool DeviceManager::attachDetectedCamerasToEmptySlots() {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);

    std::set<std::string> attachedSerials;
    for (const auto& kv : slots_) {
        if (kv.second.connected && kv.second.camera) {
            attachedSerials.insert(kv.second.camera->getSerialNumber());
        }
    }

    std::vector<DetectedDevice*> orbbecDevs;
    std::vector<DetectedDevice*> hikDevs;
    for (auto& d : detectedDevices_) {
        if (!d.serialNumber.empty() && attachedSerials.count(d.serialNumber) > 0) continue;
        if (d.type == "orbbec") orbbecDevs.push_back(&d);
        else if (d.type == "hikvision") hikDevs.push_back(&d);
    }

    auto assignSlot = [&](const std::string& slotName, DetectedDevice* dev) -> bool {
        auto& slot = slots_[slotName];
        if (slot.connected || !dev) return false;

        slot.deviceType = dev->type;
        slot.connected = false;

        if (dev->type == "orbbec") {
#ifndef NO_ORBBEC_CAMERA
            auto cam = std::make_unique<OrbbecCamera>();
            if (cam->open(dev->index, dev->serialNumber)) {
                slot.camera = std::move(cam);
                slot.connected = true;
                fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 槽: Orbbec %s (SN: %s)\n",
                        slotName.c_str(), dev->name.c_str(), slot.camera->getSerialNumber().c_str());
                attachedSerials.insert(slot.camera->getSerialNumber());
                return true;
            }
#endif
        } else if (dev->type == "hikvision") {
            auto cam = std::make_unique<HikCameraAdapter>(cfg_.camera);
            if (cam->open(dev->index, dev->serialNumber)) {
                slot.camera = std::move(cam);
                slot.connected = true;
                fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 槽: Hikvision %s (SN: %s)\n",
                        slotName.c_str(), dev->name.c_str(), slot.camera->getSerialNumber().c_str());
                attachedSerials.insert(slot.camera->getSerialNumber());
                return true;
            }
        }

        slot.deviceType = "none";
        slot.camera.reset();
        slot.connected = false;
        return false;
    };

    std::string leftPreferred  = cfg_.devices.count("left")  ? cfg_.devices.at("left").preferredType  : "auto";
    std::string rightPreferred = cfg_.devices.count("right") ? cfg_.devices.at("right").preferredType : "auto";
    bool changed = false;

    if (!slots_["left"].connected) {
        if (leftPreferred == "orbbec" && !orbbecDevs.empty()) {
            changed |= assignSlot("left", orbbecDevs.front());
            orbbecDevs.erase(orbbecDevs.begin());
        } else if (leftPreferred == "hikvision" && !hikDevs.empty()) {
            changed |= assignSlot("left", hikDevs.front());
            hikDevs.erase(hikDevs.begin());
        }
    }
    if (!slots_["right"].connected) {
        if (rightPreferred == "orbbec" && !orbbecDevs.empty()) {
            changed |= assignSlot("right", orbbecDevs.front());
            orbbecDevs.erase(orbbecDevs.begin());
        } else if (rightPreferred == "hikvision" && !hikDevs.empty()) {
            changed |= assignSlot("right", hikDevs.front());
            hikDevs.erase(hikDevs.begin());
        }
    }
    if (!slots_["left"].connected) {
        if (!orbbecDevs.empty()) {
            changed |= assignSlot("left", orbbecDevs.front());
            orbbecDevs.erase(orbbecDevs.begin());
        } else if (!hikDevs.empty()) {
            changed |= assignSlot("left", hikDevs.front());
            hikDevs.erase(hikDevs.begin());
        }
    }
    if (!slots_["right"].connected) {
        if (!hikDevs.empty()) {
            changed |= assignSlot("right", hikDevs.front());
            hikDevs.erase(hikDevs.begin());
        } else if (!orbbecDevs.empty()) {
            changed |= assignSlot("right", orbbecDevs.front());
            orbbecDevs.erase(orbbecDevs.begin());
        }
    }
    if (!slots_["head"].connected) {
        if (!orbbecDevs.empty()) {
            changed |= assignSlot("head", orbbecDevs.front());
            orbbecDevs.erase(orbbecDevs.begin());
        } else if (!hikDevs.empty()) {
            changed |= assignSlot("head", hikDevs.front());
            hikDevs.erase(hikDevs.begin());
        }
    }

    return changed;
}

bool DeviceManager::detectGrippers() {
    detectAndAssignGrippers();
    return !detectedGrippers_.empty();
}

bool DeviceManager::refreshDetectedGrippers() {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);
    uint64_t nowUs = std::chrono::duration_cast<std::chrono::microseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();
    if (lastGripperRefreshUs_ > 0 && nowUs > lastGripperRefreshUs_
        && (nowUs - lastGripperRefreshUs_) < 3000000ULL) {
        return !detectedGrippers_.empty();
    }
    lastGripperRefreshUs_ = nowUs;
    // 轻量刷新只枚举串口 VID，不重新 open 串口，避免页面轮询抢占手动夹爪端口。
    detectedGrippers_.clear();

    auto portInfos = UmiGripper::enumerateComPortsWithVid();
    std::set<std::string> detectedManualPorts;
    for (auto& info : portInfos) {
        if (info.vid != 0x0E01 && info.vid != 0x0E02) continue;
        DetectedGripper dg;
        dg.type = "manual";
        dg.port = info.portName;
        dg.connected = true;
        detectedGrippers_.push_back(dg);
        detectedManualPorts.insert(info.portName);
    }

    for (auto& kv : gripperSlots_) {
        auto& slot = kv.second;
        if (!slot.connected || slot.gripperType != "manual" || !slot.gripper) continue;
        std::string port = slot.gripper->getPortName();
        bool portStillPresent = !port.empty() && detectedManualPorts.count(port) > 0;
        bool gripperAlive = slot.gripper->isConnected();
        if (gripperAlive) {
            if (!port.empty() && !portStillPresent) {
                DetectedGripper dg;
                dg.type = "manual";
                dg.port = port;
                dg.connected = true;
                detectedGrippers_.push_back(dg);
                detectedManualPorts.insert(port);
            }
            continue;
        }

        fprintf(stderr, "[DeviceManager] %s 手动夹爪已断开，等待重新连接 (%s)\n",
                kv.first.c_str(), port.c_str());
        slot.gripper->close();
        slot.connected = false;
    }

    // 电动夹爪目前通过 CAN 打开后保持在槽位中，轻量刷新不重新探测 CAN。
    // 如果槽位里已经有电动夹爪，必须确认最近收到过 CAN 反馈才报告给前端。
    // 否则 CAN 断开后软件连接标志仍可能保持 true，页面会误显示“有设备”。
    for (auto& kv : gripperSlots_) {
        auto& slot = kv.second;
        auto* electric = dynamic_cast<ElectricGripper*>(slot.gripper.get());
        if (slot.connected && slot.gripperType == "electric" && electric && electric->isConnected()) {
            bool recentlyResponsive = electric->hasRecentMotorResponse(nowUs, 5000000ULL);
            if (!recentlyResponsive) {
                fprintf(stderr, "[DeviceManager] %s 电动夹爪反馈超时，标记为断开 (%s)\n",
                        kv.first.c_str(), electric->getPortName().c_str());
                slot.connected = false;
                continue;
            }

            DetectedGripper dg;
            dg.type = "electric";
            dg.port = electric->getPortName();
            dg.connected = true;
            detectedGrippers_.push_back(dg);
        }
    }

    return !detectedGrippers_.empty();
}

bool DeviceManager::attachDetectedGrippersToEmptySlots(bool allowElectricScan) {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);
    bool manualNeedsAttach = false;
    for (const auto& side : {std::string("left"), std::string("right")}) {
        auto it = gripperSlots_.find(side);
        if (it != gripperSlots_.end() && (!it->second.connected || !it->second.gripper)) {
            manualNeedsAttach = true;
            break;
        }
    }
    if (!manualNeedsAttach && !allowElectricScan) return false;

    uint64_t nowUs = std::chrono::duration_cast<std::chrono::microseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();
    constexpr uint64_t kManualOpenRetryCooldownUs = 15000000ULL;

    // 手动夹爪：按端口重新枚举后，只补挂当前为空的左右槽位。
    auto portInfos = UmiGripper::enumerateComPortsWithVid();
    struct ManualPortCandidate {
        std::string side;
        std::string port;
    };
    std::vector<ManualPortCandidate> manualCandidates;
    for (const auto& info : portInfos) {
        if (info.vid == 0x0E01) manualCandidates.push_back({"left", info.portName});
        else if (info.vid == 0x0E02) manualCandidates.push_back({"right", info.portName});
    }
    if (!manualCandidates.empty()) {
        for (const auto& info : portInfos) {
            if (isLikelyManualDataPortVid(info.vid)) {
                manualCandidates.push_back({"unknown", info.portName});
            }
        }
    }

    bool changed = false;
    std::set<std::string> plannedManualSides;
    std::set<std::string> usedManualPorts;
    for (const auto& kv : gripperSlots_) {
        if (kv.second.connected && kv.second.gripper) {
            usedManualPorts.insert(kv.second.gripper->getPortName());
            if (kv.second.gripperType == "manual") plannedManualSides.insert(kv.first);
        }
    }

    for (const auto& c : manualCandidates) {
        if (usedManualPorts.count(c.port) > 0) continue;
        auto retryIt = manualOpenRetryAfterUs_.find(c.port);
        if (!allowElectricScan && retryIt != manualOpenRetryAfterUs_.end() && retryIt->second > nowUs) continue;

        std::string side = c.side;
        if (!isManualSlotName(side) || gripperSlots_[side].connected || plannedManualSides.count(side) > 0) {
            side = firstEmptyManualSlot(gripperSlots_, plannedManualSides);
        }
        if (side.empty()) continue;

        auto& slot = gripperSlots_[side];
        if (slot.connected) continue;

        UmiGripper* gripper = dynamic_cast<UmiGripper*>(slot.gripper.get());
        if (!gripper) {
            if (slot.gripper) {
                slot.gripper->close();
                retiredGrippers_.push_back(std::move(slot.gripper));
            }
            auto fresh = std::make_unique<UmiGripper>();
            gripper = fresh.get();
            slot.gripper = std::move(fresh);
        }
        if (gripper->open(c.port)) {
            slot.gripperType = "manual";
            slot.connected = true;
            usedManualPorts.insert(c.port);
            plannedManualSides.insert(side);
            manualOpenRetryAfterUs_.erase(c.port);
            changed = true;
            fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 夹爪槽: 手动夹爪 (%s)\n",
                    side.c_str(), c.port.c_str());
        } else {
            manualOpenRetryAfterUs_[c.port] = nowUs + kManualOpenRetryCooldownUs;
            fprintf(stderr, "[DeviceManager] 热插拔手动夹爪候选 %s 打开失败，继续尝试其他串口\n",
                    c.port.c_str());
        }
    }

    if (manualCandidates.empty()) {
    for (const auto& port : UmiGripper::scanSerialPorts()) {
        if (usedManualPorts.count(port) > 0) continue;
        auto retryIt = manualOpenRetryAfterUs_.find(port);
        if (!allowElectricScan && retryIt != manualOpenRetryAfterUs_.end() && retryIt->second > nowUs) continue;

        std::string targetSide = firstEmptyManualSlot(gripperSlots_, plannedManualSides);
        if (targetSide.empty()) break;

        auto gripper = std::make_unique<UmiGripper>();
        if (!gripper->open(port)) {
            manualOpenRetryAfterUs_[port] = nowUs + kManualOpenRetryCooldownUs;
            continue;
        }

        std::string detectedSide = gripper->getHandSide();
        if (isManualSlotName(detectedSide) &&
            !gripperSlots_[detectedSide].connected &&
            plannedManualSides.count(detectedSide) == 0) {
            targetSide = detectedSide;
        }

        auto& targetSlot = gripperSlots_[targetSide];
        if (targetSlot.gripper) {
            targetSlot.gripper->close();
            retiredGrippers_.push_back(std::move(targetSlot.gripper));
        }
        targetSlot.gripperType = "manual";
        targetSlot.gripper = std::move(gripper);
        targetSlot.connected = true;

        DetectedGripper dg;
        dg.type = "manual";
        dg.port = port;
        dg.connected = true;
        detectedGrippers_.push_back(dg);

        usedManualPorts.insert(port);
        plannedManualSides.insert(targetSide);
        manualOpenRetryAfterUs_.erase(port);
        changed = true;
        fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 夹爪槽: 未知 VID 手动夹爪 (%s)\n",
                targetSide.c_str(), port.c_str());
    }
    }

    bool hasConnectedElectric = false;
    for (const auto& kv : gripperSlots_) {
        if (kv.second.connected && kv.second.gripperType == "electric" && kv.second.gripper) {
            hasConnectedElectric = true;
            break;
        }
    }
    if (hasConnectedElectric) return changed;

    std::set<std::string> usedPorts;
    for (const auto& kv : gripperSlots_) {
        if (kv.second.connected && kv.second.gripper) usedPorts.insert(kv.second.gripper->getPortName());
    }
    std::vector<std::string> esp32CanPorts;
    for (const auto& info : portInfos) {
        if (isManualGripperVid(info.vid)) continue;
        if (usedPorts.count(info.portName)) continue;
        if (isLikelyEsp32CanBridgeVid(info.vid)) esp32CanPorts.push_back(info.portName);
    }
    if (esp32CanPorts.empty()) {
        for (const auto& port : UmiGripper::scanSerialPorts()) {
            if (usedPorts.count(port)) continue;
            bool isKnownManualPort = false;
            for (const auto& info : portInfos) {
                if (info.portName == port && isManualGripperVid(info.vid)) {
                    isKnownManualPort = true;
                    break;
                }
            }
            if (isKnownManualPort) continue;
            esp32CanPorts.push_back(port);
        }
    }

    bool canAvailable = false;
    auto& canWrapper = ECanVciWrapper::sharedInstance();
    if (!allowElectricScan) return changed;
    std::string exeDir = currentExecutableDirectory();
    if (canWrapper.load(exeDir) || canWrapper.load("")) {
        if (canWrapper.openDevice(4, 0) && canWrapper.initCAN(0, 0x00, 0x14) && canWrapper.startCAN()) {
            canAvailable = true;
        } else {
            canWrapper.close();
        }
    }
    std::string electricSlot;
    for (const auto& slotName : {std::string("left"), std::string("right"), std::string("extra")}) {
        auto it = gripperSlots_.find(slotName);
        if (it != gripperSlots_.end() && !it->second.connected) {
            electricSlot = slotName;
            break;
        }
    }
    if (electricSlot.empty()) {
        if (canAvailable) canWrapper.close();
        return changed;
    }

    bool electricAttached = false;
    if (canAvailable) {
        auto gripper = std::make_unique<ElectricGripper>();
        if (gripper->openCAN(&canWrapper, 0x15)) {
            DetectedGripper dg;
            dg.type = "electric";
            dg.port = gripper->getPortName();
            dg.connected = true;
            detectedGrippers_.push_back(dg);
            auto& targetSlot = gripperSlots_[electricSlot];
            if (targetSlot.gripper) {
                targetSlot.gripper->close();
                retiredGrippers_.push_back(std::move(targetSlot.gripper));
            }
            targetSlot.gripperType = "electric";
            targetSlot.gripper = std::move(gripper);
            targetSlot.connected = true;
            fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 夹爪槽: 电动夹爪 (GCAN CAN盒)\n", electricSlot.c_str());
            changed = true;
            electricAttached = true;
        } else {
            canWrapper.close();
            canAvailable = false;
        }
    }

    if (!electricAttached) {
        for (const auto& port : esp32CanPorts) {
            auto gripper = std::make_unique<ElectricGripper>();
            if (!gripper->openSerialBridge(port, 115200, 0x15)) continue;

            DetectedGripper dg;
            dg.type = "electric";
            dg.port = gripper->getPortName();
            dg.connected = true;
            detectedGrippers_.push_back(dg);
            auto& targetSlot = gripperSlots_[electricSlot];
            if (targetSlot.gripper) {
                targetSlot.gripper->close();
                retiredGrippers_.push_back(std::move(targetSlot.gripper));
            }
            targetSlot.gripperType = "electric";
            targetSlot.gripper = std::move(gripper);
            targetSlot.connected = true;
            fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 夹爪槽: 电动夹爪 (ESP32-CAN 串口桥 %s)\n",
                    electricSlot.c_str(), port.c_str());
            changed = true;
            electricAttached = true;
            break;
        }
    }
    return changed;
}

void DeviceManager::detectOrbbecDevices() {
#ifndef NO_ORBBEC_CAMERA
    ob_error* err = nullptr;
    auto* ctx = ob_create_context(&err);
    if (err || !ctx) {
        fprintf(stderr, "[DeviceManager] Orbbec Context 创建失败: %s\n",
                err ? ob_error_get_message(err) : "unknown");
        if (err) ob_delete_error(err);
        return;
    }

    auto* devList = ob_query_device_list(ctx, &err);
    if (err) {
        fprintf(stderr, "[DeviceManager] Orbbec 设备查询失败: %s\n",
                err ? ob_error_get_message(err) : "unknown");
        if (err) ob_delete_error(err);
        ob_delete_context(ctx, &err);
        if (err) ob_delete_error(err);
        return;
    }

    int count = ob_device_list_get_device_count(devList, &err);
    if (err) { ob_delete_error(err); ob_delete_device_list(devList, &err); ob_delete_context(ctx, &err); return; }

    for (int i = 0; i < count; i++) {
        DetectedDevice dev;
        dev.type = "orbbec";
        dev.index = i;

        auto* device = ob_device_list_get_device(devList, i, &err);
        if (err) { ob_delete_error(err); continue; }

        auto* info = ob_device_get_device_info(device, &err);
        if (!err && info) {
            const char* name = ob_device_info_get_name(info, &err);
            if (!err && name) dev.name = name;
            if (err) { ob_delete_error(err); err = nullptr; }

            const char* sn = ob_device_info_get_serial_number(info, &err);
            if (!err && sn) dev.serialNumber = sn;
            if (err) { ob_delete_error(err); err = nullptr; }

            ob_delete_device_info(info, &err);
            if (err) { ob_delete_error(err); err = nullptr; }
        }
        if (err) ob_delete_error(err);

        // device 由 devList 管理，不单独释放

        detectedDevices_.push_back(dev);
        fprintf(stderr, "[DeviceManager] 检测到 Orbbec 设备: %s (SN: %s)\n",
                dev.name.c_str(), dev.serialNumber.c_str());
    }

    ob_delete_device_list(devList, &err);
    if (err) ob_delete_error(err);
    ob_delete_context(ctx, &err);
    if (err) ob_delete_error(err);
#else
    fprintf(stderr, "[DeviceManager] Orbbec SDK 未安装，跳过检测\n");
#endif
}

void DeviceManager::detectHikvisionDevices() {
#ifndef NO_HIK_CAMERA
    if (!hikSdkBannerShown_) {
        const unsigned int version = MV_CC_GetSDKVersion();
        fprintf(stderr, "[海康诊断] MVS SDK 已编入程序，运行库版本=0x%08X\n", version);
        hikSdkBannerShown_ = true;
    }

    // 分开枚举 GigE 和 USB，同一个物理摄像头通过两种接口可能出现两次
    // 先 GigE 再 USB，按 serial + name 双重去重
    std::set<std::string> seenSerials;
    std::set<std::string> seenNames;
    const size_t hikCountBefore = std::count_if(
        detectedDevices_.begin(), detectedDevices_.end(),
        [](const DetectedDevice& d) { return d.type == "hikvision"; });

    int gigERet = MV_OK;
    int usbRet = MV_OK;
    unsigned int gigEEnumerated = 0;
    unsigned int usbEnumerated = 0;

    auto enumByTransport = [&](unsigned int transportType, const char* transportName,
                               int& result, unsigned int& enumerated) {
        MV_CC_DEVICE_INFO_LIST devList;
        memset(&devList, 0, sizeof(devList));
        result = MV_CC_EnumDevices(transportType, &devList);
        if (result != MV_OK) return;
        enumerated = devList.nDeviceNum;
        if (devList.nDeviceNum == 0) return;

        for (unsigned int i = 0; i < devList.nDeviceNum; i++) {
            auto* info = devList.pDeviceInfo[i];
            if (!info) continue;

            std::string serial, name;
            if (info->nTLayerType == MV_GIGE_DEVICE) {
                name = std::string((char*)info->SpecialInfo.stGigEInfo.chUserDefinedName);
                serial = std::string((char*)info->SpecialInfo.stGigEInfo.chSerialNumber);
            } else {
                name = std::string((char*)info->SpecialInfo.stUsb3VInfo.chUserDefinedName);
                serial = std::string((char*)info->SpecialInfo.stUsb3VInfo.chSerialNumber);
            }

            // 按 serial 或 name 去重
            if ((!serial.empty() && seenSerials.count(serial))
                || (!name.empty() && seenNames.count(name))) {
                fprintf(stderr, "[DeviceManager] 跳过重复海康设备[%s]: %s (SN: %s)\n",
                        transportName, name.c_str(), serial.c_str());
                continue;
            }
            if (!serial.empty()) seenSerials.insert(serial);
            if (!name.empty()) seenNames.insert(name);

            DetectedDevice dev;
            dev.type = "hikvision";
            dev.index = i;  // 这是在本次枚举中的索引，open 时会按 serial 查找
            dev.name = name;
            dev.serialNumber = serial;

            detectedDevices_.push_back(dev);
            fprintf(stderr, "[DeviceManager] 检测到海康设备[%s]: %s (SN: %s, idx=%d)\n",
                    transportName, dev.name.c_str(), dev.serialNumber.c_str(), dev.index);
        }
    };

    enumByTransport(MV_GIGE_DEVICE, "GigE", gigERet, gigEEnumerated);
    enumByTransport(MV_USB_DEVICE, "USB", usbRet, usbEnumerated);

    size_t hikCountAfter = std::count_if(
        detectedDevices_.begin(), detectedDevices_.end(),
        [](const DetectedDevice& d) { return d.type == "hikvision"; });
    int combinedRet = MV_OK;
    unsigned int combinedEnumerated = 0;
    if (hikCountAfter == hikCountBefore) {
        // 没有按单传输找到，尝试组合枚举
        MV_CC_DEVICE_INFO_LIST devList;
        memset(&devList, 0, sizeof(devList));
        combinedRet = MV_CC_EnumDevices(MV_GIGE_DEVICE | MV_USB_DEVICE, &devList);
        if (combinedRet == MV_OK) {
            combinedEnumerated = devList.nDeviceNum;
            for (unsigned int i = 0; i < devList.nDeviceNum; i++) {
                auto* info = devList.pDeviceInfo[i];
                if (!info) continue;
                std::string serial, name;
                if (info->nTLayerType == MV_GIGE_DEVICE) {
                    name = std::string((char*)info->SpecialInfo.stGigEInfo.chUserDefinedName);
                    serial = std::string((char*)info->SpecialInfo.stGigEInfo.chSerialNumber);
                } else {
                    name = std::string((char*)info->SpecialInfo.stUsb3VInfo.chUserDefinedName);
                    serial = std::string((char*)info->SpecialInfo.stUsb3VInfo.chSerialNumber);
                }
                DetectedDevice dev;
                dev.type = "hikvision";
                dev.index = i;
                dev.name = name;
                dev.serialNumber = serial;
                detectedDevices_.push_back(dev);
                fprintf(stderr, "[DeviceManager] 检测到海康设备[混合]: %s (SN: %s)\n",
                        name.c_str(), serial.c_str());
            }
        }
    }

    hikCountAfter = std::count_if(
        detectedDevices_.begin(), detectedDevices_.end(),
        [](const DetectedDevice& d) { return d.type == "hikvision"; });
    if (hikCountAfter == hikCountBefore) {
        if (!hikNoDeviceWarningShown_) {
            fprintf(stderr,
                "[海康诊断] SDK 已加载但未枚举到相机: GigE(ret=0x%08X,count=%u) "
                "USB(ret=0x%08X,count=%u) 混合(ret=0x%08X,count=%u)\n",
                (unsigned int)gigERet, gigEEnumerated,
                (unsigned int)usbRet, usbEnumerated,
                (unsigned int)combinedRet, combinedEnumerated);
            fprintf(stderr,
                "[海康诊断] 项目内 SDK/DLL 不能替代系统驱动。请先安装海康 MVS，"
                "使用 Driver Installation Tool 安装 USB3 Vision 驱动，并确认 MVS 客户端能看到相机。\n");
            hikNoDeviceWarningShown_ = true;
        }
    } else {
        hikNoDeviceWarningShown_ = false;
    }
#else
    if (!hikSdkBannerShown_) {
        fprintf(stderr,
            "[海康诊断] 当前程序编译时未找到海康 SDK，已禁用海康相机支持。"
            "请检查 CMake 配置输出和 lib/hikvision/lib/win64/MvCameraControl.lib。\n");
        hikSdkBannerShown_ = true;
    }
#endif
}

// ---- 槽位分配 ----

void DeviceManager::assignSlots() {
    // 读取配置中的优先设备类型
    std::string leftPreferred  = cfg_.devices.count("left")  ? cfg_.devices.at("left").preferredType  : "auto";
    std::string rightPreferred = cfg_.devices.count("right") ? cfg_.devices.at("right").preferredType : "auto";

    // 收集可用设备，按类型分组
    std::vector<DetectedDevice*> orbbecDevs, hikDevs;
    for (auto& d : detectedDevices_) {
        if (d.type == "orbbec") orbbecDevs.push_back(&d);
        else if (d.type == "hikvision") hikDevs.push_back(&d);
    }

    auto assignSlot = [&](const std::string& slotName, DetectedDevice* dev) {
        auto& slot = slots_[slotName];
        slot.deviceType = dev->type;
        slot.connected = false;

        if (dev->type == "orbbec") {
#ifndef NO_ORBBEC_CAMERA
            auto cam = std::make_unique<OrbbecCamera>();
            if (cam->open(dev->index, dev->serialNumber)) {
                // 检查是否和已有槽位的摄像头 serial 重复
                std::string sn = cam->getSerialNumber();
                bool dup = false;
                for (auto& kv : slots_) {
                    if (kv.first != slotName && kv.second.connected && kv.second.camera &&
                        kv.second.camera->getSerialNumber() == sn) {
                        fprintf(stderr, "[DeviceManager] %s 槽: 序列号 %s 与 %s 槽重复，跳过\n",
                                slotName.c_str(), sn.c_str(), kv.first.c_str());
                        dup = true;
                        break;
                    }
                }
                if (dup) return;
                slot.camera = std::move(cam);
                slot.connected = true;
                fprintf(stderr, "[DeviceManager] %s 槽: Orbbec %s (SN: %s)\n",
                        slotName.c_str(), dev->name.c_str(), sn.c_str());
            }
#endif
        } else if (dev->type == "hikvision") {
            auto cam = std::make_unique<HikCameraAdapter>(cfg_.camera);
            if (cam->open(dev->index, dev->serialNumber)) {
                std::string sn = cam->getSerialNumber();
                bool dup = false;
                for (auto& kv : slots_) {
                    if (kv.first != slotName && kv.second.connected && kv.second.camera &&
                        kv.second.camera->getSerialNumber() == sn) {
                        fprintf(stderr, "[DeviceManager] %s 槽: 序列号 %s 与 %s 槽重复，跳过\n",
                                slotName.c_str(), sn.c_str(), kv.first.c_str());
                        dup = true;
                        break;
                    }
                }
                if (dup) return;
                slot.camera = std::move(cam);
                slot.connected = true;
                fprintf(stderr, "[DeviceManager] %s 槽: Hikvision %s (SN: %s)\n",
                        slotName.c_str(), dev->name.c_str(), sn.c_str());
            }
        }
    };

    // 简单分配策略：先按配置偏好，再按检测顺序
    if (leftPreferred == "orbbec" && !orbbecDevs.empty()) {
        assignSlot("left", orbbecDevs[0]);
        orbbecDevs.erase(orbbecDevs.begin());
    } else if (leftPreferred == "hikvision" && !hikDevs.empty()) {
        assignSlot("left", hikDevs[0]);
        hikDevs.erase(hikDevs.begin());
    }

    if (rightPreferred == "orbbec" && !orbbecDevs.empty()) {
        assignSlot("right", orbbecDevs[0]);
        orbbecDevs.erase(orbbecDevs.begin());
    } else if (rightPreferred == "hikvision" && !hikDevs.empty()) {
        assignSlot("right", hikDevs[0]);
        hikDevs.erase(hikDevs.begin());
    }

    // auto 模式：填充剩余空槽
    if (!slots_["left"].connected) {
        if (!orbbecDevs.empty()) { assignSlot("left", orbbecDevs[0]); orbbecDevs.erase(orbbecDevs.begin()); }
        else if (!hikDevs.empty()) { assignSlot("left", hikDevs[0]); hikDevs.erase(hikDevs.begin()); }
    }
    if (!slots_["right"].connected) {
        if (!hikDevs.empty()) { assignSlot("right", hikDevs[0]); hikDevs.erase(hikDevs.begin()); }
        else if (!orbbecDevs.empty()) { assignSlot("right", orbbecDevs[0]); orbbecDevs.erase(orbbecDevs.begin()); }
    }
    // 第3个设备分配给 head
    if (!slots_["head"].connected) {
        if (!orbbecDevs.empty()) { assignSlot("head", orbbecDevs[0]); orbbecDevs.erase(orbbecDevs.begin()); }
        else if (!hikDevs.empty()) { assignSlot("head", hikDevs[0]); hikDevs.erase(hikDevs.begin()); }
    }

    for (auto& kv : slots_) {
        if (!kv.second.connected) {
            fprintf(stderr, "[DeviceManager] %s 槽: 无设备\n", kv.first.c_str());
        }
    }
}

// ---- 查询 ----

DeviceSlot* DeviceManager::getSlot(const std::string& position) {
    auto it = slots_.find(position);
    return it != slots_.end() ? &it->second : nullptr;
}

const DeviceSlot* DeviceManager::getSlot(const std::string& position) const {
    auto it = slots_.find(position);
    return it != slots_.end() ? &it->second : nullptr;
}

int DeviceManager::getOrbbecCount() const {
    int c = 0;
    for (auto& d : detectedDevices_) if (d.type == "orbbec") c++;
    return c;
}

int DeviceManager::getHikvisionCount() const {
    int c = 0;
    for (auto& d : detectedDevices_) if (d.type == "hikvision") c++;
    return c;
}

std::vector<std::string> DeviceManager::getSlotNames() const {
    std::vector<std::string> names;
    for (auto& kv : slots_) names.push_back(kv.first);
    return names;
}

// ---- 夹爪 ----

GripperSlot* DeviceManager::getGripperSlot(const std::string& position) {
    auto it = gripperSlots_.find(position);
    return it != gripperSlots_.end() ? &it->second : nullptr;
}

const GripperSlot* DeviceManager::getGripperSlot(const std::string& position) const {
    auto it = gripperSlots_.find(position);
    return it != gripperSlots_.end() ? &it->second : nullptr;
}

bool DeviceManager::swapManualGripperSlots() {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);
    auto leftIt = gripperSlots_.find("left");
    auto rightIt = gripperSlots_.find("right");
    if (leftIt == gripperSlots_.end() || rightIt == gripperSlots_.end()) return false;

    auto isSwappableManualSlot = [](const GripperSlot& slot) {
        return !slot.connected || slot.gripperType == "none" || slot.gripperType == "manual";
    };
    if (!isSwappableManualSlot(leftIt->second) || !isSwappableManualSlot(rightIt->second)) {
        fprintf(stderr, "[DeviceManager] 左右夹爪交换被拒绝：left=%s right=%s，仅允许交换手动夹爪槽\n",
                leftIt->second.gripperType.c_str(), rightIt->second.gripperType.c_str());
        return false;
    }

    using std::swap;
    swap(leftIt->second.gripperType, rightIt->second.gripperType);
    swap(leftIt->second.gripper, rightIt->second.gripper);
    swap(leftIt->second.connected, rightIt->second.connected);

    fprintf(stderr, "[DeviceManager] 已交换左右手动夹爪槽位\n");
    return true;
}

std::vector<std::string> DeviceManager::getGripperSlotNames() const {
    std::vector<std::string> names;
    for (auto& kv : gripperSlots_) names.push_back(kv.first);
    return names;
}

void DeviceManager::detectAndAssignGrippers() {
    detectedGrippers_.clear();

    // 清除旧分配
    for (auto& kv : gripperSlots_) {
        kv.second.connected = false;
        kv.second.gripperType = "none";
        kv.second.gripper.reset();
    }

    fprintf(stderr, "[DeviceManager] 扫描夹爪设备（通过 USB VID 检测左右手）...\n");

    // 通过 SetupAPI 枚举带 VID 的串口
    auto portInfos = UmiGripper::enumerateComPortsWithVid();

    // 筛选手动夹爪（VID=0x0E01 左手, VID=0x0E02 右手, PID=0xA001）
    struct GripperCandidate {
        std::string port;
        std::string side;  // "left" or "right"
    };
    std::vector<GripperCandidate> candidates;
    std::set<std::string> reservedEsp32CanPorts;

    for (auto& info : portInfos) {
        if (info.vid == 0x0E01 || info.vid == 0x0E02) {
            GripperCandidate gc;
            gc.port = info.portName;
            if (info.vid == 0x0E01) {
                gc.side = "left";
            } else {
                gc.side = "right";
            }
            candidates.push_back(gc);
            fprintf(stderr, "[DeviceManager] 检测到手动夹爪: %s (VID=0x%04X PID=0x%04X -> %s手)\n",
                info.portName.c_str(), info.vid, info.pid, gc.side.c_str());
        } else if (isLikelyEsp32CanBridgeVid(info.vid)) {
            reservedEsp32CanPorts.insert(info.portName);
            fprintf(stderr, "[DeviceManager] 检测到 ESP32-CAN 候选串口: %s (VID=0x%04X PID=0x%04X)\n",
                info.portName.c_str(), info.vid, info.pid);
        }
    }

    // 如果 SetupAPI 没找到，回退到逐个扫描串口并尝试打开
    if (!candidates.empty()) {
        for (const auto& info : portInfos) {
            if (isLikelyManualDataPortVid(info.vid)) {
                GripperCandidate gc;
                gc.port = info.portName;
                gc.side = "unknown";
                candidates.push_back(gc);
                fprintf(stderr, "[DeviceManager] manual gripper data port candidate: %s (VID=0x%04X PID=0x%04X)\n",
                    info.portName.c_str(), info.vid, info.pid);
            }
        }
    }

    if (candidates.empty()) {
        fprintf(stderr, "[DeviceManager] SetupAPI 未检测到夹爪 VID，回退到串口扫描...\n");
        auto ports = UmiGripper::scanSerialPorts();
        for (auto& port : ports) {
            if (reservedEsp32CanPorts.count(port) > 0) {
                fprintf(stderr, "[DeviceManager] 跳过 ESP32-CAN 候选串口的手动夹爪探测: %s\n", port.c_str());
                continue;
            }
            auto gripper = std::make_unique<UmiGripper>();
            if (gripper->open(port)) {
                GripperCandidate gc;
                gc.port = port;
                gc.side = gripper->getHandSide();
                candidates.push_back(gc);
                gripper->close();
                fprintf(stderr, "[DeviceManager] 串口扫描检测到夹爪: %s (%s手)\n",
                    port.c_str(), gc.side.c_str());
            }
        }
    }

    // 先分配手动夹爪槽位，再检测电动夹爪。
    // 新版手动夹爪可能同时暴露身份串口和数据串口；如果先扫描电动夹爪，
    // 数据串口容易被误判为 ESP32-CAN 候选，导致启动慢或槽位没有及时分配。
    std::set<std::string> assignedManualSidesBeforeElectric;
    for (auto& c : candidates) {
        if (!isManualSlotName(c.side) || assignedManualSidesBeforeElectric.count(c.side) > 0) {
            c.side = firstEmptyManualSlot(gripperSlots_, assignedManualSidesBeforeElectric);
        }
        if (c.side.empty()) {
            fprintf(stderr, "[DeviceManager] 手动夹爪没有可用槽位，跳过: %s\n", c.port.c_str());
            continue;
        }

        auto& slot = gripperSlots_[c.side];
        if (slot.connected) {
            assignedManualSidesBeforeElectric.insert(c.side);
            continue;
        }
        slot.gripperType = "manual";

        auto gripper = std::make_unique<UmiGripper>();
        fprintf(stderr, "[DeviceManager] 尝试打开手动夹爪候选: %s -> %s 槽\n",
                c.port.c_str(), c.side.c_str());
        if (gripper->open(c.port)) {
            DetectedGripper dg;
            dg.type = "manual";
            dg.port = c.port;
            dg.connected = true;
            detectedGrippers_.push_back(dg);

            slot.gripper = std::move(gripper);
            slot.connected = true;
            assignedManualSidesBeforeElectric.insert(c.side);
            fprintf(stderr, "[DeviceManager] %s 夹爪槽: 手动夹爪 (%s)\n",
                    c.side.c_str(), c.port.c_str());
        } else {
            fprintf(stderr, "[DeviceManager] 手动夹爪候选 %s 打开失败，未分配到 %s 槽\n",
                    c.port.c_str(), c.side.c_str());
        }
    }

    // 手动夹爪已经处理完，清空候选，避免后续旧分配循环重复打开串口。
    candidates.clear();

    std::set<std::string> usedPorts;
    std::vector<std::string> esp32CanPorts;
    for (const auto& info : portInfos) {
        if (isManualGripperVid(info.vid)) continue;
        if (usedPorts.count(info.portName)) continue;
        if (isLikelyEsp32CanBridgeVid(info.vid)) esp32CanPorts.push_back(info.portName);
    }

    // 尝试加载 CAN SDK 并检测电动夹爪
    fprintf(stderr, "[DeviceManager] 尝试检测 CAN 电动夹爪...\n");
    auto& canWrapper = ECanVciWrapper::sharedInstance();

    // 搜索 DLL 路径：exe目录下
    std::string exeDir = currentExecutableDirectory();

    bool canAvailable = false;
    if (canWrapper.load(exeDir)) {
        // 打印结构体大小，帮助诊断对齐问题
        fprintf(stderr, "[CAN] 结构体大小: CAN_OBJ=%zu INIT_CONFIG=%zu BOARD_INFO=%zu\n",
                sizeof(ECAN_CAN_OBJ), sizeof(ECAN_INIT_CONFIG), sizeof(ECAN_BOARD_INFO));

        if (canWrapper.openDevice(4, 0)) { // USBCAN2, device 0
            // 读取板卡信息确认适配器可用
            ECAN_BOARD_INFO boardInfo = {};
            if (canWrapper.readBoardInfo(boardInfo)) {
                fprintf(stderr, "[CAN] 板卡: HW=%u FW=%u 串号=%.20s CAN通道=%u\n",
                        boardInfo.hw_Version, boardInfo.fw_Version,
                        boardInfo.str_Serial_Num, boardInfo.can_Num);
            } else {
                fprintf(stderr, "[CAN] 读取板卡信息失败\n");
            }

            if (canWrapper.initCAN(0, 0x00, 0x14)) { // Channel 0, 1Mbps
                if (canWrapper.startCAN()) {
                    canAvailable = true;
                    fprintf(stderr, "[DeviceManager] CAN 适配器已打开 (通道0, 1Mbps)\n");
                } else {
                    fprintf(stderr, "[DeviceManager] CAN StartCAN 失败\n");
                    canWrapper.close();
                }
            } else {
                fprintf(stderr, "[DeviceManager] CAN InitCAN 失败\n");
                canWrapper.close();
            }
        } else {
            fprintf(stderr, "[DeviceManager] 未检测到 CAN 适配器（可能未连接）\n");
        }
    } else {
        fprintf(stderr, "[DeviceManager] ECanVci64.dll 未找到，跳过 CAN 电动夹爪检测\n");
    }

    usedPorts.clear();
    for (const auto& kv : gripperSlots_) {
        if (kv.second.connected && kv.second.gripper) {
            usedPorts.insert(kv.second.gripper->getPortName());
        }
    }

    // 电动夹爪：优先沿用 left/right 空槽；两个手动夹爪都已连接时，放入 extra 额外槽。
    std::string electricSlot;
    for (const auto& slotName : {std::string("left"), std::string("right"), std::string("extra")}) {
        auto it = gripperSlots_.find(slotName);
        if (it != gripperSlots_.end() && !it->second.connected) {
            electricSlot = slotName;
            break;
        }
    }
    if (!electricSlot.empty() && canAvailable) {
        auto gripper = std::make_unique<ElectricGripper>();
        if (gripper->openCAN(&canWrapper, 0x15)) {
            DetectedGripper dg;
            dg.type = "electric";
            dg.port = gripper->getPortName();
            dg.connected = true;
            detectedGrippers_.push_back(dg);
            gripperSlots_[electricSlot].gripperType = "electric";
            gripperSlots_[electricSlot].gripper = std::move(gripper);
            gripperSlots_[electricSlot].connected = true;
            fprintf(stderr, "[DeviceManager] %s 夹爪槽: 电动夹爪 (CAN)\n", electricSlot.c_str());
        } else {
            canWrapper.close();
            canAvailable = false;
        }
    }
    if (!electricSlot.empty() && !gripperSlots_[electricSlot].connected) {
        if (esp32CanPorts.empty()) {
            for (const auto& port : UmiGripper::scanSerialPorts()) {
                if (usedPorts.count(port)) continue;
                esp32CanPorts.push_back(port);
            }
        }
        for (const auto& port : esp32CanPorts) {
            auto gripper = std::make_unique<ElectricGripper>();
            if (!gripper->openSerialBridge(port, 115200, 0x15)) continue;

            DetectedGripper dg;
            dg.type = "electric";
            dg.port = gripper->getPortName();
            dg.connected = true;
            detectedGrippers_.push_back(dg);
            gripperSlots_[electricSlot].gripperType = "electric";
            gripperSlots_[electricSlot].gripper = std::move(gripper);
            gripperSlots_[electricSlot].connected = true;
            fprintf(stderr, "[DeviceManager] %s 夹爪槽: 电动夹爪 (ESP32-CAN 串口桥 %s)\n",
                    electricSlot.c_str(), port.c_str());
            break;
        }
    }
}

std::string DeviceManager::toJson() const {
    std::lock_guard<std::mutex> lock(detectedInfoMutex_);
    std::set<std::string> detectedCameraSerials;
    for (const auto& d : detectedDevices_) {
        if (!d.serialNumber.empty()) detectedCameraSerials.insert(d.serialNumber);
    }

    std::set<std::string> detectedGripperPorts;
    for (const auto& g : detectedGrippers_) {
        if (g.connected && !g.port.empty()) detectedGripperPorts.insert(g.port);
    }
    uint64_t nowUs = std::chrono::duration_cast<std::chrono::microseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();

    std::string json = "{\"devices\":[";
    for (size_t i = 0; i < detectedDevices_.size(); i++) {
        auto& d = detectedDevices_[i];
        if (i > 0) json += ",";
        json += "{\"type\":\"" + ::json::escape(d.type) + "\",\"name\":\"" +
                ::json::escape(d.name) + "\",\"serial\":\"" +
                ::json::escape(d.serialNumber) + "\"}";
    }
    json += "],\"slots\":{";
    bool first = true;
    for (auto& kv : slots_) {
        if (!first) json += ",";
        first = false;
        bool slotConnected = kv.second.connected && kv.second.camera;
        std::string slotSerial;
        if (slotConnected) {
            slotSerial = kv.second.camera->getSerialNumber();
            // Orbbec 热插拔断开时已经在 refreshDetectedCameras() 里释放旧对象，
            // 这里不再强依赖序列号二次校验，避免“已检测到设备但页面仍显示未连接”。
            if (kv.second.deviceType == "orbbec") {
                slotConnected = kv.second.camera->isOpened();
            } else {
                slotConnected = !slotSerial.empty() && detectedCameraSerials.count(slotSerial) > 0;
            }
        }
        json += "\"" + kv.first + "\":{\"type\":\"" + ::json::escape(kv.second.deviceType) +
                "\",\"connected\":" + (slotConnected ? "true" : "false");
        if (slotConnected && kv.second.camera) {
            json += ",\"name\":\"" + ::json::escape(kv.second.camera->getDeviceName()) +
                    "\",\"serial\":\"" + ::json::escape(slotSerial) + "\"";
            json += ",\"hasDepth\":" + std::string(kv.second.camera->hasDepthStream() ? "true" : "false");
            json += ",\"hasIMU\":false";
            json += ",\"hasIR\":" + std::string(kv.second.camera->hasIRStream() ? "true" : "false");
        }
        json += "}";
    }
    json += "},\"grippers\":[";
    for (size_t i = 0; i < detectedGrippers_.size(); i++) {
        if (i > 0) json += ",";
        auto& g = detectedGrippers_[i];
        json += "{\"type\":\"" + ::json::escape(g.type) + "\",\"port\":\"" +
                ::json::escape(g.port) +
                "\",\"connected\":" + (g.connected ? "true" : "false") + "}";
    }
    json += "],\"gripperSlots\":{";
    bool gfirst = true;
    for (auto& kv : gripperSlots_) {
        if (!gfirst) json += ",";
        gfirst = false;
        bool gripperConnected = kv.second.connected && kv.second.gripper;
        std::string gripperPort;
        if (gripperConnected) {
            gripperPort = kv.second.gripper->getPortName();
            if (kv.second.gripperType == "manual") {
                gripperConnected = kv.second.gripper->isConnected();
            } else if (kv.second.gripperType == "electric") {
                auto* electric = dynamic_cast<ElectricGripper*>(kv.second.gripper.get());
                gripperConnected = electric && electric->isConnected()
                    && electric->hasRecentMotorResponse(nowUs, 5000000ULL);
            }
        }
        json += "\"" + kv.first + "\":{\"type\":\"" + ::json::escape(kv.second.gripperType) +
                "\",\"connected\":" + (gripperConnected ? "true" : "false");
        if (gripperConnected && kv.second.gripper) {
            json += ",\"port\":\"" + ::json::escape(gripperPort) + "\"";
        }
        json += "}";
    }
    json += "}}";
    return json;
}
