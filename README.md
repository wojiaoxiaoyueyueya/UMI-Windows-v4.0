# 机器人数据采集平台

这是一个用于机器人操作数据采集的本地软件系统。项目可以同时管理多路相机、手动夹爪、电动夹爪，支持实时预览、数据录制、历史数据管理，以及 LeRobot、HDF5、RLDS 数据格式转换。

项目运行后会启动一个本地 Web 服务，浏览器打开页面即可操作，不需要额外安装前端环境。

默认访问地址：

```text
http://localhost:8080
```

## 开发者文档入口

- [`docs/developer-guide.md`](docs/developer-guide.md)：开发环境、编译调试、架构、API、设备扩展、回归测试和 Git 提交流程。
- [`docs/code-structure.md`](docs/code-structure.md)：源码目录和核心模块职责。
- [`docs/deployment.md`](docs/deployment.md)：新电脑部署、迁移和运行版打包。

## 1. 项目能做什么

本项目主要用于采集机器人模仿学习、强化学习或数据分析所需的数据。

支持功能：

- 多相机设备检测和实时预览。
- 海康工业相机彩色视频采集。
- Orbbec 奥比中光相机彩色、深度、红外、点云采集。
- UMI 手动夹爪位置、按钮、LED 状态采集。
- 电动夹爪位置、速度、电流、温度、错误码控制和采集，支持 GCAN USBCAN 盒和 ESP32-S3 + CAN 模块串口桥接两种接入方式。
- 支持两个 UMI 手动夹爪加一个 CAN 电动夹爪同时在线，电动夹爪会挂载到额外夹爪槽。
- 数据采集开始、停止、保存、历史记录查看和删除。
- 视频帧、夹爪数据、点云数据统一时间戳记录。
- 原始数据转换为 LeRobot、HDF5、RLDS。
- 剪刀石头布功能：使用 IMX335/UVC 相机识别手势，并联动电动夹爪出拳。
- 夹爪遥控功能：选择一个手动夹爪作为遥控输入，将手动捏合位置实时映射到电动夹爪行程。

## 2. 当前支持的系统

当前主版本支持：

```text
Windows 10 / Windows 11 64 位
```

推荐运行环境：

```text
CPU: i5 / Ryzen 5 及以上
内存: 16 GB 及以上
USB: 推荐 USB 3.0，多个相机尽量直连主机
硬盘: 根据采集数据量准备足够空间，建议 SSD
```

说明：

- 当前工程以 Windows 为主。
- 代码中包含部分 Linux SDK 文件目录，但串口、GCAN、部分设备驱动逻辑仍绑定 Windows。
- 如果后续要做 Linux 版本，建议保留同一套前端和数据格式，单独适配设备驱动层。

## 3. 支持的硬件

| 类型 | 当前使用/支持型号 | 用途 | 接入方式 |
| --- | --- | --- | --- |
| 奥比中光相机 | Orbbec Gemini 305 | 彩色、深度、红外、点云 | Orbbec SDK |
| 海康工业相机 | Hikvision MVS 工业相机 | 彩色视频采集 | 海康 MVS SDK |
| 手动夹爪 | UMI 手动夹爪 | 位置、按钮、LED、录制联动 | USB 串口 |
| 电动夹爪 | CAN 电动夹爪 | 位置、速度、电流、MIT、急停 | GCAN USBCAN 或 ESP32-S3 + CAN 模块 |
| 手势相机 | IMX335 UVC 相机 | 剪刀石头布手势识别 | 浏览器摄像头 API |

夹爪槽位说明：

```text
left  = 左侧手动夹爪槽，主要用于监控、采集和录制联动
right = 右侧手动夹爪槽，主要用于监控、采集和录制联动
extra = 额外夹爪槽，两个手动夹爪都连接后，CAN 电动夹爪会挂载到这里
```

说明：

- 夹爪监控和数据采集页面仍按原来的左/右手动夹爪逻辑显示，不会额外增加第三个采集开关。
- 电动夹爪控制、剪刀石头布、夹爪遥控会自动查找任意槽位中的电动夹爪，包括 `extra`。
- 电动夹爪连接会先验证电机侧真实回包：GCAN 会查询 CAN 总线，ESP32-CAN 串口桥会先识别 `can_transceiver` 固件，再通过 `query_id` 或反馈帧确认电机在线。

电动夹爪当前统一行程：

```text
0°    = 最大打开，代表“布”
4500° = 最小捏合，代表“拳头”
1800° 和 3600° 之间往返 = 代表“剪刀”
```

## 4. 项目目录说明

拉取项目后，主要目录如下：

```text
ManualGripper/
├─ CMakeLists.txt              # C++ 构建配置
├─ config.json                 # 默认运行配置
├─ requirements.txt            # Python 转换脚本依赖
├─ README.md                   # 项目说明和部署手册
├─ collect_dlls.ps1            # DLL 收集脚本
├─ setup_orbbec_sdk.ps1        # Orbbec SDK 辅助脚本
├─ docs/                       # 更详细的文档
├─ frontend/                   # Web 前端页面
├─ include/                    # C++ 头文件
├─ src/                        # C++ 后端源码
├─ tools/                      # 数据转换脚本
└─ lib/                        # 硬件 SDK 和运行库
```

运行或采集后会生成：

```text
build/                         # 编译后的程序和 DLL
data_capture/                  # 原始采集数据
data_converted/                # 转换后的训练数据
```

这三个目录通常不提交到 Git，因为它们可以重新生成，或者数据量很大。

## 5. 直接拉取项目

如果你是第一次使用，先安装 Git，然后执行：

```bash
git clone https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0.git ManualGripper
cd ManualGripper
```

如果已经拉取过，以后更新代码：

```bash
cd ManualGripper
git pull
```

建议项目放在英文路径，例如：

```text
C:\Robot\ManualGripper
```

不建议放在太深、带特殊字符或权限复杂的目录下。

## 6. 新电脑从零部署

下面按一台全新 Windows 电脑来写。

### 6.1 安装 MSYS2

1. 打开官网下载安装：

```text
https://www.msys2.org
```

2. 安装路径建议保持默认：

```text
C:\msys64
```

3. 打开“MSYS2 MINGW64”终端，执行：

```bash
pacman -Syu
```

如果提示关闭窗口，就关闭终端，重新打开“MSYS2 MINGW64”，再执行一次：

```bash
pacman -Syu
```

### 6.2 安装 C++ 编译环境

在“MSYS2 MINGW64”终端执行：

```bash
pacman -S --needed mingw-w64-x86_64-gcc mingw-w64-x86_64-cmake mingw-w64-x86_64-make mingw-w64-x86_64-opencv mingw-w64-x86_64-eigen3 mingw-w64-x86_64-python
```

安装完成后检查：

```bash
g++ --version
cmake --version
python --version
```

能看到版本号就说明安装成功。

### 6.3 安装 Python 依赖

进入项目目录后执行：

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

`requirements.txt` 中包含数据转换常用依赖：

```text
numpy
pyarrow
h5py
```

### 6.4 安装硬件驱动

根据实际设备安装，不用的设备可以先跳过。

#### 海康工业相机

仓库中的头文件、`.lib` 和 `.dll` 只负责程序编译与运行，不能替代 Windows 的 USB3 Vision 设备驱动。新电脑必须另外安装海康 MVS。

1. 安装海康 MVS 客户端，安装组件中勾选 USB 3.0 驱动。
2. 打开 MVS 目录中的 `Driver Installation Tool`，确认 USB3 Vision 驱动已经安装。
3. 在设备管理器中确认相机位于 `USB3 Vision Cameras`，没有黄色感叹号。
4. 打开 MVS 客户端，确认能枚举并打开相机；随后关闭 MVS，避免它独占设备。
5. 项目中需要以下文件存在：

```text
lib/hikvision/include
lib/hikvision/lib/win64/MvCameraControl.lib
lib/hikvision/lib/win64/MvCameraControl.dll
```

程序启动时会输出 `[海康诊断]`。`SDK 已加载但未枚举到相机` 通常表示系统驱动、USB 连接或设备占用问题；`编译时未找到海康 SDK` 才表示工程依赖不完整。

#### Orbbec Gemini 305

1. 安装 Orbbec Viewer 或 Orbbec SDK。
2. 用 Orbbec Viewer 确认彩色、深度能正常打开。
3. 项目中需要以下目录存在：

```text
lib/orbbec/include
lib/orbbec/lib/win64
```

#### UMI 手动夹爪

1. 插入 USB。
2. 打开 Windows 设备管理器。
3. 确认能看到 COM 口。
4. 如果没有 COM 口，先安装对应 USB 串口驱动。

#### GCAN 电动夹爪

1. 安装 GCAN USBCAN 驱动。
2. 确认 CAN 适配器连接正常。
3. 确认电动夹爪电源、CANH/CANL、终端电阻连接正确。
4. 项目中需要以下文件存在：

```text
lib/gcan/ECanVci64.dll
lib/gcan/CHUSBDLL64.dll
```

#### ESP32-S3 + CAN 模块电动夹爪

如果不用 GCAN 盒，也可以使用 ESP32-S3 + CAN 收发模块作为串口转 CAN 桥接器：

1. 先把桌面 `can_transceiver` 项目烧录到 ESP32-S3。
2. ESP32 通过 USB 连接电脑，系统中会出现一个 COM 口。
3. ESP32 与 CAN 模块连接，CANH/CANL 接入电动夹爪 CAN 总线，电动夹爪、电源、ESP32-CAN 模块需要共地。
4. 启动本项目后点击“重新扫描设备”，程序会自动扫描可能的 ESP32/USB-UART 串口。
5. 串口桥必须返回 `can_transceiver`、`CAN ready` 等启动信息，并且电机对 `query_id` 有真实回包，才会被判定为电动夹爪在线。
6. 如果同时连接两个 UMI 手动夹爪，ESP32-CAN 电动夹爪会挂载到 `extra` 额外槽。

#### IMX335 相机

IMX335 按普通 UVC 摄像头处理：

1. 插入电脑。
2. 打开 Windows 自带“相机”App。
3. 能看到画面即可。
4. 在剪刀石头布页面第一次使用时，浏览器会询问摄像头权限，点击允许。

## 7. 编译项目

### 方法一：MSYS2 MINGW64 编译

打开“MSYS2 MINGW64”终端：

```bash
cd /c/Robot/ManualGripper
mkdir -p build
cd build
cmake .. -G "MinGW Makefiles"
mingw32-make -j4
```

如果你的项目不在 `C:\Robot\ManualGripper`，把路径换成自己的路径。

### 方法二：PowerShell 编译

打开 PowerShell：

```powershell
cd C:\Robot\ManualGripper
$env:PATH = "C:\msys64\mingw64\bin;C:\msys64\usr\bin;" + $env:PATH
cmake -S . -B build -G "MinGW Makefiles"
cmake --build build --config Release
```

如果 PowerShell 编译时 `cc1plus.exe` 或 `g++.exe` 没有明显错误但直接失败，通常是 `PATH` 缺少 MSYS2 运行库路径。先确认已经执行上面的 `$env:PATH = ...`，再重新编译。

编译成功后，会生成：

```text
build/ManualGripper.exe
```

如果启动时报缺 DLL，在项目根目录执行：

```powershell
.\collect_dlls.ps1
```

## 8. 启动项目

PowerShell：

```powershell
cd C:\Robot\ManualGripper\build
.\ManualGripper.exe
```

MSYS2 MINGW64：

```bash
cd /c/Robot/ManualGripper/build
./ManualGripper.exe
```

终端看到服务启动后，打开浏览器：

```text
http://localhost:8080
```

常用页面：

```text
http://localhost:8080/index.html      数据看板
http://localhost:8080/index_old.html  采集控制台
http://localhost:8080/info.html       项目说明页面
```

## 9. 第一次运行怎么检查

建议按这个顺序检查：

1. 启动 `ManualGripper.exe`。
2. 打开 `http://localhost:8080/index_old.html`。
3. 点击“重新扫描设备”。
4. 右上角设备信息中确认摄像头数量和夹爪数量。
5. 左侧打开需要的相机流。
6. 海康相机一般只有彩色流。
7. Orbbec 相机会有彩色、深度、红外、点云。
8. 打开夹爪监控，确认手动夹爪位置和按钮状态正常。
9. 如果使用电动夹爪，先确认 CAN 连接，再小范围测试位置控制。
10. 如果同时连接两个手动夹爪和一个电动夹爪，右上角设备信息里应显示左夹爪、右夹爪、额外夹爪三个槽位。
11. 进入剪刀石头布或夹爪遥控页面，确认页面能识别到电动夹爪。
12. 进入数据采集页，录制 5 秒测试数据。
13. 停止录制后，确认 `data_capture/` 下生成新会话。
14. 进入数据转换页，尝试转换成 LeRobot 或 HDF5。

## 10. 主要页面怎么用

### 数据看板

访问：

```text
http://localhost:8080/index.html
```

用于查看历史会话、采集结果和转换结果。

### 采集控制台

访问：

```text
http://localhost:8080/index_old.html
```

包含夹爪监控、数据采集、数据转换、夹爪控制、电动夹爪控制、剪刀石头布和夹爪遥控。

### 左右设备调整

摄像头和手动夹爪是两套独立调整逻辑，不要混为一谈：

1. “夹爪监控”页左侧的“交换左右摄像头”只调整摄像头画面、视频流和后续视频保存位置，不会改变手动夹爪左右槽位。
2. “夹爪控制”页左侧的“交换左右手动夹爪”只交换 `left/right` 手动夹爪槽位，夹爪监控、夹爪控制、夹爪遥控和夹爪 CSV 保存会同步更新。
3. 如果设备本身 VID 正常区分 `VID_0E01=左手`、`VID_0E02=右手`，系统会自动按左右分配，不需要手动交换。
4. 如果两个夹爪都烧成左手或都烧成右手，系统会先按检测顺序分配；如果物理左右反了，再点“交换左右手动夹爪”校正。
5. 电动夹爪暂不参与左右手动夹爪交换。两个手动夹爪都在线时，电动夹爪会挂载到 `extra` 槽。
6. 录制或保存过程中不能交换左右手动夹爪，避免同一个会话内左右物理设备发生变化。

### 电动夹爪控制

1. 确认 GCAN 适配器或 ESP32-CAN 串口桥、电动夹爪供电正常。
2. 点击“重新扫描设备”。
3. 如果两个手动夹爪都在线，电动夹爪会显示在 `extra` 额外槽。
4. 位置控制里的“目标速度”单位是 `rpm`，前端范围为 `1~3276 rpm`，这是协议编码上限；电流限制默认 `1.2A`，可以按实验需要手动调整。
5. 速度控制里的速度同样是 `rpm`，但它是持续速度控制，页面保守限制为 `-500~500 rpm`。
6. 电流环控制默认 `0.2A`，内部最大限制 `±0.4A`。点击“执行”时程序会自动先发使能，再下发电流环命令，避免必须手动点使能。
7. 首次调试建议先用小行程、小速度、小电流测试，异常时使用“急停”或“停止”。

### 剪刀石头布

1. 插入 IMX335 相机。
2. 打开页面后选择或自动选择 IMX335。
3. 浏览器询问摄像头权限时点击允许。
4. 识别到剪刀、石头、布后，电动夹爪会按映射动作出拳。

### 夹爪遥控

1. 同时连接至少一个手动夹爪和一个电动夹爪。
2. 在“手动夹爪”下拉框选择要用来遥控的夹爪。
3. 电动夹爪会自动选择当前检测到的 CAN 电动夹爪。
4. 默认映射为手动位置 `0~1` 对应电动行程 `0°~4500°`。
5. 如果方向反了，勾选“反向映射”。
6. 如果行程不准，用“取当前最小”和“取当前最大”重新标定。
7. 点击“开始遥控”后，手动捏合会实时同步到电动夹爪。

## 11. 采集数据保存在哪里

默认原始数据目录：

```text
data_capture/
```

一次典型采集会生成：

```text
data_capture/20260602_103000/
├─ Head-umi/
│  ├─ color_video/
│  ├─ depth_video/
│  ├─ ir-left_video/
│  ├─ ir-right_video/
│  └─ pointcloud_data/
├─ Left-umi/
│  ├─ color_video/
│  └─ gripper_data/
├─ Right-umi/
│  ├─ color_video/
│  └─ gripper_data/
└─ metadata.json
```

视频目录中通常包含：

```text
color.mp4
timestamps.csv
```

夹爪目录中通常包含：

```text
gripper.csv
```

保存映射规则：

- 摄像头保存使用当前“交换左右摄像头”后的显示映射。例如页面左侧显示的相机会保存到 `Left-umi/`。
- 手动夹爪保存使用当前“交换左右手动夹爪”后的夹爪槽位。例如交换后物理右手夹爪显示为左夹爪，则它会保存到 `Left-umi/gripper_data/gripper.csv`。
- 摄像头映射和夹爪映射互不影响，三台摄像头和两个手动夹爪可以分别调整后再开始录制。
- 程序不会再用“任意已连接夹爪”兜底写入左右目录，避免两个目录都保存同一个左夹爪或右夹爪数据。
- `gripper.csv` 中的 `slot` 字段也会写入调整后的显示位置：`left` 或 `right`。

转换后的数据默认保存到：

```text
data_converted/
```

## 12. 常用配置

配置文件：

```text
config.json
```

常用项：

```json
{
  "server": {
    "port": 8080
  },
  "paths": {
    "frontendDir": "frontend",
    "dataDir": "data_capture",
    "convertOutputDir": "data_converted",
    "convertScript": "tools/convert_to_lerobot.py"
  },
  "camera": {
    "maxWidth": 1280,
    "maxHeight": 720,
    "fps": 30
  },
  "stream": {
    "jpegQuality": 95,
    "streamMaxWidth": 640,
    "frameSkipMs": 33
  }
}
```

说明：

- `server.port`：网页访问端口。
- `paths.dataDir`：原始数据保存目录。
- `paths.convertOutputDir`：转换数据保存目录。
- `camera.maxWidth/maxHeight/fps`：海康采集分辨率和帧率。
- `stream.streamMaxWidth`：网页预览最大宽度。
- `stream.jpegQuality`：网页预览 JPEG 质量。

如果三路海康画面卡顿，可以降低：

```json
"camera": {
  "maxWidth": 1280,
  "maxHeight": 720,
  "fps": 30
}
```

## 13. 常见问题

### 页面打不开

确认 `ManualGripper.exe` 是否正在运行。

默认地址：

```text
http://localhost:8080
```

如果端口被占用，修改 `config.json` 中的 `server.port`。

### 右上角能看到设备，左侧没有开关

右上角显示的是“检测到的设备列表”。  
左侧显示的是“已经挂载到采集槽位的设备”。

处理方法：

1. 先关闭相关预览流。
2. 点击“重新扫描设备”。
3. 等待左侧开关重新生成。

### 海康相机颜色不对

先用海康 MVS 客户端确认画面颜色正常。  
项目中默认使用海康 SDK 转换为 BGR 图像。

### 三路海康卡顿

三路 USB 相机不要满分辨率满帧率长时间预览。  
建议使用：

```json
"maxWidth": 1280,
"maxHeight": 720,
"fps": 30
```

### Orbbec 黑屏

先用 Orbbec Viewer 确认设备正常。  
如果刚切换过海康和 Orbbec，建议关闭旧预览流后点击“重新扫描设备”。

### 夹爪不动

按顺序检查：

1. 电源。
2. 线缆。
3. 串口或 CAN 适配器。
4. 驱动。
5. 使能状态。
6. 急停状态。
7. 错误码。

首次测试电动夹爪时，不要直接发送大行程。

### 两个手动夹爪在线时识别不到电动夹爪

新版逻辑会把第三个 CAN 电动夹爪挂到 `extra` 额外槽。处理顺序：

1. 停止旧服务，重新编译并启动最新版。
2. 插好两个手动夹爪、GCAN 适配器和电动夹爪电源。
3. 打开采集控制台，点击“重新扫描设备”。
4. 打开右上角设备信息，确认“夹爪槽位”里有“额外夹爪 · 电动夹爪”。
5. 进入电动夹爪控制、剪刀石头布或夹爪遥控页面测试。

### 数据转换失败

确认安装了 Python 依赖：

```bash
python -m pip install -r requirements.txt
```

确认原始会话里有：

```text
metadata.json
视频文件
timestamps.csv
```

## 14. Git 使用说明

这个项目已经配置了 `.gitignore`，默认不会提交：

```text
build/
data_capture/
data_converted/
```

第一次提交：

```bash
git init
git add .gitattributes .gitignore README.md requirements.txt CMakeLists.txt config.json collect_dlls.ps1 setup_orbbec_sdk.ps1 docs frontend include src tools lib
git commit -m "Initial data capture platform"
git remote add origin <仓库地址>
git branch -M main
git push -u origin main
```

后续更新：

```bash
git status
git add README.md frontend include src
git commit -m "Add gripper teleoperation and extra electric gripper slot"
git pull --rebase origin master
git push
```

如果你的远程分支叫 `main`，把上面的 `master` 改成 `main`：

```bash
git pull --rebase origin main
git push origin main
```

如果 `git pull --rebase` 出现冲突，先不要继续 `push`，打开冲突文件解决后执行：

```bash
git add <已解决的文件>
git rebase --continue
git push
```

别人拉取：

```bash
git clone https://github.com/wojiaoxiaoyueyueya/UMI-Windows-v4.0.git ManualGripper
cd ManualGripper
python -m pip install -r requirements.txt
```

## 15. 给别人使用时怎么打包

推荐两种方式。

### 源码仓库方式

适合会编译的人：

```text
提交源码、前端、文档、配置、tools、lib
不提交 build、data_capture、data_converted
```

对方拉取后按本 README 编译运行。

### Windows 安装包方式（推荐）

适合不会编译的人：

```powershell
winget install --id JRSoftware.InnoSetup -e
powershell -ExecutionPolicy Bypass -File .\packaging\package_windows.ps1
```

生成结果：

```text
dist/UMI-Data-Capture-Platform-4.1.2-Setup.exe
```

安装包已经包含程序、运行 DLL、网页、离线手势模型、转换脚本、Python 3.11 及数据转换依赖。默认安装到 `D:\UMIDataCapturePlatform`，安装器禁止选择 C 盘；没有 D 盘时可选择其他非 C 盘。对方不需要安装 Git、MSYS2、CMake、OpenCV 或 Python，双击安装后使用桌面快捷方式即可启动。

首次启动会给 Windows 最多 5 分钟完成设备枚举和驱动初始化。后台输出保存在安装目录的 `startup.log`；若后台提前退出或始终未就绪，启动器会自动打开该日志，便于定位缺失驱动、运行库或设备握手问题。

安装包内置海康 MVS x64 Runtime、Orbbec x64 Runtime、海康 USB3 Vision 驱动、GCAN USB-CAN/CAN-FD 驱动和 CH341 串口驱动。安装程序会请求一次管理员权限，并使用 Windows 驱动管理器自动注册签名驱动。标准 UMI USB CDC 设备继续使用 Windows 自带驱动，无需单独安装。

## 16. 重要提醒

如果仓库是公开仓库，请确认海康、Orbbec、GCAN 等 SDK 是否允许公开分发。  
如果不确定，建议使用私有仓库，或者只提交 `lib/` 目录结构和放置说明，让使用者自己从厂商官网下载 SDK。

## 17. UMI 手动夹爪 V1.0 / 2.0 说明

项目当前手动夹爪统一使用 UMI 2.0/V4.0 新协议：

```text
UMI 2.0：新版 AA 55 帧协议，支持磁编码、按键、IMU、LED、力传感、设备参数查询。
```

UMI 2.0 有线 CDC 优先通过 USB VID 区分左右手：

```text
VID_0E01 = 左手手动夹爪
VID_0E02 = 右手手动夹爪
```

如果两个夹爪固件都烧成 `VID_0E01`，或都烧成 `VID_0E02`，系统不会丢弃第二个设备，而是按枚举顺序把第一个分配到 `left`，第二个分配到 `right`。如果设备本身就是一左一右，则正常按 VID 分配。如果同时还有一个 CAN 电动夹爪，电动夹爪会挂载到 `extra` 槽位，电动夹爪控制、剪刀石头布、夹爪遥控页面都会自动查找可用电动夹爪。

### 17.1 设备识别逻辑

页面高频读取 `/api/devices` 时只返回缓存，不再每次进入页面都重新扫描硬件。这样进入设备控制页会更快，也能减少相机 SDK 和串口反复枚举导致的卡顿。

设备更新由两处负责：

```text
后台热插拔线程：周期性轻量刷新设备列表，并自动补挂新插入的手动夹爪。
重新扫描设备按钮：执行一次明确的完整扫描，适合更换相机、电动夹爪或 CAN 适配器后使用。
```

### 17.2 UMI 2.0 数据展示

夹爪监控页面保持简洁监控，只显示最大/最小/当前闭合度进度条和两个按钮状态。

夹爪控制页面用于查看更完整的 UMI 2.0 数据。如果连接的是 UMI 2.0，会显示以下详细字段：

```text
磁编码浮点值
加速度 XYZ
陀螺仪 XYZ
LED RGB 和亮度
射频发射端地址/频段
射频接收端地址/频段
最后响应命令
数据帧率
力传感完整数组
```

页面还提供以下单独查询功能：

```text
单次状态：发送 0x03，读取一次当前状态。
读取参数：发送 0x13，读取射频地址和频段等设备参数。
力传感置零：发送 0x12，用于力传感器清零。
恢复连续：发送 0x01，恢复连续上报。
```

夹爪控制页面还提供“两点显示校准”。该功能只改变页面上的闭合度显示和进度条，不改变后端采集和 CSV 保存的原始数据。标定时先让夹爪最大张开，点击“当前设为最大”，再让夹爪最小闭合，点击“当前设为最小”。例如最大张开原始显示 `2%`、最小闭合原始显示 `98%` 时，页面会把 `2%` 映射为 `0%`，把 `98%` 映射为 `100%`，中间数值按比例显示。

### 17.3 手动夹爪 CSV 保存格式

采集会在 `gripper_data/gripper.csv` 中保存完整 UMI 2.0 手动夹爪数据，包括磁编码、IMU、力传感、LED 状态和设备参数。

主要字段包括：

```text
timestamp_us, session_time_us, slot
protocol_name, protocol_version
position, button1, button2
payload_len, device_id
encoder_raw, position_raw, position_fallback
accel_x, accel_y, accel_z
gyro_x, gyro_y, gyro_z
force_count, force_max_abs, force_0 ... force_11
tx_address, tx_frequency, rx_address, rx_frequency
led_r, led_g, led_b, led_brightness
last_v4_command
```

其中：

```text
protocol_name = UMI-2.0
position      = 归一化闭合位置
position_raw  = UMI 2.0 磁编码浮点值放大 10000 后的稳定值
encoder_raw   = UMI 2.0 磁编码 4 字节原始 bit pattern
```
