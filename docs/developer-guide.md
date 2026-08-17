# 开发者使用与维护手册

本文档面向需要编译、调试、扩展或维护 UMI Windows 数据采集平台的开发者。普通用户部署和页面操作请先阅读项目根目录的 `README.md`；迁移新电脑可同时参考 `docs/deployment.md`。

## 1. 项目概览

项目是一个 Windows 本地机器人数据采集系统，后端使用 C++14，前端使用原生 HTML、CSS、JavaScript。程序启动后在本机提供 HTTP、REST 和 MJPEG 服务，默认地址为：

```text
http://localhost:8080
```

当前主要硬件：

| 类型 | 设备或协议 | 接入方式 |
| --- | --- | --- |
| 工业相机 | 海康 MVS，相机型号包含 MV-CB013-A0UC-S | 海康 MVS SDK、USB3 Vision |
| 深度相机 | Orbbec Gemini 305 | Orbbec SDK v2 |
| 手势相机 | IMX335 UVC 相机 | 浏览器 MediaDevices API |
| 手动夹爪 | UMI 主控板 V4.0 协议 | USB CDC 串口，AA55 帧和 CRC16-Modbus |
| 电动夹爪 | CAN 电动夹爪 | GCAN USBCAN 或 ESP32-S3 CAN 串口桥 |

当前主分支为 `master`，远程仓库为：

```text
https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0.git
```

## 2. 开发环境

推荐环境：

```text
Windows 10/11 x64
MSYS2 MINGW64，默认安装到 C:\msys64
MinGW-w64 GCC
CMake + MinGW Makefiles
OpenCV
Eigen3
Python 3
Edge 或 Chrome
```

在 MSYS2 MINGW64 中安装编译依赖：

```bash
pacman -Syu
pacman -S --needed \
  mingw-w64-x86_64-gcc \
  mingw-w64-x86_64-cmake \
  mingw-w64-x86_64-make \
  mingw-w64-x86_64-opencv \
  mingw-w64-x86_64-eigen3 \
  mingw-w64-x86_64-python
```

安装数据转换依赖：

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

硬件厂商驱动仍需在开发机安装。仓库中的 SDK 头文件和 DLL 不能替代 Windows 设备驱动：

- 海康相机安装 MVS 客户端，并使用 `Driver Installation Tool` 安装 USB3 Vision 驱动。仓库里的 SDK 头文件、导入库和 DLL 不能替代系统设备驱动。
- Orbbec 安装 Viewer、SDK 或对应驱动。
- UMI 手动夹爪安装主控板对应的 USB CDC/串口驱动。
- GCAN 方式安装 USBCAN 驱动。
- ESP32-CAN 方式安装板载 USB-UART 芯片驱动。

## 3. 获取代码与完整性检查

```powershell
git clone https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0.git ManualGripper
cd ManualGripper
git status
```

以下文件和目录必须存在：

```text
CMakeLists.txt
config.json
requirements.txt
frontend/
include/
src/
tools/
lib/hikvision/
lib/orbbec/
lib/gcan/
```

剪刀石头布需要离线 MediaPipe 资源。发布代码前确认下列目录已被 Git 跟踪，而不只是存在于本机：

```powershell
git ls-files frontend/lib/mediapipe
```

应至少包含 `hands.js`、`hands.binarypb`、手部模型、资源加载器和 WASM 文件。若命令没有输出，手势识别资源尚未提交。

## 4. 编译

### 4.1 PowerShell

```powershell
cd C:\Robot\ManualGripper
$env:PATH = "C:\msys64\mingw64\bin;C:\msys64\usr\bin;" + $env:PATH
cmake -S . -B build -G "MinGW Makefiles"
cmake --build build --config Release -j 4
```

### 4.2 MSYS2 MINGW64

```bash
cd /c/Robot/ManualGripper
cmake -S . -B build -G "MinGW Makefiles"
cmake --build build -j 4
```

成功后生成：

```text
build/ManualGripper.exe
```

CMake 会复制直接依赖的海康、Orbbec、GCAN 和 MinGW DLL。若运行时仍提示缺少 DLL，执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\collect_dlls.ps1 -BuildDir .\build
```

### 4.3 常见编译错误

`cc1plus.exe` 没有输出具体错误、构建直接返回 `Error 1`：

```powershell
$env:PATH = "C:\msys64\mingw64\bin;C:\msys64\usr\bin;" + $env:PATH
```

这是 MinGW 编译器找不到自身运行 DLL 时的常见现象。

`ManualGripper.exe: Permission denied`：程序仍在运行并锁定了输出文件。先正常关闭服务，再重新编译。

`OpenCVConfig.cmake` 找不到：确认安装的是 `mingw-w64-x86_64-opencv`，并检查 `C:\msys64\mingw64\lib\cmake\opencv4`。

海康或 Orbbec SDK 未找到时，CMake 会关闭对应相机支持继续编译。开发相关功能前必须检查配置阶段输出，不能只看最终是否生成 EXE。

## 5. 运行与开发循环

```powershell
.\build\ManualGripper.exe
```

常用入口：

```text
http://localhost:8080/index.html      数据看板
http://localhost:8080/index_old.html  采集与控制台
http://localhost:8080/info.html       项目说明
```

配置文件按可执行文件位置解析：

```text
build/ManualGripper.exe
config.json
frontend/
tools/
```

也就是说，程序从 `build/../config.json` 读取配置，从 `build/../frontend` 提供页面。修改 C++ 后必须重新编译并重启；修改 `frontend/` 后通常只需强制刷新浏览器。

停止服务优先在终端按一次 `Ctrl+C`，等待相机、串口和录制线程释放完成。不要直接重复启动多个实例，否则海康相机和 COM 口会被前一个进程占用。

## 6. 目录职责

```text
ManualGripper/
├─ CMakeLists.txt                 构建入口
├─ config.json                    可移植默认配置
├─ frontend/                      无前端构建步骤的静态页面
├─ include/                       C++ 接口和状态结构
├─ src/                           C++ 后端实现
│  ├─ main.cpp                    生命周期、线程和设备激活
│  ├─ DeviceManager.cpp           枚举、验证、槽位分配和热插拔
│  ├─ HikCamera.cpp               海康取流和像素转换
│  ├─ OrbbecCamera.cpp            彩色、深度、红外和点云
│  ├─ UmiGripper.cpp              UMI V4.0 串口协议
│  ├─ ElectricGripper.cpp         GCAN 与 ESP32-CAN 控制
│  └─ http/
│     ├─ HttpServer.cpp           实时状态与图像编码
│     ├─ HttpServerRoutes.cpp     HTTP 路由
│     └─ HttpServerRecording.cpp  录制、收尾、时间戳和转换
├─ tools/                         Python 数据转换脚本
├─ lib/                           厂商 SDK 和运行库
├─ docs/                          开发、部署与结构文档
├─ data_capture/                  原始会话，不提交
├─ data_converted/                转换结果，不提交
└─ build/                         构建产物，不提交
```

详细文件职责参见 `docs/code-structure.md`。

## 7. 运行架构

核心数据流：

```text
硬件设备
  -> HikCamera / OrbbecCamera / UmiGripper / ElectricGripper
  -> DeviceManager 检测、协议验证和槽位分配
  -> main.cpp 启动采集回调与轮询线程
  -> HttpServer 实时状态、MJPEG 编码和录制队列
  -> Web 页面预览与控制
  -> data_capture 原始会话
  -> tools 转换为 LeRobot、HDF5 或 RLDS
```

主要并发任务包括：

- HTTP 服务线程。
- MJPEG 编码线程。
- 海康相机读取线程。
- Orbbec SDK 回调和点云处理。
- 手动、电动夹爪状态轮询。
- 设备热插拔检查。
- 录制异步收尾和格式转换。

开发时不要在相机回调、串口读取或设备扫描锁内执行耗时文件操作。页面编码、数据录制和设备通信应保持现有职责边界。

## 8. 设备与槽位

相机槽位：

```text
left
right
head
```

夹爪槽位：

```text
left
right
extra
```

设备列表表示系统枚举到了硬件；槽位表示硬件已经通过协议验证并可供业务使用。右上角能看到设备但页面没有控制项时，应从 `DeviceManager` 的协议验证和槽位分配检查，不能只修改前端显示。

摄像头左右交换与手动夹爪左右交换是两套独立映射。录制必须使用交换后的逻辑槽位，避免页面显示为左侧、文件却写入右侧目录。

两个 UMI 主控板 VID 相同时，程序可按检测顺序分配到左右槽；用户仍可在夹爪控制页手动交换。电动夹爪通常在两个手动夹爪在线时进入 `extra` 槽。

## 9. 配置文件

`config.json` 应保留可移植的相对路径和保守硬件参数，不要提交个人桌面绝对路径。

| 配置 | 含义 |
| --- | --- |
| `server.port` | HTTP 服务端口，默认 8080 |
| `paths.frontendDir` | 前端静态文件目录 |
| `paths.dataDir` | 原始数据目录 |
| `paths.convertOutputDir` | 转换结果目录 |
| `paths.convertScript` | 默认转换脚本 |
| `camera.fisheyeK1/K2/Scale` | 海康鱼眼校正参数 |
| `camera.brightness/contrast` | 软件图像调整 |
| `camera.exposureAuto/exposureTime/exposureUpper` | 曝光控制 |
| `camera.gainAuto/gain` | 增益控制 |
| `camera.gammaEnable/gamma` | Gamma 控制 |
| `camera.sharpness` | 锐度 |
| `camera.balanceWhiteAuto` | 自动白平衡 |
| `camera.maxWidth/maxHeight/fps` | 海康采集分辨率和帧率 |
| `stream.encodeIntervalMs` | JPEG 编码检查间隔 |
| `stream.streamIntervalMs` | MJPEG 发送间隔 |
| `stream.jpegQuality` | 预览 JPEG 质量 |
| `stream.streamMaxWidth` | 预览缩放最大宽度 |
| `stream.frameSkipMs` | 页面发布帧间隔 |
| `slam.enabled/depthScale` | SLAM 开关和深度比例 |

修改配置后需要重启服务。相机控制页面通过 API 实时修改的参数只影响当前运行状态，是否持久化应由配置保存逻辑明确处理，不能默认认为已写入 `config.json`。

## 10. HTTP 接口

主要接口定义集中在 `src/http/HttpServerRoutes.cpp`。

| 接口 | 用途 |
| --- | --- |
| `GET /api/devices` | 设备列表和槽位状态 |
| `POST /api/scan` | 重新扫描设备 |
| `GET/POST /api/control` | 打开或关闭数据流 |
| `GET /stream/:slot/:type` | MJPEG 视频流 |
| `GET /api/fps` | 采集和预览帧率 |
| `GET /api/camera-controls` | 读取全部相机槽位参数 |
| `POST /api/camera-controls/:slot` | 将参数应用到指定相机槽位 |
| `GET /api/gripper/:slot` | 手动夹爪实时状态 |
| `POST /api/gripper/:slot/control` | 手动夹爪控制指令 |
| `GET /api/electric-gripper/:slot` | 电动夹爪状态 |
| `POST /api/electric-gripper/:slot/control` | 电动夹爪控制 |
| `GET/POST /api/record` | 录制状态、开始和停止 |
| `GET /api/record/save_status` | 异步保存进度 |
| `POST /api/record/cancel_save` | 取消并清理保存任务 |
| `GET /api/record/history` | 历史会话 |
| `POST /api/data/delete` | 删除指定会话 |
| `POST /api/convert` | 启动数据转换 |
| `GET /api/convert/progress` | 转换进度 |

修改 API 时同步检查 `frontend/script.js`、`frontend/dashboard.js` 和说明文档。删除数据、浏览路径等接口必须继续使用后端路径边界校验，不能仅依赖前端隐藏按钮。

## 11. 数据与时间戳

原始数据默认保存到 `data_capture/<会话时间>/`。每个流至少包含数据文件和时间戳文件，会话根目录包含 `metadata.json`。

维护录制逻辑时遵守以下规则：

1. 时间戳在数据进入采集层时生成，不要在异步保存结束时补造时间。
2. 同一会话使用统一时钟基准和微秒单位。
3. 页面时长、视频时间轴、CSV 时间戳和 metadata 应来自同一会话起点。
4. 保存阶段可以异步排队，但不能改变原始采集时间戳。
5. 新增字段后同步修改 metadata、CSV 表头、转换脚本和说明页面。
6. 左右设备交换后，文件目录、CSV `slot` 字段和页面映射必须一致。

修改录制代码后至少录制 10 秒测试数据，检查：

- 页面显示时长。
- MP4 实际时长。
- 首帧和末帧时间戳。
- 多相机、夹爪 CSV 的起止时间。
- 停止录制后的异步保存状态。
- 取消保存后会话目录是否被完整删除。

## 12. 新增设备类型

### 12.1 新增相机

1. 实现 `ICamera` 接口。
2. 把 SDK 资源放入独立的 `lib/<vendor>/` 目录。
3. 在 CMake 中做可选依赖检测，缺少 SDK 时允许其他功能继续编译。
4. 在 `DeviceManager` 增加枚举、唯一标识和槽位分配。
5. 在 `main.cpp` 注册彩色、深度、红外或点云回调。
6. 在 HTTP 状态和前端开关中声明实际支持的流。
7. 补充录制格式、时间戳和转换脚本测试。

### 12.2 新增夹爪

1. 实现 `IGripper` 接口。
2. 先完成设备级握手或回包验证，再标记为已连接。
3. 不要只根据 COM 号或通用 USB-UART VID 判断设备类型。
4. 在 `DeviceManager` 中处理槽位和热插拔生命周期。
5. 为控制量添加内部安全上限，前端限制不能代替后端限制。
6. 将全部原始状态加入录制格式，并同步转换脚本。

## 13. 调试方法

### 13.1 相机

先用厂商工具单独验证，再运行本项目：

- 海康使用 MVS 客户端。
- Orbbec 使用 Orbbec Viewer。
- IMX335 使用 Windows 相机或浏览器设备测试。

海康支持分为三个独立层次：

1. `MvCameraControl.h` 和 `MvCameraControl.lib`：编译期依赖。
2. `MvCameraControl.dll` 及其依赖：程序运行库。
3. MVS USB3 Vision/GigE 驱动：Windows 识别并向 SDK 暴露相机所必需的系统驱动。

仓库已经包含前两类文件，但第三类驱动必须在每台电脑单独安装。USB 相机建议按以下顺序检查：

1. 打开 MVS 安装目录中的 `Driver_Installation_Tool.exe`，安装 USB3 Vision 驱动。
2. 在设备管理器中确认相机位于 `USB3 Vision Cameras`，没有黄色感叹号，也没有挂到第三方 USB3 Vision 驱动。
3. 在 MVS 客户端中确认相机能够枚举和取流。
4. 关闭 MVS 客户端，再启动 `ManualGripper.exe`，避免独占打开冲突。
5. 检查启动日志中的 `[海康诊断]`：
   - `编译时未找到海康 SDK`：检查 CMake 输出和仓库 SDK 文件。
   - `SDK 已加载但未枚举到相机`：检查系统驱动、USB 链路和设备管理器。
   - 已检测但打开失败：检查设备是否被 MVS 或另一个程序占用。

海康日志中的“输入 fps”是 SDK 实际交给程序的帧率，“处理 fps”是程序消费帧率，“队列丢帧”是应用层来不及处理，“USB 错误”是驱动或传输层错误。

若输入 fps 已经很低且 USB 错误持续增加，优先检查相机、线缆、USB 端口、扩展坞、电源和主控制器带宽；增加应用缓存不能补回 SDK 没收到的帧。

多路 USB3 相机尽量分散到不同主控端口，避免多个高带宽设备和串口设备集中在同一扩展坞。

### 13.2 串口夹爪

出现“检测到 COM 口但没有槽位”时依次检查：

1. 是否有另一个服务或串口工具占用端口。
2. 同一物理设备是否枚举出多个 CDC/调试端口。
3. USB VID 是否为手动夹爪标识。
4. V4.0 握手是否收到有效 AA55 帧。
5. 数据长度、CRC16 大端顺序和帧尾 `0x0D` 是否正确。
6. 两个同侧 VID 设备是否按顺序分配并需要手动交换。

### 13.3 电动夹爪

GCAN 和 ESP32-CAN 都必须收到电机真实反馈后才能判断在线。串口桥只打印 `can_transceiver` 或成功发送 CAN 帧，不代表电机已经连接。

调试先使用小行程、低速度和低电流。电流环后端限制必须保留，发生异常立即停止或急停。

### 13.4 Web 页面

使用浏览器开发者工具检查：

- Console 是否有 JavaScript 异常。
- Network 中 REST 请求的状态码和响应体。
- MJPEG 请求是否保持连接。
- 浏览器是否允许 IMX335 摄像头权限。
- `frontend/lib/mediapipe/` 是否返回 200。

## 14. 回归测试清单

每次涉及设备、录制、线程或 UI 联动的修改，至少完成：

1. 不连接硬件时服务能启动，页面能打开。
2. 单台海康、单台 Orbbec 分别能显示。
3. 两台海康加一台 Orbbec 同时运行。
4. 两个 UMI 手动夹爪均有位置、按键和 IMU 数据。
5. GCAN 或 ESP32-CAN 能验证电机反馈并控制小行程。
6. 中途拔插每类设备，重新扫描后能恢复槽位和数据。
7. 相机左右交换、手动夹爪左右交换互不影响。
8. 录制、停止、异步保存、取消、历史删除均正常。
9. 视频时长与统一时间戳一致。
10. LeRobot、HDF5、RLDS 至少执行目标格式的最小转换测试。
11. Edge/Chrome 页面无明显遮挡、控制台异常或资源 404。

没有连接对应硬件时，应在提交说明中明确写出未覆盖的实机测试项。

## 15. Git 提交流程

提交前：

```powershell
git status
git diff --check
git diff --stat
$env:PATH = "C:\msys64\mingw64\bin;C:\msys64\usr\bin;" + $env:PATH
cmake --build build --config Release -j 4
```

确认不要提交：

```text
build/
data_capture/
data_converted/
*.log
crash.log
本机绝对路径
API 密钥或账号凭据
```

按实际改动显式添加文件：

```powershell
git add README.md docs frontend include src tools config.json CMakeLists.txt requirements.txt
git status
git commit -m "Describe the completed change"
git pull --rebase origin master
git push origin master
```

不要为了让工作区变干净而删除或回滚不了解的修改。多人协作时先查看差异和最近提交，再解决冲突。

## 16. 安全与已知限制

- 当前版本以 Windows 10/11 x64 为目标，串口、GCAN 和部分文件系统逻辑不能直接用于 Linux。
- HTTP 服务当前监听 `0.0.0.0`，同一局域网可能访问。不要直接暴露到公网，必要时使用 Windows 防火墙限制端口。
- 当前没有用户登录和权限系统，删除会话和控制夹爪接口默认信任本机操作者。
- `config.json` 使用轻量解析逻辑，新增嵌套配置时应先评估是否改为正式 JSON 解析库。
- 前端是原生单页脚本，新增模块时优先拆分明确状态和渲染函数，避免继续扩大共享全局状态。
- 工业相机和夹爪问题必须区分枚举、协议握手、槽位分配、应用处理和物理传输五个层次，不要用前端显示结果代替底层验证。

## 17. 交付给下一位开发者

交接时至少提供：

1. 当前 Git 提交哈希和分支。
2. 已连接设备型号、序列号、COM 口和物理拓扑。
3. `config.json` 中使用的分辨率、帧率和相机参数。
4. 最近一次成功编译命令。
5. 已完成和未完成的实机测试。
6. 一份可复现问题的终端日志和操作顺序。
7. 不包含采集数据、账号凭据和个人绝对路径的干净代码仓库。
