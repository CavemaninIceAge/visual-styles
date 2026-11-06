// 麦窑 MAIYAO 社区面包坊（每日出炉、预订、自取）—— 小程序，起手包 s05-organic 试跑
module.exports = ({ img, statusBar, miniNav, homeBar, style }) => {
  const S = style('s05-organic');
  const { ui, T } = S;
  const TABS = [['house', '首页'], ['croissant', '面包'], ['receipt-text', '订单'], ['user', '我的']];
  // 麦窑的记号：窑门里一簇火苗（ui.mark 的 inner 换掉民宿的半个太阳）
  const FLAME = `<path d="M9 9.6c.6 2.8 3.9 4.6 3.9 8 0 2.3-1.7 3.6-3.9 3.6s-3.9-1.3-3.9-3.6c0-1.9 1.2-3 2-4.2.6-1 1.4-2.2 1.9-3.8z" fill="${T.accents.wood}"/>`;

  const css = `
.p.home .ha{margin:10px 24px 0}
.p.home .v-loc{margin:24px 0 0 26px}
.p.home .v-h1{margin:12px 0 0 22px}
.p.home .v-pill{margin:26px 24px 0}
.p.dt .v-dome{padding:48px 24px 0}
.p.dt .v-facts{margin-top:16px}
.p.dt .v-tx{margin-top:20px}
.p.ok .ca{margin:10px 24px 0}
.p.ok .v-list{margin:22px 24px 0}
.p.ok .act{position:absolute;left:24px;right:24px;bottom:34px}
.p.web .wa{position:absolute;left:80px;top:128px}
.p.web .wd{position:absolute;left:428px;top:556px}
.p.web .v-hero{position:absolute;left:640px;top:222px}
.p.web .v-pill{position:absolute;left:640px;top:465px}
`;

  const home = `<div class="scr s05 p home">${statusBar()}${miniNav({ left: ui.navMark(26, { inner: FLAME }) })}
<div class="ha">${ui.arch(img('latte-croissant-wood'), { w: 327, h: 380, pos: '50% 30%', f: ui.tone.cool, over: ui.glow(0.28) + ui.sun(327, 380, 0.14), attrs: 'data-go="detail"' })}</div>
<div class="v-loc">北新桥三条</div>
<div class="v-h1">麦窑</div>
${ui.pill([['自取 · 周六', '11月7日'], ['到店', '8:30']], { btn: '预订', attrs: 'data-go="detail"' })}
${ui.tabs(TABS, 0, [null, 'detail', 'ok', null])}${homeBar()}</div>`;

  const detail = `<div class="scr s05 p dt">
${ui.photo(img('bread-sliced'), { h: 546, pos: '64% 50%', f: ui.tone.cool, over: ui.sun(375, 546, 0.2), cls: 'v-top' })}
${statusBar()}${miniNav({ left: ui.back() })}
${ui.dome(`<div class="v-h2">全麦亚麻籽 · 切片</div>
${ui.facts([['weight', '680 克'], ['clock', '7:30 出炉'], ['package', '剩 9 个']])}
<p class="v-tx">整颗亚麻籽和葵花籽揉进全麦面团，<br>放凉了再切片，两片刚好一顿早饭。</p>
<div class="v-bar"><span class="v-price">¥32<small>/ 个</small></span>${ui.btn('预订', { attrs: 'data-go="ok" style="width:150px"' })}</div>`, { h: 334 })}
${homeBar()}</div>`;

  const ok = `<div class="scr s05 p ok">${statusBar()}${miniNav({ left: ui.back({ bare: true }) })}
<div class="ca">${ui.arch(null, { w: 327, h: 410, center: true, over: ui.leaves(327, 410, [[420, 40, 150, 150, 3, 0.9], [-40, 300, -20, 120, 2, 0.8]], 0.12, false), inner: `${ui.state('已预订')}<span class="v-lbl">取货码</span><div class="v-big">0716</div><div class="v-h3">11月7日 周六 · 8:30</div><div class="v-mut">北新桥店</div>` })}</div>
<div class="v-list bare">
<div class="v-row"><span class="v-hw">全麦亚麻籽</span><span class="v-mut">× 1</span><span class="n">¥32</span></div>
<div class="v-row"><span class="v-hw">黄油可颂</span><span class="v-mut">× 2</span><span class="n">¥36</span></div>
<div class="v-row"><span class="v-mut">合计</span><span class="v-price">¥68</span></div>
</div>
<div class="act">${ui.btn('导航到店', { cls: 'wide', attrs: 'data-go="home"' })}</div>
${homeBar()}</div>`;

  const web = `<div class="web s05 p" style="height:800px">
<div class="v-wnav">${ui.logo('麦窑', 'MAIYAO', { size: 30, sym: ui.mark(32, { inner: FLAME }) })}<nav><span data-go="detail">面包</span><span data-go="detail">预订</span><span>门店</span><span>关于</span></nav>${ui.btn('企业订购', { cls: 'ghost sm' })}</div>
<div class="wa">${ui.arch(img('curtain-window-shadow'), { w: 440, h: 720, bottom: 0, pos: '21% 100%' })}</div>
<div class="wd">${ui.disc(img('bread-sliced'), { size: 184, pos: '38% 62%', zoom: 1.5, origin: '40% 62%', f: ui.tone.cool })}</div>
<h1 class="v-hero">每天清早<br>十二种面包</h1>
${ui.pill([['自取门店', '北新桥店'], ['自取时间', '明早 8:30']], { btn: '预订', lg: true, attrs: 'data-go="detail"' })}
</div>`;

  return {
    name: '麦窑',
    css,
    screens: { home, detail, ok, web },
    desktop: ['web'],
    start: 'home',
    url: 'maiyao.cn',
    boardFont: '"LXGW Marker Gothic"',
    boardDeco: ui.backdrop(1400, 1900),
  };
};
