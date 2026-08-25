# Orbbec Linux SDK 放置说明

当前 Windows 工程中的 Orbbec 目录只有头文件和 Windows 运行库，不能直接在 Ubuntu 22.04 上驱动奥比中光相机。

请在 Ubuntu 22.04 上下载奥比中光官方 Linux x86_64 SDK，然后把核心动态库复制到本目录，例如：

- `libOrbbecSDK.so`
- SDK 附带的依赖 `.so`
- SDK 要求的 `extensions`、`config` 或插件目录

如果官方 SDK 的目录结构不同，可以保留官方目录结构，然后同步修改：

- `project/CMakeLists.txt`
- `scripts/run_linux.sh`

目标是让程序运行时能够通过 `LD_LIBRARY_PATH` 找到 Orbbec 的 Linux 动态库。
