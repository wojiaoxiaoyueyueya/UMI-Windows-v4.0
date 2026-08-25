# Linux 移植状态

目标系统：Ubuntu 22.04 LTS x86_64

## 已整理完成

- 仓库根目录已整理为可直接克隆部署的 Linux 工程。
- `scripts/bootstrap_ubuntu2204.sh` 用于安装 Ubuntu 依赖。
- `scripts/build_linux.sh` 用于编译到 `project/build-linux/`。
- `scripts/run_linux.sh` 会自动设置 SDK 动态库路径并启动服务。
- `.gitignore` 已排除编译产物、采集数据、转换数据、日志和本地私有配置。
- 顶层 `README.md`、`README_LINUX.md`、`project/README.md` 和 `project/docs/deployment.md` 已更新。

## 已适配功能

- 海康工业相机：Linux MVS SDK 彩色视频采集。
- Orbbec 深度相机：彩色、深度、红外采集。
- UMI 手动夹爪：Linux 串口通信和状态采集。
- HTTP 服务和 Web 控制台：实时预览、设备控制、录制控制、历史会话管理。
- 数据录制：多相机、夹爪和统一时间戳保存。
- 数据转换：LeRobot、HDF5、RLDS。
- 项目说明页面：`http://localhost:8080/info.html`。

## 需要按现场硬件继续确认

- 电动夹爪 CAN 控制：源码保留接口，现场可根据实际硬件选择 SocketCAN、GCAN 或 ESP32-CAN 串口桥接方式继续完善。
- 多相机长期稳定性：三路及以上 USB 相机建议在目标 Ubuntu 主机上做长时间录制测试。
- 厂商 SDK 授权：当前仓库包含 `third_party_sdk/`，公开分发前请再次确认海康、Orbbec、GCAN 等 SDK 的授权要求。

## 不应提交的内容

- `.env` 或任何真实密钥。
- `project/build/`、`project/build-linux/`。
- `project/data_capture/`、`project/data_converted/`。
- `project/Log/` 和其他运行日志。
- 本机 IDE 缓存或临时文件。
