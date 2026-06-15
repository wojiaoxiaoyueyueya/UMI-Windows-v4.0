# 第三方 SDK 放置说明

本目录用于存放 Ubuntu 22.04 版本需要的硬件 SDK。

## 已复制

```text
hikvision/     # 当前项目中已有的海康 include 和 Linux .so
umi/           # UMI 驱动源码参考
orbbec/        # 当前项目中的 Orbbec include 和 extensions
gcan/          # 当前项目中的 ECanVci.h
```

## 仍需补齐

### Orbbec Linux SDK

请在 Ubuntu 上安装或复制 Linux 版 Orbbec SDK，并放到：

```text
third_party_sdk/orbbec/lib/linux_x64/libOrbbecSDK.so
```

如果 SDK 目录结构不同，需要同步修改 Linux CMake。

### GCAN Linux SDK

当前 Windows 项目只有：

```text
ECanVci64.dll
CHUSBDLL64.dll
```

Ubuntu 不能使用 `.dll`。请选择一种方案：

1. 使用 GCAN 厂商提供的 Linux `.so`
2. 改为 SocketCAN，使用系统 `can0`

推荐优先使用 SocketCAN，因为 Ubuntu 工具链更标准，后续维护更轻。
