// 06 柔和治愈 Soft —— 起手包
// 色值、字体、字号、圆角、阴影都照图册模块 catalog/pages/s06-soft.js（眠云）原样取
// 用法：const S = style('s06-soft'); 屏幕根元素 <div class="scr s06">；组件见 S.ui，平涂小画的零件见 S.ui.art
// 这个风格的画面靠「大块纯色 + 大圆 + 云 + 波浪」撑起来，基本不用照片；要用照片时套 .ph（雾化的低饱和滤镜）
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#EFE8DD',          // 燕麦：页面底色
    surface: '#FAF6F0',     // 奶白：卡片、标签栏、圆形小按钮、云和枕头
    ink: '#46505C',         // 夜墨：主字色（不用纯黑）
    ink2: '#8C93A0',        // 浅灰蓝：次要信息
    line: '#E2D7C8',        // 这个风格几乎不用线；只有云朵枕头的缝线、极少的分隔用它
    primary: '#6B7D90',     // 石板蓝：主按钮、当前标签、选中
    onPrimary: '#FFFFFF',
    accents: {
      pink: '#E3C8C1',      // 雾粉：大圆、整块底色
      blue: '#B3C4D6',      // 雾蓝：天空、整块底色、浅一级的数据
      dusk: '#596A7C',      // 暮蓝：石板蓝上再深一层的山丘
      blush: '#DDB5AA',     // 绯粉：雾粉不够分的时候用（图表第三色）
      apricot: '#E9B48E',   // 杏色：极少量点缀（花、太阳芯）
      shade: '#EDE4D8',     // 奶白物体底部的影子色
      off: '#ADB3BC',       // 没选中的标签栏图标
    },
    fonts: { title: '"Chill Round"', body: '"Chill Round"', num: '"Nunito"' },
    radius: 28,             // 卡片；场景大卡 40，标签栏 33（=高度一半），按钮全圆
    border: null,           // 不描边
    shadow: '0 20px 36px -24px rgba(70,80,92,.36)',   // 又淡又散；浮起的条加一层 0 3px 10px -6px
    margin: 24,
    photo: 'saturate(.68) contrast(.9) brightness(1.05) sepia(.12)',
  };
  const { pink: PK, blue: BL, dusk: DK, shade: SH } = T.accents;
  const MILK = T.surface, INK = T.ink;
  const F = '"Chill Round",sans-serif', N = '"Nunito",sans-serif';
  const css = `
.s06{--bg:${T.bg};--sf:${MILK};--k:${INK};--m:${T.ink2};--pk:${PK};--bl:${BL};--pr:${T.primary};--off:${T.accents.off};background:var(--bg);color:var(--k);font-family:${F};font-weight:400;font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.s06 b,.s06 strong{font-weight:400}
.s06 .v-pad{padding-left:24px;padding-right:24px}
/* 字：圆体只用常规字重，字距放宽（.06–.26em），像轻声说话；数字用 Nunito 细体 */
.s06 .v-h1{font:400 34px/1.25 ${F};letter-spacing:.16em}
.s06 .v-hero{font:400 56px/1.2 ${F};letter-spacing:.14em}
.s06 .v-h2{font:400 24px/1.3 ${F};letter-spacing:.12em}
.s06 .v-h3{font:400 17px/1.4 ${F};letter-spacing:.1em}
.s06 .v-tx{font:400 15px/1.75 ${F};letter-spacing:.06em}
.s06 .v-mut{font:400 14px/1.45 ${F};letter-spacing:.06em;color:var(--m)}
/* 居中的字补回末尾字距，不然整体偏左 */
.s06 .v-c{text-align:center}
.s06 .v-h1.v-c{padding-left:.16em}.s06 .v-hero.v-c{padding-left:.14em}.s06 .v-h2.v-c{padding-left:.12em}.s06 .v-h3.v-c{padding-left:.1em}.s06 .v-mut.v-c,.s06 .v-tx.v-c{padding-left:.06em}
.s06 .v-num{font-family:${N};font-weight:300;letter-spacing:.01em}
.s06 .v-mut .v-num,.s06 .v-tx .v-num,.s06 .v-row .v-num{font-size:1.18em;font-weight:400;letter-spacing:.02em}
.s06 .v-big{font:300 68px/1 ${N};letter-spacing:-.02em}
.s06 .v-stat{display:flex;align-items:baseline;gap:6px;white-space:nowrap}
.s06 .v-stat u{text-decoration:none;font-size:19px;letter-spacing:.06em;margin-right:12px}
.s06 .v-price{display:inline-block;font:300 28px/1 ${N};letter-spacing:.01em;white-space:nowrap}
.s06 .v-price::first-letter{font-size:16px;margin-right:2px}
.s06 .v-price small{font:400 14px/1 ${F};letter-spacing:.06em;color:var(--m);margin-left:4px}
/* 按钮：全圆胶囊，石板蓝底白字，阴影往下散开 */
.s06 .v-btn{height:56px;padding:0 32px;display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:999px;background:var(--pr);color:#fff;font:400 17px/1 ${F};letter-spacing:.1em;white-space:nowrap;box-shadow:0 16px 30px -16px rgba(70,80,92,.55)}
.s06 .v-btn>span{margin-right:-.1em}
.s06 .v-btn.wide{display:flex;width:100%}
.s06 .v-btn.ghost{background:var(--sf);color:var(--k);box-shadow:0 16px 30px -18px rgba(70,80,92,.35)}
/* 卡片：奶白、大圆角、没有边，阴影又淡又散 */
.s06 .v-card{position:relative;background:var(--sf);border-radius:28px;overflow:hidden;box-shadow:${T.shadow}}
.s06 .v-card>.ph{height:180px}
.s06 .v-card .bd{padding:20px 24px 22px}
.s06 .v-list{background:var(--sf);border-radius:28px;padding:10px 24px;box-shadow:${T.shadow}}
.s06 .v-row{display:flex;align-items:center;gap:12px;min-height:52px;font-size:15px;letter-spacing:.08em}
.s06 .v-row .v-k{color:var(--m)}
.s06 .v-row .v-end{margin-left:auto;display:flex;align-items:center;white-space:nowrap}
.s06 .v-row .v-end>svg{margin-right:10px}
.s06 .v-row .v-num{margin:0 3px}
.s06 .v-sw{width:16px;height:16px;border-radius:6px;flex:none}
/* 选项：胶囊；选中石板蓝，约满的是半透明底、没有投影，文字写明「约满」 */
.s06 .v-chips{display:flex;flex-wrap:wrap;gap:10px}
.s06 .v-chip{height:40px;padding:0 18px;display:inline-flex;align-items:center;gap:6px;border-radius:999px;background:var(--sf);color:var(--k);font:400 15px/1 ${F};letter-spacing:.08em;white-space:nowrap;box-shadow:0 10px 20px -16px rgba(70,80,92,.45)}
.s06 .v-chip.on{background:var(--pr);color:#fff}
.s06 .v-chip.off{background:rgba(250,246,240,.42);color:var(--m);box-shadow:none}
.s06 .v-day{width:64px;height:76px;border-radius:24px;background:var(--sf);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;box-shadow:0 12px 22px -18px rgba(70,80,92,.45)}
.s06 .v-day span{font-size:13px;line-height:1;letter-spacing:.06em;color:var(--m)}
.s06 .v-day b{font:300 24px/1 ${N}}
.s06 .v-day.on{background:var(--pr);color:#fff}
.s06 .v-day.on span{color:rgba(255,255,255,.78)}
/* 选项圆：一排奶白圆（图标）+ 下面一个字，选中填石板蓝（心情、口味、肤质这类单选） */
.s06 .v-pick{display:flex;justify-content:space-between}
.s06 .v-pick>div{display:flex;flex-direction:column;align-items:center;gap:10px;font-size:13px;line-height:1;letter-spacing:.06em;color:var(--m)}
.s06 .v-pick i{border-radius:50%;background:var(--sf);color:var(--k);display:grid;place-items:center;box-shadow:0 14px 24px -18px rgba(70,80,92,.5)}
.s06 .v-pick .on{color:var(--k)}
.s06 .v-pick .on i{background:var(--pr);color:#fff}
.s06 .v-inp{height:56px;display:flex;align-items:center;gap:12px;padding:0 22px;border-radius:28px;background:var(--sf);color:var(--m);font:400 15px/1 ${F};letter-spacing:.06em;box-shadow:0 14px 28px -22px rgba(70,80,92,.4)}
/* 照片（少用）：低饱和、略偏暖、发雾 */
.s06 .ph{background-size:cover;background-position:center;filter:${T.photo}}
/* 形状：大圆、云、波浪；奶白物体用又淡又散的投影 */
.s06 .v-ab{position:absolute}
/* 居中构图：整行横条（绝对定位，top 自己给），屏幕顶上正中的字标 */
.s06 .v-band{position:absolute;left:0;right:0}
.s06 .v-band.flex{display:flex;justify-content:center}
.s06 .v-hd{position:absolute;top:58px;left:0;right:0;display:flex;justify-content:center;z-index:3}
.s06 .v-disc{position:absolute;border-radius:50%}
.s06 .v-dot{position:absolute;border-radius:50%}
.s06 .v-soft{filter:drop-shadow(0 22px 26px rgba(70,80,92,.16)) drop-shadow(0 4px 8px rgba(70,80,92,.06))}
.s06 .v-wave{position:absolute;left:0;bottom:0;display:block}
.s06 .v-round{border-radius:50%;display:grid;place-items:center;background:var(--pr);color:#fff;box-shadow:0 18px 30px -14px rgba(70,80,92,.45)}
.s06 .v-round.milk{background:var(--sf);color:var(--k);box-shadow:0 18px 32px -16px rgba(70,80,92,.4)}
.s06 .v-pager{display:flex;justify-content:center;gap:12px}
.s06 .v-pager i{width:8px;height:8px;border-radius:50%;background:rgba(70,80,92,.16)}
.s06 .v-pager i.d{background:var(--bl)}
.s06 .v-pager i.c{width:24px;border-radius:4px;background:var(--pr)}
.s06 .v-scene{position:relative;overflow:hidden}
.s06 .v-scene>svg{position:absolute;left:0;top:0;display:block}
.s06 .v-tile{position:relative;overflow:hidden;border-radius:40px;box-shadow:0 26px 44px -30px rgba(70,80,92,.5)}
.s06 .v-tile>svg{position:absolute;left:0;top:0}
.s06 .v-tile .tt{position:absolute;left:28px;bottom:58px;display:flex;align-items:center;gap:10px;font:400 24px/1.2 ${F};letter-spacing:.12em;white-space:nowrap}
.s06 .v-tile .tm{position:absolute;left:28px;bottom:30px;font-size:15px;line-height:1.2;letter-spacing:.08em;opacity:.72;white-space:nowrap}
.s06 .v-tile .tm .v-num{font-size:18px;margin-right:2px}
.s06 .v-tile .tb{position:absolute;right:22px;bottom:26px;width:52px;height:52px;border-radius:50%;background:var(--sf);color:var(--pr);display:grid;place-items:center;box-shadow:0 12px 22px -12px rgba(70,80,92,.45)}
/* 顶栏：左右是奶白小圆按钮，标题小而疏 */
.s06 .v-nav{position:relative;height:44px;margin:6px 24px 0;display:flex;align-items:center;justify-content:space-between;z-index:5}
.s06 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:400 16px/1 ${F};letter-spacing:.14em;padding-left:.14em;white-space:nowrap}
.s06 .v-ib{width:40px;height:40px;border-radius:50%;background:var(--sf);color:var(--k);display:grid;place-items:center;box-shadow:0 10px 20px -14px rgba(70,80,92,.4)}
.s06 .v-logo{display:inline-flex;align-items:center;gap:8px;color:var(--k);white-space:nowrap}
.s06 .v-logo b{font:400 19px/1 ${F};letter-spacing:.26em;margin-right:-.26em}
.s06 .v-logo em{font:600 11px/1 ${N};font-style:normal;letter-spacing:.42em;margin-right:-.42em;color:var(--m)}
.s06 .v-logo.col{flex-direction:column;gap:7px}
/* 标签栏：浮起的奶白圆角条；选中的图标垫一块燕麦色圆角（不只靠颜色） */
.s06 .v-tabs{position:absolute;left:24px;right:24px;bottom:30px;height:66px;border-radius:33px;background:var(--sf);box-shadow:0 20px 40px -20px rgba(70,80,92,.38),0 3px 10px -6px rgba(70,80,92,.12);display:flex;justify-content:space-around;align-items:center;padding:0 10px;z-index:6}
.s06 .v-tabs>div{display:flex;flex-direction:column;align-items:center;gap:3px;width:64px;color:var(--off)}
.s06 .v-tabs>div>i{display:grid;place-items:center;width:46px;height:28px;border-radius:14px}
.s06 .v-tabs span{font:400 11px/1 ${F};letter-spacing:.06em;margin-right:-.06em}
.s06 .v-tabs>div.on{color:var(--pr)}
.s06 .v-tabs>div.on>i{background:var(--bg)}
/* 底部操作条：和标签栏一样浮起，左价格右按钮 */
.s06 .v-bar{position:absolute;left:24px;right:24px;bottom:30px;height:72px;border-radius:36px;background:var(--sf);box-shadow:0 20px 40px -20px rgba(70,80,92,.38),0 3px 10px -6px rgba(70,80,92,.12);display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 26px;z-index:6}
/* 网页 */
.s06.web{background:var(--bg)}
.s06 .v-wnav{position:absolute;top:36px;left:72px;right:72px;height:52px;display:flex;align-items:center;justify-content:space-between;z-index:3}
.s06 .v-wnav nav{display:flex;align-items:center;gap:40px;font-size:17px;letter-spacing:.08em}
.s06 .v-wnav .v-btn{height:46px;padding:0 24px;font-size:16px}
`;

  // ── 平涂零件 ──
  let uid = 0;
  const id = (p) => `v06${p}${++uid}`;
  // 云：一整条闭合的圆鼓鼓轮廓，平底圆角（viewBox 120×64）
  const CLOUD_D = 'M22 60C10 60 4 52 4 44C4 35 11 29 20 29C21 17 31 9 43 9C51 9 58 13 62 19C66 14 72 11 79 11C92 11 102 21 102 33C110 34 116 40 116 47C116 54 110 60 102 60Z';
  // 云朵软枕（viewBox 268×132）：奶白主体、底部一层影子、左上一抹高光、一圈缝线
  const PIL_D = 'M44 122C20 122 6 107 8 90C10 75 22 66 36 66C36 45 53 31 74 34C83 17 102 9 122 13C135 5 156 3 170 11C185 5 207 10 216 27C236 27 252 42 252 62C264 69 266 87 259 100C252 114 238 122 222 122Z';
  const puffG = ({ fill = MILK, shade = SH, line = T.line, stitch = true, gloss = true } = {}) => {
    const c = id('pc');
    return `<defs><clipPath id="${c}"><path d="${PIL_D}"/></clipPath></defs><path d="${PIL_D}" fill="${fill}"/>
<g clip-path="url(#${c})"><path d="M0 98C70 114 190 116 268 98V140H0Z" fill="${shade}"/>${gloss ? '<ellipse cx="96" cy="44" rx="40" ry="14" fill="#fff" opacity=".7" transform="rotate(-12 96 44)"/>' : ''}</g>
${stitch ? `<path d="${PIL_D}" fill="none" stroke="${line}" stroke-width="2.2" stroke-dasharray="1 7" stroke-linecap="round" transform="translate(134 66) scale(.9) translate(-134 -66)"/>` : ''}`;
  };
  // 波浪上沿（375 宽的设计稿里）：三种起伏，取自图册三屏
  const WAVES = [
    [46, 'C60 18 120 14 190 34C254 52 312 40 375 22'],
    [46, 'C70 16 140 14 210 34C270 50 320 46 375 28'],
    [40, 'C64 14 130 10 196 28C258 44 316 34 375 14'],
  ];
  const wavePath = (h, k = 0) => { const [y0, c] = WAVES[k % WAVES.length]; return `M0 ${y0}${c}V${h}H0Z`; };

  const art = {
    // 平涂云：x,y 左上角，w 宽
    cloud: (x, y, w, fill = MILK, op = 1) => `<path d="${CLOUD_D}" transform="translate(${x} ${y}) scale(${(w / 120).toFixed(4)})" fill="${fill}" fill-opacity="${op}"/>`,
    // 软枕云：x,y 左上角，w 宽（高 = w×132/268）
    puff: (x, y, w, o = {}) => `<g transform="translate(${x} ${y}) scale(${(w / 268).toFixed(4)})">${puffG(o)}</g>`,
    sun: (cx, cy, r, fill = PK) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`,
    // 月牙：被同色背景咬掉一口（用遮罩，不用背景色盖）
    moon: (cx, cy, r, fill = MILK, bite = [0.55, -0.45]) => { const m = id('mm'); return `<defs><mask id="${m}"><rect x="${cx - r * 2}" y="${cy - r * 2}" width="${r * 4}" height="${r * 4}" fill="#fff"/><circle cx="${cx + r * bite[0]}" cy="${cy + r * bite[1]}" r="${r * .85}" fill="#000"/></mask></defs><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" mask="url(#${m})"/>`; },
    // 山丘 / 水波：从 y 往下填满，W 宽，amp 起伏幅度，k 选哪一种起伏
    hill: (W, H, y, fill, { amp = 1, k = 0, op = 1 } = {}) => {
      const [y0, c] = WAVES[k % WAVES.length];
      const sx = W / 375; const nums = c.replace(/C/g, ' ').trim().split(/\s+/).map(Number);
      const pts = []; for (let i = 0; i < nums.length; i += 2) pts.push(`${(nums[i] * sx).toFixed(1)} ${(y + (nums[i + 1] - y0) * amp).toFixed(1)}`);
      return `<path d="M0 ${y}C${pts.join(' ')}V${H}H0Z" fill="${fill}" fill-opacity="${op}"/>`;
    },
    rain: (x, y, c = MILK, len = 16, op = .85) => `<path d="M${x} ${y}l-${(len * .37).toFixed(1)} ${len}" stroke="${c}" stroke-opacity="${op}" stroke-width="5" stroke-linecap="round"/>`,
    dot: (x, y, r = 3, c = MILK, op = .9) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" fill-opacity="${op}"/>`,
  };

  // ui.mark(kind, s, c1, c2)：品牌记号（平涂、两色）。kind = 'moon' 月亮靠在小云上 / 'sun' 太阳躲在小云后 / 'hill' 小山加一颗太阳；s 尺寸，c1 亮色（默认雾粉），c2 深色（默认夜墨）
  const mark = (kind = 'sun', s = 26, c1 = PK, c2 = INK) => {
    if (kind === 'moon') return `<svg width="${s}" height="${s}" viewBox="0 0 32 32" style="display:block">${art.moon(13, 12, 9.5, c1, [0.58, -0.47])}<g transform="translate(5 16) scale(.19)"><path d="${CLOUD_D}" fill="${c2}"/></g></svg>`;
    if (kind === 'hill') return `<svg width="${s}" height="${Math.round(s * 20 / 34)}" viewBox="0 0 34 20" style="display:block"><path d="M1 19C5 10 10 5 16 5S25 11 33 19Z" fill="${c2}"/><circle cx="24" cy="6" r="3.6" fill="${c1}"/></svg>`;
    return `<svg width="${s}" height="${s}" viewBox="0 0 32 32" style="display:block"><circle cx="20" cy="12.5" r="8" fill="${c1}"/><g transform="translate(2.5 13.5) scale(.205)"><path d="${CLOUD_D}" fill="${c2}"/></g></svg>`;
  };

  // 圆头三角播放键
  const play = (s = 26, c = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 44 44" style="display:block;margin-left:${Math.round(s * .12)}px"><path d="M12 8L35 22L12 36Z" fill="${c}" stroke="${c}" stroke-width="6" stroke-linejoin="round"/></svg>`;

  // ui.avatar(s, { bg, skin, hair, hc, top })：平涂头像（没有五官），只当小配角，40–64px 放在名字旁边；主角用 ui.scene 圆窗小景
  //   s 尺寸；bg 底色；skin 肤色；hair 发型 'short' | 'bob' | 'long' | 'bun'；hc 发色；top 衣服色（默认跟 --pr 走）
  const avatar = (s = 64, { bg = PK, skin = '#ECD3C2', hair = 'bob', hc = '#5B6270', top = `var(--pr,${T.primary})` } = {}) => {
    const c = id('av');
    // 头 r22 放在 (50,45)；后发贴着头，前发是一片斜分的刘海
    const back = {
      bob: '<path d="M50 20C35 20 25 31 25 46V60C25 66 29 70 35 70H65C71 70 75 66 75 60V46C75 31 65 20 50 20Z"/>',
      long: '<path d="M50 20C35 20 25 31 25 46V84C25 90 29 94 35 94H65C71 94 75 90 75 84V46C75 31 65 20 50 20Z"/>',
      bun: '<circle cx="50" cy="18" r="10"/>', short: '',
    }[hair] || '';
    const fringe = 'M27.6 48C25.6 32 37 21.5 50 21.5C63 21.5 74.4 32 72.4 48C69.6 41.4 64.6 36.8 58.6 35C51 39.4 38.6 40.6 27.6 48Z';
    const front = { short: fringe, bob: fringe, long: fringe, bun: 'M28 46C26.6 32 37.4 22.5 50 22.5C62.6 22.5 73.4 32 72 46C67 39.6 59 36.4 50 36.4C41 36.4 33 39.6 28 46Z' }[hair];
    return `<svg width="${s}" height="${s}" viewBox="0 0 100 100" style="display:block;flex:none"><defs><clipPath id="${c}"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#${c})">
<rect width="100" height="100" fill="${bg}"/><path d="M6 108C6 86 25 74 50 74S94 86 94 108Z" fill="${top}"/><g fill="${hc}">${back}</g>
<rect x="40" y="60" width="20" height="20" rx="10" fill="${skin}"/><circle cx="50" cy="45" r="22" fill="${skin}"/><path d="${front}" fill="${hc}"/></g></svg>`;
  };

  const ui = {
    art, mark, play, avatar,
    // 字标：记号 + 宽字距的圆体名字，可带英文；col 为真时记号在上、英文在下（适合放在屏幕正中）
    logo: (name, en = '', { sym = mark('sun', 26), col = false, fs = 19 } = {}) => `<div class="v-logo${col ? ' col' : ''}">${sym}<b style="font-size:${fs}px">${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左右奶白小圆按钮；back 为 true 时左边是返回
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<div class="v-ib" data-back>${icon('chevron-left', 18, 1.8)}</div>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 奶白小圆按钮：iconBtn('heart', 'data-go="x"')
    iconBtn: (name, attrs = '') => `<div class="v-ib" ${attrs}>${icon(name, 18, 1.8)}</div>`,
    // 底部浮起的标签栏；选中项图标垫燕麦色圆角块
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}><i>${icon(ic, 22, 1.6)}</i><span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：默认不带图标（这个风格的按钮只有字）；ic 传 lucide 名字时图标在字前
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${ic ? icon(ic, 18, 1.8) : ''}<span>${text}</span></div>`,
    // 大圆：disc(271, '#E3C8C1', 'left:52px;top:150px')
    disc: (size, color = PK, pos = '', op = 1) => `<div class="v-disc" style="width:${size}px;height:${size}px;background:${color};${op < 1 ? `opacity:${op};` : ''}${pos}"></div>`,
    // 小星点：dots([[52,132],[318,118,4],[338,262,6,'#FAF6F0',.7]])（x, y, 直径, 颜色, 透明度）
    dots: (list) => list.map(([x, y, s = 5, c = MILK, o = .9]) => `<i class="v-dot" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${c};opacity:${o}"></i>`).join(''),
    // 平涂云（单独一朵）：cloud(84, '#E3C8C1', 'left:262px;top:84px')
    cloud: (w, fill = MILK, pos = '', op = 1) => `<div class="v-ab" style="${pos}"><svg width="${w}" height="${Math.round(w * 64 / 120)}" viewBox="0 0 120 64" style="display:block"><path d="${CLOUD_D}" fill="${fill}" fill-opacity="${op}"/></svg></div>`,
    // 云朵软枕（这个风格的「柔软实体」）：puff(280, 'left:47px;top:330px', { stitch: true })
    puff: (w, pos = '', o = {}) => `<div class="v-ab v-soft" style="${pos}"><svg width="${w}" height="${Math.round(w * 132 / 268)}" viewBox="0 0 268 132" style="display:block;overflow:visible">${puffG(o)}</svg></div>`,
    // ui.wave(h, fill, { k, flip, w, z })：波浪色块，贴在屏幕底部；h 高（从屏幕底往上量），k 选起伏（0/1/2），flip 左右镜像，w 宽（网页传 1280），z 层级
    wave: (h, fill = T.bg, { k = 0, flip = false, w = 375, z = '' } = {}) => `<svg class="v-wave" style="${flip ? 'transform:scaleX(-1);' : ''}${z ? `z-index:${z};` : ''}" width="${w}" height="${h}" viewBox="0 0 375 ${h}" preserveAspectRatio="none"><path d="${wavePath(h, k)}" fill="${fill}"/></svg>`,
    // ui.rings(size, color, pos, inner)：呼吸圆，三层同心圆，外两层半透明；size 外圈直径，pos 定位 CSS，inner 放最里层的内容（Calm 呼吸页那种）
    rings: (size, color = BL, pos = '', inner = '') => {
      const s2 = Math.round(size * .824), s3 = Math.round(size * .619);
      return `<div class="v-ab" style="width:${size}px;height:${size}px;${pos}"><div class="v-disc" style="inset:0;background:${color};opacity:.28"></div><div class="v-disc" style="left:${(size - s2) / 2}px;top:${(size - s2) / 2}px;width:${s2}px;height:${s2}px;background:${color};opacity:.5"></div><div class="v-disc" style="left:${(size - s3) / 2}px;top:${(size - s3) / 2}px;width:${s3}px;height:${s3}px;background:${color};display:grid;place-items:center">${inner}</div></div>`;
    },
    // 大圆按钮：round(play(28), { size: 74 })；milk 为真时奶白底
    round: (inner, { size = 74, milk = false, attrs = '', pos = '' } = {}) => `<div class="v-round${milk ? ' milk' : ''}" style="width:${size}px;height:${size}px;${pos}" ${attrs}>${inner}</div>`,
    // 步骤圆点：pager(6, 2) 前面的浅蓝、当前的拉长成石板蓝短条
    pager: (n, cur) => `<div class="v-pager">${Array.from({ length: n }, (_, i) => `<i class="${i < cur ? 'd' : i === cur ? 'c' : ''}"></i>`).join('')}</div>`,
    // 大数字带单位：stat([[7,'小时'],[12,'分']])
    stat: (parts) => `<div class="v-stat">${parts.map(([n, u]) => `<span class="v-big">${n}</span>${u ? `<u>${u}</u>` : ''}`).join('')}</div>`,
    // 图例卡：legend([['#6B7D90','深睡','<span class="v-num">1</span>小时']])，色块是圆角方块，配文字不只靠颜色
    legend: (rows) => `<div class="v-list">${rows.map(([c, t, v]) => `<div class="v-row"><i class="v-sw" style="background:${c}"></i>${t}<span class="v-end">${v}</span></div>`).join('')}</div>`,
    // 平涂小景：scene(220, 160, art.sun(…)+art.hill(…), { bg, r: 40 })；r 传 '50%' 就是圆窗
    scene: (w, h, inner, { bg = BL, r = 40, pos = '', cls = '', attrs = '' } = {}) => `<div class="v-scene ${cls}" style="width:${w}px;height:${h}px;border-radius:${typeof r === 'number' ? r + 'px' : r};background:${bg};${pos}" ${attrs}><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg></div>`,
    // 场景大卡（网页、列表的主角卡）：tile({ w:254, h:340, bg, fg, art, title, meta, avatar, btn: play(18), attrs })
    //   主角是 art 里的平涂小景；avatar 传 ui.avatar(36, …)，小头像排在名字左边；meta 超过 12 个字就另起一行
    tile: ({ w = 254, h = 340, bg = PK, fg = INK, art: a = '', title = '', meta = '', avatar: av = '', btn = play(18, `var(--pr,${T.primary})`), pos = '', attrs = '' } = {}) => `<div class="v-tile" style="width:${w}px;height:${h}px;background:${bg};color:${fg};${pos}" ${attrs}><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${a}</svg>${title || av ? `<b class="tt">${av}${title}</b>` : ''}${meta ? `<em class="tm" style="font-style:normal">${meta}</em>` : ''}${btn ? `<u class="tb">${btn}</u>` : ''}</div>`,
    // 选项圆：pick([['sun','晴'],['cloud','多云']], 1, { size: 54 })
    pick: (items, cur = -1, { size = 54, ic = 24, go = [] } = {}) => `<div class="v-pick">${items.map(([n, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}><i style="width:${size}px;height:${size}px">${icon(n, ic, 1.6)}</i>${t}</div>`).join('')}</div>`,
    // 日期块：day('周一', 9, true)
    day: (w, d, on = false, attrs = '') => `<div class="v-day${on ? ' on' : ''}" ${attrs}><span>${w}</span><b>${d}</b></div>`,
  };
  return { key: 's06-soft', no: 6, name: '柔和治愈', root: 's06', T, css, ui, stage: '#B9C9DB', dark: false };
};
