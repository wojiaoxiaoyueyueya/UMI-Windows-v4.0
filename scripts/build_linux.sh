#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_DIR="$ROOT_DIR/project"
BUILD_DIR="$PROJECT_DIR/build-linux"

cd "$PROJECT_DIR"
cmake -S . -B "$BUILD_DIR" -G Ninja \
  -DCMAKE_BUILD_TYPE=Release

cmake --build "$BUILD_DIR"

echo "Build finished: $BUILD_DIR"
