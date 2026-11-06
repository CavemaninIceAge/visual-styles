#!/bin/bash
# 出图：render.sh <本地项目目录> [屏幕编号,…]
# 把项目同步到出图目录 demos/<目录名>/，组装、截图、自动检查，再把 out/ 拉回项目目录
set -e
source "$(dirname "$0")/common.sh"
D="$(cd "${1:?本地项目目录}" && pwd)"; N=$(basename "$D"); R="$REMOTE_DEMOS/$N"
remote_ok; sync_kit
on "mkdir -p '$R'"
rsync -a --delete --exclude out --exclude .chrome --exclude .pack "$D/" "$(at "$R/")"
on "'$REMOTE_KIT/render.sh' '$R' '${2:-}'" | sed "s|$R/|$D/|g"
mkdir -p "$D/out"
rsync -a --delete "$(at "$R/out/")" "$D/out/"
