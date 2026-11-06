// 10 新粗野主义 Neo-Brutalism —— 造物所 MAKERS，手作工坊（陶艺、木工、银饰课程）
const { img, icon, statusBar, homeBar, phone, browser } = require('../lib');
const { stylePages } = require('../page');

const K = '#111111', Y = '#FFD12E', P = '#FF8AD8', B = '#4D7CFF', G = '#7FE0C4', BG = '#FBF6EC';

// 品牌记号：八角星号（四根粗条旋转）
const AST = (s, c = K) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><g fill="${c}"><rect x="9.6" y="1" width="4.8" height="22"/><rect x="9.6" y="1" width="4.8" height="22" transform="rotate(45 12 12)"/><rect x="9.6" y="1" width="4.8" height="22" transform="rotate(90 12 12)"/><rect x="9.6" y="1" width="4.8" height="22" transform="rotate(135 12 12)"/></g></svg>`;

// 票上的二维码（固定种子，画出来每次一样）
function qr(size) {
  const n = 21; let s = 7; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const fin = (x, y) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  let rects = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if (fin(x, y)) continue; if (r() > 0.52) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }
  const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><g fill="${K}">${rects}${f(0, 0)}${f(n - 7, 0)}${f(0, n - 7)}</g></svg>`;
}

const css = `
.x10{--k:${K};--y:${Y};--p:${P};--b:${B};--g:${G};background:${BG};color:var(--k);font-family:"Noto Sans SC","PingFang SC",sans-serif}
.x10 b,.x10 h1,.x10 h2{color:var(--k)}
.x10 .gr{position:absolute;inset:0;background-image:linear-gradient(rgba(17,17,17,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,.08) 1px,transparent 1px);background-size:25px 25px;background-position:-1px -1px;pointer-events:none}
.x10 .mo{font-family:"Space Mono",monospace}
.x10 .bx{border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)}
.x10 .bx3{border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k)}
.x10 .logo{display:flex;align-items:center;gap:9px}
.x10 .logo .as{width:38px;height:38px;background:var(--y);border:3px solid var(--k);display:grid;place-items:center;box-shadow:3px 3px 0 var(--k)}
.x10 .logo b{font:900 23px/1 "Noto Sans SC";letter-spacing:.02em}
.x10 .tb{position:relative;height:52px;margin:6px 24px 0;display:flex;align-items:center;justify-content:space-between}
.x10 .ib{width:42px;height:42px;background:#fff;display:grid;place-items:center}
.x10 .ph{background-size:cover;background-position:center}
/* 全套照片同一组处理（图册里烘进了 x10-*.jpg，tools/setup.sh 下载到的是未调色的原图）：每张先拉到同一白平衡和曝光，再统一高对比、略降饱和、偏暖，冷色压掉 */
.x10 .fx{filter:none}
.x10 .pw .fx{filter:contrast(1.2) brightness(.94) saturate(1.08)}
.x10 .stk{position:absolute;font:700 24px/1 "Space Mono";letter-spacing:-.02em;padding:9px 12px 8px;border:3px solid var(--k);box-shadow:4px 4px 0 var(--k);white-space:nowrap;z-index:3}
/* hero 课程列表 */
.x10 .wk{position:relative;margin:18px 24px 0;font:700 14px/1 "Space Mono";letter-spacing:.02em}
.x10.hero h1{position:relative;margin:8px 24px 0 21px;font:900 66px/1 "Noto Sans SC";letter-spacing:-.03em}
.x10 .fl{position:relative;margin:20px 24px 0;display:flex;gap:10px}
.x10 .fl span{height:36px;padding:0 14px;border-radius:0;display:flex;align-items:center;font:700 15px/1 "Noto Sans SC";background:#fff}
.x10 .fl span.cur{background:var(--k);color:#fff}
.x10 .cd{position:relative;margin:24px 24px 0;background:#fff}
.x10 .cd .ph{height:168px;border-bottom:3px solid var(--k)}
.x10 .cd .bd{background:var(--y);padding:14px 16px 15px}
.x10 .cd .bd b{display:block;font:900 30px/1.05 "Noto Sans SC";letter-spacing:-.01em}
.x10 .cd .bd span{display:block;margin-top:9px;font:700 13px/1 "Space Mono"}
.x10.hero .stk{right:-10px;top:-16px;background:var(--p);transform:rotate(7deg)}
.x10 .tiles{position:relative;margin:24px 24px 0;display:grid;grid-template-columns:1fr 1fr;gap:18px}
.x10 .tile{height:122px;padding:13px 14px;display:flex;flex-direction:column;justify-content:space-between}
.x10 .tile b{font:900 28px/1 "Noto Sans SC"}
.x10 .tile span{font:700 12px/1 "Space Mono"}
.x10 .tile em{font:700 24px/1 "Space Mono";font-style:normal;letter-spacing:-.02em}
.x10 .tabs{position:absolute;left:0;right:0;bottom:0;height:86px;background:#fff;border-top:3px solid var(--k);display:grid;grid-template-columns:repeat(4,1fr)}
.x10 .tabs>div{height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;font:700 11px/1 "Noto Sans SC";border-left:3px solid var(--k)}
.x10 .tabs>div:first-child{border-left:none}
.x10 .tabs>div.cur{background:var(--y)}
.x10 .tabs:after{content:"";position:absolute;left:0;right:0;top:62px;border-top:3px solid var(--k)}
/* b1 课程详情 */
.x10 .pic{position:relative;margin:14px 24px 0;height:256px}
/* 歪放的照片：黑框 + 实心偏移黑块（用垫在下面的黑块，不用 box-shadow，转角度后边上不会漏缝） */
.x10 .pic::before{content:"";position:absolute;inset:0;background:var(--k);transform:translate(6px,6px)}
.x10 .pic .ph{position:absolute;inset:0;border:3px solid var(--k)}
.x10.dt .pic{transform:rotate(-2.5deg)}
.x10.dt .stk{left:-8px;top:-14px;background:var(--p);transform:rotate(-6deg);font:900 18px/1 "Noto Sans SC";padding:9px 13px}
.x10.dt h1{position:relative;margin:26px 24px 0 21px;font:900 56px/1 "Noto Sans SC";letter-spacing:-.03em}
.x10 .ig{position:relative;margin:20px 24px 0;display:grid;grid-template-columns:1fr 1fr;border:3px solid var(--k);background:#fff}
.x10 .ig>div{padding:11px 13px 12px;border-top:3px solid var(--k)}
.x10 .ig>div:nth-child(-n+2){border-top:none}
.x10 .ig>div:nth-child(even){border-left:3px solid var(--k)}
.x10 .ig span{display:block;font:700 11px/1 "Noto Sans SC";letter-spacing:.04em}
.x10 .ig b{display:block;margin-top:8px;font:700 19px/1 "Space Mono","Noto Sans SC";letter-spacing:-.02em}
.x10 .tch{position:relative;margin:20px 24px 0;display:flex;align-items:center;gap:12px}
.x10 .tch .av{width:48px;height:48px;background:var(--p);display:grid;place-items:center;font:900 24px/1 "Noto Sans SC"}
.x10 .tch b{display:block;font:900 17px/1 "Noto Sans SC"}
.x10 .tch span{display:block;margin-top:6px;font:700 12px/1 "Noto Sans SC"}
.x10 .bb{position:absolute;left:0;right:0;bottom:0;height:104px;background:#fff;border-top:3px solid var(--k);display:flex;align-items:flex-start;justify-content:space-between;padding:16px 24px 0}
.x10 .bb .pr{font:700 34px/46px "Space Mono";letter-spacing:-.03em}
.x10 .bb .pr small{font:700 13px/1 "Noto Sans SC";margin-left:4px}
.x10 .btn{height:50px;padding:0 20px;background:var(--y);display:flex;align-items:center;gap:8px;font:900 18px/1 "Noto Sans SC"}
/* b2 报名成功 */
.x10.tk h1{position:relative;margin:18px 24px 0 21px;font:900 60px/1 "Noto Sans SC";letter-spacing:-.03em}
.x10 .ok{position:absolute;right:28px;top:118px;width:62px;height:62px;border-radius:50%;background:var(--g);display:grid;place-items:center;transform:rotate(-10deg)}
.x10 .tkt{position:relative;margin:28px 26px 0 24px;transform:rotate(-1.5deg);background:#fff}
.x10 .tkt .pt1{position:relative;background:var(--p);padding:18px 18px 18px;border-bottom:3px dashed var(--k)}
.x10 .tkt .pt1 .mo{font:700 12px/1 "Space Mono";letter-spacing:.06em}
.x10 .tkt .pt1 b{display:block;margin-top:12px;font:900 44px/1 "Noto Sans SC";letter-spacing:-.02em}
.x10 .tkt .pt1 span{display:block;margin-top:12px;font:700 16px/1 "Space Mono"}
.x10 .tkt .nt{position:absolute;bottom:-13.5px;width:24px;height:24px;border-radius:50%;background:${BG};border:3px solid var(--k);z-index:2}
.x10 .tkt .nt.l{left:-21.5px}.x10 .tkt .nt.r{right:-21.5px}
.x10 .tkt .pt2{position:relative;display:grid;grid-template-columns:1fr 1fr;border-bottom:3px dashed var(--k)}
.x10 .tkt .pt2>div{padding:13px 18px 14px}
.x10 .tkt .pt2>div+div{border-left:3px solid var(--k)}
.x10 .tkt .pt2 .w2x{grid-column:1/3;border-left:none!important;border-top:3px solid var(--k)}
.x10 .tkt span.lb2{display:block;font:700 11px/1 "Noto Sans SC";letter-spacing:.04em}
.x10 .tkt .pt2 b{display:block;margin-top:8px;font:900 19px/1.15 "Noto Sans SC"}
.x10 .tkt .pt3{display:flex;align-items:center;gap:18px;padding:16px 18px}
.x10 .tkt .pt3 .qr{padding:5px;border:3px solid var(--k);line-height:0}
.x10 .tkt .pt3 .no{font:700 34px/1 "Space Mono";letter-spacing:-.02em}
.x10 .tkt .pt3 .no small{display:block;margin-bottom:8px;font:700 11px/1 "Noto Sans SC"}
.x10.tk .stk{right:-12px;top:-20px;background:var(--y);transform:rotate(8deg);font:900 17px/1 "Noto Sans SC";padding:9px 11px}
.x10 .wide{position:absolute;left:24px;right:30px;bottom:42px;height:58px;display:flex;align-items:center;justify-content:center;gap:10px;font:900 19px/1 "Noto Sans SC";background:var(--y)}
/* 半山咖啡 */
.x10.cmp .bn{position:relative;margin:8px 24px 0;display:flex;align-items:center;justify-content:space-between}
.x10.cmp .bn b{background:var(--y);font:900 27px/1 "Noto Sans SC";padding:9px 12px 8px;letter-spacing:.02em}
.x10.cmp .bn span{font:700 14px/1 "Space Mono";letter-spacing:.12em}
.x10.cmp .pic{margin-top:22px;height:316px;transform:rotate(-2deg)}
/* 半山咖啡这张在同一组调色上再做闪光灯直打的样子（已烘进图）：背景打到全白、杯子锐利、暗部压深 */
.x10.cmp .pic .ph{background-position:50% 50%}
.x10.cmp .stk{right:-10px;bottom:-20px;background:var(--p);transform:rotate(-7deg);font-size:30px}
.x10.cmp .tg{position:relative;display:inline-block;margin:30px 24px 0;background:var(--k);color:#fff;font:700 13px/1 "Noto Sans SC";padding:6px 9px;letter-spacing:.1em}
.x10.cmp h1{position:relative;margin:10px 24px 0 21px;font:900 58px/1 "Noto Sans SC";letter-spacing:-.03em}
.x10.cmp .st{position:relative;margin:14px 24px 0;font:700 14px/1 "Noto Sans SC"}
.x10.cmp .acts{position:relative;margin:22px 24px 0;display:grid;grid-template-columns:1fr 118px;gap:16px}
.x10.cmp .acts .btn{height:64px;justify-content:center;font-size:23px}
.x10.cmp .jf{height:64px;background:var(--b);padding:10px 12px}
.x10.cmp .jf span{display:block;font:700 11px/1 "Noto Sans SC";color:var(--k)}
.x10.cmp .jf b{display:block;margin-top:7px;font:700 24px/1 "Space Mono";letter-spacing:-.03em}
/* web */
.x10.web{background:${BG}}
.x10 .wn{position:relative;height:86px;border-bottom:3px solid var(--k);display:flex;align-items:center;padding:0 40px;background:#fff}
.x10 .wn .logo .as{width:46px;height:46px}
.x10 .wn .logo b{font-size:28px}
.x10 .wn .logo .mo{font:700 15px/1 "Space Mono";margin-left:6px;letter-spacing:.1em}
.x10 .wn nav{display:flex;gap:40px;margin-left:auto;margin-right:40px;font:700 17px/1 "Noto Sans SC"}
.x10 .wn .btn{height:50px;font-size:17px}
.x10 .w1{position:absolute;left:0;right:0;top:86px;height:420px;display:grid;grid-template-columns:1fr 440px;border-bottom:3px solid var(--k)}
.x10 .w1 .big{position:relative;padding:40px 40px 0}
.x10 .w1 .big h2{font:900 170px/1 "Noto Sans SC";letter-spacing:-.05em;margin-left:-8px}
.x10 .w1 .big .mo{margin-top:26px;font:700 17px/1.7 "Space Mono"}
.x10 .w1 .badge{position:absolute;right:56px;top:46px;width:150px;height:150px;border-radius:50%;background:var(--y);display:grid;place-items:center;transform:rotate(14deg)}
.x10 .w1 .pw{position:relative;border-left:3px solid var(--k);background:var(--y)}
.x10 .w1 .pw .gr{background-size:32px 32px}
.x10 .w1 .pf{position:absolute}
.x10 .w1 .pf::before{content:"";position:absolute;inset:0;background:var(--k);transform:translate(8px,8px)}
.x10 .w1 .pf .ph{position:absolute;inset:0;border:3px solid var(--k)}
.x10 .w1 .stk{left:28px;bottom:36px;background:var(--p);transform:rotate(-8deg);font-size:30px}
.x10 .w2c{position:absolute;left:0;right:0;top:509px;bottom:0;display:grid;grid-template-columns:repeat(3,1fr)}
.x10 .w2c>div{position:relative;padding:28px 36px;border-left:3px solid var(--k)}
.x10 .w2c>div:first-child{border-left:none}
.x10 .w2c b{display:block;font:900 72px/1 "Noto Sans SC";letter-spacing:-.03em}
.x10 .w2c span{display:block;margin-top:18px;font:700 16px/1 "Space Mono"}
.x10 .w2c em{display:block;margin-top:14px;font:700 38px/1 "Space Mono";font-style:normal;letter-spacing:-.03em}
.x10 .w2c .go{position:absolute;right:30px;bottom:30px;width:56px;height:56px;background:#fff;display:grid;place-items:center}
`;

const logo = (mo = '') => `<div class="logo"><span class="as">${AST(20)}</span><b>造物所</b>${mo}</div>`;
const tabs = (items, cur) => `<div class="tabs">${items.map(([ic, t], i) => `<div class="${i === cur ? 'cur' : ''}">${icon(ic, 21, 2.4)}<span>${t}</span></div>`).join('')}</div>`;

const hero = `<div class="scr x10 hero"><div class="gr"></div>${statusBar()}
<div class="tb">${logo()}<div class="ib bx3">${icon('search', 20, 2.6)}</div></div>
<div class="wk">WEEK 44 / 10.26 — 11.01</div>
<h1>本周课程</h1>
<div class="fl"><span class="bx3 cur">全部</span><span class="bx3" style="background:${P}">陶艺</span><span class="bx3" style="background:${B}">木工</span><span class="bx3" style="background:${G}">银饰</span></div>
<div class="cd bx"><div class="ph fx" style="background-image:url(${img('x10-pottery-wheel-topdown')});background-position:50% 84%"></div><div class="bd"><b>陶艺拉坯</b><span>周六 14:00 · 3 小时 · 剩 4 位</span></div><div class="stk">¥268</div></div>
<div class="tiles"><div class="tile bx" style="background:${B}"><b>木工</b><span>周日 10:00</span><em>¥398</em></div><div class="tile bx" style="background:${G}"><b>银饰</b><span>周六 19:00</span><em>¥328</em></div></div>
${tabs([['layout-grid', '课程'], ['calendar', '预约'], ['heart', '收藏'], ['user', '我的']], 0)}
${homeBar()}</div>`;

const b1 = `<div class="scr x10 dt"><div class="gr"></div>${statusBar()}
<div class="tb"><div class="ib bx3">${icon('arrow-left', 22, 2.6)}</div><div class="ib bx3">${icon('heart', 20, 2.6)}</div></div>
<div class="pic"><div class="ph fx" style="background-image:url(${img('x10-pottery-wheel-hands')});background-position:58% 50%"></div><div class="stk">陶艺</div></div>
<h1>陶艺拉坯</h1>
<div class="ig"><div><span>时间</span><b>周六 14:00</b></div><div><span>时长</span><b>3 小时</b></div><div><span>地点</span><b>798 · B 座</b></div><div style="background:${Y}"><span>名额</span><b>剩 4 位</b></div></div>
<div class="tch"><div class="av bx3">许</div><div><b>许晓</b><span>陶艺师 · 带课 8 年</span></div></div>
<div class="bb"><div class="pr">¥268<small>/人</small></div><div class="btn bx3">立即报名${icon('arrow-right', 20, 2.8)}</div></div>
${homeBar()}</div>`;

const b2 = `<div class="scr x10 tk"><div class="gr"></div>${statusBar()}
<div class="tb"><div class="ib bx3">${icon('x', 22, 2.6)}</div><div class="ib bx3">${icon('share-2', 20, 2.6)}</div></div>
<h1>报名成功</h1>
<div class="ok bx3">${icon('check', 34, 3.4)}</div>
<div class="tkt bx">
<div class="pt1"><div class="mo">MAKERS · 造物所</div><b>陶艺拉坯</b><span>10.31 周六 14:00</span><i class="nt l"></i><i class="nt r"></i></div>
<div class="pt2"><div><span class="lb2">座位</span><b>3 号拉坯机</b></div><div><span class="lb2">老师</span><b>许晓</b></div><div class="w2x"><span class="lb2">地点</span><b>798 艺术区 B 座 2 层</b></div><i class="nt l"></i><i class="nt r"></i></div>
<div class="pt3"><div class="qr">${qr(92)}</div><div class="no"><small>入场码</small>0142</div></div>
<div class="stk">已付 ¥268</div>
</div>
<div class="wide bx">${icon('calendar-plus', 22, 2.6)}加入日历</div>
${homeBar()}</div>`;

const web = `<div class="x10 web" style="position:relative;width:1280px;height:800px;overflow:hidden"><div class="gr" style="background-size:32px 32px"></div>
<div class="wn">${logo('<span class="mo">MAKERS</span>')}<nav><span>课程</span><span>作品</span><span>礼品卡</span><span>团建</span></nav><div class="btn bx3">预约课程</div></div>
<div class="w1"><div class="big"><h2>造物所</h2><div class="mo">北京 798 艺术区 B 座 2 层<br>周二至周日 10:00 — 21:00</div><div class="badge bx">${AST(92)}</div></div>
<div class="pw"><div class="gr"></div><div class="pf" style="left:34px;top:30px;width:326px;height:226px;transform:rotate(-4deg)"><div class="ph fx" style="background-image:url(${img('x10-pottery-tools-clay')});background-position:50% 50%"></div></div><div class="pf" style="left:180px;top:190px;width:230px;height:162px;transform:rotate(5deg)"><div class="ph fx" style="background-image:url(${img('x10-woodworker-sawdust')});background-position:55% 60%"></div></div><div class="stk">¥268 起</div></div></div>
<div class="w2c">
<div style="background:${P}"><b>陶艺</b><span>周六 14:00 · 3 小时</span><em>¥268</em><div class="go bx3">${icon('arrow-up-right', 26, 2.8)}</div></div>
<div style="background:${B}"><b>木工</b><span>周日 10:00 · 4 小时</span><em>¥398</em><div class="go bx3">${icon('arrow-up-right', 26, 2.8)}</div></div>
<div style="background:${G}"><b>银饰</b><span>周六 19:00 · 2.5 小时</span><em>¥328</em><div class="go bx3">${icon('arrow-up-right', 26, 2.8)}</div></div>
</div></div>`;

const cmp = `<div class="scr x10 cmp"><div class="gr"></div>${statusBar()}
<div class="bn"><b class="bx3">半山咖啡</b><span>BANSHAN</span></div>
<div class="pic"><div class="ph fx" style="background-image:url(${img('x10-cups-handmade-stack')});background-size:118% auto;background-position:50% 44%"></div><div class="stk">¥28</div></div>
<div class="tg">今日推荐</div>
<h1>桂花拿铁</h1>
<div class="st">东四店 · 到店自取约 6 分钟</div>
<div class="acts"><div class="btn bx">去点单${icon('arrow-right', 22, 3)}</div><div class="jf bx"><span>会员积分</span><b>1,280</b></div></div>
${tabs([['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user', '我的']], 0)}
${homeBar()}</div>`;

// 舞台：网格纸 + 设备投下实心黑影
const gridBg = (c) => `<div style="position:absolute;inset:0;background-image:linear-gradient(${c} 2px,transparent 2px),linear-gradient(90deg,${c} 2px,transparent 2px);background-size:54px 54px;background-position:-1px -1px"></div>`;
const shadow = (x, y, w, h, r) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;background:${K}"></div>`;

const stageBHtml = () => `${shadow(100, 104, 760, 513, 16)}<div style="position:absolute;left:88px;top:92px">${browser(web, { w: 760, url: 'makers.studio' })}</div>
${shadow(40, 310, 220, 460, 33)}<div style="position:absolute;left:30px;top:300px">${phone(b1, { w: 206 })}</div>
${shadow(698, 286, 220, 460, 33)}<div style="position:absolute;left:688px;top:276px">${phone(b2, { w: 206 })}</div>`;

module.exports = {
  css,
  screens: { 's10-hero': hero, 's10-b1': b1, 's10-b2': b2, 's10-web': web, 's10-cmp': cmp },
  desktop: ['s10-web'],
  marks: [[354, 500], [352, 252], [322, 196], [187, 698]],
  // 附录放大区：网页左半格整块（「造物所」大字 + 星号贴纸 + 地址），右边照片格从 840 起，不被切
  zoom: [0, 88],
  palette: [['柠檬黄', Y], ['泡泡粉', P], ['钴蓝', B], ['薄荷', G], ['纯黑', K]],
  type: { font: '"Noto Sans SC"', weight: 900, sample: '造 Aa', lines: [['标题', '思源黑体 粗'], ['数字', 'Space Mono'], ['正文', '思源黑体']] },
  stageA: P,
  decoA: gridBg('rgba(17,17,17,.13)') + shadow(99, 80, 374, 784, 56),
  stageB: { bg: P, color: K, url: 'makers.studio', deco: gridBg('rgba(17,17,17,.13)'), html: stageBHtml() },
  page: (no) => stylePages(no, 's10-brutal', module.exports),
};
