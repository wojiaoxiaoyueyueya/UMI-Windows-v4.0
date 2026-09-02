// HttpServerRoutes.cpp - HTTP 路由注册实现
// 集中管理 REST 接口、静态前端入口、MJPEG 推流接口，以及相机/夹爪等设备控制接口。

#include "HttpServer.hpp"
#include "HandPoseManager.hpp"
#include "httplib.h"

#include <algorithm>
#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <fstream>
#include <sstream>
#include <thread>
#include <windows.h>

#include "utils/WinFsUtils.hpp"
#include "utils/JsonHelper.hpp"

static const char* MJPEG_BOUNDARY = "--frameboundary";
extern int STREAM_INTERVAL_MS;

void HttpServer::setupRoutes() {
    // CORS 预检
    svr_->Options(".*", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.status = 204;
    });

    // 启动器使用该接口确认 8080 上运行的是本项目，而不是其他本地服务。
    svr_->Get("/api/system/status", [](const httplib::Request&, httplib::Response& res) {
        json::sendJson(res, "{\"service\":\"umi-data-capture-platform\",\"status\":\"ok\"}");
    });

    // 每个打开的平台页面登记独立客户端。最后一个页面释放后，主程序会走完整
    // 清理流程退出；心跳超时用于浏览器崩溃或断电式关页时的兜底回收。
    svr_->Post("/api/system/client/heartbeat", [this](const httplib::Request& req, httplib::Response& res) {
        const std::string clientId = json::extractStr(req.body, "clientId");
        if (clientId.empty() || clientId.size() > 128) {
            res.status = 400;
            json::sendJson(res, "{\"ok\":false,\"error\":\"invalid client id\"}");
            return;
        }
        registerClientHeartbeat(clientId);
        json::sendJson(res, "{\"ok\":true}");
    });

    svr_->Post("/api/system/client/release", [this](const httplib::Request& req, httplib::Response& res) {
        const std::string clientId = json::extractStr(req.body, "clientId");
        if (!clientId.empty() && clientId.size() <= 128) releaseClient(clientId);
        json::sendJson(res, "{\"ok\":true}");
    });

    // 仅允许本机显式退出后台，避免局域网中的其他设备误关采集服务。
    svr_->Post("/api/system/shutdown", [this](const httplib::Request& req, httplib::Response& res) {
        if (req.remote_addr != "127.0.0.1" && req.remote_addr != "::1") {
            res.status = 403;
            json::sendJson(res, "{\"ok\":false,\"error\":\"local request required\"}");
            return;
        }
        explicitShutdownRequested_ = true;
        json::sendJson(res, "{\"ok\":true}");
    });

    // 单帧快照（调试用）
    svr_->Get("/snapshot/color", [this](const httplib::Request&, httplib::Response& res) {
        std::lock_guard<std::mutex> lock(colorState_.mutex);
        if (colorState_.encodedJpegBuf.empty()) {
            res.status = 503;
            res.set_content("No frame", "text/plain");
            return;
        }
        res.set_content(
            std::string(colorState_.encodedJpegBuf.begin(), colorState_.encodedJpegBuf.end()),
            "image/jpeg");
    });

    // MJPEG 彩色视频流
    svr_->Get("/stream/color", [this](const httplib::Request&, httplib::Response& res) {
        res.set_header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_chunked_content_provider(
            "multipart/x-mixed-replace; boundary=frameboundary",
            [this](size_t, httplib::DataSink& sink) -> bool {
                uint64_t lastSentTs = 0;
                while (running_) {
                    std::this_thread::sleep_for(std::chrono::milliseconds(STREAM_INTERVAL_MS));
                    std::vector<uchar> jpeg;
                    uint64_t ts;
                    {
                        std::lock_guard<std::mutex> lock(colorState_.mutex);
                        if (!colorState_.hasData || colorState_.encodedTimestamp == lastSentTs) continue;
                        if (colorState_.encodedJpegBuf.empty()) continue;
                        jpeg = colorState_.encodedJpegBuf;
                        ts = colorState_.encodedTimestamp;
                        lastSentTs = ts;
                    }
                    std::string header = std::string(MJPEG_BOUNDARY) + "\r\nContent-Type: image/jpeg\r\nContent-Length: "
                        + std::to_string(jpeg.size()) + "\r\n\r\n";
                    if (!sink.write(header.c_str(), header.size())) return false;
                    if (!sink.write(reinterpret_cast<const char*>(jpeg.data()), jpeg.size())) return false;
                    if (!sink.write("\r\n", 2)) return false;
                }
                return false;
            }
        );
    });

    // 预览流帧率查询：这是 MJPEG 编码/推流帧率，主要反映浏览器预览速度。
    svr_->Get("/api/stream_fps", [this](const httplib::Request&, httplib::Response& res) {
        json::sendJson(res, "{" + buildStreamFpsJson() + "}");
    });

    // 综合帧率查询：capture 表示设备数据进入后端的真实采集频率，preview 表示网页预览编码频率。
    svr_->Get("/api/fps", [this](const httplib::Request&, httplib::Response& res) {
        json::sendJson(res,
            "{\"capture\":{" + buildCaptureFpsJson() + "},"
            "\"preview\":{" + buildStreamFpsJson() + "}}");
    });

    // 流开关控制
    svr_->Get("/api/control", [this](const httplib::Request& req, httplib::Response& res) {
        std::string stream = req.get_param_value("stream");
        std::string action = req.get_param_value("action");
        if (!stream.empty() && !action.empty()) {
            bool val = (action == "on" || action == "1");
            if (stream == "color") colorEnabled_ = val;
            else if (stream == "gripper") gripperEnabled_ = val;
            else {
                // 解析 per-slot 流名: "left-color" → slot="left", type="color"
                auto dash = stream.find('-');
                if (dash != std::string::npos) {
                    std::string slot = stream.substr(0, dash);
                    std::string type = stream.substr(dash + 1);
                    setStreamActive(slot, type, val);
                }
            }
        }
        // 构建包含多路流的 JSON
        std::string json = "{\"color\":";
        json += colorEnabled_ ? "true" : "false";
        json += ",\"gripper\":";
        json += gripperEnabled_ ? "true" : "false";
        // 添加多路流状态
        for (auto& kv : cameraStates_) {
            json += ",\"" + kv.first + "-color\":";
            json += isStreamActive(kv.first, "color") ? "true" : "false";
            json += ",\"" + kv.first + "-depth\":";
            json += isStreamActive(kv.first, "depth") ? "true" : "false";
            json += ",\"" + kv.first + "-ir-left\":";
            json += isStreamActive(kv.first, "ir-left") ? "true" : "false";
            json += ",\"" + kv.first + "-ir-right\":";
            json += isStreamActive(kv.first, "ir-right") ? "true" : "false";
            json += ",\"" + kv.first + "-pointcloud\":";
            json += isStreamActive(kv.first, "pointcloud") ? "true" : "false";
        }
        // 槽位名称固定，不遍历可能由热插拔线程更新的夹爪引用表。
        for (const auto& slot : {std::string("left"), std::string("right"), std::string("extra")}) {
            json += ",\"" + slot + "-gripper\":";
            json += isStreamActive(slot, "gripper") ? "true" : "false";
        }
        json += "}";
        json::sendJson(res, json);
    });
    svr_->Post("/api/control", [this](const httplib::Request& req, httplib::Response& res) {
        std::string body = req.body;
        auto parseFrom = [](const std::string& src, const std::string& param) -> std::string {
            auto key = param + "=";
            auto pos = src.find(key);
            if (pos == std::string::npos) return "";
            auto start = pos + key.size();
            auto end = src.find('&', start);
            if (end == std::string::npos) end = src.size();
            return src.substr(start, end - start);
        };
        std::string stream = parseFrom(body, "stream");
        std::string action = parseFrom(body, "action");
        if (!stream.empty() && !action.empty()) {
            bool val = (action == "on" || action == "1");
            if (stream == "color") colorEnabled_ = val;
            else if (stream == "gripper") gripperEnabled_ = val;
            else {
                // 解析 per-slot 流名: "left-color" → slot="left", type="color"
                auto dash = stream.find('-');
                if (dash != std::string::npos) {
                    std::string slot = stream.substr(0, dash);
                    std::string type = stream.substr(dash + 1);
                    setStreamActive(slot, type, val);
                }
            }
        }
        std::string json = "{\"color\":";
        json += colorEnabled_ ? "true" : "false";
        json += ",\"gripper\":";
        json += gripperEnabled_ ? "true" : "false";
        for (auto& kv : cameraStates_) {
            json += ",\"" + kv.first + "-color\":";
            json += isStreamActive(kv.first, "color") ? "true" : "false";
            json += ",\"" + kv.first + "-depth\":";
            json += isStreamActive(kv.first, "depth") ? "true" : "false";
            json += ",\"" + kv.first + "-ir-left\":";
            json += isStreamActive(kv.first, "ir-left") ? "true" : "false";
            json += ",\"" + kv.first + "-ir-right\":";
            json += isStreamActive(kv.first, "ir-right") ? "true" : "false";
            json += ",\"" + kv.first + "-pointcloud\":";
            json += isStreamActive(kv.first, "pointcloud") ? "true" : "false";
        }
        for (const auto& slot : {std::string("left"), std::string("right"), std::string("extra")}) {
            json += ",\"" + slot + "-gripper\":";
            json += isStreamActive(slot, "gripper") ? "true" : "false";
        }
        json += "}";
        json::sendJson(res, json);
    });

    // 夹爪数据查询（按 slot）
    auto gripperJsonHelper = [this](const std::string& slot) -> std::string {
        auto it = gripperWebStates_.find(slot);
        if (it == gripperWebStates_.end()) {
            return "{\"has\":false,\"connected\":false,\"slot\":\"" + slot + "\"}";
        }
        auto& gs = it->second;
        std::lock_guard<std::mutex> lock(gs.mutex);
        if (!gs.hasData) {
            return "{\"has\":false,\"connected\":false,\"slot\":\"" + slot + "\"}";
        }
        UmiGripper* gripper = getUmiGripper(slot);
        bool connected = gripper && gripper->isConnected();
        char json[4096];
        snprintf(json, sizeof(json),
            "{\"has\":true,\"connected\":%s,\"slot\":\"%s\","
            "\"position\":%.6f,\"button1\":%d,\"button2\":%d,\"timestamp\":%lu,"
            "\"captureFps\":%.2f,\"extended\":%s,\"protocolVersion\":%d,"
            "\"payloadLength\":%d,\"deviceId\":%d,\"encoderRaw\":%lu,"
            "\"positionRaw\":%lu,\"positionFallback\":%s,"
            "\"lastV4Command\":%d,\"hasDeviceParams\":%s,"
            "\"txAddress\":%u,\"txFrequency\":%u,\"rxAddress\":%u,\"rxFrequency\":%u,"
            "\"ledR\":%u,\"ledG\":%u,\"ledB\":%u,\"ledBrightness\":%u,"
            "\"accel\":[%d,%d,%d],\"gyro\":[%d,%d,%d],"
            "\"force\":[%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d],"
            "\"forceCount\":%d,\"forceMaxAbs\":%d}",
            connected ? "true" : "false", slot.c_str(),
            gs.position, (int)gs.button1, (int)gs.button2,
            (unsigned long)gs.timestamp,
            gs.captureFps, gs.hasExtendedData ? "true" : "false", (int)gs.protocolVersion,
            (int)gs.payloadLength, (int)gs.deviceId, (unsigned long)gs.encoderRaw,
            (unsigned long)gs.positionRaw, gs.positionFallback ? "true" : "false",
            (int)gs.lastV4Command, gs.hasDeviceParams ? "true" : "false",
            (unsigned)gs.txAddress, (unsigned)gs.txFrequency, (unsigned)gs.rxAddress, (unsigned)gs.rxFrequency,
            (unsigned)gs.ledR, (unsigned)gs.ledG, (unsigned)gs.ledB, (unsigned)gs.ledBrightness,
            (int)gs.accel[0], (int)gs.accel[1], (int)gs.accel[2],
            (int)gs.gyro[0], (int)gs.gyro[1], (int)gs.gyro[2],
            (int)gs.force[0], (int)gs.force[1], (int)gs.force[2], (int)gs.force[3],
            (int)gs.force[4], (int)gs.force[5], (int)gs.force[6], (int)gs.force[7],
            (int)gs.force[8], (int)gs.force[9], (int)gs.force[10], (int)gs.force[11],
            (int)gs.forceCount, gs.forceMaxAbs);
        return json;
    };

    svr_->Get("/api/gripper/:slot", [this, gripperJsonHelper](const httplib::Request& req, httplib::Response& res) {
        std::string slot = req.path_params.at("slot");
        json::sendJson(res, gripperJsonHelper(slot));
    });

    // 向后兼容：无 slot 参数返回第一个有数据的夹爪
    svr_->Get("/api/gripper", [this, gripperJsonHelper](const httplib::Request&, httplib::Response& res) {
        for (auto& kv : gripperWebStates_) {
            bool hasData = false;
            {
                std::lock_guard<std::mutex> lock(kv.second.mutex);
                hasData = kv.second.hasData;
            }
            if (hasData) {
                json::sendJson(res, gripperJsonHelper(kv.first));
                return;
            }
        }
        json::sendJson(res, "{\"has\":false,\"connected\":false}");
    });

    // 夹爪控制辅助函数
    auto gripperControlHelper = [this](const std::string& slot, const std::string& body) -> std::string {
        std::string action = json::extractStr(body, "action");
        UmiGripper* gripper = getUmiGripper(slot);

        if (action == "connect") {
            bool ok = false;
            if (gripper) {
                auto ports = UmiGripper::scanSerialPorts();
                for (const auto& p : ports) {
                    if (gripper->open(p)) { ok = true; break; }
                }
            }
            return ok ? "{\"success\":true}" : "{\"success\":false,\"error\":\"no gripper device found\"}";
        } else if (action == "disconnect") {
            if (gripper) gripper->close();
            return "{\"success\":true}";
        } else if (action == "reboot") {
            if (gripper && gripper->isConnected()) {
                gripper->close();
                auto ports = UmiGripper::scanSerialPorts();
                std::string port;
                for (const auto& p : ports) {
                    if (gripper->open(p)) { port = p; break; }
                }
                return port.empty() ? "{\"success\":false,\"error\":\"reconnect failed\"}" : "{\"success\":true}";
            }
            return "{\"success\":false,\"error\":\"gripper not connected\"}";
        } else if (action == "read") {
            return gripper && gripper->isConnected()
                ? "{\"success\":true}" : "{\"success\":false,\"error\":\"gripper not connected\"}";
        } else if (action == "v4_single_report" || action == "v4_read_params" ||
                   action == "v4_force_zero" || action == "v4_start_stream") {
            bool ok = gripper && gripper->sendV4Action(action);
            return ok ? "{\"success\":true}" : "{\"success\":false,\"error\":\"v4 gripper not connected\"}";
        } else if (action == "led") {
            int r = json::extractInt(body, "r");
            int g = json::extractInt(body, "g");
            int b = json::extractInt(body, "b");
            int brightness = json::extractInt(body, "brightness");
            if (r < 0 || g < 0 || b < 0 || brightness < 0) {
                return "{\"success\":false,\"error\":\"missing led parameters\"}";
            }
            // 优先使用已激活的夹爪引用，否则从设备管理器回退。
            if (gripper) {
                gripper->setLed(r, g, b, brightness);
                return "{\"success\":true}";
            } else if (deviceManager_) {
                auto* gs = deviceManager_->getGripperSlot(slot);
                if (gs && gs->gripper && gs->connected) {
                    gs->gripper->setLed(r, g, b, brightness);
                    return "{\"success\":true}";
                }
            }
            return "{\"success\":false,\"error\":\"gripper not available\"}";
        }
        return "{\"success\":false,\"error\":\"unknown action\"}";
    };

    svr_->Post("/api/gripper/:slot/control", [this, gripperControlHelper](const httplib::Request& req, httplib::Response& res) {
        std::string slot = req.path_params.at("slot");
        json::sendJson(res, gripperControlHelper(slot, req.body));
    });

    // 向后兼容
    svr_->Post("/api/gripper/control", [this, gripperControlHelper](const httplib::Request& req, httplib::Response& res) {
        std::string slot = "left";
        for (const auto& candidate : {std::string("left"), std::string("right"), std::string("extra")}) {
            if (getUmiGripper(candidate)) {
                slot = candidate;
                break;
            }
        }
        json::sendJson(res, gripperControlHelper(slot, req.body));
    });

    // 设备信息
    svr_->Get("/api/device", [this](const httplib::Request&, httplib::Response& res) {
        std::lock_guard<std::mutex> lock(deviceInfoState_.mutex);
        if (!deviceInfoState_.hasData) {
            json::sendJson(res, "{\"has\":false}");
            return;
        }
        char json[1024];
        snprintf(json, sizeof(json),
            "{\"has\":true,\"name\":\"%s\",\"pid\":%d,\"vid\":%d,"
            "\"serial\":\"%s\",\"firmware\":\"%s\",\"lastUpdate\":%lu}",
            json::escape(deviceInfoState_.name).c_str(), deviceInfoState_.pid, deviceInfoState_.vid,
            json::escape(deviceInfoState_.serialNumber).c_str(),
            json::escape(deviceInfoState_.firmwareVersion).c_str(),
            (unsigned long)deviceInfoState_.lastUpdateTime);
        json::sendJson(res, json);
    });

    // 录制控制
    svr_->Get("/api/record", [this](const httplib::Request&, httplib::Response& res) {
        std::lock_guard<std::mutex> lock(recordingState_.mutex);
        uint64_t totalFrames = 0, totalGripper = 0;
        std::string perSlotJson;
        for (auto& kv : recordingState_.slots) {
            auto& ss = kv.second;
            std::string posName = ss.position;
            if (!perSlotJson.empty()) perSlotJson += ",";
            perSlotJson += "\"" + json::escape(posName) + "\":{";
            std::string streamEntries;
            for (auto& fk : ss.frameCount) {
                totalFrames += fk.second;
                if (!streamEntries.empty()) streamEntries += ",";
                streamEntries += "\"" + fk.first + "\":" + std::to_string(fk.second);
            }
            if (ss.gripperCount > 0) {
                totalGripper += ss.gripperCount;
                if (!streamEntries.empty()) streamEntries += ",";
                streamEntries += "\"gripper\":" + std::to_string(ss.gripperCount);
            }
            perSlotJson += streamEntries + "}";
        }
        char json[6144];
        auto captureFps = buildCaptureFpsJson();
        uint64_t nowUs = std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
        uint64_t elapsedMs = 0;
        if (recordingState_.startTime > 0) {
            uint64_t endUs = recordingState_.isRecording ? nowUs : recordingState_.stopTime;
            if (endUs > recordingState_.startTime) elapsedMs = (endUs - recordingState_.startTime) / 1000;
        }
        snprintf(json, sizeof(json),
            "{\"recording\":%s,\"finalizing\":%s,\"sessionId\":\"%s\","
            "\"startTimeMs\":%llu,\"elapsedMs\":%llu,"
            "\"frameCount\":{\"total\":%lu},"
            "\"gripperCount\":%lu,"
            "\"perSlot\":{%s},"
            "\"streamFps\":{%s},"
            "\"captureFps\":{%s},"
            "\"warnings\":[%s]}",
            recordingState_.isRecording ? "true" : "false",
            recordingState_.finalizing ? "true" : "false",
            json::escape(recordingState_.sessionId).c_str(),
            (unsigned long long)(recordingState_.startTime / 1000),
            (unsigned long long)elapsedMs,
            (unsigned long)totalFrames,
            (unsigned long)totalGripper,
            perSlotJson.c_str(),
            buildStreamFpsJson().c_str(),
            captureFps.c_str(),
            buildWarningsJson().c_str());
        json::sendJson(res, json);
    });

    svr_->Post("/api/record", [this](const httplib::Request& req, httplib::Response& res) {
        std::string body = req.body;
        std::string action = json::extractStr(body, "action");
        if (action == "start") {
            std::vector<std::string> types = json::extractStringArray(body, "types");
            std::vector<std::string> slots = json::extractStringArray(body, "slots");
            std::vector<std::string> streams = json::extractStringArray(body, "streams");
            std::map<std::string, std::string> slotMapping = json::extractStringMap(body, "slotMapping");
            std::map<std::string, std::string> gripperSlotMapping = json::extractStringMap(body, "gripperSlotMapping");
            std::string saveMode = json::extractStr(body, "saveMode");
            if (saveMode != "fast") saveMode = "strict";
            startRecording(types, slots, streams, slotMapping, gripperSlotMapping, saveMode);
        } else if (action == "stop") {
            try { stopRecording(); } catch (...) {}
        }
        std::lock_guard<std::mutex> lock(recordingState_.mutex);
        // 按槽位和流类型构建帧数 JSON，前端用它实时显示各路采集数量。
        uint64_t totalFrames = 0, totalGripper = 0;
        std::string perSlotJson;
        for (auto& kv : recordingState_.slots) {
            const std::string& folder = kv.first;
            auto& ss = kv.second;
            // 从目录名还原显示位置，例如 "1Left-umi" 对应前端的 left。
            std::string posName = ss.position;
            if (!perSlotJson.empty()) perSlotJson += ",";
            perSlotJson += "\"" + posName + "\":{";
            std::string streamEntries;
            for (auto& fk : ss.frameCount) {
                totalFrames += fk.second;
                if (!streamEntries.empty()) streamEntries += ",";
                streamEntries += "\"" + fk.first + "\":" + std::to_string(fk.second);
            }
            if (ss.gripperCount > 0) {
                totalGripper += ss.gripperCount;
                if (!streamEntries.empty()) streamEntries += ",";
                streamEntries += "\"gripper\":" + std::to_string(ss.gripperCount);
            }
            perSlotJson += streamEntries + "}";
        }
        char json[6144];
        auto captureFps = buildCaptureFpsJson();
        uint64_t nowUs = std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::system_clock::now().time_since_epoch()).count();
        uint64_t elapsedMs = 0;
        if (recordingState_.startTime > 0) {
            uint64_t endUs = recordingState_.isRecording ? nowUs : recordingState_.stopTime;
            if (endUs > recordingState_.startTime) elapsedMs = (endUs - recordingState_.startTime) / 1000;
        }
        snprintf(json, sizeof(json),
            "{\"recording\":%s,\"finalizing\":%s,\"sessionId\":\"%s\","
            "\"startTimeMs\":%llu,\"elapsedMs\":%llu,"
            "\"frameCount\":{\"total\":%lu},"
            "\"gripperCount\":%lu,"
            "\"perSlot\":{%s},"
            "\"streamFps\":{%s},"
            "\"captureFps\":{%s},"
            "\"warnings\":[%s]}",
            recordingState_.isRecording ? "true" : "false",
            recordingState_.finalizing ? "true" : "false",
            json::escape(recordingState_.sessionId).c_str(),
            (unsigned long long)(recordingState_.startTime / 1000),
            (unsigned long long)elapsedMs,
            (unsigned long)totalFrames,
            (unsigned long)totalGripper,
            perSlotJson.c_str(),
            buildStreamFpsJson().c_str(),
            captureFps.c_str(),
            buildWarningsJson().c_str());
        json::sendJson(res, json);
    });

    // 查询保存任务队列状态（前端按 sessionId 轮询各任务的保存进度）
    svr_->Get("/api/record/save_status", [this](const httplib::Request&, httplib::Response& res) {
        std::lock_guard<std::mutex> lock(finalizeQueueMutex_);
        std::string json = "{\"tasks\":[";
        bool first = true;
        for (auto& t : finalizeTasks_) {
            if (!first) json += ",";
            first = false;
            const char* statusStr = "pending";
            if (t.status == FinalizeTask::RUNNING) statusStr = "running";
            else if (t.status == FinalizeTask::COMPLETED) statusStr = "completed";
            else if (t.status == FinalizeTask::CANCELLED) statusStr = "cancelled";
            json += "{\"sessionId\":\"" + json::escape(t.sessionId) + "\",\"status\":\"" + statusStr + "\"}";
        }
        json += "]}";
        json::sendJson(res, json);
    });

    // 取消保存任务（点击❌时调用，数据不存储在本地文件夹）
    svr_->Post("/api/record/cancel_save", [this](const httplib::Request& req, httplib::Response& res) {
        std::string sessionId = json::extractStr(req.body, "sessionId");
        bool ok = cancelFinalize(sessionId);
        json::sendJson(res, ok ? "{\"success\":true}" : "{\"success\":false,\"error\":\"not found\"}");
    });

    // 录制历史
    svr_->Get("/api/record/history", [this](const httplib::Request&, httplib::Response& res) {
        std::string baseDir = getRecordingBaseDir();
        std::string historyPath = baseDir + "/_history.txt";
        std::vector<std::string> sessions;
        auto addSession = [&](const std::string& sid) {
            if (sid.empty()) return;
            if (!winfs::dirExists(baseDir + "/" + sid)) return;
            if (std::find(sessions.begin(), sessions.end(), sid) == sessions.end()) sessions.push_back(sid);
        };
        auto looksLikeSession = [](const std::string& name) {
            if (name.size() != 15) return false;
            if (name[8] != '_') return false;
            for (size_t i = 0; i < name.size(); ++i) {
                if (i == 8) continue;
                if (name[i] < '0' || name[i] > '9') return false;
            }
            return true;
        };

        std::ifstream ifs(winfs::utf8ToAnsi(historyPath));
        if (ifs.is_open()) {
            std::string line;
            while (std::getline(ifs, line)) {
                addSession(line);
            }
        }
        if (winfs::dirExists(baseDir)) {
            auto entries = winfs::listDirEntries(baseDir);
            std::sort(entries.begin(), entries.end(), [](const winfs::DirEntry& a, const winfs::DirEntry& b) {
                return a.name < b.name;
            });
            for (const auto& e : entries) {
                if (e.isDir && looksLikeSession(e.name)) addSession(e.name);
            }
        }
        std::string json = "{\"sessions\":[";
        for (size_t i = 0; i < sessions.size(); ++i) {
            if (i > 0) json += ",";
            json += "\"" + json::escape(sessions[i]) + "\"";
        }
        json += "]}";
        json::sendJson(res, json);
    });

    // 可转换会话列表
    svr_->Get("/api/convert/sessions", [this](const httplib::Request& req, httplib::Response& res) {
        std::string sourceDir = getRecordingBaseDir();
        std::string dirParam = req.get_param_value("dir");
        if (!dirParam.empty()) {
            std::string resolved = winfs::resolvePath(dirParam);
            if (winfs::dirExists(resolved)) sourceDir = resolved;
        }

        std::string result = "{\"sessions\":[";
        if (winfs::dirExists(sourceDir)) {
            auto entries = winfs::listDirEntries(sourceDir);
            bool first = true;
            for (auto& ent : entries) {
                if (!ent.isDir) continue;
                std::string subPath = sourceDir + "/" + ent.name;
                std::string metaContent = winfs::readFileToString(subPath + "/metadata.json");
                if (metaContent.empty()) continue;
                while (!metaContent.empty() && (metaContent.back() == '\n' || metaContent.back() == '\r' || metaContent.back() == ' '))
                    metaContent.pop_back();
                bool valid = !metaContent.empty() && metaContent[0] == '{' && metaContent.back() == '}';
                if (!valid)
                    metaContent = "{\"sessionId\":\"" + json::escape(ent.name) + "\",\"frameCount\":{\"color\":0}}";
                if (!first) result += ",";
                first = false;
                long long dirSize = winfs::getDirSizeRecursive(subPath);
                result += "{\"id\":\"" + json::escape(ent.name) + "\",\"path\":\"" + json::escape(subPath)
                    + "\",\"size\":" + std::to_string(dirSize) + ",\"metadata\":" + metaContent + "}";
            }
        }
        result += "]}";
        json::sendJson(res, result);
    });

    // 启动转换
    svr_->Post("/api/convert", [this](const httplib::Request& req, httplib::Response& res) {
        std::string action = json::extractStr(req.body, "action");
        if (action == "start") {
            std::string sourceDir = json::extractStr(req.body, "sourceDir");
            std::string task = json::extractStr(req.body, "task");
            std::string outputDir = json::extractStr(req.body, "outputDir");
            std::string format = json::extractStr(req.body, "format");
            if (format != "hdf5" && format != "rlds") format = "lerobot";
            std::vector<std::string> sessions = json::extractStringArray(req.body, "sessions");
            bool ok = startConversion(sourceDir, sessions, task, outputDir, format);
            json::sendJson(res, ok ? "{\"started\":true}" : "{\"started\":false,\"error\":\"busy or empty\"}");
        } else {
            json::sendJson(res, "{\"error\":\"unknown action\"}");
        }
    });

    // 转换进度
    svr_->Get("/api/convert/progress", [this](const httplib::Request&, httplib::Response& res) {
        std::lock_guard<std::mutex> lock(convertState_.mutex);
        std::string cl = "[";
        for (size_t i = 0; i < convertState_.convertedSessions.size(); i++) {
            if (i > 0) cl += ",";
            cl += "\"" + convertState_.convertedSessions[i] + "\"";
        }
        cl += "]";
        std::string sl = "[";
        for (size_t i = 0; i < convertState_.skippedSessions.size(); i++) {
            if (i > 0) sl += ",";
            sl += "\"" + convertState_.skippedSessions[i] + "\"";
        }
        sl += "]";
        char json[2048];
        snprintf(json, sizeof(json),
            "{\"converting\":%s,\"total\":%d,\"done\":%d,"
            "\"current\":\"%s\",\"step\":\"%s\","
            "\"progress\":%.2f,\"error\":\"%s\",\"converted\":%s,\"skipped\":%s}",
            convertState_.converting ? "true" : "false",
            convertState_.totalSessions,
            convertState_.completedSessions,
            json::escape(convertState_.currentSession).c_str(),
            json::escape(convertState_.currentStep).c_str(),
            convertState_.totalSessions > 0
                ? (double)convertState_.completedSessions / convertState_.totalSessions : 0.0,
            json::escape(convertState_.error).c_str(), cl.c_str(), sl.c_str());
        json::sendJson(res, json);
    });

    // ---- 云端数据平台上传 ----
    // 登录、任务查询和文件传输都委托给本地 Python 工具。HTTP 层只转发
    // JSON 结果，避免浏览器保存部署凭据或直接与云端建立跨域连接。
    svr_->Get("/api/eidp/config", [this](const httplib::Request&, httplib::Response& res) {
        int exitCode = 1;
        json::sendJson(res, runPlatformAction("public_config", "{}", exitCode));
    });

    svr_->Post("/api/eidp/config", [this](const httplib::Request& req, httplib::Response& res) {
        if (req.body.size() > 16 * 1024) {
            res.status = 413;
            json::sendJson(res, "{\"ok\":false,\"error\":\"配置内容过大\"}");
            return;
        }
        int exitCode = 1;
        json::sendJson(res, runPlatformAction("save_config", req.body, exitCode));
    });

    svr_->Post("/api/eidp/login", [this](const httplib::Request& req, httplib::Response& res) {
        if (req.body.size() > 16 * 1024) {
            res.status = 413;
            json::sendJson(res, "{\"ok\":false,\"error\":\"登录请求过大\"}");
            return;
        }
        int exitCode = 1;
        json::sendJson(res, runPlatformAction("login", req.body, exitCode));
    });

    svr_->Post("/api/eidp/tasks", [this](const httplib::Request& req, httplib::Response& res) {
        int exitCode = 1;
        json::sendJson(res, runPlatformAction("tasks", req.body, exitCode));
    });

    svr_->Post("/api/eidp/instances", [this](const httplib::Request& req, httplib::Response& res) {
        int exitCode = 1;
        json::sendJson(res, runPlatformAction("instances", req.body, exitCode));
    });

    svr_->Post("/api/eidp/upload", [this](const httplib::Request& req, httplib::Response& res) {
        if (req.body.size() > 64 * 1024) {
            res.status = 413;
            json::sendJson(res, "{\"ok\":false,\"error\":\"上传请求过大\"}");
            return;
        }
        std::string error;
        const bool started = startPlatformUpload(req.body, error);
        json::sendJson(res, started
            ? "{\"ok\":true,\"started\":true}"
            : "{\"ok\":false,\"error\":\"" + json::escape(error) + "\"}");
    });

    svr_->Get("/api/eidp/upload/progress", [this](const httplib::Request&, httplib::Response& res) {
        json::sendJson(res, getPlatformUploadProgress());
    });

    // 路径配置
    svr_->Get("/api/paths", [this](const httplib::Request&, httplib::Response& res) {
        const std::string collectDir = getRecordingBaseDir();
        const std::string convertDir = getConvertOutputDir();
        char json[2048];
        snprintf(json, sizeof(json),
            "{\"collect\":\"%s\",\"converted\":\"%s\"}",
            json::escape(collectDir).c_str(),
            json::escape(convertDir).c_str());
        json::sendJson(res, json);
    });

    svr_->Post("/api/paths", [this](const httplib::Request& req, httplib::Response& res) {
        std::string collect = json::extractStr(req.body, "collect");
        std::string converted = json::extractStr(req.body, "converted");
        bool success = true;
        std::string error;
        if (!collect.empty()) {
            std::string resolved = winfs::resolvePath(collect);
            if (!winfs::dirExists(resolved)) {
                success = false;
                error = "collect directory does not exist";
            } else if (!setRecordingBaseDir(resolved)) {
                success = false;
                error = "录制或保存过程中不能修改采集目录";
            }
        }
        if (!converted.empty()) {
            std::string resolved = winfs::resolvePath(converted);
            if (!winfs::dirExists(resolved)) {
                success = false;
                if (error.empty()) error = "converted directory does not exist";
            } else {
                setConvertOutputDir(resolved);
            }
        }
        const std::string collectDir = getRecordingBaseDir();
        const std::string convertDir = getConvertOutputDir();
        char json[2048];
        snprintf(json, sizeof(json),
            "{\"success\":%s,\"error\":\"%s\",\"collect\":\"%s\",\"converted\":\"%s\"}",
            success ? "true" : "false", json::escape(error).c_str(),
            json::escape(collectDir).c_str(), json::escape(convertDir).c_str());
        json::sendJson(res, json);
    });

    // 目录浏览
    svr_->Get("/api/browse-dir", [this](const httplib::Request& req, httplib::Response& res) {
        std::string dirPath = req.get_param_value("path");
        if (dirPath.empty()) dirPath = "D:\\";

        std::string parent = dirPath;
        // 统一路径分隔符，避免前端传入的斜杠和 Windows 反斜杠混用。
        for (char& c : parent) { if (c == '/') c = '\\'; }
        // 去掉尾部多余反斜杠，但保留盘符根路径后的反斜杠。
        while (parent.size() > 3 && parent.back() == '\\')
            parent.pop_back();
        // 找到最后一个反斜杠，用于计算当前路径的父目录。
        auto pos = parent.rfind('\\');
        if (pos != std::string::npos && pos > 3) {
            parent = parent.substr(0, pos);
        } else {
            // 已经位于盘符根目录，例如 "C:\"，继续向上只能保持当前根目录。
            parent = parent.substr(0, 3);
        }

        std::string result = "{\"path\":\"" + json::escape(dirPath) + "\",\"parent\":\"" + json::escape(parent) + "\",\"dirs\":[";
        if (winfs::dirExists(dirPath)) {
            std::vector<std::string> dirNames;
            auto entries = winfs::listDirEntries(dirPath);
            for (auto& e : entries) {
                if (e.isDir) dirNames.push_back(e.name);
            }
            std::sort(dirNames.begin(), dirNames.end());
            for (size_t i = 0; i < dirNames.size(); i++) {
                if (i > 0) result += ",";
                result += "\"" + json::escape(dirNames[i]) + "\"";
            }
        }
        result += "]}";
        json::sendJson(res, result);
    });

    // 数据浏览
    svr_->Get("/api/data/browse", [this](const httplib::Request& req, httplib::Response& res) {
        std::string dirType = req.get_param_value("dir");
        std::string dataDir = (dirType == "converted" || dirType == "转换")
            ? getConvertOutputDir() : getRecordingBaseDir();

        std::string result = "{\"sessions\":[";
        if (winfs::dirExists(dataDir)) {
            auto entries = winfs::listDirEntries(dataDir);
            std::sort(entries.begin(), entries.end(), [](const winfs::DirEntry& a, const winfs::DirEntry& b) {
                return a.name > b.name;
            });

            bool first = true;
            for (auto& ent : entries) {
                if (!ent.isDir) continue;
                std::string subPath = dataDir + "/" + ent.name;
                long long dirSize = winfs::getDirSizeRecursive(subPath);
                int fileCount = winfs::countFilesRecursive(subPath);
                auto subdirs = winfs::listSubdirs(subPath);

                std::string metaContent = winfs::readFileToString(subPath + "/metadata.json");
                while (!metaContent.empty() && (metaContent.back() == '\n' || metaContent.back() == '\r' || metaContent.back() == ' '))
                    metaContent.pop_back();
                bool valid = !metaContent.empty() && metaContent[0] == '{' && metaContent.back() == '}';
                if (!valid)
                    metaContent = "{\"sessionId\":\"" + json::escape(ent.name) + "\"}";

                std::string metaInfoContent = winfs::readFileToString(subPath + "/meta/info.json");

                if (!first) result += ",";
                first = false;
                result += "{\"id\":\"" + json::escape(ent.name) + "\"";
                result += ",\"path\":\"" + json::escape(subPath) + "\"";
                result += ",\"size\":" + std::to_string(dirSize);
                result += ",\"fileCount\":" + std::to_string(fileCount);
                result += ",\"created\":" + std::to_string((long)ent.modTime);
                result += ",\"subdirs\":[";
                for (size_t d = 0; d < subdirs.size(); d++) {
                    if (d > 0) result += ",";
                    result += "\"" + json::escape(subdirs[d]) + "\"";
                }
                result += "]";
                result += ",\"metadata\":" + metaContent;
                if (!metaInfoContent.empty() && metaInfoContent[0] == '{')
                    result += ",\"info\":" + metaInfoContent;
                result += "}";
            }
        }
        result += "]}";
        json::sendJson(res, result);
    });

    // 数据详情
    svr_->Get("/api/data/detail", [this](const httplib::Request& req, httplib::Response& res) {
        std::string sessionId = winfs::urlDecode(req.get_param_value("id"));
        std::string dirType = req.get_param_value("dir");
        if (sessionId.empty()) {
            json::sendJson(res, "{\"error\":\"missing id\"}");
            return;
        }

        std::string dataDir = (dirType == "converted")
            ? getConvertOutputDir() : getRecordingBaseDir();
        std::string sessionPath = dataDir + "/" + sessionId;
        if (!winfs::dirExists(sessionPath)) {
            json::sendJson(res, "{\"error\":\"session not found\"}");
            return;
        }

        std::string result = "{\"id\":\"" + json::escape(sessionId) + "\"";
        result += ",\"path\":\"" + json::escape(sessionPath) + "\"";

        std::string mc = winfs::readFileToString(sessionPath + "/metadata.json");
        if (!mc.empty() && mc[0] == '{') result += ",\"metadata\":" + mc;
        std::string ic = winfs::readFileToString(sessionPath + "/meta/info.json");
        if (!ic.empty() && ic[0] == '{') result += ",\"info\":" + ic;

        // 收集文件列表
        result += ",\"files\":[";
        std::vector<std::pair<std::string, winfs::DirEntry>> files;
        auto topEntries = winfs::listDirEntries(sessionPath);
        for (auto& e : topEntries) {
            if (!e.isDir) files.push_back({ e.name, e });
        }
        // 子目录文件
        auto subdirs = winfs::listSubdirs(sessionPath);
        for (auto& sd : subdirs) {
            std::string sdPath = sessionPath + "/" + sd;
            auto sdEntries = winfs::listDirEntries(sdPath);
            for (auto& e : sdEntries) {
                if (!e.isDir) files.push_back({ sd + "/" + e.name, e });
            }
            // 二级子目录
            auto sd2Dirs = winfs::listSubdirs(sdPath);
            for (auto& sd2 : sd2Dirs) {
                std::string sd2Path = sdPath + "/" + sd2;
                auto sd2Entries = winfs::listDirEntries(sd2Path);
                for (auto& e : sd2Entries) {
                    if (!e.isDir) files.push_back({ sd + "/" + sd2 + "/" + e.name, e });
                }
            }
        }
        std::sort(files.begin(), files.end(), [](const auto& a, const auto& b) { return a.first < b.first; });

        for (size_t i = 0; i < files.size(); i++) {
            if (i > 0) result += ",";
            std::string fname = files[i].first;
            std::string ext;
            auto dotPos = fname.rfind('.');
            if (dotPos != std::string::npos) ext = fname.substr(dotPos + 1);
            std::string type = "other";
            if (ext == "mp4" || ext == "avi" || ext == "mkv") type = "video";
            else if (ext == "csv") type = "csv";
            else if (ext == "json") type = "json";
            else if (ext == "ply") type = "ply";
            else if (ext == "parquet") type = "parquet";
            else if (ext == "txt") type = "text";
            result += "{\"name\":\"" + json::escape(fname) + "\"";
            result += ",\"size\":" + std::to_string(files[i].second.fileSize);
            result += ",\"type\":\"" + type + "\"}";
        }
        result += "]}";
        json::sendJson(res, result);
    });

    // 数据删除
    svr_->Post("/api/data/delete", [this](const httplib::Request& req, httplib::Response& res) {
        std::string delPath = json::extractStr(req.body, "path");
        std::string sessionIdFromBody = json::extractStr(req.body, "sessionId");
        std::string dirType = json::extractStr(req.body, "dir");

        // 历史会话删除优先走 sessionId：目录基准直接取用户当前设置的采集/转换路径，
        // 避免前端拼出来的相对路径、斜杠方向或旧路径和后端当前路径不一致导致 forbidden。
        if (!sessionIdFromBody.empty()) {
            if (sessionIdFromBody.find("..") != std::string::npos ||
                sessionIdFromBody.find('/') != std::string::npos ||
                sessionIdFromBody.find('\\') != std::string::npos) {
                json::sendJson(res, "{\"deleted\":false,\"error\":\"invalid sessionId\"}");
                return;
            }
            std::string baseDir = (dirType == "converted")
                ? getConvertOutputDir() : getRecordingBaseDir();
            delPath = baseDir + "/" + sessionIdFromBody;
        }

        if (delPath.empty()) {
            json::sendJson(res, "{\"deleted\":false,\"error\":\"missing path\"}");
            return;
        }
        std::string collectDir = getRecordingBaseDir();
        std::string convertDir = getConvertOutputDir();
        delPath = winfs::resolvePath(delPath);
        collectDir = winfs::resolvePath(collectDir);
        convertDir = winfs::resolvePath(convertDir);
        auto isUnderDir = [](const std::string& path, const std::string& root) {
            if (path == root) return true;
            if (path.size() <= root.size()) return false;
            if (path.compare(0, root.size(), root) != 0) return false;
            char sep = path[root.size()];
            return sep == '/' || sep == '\\';
        };
        if (!isUnderDir(delPath, collectDir) && !isUnderDir(delPath, convertDir)) {
            json::sendJson(res, "{\"deleted\":false,\"error\":\"forbidden path\"}");
            return;
        }
        if (delPath == collectDir || delPath == convertDir) {
            json::sendJson(res, "{\"deleted\":false,\"error\":\"cannot delete root directory\"}");
            return;
        }
        if (delPath.find("..") != std::string::npos) {
            json::sendJson(res, "{\"deleted\":false,\"error\":\"invalid path\"}");
            return;
        }
        if (!winfs::dirExists(delPath)) {
            json::sendJson(res, "{\"deleted\":false,\"error\":\"directory not found\"}");
            return;
        }
        bool ok = winfs::removeDirRecursive(delPath);
        if (ok && delPath.find(collectDir) == 0) {
            std::string normalized = delPath;
            while (!normalized.empty() && (normalized.back() == '/' || normalized.back() == '\\')) normalized.pop_back();
            size_t slash = normalized.find_last_of("/\\");
            std::string sessionId = slash == std::string::npos ? normalized : normalized.substr(slash + 1);
            std::string historyPath = collectDir + "/_history.txt";
            if (!sessionId.empty() && winfs::fileExists(historyPath)) {
                std::ifstream ifs(winfs::utf8ToAnsi(historyPath));
                std::vector<std::string> kept;
                std::string line;
                while (std::getline(ifs, line)) {
                    if (!line.empty() && line != sessionId) kept.push_back(line);
                }
                ifs.close();
                std::ofstream ofs(winfs::utf8ToAnsi(historyPath), std::ios::trunc);
                if (ofs.is_open()) {
                    for (const auto& sid : kept) ofs << sid << "\n";
                }
            }
        }
        json::sendJson(res, ok ? "{\"deleted\":true}" : "{\"deleted\":false,\"error\":\"delete failed\"}");
    });

    // 数据文件下载
    svr_->Get("/api/data/file", [this](const httplib::Request& req, httplib::Response& res) {
        std::string filePath = winfs::urlDecode(req.get_param_value("path"));
        if (filePath.empty() || filePath.find("..") != std::string::npos) {
            res.status = 400;
            res.set_content("Bad Request", "text/plain");
            return;
        }
        std::string collectDir = getRecordingBaseDir();
        std::string convertDir = getConvertOutputDir();
        if (filePath.find(collectDir) != 0 && filePath.find(convertDir) != 0) {
            res.status = 403;
            res.set_content("Forbidden", "text/plain");
            return;
        }
        if (!winfs::fileExists(filePath)) {
            res.status = 404;
            res.set_content("Not Found", "text/plain");
            return;
        }

        std::string contentType = "application/octet-stream";
        std::string lower = filePath;
        for (char& c : lower) c = (char)tolower(c);
        if (lower.find(".mp4") != std::string::npos) contentType = "video/mp4";
        else if (lower.find(".avi") != std::string::npos) contentType = "video/x-msvideo";
        else if (lower.find(".csv") != std::string::npos) contentType = "text/csv; charset=utf-8";
        else if (lower.find(".json") != std::string::npos) contentType = "application/json; charset=utf-8";

        res.set_header("Access-Control-Allow-Origin", "*");

        std::ifstream file(winfs::utf8ToAnsi(filePath), std::ios::binary | std::ios::ate);
        if (!file.is_open()) {
            res.status = 404;
            res.set_content("Not Found", "text/plain");
            return;
        }
        auto fileSize = file.tellg();
        file.seekg(0, std::ios::beg);
        std::string content;
        content.resize((size_t)fileSize);
        file.read(&content[0], (std::streamsize)fileSize);
        file.close();

        // 交给 httplib 自动处理 Range 请求，保证浏览器可以拖动视频进度条。
        res.set_content(content, contentType);
    });

    // 多摄像头路由
    setupMultiCameraRoutes();

    // 静态文件服务（放在最后，作为 fallback）
    svr_->Get(".*", [this](const httplib::Request& req, httplib::Response& res) {
        std::string path = req.path;
        if (path == "/" || path.empty()) path = "/index.html";
        // 旧版本和部分浏览器书签仍会访问 index_old.html，统一回落到当前控制台首页。
        if (path == "/index_old.html") path = "/index.html";
        std::string filePath = frontendDir_ + path;

        if (filePath.find("..") != std::string::npos) {
            res.status = 403;
            res.set_content("Forbidden", "text/plain");
            return;
        }

        // 读取文件
        std::ifstream file(winfs::utf8ToAnsi(filePath), std::ios::binary);
        if (!file.is_open()) {
            res.status = 404;
            res.set_content("Not Found", "text/plain");
            return;
        }
        std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
        file.close();

        std::string contentType = "application/octet-stream";
        if (path.find(".html") != std::string::npos) contentType = "text/html; charset=utf-8";
        else if (path.find(".css") != std::string::npos) contentType = "text/css; charset=utf-8";
        else if (path.find(".js") != std::string::npos) contentType = "application/javascript; charset=utf-8";
        else if (path.find(".png") != std::string::npos) contentType = "image/png";
        else if (path.find(".jpg") != std::string::npos || path.find(".jpeg") != std::string::npos) contentType = "image/jpeg";
        else if (path.find(".wasm") != std::string::npos) contentType = "application/wasm";
        else if (path.find(".glb") != std::string::npos) contentType = "model/gltf-binary";
        else if (path.find(".gltf") != std::string::npos) contentType = "model/gltf+json";
        else if (path.find(".data") != std::string::npos) contentType = "application/octet-stream";
        else if (path.find(".tflite") != std::string::npos) contentType = "application/octet-stream";

        res.set_header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.set_header("Pragma", "no-cache");
        res.set_content(content, contentType);
    });
}

// ---- 录制功能 ----

// 多摄像头路由注册（在 setupRoutes 末尾调用）
void HttpServer::setupMultiCameraRoutes() {
    // 设备列表 API
    svr_->Get("/api/devices", [this](const httplib::Request&, httplib::Response& res) {
        std::string json;
        if (deviceManager_) {
            // 页面会高频轮询 /api/devices；这里只返回缓存，避免每次进入设备控制页都重新枚举硬件。
            // 设备插拔由后台补挂线程和“重新扫描设备”按钮处理。
            json = deviceManager_->toJson();
        } else {
            json = "{\"devices\":[],\"slots\":{\"left\":{\"type\":\"none\",\"connected\":false},\"right\":{\"type\":\"none\",\"connected\":false},\"head\":{\"type\":\"none\",\"connected\":false}},\"grippers\":[],\"gripperSlots\":{\"left\":{\"type\":\"none\",\"connected\":false},\"right\":{\"type\":\"none\",\"connected\":false},\"extra\":{\"type\":\"none\",\"connected\":false}}}";
        }
        json::sendJson(res, json);
    });

    auto cameraControlsToJson = [this]() -> std::string {
        std::string out = "{\"slots\":{";
        bool first = true;
        for (const auto& slot : {std::string("left"), std::string("right"), std::string("head")}) {
            if (!first) out += ",";
            first = false;
            CameraControlParams p = getCameraControlParams(slot);
            bool connected = false;
            bool hardware = false;
            std::string type = "none";
            std::string name = "";
            std::string serial = "";
            if (deviceManager_) {
                auto* s = deviceManager_->getSlot(slot);
                if (s && s->connected && s->camera) {
                    connected = true;
                    type = s->camera->getDeviceType();
                    name = s->camera->getDeviceName();
                    serial = s->camera->getSerialNumber();
                    hardware = s->camera->supportsHardwareControls();
                }
            }
            out += "\"" + slot + "\":{";
            out += "\"connected\":" + std::string(connected ? "true" : "false");
            out += ",\"type\":\"" + json::escape(type) + "\"";
            out += ",\"name\":\"" + json::escape(name) + "\"";
            out += ",\"serial\":\"" + json::escape(serial) + "\"";
            out += ",\"hardwareControls\":" + std::string(hardware ? "true" : "false");
            out += ",\"params\":{";
            out += "\"brightness\":" + std::to_string(p.brightness);
            out += ",\"contrast\":" + std::to_string(p.contrast);
            out += ",\"gamma\":" + std::to_string(p.gamma);
            out += ",\"saturation\":" + std::to_string(p.saturation);
            out += ",\"sharpness\":" + std::to_string(p.sharpness);
            out += ",\"denoise\":" + std::to_string(p.denoise);
            out += ",\"exposureAuto\":" + std::string(p.exposureAuto ? "true" : "false");
            out += ",\"exposureTime\":" + std::to_string(p.exposureTime);
            out += ",\"exposureUpper\":" + std::to_string(p.exposureUpper);
            out += ",\"gainAuto\":" + std::string(p.gainAuto ? "true" : "false");
            out += ",\"gain\":" + std::to_string(p.gain);
            out += ",\"gammaEnable\":" + std::string(p.gammaEnable ? "true" : "false");
            out += ",\"balanceWhiteAuto\":" + std::string(p.balanceWhiteAuto ? "true" : "false");
            out += "}}";
        }
        out += "}}";
        return out;
    };

    svr_->Get("/api/camera-controls", [cameraControlsToJson](const httplib::Request&, httplib::Response& res) {
        json::sendJson(res, cameraControlsToJson());
    });

    svr_->Post("/api/camera-controls/:slot", [this, cameraControlsToJson](const httplib::Request& req, httplib::Response& res) {
        std::string slot = req.path_params.at("slot");
        if (slot != "left" && slot != "right" && slot != "head") {
            json::sendJson(res, "{\"success\":false,\"error\":\"invalid camera slot\"}");
            return;
        }
        CameraControlParams p = getCameraControlParams(slot);
        p.brightness = json::extractFloat(req.body, "brightness", (float)p.brightness);
        p.contrast = json::extractFloat(req.body, "contrast", (float)p.contrast);
        p.gamma = json::extractFloat(req.body, "gamma", (float)p.gamma);
        p.saturation = json::extractFloat(req.body, "saturation", (float)p.saturation);
        p.sharpness = json::extractFloat(req.body, "sharpness", (float)p.sharpness);
        p.denoise = json::extractFloat(req.body, "denoise", (float)p.denoise);
        p.exposureAuto = json::extractInt(req.body, "exposureAuto", p.exposureAuto ? 1 : 0) != 0;
        p.exposureTime = json::extractFloat(req.body, "exposureTime", (float)p.exposureTime);
        p.exposureUpper = json::extractFloat(req.body, "exposureUpper", (float)p.exposureUpper);
        p.gainAuto = json::extractInt(req.body, "gainAuto", p.gainAuto ? 1 : 0) != 0;
        p.gain = json::extractFloat(req.body, "gain", (float)p.gain);
        p.gammaEnable = json::extractInt(req.body, "gammaEnable", p.gammaEnable ? 1 : 0) != 0;
        p.balanceWhiteAuto = json::extractInt(req.body, "balanceWhiteAuto", p.balanceWhiteAuto ? 1 : 0) != 0;

        p.brightness = std::max(-100.0, std::min(100.0, p.brightness));
        p.contrast = std::max(0.2, std::min(3.0, p.contrast));
        p.gamma = std::max(0.2, std::min(4.0, p.gamma));
        p.saturation = std::max(0.0, std::min(3.0, p.saturation));
        p.sharpness = std::max(0.0, std::min(8.0, p.sharpness));
        p.denoise = std::max(0.0, std::min(10.0, p.denoise));
        p.exposureTime = std::max(10.0, std::min(1000000.0, p.exposureTime));
        p.exposureUpper = std::max(10.0, std::min(1000000.0, p.exposureUpper));
        p.gain = std::max(0.0, std::min(48.0, p.gain));

        bool hardwareOk = setCameraControlParams(slot, p, true);
        std::string result = cameraControlsToJson();
        result.pop_back();
        result += ",\"success\":true,\"hardwareApplied\":" + std::string(hardwareOk ? "true" : "false") + "}";
        json::sendJson(res, result);
    });

    // 设备重扫描：只刷新检测列表，不强制关闭或重建当前正在采集的设备对象。
    // 主采集线程会持续读取相机和夹爪对象；如果扫描时重建对象，容易造成进程崩溃。
    svr_->Post("/api/scan", [this](const httplib::Request&, httplib::Response& res) {
        if (deviceManager_) {
            deviceManager_->refreshDetectedCameras();
            deviceManager_->refreshDetectedGrippers();
            deviceManager_->attachDetectedCamerasToEmptySlots();
            deviceManager_->attachDetectedGrippersToEmptySlots(true);
            json::sendJson(res, deviceManager_->toJson());
        } else {
            json::sendJson(res, "{\"error\":\"No DeviceManager\"}");
        }
    });

    // 交换左右手动夹爪槽位。用于两个夹爪固件标识相同、连接顺序和物理左右相反的场景。
    svr_->Post("/api/grippers/swap-hands", [this](const httplib::Request&, httplib::Response& res) {
        if (!deviceManager_) {
            json::sendJson(res, "{\"success\":false,\"error\":\"No DeviceManager\"}");
            return;
        }
        {
            std::lock_guard<std::mutex> lock(recordingState_.mutex);
            if (recordingState_.isRecording || recordingState_.finalizing) {
                json::sendJson(res, "{\"success\":false,\"error\":\"录制或保存过程中不能交换夹爪\"}");
                return;
            }
        }
        if (!deviceManager_->swapManualGripperSlots()) {
            json::sendJson(res, "{\"success\":false,\"error\":\"只能交换左右手动夹爪，电动夹爪暂不参与\"}");
            return;
        }

        auto syncSlotPointer = [this](const std::string& slot) {
            setUmiGripper(slot, nullptr);
            setElectricGripper(slot, nullptr);
            auto* gs = deviceManager_->getGripperSlot(slot);
            if (!gs || !gs->connected || !gs->gripper) return;
            if (gs->gripperType == "manual") {
                setUmiGripper(slot, dynamic_cast<UmiGripper*>(gs->gripper.get()));
            } else if (gs->gripperType == "electric") {
                setElectricGripper(slot, dynamic_cast<ElectricGripper*>(gs->gripper.get()));
            }
        };
        syncSlotPointer("left");
        syncSlotPointer("right");

        // 清空左右页面缓存，下一帧采集线程会按新槽位写入，避免交换后短时间显示旧数据。
        for (const auto& slot : {std::string("left"), std::string("right")}) {
            auto& gs = gripperWebStates_[slot];
            std::lock_guard<std::mutex> lock(gs.mutex);
            gs.hasData = false;
            gs.timestamp = 0;
        }
        json::sendJson(res, "{\"success\":true}");
    });

    // 设备交换 API
    // 摄像头槽位分配：POST /api/devices/assign {serial, position}
    svr_->Post("/api/devices/assign", [this](const httplib::Request& req, httplib::Response& res) {
        (void)req;
        json::sendJson(res, "{\"success\":false,\"error\":\"running camera reassignment is disabled; use the frontend head-camera mapping or restart service\"}");
    });

    // 交换左右手摄像头
    svr_->Post("/api/devices/swap-hands", [this](const httplib::Request&, httplib::Response& res) {
        json::sendJson(res, "{\"success\":false,\"error\":\"running camera swap is disabled; use the frontend display mapping\"}");
    });

    // 双手视觉惯性位姿 API。映射由前端当前的相机/夹爪左右分配同步到后端。
    auto handPoseJson = [](const HandPoseState& pose) {
        std::ostringstream out;
        out << std::boolalpha
            << "{\"connected\":" << pose.connected
            << ",\"cameraConnected\":" << pose.cameraConnected
            << ",\"hasImu\":" << pose.hasImu
            << ",\"hasVisual\":" << pose.hasVisual
            << ",\"valid\":" << pose.valid
            << ",\"timestampUs\":" << pose.timestampUs
            << ",\"sampleCount\":" << pose.sampleCount
            << ",\"position\":[" << pose.x << "," << pose.y << "," << pose.z << "]"
            << ",\"quaternion\":[" << pose.qx << "," << pose.qy << "," << pose.qz << "," << pose.qw << "]"
            << ",\"euler\":[" << pose.roll << "," << pose.pitch << "," << pose.yaw << "]"
            << ",\"closure\":" << pose.closure
            << ",\"quality\":" << pose.quality
            << ",\"visualFeatures\":" << pose.visualFeatures
            << ",\"visualPointCloud\":[";
        for (size_t index = 0; index < pose.visualPointCloud.size(); ++index) {
            if (index != 0) out << ',';
            const auto& point = pose.visualPointCloud[index];
            out << '[' << point[0] << ',' << point[1] << ',' << point[2] << ']';
        }
        out << ']'
            << ",\"stationary\":" << pose.stationary
            << ",\"originRelocalized\":" << pose.originRelocalized
            << ",\"cooperativeConstraint\":" << pose.cooperativeConstraint
            << ",\"mode\":\"" << pose.mode << "\"}";
        return out.str();
    };

    svr_->Get("/api/hand-poses", [this, handPoseJson](const httplib::Request&, httplib::Response& res) {
        if (!handPoseManager_) {
            json::sendJson(res, "{\"enabled\":false,\"hands\":{}}");
            return;
        }

        HandPoseState left;
        HandPoseState right;
        handPoseManager_->getPose("left", left);
        handPoseManager_->getPose("right", right);
        HandPoseMapping leftMapping = handPoseManager_->getMapping("left");
        HandPoseMapping rightMapping = handPoseManager_->getMapping("right");

        std::ostringstream out;
        out << std::boolalpha
            << "{\"enabled\":" << handPoseManager_->isEnabled()
            << ",\"coordinateFrame\":\"relative_start\""
            << ",\"unit\":\"meter\""
            << ",\"cooperative\":{\"available\":" << handPoseManager_->isCooperativeAvailable()
            << ",\"active\":" << handPoseManager_->isCooperativeActive()
            << ",\"mode\":\"dual_hand_zupt\"}"
            << ",\"mappings\":{"
            << "\"left\":{\"camera\":\"" << leftMapping.cameraSlot
            << "\",\"gripper\":\"" << leftMapping.gripperSlot << "\"},"
            << "\"right\":{\"camera\":\"" << rightMapping.cameraSlot
            << "\",\"gripper\":\"" << rightMapping.gripperSlot << "\"}},"
            << "\"hands\":{\"left\":" << handPoseJson(left)
            << ",\"right\":" << handPoseJson(right) << "}}";
        json::sendJson(res, out.str());
    });

    svr_->Post("/api/hand-poses/config", [this](const httplib::Request& req, httplib::Response& res) {
        if (!handPoseManager_) {
            json::sendJson(res, "{\"success\":false,\"error\":\"pose manager unavailable\"}");
            return;
        }

        HandPoseMapping left = handPoseManager_->getMapping("left");
        HandPoseMapping right = handPoseManager_->getMapping("right");
        const std::string leftCamera = json::extractStr(req.body, "leftCamera");
        const std::string rightCamera = json::extractStr(req.body, "rightCamera");
        const std::string leftGripper = json::extractStr(req.body, "leftGripper");
        const std::string rightGripper = json::extractStr(req.body, "rightGripper");
        handPoseManager_->setMapping("left",
            leftCamera.empty() ? left.cameraSlot : leftCamera,
            leftGripper.empty() ? left.gripperSlot : leftGripper);
        handPoseManager_->setMapping("right",
            rightCamera.empty() ? right.cameraSlot : rightCamera,
            rightGripper.empty() ? right.gripperSlot : rightGripper);
        json::sendJson(res, "{\"success\":true}");
    });

    svr_->Post("/api/hand-poses/reset", [this](const httplib::Request& req, httplib::Response& res) {
        if (!handPoseManager_) {
            json::sendJson(res, "{\"success\":false,\"error\":\"pose manager unavailable\"}");
            return;
        }
        std::string side = json::extractStr(req.body, "side");
        if (side != "left" && side != "right") side = "all";
        handPoseManager_->reset(side);
        json::sendJson(res, "{\"success\":true}");
    });

    // 旧版单路 SLAM 位姿 API，继续保留给已有脚本使用。
    svr_->Get("/api/pose", [this](const httplib::Request&, httplib::Response& res) {
        std::lock_guard<std::mutex> lock(poseState_.mutex);
        char json[512];
        snprintf(json, sizeof(json),
            "{\"tx\":%.6f,\"ty\":%.6f,\"tz\":%.6f,"
            "\"qx\":%.6f,\"qy\":%.6f,\"qz\":%.6f,\"qw\":%.6f,"
            "\"roll\":%.4f,\"pitch\":%.4f,\"yaw\":%.4f,"
            "\"timestamp\":%llu,\"has\":%s}",
            poseState_.tx, poseState_.ty, poseState_.tz,
            poseState_.qx, poseState_.qy, poseState_.qz, poseState_.qw,
            poseState_.roll, poseState_.pitch, poseState_.yaw,
            (unsigned long long)poseState_.timestamp, poseState_.hasData ? "true" : "false");
        json::sendJson(res, json);
    });

    // 多路 MJPEG 流：/stream/:slot/:type (slot=left/right, type=color/depth)
    auto setupSlotStream = [this](const std::string& slot, const std::string& type) {
        std::string route = "/stream/" + slot + "/" + type;
        svr_->Get(route, [this, slot, type](const httplib::Request&, httplib::Response& res) {
            res.set_header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_chunked_content_provider(
                "multipart/x-mixed-replace; boundary=frameboundary",
                [this, slot, type](size_t, httplib::DataSink& sink) -> bool {
                    uint64_t lastSentTs = 0;
                    while (running_) {
                        std::this_thread::sleep_for(std::chrono::milliseconds(STREAM_INTERVAL_MS));
                        auto it = cameraStates_.find(slot);
                        if (it == cameraStates_.end()) continue;

                        StreamState* state;
                        if (type == "depth") state = &it->second.depth;
                        else if (type == "ir-left") state = &it->second.irLeft;
                        else if (type == "ir-right") state = &it->second.irRight;
                        else state = &it->second.color;
                        std::vector<uchar> jpeg;
                        uint64_t ts;
                        {
                            std::lock_guard<std::mutex> lock(state->mutex);
                            if (!state->hasData || state->encodedTimestamp == lastSentTs) continue;
                            if (state->encodedJpegBuf.empty()) continue;
                            jpeg = state->encodedJpegBuf;
                            ts = state->encodedTimestamp;
                            lastSentTs = ts;
                        }
                        std::string header = std::string(MJPEG_BOUNDARY) + "\r\nContent-Type: image/jpeg\r\nContent-Length: "
                            + std::to_string(jpeg.size()) + "\r\n\r\n";
                        if (!sink.write(header.c_str(), header.size())) return false;
                        if (!sink.write(reinterpret_cast<const char*>(jpeg.data()), jpeg.size())) return false;
                        if (!sink.write("\r\n", 2)) return false;
                    }
                    return false;
                }
            );
        });
    };

    setupSlotStream("left", "color");
    setupSlotStream("left", "depth");
    setupSlotStream("left", "ir-left");
    setupSlotStream("left", "ir-right");
    setupSlotStream("right", "color");
    setupSlotStream("right", "depth");
    setupSlotStream("right", "ir-left");
    setupSlotStream("right", "ir-right");
    setupSlotStream("head", "color");
    setupSlotStream("head", "depth");
    setupSlotStream("head", "ir-left");
    setupSlotStream("head", "ir-right");

    // 点云数据 API：返回 JSON 格式 {p:[x,y,z,r,g,b,...], n:count, has:true}
    auto setupPointCloudRoute = [this](const std::string& slot) {
        std::string route = "/api/pointcloud/" + slot;
        svr_->Get(route, [this, slot](const httplib::Request&, httplib::Response& res) {
            auto& states = cameraStates_[slot];
            std::lock_guard<std::mutex> lock(states.pointCloudMutex);
            if (!states.pointCloudHasData || states.pointCloudData.empty()) {
                res.set_content("{\"p\":[],\"n\":0,\"has\":false}", "application/json");
                res.set_header("Access-Control-Allow-Origin", "*");
                res.set_header("Cache-Control", "no-cache");
                return;
            }

            // 数据为扁平数组，每 6 个 float 一个点 (x,y,z,r,g,b)
            auto& data = states.pointCloudData;
            int totalPoints = (int)(data.size() / 6);
            int maxSend = 30000;
            int stride = std::max(1, totalPoints / maxSend);

            std::string json = "{\"p\":[";
            char pt[128];
            bool first = true;
            for (int i = 0; i < totalPoints; i += stride) {
                int idx = i * 6;
                snprintf(pt, sizeof(pt), "%s%.1f,%.1f,%.1f,%.0f,%.0f,%.0f",
                    first ? "" : ",",
                    data[idx], data[idx+1], data[idx+2],
                    data[idx+3], data[idx+4], data[idx+5]);
                json += pt;
                first = false;
            }
            json += "],\"n\":" + std::to_string(totalPoints) + ",\"has\":true}";

            res.set_content(json, "application/json");
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Cache-Control", "no-cache");
        });
    };

    setupPointCloudRoute("left");
    setupPointCloudRoute("right");
    setupPointCloudRoute("head");

    // ---- 电动夹爪 API 路由 ----
    // GET /api/electric-gripper/:slot - 获取电动夹爪完整状态
    svr_->Get("/api/electric-gripper/:slot", [this](const httplib::Request& req, httplib::Response& res) {
        std::string slot = req.path_params.at("slot");
        auto it = electricGripperWebStates_.find(slot);
        if (it == electricGripperWebStates_.end()) {
            json::sendJson(res, "{\"has\":false,\"connected\":false,\"slot\":\"" + slot + "\"}");
            return;
        }
        auto& gs = it->second;
        std::lock_guard<std::mutex> lock(gs.mutex);
        const char* linkType = "GCAN USBCAN";
        ElectricGripper* gripper = getElectricGripper(slot);
        if (gripper && gripper->isSerialBridge()) linkType = "ESP32-CAN";
        char rawHex[48];
        rawHex[0] = '\0';
        for (int i = 0; i < gs.rawFrameLen && i < 8; i++)
            snprintf(rawHex + strlen(rawHex), sizeof(rawHex) - strlen(rawHex), "%s%02X", i > 0 ? " " : "", gs.rawFrame[i]);
        char json[1200];
        snprintf(json, sizeof(json),
            "{\"has\":%s,\"connected\":%s,\"slot\":\"%s\","
            "\"linkType\":\"%s\","
            "\"positionDeg\":%.4f,\"velocity\":%.4f,\"current\":%.4f,"
            "\"motorTemp\":%.1f,\"mosTemp\":%.1f,"
            "\"errorCode\":%d,\"motorEnabled\":%s,\"timestamp\":%llu,"
            "\"rawFrame\":\"%s\"}",
            gs.hasData ? "true" : "false",
            gs.connected ? "true" : "false",
            slot.c_str(),
            linkType,
            gs.positionDeg, gs.velocity, gs.current,
            gs.motorTemp, gs.mosTemp,
            (int)gs.errorCode,
            gs.motorEnabled ? "true" : "false",
            (unsigned long long)gs.timestamp,
            rawHex);
        json::sendJson(res, json);
    });

    // POST /api/electric-gripper/:slot/control - 电动夹爪控制命令
    svr_->Post("/api/electric-gripper/:slot/control", [this](const httplib::Request& req, httplib::Response& res) {
        std::string slot = req.path_params.at("slot");
        std::string body = req.body;

        std::string action = json::extractStr(body, "action");
        ElectricGripper* gripper = getElectricGripper(slot);
        if (!gripper && deviceManager_) {
            auto* gs = deviceManager_->getGripperSlot(slot);
            if (gs && gs->connected && gs->gripperType == "electric") {
                gripper = dynamic_cast<ElectricGripper*>(gs->gripper.get());
            }
        }

        if (!gripper) {
            json::sendJson(res, "{\"success\":false,\"error\":\"no electric gripper on slot " + slot + "\"}");
            return;
        }

        bool ok = false;
        std::string errMsg;

        if (action == "enable") {
            gripper->enableMotor(); ok = true;
        } else if (action == "disable") {
            gripper->disableMotor(); ok = true;
        } else if (action == "clear_error") {
            gripper->clearError(); ok = true;
        } else if (action == "halt") {
            gripper->haltMotor(); ok = true;
        } else if (action == "set_position") {
            float pos = json::extractFloat(body, "position");
            float speed = json::extractFloat(body, "speed");
            float currentLimit = json::extractFloat(body, "current_limit");
            if (speed <= 0) speed = ElectricGripper::DEFAULT_SPEED_RPM;
            if (currentLimit <= 0) currentLimit = ElectricGripper::DEFAULT_CURRENT_LIMIT;
            ok = gripper->sendPositionControl(pos, speed, currentLimit);
        } else if (action == "set_speed") {
            float speed = json::extractFloat(body, "speed");
            float currentLimit = json::extractFloat(body, "current_limit");
            if (currentLimit <= 0) currentLimit = ElectricGripper::DEFAULT_CURRENT_LIMIT;
            ok = gripper->sendSpeedControl(speed, currentLimit);
        } else if (action == "set_mit") {
            float kp = json::extractFloat(body, "kp");
            float kd = json::extractFloat(body, "kd");
            float pos = json::extractFloat(body, "position");
            float spd = json::extractFloat(body, "speed");
            float torque = json::extractFloat(body, "torque");
            ok = gripper->sendMITControl(kp, kd, pos, spd, torque);
        } else if (action == "set_current") {
            float current = json::extractFloat(body, "current");
            // 电流环对电机使能状态更敏感，不能完全依赖上一帧反馈里的 motorEnabled。
            // 每次执行都先发一次当前位置保持的使能帧，留出模式切换时间，再下发电流环命令。
            gripper->enableMotor();
            std::this_thread::sleep_for(std::chrono::milliseconds(220));
            ok = gripper->sendCurrentControl(current);
            std::this_thread::sleep_for(std::chrono::milliseconds(30));
            ok = gripper->sendCurrentControl(current) || ok;
        } else if (action == "set_zero") {
            ok = gripper->setZero();
        } else if (action == "find_zero") {
            ok = gripper->findZero();
        } else if (action == "stop_motion") {
            ok = gripper->stopMotion();
        } else if (action == "query_position") {
            ok = gripper->queryPosition();
        } else if (action == "query_speed") {
            ok = gripper->querySpeed();
        } else if (action == "query_current") {
            ok = gripper->queryCurrent();
        } else if (action == "set_acceleration") {
            float accel = json::extractFloat(body, "acceleration");
            ok = gripper->setAcceleration(accel);
        } else if (action == "query_motor_id") {
            ok = gripper->queryMotorId();
        } else if (action == "connect_can") {
            ok = gripper->open("");
        } else if (action == "find_min_limit") {
            ok = gripper->findMinLimit();
        } else if (action == "preset_position") {
            float pos = json::extractFloat(body, "position");
            ok = gripper->sendPresetPosition(pos);
        } else if (action == "find_limit") {
            float speed = json::extractFloat(body, "speed");
            float currentLimit = json::extractFloat(body, "current_limit");
            if (speed <= 0) speed = 10.0f;
            if (currentLimit <= 0) currentLimit = ElectricGripper::DEFAULT_CURRENT_LIMIT;
            ok = gripper->findLimit(speed, currentLimit);
        } else if (action == "stop_speed") {
            ok = gripper->stopSpeed();
        } else {
            errMsg = "unknown action: " + action;
        }

        if (ok) {
            json::sendJson(res, "{\"success\":true}");
        } else if (errMsg.empty()) {
            json::sendJson(res, "{\"success\":false,\"error\":\"command failed\"}");
        } else {
            json::sendJson(res, "{\"success\":false,\"error\":\"" + json::escape(errMsg) + "\"}");
        }
    });
}

// ---- 电动夹爪数据更新 ----
