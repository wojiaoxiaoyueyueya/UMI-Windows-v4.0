// HikCamera.cpp - 海康工业相机采集实现
// 支持多实例：每个 HikCamera 打开指定 index 的设备，帧缓冲区独立

#include "HikCamera.hpp"
#ifndef NO_HIK_CAMERA
#include <MvCameraControl.h>
#include <set>
#include <string>
#endif
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <chrono>
#include <deque>
#include <mutex>

#ifndef NO_HIK_CAMERA

// 海康 MVS 的设备枚举、打开和关闭会访问共享的 USB 传输层。
// 多台相机同时重连时必须串行执行，否则一个句柄正在关闭时另一个线程枚举，
// 可能得到忙碌设备或已经失效的设备信息。
static std::mutex g_hikLifecycleMutex;

static void logHikParamResult(const char* name, int ret) {
    if (ret == MV_OK) return;
    // 0x80000100~0x800001FF 是海康 GenICam 节点级错误（节点不存在/不可写/枚举值无效）。
    // 多数工业相机只是不支持个别参数节点（如 AutoExposureTimeUpperLimit / GammaSelector），
    // 不影响 MV_CC_StartGrabbing 取流。这里每个参数只提示一次，避免刷屏和“失败”字样误导。
    static std::set<std::string> reported;
    if (!reported.insert(name).second) return;
    bool nodeLevel = (ret >= 0x80000100 && ret <= 0x800001FF);
    fprintf(stderr, "[海康相机] 参数 %s %s: 0x%x (不影响取流)\n",
            name, nodeLevel ? "当前型号不支持，已跳过" : "设置失败", ret);
}

static void setHikEnumString(void* handle, const char* key, const char* value) {
    int ret = MV_CC_SetEnumValueByString(handle, key, value);
    logHikParamResult(key, ret);
}

static void setHikFloat(void* handle, const char* key, double value) {
    int ret = MV_CC_SetFloatValue(handle, key, (float)value);
    logHikParamResult(key, ret);
}

static void setHikInt(void* handle, const char* key, int value) {
    int ret = MV_CC_SetIntValue(handle, key, (unsigned int)std::max(0, value));
    logHikParamResult(key, ret);
}

static void applyHikHardwareControls(void* handle, const CameraControlParams& params) {
    if (!handle) return;
    setHikEnumString(handle, "ExposureAuto", params.exposureAuto ? "Continuous" : "Off");
    if (params.exposureUpper > 0) {
        setHikFloat(handle, "AutoExposureTimeUpperLimit", params.exposureUpper);
        setHikInt(handle, "AutoExposureTimeUpper", (int)params.exposureUpper);
    }
    if (!params.exposureAuto && params.exposureTime > 0) {
        setHikFloat(handle, "ExposureTime", params.exposureTime);
    }
    setHikEnumString(handle, "GainAuto", params.gainAuto ? "Continuous" : "Off");
    if (!params.gainAuto && params.gain >= 0) {
        setHikFloat(handle, "Gain", params.gain);
    }
    setHikEnumString(handle, "BalanceWhiteAuto", params.balanceWhiteAuto ? "Continuous" : "Off");
    // Gamma、锐化和降噪统一在 HTTP 图像管线中处理，保证预览与录制结果一致，
    // 同时避免 SDK 与软件层重复增强后放大暗部噪点。
}

// 从鱼眼重映射的有效像素中寻找保持原始宽高比的最大居中区域。
// 将该区域缩放回输出尺寸后，画面能够铺满且不会留下黑色边缘。
static cv::Rect findCenteredValidCrop(const cv::Mat& validMask) {
    if (validMask.empty()) return cv::Rect();
    const int width = validMask.cols;
    const int height = validMask.rows;
    for (int permille = 1000; permille >= 550; permille -= 5) {
        int cropWidth = std::max(2, width * permille / 1000);
        int cropHeight = std::max(2, height * permille / 1000);
        cropWidth -= cropWidth % 2;
        cropHeight -= cropHeight % 2;
        cv::Rect candidate((width - cropWidth) / 2, (height - cropHeight) / 2,
                           cropWidth, cropHeight);
        if (cv::countNonZero(validMask(candidate)) == candidate.area()) return candidate;
    }
    return cv::Rect(0, 0, width, height);
}

// 每台相机维护独立的有界队列。短时间的CPU调度抖动不会再直接覆盖上一帧，
// 同时限制队列长度，避免处理速度长期不足时内存不断增长。
struct HikCamera::RawFrameBuffer {
    struct FramePacket {
        std::vector<uint8_t> data;
        int width = 0;
        int height = 0;
        unsigned int pixelType = 0;
        size_t frameLen = 0;
        unsigned int frameNumber = 0;
        int64_t hostTimestamp = 0;
        unsigned int lostPackets = 0;
    };

    static constexpr size_t MAX_READY_FRAMES = 8;
    std::mutex mutex;
    std::deque<FramePacket> readyFrames;
    std::deque<FramePacket> freeFrames;
    uint64_t callbackFrames = 0;
    uint64_t consumedFrames = 0;
    uint64_t sourceFrameGaps = 0;
    uint64_t queueDrops = 0;
    size_t maxQueueDepth = 0;
    unsigned int lastFrameNumber = 0;
    bool hasFrameNumber = false;
};

static void __stdcall imageCallback(unsigned char* pData, MV_FRAME_OUT_INFO_EX* pFrameInfo, void* pUser) {
    if(!pData || !pFrameInfo || !pUser) return;
    auto* buf = static_cast<HikCamera::RawFrameBuffer*>(pUser);
    try {
        HikCamera::RawFrameBuffer::FramePacket packet;
        {
            std::lock_guard<std::mutex> lock(buf->mutex);
            if (!buf->freeFrames.empty()) {
                packet = std::move(buf->freeFrames.front());
                buf->freeFrames.pop_front();
            }
        }

        size_t dataSize = pFrameInfo->nFrameLen;
        packet.data.resize(dataSize);
        memcpy(packet.data.data(), pData, dataSize);
        packet.width = pFrameInfo->nWidth;
        packet.height = pFrameInfo->nHeight;
        packet.pixelType = pFrameInfo->enPixelType;
        packet.frameLen = dataSize;
        packet.frameNumber = pFrameInfo->nFrameNum;
        packet.hostTimestamp = pFrameInfo->nHostTimeStamp;
        packet.lostPackets = pFrameInfo->nLostPacket;

        std::lock_guard<std::mutex> lock(buf->mutex);
        buf->callbackFrames++;
        if (buf->hasFrameNumber && packet.frameNumber > buf->lastFrameNumber + 1) {
            buf->sourceFrameGaps += packet.frameNumber - buf->lastFrameNumber - 1;
        }
        buf->lastFrameNumber = packet.frameNumber;
        buf->hasFrameNumber = true;

        if (buf->readyFrames.size() >= HikCamera::RawFrameBuffer::MAX_READY_FRAMES) {
            buf->freeFrames.push_back(std::move(buf->readyFrames.front()));
            buf->readyFrames.pop_front();
            buf->queueDrops++;
        }
        buf->readyFrames.push_back(std::move(packet));
        buf->maxQueueDepth = std::max(buf->maxQueueDepth, buf->readyFrames.size());
    } catch (...) {
        fprintf(stderr, "[海康相机] 帧回调异常\n");
    }
}

HikCamera::HikCamera(const CameraConfig& cfg) : handle_(nullptr), opened_(false), cfg_(cfg) {
    rawFrame_ = std::make_unique<RawFrameBuffer>();
}

HikCamera::~HikCamera() { close(); }

bool HikCamera::open(int index, const std::string& targetSerial) {
    std::lock_guard<std::mutex> lifecycleLock(g_hikLifecycleMutex);
    deviceIndex_ = index;
    resetFrameState();

    MV_CC_DEVICE_INFO_LIST deviceList;
    memset(&deviceList, 0, sizeof(deviceList));
    int ret = MV_CC_EnumDevices(MV_GIGE_DEVICE | MV_USB_DEVICE, &deviceList);
    if(ret != MV_OK) { fprintf(stderr, "[海康相机] 枚举设备失败: 0x%x\n", ret); return false; }
    if(deviceList.nDeviceNum == 0) { fprintf(stderr, "[海康相机] 未找到任何设备\n"); return false; }
    if (deviceList.nDeviceNum >= 2) multiCameraMode_ = true;

    // 如果指定了 serial，按 serial 查找设备；否则用 index
    int targetIndex = -1;
    if (!targetSerial.empty()) {
        for (unsigned int i = 0; i < deviceList.nDeviceNum; i++) {
            auto* info = deviceList.pDeviceInfo[i];
            if (!info) continue;
            std::string sn;
            if (info->nTLayerType == MV_GIGE_DEVICE)
                sn = std::string((char*)info->SpecialInfo.stGigEInfo.chSerialNumber);
            else
                sn = std::string((char*)info->SpecialInfo.stUsb3VInfo.chSerialNumber);
            if (sn == targetSerial) {
                targetIndex = (int)i;
                fprintf(stderr, "[海康相机] 按 serial '%s' 找到设备索引 %d\n", targetSerial.c_str(), i);
                break;
            }
        }
        if (targetIndex < 0) {
            fprintf(stderr, "[海康相机] 未找到 serial='%s' 的设备\n", targetSerial.c_str());
            return false;
        }
    } else {
        if ((unsigned int)index >= deviceList.nDeviceNum) {
            fprintf(stderr, "[海康相机] 设备索引 %d 超出范围 (共 %u 个设备)\n", index, deviceList.nDeviceNum);
            return false;
        }
        targetIndex = index;
    }

    fprintf(stderr, "[海康相机] 发现 %d 个设备，打开索引 %d\n", deviceList.nDeviceNum, targetIndex);

    ret = MV_CC_CreateHandle(&handle_, deviceList.pDeviceInfo[targetIndex]);
    if(ret != MV_OK) { fprintf(stderr, "[海康相机] 创建句柄失败: 0x%x\n", ret); return false; }

    ret = MV_CC_OpenDevice(handle_);
    if(ret != MV_OK) {
        fprintf(stderr, "[海康相机] 独占打开失败: 0x%x, 尝试抢占模式...\n", ret);
        ret = MV_CC_OpenDevice(handle_, MV_ACCESS_ExclusiveWithSwitch, 0);
        if(ret != MV_OK) {
            fprintf(stderr, "[海康相机] 抢占打开也失败: 0x%x\n", ret);
            MV_CC_DestroyHandle(handle_); handle_ = nullptr; return false;
        }
    }

    MV_CC_DEVICE_INFO* pInfo = deviceList.pDeviceInfo[targetIndex];
    if(pInfo->nTLayerType == MV_GIGE_DEVICE) {
        unsigned int ip = pInfo->SpecialInfo.stGigEInfo.nCurrentIp;
        fprintf(stderr, "[海康相机] GigE IP: %d.%d.%d.%d\n",
            (ip >> 24) & 0xFF, (ip >> 16) & 0xFF, (ip >> 8) & 0xFF, ip & 0xFF);
        serialNumber_ = std::string((char*)pInfo->SpecialInfo.stGigEInfo.chSerialNumber);
        deviceName_ = std::string((char*)pInfo->SpecialInfo.stGigEInfo.chUserDefinedName);
        if (deviceName_.empty()) deviceName_ = std::string((char*)pInfo->SpecialInfo.stGigEInfo.chModelName);
    } else {
        serialNumber_ = std::string((char*)pInfo->SpecialInfo.stUsb3VInfo.chSerialNumber);
        deviceName_ = std::string((char*)pInfo->SpecialInfo.stUsb3VInfo.chUserDefinedName);
        if (deviceName_.empty()) deviceName_ = std::string((char*)pInfo->SpecialInfo.stUsb3VInfo.chModelName);
        isUsbDevice_ = true;
        usbProtocolBcd_ = pInfo->SpecialInfo.stUsb3VInfo.nbcdUSB;
    }
    fprintf(stderr, "[海康相机] 序列号: %s, 型号: %s\n", serialNumber_.c_str(), deviceName_.c_str());
    if (isUsbDevice_) {
        fprintf(stderr, "[海康相机] USB协议: 0x%04x, 设备地址: %u\n",
                usbProtocolBcd_, pInfo->SpecialInfo.stUsb3VInfo.nDeviceAddress);
    }

    // 设置分辨率
    int targetWidth, targetHeight;
    MVCC_INTVALUE param;
    memset(&param, 0, sizeof(param));
    int widthRet = MV_CC_GetIntValue(handle_, "WidthMax", &param);
    int sensorMaxW = widthRet == MV_OK ? (int)param.nCurValue : 0;
    memset(&param, 0, sizeof(param));
    int heightRet = MV_CC_GetIntValue(handle_, "HeightMax", &param);
    int sensorMaxH = heightRet == MV_OK ? (int)param.nCurValue : 0;
    if (widthRet != MV_OK || heightRet != MV_OK || sensorMaxW <= 0 || sensorMaxH <= 0 ||
        sensorMaxW > 16384 || sensorMaxH > 16384) {
        fprintf(stderr, "[海康相机] 读取传感器尺寸失败，放弃本次打开: width=0x%x height=0x%x\n",
                widthRet, heightRet);
        MV_CC_CloseDevice(handle_);
        MV_CC_DestroyHandle(handle_);
        handle_ = nullptr;
        return false;
    }

    if (cfg_.maxWidth > 0 && cfg_.maxHeight > 0) {
        targetWidth = cfg_.maxWidth;
        targetHeight = cfg_.maxHeight;
    } else {
        targetWidth = sensorMaxW;
        targetHeight = sensorMaxH;
    }
    if (multiCameraMode_) {
        // 双海康模式使用独立的分辨率上限。奥比彩色流已经改为 MJPEG，
        // 因此可以保留 1280x720 鱼眼视场，只把双海康帧率限制到 15 FPS。
        if (cfg_.multiCameraMaxWidth > 0) {
            targetWidth = std::min(targetWidth, cfg_.multiCameraMaxWidth);
        }
        if (cfg_.multiCameraMaxHeight > 0) {
            targetHeight = std::min(targetHeight, cfg_.multiCameraMaxHeight);
        }
    }

    MV_CC_SetIntValue(handle_, "OffsetX", 0);
    MV_CC_SetIntValue(handle_, "OffsetY", 0);
    MV_CC_SetIntValue(handle_, "Width", targetWidth);
    MV_CC_SetIntValue(handle_, "Height", targetHeight);

    memset(&param, 0, sizeof(param));
    widthRet = MV_CC_GetIntValue(handle_, "Width", &param);
    int actualW = widthRet == MV_OK ? (int)param.nCurValue : 0;
    memset(&param, 0, sizeof(param));
    heightRet = MV_CC_GetIntValue(handle_, "Height", &param);
    int actualH = heightRet == MV_OK ? (int)param.nCurValue : 0;
    if (widthRet != MV_OK || heightRet != MV_OK || actualW <= 0 || actualH <= 0 ||
        actualW > 16384 || actualH > 16384) {
        fprintf(stderr, "[海康相机] 读取采集尺寸失败，放弃本次打开: width=0x%x height=0x%x\n",
                widthRet, heightRet);
        MV_CC_CloseDevice(handle_);
        MV_CC_DestroyHandle(handle_);
        handle_ = nullptr;
        return false;
    }

    // ROI 尺寸小于传感器时必须居中，否则 Offset=0 会只采集鱼眼图像左上角。
    // 根据相机节点返回的最小值、最大值和步进自动对齐，兼容不同海康型号。
    auto setCenteredOffset = [&](const char* key, int sensorSize, int roiSize) {
        MVCC_INTVALUE offsetInfo;
        memset(&offsetInfo, 0, sizeof(offsetInfo));
        if (MV_CC_GetIntValue(handle_, key, &offsetInfo) != MV_OK) return 0;

        const int minimum = (int)offsetInfo.nMin;
        const int maximum = (int)offsetInfo.nMax;
        const int increment = std::max(1, (int)offsetInfo.nInc);
        int desired = std::max(0, (sensorSize - roiSize) / 2);
        desired = minimum + std::max(0, desired - minimum) / increment * increment;
        desired = std::max(minimum, std::min(desired, maximum));
        if (MV_CC_SetIntValue(handle_, key, (unsigned int)desired) != MV_OK) return 0;

        memset(&offsetInfo, 0, sizeof(offsetInfo));
        if (MV_CC_GetIntValue(handle_, key, &offsetInfo) == MV_OK) {
            return (int)offsetInfo.nCurValue;
        }
        return desired;
    };

    const int actualOffsetX = setCenteredOffset("OffsetX", sensorMaxW, actualW);
    const int actualOffsetY = setCenteredOffset("OffsetY", sensorMaxH, actualH);
    fprintf(stderr, "[海康相机] 传感器: %dx%d, 采集ROI: %dx%d offset=%d,%d\n",
            sensorMaxW, sensorMaxH, actualW, actualH, actualOffsetX, actualOffsetY);

    MV_CC_SetEnumValue(handle_, "TriggerMode", MV_TRIGGER_MODE_OFF);
    int requestedFps = cfg_.fps;
    if (isUsbDevice_ && multiCameraMode_ && cfg_.multiCameraFps > 0 &&
        requestedFps > cfg_.multiCameraFps) {
        // 两台海康再加一台奥比常共用同一 USB 根控制器。限制为 15 FPS 后，
        // 三路 8 位图像可以稳定并行，避免其中一路因带宽争用降到 1~3 FPS。
        requestedFps = cfg_.multiCameraFps;
    }
    // 图像质量参数：优先在海康 SDK 层调节，让原始采集就更亮、更清晰。
    // 某些型号/固件不支持的节点会返回错误码，记录后继续启动相机。
    CameraControlParams startupControls;
    startupControls.brightness = cfg_.brightness;
    startupControls.contrast = cfg_.contrast;
    startupControls.exposureAuto = cfg_.exposureAuto;
    startupControls.exposureTime = cfg_.exposureTime;
    startupControls.exposureUpper = cfg_.exposureUpper;
    startupControls.gainAuto = cfg_.gainAuto;
    startupControls.gain = cfg_.gain;
    startupControls.gammaEnable = cfg_.gammaEnable;
    startupControls.gamma = cfg_.gamma;
    startupControls.sharpness = cfg_.sharpness;
    startupControls.balanceWhiteAuto = cfg_.balanceWhiteAuto;
    applyHikHardwareControls(handle_, startupControls);
    fprintf(stderr,
        "[海康相机] 图像参数: exposureAuto=%d exposure=%.0fus upper=%.0fus gainAuto=%d gain=%.1f gamma=%.2f sharpness=%d wbAuto=%d\n",
        cfg_.exposureAuto ? 1 : 0, cfg_.exposureTime, cfg_.exposureUpper,
        cfg_.gainAuto ? 1 : 0, cfg_.gain, cfg_.gamma, cfg_.sharpness,
        cfg_.balanceWhiteAuto ? 1 : 0);

    // 曝光、增益等节点在部分固件中会重算采集时序，因此必须最后设置帧率。
    // 双机模式再限制设备链路吞吐量，防止一台相机实际跑到 30 FPS 后挤占另一台相机。
    if (requestedFps > 0) {
        MV_CC_SetEnumValueByString(handle_, "AcquisitionMode", "Continuous");
        int fpsEnableRet = MV_CC_SetBoolValue(handle_, "AcquisitionFrameRateEnable", true);
        int fpsSetRet = MV_CC_SetFloatValue(handle_, "AcquisitionFrameRate", (float)requestedFps);

        int throughputModeRet = MV_OK;
        int throughputRet = MV_OK;
        int throughputLimit = 0;
        if (isUsbDevice_ && multiCameraMode_) {
            throughputLimit = std::max(4 * 1024 * 1024,
                actualW * actualH * requestedFps * 6 / 5);
            throughputModeRet = MV_CC_SetEnumValueByString(
                handle_, "DeviceLinkThroughputLimitMode", "On");
            throughputRet = MV_CC_SetIntValue(
                handle_, "DeviceLinkThroughputLimit", (unsigned int)throughputLimit);
        }

        MVCC_FLOATVALUE fpsInfo;
        memset(&fpsInfo, 0, sizeof(fpsInfo));
        int fpsGetRet = MV_CC_GetFloatValue(handle_, "AcquisitionFrameRate", &fpsInfo);
        fprintf(stderr,
            "[海康相机] 帧率限制: request=%d actual=%.1f enable=0x%x set=0x%x get=0x%x throughput=%dB/s mode=0x%x limit=0x%x\n",
            requestedFps, fpsGetRet == MV_OK ? fpsInfo.fCurValue : 0.0f,
            fpsEnableRet, fpsSetRet, fpsGetRet, throughputLimit,
            throughputModeRet, throughputRet);
    }

    // 适当增加SDK缓存，应对两台相机与两个夹爪同时工作时的瞬时调度延迟。
    MV_CC_SetImageNodeNum(handle_, 8);
    // 注册回调时传入 this->rawFrame_ 作为用户数据，每个实例独立
    ret = MV_CC_RegisterImageCallBackEx(handle_, imageCallback, rawFrame_.get());
    if (ret != MV_OK) {
        fprintf(stderr, "[海康相机] 注册取流回调失败: 0x%x\n", ret);
        MV_CC_CloseDevice(handle_);
        MV_CC_DestroyHandle(handle_);
        handle_ = nullptr;
        return false;
    }

    ret = MV_CC_StartGrabbing(handle_);
    if(ret != MV_OK) {
        fprintf(stderr, "[海康相机] 开始取流失败: 0x%x\n", ret);
        MV_CC_CloseDevice(handle_); MV_CC_DestroyHandle(handle_); handle_ = nullptr; return false;
    }

    opened_ = true;
    // 自动曝光和自动白平衡需要少量帧完成收敛，过渡帧不送入预览和录制。
    // 只忽略首帧。旧逻辑按配置丢弃 15 帧，USB 拥塞时会把首画面人为推迟数十秒。
    warmupFramesRemaining_ = 1;
    fprintf(stderr, "[海康相机] 取流已启动 (index=%d, SN=%s)\n", index, serialNumber_.c_str());
    return true;
}

void HikCamera::close() {
    std::lock_guard<std::mutex> lifecycleLock(g_hikLifecycleMutex);
    if(handle_) {
        MV_CC_StopGrabbing(handle_);
        MV_CC_CloseDevice(handle_);
        MV_CC_DestroyHandle(handle_);
        handle_ = nullptr;
    }
    opened_ = false;
    resetFrameState();
}

bool HikCamera::isOpened() const { return opened_; }

bool HikCamera::isDevicePresent() const {
    std::lock_guard<std::mutex> lifecycleLock(g_hikLifecycleMutex);
    MV_CC_DEVICE_INFO_LIST deviceList;
    memset(&deviceList, 0, sizeof(deviceList));
    if (MV_CC_EnumDevices(MV_GIGE_DEVICE | MV_USB_DEVICE, &deviceList) != MV_OK) return false;
    for (unsigned int i = 0; i < deviceList.nDeviceNum; ++i) {
        auto* info = deviceList.pDeviceInfo[i];
        if (!info) continue;
        std::string serial;
        if (info->nTLayerType == MV_GIGE_DEVICE) {
            serial = reinterpret_cast<const char*>(info->SpecialInfo.stGigEInfo.chSerialNumber);
        } else {
            serial = reinterpret_cast<const char*>(info->SpecialInfo.stUsb3VInfo.chSerialNumber);
        }
        if (serial == serialNumber_) return true;
    }
    return false;
}

bool HikCamera::setCameraControls(const CameraControlParams& params) {
    if (!handle_ || !opened_) return false;
    applyHikHardwareControls(handle_, params);
    return true;
}

cv::Mat HikCamera::read() {
    if(!handle_ || !opened_) return cv::Mat();

    RawFrameBuffer::FramePacket packet;
    bool hasFrame = false;

    {
        std::lock_guard<std::mutex> lock(rawFrame_->mutex);
        if(!rawFrame_->readyFrames.empty()) {
            packet = std::move(rawFrame_->readyFrames.front());
            rawFrame_->readyFrames.pop_front();
            rawFrame_->consumedFrames++;
            hasFrame = true;
        }
    }
    if (!hasFrame) {
        reportStreamHealth();
        return cv::Mat();
    }

    const int w = packet.width;
    const int h = packet.height;
    const unsigned int pt = packet.pixelType;
    const size_t rawLen = packet.frameLen;

    if (pt != lastPixelType_) {
        lastPixelType_ = pt;
        fprintf(stderr, "[海康相机] 像素格式: SN=%s type=0x%x\n", serialNumber_.c_str(), pt);
    }

    if (warmupFramesRemaining_ > 0) {
        --warmupFramesRemaining_;
        std::lock_guard<std::mutex> lock(rawFrame_->mutex);
        rawFrame_->freeFrames.push_back(std::move(packet));
        return cv::Mat();
    }

    cv::Mat frame;
    int bayerCode = -1;
    // 海康 PixelType 与 OpenCV Bayer 常量的排列命名约定相反。
    // GR/GB、RG/BG 需要成对映射，否则红色和蓝色会互换。
    if (pt == PixelType_Gvsp_BayerGR8) bayerCode = cv::COLOR_BayerGB2BGR;
    else if (pt == PixelType_Gvsp_BayerRG8) bayerCode = cv::COLOR_BayerBG2BGR;
    else if (pt == PixelType_Gvsp_BayerGB8) bayerCode = cv::COLOR_BayerGR2BGR;
    else if (pt == PixelType_Gvsp_BayerBG8) bayerCode = cv::COLOR_BayerRG2BGR;

    int ret = MV_OK;
    if (bayerCode >= 0 && packet.data.size() >= static_cast<size_t>(w) * h) {
        // 相机当前输出的是 8 位 Bayer 原始图。直接转换可避免 SDK 像素转换偶发失败，
        // 同时输出仍是项目统一使用的 BGR 色序。
        cv::Mat bayer(h, w, CV_8UC1, packet.data.data());
        cv::cvtColor(bayer, frame, bayerCode);
    } else {
        // 非 Bayer8 格式仍由海康 SDK 转换，缓冲区按相机实例复用以减少内存抖动。
        const unsigned int bgrBufSize = w * h * 4;
        if (bgrBuffer_.size() < bgrBufSize) bgrBuffer_.resize(bgrBufSize);

        MV_CC_PIXEL_CONVERT_PARAM_EX cvtParam;
        memset(&cvtParam, 0, sizeof(cvtParam));
        cvtParam.nWidth = w;
        cvtParam.nHeight = h;
        cvtParam.enSrcPixelType = static_cast<MvGvspPixelType>(pt);
        cvtParam.pSrcData = packet.data.data();
        cvtParam.nSrcDataLen = static_cast<unsigned int>(rawLen);
        cvtParam.enDstPixelType = PixelType_Gvsp_BGR8_Packed;
        cvtParam.pDstBuffer = bgrBuffer_.data();
        cvtParam.nDstBufferSize = bgrBufSize;
        ret = MV_CC_ConvertPixelTypeEx(handle_, &cvtParam);
        if (ret == MV_OK) frame = cv::Mat(h, w, CV_8UC3, bgrBuffer_.data()).clone();
    }

    if (frame.empty()) {
        static int failCount = 0;
        if (++failCount <= 3 || failCount % 100 == 0) {
            fprintf(stderr,
                "[海康相机] 像素转换失败: SN=%s error=0x%x pixelType=0x%x size=%dx%d bytes=%zu\n",
                serialNumber_.c_str(), ret, pt, w, h, rawLen);
        }
        {
            std::lock_guard<std::mutex> lock(rawFrame_->mutex);
            rawFrame_->freeFrames.push_back(std::move(packet));
        }
        reportStreamHealth();
        return cv::Mat();
    }

    {
        std::lock_guard<std::mutex> lock(rawFrame_->mutex);
        rawFrame_->freeFrames.push_back(std::move(packet));
        while (rawFrame_->freeFrames.size() > RawFrameBuffer::MAX_READY_FRAMES + 2) {
            rawFrame_->freeFrames.pop_front();
        }
    }

    // 鱼眼去畸变（参数从 config 读取）
    if (mapW_ != w || mapH_ != h || mapK1_ != cfg_.fisheyeK1 || mapK2_ != cfg_.fisheyeK2 || mapScale_ != cfg_.fisheyeScale) {
        mapW_ = w; mapH_ = h;
        mapK1_ = cfg_.fisheyeK1; mapK2_ = cfg_.fisheyeK2; mapScale_ = cfg_.fisheyeScale;
        double fx = w * 0.85, fy = h * 0.85;
        double cx = w / 2.0, cy = h / 2.0;
        cv::Mat K = (cv::Mat_<double>(3,3) << fx, 0, cx, 0, fy, cy, 0, 0, 1);
        cv::Mat D = (cv::Mat_<double>(1,4) << cfg_.fisheyeK1, cfg_.fisheyeK2, 0.0, 0.0);
        cv::Mat newK = K.clone();
        newK.at<double>(0,0) = fx * cfg_.fisheyeScale;
        newK.at<double>(1,1) = fy * cfg_.fisheyeScale;
        cv::fisheye::initUndistortRectifyMap(K, D, cv::Mat::eye(3,3,CV_64F), newK, cv::Size(w,h), CV_16SC2, map1_, map2_);
        cv::Mat sourceMask(h, w, CV_8UC1, cv::Scalar(255));
        cv::Mat validMask;
        cv::remap(sourceMask, validMask, map1_, map2_, cv::INTER_NEAREST,
                  cv::BORDER_CONSTANT, cv::Scalar(0));
        cv::erode(validMask, validMask, cv::Mat(), cv::Point(-1, -1), 2);
        validCrop_ = findCenteredValidCrop(validMask);
        fprintf(stderr,
            "[海康相机] 鱼眼校正: K1=%.2f K2=%.2f scale=%.2f crop=%d,%d %dx%d\n",
            cfg_.fisheyeK1, cfg_.fisheyeK2, cfg_.fisheyeScale,
            validCrop_.x, validCrop_.y, validCrop_.width, validCrop_.height);
    }
    cv::Mat corrected;
    cv::remap(frame, corrected, map1_, map2_, cv::INTER_LINEAR,
              cv::BORDER_CONSTANT, cv::Scalar(0, 0, 0));
    if (validCrop_.area() > 0 &&
        (validCrop_.width != corrected.cols || validCrop_.height != corrected.rows)) {
        cv::resize(corrected(validCrop_), frame, cv::Size(w, h), 0.0, 0.0, cv::INTER_LINEAR);
    } else {
        frame = corrected;
    }

    reportStreamHealth();
    return frame;
}

void HikCamera::resetFrameState() {
    if (!rawFrame_) return;
    std::lock_guard<std::mutex> lock(rawFrame_->mutex);
    rawFrame_->readyFrames.clear();
    rawFrame_->freeFrames.clear();
    rawFrame_->callbackFrames = 0;
    rawFrame_->consumedFrames = 0;
    rawFrame_->sourceFrameGaps = 0;
    rawFrame_->queueDrops = 0;
    rawFrame_->maxQueueDepth = 0;
    rawFrame_->lastFrameNumber = 0;
    rawFrame_->hasFrameNumber = false;
    diagnosticsLastMs_ = 0;
    diagnosticsLastCallbackFrames_ = 0;
    diagnosticsLastConsumedFrames_ = 0;
    diagnosticsLastSourceGaps_ = 0;
    diagnosticsLastQueueDrops_ = 0;
    diagnosticsLastUsbErrors_ = 0;
    diagnosticsInitialized_ = false;
    bgrBuffer_.clear();
    map1_.release();
    map2_.release();
    validCrop_ = cv::Rect();
    mapW_ = 0;
    mapH_ = 0;
    isUsbDevice_ = false;
    usbProtocolBcd_ = 0;
    warmupFramesRemaining_ = 0;
}

void HikCamera::reportStreamHealth() {
    const uint64_t nowMs = (uint64_t)std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    // 首次运行 5 秒后输出一次基线；后续异常只做 30 秒汇总，避免故障设备刷屏。
    const uint64_t reportIntervalMs = diagnosticsInitialized_ ? 30000 : 5000;
    if (diagnosticsLastMs_ != 0 && nowMs - diagnosticsLastMs_ < reportIntervalMs) return;

    uint64_t callbackFrames = 0;
    uint64_t consumedFrames = 0;
    uint64_t sourceGaps = 0;
    uint64_t queueDrops = 0;
    size_t queueDepth = 0;
    size_t maxQueueDepth = 0;
    {
        std::lock_guard<std::mutex> lock(rawFrame_->mutex);
        callbackFrames = rawFrame_->callbackFrames;
        consumedFrames = rawFrame_->consumedFrames;
        sourceGaps = rawFrame_->sourceFrameGaps;
        queueDrops = rawFrame_->queueDrops;
        queueDepth = rawFrame_->readyFrames.size();
        maxQueueDepth = rawFrame_->maxQueueDepth;
    }

    unsigned int usbErrors = diagnosticsLastUsbErrors_;
    unsigned int usbReceivedFrames = 0;
    if (isUsbDevice_ && handle_) {
        MV_MATCH_INFO_USB_DETECT usbInfo;
        memset(&usbInfo, 0, sizeof(usbInfo));
        MV_ALL_MATCH_INFO matchInfo;
        memset(&matchInfo, 0, sizeof(matchInfo));
        matchInfo.nType = MV_MATCH_TYPE_USB_DETECT;
        matchInfo.pInfo = &usbInfo;
        matchInfo.nInfoSize = sizeof(usbInfo);
        if (MV_CC_GetAllMatchInfo(handle_, &matchInfo) == MV_OK) {
            usbErrors = usbInfo.nErrorFrameCount;
            usbReceivedFrames = usbInfo.nReceivedFrameCount;
        }
    }

    if (diagnosticsLastMs_ == 0) {
        diagnosticsLastMs_ = nowMs;
        diagnosticsLastCallbackFrames_ = callbackFrames;
        diagnosticsLastConsumedFrames_ = consumedFrames;
        diagnosticsLastSourceGaps_ = sourceGaps;
        diagnosticsLastQueueDrops_ = queueDrops;
        diagnosticsLastUsbErrors_ = usbErrors;
        return;
    }
    const double elapsedSec = std::max(0.001, (double)(nowMs - diagnosticsLastMs_) / 1000.0);
    const double inputFps = (double)(callbackFrames - diagnosticsLastCallbackFrames_) / elapsedSec;
    const double outputFps = (double)(consumedFrames - diagnosticsLastConsumedFrames_) / elapsedSec;
    const uint64_t newSourceGaps = sourceGaps - diagnosticsLastSourceGaps_;
    const uint64_t newQueueDrops = queueDrops - diagnosticsLastQueueDrops_;
    const unsigned int newUsbErrors = usbErrors - diagnosticsLastUsbErrors_;

    if (!diagnosticsInitialized_ || newSourceGaps > 0 || newQueueDrops > 0 || newUsbErrors > 0) {
        fprintf(stderr,
            "[海康相机] 流状态 SN=%s 输入=%.1ffps 处理=%.1ffps USB错误=%u 源帧跳变=%llu 队列丢帧=%llu 队列=%zu/%zu SDK接收=%u\n",
            serialNumber_.c_str(), inputFps, outputFps, newUsbErrors,
            (unsigned long long)newSourceGaps, (unsigned long long)newQueueDrops,
            queueDepth, maxQueueDepth, usbReceivedFrames);
    }

    diagnosticsLastMs_ = nowMs;
    diagnosticsLastCallbackFrames_ = callbackFrames;
    diagnosticsLastConsumedFrames_ = consumedFrames;
    diagnosticsLastSourceGaps_ = sourceGaps;
    diagnosticsLastQueueDrops_ = queueDrops;
    diagnosticsLastUsbErrors_ = usbErrors;
    diagnosticsInitialized_ = true;
}

#else // NO_HIK_CAMERA - stub

struct HikCamera::RawFrameBuffer {};

HikCamera::HikCamera(const CameraConfig& cfg) : handle_(nullptr), opened_(false), cfg_(cfg) {
    rawFrame_ = std::make_unique<RawFrameBuffer>();
}
HikCamera::~HikCamera() { close(); }
bool HikCamera::open(int, const std::string&) { fprintf(stderr, "[海康相机] SDK 未安装\n"); return false; }
void HikCamera::close() { opened_ = false; }
bool HikCamera::isOpened() const { return false; }
bool HikCamera::isDevicePresent() const { return false; }
bool HikCamera::setCameraControls(const CameraControlParams&) { return false; }
cv::Mat HikCamera::read() { return cv::Mat(); }

#endif
