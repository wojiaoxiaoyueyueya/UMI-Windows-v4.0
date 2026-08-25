# Ubuntu 22.04 部署手册

本文面向一台全新的 Ubuntu 22.04 电脑，按步骤完成后即可运行 UMI Linux 数据采集平台。

## 1. 准备系统

建议使用：

```text
Ubuntu 22.04 LTS x86_64
内存 16 GB 或以上
USB 3.0 接口
SSD 硬盘
```

多路相机对 USB 带宽要求较高，建议相机直连主机 USB 口。

## 2. 拉取代码

```bash
git clone https://github.com/wojiaoxiaoyueyueya/UMI-linux.git
cd UMI-linux
```

如果无法使用 Git，也可以下载仓库压缩包并解压，但必须保留完整目录结构。

## 3. 安装依赖

```bash
bash scripts/bootstrap_ubuntu2204.sh
```

该脚本会安装：

```text
build-essential
cmake
ninja-build
pkg-config
git
curl
unzip
python3
python3-pip
python3-venv
libopencv-dev
libeigen3-dev
libusb-1.0-0-dev
libudev-dev
can-utils
```

脚本最后会调用 `scripts/repair_sdk_links.sh`，用于恢复 Orbbec SDK 在 Windows 和 Linux 间拷贝时可能变成普通文本文件的软链接。

## 4. 配置权限

```bash
sudo usermod -aG dialout,video,plugdev $USER
```

执行后注销并重新登录。串口夹爪依赖 `dialout` 权限，相机依赖 `video`/`plugdev` 权限。

## 5. 检查设备

查看 USB 设备：

```bash
lsusb
```

查看相机节点：

```bash
ls -l /dev/video*
```

查看串口设备：

```bash
ls -l /dev/ttyACM* /dev/ttyUSB*
```

如果设备存在但程序检测不到，优先检查权限和 USB 连接稳定性。

## 6. 编译项目

在仓库根目录执行：

```bash
bash scripts/build_linux.sh
```

成功后生成：

```text
project/build-linux/ManualGripper
```

构建脚本会在 CMake 前再次检查 SDK 软链接。

## 7. 运行项目

```bash
bash scripts/run_linux.sh
```

启动成功后浏览器打开：

```text
http://localhost:8080
```

页面入口：

```text
/index.html      数据看板
/index_old.html  采集控制台
/info.html       项目说明
```

## 8. 配置文件

默认配置文件：

```text
project/config.json
```

常用项：

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

如果要改端口或数据目录，修改后重新启动程序。

## 9. SDK 说明

仓库内置 SDK：

```text
third_party_sdk/hikvision
third_party_sdk/orbbec
third_party_sdk/gcan
```

运行脚本会设置动态库路径。正常情况下不需要把 SDK 安装到系统目录。

## 10. 数据备份

采集数据保存在：

```text
project/data_capture/
```

转换数据保存在：

```text
project/data_converted/
```

这些目录不进入 Git。需要迁移数据时请单独打包。

## 11. 常见问题

### 页面打不开

检查程序是否在运行：

```bash
ss -lntp | grep 8080
```

如果端口冲突，修改 `project/config.json` 的 `server.port`。

### 找不到动态库

请通过脚本启动：

```bash
bash scripts/run_linux.sh
```

不要直接双击 `ManualGripper`，否则可能缺少 `LD_LIBRARY_PATH`。

### 相机黑屏或卡顿

优先检查 USB 3.0、线缆和供电。三路相机同时工作时，尽量避免使用无源 USB 集线器。

### 夹爪串口打不开

确认用户组：

```bash
groups
```

如果没有 `dialout`，重新执行：

```bash
sudo usermod -aG dialout $USER
```

然后注销并重新登录。
