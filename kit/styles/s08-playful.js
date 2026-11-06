// 08 插画童趣 Playful —— 起手包
// 色值、字体、字号、圆角、厚底按键、插画零件都照图册模块 catalog/pages/s08-playful.js（跳跳象）原样取
// 用法：const S = style('s08-playful'); 屏幕根元素 <div class="scr s08">；组件见 S.ui，插画零件（SVG 片段）见 S.ui.art
// 这个风格靠「自己画的平涂插画 + 一个吉祥物」撑起来，基本不用照片：插画平涂、不用渐变，宁可简单几何也要干净统一，别拿 emoji 顶替
module.exports = (L) => {
  const { icon, rng } = L;
  // 全套颜色（图册模块的 C 原样）
  const C = {
    g: '#27BB72', gd: '#16915A', y: '#FFC72C', yd: '#E5A200', b: '#2DB2F2', bd: '#168FD0', o: '#FF8A1E', od: '#DE6A00',
    ink: '#1F3159', sky: '#C9EDFF', ice: '#DDF3FF', h1: '#72CF8C', h2: '#5BC27A', hb1: '#93DBA8', hb2: '#7ECD95',
    grass: '#A8DE9C', grass2: '#95D48B', tuft: '#4FB873', pink: '#FFA3B5', river: '#5CC8FF', foam: '#A8E2FF',
    road: '#FFF2CF', road2: '#EED79D', lock: '#E8EDF2', lockd: '#C8D1DB', paper: '#FFFBF0', line: '#E2E7EE', line2: '#EEF1F5',
    m: '#5B6B86', m2: '#4E6588', off: '#9AA6B6', nob: '#B8C2CF', album: '#B9DDF0',
    trunk: '#B87A45', trunkD: '#9C6436', leaf: '#2FAE62', leafD: '#269E57', leafL: '#45C277', rock: '#B9C4D1', rockD: '#A1AEBE',
    field: '#F4D774', fieldD: '#DDB94B', gapLn: '#CDD6E0', night: '#3B5A99', nightD: '#2A4478',
  };
  const T = {
    bg: C.paper,            // 奶油纸：页面底色（不用纯白）
    surface: '#FFFFFF',     // 卡片、字卡、标签栏、白色厚按键
    ink: C.ink,             // 藏青：主字色、插画里的眼睛和嘴（不用纯黑）
    ink2: C.m,              // 灰蓝：次要信息
    line: C.line,           // 白色东西的 3px 内圈和 6px 厚底都用它
    primary: C.b,           // 天蓝：主按钮一律天蓝厚底
    onPrimary: '#FFFFFF',
    accents: {
      green: C.g, yellow: C.y, orange: C.o,                 // 色卡另外三色：草绿（当前标签、山）、明黄（今天要做的那一个）、活力橙（完成对勾、数字、次按钮）
      blueD: C.bd, greenD: C.gd, yellowD: C.yd, orangeD: C.od,  // 每种颜色的「厚底」深一档
      sky: C.sky, ice: C.ice, grass: C.grass, hill: C.h1, river: C.river, pink: C.pink,  // 插画用色：天空、浅蓝底、草地、山、河、腮红
      off: C.off, road: C.road,
    },
    fonts: { title: '"ZCOOL KuaiLe"', body: '"ZCOOL KuaiLe"', num: '"Fredoka"' },  // 汉字字卡用 "LXGW WenKai"（ui.tile 自带）
    radius: 28,             // 卡片；按钮 20、字卡 24、小方键 15
    border: `3px solid ${C.line}`,   // 白色东西用 inset 0 0 0 3px 画在里面
    shadow: `0 6px 0 ${C.bd}`,       // 厚底：同色深一档、不模糊、往下 6px（白色东西用 #E2E7EE）
    margin: 24,
    photo: 'saturate(1.15) contrast(1.04) brightness(1.04)',
  };
  // 站酷快乐体只收了常用字（缺 玥 喆 祎 彧 赟 这类名字用字），缺的字落到圆体 Chill Round。
  // 图册模块的后备字写的是 "Douyin Sans"，这里用 Chill Round 就够（抖音美好体的排版特性读不了，pack.js 要去掉特性才能内嵌）。
  // 字重一律写 700：快乐体只有一档且声明成 100–900，写多少都长一样；写 700 是让后备字落到 Chill Round 的粗体，和快乐体一样粗
  const HD = '"ZCOOL KuaiLe","Chill Round","PingFang SC",sans-serif';
  const NU = '"Fredoka","ZCOOL KuaiLe",sans-serif';
  const KAI = '"LXGW WenKai","Kaiti SC",serif';
  // 四种糖果色 + 白 + 夜蓝：[面, 厚底]。走 CSS 变量，项目写 .p{--b:…;--bd:…} 就能把按钮、字卡、进度环、打卡币、状态牌、标签栏当前图标一起换成客户的色
  // 风景和小角色（太阳、小花、小鸭、杯子、围巾）是插画，写的是 C 里的固定值，不跟着变量走
  const KEY = { b: ['var(--b)', 'var(--bd)'], g: ['var(--g)', 'var(--gd)'], y: ['var(--y)', 'var(--yd)'], o: ['var(--o)', 'var(--od)'], w: ['#fff', C.line], n: [C.night, C.nightD] };
  const css = `
.s08{--g:${C.g};--gd:${C.gd};--y:${C.y};--yd:${C.yd};--b:${C.b};--bd:${C.bd};--o:${C.o};--od:${C.od};--k:${C.ink};--m:${C.m};--off:${C.off};--ln:${C.line};--ln2:${C.line2};--pp:${C.paper};--sky:${C.sky};--ice:${C.ice};--hd:${HD};--nu:${NU};--kai:${KAI};background:var(--pp);color:var(--k);font-family:var(--hd);font-weight:700;font-size:17px;line-height:1.5}
.s08 b,.s08 strong{font-weight:700}
/* .v-ab 在最后，能和 .v-card 等叠用 */
.s08 .v-pad{padding-left:24px;padding-right:24px}
/* 字：标题、正文、按钮全用站酷快乐体（圆头粗壮、只有一档字重，字重写 700 见 HD 的注释），数字 Fredoka 600，字卡上的汉字霞鹜文楷 */
.s08 .v-h1{font:700 46px/1.1 var(--hd);letter-spacing:.04em;white-space:nowrap}
.s08 .v-h2{font:700 30px/1.15 var(--hd);letter-spacing:.04em}
.s08 .v-h3{font:700 22px/1.2 var(--hd);letter-spacing:.06em}
/* 网页大标题：居中写在项目里（text-align:center） */
.s08 .v-hero{font:700 74px/1.15 var(--hd);letter-spacing:.04em}
.s08 .v-tx{font:700 17px/1.55 var(--hd);letter-spacing:.03em}
.s08 .v-mut{font:700 16px/1.35 var(--hd);letter-spacing:.04em;color:var(--m)}
.s08 .v-num{font-family:var(--nu);font-weight:600;letter-spacing:.01em}
.s08 .v-mut .v-num,.s08 .v-tx .v-num{font-size:1.06em;margin:0 2px}
.s08 .v-big{font:600 96px/1 var(--nu);letter-spacing:-.01em}
.s08 .v-price{display:inline-block;font:700 34px/1 var(--nu);color:var(--o);white-space:nowrap}
.s08 .v-price::first-letter{font-size:22px}
.s08 .v-price small{font:700 16px/1 var(--hd);color:var(--m);margin-left:3px;letter-spacing:.04em}
.s08 .v-kai{font-family:var(--kai);font-weight:500}
/* 「本周认了 12 个字」：灰蓝小字夹一个橙色大数字 */
.s08 .v-wk{display:flex;align-items:baseline;gap:5px;font:700 17px/1 var(--hd);letter-spacing:.04em;color:${C.m2};white-space:nowrap}
.s08 .v-wk b{font:600 28px/1 var(--nu);color:var(--od);letter-spacing:0;margin:0 1px}
/* 攒的东西（水滴、星星、小芽）：图标 + Fredoka 数字 */
.s08 .v-stat{display:flex;align-items:center;gap:5px;font:600 21px/1 var(--nu);white-space:nowrap}
/* 厚按键：面 + 同色深一档的 6px 实心厚底，看着能按下去。b 天蓝 / g 草绿 / o 活力橙 / y 明黄 / w 白 */
.s08 .v-tk{display:flex;align-items:center;justify-content:center;border-radius:20px;font:700 24px/1 var(--hd);letter-spacing:.08em;color:#fff;white-space:nowrap}
.s08 .v-tk.b{background:var(--b);box-shadow:0 6px 0 var(--bd)}
.s08 .v-tk.g{background:var(--g);box-shadow:0 6px 0 var(--gd)}
.s08 .v-tk.o{background:var(--o);box-shadow:0 6px 0 var(--od)}
.s08 .v-tk.y{background:var(--y);color:var(--k);box-shadow:0 6px 0 var(--yd)}
.s08 .v-tk.w{background:#fff;color:var(--k);box-shadow:0 6px 0 var(--ln),inset 0 0 0 3px var(--ln)}
/* 主按钮：天蓝厚底，62 高、圆角 20、26px 字；ghost 白、g/o/y 换色 */
.s08 .v-btn{height:62px;padding:0 30px;display:inline-flex;align-items:center;justify-content:center;gap:12px;border-radius:20px;background:var(--b);color:#fff;box-shadow:0 6px 0 var(--bd);font:700 26px/1 var(--hd);letter-spacing:.08em;white-space:nowrap}
.s08 .v-btn>span{margin-right:-.08em}
.s08 .v-btn.wide{display:flex;width:100%}
.s08 .v-btn.ghost{background:#fff;color:var(--k);box-shadow:0 6px 0 var(--ln),inset 0 0 0 3px var(--ln)}
.s08 .v-btn.g{background:var(--g);box-shadow:0 6px 0 var(--gd)}
.s08 .v-btn.o{background:var(--o);box-shadow:0 6px 0 var(--od)}
.s08 .v-btn.y{background:var(--y);color:var(--k);box-shadow:0 6px 0 var(--yd)}
/* 按钮里的小黄字卡（「开始认 [水]」） */
.s08 .v-btn .bt{display:grid;place-items:center;width:42px;height:42px;margin-right:-8px;border-radius:13px;background:var(--y);box-shadow:0 4px 0 var(--yd);font:500 30px/1 var(--kai);color:var(--k);letter-spacing:0;padding-bottom:3px}
.s08 .v-btn .bt svg{display:block}
/* 卡片：白、圆角 28、3px 浅灰内圈 + 6px 浅灰厚底；.lift 放在彩色底上（去内圈、厚底换浅蓝） */
.s08 .v-card{position:relative;background:#fff;border-radius:28px;box-shadow:inset 0 0 0 3px var(--ln),0 6px 0 var(--ln)}
.s08 .v-card.lift{box-shadow:0 6px 0 ${C.album}}
.s08 .v-card>.ph{height:180px;border-radius:28px 28px 0 0}
.s08 .v-card .bd{padding:20px 22px 22px}
.s08 .v-list{background:#fff;border-radius:28px;padding:4px 20px;box-shadow:inset 0 0 0 3px var(--ln),0 6px 0 var(--ln)}
.s08 .v-row{display:flex;align-items:center;gap:14px;min-height:66px;font:700 19px/1.2 var(--hd);letter-spacing:.04em}
.s08 .v-row+.v-row{border-top:3px solid var(--ln2)}
.s08 .v-row .v-end{margin-left:auto;display:flex;align-items:center;gap:6px;white-space:nowrap}
/* 选项：白色厚底小块；选中是明黄、厚底变薄、整块往下沉 2px（按下去了） */
.s08 .v-chips{display:flex;flex-wrap:wrap;gap:12px}
.s08 .v-chip{height:44px;padding:0 18px;display:inline-flex;align-items:center;gap:6px;border-radius:16px;background:#fff;color:var(--k);box-shadow:inset 0 0 0 3px var(--ln),0 4px 0 var(--ln);font:700 18px/1 var(--hd);letter-spacing:.04em;white-space:nowrap}
.s08 .v-chip.on{background:var(--y);box-shadow:0 2px 0 var(--yd);transform:translateY(2px)}
.s08 .v-inp{height:56px;display:flex;align-items:center;gap:10px;padding:0 18px;border-radius:20px;background:#fff;color:var(--off);box-shadow:inset 0 0 0 3px var(--ln),0 4px 0 var(--ln);font:700 18px/1 var(--hd);letter-spacing:.04em}
/* 照片（少用：宠物、真人课堂）：更亮更饱和，放进圆角厚底框 */
.s08 .ph{background-size:cover;background-position:center;filter:${T.photo}}
/* 插画容器、字卡、进度、贴纸 */
.s08 .v-scene{position:relative;overflow:hidden}
.s08 .v-scene>svg{position:absolute;left:0;top:0;display:block}
.s08 .v-art{display:block}
.s08 .v-tile{display:grid;place-items:center;background:#fff;color:var(--k);font-family:var(--kai);font-weight:500;line-height:1;flex:none}
.s08 .v-tile>svg{display:block}
.s08 .v-steps{display:flex;gap:6px}
.s08 .v-steps svg{display:block}
.s08 .v-sheet{position:absolute;left:0;right:0;bottom:0;background:var(--pp);border-radius:32px 32px 0 0}
.s08 .v-alb{display:grid;grid-template-columns:repeat(4,1fr);row-gap:14px}
.s08 .v-alb>div{display:flex;flex-direction:column;align-items:center;gap:6px;font:700 17px/1 var(--hd);color:var(--k)}
.s08 .v-alb>div.no{color:${C.nob}}
.s08 .v-alb svg{display:block}
/* 贴纸册（ui.album）：标题行 + 四列贴纸 */
.s08 .v-albm{padding:22px 18px 24px}
.s08 .v-albm .hd{display:flex;align-items:baseline;margin:0 6px 22px;font:700 22px/1 var(--hd);letter-spacing:.06em}
.s08 .v-albm .hd b{font:600 22px/1 var(--nu);color:var(--o);margin-left:10px;letter-spacing:0}
.s08 .v-albm .hd small{font-size:18px;color:var(--off)}
/* 空字卡位（字卡被拖走后留下的虚线框） */
.s08 .v-gap{flex:none;border:3.5px dashed ${C.gapLn}}
/* 厚进度环（ui.ring）：环 + 同色深一档的厚底，环心放吉祥物或数字 */
.s08 .v-ring{position:relative;flex:none}
.s08 .v-ring>svg{position:absolute;left:0;top:0;overflow:visible}
.s08 .v-ring>.in{position:absolute;inset:0;display:grid;place-items:center}
/* 一周点阵（ui.week）：早晚两行打卡币，最底下一行星期，今天那天是藏青小方块 */
.s08 .v-week{display:grid;row-gap:14px;align-items:center;justify-items:center}
.s08 .v-week .rl{font:700 16px/1 var(--hd);letter-spacing:.04em;color:var(--m)}
.s08 .v-week .d{font:700 15px/1 var(--hd);color:var(--m)}
.s08 .v-week .d.now{color:#fff;background:var(--k);border-radius:9px;padding:5px 6px 4px}
/* 顶栏：左右是白色厚底小方键，标题 28px 居中 */
.s08 .v-nav{position:relative;height:46px;margin:6px 20px 0;display:flex;align-items:center;justify-content:space-between;z-index:5}
.s08 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:700 28px/1 var(--hd);letter-spacing:.06em;padding-left:.06em;white-space:nowrap}
.s08 .v-ib{width:46px;height:44px;border-radius:15px;display:grid;place-items:center;flex:none;background:#fff;color:var(--k);box-shadow:inset 0 0 0 3px var(--ln),0 6px 0 var(--ln)}
.s08 .v-ib svg{display:block}
.s08 .v-ib.b{width:54px;height:48px;border-radius:16px;background:var(--b);color:#fff;box-shadow:0 6px 0 var(--bd)}
.s08 .v-ib.g{background:var(--g);color:#fff;box-shadow:0 6px 0 var(--gd)}
.s08 .v-ib.o{background:var(--o);color:#fff;box-shadow:0 6px 0 var(--od)}
.s08 .v-logo{display:flex;align-items:center;gap:8px;font:700 25px/1 var(--hd);letter-spacing:.04em;white-space:nowrap}
.s08 .v-logo svg{display:block;flex:none}
.s08 .v-logo em{font:600 14px/1 var(--nu);font-style:normal;letter-spacing:.1em;color:var(--m);margin-left:2px}
/* 标签栏：白底、顶上一道 3px 浅线；图标是实心平涂的。当前格草绿图标 + 藏青字 + 字下面一个小圆点（不只靠颜色），其余图标 #9AA6B6、字灰蓝 */
.s08 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:88px;background:#fff;box-shadow:0 -3px 0 var(--ln2);display:flex;justify-content:space-around;padding:12px 10px 0;z-index:6}
.s08 .v-tabs>div{width:64px;display:flex;flex-direction:column;align-items:center;gap:5px;font:700 14px/1 var(--hd);color:var(--m)}
.s08 .v-tabs>div.on{color:var(--k)}
.s08 .v-tabs>div.on::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--k);margin-top:-1px}
.s08 .v-tabs svg{display:block}
/* 底部操作条（左价格右按钮） */
.s08 .v-bar{position:absolute;left:0;right:0;bottom:0;height:112px;background:#fff;box-shadow:0 -3px 0 var(--ln2);display:flex;align-items:flex-start;justify-content:space-between;padding:18px 24px 0;z-index:6}
/* 网页 */
.s08.web{background:var(--sky)}
.s08 .v-wnav{position:absolute;left:64px;right:64px;top:30px;height:56px;display:flex;align-items:center;justify-content:space-between;z-index:3}
.s08 .v-wnav nav{display:flex;align-items:center;gap:44px;font:700 20px/1 var(--hd);letter-spacing:.04em}
.s08 .v-wnav .v-logo{font-size:32px}
.s08 .v-ab{position:absolute}
`;

  // ───────── 插画零件（SVG 片段，坐标是所在 svg 的） ─────────
  let uid = 0;
  const id = (p) => `v08${p}${++uid}`;
  const f1 = (n) => +(+n).toFixed(1);
  // 会笑的脸：任何东西（太阳、云、山、杯子、牙齿）加上它就成了小角色。s=1 时两眼相距 16
  const face = (x, y, s = 1, { eyes = 'dot', blush = C.pink, c = C.ink } = {}) => {
    const e = eyes === 'happy'
      ? `<path d="M${f1(x - 11 * s)} ${f1(y)} q${f1(3 * s)} ${f1(-4 * s)} ${f1(6 * s)} 0M${f1(x + 5 * s)} ${f1(y)} q${f1(3 * s)} ${f1(-4 * s)} ${f1(6 * s)} 0" stroke="${c}" stroke-width="${f1(2.4 * s)}" stroke-linecap="round" fill="none"/>`
      : `<circle cx="${f1(x - 8 * s)}" cy="${f1(y - 2 * s)}" r="${f1(2.8 * s)}" fill="${c}"/><circle cx="${f1(x + 8 * s)}" cy="${f1(y - 2 * s)}" r="${f1(2.8 * s)}" fill="${c}"/>`;
    return `<g>${e}<path d="M${f1(x - 6 * s)} ${f1(y + 6 * s)} q${f1(6 * s)} ${f1(6 * s)} ${f1(12 * s)} 0" stroke="${c}" stroke-width="${f1(2.4 * s)}" stroke-linecap="round" fill="none"/>${blush ? `<ellipse cx="${f1(x - 14 * s)}" cy="${f1(y + 6 * s)}" rx="${f1(4 * s)}" ry="${f1(2.4 * s)}" fill="${blush}"/><ellipse cx="${f1(x + 14 * s)}" cy="${f1(y + 6 * s)}" rx="${f1(4 * s)}" ry="${f1(2.4 * s)}" fill="${blush}"/>` : ''}</g>`;
  };
  // 笑脸太阳：x,y 圆心，r 半径
  const sun = (x, y, r = 24) => {
    let rays = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `<path d="M${f1(x + Math.cos(a) * (r + 7))} ${f1(y + Math.sin(a) * (r + 7))} L${f1(x + Math.cos(a) * (r + 15))} ${f1(y + Math.sin(a) * (r + 15))}" stroke="${C.y}" stroke-width="5" stroke-linecap="round"/>`; }
    return `<g>${rays}<circle cx="${x}" cy="${y}" r="${r}" fill="${C.y}"/>${face(x, y, r / 24, { blush: '#FF9E7A' })}</g>`;
  };
  // 笑脸白云：x,y 中心，s 缩放（s=1 约 76 宽）
  const cloud = (x, y, s = 1, fill = '#fff') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 12 C-42 12 -42 -6 -28 -6 C-26 -20 -6 -22 0 -10 C6 -20 26 -16 24 -2 C36 -2 36 12 26 12 Z" fill="${fill}"/><circle cx="-8" cy="2" r="2.4" fill="${C.ink}"/><circle cx="6" cy="2" r="2.4" fill="${C.ink}"/><path d="M-4 6 q3 3 6 0" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="-15" cy="6" rx="3.5" ry="2" fill="${C.pink}"/><ellipse cx="13" cy="6" rx="3.5" ry="2" fill="${C.pink}"/></g>`;
  // 圆顶小山：x0..x1 底宽，top 顶高，base 底线，k 暗面宽度；右半边一层暗面
  const hill = (x0, x1, top, base, k = 0.5, c1 = C.h1, c2 = C.h2) => { const m = (x0 + x1) / 2; return `<path d="M${x0} ${base} Q${m} ${top} ${x1} ${base} Z" fill="${c1}"/><path d="M${m} ${f1((top + base) / 2 + (base - top) * 0.02)} Q${f1(m + (x1 - m) * k)} ${f1((top + base) / 2)} ${x1} ${base} L${m} ${base} Z" fill="${c2}"/>`; };
  // 尖顶大山（带白雪帽）：px,py 山尖
  const mount = (x0, x1, px, py, base, c = C.h1, cs = C.h2, cap = true) => `<path d="M${x0} ${base} L${px - 17} ${py + 15} Q${px} ${py - 5} ${px + 17} ${py + 15} L${x1} ${base} Z" fill="${c}"/>
<path d="M${px + 8} ${py + 6} Q${px + 13} ${py + 9} ${px + 17} ${py + 15} L${x1} ${base} L${px + 44} ${base} Q${px + 26} ${(py + base) / 2} ${px + 8} ${py + 6} Z" fill="${cs}"/>
${cap ? `<path d="M${px - 17} ${py + 15} Q${px} ${py - 5} ${px + 17} ${py + 15} L${px + 22} ${py + 21} Q${px + 14} ${py + 28} ${px + 8} ${py + 22} Q${px} ${py + 31} ${px - 8} ${py + 22} Q${px - 15} ${py + 29} ${px - 22} ${py + 21} Z" fill="#fff"/>` : ''}`;
  // 起伏的草地：从 y 往下铺满 w×h
  const ground = (w, h, y, c = C.grass) => `<path d="M0 ${y}C${f1(w * .19)} ${y - 14} ${f1(w * .4)} ${y + 8} ${f1(w * .61)} ${y - 4}S${f1(w * .91)} ${y - 16} ${w} ${y - 8}V${h}H0Z" fill="${c}"/>`;
  // 河：y 是上沿中线，从左到右横穿 w 宽
  const river = (w, y, hgt = 62) => `<path d="M-10 ${y + 6}C${f1(w * .19)} ${y - 10} ${f1(w * .4)} ${y + 26} ${f1(w * .61)} ${y + 12}S${f1(w * .91)} ${y - 8} ${w + 10} ${y}V${y + hgt}C${f1(w * .85)} ${y + hgt - 8} ${f1(w * .64)} ${y + hgt + 12} ${f1(w * .43)} ${y + hgt + 2}S${f1(w * .1)} ${y + hgt - 8} -10 ${y + hgt}Z" fill="${C.river}"/><path d="M${f1(w * .09)} ${y + 30}h18M${f1(w * .7)} ${y + 24}h22M${f1(w * .31)} ${y + 54}h16" stroke="${C.foam}" stroke-width="4" stroke-linecap="round"/>`;
  const tree = (x, y, r = 20) => `<g><ellipse cx="${x}" cy="${f1(y + r * 1.55)}" rx="${f1(r * .85)}" ry="${f1(r * .18)}" fill="#1F3159" opacity=".1"/><rect x="${f1(x - r * .14)}" y="${f1(y + r * .4)}" width="${f1(r * .28)}" height="${f1(r * 1.1)}" rx="${f1(r * .12)}" fill="${C.trunk}"/><rect x="${x}" y="${f1(y + r * .4)}" width="${f1(r * .14)}" height="${f1(r * 1.1)}" fill="${C.trunkD}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${C.leaf}"/><circle cx="${f1(x + r * .5)}" cy="${f1(y + r * .28)}" r="${f1(r * .6)}" fill="${C.leafD}"/><circle cx="${f1(x - r * .5)}" cy="${f1(y + r * .22)}" r="${f1(r * .62)}" fill="${C.leaf}"/><circle cx="${f1(x - r * .16)}" cy="${f1(y - r * .22)}" r="${f1(r * .7)}" fill="${C.leafL}"/><ellipse cx="${f1(x - r * .4)}" cy="${f1(y - r * .48)}" rx="${f1(r * .2)}" ry="${f1(r * .12)}" fill="#fff" opacity=".35" transform="rotate(-30 ${f1(x - r * .4)} ${f1(y - r * .48)})"/></g>`;
  const tuft = (x, y, k = 1) => `<path d="M${f1(x - 7 * k)} ${y} q${f1(2 * k)} ${f1(-8 * k)} ${f1(4 * k)} 0 q${f1(3 * k)} ${f1(-12 * k)} ${f1(6 * k)} 0 q${f1(2 * k)} ${f1(-8 * k)} ${f1(4 * k)} 0" stroke="${C.tuft}" stroke-width="${f1(2.6 * k)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  // 五瓣小花：白或粉 #FFB3C2，黄芯
  const bloom = (x, y, r = 5, c = '#fff') => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${f1(Math.cos((a - 90) * Math.PI / 180) * r * .9)}" cy="${f1(Math.sin((a - 90) * Math.PI / 180) * r * .9)}" r="${f1(r * .6)}" fill="${c}"/>`).join('')}<circle r="${f1(r * .42)}" fill="${C.y}"/></g>`;
  // 黄色小花（橙芯）
  const flower = (x, y, r = 7, c = C.y) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${f1(Math.cos(a * Math.PI / 180) * r * .9)}" cy="${f1(Math.sin(a * Math.PI / 180) * r * .9)}" r="${f1(r * .62)}" fill="${c}"/>`).join('')}<circle r="${f1(r * .42)}" fill="${C.o}"/></g>`;
  const duck = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="6" rx="15" ry="9" fill="${C.y}"/><circle cx="9" cy="-6" r="8" fill="${C.y}"/><path d="M15 -6 l8 2 -8 3 z" fill="${C.o}"/><circle cx="11" cy="-8" r="1.8" fill="${C.ink}"/><path d="M-6 4 q6 -6 10 2" stroke="${C.yd}" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>`;
  const rock = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cy="23" rx="42" ry="5.5" fill="#1F3159" opacity=".1"/><path d="M-36 20C-40 0-26-18-6-21C14-24 34-10 36 6C38 16 32 22 20 22H-28C-33 22-36 22-36 20Z" fill="${C.rock}"/><path d="M-6-21C14-24 34-10 36 6C38 16 32 22 20 22H8C22 9 17-8-6-21Z" fill="${C.rockD}"/></g>`;
  // 白天的淡黄月牙（遮罩挖一口）
  const moon = (x, y, r, fill = '#FFF0A8') => { const m = id('mn'); return `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="${x - r - 4}" y="${y - r - 4}" width="${2 * r + 8}" height="${2 * r + 8}"><rect x="${x - r - 4}" y="${y - r - 4}" width="${2 * r + 8}" height="${2 * r + 8}" fill="#fff"/><circle cx="${f1(x + r * .5)}" cy="${f1(y - r * .38)}" r="${f1(r * .84)}" fill="#000"/></mask></defs><circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" mask="url(#${m})"/>`; };
  // 弯弯的小路（闯关路线）：pts 是路过的点 [[x,y],…]，自动连成圆滑曲线；dots 中间画一串小圆点
  const smooth = (P) => {
    let d = `M${P[0][0]} ${P[0][1]}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  };
  const road = (pts, { w = 34, dots = true, c = C.road, edge = C.road2 } = {}) => { const d = smooth(pts); return `<path d="${d}" stroke="${edge}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>${dots ? `<path d="${d}" stroke="${edge}" stroke-width="5" stroke-dasharray="1 15" stroke-linecap="round" fill="none"/>` : ''}`; };
  // 彩纸屑：在 w×h 里撒 n 片（绿、橙、蓝、黄，长条和圆点）；seed 换一种撒法；keep(x,y) 返回 false 的位置不撒（给角色留空）；gap 是片与片的最小距离，保证撒得匀
  const confetti = (w, h, { n = 12, seed = 3, keep = null, gap = 58 } = {}) => {
    const r = rng(seed); const cs = ['var(--g)', 'var(--o)', 'var(--b)', 'var(--y)']; let s = ''; const pts = []; let tries = 0;
    while (pts.length < n && tries++ < 1500) {
      const x = f1(14 + r() * (w - 28)), y = f1(14 + r() * (h - 28));
      if (keep && !keep(x, y)) continue;
      if (pts.some(([a, b]) => Math.hypot(a - x, b - y) < gap)) continue;
      const k = pts.length, c = cs[k % 4], rot = Math.round(r() * 120 - 60);
      pts.push([x, y]);
      s += k % 3 === 1 ? `<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>` : `<rect x="${f1(x - 8)}" y="${f1(y - 4)}" width="16" height="8" rx="4" fill="${c}" transform="rotate(${rot} ${x} ${y})"/>`;
    }
    return s;
  };
  // 对勾徽章（完成）：橙圆白勾；ring = false 不要白边
  const doneBadge = (x, y, r = 8.5, ring = true) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="var(--o)"${ring ? ' stroke="#fff" stroke-width="2.5"' : ''}/><path d="M${f1(-r * .42)} ${f1(r * .04)}l${f1(r * .28)} ${f1(r * .28)} ${f1(r * .54)} ${f1(-r * .56)}" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>`;
  const lockG = (x, y, k = 1) => `<g transform="translate(${f1(x - 11 * k)} ${f1(y - 12 * k)}) scale(${k})"><path d="M6 10V7a5 5 0 0 1 10 0v3" stroke="#A9B4C2" stroke-width="3.2" fill="none" stroke-linecap="round"/><rect x="2.5" y="9.5" width="17" height="13" rx="4" fill="#A9B4C2"/></g>`;
  // 田：一块分成四格的麦田，x,y 中心
  const field = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-40-20H38L46 22H-48Z" fill="${C.field}"/><path d="M-1-20 -1 22M-44 1H42" stroke="${C.fieldD}" stroke-width="3.2" stroke-linecap="round"/><path d="M-40-20H38L46 22H-48Z" fill="none" stroke="${C.fieldD}" stroke-width="3.2" stroke-linejoin="round"/></g>`;
  // 场景里的虚线落点（把东西拖到这里）：x,y 中心，s 边长；halo = true 外面再加一圈白色光圈，表示「就是这里」
  const gap = (x, y, s = 58, { halo = false } = {}) => `<rect x="${f1(x - s / 2)}" y="${f1(y - s / 2)}" width="${s}" height="${s}" rx="16" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="3.5" stroke-dasharray="8 7" stroke-linecap="round"/>${halo ? `<circle cx="${x}" cy="${y}" r="${f1(s * .68)}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>` : ''}`;
  // 点点虚线箭头（拖动方向、下一步去哪）：pts 路过的点 [[x,y],…]，箭头画在最后一点
  const trail = (pts, { c = 'var(--o)', w = 5 } = {}) => {
    const [a, b] = pts.slice(-2); const t = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const wing = (d) => `${f1(b[0] - 15 * Math.cos(t + d))} ${f1(b[1] - 15 * Math.sin(t + d))}`;
    return `<path d="${smooth(pts)}" stroke="${c}" stroke-width="${w}" stroke-dasharray="2 11" stroke-linecap="round" fill="none"/><path d="M${wing(.72)} L${b[0]} ${b[1]} L${wing(-.72)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  };
  // 牌子里的内容：一两个汉字用霞鹜文楷，其他当 SVG 片段（画在 40×40 的格子里）缩放进去
  const glyphG = (glyph, size, color = C.ink) => (/^[^<]{1,2}$/.test(glyph)
    ? `<text x="0" y="${f1(size * .36)}" text-anchor="middle" font-family="LXGW WenKai, Kaiti SC, serif" font-weight="500" font-size="${size}" fill="${color}">${glyph}</text>`
    : `<g transform="translate(${f1(-size / 2)} ${f1(-size / 2)}) scale(${f1(size / 40)})">${glyph}</g>`);
  // 场景里的状态牌：x,y 中心。state = done 白牌 + 橙勾（做完了）/ now 明黄大牌（今天要做的这一个）/ set 彩牌 + 大橙勾（放对了，c 选 y/b/g/o）/ todo 浅灰牌、内容褪色（还没到）/ lock 浅灰牌 + 锁
  const tag = (x, y, glyph = '', { state = 'done', s, glow = false, c = 'y' } = {}) => {
    if (state === 'set') {
      s = s || 58; const h = s / 2, r = f1(s * .28); const [fc, dc] = KEY[c] || KEY.y;
      return `<g transform="translate(${x} ${y})"><rect x="${-h}" y="${-h + 5}" width="${s}" height="${s}" rx="${r}" fill="${dc}"/><rect x="${-h}" y="${-h}" width="${s}" height="${s}" rx="${r}" fill="${fc}"/>${glyphG(glyph, f1(s * .66), c === 'y' ? C.ink : '#fff')}${doneBadge(f1(h - 2), f1(-h + 2), 11, false)}</g>`;
    }
    if (state === 'now') {
      s = s || 64; const h = s / 2, r = f1(s * .3);
      return `<g transform="translate(${x} ${y})">${glow ? `<ellipse rx="${s}" ry="${f1(s * .34)}" cy="${f1(s * .34)}" fill="#fff" opacity=".28"/><ellipse rx="${f1(s * .72)}" ry="${f1(s * .24)}" cy="${f1(s * .34)}" fill="#fff" opacity=".4"/>` : ''}<rect x="${-h}" y="${f1(-h + 6)}" width="${s}" height="${s}" rx="${r}" fill="var(--yd)"/><rect x="${-h}" y="${-h}" width="${s}" height="${s}" rx="${r}" fill="var(--y)"/><rect x="${f1(-h + s * .16)}" y="${f1(-h + s * .1)}" width="${f1(s * .28)}" height="5" rx="2.5" fill="#fff" opacity=".5"/>${glyphG(glyph, f1(s * .69))}</g>`;
    }
    s = s || 42; const h = s / 2, r = f1(s * .31);
    if (state === 'lock') return `<g transform="translate(${x} ${y})"><rect x="${-h}" y="${-h + 5}" width="${s}" height="${s}" rx="${r}" fill="${C.lockd}"/><rect x="${-h}" y="${-h}" width="${s}" height="${s}" rx="${r}" fill="${C.lock}"/>${lockG(0, 1, s / 38)}</g>`;
    if (state === 'todo') { const fi = id('gy'); return `<g transform="translate(${x} ${y})"><defs><filter id="${fi}"><feColorMatrix type="saturate" values="0"/></filter></defs><rect x="${-h}" y="${-h + 5}" width="${s}" height="${s}" rx="${r}" fill="${C.lockd}"/><rect x="${-h}" y="${-h}" width="${s}" height="${s}" rx="${r}" fill="${C.lock}"/><g filter="url(#${fi})" opacity=".72">${glyphG(glyph, f1(s * .66))}</g></g>`; }
    return `<g transform="translate(${x} ${y})"><rect x="${-h}" y="${-h + 5}" width="${s}" height="${s}" rx="${r}" fill="${C.line}"/><rect x="${-h}" y="${-h}" width="${s}" height="${s}" rx="${r}" fill="#fff"/>${glyphG(glyph, f1(s * .66))}${doneBadge(f1(h - 5), f1(-h + 5))}</g>`;
  };

  // ───────── 吉祥物 ─────────
  // 几何拼成的小动物：kind = elephant（图册小象原样）/ bear / bunny / cat / dog；颜色全部可换
  const KINDS = {
    elephant: { body: '#74C8F7', shade: '#5DB7F0', deep: '#46ABE6', belly: '#AEE0FC', top: 'curl', vb: [0, 4, 120, 92] },
    bear: { body: '#F3A55C', shade: '#E38E44', deep: '#D07A33', belly: '#FFE3C2', top: '', vb: [12, 6, 96, 82] },
    bunny: { body: '#FFC2D1', shade: '#F7A7BB', deep: '#EF8EA8', belly: '#FFE7EE', top: '', vb: [8, -24, 104, 110] },
    cat: { body: '#FFB65C', shade: '#F59E3D', deep: '#E3862A', belly: '#FFEACB', top: '', vb: [14, 2, 92, 84] },
    dog: { body: '#F7CF8E', shade: '#EDB96F', deep: '#B9783F', belly: '#FFF3DC', top: '', vb: [4, 8, 112, 86] },
  };
  const headParts = (kind, k, { eyes = 'open', mouth = 'open', top }) => {
    const P = C.pink;
    const mir = (m, fn) => fn(m ? (x) => f1(120 - x) : (x) => x);
    let ears = '';
    if (kind === 'elephant') {
      ears = [0, 1].map((m) => mir(m, (X) => `<path d="M${X(34)} 35 C${X(21)} 21 ${X(2)} 25 ${X(3)} 46 C${X(4)} 64 ${X(18)} 73 ${X(33)} 64 C${X(37)} 55 ${X(38)} 43 ${X(34)} 35Z" fill="${k.deep}"/><path d="M${X(31)} 40 C${X(22)} 31 ${X(10)} 34 ${X(10.5)} 46.5 C${X(11)} 58 ${X(20)} 63.5 ${X(29.5)} 58.5 C${X(33)} 52 ${X(34)} 45 ${X(31)} 40Z" fill="${P}"/><path d="M${X(13)} 44 C${X(14)} 38 ${X(19)} 36 ${X(24)} 38" stroke="#FFC4D0" stroke-width="2.4" stroke-linecap="round" fill="none"/>`)).join('');
    } else if (kind === 'bear') {
      ears = `<circle cx="32" cy="24" r="13.5" fill="${k.body}"/><circle cx="32" cy="25.5" r="7.2" fill="${P}"/><circle cx="88" cy="24" r="13.5" fill="${k.shade}"/><circle cx="88" cy="25.5" r="7.2" fill="${P}"/>`;
    } else if (kind === 'bunny') {
      ears = `<g transform="rotate(-11 44 30)"><ellipse cx="44" cy="2" rx="10.5" ry="26" fill="${k.body}"/><ellipse cx="44" cy="4" rx="5" ry="18" fill="${P}"/></g><g transform="rotate(11 76 30)"><ellipse cx="76" cy="2" rx="10.5" ry="26" fill="${k.shade}"/><ellipse cx="76" cy="4" rx="5" ry="18" fill="${P}"/></g>`;
    } else if (kind === 'cat') {
      ears = [0, 1].map((m) => mir(m, (X) => `<path d="M${X(29)} 36 L${X(27)} 9 L${X(52)} 23 Z" fill="${m ? k.shade : k.body}" stroke="${m ? k.shade : k.body}" stroke-width="6" stroke-linejoin="round"/><path d="M${X(33)} 30 L${X(32)} 16 L${X(45)} 24 Z" fill="${P}" stroke="${P}" stroke-width="3" stroke-linejoin="round"/>`)).join('');
    } else if (kind === 'dog') {
      ears = [0, 1].map((m) => mir(m, (X) => `<path d="M${X(36)} 25 C${X(24)} 19 ${X(9)} 25 ${X(7)} 42 C${X(5)} 58 ${X(13)} 72 ${X(24)} 68 C${X(31)} 65 ${X(32)} 50 ${X(33)} 41 Z" fill="${k.deep}"/>`)).join('');
    }
    const eye = eyes === 'happy'
      ? `<path d="M39.5 48 Q46 39.5 52.5 48" stroke="${C.ink}" stroke-width="3.8" stroke-linecap="round" fill="none"/><path d="M67.5 48 Q74 39.5 80.5 48" stroke="${C.ink}" stroke-width="3.8" stroke-linecap="round" fill="none"/>`
      : `<ellipse cx="46" cy="47" rx="5.6" ry="6.6" fill="${C.ink}"/><ellipse cx="74" cy="47" rx="5.6" ry="6.6" fill="${C.ink}"/><circle cx="48.2" cy="44.2" r="2.3" fill="#fff"/><circle cx="76.2" cy="44.2" r="2.3" fill="#fff"/><circle cx="44.4" cy="50.2" r="1.1" fill="#fff"/><circle cx="72.4" cy="50.2" r="1.1" fill="#fff"/>`;
    const tp = top === undefined ? k.top : top;
    const topG = tp === 'curl' ? `<path d="M57 19 C55 11 61 7 66 10.5" stroke="${k.deep}" stroke-width="3.6" stroke-linecap="round" fill="none"/>`
      : tp === 'sprout' ? `<path d="M60 20 C60 15 60.5 11 61.5 7.5" stroke="${C.gd}" stroke-width="3.4" stroke-linecap="round" fill="none"/><path d="M61 9 C55 1 45 1 42 6 C47 13 56 14 61 9Z" fill="${C.leafL}"/><path d="M61.5 8 C66 -1 77 -3 82 2 C78 10 68 13 61.5 8Z" fill="${C.g}"/><path d="M61.5 8 C67 3 73 1.5 78 2" stroke="${C.gd}" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".55"/>`
        : '';
    let snout = '';
    const mo = (y) => (mouth === 'smile'
      ? `<path d="M60 ${y - 3}V${y}M53.5 ${y} Q60 ${y + 6} 66.5 ${y}" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
      : `<path d="M53 ${y} Q60 ${y + 11} 67 ${y} Z" fill="#2A3D6A" stroke="#2A3D6A" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="60" cy="${f1(y + 5.4)}" rx="3.2" ry="1.9" fill="#FF8FA6"/>`);
    const foam = mouth === 'foam' ? `<g fill="#fff"><circle cx="49" cy="70" r="5"/><circle cx="56" cy="74" r="4.2"/><circle cx="66" cy="73" r="5.2"/><circle cx="72" cy="68" r="3.6"/></g><g fill="none" stroke="${C.foam}" stroke-width="1.6"><circle cx="49" cy="70" r="5"/><circle cx="66" cy="73" r="5.2"/></g>` : '';
    if (kind === 'elephant') {
      snout = `<path d="M44 64.5 Q49 76 56.5 68 Z" fill="#2A3D6A" stroke="#2A3D6A" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="50.5" cy="70.6" rx="2.8" ry="1.7" fill="#FF8FA6"/>
<path d="M60 58 C60 70 58 80 63 86.5 C67 91.5 75 90.5 76 84" stroke="${k.body}" stroke-width="12.5" stroke-linecap="round" fill="none"/><ellipse cx="76.4" cy="82.6" rx="2" ry="1.4" fill="${k.deep}"/>
<path d="M54.5 68.5 q5.5 2.4 11 0M55 75.5 q5 2.2 10 0" stroke="${k.deep}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
    } else if (kind === 'bear') {
      snout = `<ellipse cx="60" cy="64" rx="15.5" ry="11.5" fill="${k.belly}"/><ellipse cx="60" cy="58.6" rx="5.4" ry="3.9" fill="${C.ink}"/><ellipse cx="58.4" cy="57.6" rx="1.6" ry="1" fill="#fff" opacity=".8"/>${mouth === 'smile' ? mo(65.5) : mo(64.5)}`;
    } else if (kind === 'dog') {
      snout = `<ellipse cx="60" cy="64" rx="16.5" ry="12" fill="${k.belly}"/><ellipse cx="60" cy="58.4" rx="6" ry="4.4" fill="${C.ink}"/><ellipse cx="58.2" cy="57.2" rx="1.8" ry="1.1" fill="#fff" opacity=".8"/>${mouth === 'smile' ? mo(65.5) : mo(64.5)}`;
    } else if (kind === 'bunny') {
      snout = `<ellipse cx="60" cy="63" rx="11.5" ry="8.5" fill="${k.belly}"/><path d="M56.6 57.8h6.8l-3.4 3.6Z" fill="#FF7F9B" stroke="#FF7F9B" stroke-width="2" stroke-linejoin="round"/>${mouth === 'smile' ? `<path d="M60 61.5v2.5M54.5 64q2.75 3 5.5 0q2.75 3 5.5 0" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : mo(63.5)}`;
    } else if (kind === 'cat') {
      snout = `<path d="M57 58h6l-3 3.2Z" fill="#FF7F9B" stroke="#FF7F9B" stroke-width="2" stroke-linejoin="round"/>${mouth === 'smile' ? `<path d="M60 61v2.5M54.5 63.5q2.75 3 5.5 0q2.75 3 5.5 0" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : mo(63)}<path d="M33 57l-9-2M33 62l-9 1.5M87 57l9-2M87 62l9 1.5" stroke="${k.deep}" stroke-width="2" stroke-linecap="round"/>`;
    }
    return { ears, topG, foam, face: `${eye}<ellipse cx="37.5" cy="60" rx="6.5" ry="4" fill="${P}"/><ellipse cx="82.5" cy="60" rx="6.5" ry="4" fill="${P}"/>${snout}`, head: `<ellipse cx="60" cy="50" rx="35" ry="32" fill="${k.body}"/><path d="M88.7 31.6 A35 32 0 0 1 70 80.6 Q91 63 88.7 31.6 Z" fill="${k.shade}"/><ellipse cx="42" cy="29" rx="9" ry="4.6" fill="#fff" opacity=".38" transform="rotate(-28 42 29)"/>` };
  };
  // ui.buddy(w, opts) 吉祥物全身：w 宽（高 = w×132/120）。kind 见上；arms: down | wave（右手举起）| cheer（双手举起）| hand（右手拿东西送到嘴边）；eyes: open | happy；mouth: open | smile | foam（满嘴泡泡，刷牙用）
  // top: curl（象的一撮毛）| sprout（头顶两片小芽）| ''；shadow 脚下影子；scarf / scarfD 围巾颜色；body / shade / deep / belly 换毛色
  // hold 是拿在右手里的东西（SVG 片段，原点在手心）：wave、cheer 时画在头后面，hand 时画在脸上面
  const buddy = (w, { kind = 'bear', arms = 'down', eyes = 'open', mouth = 'open', top, shadow = true, scarf = C.o, scarfD = C.od, hold = '', ...col } = {}) => {
    const k = { ...KINDS[kind], ...col };
    const h = Math.round(w * 132 / 120);
    const hp = headParts(kind, k, { eyes, mouth, top });
    const A = (d, c = k.body) => `<path d="${d}" stroke="${c}" stroke-width="13" stroke-linecap="round" fill="none"/>`;
    const armL = arms === 'cheer' ? 'M40 91 C30 89 21 83 13 71' : 'M39 89 C31 96 29 104 31 110';
    const armR = arms === 'down' ? 'M81 89 C89 96 91 104 89 110' : arms === 'hand' ? 'M80 91 C91 93 99 87 96 75' : 'M80 91 C90 89 99 83 107 71';
    const nails = kind === 'elephant' ? '<path d="M42.5 127 a3 3 0 0 1 6 0Z M49 127 a3 3 0 0 1 6 0Z M65.5 127 a3 3 0 0 1 6 0Z M72 127 a3 3 0 0 1 6 0Z" fill="#fff"/>' : `<ellipse cx="48.5" cy="125" rx="5" ry="2.6" fill="${k.belly}"/><ellipse cx="71.5" cy="125" rx="5" ry="2.6" fill="${k.belly}" opacity=".8"/>`;
    return `<svg class="v-art" width="${w}" height="${h}" viewBox="0 0 120 132" overflow="visible">
${shadow ? '<ellipse cx="60" cy="128" rx="31" ry="4.5" fill="#1F3159" opacity=".13"/>' : ''}
${hp.ears}
<rect x="40" y="101" width="17" height="26" rx="8.5" fill="${k.body}"/><rect x="63" y="101" width="17" height="26" rx="8.5" fill="${k.shade}"/>${nails}
<path d="M36 90 C36 78 46 73 60 73 C74 73 84 78 84 90 L85 110 C85 115 82 117 78 117 L42 117 C38 117 35 115 35 110 Z" fill="${k.body}"/>
<path d="M71 75 C80 77 84 82 84 90 L85 110 C85 115 82 117 78 117 L73 117 C77 104 77 88 71 75 Z" fill="${k.shade}"/>
<ellipse cx="57" cy="105" rx="13" ry="9.5" fill="${k.belly}"/>
<path d="M37 80 C48 87 72 87 83 80 L84 87.5 C72 95.5 48 95.5 36 87.5 Z" fill="${scarf}"/>
<path d="M47 89 L69 89 L58 102 Z" fill="${scarf}" stroke="${scarf}" stroke-width="4.5" stroke-linejoin="round"/><path d="M58 89 L69 89 L58 102 Z" fill="${scarfD}" opacity=".35"/>
${hold && (arms === 'wave' || arms === 'cheer') ? `<g transform="translate(107 71)">${hold}</g>` : ''}
${A(armL)}${A(armR, arms === 'down' ? k.shade : k.body)}
${hp.head}${hp.topG}${hp.face}
${arms === 'hand' ? `${hold ? `<g transform="translate(96 75)">${hold}</g>` : ''}<circle cx="96" cy="75" r="6.5" fill="${k.body}"/>` : ''}${hp.foam}
</svg>`;
  };
  // ui.head(s, opts) 吉祥物头像（字标、头像位用）：s 是边长，kind / top / eyes / mouth 和毛色同 buddy
  const head = (s, { kind = 'bear', top, eyes = 'open', mouth = 'smile', ...col } = {}) => {
    const k = { ...KINDS[kind], ...col };
    const tp = top === undefined ? k.top : top;
    const vb = [...k.vb]; if (tp === 'sprout') { vb[1] -= 10; vb[3] += 10; }
    const hp = headParts(kind, k, { eyes, mouth: kind === 'elephant' ? 'open' : mouth, top: tp });
    return `<svg class="v-art" width="${s}" height="${s}" viewBox="${vb.join(' ')}">${hp.ears}${hp.head}${hp.topG}${hp.face}</svg>`;
  };

  // ───────── 小图标（独立 svg，放在 HTML 里） ─────────
  const ic = {
    // 小脚印（连续天数、答题进度）
    foot: (s, c = 'var(--o)') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><ellipse cx="12" cy="14.6" rx="8.4" ry="7.8" fill="${c}"/><circle cx="6" cy="5.8" r="2.7" fill="${c}"/><circle cx="12" cy="3.6" r="2.8" fill="${c}"/><circle cx="18" cy="5.8" r="2.7" fill="${c}"/></svg>`,
    // 水滴、星星、小芽：攒着换贴纸的东西
    drop: (s, c = 'var(--b)') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 1.8C12 1.8 4.4 10.2 4.4 15.2a7.6 7.6 0 0 0 15.2 0C19.6 10.2 12 1.8 12 1.8Z" fill="${c}"/><ellipse cx="9" cy="15" rx="1.9" ry="3" fill="#fff" opacity=".55" transform="rotate(18 9 15)"/></svg>`,
    star: (s, c = 'var(--y)') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8Z" fill="${c}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/></svg>`,
    sprout: (s, c = 'var(--g)') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 22V12.5" stroke="var(--gd)" stroke-width="3" stroke-linecap="round"/><path d="M12 13.5C6.5 13.5 3 10.5 3 5.5C8.5 5.5 12 8.5 12 13.5Z" fill="${C.leafL}"/><path d="M12 11.5C12 6 15 2.5 21.5 2.5C21.5 8.5 17.5 11.5 12 11.5Z" fill="${c}"/></svg>`,
    heart: (s, c = 'var(--o)') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 21C5 16 2.5 12.5 2.5 8.6A5 5 0 0 1 12 6a5 5 0 0 1 9.5 2.6C21.5 12.5 19 16 12 21Z" fill="${c}"/></svg>`,
    pin: (s, c = 'var(--o)') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 22s7.5-7 7.5-12.6A7.5 7.5 0 0 0 4.5 9.4C4.5 15 12 22 12 22Z" fill="${c}"/><circle cx="12" cy="9.6" r="3" fill="#fff"/></svg>`,
    chk: (s = 18, c = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 18 18"><path d="M4 9.5l3.2 3.2L14 5.5" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    back: (s = 20) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20"><path d="M12.5 4 6.5 10l6 6" stroke="${C.ink}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    // 实心暂停、播放（lucide 的线性暂停在厚按键里像「00」）
    pause: (s = 26, c = C.ink) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><rect x="5" y="4" width="5" height="16" rx="2.5" fill="${c}"/><rect x="14" y="4" width="5" height="16" rx="2.5" fill="${c}"/></svg>`,
    play: (s = 26, c = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M7 4.5 19 12 7 19.5Z" fill="${c}" stroke="${c}" stroke-width="3" stroke-linejoin="round"/></svg>`,
    speaker: (s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M3 9.5h4l5-4.5v14l-5-4.5H3z" fill="#fff"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>`,
  };
  // 标签栏的实心平涂图标（键是 lucide 名；没有的退回 lucide 线性图标、线宽 2.6）
  const FI = {
    house: (c) => `<path d="M4 13 14 4l10 9v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" fill="${c}"/><rect x="11" y="17" width="6" height="9" rx="2" fill="#fff"/>`,
    'layout-grid': (c) => `<rect x="4" y="4" width="20" height="20" rx="6" fill="${c}"/><path d="M9 11h10M9 17h7" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    'receipt-text': (c) => `<path d="M6 4h16v20l-4-2.5-4 2.5-4-2.5L6 24Z" fill="${c}"/><path d="M10 10h8M10 15h5" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    user: (c) => `<circle cx="14" cy="10" r="6" fill="${c}"/><path d="M3.5 25c1-5.5 5-8.5 10.5-8.5S23.5 19.5 24.5 25Z" fill="${c}"/>`,
    calendar: (c) => `<rect x="4" y="6" width="20" height="19" rx="5.5" fill="${c}"/><rect x="8.5" y="3" width="3.4" height="7" rx="1.7" fill="${c}"/><rect x="16.1" y="3" width="3.4" height="7" rx="1.7" fill="${c}"/><path d="M9.5 16.5l3 3 6-6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    gift: (c) => `<path d="M14 9C11.5 3 5 2.5 5.5 6.5 6 9 10.5 9 14 9Zm0 0C16.5 3 23 2.5 22.5 6.5 22 9 17.5 9 14 9Z" fill="${c}"/><rect x="3" y="9" width="22" height="6.5" rx="3" fill="${c}"/><rect x="5" y="14" width="18" height="11.5" rx="3.5" fill="${c}"/><path d="M3 15.2h22M14 9.5v16" stroke="#fff" stroke-width="2.6"/>`,
    star: (c) => `<path d="M14 3.5l3.2 6.6 7.2.9-5.3 5 1.4 7.2L14 19.7l-6.5 3.5 1.4-7.2-5.3-5 7.2-.9Z" fill="${c}" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/>`,
    'book-open': (c) => `<path d="M14 7.5C11 5 6.5 4.5 3 5.5v17c3.5-1 8-.5 11 2Z" fill="${c}"/><path d="M14 7.5C17 5 21.5 4.5 25 5.5v17c-3.5-1-8-.5-11 2Z" fill="${c}"/><path d="M14 7.5v17" stroke="#fff" stroke-width="2.6"/>`,
    map: (c) => `<path d="M3.5 7.5 10 4.5l8 3 6.5-3v16l-6.5 3-8-3-6.5 3Z" fill="${c}"/><path d="M10 4.5v16M18 7.5v16" stroke="#fff" stroke-width="2.4"/>`,
    heart: (c) => `<path d="M14 24.5C6.5 19 3.5 15 3.5 10.6a5.6 5.6 0 0 1 10.5-2.8 5.6 5.6 0 0 1 10.5 2.8C24.5 15 21.5 19 14 24.5Z" fill="${c}"/>`,
    trophy: (c) => `<path d="M8 4h12v7a6 6 0 0 1-12 0Z" fill="${c}"/><path d="M8 7H4.5a4 4 0 0 0 4 5M20 7h3.5a4 4 0 0 1-4 5" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/><rect x="12.3" y="16" width="3.4" height="5" fill="${c}"/><rect x="8" y="20.5" width="12" height="4.5" rx="2.2" fill="${c}"/>`,
  };
  const tabIc = (name, c) => (FI[name] ? `<svg width="28" height="28" viewBox="0 0 28 28">${FI[name](c)}</svg>` : `<span style="color:${c};display:block;line-height:0">${icon(name, 27, 2.6)}</span>`);

  const ui = {
    // F 写的是 CSS 变量，能直接放进 style="…"（字体串自带双引号，放进属性会把属性截断）
    C, F: { hd: 'var(--hd)', nu: 'var(--nu)', kai: 'var(--kai)' }, ic,
    // art 是插画零件（SVG 片段，放进 ui.scene 或自己的 svg）；C 全套颜色；F 三种字的 CSS 写法；ic 小图标
    art: { face, sun, cloud, hill, mount, ground, river, tree, tuft, bloom, flower, duck, rock, moon, road, confetti, field, gap, trail, tag, doneBadge, lock: lockG },
    buddy, head,
    // 字标：吉祥物头像 + 站酷快乐体品牌名；sym 换记号（默认小熊头），en 可选英文
    logo: (name, en = '', { sym = head(38, { kind: 'bear' }), fs } = {}) => `<div class="v-logo"${fs ? ` style="font-size:${fs}px"` : ''}>${sym}<span>${name}</span>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左边白色厚底小方键（返回），标题居中，right 放 ui.stat / ui.iconBtn
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<div class="v-ib" data-back>${ic.back()}</div>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 小方键：c = '' 白 / 'b' 天蓝（喇叭、播放）/ 'g' / 'o'；inner 是 lucide 名或现成的 svg
    iconBtn: (inner, { c = '', attrs = '', size = 22 } = {}) => `<div class="v-ib ${c}" ${attrs}>${inner.startsWith('<') ? inner : icon(inner, size, 3, c ? 'style="color:#fff"' : '')}</div>`,
    // 底部标签栏：实心平涂图标，当前格图标草绿（走 --g）、字藏青、字下面一个小圆点；其余图标 #9AA6B6、字灰蓝
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([n, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${tabIc(n, i === cur ? 'var(--g)' : C.off)}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：天蓝厚底。ic = lucide 名（白、线宽 3）；tile = 按钮右头的小黄字卡（一个汉字或 40×40 的 SVG 片段）
    btn: (text, { ic: icn = '', tile = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}><span>${text}</span>${icn ? icon(icn, 24, 3) : ''}${tile ? `<span class="bt">${/^[^<]{1,2}$/.test(tile) ? tile : `<svg width="30" height="30" viewBox="0 0 40 40">${tile}</svg>`}</span>` : ''}</div>`,
    // 厚按键（任意尺寸）：key('登录', { c: 'w', w: 120, h: 50, fs: 20 })
    key: (text, { c = 'b', w, h = 56, r = 20, fs, attrs = '', pos = '' } = {}) => `<div class="v-tk ${c}" ${attrs} style="${w ? `width:${w}px;` : 'padding:0 26px;'}height:${h}px;border-radius:${r}px;${fs ? `font-size:${fs}px;` : ''}${pos ? `position:absolute;${pos}` : ''}">${text}</div>`,
    // 字卡：白底 + 4px 彩色内圈 + 7px 同色深厚底。glyph 一两个汉字（霞鹜文楷）或 40×40 的 SVG 片段；c = b/g/y/o；pos 给了就绝对定位
    tile: (glyph, { c = 'b', s = 92, r, rot = 0, pos = '', attrs = '', lift = false } = {}) => {
      const [f, d] = KEY[c] || KEY.b;
      const inner = /^[^<]{1,2}$/.test(glyph) ? glyph : `<svg width="${Math.round(s * .64)}" height="${Math.round(s * .64)}" viewBox="0 0 40 40">${glyph}</svg>`;
      return `<div class="v-tile" ${attrs} style="width:${s}px;height:${s}px;border-radius:${r || Math.round(s * .26)}px;font-size:${Math.round(s * .63)}px;padding-bottom:${Math.round(s * .04)}px;box-shadow:inset 0 0 0 ${s > 70 ? 4 : 3}px ${f},0 ${Math.round(s * .075)}px 0 ${d}${lift ? ',0 22px 28px -10px rgba(31,49,89,.4)' : ''};${rot ? `transform:rotate(${rot}deg);` : ''}${pos ? `position:absolute;${pos}` : ''}">${inner}</div>`;
    },
    // ui.steps(n, done, opts) 一排进度记号：n 个、前 done 个点亮。shape = foot 小脚印 / star / drop / sprout / heart，或自己传 (size, color) => svg
    steps: (n, done, { shape = 'foot', s = 22, on = 'var(--o)', off = '#DDE3EA' } = {}) => { const fn = typeof shape === 'function' ? shape : ic[shape]; return `<div class="v-steps">${Array.from({ length: n }, (_, i) => fn(s, i < done ? on : off)).join('')}</div>`; },
    // 攒的数：stat(ic.drop(24), 128, C.bd)
    stat: (svg, num, color = 'var(--bd)') => `<div class="v-stat" style="color:${color}">${svg}${num}</div>`,
    // 「本周认了 12 个字」：wk('本周认了', 12, '个字')
    wk: (pre, num, post = '') => `<div class="v-wk">${pre}<b>${num}</b>${post}</div>`,
    // 立体大数字（白字 + 彩色描边 + 厚底）：num3d('1,280', { s: 28, c: C.bd })
    num3d: (text, { s = 28, c = 'var(--bd)' } = {}) => `<b style="font:700 ${s}px/1 var(--nu);color:#fff;letter-spacing:.01em;white-space:nowrap;text-shadow:0 3px 0 ${c},2px 0 0 ${c},-2px 0 0 ${c},0 -2px 0 ${c},2px 2px 0 ${c},-2px 2px 0 ${c},0 ${Math.round(s / 5.6)}px 0 ${c}">${text}</b>`,
    // ui.sticker(inner, { s, ring, rot }) 圆贴纸：白圈 + 里面一幅小画（画在 64×64 的格子里，裁成半径 25 的圆）；s 边长，ring 换圈色，rot 转角度
    sticker: (inner, { s = 64, ring = '#fff', rot = 0 } = {}) => { const cp = id('st'); return `<svg class="v-art" width="${s}" height="${s}" viewBox="0 0 64 64"${rot ? ` style="transform:rotate(${rot}deg)"` : ''}><circle cx="32" cy="34" r="30" fill="#1F3159" opacity=".1"/><circle cx="32" cy="32" r="30" fill="${ring}"/><clipPath id="${cp}"><circle cx="32" cy="32" r="25"/></clipPath><g clip-path="url(#${cp})">${inner}</g></svg>`; },
    // ui.slot({ s, next }) 贴纸空位：虚线圆。next = true 天蓝（下一个就贴这里），否则浅灰
    slot: ({ s = 64, next = false } = {}) => `<svg class="v-art" width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="${next ? '#E3F5FF' : '#F3F6F9'}" stroke="${next ? 'var(--b)' : '#D5DDE6'}" stroke-width="${next ? 3.5 : 3}" stroke-dasharray="7 6" stroke-linecap="round"/></svg>`,
    // 空字卡位：tileGap({ s: 92, r: 24, pos: 'left:30px;top:660px' })，字卡被拖走后留下的虚线框
    tileGap: ({ s = 92, r = 24, pos = '' } = {}) => `<div class="v-gap" style="width:${s}px;height:${s}px;border-radius:${r}px;${pos ? `position:absolute;${pos}` : ''}"></div>`,
    // 贴纸册：album({ title: '山水篇', got: 6, total: 8, items: [['日', 小画], ['水', 'next'], ['？', '']], cls: 'lift v-ab', style: 'left:24px;right:24px;top:412px' })
    // items 每项 [名字, 64×64 的小画]；第二项写 'next' 是下一个要贴的天蓝空位，留空是浅灰空位（名字也变灰）
    album: ({ title = '', got = '', total = '', items = [], cls = 'lift', style = '', s = 64 } = {}) => `<div class="v-card v-albm ${cls}" style="${style}"><div class="hd">${title}${got !== '' ? `<b>${got}${total !== '' ? `<small> / ${total}</small>` : ''}</b>` : ''}</div><div class="v-alb">${items.map(([t, a]) => (a === 'next' ? `<div>${ui.slot({ s, next: true })}${t}</div>` : a ? `<div>${ui.sticker(a, { s })}${t}</div>` : `<div class="no">${ui.slot({ s })}${t}</div>`)).join('')}</div></div>`,
    // 厚进度环：ring(302, .93, { sw: 18, c: 'o', inner: html, pos: 'left:36px;top:229px' })；s 外径，p 进度 0–1，c = b/g/y/o，inner 是环心的 HTML（吉祥物、数字），pos 给了就绝对定位
    ring: (s, p, { sw = 18, c = 'o', inner = '', pos = '' } = {}) => {
      const [fc, dc] = KEY[c] || KEY.o; const m = s / 2, R = (s - sw) / 2, a = -Math.PI / 2 + p * 2 * Math.PI;
      const arc = `M${m} ${m - R}A${R} ${R} 0 ${p > .5 ? 1 : 0} 1 ${f1(m + R * Math.cos(a))} ${f1(m + R * Math.sin(a))}`;
      const st = `stroke-width="${sw}" stroke-linecap="round" fill="none"`;
      return `<div class="v-ring" style="width:${s}px;height:${s}px;${pos ? `position:absolute;${pos}` : ''}"><svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><circle cx="${m}" cy="${m + 5}" r="${R}" stroke="${C.lockd}" stroke-width="${sw}" fill="none"/><circle cx="${m}" cy="${m}" r="${R}" stroke="${C.lock}" stroke-width="${sw}" fill="none"/>${p > 0 ? `<path d="${arc}" transform="translate(0 5)" stroke="${dc}" ${st}/><path d="${arc}" stroke="${fc}" ${st}/>` : ''}</svg>${inner ? `<div class="in">${inner}</div>` : ''}</div>`;
    },
    // 打卡币：dot('y', { s: 34 })，实心圆 + 厚底 + 勾；c = y 明黄 / n 夜蓝 / b / g / o
    dot: (c = 'y', { s = 34 } = {}) => { const [fc, dc] = KEY[c] || KEY.y; return `<svg class="v-art" width="${s}" height="${s}" viewBox="0 0 30 30"><circle cx="15" cy="16.5" r="13" fill="${dc}"/><circle cx="15" cy="15" r="13" fill="${fc}"/><path d="M9.5 15.5l3.6 3.6 7.4-7.6" stroke="${c === 'y' ? C.ink : '#fff'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`; },
    // 一周点阵：week({ rows: [['早', 'y', [1, 1, 1, 1, 1, 1, 1]], ['晚', 'n', [1, 1, 1, 1, 1, 1, 'next']]], days: ['日', '一', '二', '三', '四', '五', '六'], today: 6 })
    // rows 每行 [标签, 打卡币颜色, 每天状态]；状态 1 打勾 / 0 浅灰空位 / 'next' 天蓝虚线（今天还没打）；today 是今天的下标，s 是币的大小
    week: ({ rows = [], days = [], today = -1, s = 34 } = {}) => `<div class="v-week" style="grid-template-columns:28px repeat(${days.length},1fr)">${rows.map(([lb, c, st]) => `<span class="rl">${lb}</span>${st.map((v) => `<div>${v === 'next' ? ui.slot({ s, next: true }) : v ? ui.dot(c, { s }) : ui.slot({ s })}</div>`).join('')}`).join('')}<span></span>${days.map((d, i) => `<span class="d${i === today ? ' now' : ''}">${d}</span>`).join('')}</div>`,
    // 会笑的杯子：cup(190, { band: C.o, bandD: C.od })，w 宽（高 = w×1.05）；咖啡、奶茶这类店的产品角色，band / bandD 换杯身色带
    cup: (w, { band = C.o, bandD = C.od } = {}) => `<svg class="v-art" width="${w}" height="${Math.round(w * 1.05)}" viewBox="0 0 160 168">
<ellipse cx="78" cy="163" rx="66" ry="5.5" fill="#1F3159" opacity=".12"/>
<ellipse cx="78" cy="157.5" rx="62" ry="10" fill="#D7E3EE"/><ellipse cx="78" cy="153.5" rx="66" ry="11" fill="#fff"/>
<path d="M126 70 C152 70 152 112 122 112" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>
<path d="M131 77 C142 80 142 103 128 105" stroke="#E3ECF5" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M18 52 H138 L128 140 C126 152 118 158 106 158 H50 C38 158 30 152 28 140 Z" fill="#fff"/>
<path d="M114 52 H138 L128 140 C126 152 118 158 106 158 H101 C112 147 117 112 114 52 Z" fill="#E7EFF7"/>
<path d="M24 100 H132 L128 130 H28 Z" fill="${band}"/><path d="M115.5 100 H132 L128 130 H113.5 C115.5 120 116 110 115.5 100 Z" fill="${bandD}" opacity=".45"/>
<ellipse cx="78" cy="52" rx="60" ry="15" fill="#fff"/><ellipse cx="78" cy="53" rx="53" ry="11.5" fill="#C98B55"/>
<path d="M78 61.5 C68 57 62.5 53 65.5 49 C68 46 72.5 46.5 78 50.5 C83.5 46.5 88 46 90.5 49 C93.5 53 88 57 78 61.5 Z" fill="#FFF2DD"/>
<circle cx="58" cy="51" r="2.2" fill="${C.y}"/><circle cx="99" cy="55" r="1.8" fill="${C.y}"/><circle cx="94" cy="47" r="1.5" fill="${C.y}"/>
<circle cx="60" cy="80" r="5.4" fill="${C.ink}"/><circle cx="96" cy="80" r="5.4" fill="${C.ink}"/><circle cx="62" cy="78" r="1.9" fill="#fff"/><circle cx="98" cy="78" r="1.9" fill="#fff"/>
<path d="M70 88 q8 8 16 0" stroke="${C.ink}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
<ellipse cx="48" cy="90" rx="7" ry="4.2" fill="${C.pink}"/><ellipse cx="108" cy="90" rx="7" ry="4.2" fill="${C.pink}"/>
<path d="M62 30 q-8 -10 0 -20 M84 30 q-8 -10 0 -20" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
</svg>`,
    // 插画画布：scene(w, h, svg 内容, { bg, r, pos, cls })，r 圆角会把画裁进去
    scene: (w, h, inner, { bg = C.sky, r = 0, pos = '', cls = '', attrs = '' } = {}) => { const cp = id('sc'); return `<div class="v-scene ${cls}" ${attrs} style="width:${w}px;height:${h}px;${r ? `border-radius:${r}px;` : ''}${pos ? `position:absolute;${pos}` : ''}"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${r ? `<defs><clipPath id="${cp}"><rect width="${w}" height="${h}" rx="${r}"/></clipPath></defs><g clip-path="url(#${cp})">` : '<g>'}${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}${inner}</g></svg></div>`; },
  };
  return { key: 's08-playful', no: 8, name: '插画童趣', root: 's08', T, css, ui, stage: '#FFD24D', stageInk: C.ink, dark: false };
};
