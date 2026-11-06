// 05 暖调自然 Organic —— 林下 LINXIA，莫干山的山间民宿（小程序）
// 燕麦米底、原木色块面、鼠尾草绿主按钮、栗色暖墨；标题霞鹜漫黑（手写马克笔感的圆头字）；照片是暖阳下的生活照，加胶片颗粒
const { img, icon, statusBar, miniNav, homeBar } = require('../lib');
const { stylePages } = require('../page');

const C = { oat: '#F2EADD', oat2: '#E6D6BE', wood: '#B98A58', woodL: '#D9BE98', sage: '#7B8A66', sageD: '#5D6B4B', ink: '#3B2F25', ink2: '#87776A', milk: '#FBF6EE' };

// 胶片颗粒：粗一点的灰度噪点，缩到页面上也看得见
const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.56' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncR type='linear' slope='2.6' intercept='-.8'/><feFuncG type='linear' slope='2.6' intercept='-.8'/><feFuncB type='linear' slope='2.6' intercept='-.8'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
const NOISE = `url("data:image/svg+xml,${encodeURIComponent(noiseSvg).replace(/'/g, '%27')}")`;

// 品牌记号：拱门 + 落在门里的半个太阳（原木色）
const mark = (h = 22, c = C.ink, sun = C.wood, sw = 1.6) => `<svg width="${(h * 18) / 22}" height="${h}" viewBox="0 0 18 22" fill="none"><path d="M1.6 21.2V9a7.4 7.4 0 0 1 14.8 0v12.2" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/><path d="M4.4 21.2a4.6 4.6 0 0 1 9.2 0z" fill="${sun}"/></svg>`;

// 舞台：斜射进来的阳光 + 竹叶的虚影
const leaf = (x, y, len, wid, ang) => `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})" d="M0 0C${(len * 0.28).toFixed(1)} ${(-wid).toFixed(1)} ${(len * 0.74).toFixed(1)} ${(-wid * 0.62).toFixed(1)} ${len.toFixed(1)} 0C${(len * 0.74).toFixed(1)} ${(wid * 0.5).toFixed(1)} ${(len * 0.28).toFixed(1)} ${(wid * 0.78).toFixed(1)} 0 0Z"/>`;
function twig(x, y, ang, L, n, s = 1) {
  const r = (ang * Math.PI) / 180;
  const ex = x + Math.cos(r) * L, ey = y + Math.sin(r) * L;
  let o = `<path d="M${x} ${y}Q${((x + ex) / 2 + Math.sin(r) * L * 0.1).toFixed(1)} ${((y + ey) / 2 - Math.cos(r) * L * 0.1).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke-width="${(3.2 * s).toFixed(1)}"/>`;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1), side = i % 2 ? 1 : -1;
    o += leaf(x + (ex - x) * t, y + (ey - y) * t, (78 + ((i * 29) % 26)) * s, 14 * s, ang + side * (34 + ((i * 13) % 14)));
  }
  [-34, -12, 10, 32].forEach((d, k) => { o += leaf(ex, ey, (104 - k * 7) * s, 15 * s, ang + d); });
  return o;
}
const dapple = (w, h, twigs, op = 0.3) => `<svg style="position:absolute;left:0;top:0" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><filter id="x05bl${w}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4.5"/></filter>
<linearGradient id="x05sun${w}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6E6" stop-opacity=".0"/><stop offset=".42" stop-color="#FFF6E6" stop-opacity=".46"/><stop offset=".62" stop-color="#FFF6E6" stop-opacity=".0"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#x05sun${w})"/>
<g transform="skewX(-14)" fill="#5A3A1C" stroke="#5A3A1C" stroke-linecap="round" opacity="${op}" filter="url(#x05bl${w})">${twigs.map((t) => twig(...t)).join('')}</g></svg>`;
const STAGE = 'linear-gradient(122deg,#EBDFCB 0%,#E3D2B7 34%,#D6BA92 68%,#C9A57A 100%)';

const HW = '"LXGW Marker Gothic","PingFang SC",sans-serif';
const css = `
.x05{background:${C.oat};color:${C.ink};font-family:"PingFang SC",-apple-system,sans-serif}
.x05 .hw{font-family:${HW};font-weight:400}
.x05 .ab{position:absolute}
.x05 .wm{display:flex;align-items:center;gap:10px}
.x05 .wm b{font:400 24px/1 ${HW};letter-spacing:.12em;color:${C.ink}}
.x05 .pic{position:absolute;overflow:hidden;background:${C.oat2};isolation:isolate}
.x05 .pic img{width:100%;height:100%;object-fit:cover;filter:sepia(.32) saturate(1.02) contrast(.95) brightness(1.04)}
.x05 .pic::before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,214,160,.22),rgba(190,130,70,.16));mix-blend-mode:soft-light;z-index:1;pointer-events:none}
.x05 .pic::after{content:"";position:absolute;inset:0;background:${NOISE};background-size:300px;mix-blend-mode:overlay;opacity:.5;z-index:2;pointer-events:none}
.x05 .btn{display:flex;align-items:center;justify-content:center;height:56px;border-radius:28px;background:${C.sage};color:${C.milk};font-size:17px;font-weight:500;letter-spacing:.32em;text-indent:.32em}
.x05 .lbl{font-size:12px;color:${C.ink2};letter-spacing:.16em}
.x05 .cb{width:36px;height:36px;border-radius:18px;background:rgba(251,246,238,.92);display:grid;place-items:center;color:${C.ink}}
.x05 .dome{position:absolute;left:0;right:0;bottom:0;z-index:3;background:${C.oat};border-radius:188px 188px 0 0/40px 40px 0 0}

/* hero */
.x05 .h-loc{left:26px;top:584px;font-size:13px;letter-spacing:.42em;color:${C.wood}}
.x05 .h-ttl{left:22px;top:606px;font:400 64px/1 ${HW};letter-spacing:.06em}
.x05 .h-date{left:24px;top:700px;width:327px;height:84px;border-radius:42px;background:${C.oat2};display:flex;align-items:center;padding:0 8px 0 28px}
.x05 .h-date .d b{display:block;font:400 22px/1.15 ${HW};margin-top:6px;letter-spacing:.02em}
.x05 .h-date .mid{display:flex;flex-direction:column;align-items:center;margin:0 14px;color:${C.ink2};font-size:12px;letter-spacing:.1em}
.x05 .h-date .mid b{font:400 20px/1 ${HW};color:${C.ink};letter-spacing:0;margin-right:2px}
.x05 .h-date .mid .arc{margin-top:2px;color:${C.wood}}
.x05 .h-date .go{margin-left:auto;width:68px;height:68px;border-radius:34px;background:${C.sage};color:${C.milk};display:grid;place-items:center;font-size:16px;font-weight:500;letter-spacing:.12em;text-indent:.12em}

/* b1 房间 */
.x05 .b1s{top:478px;padding:48px 24px 0}
.x05 .b1s h2{font:400 31px/1.25 ${HW};letter-spacing:.04em}
.x05 .facts{display:flex;gap:24px;margin-top:16px;font-size:14px;color:${C.ink2}}
.x05 .facts span{display:flex;align-items:center;gap:7px}
.x05 .facts .ic{color:${C.wood}}
.x05 .b1s p{margin-top:20px;font-size:15px;line-height:1.95;letter-spacing:.05em;color:#6A5B4E}
.x05 .bar{position:absolute;left:24px;right:24px;bottom:38px;display:flex;align-items:center;justify-content:space-between}
.x05 .pr b{font:400 34px/1 ${HW}}
.x05 .pr span{font-size:14px;color:${C.ink2};margin-left:6px}
.x05 .sunb{position:absolute;inset:0;z-index:2;pointer-events:none}

/* b2 日历 */
.x05 .mh{left:24px;display:flex;align-items:baseline;gap:12px}
.x05 .mh b{font:400 32px/1 ${HW};letter-spacing:.06em}
.x05 .mh i{font:400 20px/1 ${HW};font-style:normal;color:${C.wood};letter-spacing:.04em}
.x05 .wk,.x05 .cal{position:absolute;left:24px;width:327px;display:grid;grid-template-columns:repeat(7,1fr)}
.x05 .wk{top:172px;font-size:13px;color:${C.ink2};text-align:center}
.x05 .cal{grid-auto-rows:50px}
.x05 .cal span{position:relative;display:grid;place-items:center;font:400 20px/1 ${HW};z-index:1}
.x05 .cal span.off{color:#C9B9A4;text-decoration:line-through;text-decoration-thickness:1px}
.x05 .cal span.s::before{content:"";position:absolute;width:44px;height:44px;border-radius:50%;background:${C.sage};z-index:-1}
.x05 .cal span.s{color:${C.milk}}
.x05 .band{position:absolute;height:44px;border-radius:22px;background:${C.oat2}}
.x05 .sum{background:${C.oat2};height:204px;padding:42px 24px 0}
.x05 .sum .row{display:flex;align-items:baseline;justify-content:space-between}
.x05 .sum .rg{font:400 23px/1.3 ${HW}}
.x05 .sum .n{color:${C.sageD};font-size:14px}
.x05 .sum .n b{font:400 30px/1 ${HW};margin-right:3px}

/* web */
.x05.web .nav{position:absolute;left:80px;right:80px;top:40px;height:48px;display:flex;align-items:center}
.x05.web .nav .wm b{font-size:30px}
.x05.web .nav .wm i{font:500 13px/1 "PingFang SC";font-style:normal;color:${C.wood};letter-spacing:.32em;margin-left:2px}
.x05.web .nav nav{position:absolute;left:560px;display:flex;gap:48px;font-size:16px;color:#6A5B4E;letter-spacing:.12em}
.x05.web .nav .o{margin-left:auto;height:44px;padding:0 24px;border-radius:22px;border:1.2px solid ${C.ink};display:flex;align-items:center;font-size:15px;letter-spacing:.2em}
.x05.web h1{position:absolute;left:640px;top:222px;font:400 78px/1.2 ${HW};letter-spacing:.04em}
.x05.web .bk{position:absolute;left:640px;top:465px;height:88px;border-radius:44px;background:${C.oat2};display:flex;align-items:center;padding:0 10px 0 38px;gap:36px}
.x05.web .bk .d b{display:block;margin-top:6px;font:400 24px/1.2 ${HW}}
.x05.web .bk .lbl{font-size:13px}
.x05.web .bk .go{width:68px;height:68px;border-radius:34px;background:${C.sage};color:${C.milk};display:grid;place-items:center;font-size:16px;font-weight:500;letter-spacing:.12em;text-indent:.12em;margin-left:4px}

/* cmp 半山咖啡 */
.x05 .c-wm{left:24px;top:62px;display:flex;align-items:center;gap:10px}
.x05 .c-wm b{font:400 29px/1 ${HW};letter-spacing:.1em}
.x05 .c-ttl{left:24px;top:462px;right:24px;display:flex;align-items:baseline;justify-content:space-between}
.x05 .c-ttl h2{font:400 44px/1.1 ${HW};letter-spacing:.04em}
.x05 .c-ttl b{font:400 40px/1 ${HW}}
.x05 .c-st{left:24px;top:530px;font-size:15px;color:#6A5B4E;letter-spacing:.06em;display:flex;align-items:center;gap:7px}
.x05 .c-st .ic{color:${C.wood}}
.x05 .c-pt{left:24px;top:648px;width:327px;height:60px;border-radius:30px;background:${C.oat2};display:flex;align-items:center;justify-content:space-between;padding:0 26px}
.x05 .c-pt b{font:400 28px/1 ${HW}}
.x05 .tabs{position:absolute;left:0;right:0;bottom:0;height:86px;display:flex;justify-content:space-around;padding:14px 20px 0;font-size:13px;color:#AD9E8B;letter-spacing:.08em}
.x05 .tabs span{display:flex;flex-direction:column;align-items:center;gap:6px}
.x05 .tabs span.on{color:${C.ink};font-weight:500}
.x05 .tabs span.on::after{content:"";width:5px;height:5px;border-radius:50%;background:${C.sage}}
`;

const arcArrow = `<svg class="arc" width="30" height="12" viewBox="0 0 30 12" fill="none"><path d="M1 10C8 1.6 22 1.6 29 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M24.8 9.7 29 10l.5-4.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ———— 主图：首页 ————
// 拱门：上半圆 + 下面两个大圆角，不描边；里面是清早照进房间的阳光
const hero = `<div class="scr x05">
${statusBar()}${miniNav({ left: `<div class="wm">${mark(26)}</div>` })}
<div class="pic" style="left:24px;top:108px;width:327px;height:452px;border-radius:163.5px 163.5px 32px 32px"><img src="${img('linen-curtain-sun')}" style="object-position:30% 100%;transform:scale(1.32);transform-origin:40% 100%;filter:sepia(.5) saturate(1.05) contrast(1) brightness(.95)"><i style="position:absolute;inset:0;z-index:1;background:linear-gradient(200deg,rgba(150,104,58,.42) 0%,rgba(150,104,58,0) 46%);mix-blend-mode:multiply"></i></div>
<div class="ab h-loc">莫干山</div>
<div class="ab h-ttl">林下</div>
<div class="ab h-date">
  <div class="d"><span class="lbl">入住 · 周五</span><b>11月6日</b></div>
  <div class="mid"><span><b>2</b>晚</span>${arcArrow}</div>
  <div class="d"><span class="lbl">退房 · 周日</span><b>11月8日</b></div>
  <div class="go">预订</div>
</div>
${homeBar()}</div>`;

// ———— 房间详情 ————
// 床照上叠一道斜进来的暖光和竹叶影
const sunOnBed = `<svg class="sunb" width="375" height="546" viewBox="0 0 375 546"><defs><linearGradient id="x05bed" x1="0" y1="0" x2="1" y2=".7"><stop offset=".08" stop-color="#FFD9A0" stop-opacity="0"/><stop offset=".36" stop-color="#FFD9A0" stop-opacity=".34"/><stop offset=".6" stop-color="#FFD9A0" stop-opacity="0"/></linearGradient><filter id="x05bb"><feGaussianBlur stdDeviation="5"/></filter></defs>
<rect width="375" height="546" fill="url(#x05bed)" style="mix-blend-mode:soft-light"/>
<g transform="skewX(-12)" fill="#4A3018" stroke="#4A3018" stroke-linecap="round" opacity=".16" filter="url(#x05bb)">${twig(300, -10, 112, 120, 3, 0.62)}${twig(420, 30, 150, 110, 2, 0.55)}</g></svg>`;
const b1 = `<div class="scr x05">
<div class="pic" style="left:0;top:0;width:375px;height:546px"><img src="${img('bed-linen-white')}" style="object-position:40% 50%;filter:sepia(.52) saturate(.86) contrast(1.02) brightness(1)"><i style="position:absolute;inset:0;z-index:1;background:linear-gradient(200deg,rgba(150,104,58,.4) 0%,rgba(170,120,70,.08) 52%,rgba(150,104,58,.16) 100%);mix-blend-mode:multiply"></i>${sunOnBed}</div>
${statusBar()}${miniNav({ left: `<div class="cb">${icon('chevron-left', 20, 1.8)}</div>` })}
<div class="dome b1s">
  <h2>竹风 · 山景大床房</h2>
  <div class="facts"><span>${icon('bed-double', 18, 1.5)}1.8 米大床</span><span>${icon('maximize', 17, 1.5)}36 ㎡</span><span>${icon('users', 17, 1.5)}2 人</span></div>
  <p>水洗亚麻的床品，晒过山里的太阳。<br>原木床架，是山下的老木匠打的。</p>
  <div class="bar"><div class="pr"><b>¥1,280</b><span>/ 晚</span></div><div class="btn" style="width:150px">预订</div></div>
</div>
${homeBar()}</div>`;

// ———— 选日期 ————
const monthCells = (lead, n, sel = [], off = []) => {
  const a = [];
  for (let i = 0; i < lead; i++) a.push('<span></span>');
  for (let d = 1; d <= n; d++) a.push(`<span class="${sel.includes(d) ? 's' : off.includes(d) ? 'off' : ''}">${d}</span>`);
  return a.join('');
};
const colW = 327 / 7, calTop = 200;
const bandL = 24 + colW * 4.5 - 22, bandR = 24 + colW * 6.5 + 22;
const b2 = `<div class="scr x05">
${statusBar()}${miniNav({ title: '选择日期', left: `<div class="cb" style="background:none">${icon('chevron-left', 22, 1.8)}</div>` })}
<div class="ab mh" style="top:116px"><b>十一月</b><i>2026</i></div>
<div class="wk"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
<div class="band" style="left:${bandL}px;width:${bandR - bandL}px;top:${calTop + 50 + 3}px"></div>
<div class="cal" style="top:${calTop}px">${monthCells(6, 30, [6, 8], [14, 15, 21])}</div>
<div class="ab mh" style="top:524px"><b>十二月</b></div>
<div class="cal" style="top:562px">${monthCells(1, 13)}</div>
<div class="dome sum">
  <div class="row"><span class="lbl">竹风 · 山景大床房</span></div>
  <div class="row" style="margin-top:10px"><span class="rg">11月6日 → 11月8日</span><span class="n"><b>2</b>晚</span></div>
  <div class="btn" style="margin-top:20px">确定</div>
</div>
${homeBar()}</div>`;

// ———— 官网 ————
const web = `<div class="x05 web" style="position:relative;width:1280px;height:800px;overflow:hidden;background:${C.oat}">
<div class="nav"><div class="wm">${mark(30)}<b>林下</b><i>LINXIA</i></div><nav><span>房间</span><span>山居</span><span>吃食</span><span>交通</span></nav><div class="o">联系我们</div></div>
<div class="pic" style="left:80px;top:128px;width:440px;height:720px;border-radius:220px 220px 0 0"><img src="${img('bamboo-leaves-gold')}" style="object-position:100% 100%;transform:scale(1.28);transform-origin:86% 92%;filter:sepia(.36) saturate(1) contrast(1.02) brightness(.97)"></div>
<div class="pic" style="left:428px;top:556px;width:184px;height:184px;border-radius:50%;box-shadow:0 0 0 10px ${C.oat}"><img src="${img('coffee-bed-linen')}" style="object-position:40% 56%;transform:scale(1.5);transform-origin:40% 56%"></div>
<h1>竹林深处<br>六间客房</h1>
<div class="bk">
  <div class="d"><span class="lbl">入住</span><b>11月6日</b></div>
  <div class="d"><span class="lbl">退房</span><b>11月8日</b></div>
  <div class="go">预订</div>
</div>
</div>`;

// ———— 半山咖啡 ————
const cmp = `<div class="scr x05">
${statusBar()}
<div class="ab c-wm">${mark(30)}<b>半山咖啡</b></div>
<div class="pic" style="left:24px;top:116px;width:327px;height:300px;border-radius:163.5px 163.5px 30px 30px"><img src="${img('latte-croissant-wood')}" style="object-position:50% 76%;filter:sepia(.46) saturate(1.08) contrast(1.04) brightness(.92)"><i style="position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(150,104,58,.4) 0%,rgba(150,104,58,0) 42%);mix-blend-mode:multiply"></i></div>
<div class="ab lbl" style="left:24px;top:436px">今日推荐</div>
<div class="ab c-ttl"><h2>桂花拿铁</h2><b>¥28</b></div>
<div class="ab c-st">${icon('map-pin', 16, 1.6)}东四店 · 到店自取约 6 分钟</div>
<div class="ab btn" style="left:24px;top:576px;width:327px">去点单</div>
<div class="ab c-pt"><span class="lbl">会员积分</span><b>1,280</b></div>
<div class="tabs"><span class="on">首页</span><span>菜单</span><span>订单</span><span>我的</span></div>
${homeBar()}</div>`;

// 风格页舞台（540×912）和参考页样例区（936×768）的竹叶影
const decoA = `<div style="position:absolute;inset:0;pointer-events:none;overflow:hidden">${dapple(540, 912, [[-60, 20, 30, 240, 4, 1.5], [600, 150, 168, 230, 3, 1.45], [700, 640, 196, 220, 3, 1.5], [-20, 800, -26, 230, 4, 1.4]])}</div>`;
const decoB = `<div style="position:absolute;inset:0;pointer-events:none;overflow:hidden">${dapple(936, 768, [[-40, 10, 22, 280, 4, 1.5], [1060, 40, 160, 260, 3, 1.45], [1150, 560, 196, 250, 3, 1.4], [420, -80, 64, 170, 2, 1.2]], 0.24)}</div>`;

module.exports = {
  css,
  screens: { 's05-hero': hero, 's05-b1': b1, 's05-b2': b2, 's05-web': web, 's05-cmp': cmp },
  desktop: ['s05-web'],
  // 附录网页页放大区：大标题和预订条
  zoom: [400, 190],
  // ①颜色：原木色日期条和鼠尾草绿按钮之间 ②形状：拱门右肩 ③图片：拱门上沿 ④字体：「林下」右侧
  marks: [[348, 676], [330, 191], [120, 123], [184, 646]],
  palette: [['燕麦米', C.oat], ['鼠尾草绿', C.sage], ['原木色', C.wood], ['浅木', C.oat2], ['栗墨', C.ink]],
  type: { font: HW, weight: 400, sample: '林 Aa', lines: [['标题', '霞鹜漫黑'], ['数字', '霞鹜漫黑'], ['正文', '苹方 常规']] },
  stageA: STAGE,
  decoA,
  stageB: { bg: STAGE, color: C.ink, url: 'linxia.cn', deco: decoB },
  page: (no) => stylePages(no, 's05-organic', module.exports),
};
