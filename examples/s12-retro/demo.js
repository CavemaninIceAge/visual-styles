// 留光 胶片冲扫（寄卷冲扫、取片进度、相册）演示 —— 风格 s12-retro（小程序）
// 规矩（详见技能的 审美守则.md 和 styles/12-复古胶片.md）：
//   每屏 375×812，根元素 <div class="scr s12 p 屏名">；网页 1280×800，根元素 <div class="web s12 p">
//   小程序每屏都有 miniNav（微信胶囊）；跳屏 data-go，返回 data-back
module.exports = ({ img, statusBar, miniNav, homeBar, style }) => {
  const S = style('s12-retro');
  const { ui } = S;
  const TABS = [['house', '首页'], ['film', '取片'], ['images', '相册'], ['user', '我的']];
  const EDGE = 'LIUGUANG 400';

  // ---------- 首页：刚出片的那卷胶卷横在上面，暗盒立在旁边；下面一张票根是正在冲的单子 ----------
  const homeTicket = ui.ticket(
    `${ui.tkHead('冲扫单', 'No.0412')}
<div class="v-tw" style="margin-top:14px">11.06 FRI 15:40</div><div class="v-tx" style="margin-top:6px">第 2 卷正在扫描</div>`,
    ui.stub('¥82', '进度'), { w: 327, h: 132, sw: 95, attrs: 'data-go="prog"' });
  const home = `<div class="scr s12 p home">${statusBar()}${miniNav({ left: ui.logo('留光') })}
<div class="v-ab" style="left:-10px;top:108px;transform:rotate(-2deg)" data-go="album" data-bleed>${ui.film(400, 272, [[img('street-crosswalk-backlit'), 288, '50% 30%', 'tr'], [null, 200]], { edge: EDGE, no: 12, ex: 30 })}</div>
<div class="v-ab v-obj" style="left:268px;top:286px;transform:rotate(9deg)">${ui.canister(84, { name: '留光' })}</div>
<div class="v-ab" style="left:24px;top:428px"><div class="v-kick">刚出片</div><div class="v-h1" style="font-size:40px;margin-top:10px">意大利五日</div>
<div style="margin-top:10px">${ui.by('第 1 卷', '36', '张')}</div></div>
<div class="v-ab" style="left:24px;top:572px">${homeTicket}</div>
${ui.postmark(84, { date: '2026.11.02', top: '留光胶片冲扫', bot: '北京 · 鼓楼', wavy: false, rot: -12, style: 'left:214px;top:530px' })}
${ui.tabs(TABS, 0, [null, 'prog', 'album', null])}${homeBar()}</div>`;

  // ---------- 取片进度：大号单号是主角，下面一张取件单打字记录每一步 ----------
  const row = (st, name, time) => `<div class="v-row">${ui.step(st)}<span class="v-h3">${name}</span><span class="lead"></span><span class="v-mut">${time}</span></div>`;
  const prog = `<div class="scr s12 p prog">${statusBar()}${miniNav({ title: '取片进度', left: ui.back() })}
<div class="v-ab" style="left:24px;top:108px;right:24px"><div class="v-big">No.0412</div>
<div class="v-sr v-of" style="font-size:26px;margin-top:14px">意大利五日 · 两卷</div>
<div class="v-tw" style="margin-top:10px">135 彩负 · C-41 · 4K 扫描</div></div>
${ui.rubber('扫描中', { sub: '2026.11.06', w: 112, rot: -9, style: 'left:244px;top:194px' })}
${ui.slip(`<div class="v-list bare">${row('done', '收件', '11.02 14:20')}${row('done', '冲洗', '11.03 10:05')}${row('now', '扫描第 2 卷', '11.06 15:40')}${row('todo', '底片寄回', '11.07')}
<div class="v-row"><span class="v-tw">2 卷 × 35 · 回寄 12</span><span class="lead"></span>${ui.price(82, { style: 'font-size:28px' })}</div></div>`, { style: 'position:absolute;left:24px;right:24px;top:292px' })}
${ui.bar(ui.settle('第 1 卷已出', '36', '张', '看相册', { attrs: 'data-go="album"' }))}
${homeBar()}</div>`;

  // ---------- 相册：一张拍立得是主角，下面一条印样，红笔圈出这一张 ----------
  const strip = [['street-crosswalk-backlit', '50% 30%', 'l'], ['cinque-terre', '30% 34%', 'tr'], ['terrace-restaurant', '60% 50%', 'none'], ['cafe-neon-sign', '50% 50%', 'r']];
  const album = `<div class="scr s12 p album">${statusBar()}${miniNav({ title: '相册', left: ui.back() })}
<div class="v-ab" style="left:62px;top:112px">${ui.polaroid(img('cinque-terre'), { w: 244, h: 236, rot: -3, size: '165% auto', pos: '8% 32%', leak: 'bl', cap: '<span>10.26 五渔村</span><span>No.13</span>' })}</div>
<div class="v-ab" style="left:24px;top:418px"><div class="v-h1">意大利五日</div><div class="v-tw" style="margin-top:12px">第 1 卷 · 36 张 · 11.05 THU 出片</div></div>
<div class="v-ab" style="left:-12px;top:540px;transform:rotate(1.5deg)" data-bleed>${ui.film(560, 156, strip.map(([n, pos, lk]) => [img(n), 124, pos, lk]), { edge: EDGE, no: 12, ex: 28 })}
${ui.loop(172, 150, { style: 'left:124px;top:3px' })}</div>
${ui.bar(ui.btn('保存全卷', { ic: 'download', cls: 'wide' }))}
${homeBar()}</div>`;

  // ---------- 网页：彩虹拱上立一只大暗盒，左边一条胶卷，右边票根 + 邮戳 ----------
  const webTicket = ui.ticket(
    `${ui.tkHead('寄卷冲扫', 'C-41', { size: 26 })}<div class="v-tw" style="font-size:15px;margin-top:12px">135 · 120 · 3 DAYS</div>`,
    ui.stub('¥35', '下单', ''), { w: 330, h: 120, sw: 94, attrs: 'data-go="home"' });
  const web = `<div class="web s12 p" style="height:800px">
<div class="v-ab" style="left:160px;bottom:0">${ui.rainbow(960)}</div>
<div class="v-wnav">${ui.logo('留光', '', { size: 40 })}<nav><span>冲扫</span><span>价目</span><span>取片</span><span>相册</span></nav><span class="v-tw">鼓楼店</span></div>
<div class="v-ab" style="left:0;right:0;top:118px;text-align:center"><div class="v-hero">留光胶片冲扫</div><div class="v-fri" style="font-size:30px;margin-top:14px;color:var(--br)">Develop &amp; Scan · 10:00—21:00</div></div>
<div class="v-ab" style="left:254px;top:572px;transform:rotate(-6deg)">${ui.film(356, 168, [[img('street-crosswalk-backlit'), 158, '50% 30%', 'l'], [img('cinque-terre'), 158, '30% 34%', 'tr']], { edge: EDGE, no: 12 })}</div>
<div class="v-ab v-obj" style="left:548px;top:412px;transform:rotate(5deg)">${ui.canister(186, { name: '留光' })}</div>
<div class="v-ab" style="left:698px;top:598px;transform:rotate(4deg)">${webTicket}</div>
${ui.postmark(140, { date: '2026.11.06', top: '留光胶片冲扫', bot: '北京 · 鼓楼', rot: -10, style: 'left:884px;top:566px' })}
</div>`;

  return {
    name: '留光',
    screens: { home, prog, album, web },
    desktop: ['web'],
    start: 'home',
    url: 'liuguangfilm.cn',
    boardDeco: ui.backdrop(),
    boardFont: '"Noto Serif SC"',
  };
};
