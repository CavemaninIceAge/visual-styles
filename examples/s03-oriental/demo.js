// 和缓中医养生馆（小程序），起手包 s03-oriental 试跑
// 立冬（2026-11-07，周六）当天：首页、预约调理、预约成功三屏；网页是馆的官网首屏
module.exports = ({ img, icon, statusBar, miniNav, homeBar, style }) => {
  const S = style('s03-oriental');
  const { ui, T } = S;
  const BRAND = '和缓';
  const TABS = [['house', '首页'], ['calendar', '调理'], ['leaf', '节气'], ['user', '我的']];
  const css = `
.p .today{position:absolute;left:24px;top:432px}
.p .today .tt{display:flex;gap:18px;font-size:26px;line-height:1}
.p .room{position:absolute;left:0;right:0;top:290px}
.p .room .v-mut{margin-top:12px}
.p.bk .v-days{position:absolute;left:24px;right:24px;top:376px}
.p.bk .v-list{position:absolute;left:24px;right:24px;top:470px}
.p.ok .code .v-num{font-size:32px;line-height:1;letter-spacing:.06em}
`;
  const top = (title, o = {}) => miniNav({ title, ...o });

  const home = `<div class="scr s03 p home">${statusBar()}${top('', { left: ui.wm(BRAND) })}
${ui.sprig(214, { at: 'left:0;top:594px' })}
${ui.moonGate(img('tea-teapot-tray'), { d: 272, at: 'left:38px;top:98px', size: '440px auto', pos: '-96px -16px', filter: T.photos.pale })}
${ui.seal(BRAND, { w: 46, at: 'left:282px;top:318px' })}
${ui.vt('立冬温养', { size: 60, at: 'left:292px;top:426px' })}
${ui.ins('十一月七日起', { at: 'left:264px;top:432px' })}
<div class="today"><div class="tt v-num"><span>10:00</span><span>14:00</span><span>19:00</span></div><span class="v-cap">今日可约</span></div>
${ui.btn('预约调理', { attrs: 'data-go="bk" style="position:absolute;left:24px;top:520px"' })}
${ui.tabs(TABS, 0, [null, 'bk', null, null])}${homeBar()}</div>`;

  const bk = `<div class="scr s03 p bk">${statusBar()}${top('预约调理', { left: ui.back() })}
${ui.fan(img('hills-bamboo-village'), { at: 'left:34px;top:88px' })}
<div class="room v-ctr"><div class="v-h2">温阳灸</div><div class="v-mut">艾灸 90 分钟</div></div>
${ui.days([['六', 7], ['日', 8], ['一', 9], ['二', 10], ['三', 11], ['四', 12], ['五', 13]], 0)}
<div class="v-list">
${ui.slot('10:00–11:30', '余两位')}
${ui.slot('14:00–15:30', '余一位', 'on')}
${ui.slot('16:00–17:30', '已约满', 'off')}
${ui.slot('19:00–20:30', '余三位')}
</div>
<div class="v-bar"><span class="v-price">¥268<small>/位</small></span>${ui.btn('确认预约', { attrs: 'data-go="ok"' })}</div>
${homeBar()}</div>`;

  const ok = `<div class="scr s03 p ok">${statusBar()}${top('预约成功', { left: `<span data-go="home" style="display:flex">${icon('house', 20, 1.4)}</span>` })}
${ui.jian('温阳灸', ['十一月七日立冬', '午后两点至三点半', '调理师陈素云', '东城总店二楼'], { cw: 58, h: 340, fs: 24, ts: 50, at: 'left:33px;top:212px', seal: ui.seal(BRAND, { w: 36 }) })}
<div class="v-bar"><div class="code"><span class="v-num">3071</span><span class="v-cap">到店码</span></div>${ui.btn('到店导航')}</div>
${homeBar()}</div>`;

  const web = `<div class="web s03 p" style="height:800px">
${ui.hills({ top: 380, h: 440, op: 0.5, pos: 'center 64%' })}
${ui.webNav(ui.logo(BRAND, '', { w: 34 }), ['调理', '节气', '调理师', '到店'], '预约', 'data-go="bk"')}
${ui.ins('十一月七日起', { size: 24, at: 'left:390px;top:168px' })}
${ui.vt('立冬温养', { size: 84, at: 'left:428px;top:150px' })}
${ui.moonGate(img('mist-forest-bw'), { d: 300, at: 'left:586px;top:156px', size: '600px auto', pos: '-170px -40px', filter: T.photos.ink })}
${ui.seal(BRAND, { w: 50, at: 'left:852px;top:394px' })}
${ui.btn('预约调理', { cls: 'lg', attrs: 'data-go="bk" style="position:absolute;left:650px;top:552px;width:200px"' })}
</div>`;

  const lat = ui.lattice(1240, { op: 0.16, at: 'left:60px;top:630px' });
  return {
    name: BRAND, css, screens: { home, bk, ok, web }, desktop: ['web'], start: 'home', url: 'hehuan.clinic',
    boardFont: '"LXGW WenKai"', boardDeco: lat, stageInk: T.ink,
  };
};
