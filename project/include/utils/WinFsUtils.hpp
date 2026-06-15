// FsUtils.hpp - Linux 文件系统工具函数（header-only）
// 使用 C++17 std::filesystem 替换 Windows API
// 保留 winfs 命名空间以兼容已有代码

#pragma once

#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <filesystem>
#include <chrono>
#include <cstdio>
#include <cstdlib>

namespace fs = std::filesystem;

namespace winfs {

inline std::string resolvePath(const std::string& path) {
    try {
        return fs::canonical(path).string();
    } catch (...) {
        return fs::absolute(path).string();
    }
}

inline bool dirExists(const std::string& path) {
    return fs::exists(path) && fs::is_directory(path);
}

inline bool fileExists(const std::string& path) {
    return fs::exists(path) && fs::is_regular_file(path);
}

inline bool mkdirp(const std::string& path) {
    try {
        fs::create_directories(path);
        return true;
    } catch (...) {
        return false;
    }
}

struct DirEntry {
    std::string name;
    bool isDir;
    unsigned long fileSize;
    time_t modTime;
};

inline std::vector<DirEntry> listDirEntries(const std::string& path) {
    std::vector<DirEntry> entries;
    try {
        for (const auto& entry : fs::directory_iterator(path)) {
            DirEntry e;
            e.name = entry.path().filename().string();
            if (e.name == "." || e.name == "..") continue;
            e.isDir = entry.is_directory();
            e.fileSize = entry.is_regular_file() ? (unsigned long)entry.file_size() : 0;
            auto ftime = entry.last_write_time();
            auto sctp = std::chrono::time_point_cast<std::chrono::system_clock::duration>(
                ftime - fs::file_time_type::clock::now() + std::chrono::system_clock::now());
            e.modTime = std::chrono::system_clock::to_time_t(sctp);
            entries.push_back(e);
        }
    } catch (...) {}
    return entries;
}

inline long long getDirSizeRecursive(const std::string& path) {
    long long size = 0;
    try {
        for (const auto& entry : fs::recursive_directory_iterator(path)) {
            if (entry.is_regular_file()) size += entry.file_size();
        }
    } catch (...) {}
    return size;
}

inline int countFilesRecursive(const std::string& path) {
    int count = 0;
    try {
        for (const auto& entry : fs::recursive_directory_iterator(path)) {
            if (entry.is_regular_file()) count++;
        }
    } catch (...) {}
    return count;
}

inline bool removeDirRecursive(const std::string& path) {
    try {
        return fs::remove_all(path) > 0;
    } catch (...) {
        return false;
    }
}

inline std::vector<std::string> listSubdirs(const std::string& path) {
    std::vector<std::string> dirs;
    for (auto& e : listDirEntries(path))
        if (e.isDir) dirs.push_back(e.name);
    return dirs;
}

inline std::string readFileToString(const std::string& path) {
    std::ifstream f(path, std::ios::binary);
    if (!f.is_open()) return "";
    return std::string((std::istreambuf_iterator<char>(f)), std::istreambuf_iterator<char>());
}

inline std::string urlDecode(const std::string& str) {
    std::string result;
    for (size_t i = 0; i < str.size(); i++) {
        if (str[i] == '%' && i + 2 < str.size()) {
            char hex[3] = { str[i + 1], str[i + 2], 0 };
            result += (char)strtol(hex, nullptr, 16);
            i += 2;
        } else if (str[i] == '+') {
            result += ' ';
        } else {
            result += str[i];
        }
    }
    return result;
}

// Linux 上文件路径本身就是 UTF-8，无需转换。
// 提供空实现以兼容 Windows 版源码中的调用。
inline std::string utf8ToAnsi(const std::string& utf8) { return utf8; }

} // namespace winfs
