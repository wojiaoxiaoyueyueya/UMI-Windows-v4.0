# UMI Linux 数据采集平台

这是机器人数据采集平台的 Ubuntu 22.04 Linux 版本，用于多相机实时预览、UMI 手动夹爪采集、电动夹爪控制、录制会话管理，以及 LeRobot、HDF5、RLDS 数据格式转换。

本仓库按“拉取后可直接部署”的方式整理：源码、前端页面、构建脚本和运行所需 SDK 都放在仓库内；编译产物、采集数据、转换数据和日志不会提交到 Git。

## 支持环境

| 项目 | 说明 |
| --- | --- |
| 操作系统 | Ubuntu 22.04 LTS x86_64 |
| 编译工具 | CMake、Ninja、g++、pkg-config |
| 后端 | C++17 |
| 前端 | 原生 HTML/CSS/JavaScript，由 C++ HTTP 服务直接提供 |
| 默认端口 | `8080` |

## 支持硬件

| 设备 | 当前适配情况 | 用途 |
| --- | --- | --- |
| Orbbec Gemini 305 | 已适配 Linux SDK | 彩色、深度、红外画面采集 |
| Hikvision 海康 USB 工业相机 | 已适配 Linux MVS SDK | 彩色视频采集 |
| UMI 手动夹爪 | 已适配 Linux 串口 | 夹爪位置、按钮、LED 状态采集 |
| 电动夹爪 CAN 控制 | 保留接口 | 可继续接入 SocketCAN、GCAN 或 ESP32-CAN 方案 |

## 目录结构

```text
linux_ubuntu2204_port/
├─ START_HERE.md            第一次使用请先看这个文件
├─ install_and_run_ubuntu2204.sh
│                           新电脑一键安装、编译、运行入口
├─ project/                 主程序源码、前端页面、配置和数据转换脚本
│  ├─ include/              C++ 头文件
│  ├─ src/                  C++ 后端源码，主入口为 src/main.cpp
│  ├─ frontend/             Web 控制台、数据看板、说明页面
│  ├─ tools/                LeRobot/HDF5/RLDS 转换脚本
│  ├─ docs/                 部署和结构说明
│  ├─ config.json           默认运行配置
│  └─ requirements.txt      Python 转换依赖
├─ scripts/                 Ubuntu 依赖安装、编译、运行脚本
├─ third_party_sdk/         海康、Orbbec、GCAN 等第三方 SDK
├─ .env.example             本地环境变量模板，不包含真实密钥
├─ .gitignore               Git 忽略规则
└─ README.md                本说明文件
```

## 拉取项目

新电脑上先安装 Git，然后执行：

```bash
git clone https://github.com/wojiaoxiaoyueyueya/UMI-linux.git
cd UMI-linux
```

如果是从 U 盘或压缩包拷贝，也请保证整个目录结构完整，不要只拷贝 `project/`。

## 从零部署

最简单方式：

```bash
bash install_and_run_ubuntu2204.sh
```

如果脚本提示需要重新登录或重启，请完成后再次运行同一条命令。下面是手动分步方式。

### 1. 安装系统依赖

```bash
bash scripts/bootstrap_ubuntu2204.sh
```

脚本会安装 CMake、Ninja、OpenCV、Eigen、libusb、udev、Python 和 CAN 工具等依赖，并修复 Orbbec SDK 在跨系统拷贝时可能丢失的 Linux 软链接。

### 2. 配置设备权限

把当前用户加入串口、视频和设备访问相关用户组：

```bash
sudo usermod -aG dialout,video,plugdev $USER
```

执行后需要注销并重新登录，或者重启电脑，否则权限不会立即生效。

### 3. 编译

```bash
bash scripts/build_linux.sh
```

编译成功后会生成：

```text
project/build-linux/ManualGripper
```

编译脚本会先执行 `scripts/repair_sdk_links.sh`，确保 SDK 动态库链接正确。

### 4. 运行

```bash
bash scripts/run_linux.sh
```

终端提示服务启动后，在浏览器打开：

```text
http://localhost:8080
```

常用页面：

| 页面 | 地址 |
| --- | --- |
| 数据看板 | `http://localhost:8080/index.html` |
| 采集控制台 | `http://localhost:8080/index_old.html` |
| 项目说明 | `http://localhost:8080/info.html` |

## 主程序入口

GitHub 首页不会直接显示 `main.cpp`，因为本项目按工程结构放在 `project/` 目录下：

```text
project/src/main.cpp        C++ 主程序入口
project/CMakeLists.txt      Linux 构建入口
scripts/build_linux.sh      编译脚本
scripts/run_linux.sh        运行脚本
```

## 数据保存位置

默认配置在 `project/config.json`：

```json
{
  "paths": {
    "dataDir": "data_capture",
    "convertOutputDir": "data_converted"
  }
}
```

运行时会在 `project/` 下生成：

```text
project/data_capture/      原始采集会话
project/data_converted/    转换后的训练数据
project/Log/               SDK 或运行日志
```

这些目录不会提交到 Git。需要备份数据时，请单独打包保存。

## 更新和提交代码

查看本地是否有修改：

```bash
git status
```

提交修改：

```bash
git add README.md project scripts third_party_sdk .gitignore .env.example
git commit -m "Update Linux data capture project"
git pull --rebase origin main
git push origin main
```

如果 `git status` 显示 `nothing to commit, working tree clean`，说明本地没有需要提交的内容。

## 注意事项

- 不要提交 `.env`，里面可能包含本机路径或密钥。
- 不要提交 `project/build/`、`project/build-linux/`、`project/data_capture/`、`project/data_converted/` 和日志。
- 第三方 SDK 已放入 `third_party_sdk/`，如果后续公开分发，请再次确认厂商授权。
- `scripts/repair_sdk_links.sh` 用于把 Orbbec SDK 的占位文件恢复为 Linux 软链接，建议保留。
- 多相机建议使用 USB 3.0 直连主机，尽量不要通过无源集线器连接。
