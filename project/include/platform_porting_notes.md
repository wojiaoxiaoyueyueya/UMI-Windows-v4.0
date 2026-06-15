# Linux 平台层替换清单

这个文件用于提醒后续移植时需要重点替换的代码位置。

## 文件系统

当前代码位置：

- `include/utils/WinFsUtils.hpp`
- `src/http/HttpServer.cpp`
- `src/http/HttpServerRoutes.cpp`
- `src/http/HttpServerRecording.cpp`

Linux 建议：

- 使用 `std::filesystem` 处理路径、目录创建、递归删除、目录遍历；
- 统一使用 UTF-8 路径，不需要 Windows 的宽字符转换；
- 删除 `_mkdir`、`FindFirstFileW`、`DeleteFileW`、`RemoveDirectoryW` 等 Win32 API。

## 手动夹爪串口

当前代码位置：

- `include/UmiGripper.hpp`
- `src/UmiGripper.cpp`

Linux 建议：

- 使用 `/dev/ttyUSB*` 或 `/dev/ttyACM*`；
- 使用 `termios` 配置 115200、8N1、无流控；
- 用 `read`、`write`、`tcflush` 替代 `ReadFile`、`WriteFile`、`PurgeComm`；
- 用 `udevadm info` 或 `/sys/class/tty` 读取 VID/PID。

## 电动夹爪 CAN

当前代码位置：

- `include/ECanVciWrapper.hpp`
- `include/ElectricGripper.hpp`
- `src/ElectricGripper.cpp`
- `src/DeviceManager.cpp`

Linux 建议：

- 优先用 SocketCAN；
- 如果厂商只提供 Linux SDK，则用 `.so` 直接链接或 `dlopen`；
- 前端页面逻辑不需要变，后端保持原有 HTTP API 即可。

## 主程序与异常处理

当前代码位置：

- `src/main.cpp`

Linux 建议：

- 用 `signal(SIGINT, ...)` / `signal(SIGTERM, ...)` 做退出处理；
- 删除 Windows SEH 和 `GetModuleFileName` 相关代码；
- 用 `/proc/self/exe` 或 `std::filesystem::current_path()` 处理运行目录。
