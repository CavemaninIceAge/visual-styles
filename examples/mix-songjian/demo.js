// 松间民宿，黄山汤口的山间民宿，小程序两套首页。主风格 05 暖调自然，借 03 新中式的印章和竖排题款
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
  // 借来的两样：松绿白文印（品牌名两个字），压在拱门或弧形面板的边上；竖排题款写当天的节气干支
  const seal = (at, w = 40) => B.ui.seal('松间', { w, color: PINE_GREEN, paper: RICE, at });
  const ins = (at) => `<div class="tk" style="${at}">丙午立冬</div>`;
  // 印章 40×53、题款 18px 宽，两样右边都贴在 351（右边距 24，和拱门、日期条一条线），上下隔 16px

  // 题款照新中式的写法：18px 霞鹜文楷、次要色、不拉字距，靠楷书笔画退到后面
  const css = `
.p{--sg:${PINE_GREEN};--sgd:#3C5649;--wd:#B98A58;--bg:${RICE}}
.p .tk{position:absolute;writing-mode:vertical-rl;text-orientation:upright;font:400 18px/1 "LXGW WenKai";letter-spacing:.02em;color:var(--k2);white-space:nowrap}
.p.home-a .a{margin:8px 24px 0}
.p.home-a .v-h1{margin:32px 0 0 22px}
.p.home-a .v-pill{margin:28px 24px 0;padding-left:24px}
.p.home-b .v-dome{padding:48px 24px 0}
.p.home-b .rm{font:400 44px/1 "LXGW Marker Gothic";letter-spacing:.06em;margin-left:-2px}
.p.home-b .v-facts{margin-top:20px}
`;

  const homeA = `<div class="scr s05 p home-a">${statusBar()}${nav()}
<div class="a">${ui.arch(img('bed-linen-white'), { w: 327, h: 384, pos: '44% 62%', f: ui.tone.cool, over: ui.glow(0.4) + ui.sun(327, 384, 0.14) })}</div>
${seal('left:311px;top:448px')}
<div class="v-h1">松间民宿</div>
${ins('left:333px;top:517px')}
${ui.pill([['周六入住', '11月7日'], { n: 2, unit: '晚' }, ['周一退房', '11月9日']], { btn: '预订' })}
${ui.tabs(TABS, 0)}${homeBar()}</div>`;

  const homeB = `<div class="scr s05 p home-b">
${ui.photo(img('hotel-room-white'), { h: 540, pos: '34% 100%', zoom: 1.12, origin: '34% 100%', f: WARM, over: ui.glow(0.3, '30%') + ui.sun(375, 540, 0.16), cls: 'v-top' })}
${statusBar()}${nav()}
${ui.dome(`<div class="rm">听松</div>
${ui.facts([['bed-double', '1.8 米大床'], ['trees', '窗外松林']])}
<div class="v-bar tabs"><span class="v-price">¥680<small>/ 晚</small></span>${ui.btn('预订', { attrs: 'style="width:150px"' })}</div>`, { h: 336 })}
${seal('left:311px;top:444px;z-index:4')}${ins('left:333px;top:513px;z-index:4')}
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
