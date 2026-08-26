#include "HandPoseManager.hpp"

#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstdio>
#include <vector>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

namespace {

constexpr double kAccelRangeG = 2.0;
constexpr double kGyroRangeDps = 250.0;
constexpr double kGravity = 9.80665;
constexpr uint64_t kVisualFrameIntervalUs = 66666;  // 最多约 15 FPS，避免影响三路视频采集。
constexpr uint64_t kImuStationaryHoldUs = 250000;
constexpr double kVisualStationaryFlowPx = 0.85;
constexpr double kVisualAnchorStationaryFlowPx = 1.50;
constexpr double kGyroStationaryThresholdRad = 0.028;
constexpr double kAccelStationaryTolerance = 0.45;
constexpr double kGyroBiasBootstrapMaxRad = 0.20;
constexpr int kGyroBiasBootstrapSamples = 20;
constexpr double kGyroBiasLearningRate = 0.006;
constexpr double kVisualRotationMinFlowPx = 1.10;
constexpr double kVisualRotationMaxDeg = 20.0;
constexpr double kMinimumVisualImuTranslation = 0.00015;
constexpr double kMaximumVisualImuTranslation = 0.035;
constexpr double kVisualTranslationMinFlowPx = 1.05;
constexpr double kNominalVisualDepthM = 0.28;
constexpr double kMaximumVisualTranslationPerFrameM = 0.018;
constexpr size_t kMaximumSparseVisualPoints = 96;
constexpr int kOriginRelocalizeHoldFrames = 3;

double clampValue(double value, double low, double high) {
    return std::max(low, std::min(high, value));
}

Eigen::Quaterniond deltaQuaternion(const Eigen::Vector3d& angularVelocity, double dt) {
    const Eigen::Vector3d angle = angularVelocity * dt;
    const double magnitude = angle.norm();
    if (magnitude < 1e-10) return Eigen::Quaterniond::Identity();
    return Eigen::Quaterniond(Eigen::AngleAxisd(magnitude, angle / magnitude));
}

void quaternionToEuler(const Eigen::Quaterniond& q, double& roll, double& pitch, double& yaw) {
    const double sinr = 2.0 * (q.w() * q.x() + q.y() * q.z());
    const double cosr = 1.0 - 2.0 * (q.x() * q.x() + q.y() * q.y());
    roll = std::atan2(sinr, cosr) * 180.0 / M_PI;

    const double sinp = 2.0 * (q.w() * q.y() - q.z() * q.x());
    pitch = std::fabs(sinp) >= 1.0
        ? std::copysign(90.0, sinp)
        : std::asin(sinp) * 180.0 / M_PI;

    const double siny = 2.0 * (q.w() * q.z() + q.x() * q.y());
    const double cosy = 1.0 - 2.0 * (q.y() * q.y() + q.z() * q.z());
    yaw = std::atan2(siny, cosy) * 180.0 / M_PI;
}

double median(std::vector<double>& values) {
    if (values.empty()) return 0.0;
    const size_t middle = values.size() / 2;
    std::nth_element(values.begin(), values.begin() + middle, values.end());
    return values[middle];
}

std::vector<std::array<float, 3>> buildSparseVisualCloud(
        const std::vector<cv::Point2f>& points,
        int width,
        int height,
        double focal) {
    std::vector<std::array<float, 3>> cloud;
    if (points.empty() || width <= 0 || height <= 0 || focal <= 1.0) return cloud;

    const size_t stride = std::max<size_t>(1,
        (points.size() + kMaximumSparseVisualPoints - 1) / kMaximumSparseVisualPoints);
    cloud.reserve(std::min(points.size(), kMaximumSparseVisualPoints));
    const double centerX = width * 0.5;
    const double centerY = height * 0.5;
    for (size_t index = 0; index < points.size() && cloud.size() < kMaximumSparseVisualPoints;
         index += stride) {
        const cv::Point2f& point = points[index];
        // 单目特征没有可靠的绝对深度。使用像素位置生成稳定的分层深度，保留
        // 真实图像中的射线方向，并在页面中形成由相机向外展开的稀疏视锥。
        const double phase = std::fmod(
            std::fabs(point.x * 0.61803398875 + point.y * 0.38196601125), 29.0) / 29.0;
        const double depth = 0.10 + phase * 0.30;
        const double normalizedX = (point.x - centerX) / focal;
        const double normalizedY = (point.y - centerY) / focal;
        cloud.push_back({
            static_cast<float>(normalizedX * depth * 1.8),
            static_cast<float>(-normalizedY * depth * 1.8),
            static_cast<float>(depth)
        });
    }
    return cloud;
}

}  // namespace

class HandPoseManager::Tracker {
public:
    explicit Tracker(const std::string& side)
        : side_(side), running_(true), worker_(&Tracker::workerLoop, this) {}

    ~Tracker() {
        running_ = false;
        frameCv_.notify_all();
        if (worker_.joinable()) worker_.join();
    }

    void setCameraConnected(bool connected) {
        {
            std::lock_guard<std::mutex> lock(stateMutex_);
            state_.cameraConnected = connected;
            if (!connected) {
                state_.hasVisual = false;
                state_.visualPointCloud.clear();
                state_.quality = state_.hasImu ? 0.25f : 0.0f;
                state_.mode = state_.connected ? "imu" : "offline";
                visualStationary_ = false;
                visualStationaryFrames_ = 0;
            }
        }
        if (!connected) {
            std::lock_guard<std::mutex> lock(frameMutex_);
            frames_.clear();
            resetVisualState_ = true;
        }
    }

    void setGripperConnected(bool connected) {
        std::lock_guard<std::mutex> lock(stateMutex_);
        if (state_.connected == connected) return;
        state_.connected = connected;
        state_.valid = connected;
        state_.mode = connected ? (state_.cameraConnected ? "initializing" : "imu") : "offline";
        if (!connected) {
            state_.hasImu = false;
            state_.hasVisual = false;
            state_.quality = 0.0f;
            lastImuTimestampUs_ = 0;
            pendingImuDelta_.setZero();
            velocity_.setZero();
            resetVisualState_ = true;
            imuStationary_ = false;
            visualStationary_ = false;
            imuStationarySinceUs_ = 0;
            visualStationaryFrames_ = 0;
        } else {
            resetPoseLocked();
        }
    }

    bool isCooperativeAvailable() const {
        std::lock_guard<std::mutex> lock(stateMutex_);
        return state_.connected && state_.cameraConnected && state_.hasImu;
    }

    bool isStronglyStationary() const {
        std::lock_guard<std::mutex> lock(stateMutex_);
        return state_.connected && state_.cameraConnected && state_.hasImu
            && imuStationary_ && visualStationary_;
    }

    void setCooperativeConstraint(bool active) {
        cooperativeConstraint_.store(active);
        std::lock_guard<std::mutex> lock(stateMutex_);
        state_.cooperativeConstraint = active;
        if (active) {
            velocity_.setZero();
            pendingImuDelta_.setZero();
            state_.quality = std::max(state_.quality, 0.9f);
            state_.mode = state_.originRelocalized
                ? "visual_imu_anchor"
                : (state_.hasVisual ? "visual_imu_cooperative" : "imu");
        } else if (state_.connected) {
            state_.mode = state_.originRelocalized
                ? "visual_imu_anchor"
                : (state_.hasVisual ? "visual_imu" : (state_.hasImu ? "imu" : "initializing"));
        }
    }

    void pushFrame(const cv::Mat& frame, uint64_t timestampUs) {
        if (frame.empty()) return;
        {
            std::lock_guard<std::mutex> lock(stateMutex_);
            if (!state_.connected || !state_.cameraConnected) return;
        }

        std::lock_guard<std::mutex> lock(frameMutex_);
        if (lastQueuedFrameTimestampUs_ != 0
            && timestampUs > lastQueuedFrameTimestampUs_
            && timestampUs - lastQueuedFrameTimestampUs_ < kVisualFrameIntervalUs) {
            return;
        }
        lastQueuedFrameTimestampUs_ = timestampUs;
        if (frames_.size() >= 2) frames_.pop_front();
        FrameSample sample;
        sample.image = frame.clone();
        sample.timestampUs = timestampUs;
        frames_.push_back(std::move(sample));
        frameCv_.notify_one();
    }

    void feedImu(const GripperState& sample) {
        if (!sample.hasData || sample.timestamp == 0) return;

        std::lock_guard<std::mutex> lock(stateMutex_);
        if (!state_.connected || sample.timestamp == lastImuTimestampUs_) return;

        state_.closure = static_cast<float>(clampValue(sample.position, 0.0, 1.0));
        state_.timestampUs = sample.timestamp;
        state_.valid = true;
        state_.hasImu = true;

        if (lastImuTimestampUs_ == 0 || sample.timestamp <= lastImuTimestampUs_) {
            lastImuTimestampUs_ = sample.timestamp;
            publishOrientationLocked();
            return;
        }

        double dt = static_cast<double>(sample.timestamp - lastImuTimestampUs_) / 1000000.0;
        lastImuTimestampUs_ = sample.timestamp;
        if (dt <= 0.0 || dt > 0.1) {
            velocity_.setZero();
            pendingImuDelta_.setZero();
            publishOrientationLocked();
            return;
        }

        Eigen::Vector3d accel(
            sample.accel[0] * kAccelRangeG * kGravity / 32768.0,
            sample.accel[1] * kAccelRangeG * kGravity / 32768.0,
            sample.accel[2] * kAccelRangeG * kGravity / 32768.0);
        const Eigen::Vector3d rawGyro(
            sample.gyro[0] * kGyroRangeDps * M_PI / (32768.0 * 180.0),
            sample.gyro[1] * kGyroRangeDps * M_PI / (32768.0 * 180.0),
            sample.gyro[2] * kGyroRangeDps * M_PI / (32768.0 * 180.0));

        const double accelNorm = accel.norm();
        const bool accelStable = std::fabs(accelNorm - kGravity) < kAccelStationaryTolerance;

        // 新版夹爪固件完成校准后仍可能保留数度每秒的固定零偏。启动阶段先在
        // 重力稳定的短窗口内求平均，避免视觉线程较早启动时与校准条件相互等待。
        // 后续温漂学习仍要求视觉和 IMU 同时静止，不会吞掉正常的缓慢转动。
        const bool bootstrapCandidate = accelStable
            && rawGyro.norm() < kGyroBiasBootstrapMaxRad;
        if (!gyroBiasInitialized_) {
            if (bootstrapCandidate) {
                gyroBiasAccumulator_ += rawGyro;
                ++gyroBiasBootstrapSamples_;
                if (gyroBiasBootstrapSamples_ >= kGyroBiasBootstrapSamples) {
                    gyroBias_ = gyroBiasAccumulator_
                        / static_cast<double>(gyroBiasBootstrapSamples_);
                    gyroBiasInitialized_ = true;
                    imuStationarySinceUs_ = sample.timestamp;
                    referenceOrientation_ = orientation_;
                    visualOrientation_ = orientation_;
                }
            } else {
                gyroBiasAccumulator_.setZero();
                gyroBiasBootstrapSamples_ = 0;
            }
        }

        Eigen::Vector3d gyro = rawGyro - gyroBias_;
        const bool stationaryCandidate = gyroBiasInitialized_
            && gyro.norm() < kGyroStationaryThresholdRad
            && accelStable;
        if (stationaryCandidate) {
            if (imuStationarySinceUs_ == 0) imuStationarySinceUs_ = sample.timestamp;
            imuStationary_ = sample.timestamp >= imuStationarySinceUs_
                && sample.timestamp - imuStationarySinceUs_ >= kImuStationaryHoldUs;
        } else {
            imuStationarySinceUs_ = 0;
            imuStationary_ = false;
        }

        if (accelNorm > 0.75 * kGravity && accelNorm < 1.25 * kGravity) {
            const Eigen::Vector3d measuredGravity = accel / accelNorm;
            if (!gravityInitialized_) {
                filteredGravityBody_ = measuredGravity;
                orientation_ = Eigen::Quaterniond::FromTwoVectors(
                    filteredGravityBody_, Eigen::Vector3d::UnitZ()).normalized();
                referenceOrientation_ = orientation_;
                visualOrientation_ = orientation_;
                gravityInitialized_ = true;
                orientationInitialized_ = true;
            } else {
                const double gravityAlpha = stationaryCandidate ? 0.04 : 0.004;
                filteredGravityBody_ = ((1.0 - gravityAlpha) * filteredGravityBody_
                    + gravityAlpha * measuredGravity).normalized();
            }
        }

        if (imuStationary_ && visualStationary_) {
            // 只有相机也确认静止时才继续学习温漂，避免把缓慢转动误当成零偏。
            gyroBias_ = (1.0 - kGyroBiasLearningRate) * gyroBias_
                + kGyroBiasLearningRate * rawGyro;
            gyro = rawGyro - gyroBias_;
            if (gyro.norm() < kGyroStationaryThresholdRad) gyro.setZero();
        } else if (!gyroBiasInitialized_ && bootstrapCandidate) {
            // 静止采样期间保持姿态，避免把尚未估计出的零偏积分进去。若设备
            // 已经发生明显旋转则保留原始角速度，使启动校准期间模型也能响应。
            gyro.setZero();
        }

        if (gravityInitialized_) {
            const Eigen::Vector3d predictedGravity = orientation_.inverse() * Eigen::Vector3d::UnitZ();
            // measured x predicted 才会把估计姿态拉向实测重力；原方向相反会造成静止后仰。
            // 静止时快速拉回重力方向，抑制模型缓慢后仰；运动时降低增益，避免
            // 将线性加速度错误解释成姿态变化。偏航仍由陀螺仪和视觉共同约束。
            const double correctionGain = imuStationary_ ? 3.6 : 0.32;
            gyro += filteredGravityBody_.cross(predictedGravity) * correctionGain;
        }

        orientation_ = (orientation_ * deltaQuaternion(gyro, dt)).normalized();
        Eigen::Vector3d linearAccel = orientation_ * accel - Eigen::Vector3d(0.0, 0.0, kGravity);
        const Eigen::Vector3d previousVelocity = velocity_;
        if (cooperativeConstraint_.load() || imuStationary_) {
            linearAccel.setZero();
            velocity_.setZero();
            pendingImuDelta_.setZero();
        } else if (linearAccel.norm() < 0.22 || stationaryCandidate) {
            linearAccel.setZero();
            velocity_ *= 0.72;
        } else {
            velocity_ += linearAccel * dt;
            if (velocity_.norm() > 0.8) velocity_ = velocity_.normalized() * 0.8;
        }
        if (!imuStationary_) {
            // 使用积分前速度，避免更新 velocity 后再次多算半个 a*dt^2。
            pendingImuDelta_ += previousVelocity * dt + 0.5 * linearAccel * dt * dt;
        }
        if (pendingImuDelta_.norm() > 0.06) pendingImuDelta_ = pendingImuDelta_.normalized() * 0.06;

        state_.sampleCount++;
        state_.stationary = imuStationary_ && visualStationary_;
        publishOrientationLocked();
        if (!state_.hasVisual) {
            state_.mode = state_.cameraConnected ? "initializing" : "imu";
            state_.quality = state_.cameraConnected ? 0.3f : 0.2f;
        } else if (cooperativeConstraint_.load()) {
            state_.mode = "visual_imu_cooperative";
            state_.quality = std::max(state_.quality, 0.9f);
        }
    }

    void getPose(HandPoseState& out) const {
        std::lock_guard<std::mutex> lock(stateMutex_);
        out = state_;
    }

    void reset() {
        {
            std::lock_guard<std::mutex> lock(stateMutex_);
            resetPoseLocked();
        }
        std::lock_guard<std::mutex> lock(frameMutex_);
        frames_.clear();
        resetVisualState_ = true;
    }

private:
    struct FrameSample {
        cv::Mat image;
        uint64_t timestampUs = 0;
    };

    void resetPoseLocked() {
        const bool connected = state_.connected;
        const bool cameraConnected = state_.cameraConnected;
        const float closure = state_.closure;
        state_ = HandPoseState();
        state_.connected = connected;
        state_.cameraConnected = cameraConnected;
        state_.closure = closure;
        state_.valid = connected;
        state_.mode = connected ? (cameraConnected ? "initializing" : "imu") : "offline";
        position_.setZero();
        velocity_.setZero();
        pendingImuDelta_.setZero();
        orientation_.setIdentity();
        referenceOrientation_.setIdentity();
        visualOrientation_.setIdentity();
        filteredGravityBody_ = Eigen::Vector3d::UnitZ();
        gyroBias_.setZero();
        gyroBiasAccumulator_.setZero();
        gyroBiasBootstrapSamples_ = 0;
        gyroBiasInitialized_ = false;
        orientationInitialized_ = false;
        gravityInitialized_ = false;
        visualOrientationInitialized_ = false;
        lastImuTimestampUs_ = 0;
        imuStationarySinceUs_ = 0;
        imuStationary_ = false;
        visualStationaryFrames_ = 0;
        visualStationary_ = false;
        originRelocalizeFrames_ = 0;
        cooperativeConstraint_.store(false);
        state_.cooperativeConstraint = false;
    }

    void publishOrientationLocked() {
        const Eigen::Quaterniond relativeOrientation = orientationInitialized_
            ? (referenceOrientation_.inverse() * orientation_).normalized()
            : Eigen::Quaterniond::Identity();
        state_.qx = relativeOrientation.x();
        state_.qy = relativeOrientation.y();
        state_.qz = relativeOrientation.z();
        state_.qw = relativeOrientation.w();
        quaternionToEuler(relativeOrientation, state_.roll, state_.pitch, state_.yaw);
    }

    void workerLoop() {
        cv::Mat previousGray;
        std::vector<cv::Point2f> previousPoints;
        cv::Ptr<cv::ORB> originOrb = cv::ORB::create(700);
        std::vector<cv::KeyPoint> originKeypoints;
        cv::Mat originDescriptors;

        while (running_) {
            FrameSample sample;
            {
                std::unique_lock<std::mutex> lock(frameMutex_);
                frameCv_.wait_for(lock, std::chrono::milliseconds(100), [this]() {
                    return !frames_.empty() || !running_;
                });
                if (!running_) break;
                if (frames_.empty()) continue;
                sample = std::move(frames_.back());
                frames_.clear();
            }

            if (resetVisualState_.exchange(false)) {
                previousGray.release();
                previousPoints.clear();
                originKeypoints.clear();
                originDescriptors.release();
            }

            cv::Mat gray;
            if (sample.image.channels() == 3) {
                cv::cvtColor(sample.image, gray, cv::COLOR_BGR2GRAY);
            } else if (sample.image.channels() == 4) {
                cv::cvtColor(sample.image, gray, cv::COLOR_BGRA2GRAY);
            } else {
                gray = sample.image;
            }

            if (gray.cols > 640) {
                const double scale = 640.0 / gray.cols;
                cv::resize(gray, gray, cv::Size(), scale, scale, cv::INTER_AREA);
            }
            cv::GaussianBlur(gray, gray, cv::Size(3, 3), 0.6);

            if (previousGray.empty()) {
                cv::goodFeaturesToTrack(gray, previousPoints, 650, 0.008, 7.0);
                originOrb->detectAndCompute(gray, cv::noArray(), originKeypoints, originDescriptors);
                previousGray = gray.clone();
                continue;
            }

            if (previousPoints.size() < 80) {
                cv::goodFeaturesToTrack(previousGray, previousPoints, 650, 0.008, 7.0);
            }

            std::vector<cv::Point2f> currentPoints;
            std::vector<unsigned char> opticalStatus;
            std::vector<float> opticalError;
            cv::calcOpticalFlowPyrLK(previousGray, gray, previousPoints, currentPoints,
                                     opticalStatus, opticalError, cv::Size(21, 21), 3);

            std::vector<cv::Point2f> trackedPrevious;
            std::vector<cv::Point2f> trackedCurrent;
            std::vector<double> flows;
            for (size_t i = 0; i < opticalStatus.size(); ++i) {
                if (!opticalStatus[i] || opticalError[i] > 35.0f) continue;
                const cv::Point2f& point = currentPoints[i];
                if (point.x < 2 || point.y < 2 || point.x >= gray.cols - 2 || point.y >= gray.rows - 2) continue;
                trackedPrevious.push_back(previousPoints[i]);
                trackedCurrent.push_back(point);
                flows.push_back(cv::norm(point - previousPoints[i]));
            }

            const double medianFlow = median(flows);
            const double focal = std::max(gray.cols, gray.rows) * 0.92;
            std::vector<std::array<float, 3>> sparseVisualCloud =
                buildSparseVisualCloud(trackedCurrent, gray.cols, gray.rows, focal);
            bool locallyStationary = false;
            {
                std::lock_guard<std::mutex> lock(stateMutex_);
                state_.visualPointCloud = sparseVisualCloud;
                const bool visuallyStill = trackedCurrent.size() >= 30
                    && medianFlow <= kVisualStationaryFlowPx;
                if (visuallyStill) {
                    visualStationaryFrames_ = std::min(visualStationaryFrames_ + 1, 30);
                } else {
                    visualStationaryFrames_ = 0;
                }
                // 15 FPS 下连续 4 帧约为 267 ms，可过滤单帧光流偶然抖动。
                visualStationary_ = visualStationaryFrames_ >= 4;
                // 鱼眼边缘和曝光变化会让完全静止画面仍产生少量光流。只要 IMU
                // 已稳定且光流没有达到明确运动量，就允许冻结位置并尝试原点匹配。
                locallyStationary = imuStationary_
                    && (visualStationary_ || medianFlow <= kVisualAnchorStationaryFlowPx);
                state_.stationary = locallyStationary;
            }

            // 只有设备已静止时才尝试与重置时的首帧匹配。匹配成功说明相机
            // 回到了初始视野，可安全消除单目尺度和 IMU 积分留下的闭环误差。
            bool originMatched = false;
            if (locallyStationary && originDescriptors.rows >= 36) {
                std::vector<cv::KeyPoint> currentKeypoints;
                cv::Mat currentDescriptors;
                originOrb->detectAndCompute(gray, cv::noArray(), currentKeypoints, currentDescriptors);
                if (currentDescriptors.rows >= 36) {
                    try {
                        cv::BFMatcher matcher(cv::NORM_HAMMING);
                        std::vector<std::vector<cv::DMatch>> matches;
                        matcher.knnMatch(originDescriptors, currentDescriptors, matches, 2);
                        std::vector<cv::Point2f> originMatchPoints;
                        std::vector<cv::Point2f> currentMatchPoints;
                        for (const auto& candidates : matches) {
                            if (candidates.size() < 2) continue;
                            if (candidates[0].distance >= 0.72f * candidates[1].distance) continue;
                            originMatchPoints.push_back(originKeypoints[candidates[0].queryIdx].pt);
                            currentMatchPoints.push_back(currentKeypoints[candidates[0].trainIdx].pt);
                        }

                        if (originMatchPoints.size() >= 36) {
                            cv::Mat homographyMask;
                            cv::findHomography(originMatchPoints, currentMatchPoints,
                                               cv::RANSAC, 3.0, homographyMask);
                            int inliers = 0;
                            std::vector<double> anchorDisplacements;
                            for (int index = 0; index < homographyMask.rows; ++index) {
                                if (homographyMask.at<unsigned char>(index, 0) == 0) continue;
                                ++inliers;
                                anchorDisplacements.push_back(cv::norm(
                                    currentMatchPoints[static_cast<size_t>(index)]
                                    - originMatchPoints[static_cast<size_t>(index)]));
                            }
                            const double inlierRatio = static_cast<double>(inliers)
                                / static_cast<double>(originMatchPoints.size());
                            const double anchorDisplacement = median(anchorDisplacements);
                            double relativeAngleDeg = 180.0;
                            {
                                std::lock_guard<std::mutex> lock(stateMutex_);
                                const Eigen::Quaterniond relative =
                                    (referenceOrientation_.inverse() * orientation_).normalized();
                                relativeAngleDeg = 2.0 * std::acos(clampValue(
                                    std::fabs(relative.w()), 0.0, 1.0)) * 180.0 / M_PI;
                            }
                            originMatched = inliers >= 26
                                && inlierRatio >= 0.62
                                && anchorDisplacement <= 24.0
                                && relativeAngleDeg <= 18.0;
                        }
                    } catch (const cv::Exception&) {
                        originMatched = false;
                    }
                }
            }

            bool originRelocalizedNow = false;
            {
                std::lock_guard<std::mutex> lock(stateMutex_);
                if (originMatched) {
                    originRelocalizeFrames_ = std::min(
                        originRelocalizeFrames_ + 1, kOriginRelocalizeHoldFrames);
                } else {
                    originRelocalizeFrames_ = 0;
                }
                originRelocalizedNow = originRelocalizeFrames_ >= kOriginRelocalizeHoldFrames;
                state_.originRelocalized = originRelocalizedNow;
                if (originRelocalizedNow) {
                    position_.setZero();
                    velocity_.setZero();
                    pendingImuDelta_.setZero();
                    state_.x = 0.0;
                    state_.y = 0.0;
                    state_.z = 0.0;
                }
            }

            bool visualUpdated = false;
            int inlierCount = 0;
            if (trackedPrevious.size() >= 30) {
                const cv::Point2d principal(gray.cols * 0.5, gray.rows * 0.5);
                cv::Mat inlierMask;
                cv::Mat essential = cv::findEssentialMat(
                    trackedPrevious, trackedCurrent, focal, principal,
                    cv::RANSAC, 0.999, 1.6, inlierMask);

                if (!essential.empty()) {
                    cv::Mat rotationCv;
                    cv::Mat translationCv;
                    inlierCount = cv::recoverPose(
                        essential, trackedPrevious, trackedCurrent,
                        rotationCv, translationCv, focal, principal, inlierMask);

                    if (inlierCount >= 24) {
                        Eigen::Matrix3d relativeRotation;
                        for (int row = 0; row < 3; ++row) {
                            for (int col = 0; col < 3; ++col) {
                                relativeRotation(row, col) = rotationCv.at<double>(row, col);
                            }
                        }
                        Eigen::Vector3d translation(
                            translationCv.at<double>(0),
                            translationCv.at<double>(1),
                            translationCv.at<double>(2));

                        Eigen::Quaterniond relativeCameraRotation(relativeRotation.transpose());
                        relativeCameraRotation.normalize();
                        const double visualRotationDeg = 2.0 * std::acos(clampValue(
                            std::fabs(relativeCameraRotation.w()), 0.0, 1.0)) * 180.0 / M_PI;

                        std::lock_guard<std::mutex> lock(stateMutex_);
                        if (!visualOrientationInitialized_) {
                            visualOrientation_ = orientation_;
                            visualOrientationInitialized_ = true;
                        }
                        const Eigen::Quaterniond orientationBefore = visualOrientation_;
                        if (locallyStationary || originRelocalizedNow) {
                            // 静止时本质矩阵的微小旋转主要来自像素噪声，不能继续积分。
                            visualOrientation_ = orientation_;
                        } else if (medianFlow >= kVisualRotationMinFlowPx
                                   && visualRotationDeg <= kVisualRotationMaxDeg) {
                            visualOrientation_ = (visualOrientation_ * relativeCameraRotation).normalized();
                            // 鱼眼图像未做严格针孔标定，本质矩阵只提供弱修正，姿态以 IMU 为主。
                            orientation_ = orientation_.slerp(0.02, visualOrientation_).normalized();
                        } else {
                            visualOrientation_ = orientation_;
                        }

                        Eigen::Vector3d visualDirection = -relativeRotation.transpose() * translation;
                        if (visualDirection.norm() > 1e-8) visualDirection.normalize();
                        visualDirection = orientationBefore * visualDirection;

                        Eigen::Vector3d imuDelta = pendingImuDelta_;
                        pendingImuDelta_.setZero();
                        const double imuScale = imuDelta.norm();
                        const double visualScale = clampValue(
                            medianFlow / focal * kNominalVisualDepthM,
                            0.0, kMaximumVisualTranslationPerFrameM);
                        double scale = imuScale;
                        if (cooperativeConstraint_.load() || locallyStationary || originRelocalizedNow) {
                            // 单手静止即可冻结位置；双手约束用于进一步提高静止判定可信度。
                            scale = 0.0;
                            velocity_.setZero();
                        } else if (medianFlow >= kVisualTranslationMinFlowPx
                                   && imuScale >= kMinimumVisualImuTranslation
                                   && imuScale <= kMaximumVisualImuTranslation) {
                            if (visualDirection.dot(imuDelta) < 0.0) visualDirection = -visualDirection;
                            Eigen::Vector3d fusedDirection = visualDirection * 0.60 + imuDelta.normalized() * 0.40;
                            if (fusedDirection.norm() > 1e-8) visualDirection = fusedDirection.normalized();
                            // IMU 提供米制尺度，视觉光流补足低速移动时被积分死区吞掉的位移。
                            scale = clampValue(imuScale * 0.65 + visualScale * 0.35,
                                               0.0, kMaximumVisualTranslationPerFrameM);
                        } else if (medianFlow >= kVisualTranslationMinFlowPx) {
                            // 匀速或缓慢移动时加速度接近零，纯 IMU 无法给出尺度。此时采用
                            // 保守名义工作距离恢复相对位移；静止门限会阻止纹理噪声累积。
                            scale = visualScale * 0.72;
                        } else {
                            scale = 0.0;
                        }

                        position_ += visualDirection * scale;
                        state_.x = position_.x();
                        state_.y = position_.y();
                        state_.z = position_.z();
                        state_.timestampUs = sample.timestampUs;
                        state_.hasVisual = true;
                        state_.valid = state_.connected;
                        state_.visualFeatures = inlierCount;
                        state_.quality = cooperativeConstraint_.load()
                            ? std::max(0.9f, static_cast<float>(clampValue(inlierCount / 100.0, 0.25, 1.0)))
                            : static_cast<float>(clampValue(inlierCount / 100.0, 0.25, 1.0));
                        state_.mode = originRelocalizedNow
                            ? "visual_imu_anchor"
                            : (cooperativeConstraint_.load()
                                ? "visual_imu_cooperative"
                                : "visual_imu");
                        state_.cooperativeConstraint = cooperativeConstraint_.load();
                        state_.sampleCount++;
                        publishOrientationLocked();
                        visualUpdated = true;
                    }
                }
            }

            {
                std::lock_guard<std::mutex> lock(stateMutex_);
                if (!visualUpdated && state_.connected) {
                    state_.visualFeatures = static_cast<int>(trackedCurrent.size());
                    if (visualStationary_) {
                        // 静止画面无法稳定恢复本质矩阵，但连续低光流本身仍是有效视觉约束。
                        state_.hasVisual = true;
                        state_.mode = originRelocalizedNow
                            ? "visual_imu_anchor"
                            : (cooperativeConstraint_.load()
                                ? "visual_imu_cooperative"
                                : "visual_imu");
                        state_.cooperativeConstraint = cooperativeConstraint_.load();
                        state_.quality = cooperativeConstraint_.load() ? 0.9f : 0.55f;
                    } else {
                        state_.hasVisual = false;
                        state_.mode = state_.hasImu ? "imu" : "initializing";
                        state_.cooperativeConstraint = false;
                        state_.quality = state_.hasImu ? 0.2f : 0.05f;
                    }
                }
            }

            if (trackedCurrent.size() >= 80) {
                previousPoints = std::move(trackedCurrent);
            } else {
                cv::goodFeaturesToTrack(gray, previousPoints, 650, 0.008, 7.0);
            }
            previousGray = gray.clone();
        }
    }

    std::string side_;
    std::atomic<bool> running_;
    std::thread worker_;

    mutable std::mutex stateMutex_;
    HandPoseState state_;
    Eigen::Vector3d position_ = Eigen::Vector3d::Zero();
    Eigen::Vector3d velocity_ = Eigen::Vector3d::Zero();
    Eigen::Vector3d pendingImuDelta_ = Eigen::Vector3d::Zero();
    Eigen::Quaterniond orientation_ = Eigen::Quaterniond::Identity();
    Eigen::Quaterniond referenceOrientation_ = Eigen::Quaterniond::Identity();
    Eigen::Quaterniond visualOrientation_ = Eigen::Quaterniond::Identity();
    Eigen::Vector3d filteredGravityBody_ = Eigen::Vector3d::UnitZ();
    Eigen::Vector3d gyroBias_ = Eigen::Vector3d::Zero();
    Eigen::Vector3d gyroBiasAccumulator_ = Eigen::Vector3d::Zero();
    bool orientationInitialized_ = false;
    bool gravityInitialized_ = false;
    bool gyroBiasInitialized_ = false;
    bool visualOrientationInitialized_ = false;
    int gyroBiasBootstrapSamples_ = 0;
    uint64_t lastImuTimestampUs_ = 0;
    uint64_t imuStationarySinceUs_ = 0;
    bool imuStationary_ = false;
    int visualStationaryFrames_ = 0;
    bool visualStationary_ = false;
    int originRelocalizeFrames_ = 0;
    std::atomic<bool> cooperativeConstraint_{false};

    std::mutex frameMutex_;
    std::condition_variable frameCv_;
    std::deque<FrameSample> frames_;
    uint64_t lastQueuedFrameTimestampUs_ = 0;
    std::atomic<bool> resetVisualState_{false};
};

HandPoseManager::HandPoseManager(bool enabled) : enabled_(enabled) {
    mappings_["left"] = {"left", "left"};
    mappings_["right"] = {"right", "right"};
    trackers_["left"].reset(new Tracker("left"));
    trackers_["right"].reset(new Tracker("right"));
    fprintf(stderr, "[位姿] 双手视觉惯性轨迹模块%s\n", enabled_ ? "已启用" : "已禁用");
}

HandPoseManager::~HandPoseManager() = default;

HandPoseManager::Tracker* HandPoseManager::trackerForSide(const std::string& side) const {
    auto it = trackers_.find(side);
    return it == trackers_.end() ? nullptr : it->second.get();
}

void HandPoseManager::refreshCooperativeConstraintLocked() {
    Tracker* left = trackerForSide("left");
    Tracker* right = trackerForSide("right");
    const bool available = left && right
        && left->isCooperativeAvailable()
        && right->isCooperativeAvailable();
    const bool active = available
        && left->isStronglyStationary()
        && right->isStronglyStationary();

    cooperativeAvailable_.store(available);
    cooperativeActive_.store(active);
    if (left) left->setCooperativeConstraint(active);
    if (right) right->setCooperativeConstraint(active);
}

void HandPoseManager::setMapping(const std::string& side,
                                 const std::string& cameraSlot,
                                 const std::string& gripperSlot) {
    if (side != "left" && side != "right") return;
    if (cameraSlot != "left" && cameraSlot != "right" && cameraSlot != "head") return;
    if (gripperSlot != "left" && gripperSlot != "right") return;

    bool changed = false;
    bool cameraConnected = false;
    bool gripperConnected = false;
    {
        std::lock_guard<std::mutex> lock(mappingMutex_);
        HandPoseMapping& mapping = mappings_[side];
        changed = mapping.cameraSlot != cameraSlot || mapping.gripperSlot != gripperSlot;
        mapping.cameraSlot = cameraSlot;
        mapping.gripperSlot = gripperSlot;
        auto cameraIt = cameraConnections_.find(cameraSlot);
        cameraConnected = cameraIt != cameraConnections_.end() && cameraIt->second;
        auto gripperIt = gripperConnections_.find(gripperSlot);
        gripperConnected = gripperIt != gripperConnections_.end() && gripperIt->second;
    }
    if (changed) {
        Tracker* tracker = trackerForSide(side);
        if (tracker) {
            tracker->setCameraConnected(cameraConnected);
            tracker->setGripperConnected(gripperConnected);
            tracker->reset();
        }
        fprintf(stderr, "[位姿] %s手映射: 相机=%s, 夹爪=%s\n",
                side.c_str(), cameraSlot.c_str(), gripperSlot.c_str());
        std::lock_guard<std::mutex> lock(mappingMutex_);
        refreshCooperativeConstraintLocked();
    }
}

HandPoseMapping HandPoseManager::getMapping(const std::string& side) const {
    std::lock_guard<std::mutex> lock(mappingMutex_);
    auto it = mappings_.find(side);
    return it == mappings_.end() ? HandPoseMapping() : it->second;
}

void HandPoseManager::setCameraConnected(const std::string& cameraSlot, bool connected) {
    if (!enabled_) return;
    std::lock_guard<std::mutex> lock(mappingMutex_);
    cameraConnections_[cameraSlot] = connected;
    for (const auto& item : mappings_) {
        if (item.second.cameraSlot == cameraSlot) {
            Tracker* tracker = trackerForSide(item.first);
            if (tracker) tracker->setCameraConnected(connected);
        }
    }
    refreshCooperativeConstraintLocked();
}

void HandPoseManager::setGripperConnected(const std::string& gripperSlot, bool connected) {
    if (!enabled_) return;
    std::lock_guard<std::mutex> lock(mappingMutex_);
    gripperConnections_[gripperSlot] = connected;
    for (const auto& item : mappings_) {
        if (item.second.gripperSlot == gripperSlot) {
            Tracker* tracker = trackerForSide(item.first);
            if (tracker) tracker->setGripperConnected(connected);
        }
    }
    refreshCooperativeConstraintLocked();
}

void HandPoseManager::feedCameraFrame(const std::string& cameraSlot,
                                      const cv::Mat& frame,
                                      uint64_t timestampUs) {
    if (!enabled_) return;
    std::lock_guard<std::mutex> lock(mappingMutex_);
    for (const auto& item : mappings_) {
        if (item.second.cameraSlot == cameraSlot) {
            Tracker* tracker = trackerForSide(item.first);
            if (tracker) tracker->pushFrame(frame, timestampUs);
        }
    }
    refreshCooperativeConstraintLocked();
}

void HandPoseManager::feedGripperState(const std::string& gripperSlot,
                                       const GripperState& state) {
    if (!enabled_) return;
    std::lock_guard<std::mutex> lock(mappingMutex_);
    for (const auto& item : mappings_) {
        if (item.second.gripperSlot == gripperSlot) {
            Tracker* tracker = trackerForSide(item.first);
            if (tracker) tracker->feedImu(state);
        }
    }
    refreshCooperativeConstraintLocked();
}

bool HandPoseManager::getPose(const std::string& side, HandPoseState& out) const {
    Tracker* tracker = trackerForSide(side);
    if (!tracker) return false;
    tracker->getPose(out);
    return true;
}

void HandPoseManager::reset(const std::string& side) {
    std::lock_guard<std::mutex> lock(mappingMutex_);
    if (side == "all") {
        for (const auto& item : trackers_) item.second->reset();
        refreshCooperativeConstraintLocked();
        return;
    }
    Tracker* tracker = trackerForSide(side);
    if (tracker) tracker->reset();
    refreshCooperativeConstraintLocked();
}
