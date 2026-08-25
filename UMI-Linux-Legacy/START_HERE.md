# 从这里开始

如果你是第一次在一台新 Ubuntu 电脑上使用本项目，按下面顺序执行即可。

## 1. 拉取仓库

```bash
git clone https://github.com/wojiaoxiaoyueyueya/UMI-linux.git
cd UMI-linux
```

## 2. 第一次安装

```bash
bash install_and_run_ubuntu2204.sh
```

脚本会自动安装系统依赖、修复 SDK 软链接、编译项目，并启动服务。

如果脚本提示需要重新登录，请执行：

```bash
sudo reboot
```

重启后再次进入项目目录：

```bash
cd UMI-linux
bash install_and_run_ubuntu2204.sh
```

## 3. 打开页面

服务启动后访问：

```text
http://localhost:8080
```

## 4. 主程序入口在哪里

主程序入口不是放在仓库根目录，而是在：

```text
project/src/main.cpp
```

构建入口是：

```text
project/CMakeLists.txt
```

运行脚本是：

```text
scripts/run_linux.sh
```

所以 GitHub 首页看不到 `main.cpp` 是正常的，它在 `project/src/` 目录里。
