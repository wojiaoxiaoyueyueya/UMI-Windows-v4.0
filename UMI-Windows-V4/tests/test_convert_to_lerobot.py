import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

import pyarrow.parquet as pq


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "convert_to_lerobot", PROJECT_ROOT / "tools" / "convert_to_lerobot.py")
converter = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(converter)


class LeRobotConverterTests(unittest.TestCase):
    def test_missing_action_file_is_rejected(self):
        with self.assertRaises(converter.ConversionError):
            converter.read_actions("")

    def test_real_actions_and_embedded_imu_are_exported(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            source = root / "source"
            slot = source / "Left-umi"
            video_dir = slot / "color_video"
            gripper_dir = slot / "gripper_data"
            action_dir = slot / "action_data"
            for path in (video_dir, gripper_dir, action_dir):
                path.mkdir(parents=True, exist_ok=True)

            (video_dir / "color.mp4").write_bytes(b"test-video")
            (video_dir / "timestamps.csv").write_text(
                "frame_index,timestamp_us,session_time_us\n"
                "0,1000000,0\n1,1033333,33333\n2,1066666,66666\n",
                encoding="utf-8",
            )
            (gripper_dir / "gripper.csv").write_text(
                "timestamp_us,session_time_us,position,accel_x,accel_y,accel_z,gyro_x,gyro_y,gyro_z\n"
                "1000000,0,0.1,1,2,3,4,5,6\n"
                "1033333,33333,0.2,2,3,4,5,6,7\n"
                "1066666,66666,0.3,3,4,5,6,7,8\n",
                encoding="utf-8",
            )
            (action_dir / "actions.csv").write_text(
                "timestamp_us,session_time_us,action_0,action_1\n"
                "1000000,0,0.0,0.1\n"
                "1033333,33333,0.2,0.3\n"
                "1066666,66666,0.4,0.5\n",
                encoding="utf-8",
            )

            output = root / "output"
            slot_meta = {
                "frameCount": {"color": 3},
                "gripperCount": 3,
                "videos": {"color": {"width": 1280, "height": 720}},
            }
            ok = converter.convert_slot(
                str(source), str(output), "test-session", 30.0, 1000000,
                "移动测试物体", "", slot_name="Left-umi", slot_meta=slot_meta)
            self.assertTrue(ok)

            info = json.loads((output / "meta" / "info.json").read_text(encoding="utf-8"))
            self.assertTrue(info["training_ready"])
            self.assertEqual(info["features"]["observation.state"]["shape"], [7])
            self.assertEqual(info["features"]["action"]["shape"], [2])
            self.assertTrue((output / "meta" / "tasks.parquet").is_file())
            self.assertTrue((output / "meta" / "episodes" / "chunk-000" / "file-000.parquet").is_file())

            table = pq.read_table(output / "data" / "chunk-000" / "file-000.parquet")
            state = table["observation.state"][0].as_py()
            self.assertEqual(state[:6], [1, 2, 3, 4, 5, 6])
            self.assertAlmostEqual(state[6], 0.1, places=6)
            action = table["action"][2].as_py()
            self.assertAlmostEqual(action[0], 0.4, places=6)
            self.assertAlmostEqual(action[1], 0.5, places=6)
            self.assertTrue(table["next.done"][-1].as_py())
            self.assertAlmostEqual(table["timestamp"][2].as_py(), 2 / 30, places=6)


if __name__ == "__main__":
    unittest.main()
