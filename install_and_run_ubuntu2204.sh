#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "UMI Linux 数据采集平台一键安装和运行脚本"
echo "项目目录：$ROOT_DIR"
echo

cd "$ROOT_DIR"

echo "[1/4] 安装 Ubuntu 22.04 依赖"
bash scripts/bootstrap_ubuntu2204.sh

echo
echo "[2/4] 检查当前用户权限"
NEED_RELOGIN=0
for group_name in dialout video plugdev; do
  if ! id -nG "$USER" | tr ' ' '\n' | grep -qx "$group_name"; then
    sudo usermod -aG "$group_name" "$USER"
    NEED_RELOGIN=1
    echo "已把 $USER 加入 $group_name 组"
  fi
done

if [ "$NEED_RELOGIN" -eq 1 ]; then
  echo
  echo "已更新用户组权限。请重启或注销后重新登录，然后再次运行："
  echo "  cd $ROOT_DIR"
  echo "  bash install_and_run_ubuntu2204.sh"
  exit 0
fi

echo
echo "[3/4] 编译项目"
bash scripts/build_linux.sh

echo
echo "[4/4] 启动服务"
echo "启动后请打开：http://localhost:8080"
bash scripts/run_linux.sh
