# UMI Windows V4 数据采集平台

`UMI-Windows-V4` 是当前推荐使用的 Windows 主版本，面向 UMI V4.0 手动夹爪、多相机数据采集和电动夹爪控制。

## 版本状态

| 项目 | 内容 |
| --- | --- |
| 当前版本 | `4.2.0` |
| 发布日期 | 2026-08-25 |
| 操作系统 | Windows 10 / Windows 11 64 位 |
| 手动夹爪协议 | UMI V4.0 |
| 后端 | C++14 本地 HTTP 服务 |
| 前端 | 原生 HTML / CSS / JavaScript |
| 默认端口 | `8080` |
| 默认安装目录 | `D:\UMIDataCapturePlatform` |

## 主要能力

- 海康工业相机、Orbbec Gemini 305 和浏览器 UVC 相机接入。
- 彩色、深度、双红外、点云、手动夹爪和电动夹爪数据采集。
- 双 UMI V4.0 手动夹爪识别、槽位交换、标定补偿、按键、IMU、LED 和参数读取。
- 相机曝光、增益、白平衡、Gamma、锐度、降噪和鱼眼显示控制。
- GCAN 或 ESP32-S3 CAN 串口桥控制电动夹爪。
- 剪刀石头布手势联动和手动夹爪遥控电动夹爪。
- 统一会话时间基准、历史记录、后台保存队列和会话删除。
- LeRobot、HDF5、RLDS 格式转换和训练就绪校验。
- 一键 Windows 安装包，内置运行时、SDK 和硬件驱动文件。

## 支持设备

| 类型 | 当前适配 |
| --- | --- |
| 手动夹爪 | UMI V4.0 双手动夹爪 |
| 工业相机 | 海康 MVS USB 工业相机 |
| 深度相机 | Orbbec Gemini 305 |
| 手势相机 | IMX335 或其他 UVC 相机 |
| 电动夹爪 | CAN 电动夹爪，统一行程 `0°~4500°` |
| CAN 接口 | GCAN USBCAN、ESP32-S3 `can_transceiver` |

## 4.2.0 重点更新

- 训练转换不再生成伪造的全零动作；LeRobot 训练包必须有真实动作日志。
- 多路视频、夹爪、IMU 和动作使用同一会话时间基准对齐。
- 默认控制台入口统一为 `/index.html`，数据看板迁移到 `/dashboard.html`。
- 清理重复 SDK、旧协议试验代码和 Windows 版本中无用的 Linux 运行库。
- 文档拆分为版本简介、完整使用手册、开发者说明和训练数据契约。

## 文档入口

- [完整使用、配置与部署手册](docs/USER_GUIDE.md)
- [V4 更新记录](CHANGELOG.md)
- [开发者指南](docs/developer-guide.md)
- [代码结构](docs/code-structure.md)
- [训练数据契约](docs/training-data-contract.md)

普通用户可直接从 [GitHub Releases](https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0/releases/latest) 下载安装包。源码开发者请先阅读完整使用手册，再进入本目录构建。
