#!/bin/bash
# 建一个 demo 项目：new_demo.sh <本地项目目录> <风格编号或键> "<品牌名>" [mini|app|web]
# 例：new_demo.sh ~/demos/songjian-20261106 05 "松间民宿" mini
# 目录名只用英文、数字、横线（出图目录里同名项目会被覆盖，带上日期）
set -e
source "$(dirname "$0")/common.sh"
D=${1:?本地项目目录}; ST=${2:?风格编号或键}; NAME=${3:?品牌名}; KIND=${4:-app}
case "$ST" in [0-9]|[0-9][0-9]) ST=$(ls "$SKILL/kit/styles" | grep -E "^s$(printf %02d $((10#$ST)))-" | head -1 | sed 's/\.js$//');; esac
[ -f "$SKILL/kit/styles/$ST.js" ] || { echo "没有这个风格的起手包：$ST（看 $SKILL/kit/styles/）"; exit 1; }
[ -e "$D/demo.js" ] && { echo "$D/demo.js 已经存在，不覆盖"; exit 1; }
mkdir -p "$D/img"
sed -e "s/__STYLE__/$ST/g" -e "s/__NAME__/$NAME/g" -e "s/__KIND__/$KIND/g" "$SKILL/templates/demo.js" > "$D/demo.js"
echo "建好了：${D}/demo.js（风格 ${ST}，${KIND}）。先读 ${SKILL}/styles/ 里这个风格的说明，再改屏幕。"
