// 环线音乐节 LOOP 城市音乐节（小程序）—— 起手包 s09-pop 试跑
// 阵容、购票、电子票；上海世博公园 11.07—08
module.exports = ({ img, icon, statusBar, miniNav, homeBar, style }) => {
  const S = style('s09-pop');
  const { ui, T } = S;
  const P = T.bg, Y = T.primary, { red: R, pink: PK, ink: K, deep: DP } = T.accents;
  const TABS = [['house', '首页'], ['mic-vocal', '阵容'], ['ticket', '票夹'], ['user', '我的']];
  const GO = [null, 'lineup', 'ticket', null];
  const css = `
.p .when{font-size:36px}
.p.web .date{font-size:24px;font-weight:700}
`;
  const top = (o = {}) => miniNav({ light: S.dark, ...o });
  // 色调全套两组：人像紫粉（贴纸多半压在黄块上，亮部要和黄分得开），舞台夜景单独一组
  const FACE = [DP, PK], NIGHT = [K, P, Y];

  // ① 首页：音乐节海报
  const home = `<div class="scr s09 p home">${statusBar(true)}${top({ left: ui.wordmark('loop', 30) })}
${ui.disc(300, Y, 'left:104px;top:104px')}
${ui.pic(img('woman-violet-profile'), { w: 168, h: 232, duo: FACE, rot: 8, pos: 'left:176px;top:98px', at: '50% 18%' })}
${ui.burst(132, R, ui.price(380, 44, '#fff'), { pos: 'left:12px;top:120px' })}
${ui.sp(46, 286, 24, '#fff')}${ui.sp(332, 560, 16, Y)}
${ui.bigT('环线', 132, { pos: 'left:86px;top:316px' })}
${ui.bigT('音乐节', 112, { pos: 'left:12px;top:446px' })}
<div class="v-ab v-tx" style="left:24px;top:586px"><span class="v-num">11.07—08</span> · 上海世博公园</div>
${ui.wave(624, Y)}
<div class="v-ab" style="left:24px;right:24px;top:656px">${ui.btn('去购票', { cls: 'wide', attrs: 'data-go="lineup"' })}</div>
${ui.tabs(TABS, 0, GO)}${homeBar()}</div>`;

  // ② 阵容：一位艺人一块斜色块，贴纸左右交替
  // 右对齐那条整行是反着排的（.r .row 是 row-reverse），DOM 顺序跟着反过来，读起来都是「时间 舞台」
  const act = (time, stage, on = false, right = false) => (right
    ? `<span class="v-lb">${stage}</span><span class="v-num when">${time}</span>${ui.round('heart', { on })}`
    : `<span class="v-num when">${time}</span><span class="v-lb">${stage}</span>${ui.round('heart', { on })}`);
  const lineup = `<div class="scr s09 p lu">${statusBar(true)}${top({ left: ui.back() + ui.city('上海站') })}
${ui.cat(['<b class="v-num">11.07</b>', '<b class="v-num">11.08</b>'], 0, { pos: 'left:24px;top:104px' })}
${ui.sp(190, 104, 26, '#fff')}${ui.sp(232, 132, 14, Y)}
${ui.band({ top: 166, bg: Y, rot: -2.5, title: '林夏', row: act('20:30', '主舞台', true), art: ui.pic(img('woman-violet-profile'), { w: 124, h: 164, duo: FACE, rot: 10, at: '50% 15%' }) })}
${ui.band({ top: 362, bg: R, rot: 2, title: '霓虹兔', row: act('19:00', '主舞台', false, true), right: true, art: ui.pic(img('p-woman-2'), { w: 124, h: 164, duo: FACE, rot: -9, at: '50% 12%' }) })}
${ui.band({ top: 558, h: 300, bg: PK, rot: -2, title: '高架桥', row: act('17:40', '草地舞台'), art: ui.pic(img('concert-yellow'), { w: 116, h: 150, duo: NIGHT, rot: 9, at: '50% 70%' }), artX: 232, artY: -14 })}
${ui.bar(`${icon('ticket', 24, 2.2, `style="color:${Y}"`)}<span style="font-size:16px;font-weight:600">周六 · 1 张</span>${ui.price(380, 28, Y)}`, '去支付', 'data-go="ticket"')}
${homeBar()}</div>`;

  // ③ 电子票：日期是主角，二维码贴纸压在黄紫两块的接缝上
  const ticket = `<div class="scr s09 v-c-y p tk">${statusBar(false)}${top({ light: false, left: ui.back() })}
<div class="v-ab v-h3" style="left:24px;top:110px;font-size:30px">电子票</div>
${ui.big('11.07', 220, 'left:10px;top:154px')}
${ui.sp(320, 112, 30, R)}${ui.sp(296, 486, 26, P)}${ui.sp(258, 524, 14, R)}
<div class="v-ab" style="left:24px;right:24px;top:392px;display:flex;align-items:baseline;justify-content:space-between"><span class="v-h2" style="font-size:40px">单日票</span><span class="v-tx" style="font-weight:600">周六 · 1 张</span></div>
${ui.slab(560, 300, P, -3)}
${ui.qrCard(150, { seed: 11, pos: 'left:24px;top:454px' })}
<div class="v-ab v-on-d" style="left:232px;top:592px"><div class="v-h2" style="font-size:40px"><span class="v-num" style="font-size:46px">3</span> 号门</div><div class="v-tx" style="margin-top:12px"><span class="v-num" style="font-size:24px">14:00</span> 入场</div></div>
<div class="v-ab v-on-d v-tx" style="left:24px;top:700px">林小满 · 身份证尾号 4821<br>上海世博公园</div>
<div class="v-ab" style="right:24px;top:716px">${ui.price(380, 44, '#fff')}</div>
${homeBar(true)}</div>`;

  // ④ 官网首屏
  const web = `<div class="web s09 p" style="height:800px">
${ui.disc(580, Y, 'left:350px;top:262px')}
<div class="v-wnav">${ui.wordmark('loop', 46)}<nav><span>阵容</span><span>购票</span><span>场地</span><span>往届</span></nav>${ui.btn('小程序购票', { cls: 'y', ic: 'arrow-right', attrs: 'data-go="home"' })}</div>
${ui.bigT('环线音乐节', 176, { pos: 'left:210px;top:144px', ring: 0.035 })}
${ui.pic(img('woman-violet-profile'), { w: 176, h: 244, duo: FACE, rot: -12, pos: 'left:120px;top:330px', at: '50% 18%' })}
${ui.pic(img('p-woman-2'), { w: 176, h: 244, duo: FACE, rot: 14, pos: 'left:1000px;top:280px', at: '50% 12%' })}
${ui.pic(img('concert-yellow'), { w: 236, h: 316, duo: NIGHT, rot: 6, pos: 'left:520px;top:292px', at: '50% 70%' })}
${ui.burst(140, R, ui.price(380, 52, '#fff'), { pos: 'left:800px;top:390px' })}
${ui.sp(1100, 150, 46, '#fff')}${ui.sp(150, 236, 32, Y)}
<div class="v-ab date" style="left:64px;top:604px"><span class="v-num" style="font-size:1.2em">11.07—08</span> · 上海世博公园</div>
${ui.ribbon(['林夏', '霓虹兔', '高架桥', '回旋镖'], { top: 664 })}
</div>`;

  return {
    name: '环线音乐节',
    css,
    screens: { home, lineup, ticket, web },
    desktop: ['web'],
    start: 'home',
    url: 'loopfest.cn',
    boardFont: '"ZCOOL QingKe HuangYou"',
    boardDeco: ui.stageDeco(),
  };
};
