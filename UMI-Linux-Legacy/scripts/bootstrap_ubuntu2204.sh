#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[1/4] Updating apt index"
sudo apt update

echo "[2/4] Installing build tools and runtime libraries"
sudo apt install -y \
  build-essential \
  cmake \
  ninja-build \
  pkg-config \
  git \
  curl \
  unzip \
  python3 \
  python3-pip \
  python3-venv \
  libopencv-dev \
  libeigen3-dev \
  libusb-1.0-0-dev \
  libudev-dev \
  can-utils

echo "[3/4] Installing Python dependencies"
python3 -m pip install --user --upgrade pip
python3 -m pip install --user -r "$ROOT_DIR/project/requirements.txt"

echo "[4/4] Repairing SDK symbolic links"
bash "$ROOT_DIR/scripts/repair_sdk_links.sh"

echo "Done"
echo "Next:"
echo "  cp .env.example .env"
echo "  nano .env"
echo "  bash scripts/build_linux.sh"
