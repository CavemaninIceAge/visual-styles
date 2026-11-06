#!/bin/bash
# 装出图工具：第一次用、换机器时跑一次。同步 kit/，装 npm 依赖和 fonttools，下载字体和图库
# 已经装好的部分会跳过，重复跑没有副作用
set -e
source "$(dirname "$0")/common.sh"
on "mkdir -p '$REMOTE_KIT' '$REMOTE_DEMOS'"
sync_kit
on "set -e; $NODE_PATH_CMD; cd '$REMOTE_KIT'
  [ -d node_modules/lucide-static ] || npm ci --omit=dev --no-audit --no-fund
  [ -x .venv/bin/pyftsubset ] || { python3 -m venv .venv && .venv/bin/pip install -q fonttools brotli; }
  python3 fetch_assets.py
  [ -d assets/总览 ] || node sheet.js
  echo 字体 \$(ls assets/fonts | wc -l) 个、图库 \$(ls assets/img | wc -l) 张、起手包 \$(ls styles/*.js | wc -l) 个"
[ -f "$SKILL/refs/图库/图库总览-0.jpg" ] || rsync -a "$(at "$REMOTE_KIT/assets/总览/")" "$SKILL/refs/图库/"
echo "出图工具就绪：$(at "$REMOTE_KIT")"
