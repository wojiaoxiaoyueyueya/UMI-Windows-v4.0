UMI 数据采集平台 - 使用说明

1. 双击桌面的“UMI 数据采集平台”即可启动。
2. 程序启动后会自动打开浏览器，也可以手动访问 http://localhost:8080。
3. 关闭程序时，在任务管理器中结束 ManualGripper.exe，或重启电脑。
4. 原始数据默认保存在安装目录的 data_capture 文件夹。
5. 转换结果默认保存在安装目录的 data_converted 文件夹。

首次连接硬件前仍需完成系统驱动安装：

- 海康工业相机：安装海康 MVS 和 USB3 Vision 驱动。
- Orbbec Gemini 305：安装 Orbbec Viewer/SDK 运行时。
- GCAN 设备：安装对应 USBCAN 驱动。
- UMI/ESP32 串口设备：Windows 能自动识别 COM 口时无需另装驱动；否则安装设备对应的 USB 串口驱动。

测试相机后请关闭 MVS、Orbbec Viewer 等工具，避免它们独占相机。
