"""训练平台上传工具的离线测试，不访问真实平台。"""

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


TOOL_PATH = Path(__file__).resolve().parents[1] / "tools" / "upload_to_eidp.py"
SPEC = importlib.util.spec_from_file_location("upload_to_eidp", TOOL_PATH)
UPLOAD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(UPLOAD)


class PlatformUploadToolTests(unittest.TestCase):
    def test_infer_camera_from_platform_and_raw_capture_paths(self):
        self.assertEqual(
            UPLOAD.infer_camera("videos/chunk-000/kHeadColor/episode_000000.mp4", 0),
            "kHeadColor",
        )
        self.assertEqual(
            UPLOAD.infer_camera("Left-umi/color_video/color.mp4", 0),
            "kHandLeftColor",
        )
        self.assertEqual(
            UPLOAD.infer_camera("other/camera.mp4", 2),
            "cam2",
        )

    def test_local_config_is_masked_in_public_response(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            config_path = root / "config.json"
            local_path = root / "config.local.json"
            config_path.write_text(json.dumps({"eidp": {"apiBase": "http://platform"}}), encoding="utf-8")

            response = UPLOAD.save_local_config(local_path, {
                "_configPath": str(config_path),
                "username": "collector",
                "password": "private-password",
                "minioEndpoint": "http://storage.example:19000",
                "minioAccessKey": "private-access-key",
                "minioSecretKey": "private-secret-key",
                "minioBucket": "collect-data",
            }, {})

            text = json.dumps(response, ensure_ascii=False)
            self.assertTrue(response["ok"])
            self.assertTrue(response["config"]["passwordConfigured"])
            self.assertTrue(response["config"]["minio"]["accessKeyConfigured"])
            self.assertTrue(response["config"]["minio"]["secretKeyConfigured"])
            self.assertNotIn("storage", response["config"])
            self.assertNotIn("private-password", text)
            self.assertNotIn("private-access-key", text)
            self.assertNotIn("private-secret-key", text)

            saved = json.loads(local_path.read_text(encoding="utf-8"))
            self.assertEqual(saved["eidp"]["minio"]["bucket"], "collect-data")

    def test_console_port_is_rejected_for_storage_upload(self):
        with self.assertRaisesRegex(UPLOAD.UploadError, "管理控制台端口"):
            UPLOAD.storage_endpoint({
                "minio": {
                    "endpoint": "http://127.0.0.1:19001",
                    "accessKey": "access",
                    "secretKey": "secret",
                    "bucket": "bucket",
                }
            })

    def test_only_fixed_converted_folder_structure_is_accepted(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir) / "20260902_101323_hdf5"
            root.mkdir()
            (root / "metadata.json").write_text('{"format":"hdf5"}', encoding="utf-8")
            (root / "data.hdf5").write_bytes(b"hdf5")
            self.assertEqual(UPLOAD.validate_converted_folder(root), "hdf5")

            (root / "notes.txt").write_text("not converted output", encoding="utf-8")
            with self.assertRaisesRegex(UPLOAD.UploadError, "非转换器生成"):
                UPLOAD.validate_converted_folder(root)

    def test_arbitrary_folder_name_is_rejected(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir) / "my_hdf5_data"
            root.mkdir()
            (root / "metadata.json").write_text("{}", encoding="utf-8")
            (root / "data.hdf5").write_bytes(b"hdf5")
            with self.assertRaisesRegex(UPLOAD.UploadError, "YYYYMMDD"):
                UPLOAD.validate_converted_folder(root)

    def test_nested_lerobot_slots_are_accepted(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir) / "20260902_101323_lerobot"
            slot = root / "Left-umi"
            (slot / "meta").mkdir(parents=True)
            (slot / "data" / "chunk-000").mkdir(parents=True)
            (slot / "metadata.json").write_text('{"format":"lerobot"}', encoding="utf-8")
            (slot / "meta" / "info.json").write_text("{}", encoding="utf-8")
            (slot / "meta" / "tasks.parquet").write_bytes(b"parquet")
            (slot / "data" / "chunk-000" / "file-000.parquet").write_bytes(b"parquet")
            self.assertEqual(UPLOAD.validate_converted_folder(root), "lerobot")

    def test_upload_requires_collector_name(self):
        with self.assertRaisesRegex(UPLOAD.UploadError, "采集员人员名称"):
            UPLOAD.action_upload_folder({"collector": ""}, {
                "token": "test-token",
                "taskId": "1",
                "instanceId": "2",
                "folderPath": "unused",
            }, None)


if __name__ == "__main__":
    unittest.main()
