#!/usr/bin/env python3
"""将包含真实动作监督的原始会话转换为 LeRobot v3.0 数据集格式。

用法：convert_to_lerobot.py <原始会话目录> <输出数据集目录> [--task 任务描述] [--progress 进度文件]

训练转换要求每个槽位提供 action_data/actions.csv。动作文件至少包含：
session_time_us,action_0,...,action_N。转换器不会再用全零向量伪造动作监督。

依赖：pip3 install pyarrow
"""

import json, os, sys, csv, shutil, math, re

try:
    import pyarrow as pa
    import pyarrow.parquet as pq
except ImportError:
    sys.stderr.write("ERROR: pyarrow required. Install: pip3 install pyarrow\n")
    sys.exit(3)


VIDEO_MAP = {
    'color': {'dir': 'color_video', 'file': 'color.mp4', 'key': 'observation.images.cam', 'is_depth': False},
    'depth': {'dir': 'depth_video', 'file': 'depth.mp4', 'key': 'observation.images.depth', 'is_depth': True},
    'ir':    {'dir': 'ir_video', 'file': 'ir.mp4',    'key': 'observation.images.ir',    'is_depth': False},
}


class ConversionError(RuntimeError):
    """表示源数据不满足训练转换合同。"""


def aligned_ts(row):
    """优先读取会话相对时间戳，并正确保留合法的 0 时刻。"""
    session_ts = row.get('session_time_us')
    if session_ts is not None and str(session_ts).strip() != '':
        return int(float(session_ts))
    timestamp_ts = row.get('timestamp_us')
    if timestamp_ts is None or str(timestamp_ts).strip() == '':
        raise ConversionError("CSV 缺少 session_time_us 或 timestamp_us 时间戳")
    return int(float(timestamp_ts))


def write_progress(pf, progress, step, done=False, error=""):
    if not pf:
        return
    try:
        with open(pf, 'w', encoding='utf-8') as f:
            json.dump({"progress": progress, "step": step, "done": done, "error": error}, f,
                      ensure_ascii=False)
    except Exception:
        pass


def read_imu(path):
    rows = []
    if not os.path.exists(path):
        return rows
    with open(path, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            rows.append({
                'ts': aligned_ts(r),
                'ax': float(r['accel_x']), 'ay': float(r['accel_y']), 'az': float(r['accel_z']),
                'gx': float(r['gyro_x']), 'gy': float(r['gyro_y']), 'gz': float(r['gyro_z']),
            })
    rows.sort(key=lambda x: x['ts'])
    return rows


def read_gripper(path):
    rows = []
    is_electric = False
    has_embedded_imu = False
    if not os.path.exists(path):
        return rows, is_electric, has_embedded_imu
    with open(path, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames or []
        is_electric = 'position_deg' in headers
        has_embedded_imu = all(name in headers for name in (
            'accel_x', 'accel_y', 'accel_z', 'gyro_x', 'gyro_y', 'gyro_z'))
        for r in reader:
            if is_electric:
                rows.append({
                    'ts': aligned_ts(r),
                    'position_deg': float(r.get('position_deg', 0)),
                    'velocity': float(r.get('velocity_rpm', 0)),
                    'current': float(r.get('current_a', 0)),
                })
            else:
                if 'position' in r:
                    close_ratio = float(r['position'])
                else:
                    close_ratio = float(r['close_ratio'])
                rows.append({
                    'ts': aligned_ts(r),
                    'close_ratio': close_ratio,
                    'ax': float(r.get('accel_x') or 0),
                    'ay': float(r.get('accel_y') or 0),
                    'az': float(r.get('accel_z') or 0),
                    'gx': float(r.get('gyro_x') or 0),
                    'gy': float(r.get('gyro_y') or 0),
                    'gz': float(r.get('gyro_z') or 0),
                })
    rows.sort(key=lambda x: x['ts'])
    return rows, is_electric, has_embedded_imu


def find_action_file(slot_dir):
    """查找当前槽位的真实控制动作文件，不跨槽位复用动作。"""
    candidates = (
        os.path.join(slot_dir, 'action_data', 'actions.csv'),
        os.path.join(slot_dir, 'action_data', 'action.csv'),
    )
    for path in candidates:
        if os.path.isfile(path):
            return path
    return ''


def read_actions(path):
    """读取 action_0..action_N，并验证维度、数值和时间戳。"""
    if not path:
        raise ConversionError(
            "缺少真实动作文件 action_data/actions.csv；当前会话只有观测数据，不能用于行为克隆训练")

    rows = []
    with open(path, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames or []
        indexed_columns = []
        for name in headers:
            match = re.fullmatch(r'action_(\d+)', name)
            if match:
                indexed_columns.append((int(match.group(1)), name))
        indexed_columns.sort(key=lambda item: item[0])
        action_columns = [name for _, name in indexed_columns]
        if not action_columns or [index for index, _ in indexed_columns] != list(range(len(action_columns))):
            raise ConversionError(
                "动作文件必须包含从 action_0 开始且连续编号的动作列，例如 action_0..action_21")

        for line_number, row in enumerate(reader, start=2):
            try:
                values = [float(row[name]) for name in action_columns]
                timestamp = aligned_ts(row)
            except (KeyError, TypeError, ValueError) as exc:
                raise ConversionError(f"动作文件第 {line_number} 行无法解析: {exc}") from exc
            if not all(math.isfinite(value) for value in values):
                raise ConversionError(f"动作文件第 {line_number} 行包含 NaN 或无穷值")
            if rows and timestamp < rows[-1]['ts']:
                raise ConversionError(f"动作文件第 {line_number} 行时间戳早于上一行")
            rows.append({'ts': timestamp, 'values': values})

    if len(rows) < 2:
        raise ConversionError("动作文件至少需要两条带时间戳的控制命令")

    unique_actions = {tuple(round(value, 9) for value in row['values']) for row in rows}
    if len(unique_actions) <= 1:
        raise ConversionError("真实 action 全程不变，缺少可学习的动作监督，请检查采集端控制命令日志")
    return rows, action_columns


def align_vector_rows(rows, frame_timestamps, n, value_key):
    """将异步传感器或动作样本按最近时间戳对齐到视频帧。"""
    if not rows or n == 0:
        return []
    aligned = []
    cursor = 0
    for i in range(n):
        frame_ts = frame_timestamps[min(i, len(frame_timestamps) - 1)]
        while cursor + 1 < len(rows):
            current_delta = abs(rows[cursor]['ts'] - frame_ts)
            next_delta = abs(rows[cursor + 1]['ts'] - frame_ts)
            if next_delta > current_delta:
                break
            cursor += 1
        aligned.append(list(rows[cursor][value_key]))
    return aligned


def align_embedded_imu_to_frames(gripper_rows, video_timestamps, n):
    imu_rows = [{
        'ts': row['ts'],
        'values': [row['ax'], row['ay'], row['az'], row['gx'], row['gy'], row['gz']],
    } for row in gripper_rows]
    return align_vector_rows(imu_rows, video_timestamps, n, 'values')


def read_video_timestamps(source_dir, video_type):
    """读取视频旁边 timestamps.csv 中的逐帧时间戳；新数据优先使用统一的 session_time_us。"""
    ts_path = os.path.join(source_dir, VIDEO_MAP[video_type]['dir'], 'timestamps.csv')
    timestamps = []
    if not os.path.exists(ts_path):
        return timestamps
    with open(ts_path, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            timestamps.append(aligned_ts(r))
    return timestamps


def align_imu_to_frames(imu_rows, video_timestamps, n):
    """使用二分查找把 IMU 数据对齐到视频帧时间戳。

    新数据优先使用 session_time_us，因此 IMU 和视频帧都在同一个会话时间轴上。
    旧数据仍保留 timestamp_us 回退逻辑，便于转换历史会话。
    """
    if not imu_rows or n == 0:
        return [[0.0] * 6] * n
    states = []
    for i in range(n):
        if i < len(video_timestamps):
            frame_ts = video_timestamps[i]
        elif video_timestamps:
            frame_ts = video_timestamps[-1] + int((i - len(video_timestamps) + 1) * 1_000_000 / 30)
        else:
            frame_ts = 0
        lo, hi = 0, len(imu_rows) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if imu_rows[mid]['ts'] < frame_ts:
                lo = mid + 1
            else:
                hi = mid
        r = imu_rows[min(lo, len(imu_rows) - 1)]
        states.append([r['ax'], r['ay'], r['az'], r['gx'], r['gy'], r['gz']])
    return states


def align_gripper_to_frames(gripper_rows, video_timestamps, device_offset_us, n, is_electric=False):
    """把夹爪采样对齐到视频帧时间戳。

    Gripper timestamps are in system_clock (us), video timestamps are in device clock (us).
    Convert gripper to device clock domain via offset, then binary search.
    For electric gripper returns [position_deg, velocity, current] per frame.
    For manual gripper returns [close_ratio] per frame.
    """
    dim = 3 if is_electric else 1
    if not gripper_rows or n == 0:
        return [[0.0] * dim for _ in range(n)]
    # 将夹爪时间戳转换到视频使用的时间轴；新数据 offset 为 0，旧数据保留兼容换算。
    converted = []
    for row in gripper_rows:
        converted.append({'ts': row['ts'] - device_offset_us, **{k: row[k] for k in row if k != 'ts'}})
    converted.sort(key=lambda x: x['ts'])

    states = []
    for i in range(n):
        if i < len(video_timestamps):
            frame_ts = video_timestamps[i]
        elif video_timestamps:
            frame_ts = video_timestamps[-1] + int((i - len(video_timestamps) + 1) * 1_000_000 / 30)
        else:
            frame_ts = 0
        lo, hi = 0, len(converted) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if converted[mid]['ts'] < frame_ts:
                lo = mid + 1
            else:
                hi = mid
        r = converted[min(lo, len(converted) - 1)]
        if is_electric:
            states.append([r['position_deg'], r['velocity'], r['current']])
        else:
            states.append([r['close_ratio']])
    return states


def read_pose(path):
    if not os.path.exists(path):
        return []
    rows = []
    with open(path, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            rows.append({
                'ts': aligned_ts(r),
                'x': float(r['x']), 'y': float(r['y']), 'z': float(r['z']),
                'qx': float(r['qx']), 'qy': float(r['qy']), 'qz': float(r['qz']), 'qw': float(r['qw']),
                'roll': float(r['roll']), 'pitch': float(r['pitch']), 'yaw': float(r['yaw']),
            })
    rows.sort(key=lambda x: x['ts'])
    return rows


def align_pose_to_frames(pose_rows, video_timestamps, device_offset_us, n):
    """把位姿数据对齐到视频帧时间戳。

    新数据使用 session_time_us，旧数据通过 device_offset_us 做兼容换算。
    每一帧返回 [x, y, z, qx, qy, qz, qw]。
    """
    if not pose_rows or n == 0:
        return [[0.0] * 7] * n
    converted = []
    for row in pose_rows:
        converted.append({
            'ts': row['ts'] - device_offset_us,
            'x': row['x'], 'y': row['y'], 'z': row['z'],
            'qx': row['qx'], 'qy': row['qy'], 'qz': row['qz'], 'qw': row['qw'],
        })
    converted.sort(key=lambda x: x['ts'])
    states = []
    for i in range(n):
        if i < len(video_timestamps):
            frame_ts = video_timestamps[i]
        elif video_timestamps:
            frame_ts = video_timestamps[-1] + int((i - len(video_timestamps) + 1) * 1_000_000 / 30)
        else:
            frame_ts = 0
        lo, hi = 0, len(converted) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if converted[mid]['ts'] < frame_ts:
                lo = mid + 1
            else:
                hi = mid
        r = converted[min(lo, len(converted) - 1)]
        states.append([r['x'], r['y'], r['z'], r['qx'], r['qy'], r['qz'], r['qw']])
    return states


def percentile(sorted_values, quantile):
    if not sorted_values:
        return 0.0
    position = (len(sorted_values) - 1) * quantile
    lower = int(math.floor(position))
    upper = int(math.ceil(position))
    if lower == upper:
        return sorted_values[lower]
    weight = position - lower
    return sorted_values[lower] * (1.0 - weight) + sorted_values[upper] * weight


def compute_stats(values_list):
    if not values_list:
        return [0.0], [0.0], [0.0], [0.0], [0.0], [0.0]
    n = len(values_list)
    dim = len(values_list[0])
    mean = [sum(values_list[i][d] for i in range(n)) / n for d in range(dim)]
    var = [sum((values_list[i][d] - mean[d]) ** 2 for i in range(n)) / n for d in range(dim)]
    std = [math.sqrt(v) for v in var]
    mn = [min(values_list[i][d] for i in range(n)) for d in range(dim)]
    mx = [max(values_list[i][d] for i in range(n)) for d in range(dim)]
    q01 = [percentile(sorted(values_list[i][d] for i in range(n)), 0.01) for d in range(dim)]
    q99 = [percentile(sorted(values_list[i][d] for i in range(n)), 0.99) for d in range(dim)]
    return mean, std, mn, mx, q01, q99


def convert_slot(source_dir, output_dir, session_id, fps, start_us, task,
                 progress_file, slot_name=None, slot_meta=None,
                 allow_observation_only=False):
    """将单个槽位转换为 LeRobot 数据集；如果是旧版扁平目录，则转换整个会话。

    Args:
        source_dir:  Root session directory.
        output_dir:  Where the LeRobot dataset is written.
        session_id:  Session identifier string.
        fps:         Frames per second.
        start_us: 会话开始时间，单位微秒。
        task:        Task description (or empty string).
        progress_file: Path to progress JSON file (or empty).
        slot_name:   Slot subdirectory name (e.g. '1Left-umi') or None for old format.
        slot_meta:   Per-slot metadata dict from slots[slot_name], or None for old format.
    """

    # 解析当前槽位实际读取的数据目录。
    if slot_name:
        slot_dir = os.path.join(source_dir, slot_name)
    else:
        slot_dir = source_dir

    # --- 解析槽位级元数据或旧版顶层元数据 ---
    if slot_meta:
        first_video_dev_ts = slot_meta.get('firstVideoDeviceTimestampUs', 0)
        device_offset_us = slot_meta.get('deviceToSystemOffsetUs', 0)
        frame_counts = slot_meta.get('frameCount', {})
        imu_count = slot_meta.get('imuCount', 0)
        gripper_count = slot_meta.get('gripperCount', 0)
        electric_gripper_count = (slot_meta.get('gripper', {}) or {}).get('electricFrames', 0)
        pc_count = slot_meta.get('pointCloudCount', 0)
        videos_meta = slot_meta.get('videos', {})
        pose_frames = 0
    else:
        first_video_dev_ts = 0
        device_offset_us = 0
        # 旧版格式：从顶层 metadata.json 读取。
        with open(os.path.join(source_dir, 'metadata.json'), encoding='utf-8-sig') as f:
            meta = json.load(f)
        first_video_dev_ts = meta.get('firstVideoDeviceTimestampUs', 0)
        device_offset_us = meta.get('deviceToSystemOffsetUs', 0)
        frame_counts = meta.get('frameCount', {})
        imu_count = meta.get('imuCount', 0)
        gripper_count = meta.get('gripperCount', 0)
        electric_gripper_count = (meta.get('gripper', {}) or {}).get('electricFrames', 0)
        pc_count = meta.get('pointCloudCount', 0)
        videos_meta = meta.get('videos', {})
        pose_frames = meta.get('pose', {}).get('frames', 0)

    # --- 检测当前会话中可用的数据类型 ---
    imu_path = os.path.join(slot_dir, 'imu_data', 'imu_data.csv')
    has_standalone_imu = imu_count > 0 and os.path.exists(imu_path)

    # 夹爪数据：新格式使用 gripper.csv，旧格式使用 gripper_data.csv。
    gripper_path = os.path.join(slot_dir, 'gripper_data', 'gripper.csv')
    gripper_path_old = os.path.join(slot_dir, 'gripper_data', 'gripper_data.csv')
    if os.path.exists(gripper_path):
        has_gripper = gripper_count > 0 or electric_gripper_count > 0
        used_gripper_path = gripper_path
    elif os.path.exists(gripper_path_old):
        has_gripper = gripper_count > 0 or electric_gripper_count > 0
        used_gripper_path = gripper_path_old
    else:
        has_gripper = False
        used_gripper_path = gripper_path_old
    effective_gripper_count = electric_gripper_count if electric_gripper_count > 0 else gripper_count

    # 新版手动夹爪把 IMU 与闭合度保存在同一个 gripper.csv 中，不能再依赖独立 imu_data 目录。
    gripper_rows, is_electric, has_embedded_imu = read_gripper(used_gripper_path) if has_gripper else ([], False, False)
    has_imu = has_standalone_imu or (has_gripper and has_embedded_imu and not is_electric)

    # 训练转换必须读取真实控制命令。兼容开关只供检查历史观测包，网页端不启用。
    action_rows = []
    action_names = []
    action_file = find_action_file(slot_dir)
    if action_file:
        action_rows, action_names = read_actions(action_file)
    elif not allow_observation_only:
        slot_label = slot_name or os.path.basename(slot_dir)
        raise ConversionError(
            f"{slot_label} 缺少真实动作文件 action_data/actions.csv；禁止生成全零 action 训练包")

    has_pc = pc_count > 0
    pose_path = os.path.join(slot_dir, 'pose_data', 'pose_data.csv')
    has_pose = os.path.exists(pose_path) and pose_frames > 0

    # 查找可用视频，并选择主时间轴视频。
    available_videos = []
    video_info = {}
    for vtype, vinfo in VIDEO_MAP.items():
        src = os.path.join(slot_dir, vinfo['dir'], vinfo['file'])
        cnt = frame_counts.get(vtype, 0)
        if cnt > 0 and os.path.exists(src):
            available_videos.append(vtype)
            vi = videos_meta.get(vtype) or {}
            video_info[vtype] = {
                'width': vi.get('width', 640),
                'height': vi.get('height', 480),
                'frames': cnt,
                'src': src,
            }

    # 确定帧数和主视频类型。
    primary_video = None
    nframes = 0
    state_dim = 6 if has_imu else 0
    if has_gripper:
        state_dim += 3 if is_electric else 1
    # 夹爪状态维度会在检测到电动夹爪后调整。
    if has_pose:
        state_dim += 7  # xyz + quaternion

    if available_videos:
        for vtype in ['color', 'depth', 'ir']:
            if vtype in available_videos:
                primary_video = vtype
                nframes = video_info[vtype]['frames']
                break
    elif has_imu:
        nframes = imu_count if has_standalone_imu else len(gripper_rows)
        state_dim = 6
    elif has_pc:
        nframes = pc_count
        state_dim = 3
    else:
        sys.stderr.write(f"SKIP: no convertible data in {'slot ' + slot_name if slot_name else 'session'}\n")
        return False

    if nframes == 0:
        sys.stderr.write(f"SKIP: no data frames in {'slot ' + slot_name if slot_name else 'session'}\n")
        return False

    # --- 读取真实逐帧时间戳；缺失时按 FPS 生成虚拟时间戳兜底 ---
    video_timestamps = []
    if primary_video:
        ts_path = os.path.join(slot_dir, VIDEO_MAP[primary_video]['dir'], 'timestamps.csv')
        if os.path.exists(ts_path):
            with open(ts_path, newline='', encoding='utf-8-sig') as f:
                for r in csv.DictReader(f):
                    video_timestamps.append(aligned_ts(r))
    if not video_timestamps or len(video_timestamps) != nframes:
        # 兼容旧数据：没有 timestamps.csv 时按 FPS 生成虚拟时间戳。
        video_timestamps = [start_us + int(j * 1_000_000 / fps) for j in range(nframes)]
    if action_rows:
        tolerance_us = int(1_000_000 / fps) * 2
        if (action_rows[-1]['ts'] < video_timestamps[0] - tolerance_us or
                action_rows[0]['ts'] > video_timestamps[-1] + tolerance_us):
            raise ConversionError("动作时间轴与视频时间轴没有重叠，请检查 session_time_us 的时钟基准")

    # --- 创建 LeRobot 目录结构 ---
    meta_d = os.path.join(output_dir, 'meta')
    data_d = os.path.join(output_dir, 'data', 'chunk-000')
    ep_d = os.path.join(meta_d, 'episodes', 'chunk-000')
    for d in (meta_d, data_d, ep_d):
        os.makedirs(d, exist_ok=True)

    # 复制视频文件到目标数据集目录。
    for vtype in available_videos:
        vid_d = os.path.join(output_dir, 'videos', VIDEO_MAP[vtype]['key'], 'chunk-000')
        os.makedirs(vid_d, exist_ok=True)
        shutil.copy2(video_info[vtype]['src'], os.path.join(vid_d, 'file-000.mp4'))

    # --- 读取并对齐 IMU 数据 ---
    write_progress(progress_file, 0.15, "Reading IMU data...")
    imu_rows = read_imu(imu_path) if has_standalone_imu else []
    if has_standalone_imu:
        imu_states = align_imu_to_frames(imu_rows, video_timestamps, nframes)
    elif has_embedded_imu and gripper_rows:
        imu_states = align_embedded_imu_to_frames(gripper_rows, video_timestamps, nframes)
    else:
        imu_states = [[] for _ in range(nframes)]

    # --- 读取并对齐夹爪数据 ---
    write_progress(progress_file, 0.20, "Reading gripper data...")
    gripper_states = align_gripper_to_frames(
        gripper_rows, video_timestamps, device_offset_us, nframes, is_electric
    ) if has_gripper else [[] for _ in range(nframes)]

    # --- 读取并对齐位姿数据 ---
    write_progress(progress_file, 0.22, "Reading pose data...")
    pose_rows = read_pose(pose_path) if has_pose else []
    pose_states = align_pose_to_frames(pose_rows, video_timestamps, device_offset_us, nframes) if has_pose else None

    # 将 IMU、夹爪和可选位姿合并为 observation.state。
    if pose_states:
        states = [imu_states[i] + gripper_states[i] + pose_states[i] for i in range(nframes)]
    else:
        states = [imu_states[i] + gripper_states[i] for i in range(nframes)]

    # --- 使用同一时间轴上的真实控制动作；不再默认填充七维全零向量 ---
    if action_rows:
        actions = align_vector_rows(action_rows, video_timestamps, nframes, 'values')
        action_dim = len(action_names)
    else:
        action_dim = 0
        actions = [[] for _ in range(nframes)]

    # --- 将微秒时间戳转换为秒，写入 LeRobot timestamp 字段 ---
    real_ts_seconds = [frame_index / float(fps) for frame_index in range(nframes)]

    # --- 写入数据 Parquet 文件 ---
    write_progress(progress_file, 0.30, "Writing data Parquet...")
    table_data = {
        'episode_index':  pa.array([0] * nframes, type=pa.int64()),
        'frame_index':    pa.array(list(range(nframes)), type=pa.int64()),
        'timestamp':      pa.array(real_ts_seconds, type=pa.float32()),
        'next.reward':    pa.array([0.0] * nframes, type=pa.float32()),
        'next.done':      pa.array([i == nframes - 1 for i in range(nframes)], type=pa.bool_()),
        'index':          pa.array(list(range(nframes)), type=pa.int64()),
        'task_index':     pa.array([0] * nframes, type=pa.int64()),
    }
    if state_dim > 0:
        table_data['observation.state'] = pa.array(states, type=pa.list_(pa.float32()))
    if action_dim > 0:
        table_data['action'] = pa.array(actions, type=pa.list_(pa.float32()))
    pq.write_table(pa.table(table_data), os.path.join(data_d, 'file-000.parquet'))

    # --- 计算数据集统计信息 ---
    write_progress(progress_file, 0.50, "Computing statistics...")
    if state_dim > 0:
        state_mean, state_std, state_min, state_max, state_q01, state_q99 = compute_stats(states)
    else:
        state_mean = state_std = state_min = state_max = state_q01 = state_q99 = []
    if actions and action_dim > 0:
        action_mean, action_std, action_min, action_max, action_q01, action_q99 = compute_stats(actions)
    else:
        action_mean = action_std = action_min = action_max = action_q01 = action_q99 = []

    ts_values = real_ts_seconds
    ts_mean = sum(ts_values) / nframes
    ts_std = math.sqrt(sum((t - ts_mean) ** 2 for t in ts_values) / nframes)

    fi_mean = (nframes - 1) / 2.0
    fi_std = math.sqrt((nframes ** 2 - 1) / 12.0) if nframes > 1 else 0.0

    done_mean = 1.0 / nframes
    done_std = math.sqrt((nframes - 1) / (nframes ** 2)) if nframes > 1 else 0.0
    task_desc = task or f"Recorded session {session_id}"
    if slot_name:
        task_desc = f"{task_desc} [{slot_name}]"

    # --- 写入 episode 索引 Parquet 文件 ---
    write_progress(progress_file, 0.60, "Writing episodes metadata...")
    episode_columns = {
        'episode_index':      pa.array([0], type=pa.int64()),
        'tasks':              pa.array([[task_desc]], type=pa.list_(pa.string())),
        'length':             pa.array([nframes], type=pa.int64()),
        'data/chunk_index':   pa.array([0], type=pa.int64()),
        'data/file_index':    pa.array([0], type=pa.int64()),
        'dataset_from_index': pa.array([0], type=pa.int64()),
        'dataset_to_index':   pa.array([nframes], type=pa.int64()),
        'meta/episodes/chunk_index': pa.array([0], type=pa.int64()),
        'meta/episodes/file_index':  pa.array([0], type=pa.int64()),
    }
    if state_dim > 0:
        for stat_name, values in (
            ('mean', state_mean), ('std', state_std), ('min', state_min), ('max', state_max),
            ('q01', state_q01), ('q99', state_q99)):
            episode_columns[f'stats/observation.state/{stat_name}'] = pa.array(
                [values], type=pa.list_(pa.float64()))
        episode_columns['stats/observation.state/count'] = pa.array([nframes], type=pa.int64())
    if action_dim > 0:
        for stat_name, values in (
            ('mean', action_mean), ('std', action_std), ('min', action_min), ('max', action_max),
            ('q01', action_q01), ('q99', action_q99)):
            episode_columns[f'stats/action/{stat_name}'] = pa.array(
                [values], type=pa.list_(pa.float64()))
        episode_columns['stats/action/count'] = pa.array([nframes], type=pa.int64())
    for vtype in available_videos:
        video_key = VIDEO_MAP[vtype]['key']
        episode_columns[f'videos/{video_key}/chunk_index'] = pa.array([0], type=pa.int64())
        episode_columns[f'videos/{video_key}/file_index'] = pa.array([0], type=pa.int64())
        episode_columns[f'videos/{video_key}/from_timestamp'] = pa.array([0.0], type=pa.float64())
        episode_columns[f'videos/{video_key}/to_timestamp'] = pa.array(
            [nframes / float(fps)], type=pa.float64())
    ep_table = pa.table(episode_columns)
    pq.write_table(ep_table, os.path.join(ep_d, 'file-000.parquet'))

    # --- 构建 LeRobot features 元数据 ---
    write_progress(progress_file, 0.75, "Writing info.json...")
    features = {}

    for vtype in available_videos:
        vi = video_info[vtype]
        features[VIDEO_MAP[vtype]['key']] = {
            'dtype': 'video',
            'shape': [vi['height'], vi['width'], 3],
            'names': ['height', 'width', 'channels'],
            'video_info': {
                'video.fps': fps,
                'video.codec': 'avc1',
                'video.pix_fmt': 'yuv420p',
                'video.is_depth_map': VIDEO_MAP[vtype]['is_depth'],
                'has_audio': False,
            },
        }

    sensor_names = []
    if has_imu:
        sensor_names += ['accel_x', 'accel_y', 'accel_z', 'gyro_x', 'gyro_y', 'gyro_z']
    if has_gripper:
        if is_electric:
            sensor_names += ['position_deg', 'velocity_rpm', 'current_a']
        else:
            sensor_names += ['close_ratio']
    if has_pose:
        sensor_names += ['pos_x', 'pos_y', 'pos_z', 'quat_x', 'quat_y', 'quat_z', 'quat_w']
    if state_dim > 0:
        features['observation.state'] = {
            'dtype': 'float32',
            'shape': [state_dim],
            'names': {
                'sensors': sensor_names[:state_dim],
            },
            'fps': fps,
        }
    if action_dim > 0:
        features['action'] = {
            'dtype': 'float32',
            'shape': [action_dim],
            'names': {'motors': action_names},
            'fps': fps,
        }
    scalar_dtypes = {
        'timestamp': 'float32',
        'episode_index': 'int64',
        'frame_index': 'int64',
        'next.reward': 'float32',
        'next.done': 'bool',
        'index': 'int64',
        'task_index': 'int64',
    }
    for key, dtype in scalar_dtypes.items():
        features[key] = {'dtype': dtype, 'shape': [1], 'names': None, 'fps': fps}

    info = {
        'codebase_version': 'v3.0',
        'robot_type': 'umi_data_capture',
        'total_episodes': 1,
        'total_frames': nframes,
        'total_tasks': 1,
        'chunks_size': 1000,
        'fps': int(round(fps)),
        'data_files_size_in_mb': 100,
        'video_files_size_in_mb': 500,
        'splits': {'train': '0:1'},
        'data_path': 'data/chunk-{chunk_index:03d}/file-{file_index:03d}.parquet',
        'features': features,
        'training_ready': action_dim > 0,
    }
    if slot_name:
        info['slot'] = slot_name
    if available_videos:
        info['video_path'] = 'videos/{video_key}/chunk-{chunk_index:03d}/file-{file_index:03d}.mp4'
    with open(os.path.join(meta_d, 'info.json'), 'w', encoding='utf-8') as f:
        json.dump(info, f, indent=2, ensure_ascii=False)

    # --- 使用 LeRobot v3 标准 Parquet 任务索引 ---
    task_table = pa.table({
        'task_index': pa.array([0], type=pa.int64()),
        'task': pa.array([task_desc], type=pa.string()),
    })
    pq.write_table(task_table, os.path.join(meta_d, 'tasks.parquet'))

    # --- 写入统计文件 stats.json ---
    write_progress(progress_file, 0.85, "Writing stats.json...")
    stats = {}

    if state_dim > 0:
        stats['observation.state'] = {
            'mean': state_mean, 'std': state_std,
            'min': state_min, 'max': state_max,
            'q01': state_q01, 'q99': state_q99, 'count': [nframes],
        }
    if action_dim > 0:
        stats['action'] = {
            'mean': action_mean, 'std': action_std,
            'min': action_min, 'max': action_max,
            'q01': action_q01, 'q99': action_q99, 'count': [nframes],
        }
    stats['timestamp'] = {
        'mean': [ts_mean], 'std': [ts_std],
        'min': [min(ts_values)], 'max': [max(ts_values)], 'count': [nframes],
    }
    stats['episode_index'] = {'mean': [0.0], 'std': [0.0], 'min': [0], 'max': [0], 'count': [nframes]}
    stats['frame_index'] = {'mean': [fi_mean], 'std': [fi_std], 'min': [0], 'max': [nframes - 1], 'count': [nframes]}
    stats['next.reward'] = {'mean': [0.0], 'std': [0.0], 'min': [0.0], 'max': [0.0], 'count': [nframes]}
    stats['next.done'] = {'mean': [done_mean], 'std': [done_std], 'min': [False], 'max': [True], 'count': [nframes]}
    stats['index'] = {'mean': [fi_mean], 'std': [fi_std], 'min': [0], 'max': [nframes - 1], 'count': [nframes]}
    stats['task_index'] = {'mean': [0.0], 'std': [0.0], 'min': [0], 'max': [0], 'count': [nframes]}
    with open(os.path.join(meta_d, 'stats.json'), 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2, ensure_ascii=False, allow_nan=False)

    write_progress(progress_file, 0.95, "Finalizing...")

    # 写入根级 metadata.json，便于数据看板识别转换结果。
    root_meta = {
        'format': 'lerobot',
        'version': 'v3.0',
        'sessionId': session_id,
        'fps': fps,
        'totalFrames': nframes,
        'totalEpisodes': 1,
        'trainingReady': action_dim > 0,
        'actionDimension': action_dim,
        'hasIMU': has_imu,
        'hasGripper': has_gripper,
        'hasPose': has_pose,
        'frameCount': frame_counts,
        'videos': {vtype: {'width': video_info[vtype]['width'], 'height': video_info[vtype]['height'],
                           'frames': video_info[vtype]['frames']}
                   for vtype in available_videos},
    }
    if slot_name:
        root_meta['slot'] = slot_name
    if has_imu:
        root_meta['imuCount'] = imu_count if has_standalone_imu else len(gripper_rows)
    if has_gripper:
        root_meta['gripperCount'] = effective_gripper_count
        root_meta['gripperType'] = 'electric' if is_electric else 'manual'
    if has_pc:
        root_meta['pointCloudCount'] = pc_count
    with open(os.path.join(output_dir, 'metadata.json'), 'w', encoding='utf-8') as f:
        json.dump(root_meta, f, indent=2, ensure_ascii=False)

    # 构建转换摘要，返回给前端显示。
    sources = []
    if primary_video:
        vi = video_info[primary_video]
        sources.append(f"{primary_video}:{vi['width']}x{vi['height']}")
    if has_imu:
        sources.append(f"imu:{imu_count if has_standalone_imu else len(gripper_rows)}")
    if has_gripper:
        sources.append(f"gripper:{effective_gripper_count}")
    if has_pc:
        sources.append(f"pc:{pc_count}")
    slot_tag = f"[{slot_name}]" if slot_name else ""
    print(f"OK:{session_id}{slot_tag}:{nframes}:{'+'.join(sources)}:{fps}")
    return True


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        sys.stderr.write("Usage: convert_to_lerobot.py <source_dir> <output_dir>\n")
        sys.exit(1)

    source_dir = args[0]
    output_dir = args[1]
    task = ""
    progress_file = ""
    allow_observation_only = False

    i = 2
    while i < len(args):
        if args[i] == '--task' and i + 1 < len(args):
            task = args[i + 1]; i += 2
        elif args[i] == '--progress' and i + 1 < len(args):
            progress_file = args[i + 1]; i += 2
        elif args[i] == '--allow-observation-only':
            allow_observation_only = True; i += 1
        else:
            i += 1

    partial_output_dir = output_dir + '.partial'
    shutil.rmtree(partial_output_dir, ignore_errors=True)

    try:
        write_progress(progress_file, 0.0, "正在检查训练数据合同...")
        if not task.strip() and not allow_observation_only:
            raise ConversionError("缺少真实任务指令；LeRobot 训练转换必须填写本次示范执行的具体任务")

        with open(os.path.join(source_dir, 'metadata.json'), encoding='utf-8-sig') as f:
            meta = json.load(f)

        session_id = meta['sessionId']
        fps = float(meta.get('fps', 30.0))
        if not math.isfinite(fps) or fps <= 0:
            raise ConversionError("metadata.json 中的 fps 无效")

        # --- 时间戳处理，并兼容旧格式数据 ---
        if 'startTimeUs' in meta:
            start_us = meta['startTimeUs']
        else:
            start_us = meta.get('startTime', 0) * 1000

        # --- 判断新槽位目录格式或旧扁平目录格式 ---
        slots = meta.get('slots')

        if slots and not allow_observation_only:
            contract_errors = []
            if len(slots) > 1:
                contract_errors.append(
                    "多槽位会话必须先合并为一个同步 episode，不能把左右相机拆成独立训练数据集")
            missing_action_slots = [
                slot_name for slot_name in slots
                if not find_action_file(os.path.join(source_dir, slot_name))
            ]
            if missing_action_slots:
                contract_errors.append(
                    "以下槽位缺少 action_data/actions.csv: " + ", ".join(missing_action_slots))
            if contract_errors:
                raise ConversionError("；".join(contract_errors))

        if slots:
            # 新格式：遍历每个槽位，并为每个槽位生成独立数据集。
            any_ok = False
            for slot_name, slot_meta in slots.items():
                slot_output_dir = os.path.join(partial_output_dir, slot_name)
                ok = convert_slot(source_dir, slot_output_dir, session_id, fps, start_us,
                             task, progress_file, slot_name=slot_name, slot_meta=slot_meta,
                             allow_observation_only=allow_observation_only)
                if ok:
                    any_ok = True
            if not any_ok:
                raise ConversionError("所有槽位都缺少可转换的数据")
        else:
            # 旧格式：单个扁平目录，保留向后兼容。
            ok = convert_slot(source_dir, partial_output_dir, session_id, fps, start_us,
                         task, progress_file, slot_name=None, slot_meta=None,
                         allow_observation_only=allow_observation_only)
            if not ok:
                raise ConversionError("会话中没有可转换的数据")

        # 所有槽位成功后再原子替换正式输出，转换失败不会留下半成品目录。
        if os.path.exists(output_dir):
            shutil.rmtree(output_dir)
        os.replace(partial_output_dir, output_dir)
        write_progress(progress_file, 1.0, "转换完成", done=True)
    except ConversionError as exc:
        shutil.rmtree(partial_output_dir, ignore_errors=True)
        message = str(exc)
        write_progress(progress_file, 1.0, "训练数据校验失败", done=True, error=message)
        sys.stderr.write(f"ERROR: {message}\n")
        sys.exit(4)
    except Exception as exc:
        shutil.rmtree(partial_output_dir, ignore_errors=True)
        message = f"转换程序异常: {exc}"
        write_progress(progress_file, 1.0, "转换失败", done=True, error=message)
        sys.stderr.write(f"ERROR: {message}\n")
        sys.exit(1)


if __name__ == '__main__':
    main()
