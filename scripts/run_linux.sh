#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_DIR="$ROOT_DIR/project"

if [ -f "$ROOT_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT_DIR/.env"
  set +a
fi

export LD_LIBRARY_PATH="$ROOT_DIR/third_party_sdk/hikvision/lib:${ORBBEC_SDK_DIR:-$ROOT_DIR/third_party_sdk/orbbec}/lib/linux_x64:${LD_LIBRARY_PATH:-}"

cd "$PROJECT_DIR"
if [ -x ./build/ManualGripper ]; then
    exec ./build/ManualGripper
else
    echo "错误：找不到 ManualGripper 可执行文件" >&2
    echo "请先运行 cmake -S . -B build && cmake --build build 编译" >&2
    exit 1
fi
