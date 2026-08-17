# 部署、迁移和 Git 手册

本文档用于把项目交给新电脑或其他同事时使用。

## 1. 仓库应包含什么

必须包含：

```text
CMakeLists.txt
config.json
requirements.txt
README.md
docs/
frontend/
include/
src/
tools/
lib/
collect_dlls.ps1
setup_orbbec_sdk.ps1
```

不应提交：

```text
build/
data_capture/
data_converted/
__pycache__/
*.log
*.pyc
```

## 2. 新电脑部署步骤

1. 安装 Windows 10/11 x64。
2. 安装 MSYS2 到 `C:\msys64`。
3. 打开 MSYS2 MINGW64，安装编译依赖：

```bash
pacman -Syu
pacman -S --needed mingw-w64-x86_64-gcc mingw-w64-x86_64-cmake mingw-w64-x86_64-make mingw-w64-x86_64-opencv mingw-w64-x86_64-eigen3 mingw-w64-x86_64-python
```

4. 克隆仓库：

```bash
git clone <仓库地址> ManualGripper
cd ManualGripper
```

5. 安装 Python 依赖：

```bash
python -m pip install -r requirements.txt
```

6. 安装硬件驱动：

- 海康：安装 MVS 客户端，并通过 `Driver Installation Tool` 安装 USB3 Vision 驱动。仓库内 SDK 文件不能替代系统设备驱动。
- Orbbec：Orbbec SDK/Viewer/驱动。
- UMI：USB 串口驱动。
- GCAN：USBCAN 驱动。
- ESP32-CAN：烧录 `can_transceiver` 固件，并安装对应 USB 串口驱动。

7. 检查 SDK 目录：

```text
lib/hikvision/include
lib/hikvision/lib/win64/MvCameraControl.lib
lib/orbbec/include
lib/orbbec/lib/win64/OrbbecSDK.dll
lib/gcan/ECanVci64.dll
lib/gcan/CHUSBDLL64.dll
```

8. 编译：

```bash
mkdir -p build
cd build
cmake .. -G "MinGW Makefiles"
mingw32-make -j4
```

9. 启动：

```bash
./ManualGripper.exe
```

10. 浏览器访问：

```text
http://localhost:8080
```

海康相机必须先在 MVS 客户端中成功枚举和打开。测试完成后关闭 MVS，再启动本项目，避免相机被独占。如果程序显示“SDK 已加载但未枚举到相机”，优先修复 MVS 驱动或 USB 连接，而不是重复复制 SDK 文件。

## 3. Git 首次提交

```bash
git init
git status
git add .gitattributes .gitignore README.md requirements.txt CMakeLists.txt config.json collect_dlls.ps1 setup_orbbec_sdk.ps1 docs frontend include src tools lib
git commit -m "Initial data capture platform"
git remote add origin <仓库地址>
git branch -M main
git push -u origin main
```

## 4. Git 后续提交

```bash
git status
git diff --stat
git add README.md docs frontend include src tools config.json requirements.txt .gitignore .gitattributes
git commit -m "Update platform version"
git push
```

## 5. 别人拉取更新

```bash
git pull
cmake --build build --config Release
```

如果是第一次拉取，则先执行：

```bash
python -m pip install -r requirements.txt
```

## 6. 提交前检查清单

1. `git status` 中不应出现 `build/`。
2. `git status` 中不应出现 `data_capture/`。
3. `git status` 中不应出现 `data_converted/`。
4. 编译应通过：

```bash
cmake --build build --config Release
```

5. 启动后能打开：

```text
http://localhost:8080
http://localhost:8080/index_old.html
http://localhost:8080/info.html
```

## 7. 生成可直接安装的软件

首次在打包电脑安装 Inno Setup：

```powershell
winget install --id JRSoftware.InnoSetup -e
```

完成项目编译后，在项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\packaging\package_windows.ps1
```

输出文件：

```text
dist/UMI-Data-Capture-Platform-4.1.0-Setup.exe
```

安装包包含 C++ 程序、运行 DLL、前端、离线手势模型、转换脚本，以及带 NumPy、PyArrow、h5py 的内置 Python。目标电脑不需要安装源码编译环境和 Python。

目标电脑操作流程：

1. 安装实际硬件需要的海康、Orbbec、GCAN 或 USB 串口驱动。
2. 双击 `UMI-Data-Capture-Platform-4.1.0-Setup.exe`，并允许一次管理员权限请求；安装器会自动注册随包提供的硬件驱动。
3. 安装结束后双击桌面的“UMI 数据采集平台”。
4. 程序会隐藏运行并打开浏览器；也可以访问 `http://localhost:8080`。

硬件底层驱动不能由普通应用 DLL 替代。标准 USB CDC 设备已经被 Windows 自动识别为 COM 口时，可以跳过对应串口驱动。
