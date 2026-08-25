# 训练数据合同

## 1. 数据分级

本项目原始会话默认属于“观测数据”，包含视频、夹爪闭合度、按键、IMU、力传感和设备状态。
只有同时记录真实控制动作、明确任务指令并通过时序与数值校验后，才能标记为“训练就绪数据”。

以下情况禁止进入行为克隆或 π0.5 训练数据池：

- `action` 缺失、全零、全程不变或由占位值补齐；
- 用 IMU、视频或下一帧状态冒充机器人控制器实际收到的命令；
- 左右相机拆成两个互不关联的 episode；
- 任务文本只是日期、会话编号或设备名称；
- state/action 维度、顺序、单位与训练配置不一致；
- 多路数据没有使用同一会话时间轴。

## 2. 通用 LeRobot 动作文件

当前 LeRobot 转换器只接受真实动作文件：

```text
<slot>/action_data/actions.csv
```

最低字段要求：

```csv
session_time_us,action_0,action_1,...,action_N
0,0.12,-0.08,...,0.30
33333,0.13,-0.07,...,0.31
```

- `session_time_us`：相对录制开始时刻的微秒时间戳；也可使用 `timestamp_us` 绝对时间戳。
- `action_0..action_N`：发送给控制器的同一时刻、经过限幅和滤波后的真实命令。
- 动作列必须从 0 开始连续编号，所有值必须有限且不能全程恒定。
- 任务指令必须描述真实行为，例如“将红色方块放入收纳盒”。

转换器会将动作按时间戳对齐到视频帧，并计算真实 mean/std/min/max/q01/q99。缺少动作时转换会停止，
不会再生成七维全零占位动作。

## 3. Body22 π0.5 合同

对接当前 Body22 π0.5 流程时，还需要采集机器人端数据，不能只依赖 UMI 夹爪观测：

- 单一数据集根目录和统一 episode；
- `observation.state` 为 `float32[22]`；
- `action` 为 `float32[22]`，表示 22 维绝对关节位置，单位 rad；
- 三路相机键为 `observation.images.top_head`、`observation.images.hand_left`、
  `observation.images.hand_right`；
- 目标频率 30 Hz，`timestamp = frame_index / fps`；
- 每条 episode 具有真实任务文本、成功状态和明确的 reset 边界；
- 数据集划分 train/holdout，并使用本数据集重新计算归一化统计量。

当前 Windows 采集端尚未连接 22 维机器人关节状态与控制桥命令，因此现有仅含视频、IMU 和夹爪闭合度的
历史会话不能直接转换为 Body22 训练数据。必须在机器人控制桥增加 state/action 回调后重新采集。

## 4. 训练前验收

1. 全量视频可解码，帧数与 Parquet 行数一致。
2. 所有 state/action 数值有限，维度、名称、顺序和单位符合训练配置。
3. action 具有合理方差、幅值和速度，抽样回放与真实机器人运动一致。
4. 多路相机、状态和动作均使用统一时间轴。
5. 末帧终止标志正确，episode 之间不存在跨段数据。
6. 任务文本、成功标签、train/holdout 划分有效。
7. 在目标 Linux/LeRobot 环境运行 DataLoader 与短时 smoke training。

通过以上检查只表示数据管线可用于训练，不替代真实机器人闭环验证。
