#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

repair_link() {
  local link_path="$1"
  local target_name="$2"
  local link_dir
  link_dir="$(dirname "$link_path")"

  if [ ! -e "$link_dir/$target_name" ]; then
    echo "跳过：目标文件不存在 $link_dir/$target_name" >&2
    return 0
  fi

  if [ -L "$link_path" ]; then
    return 0
  fi

  if [ -e "$link_path" ]; then
    rm -f "$link_path"
  fi

  ln -s "$target_name" "$link_path"
  echo "已修复 SDK 软链接：$link_path -> $target_name"
}

repair_link "$ROOT_DIR/third_party_sdk/orbbec/lib/linux_x64/libOrbbecSDK.so" "libOrbbecSDK.so.2"
repair_link "$ROOT_DIR/third_party_sdk/orbbec/lib/linux_x64/libOrbbecSDK.so.2" "libOrbbecSDK.so.2.7.6"
repair_link "$ROOT_DIR/third_party_sdk/orbbec/lib/linux_x64/extensions/depthengine/libdepthengine.so" "libdepthengine.so.2.0"
