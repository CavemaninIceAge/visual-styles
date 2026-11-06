// 野市 YESHI 周末创意市集（小程序）—— 风格 s10-brutal 新粗野主义试跑
// 北京东郊厂区，每周六、日开市；摊主在小程序里看场次、报名摆摊、拿入场码
module.exports = ({ img, icon, statusBar, miniNav, homeBar, style }) => {
  const S = style('s10-brutal');
  const { ui, T } = S;
  const TABS = [['store', '市集'], ['map', '地图'], ['ticket', '报名'], ['user', '我的']];
  // 本项目只管位置，样子全在起手包里
  const css = `
.p .v-wk{margin:14px 24px 0}
.p.home .v-h1{margin:10px 24px 0 21px;font-size:64px}
.p .v-chips{margin:20px 24px 0}
.p.home .v-card{margin:24px 24px 0}
.p .v-tiles{margin:24px 24px 0}
.p.dt .v-pic{margin:14px 24px 0}
.p.dt .v-h1{margin:28px 24px 0 21px;font-size:56px}
.p.dt .v-cells{margin:20px 24px 0}
.p.dt .v-who{margin:20px 24px 0}
.p.ok .v-h1{margin:18px 24px 0 21px}
.p.ok .v-badge{position:absolute;right:28px;top:122px}
.p.ok .v-tkt{margin:28px 26px 0 24px}
.p.ok .act{position:absolute;left:24px;right:30px;bottom:42px}
.p.web .w1{position:absolute;left:0;right:0;top:86px;height:420px;display:grid;grid-template-columns:1fr 440px}
.p.web .lead{position:relative;padding:40px 40px 0}
.p.web .v-xl{font-size:230px;margin-left:-11px}
.p.web .lead .v-mono{margin-top:22px;font-size:17px;line-height:1.7}
.p.web .pw{position:relative;border-left:3px solid var(--k);background:var(--y)}
.p.web .v-wcols{position:absolute;left:0;right:0;top:506px}
`;
  const seal = ui.mark(40, T.ink, 'burst');

  const home = `<div class="scr s10 p home">${ui.grid()}${statusBar()}${miniNav({ left: ui.plate('野市') })}
<div class="v-wk">WEEK 45 / 11.07 — 11.08</div>
<div class="v-h1">本周野市</div>
<div class="v-chips"><span class="v-chip on">全部</span><span class="v-chip" style="background:var(--b)">黑胶</span><span class="v-chip" style="background:var(--p)">古着</span><span class="v-chip" style="background:var(--g)">手作</span></div>
${ui.card({ src: img('vinyl-crates'), pos: '50% 60%', title: '黑胶专场', meta: '周六 13:00 · 6 小时 · 剩 6 个', sticker: ui.sticker('¥120', { pos: 'right:-10px;top:-16px', rot: 7 }), attrs: 'data-go="detail"' })}
<div class="v-tiles">${ui.tile({ title: '古着', meta: '周日 11:00', price: '¥80', bg: 'var(--p)' })}${ui.tile({ title: '手作', meta: '周日 14:00', price: '¥100', bg: 'var(--g)' })}</div>
${ui.tabs(TABS, 0, [null, null, 'ok', null])}${homeBar()}</div>`;

  const detail = `<div class="scr s10 p dt">${ui.grid()}${statusBar()}${miniNav({ left: ui.miniBack() })}
${ui.pic(img('turntable-bw'), { h: 250, rot: -2.5, pos: '50% 45%', extra: ui.sticker('黑胶', { bg: 'var(--b)', pos: 'left:-8px;top:-14px', rot: -6 }) + ui.badge(seal, { bg: 'var(--p)', rot: 12, pos: 'position:absolute;z-index:3;right:20px;bottom:-18px' }) })}
<div class="v-h1">黑胶专场</div>
<div class="v-cells"><div><span>时间</span><b>周六 13:00</b></div><div><span>时长</span><b>6 小时</b></div><div><span>地点</span><b>东郊厂区</b></div><div style="background:var(--y)"><span>摊位</span><b>剩 6 个</b></div></div>
${ui.who({ ch: '周', name: '周野', meta: '主理人 · 办了 31 场' })}
<div class="v-bar"><div class="v-price">¥120<small>/摊</small></div>${ui.btn('报名摆摊', { attrs: 'data-go="ok"' })}</div>
${homeBar()}</div>`;

  const ok = `<div class="scr s10 p ok">${ui.grid()}${statusBar()}${miniNav({ left: ui.miniBack() })}
<div class="v-h1">报名成功</div>
${ui.badge(icon('check', 34, 3.4))}
${ui.ticket({ bg: 'var(--b)', brand: `${ui.mark(15, T.ink, 'burst')}YESHI · 野市`, title: '黑胶专场', when: '11.07 周六 13:00', cells: [['摊位', 'B-12'], ['主理人', '周野'], ['地点', '东郊厂区 3 号仓', true]], code: '0315', sticker: ui.sticker('已付 ¥120', { bg: 'var(--y)', pos: 'right:-12px;top:-20px', rot: 8 }) })}
<div class="act">${ui.btn('加入日历', { ic: 'calendar-plus', cls: 'wide', attrs: 'data-go="home"' })}</div>
${homeBar()}</div>`;

  const web = `<div class="web s10 p" style="height:800px">${ui.grid(32)}
<div class="v-wnav">${ui.logo('野市', 'YESHI', 'burst')}<nav><span>本周</span><span>摊主</span><span>往期</span><span>合作</span></nav>${ui.btn('报名摆摊', { ic: '', attrs: 'data-go="detail"' })}</div>
<div class="w1"><div class="lead"><div class="v-xl">野市</div><div class="v-mono">北京东郊厂区<br>每周六、日 11:00 — 19:00</div>${ui.badge(ui.mark(92, T.ink, 'burst'), { d: 150, bg: 'var(--y)', rot: 14, pos: 'position:absolute;right:56px;top:46px' })}</div>
<div class="pw">${ui.grid(32)}<div style="position:absolute;left:34px;top:30px;width:326px">${ui.pic(img('vinyl-crates'), { h: 226, rot: -4, off: 8 })}</div><div style="position:absolute;left:180px;top:190px;width:230px">${ui.pic(img('clothes-warm'), { h: 162, rot: 5, off: 8, pos: '40% 50%' })}</div>${ui.sticker('¥80 起', { size: 30, pos: 'left:28px;bottom:36px', rot: -8 })}</div></div>
${ui.wcols([
    { title: '黑胶', meta: '周六 13:00 · 6 小时', price: '¥120', bg: 'var(--b)', go: 'detail' },
    { title: '古着', meta: '周日 11:00 · 8 小时', price: '¥80', bg: 'var(--p)' },
    { title: '手作', meta: '周日 14:00 · 5 小时', price: '¥100', bg: 'var(--g)' },
  ], { h: 294 })}
</div>`;

  return { name: '野市', css, screens: { home, detail, ok, web }, desktop: ['web'], start: 'home', url: 'yeshi.market', boardDeco: ui.stageGrid() + ui.stageShadow() };
};
