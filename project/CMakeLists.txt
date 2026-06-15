# CMakeLists.txt - Ubuntu 22.04 Linux 移植版构建入口
#
# 说明：
# 1. 这个文件只用于 linux_ubuntu2204_port/project 目录，不影响原来的 Windows 工程。
# 2. 当前源码中仍有 Win32 串口、DLL 动态加载、Windows 文件系统工具等平台相关代码。
#    因此第一次在 Ubuntu 上编译时，如果这些平台层尚未替换，出现编译错误是正常的。
# 3. 推荐移植顺序：
#    - 先替换 include/utils/WinFsUtils.hpp 为 std::filesystem / POSIX 实现；
#    - 再把 UmiGripper 的 Win32 串口实现替换为 termios；
#    - 然后处理电动夹爪 CAN 层，优先考虑 SocketCAN，也可接入厂商 Linux SDK；
#    - 最后接入 Orbbec Linux SDK 与海康 Linux MVS 运行库。

cmake_minimum_required(VERSION 3.16)
project(ManualGripperLinux LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

option(ENABLE_HIKVISION "启用海康工业相机 SDK" ON)
option(ENABLE_ORBBEC "启用奥比中光 Orbbec SDK" ON)
option(ENABLE_ELECTRIC_GRIPPER "启用电动夹爪 CAN 控制" ON)

find_package(Threads REQUIRED)
find_package(OpenCV REQUIRED)
find_package(Eigen3 QUIET)
find_package(PkgConfig QUIET)

set(PORT_ROOT "${CMAKE_SOURCE_DIR}/..")
set(SDK_ROOT "${PORT_ROOT}/third_party_sdk")
set(HIK_SDK_PATH "${SDK_ROOT}/hikvision")
set(ORBBEC_SDK_PATH "${SDK_ROOT}/orbbec")
set(GCAN_SDK_PATH "${SDK_ROOT}/gcan")

set(SOURCES
    src/main.cpp
    src/Config.cpp
    src/DeviceManager.cpp
    src/ElectricGripper.cpp
    src/HikCamera.cpp
    src/OrbbecCamera.cpp
    src/SlamManager.cpp
    src/UmiGripper.cpp
    src/http/HttpServer.cpp
    src/http/HttpServerRoutes.cpp
    src/http/HttpServerRecording.cpp
    src/utils/JsonHelper.cpp
)

add_executable(ManualGripper ${SOURCES})

target_compile_definitions(ManualGripper PRIVATE
    LINUX_PORT=1
)

target_include_directories(ManualGripper PRIVATE
    ${CMAKE_SOURCE_DIR}/include
    ${OpenCV_INCLUDE_DIRS}
)

target_link_libraries(ManualGripper PRIVATE
    ${OpenCV_LIBS}
    Threads::Threads
    dl
)

if(Eigen3_FOUND)
    target_link_libraries(ManualGripper PRIVATE Eigen3::Eigen)
else()
    message(WARNING "未找到 Eigen3，SLAM 相关功能可能需要安装 libeigen3-dev。")
endif()

if(ENABLE_HIKVISION)
    find_library(HIK_MVS_LIB
        NAMES MvCameraControl
        PATHS "${HIK_SDK_PATH}/lib"
        NO_DEFAULT_PATH
    )
    if(HIK_MVS_LIB)
        target_include_directories(ManualGripper PRIVATE "${HIK_SDK_PATH}/include")
        target_link_libraries(ManualGripper PRIVATE "${HIK_MVS_LIB}")
        message(STATUS "海康 MVS SDK: ${HIK_MVS_LIB}")
    else()
        target_compile_definitions(ManualGripper PRIVATE NO_HIK_CAMERA)
        message(WARNING "未找到海康 Linux MVS 动态库，海康相机功能会被关闭。")
    endif()
else()
    target_compile_definitions(ManualGripper PRIVATE NO_HIK_CAMERA)
endif()

if(ENABLE_ORBBEC)
    target_include_directories(ManualGripper PRIVATE "${ORBBEC_SDK_PATH}/include")
    find_library(ORBBEC_LIB
        NAMES OrbbecSDK obsensor
        PATHS
            "${ORBBEC_SDK_PATH}/lib"
            "${ORBBEC_SDK_PATH}/lib/linux_x64"
        NO_DEFAULT_PATH
    )
    if(ORBBEC_LIB)
        target_link_libraries(ManualGripper PRIVATE "${ORBBEC_LIB}")
        message(STATUS "Orbbec Linux SDK: ${ORBBEC_LIB}")
    else()
        target_compile_definitions(ManualGripper PRIVATE NO_ORBBEC_CAMERA)
        message(WARNING "未找到 Orbbec Linux 动态库，请把官方 Ubuntu 22.04 SDK 放入 third_party_sdk/orbbec/lib/linux_x64。")
    endif()
else()
    target_compile_definitions(ManualGripper PRIVATE NO_ORBBEC_CAMERA)
endif()

set_target_properties(ManualGripper PROPERTIES
    BUILD_RPATH "${HIK_SDK_PATH}/lib;${ORBBEC_SDK_PATH}/lib;${ORBBEC_SDK_PATH}/lib/linux_x64"
)

if(NOT ENABLE_ELECTRIC_GRIPPER)
    target_compile_definitions(ManualGripper PRIVATE NO_ELECTRIC_GRIPPER)
endif()

add_custom_command(TARGET ManualGripper POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory
        "${CMAKE_SOURCE_DIR}/frontend"
        "$<TARGET_FILE_DIR:ManualGripper>/../frontend"
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
        "${CMAKE_SOURCE_DIR}/config.json"
        "$<TARGET_FILE_DIR:ManualGripper>/../config.json"
    COMMAND ${CMAKE_COMMAND} -E copy_directory
        "${CMAKE_SOURCE_DIR}/tools"
        "$<TARGET_FILE_DIR:ManualGripper>/tools"
    COMMENT "复制前端页面、配置文件和工具脚本"
)

message(STATUS "OpenCV include: ${OpenCV_INCLUDE_DIRS}")
message(STATUS "SDK root: ${SDK_ROOT}")
message(WARNING "如果编译报 windows.h、CreateFile、LoadLibrary 等错误，请先按照 PORTING_STATUS.md 完成平台层替换。")
