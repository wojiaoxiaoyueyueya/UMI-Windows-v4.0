#!/usr/bin/env python3
"""UMI 训练平台上传工具。

转换结果先上传到 MinIO，再向训练平台登记审核记录。平台和 MinIO 的私有
配置仅保存在本机 config.local.json，返回前端时只提供脱敏状态。
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import hmac
import http.client
import json
import mimetypes
import os
import re
import sys
import tempfile
import time
import uuid
from pathlib import Path
from typing import Any, Callable, Dict, Iterable, List, Optional, Tuple
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen


DEFAULT_EIDP = {
    "apiBase": "",
    "username": "",
    "password": "",
    "org": "umi",
    "collector": "",
    "dataType": "1",
    "minio": {
        "endpoint": "",
        "accessKey": "",
        "secretKey": "",
        "bucket": "",
        "region": "us-east-1",
    },
}


class UploadError(RuntimeError):
    """向前端返回的可读上传错误。"""


def deep_merge(base: Dict[str, Any], extra: Dict[str, Any]) -> Dict[str, Any]:
    """递归覆盖配置，保留默认值和本地未改动字段。"""
    result = dict(base)
    for key, value in extra.items():
        if isinstance(value, dict) and isinstance(result.get(key), dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def read_json(path: Path, default: Optional[Any] = None) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return default
    except (OSError, json.JSONDecodeError) as exc:
        raise UploadError("无法读取 JSON 文件 {}: {}".format(path, exc))


def write_json(path: Path, data: Any) -> None:
    """原子替换 JSON，轮询进度时不会读到半截文件。"""
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp-" + uuid.uuid4().hex)
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(str(temporary), str(path))


def load_eidp_config(config_path: Path, local_config_path: Path) -> Dict[str, Any]:
    base_config = read_json(config_path, {}) or {}
    local_config = read_json(local_config_path, {}) or {}
    base_eidp = base_config.get("eidp", {}) if isinstance(base_config, dict) else {}
    local_eidp = local_config.get("eidp", {}) if isinstance(local_config, dict) else {}
    eidp = deep_merge(DEFAULT_EIDP, base_eidp)
    eidp = deep_merge(eidp, local_eidp)
    minio = eidp.setdefault("minio", {})
    env_overrides = {
        "endpoint": os.environ.get("UMI_STORAGE_ENDPOINT", "").strip(),
        "accessKey": os.environ.get("UMI_STORAGE_ACCESS_KEY", "").strip(),
        "secretKey": os.environ.get("UMI_STORAGE_SECRET_KEY", ""),
        "bucket": os.environ.get("UMI_STORAGE_BUCKET", "").strip(),
        "region": os.environ.get("UMI_STORAGE_REGION", "").strip(),
    }
    for key, value in env_overrides.items():
        if value:
            minio[key] = value
    minio["region"] = str(minio.get("region") or "us-east-1")
    return eidp


def public_config(eidp: Dict[str, Any]) -> Dict[str, Any]:
    minio = eidp.get("minio") or {}
    return {
        "ok": True,
        "config": {
            "apiBase": str(eidp.get("apiBase", "")),
            "username": str(eidp.get("username", "")),
            "org": str(eidp.get("org", "umi")),
            "collector": str(eidp.get("collector", "")),
            "dataType": str(eidp.get("dataType", "1")),
            "passwordConfigured": bool(eidp.get("password")),
            "minio": {
                "endpoint": str(minio.get("endpoint", "")),
                "bucket": str(minio.get("bucket", "")),
                "region": str(minio.get("region", "us-east-1")),
                "accessKeyConfigured": bool(minio.get("accessKey")),
                "secretKeyConfigured": bool(minio.get("secretKey")),
            },
        },
    }


def save_local_config(local_config_path: Path, payload: Dict[str, Any], eidp: Dict[str, Any]) -> Dict[str, Any]:
    local = read_json(local_config_path, {}) or {}
    if not isinstance(local, dict):
        local = {}
    local_eidp = local.setdefault("eidp", {})
    local_minio = local_eidp.setdefault("minio", {})

    simple_fields = {
        "apiBase": "apiBase",
        "username": "username",
        "password": "password",
        "org": "org",
        "collector": "collector",
        "dataType": "dataType",
    }
    for request_key, config_key in simple_fields.items():
        value = payload.get(request_key)
        if isinstance(value, str) and value.strip():
            local_eidp[config_key] = value.strip()

    minio_fields = {
        "minioEndpoint": "endpoint",
        "minioAccessKey": "accessKey",
        "minioSecretKey": "secretKey",
        "minioBucket": "bucket",
        "minioRegion": "region",
    }
    for request_key, config_key in minio_fields.items():
        value = payload.get(request_key)
        if isinstance(value, str) and value.strip():
            local_minio[config_key] = value.strip()

    write_json(local_config_path, local)
    return public_config(load_eidp_config(Path(payload["_configPath"]), local_config_path))


def request_json(url: str, method: str, payload: Optional[Dict[str, Any]] = None,
                 token: str = "") -> Dict[str, Any]:
    data = None
    headers = {"Accept": "application/json"}
    if payload is not None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json"
    if token:
        headers["Authorization"] = "Bearer " + token

    request = Request(url, data=data, headers=headers, method=method)
    try:
        with urlopen(request, timeout=30) as response:
            text = response.read().decode("utf-8", errors="replace")
    except HTTPError as exc:
        text = exc.read().decode("utf-8", errors="replace")
        try:
            details = json.loads(text)
            message = details.get("msg") or details.get("message") or text
        except json.JSONDecodeError:
            message = text or str(exc)
        raise UploadError("平台请求失败（HTTP {}）：{}".format(exc.code, message))
    except (URLError, OSError) as exc:
        raise UploadError("无法连接数据平台：{}".format(exc))

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        raise UploadError("平台返回的不是有效 JSON")


def is_success(response: Dict[str, Any]) -> bool:
    code = response.get("code")
    return response.get("success") is True or code in (200, "200", 100000, "100000")


def require_success(response: Dict[str, Any], action: str) -> Dict[str, Any]:
    if is_success(response):
        return response
    message = response.get("msg") or response.get("message") or "未知错误"
    raise UploadError("{}失败：{}".format(action, message))


def normalized_api_base(eidp: Dict[str, Any]) -> str:
    base = str(eidp.get("apiBase", "")).strip().rstrip("/")
    if not base.startswith(("http://", "https://")):
        raise UploadError("平台地址必须以 http:// 或 https:// 开头")
    return base


def action_login(eidp: Dict[str, Any], payload: Dict[str, Any]) -> Dict[str, Any]:
    username = str(payload.get("username") or eidp.get("username") or "").strip()
    password = str(payload.get("password") or eidp.get("password") or "")
    if not username or not password:
        raise UploadError("请输入平台账号和密码")
    response = require_success(
        request_json(normalized_api_base(eidp) + "/api/login", "POST", {
            "username": username,
            "password": password,
        }),
        "平台登录",
    )
    token = str(response.get("token") or "")
    if not token:
        raise UploadError("平台登录成功但未返回 token")
    return {"ok": True, "token": token, "username": username}


def require_token(payload: Dict[str, Any]) -> str:
    token = str(payload.get("token") or "").strip()
    if not token:
        raise UploadError("登录已失效，请重新登录平台")
    return token


def action_tasks(eidp: Dict[str, Any], payload: Dict[str, Any]) -> Dict[str, Any]:
    response = require_success(
        request_json(normalized_api_base(eidp) + "/api/taskreview/collection/page", "POST", {
            "current": 1,
            "size": 100,
            "filter": {"taskStatus": 1},
        }, require_token(payload)),
        "读取已发布任务",
    )
    data = response.get("data") or {}
    records = data.get("records") or []
    return {"ok": True, "records": records, "total": data.get("total", len(records))}


def action_instances(eidp: Dict[str, Any], payload: Dict[str, Any]) -> Dict[str, Any]:
    task_id = str(payload.get("taskId") or "").strip()
    if not task_id:
        raise UploadError("请先选择采集任务")
    response = require_success(
        request_json(normalized_api_base(eidp) + "/api/taskreview/instance/page", "POST", {
            "current": 1,
            "size": 100,
            "filter": {"collectionTaskId": task_id},
        }, require_token(payload)),
        "读取场景实例",
    )
    data = response.get("data") or {}
    records = data.get("records") or []
    return {"ok": True, "records": records, "total": data.get("total", len(records))}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        while True:
            block = source.read(1024 * 1024)
            if not block:
                break
            digest.update(block)
    return digest.hexdigest()


def hmac_sha256(key: bytes, message: str) -> bytes:
    return hmac.new(key, message.encode("utf-8"), hashlib.sha256).digest()


def sign_s3_request(secret_key: str, date_stamp: str, region: str,
                    string_to_sign: str) -> str:
    date_key = hmac_sha256(("AWS4" + secret_key).encode("utf-8"), date_stamp)
    region_key = hmac_sha256(date_key, region)
    service_key = hmac_sha256(region_key, "s3")
    signing_key = hmac_sha256(service_key, "aws4_request")
    return hmac.new(signing_key, string_to_sign.encode("utf-8"), hashlib.sha256).hexdigest()


def storage_endpoint(eidp: Dict[str, Any]) -> Tuple[Any, str, str, str]:
    storage = eidp.get("minio") or {}
    endpoint = str(storage.get("endpoint") or "").strip().rstrip("/")
    access_key = str(storage.get("accessKey") or "").strip()
    secret_key = str(storage.get("secretKey") or "")
    bucket = str(storage.get("bucket") or "").strip()
    if not endpoint or not access_key or not secret_key or not bucket:
        raise UploadError("请先填写并保存 MinIO 数据地址、存储桶、访问账号和访问密钥")
    parsed = urlsplit(endpoint)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        raise UploadError("MinIO 数据地址格式无效")
    if parsed.port == 19001:
        raise UploadError("19001 是 MinIO 管理控制台端口，请填写 S3 数据服务端口")
    return parsed, access_key, secret_key, bucket


def put_object_s3(eidp: Dict[str, Any], key: str, source_path: Path,
                  on_progress: Callable[[int], None]) -> None:
    """通过本机配置的 MinIO 数据通道上传，并对网络抖动重试两次。"""
    parsed, access_key, secret_key, bucket = storage_endpoint(eidp)
    region = str((eidp.get("minio") or {}).get("region") or "us-east-1")
    base_path = parsed.path.rstrip("/")
    encoded_bucket = quote(bucket, safe="-_.~")
    encoded_key = quote(key.replace("\\", "/"), safe="/-_.~")
    canonical_uri = (base_path + "/" if base_path else "/") + encoded_bucket + "/" + encoded_key
    file_size = source_path.stat().st_size
    content_type = mimetypes.guess_type(str(source_path))[0] or "application/octet-stream"
    payload_hash = sha256_file(source_path)

    last_error: Optional[Exception] = None
    for attempt in range(3):
        try:
            now = dt.datetime.now(dt.timezone.utc)
            amz_date = now.strftime("%Y%m%dT%H%M%SZ")
            date_stamp = now.strftime("%Y%m%d")
            host = parsed.netloc
            canonical_headers = (
                "content-type:{}\n"
                "host:{}\n"
                "x-amz-content-sha256:{}\n"
                "x-amz-date:{}\n"
            ).format(content_type, host, payload_hash, amz_date)
            signed_headers = "content-type;host;x-amz-content-sha256;x-amz-date"
            canonical_request = "\n".join([
                "PUT", canonical_uri, "", canonical_headers, signed_headers, payload_hash,
            ])
            credential_scope = "{}/{}/s3/aws4_request".format(date_stamp, region)
            string_to_sign = "\n".join([
                "AWS4-HMAC-SHA256", amz_date, credential_scope,
                hashlib.sha256(canonical_request.encode("utf-8")).hexdigest(),
            ])
            signature = sign_s3_request(secret_key, date_stamp, region, string_to_sign)
            authorization = (
                "AWS4-HMAC-SHA256 Credential={}/{}, SignedHeaders={}, Signature={}"
            ).format(access_key, credential_scope, signed_headers, signature)

            connection = (
                http.client.HTTPSConnection(host, timeout=60)
                if parsed.scheme == "https"
                else http.client.HTTPConnection(host, timeout=60)
            )
            connection.putrequest("PUT", canonical_uri, skip_host=True, skip_accept_encoding=True)
            connection.putheader("Host", host)
            connection.putheader("Content-Type", content_type)
            connection.putheader("Content-Length", str(file_size))
            connection.putheader("x-amz-content-sha256", payload_hash)
            connection.putheader("x-amz-date", amz_date)
            connection.putheader("Authorization", authorization)
            connection.endheaders()

            sent = 0
            with source_path.open("rb") as source:
                while True:
                    block = source.read(1024 * 1024)
                    if not block:
                        break
                    connection.send(block)
                    sent += len(block)
                    on_progress(sent)
            response = connection.getresponse()
            response_body = response.read().decode("utf-8", errors="replace")
            connection.close()
            if 200 <= response.status < 300:
                on_progress(file_size)
                return
            raise UploadError("训练平台文件写入 {} 失败（HTTP {}）：{}".format(
                key, response.status, response_body[:300]))
        except (OSError, http.client.HTTPException, UploadError) as exc:
            last_error = exc
            if attempt == 2:
                break
            time.sleep(1 + attempt)
    raise UploadError("上传 {} 失败：{}".format(key, last_error))


def iter_folder_files(folder: Path) -> Iterable[Tuple[Path, str]]:
    """遍历普通文件，不跟随链接目录，防止意外走出用户选择的文件夹。"""
    for root, dirs, names in os.walk(str(folder), followlinks=False):
        dirs[:] = [name for name in dirs if not os.path.islink(os.path.join(root, name))]
        root_path = Path(root)
        for name in sorted(names):
            path = root_path / name
            if path.is_symlink() or not path.is_file():
                continue
            relative = path.relative_to(folder).as_posix()
            yield path, relative


CONVERTED_FOLDER_PATTERN = re.compile(
    r"^(\d{8})_(\d{6})_(lerobot|hdf5|rlds)$", re.IGNORECASE)


def contains_extension(folder: Path, suffix: str) -> bool:
    if not folder.is_dir():
        return False
    expected = suffix.lower()
    return any(path.is_file() and path.suffix.lower() == expected
               for path in folder.rglob("*"))


def dataset_root_error(folder: Path, data_format: str) -> Optional[str]:
    rules = {
        "lerobot": ({"metadata.json"}, {"meta", "data", "videos"}),
        "hdf5": ({"metadata.json", "data.hdf5"}, {"videos"}),
        "rlds": ({"metadata.json"}, {"data", "videos"}),
    }
    allowed_files, allowed_dirs = rules[data_format]
    if data_format == "lerobot":
        complete = (
            (folder / "metadata.json").is_file()
            and (folder / "meta" / "info.json").is_file()
            and (folder / "meta" / "tasks.parquet").is_file()
            and contains_extension(folder / "data", ".parquet")
        )
        if not complete:
            return "LeRobot 转换结果缺少 metadata、info、tasks 或 Parquet 数据"
    elif data_format == "hdf5":
        if not (folder / "metadata.json").is_file() or not (folder / "data.hdf5").is_file():
            return "HDF5 转换结果缺少 metadata.json 或 data.hdf5"
    elif data_format == "rlds":
        if not (folder / "metadata.json").is_file() or not contains_extension(folder / "data", ".tfrecord"):
            return "RLDS 转换结果缺少 metadata.json 或 TFRecord 数据"

    entries = list(folder.iterdir())
    if not entries:
        return "转换结果为空"
    for entry in entries:
        if entry.is_symlink():
            return "转换结果不允许包含符号链接：{}".format(entry.name)
        name = entry.name.lower()
        if entry.is_dir() and name not in allowed_dirs:
            return "转换结果包含非转换器生成的顶层目录：{}".format(entry.name)
        if entry.is_file() and name not in allowed_files:
            return "转换结果包含非转换器生成的顶层文件：{}".format(entry.name)
    return None


def validate_converted_folder(folder: Path) -> str:
    """只接受本项目转换器生成的三种固定目录结构。"""
    match = CONVERTED_FOLDER_PATTERN.fullmatch(folder.name)
    if not match:
        raise UploadError(
            "只允许上传名称为 YYYYMMDD_HHMMSS_lerobot、hdf5 或 rlds 的转换结果")
    try:
        dt.datetime.strptime("{}_{}".format(match.group(1), match.group(2)), "%Y%m%d_%H%M%S")
    except ValueError:
        raise UploadError("转换结果文件夹中的日期时间无效")

    data_format = match.group(3).lower()
    direct_error = dataset_root_error(folder, data_format)
    if direct_error is None:
        return data_format

    entries = list(folder.iterdir())
    if not entries or any(not entry.is_dir() or entry.is_symlink() for entry in entries):
        raise UploadError(direct_error)
    for entry in entries:
        child_error = dataset_root_error(entry, data_format)
        if child_error:
            raise UploadError("转换子目录 {} 校验失败：{}".format(entry.name, child_error))
    return data_format


def infer_camera(relative_path: str, fallback_index: int) -> str:
    lower = relative_path.lower()
    if "kheadcolor" in lower or "head-umi" in lower:
        return "kHeadColor"
    if "khandleftcolor" in lower or "left-umi" in lower:
        return "kHandLeftColor"
    if "khandrightcolor" in lower or "right-umi" in lower:
        return "kHandRightColor"
    return "cam{}".format(fallback_index)


def first_joint_path(files: List[Tuple[Path, str]]) -> Optional[Tuple[Path, str]]:
    for path, relative in files:
        if Path(relative).name.lower() == "joints.json":
            return path, relative
    for path, relative in files:
        name = Path(relative).name.lower()
        if "joint" in name and name.endswith(".json"):
            return path, relative
    return None


def read_duration(folder: Path) -> float:
    metadata_files = [folder / "metadata.json", folder / "meta" / "metadata.json"]
    for metadata_path in metadata_files:
        try:
            data = read_json(metadata_path, {}) or {}
        except UploadError:
            continue
        for key in ("duration", "durationSec", "actualDuration", "recordingDuration"):
            try:
                value = float(data.get(key, 0))
                if value > 0:
                    return value
            except (TypeError, ValueError):
                pass
    return 0.0


def record_time_fields(folder_name: str, duration: float) -> Dict[str, Any]:
    try:
        start = dt.datetime.strptime(folder_name[:15], "%Y%m%d_%H%M%S")
    except ValueError:
        return {}
    end = start + dt.timedelta(seconds=max(duration, 0))
    return {
        "actualStartTime": start.strftime("%Y-%m-%d %H:%M:%S"),
        "actualEndTime": end.strftime("%Y-%m-%d %H:%M:%S"),
    }


def as_platform_id(value: str) -> Any:
    return int(value) if value.isdigit() else value


class ProgressWriter:
    def __init__(self, path: Optional[Path]):
        self.path = path
        self.last_write = 0.0

    def write(self, **fields: Any) -> None:
        if not self.path:
            return
        now = time.monotonic()
        if fields.get("force") or now - self.last_write >= 0.15:
            fields.pop("force", None)
            write_json(self.path, fields)
            self.last_write = now


def action_upload_folder(eidp: Dict[str, Any], payload: Dict[str, Any],
                         progress_path: Optional[Path]) -> Dict[str, Any]:
    token = require_token(payload)
    task_id = str(payload.get("taskId") or "").strip()
    instance_id = str(payload.get("instanceId") or "").strip()
    folder_value = str(payload.get("folderPath") or "").strip()
    if not task_id or not instance_id or not folder_value:
        raise UploadError("请依次登录、选择任务、选择场景实例和转换结果")

    collector = str(eidp.get("collector") or "").strip()
    if not collector:
        raise UploadError("请填写采集员人员名称")

    folder = Path(folder_value).expanduser().resolve()
    if not folder.is_dir():
        raise UploadError("选择的本地文件夹不存在：{}".format(folder))
    folder_name = folder.name.strip()
    if not folder_name or folder_name in (".", "..") or "/" in folder_name or "\\" in folder_name:
        raise UploadError("本地文件夹名称无效")
    validate_converted_folder(folder)

    files = list(iter_folder_files(folder))
    if not files:
        raise UploadError("选择的文件夹为空，没有可上传文件")

    progress = ProgressWriter(progress_path)
    total_bytes = sum(path.stat().st_size for path, _ in files)
    prefix = "COLLECT_DATA/{}/{}/{}/{}".format(
        str(eidp.get("org") or "umi").strip() or "umi", task_id, instance_id, folder_name)
    progress.write(uploading=True, stage="正在扫描文件", file="", filesTotal=len(files),
                   filesDone=0, bytesTotal=total_bytes, bytesDone=0, progress=0.0, force=True)

    joint = first_joint_path(files)
    generated_joint: Optional[Path] = None
    warnings: List[str] = []
    if joint is None:
        staging_dir = (progress_path.parent if progress_path else folder) / "generated_joints"
        staging_dir.mkdir(parents=True, exist_ok=True)
        generated_joint = staging_dir / ("joints_" + uuid.uuid4().hex + ".json")
        write_json(generated_joint, {
            "joint_names": ["left_gripper", "right_gripper"],
            "actions": [],
            "generated_by": "UMI Data Capture Platform",
        })
        joint = generated_joint, "joints.json"
        files.append(joint)
        total_bytes += generated_joint.stat().st_size
        warnings.append("未找到 joints.json，已生成最小关节文件用于平台登记")

    videos: List[Dict[str, str]] = []
    camera_counts: Dict[str, int] = {}
    fallback_index = 0
    for _, relative in files:
        if not relative.lower().endswith(".mp4"):
            continue
        camera = infer_camera(relative, fallback_index)
        if camera.startswith("cam"):
            fallback_index += 1
        camera_counts[camera] = camera_counts.get(camera, 0) + 1
        display_name = camera if camera_counts[camera] == 1 else "{}_{}".format(camera, camera_counts[camera])
        videos.append({"camera": display_name, "url": prefix + "/" + relative})

    bytes_completed = 0
    for index, (path, relative) in enumerate(files, start=1):
        file_size = path.stat().st_size
        current_key = prefix + "/" + relative

        def on_file_progress(sent: int, index=index, relative=relative, file_size=file_size) -> None:
            overall = bytes_completed + sent
            ratio = overall / total_bytes if total_bytes else 1.0
            progress.write(
                uploading=True,
                stage="正在上传文件",
                file=relative,
                filesTotal=len(files),
                filesDone=index - 1,
                bytesTotal=total_bytes,
                bytesDone=overall,
                progress=min(0.92, ratio * 0.92),
            )

        put_object_s3(eidp, current_key, path, on_file_progress)
        bytes_completed += file_size
        progress.write(uploading=True, stage="正在上传文件", file=relative,
                       filesTotal=len(files), filesDone=index, bytesTotal=total_bytes,
                       bytesDone=bytes_completed,
                       progress=min(0.92, (bytes_completed / total_bytes if total_bytes else 1.0) * 0.92),
                       force=True)

    joint_path = prefix + "/" + joint[1]
    duration = read_duration(folder)
    record = {
        "instanceId": as_platform_id(instance_id),
        "collector": collector,
        "dataType": str(eidp.get("dataType") or "1"),
        "dataPath": prefix,
        "fileSize": total_bytes,
        "fileDuration": duration,
        "actualDuration": duration,
        "videos": videos,
        "jointDataPath": joint_path,
    }
    record.update(record_time_fields(folder_name, duration))
    progress.write(uploading=True, stage="正在登记审核记录", file="", filesTotal=len(files),
                   filesDone=len(files), bytesTotal=total_bytes, bytesDone=bytes_completed,
                   progress=0.95, force=True)
    add_response = require_success(
        request_json(normalized_api_base(eidp) + "/api/taskreview/record/add", "POST", record, token),
        "创建采集记录",
    )
    record_id = add_response.get("data")
    if record_id is None:
        raise UploadError("平台未返回 recordId，无法提交审核")

    modify = {
        "recordId": record_id,
        "dataStatus": 31,
        "dataPath": prefix,
        "videos": videos,
        "jointDataPath": joint_path,
    }
    require_success(
        request_json(normalized_api_base(eidp) + "/api/taskreview/record/modify", "POST", modify, token),
        "提交审核记录",
    )

    result = {
        "ok": True,
        "uploading": False,
        "finished": True,
        "stage": "已登记待审核",
        "file": "",
        "filesTotal": len(files),
        "filesDone": len(files),
        "bytesTotal": total_bytes,
        "bytesDone": bytes_completed,
        "progress": 1.0,
        "recordId": record_id,
        "dataPath": prefix,
        "videos": videos,
        "jointDataPath": joint_path,
        "warnings": warnings,
    }
    progress.write(force=True, **result)
    if generated_joint:
        try:
            generated_joint.unlink()
        except OSError:
            pass
        try:
            generated_joint.parent.rmdir()
        except OSError:
            pass
    return result


def execute(action: str, payload: Dict[str, Any], config_path: Path,
            local_config_path: Path, progress_path: Optional[Path]) -> Dict[str, Any]:
    eidp = load_eidp_config(config_path, local_config_path)
    if action == "public_config":
        return public_config(eidp)
    if action == "save_config":
        payload = dict(payload)
        payload["_configPath"] = str(config_path)
        return save_local_config(local_config_path, payload, eidp)
    if action == "login":
        return action_login(eidp, payload)
    if action == "tasks":
        return action_tasks(eidp, payload)
    if action == "instances":
        return action_instances(eidp, payload)
    if action == "upload_folder":
        return action_upload_folder(eidp, payload, progress_path)
    raise UploadError("不支持的平台操作：{}".format(action))


def main() -> int:
    parser = argparse.ArgumentParser(description="UMI 数据平台上传工具")
    parser.add_argument("--config", required=True)
    parser.add_argument("--local-config", required=True)
    parser.add_argument("--job", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--progress")
    args = parser.parse_args()

    out_path = Path(args.out)
    progress_path = Path(args.progress) if args.progress else None
    try:
        job = read_json(Path(args.job))
        if not isinstance(job, dict):
            raise UploadError("平台请求文件格式无效")
        action = str(job.get("action") or "")
        payload = job.get("payload") or {}
        if not isinstance(payload, dict):
            raise UploadError("平台请求参数格式无效")
        result = execute(action, payload, Path(args.config), Path(args.local_config), progress_path)
        write_json(out_path, result)
        return 0
    except Exception as exc:  # 前端需要统一得到可读错误，避免 Python 栈直接暴露。
        message = str(exc) or exc.__class__.__name__
        result = {"ok": False, "uploading": False, "finished": True, "stage": "上传失败", "error": message}
        if progress_path:
            write_json(progress_path, result)
        write_json(out_path, result)
        return 1


if __name__ == "__main__":
    sys.exit(main())
