#!/bin/bash
# 图标总览：icon_sheet.sh [组名|all] [--stroke 1.5,2.6] [--fill none|tint|solid] [--cap round|square] [--join round|miter] [--dark]
# 把 kit/ 同步到出图目录，在那边用无头 Chrome 出总览图并检查，PNG 拉回 <技能目录>/.sheets/
# 组名见 kit/icons/names.js：actions、objects、people、status；规矩见 kit/icons/SPEC.md
set -e
source "$(dirname "$0")/common.sh"
G=${1:-all}; [ $# -gt 0 ] && shift
remote_ok; sync_kit
OUT="$REMOTE_KIT/icons/.out"
on "$NODE_PATH_CMD; cd '$REMOTE_KIT' && node icons/sheet.js '$G' --out '$OUT' $*" | sed "s|$OUT/|$SKILL/.sheets/|"
mkdir -p "$SKILL/.sheets"
rsync -a --include '*.png' --exclude '*' "$(at "$OUT/")" "$SKILL/.sheets/"
