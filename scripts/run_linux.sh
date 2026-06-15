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

bash "$ROOT_DIR/scripts/repair_sdk_links.sh"

cd "$PROJECT_DIR"
if [ -x ./build-linux/ManualGripper ]; then
    exec ./build-linux/ManualGripper
fi

if [ -x ./build/ManualGripper ]; then
    exec ./build/ManualGripper
fi

echo "错误：找不到 ManualGripper 可执行文件" >&2
echo "请先在仓库根目录运行：bash scripts/build_linux.sh" >&2
exit 1
