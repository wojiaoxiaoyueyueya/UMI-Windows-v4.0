# 机器人数据采集平台

这是一个用于机器人操作数据采集的本地软件系统。项目可以同时管理多路相机、手动夹爪，支持实时预览、数据录制、历史数据管理，以及 LeRobot、HDF5、RLDS 数据格式转换。

项目运行后会启动一个本地 Web 服务，浏览器打开页面即可操作，不需要额外安装前端环境。

默认访问地址：

```text
http://localhost:8080
```

## 1. 项目能做什么

- 多相机设备检测和实时预览。
- 海康工业相机彩色视频采集。
- Orbbec 奥比中光相机彩色、深度、红外采集。
- UMI 手动夹爪位置、按钮、LED 状态采集。
- 支持两个 UMI 手动夹爪同时在线，通过 USB VID 自动识别左右手。
- 数据采集开始、停止、保存、历史记录查看和删除。
- 视频帧、夹爪数据统一时间戳记录。
- 原始数据转换为 LeRobot、HDF5、RLDS。
- 鱼眼去畸变、亮度对比度调节。

## 2. 当前支持的系统

```text
Ubuntu 22.04 x86_64
```

推荐运行环境：

```text
CPU: i5 / Ryzen 5 及以上
内存: 16 GB 及以上
USB: 推荐 USB 3.0，多个相机尽量直连主机
硬盘: 根据采集数据量准备足够空间，建议 SSD
```

## 3. 支持的硬件

| 类型 | 当前使用/支持型号 | 用途 | 接入方式 |
| --- | --- | --- | --- |
| 奥比中光相机 | Orbbec Gemini 305 | 彩色、深度、红外 | Orbbec SDK |
| 海康工业相机 | Hikvision MVS 工业相机 | 彩色视频采集 | 海康 MVS SDK |
| 手动夹爪 | UMI 手动夹爪 | 位置、按钮、LED | USB 串口 |

## 4. 项目目录说明

```text
project/
├─ CMakeLists.txt              # C++ 构建配置
├─ config.json                 # 默认运行配置
├─ requirements.txt            # Python 转换脚本依赖
├─ README.md                   # 本文件
├─ docs/                       # 更详细的文档
├─ frontend/                   # Web 前端页面
├─ include/                    # C++ 头文件
├─ src/                        # C++ 后端源码
├─ tools/                      # 数据转换脚本
├─ build/                      # 编译输出（不提交 Git）
├─ data_capture/               # 原始采集数据（不提交 Git）
└─ data_converted/             # 转换后的训练数据（不提交 Git）
```

## 5. 新电脑部署

### 5.1 安装系统依赖

```bash
cd linux_ubuntu2204_port
bash scripts/bootstrap_ubuntu2204.sh
```

### 5.2 安装 Python 依赖

```bash
pip3 install -r project/requirements.txt
```

`requirements.txt` 中包含数据转换常用依赖：

```text
numpy
pyarrow
h5py
crcmod
```

### 5.3 编译

```bash
cd linux_ubuntu2204_port/project
cmake -S . -B build
cmake --build build
```

编译成功后生成 `build/ManualGripper`。

### 5.4 运行

```bash
cd linux_ubuntu2204_port/project
./build/ManualGripper
```

终端看到服务启动后，打开浏览器 `http://localhost:8080`。

## 6. 移植说明

项目完全自包含，所有 SDK 在 `third_party_sdk/` 目录内，二进制 RUNPATH 指向项目内路径。移植到新电脑只需要：

1. 整个 `linux_ubuntu2204_port/` 目录拷贝过去
2. `bash scripts/bootstrap_ubuntu2204.sh` 装系统包
3. `pip3 install -r project/requirements.txt` 装 Python 依赖
4. `cmake -S project -B project/build && cmake --build project/build` 编译
5. `./project/build/ManualGripper` 运行

不需要单独安装海康 MVS 客户端或 Orbbec SDK。

## 7. 常用配置

配置文件：`config.json`

```json
{
  "server": { "port": 8080 },
  "paths": {
    "dataDir": "data_capture",
    "convertOutputDir": "data_converted"
  },
  "camera": { "maxWidth": 1280, "maxHeight": 720, "fps": 30 },
  "stream": { "jpegQuality": 95, "streamMaxWidth": 640 }
}
```

## 8. 常见问题

### 页面打不开

确认 `ManualGripper` 是否正在运行，默认端口 `8080`。如果端口被占用，修改 `config.json` 中的 `server.port`。

### 设备检测不到

点击"重新扫描设备"。海康相机需要 USB 3.0 接口，Orbbec 相机需要正确的 USB 权限。

### 相机画面黑屏

确认相机镜头已打开，USB 连接稳定。多路 USB 相机建议直连主板 USB 口，避免使用集线器。

### 转换失败

```bash
pip3 install numpy pyarrow h5py crcmod
```

只有夹爪数据、没有视频的会话会被自动跳过，这是正常行为。

### 两个手动夹爪识别不到

插入 USB 后确认 `/dev/ttyACM*` 存在。程序通过 USB VID 自动识别左右手（0x0E01=左，0x0E02=右）。
