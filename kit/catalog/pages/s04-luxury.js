const { img, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

// 玄白 XUANBAI：大理洱海边、苍山脚下的精品酒店
// 黑 #0D0C0B、象牙 #F2EDE4、烟灰 #8C877E；金色只做一条细线 #B49A6A
const css = `
.x04{--k:#0D0C0B;--iv:#F2EDE4;--sm:#8C877E;--au:#B49A6A;--bd:"Bodoni Moda",Didot,serif;--sg:"Noto Serif SC","Songti SC",serif}
.x04.scr{background:var(--k);color:var(--iv);font-family:var(--sg);font-weight:300}
.x04 .bg{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat;filter:grayscale(1) sepia(.07) contrast(1.08) brightness(.86)}
.x04 .veil{position:absolute;inset:0}
.x04 .abs{position:absolute;left:28px;right:28px}
.x04 .tb4{position:absolute;left:0;right:0;top:50px;height:60px;display:flex;align-items:center;justify-content:center;z-index:4}
.x04 .tb4 .l{position:absolute;left:24px;top:0;height:60px;display:flex;align-items:center}
.x04 .tb4 .r{position:absolute;right:24px;top:0;height:60px;display:flex;align-items:center;font:400 12px/1 var(--bd);letter-spacing:.24em}
.x04 .wm{text-align:center;font-family:var(--bd);font-weight:400;line-height:1}
.x04 .wm i{display:block;font-style:normal;font:300 9px/1 var(--sg);letter-spacing:1.1em;padding-left:1.1em;margin-top:9px;opacity:.82}
.x04 .wm b{display:block;font-weight:400;font-size:23px;letter-spacing:.36em;padding-left:.36em;font-variation-settings:"opsz" 18}
.x04 .wm.w1 b{font-size:15px;letter-spacing:.4em;padding-left:.4em;font-variation-settings:"opsz" 14}
.x04 .fo{display:flex;align-items:center;gap:12px;font:400 13px/1 var(--bd);letter-spacing:.12em}
.x04 .fo i{width:44px;height:1px;background:currentColor;opacity:.45}
.x04 .fo em{font-style:normal;opacity:.5}
.x04 .pg{position:absolute;right:24px;top:318px;display:flex;flex-direction:column;align-items:center;gap:12px;font:400 13px/1 var(--bd);letter-spacing:.06em;color:var(--iv)}
.x04 .pg i{width:1px;height:72px;background:currentColor;opacity:.5}
.x04 .pg em{font-style:normal;opacity:.55}
.x04 .nm{font-family:var(--sg);font-weight:200;font-size:38px;line-height:1.15;letter-spacing:.16em}
.x04 .en{font:italic 400 20px/1.2 var(--bd);font-variation-settings:"opsz" 48;letter-spacing:.01em;opacity:.8}
.x04 .au{display:block;width:36px;height:1px;background:var(--au)}
.x04 .btn{height:52px;border:1px solid rgba(242,237,228,.86);display:flex;align-items:center;justify-content:center;font:300 14px/1 var(--sg);letter-spacing:.42em;padding-left:.42em}
.x04 .btn.dk{border-color:var(--k);color:var(--k)}
.x04.scr:not(.iv) .wm,.x04.scr:not(.iv) .nm,.x04.web .wm{color:#fff}
.x04 .ln4{height:1px;background:rgba(242,237,228,.18)}
.x04 .yen{font-family:var(--sg);font-weight:200;font-size:.62em;margin-right:.12em;vertical-align:.32em}
/* 象牙底 */
.x04.iv{background:var(--iv);color:var(--k)}
.x04 .pic{position:absolute;left:0;right:0;overflow:hidden}
.x04 .pic .bg{filter:grayscale(1) sepia(.06) contrast(1.05) brightness(1.06)}
.x04 .sp4{font:300 14px/1 var(--sg);letter-spacing:.14em;color:#6F6A62;display:flex;gap:12px;align-items:center;white-space:nowrap}
.x04 .sp4 i{width:1px;height:11px;background:#B9B3A8}
/* 预订确认 */
.x04 .dt{display:flex;align-items:flex-end;justify-content:space-between}
.x04 .dt b{font:400 76px/.9 var(--bd);font-variation-settings:"opsz" 96;letter-spacing:-.01em}
.x04 .dt span{font:300 13px/1.6 var(--sg);letter-spacing:.2em;color:var(--sm);text-align:right;padding-bottom:6px}
.x04 .rows .rw{display:flex;justify-content:space-between;align-items:center;height:50px;border-top:1px solid rgba(242,237,228,.16);font:300 14px/1 var(--sg);letter-spacing:.12em}
.x04 .rows .rw span{color:var(--sm)}
.x04 .rows .rw b{font-weight:300}
.x04 .rows .rw b.n{font:400 14px/1 var(--bd);letter-spacing:.14em}
/* 半山咖啡 */
.x04 .tabs{position:absolute;left:0;right:0;bottom:0;height:84px;border-top:1px solid rgba(242,237,228,.16);display:flex;justify-content:space-around;padding:18px 18px 0;font:300 13px/1 var(--sg);letter-spacing:.3em;color:var(--sm)}
.x04 .tabs b{font-weight:300;color:var(--iv)}
/* 网页 */
.x04.web{background:var(--k);color:var(--iv);font-family:var(--sg)}
.x04 .nav{position:absolute;left:64px;right:64px;top:44px;height:44px;display:flex;align-items:center;justify-content:space-between;font:300 18px/1 var(--sg);letter-spacing:.32em}
.x04 .nav .a{display:flex;gap:44px}
.x04 .nav .b{display:flex;gap:32px;align-items:center}
.x04 .nav .b .btn{height:46px;padding:0 28px 0 calc(28px + .42em);font-size:18px}
.x04 .bigwm{position:absolute;left:0;right:0;top:336px;text-align:center}
.x04 .bigwm b{font-size:84px;letter-spacing:.28em;padding-left:.28em;font-variation-settings:"opsz" 24}
`;

const P = (name, pos = 'center', size = 'cover', f = '') => `<div class="bg" style="background-image:url(${img(name)});background-position:${pos};background-size:${size}${f ? `;filter:${f}` : ''}"></div>`;
const V = (g) => `<div class="veil" style="background:linear-gradient(180deg,${g})"></div>`;
const MENU = `<svg width="24" height="10" viewBox="0 0 24 10"><path d="M0 1.5h24M0 8.5h15" stroke="currentColor" stroke-width="1" fill="none"/></svg>`;
const BACK = `<svg width="24" height="12" viewBox="0 0 24 12"><path d="M6.5 1 1 6l5.5 5M1 6h23" stroke="currentColor" stroke-width="1" fill="none"/></svg>`;
const CLOSE = `<svg width="18" height="18" viewBox="0 0 18 18"><path d="M1 1l16 16M17 1 1 17" stroke="currentColor" stroke-width="1" fill="none"/></svg>`;
const WM = `<div class="wm"><b>XUANBAI</b><i>玄白</i></div>`;
const WM1 = `<div class="wm w1"><b>XUANBAI</b></div>`;

// 主图：首页，整屏黑白照片——黄昏的苍山压着一条云带，下面是洱海，湖心一条小船
const hero = `<div class="scr x04">${P('erhai-cangshan-dusk', '53% 0%', 'auto 100%', 'grayscale(1) sepia(.06) brightness(1.42) contrast(1.06)')}${V('rgba(13,12,11,.58) 0%,rgba(13,12,11,.12) 15%,rgba(13,12,11,0) 28%,rgba(13,12,11,0) 64%,rgba(13,12,11,.55) 74%,rgba(13,12,11,.9) 86%,#0D0C0B 100%')}${statusBar(true)}
<div class="tb4"><div class="l">${MENU}</div>${WM}</div>
<div class="pg"><span>01</span><i></i><em>04</em></div>
<div class="abs nm" style="top:574px">见山套房</div>
<div class="abs en" style="top:624px">The Mountain Suite</div>
<i class="abs au" style="top:682px;right:auto;width:44px"></i>
<div class="abs btn" style="top:718px">探索套房</div>
${homeBar(true)}</div>`;

// 房型：一屏一间。照片不拍床：亚麻纱帘上落着窗框和庭院里植物的影子
const b1 = `<div class="scr x04 iv">${statusBar(false)}
<div class="tb4" style="color:#0D0C0B"><div class="l">${BACK}</div>${WM1}<div class="r">02 / 04</div></div>
<div class="pic" style="top:110px;height:420px">${P('curtain-window-shadow', '46% 100%', 'auto 104%', 'grayscale(1) sepia(.05) contrast(1.22) brightness(1.1)')}</div>
<div class="abs nm" style="top:562px;font-size:34px">庭院套房</div>
<div class="abs en" style="top:610px">The Garden Suite</div>
<div class="abs sp4" style="top:656px">68 ㎡<i></i>庭院景观<i></i>每晚 ¥4,800 起</div>
<div class="abs btn dk" style="top:700px">选择日期</div>
${homeBar(false)}</div>`;

// 预订确认
const b2 = `<div class="scr x04">${statusBar(true)}
<div class="tb4"><div class="l">${CLOSE}</div>${WM1}</div>
<div class="abs" style="top:170px;font:300 14px/1 var(--sg);letter-spacing:.42em;color:var(--sm)">预订已确认</div>
<i class="abs au" style="top:204px;right:auto"></i>
<div class="abs dt" style="top:262px"><b>11.07</b><span>周六<br>入住</span></div>
<div class="abs ln4" style="top:358px"></div>
<div class="abs dt" style="top:386px"><b>11.09</b><span>周一<br>退房</span></div>
<div class="abs rows" style="top:530px">
<div class="rw"><span>房型</span><b>庭院套房 · 两晚</b></div>
<div class="rw"><span>宾客</span><b>姜女士 · 二位</b></div>
<div class="rw" style="border-bottom:1px solid rgba(242,237,228,.16)"><span>确认号</span><b class="n">XB 26110 7042</b></div>
</div>
<div class="abs btn" style="top:712px">加入日历</div>
${homeBar(true)}</div>`;

// 官网首屏
const web = `<div class="x04 web" style="position:relative;width:1280px;height:800px;overflow:hidden">${P('hotel-indoor-pool', '50% 60%')}${V('rgba(13,12,11,.72) 0%,rgba(13,12,11,.36) 24%,rgba(13,12,11,.34) 60%,rgba(13,12,11,.8) 100%')}
<div class="nav"><div class="a"><span>客房</span><span>餐饮</span><span>水疗</span><span>艺术</span></div>
<div class="b"><span style="font:400 16px/1 var(--bd);letter-spacing:.24em">中 / EN</span><div class="btn">预订</div></div></div>
<div class="wm bigwm"><b>XUANBAI</b></div>
<div style="position:absolute;left:0;right:0;top:462px;text-align:center;font:200 19px/1 var(--sg);letter-spacing:.9em;padding-left:.9em">大理洱海</div>
<div class="fo" style="position:absolute;left:64px;bottom:52px;font-size:18px">01<i style="width:80px"></i><em>05</em></div>
<div style="position:absolute;left:640px;bottom:0;width:1px;height:72px;background:rgba(242,237,228,.6)"></div>
</div>`;

// 半山咖啡
const cmp = `<div class="scr x04">${P('latte-saucer-dark', '-59px -214px', 'auto 725px')}${V('rgba(13,12,11,.66) 0%,rgba(13,12,11,0) 24%,rgba(13,12,11,0) 40%,rgba(13,12,11,.86) 64%,#0D0C0B 84%')}${statusBar(true)}
<div class="tb4" style="top:60px"><div class="wm"><b style="font-size:24px">BANSHAN</b><i style="font:200 11px/1 var(--sg);letter-spacing:.9em;padding-left:.9em;margin:10px 0 0">半山咖啡</i></div></div>
<div class="abs" style="top:446px;font:300 12px/1 var(--sg);letter-spacing:.42em;color:rgba(242,237,228,.62)">今日推荐</div>
<div class="abs" style="top:472px;display:flex;justify-content:space-between;align-items:flex-end"><div class="nm" style="font-size:40px">桂花拿铁</div><div style="font:400 30px/1 var(--bd);font-variation-settings:'opsz' 60;padding-bottom:6px"><span class="yen">¥</span>28</div></div>
<div class="abs ln4" style="top:548px"></div>
<div class="abs" style="top:568px;display:flex;justify-content:space-between;font:300 13px/1 var(--sg);letter-spacing:.12em"><span>东四店 · 到店自取约 6 分钟</span><span style="color:var(--sm)">积分 <b style="font:400 14px/1 var(--bd);color:var(--iv);letter-spacing:.06em">1,280</b></span></div>
<div class="abs btn" style="top:610px;height:56px;font-size:15px">去点单</div>
<div class="tabs"><b>首页</b><span>菜单</span><span>订单</span><span>我的</span></div>
${homeBar(true)}</div>`;

const SPOT = 'radial-gradient(ellipse 72% 56% at 50% 46%,#38332E 0%,#16130F 64%,#0D0C0B 100%)';

module.exports = {
  css,
  screens: { 's04-hero': hero, 's04-b1': b1, 's04-b2': b2, 's04-web': web, 's04-cmp': cmp },
  desktop: ['s04-web'],
  marks: [[106, 682], [302, 114], [347, 744], [296, 362]],
  palette: [['象牙白', '#F2EDE4'], ['墨黑', '#0D0C0B'], ['烟灰', '#8C877E'], ['香槟金', '#B49A6A'], ['纯白', '#FFFFFF']],
  type: { font: '"Bodoni Moda","Noto Serif SC"', weight: 300, sample: '玄Aa', style: 'font-variation-settings:"opsz" 72;', lines: [['西文', 'Bodoni Moda'], ['中文', '思源宋体 细'], ['数字', 'Bodoni Moda']] },
  stageA: 'radial-gradient(ellipse 62% 44% at 50% 6%,#57504A 0%,#2A2622 48%,#121010 78%,#0D0C0B 100%)',
  decoA: '',
  stageB: { bg: SPOT, color: '#F2EDE4', url: 'xuanbaihotel.com' },
  zoom: [220, 236],
  page: (no) => stylePages(no, 's04-luxury', module.exports),
};
