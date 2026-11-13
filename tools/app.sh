#!/bin/bash
# 能用的应用：app.sh <命令> <本地项目目录> [参数]
#   check   组装（开发版）+ 电脑、手机两种尺寸各走一遍 flows.js 的主流程 + 每屏自动检查；截图拉回 <项目>/out/qa/
#   build   只组装（开发版），看有没有报错
#   pack    组装上线版（字体按用到的字裁好）+ 再检查一遍，成品拉回 <项目>/out/<名字>/，整个文件夹丢到任何静态服务器就能用
#   preview 先 pack，再在本机开一个静态服务器（python3），电脑浏览器打开给出的地址；同一个 Wi-Fi 的手机也能打开
# 例：app.sh check ~/demos/qingtong-20261113；app.sh pack ~/demos/qingtong-20261113 qingtong；app.sh preview ~/demos/qingtong-20261113
set -eo pipefail
source "$(dirname "$0")/common.sh"
CMD=${1:?命令：check、build、pack 或 preview}
D="$(cd "${2:?本地项目目录}" && pwd)"; N=$(basename "$D"); R="$REMOTE_DEMOS/$N"
[ -f "$D/app.json" ] || { echo "$D 里没有 app.json：先用 tools/new_app.sh 建项目"; exit 1; }
remote_ok; sync_kit
on "mkdir -p '$R'"
rsync -a --delete --exclude out --exclude .chrome "$D/" "$(at "$R/")"
run() { on "$NODE_PATH_CMD; cd '$R' && $1" 2>&1 | sed "s|$R/|$D/|g"; }
case "$CMD" in
  build)
    run "node '$REMOTE_KIT/app/build.js' '$R'" ;;
  check)
    st=0
    run "node '$REMOTE_KIT/app/build.js' '$R' && node '$REMOTE_KIT/app/qa.js' '$R'" || st=$?
    mkdir -p "$D/out/qa"
    rsync -a --delete "$(at "$R/out/qa/")" "$D/out/qa/" 2>/dev/null || true
    exit $st ;;
  pack|preview)
    NAME=${3:-$N}
    [ "$CMD" = preview ] && NAME=$N
    st=0
    run "node '$REMOTE_KIT/app/build.js' '$R' --final && node '$REMOTE_KIT/app/qa.js' '$R' --no-shots" || st=$?
    mkdir -p "$D/out/$NAME"
    rsync -a --delete "$(at "$R/out/site/")" "$D/out/$NAME/"
    echo "成品：$D/out/$NAME/（整个文件夹上传到静态网站，打开 index.html 所在的地址）"
    [ "$st" = 0 ] || { echo "检查没过，先改"; exit $st; }
    if [ "$CMD" = preview ]; then
      PORT=${3:-8000}
      IP=$(ipconfig getifaddr en0 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || true)
      echo "电脑上打开：http://localhost:$PORT/"
      [ -n "$IP" ] && echo "同一个 Wi-Fi 的手机打开：http://$IP:$PORT/"
      echo "按 Ctrl+C 停"
      cd "$D/out/$NAME" && exec python3 -m http.server "$PORT"
    fi ;;
  *) echo "不认识的命令：$CMD（check、build、pack、preview）"; exit 1 ;;
esac
