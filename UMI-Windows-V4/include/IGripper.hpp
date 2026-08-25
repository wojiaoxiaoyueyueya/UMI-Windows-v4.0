// IGripper.hpp - 抽象夹爪接口
// 统一手动夹爪(UMI)和电动夹爪的接口

#pragma once

#include <string>
#include <cstdint>
#include <mutex>
#include <vector>

struct GripperState {
    float position = 0.0f;
    uint8_t button1 = 255;
    uint8_t button2 = 255;
    uint64_t timestamp = 0;
    bool hasData = false;
    bool connected = false;
    bool hasExtendedData = false;
    uint8_t protocolVersion = 0;      // 0=未知，4=UMI 2.0/V4.0 新协议
    uint8_t payloadLength = 0;
    uint8_t deviceId = 0;
    uint32_t encoderRaw = 0;
    uint32_t positionRaw = 0;
    bool positionFallback = false;
    uint8_t lastV4Command = 0;
    bool hasDeviceParams = false;
    uint16_t txAddress = 0;
    uint8_t txFrequency = 0;
    uint16_t rxAddress = 0;
    uint8_t rxFrequency = 0;
    uint8_t ledR = 0;
    uint8_t ledG = 0;
    uint8_t ledB = 0;
    uint8_t ledBrightness = 0;
    int16_t accel[3] = {0, 0, 0};
    int16_t gyro[3] = {0, 0, 0};
    int16_t force[12] = {};
    uint8_t forceCount = 0;
    int forceMaxAbs = 0;
};

class IGripper {
public:
    virtual ~IGripper() = default;

    virtual bool open(const std::string& port, int baudRate = 115200) = 0;
    virtual void close() = 0;
    virtual bool isConnected() const = 0;
    virtual void getState(GripperState& out) const = 0;
    virtual std::string getGripperType() const = 0;  // "manual" or "electric"
    virtual std::string getPortName() const = 0;

    // 可选功能
    virtual void setLed(uint8_t r, uint8_t g, uint8_t b, uint8_t brightness = 100) {}
    virtual void setPosition(float pos) { (void)pos; }
    virtual float getPosition() const { return 0.0f; }
};
