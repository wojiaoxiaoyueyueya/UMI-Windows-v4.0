// HttpServer.cpp - HTTP 服务器实现（Windows 版）
// 基于 cpp-httplib，提供 MJPEG 推流、夹爪数据、数据录制与转换

#include "HttpServer.hpp"
#include "httplib.h"

#include <cstdio>
#include <cstring>
#include <cctype>
#include <chrono>
#include <fstream>
#include <iomanip>
#include <algorithm>
#include <sstream>
#include <cstdlib>
#include <cmath>
#include <winsock2.h>
#include <windows.h>

#include "utils/WinFsUtils.hpp"
#include "utils/JsonHelper.hpp"

static const char* MJPEG_BOUNDARY = "--frameboundary";
static int ENCODE_INTERVAL_MS = 30;
int STREAM_INTERVAL_MS = 33;
static int JPEG_QUALITY = 95;
static int STREAM_MAX_WIDTH = 640;

// ---- 构造/析构 ----

HttpServer::HttpServer(const Config& cfg, const std::string& frontendDir)
    : port_(cfg.server.port), frontendDir_(winfs::resolvePath(frontendDir)),
      running_(false),
      colorEnabled_(false), gripperEnabled_(false) {
    deviceInfoState_.hasData = false;
    recordingState_.isRecording = false;
    recordingState_.finalizing = false;
    recordingState_.baseDir = winfs::resolvePath(frontendDir_ + "/../" + cfg.paths.dataDir);
    // slots 是标准容器，默认构造即可，不需要额外初始化。
    convertState_.converting = false;
    convertScriptPath_ = winfs::resolvePath(frontendDir_ + "/../" + cfg.paths.convertScript);
    convertOutputDir_ = winfs::resolvePath(frontendDir_ + "/../" + cfg.paths.convertOutputDir);
    // 平台上传的认证信息放在 config.local.json。该文件不进 Git，也不会被
    // HTTP 接口原样返回；前端只能得到脱敏后的连接状态。
    eidpScriptPath_ = winfs::resolvePath(frontendDir_ + "/../tools/upload_to_eidp.py");
    eidpConfigPath_ = winfs::resolvePath(frontendDir_ + "/../config.json");
    eidpLocalConfigPath_ = winfs::resolvePath(frontendDir_ + "/../config.local.json");
    eidpWorkDir_ = winfs::resolvePath(frontendDir_ + "/../data_upload_staging");
    ENCODE_INTERVAL_MS = cfg.stream.encodeIntervalMs;
    STREAM_INTERVAL_MS = cfg.stream.streamIntervalMs;
    JPEG_QUALITY = cfg.stream.jpegQuality;
    STREAM_MAX_WIDTH = cfg.stream.streamMaxWidth;
    cameraStates_["left"];
    cameraStates_["right"];
    cameraStates_["head"];
    CameraControlParams defaultCameraControls;
    defaultCameraControls.brightness = cfg.camera.brightness;
    defaultCameraControls.contrast = cfg.camera.contrast;
    defaultCameraControls.gamma = cfg.camera.gamma;
    defaultCameraControls.saturation = 1.0;
    defaultCameraControls.sharpness = cfg.camera.sharpness;
    defaultCameraControls.denoise = cfg.camera.denoise;
    defaultCameraControls.exposureAuto = cfg.camera.exposureAuto;
    defaultCameraControls.exposureTime = cfg.camera.exposureTime;
    defaultCameraControls.exposureUpper = cfg.camera.exposureUpper;
    defaultCameraControls.gainAuto = cfg.camera.gainAuto;
    defaultCameraControls.gain = cfg.camera.gain;
    defaultCameraControls.gammaEnable = cfg.camera.gammaEnable;
    defaultCameraControls.balanceWhiteAuto = cfg.camera.balanceWhiteAuto;
    for (const auto& slot : {std::string("left"), std::string("right"), std::string("head")}) {
        cameraControlStates_[slot].params = defaultCameraControls;
    }
    gripperWebStates_["left"];
    gripperWebStates_["right"];
    gripperWebStates_["extra"];
    electricGripperWebStates_["left"];
    electricGripperWebStates_["right"];
    electricGripperWebStates_["extra"];
}

HttpServer::~HttpServer() { stop(); }

std::string HttpServer::getRecordingBaseDir() {
    std::lock_guard<std::mutex> lock(recordingState_.mutex);
    return recordingState_.baseDir;
}

bool HttpServer::setRecordingBaseDir(const std::string& path) {
    std::lock_guard<std::mutex> lock(recordingState_.mutex);
    if (recordingState_.isRecording || recordingState_.finalizing) return false;
    recordingState_.baseDir = path;
    return true;
}

std::string HttpServer::getConvertOutputDir() const {
    std::lock_guard<std::mutex> lock(pathConfigMutex_);
    return convertOutputDir_;
}

void HttpServer::setConvertOutputDir(const std::string& path) {
    std::lock_guard<std::mutex> lock(pathConfigMutex_);
    convertOutputDir_ = path;
}

// ---- 启动/停止 ----

void HttpServer::start() {
    svr_ = std::unique_ptr<httplib::Server>(new httplib::Server());
    setupRoutes();
    httpListenFailed_ = false;
    running_ = true;
    finalizeWorkerRunning_ = true;
    httpThread_ = std::thread(&HttpServer::httpLoop, this);
    encodeThread_ = std::thread(&HttpServer::encodeLoop, this);
    finalizeWorkerThread_ = std::thread(&HttpServer::finalizeWorker, this);
}

void HttpServer::stop() {
    running_ = false;
    finalizeWorkerRunning_ = false;
    finalizeQueueCv_.notify_all();
    encodeCv_.notify_all();
    if (svr_) svr_->stop();
    if (httpThread_.joinable()) httpThread_.join();
    if (encodeThread_.joinable()) encodeThread_.join();
    if (convertThread_.joinable()) convertThread_.join();
    if (platformUploadThread_.joinable()) platformUploadThread_.join();
    if (finalizeWorkerThread_.joinable()) finalizeWorkerThread_.join();
    colorEnabled_ = false;
    gripperEnabled_ = false;
}

void HttpServer::httpLoop() {
    if (!svr_->listen("0.0.0.0", port_) && running_) {
        httpListenFailed_ = true;
        running_ = false;
        fprintf(stderr, "[HTTP] 无法监听端口 %d，后台将主动退出以释放设备\n", port_);
    }
}

void HttpServer::registerClientHeartbeat(const std::string& clientId) {
    if (clientId.empty()) return;
    std::lock_guard<std::mutex> lock(clientLifecycleMutex_);
    const auto now = std::chrono::steady_clock::now();
    const auto released = releasedClients_.find(clientId);
    if (released != releasedClients_.end()) {
        // 页面关闭前已经发出的心跳可能晚于 release 到达，不能让它重新占用租约。
        if (now - released->second < std::chrono::seconds(10)) return;
        releasedClients_.erase(released);
    }
    clientTrackingStarted_ = true;
    clientHeartbeats_[clientId] = now;
    noClientSince_ = std::chrono::steady_clock::time_point();
}

void HttpServer::releaseClient(const std::string& clientId) {
    if (clientId.empty()) return;
    std::lock_guard<std::mutex> lock(clientLifecycleMutex_);
    clientHeartbeats_.erase(clientId);
    releasedClients_[clientId] = std::chrono::steady_clock::now();
    if (clientTrackingStarted_ && clientHeartbeats_.empty()
        && noClientSince_ == std::chrono::steady_clock::time_point()) {
        noClientSince_ = std::chrono::steady_clock::now();
    }
}

bool HttpServer::shouldShutdownForClientLifecycle() {
    if (explicitShutdownRequested_.load()) return true;

    std::lock_guard<std::mutex> lock(clientLifecycleMutex_);
    if (!clientTrackingStarted_) return false;

    const auto now = std::chrono::steady_clock::now();
    // 正常关页会主动 release，并在 3 秒宽限后退出。浏览器被强制结束时收不到
    // pagehide/beforeunload，因此以三个心跳周期作为兜底，避免设备继续占用两分钟。
    const auto staleAfter = std::chrono::seconds(15);
    for (auto it = releasedClients_.begin(); it != releasedClients_.end();) {
        if (now - it->second > std::chrono::seconds(15)) {
            it = releasedClients_.erase(it);
        } else {
            ++it;
        }
    }
    for (auto it = clientHeartbeats_.begin(); it != clientHeartbeats_.end();) {
        if (now - it->second > staleAfter) {
            it = clientHeartbeats_.erase(it);
        } else {
            ++it;
        }
    }

    if (!clientHeartbeats_.empty()) {
        noClientSince_ = std::chrono::steady_clock::time_point();
        return false;
    }
    if (noClientSince_ == std::chrono::steady_clock::time_point()) {
        noClientSince_ = now;
        return false;
    }

    // 页面刷新或站内跳转会短暂释放旧页面，保留几秒让新页面重新登记。
    return now - noClientSince_ >= std::chrono::seconds(3);
}

// ---- 编码循环 ----
// 辅助函数：编码单个 StreamState
static void encodeOneStream(StreamState* state, int& encodeCount) {
    if (!state->hasData) return;

    if (state->hasRawJpeg && !state->rawJpegBuf.empty()) {
        state->encodedJpegBuf.swap(state->rawJpegBuf);
        state->hasRawJpeg = false;
        state->encodedTimestamp = state->timestamp;
        state->_encodeCount++;
    } else {
        if (state->mat.empty()) return;
        if (state->encodedTimestamp == state->timestamp) return;

        state->encodedJpegBuf.clear();
        std::vector<int> params = { cv::IMWRITE_JPEG_QUALITY, JPEG_QUALITY };
        cv::Mat streamMat;
        if (state->mat.cols > STREAM_MAX_WIDTH) {
            double scale = (double)STREAM_MAX_WIDTH / state->mat.cols;
            cv::resize(state->mat, streamMat, cv::Size(), scale, scale);
        } else {
            streamMat = state->mat;
        }
        cv::imencode(".jpg", streamMat, state->encodedJpegBuf, params);
        state->encodedTimestamp = state->timestamp;
        state->_encodeCount++;
        encodeCount++;
    }
}

void HttpServer::encodeLoop() {
    int encodeCount = 0;
    auto fpsStart = std::chrono::steady_clock::now();
    while (running_) {
        std::unique_lock<std::mutex> lock(encodeMutex_);
        encodeCv_.wait_for(lock, std::chrono::milliseconds(ENCODE_INTERVAL_MS));

        // 编码旧的单摄像头流（向后兼容）
        {
            std::lock_guard<std::mutex> slock(colorState_.mutex);
            encodeOneStream(&colorState_, encodeCount);
        }

        // 编码多路摄像头流
        for (auto& kv : cameraStates_) {
            {
                std::lock_guard<std::mutex> slock(kv.second.color.mutex);
                encodeOneStream(&kv.second.color, encodeCount);
            }
            {
                std::lock_guard<std::mutex> slock(kv.second.depth.mutex);
                encodeOneStream(&kv.second.depth, encodeCount);
            }
            {
                std::lock_guard<std::mutex> slock(kv.second.irLeft.mutex);
                encodeOneStream(&kv.second.irLeft, encodeCount);
            }
            {
                std::lock_guard<std::mutex> slock(kv.second.irRight.mutex);
                encodeOneStream(&kv.second.irRight, encodeCount);
            }
        }

        // FPS 统计：每秒更新一次
        auto now = std::chrono::steady_clock::now();
        auto fpsElapsed = std::chrono::duration_cast<std::chrono::milliseconds>(now - fpsStart).count();
        if (fpsElapsed >= 1000) {
            colorState_.encodeFps = (int)(colorState_._encodeCount * 1000 / fpsElapsed);
            colorState_._encodeCount = 0;
            for (auto& kv : cameraStates_) {
                kv.second.color.encodeFps = (int)(kv.second.color._encodeCount * 1000 / fpsElapsed);
                kv.second.color._encodeCount = 0;
                kv.second.depth.encodeFps = (int)(kv.second.depth._encodeCount * 1000 / fpsElapsed);
                kv.second.depth._encodeCount = 0;
                kv.second.irLeft.encodeFps = (int)(kv.second.irLeft._encodeCount * 1000 / fpsElapsed);
                kv.second.irLeft._encodeCount = 0;
                kv.second.irRight.encodeFps = (int)(kv.second.irRight._encodeCount * 1000 / fpsElapsed);
                kv.second.irRight._encodeCount = 0;
            }
            fpsStart = now;
        }
    }
}

// ---- 数据更新接口 ----

CameraControlParams HttpServer::getCameraControlParams(const std::string& slot) const {
    auto it = const_cast<HttpServer*>(this)->cameraControlStates_.find(slot);
    if (it == const_cast<HttpServer*>(this)->cameraControlStates_.end()) return CameraControlParams();
    std::lock_guard<std::mutex> lock(it->second.mutex);
    return it->second.params;
}

bool HttpServer::setCameraControlParams(const std::string& slot, const CameraControlParams& params, bool applyHardware) {
    auto& state = cameraControlStates_[slot];
    {
        std::lock_guard<std::mutex> lock(state.mutex);
        state.params = params;
        state.hasCustomParams = true;
        state.timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::steady_clock::now().time_since_epoch()).count();
        state.hardwareApplied = false;
    }

    bool hardwareOk = false;
    if (applyHardware && deviceManager_) {
        auto* slotInfo = deviceManager_->getSlot(slot);
        if (slotInfo && slotInfo->connected && slotInfo->camera) {
            hardwareOk = slotInfo->camera->setCameraControls(params);
        }
    }
    {
        std::lock_guard<std::mutex> lock(state.mutex);
        state.hardwareApplied = hardwareOk;
    }
    return hardwareOk;
}

cv::Mat HttpServer::applyCameraImageControls(const std::string& slot, const cv::Mat& frame, const std::string& streamType) {
    if (frame.empty() || streamType != "color") return frame;

    CameraControlParams params = getCameraControlParams(slot);
    cv::Mat out = frame;

    if (params.contrast != 1.0 || params.brightness != 0.0) {
        out.convertTo(out, -1, params.contrast, params.brightness);
    } else if (out.data == frame.data) {
        out = frame.clone();
    }

    if (params.gammaEnable && params.gamma > 0.01 && params.gamma != 1.0 && out.depth() == CV_8U) {
        cv::Mat lut(1, 256, CV_8U);
        uchar* p = lut.ptr<uchar>();
        double invGamma = 1.0 / params.gamma;
        for (int i = 0; i < 256; ++i) {
            p[i] = cv::saturate_cast<uchar>(std::pow(i / 255.0, invGamma) * 255.0);
        }
        cv::LUT(out, lut, out);
    }

    if (params.saturation != 1.0 && out.channels() == 3 && out.depth() == CV_8U) {
        cv::Mat hsv;
        cv::cvtColor(out, hsv, cv::COLOR_BGR2HSV);
        std::vector<cv::Mat> channels;
        cv::split(hsv, channels);
        channels[1].convertTo(channels[1], -1, params.saturation, 0);
        cv::merge(channels, hsv);
        cv::cvtColor(hsv, out, cv::COLOR_HSV2BGR);
    }

    if (params.denoise > 0.0 && out.channels() == 3 && out.depth() == CV_8U) {
        // 实时多相机预览使用轻量混合降噪，避免 NLM 在多路高清画面下占用过多 CPU。
        cv::Mat smoothed;
        cv::GaussianBlur(out, smoothed, cv::Size(3, 3), 0.65);
        double amount = std::max(0.0, std::min(10.0, params.denoise)) / 10.0;
        cv::addWeighted(out, 1.0 - amount, smoothed, amount, 0.0, out);
    }

    if (params.sharpness > 0.0 && out.channels() == 3) {
        cv::Mat blurred;
        cv::GaussianBlur(out, blurred, cv::Size(0, 0), 1.0);
        double amount = std::max(0.0, std::min(5.0, params.sharpness)) * 0.25;
        cv::addWeighted(out, 1.0 + amount, blurred, -amount, 0, out);
    }

    return out;
}

void HttpServer::updateColorFrame(const cv::Mat& mat) {
    cv::Mat adjusted = applyCameraImageControls("left", mat, "color");
    std::lock_guard<std::mutex> lock(colorState_.mutex);
    colorState_.mat = adjusted;
    colorState_.timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    colorState_.hasData = true;
    colorState_.hasRawJpeg = false;
}

void HttpServer::updateGripperData(const std::string& slot, const GripperState& state) {
    auto& gs = gripperWebStates_[slot];
    std::lock_guard<std::mutex> lock(gs.mutex);
    gs.position = state.position;
    gs.button1 = state.button1;
    gs.button2 = state.button2;
    gs.timestamp = state.timestamp;
    gs.hasData = state.hasData;
    gs.hasExtendedData = state.hasExtendedData;
    gs.protocolVersion = state.protocolVersion;
    gs.payloadLength = state.payloadLength;
    gs.deviceId = state.deviceId;
    gs.encoderRaw = state.encoderRaw;
    gs.positionRaw = state.positionRaw;
    gs.positionFallback = state.positionFallback;
    gs.lastV4Command = state.lastV4Command;
    gs.hasDeviceParams = state.hasDeviceParams;
    gs.txAddress = state.txAddress;
    gs.txFrequency = state.txFrequency;
    gs.rxAddress = state.rxAddress;
    gs.rxFrequency = state.rxFrequency;
    gs.ledR = state.ledR;
    gs.ledG = state.ledG;
    gs.ledB = state.ledB;
    gs.ledBrightness = state.ledBrightness;
    for (int i = 0; i < 3; ++i) {
        gs.accel[i] = state.accel[i];
        gs.gyro[i] = state.gyro[i];
    }
    for (int i = 0; i < 12; ++i) {
        gs.force[i] = state.force[i];
    }
    gs.forceCount = state.forceCount;
    gs.forceMaxAbs = state.forceMaxAbs;
    gs.captureCount++;
}

bool HttpServer::isStreamActive(const std::string& stream) const {
    if (stream == "color") return colorEnabled_;
    if (stream == "gripper") return gripperEnabled_;
    return false;
}

void HttpServer::setStreamActive(const std::string& stream, bool active) {
    if (stream == "color") colorEnabled_ = active;
    else if (stream == "gripper") gripperEnabled_ = active;
}

std::string HttpServer::buildStreamFpsJson() {
    std::string fpsJson;
    std::lock_guard<std::mutex> lock(const_cast<std::mutex&>(streamFlagMutex_));
    for (auto& slotKv : cameraStates_) {
        const std::string& slot = slotKv.first;
        auto& states = slotKv.second;
        auto addEntry = [&](const std::string& streamName, const StreamState& state) {
            if (state.encodeFps > 0) {
                if (!fpsJson.empty()) fpsJson += ",";
                fpsJson += "\"" + slot + "-" + streamName + "\":" + std::to_string(state.encodeFps);
            }
        };
        addEntry("color", states.color);
        addEntry("depth", states.depth);
        addEntry("ir-left", states.irLeft);
        addEntry("ir-right", states.irRight);
    }
    // 兜底：如果cameraStates_为空，使用旧的colorState_
    if (fpsJson.empty() && colorState_.encodeFps > 0) {
        fpsJson = "\"color\":" + std::to_string(colorState_.encodeFps);
    }
    return fpsJson;
}

void HttpServer::updateDeviceInfo(const std::string& name, int pid, int vid,
                                   const std::string& serialNumber, const std::string& firmwareVersion) {
    std::lock_guard<std::mutex> lock(deviceInfoState_.mutex);
    deviceInfoState_.name = name;
    deviceInfoState_.pid = pid;
    deviceInfoState_.vid = vid;
    deviceInfoState_.serialNumber = serialNumber;
    deviceInfoState_.firmwareVersion = firmwareVersion;
    deviceInfoState_.lastUpdateTime = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    deviceInfoState_.hasData = true;
}

// ---- 路由注册 ----

void HttpServer::updateElectricGripperData(const std::string& slot, const ElectricGripperFullState& state) {
    auto it = electricGripperWebStates_.find(slot);
    if (it == electricGripperWebStates_.end()) return;
    auto& gs = it->second;
    std::lock_guard<std::mutex> lock(gs.mutex);
    gs.positionDeg = state.positionDeg;
    gs.velocity = state.velocity;
    gs.current = state.current;
    gs.motorTemp = state.motorTemp;
    gs.mosTemp = state.mosTemp;
    gs.errorCode = state.errorCode;
    gs.motorEnabled = state.motorEnabled;
    gs.hasData = state.hasData;
    gs.connected = state.connected;
    gs.timestamp = state.timestamp;
    memcpy(gs.rawFrame, state.rawFrame, 8);
    gs.rawFrameLen = state.rawFrameLen;
}

void HttpServer::setUmiGripper(const std::string& slot, UmiGripper* gripper) {
    std::lock_guard<std::mutex> lock(gripperRefsMutex_);
    umiGrippers_[slot] = gripper;
}

void HttpServer::setElectricGripper(const std::string& slot, ElectricGripper* gripper) {
    std::lock_guard<std::mutex> lock(gripperRefsMutex_);
    electricGrippers_[slot] = gripper;
}

UmiGripper* HttpServer::getUmiGripper(const std::string& slot) const {
    std::lock_guard<std::mutex> lock(gripperRefsMutex_);
    auto it = umiGrippers_.find(slot);
    return it != umiGrippers_.end() ? it->second : nullptr;
}

ElectricGripper* HttpServer::getElectricGripper(const std::string& slot) const {
    std::lock_guard<std::mutex> lock(gripperRefsMutex_);
    auto it = electricGrippers_.find(slot);
    return it != electricGrippers_.end() ? it->second : nullptr;
}

// ---- 电动夹爪数据更新 ----

// ---- 多摄像头数据更新 ----

void HttpServer::updateColorFrame(const std::string& slot, const cv::Mat& mat) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    cv::Mat adjusted = applyCameraImageControls(slot, mat, "color");
    auto& states = it->second;
    std::lock_guard<std::mutex> lock(states.color.mutex);
    states.color.mat = adjusted;
    states.color.timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    states.color.hasData = true;
    states.color.hasRawJpeg = false;

    // 向后兼容：也更新旧的 colorState_（必须加锁，encodeLoop 在另一个线程读）
    if (slot == "left") {
        std::lock_guard<std::mutex> lock2(colorState_.mutex);
        colorState_.mat = adjusted;
        colorState_.timestamp = states.color.timestamp;
        colorState_.hasData = true;
        colorState_.hasRawJpeg = false;
    }
}

void HttpServer::updateDepthFrame(const std::string& slot, const cv::Mat& mat) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    auto& states = it->second;
    std::lock_guard<std::mutex> lock(states.depth.mutex);
    states.depth.mat = mat;
    states.depth.timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    states.depth.hasData = true;
    states.depth.hasRawJpeg = false;
}

void HttpServer::updateIRLeftFrame(const std::string& slot, const cv::Mat& mat) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    auto& states = it->second;
    std::lock_guard<std::mutex> lock(states.irLeft.mutex);
    states.irLeft.mat = mat;
    states.irLeft.timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    states.irLeft.hasData = true;
    states.irLeft.hasRawJpeg = false;
}

void HttpServer::updateIRRightFrame(const std::string& slot, const cv::Mat& mat) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    auto& states = it->second;
    std::lock_guard<std::mutex> lock(states.irRight.mutex);
    states.irRight.mat = mat;
    states.irRight.timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    states.irRight.hasData = true;
    states.irRight.hasRawJpeg = false;
}

void HttpServer::updatePointCloudData(const std::string& slot, const std::vector<float>& points, int width, int height) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    auto& states = it->second;
    {
        std::lock_guard<std::mutex> lock(states.pointCloudMutex);
        states.pointCloudData = points;
        states.pointCloudWidth = width;
        states.pointCloudHeight = height;
        states.pointCloudTimestamp = std::chrono::duration_cast<std::chrono::milliseconds>(
            std::chrono::steady_clock::now().time_since_epoch()).count();
        states.pointCloudHasData = true;
        states.pointCloudCaptureCount++;
    }

    // 录制开启且点云流被勾选时，将点云按间隔保存为 PLY 文件。
    if (points.empty()) return;
    {
        std::lock_guard<std::mutex> lock(recordingState_.mutex);
        if (!recordingState_.isRecording) return;
        // 将后端真实槽位转换为前端显示位置，用于匹配录制选择。
        std::string displayPos = slot;
        auto btdIt = recordingState_.backendToDisplay.find(slot);
        if (btdIt != recordingState_.backendToDisplay.end()) displayPos = btdIt->second;
        if (!recordingState_.selectedStreams.empty()) {
            std::string key = displayPos + "-pointcloud";
            if (recordingState_.selectedStreams.find(key) == recordingState_.selectedStreams.end()) return;
        }
        std::string folder = RecordingState::positionToFolder(displayPos);
        auto it = recordingState_.slots.find(folder);
        if (it == recordingState_.slots.end()) return;
        auto& ss = it->second;
        ss.pcFrameCount++;
        if (ss.pcFrameCount % ss.pcSaveInterval != 0) return;

        size_t pointCount = points.size() / 6; // x,y,z,r,g,b per point
        std::string plyPath = ss.slotDir + "/pointcloud_data/cloud_" + std::to_string(ss.pcFrameCount) + ".ply";
        std::ofstream ofs(winfs::utf8ToAnsi(plyPath), std::ios::binary);
        if (ofs.is_open()) {
            ofs << "ply\nformat ascii 1.0\nelement vertex " << pointCount << "\n"
                << "property float x\nproperty float y\nproperty float z\n"
                << "property uchar red\nproperty uchar green\nproperty uchar blue\n"
                << "end_header\n";
            for (size_t i = 0; i < pointCount; ++i) {
                float x = points[i * 6 + 0];
                float y = points[i * 6 + 1];
                float z = points[i * 6 + 2];
                int r = std::max(0, std::min(255, (int)(points[i * 6 + 3] * 255.0f)));
                int g = std::max(0, std::min(255, (int)(points[i * 6 + 4] * 255.0f)));
                int b = std::max(0, std::min(255, (int)(points[i * 6 + 5] * 255.0f)));
                ofs << x << " " << y << " " << z << " " << r << " " << g << " " << b << "\n";
            }
            ss.frameCount["pointcloud"]++;
        }
    }
}

void HttpServer::updatePoseData(double tx, double ty, double tz,
                                 double qx, double qy, double qz, double qw,
                                 double roll, double pitch, double yaw, uint64_t timestamp) {
    std::lock_guard<std::mutex> lock(poseState_.mutex);
    poseState_.tx = tx; poseState_.ty = ty; poseState_.tz = tz;
    poseState_.qx = qx; poseState_.qy = qy; poseState_.qz = qz; poseState_.qw = qw;
    poseState_.roll = roll; poseState_.pitch = pitch; poseState_.yaw = yaw;
    poseState_.timestamp = timestamp;
    poseState_.hasData = true;
}

bool HttpServer::isStreamActive(const std::string& slot, const std::string& stream) const {
    std::lock_guard<std::mutex> lock(const_cast<std::mutex&>(streamFlagMutex_));
    auto it = streamFlags_.find(slot);
    if (it == streamFlags_.end()) return false;
    auto it2 = it->second.find(stream);
    if (it2 == it->second.end()) return false;
    return it2->second;
}

void HttpServer::setStreamActive(const std::string& slot, const std::string& stream, bool active) {
    std::lock_guard<std::mutex> lock(streamFlagMutex_);
    streamFlags_[slot][stream] = active;
}

// ---- 录制功能 ----

bool HttpServer::isRecording() const {
    return recordingState_.isRecording;
}

void HttpServer::tickCaptureFrame(const std::string& slot, const std::string& streamType) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    auto& states = it->second;
    StreamState* s = nullptr;
    if (streamType == "color") s = &states.color;
    else if (streamType == "depth") s = &states.depth;
    else if (streamType == "ir-left") s = &states.irLeft;
    else if (streamType == "ir-right") s = &states.irRight;
    if (s) s->captureCount++;
}

void HttpServer::tickPointCloudFrame(const std::string& slot) {
    auto it = cameraStates_.find(slot);
    if (it == cameraStates_.end()) return;
    it->second.pointCloudCaptureCount++;
}

std::string HttpServer::buildCaptureFpsJson() {
    std::string json;
    auto now = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::steady_clock::now().time_since_epoch()).count();
    std::lock_guard<std::mutex> lock(const_cast<std::mutex&>(streamFlagMutex_));
    for (auto& slotKv : cameraStates_) {
        const std::string& slot = slotKv.first;
        auto& states = slotKv.second;
        auto addEntry = [&](const std::string& streamName, StreamState& state) {
            if (state.captureCount == 0) return;
            if (state._captureFpsTime == 0) {
                state._captureFpsTime = now;
                state._capturePrevCount = state.captureCount;
                return;
            }
            double dt = (now - state._captureFpsTime) / 1000.0;
            if (dt >= 1.0) {
                double delta = (double)(state.captureCount - state._capturePrevCount);
                state.captureFps = dt > 0 ? delta / dt : 0;
                state._capturePrevCount = state.captureCount;
                state._captureFpsTime = now;
            }
            if (state.captureFps > 0) {
                if (!json.empty()) json += ",";
                json += "\"" + slot + "-" + streamName + "\":" + std::to_string(state.captureFps);
            }
        };
        addEntry("color", states.color);
        addEntry("depth", states.depth);
        addEntry("ir-left", states.irLeft);
        addEntry("ir-right", states.irRight);
        // 统计点云采集帧率，供前端实时显示。
        auto& pc = states;
        if (pc.pointCloudCaptureCount > 0) {
            if (pc._pcCaptureFpsTime == 0) {
                pc._pcCaptureFpsTime = now;
                pc._pcCapturePrevCount = pc.pointCloudCaptureCount;
            } else {
                double pcDt = (now - pc._pcCaptureFpsTime) / 1000.0;
                if (pcDt >= 1.0) {
                    pc.pointCloudCaptureFps = (double)(pc.pointCloudCaptureCount - pc._pcCapturePrevCount) / pcDt;
                    pc._pcCapturePrevCount = pc.pointCloudCaptureCount;
                    pc._pcCaptureFpsTime = now;
                }
            }
            if (pc.pointCloudCaptureFps > 0) {
                if (!json.empty()) json += ",";
                json += "\"" + slot + "-pointcloud\":" + std::to_string(pc.pointCloudCaptureFps);
            }
        }
    }
    // 统计夹爪采样帧率，供前端实时显示。
    for (auto& kv : gripperWebStates_) {
        const std::string& slot = kv.first;
        auto& gs = kv.second;
        if (gs.captureCount == 0) continue;
        if (gs._captureFpsTime == 0) {
            gs._captureFpsTime = now;
            gs._capturePrevCount = gs.captureCount;
            continue;
        }
        double dt = (now - gs._captureFpsTime) / 1000.0;
        if (dt >= 1.0) {
            double delta = (double)(gs.captureCount - gs._capturePrevCount);
            gs.captureFps = dt > 0 ? delta / dt : 0;
            gs._capturePrevCount = gs.captureCount;
            gs._captureFpsTime = now;
        }
        if (gs.captureFps > 0) {
            if (!json.empty()) json += ",";
            json += "\"" + slot + "-gripper\":" + std::to_string(gs.captureFps);
        }
    }
    return json;
}
