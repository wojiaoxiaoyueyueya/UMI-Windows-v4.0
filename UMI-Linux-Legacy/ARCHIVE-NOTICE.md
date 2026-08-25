# 归档说明

此目录保存 Ubuntu 22.04 移植版本，用于 Linux 环境验证和后续设备层移植参考。

归档版本为 `1.0.0`，对应最终源码提交 `6f12ec8`。它与桌面备份 `手动电动夹爪v2备份---linux版本/linux-UMI.zip` 的 C++ 源码、头文件、转换工具和 Linux SDK 文件一致；本目录额外补齐部署脚本和说明，并排除了构建产物、采集数据以及误放入备份的 Windows Orbbec DLL/LIB。

- 当前日常交付主版本仍是 `UMI-Windows-V4`。
- 此版本不与 Windows V4 共用构建目录或设备驱动。
- 使用前请阅读本目录的 `START_HERE.md` 和 `README.md`。
- 原始 Git 历史保存在总仓库的 `archive/linux-legacy-history` 分支。
- 详细核对结果见总仓库根目录的 `LEGACY_SOURCE_AUDIT.md`。
