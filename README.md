# UMI 数据采集系统

UMI 数据采集系统用于机器人操作数据采集、设备控制、会话管理和数据格式转换。本仓库统一保存当前 Windows V4 主版本，以及仍需留档的 Windows 旧协议版和 Ubuntu 22.04 旧版。

## 当前状态

| 项目 | 状态 |
| --- | --- |
| 当前推荐版本 | `UMI-Windows-V4` 4.3.1 |
| 当前主系统 | Windows 10 / Windows 11 64 位 |
| 主要协议 | UMI 手动夹爪 V4.0 |
| 发布形式 | 源码、完整 SDK/驱动、Windows 一键安装包 |
| 旧版策略 | 只维护归档，不再与 V4 混合开发 |

普通用户请使用 `UMI-Windows-V4`。另外两套版本仅用于旧硬件兼容、历史问题复现和 Linux 方案参考。

## 三个版本

| 目录 | 当前版本 | 定位 | 维护状态 |
| --- | --- | --- | --- |
| [`UMI-Windows-V4`](UMI-Windows-V4/) | `4.3.1` | 当前 Windows 主版本，使用 UMI V4.0 手动夹爪协议 | 主动维护 |
| [`UMI-Windows-Legacy`](UMI-Windows-Legacy/) | `3.0.0` | Windows 旧手动夹爪协议版本 | 兼容归档 |
| [`UMI-Linux-Legacy`](UMI-Linux-Legacy/) | `1.0.0` | Ubuntu 22.04 移植版本 | 兼容归档 |

## 当前 V4 能力

- 海康工业相机和 Orbbec Gemini 305 的检测、预览与录制。
- Orbbec 彩色、深度、双红外和点云数据采集。
- 双 UMI V4.0 手动夹爪位置、按键、IMU、LED 和设备参数读取。
- GCAN 适配器或 ESP32-S3 CAN 串口桥控制电动夹爪。
- 相机参数控制、夹爪控制、剪刀石头布和手动夹爪遥控电动夹爪。
- 左右手视觉与 IMU 相对位姿、可交互三维轨迹、STEP 模型闭合动画和双手协同静止约束。
- 多设备统一会话时间基准、历史会话管理和后台转换队列。
- LeRobot、HDF5、RLDS 输出；训练就绪状态会按真实动作数据进行校验。
- Windows 一键安装，SDK 运行库和硬件驱动随安装包提供。
- 最后一个平台页面关闭后自动释放相机、串口和 CAN；异常残留后台可由启动器或桌面退出快捷方式清理。

## 获取方式

- 源码：克隆本仓库后进入 [`UMI-Windows-V4`](UMI-Windows-V4/)。
- 普通用户：从 [Releases](https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0/releases/latest) 下载最新版 Windows 安装包。
- 完整配置和操作：阅读 [V4 使用与部署手册](UMI-Windows-V4/docs/USER_GUIDE.md)。
- 版本演进：阅读 [CHANGELOG.md](CHANGELOG.md)。

## 目录原则

三套版本相互独立，不共享构建目录或硬件驱动实现。请在目标版本目录内编译和运行，不要把旧版源码复制进 V4。采集数据、转换结果、日志和本机构建产物均由 `.gitignore` 排除，不会上传到 GitHub。

旧版完整 Git 历史同时保存在 `archive/windows-legacy-history` 和 `archive/linux-legacy-history` 分支。目录版本用于直接使用，归档分支用于追溯原始提交。

原独立仓库 `UMI-windows` 和 `UMI-linux` 已于 2026-08-25 在完成源码核对、目录导入和历史分支保护后删除。后续请统一使用本仓库，不要继续引用旧仓库地址。

> 第三方 SDK 和驱动的著作权、许可及再分发条件归各厂商所有。公开分发或商业交付前应再次核对对应许可。
