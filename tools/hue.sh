#!/bin/bash
# 量截图某一块的平均色相、饱和度、明度：hue.sh <本地项目目录> <屏幕编号> [x y w h]
# 坐标是 CSS 像素（手机屏 375×812）。先跑过 render.sh
set -eo pipefail
source "$(dirname "$0")/common.sh"
D="$(cd "${1:?本地项目目录}" && pwd)"; N=$(basename "$D"); R="$REMOTE_DEMOS/$N"; ID=${2:?屏幕编号}; shift 2
remote_ok; sync_kit
on "$NODE_PATH_CMD; cd '$REMOTE_KIT' && node hue.js \"\$(ls '$R'/out/png/*-$ID.png | head -1)\" $*"
