# 当前状态

目标系统：Ubuntu 22.04 x86_64

## 已完成的功能

- 海康工业相机：彩色视频采集、多相机同时在线
- Orbbec 深度相机：彩色、深度、红外采集
- UMI 手动夹爪：串口通信、左右手自动识别
- HTTP 服务 + Web 控制台：实时预览、设备控制
- 数据录制：多相机、夹爪、统一时间戳
- 数据转换：LeRobot / HDF5 / RLDS 三种格式
- 鱼眼去畸变、亮度对比度调节

## 已修复的问题

- Linux `system()` 返回值解码：使用 `WEXITSTATUS()` 提取真实退出码，修复无视频会话误报 "failed (code 512)"
- Orbbec 设备检测：去掉 `fork()` 隔离，改为直接 SDK 调用，修复设备反复检测不到的问题
- Orbbec 黑屏：帧聚合模式从 `ALL_TYPE_FRAME_REQUIRE` 改为 `DISABLE`，修复 IR 流阻塞导致所有画面黑屏的问题

## 待完成

- GCAN 电动夹爪：需要 SocketCAN 或 GCAN Linux SDK

## 项目自包含说明

所有 SDK 都在项目内（`third_party_sdk/`），二进制 RUNPATH 指向项目内路径。移植到新机器不需要额外安装海康 MVS 客户端或 Orbbec SDK。

## 不要做的事

- 不要把真实 `.env` 提交到 Git
- 不要把 OpenAI API Key 写入源码
- 不要把 `build/` 目录带到新机器
- 不要在没有确认 SDK 授权的情况下公开分发厂商 SDK
