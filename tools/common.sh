# 公用设置（被其他脚本 source）
SKILL="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/.." && pwd)"
# 默认在本机出图。要放到另一台 Mac 上跑，照 tools/config.example.sh 建 tools/config.local.sh
[ -f "$SKILL/tools/config.local.sh" ] && source "$SKILL/tools/config.local.sh"
REMOTE_HOST=${REMOTE_HOST:-}
VS_ROOT=${VS_ROOT:-$HOME/.cache/visual-styles}
REMOTE_KIT=${REMOTE_KIT:-$VS_ROOT/kit}
REMOTE_DEMOS=${REMOTE_DEMOS:-$VS_ROOT/demos}
NODE_PATH_CMD=${NODE_PATH_CMD:-'export PATH=$PATH:/opt/homebrew/opt/node@24/bin:/opt/homebrew/bin:/usr/local/bin'}
on() { if [ -n "$REMOTE_HOST" ]; then ssh "$REMOTE_HOST" "$1"; else bash -c "$1"; fi; }
at() { if [ -n "$REMOTE_HOST" ]; then echo "$REMOTE_HOST:$1"; else echo "$1"; fi; }
remote_ok() { on "test -d '$REMOTE_KIT/assets/fonts'" || { echo "找不到出图工具目录 $REMOTE_KIT：先跑 tools/setup.sh"; exit 1; }; }
sync_kit() { on "mkdir -p '$REMOTE_KIT'"; rsync -a --exclude '.DS_Store' "$SKILL/kit/" "$(at "$REMOTE_KIT/")"; on "chmod +x '$REMOTE_KIT/render.sh'"; }
