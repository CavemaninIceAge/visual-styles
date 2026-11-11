// 留光胶片冲扫（寄卷冲扫、取片进度、相册）演示，风格 s12-retro（小程序）
// 规矩（详见技能的 审美守则.md 和 styles/12-复古胶片.md）：
//   每屏 375×812，根元素 <div class="scr s12 p 屏名">；网页 1280×800，根元素 <div class="web s12 p">
//   小程序每屏都有 miniNav（微信胶囊）；跳屏 data-go，返回 data-back
// 几屏对得上：两卷各 35 元加回寄 12 元，共 82 元；第 1 卷 36 张已出片，第 2 卷扫到第 23 张
module.exports = ({ img, statusBar, miniNav, homeBar, style }) => {
  const S = style('s12-retro');
  const { ui } = S;
  const TABS = [['house', '首页'], ['film', '取片'], ['images', '相册'], ['user', '我的']];

  // ---------- 首页：刚出片的那卷胶卷横在上面，暗盒立在旁边；下面一张票根是正在扫的第 2 卷 ----------
  const homeTicket = ui.ticket(
    `${ui.tkHead('第 2 卷', '23', '张已扫')}
<div class="v-dt" style="margin-top:12px">今晚 21:00 前扫完</div><div class="v-tx" style="margin-top:2px">明天寄回底片</div>`,
    ui.stub('¥82', '进度'), { w: 327, h: 132, sw: 95, attrs: 'data-go="prog"' });
  const home = `<div class="scr s12 p home">${statusBar()}${miniNav({ left: ui.logo('留光') })}
<div class="v-ab" style="left:-10px;top:108px;transform:rotate(-2deg)" data-go="album" data-bleed>${ui.film(400, 272, [[img('street-crosswalk-backlit'), 288, '50% 30%', 'tr'], [null, 200]], { ex: 30 })}</div>
<div class="v-ab v-obj" style="left:268px;top:286px;transform:rotate(9deg)">${ui.canister(84, { name: '留光' })}</div>
<div class="v-ab" style="left:24px;top:436px"><div class="v-h1" style="font-size:40px">意大利五日</div>
<div style="margin-top:12px">${ui.by('第 1 卷', '36', '张已出片')}</div></div>
<div class="v-ab" style="left:24px;top:572px">${homeTicket}</div>
${ui.postmark(84, { date: '2026.11.02', top: '留光胶片冲扫', bot: '北京鼓楼', wavy: false, rot: -12, style: 'left:226px;top:528px' })}
${ui.tabs(TABS, 0, [null, 'prog', 'album', null])}${homeBar()}</div>`;

  // ---------- 取片进度：扫好的张数是主角，橡皮章盖着状态，下面一张撕口取件单记下每一步 ----------
  const row = (st, name, time) => `<div class="v-row">${ui.step(st)}<span class="v-h3">${name}</span><span class="lead"></span><span class="v-mut">${time}</span></div>`;
  const prog = `<div class="scr s12 p prog">${statusBar()}${miniNav({ title: '取片进度', left: ui.back() })}
<div class="v-ab" style="left:24px;top:108px;right:24px"><div style="display:flex;align-items:baseline;gap:10px"><span class="v-big">23</span><span class="v-sr" style="font-size:22px">张已扫好</span></div>
<div class="v-sr v-of" style="font-size:28px;margin-top:16px">意大利五日</div>
<div class="v-mut" style="margin-top:8px">两卷 135 彩负，冲洗加 4K 扫描</div></div>
${ui.rubber('扫描中', { sub: '2026.11.06', w: 112, rot: -9, style: 'left:238px;top:124px' })}
${ui.slip(`<div class="v-list bare">${row('done', '收件', '11.02 14:20')}${row('done', '冲洗', '11.03 10:05')}${row('now', '扫描第 2 卷', '11.06 15:40')}${row('todo', '底片寄回', '11.07')}
<div class="v-row"><span class="v-h3">冲扫两卷，含回寄</span><span class="lead"></span>${ui.price(82, { style: 'font-size:28px' })}</div></div>`, { style: 'position:absolute;left:24px;right:24px;top:292px' })}
${ui.bar(ui.settle('第 1 卷已出', '36', '张', '看相册', { attrs: 'data-go="album"' }))}
${homeBar()}</div>`;

  // ---------- 相册：一张拍立得是主角，下面一条印样，红笔圈出这一张 ----------
  const strip = [['street-crosswalk-backlit', '50% 30%', 'l'], ['cinque-terre', '30% 34%', 'tr'], ['terrace-restaurant', '60% 50%', 'none'], ['cafe-neon-sign', '50% 50%', 'r']];
  const album = `<div class="scr s12 p album">${statusBar()}${miniNav({ title: '相册', left: ui.back() })}
<div class="v-ab" style="left:62px;top:112px">${ui.polaroid(img('cinque-terre'), { w: 244, h: 236, rot: -3, size: '165% auto', pos: '8% 32%', leak: 'bl', cap: '<span>五渔村</span><span>10.26</span>' })}</div>
<div class="v-ab" style="left:24px;top:422px"><div class="v-h1">意大利五日</div><div style="margin-top:12px">${ui.by('第 1 卷', '36', '张')}</div></div>
<div class="v-ab" style="left:-12px;top:548px;transform:rotate(1.5deg)" data-bleed>${ui.film(560, 156, strip.map(([n, pos, lk]) => [img(n), 124, pos, lk]), { ex: 28 })}
${ui.loop(172, 150, { style: 'left:124px;top:3px' })}</div>
${ui.bar(ui.btn('保存全卷', { ic: 'download', cls: 'wide' }))}
${homeBar()}</div>`;

  // ---------- 网页：彩虹拱上立一只大暗盒，左边一条胶卷，右边票根 + 邮戳 ----------
  const webTicket = ui.ticket(
    `${ui.tkHead('寄卷冲扫', 'C-41', { size: 26 })}<div class="v-tx" style="margin-top:12px">135 和 120 都收</div>`,
    ui.stub('¥35', '下单', ''), { w: 330, h: 120, sw: 94, attrs: 'data-go="home"' });
  const web = `<div class="web s12 p" style="height:800px">
<div class="v-ab" style="left:160px;bottom:0">${ui.rainbow(960)}</div>
<div class="v-wnav">${ui.logo('留光', '', { size: 40 })}<nav><span>冲扫</span><span>价目</span><span>取片</span><span>相册</span></nav><span class="ad">鼓楼东大街 167 号</span></div>
<div class="v-ab" style="left:0;right:0;top:118px;text-align:center"><div class="v-hero">留光胶片冲扫</div><div class="v-fri" style="font-size:30px;margin-top:14px;color:var(--br)">门店每天 10:00–21:00，寄卷三天出片</div></div>
<div class="v-ab" style="left:254px;top:572px;transform:rotate(-6deg)">${ui.film(356, 168, [[img('street-crosswalk-backlit'), 158, '50% 30%', 'l'], [img('cinque-terre'), 158, '30% 34%', 'tr']], { ex: 22 })}</div>
<div class="v-ab v-obj" style="left:548px;top:412px;transform:rotate(5deg)">${ui.canister(186, { name: '留光' })}</div>
<div class="v-ab" style="left:698px;top:598px;transform:rotate(4deg)">${webTicket}</div>
${ui.postmark(140, { date: '2026.11.06', top: '留光胶片冲扫', bot: '北京鼓楼', rot: -10, style: 'left:884px;top:566px' })}
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
