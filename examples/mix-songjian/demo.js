// 松间民宿（黄山汤口的山间民宿）—— 小程序，两套首页。主风格 05 暖调自然，借 03 新中式的印章和竖排题款
module.exports = ({ img, statusBar, miniNav, homeBar, style }) => {
  const S = style('s05-organic');
  const B = style('s03-oriental', { borrow: true });
  const { ui } = S;
  const PINE_GREEN = '#4F6F5F';
  const RICE = '#F5EEE3';
  const TABS = [['house', '首页'], ['bed-double', '房间'], ['receipt-text', '订单'], ['user', '我的']];
  // 松间的记号：拱门里一棵松
  const PINE = `<path d="M9 7.6l3.6 5h-1.7l3 4.4h-3.5v4.2H7.6V17H4.1l3-4.4H5.4z" fill="var(--wd)"/>`;
  // 带窗的这张偏灰，ui.tone.cool 调完发橄榄绿；往琥珀色再推一点，和拱门那张落在同一种暖色上
  const WARM = 'brightness(.9) sepia(.5) saturate(1.3) contrast(1.06) hue-rotate(-7deg)';
  const nav = () => miniNav({ left: ui.navMark(26, { inner: PINE }) });
  const seal = (at, w = 40) => B.ui.seal('松间', { w, color: PINE_GREEN, paper: RICE, at });
  const ins = (at) => `<div class="tk" style="${at}">丙午立冬</div>`;

  const css = `
.p{--sg:${PINE_GREEN};--sgd:#3C5649;--wd:#B98A58;--bg:${RICE}}
.p .v-tabs>div.on::after{background:var(--wd)}
.p .tk{position:absolute;writing-mode:vertical-rl;text-orientation:upright;font:400 20px/1 "Ma Shan Zheng";letter-spacing:.1em;color:var(--k);white-space:nowrap}
.p.home-a .a{margin:8px 24px 0}
.p.home-a .v-loc{margin:24px 0 0 26px}
.p.home-a .v-h1{margin:12px 0 0 22px}
.p.home-a .v-pill{margin:24px 24px 0;padding-left:24px}
.p.home-b .v-dome{padding:46px 24px 0}
.p.home-b .rm{margin-top:14px}
.p.home-b .rm{display:flex;align-items:baseline;gap:12px}
.p.home-b .rm b{font:400 44px/1 "LXGW Marker Gothic";letter-spacing:.06em}
.p.home-b .v-facts{margin-top:16px}
`;

  const homeA = `<div class="scr s05 p home-a">${statusBar()}${nav()}
<div class="a">${ui.arch(img('bed-linen-white'), { w: 327, h: 384, pos: '44% 62%', f: ui.tone.cool, over: ui.glow(0.4) + ui.sun(327, 384, 0.14) })}</div>
${seal('left:300px;top:448px')}
<div class="v-loc">黄山 · 汤口</div>
<div class="v-h1">松间民宿</div>
${ins('left:326px;top:514px')}
${ui.pill([['入住 · 周六', '11月7日'], { n: 2, unit: '晚' }, ['退房 · 周一', '11月9日']], { btn: '预订' })}
${ui.tabs(TABS, 0)}${homeBar()}</div>`;

  const homeB = `<div class="scr s05 p home-b">
${ui.photo(img('hotel-room-white'), { h: 540, pos: '34% 100%', zoom: 1.12, origin: '34% 100%', f: WARM, over: ui.glow(0.3, '30%') + ui.sun(375, 540, 0.16), cls: 'v-top' })}
${statusBar()}${nav()}
${ui.dome(`<div class="v-loc">松间民宿 · 黄山汤口</div>
<div class="rm"><b>听松</b><span class="v-mut">山景大床房</span></div>
${ui.facts([['bed-double', '1.8 米大床'], ['maximize', '36 ㎡'], ['trees', '窗外松林']])}
<div class="v-bar tabs"><span class="v-price">¥680<small>/ 晚</small></span>${ui.btn('预订', { attrs: 'style="width:150px"' })}</div>`, { h: 336 })}
${seal('left:300px;top:444px;z-index:4')}${ins('left:326px;top:510px;z-index:4')}
${ui.tabs(TABS, 0)}${homeBar()}</div>`;

  return {
    name: '松间民宿',
    css,
    screens: { 'home-a': homeA, 'home-b': homeB },
    desktop: [],
    start: 'home-a',
    compare: true,
    boardWeight: 400,
    boardFont: "'LXGW Marker Gothic'",
    boardDeco: (g) => ui.backdrop(g.w, g.h),
  };
};
