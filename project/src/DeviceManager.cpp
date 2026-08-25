// DeviceManager.cpp - 设备管理器实现（Linux 版）
// 检测海康/Orbbec相机和夹爪，分配左右槽位

#include "DeviceManager.hpp"
#include "HikCameraAdapter.hpp"
#include <set>
#include "OrbbecCamera.hpp"
#include "UmiGripper.hpp"
#include "ElectricGripper.hpp"
#include "ECanVciWrapper.hpp"

#include <cstdio>
#include <algorithm>
#include <chrono>
#include <unistd.h>
#include <linux/limits.h>

#ifndef NO_ORBBEC_CAMERA
#include <libobsensor/ObSensor.h>
#include <libobsensor/h/Context.h>
#include <libobsensor/h/Device.h>
#include <libobsensor/h/Error.h>
#endif

#ifndef NO_HIK_CAMERA
#include "MvCameraControl.h"
#endif

// Linux 下获取可执行文件所在目录
static std::string getExeDir() {
    char path[PATH_MAX];
    ssize_t len = readlink("/proc/self/exe", path, sizeof(path) - 1);
    if (len > 0) {
        path[len] = '\0';
        char* lastSlash = strrchr(path, '/');
        if (lastSlash) *lastSlash = '\0';
        return std::string(path);
    }
    return ".";
}

// ---- 构造/析构 ----

DeviceManager::DeviceManager(const Config& cfg) : cfg_(cfg) {
    slots_["left"]  = DeviceSlot("left");
    slots_["right"] = DeviceSlot("right");
    slots_["head"]  = DeviceSlot("head");
    gripperSlots_["left"]  = GripperSlot("left");
    gripperSlots_["right"] = GripperSlot("right");
    gripperSlots_["extra"] = GripperSlot("extra");
}

DeviceManager::~DeviceManager() = default;

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
    fprintf(stderr, "[DeviceManager] 刷新相机检测列表（不重建槽位）...\n");

    detectedDevices_.clear();
    detectOrbbecDevices();
    detectHikvisionDevices();

    std::set<std::string> detectedSerials;
    for (const auto& d : detectedDevices_) {
        if (!d.serialNumber.empty()) detectedSerials.insert(d.serialNumber);
    }
    for (auto& kv : slots_) {
        auto& slot = kv.second;
        if (!slot.connected || !slot.camera) continue;
        std::string slotSerial = slot.camera->getSerialNumber();
        if (!slotSerial.empty() && detectedSerials.count(slotSerial) > 0) continue;

        fprintf(stderr, "[DeviceManager] %s slot camera is no longer detected, releasing slot (SN=%s)\n",
                kv.first.c_str(), slotSerial.c_str());
        slot.camera->stopStreaming();
        slot.camera->close();
        // 清理过期的退役相机（保留最近 10 个）
        if (retiredCameras_.size() > 10) {
            retiredCameras_.erase(retiredCameras_.begin(), retiredCameras_.begin() + (retiredCameras_.size() - 10));
        }
        retiredCameras_.push_back(std::move(slot.camera));
        slot.connected = false;
        slot.deviceType = "none";
    }

    fprintf(stderr, "[DeviceManager] 当前检测到 %d 个相机设备 (%d Orbbec, %d Hikvision)\n",
            (int)detectedDevices_.size(), getOrbbecCount(), getHikvisionCount());
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
        if (portStillPresent && gripperAlive) continue;

        fprintf(stderr, "[DeviceManager] %s 手动夹爪已断开，等待重新连接 (%s)\n",
                kv.first.c_str(), port.c_str());
        slot.gripper->close();
        slot.connected = false;
    }

    for (auto& kv : gripperSlots_) {
        const auto& slot = kv.second;
        auto* electric = dynamic_cast<ElectricGripper*>(slot.gripper.get());
        if (slot.connected && slot.gripperType == "electric" && electric && electric->isConnected()) {
            ElectricGripperFullState fullState;
            electric->getFullState(fullState);
            bool recentlyResponsive = fullState.hasData && fullState.timestamp > 0
                && nowUs >= fullState.timestamp
                && (nowUs - fullState.timestamp) <= 5000000ULL;
            if (!recentlyResponsive) continue;

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
    auto portInfos = UmiGripper::enumerateComPortsWithVid();
    std::map<std::string, std::string> manualPortsBySide;
    for (const auto& info : portInfos) {
        if (info.vid == 0x0E01) manualPortsBySide["left"] = info.portName;
        else if (info.vid == 0x0E02) manualPortsBySide["right"] = info.portName;
    }

    bool changed = false;
    for (const auto& side : {std::string("left"), std::string("right")}) {
        auto& slot = gripperSlots_[side];
        if (slot.connected) continue;
        auto it = manualPortsBySide.find(side);
        if (it == manualPortsBySide.end()) continue;

        UmiGripper* gripper = dynamic_cast<UmiGripper*>(slot.gripper.get());
        if (!gripper) {
            auto fresh = std::make_unique<UmiGripper>();
            gripper = fresh.get();
            slot.gripper = std::move(fresh);
        }
        if (gripper->open(it->second)) {
            slot.gripperType = "manual";
            slot.connected = true;
            changed = true;
            fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 夹爪槽: 手动夹爪 (%s)\n",
                    side.c_str(), it->second.c_str());
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

    bool canAvailable = false;
    auto& canWrapper = ECanVciWrapper::sharedInstance();
    if (!allowElectricScan) return changed;

    std::string exeDir = getExeDir();
    if (canWrapper.load(exeDir) || canWrapper.load("")) {
        if (canWrapper.openDevice(4, 0) && canWrapper.initCAN(0, 0x00, 0x14) && canWrapper.startCAN()) {
            canAvailable = true;
        } else {
            canWrapper.close();
        }
    }
    if (!canAvailable) return changed;

    std::string electricSlot;
    for (const auto& slotName : {std::string("left"), std::string("right"), std::string("extra")}) {
        auto it = gripperSlots_.find(slotName);
        if (it != gripperSlots_.end() && !it->second.connected) {
            electricSlot = slotName;
            break;
        }
    }
    if (electricSlot.empty()) return changed;

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
        fprintf(stderr, "[DeviceManager] 热插拔补挂 %s 夹爪槽: 电动夹爪 (CAN)\n", electricSlot.c_str());
        changed = true;
    }
    return changed;
}

void DeviceManager::detectOrbbecDevices() {
#ifndef NO_ORBBEC_CAMERA
    // 直接在主进程中调用 Orbbec SDK 进行设备检测。
    // 之前的 fork() 方案会导致 USB 状态在父子进程间不一致，
    // 后续主进程打开设备时容易失败。
    fprintf(stderr, "[DeviceManager] 检测 Orbbec 设备...\n");

    ob_error* err = nullptr;
    auto* ctx = ob_create_context(&err);
    if (err || !ctx) {
        fprintf(stderr, "[DeviceManager] Orbbec 创建 Context 失败: %s\n",
                err ? ob_error_get_message(err) : "unknown");
        if (err) ob_delete_error(err);
        return;
    }

    auto* devList = ob_query_device_list(ctx, &err);
    if (err || !devList) {
        fprintf(stderr, "[DeviceManager] Orbbec 查询设备列表失败: %s\n",
                err ? ob_error_get_message(err) : "unknown");
        if (err) ob_delete_error(err);
        ob_delete_context(ctx, &err);
        if (err) ob_delete_error(err);
        return;
    }

    int count = ob_device_list_get_device_count(devList, &err);
    if (err) count = 0;

    for (int i = 0; i < count && !err; i++) {
        auto* device = ob_device_list_get_device(devList, i, &err);
        if (err) continue;

        auto* info = ob_device_get_device_info(device, &err);
        if (!err && info) {
            const char* name = ob_device_info_get_name(info, &err);
            const char* sn = (err ? "" : ob_device_info_get_serial_number(info, &err));
            if (!err && name && sn) {
                DetectedDevice dev;
                dev.type = "orbbec";
                dev.index = i;
                dev.name = name;
                dev.serialNumber = sn;
                detectedDevices_.push_back(dev);
                fprintf(stderr, "[DeviceManager] 检测到 Orbbec 设备: %s (SN: %s)\n",
                        dev.name.c_str(), dev.serialNumber.c_str());
            }
            ob_delete_device_info(info, &err);
        }
        if (err) ob_delete_error(err);
        err = nullptr;
    }

    ob_delete_device_list(devList, &err);
    if (err) ob_delete_error(err);
    ob_delete_context(ctx, &err);
    if (err) ob_delete_error(err);

    fprintf(stderr, "[DeviceManager] Orbbec 检测完成，发现 %d 个设备\n", count);
#else
    fprintf(stderr, "[DeviceManager] Orbbec SDK 未安装，跳过检测\n");
#endif
}

void DeviceManager::detectHikvisionDevices() {
#ifndef NO_HIK_CAMERA
    std::set<std::string> seenSerials;
    std::set<std::string> seenNames;

    auto enumByTransport = [&](unsigned int transportType, const char* transportName) {
        MV_CC_DEVICE_INFO_LIST devList;
        memset(&devList, 0, sizeof(devList));
        int ret = MV_CC_EnumDevices(transportType, &devList);
        if (ret != MV_OK || devList.nDeviceNum == 0) return;

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

            if (seenSerials.count(serial) || (!name.empty() && seenNames.count(name))) {
                fprintf(stderr, "[DeviceManager] 跳过重复海康设备[%s]: %s (SN: %s)\n",
                        transportName, name.c_str(), serial.c_str());
                continue;
            }
            seenSerials.insert(serial);
            if (!name.empty()) seenNames.insert(name);

            DetectedDevice dev;
            dev.type = "hikvision";
            dev.index = i;
            dev.name = name;
            dev.serialNumber = serial;

            detectedDevices_.push_back(dev);
            fprintf(stderr, "[DeviceManager] 检测到海康设备[%s]: %s (SN: %s, idx=%d)\n",
                    transportName, dev.name.c_str(), dev.serialNumber.c_str(), dev.index);
        }
    };

    enumByTransport(MV_GIGE_DEVICE, "GigE");
    enumByTransport(MV_USB_DEVICE, "USB");

    if (detectedDevices_.empty()) {
        MV_CC_DEVICE_INFO_LIST devList;
        memset(&devList, 0, sizeof(devList));
        int ret = MV_CC_EnumDevices(MV_GIGE_DEVICE | MV_USB_DEVICE, &devList);
        if (ret == MV_OK) {
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
#else
    fprintf(stderr, "[DeviceManager] 海康 SDK 未安装，跳过检测\n");
#endif
}

// ---- 槽位分配 ----

void DeviceManager::assignSlots() {
    std::string leftPreferred  = cfg_.devices.count("left")  ? cfg_.devices.at("left").preferredType  : "auto";
    std::string rightPreferred = cfg_.devices.count("right") ? cfg_.devices.at("right").preferredType : "auto";

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

    if (!slots_["left"].connected) {
        if (!orbbecDevs.empty()) { assignSlot("left", orbbecDevs[0]); orbbecDevs.erase(orbbecDevs.begin()); }
        else if (!hikDevs.empty()) { assignSlot("left", hikDevs[0]); hikDevs.erase(hikDevs.begin()); }
    }
    if (!slots_["right"].connected) {
        if (!hikDevs.empty()) { assignSlot("right", hikDevs[0]); hikDevs.erase(hikDevs.begin()); }
        else if (!orbbecDevs.empty()) { assignSlot("right", orbbecDevs[0]); orbbecDevs.erase(orbbecDevs.begin()); }
    }
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

// ---- 槽位操作 ----

bool DeviceManager::swapSlots(const std::string& pos1, const std::string& pos2) {
    auto it1 = slots_.find(pos1);
    auto it2 = slots_.find(pos2);
    if (it1 == slots_.end() || it2 == slots_.end()) return false;

    if (it1->second.connected && it1->second.camera) it1->second.camera->stopStreaming();
    if (it2->second.connected && it2->second.camera) it2->second.camera->stopStreaming();

    std::swap(it1->second.deviceType, it2->second.deviceType);
    std::swap(it1->second.camera, it2->second.camera);
    std::swap(it1->second.connected, it2->second.connected);

    if (it1->second.connected && it1->second.camera) it1->second.camera->startStreaming();
    if (it2->second.connected && it2->second.camera) it2->second.camera->startStreaming();

    fprintf(stderr, "[DeviceManager] 已交换 %s/%s 槽位\n", pos1.c_str(), pos2.c_str());
    return true;
}

bool DeviceManager::assignCamera(const std::string& serial, const std::string& targetSlot) {
    if (slots_.find(targetSlot) == slots_.end()) return false;

    struct SlotCam { std::string slot; std::string serial; std::string type;
                     std::unique_ptr<ICamera> cam; bool connected; };
    std::vector<SlotCam> cams;
    for (auto& kv : slots_) {
        if (kv.second.connected && kv.second.camera) {
            kv.second.camera->stopStreaming();
            cams.push_back({kv.first, kv.second.camera->getSerialNumber(),
                            kv.second.deviceType, std::move(kv.second.camera), kv.second.connected});
        }
        kv.second.connected = false;
        kv.second.camera.reset();
        kv.second.deviceType.clear();
    }

    SlotCam* targetCam = nullptr;
    for (auto& c : cams) {
        if (c.serial == serial) { targetCam = &c; break; }
    }
    if (!targetCam) {
        fprintf(stderr, "[DeviceManager] 未找到序列号 %s 的摄像头\n", serial.c_str());
        for (auto& c : cams) {
            auto& slot = slots_[c.slot];
            slot.deviceType = c.type;
            slot.camera = std::move(c.cam);
            slot.connected = c.connected;
            if (slot.connected && slot.camera) slot.camera->startStreaming();
        }
        return false;
    }

    auto& tSlot = slots_[targetSlot];
    tSlot.deviceType = targetCam->type;
    tSlot.camera = std::move(targetCam->cam);
    tSlot.connected = targetCam->connected;
    targetCam->slot = targetSlot;

    std::vector<std::string> freeSlots = {"left", "right"};
    for (auto& c : cams) {
        if (c.slot == targetSlot) continue;
        for (auto& fs : freeSlots) {
            if (fs == targetSlot) continue;
            auto& slot = slots_[fs];
            if (!slot.connected) {
                slot.deviceType = c.type;
                slot.camera = std::move(c.cam);
                slot.connected = c.connected;
                break;
            }
        }
    }

    for (auto& kv : slots_) {
        if (kv.second.connected && kv.second.camera) {
            kv.second.camera->startStreaming();
            fprintf(stderr, "[DeviceManager] %s 槽: %s (SN: %s)\n",
                    kv.first.c_str(), kv.second.deviceType.c_str(),
                    kv.second.camera->getSerialNumber().c_str());
        }
    }
    return true;
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

std::vector<std::string> DeviceManager::getGripperSlotNames() const {
    std::vector<std::string> names;
    for (auto& kv : gripperSlots_) names.push_back(kv.first);
    return names;
}

void DeviceManager::detectAndAssignGrippers() {
    detectedGrippers_.clear();

    for (auto& kv : gripperSlots_) {
        kv.second.connected = false;
        kv.second.gripperType = "none";
        kv.second.gripper.reset();
    }

    fprintf(stderr, "[DeviceManager] 扫描夹爪设备（通过 USB VID 检测左右手）...\n");

    auto portInfos = UmiGripper::enumerateComPortsWithVid();

    struct GripperCandidate {
        std::string port;
        std::string side;
    };
    std::vector<GripperCandidate> candidates;

    for (auto& info : portInfos) {
        if (info.vid == 0x0E01 || info.vid == 0x0E02) {
            GripperCandidate gc;
            gc.port = info.portName;
            gc.side = (info.vid == 0x0E01) ? "left" : "right";
            candidates.push_back(gc);
            fprintf(stderr, "[DeviceManager] 检测到手动夹爪: %s (VID=0x%04X PID=0x%04X -> %s手)\n",
                info.portName.c_str(), info.vid, info.pid, gc.side.c_str());
        }
    }

    if (candidates.empty()) {
        fprintf(stderr, "[DeviceManager] VID 未检测到夹爪，回退到串口扫描...\n");
        auto ports = UmiGripper::scanSerialPorts();
        for (auto& port : ports) {
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

    std::set<std::string> usedPorts;
    for (auto& c : candidates) usedPorts.insert(c.port);

    // 尝试电动夹爪
    fprintf(stderr, "[DeviceManager] 尝试检测 CAN 电动夹爪...\n");
    auto& canWrapper = ECanVciWrapper::sharedInstance();

    std::string exeDir = getExeDir();
    bool canAvailable = false;
    if (canWrapper.load(exeDir)) {
        fprintf(stderr, "[CAN] 结构体大小: CAN_OBJ=%zu INIT_CONFIG=%zu BOARD_INFO=%zu\n",
                sizeof(ECAN_CAN_OBJ), sizeof(ECAN_INIT_CONFIG), sizeof(ECAN_BOARD_INFO));

        if (canWrapper.openDevice(4, 0)) {
            ECAN_BOARD_INFO boardInfo = {};
            if (canWrapper.readBoardInfo(boardInfo)) {
                fprintf(stderr, "[CAN] 板卡: HW=%u FW=%u 串号=%.20s CAN通道=%u\n",
                        boardInfo.hw_Version, boardInfo.fw_Version,
                        boardInfo.str_Serial_Num, boardInfo.can_Num);
            }
            if (canWrapper.initCAN(0, 0x00, 0x14)) {
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
        fprintf(stderr, "[DeviceManager] CAN SDK .so 未找到，跳过 CAN 电动夹爪检测\n");
    }

    for (auto& c : candidates) {
        auto& slot = gripperSlots_[c.side];
        slot.gripperType = "manual";

        auto gripper = std::make_unique<UmiGripper>();
        if (gripper->open(c.port)) {
            DetectedGripper dg;
            dg.type = "manual";
            dg.port = c.port;
            dg.connected = true;
            detectedGrippers_.push_back(dg);

            slot.gripper = std::move(gripper);
            slot.connected = true;
            fprintf(stderr, "[DeviceManager] %s 夹爪槽: 手动夹爪 (%s, VID固定)\n",
                    c.side.c_str(), c.port.c_str());
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
        json += "{\"type\":\"" + d.type + "\",\"name\":\"" + d.name +
                "\",\"serial\":\"" + d.serialNumber + "\"}";
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
            if (kv.second.deviceType == "orbbec") {
                slotConnected = kv.second.camera->isOpened();
            } else {
                slotConnected = !slotSerial.empty() && detectedCameraSerials.count(slotSerial) > 0;
            }
        }
        json += "\"" + kv.first + "\":{\"type\":\"" + kv.second.deviceType +
                "\",\"connected\":" + (slotConnected ? "true" : "false");
        if (slotConnected && kv.second.camera) {
            json += ",\"name\":\"" + kv.second.camera->getDeviceName() +
                    "\",\"serial\":\"" + slotSerial + "\"";
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
        json += "{\"type\":\"" + g.type + "\",\"port\":\"" + g.port +
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
                gripperConnected = !gripperPort.empty() && detectedGripperPorts.count(gripperPort) > 0;
            } else if (kv.second.gripperType == "electric") {
                auto* electric = dynamic_cast<ElectricGripper*>(kv.second.gripper.get());
                ElectricGripperFullState fullState;
                if (electric) electric->getFullState(fullState);
                gripperConnected = electric && electric->isConnected()
                    && fullState.hasData && fullState.timestamp > 0
                    && nowUs >= fullState.timestamp
                    && (nowUs - fullState.timestamp) <= 5000000ULL;
            }
        }
        json += "\"" + kv.first + "\":{\"type\":\"" + kv.second.gripperType +
                "\",\"connected\":" + (gripperConnected ? "true" : "false");
        if (gripperConnected && kv.second.gripper) {
            json += ",\"port\":\"" + gripperPort + "\"";
        }
        json += "}";
    }
    json += "}}";
    return json;
}
