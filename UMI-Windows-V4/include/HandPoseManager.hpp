#pragma once

#include "IGripper.hpp"

#include <atomic>
#include <condition_variable>
#include <cstdint>
#include <deque>
#include <map>
#include <memory>
#include <mutex>
#include <string>
#include <thread>

#include <Eigen/Core>
#include <Eigen/Geometry>
#include <opencv2/opencv.hpp>

// 左右手独立的相对位姿。坐标原点为本次跟踪开始位置，平移单位为米，角度单位为度。
struct HandPoseState {
    bool connected = false;
    bool cameraConnected = false;
    bool hasImu = false;
    bool hasVisual = false;
    bool valid = false;
    uint64_t timestampUs = 0;
    uint64_t sampleCount = 0;

    double x = 0.0;
    double y = 0.0;
    double z = 0.0;
    double qx = 0.0;
    double qy = 0.0;
    double qz = 0.0;
    double qw = 1.0;
    double roll = 0.0;
    double pitch = 0.0;
    double yaw = 0.0;

    float closure = 0.0f;
    float quality = 0.0f;
    int visualFeatures = 0;
    bool stationary = false;
    bool originRelocalized = false;
    bool cooperativeConstraint = false;
    std::string mode = "offline";
};

struct HandPoseMapping {
    std::string cameraSlot;
    std::string gripperSlot;
};

// 视觉惯性位姿管理器。
// 每只手拥有独立跟踪器：陀螺仪负责高频姿态，鱼眼画面的特征跟踪负责约束漂移和移动方向，
// 加速度用于估算视觉平移尺度。输出是相对于启动/重置时刻的轨迹，不是外部世界绝对坐标。
class HandPoseManager {
public:
    explicit HandPoseManager(bool enabled = true);
    ~HandPoseManager();

    bool isEnabled() const { return enabled_; }

    void setMapping(const std::string& side,
                    const std::string& cameraSlot,
                    const std::string& gripperSlot);
    HandPoseMapping getMapping(const std::string& side) const;

    void setCameraConnected(const std::string& cameraSlot, bool connected);
    void setGripperConnected(const std::string& gripperSlot, bool connected);
    void feedCameraFrame(const std::string& cameraSlot,
                         const cv::Mat& frame,
                         uint64_t timestampUs);
    void feedGripperState(const std::string& gripperSlot,
                          const GripperState& state);

    bool getPose(const std::string& side, HandPoseState& out) const;
    bool isCooperativeAvailable() const { return cooperativeAvailable_.load(); }
    bool isCooperativeActive() const { return cooperativeActive_.load(); }
    void reset(const std::string& side);

private:
    class Tracker;

    Tracker* trackerForSide(const std::string& side) const;
    // 调用方持有 mappingMutex_ 时刷新双手协同状态。仅当双手的 IMU 与视觉
    // 同时确认静止时才启用约束，避免给正常的双手独立运动施加错误距离限制。
    void refreshCooperativeConstraintLocked();
    std::map<std::string, HandPoseMapping> mappings_;
    std::map<std::string, std::unique_ptr<Tracker>> trackers_;
    // 保存物理槽位的最新连接状态。映射交换后立即按新槽位刷新跟踪器，
    // 避免单手或部分相机接入时短暂沿用交换前设备的在线状态。
    std::map<std::string, bool> cameraConnections_;
    std::map<std::string, bool> gripperConnections_;
    mutable std::mutex mappingMutex_;
    std::atomic<bool> cooperativeAvailable_{false};
    std::atomic<bool> cooperativeActive_{false};
    bool enabled_;
};
