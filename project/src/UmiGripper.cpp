// UmiGripper.cpp - UMI 手动夹爪 V2 驱动（Linux 版）
// 基于 POSIX termios 串口 API

#include "UmiGripper.hpp"

#include <fcntl.h>
#include <termios.h>
#include <unistd.h>
#include <cstring>
#include <chrono>
#include <cstdio>
#include <string>
#include <set>
#include <algorithm>
#include <cstdlib>
#include <climits>
#include <dirent.h>
#include <sys/stat.h>
#include <glob.h>

namespace {
constexpr int kDefaultBaudRate = 115200;
constexpr size_t kResponsePacketSize = 8;
constexpr uint8_t kPacketHead = 0x0A;
constexpr uint8_t kTailLeft  = 0x0A;
constexpr uint8_t kTailRight = 0x0C;

constexpr size_t kLedCmdSize = 7;
constexpr uint8_t kLedTail = 0x0B;

constexpr size_t kStreamCmdSize = 10;
constexpr uint8_t kLedAddr = 0x00;
constexpr uint8_t kLedFreq = 0x02;
constexpr uint8_t kLedDataHeadLeft  = 0x03;
constexpr uint8_t kLedDataHeadRight = 0x04;
constexpr uint8_t kLedResp = 0x0A;
constexpr uint8_t kStreamStartAction = 0x01;
constexpr uint8_t kStreamStopAction  = 0x02;

constexpr int kMaxFailCount = 10;

constexpr uint16_t kVidLeft  = 0x0E01;
constexpr uint16_t kVidRight = 0x0E02;
constexpr uint16_t kPidGripper = 0xA001;

bool isValidTail(uint8_t t) { return t == kTailLeft || t == kTailRight; }

uint8_t dataHeadForSide(const std::string& side) {
    return (side == "right") ? kLedDataHeadRight : kLedDataHeadLeft;
}

// 解析 /sys/class/tty/XXX/device/ 下的 VID/PID
bool readSysfsId(const std::string& sysPath, uint16_t& vid, uint16_t& pid) {
    vid = 0; pid = 0;
    std::string idVendorPath = sysPath + "/idVendor";
    std::string idProductPath = sysPath + "/idProduct";

    FILE* f = fopen(idVendorPath.c_str(), "r");
    if (f) {
        char buf[16] = {};
        if (fgets(buf, sizeof(buf), f)) {
            unsigned int v = 0;
            sscanf(buf, "%x", &v);
            vid = (uint16_t)v;
        }
        fclose(f);
    }
    f = fopen(idProductPath.c_str(), "r");
    if (f) {
        char buf[16] = {};
        if (fgets(buf, sizeof(buf), f)) {
            unsigned int p = 0;
            sscanf(buf, "%x", &p);
            pid = (uint16_t)p;
        }
        fclose(f);
    }
    return vid != 0 || pid != 0;
}

// 获取 /dev/ttyXXX 对应的 /sys/class/tty/XXX 路径（解析符号链接）
std::string sysfsTtyPath(const std::string& devName) {
    // devName = "/dev/ttyUSB0" -> "ttyUSB0"
    size_t pos = devName.find_last_of('/');
    std::string base = (pos != std::string::npos) ? devName.substr(pos + 1) : devName;
    std::string linkPath = "/sys/class/tty/" + base + "/device";
    // 必须解析符号链接！/sys/class/tty/ttyACM0/device 是指向
    // /sys/devices/.../usb3/3-2/3-2:1.0 的软链接，
    // 只有解析后向上遍历才能找到 idVendor 文件。
    char resolved[PATH_MAX];
    if (realpath(linkPath.c_str(), resolved)) {
        return resolved;
    }
    return linkPath;
}

} // namespace

// ---- 通过 sysfs 按 USB VID 检测左右手 ----

std::vector<ComPortVidInfo> UmiGripper::enumerateComPortsWithVid() {
    std::vector<ComPortVidInfo> result;

    // 方式1：通过 /dev/serial/by-id/ 获取稳定设备路径
    DIR* d = opendir("/dev/serial/by-id/");
    if (d) {
        struct dirent* ent;
        while ((ent = readdir(d)) != nullptr) {
            if (ent->d_name[0] == '.') continue;
            char linkTarget[512] = {};
            std::string byIdPath = std::string("/dev/serial/by-id/") + ent->d_name;
            ssize_t len = readlink(byIdPath.c_str(), linkTarget, sizeof(linkTarget) - 1);
            if (len > 0) {
                linkTarget[len] = '\0';
                // linkTarget 类似 "../../ttyUSB0"
                std::string lt(linkTarget);
                size_t slashPos = lt.find_last_of('/');
                std::string ttyBase = (slashPos != std::string::npos) ? lt.substr(slashPos + 1) : lt;
                std::string devPath = "/dev/" + ttyBase;

                // 通过 sysfs 读取 VID/PID
                std::string sysPath = sysfsTtyPath(devPath);
                uint16_t vid = 0, pid = 0;
                // 向上查找 USB 设备目录（可能需要往上几级）
                std::string searchPath = sysPath;
                for (int i = 0; i < 6 && vid == 0; i++) {
                    readSysfsId(searchPath, vid, pid);
                    if (vid == 0) {
                        // 向上一级
                        size_t sp = searchPath.find_last_of('/');
                        if (sp != std::string::npos) searchPath = searchPath.substr(0, sp);
                    }
                }

                if (vid != 0 || pid != 0) {
                    ComPortVidInfo info;
                    info.portName = devPath;
                    info.vid = vid;
                    info.pid = pid;
                    result.push_back(info);
                    fprintf(stderr, "[UmiGripper] by-id: %s -> %s  VID=0x%04X  PID=0x%04X\n",
                        ent->d_name, devPath.c_str(), vid, pid);
                }
            }
        }
        closedir(d);
    }

    // 方式2：扫描 /dev/ttyUSB* 和 /dev/ttyACM*，通过 sysfs 补充
    const char* patterns[] = {"/dev/ttyUSB*", "/dev/ttyACM*"};
    std::set<std::string> alreadyFound;
    for (auto& r : result) alreadyFound.insert(r.portName);

    for (const auto* pat : patterns) {
        glob_t g;
        if (glob(pat, 0, nullptr, &g) == 0) {
            for (size_t i = 0; i < g.gl_pathc; i++) {
                std::string devPath(g.gl_pathv[i]);
                if (alreadyFound.count(devPath)) continue;

                std::string sysPath = sysfsTtyPath(devPath);
                uint16_t vid = 0, pid = 0;
                std::string searchPath = sysPath;
                for (int j = 0; j < 6 && vid == 0; j++) {
                    readSysfsId(searchPath, vid, pid);
                    if (vid == 0) {
                        size_t sp = searchPath.find_last_of('/');
                        if (sp != std::string::npos) searchPath = searchPath.substr(0, sp);
                    }
                }

                ComPortVidInfo info;
                info.portName = devPath;
                info.vid = vid;
                info.pid = pid;
                result.push_back(info);
                fprintf(stderr, "[UmiGripper] scan: %s  VID=0x%04X  PID=0x%04X\n",
                    devPath.c_str(), vid, pid);
            }
            globfree(&g);
        }
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
    : fdSerial_(-1), connected_(false), running_(false),
      lastLedR_(0), lastLedG_(0), lastLedB_(0) {
    memset(&state_, 0, sizeof(state_));
}

UmiGripper::~UmiGripper() { close(); }

// ---- 打开与关闭串口 ----

bool UmiGripper::open(const std::string& port, int baudRate) {
    close();

    // 双打开策略：先打开再关闭一次用于复位 USB 串口驱动，然后重新打开正式通信。
    {
        int fdInit = ::open(port.c_str(), O_RDWR | O_NOCTTY | O_NDELAY);
        if (fdInit >= 0) {
            tcflush(fdInit, TCIOFLUSH);
            ::close(fdInit);
        }
        usleep(500000); // 500ms
    }

    fdSerial_ = ::open(port.c_str(), O_RDWR | O_NOCTTY | O_NDELAY);
    if (fdSerial_ < 0) {
        fprintf(stderr, "[UMI夹爪] 无法打开 %s (errno=%d: %s)\n", port.c_str(), errno, strerror(errno));
        return false;
    }

    if (!configurePort(baudRate)) {
        fprintf(stderr, "[UMI夹爪] 配置串口失败 %s\n", port.c_str());
        ::close(fdSerial_);
        fdSerial_ = -1;
        return false;
    }

    // 关键：清除 O_NONBLOCK 标志，使 VMIN/VTIME 超时参数生效。
    // O_NDELAY 在 open() 时设置了非阻塞模式，会导致 read() 立即返回 0，
    // VTIME 超时参数在阻塞模式下才有效。
    int flags = fcntl(fdSerial_, F_GETFL, 0);
    if (flags >= 0) {
        fcntl(fdSerial_, F_SETFL, flags & ~O_NONBLOCK);
    }

    portName_ = port;
    tcflush(fdSerial_, TCIOFLUSH);

    fprintf(stderr, "[UMI夹爪] 串口 %s 已打开, 波特率=%d\n", port.c_str(), baudRate);

    detectHandSide();

    usleep(500000); // 500ms 等待 USB 串口驱动稳定

    // 第一步：发送停止命令
    {
        uint8_t stopCmd[kLedCmdSize] = {kPacketHead, 0x02, 0x00, 0x00, 0x00, 0x00, kLedTail};
        ssize_t written = write(fdSerial_, stopCmd, kLedCmdSize);
        tcdrain(fdSerial_);
        fprintf(stderr, "[UMI夹爪] 停止命令已发送 (%zd bytes)\n", written);
    }
    usleep(100000); // 100ms
    tcflush(fdSerial_, TCIFLUSH);

    // 第二步：发送启动上报命令
    {
        uint8_t startCmd[kLedCmdSize] = {kPacketHead, 0x01, 0x00, 0x00, 0x00, 0x00, kLedTail};
        ssize_t written = write(fdSerial_, startCmd, kLedCmdSize);
        tcdrain(fdSerial_);
        fprintf(stderr, "[UMI夹爪] 启动数据流命令已发送 (%zd bytes)\n", written);
    }

    // 第三步：设置 LED
    {
        uint8_t ledCmd[kLedCmdSize] = {kPacketHead, 0x00, 10, 10, 10, 64, kLedTail};
        ssize_t written = write(fdSerial_, ledCmd, kLedCmdSize);
        tcdrain(fdSerial_);
        fprintf(stderr, "[UMI夹爪] LED唤醒命令已发送 (%zd bytes)\n", written);
    }

    fprintf(stderr, "[UMI夹爪] 等待MCU响应...\n");
    usleep(500000); // 500ms

    // 设置读取超时
    struct termios tty;
    tcgetattr(fdSerial_, &tty);
    tty.c_cc[VMIN] = 0;
    tty.c_cc[VTIME] = 5; // 0.5秒超时 (VTIME 单位 0.1s)
    tcsetattr(fdSerial_, TCSANOW, &tty);

    // 读取初始数据
    uint8_t rawBuf[64];
    ssize_t totalRead = 0;
    for (int attempt = 0; attempt < 64 && totalRead < (ssize_t)sizeof(rawBuf); attempt++) {
        uint8_t oneByte;
        ssize_t n = read(fdSerial_, &oneByte, 1);
        if (n <= 0) break;
        rawBuf[totalRead++] = oneByte;
    }

    if (totalRead == 0) {
        fprintf(stderr, "[UMI夹爪] 无数据响应\n");
        ::close(fdSerial_);
        fdSerial_ = -1;
        return false;
    }

    fprintf(stderr, "[UMI夹爪] 收到 %zd 字节:", totalRead);
    for (ssize_t i = 0; i < totalRead; i++) fprintf(stderr, " %02X", rawBuf[i]);
    fprintf(stderr, "\n");

    // 恢复非阻塞超时
    tty.c_cc[VMIN] = 0;
    tty.c_cc[VTIME] = 5; // 50ms 超时
    tcsetattr(fdSerial_, TCSANOW, &tty);

    connected_ = true;
    state_.connected = true;
    running_ = true;
    pollThread_ = std::thread(&UmiGripper::pollLoop, this);

    fprintf(stderr, "[UMI夹爪] 已连接 %s (%s手)\n", port.c_str(), handSide_.c_str());
    return true;
}

void UmiGripper::close() {
    running_ = false;
    connected_ = false;
    state_.connected = false;
    if (pollThread_.joinable()) pollThread_.join();
    if (fdSerial_ >= 0) {
        setLed(0, 0, 0, 0);
        uint8_t dataHead = dataHeadForSide(handSide_);
        uint8_t stopCmd[kStreamCmdSize] = {kLedAddr, kLedFreq, dataHead, kLedResp,
                                         kStreamStopAction, 0, 0, 0, 0, kLedTail};
        sendCommand(stopCmd, kStreamCmdSize);
        ::close(fdSerial_);
        fdSerial_ = -1;
    }
}

bool UmiGripper::isConnected() const { return connected_; }

void UmiGripper::getState(GripperState& out) const {
    std::lock_guard<std::mutex> lock(stateMutex_);
    out = state_;
}

void UmiGripper::setLed(uint8_t r, uint8_t g, uint8_t b, uint8_t brightness) {
    uint8_t cmd[kLedCmdSize] = {kPacketHead, 0x00, r, g, b, brightness, kLedTail};
    fprintf(stderr, "[LED] %s手 发送: %02X %02X %02X %02X %02X %02X %02X\n",
            handSide_.c_str(), cmd[0], cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6]);
    sendCommand(cmd, kLedCmdSize);
}

// ---- 串口扫描 ----

std::vector<std::string> UmiGripper::scanSerialPorts() {
    std::vector<std::string> ports;
    std::set<std::string> seen;

    // /dev/serial/by-id/
    DIR* d = opendir("/dev/serial/by-id/");
    if (d) {
        struct dirent* ent;
        while ((ent = readdir(d)) != nullptr) {
            if (ent->d_name[0] == '.') continue;
            char target[512];
            ssize_t len = readlinkat(dirfd(d), ent->d_name, target, sizeof(target) - 1);
            if (len > 0) {
                target[len] = '\0';
                std::string t(target);
                size_t sp = t.find_last_of('/');
                if (sp != std::string::npos) {
                    seen.insert("/dev/" + t.substr(sp + 1));
                }
            }
        }
        closedir(d);
    }

    // /dev/ttyUSB* / /dev/ttyACM*
    const char* patterns[] = {"/dev/ttyUSB*", "/dev/ttyACM*"};
    for (const auto* pat : patterns) {
        glob_t g;
        if (glob(pat, 0, nullptr, &g) == 0) {
            for (size_t i = 0; i < g.gl_pathc; i++) {
                seen.insert(std::string(g.gl_pathv[i]));
            }
            globfree(&g);
        }
    }

    ports.assign(seen.begin(), seen.end());
    return ports;
}

// ---- 左右手识别 ----

void UmiGripper::detectHandSide() {
    handSide_ = "left";  // default
    vidConfirmed_ = false;

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

    fprintf(stderr, "[UMI夹爪] VID=0x%04X 未知，等待从数据帧尾针检测左右手\n", vid);
}

// ---- 串口参数配置 ----

bool UmiGripper::configurePort(int baudRate) {
    struct termios tty;
    memset(&tty, 0, sizeof(tty));
    if (tcgetattr(fdSerial_, &tty) != 0) return false;

    speed_t baud = B115200;
    switch (baudRate) {
        case 9600:   baud = B9600; break;
        case 19200:  baud = B19200; break;
        case 38400:  baud = B38400; break;
        case 57600:  baud = B57600; break;
        case 115200: baud = B115200; break;
        case 230400: baud = B230400; break;
        case 460800: baud = B460800; break;
        case 921600: baud = B921600; break;
        default:     baud = B115200; break;
    }

    cfsetispeed(&tty, baud);
    cfsetospeed(&tty, baud);

    // 8N1, no flow control
    tty.c_cflag &= ~PARENB;
    tty.c_cflag &= ~CSTOPB;
    tty.c_cflag &= ~CSIZE;
    tty.c_cflag |= CS8;
    tty.c_cflag &= ~CRTSCTS;
    tty.c_cflag |= CREAD | CLOCAL;

    // Raw input mode
    tty.c_iflag &= ~(IXON | IXOFF | IXANY);
    tty.c_iflag &= ~(IGNBRK | BRKINT | PARMRK | ISTRIP | INLCR | IGNCR | ICRNL);
    tty.c_lflag &= ~(ECHO | ECHONL | ICANON | ISIG | IEXTEN);
    tty.c_oflag &= ~OPOST;

    // Non-blocking read with 50ms timeout
    tty.c_cc[VMIN]  = 0;
    tty.c_cc[VTIME] = 5; // 0.5s

    if (tcsetattr(fdSerial_, TCSANOW, &tty) != 0) return false;
    tcflush(fdSerial_, TCIOFLUSH);
    return true;
}

// ---- 串口轮询循环 ----

void UmiGripper::pollLoop() {
    int failCount = 0;
    while (running_) {
        if (fdSerial_ < 0) {
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            continue;
        }

        uint8_t buffer[kResponsePacketSize];
        ssize_t bytesRead = read(fdSerial_, buffer, kResponsePacketSize);
        if (bytesRead != (ssize_t)kResponsePacketSize) {
            failCount++;
            if (failCount >= kMaxFailCount) {
                fprintf(stderr, "[UMI夹爪] 连续通信失败，标记为断开\n");
                connected_ = false;
                state_.connected = false;
                return;
            }
            // 短暂休眠，避免 VTIME 超时时 CPU 空转
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
            continue;
        }

        if (buffer[0] != kPacketHead || !isValidTail(buffer[kResponsePacketSize - 1])) {
            if (!syncFrame(buffer)) {
                failCount++;
                continue;
            }
        }

        {
            std::lock_guard<std::mutex> lock(stateMutex_);
            memcpy(&state_.position, &buffer[1], 4);
            state_.button1 = buffer[5];
            state_.button2 = buffer[6];
            state_.timestamp = std::chrono::duration_cast<std::chrono::microseconds>(
                std::chrono::system_clock::now().time_since_epoch()).count();
            state_.hasData = true;

            if (!vidConfirmed_) {
                uint8_t tail = buffer[kResponsePacketSize - 1];
                if (tail == kTailRight && handSide_ != "right") {
                    handSide_ = "right";
                    vidConfirmed_ = true;
                    fprintf(stderr, "[UMI夹爪 %s] 尾针=0x0C -> 右手\n", portName_.c_str());
                } else if (tail == kTailLeft && handSide_ != "left") {
                    handSide_ = "left";
                    vidConfirmed_ = true;
                    fprintf(stderr, "[UMi夹爪 %s] 尾针=0x0A -> 左手\n", portName_.c_str());
                }
            }
        }
        failCount = 0;
    }
}

bool UmiGripper::syncFrame(uint8_t* buffer) {
    constexpr int kBufferCapacity = 4 * kResponsePacketSize;
    uint8_t buf[kBufferCapacity];
    memcpy(buf, buffer, kResponsePacketSize);

    for (int i = 0; i < kBufferCapacity - (int)kResponsePacketSize; ++i) {
        ssize_t n = read(fdSerial_, &buf[kResponsePacketSize + i], 1);
        if (n != 1) return false;

        memcpy(buffer, &buf[i + 1], kResponsePacketSize);
        if (buffer[0] == kPacketHead && isValidTail(buffer[kResponsePacketSize - 1])) {
            return true;
        }
    }
    return false;
}

// ---- 命令发送 ----

bool UmiGripper::sendCommand(const uint8_t* data, size_t len) {
    if (fdSerial_ < 0 || data == nullptr) return false;
    std::lock_guard<std::mutex> lock(serialMutex_);
    tcflush(fdSerial_, TCIFLUSH);
    ssize_t written = write(fdSerial_, data, len);
    tcdrain(fdSerial_);
    return written == (ssize_t)len;
}
