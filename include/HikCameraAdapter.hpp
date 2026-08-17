// HikCameraAdapter.hpp - HikCamera 适配器
// 包装现有 HikCamera 使其符合 ICamera 接口

#pragma once

#include "ICamera.hpp"
#include "HikCamera.hpp"

class HikCameraAdapter : public ICamera {
public:
    explicit HikCameraAdapter(const CameraConfig& cfg) : camera_(cfg) {}

    bool open(int index = 0, const std::string& serial = "") override {
        return camera_.open(index, serial);
    }

    void close() override {
        camera_.close();
    }

    bool isOpened() const override {
        return camera_.isOpened();
    }

    bool isDevicePresent() const {
        return camera_.isDevicePresent();
    }

    std::string getDeviceName() const override {
        return camera_.getDeviceName();
    }

    std::string getSerialNumber() const override {
        return camera_.getSerialNumber();
    }

    std::string getDeviceType() const override {
        return "hikvision";
    }

    bool hasColorStream() const override { return true; }
    bool hasDepthStream() const override { return false; }
    bool hasIRStream() const override { return false; }
    bool hasIMU() const override { return false; }

    cv::Mat readColor() override {
        return camera_.read();
    }

    bool setCameraControls(const CameraControlParams& params) override {
        return camera_.setCameraControls(params);
    }

    bool supportsHardwareControls() const override { return true; }

private:
    HikCamera camera_;
};
