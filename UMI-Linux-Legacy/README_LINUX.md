# Linux 版部署补充说明

本文件是 `README.md` 的补充，记录 Ubuntu 22.04 上更细的部署和排错信息。第一次安装请优先阅读仓库根目录的 `README.md`。

## 推荐系统

```text
Ubuntu 22.04 LTS x86_64
内存：16 GB 或以上
USB：多路相机建议使用 USB 3.0 直连
硬盘：建议 SSD，并根据采集数据量预留足够空间
```

## 一键部署流程

```bash
git clone https://github.com/wojiaoxiaoyueyueya/UMI-linux.git
cd UMI-linux
bash scripts/bootstrap_ubuntu2204.sh
sudo usermod -aG dialout,video,plugdev $USER
```

注销并重新登录后继续：

```bash
cd UMI-linux
bash scripts/build_linux.sh
bash scripts/run_linux.sh
```

浏览器访问：

```text
http://localhost:8080
```

## SDK 路径

项目默认从仓库内加载 SDK：

```text
third_party_sdk/hikvision
third_party_sdk/orbbec
third_party_sdk/gcan
```

`scripts/run_linux.sh` 会自动设置 `LD_LIBRARY_PATH`。如果你把 SDK 放到了别的位置，可以复制 `.env.example` 为 `.env` 后修改：

```bash
cp .env.example .env
nano .env
```

`scripts/repair_sdk_links.sh` 会在安装、编译和运行前自动执行，用于恢复 Orbbec SDK 的 Linux 软链接。

## 编译目录

官方脚本使用：

```text
project/build-linux/
```

手动 CMake 也可以使用：

```bash
cmake -S project -B project/build-linux -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build project/build-linux
```

## 常见问题

### 串口夹爪检测不到

先查看串口设备：

```bash
ls -l /dev/ttyACM* /dev/ttyUSB*
groups
```

如果当前用户不在 `dialout` 组，执行：

```bash
sudo usermod -aG dialout $USER
```

然后注销并重新登录。

### 摄像头检测不到

查看 USB 设备：

```bash
lsusb
```

查看视频节点：

```bash
ls -l /dev/video*
```

如果权限不足，确认用户在 `video` 和 `plugdev` 组内。

### 程序启动后页面打不开

确认服务是否启动：

```bash
ss -lntp | grep 8080
```

如果端口被占用，修改 `project/config.json` 中的 `server.port`。

### 找不到动态库

运行前确认脚本设置了 SDK 路径：

```bash
bash scripts/run_linux.sh
```

不要直接双击可执行文件启动；直接启动可能没有 `LD_LIBRARY_PATH`。

## 不提交到 Git 的内容

以下内容由 `.gitignore` 排除：

```text
project/build/
project/build-linux/
project/data_capture/
project/data_converted/
project/Log/
*.log
.env
```

这样仓库保持为源码和 SDK 工程，采集数据不会被误上传。
