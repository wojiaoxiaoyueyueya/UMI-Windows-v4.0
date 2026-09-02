// HttpServerUpload.cpp - 数据平台上传任务调度
//
// 训练平台登录、任务查询和文件上传均由 tools/upload_to_eidp.py 完成。
// C++ 负责限定上传来源、校验转换产物并转发进度，避免大文件网络 I/O
// 占用 HTTP 推流线程。

#include "HttpServer.hpp"

#include <algorithm>
#include <atomic>
#include <cctype>
#include <chrono>
#include <cwctype>
#include <fstream>
#include <iostream>
#include <regex>
#include <set>
#include <sstream>
#include <vector>
#include <windows.h>

#include "utils/JsonHelper.hpp"
#include "utils/WinFsUtils.hpp"

namespace {

std::wstring quoteUploadArgument(const std::string& value) {
    const std::wstring input = winfs::utf8ToWide(value);
    std::wstring result = L"\"";
    size_t backslashCount = 0;
    for (wchar_t ch : input) {
        if (ch == L'\\') {
            ++backslashCount;
            continue;
        }
        if (ch == L'\"') {
            result.append(backslashCount * 2 + 1, L'\\');
            result.push_back(L'\"');
        } else {
            result.append(backslashCount, L'\\');
            result.push_back(ch);
        }
        backslashCount = 0;
    }
    result.append(backslashCount * 2, L'\\');
    result.push_back(L'\"');
    return result;
}

int runUploadProcess(const std::string& executable, const std::vector<std::string>& arguments) {
    std::wstring commandLine = quoteUploadArgument(executable);
    for (const auto& argument : arguments) {
        commandLine.push_back(L' ');
        commandLine += quoteUploadArgument(argument);
    }

    STARTUPINFOW startupInfo{};
    startupInfo.cb = sizeof(startupInfo);
    PROCESS_INFORMATION processInfo{};
    std::vector<wchar_t> writableCommand(commandLine.begin(), commandLine.end());
    writableCommand.push_back(L'\0');

    if (!CreateProcessW(nullptr, writableCommand.data(), nullptr, nullptr, FALSE,
                        CREATE_NO_WINDOW, nullptr, nullptr, &startupInfo, &processInfo)) {
        std::cerr << "[平台上传] 无法启动上传程序，Windows错误=" << GetLastError()
                  << ", 程序=" << executable << std::endl;
        return 1;
    }

    WaitForSingleObject(processInfo.hProcess, INFINITE);
    DWORD exitCode = 1;
    GetExitCodeProcess(processInfo.hProcess, &exitCode);
    CloseHandle(processInfo.hThread);
    CloseHandle(processInfo.hProcess);
    return static_cast<int>(exitCode);
}

bool writeUtf8File(const std::string& path, const std::string& content) {
    std::ofstream file(winfs::utf8ToAnsi(path), std::ios::binary | std::ios::trunc);
    if (!file.is_open()) return false;
    file.write(content.data(), static_cast<std::streamsize>(content.size()));
    return file.good();
}

void removeFileIfPresent(const std::string& path) {
    if (!path.empty()) DeleteFileW(winfs::utf8ToWide(path).c_str());
}

std::string createRequestStem() {
    static std::atomic<unsigned long> sequence{0};
    const auto now = std::chrono::steady_clock::now().time_since_epoch().count();
    return "eidp_" + std::to_string(GetCurrentProcessId()) + "_"
        + std::to_string(now) + "_" + std::to_string(++sequence);
}

std::string buildActionJob(const std::string& action, const std::string& payload) {
    const std::string safePayload = payload.empty() ? "{}" : payload;
    return "{\"action\":\"" + json::escape(action) + "\",\"payload\":" + safePayload + "}";
}

std::string makeErrorJson(const std::string& error) {
    return "{\"ok\":false,\"error\":\"" + json::escape(error) + "\"}";
}

std::wstring normalizedFinalDirectory(const std::string& path) {
    const std::wstring widePath = winfs::utf8ToWide(winfs::resolvePath(path));
    HANDLE handle = CreateFileW(widePath.c_str(), 0,
                                FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE,
                                nullptr, OPEN_EXISTING, FILE_FLAG_BACKUP_SEMANTICS, nullptr);
    if (handle == INVALID_HANDLE_VALUE) return L"";

    const DWORD required = GetFinalPathNameByHandleW(
        handle, nullptr, 0, FILE_NAME_NORMALIZED | VOLUME_NAME_DOS);
    if (required == 0) {
        CloseHandle(handle);
        return L"";
    }
    std::vector<wchar_t> buffer(static_cast<size_t>(required) + 1, L'\0');
    const DWORD written = GetFinalPathNameByHandleW(
        handle, buffer.data(), static_cast<DWORD>(buffer.size()),
        FILE_NAME_NORMALIZED | VOLUME_NAME_DOS);
    CloseHandle(handle);
    if (written == 0 || written >= buffer.size()) return L"";

    std::wstring normalized(buffer.data(), written);
    std::replace(normalized.begin(), normalized.end(), L'/', L'\\');
    while (normalized.size() > 1 && normalized.back() == L'\\') normalized.pop_back();
    std::transform(normalized.begin(), normalized.end(), normalized.begin(), [](wchar_t ch) {
        return static_cast<wchar_t>(std::towlower(ch));
    });
    return normalized;
}

bool isDirectChildDirectory(const std::string& rootPath, const std::string& candidatePath) {
    const std::wstring root = normalizedFinalDirectory(rootPath);
    const std::wstring candidate = normalizedFinalDirectory(candidatePath);
    if (root.empty() || candidate.empty() || candidate == root) return false;
    const size_t separator = candidate.find_last_of(L'\\');
    return separator != std::wstring::npos && candidate.substr(0, separator) == root;
}

std::string lowerAscii(std::string value) {
    std::transform(value.begin(), value.end(), value.begin(), [](unsigned char ch) {
        return static_cast<char>(std::tolower(ch));
    });
    return value;
}

std::string joinUploadPath(const std::string& base, const std::string& name) {
    if (base.empty()) return name;
    const char last = base.back();
    return base + ((last == '/' || last == '\\') ? "" : "/") + name;
}

std::string uploadFolderName(const std::string& path) {
    std::string normalized = path;
    while (!normalized.empty() && (normalized.back() == '/' || normalized.back() == '\\')) {
        normalized.pop_back();
    }
    const size_t separator = normalized.find_last_of("/\\");
    return separator == std::string::npos ? normalized : normalized.substr(separator + 1);
}

bool containsFileWithExtension(const std::string& path, const std::string& extension) {
    const std::string expected = lowerAscii(extension);
    for (const auto& entry : winfs::listDirEntries(path)) {
        const std::string child = joinUploadPath(path, entry.name);
        if (entry.isDir) {
            if (containsFileWithExtension(child, expected)) return true;
            continue;
        }
        const std::string name = lowerAscii(entry.name);
        if (name.size() >= expected.size()
            && name.compare(name.size() - expected.size(), expected.size(), expected) == 0) {
            return true;
        }
    }
    return false;
}

bool validateDatasetRoot(const std::string& path, const std::string& format,
                         std::string& error) {
    std::set<std::string> allowedFiles;
    std::set<std::string> allowedDirs;
    if (format == "lerobot") {
        allowedFiles = {"metadata.json"};
        allowedDirs = {"meta", "data", "videos"};
        if (!winfs::fileExists(joinUploadPath(path, "metadata.json"))
            || !winfs::fileExists(joinUploadPath(path, "meta/info.json"))
            || !winfs::fileExists(joinUploadPath(path, "meta/tasks.parquet"))
            || !containsFileWithExtension(joinUploadPath(path, "data"), ".parquet")) {
            error = "LeRobot 转换结果不完整，缺少 metadata、info、tasks 或 Parquet 数据";
            return false;
        }
    } else if (format == "hdf5") {
        allowedFiles = {"metadata.json", "data.hdf5"};
        allowedDirs = {"videos"};
        if (!winfs::fileExists(joinUploadPath(path, "metadata.json"))
            || !winfs::fileExists(joinUploadPath(path, "data.hdf5"))) {
            error = "HDF5 转换结果不完整，缺少 metadata.json 或 data.hdf5";
            return false;
        }
    } else if (format == "rlds") {
        allowedFiles = {"metadata.json"};
        allowedDirs = {"data", "videos"};
        if (!winfs::fileExists(joinUploadPath(path, "metadata.json"))
            || !containsFileWithExtension(joinUploadPath(path, "data"), ".tfrecord")) {
            error = "RLDS 转换结果不完整，缺少 metadata.json 或 TFRecord 数据";
            return false;
        }
    } else {
        error = "不支持的转换格式";
        return false;
    }

    const auto entries = winfs::listDirEntries(path);
    if (entries.empty()) {
        error = "转换结果为空";
        return false;
    }
    for (const auto& entry : entries) {
        const std::string name = lowerAscii(entry.name);
        if ((entry.isDir && allowedDirs.count(name) == 0)
            || (!entry.isDir && allowedFiles.count(name) == 0)) {
            error = "转换结果包含非转换器生成的顶层文件或目录：" + entry.name;
            return false;
        }
    }
    return true;
}

bool validateConvertedUploadFolder(const std::string& path, std::string& error) {
    const std::string name = lowerAscii(uploadFolderName(path));
    static const std::regex pattern(
        R"(^(\d{8})_(\d{6})_(lerobot|hdf5|rlds)$)", std::regex::ECMAScript);
    std::smatch match;
    if (!std::regex_match(name, match, pattern)) {
        error = "只允许上传名称为 YYYYMMDD_HHMMSS_lerobot、hdf5 或 rlds 的转换结果";
        return false;
    }
    const std::string format = match[3].str();

    std::string rootError;
    if (validateDatasetRoot(path, format, rootError)) return true;

    const auto entries = winfs::listDirEntries(path);
    if (entries.empty()) {
        error = rootError.empty() ? "转换结果为空" : rootError;
        return false;
    }
    for (const auto& entry : entries) {
        if (!entry.isDir) {
            error = rootError.empty()
                ? "转换结果结构无效，只允许上传转换器生成的数据"
                : rootError;
            return false;
        }
        std::string childError;
        if (!validateDatasetRoot(joinUploadPath(path, entry.name), format, childError)) {
            error = "转换子目录 " + entry.name + " 校验失败：" + childError;
            return false;
        }
    }
    return true;
}

} // namespace

std::string HttpServer::runPlatformAction(const std::string& action,
                                          const std::string& payload,
                                          int& exitCode) {
    exitCode = 1;
    if (!winfs::fileExists(eidpScriptPath_)) {
        return makeErrorJson("平台上传脚本不存在，请重新安装完整运行包");
    }
    if (!winfs::mkdirp(eidpWorkDir_)) {
        return makeErrorJson("无法创建平台上传临时目录");
    }

    const std::string stem = createRequestStem();
    const std::string jobPath = eidpWorkDir_ + "/" + stem + ".job.json";
    const std::string resultPath = eidpWorkDir_ + "/" + stem + ".result.json";
    if (!writeUtf8File(jobPath, buildActionJob(action, payload))) {
        return makeErrorJson("无法写入平台请求文件");
    }

    const std::string bundledPython = winfs::resolvePath(frontendDir_ + "/../runtime/python/python.exe");
    const std::string pythonExecutable = winfs::fileExists(bundledPython) ? bundledPython : "python";
    const std::vector<std::string> arguments = {
        eidpScriptPath_, "--config", eidpConfigPath_, "--local-config", eidpLocalConfigPath_,
        "--job", jobPath, "--out", resultPath
    };
    exitCode = runUploadProcess(pythonExecutable, arguments);
    const std::string result = winfs::readFileToString(resultPath);

    // 请求文件可能包含登录密码或 Bearer token，读取结果后立即移除。
    removeFileIfPresent(jobPath);
    removeFileIfPresent(resultPath);

    if (!result.empty()) return result;
    if (exitCode != 0) {
        return makeErrorJson("平台请求失败，上传工具退出码 " + std::to_string(exitCode));
    }
    return makeErrorJson("平台请求未返回结果");
}

bool HttpServer::startPlatformUpload(const std::string& payload, std::string& error) {
    error.clear();
    if (!winfs::fileExists(eidpScriptPath_)) {
        error = "平台上传组件未安装，请重新安装完整运行包";
        return false;
    }
    if (!winfs::mkdirp(eidpWorkDir_)) {
        error = "无法创建平台上传临时目录";
        return false;
    }

    const std::string folderPath = json::extractStr(payload, "folderPath");
    if (folderPath.empty() || !winfs::dirExists(folderPath)) {
        error = "请选择存在的转换结果文件夹";
        return false;
    }
    if (!isDirectChildDirectory(getConvertOutputDir(), folderPath)) {
        error = "只允许上传固定转换目录中的转换结果";
        return false;
    }
    if (!validateConvertedUploadFolder(folderPath, error)) {
        return false;
    }

    {
        std::lock_guard<std::mutex> lock(platformUploadState_.mutex);
        if (platformUploadState_.uploading) {
            error = "已有上传任务正在执行";
            return false;
        }
    }
    if (platformUploadThread_.joinable()) platformUploadThread_.join();

    const std::string stem = createRequestStem();
    const std::string jobPath = eidpWorkDir_ + "/" + stem + ".job.json";
    const std::string progressPath = eidpWorkDir_ + "/" + stem + ".progress.json";
    const std::string resultPath = eidpWorkDir_ + "/" + stem + ".result.json";
    if (!writeUtf8File(jobPath, buildActionJob("upload_folder", payload))) {
        error = "无法写入平台上传任务";
        return false;
    }
    writeUtf8File(progressPath,
                  "{\"uploading\":true,\"stage\":\"准备上传\",\"progress\":0,"
                  "\"filesTotal\":0,\"filesDone\":0,\"bytesTotal\":0,\"bytesDone\":0}");

    {
        std::lock_guard<std::mutex> lock(platformUploadState_.mutex);
        platformUploadState_.uploading = true;
        platformUploadState_.progressPath = progressPath;
        platformUploadState_.resultPath = resultPath;
        platformUploadState_.error.clear();
    }

    const std::string bundledPython = winfs::resolvePath(frontendDir_ + "/../runtime/python/python.exe");
    const std::string pythonExecutable = winfs::fileExists(bundledPython) ? bundledPython : "python";
    const std::string scriptPath = eidpScriptPath_;
    const std::string configPath = eidpConfigPath_;
    const std::string localConfigPath = eidpLocalConfigPath_;

    platformUploadThread_ = std::thread([this, pythonExecutable, scriptPath, configPath,
                                         localConfigPath, jobPath, progressPath, resultPath]() {
        const std::vector<std::string> arguments = {
            scriptPath, "--config", configPath, "--local-config", localConfigPath,
            "--job", jobPath, "--out", resultPath, "--progress", progressPath
        };
        const int exitCode = runUploadProcess(pythonExecutable, arguments);
        const std::string result = winfs::readFileToString(resultPath);
        removeFileIfPresent(jobPath);

        std::lock_guard<std::mutex> lock(platformUploadState_.mutex);
        platformUploadState_.uploading = false;
        if (exitCode != 0) {
            platformUploadState_.error = result.empty()
                ? "上传工具退出码 " + std::to_string(exitCode)
                : json::extractStr(result, "error");
            if (platformUploadState_.error.empty()) {
                platformUploadState_.error = "上传工具执行失败";
            }
        }
    });
    return true;
}

std::string HttpServer::getPlatformUploadProgress() {
    std::string progressPath;
    std::string error;
    bool uploading = false;
    {
        std::lock_guard<std::mutex> lock(platformUploadState_.mutex);
        progressPath = platformUploadState_.progressPath;
        error = platformUploadState_.error;
        uploading = platformUploadState_.uploading;
    }

    const std::string progress = winfs::readFileToString(progressPath);
    if (!progress.empty()) return progress;
    std::string result = "{\"uploading\":" + std::string(uploading ? "true" : "false")
        + ",\"stage\":\"" + (uploading ? "准备上传" : "等待上传") + "\"";
    if (!error.empty()) result += ",\"error\":\"" + json::escape(error) + "\"";
    result += "}";
    return result;
}
