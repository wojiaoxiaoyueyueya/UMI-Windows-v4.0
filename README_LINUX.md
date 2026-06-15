# Ubuntu 22.04 Linux 版

机器人数据采集平台 Linux 版本，目标系统 Ubuntu 22.04 x86_64。

## 目录说明

```text
linux_ubuntu2204_port/
├─ project/                 # 源码、前端、工具和配置
├─ third_party_sdk/          # 第三方 SDK（海康、Orbbec、UMI、GCAN）
├─ scripts/                  # 安装、构建脚本
├─ .env.example              # 环境变量模板
└─ README_LINUX.md           # 本文件
```

## 环境准备

```bash
cd linux_ubuntu2204_port

# 安装系统依赖
bash scripts/bootstrap_ubuntu2204.sh

# 安装 Python 转换依赖
cd project
pip3 install -r requirements.txt
```

## 编译

```bash
cd linux_ubuntu2204_port/project
cmake -S . -B build
cmake --build build
```

编译成功后生成 `project/build/ManualGripper`。

## 运行

```bash
cd linux_ubuntu2204_port/project
./build/ManualGripper
```

启动后浏览器访问：

```text
http://localhost:8080/index.html      数据看板
http://localhost:8080/index_old.html  采集控制台
http://localhost:8080/info.html       项目说明页面
```

## 支持的功能

- 海康工业相机彩色视频采集
- Orbbec 深度相机彩色、深度、红外采集
- 多相机同时在线，实时 MJPEG 预览
- UMI 手动夹爪（左右手自动识别）
- 数据录制、统一时间戳、会话管理
- 数据转换（LeRobot / HDF5 / RLDS）
- Web 控制台操作，无需额外前端环境

## 移植说明

项目完全自包含，所有 SDK 在 `third_party_sdk/` 目录内。移植到新电脑只需：

1. 整个 `linux_ubuntu2204_port/` 目录拷贝过去
2. `bash scripts/bootstrap_ubuntu2204.sh` 装系统包
3. `pip3 install -r project/requirements.txt` 装 Python 依赖
4. `cmake -S project -B project/build && cmake --build project/build` 编译
5. `./project/build/ManualGripper` 运行

不需要单独安装海康 MVS 客户端或 Orbbec SDK。
