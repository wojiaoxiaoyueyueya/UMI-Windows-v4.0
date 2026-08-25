# 电动夹爪 CAN 层 Linux 说明

当前 Windows 工程使用 `ECanVci64.dll` 动态加载广成科技 CAN 适配器。
Ubuntu 22.04 不能使用这个 DLL，因此电动夹爪控制需要二选一：

1. 使用厂商提供的 Linux SDK

   把厂商 Linux 版 `.so`、头文件、示例代码放到本目录，然后把 `include/ECanVciWrapper.hpp` 改成 Linux 动态库加载或直接链接方式。

2. 使用 SocketCAN

   如果 CAN 适配器在 Ubuntu 上能识别成 `can0`，建议改成 SocketCAN：

   ```bash
   sudo ip link set can0 type can bitrate 1000000
   sudo ip link set can0 up
   candump can0
   ```

   然后把 `ElectricGripper` 底层收发帧从 ECanVciWrapper 替换为 Linux CAN socket。

推荐优先确认硬件在 Ubuntu 上能否出现 `can0`。如果可以，SocketCAN 会比移植 Windows DLL 风格的接口更稳定，也更适合后续维护。
