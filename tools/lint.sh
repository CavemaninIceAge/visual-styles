#!/bin/bash
# 接口检查：lint.sh [键或编号 …]（不写就查全部）
# 起手包是否符合 起手包约定.md、风格说明结构和色值、样例是否齐。有错退出码 1
set -e
source "$(dirname "$0")/common.sh"
remote_ok; sync_kit
on "mkdir -p '$REMOTE_KIT/.docs/examples'"
rsync -a --delete --exclude '.DS_Store' "$SKILL/styles/" "$(at "$REMOTE_KIT/.docs/styles/")"
rsync -a --delete --exclude '.DS_Store' "$SKILL/examples/" "$(at "$REMOTE_KIT/.docs/examples/")"
on "$NODE_PATH_CMD; cd '$REMOTE_KIT' && node lint.js $*"
