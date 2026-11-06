#!/bin/bash
# 出图：render.sh <项目目录> [屏幕编号,…]
# 产出 <项目目录>/out/：png/NN-编号.png（每屏 2 倍图）、board.png（展示板）、check.json（自动检查）
# 只用无头 Chrome，不开窗口、不抢焦点
P=${1:?项目目录}; ONLY=$2
export PATH=$PATH:/opt/homebrew/opt/node@24/bin:/opt/homebrew/bin:/usr/local/bin
K="$(cd "$(dirname "$0")" && pwd)"
cd "$P" || exit 1
node "$K/build.js" "$P" || exit 1
CH=$(node -e "process.stdout.write(require(process.argv[1]).CHROME||'')" "$K/shot.js")
[ -n "$CH" ] || { echo "找不到 Chrome：装 Google Chrome 或 Chromium，或者设环境变量 CHROME"; exit 1; }
F=(--headless=new --disable-gpu --hide-scrollbars "--user-data-dir=$P/.chrome" --virtual-time-budget=9000 --run-all-compositor-stages-before-draw)
mkdir -p out/png
[ -z "$ONLY" ] && rm -f out/png/*.png
# 截图用 shot.js（Chrome 调试协议，视口精确）。别改回 chrome --screenshot：新版无头模式截出来底部会卷回页面顶部
node "$K/shot.js" "$P" "$ONLY" || exit 1
"$CH" "${F[@]}" --window-size=1400,1000 --dump-dom "file://$PWD/out/screens.html?check=1" 2>/dev/null | python3 -c "
import sys,re,json,html
m=re.search(r'<pre id=\"report\">(.*?)</pre>',sys.stdin.read(),re.S)
if not m: print('自动检查没跑出结果'); sys.exit(0)
d=json.loads(html.unescape(m.group(1)))
json.dump(d,open('out/check.json','w'),ensure_ascii=False,indent=1)
n=0
for k,v in d.items():
  q=v['问题']; n+=len(q)
  print(f'{k}：{v[\"元素\"]} 个元素' + ('' if not q else '，' + str(len(q)) + ' 处问题'))
  for x in q[:12]: print(f'   {x[\"t\"]}「{x[\"s\"]}」{x[\"d\"]}')
  if len(q)>12: print(f'   …还有 {len(q)-12} 处，见 out/check.json')
print('自动检查：' + ('没有问题' if n==0 else f'共 {n} 处，逐条看；故意出界的元素加 data-bleed'))
"
ls out/png/*.png out/board.png 2>/dev/null | sed "s|^|$PWD/|"
