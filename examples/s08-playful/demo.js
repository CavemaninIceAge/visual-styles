// 芽芽熊 演示 —— 风格 s08-playful（App）：儿童好习惯打卡（刷牙、阅读、早睡，亲子）
// 首页「朵朵的周六」一条小路串起今天的习惯 → 刷牙计时 → 刷完得贴纸、看一周点阵；网页是给家长看的官网
// 全部用起手包，项目没有自己的 CSS。场景里的小画（40×40 的 sunG、bowlG…）是这个品牌自己的插画，换品牌要重画
module.exports = ({ statusBar, homeBar, style }) => {
  const S = style('s08-playful');
  const { ui } = S;
  const { C, art, ic } = ui;
  const TABS = [['house', '今天'], ['calendar', '习惯'], ['gift', '奖励'], ['user', '我的']];
  // 吉祥物：一只头顶长着两片小芽的焦糖色小熊，围天蓝围巾
  const BEAR = { kind: 'bear', top: 'sprout', scarf: C.b, scarfD: C.bd };
  const logo = (s = 38, fs) => ui.logo('芽芽熊', '', { sym: ui.head(s, { kind: 'bear', top: 'sprout' }), fs });

  // ── 习惯的小画（40×40 的格子） ──
  const sunG = (() => { let r = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; r += `<path d="M${(20 + Math.cos(a) * 13.5).toFixed(1)} ${(20 + Math.sin(a) * 13.5).toFixed(1)}L${(20 + Math.cos(a) * 18).toFixed(1)} ${(20 + Math.sin(a) * 18).toFixed(1)}" stroke="${C.y}" stroke-width="3.4" stroke-linecap="round"/>`; } return `${r}<circle cx="20" cy="20" r="10.5" fill="${C.y}"/><circle cx="16.5" cy="19" r="1.5" fill="${C.ink}"/><circle cx="23.5" cy="19" r="1.5" fill="${C.ink}"/><path d="M17 23q3 2.6 6 0" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`; })();
  const bowlG = `<path d="M14 10.5q-3-3.5 0-7M20 10.5q-3-3.5 0-7M26 10.5q-3-3.5 0-7" stroke="#9FD8F5" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M7 19.5C9 12.5 31 12.5 33 19.5Z" fill="#FFE08A"/><circle cx="16" cy="16.2" r="1.6" fill="${C.o}"/><circle cx="23" cy="15.4" r="1.4" fill="${C.g}"/><path d="M4 19H36A16 15 0 0 1 4 19Z" fill="${C.o}"/><path d="M5.8 25.5h28.4" stroke="#fff" stroke-width="3" opacity=".6"/><rect x="13" y="32" width="14" height="4.5" rx="2.25" fill="${C.od}"/>`;
  const brushG = `<g transform="rotate(-38 20 21)"><rect x="1" y="23" width="26" height="7" rx="3.5" fill="${C.b}"/><rect x="2.5" y="27" width="23" height="3" rx="1.5" fill="${C.bd}" opacity=".4"/><rect x="26" y="22" width="13" height="8" rx="3" fill="${C.b}"/><rect x="27.5" y="13.5" width="10.5" height="9" rx="2" fill="#BFE6FF"/><path d="M31 14v8M34.5 14v8" stroke="#fff" stroke-width="1.5"/><path d="M27 14C26 10 29 8.2 31.5 10C32.5 7 36.5 7 37.5 9.8C40 10 40.5 13 38.5 14Z" fill="#6FD6A0"/><path d="M29.5 11.6q2 -1.4 4 0q2 -1.4 3.6 0" stroke="#fff" stroke-width="1.4" stroke-linecap="round" fill="none"/></g>`;
  const bookG = `<path d="M2 11V33C8 31 15 31.5 20 35C25 31.5 32 31 38 33V11Z" fill="${C.g}"/><path d="M20 34.6V12" stroke="${C.gd}" stroke-width="2"/><path d="M20 9C15 5.5 9 5 4 6.5V30C9 28.5 15 29 20 32.5Z" fill="#FFF6DE"/><path d="M20 9C25 5.5 31 5 36 6.5V30C31 28.5 25 29 20 32.5Z" fill="#FFE9B5"/><path d="M8 12.5c3.5-.8 6.5-.4 9 1M8 17.5c3.5-.8 6.5-.4 9 1M8 22.5c3.5-.8 6.5-.4 9 1M23 13.5c2.5-1.4 5.5-1.8 9-1M23 18.5c2.5-1.4 5.5-1.8 9-1" stroke="#EBCB85" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  const moonG = `<path d="M15.6 9.2A13 13 0 1 0 30.8 24.4A11 11 0 0 1 15.6 9.2Z" fill="${C.y}"/><path d="M10.5 23.5q2.5 2.2 5 0" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="11.5" cy="28" rx="2.6" ry="1.6" fill="${C.pink}"/><path d="M26.5 7.5h6l-6 6.5h6M34.5 1.5h4.2l-4.2 4.6h4.2" stroke="${C.b}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  // 小熊送到嘴边的牙刷（原点在手心，buddy 的 arms: 'hand'）
  const brushHold = `<g transform="rotate(-5)"><rect x="-34" y="-3.6" width="46" height="7.2" rx="3.6" fill="${C.b}"/><rect x="-34" y="0" width="46" height="3.6" rx="1.8" fill="${C.bd}" opacity=".4"/><rect x="-46" y="-5" width="16" height="10" rx="4" fill="${C.b}"/><rect x="-45" y="-13" width="13" height="9" rx="2" fill="#BFE6FF"/><path d="M-40.6 -12.6v8M-36.2 -12.6v8" stroke="#fff" stroke-width="1.5"/></g>`;
  const TOOTH = 'M6.5 3C3.5 3 2 5.8 2.4 9.3c.4 3.4 2 5.7 3 10 .6 2.6 3.2 2.6 3.7 0l.9-3.8c.4-1.5 3.6-1.5 4 0l.9 3.8c.5 2.6 3.1 2.6 3.7 0 1-4.3 2.6-6.6 3-10C21.9 5.8 20.4 3 17.5 3c-2 0-3.3 1.1-5.5 1.1S8.5 3 6.5 3Z';
  const tooth = (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="${TOOTH}" fill="${c}"/></svg>`;

  // ───── 首页：朵朵的周六 ─────
  const P1 = [70, 404], P2 = [296, 358], P3 = [132, 286], P4 = [76, 196], P5 = [278, 170];
  const world = ui.scene(375, 440, `
${art.cloud(104, 50, 1.05)}${art.sun(316, 52, 22)}${art.cloud(226, 104, .62)}
${art.hill(150, 430, 70, 172, .55, C.hb1, C.hb2)}${art.hill(-40, 236, 30, 172)}
${art.face(92, 124, 1.15)}
${art.ground(375, 440, 162)}
<ellipse cx="320" cy="246" rx="70" ry="13" fill="${C.grass2}"/><ellipse cx="60" cy="432" rx="110" ry="20" fill="${C.grass2}"/>
${art.road([[-30, 452], P1, [190, 388], P2, [322, 326], [262, 298], P3, [66, 254], P4, [150, 170], P5])}
${art.tree(340, 206, 22)}${art.tree(26, 292, 16)}
${art.tuft(196, 226)}${art.tuft(342, 410, .9)}${art.tuft(18, 368, .9)}${art.tuft(232, 430)}${art.tuft(176, 160, .9)}
${art.bloom(214, 252, 4.5, '#FFB3C2')}${art.bloom(150, 214, 4.5)}${art.bloom(300, 420, 5)}${art.bloom(28, 420, 4.5, '#FFB3C2')}${art.bloom(330, 300, 4.5)}
${art.tag(...P1, sunG, { state: 'done', s: 48 })}${art.tag(...P2, bowlG, { state: 'done', s: 48 })}
${art.tag(...P4, bookG, { state: 'todo', s: 46 })}${art.tag(...P5, moonG, { state: 'todo', s: 46 })}
${art.tag(...P3, brushG, { state: 'now', s: 66, glow: true })}`, { pos: 'left:0;top:172px' });
  const home = `<div class="scr s08 p home">${statusBar(S.dark)}
${ui.nav({ back: false, left: logo(), right: ui.stat(ic.sprout(26), 86, 'var(--gd)') })}
<div class="v-h1 v-ab" style="left:22px;top:104px">朵朵的周六</div>
${world}
<div class="v-ab" style="left:178px;top:390px">${ui.buddy(98, { ...BEAR, arms: 'wave' })}</div>
<div class="v-ab" style="left:24px;right:24px;top:634px">${ui.btn('开始刷牙', { cls: 'wide', tile: brushG, attrs: 'data-go="brush"' })}</div>
${ui.tabs(TABS, 0, ['home', null, 'done', null])}${homeBar(S.dark)}</div>`;

  // ───── 刷牙：两分钟，四个地方各刷 30 秒 ─────
  const bubbles = [[40, 70, 14], [70, 38, 7], [196, 52, 11], [222, 92, 6], [34, 150, 8], [214, 166, 13], [118, 30, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${C.foam}" stroke-width="2.5"/><ellipse cx="${x - r * .35}" cy="${y - r * .35}" rx="${r * .28}" ry="${r * .18}" fill="${C.foam}" transform="rotate(-35 ${x - r * .35} ${y - r * .35})"/>`).join('');
  const pane = `${ui.scene(244, 244, `${bubbles}<ellipse cx="122" cy="236" rx="120" ry="34" fill="#C4E9FB"/>`, { bg: C.ice, r: 122, pos: 'left:29px;top:29px' })}<div class="v-ab" style="left:66px;top:62px">${ui.buddy(168, { ...BEAR, arms: 'hand', mouth: 'foam', hold: brushHold, shadow: false })}</div>`;
  const brush = `<div class="scr s08 p brush">${statusBar(S.dark)}
${ui.nav({ right: ui.steps(4, 3, { shape: tooth, s: 24 }) })}
<div class="v-h2 v-ab" style="left:24px;top:126px">刷刷右下边</div>
<div class="v-ab" style="right:24px;top:116px">${ui.iconBtn(ic.speaker(), { c: 'b' })}</div>
${ui.ring(302, .93, { inner: pane, pos: 'left:36.5px;top:229px' })}
<div class="v-big v-ab" style="left:0;right:0;top:552px;text-align:center;font-size:76px">0:08</div>
<div class="v-ab" style="left:24px;top:684px">${ui.key(ic.pause(26), { c: 'w', w: 62, h: 62 })}</div>
<div class="v-ab" style="left:106px;right:24px;top:684px">${ui.btn('刷好啦', { cls: 'wide', attrs: 'data-go="done"' })}</div>
${homeBar(S.dark)}</div>`;

  // ───── 刷完：得一张贴纸，看这周的早晚点阵 ─────
  const toothSticker = `<rect width="64" height="64" fill="${C.b}"/><g transform="translate(12.4 12) scale(1.64)"><path d="${TOOTH}" fill="#fff"/></g>${art.face(32, 27, .62)}`;
  const grid = ui.week({ rows: [['早', 'y', [1, 1, 1, 1, 1, 1, 1]], ['晚', 'n', [1, 1, 1, 1, 1, 1, 'next']]], days: ['日', '一', '二', '三', '四', '五', '六'], today: 6 });
  const keepOut = (x, y) => !(x > 96 && x < 290 && y > 96 && y < 410) && y > 130;
  const done = `<div class="scr s08 p done" style="background:${C.ice}">
<svg class="v-ab" style="left:0;top:0" width="375" height="420" viewBox="0 0 375 420">${art.confetti(375, 420, { n: 12, seed: 5, keep: keepOut })}</svg>
${statusBar(S.dark)}
${ui.nav({ title: '刷牙打卡', right: ui.stat(ic.sprout(24), 89, 'var(--gd)') })}
<div class="v-ab" style="left:0;right:0;top:234px;display:flex;justify-content:center">${ui.buddy(160, { ...BEAR, arms: 'cheer', eyes: 'happy' })}</div>
<div class="v-ab" style="left:128px;top:102px">${ui.sticker(toothSticker, { s: 120, rot: -8 })}</div>
<div class="v-card lift v-ab" style="left:24px;right:24px;top:428px;padding:24px 20px 26px">
<div style="display:flex;align-items:baseline;justify-content:space-between"><div class="v-h3" style="display:flex;align-items:baseline;gap:6px">连续刷牙<span class="v-num" style="font-size:30px;color:var(--o)">12</span>天</div><span class="v-mut v-num">11.01–11.07</span></div>
<div style="margin-top:24px">${grid}</div></div>
<div class="v-ab" style="left:78px;right:78px;top:714px">${ui.btn('贴进成长册', { cls: 'wide o', attrs: 'data-go="home"' })}</div>
${homeBar(S.dark)}</div>`;

  // ───── 官网（给家长看） ─────
  const web = `<div class="web s08 p" style="height:800px">
<svg class="v-ab" style="left:0;top:0" width="1280" height="800" viewBox="0 0 1280 800">
${art.cloud(250, 236, 1.5)}${art.sun(1090, 214, 34)}${art.cloud(1170, 372, 1)}
${art.hill(80, 520, 300, 620)}${art.hill(780, 1200, 320, 620)}
${art.face(300, 520, 1.6)}
<path d="M0 606 C200 586 420 620 640 610 S1040 580 1280 600 V800 H0 Z" fill="${C.grass}"/>
<ellipse cx="640" cy="770" rx="260" ry="36" fill="${C.grass2}"/>
${art.tuft(260, 670, 1.6)}${art.tuft(1010, 720, 1.6)}${art.tuft(560, 770, 1.4)}${art.tuft(860, 660, 1.3)}
${art.bloom(330, 710, 8)}${art.bloom(950, 772, 7, '#FFB3C2')}${art.bloom(480, 660, 6, '#FFB3C2')}${art.bloom(1080, 640, 6)}
${art.tree(150, 650, 26)}${art.tree(1150, 660, 30)}${art.tree(1210, 712, 18)}
</svg>
<div class="v-wnav">${logo(46, 32)}<nav><span>好习惯</span><span>家长中心</span><span>关于我们</span>${ui.key('登录', { c: 'w', w: 120, h: 50, r: 16, fs: 20 })}</nav></div>
<div class="v-hero v-ab" style="left:0;right:0;top:122px;text-align:center">跟芽芽熊一起<br>养成 <span class="v-num">21</span> 个好习惯</div>
<div class="v-ab" style="left:530px;top:324px;width:220px">${ui.btn('下载 <span class="v-num">App</span>', { cls: 'wide', attrs: 'data-go="home" style="height:66px"' })}</div>
${ui.tile(brushG, { c: 'b', s: 104, rot: -8, pos: 'left:420px;top:516px' })}${ui.tile(bookG, { c: 'g', s: 104, rot: 7, pos: 'left:756px;top:506px' })}${ui.tile(moonG, { c: 'y', s: 104, rot: -5, pos: 'left:890px;top:642px' })}
<div class="v-ab" style="left:545px;top:520px">${ui.buddy(190, { ...BEAR, arms: 'cheer', eyes: 'happy' })}</div>
</div>`;

  return {
    name: '芽芽熊',
    screens: { web, home, brush, done },
    desktop: ['web'],
    start: 'home',
    url: 'yayaxiong.com',
    boardFont: '"ZCOOL KuaiLe"',
  };
};
