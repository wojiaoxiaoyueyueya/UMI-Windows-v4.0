// ECanVciWrapper.hpp - 广成科技 CAN SDK 动态加载封装（Linux 版）
// 通过 dlopen 动态加载 CAN SDK .so，无需链接时依赖

#pragma once

#include <cstdint>
#include <cstring>
#include <string>
#include <vector>
#include <mutex>
#include <atomic>
#include <cstdio>
#include <dlfcn.h>
#include <unistd.h>  // usleep

// ---- CAN SDK 结构体定义（来自 ECanVci.h） ----

typedef struct _ECAN_BOARD_INFO {
    uint16_t hw_Version;
    uint16_t fw_Version;
    uint16_t dr_Version;
    uint16_t in_Version;
    uint16_t irq_Num;
    uint8_t  can_Num;
    char     str_Serial_Num[20];
    char     str_hw_Type[40];
    uint16_t Reserved[4];
} ECAN_BOARD_INFO;

typedef struct _ECAN_CAN_OBJ {
    uint32_t ID;
    uint32_t TimeStamp;
    uint8_t  TimeFlag;
    uint8_t  SendType;
    uint8_t  RemoteFlag;
    uint8_t  ExternFlag;
    uint8_t  DataLen;
    uint8_t  Data[8];
    uint8_t  Reserved[3];
} ECAN_CAN_OBJ;

typedef struct _ECAN_INIT_CONFIG {
    uint32_t AccCode;
    uint32_t AccMask;
    uint32_t Reserved;
    uint8_t  Filter;
    uint8_t  Timing0;
    uint8_t  Timing1;
    uint8_t  Mode;
} ECAN_INIT_CONFIG;

// ---- API 函数指针类型 ----
typedef uint32_t (*FnOpenDevice)(uint32_t, uint32_t, uint32_t);
typedef uint32_t (*FnCloseDevice)(uint32_t, uint32_t);
typedef uint32_t (*FnInitCAN)(uint32_t, uint32_t, uint32_t, ECAN_INIT_CONFIG*);
typedef uint32_t (*FnStartCAN)(uint32_t, uint32_t, uint32_t);
typedef uint32_t (*FnResetCAN)(uint32_t, uint32_t, uint32_t);
typedef uint32_t (*FnTransmit)(uint32_t, uint32_t, uint32_t, ECAN_CAN_OBJ*, uint32_t);
typedef uint32_t (*FnReceive)(uint32_t, uint32_t, uint32_t, ECAN_CAN_OBJ*, uint32_t, int32_t);
typedef uint32_t (*FnReadBoardInfo)(uint32_t, uint32_t, ECAN_BOARD_INFO*);
typedef uint32_t (*FnGetReceiveNum)(uint32_t, uint32_t, uint32_t);
typedef uint32_t (*FnClearBuffer)(uint32_t, uint32_t, uint32_t);
typedef uint32_t (*FnReadErrInfo)(uint32_t, uint32_t, uint32_t, void*);

class ECanVciWrapper {
public:
    ECanVciWrapper() : hModule_(nullptr), opened_(false) {}
    ~ECanVciWrapper() { close(); unload(); }

    bool load(const std::string& searchDir = "") {
        if (hModule_) return true;

        std::vector<std::string> paths;
        if (!searchDir.empty()) {
            paths.push_back(searchDir + "/libECanVci.so");
            paths.push_back(searchDir + "/libGCAN.so");
            paths.push_back(searchDir + "/ECanVci.so");
        }
        // 尝试系统库路径
        paths.push_back("libECanVci.so");
        paths.push_back("libGCAN.so");
        paths.push_back("./libECanVci.so");

        for (const auto& p : paths) {
            hModule_ = dlopen(p.c_str(), RTLD_NOW);
            if (hModule_) {
                fprintf(stderr, "[CAN] 已加载共享库: %s\n", p.c_str());
                break;
            }
        }

        if (!hModule_) {
            fprintf(stderr, "[CAN] 未找到 CAN SDK 共享库\n");
            return false;
        }

        #define LOAD_FN(name) \
            fn_##name = (Fn##name)dlsym(hModule_, #name); \
            if (!fn_##name) { fprintf(stderr, "[CAN] 未找到函数: %s (%s)\n", #name, dlerror()); return false; }

        LOAD_FN(OpenDevice);
        LOAD_FN(CloseDevice);
        LOAD_FN(InitCAN);
        LOAD_FN(StartCAN);
        LOAD_FN(ResetCAN);
        LOAD_FN(Transmit);
        LOAD_FN(Receive);
        LOAD_FN(ReadBoardInfo);
        LOAD_FN(GetReceiveNum);
        LOAD_FN(ClearBuffer);
        LOAD_FN(ReadErrInfo);
        #undef LOAD_FN

        return true;
    }

    void unload() {
        if (hModule_) {
            dlclose(hModule_);
            hModule_ = nullptr;
        }
    }

    bool openDevice(uint32_t deviceType, uint32_t deviceIndex = 0) {
        if (!fn_OpenDevice) return false;
        uint32_t ret = fn_OpenDevice(deviceType, deviceIndex, 0);
        fprintf(stderr, "[CAN] OpenDevice ret=%u (期望1)\n", ret);
        if (ret == 1) {
            deviceType_ = deviceType;
            deviceIndex_ = deviceIndex;
            opened_ = true;
            return true;
        }
        fprintf(stderr, "[CAN] OpenDevice 失败, ret=%u\n", ret);
        return false;
    }

    bool initCAN(uint32_t channel, uint8_t timing0 = 0x00, uint8_t timing1 = 0x14) {
        if (!fn_InitCAN || !opened_) return false;
        ECAN_INIT_CONFIG cfg = {};
        cfg.AccCode = 0x00000000;
        cfg.AccMask = 0xFFFFFFFF;
        cfg.Filter = 0;
        cfg.Timing0 = timing0;
        cfg.Timing1 = timing1;
        cfg.Mode = 0; // Normal mode
        uint32_t ret = fn_InitCAN(deviceType_, deviceIndex_, channel, &cfg);
        if (ret != 1) {
            fprintf(stderr, "[CAN] InitCAN 失败, ret=%u\n", ret);
            return false;
        }
        channel_ = channel;
        return true;
    }

    bool startCAN() {
        if (!fn_StartCAN || !opened_) return false;
        uint32_t ret = fn_StartCAN(deviceType_, deviceIndex_, channel_);
        if (ret != 1) {
            fprintf(stderr, "[CAN] StartCAN 失败, ret=%u\n", ret);
            return false;
        }
        if (fn_ClearBuffer) {
            fn_ClearBuffer(deviceType_, deviceIndex_, channel_);
        }
        return true;
    }

    bool transmit(const ECAN_CAN_OBJ& obj) {
        if (!fn_Transmit || !opened_) {
            fprintf(stderr, "[CAN] transmit 失败: fn_Transmit=%p opened=%d\n",
                    (void*)fn_Transmit, opened_.load());
            return false;
        }
        std::lock_guard<std::mutex> lock(txMutex_);
        uint32_t ret = fn_Transmit(deviceType_, deviceIndex_, channel_,
                                    const_cast<ECAN_CAN_OBJ*>(&obj), 1);
        if (ret == 0) {
            uint32_t errCode = readError();
            printError(errCode);
            if (errCode & 0x0080) {
                fprintf(stderr, "[CAN] 检测到 bus-off，尝试复位...\n");
                resetCAN();
                usleep(50000);
                ret = fn_Transmit(deviceType_, deviceIndex_, channel_,
                                   const_cast<ECAN_CAN_OBJ*>(&obj), 1);
                if (ret > 0) {
                    fprintf(stderr, "[CAN] 复位后重发成功, ID=0x%03X\n", obj.ID);
                    return true;
                }
            }
        }
        return ret > 0;
    }

    bool resetCAN() {
        if (!fn_ResetCAN || !opened_) return false;
        uint32_t ret = fn_ResetCAN(deviceType_, deviceIndex_, channel_);
        if (ret == 1) {
            ECAN_INIT_CONFIG cfg = {};
            cfg.AccCode = 0x00000000;
            cfg.AccMask = 0xFFFFFFFF;
            cfg.Filter = 0;
            cfg.Timing0 = 0x00;
            cfg.Timing1 = 0x14;
            cfg.Mode = 0;
            fn_InitCAN(deviceType_, deviceIndex_, channel_, &cfg);
            fn_StartCAN(deviceType_, deviceIndex_, channel_);
            if (fn_ClearBuffer) fn_ClearBuffer(deviceType_, deviceIndex_, channel_);
        }
        return ret == 1;
    }

    uint32_t readError() {
        if (!fn_ReadErrInfo || !opened_) return 0;
        uint8_t errBuf[8] = {};
        uint32_t errRet = fn_ReadErrInfo(deviceType_, deviceIndex_, channel_, errBuf);
        if (errRet == 1) {
            uint32_t errCode = 0;
            memcpy(&errCode, errBuf, 4);
            return errCode;
        }
        return 0;
    }

    void printError(uint32_t errCode) {
        fprintf(stderr, "[CAN] 错误信息: ErrCode=0x%04X", errCode);
        if (errCode & 0x0001) fprintf(stderr, " [FIFO溢出]");
        if (errCode & 0x0002) fprintf(stderr, " [错误报警]");
        if (errCode & 0x0004) fprintf(stderr, " [被动错误]");
        if (errCode & 0x0008) fprintf(stderr, " [仲裁丢失]");
        if (errCode & 0x0010) fprintf(stderr, " [总线错误]");
        if (errCode & 0x0080) fprintf(stderr, " [bus-off]");
        if (errCode & 0x0100) fprintf(stderr, " [设备已打开]");
        if (errCode & 0x0200) fprintf(stderr, " [打开设备失败]");
        if (errCode & 0x0400) fprintf(stderr, " [设备未打开]");
        if (errCode & 0x1000) fprintf(stderr, " [设备不存在]");
        if (errCode & 0x4000) fprintf(stderr, " [命令执行失败]");
        fprintf(stderr, "\n");
    }

    int receive(ECAN_CAN_OBJ* buf, int maxCount, int waitTime = 10) {
        if (!fn_Receive || !opened_) return 0;
        return (int)fn_Receive(deviceType_, deviceIndex_, channel_, buf, maxCount, waitTime);
    }

    uint32_t getReceiveNum() {
        if (!fn_GetReceiveNum || !opened_) return 0;
        return fn_GetReceiveNum(deviceType_, deviceIndex_, channel_);
    }

    bool readBoardInfo(ECAN_BOARD_INFO& info) {
        if (!fn_ReadBoardInfo || !opened_) return false;
        return fn_ReadBoardInfo(deviceType_, deviceIndex_, &info) == 1;
    }

    void close() {
        if (opened_ && fn_CloseDevice) {
            fn_CloseDevice(deviceType_, deviceIndex_);
            opened_ = false;
        }
    }

    bool isOpened() const { return opened_; }

    static ECanVciWrapper& sharedInstance() {
        static ECanVciWrapper instance;
        return instance;
    }

private:
    void* hModule_;
    std::atomic<bool> opened_{false};
    uint32_t deviceType_ = 4; // USBCAN2
    uint32_t deviceIndex_ = 0;
    uint32_t channel_ = 0;
    std::mutex txMutex_;

    FnOpenDevice    fn_OpenDevice = nullptr;
    FnCloseDevice   fn_CloseDevice = nullptr;
    FnInitCAN       fn_InitCAN = nullptr;
    FnStartCAN      fn_StartCAN = nullptr;
    FnResetCAN      fn_ResetCAN = nullptr;
    FnTransmit      fn_Transmit = nullptr;
    FnReceive       fn_Receive = nullptr;
    FnReadBoardInfo fn_ReadBoardInfo = nullptr;
    FnGetReceiveNum fn_GetReceiveNum = nullptr;
    FnClearBuffer   fn_ClearBuffer = nullptr;
    FnReadErrInfo   fn_ReadErrInfo = nullptr;
};
