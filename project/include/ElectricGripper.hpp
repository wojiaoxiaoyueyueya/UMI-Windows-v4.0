// ElectricGripper.hpp - 电动夹爪驱动（CAN总线版本，Linux 移植）
// 使用广成科技 GCAN USBCAN 盒 + CANMIT 协议通信

#pragma once

#include "IGripper.hpp"
#include "ECanVciWrapper.hpp"
#include <mutex>
#include <string>
#include <atomic>
#include <thread>
#include <cstdint>
#include <cstring>

struct ElectricGripperFullState {
    float position = 0.0f;      // rad
    float positionDeg = 0.0f;   // degrees
    float velocity = 0.0f;      // rpm
    float current = 0.0f;       // A
    float motorTemp = 0.0f;     // °C
    float mosTemp = 0.0f;       // °C
    uint8_t errorCode = 0;
    uint8_t mode = 0;
    bool motorEnabled = false;
    bool hasData = false;
    bool connected = false;
    uint64_t timestamp = 0;
    uint8_t rawFrame[8] = {};
    uint8_t rawFrameLen = 0;
};

class ElectricGripper : public IGripper {
public:
    ElectricGripper();
    ~ElectricGripper() override;

    // IGripper 统一接口实现
    bool open(const std::string& port, int baudRate = 115200) override;
    void close() override;
    bool isConnected() const override;
    void getState(GripperState& out) const override;
    std::string getGripperType() const override { return "electric"; }
    std::string getPortName() const override { return portName_; }
    void setPosition(float pos) override;
    float getPosition() const override;

    // CAN 专用打开方式
    bool openCAN(ECanVciWrapper* can, uint32_t motorId = 1);

    // 电机基础控制
    void enableMotor();
    void disableMotor();
    void clearError();
    void haltMotor();

    // 位置控制（模式 0x01）
    bool sendPositionControl(float positionDeg, float speedRpm, float currentLimit);
    // 速度控制（模式 0x02）
    bool sendSpeedControl(float speedRpm, float currentLimit);
    // MIT 力位混控（模式 0x00）
    bool sendMITControl(float kp, float kd, float positionRad, float speedRadS, float torque);
    // 电流控制（模式 0x03）
    bool sendCurrentControl(float currentA);
    // 参数查询（模式 0x07）
    bool queryPosition();
    bool querySpeed();
    bool queryCurrent();
    // 参数配置（模式 0x06）
    bool setAcceleration(float accelRadS2);

    // 配置命令（CAN ID 0x7FF）
    bool setZero();
    bool findZero();
    bool stopMotion();
    bool queryMotorId();

    // 极限标定
    bool findLimit(float speedRpm, float currentLimit);
    bool stopSpeed();
    bool findMinLimit();
    bool sendPresetPosition(float positionDeg);

    // 读取完整状态
    void getFullState(ElectricGripperFullState& out) const;

    ECanVciWrapper* getCanWrapper() const { return can_; }
    uint32_t getMotorId() const { return motorId_; }

    static constexpr float DEFAULT_SPEED_RPM = 200.0f;
    static constexpr float DEFAULT_CURRENT_LIMIT = 4.0f;

private:
    void pollLoop();
    bool sendCANFrame(uint32_t id, const uint8_t* data, uint8_t len);
    bool sendConfigFrame(const uint8_t* data, uint8_t len);
    void parseFeedback(ECAN_CAN_OBJ& obj);

    ECanVciWrapper* can_ = nullptr;
    bool ownsCan_ = false;
    uint32_t motorId_ = 0x01;

    std::atomic<bool> connected_{false};
    std::atomic<bool> running_{false};
    std::thread pollThread_;
    mutable std::mutex stateMutex_;
    GripperState state_;
    ElectricGripperFullState fullState_;
    std::string portName_;

    float defaultSpeed_ = DEFAULT_SPEED_RPM;
    float defaultCurrent_ = DEFAULT_CURRENT_LIMIT;
};
