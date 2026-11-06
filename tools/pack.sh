#!/bin/bash
# 打包可点击演示：pack.sh <本地项目目录> "<文件名，不带 .html>"
# 先跑过 render.sh。产出 out/<文件名>.html：图片和用到的字都内嵌，单文件发出去就能点
set -eo pipefail
source "$(dirname "$0")/common.sh"
D="$(cd "${1:?本地项目目录}" && pwd)"; N=$(basename "$D"); R="$REMOTE_DEMOS/$N"; NAME=${2:-demo}
remote_ok; sync_kit
rsync -a --delete --exclude out --exclude .chrome --exclude .pack "$D/" "$(at "$R/")"
on "$NODE_PATH_CMD; cd '$R' && node '$REMOTE_KIT/build.js' '$R' >/dev/null && cd '$REMOTE_KIT' && node pack.js '$R' '$NAME' && node clicks.js '$R' '$NAME'" | sed "s|$R/|$D/|g"
mkdir -p "$D/out" && rsync -a "$(at "$R/out/$NAME.html")" "$D/out/"
echo "成品：$D/out/$NAME.html"
