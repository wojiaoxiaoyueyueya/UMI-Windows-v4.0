# UMI Windows V4 完整使用与部署手册

本文面向第一次接触本项目的使用者，也适用于需要换电脑部署、配置设备、录制数据、转换格式和排查故障的开发者。当前对应版本为 `4.3.1`。

## 1. 使用前确认

### 1.1 推荐电脑

| 项目 | 建议配置 |
| --- | --- |
| 系统 | Windows 10 / Windows 11 64 位 |
| CPU | Intel Core i5 / AMD Ryzen 5 或更高 |
| 内存 | 16 GB 或更高 |
| 存储 | SSD，按录制时长预留数据空间 |
| USB | USB 3.0；多相机尽量分散到不同根集线器 |
| 浏览器 | Microsoft Edge |

三个相机不要全部接到同一个无源 HUB。推荐 Orbbec 直连电脑，两个海康相机分散到电脑不同侧的 USB 3.0 接口或两个独立供电 HUB；手动夹爪可接低带宽 USB 口。

### 1.2 支持硬件

| 设备 | 接入方式 | 数据或功能 |
| --- | --- | --- |
| UMI V4.0 手动夹爪 | USB CDC 串口 | 闭合度、原始编码、双按键、六轴 IMU、力数据、LED、射频参数 |
| 海康工业相机 | 海康 MVS SDK / USB3 驱动 | RGB 视频、曝光、增益、白平衡、Gamma、锐度、降噪 |
| Orbbec Gemini 305 | Orbbec SDK | RGB、深度、左红外、右红外、点云 |
| IMX335/UVC 相机 | 浏览器摄像头接口 | 剪刀石头布手势识别 |
| CAN 电动夹爪 | GCAN 或 ESP32-S3 CAN 桥 | 位置、速度、电流、温度、错误码和控制 |

## 2. 普通用户一键安装

1. 打开 [GitHub Releases](https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0/releases/latest)。
2. 下载 `UMI-Data-Capture-Platform-4.3.1-Setup.exe`。
3. 右键安装包，选择“以管理员身份运行”。
4. 保持默认目录 `D:\UMIDataCapturePlatform`，或选择其他非 C 盘目录。
5. 允许安装程序注册海康、GCAN 和 CH341 驱动；Windows 如要求重启，请完成重启。
6. 插入设备，双击桌面的 `UMI Data Capture Platform`。
7. 启动器等待后台就绪后会使用 Edge 打开 `http://127.0.0.1:8080/`。

安装包已经包含后台程序、前端页面、Python 转换环境、SDK 运行库和驱动文件，不要求普通用户安装 CMake、MSYS2、Python 或 Node.js。硬件驱动仍必须在 Windows 中注册，安装程序会自动处理；被安全软件阻止时需要手动允许。

### 2.1 后续启动与退出

- 每次使用时双击桌面的 `UMI 数据采集平台`。启动器会复用健康后台，并自动清理同名但无响应的旧后台。
- 正常关闭最后一个平台页面后，后台约 3 秒内依次释放海康、奥比中光、手动夹爪、电动夹爪和 8080 端口，然后进程退出。
- 浏览器崩溃或电脑休眠导致页面来不及通知后台时，后台会在约 120 秒无客户端心跳后自动退出。
- 需要立即结束时，双击桌面的 `退出 UMI 数据采集平台`。它优先请求安全退出，超时后才清理残留 `ManualGripper.exe`。
- 退出完成后，任务管理器中不应再存在 `ManualGripper.exe`；下次启动会重新扫描并打开设备。
- 不要只关闭终端窗口后立即拔插设备。若页面或终端异常结束，先运行退出快捷方式，再重新连接设备。

## 3. 源码拉取与开发环境

### 3.1 拉取总仓库

```powershell
git clone https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0.git UMI-Data-Capture-System
cd UMI-Data-Capture-System\UMI-Windows-V4
```

不要在仓库总目录直接运行 CMake。当前 V4 的 `CMakeLists.txt` 位于 `UMI-Windows-V4` 内。

### 3.2 安装 MSYS2 依赖

安装 MSYS2 到 `C:\msys64`，打开 MSYS2 MINGW64 终端并执行：

```bash
pacman -Syu
pacman -S --needed mingw-w64-x86_64-gcc mingw-w64-x86_64-cmake \
  mingw-w64-x86_64-ninja mingw-w64-x86_64-opencv \
  mingw-w64-x86_64-eigen3 mingw-w64-x86_64-python
```

### 3.3 编译

PowerShell：

```powershell
$env:PATH = "C:\msys64\mingw64\bin;C:\msys64\usr\bin;" + $env:PATH
cmake -S . -B build -G Ninja
cmake --build build -j 4
```

编译成功后生成：

```text
build/ManualGripper.exe
```

运行：

```powershell
.\build\ManualGripper.exe
```

开发环境转换依赖：

```powershell
python -m pip install -r requirements.txt
```

## 4. 页面与功能

| 页面 | 地址 | 用途 |
| --- | --- | --- |
| 采集控制台 | `/` 或 `/index.html` | 设备监控、采集、转换和控制主入口 |
| 数据看板 | `/dashboard.html` | 历史会话、转换结果、统计和删除 |
| 项目说明 | `/info.html` | 当前版本、能力和更新说明 |

采集控制台包含以下标签页：

1. **夹爪监控**：相机预览开关、手动夹爪闭合度和按钮状态。
2. **数据采集**：选择采集项、保存路径、任务名称、保存模式并开始/停止录制。
3. **数据转换**：将完整会话转换为 LeRobot、HDF5 或 RLDS。
4. **相机控制**：选择相机并调整 SDK 支持的曝光、增益、白平衡等参数。
5. **夹爪控制**：查看 UMI V4.0 实时数据、LED、参数、标定补偿和左右夹爪交换。
6. **电动夹爪控制**：位置、速度、电流、MIT、使能、停止和回零控制。
7. **剪刀石头布**：浏览器手势识别并联动电动夹爪。
8. **夹爪遥控**：将选定手动夹爪的闭合度映射到电动夹爪 `0°~4500°` 行程。
9. **空间位姿**：融合左右手鱼眼画面和 V4 IMU，显示相对三维位姿、运动轨迹和夹爪闭合动画。

## 5. 第一次连接设备

1. 先关闭 MVS、Orbbec Viewer、Windows 相机和其他可能占用设备的软件。
2. 插入相机、手动夹爪和 CAN 设备，并确认供电和线缆。
3. 启动平台，打开右上角设备信息。
4. 确认检测数量、设备型号、序列号和连接状态。
5. 若设备是在服务启动后插入，点击“重新扫描设备”一次。
6. 打开对应相机流和夹爪开关，确认实时数据后再录制。

程序启动时按“相机、手动夹爪、电动夹爪”的顺序进行首轮扫描。运行期间不会无休止地反复打开同一设备；新增或重新插入设备时由用户触发重新扫描。

### 5.1 双手动夹爪

- USB VID 为左右手时按固件标识分配。
- 两只设备被固件标成同一侧时，程序会按检测顺序占用两个槽位。
- 实际物理左右相反时，在“夹爪控制”页面使用“交换左右夹爪”。
- 页面交换结果会同步到监控、录制和保存目录，不会只交换画面显示。

### 5.2 电动夹爪

- `0°` 为最大打开，`4500°` 为最小闭合。
- GCAN 和 ESP32-CAN 都必须收到电机真实回包后才显示在线。
- 位置控制速度单位为 rpm，电流限制默认 `1.2 A`，页面允许按协议范围调整。
- 纯速度控制保持保守范围 `-500~500 rpm`。
- 电流环默认 `0.2 A`，内部限制为 `±0.4 A`。
- 第一次测试请使用小行程、低速度和低电流，异常时立即停止或急停。

## 6. 相机控制和 USB 带宽

相机控制页修改的是当前相机采集参数，后续录制会保存调整后的实际图像。海康使用 MVS SDK；没有厂商 SDK 的 UVC 相机使用浏览器或 OpenCV 能提供的通用控制能力。

多相机卡顿时按顺序检查：

1. 将 Orbbec 与海康分散到不同 USB 根集线器。
2. 避免同时运行 MVS、Orbbec Viewer 或其他预览软件。
3. 降低多相机帧率或预览分辨率，不先降低原始录制质量。
4. 使用带独立供电的 USB 3.0 HUB。
5. 在终端查看 USB 错误、输入帧率和 SDK 接收帧数。

### 6.1 空间位姿

“空间位姿”页为左右手分别建立独立起点。左手手动夹爪未连接时不显示左手模型，右手同理；对应鱼眼相机未接入时仍可显示 IMU 姿态，但不会产生可靠的视觉平移轨迹。

连接设备或点击“重置原点”后，请把夹爪静放约 1 秒。系统会分别学习两只 V4 IMU 的残余陀螺仪零偏，并把当时方向设为相对零姿态；未完成这一步前不要立即拿起夹爪。后续只有视觉和 IMU 同时确认静止时才缓慢补偿温漂，不会把正常的缓慢转动当成零偏。

跟踪器使用以下输入：

- V4 连续上报中的三轴陀螺仪和三轴加速度计，按固件的 `±250 dps`、`±2 g` 配置换算。
- 对应手部相机的实际采集帧，使用角点、金字塔光流、本质矩阵和 IMU 位移约束估计相对运动。
- 手动夹爪归一化闭合度，用于同步驱动三维夹爪模型。

页面提供轨迹长度、`1×~8×` 轨迹显示倍率、网格、模型显示、适配视图和重置原点控制。鼠标左键旋转、滚轮缩放、右键平移；“适配视图”按当前模型和完整轨迹范围重新取景。显示倍率只放大页面中的运动幅度，不改变下方米制读数，也不改变录制文件。交换左右摄像头或左右手动夹爪后，页面与后端跟踪映射会同步更新。无硬件开发机可打开 `http://localhost:8080/?poseDemo=1` 检查模型、轨迹和闭合动画。

模型闭合动画会根据实时归一化闭合度同步移动左右夹指，并把传感器两端的 2% 死区吸附到完全张开或完全闭合位置，用于直观显示夹爪状态；它是展示动画，不代替精确连杆运动学或机械干涉分析。

每只手在自身 IMU 和画面确认静止后会独立执行零速度约束。两只手、两路 IMU 和对应相机都在线且同时静止时，系统还会启用双手协同判定，进一步清除累计微小位移；任意一只手开始运动后约束立即解除。该算法不会固定两手距离，也不会把一只手的运动强行复制给另一只手。

当前输出是相对于本次连接或重置时刻的估算位姿。系统会保存重置时的画面特征；夹爪拿起后回到相近位置、方向和视野并保持静止时，会尝试把位置重定位为原点。单目视觉仍没有天然绝对尺度，两只手也不是经过外部标定的同一个世界坐标系；原点重定位失败时可手动点击“重置原点”。需要厘米级绝对定位时，还必须完成鱼眼内参、相机与 IMU 外参、硬件时间同步和外部基准标定。

## 7. 录制流程

1. 在“数据采集”选择保存目录。安装版建议使用 D 盘或其他数据盘。
2. 填写可理解的任务描述；训练数据会使用该文本建立任务元数据。
3. 勾选需要的相机流、点云和夹爪数据。
4. 选择保存模式。
5. 点击“开始录制”，也可使用连接后的手动夹爪上键开始。
6. 完成动作后点击“停止录制”，也可使用下键停止。
7. 保存任务进入后台队列后可以继续下一次录制。
8. 在历史会话确认持续时间、帧数、文件和状态。

保存模式：

| 模式 | 特点 | 适用场景 |
| --- | --- | --- |
| 严格同步 | 视频时长优先与页面会话时长对齐，停止后后台统一保存 | 正式采集和训练数据 |
| 快速保存 | 录制时实时写 MP4，停止更快；播放器显示时长可能有轻微偏差，CSV 时间戳仍准确 | 快速预览和调试 |

## 8. 原始数据目录和字段

默认目录：

```text
data_capture/<YYYYMMDD_HHMMSS>/
├─ Head-umi/
├─ Left-umi/
├─ Right-umi/
└─ metadata.json
```

每个槽位按实际选项生成：

```text
<slot>/
├─ color_video/color.mp4
├─ color_video/timestamps.csv
├─ depth_video/depth.mp4
├─ ir-left_video/ir-left.mp4
├─ ir-right_video/ir-right.mp4
├─ pointcloud_data/
├─ gripper_data/gripper.csv
├─ pose_data/trajectory.csv
└─ action_data/actions.csv       # 训练动作日志，需要控制桥写入
```

视频 `timestamps.csv` 使用逐帧时间戳，优先包含同一会话基准下的 `session_time_us`。手动夹爪 CSV 保存：

- `timestamp_us`、`session_time_us`、槽位和协议版本。
- 归一化闭合度、按钮、payload 长度、设备标识和磁编码原始数据。
- XYZ 三轴加速度、XYZ 三轴角速度。
- 力传感数量、峰值和最多 12 路原始力数据。
- 射频地址/频段、LED RGB/亮度和最近 V4 指令。

电动夹爪 CSV 保存位置、速度、电流、电机温度、MOS 温度、错误码和使能状态。`metadata.json` 保存会话起止时间、时长、槽位映射、设备信息、流文件、帧数和告警。

选择对应的 `left-gripper` 或 `right-gripper` 采集项时，`pose_data/trajectory.csv` 会同步保存：

- `timestamp_us`、`session_time_us` 和 `side`。
- 米制相对位置 `x_m/y_m/z_m`。
- 四元数 `qx/qy/qz/qw` 和欧拉角 `roll_deg/pitch_deg/yaw_deg`。
- `closure`、`tracking_mode`、`visual_features`、`quality`、`stationary`、`origin_relocalized` 和 `cooperative_constraint`。

位姿轨迹属于观测数据，不等同于机器人实际控制动作。

## 9. 数据转换与训练就绪

### 9.1 LeRobot

LeRobot 是当前唯一会执行“训练就绪”严格校验的输出。每个待转换槽位必须提供：

```text
<slot>/action_data/actions.csv
```

最低字段：

```csv
session_time_us,action_0,action_1,...,action_N
0,0.1,0.2,...
33333,0.11,0.21,...
```

也可使用绝对 `timestamp_us`。动作列必须从 `action_0` 连续编号，数值有限、时间单调，且动作不能全程恒定。动作应为真正发送给控制器、经过限幅和滤波后的命令，不得使用全零占位或观测值冒充动作。

转换器会输出 Parquet、视频、任务表、episode 元数据、真实统计量和训练就绪标记。多槽位会话不能拆成互不关联的数据集冒充统一机器人 episode。

### 9.2 HDF5 和 RLDS

当前 HDF5、RLDS 用于观察数据归档和下游自定义处理，输出会明确标记 `trainingReady=false`。在未接入真实机器人 state/action 契约前，不应直接用于行为克隆或策略训练。

详细要求见 [training-data-contract.md](training-data-contract.md)。

## 10. `config.json` 配置

常用配置：

```json
{
  "server": { "port": 8080 },
  "paths": {
    "frontendDir": "frontend",
    "dataDir": "data_capture",
    "convertOutputDir": "data_converted",
    "convertScript": "tools/convert_to_lerobot.py"
  },
  "camera": {
    "fisheyeK1": -1.0,
    "fisheyeK2": 0.4,
    "fisheyeScale": 1.7,
    "exposureTime": 15000,
    "gain": 3,
    "maxWidth": 1280,
    "maxHeight": 720,
    "fps": 30,
    "multiCameraFps": 15
  },
  "stream": {
    "streamIntervalMs": 33,
    "jpegQuality": 95,
    "streamMaxWidth": 640
  }
}
```

| 配置 | 含义 |
| --- | --- |
| `server.port` | 本地网页端口 |
| `paths.dataDir` | 原始会话目录，可使用绝对路径 |
| `paths.convertOutputDir` | 转换输出目录 |
| `camera.fisheyeK1/K2/Scale` | 海康鱼眼显示校正参数 |
| `camera.exposureTime/gain` | 海康默认曝光和增益 |
| `camera.fps` | 单相机目标帧率 |
| `camera.multiCameraFps` | 多相机保守目标帧率 |
| `stream.jpegQuality` | 网页预览 JPEG 质量 |
| `stream.streamMaxWidth` | 仅网页预览宽度，不等于原始录制分辨率 |

修改配置后重启后台。页面内相机调整在当前运行周期生效；需要固定为每次启动默认值时，再同步到 `config.json`。

## 11. 常见故障

### 页面显示 `Not Found`

- 确认使用 4.3.1 或更高版本。
- 检查安装目录是否同时存在 `build/ManualGripper.exe`、`frontend/index.html` 和 `config.json`。
- 手动访问 `http://127.0.0.1:8080/`，不要再使用旧地址 `index_old.html`。

### 海康设备检测到但打不开

- 关闭 MVS 和其他占用相机的软件。
- 在任务管理器结束残留的 `ManualGripper.exe`。
- 设备管理器确认海康 USB3 驱动正常。
- 拔插相机后只点击一次重新扫描。
- 错误 `0x80000203` 通常表示设备仍被其他进程独占。

### 手动夹爪 COM 口存在但无数据

- 关闭串口调试助手和旧后台。
- V4 有线 CDC 使用 460800；程序会执行 V4 握手并校验帧。
- 同一设备可能暴露两个串口，程序只会把通过 V4 数据握手的端口分配到槽位。
- 两只夹爪经 HUB 同时上电失败时，先分别插入完成枚举，再启动或重新扫描。

### Orbbec 有设备但黑屏

- 关闭 Orbbec Viewer。
- 将 Gemini 305 直连 USB 3.0。
- 只先开彩色流，再逐项打开深度、红外和点云。
- 多设备切换后若 SDK 资源未释放，停止旧后台并重新启动。

### 保存慢

- 严格同步会在停止后统一编码，耗时与录制长度和流数量有关，但保存任务在后台队列执行。
- 调试时可选快速保存；正式训练数据建议严格同步。
- 数据目录应放在 SSD，避免网络盘和速度较低的 U 盘。

### 历史路径不更新或删除失败

- 修改采集或转换路径后重新加载历史列表。
- 删除只允许发生在当前用户配置的数据根目录内，避免 `forbidden path`。
- 不要手动把单个会话目录移动到根目录之外再从页面删除。

## 12. 打包和发布

开发者生成安装包：

```powershell
$env:PATH = "C:\msys64\mingw64\bin;C:\msys64\usr\bin;" + $env:PATH
cmake -S . -B build -G Ninja
cmake --build build -j 4
powershell -ExecutionPolicy Bypass -File .\packaging\package_windows.ps1
```

版本由根目录 `VERSION` 读取，输出：

```text
dist/UMI-Data-Capture-Platform-4.3.1-Setup.exe
```

安装包超过 100 MB，应上传到 GitHub Release，不要直接提交到 Git 历史。

## 13. 更新代码

```powershell
git status
git add -A
git commit -m "Describe the update"
git pull --rebase origin master
git push origin master
```

`git status` 会比较工作区文件内容、暂存区和最近一次提交，因此能够知道哪些文件被新增、修改或删除。提交前必须确认 `build/`、`data_capture/`、`data_converted/`、日志和本地配置没有被加入。
