#!/bin/bash
# 建一个能用的应用项目：new_app.sh <本地项目目录> <风格编号或键> "<品牌名>" [几端]
# 几端：app（手机 App）、mini（小程序）、web（电脑网页）、app+web、mini+web（默认 app+web）
# 例：new_app.sh ~/demos/qingtong-20261113 16 "青桐物业" app+web
# 目录名只用英文、数字、横线（出图目录里同名项目会被覆盖，带上日期）。建好后改 src/ 里的页面和数据、flows.js 里的主流程，再跑 tools/app.sh check
set -e
source "$(dirname "$0")/common.sh"
D=${1:?本地项目目录}; ST=${2:?风格编号或键}; NAME=${3:?品牌名}; ENDS=${4:-app+web}
case "$ST" in [0-9]|[0-9][0-9]) ST=$(ls "$SKILL/kit/styles" | grep -E "^s$(printf %02d $((10#$ST)))-" | head -1 | sed 's/\.js$//');; esac
[ -f "$SKILL/kit/styles/$ST.js" ] || { echo "没有这个风格的起手包：$ST（看 $SKILL/kit/styles/）"; exit 1; }
case "$ENDS" in app|mini|web|app+web|mini+web) ;; *) echo "几端只能写 app、mini、web、app+web、mini+web"; exit 1;; esac
[ -e "$D/app.json" ] && { echo "$D/app.json 已经存在，不覆盖"; exit 1; }
PHONE=${ENDS%%+*}; [ "$PHONE" = web ] && PHONE=''
WEB=''; [[ "$ENDS" == *web ]] && WEB=1
LABEL='手机 App'; [ "$PHONE" = mini ] && LABEL='小程序'
KEY=$(basename "$D")
mkdir -p "$D/img"
cp -R "$SKILL/templates/app/." "$D/"
for f in $(cd "$D" && find app.json flows.js src -type f); do
  F="$D/$f"
  sed -i.bak -e "s/__NAME__/$NAME/g" -e "s/__STYLE__/$ST/g" -e "s/__KEY__/$KEY/g" -e "s/__KIND__/$PHONE/g" -e "s/__LABEL__/$LABEL/g" "$F"
  [ -z "$PHONE" ] && sed -i.bak '/\/\/@phone/d' "$F"
  [ -z "$WEB" ] && sed -i.bak '/\/\/@web/d' "$F"
  { [ -z "$PHONE" ] || [ -z "$WEB" ]; } && sed -i.bak '/\/\/@both/d' "$F"
  sed -i.bak -e 's| *//@phone$||' -e 's| *//@web$||' -e 's| *//@both$||' "$F"
  rm -f "$F.bak"
done
[ -z "$PHONE" ] && rm -f "$D/src/pages/phone.js"
[ -z "$WEB" ] && rm -f "$D/src/pages/admin.js"
echo "建好了：${D}（风格 ${ST}，${ENDS}）。先读 $SKILL/styles/ 里这个风格的说明，再改 src/ 和 flows.js，然后 bash ${SKILL}/tools/app.sh check ${D}"
