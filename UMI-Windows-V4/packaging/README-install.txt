UMI 数据采集平台 - 使用说明

1. 双击桌面的“UMI 数据采集平台”即可启动。
2. 默认安装目录为 D:\UMIDataCapturePlatform；安装器不允许选择 C 盘，没有 D 盘时请选择其他非 C 盘。
3. 程序启动后会自动打开 Edge，也可以手动访问 http://127.0.0.1:8080/。
4. 关闭程序时，在任务管理器中结束 ManualGripper.exe，或重启电脑。
5. 原始数据默认保存在安装目录的 data_capture 文件夹。
6. 转换结果默认保存在安装目录的 data_converted 文件夹。
7. 首次启动会等待 Windows 完成设备驱动初始化，最多等待 5 分钟。
8. 如果后台没有正常启动，程序会自动打开安装目录中的 startup.log，请把最后一段错误信息发给开发者。

安装程序已经内置并自动注册以下运行库和驱动：

- 海康 MVS x64 SDK Runtime 与 USB3 Vision 驱动。
- Orbbec SDK x64 Runtime（Gemini 305 使用 Windows UVC/WinUSB）。
- GCAN USB-CAN 与 CAN-FD 驱动。
- CH341 串口驱动；UMI USB CDC 使用 Windows 自带驱动。

首次安装会请求一次管理员权限，用于把签名驱动注册到 Windows 驱动仓库。安装结束后无需再手动配置开发环境或 SDK。

测试相机后请关闭 MVS、Orbbec Viewer 等工具，避免它们独占相机。
