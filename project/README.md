# project 目录说明

`project/` 是 UMI Linux 数据采集平台的主程序目录，包含 C++ 后端、Web 前端、配置文件和数据转换脚本。

## 模块划分

```text
project/
├─ CMakeLists.txt          Linux 版 CMake 构建入口
├─ config.json             默认运行配置
├─ requirements.txt        Python 数据转换依赖
├─ include/                C++ 头文件
├─ src/                    C++ 后端源码
│  ├─ main.cpp             程序入口
│  ├─ DeviceManager.cpp    摄像头、手动夹爪、电动夹爪设备管理
│  ├─ HikCamera.cpp        海康相机适配
│  ├─ OrbbecCamera.cpp     Orbbec 相机适配
│  ├─ UmiGripper.cpp       UMI 手动夹爪串口适配
│  ├─ ElectricGripper.cpp  电动夹爪 CAN 控制接口
│  └─ http/                HTTP API、录制、转换和静态页面服务
├─ frontend/               浏览器控制台和说明页面
├─ tools/                  LeRobot/HDF5/RLDS 转换脚本
└─ docs/                   详细部署和代码结构说明
```

## 编译

推荐在仓库根目录执行：

```bash
bash scripts/build_linux.sh
```

如果只在 `project/` 目录手动编译：

```bash
cmake -S . -B build-linux -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build-linux
```

## 运行

推荐在仓库根目录执行：

```bash
bash scripts/run_linux.sh
```

启动成功后访问：

```text
http://localhost:8080
```

## Web 页面

| 文件 | 地址 | 作用 |
| --- | --- | --- |
| `frontend/index.html` | `/index.html` | 数据看板 |
| `frontend/index_old.html` | `/index_old.html` | 采集控制台、设备开关、录制控制 |
| `frontend/info.html` | `/info.html` | 项目说明和部署手册 |

## 数据目录

默认数据目录由 `config.json` 控制：

```json
{
  "paths": {
    "dataDir": "data_capture",
    "convertOutputDir": "data_converted"
  }
}
```

运行时会生成：

```text
data_capture/       原始录制会话
data_converted/     转换后的训练数据
Log/                运行日志或 SDK 日志
```

这些目录属于本地运行数据，不提交 Git。

## 采集数据格式

一次录制会话通常类似：

```text
data_capture/20260602_103000/
├─ Head-umi/
│  ├─ color_video/
│  ├─ depth_video/
│  ├─ ir-left_video/
│  ├─ ir-right_video/
│  └─ pointcloud_data/
├─ Left-umi/
│  ├─ color_video/
│  └─ gripper_data/
├─ Right-umi/
│  ├─ color_video/
│  └─ gripper_data/
└─ metadata.json
```

视频目录保存视频文件和帧时间戳；夹爪目录保存夹爪位置、按钮、LED 等时间序列数据；`metadata.json` 保存本次会话的设备和录制参数。

## 转换脚本

```bash
python3 tools/convert_to_lerobot.py --input data_capture --output data_converted
python3 tools/convert_to_hdf5.py --input data_capture --output data_converted
python3 tools/convert_to_rlds.py --input data_capture --output data_converted
```

实际调用通常由前端页面触发，命令行方式主要用于排错或批量处理。
