// 拾晴 SHIQING 心理咨询（App）—— 起手包 s06-soft 试跑
// 情绪按天气记（晴 / 微云 / 多云 / 小雨 / 雷雨），看咨询师、选时间、约好了，一屏一件事
module.exports = ({ icon, statusBar, homeBar, style }) => {
  const S = style('s06-soft');
  const { ui, T } = S;
  const { pink: PK, blue: BL, dusk: DK } = T.accents;
  const OAT = T.bg, MILK = T.surface, PR = T.primary, INK = T.ink;
  const TABS = [['sun', '今天'], ['users-round', '咨询师'], ['notebook-pen', '记录'], ['user-round', '我的']];
  const GO = ['home', 'detail', null, null];
  const MARK = (s) => ui.mark('sun', s, PK, INK);
  const n = (x) => `<span class="v-num">${x}</span>`;

  const css = '';

  // ── 今天：记一下心里的天气 ──
  const MOODS = [['sun', '晴'], ['cloud-sun', '微云'], ['cloud', '多云'], ['cloud-drizzle', '小雨'], ['cloud-lightning', '雷雨']];
  const home = `<div class="scr s06 p home" style="background:${BL}">${statusBar(S.dark)}
<div class="v-hd">${ui.logo('拾晴', '', { sym: MARK(26) })}</div>
${ui.dots([[48, 140, 5], [330, 112, 4], [340, 300, 6, MILK, .7], [26, 300, 4, MILK, .7]])}
${ui.disc(226, PK, 'left:75px;top:116px')}
${ui.wave(420, OAT)}
${ui.puff(286, 'left:45px;top:300px')}
<div class="v-band" style="top:470px"><div class="v-h1 v-c">心里有点多云</div><div class="v-mut v-c" style="margin-top:12px">${n(11)} 月 ${n(6)} 日 · 周五</div></div>
<div class="v-band v-pad" style="top:578px">${ui.pick(MOODS, 2)}</div>
${ui.tabs(TABS, 0, GO)}${homeBar(S.dark)}</div>`;

  // ── 咨询师：林意。主角是圆窗里的小景，头像退到名字旁边；这一屏只做「看这个人」 ──
  const LIN = { bg: MILK, hair: 'bob', top: BL };
  const twoHills = (W, H, y) => ui.art.moon(W * .68, H * .3, W * .13, MILK) + ui.art.hill(W, H, y, PR, { k: 1 }) + ui.art.hill(W, H, y + H * .13, MILK, { k: 2, amp: .9 }) + ui.art.dot(W * .24, H * .22, W * .016) + ui.art.dot(W * .4, H * .4, W * .011, MILK, .8);
  const detail = `<div class="scr s06 p dt" style="background:${PK}">${statusBar(S.dark)}
${ui.nav({ right: ui.iconBtn('heart') })}
${ui.wave(396, OAT, { k: 1 })}
<div class="v-band flex v-soft" style="top:124px">${ui.scene(256, 256, twoHills(256, 256, 134), { bg: BL, r: '50%' })}</div>
<div class="v-band flex" style="top:464px;gap:14px;align-items:center;padding-right:14px">${ui.avatar(56, LIN)}<div class="v-h1">林意</div></div>
<div class="v-mut v-c v-band" style="top:540px">注册心理师 · 从业 ${n(9)} 年 · 亲密关系</div>
<div class="v-bar"><span class="v-price">¥450<small>/50 分钟</small></span>${ui.btn('选时间', { attrs: 'data-go="time"' })}</div>
${homeBar(S.dark)}</div>`;

  // ── 选时间：这一屏只做「挑一个时间」 ──
  const time = `<div class="scr s06 p tm" style="background:${BL}">${statusBar(S.dark)}
${ui.nav({ title: '选时间' })}
${ui.cloud(96, MILK, 'left:48px;top:150px', .95)}${ui.cloud(64, PK, 'left:262px;top:196px')}
${ui.dots([[318, 128, 5], [150, 120, 4], [40, 262, 4, MILK, .7]])}
${ui.wave(540, OAT, { k: 2 })}
<div class="v-band" style="top:326px"><div class="v-h1 v-c">哪天方便</div></div>
<div class="v-band flex" style="top:404px;gap:20px">${ui.day('周六', 7)}${ui.day('周日', 8)}${ui.day('周一', 9, true)}</div>
<div class="v-band flex" style="top:520px;gap:10px"><span class="v-chip off">14:00 约满</span><span class="v-chip on">19:00</span><span class="v-chip">20:30</span></div>
<div class="v-bar"><span class="v-price">¥450<small>/50 分钟</small></span>${ui.btn('预约', { attrs: 'data-go="ok"' })}</div>
${homeBar(S.dark)}</div>`;

  // ── 约好了：圆窗里一颗太阳从奶白的山后升起 ──
  const sunrise = ui.art.sun(110, 124, 48, PK) + ui.art.hill(220, 220, 132, MILK, { k: 2, amp: .9 }) + ui.art.dot(54, 70, 3.5) + ui.art.dot(170, 54, 2.5, MILK, .8);
  const ok = `<div class="scr s06 p ok">${statusBar(S.dark)}
${ui.nav({ back: false, left: ui.iconBtn('x', 'data-go="home"') })}
<div class="v-band flex v-soft" style="top:120px">${ui.scene(220, 220, sunrise, { bg: BL, r: '50%' })}</div>
<div class="v-band" style="top:380px"><div class="v-h1 v-c">约好了</div><div class="v-mut v-c" style="margin-top:12px">${n(11)} 月 ${n(9)} 日 周一 ${n('19:00')}</div></div>
<div class="v-band v-pad" style="top:482px"><div class="v-list">
<div class="v-row"><span class="v-k">咨询师</span><span class="v-end">${ui.avatar(30, LIN)}林意</span></div>
<div class="v-row"><span class="v-k">方式</span><span class="v-end">视频 · ${n(50)} 分钟</span></div>
<div class="v-row"><span class="v-k">已付</span><span class="v-end"><span class="v-price" style="font-size:22px">¥450</span></span></div></div></div>
<div class="v-band flex" style="top:694px">${ui.btn('加入日历')}</div>
${homeBar(S.dark)}</div>`;

  // ── 网页：找咨询师。三张卡的主角是平涂小景，头像只放在名字旁边 ──
  const rain = [[60, 40], [104, 72], [150, 34], [196, 64], [82, 112], [170, 116], [216, 128], [40, 142], [128, 150]].map(([x, y]) => ui.art.rain(x, y)).join('');
  const PEOPLE = [
    ['林意', '亲密关系', 450, PK, INK, LIN, ui.art.moon(170, 78, 36, OAT) + ui.art.puff(22, 104, 210, { stitch: true })],
    ['周叙白', '职场压力', 600, BL, INK, { bg: OAT, hair: 'short', top: DK }, rain + ui.art.hill(254, 340, 190, OAT, { k: 0, op: .9 }) + ui.art.hill(254, 340, 216, MILK, { k: 1, amp: .7 })],
    ['沈禾', '青少年', 380, PR, MILK, { bg: BL, hair: 'bun', top: MILK, hc: INK }, ui.art.moon(166, 84, 40, MILK) + ui.art.dot(60, 62, 4) + ui.art.dot(96, 120, 3, MILK, .7) + ui.art.dot(214, 150, 3.5, MILK, .8) + ui.art.dot(40, 170, 3, MILK, .6) + ui.art.hill(254, 340, 214, DK, { k: 2, amp: .8 })],
  ];
  const web = `<div class="web s06 p" style="height:800px">
<div class="v-wnav">${ui.logo('拾晴', '', { sym: MARK(34), fs: 24 })}<nav><span data-go="detail">找咨询师</span><span data-go="home">情绪记录</span><span>企业关怀</span><span>关于我们</span>${ui.btn('下载 App')}</nav></div>
${ui.cloud(130, MILK, 'left:1010px;top:150px')}${ui.cloud(92, PK, 'left:130px;top:210px')}
${ui.dots([[196, 148, 7, BL, 1], [960, 300, 6, PK, 1]])}
<div class="v-band" style="top:132px"><div class="v-hero v-c">找一位聊得来的咨询师</div>
<div style="display:flex;gap:16px;justify-content:center;margin-top:36px">${ui.btn('开始匹配', { attrs: 'data-go="detail"' })}${ui.btn('先看看', { cls: 'ghost', attrs: 'data-go="detail"' })}</div></div>
${PEOPLE.map(([nm, tag, pr, bg, fg, av, art], i) => ui.tile({
    w: 254, bg, fg, title: nm, meta: `${tag} · ¥${n(pr)}`, art, avatar: ui.avatar(36, av),
    btn: icon('arrow-right', 20, 1.8), pos: `position:absolute;left:${235 + i * 278}px;top:372px`, attrs: i === 0 ? 'data-go="detail"' : '',
  })).join('')}
</div>`;

  // 展示板的标题 build.js 写死 700，寒蝉全圆体有粗体文件会真变粗；这里关掉它，自己用 400 画一个
  const boardName = `<div style="position:absolute;left:96px;top:52px;font:400 44px/1 'Chill Round';color:${INK};letter-spacing:.14em">拾晴</div>`;
  return { name: '拾晴', css, screens: { home, detail, time, ok, web }, desktop: ['web'], board: ['web', 'home', 'detail', 'time', 'ok'], start: 'home', url: 'shiqing.cn', boardTitle: '', boardDeco: boardName, stageInk: INK };
};
