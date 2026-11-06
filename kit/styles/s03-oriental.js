// 03 新中式 Neo-Chinese —— 起手包
// 色值、字体、线宽、滤镜、印章、月洞门、扇面、远山、桂枝都照图册模块 catalog/pages/s03-oriental.js（一盏）原样取
// 用法：const S = style('s03-oriental'); 屏幕根元素 <div class="scr s03">；组件见 S.ui
module.exports = (L) => {
  const { icon, img } = L;
  const C = { xuan: '#F2EEE3', mo: '#1E1C1A', dan: '#8C877C', zhu: '#C2372B', qing: '#93A99B' };
  const T = {
    bg: C.xuan,              // 宣纸：页面底色（上面再叠一层纸纹）
    surface: C.xuan,         // 这个风格没有卡片底色：块面都是纸上的细框，标签栏透明
    ink: C.mo,               // 浓墨：字、主按钮
    ink2: C.dan,             // 淡墨：标签、题款、未选中的标签栏
    line: 'rgba(43,41,38,.14)',  // 列表分隔线；细框用 .3，外框用 .42
    primary: C.mo,           // 主按钮、选中的日期都是浓墨块；朱砂不做按钮
    onPrimary: C.xuan,
    accents: { zhu: C.zhu, qing: C.qing },   // 朱砂：只给印章和「当前」的一个小点；青瓷：展示板、舞台
    fonts: { title: '"Ma Shan Zheng"', body: '"Noto Serif SC"', num: '"Cormorant Garamond"', ui: '"LXGW WenKai"' },  // ui：按钮、字标
    radius: 0,
    border: '1px solid rgba(43,41,38,.3)',   // 细框、月洞门的圈
    shadow: null,
    margin: 24,
    photo: 'sepia(.18) saturate(.62) brightness(1.05) contrast(.9)',  // 默认：偏暖、偏淡
    // 另外几组照片滤镜：warm 给器物、茶汤（首页月洞门），pale 给色重的照片（深色茶汤、深色木器），ink 给山水、竹林（变成水墨）
    photos: {
      warm: 'sepia(.5) saturate(.55) hue-rotate(-6deg) brightness(1.07) contrast(.9)',
      pale: 'sepia(.7) saturate(.7) hue-rotate(-6deg) brightness(1.18) contrast(.8)',
      ink: 'grayscale(1) sepia(.3) brightness(1.18) contrast(.86)',
      fan: 'grayscale(1) sepia(.32) brightness(1.16) contrast(1.02)',
    },
  };

  // 宣纸：细颗粒 + 几处极淡的明暗
  const PAPER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.95' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .33 0 0 0 0 .28 0 0 0 0 .2 .26 0 0 0 -.085'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E"),radial-gradient(90% 50% at 15% 8%,rgba(255,255,255,.45),transparent 70%),radial-gradient(70% 40% at 95% 70%,rgba(160,140,100,.07),transparent 70%)`;
  const LN = 'rgba(43,41,38,.14)', FR = 'rgba(43,41,38,.3)';
  // 记号色：印章、标签栏小点、选中的单选圈都走它。项目 CSS 写 .p{--v03-mark:#3D4F63} 一处全换
  const MARK = `var(--v03-mark,${C.zhu})`;

  const css = `
.s03{background:${PAPER},${C.xuan};color:${C.mo};font-family:"Noto Serif SC",serif;font-size:15px;line-height:1.6}
.s03 .mn-t{font-family:"Noto Serif SC";font-weight:600;letter-spacing:.12em}
.s03 .mn-l{color:${C.mo}}
.s03 .v-pad{padding-left:24px;padding-right:24px}
/* 字：标题马善政楷书（可竖排），正文思源宋体，数字 Cormorant，按钮和字标霞鹜文楷 */
.s03 .v-h1{font:400 40px/1.1 "Ma Shan Zheng";letter-spacing:.2em;color:${C.mo}}
.s03 .v-h2{font:400 34px/1 "Ma Shan Zheng";letter-spacing:.24em;color:${C.mo}}
.s03 .v-h3{font:600 17px/1.4 "Noto Serif SC";letter-spacing:.08em}
.s03 .v-tx{font:400 15px/1.8 "Noto Serif SC";letter-spacing:.06em}
.s03 .v-mut{font:400 13px/1.5 "Noto Serif SC";letter-spacing:.2em;color:${C.dan}}
/* 居中：大字距的字末尾多一格字距，左边补同样的内边距，字才正 */
.s03 .v-ctr{text-align:center}
.s03 .v-ctr .v-h1,.s03 .v-ctr .v-mut{padding-left:.2em}
.s03 .v-ctr .v-h2{padding-left:.24em}
.s03 .v-ctr .v-lb{padding-left:.3em}
.s03 .v-lb{font:400 13px/1 "Noto Serif SC";letter-spacing:.3em;color:${C.dan}}
.s03 .v-num{font-family:"Cormorant Garamond";font-weight:500;letter-spacing:.01em;font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1}
.s03 .v-big{font:500 64px/1 "Cormorant Garamond";letter-spacing:.02em;font-feature-settings:"lnum" 1}
.s03 .v-price{display:inline-block;font:500 32px/1 "Cormorant Garamond";font-feature-settings:"lnum" 1;color:${C.mo}}
.s03 .v-price::first-letter{font-size:20px;margin-right:2px}
.s03 .v-price small{font:400 13px/1 "Noto Serif SC";letter-spacing:.2em;color:${C.dan};margin-left:4px}
/* 竖排：大标题（题字）和题款 */
.s03 .v-vt{writing-mode:vertical-rl;text-orientation:upright;font:400 60px/1 "Ma Shan Zheng";letter-spacing:.04em;color:${C.mo};white-space:nowrap}
.s03 .v-ins{writing-mode:vertical-rl;text-orientation:upright;font:400 13px/1 "Noto Serif SC";letter-spacing:.5em;color:${C.dan};white-space:nowrap}
/* 按钮：浓墨直角块，霞鹜文楷，字距拉开；ghost 是 1px 浓墨细框 */
.s03 .v-btn{height:48px;min-width:164px;padding:0 24px 0 calc(24px + .4em);display:inline-flex;align-items:center;justify-content:center;gap:10px;background:${C.mo};color:${C.xuan};font:500 17px/1 "LXGW WenKai";letter-spacing:.4em;white-space:nowrap}
.s03 .v-btn.wide{display:flex;width:100%}
.s03 .v-btn.ghost{background:transparent;color:${C.mo};border:1px solid ${C.mo}}
.s03 .v-btn.lg{height:56px;font-size:20px}
/* 卡片：没有底色和阴影，只有一道细框，照片在框里缩进 8px */
.s03 .v-card{position:relative;border:1px solid ${FR};padding:8px}
.s03 .v-card>.ph{height:180px}
.s03 .v-card .bd{padding:14px 8px 6px}
/* 列表：行之间一道极淡的细线，首尾封口 */
.s03 .v-list{border-bottom:1px solid ${LN}}
.s03 .v-row{display:flex;align-items:center;justify-content:space-between;min-height:54px;border-top:1px solid ${LN};font:400 15px/1.4 "Noto Serif SC";letter-spacing:.06em}
.s03 .v-row>i{font-style:normal;width:76px;flex:none;font-size:13px;color:${C.dan};letter-spacing:.3em}
.s03 .v-row.kv{justify-content:flex-start;min-height:48px}
/* 约满：时间变淡，「已约满」保持淡墨原色，缩小了也读得出 */
.s03 .v-row.off .v-num{opacity:.42}
.s03 .v-row em{font-style:normal;font-size:14px;color:${C.dan};letter-spacing:.12em}
.s03 .v-row.on em{color:${C.mo}}
.s03 .v-row .v-num{font-size:21px}
/* 单选圈：选中涂记号色（同时字色变深，不只靠颜色） */
.s03 .v-ck{display:inline-block;width:18px;height:18px;border-radius:50%;border:1px solid ${FR};margin-left:14px;vertical-align:-4px}
.s03 .on>em>.v-ck,.s03 .v-ck.on{background:${MARK};border-color:${MARK}}
/* 日期：周几一行小字，日期 Cormorant，选中是浓墨圆 */
.s03 .v-days{display:flex;justify-content:space-between}
.s03 .v-day{width:40px;text-align:center;color:${C.dan}}
.s03 .v-day i{display:block;font-style:normal;font-size:12px;line-height:1.4}
.s03 .v-day b{display:block;margin:8px auto 0;width:40px;height:40px;border-radius:50%;font:500 21px/40px "Cormorant Garamond";font-feature-settings:"lnum" 1;color:${C.mo}}
.s03 .v-day.on b{background:${C.mo};color:${C.xuan}}
/* 筛选：细框直角，选中浓墨底 */
.s03 .v-chips{display:flex;gap:10px;flex-wrap:wrap}
.s03 .v-chip{height:34px;padding:0 12px 0 calc(12px + .2em);display:inline-flex;align-items:center;border:1px solid ${FR};font:400 14px/1 "Noto Serif SC";letter-spacing:.2em;color:${C.mo}}
.s03 .v-chip.on{background:${C.mo};border-color:${C.mo};color:${C.xuan}}
.s03 .v-inp{height:48px;display:flex;align-items:center;gap:10px;border-bottom:1px solid ${FR};font:400 15px/1 "Noto Serif SC";letter-spacing:.06em;color:${C.dan}}
/* 照片 */
.s03 .ph{background-size:cover;background-position:center;filter:${T.photo}}
/* 印章 */
.s03 .v-seal{display:block}
/* 月洞门：照片圆 + 两道细圈 */
.s03 .v-moon{position:relative;flex:none}
.s03 .v-moon .ring{position:absolute;border:1px solid ${FR};border-radius:50%}
.s03 .v-moon .ph{position:absolute;border-radius:50%;background-repeat:no-repeat}
/* 细框照片：照片在细框里缩进 8px */
.s03 .v-frame{position:relative;border:1px solid ${FR};padding:8px}
.s03 .v-frame>.ph{width:100%;height:100%}
/* 远山：水墨雾山叠在纸上，上下渐隐 */
.s03 .v-hills{position:absolute;left:0;right:0;background-size:cover;filter:grayscale(1) sepia(.45) hue-rotate(108deg) saturate(.9) contrast(1.1) brightness(1.06);mix-blend-mode:multiply;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 38%,#000 62%,transparent 100%);pointer-events:none}
/* 笺：竖排信笺，细双框 + 乌丝栏，第一列在最右 */
.s03 .v-jian{position:relative;display:flex;flex-direction:row-reverse;border:1px solid rgba(43,41,38,.42);outline:1px solid rgba(43,41,38,.16);outline-offset:4px;background:rgba(255,253,247,.4)}
.s03 .v-jian>div{writing-mode:vertical-rl;text-orientation:upright;padding:28px 0 0;border-left:1px solid ${LN};font:400 20px/1 "Noto Serif SC";letter-spacing:.24em;color:${C.mo};display:flex;align-items:center;white-space:nowrap}
.s03 .v-jian>div:last-child{border-left:none}
.s03 .v-jian>div i{flex:none;height:68px;font-style:normal;font-size:12px;letter-spacing:.3em;color:${C.dan}}
.s03 .v-jian>div.t{font:400 46px/1 "Ma Shan Zheng";letter-spacing:.12em;padding-top:32px}
/* 底部操作条（价格 + 按钮） */
.s03 .v-bar{position:absolute;left:24px;right:24px;bottom:40px;display:flex;align-items:center;justify-content:space-between;z-index:6}
.s03 .v-bar>div>small{font-size:13px;color:${C.dan};letter-spacing:.2em;margin-right:10px}
/* 顶栏、标签栏、字标 */
.s03 .v-nav{position:relative;height:44px;margin:0 12px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.s03 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:600 17px/1 "Noto Serif SC";letter-spacing:.12em;white-space:nowrap}
.s03 .v-wm{font:500 20px/1 "LXGW WenKai";letter-spacing:.32em;padding-left:12px;color:${C.mo};white-space:nowrap}
.s03 .v-logo{display:flex;align-items:center;gap:22px}
.s03 .v-logo b{font:500 34px/1 "LXGW WenKai";letter-spacing:.3em;white-space:nowrap}
.s03 .v-logo em{font:500 13px/1 "Cormorant Garamond";font-style:normal;letter-spacing:.3em;color:${C.dan};text-transform:uppercase}
.s03 .v-tabs{position:absolute;left:0;right:0;bottom:30px;height:48px;display:flex;justify-content:space-around;align-items:center;font:400 14px/1 "Noto Serif SC";letter-spacing:.2em;color:${C.dan};z-index:6}
.s03 .v-tabs span{position:relative;padding-left:.2em}
.s03 .v-tabs .on{color:${C.mo};font-weight:600}
.s03 .v-tabs .on:after{content:"";position:absolute;left:50%;top:-10px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:${MARK}}
/* 网页 */
.s03.web{background:${PAPER},${C.xuan}}
.s03 .v-wnav{position:absolute;left:80px;right:80px;top:40px;display:flex;align-items:center;z-index:5}
.s03 .v-wnav nav{margin-left:auto;display:flex;gap:56px;font:400 24px/1 "Noto Serif SC";letter-spacing:.3em}
.s03 .v-wnav .v-btn{margin-left:64px;height:56px;font:400 24px/1 "Noto Serif SC";letter-spacing:.3em;padding:0 28px 0 35px;min-width:0}
.s03.web .v-ins{font-size:20px}
`;

  // ── 印章：竖长方白文印，字撑满印面，边缘和印面有钤印的毛口 ──
  // 印章字用 fonts.css 里的站酷小薇（OFL）：图册原稿的字是苹果系统字体，安卓上没有；
  // 「一」画成一道横，下面的字占三分之二
  let sid = 0;
  const SEAL_FONT = '"ZCOOL XiaoWei"';
  function glyph(ch, x, top, bot, sx, fill, font, weight, cw) {
    const fs = (bot - top) / 0.86, base = bot - fs * 0.07;
    return `<text x="${x}" y="${base.toFixed(2)}" text-anchor="middle" font-family='${font}' font-weight="${weight}" font-size="${fs.toFixed(2)}" fill="${fill}" stroke="${fill}" stroke-width="${cw}" stroke-linejoin="round" transform="matrix(${sx} 0 0 1 ${(x * (1 - sx)).toFixed(2)} 0)">${ch}</text>`;
  }
  // seal('和缓', { w: 46, color, at: 'left:282px;top:318px', font, weight })：一到两个字竖排；四个字排成方印（右起竖读）；color 默认跟记号色
  function seal(chars = '印', { w = 46, color = MARK, paper = C.xuan, at = '', font = SEAL_FONT, weight = 400, cls = '' } = {}) {
    const cs = [...chars];
    const id = 'v03s' + (++sid);
    const sq = cs.length >= 3;
    const VW = sq ? 40 : 30, VH = 40, h = Math.round(w * VH / VW);
    const cw = weight >= 700 ? 0.2 : 0.42;
    let inner;
    if (sq) {
      inner = glyph(cs[0], 30, 3.8, 19.4, 1.05, paper, font, weight, cw) + glyph(cs[1], 30, 21, 36.4, 1.05, paper, font, weight, cw)
        + glyph(cs[2], 10.6, 3.8, 19.4, 1.05, paper, font, weight, cw) + glyph(cs[3] || '', 10.6, 21, 36.4, 1.05, paper, font, weight, cw);
    } else if (cs.length === 1) {
      inner = glyph(cs[0], 15, 6, 34, 0.9, paper, font, weight, cw);
    } else if (cs[0] === '一') {
      inner = `<rect x="6.2" y="8.4" width="17.6" height="3.4" fill="${paper}"/>${glyph(cs[1], 15, 15.4, 36.2, 1.12, paper, font, weight, cw)}`;
    } else {
      inner = `${glyph(cs[0], 15, 3.8, 19.4, 1.24, paper, font, weight, cw)}${glyph(cs[1], 15, 21, 36.4, 1.24, paper, font, weight, cw)}`;
    }
    const pos = at ? `style="position:absolute;${at}"` : '';
    return `<svg class="v-seal ${cls}" ${pos} width="${w}" height="${h}" viewBox="0 0 ${VW} ${VH}"><defs><filter id="${id}" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="${sid + 2}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".9" xChannelSelector="R" yChannelSelector="G" result="d"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -7 5.45" result="m"/><feComposite in="d" in2="m" operator="in"/></filter></defs>
<g filter="url(#${id})"><rect x="1" y="1" width="${VW - 2}" height="38" rx="1.4" style="fill:${color}"/>${inner}</g></svg>`;
  }

  // ── 月洞门：moonGate(img('xxx'), { d: 272, at: 'left:38px;top:98px', size: '560px auto', pos: '-120px -64px', filter: T.photos.warm }) ──
  // d 是照片圆的直径；外面两道细圈，整块宽 d+28。at 不传就是普通块（居中放）
  // 白天空、白雾的山水照传 blend: 'multiply'，白处吃进纸色，圆里只剩墨色的山
  function moonGate(src, { d = 272, at = '', size = 'cover', pos = 'center', filter = T.photo, blend = '', extra = '' } = {}) {
    const W = d + 28;
    return `<div class="v-moon" style="width:${W}px;height:${W}px;${at ? 'position:absolute;' + at : 'margin:0 auto'}">
<div class="ring" style="inset:0;opacity:.55"></div><div class="ring" style="inset:5px"></div>
<div class="ph" style="inset:14px;background-image:url(${src});background-size:${size};background-position:${pos};filter:${filter}${blend ? ';mix-blend-mode:' + blend : ''}"></div>${extra}</div>`;
  }

  // ── 扇面：fan(img('xxx'), { R: 264, r: 112, a: 33 })，R/r 是外/内半径，a 是单边张角；照片按扇面裁，外面一道细框 ──
  let fid = 0;
  function fan(src, { R = 264, r = 112, a = 33, align = 'xMidYMid', filter = T.photos.fan, at = '' } = {}) {
    const Ro = R + 8, ro = r - 8, ao = a + 1.2;
    const rad = (x) => (x * Math.PI) / 180;
    const W = Math.ceil(2 * Ro * Math.sin(rad(ao))) + 2, H = Math.ceil(Ro - ro * Math.cos(rad(ao))) + 2;
    const cx = W / 2, cy = Ro + 1;
    const path = (RR, rr, aa) => {
      const t = rad(aa), s = Math.sin(t), c = Math.cos(t);
      const p = (q, k) => `${(cx + k * q * s).toFixed(1)} ${(cy - q * c).toFixed(1)}`;
      return `M ${p(RR, -1)} A ${RR} ${RR} 0 0 1 ${p(RR, 1)} L ${p(rr, 1)} A ${rr} ${rr} 0 0 0 ${p(rr, -1)} Z`;
    };
    const id = 'v03f' + (++fid);
    return `<svg class="v-fan" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;${at ? 'position:absolute;' + at : 'margin:0 auto'}">
<defs><clipPath id="${id}"><path d="${path(R, r, a)}"/></clipPath></defs>
<image href="${src}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="${align} slice" clip-path="url(#${id})" style="filter:${filter};mix-blend-mode:multiply"/>
<path d="${path(Ro, ro, ao)}" fill="none" stroke="${FR}" stroke-width="1"/></svg>`;
  }

  // ── 细框照片：frame(img('xxx'), { w: 240, h: 360, pos, filter, at }) ──
  const frame = (src, { w = 240, h = 360, pos = 'center', size = 'cover', filter = T.photo, at = '' } = {}) =>
    `<div class="v-frame" style="width:${w}px;height:${h}px;${at ? 'position:absolute;' + at : ''}"><div class="ph" style="background-image:url(${src});background-position:${pos};background-size:${size};filter:${filter}"></div></div>`;

  // ── 远山：hills({ top: 380, h: 440, op: .5, pos: 'center 64%' })，默认图库的蓝色雾山，叠成水墨 ──
  const hills = ({ top = 380, h = 440, op = 0.34, pos = 'center 72%', src = img('mist-mountains-blue') } = {}) =>
    `<div class="v-hills" style="top:${top}px;height:${h}px;opacity:${op};background-image:url(${src});background-position:${pos}"></div>`;

  // ── 一枝桂花（墨色没骨）：sprig(214, { flowers: true, at: 'left:0;top:594px' }) ──
  function rnd(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function stroke(pts, w0, w1) {
    const n = pts.length, Lp = [], Rp = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
      const w = (w0 + (w1 - w0) * (i / (n - 1))) / 2, nx = -dy / d * w, ny = dx / d * w;
      Lp.push(`${(pts[i][0] + nx).toFixed(1)} ${(pts[i][1] + ny).toFixed(1)}`); Rp.unshift(`${(pts[i][0] - nx).toFixed(1)} ${(pts[i][1] - ny).toFixed(1)}`);
    }
    return `M${Lp.join('L')}L${Rp.join('L')}Z`;
  }
  function bez(p0, p1, p2, p3, n = 24) {
    const o = [];
    for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; o.push([0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k])); }
    return o;
  }
  const leafD = (Lx, W) => `M0 0C${Lx * .22} ${-W} ${Lx * .62} ${-W * 1.05} ${Lx} ${-W * .25}C${Lx * .66} ${W * .5} ${Lx * .3} ${W * .72} 0 0Z`;
  let gid = 0;
  function sprig(w = 214, { flowers = true, ink = C.mo, at = '' } = {}) {
    const r = rnd(7), k0 = ++gid;
    const main = bez([0, 126], [56, 116], [118, 86], [214, 34]);
    const twig = bez([96, 96], [112, 97], [128, 104], [146, 118], 12);
    const atp = (pts, t) => pts[Math.round(t * (pts.length - 1))];
    const ang = (pts, t) => { const i = Math.round(t * (pts.length - 1)), a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; };
    const leaves = [], fl = [];
    const put = (pts, t, side, len, k) => {
      const [x, y] = atp(pts, t), a = ang(pts, t) + side * (36 + r() * 20), W = len * .26;
      leaves.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)})${side > 0 ? ' scale(1 -1)' : ''}"><path d="${leafD(len, W)}" fill="url(#v03lf${k0}${k})"/><path d="M1.5 0Q${len * .5} ${-W * .38} ${len * .94} ${-W * .25}" stroke="${ink}" stroke-opacity=".75" stroke-width=".7" fill="none"/></g>`);
    };
    const bloom = (pts, t, k) => {
      const [x, y] = atp(pts, t);
      for (let i = 0; i < k; i++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 5.5;
        const c = `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y - 2 + Math.sin(a) * d * .8).toFixed(1)}" r="${(1 + r() * .55).toFixed(2)}" fill="${r() < .3 ? '#B07E30' : '#D2A250'}"/>`;
        if (flowers) fl.push(c);
      }
    };
    put(main, .26, -1, 34, 1); put(main, .4, 1, 38, 2); put(main, .54, -1, 31, 1); put(main, .68, 1, 30, 2); put(main, .82, -1, 26, 1); put(main, .96, 1, 21, 2);
    put(twig, .75, 1, 25, 2); put(twig, 1, -1, 20, 1);
    bloom(main, .34, 11); bloom(main, .61, 9); bloom(main, .76, 7); bloom(twig, .4, 7);
    const h = Math.round(w * 140 / 230);
    return `<svg class="v-sprig" width="${w}" height="${h}" viewBox="0 0 230 140" style="display:block;overflow:visible;${at ? 'position:absolute;' + at : ''}"><defs>
<linearGradient id="v03lf${k0}1" x1="0" x2="1"><stop offset="0" stop-color="${ink}" stop-opacity=".78"/><stop offset="1" stop-color="${ink}" stop-opacity=".46"/></linearGradient>
<linearGradient id="v03lf${k0}2" x1="0" x2="1"><stop offset="0" stop-color="${ink}" stop-opacity=".58"/><stop offset="1" stop-color="${ink}" stop-opacity=".3"/></linearGradient></defs>
<path d="${stroke(main, 4, .8)}" fill="${ink}" opacity=".82"/><path d="${stroke(twig, 2, .6)}" fill="${ink}" opacity=".74"/>${leaves.join('')}${fl.join('')}</svg>`;
  }

  // ── 冰裂纹圆窗（展示板、舞台、网页大背景用）：lattice(900, { op: .17, color: '#fff', at: 'left:50%;top:50%' }) ──
  function iceCrack(Sz, seed, minA) {
    const r = rnd(seed), out = [], q = [[[0, 0], [Sz, 0], [Sz, Sz], [0, Sz]]];
    const area = (P) => Math.abs(P.reduce((a, p, i) => { const n = P[(i + 1) % P.length]; return a + p[0] * n[1] - n[0] * p[1]; }, 0)) / 2;
    while (q.length) {
      const P = q.pop();
      if (area(P) < minA * (.6 + r() * .8)) { out.push(P); continue; }
      const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
      const cx = xs.reduce((a, b) => a + b) / P.length, cy = ys.reduce((a, b) => a + b) / P.length;
      const wide = Math.max(...xs) - Math.min(...xs) > Math.max(...ys) - Math.min(...ys);
      const th = (wide ? Math.PI / 2 : 0) + (r() - .5) * 1.1, dx = Math.cos(th), dy = Math.sin(th);
      const px = cx + (r() - .5) * 18, py = cy + (r() - .5) * 18;
      const side = (p) => dx * (p[1] - py) - dy * (p[0] - px);
      const A = [], B = [];
      for (let i = 0; i < P.length; i++) {
        const a = P[i], b = P[(i + 1) % P.length], sa = side(a), sb = side(b);
        (sa >= 0 ? A : B).push(a);
        if ((sa >= 0) !== (sb >= 0)) { const t = sa / (sa - sb), m = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; A.push(m); B.push(m); }
      }
      if (A.length < 3 || B.length < 3) { out.push(P); continue; }
      q.push(A, B);
    }
    return out.map((P) => 'M' + P.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z').join('');
  }
  let lid = 0;
  const lattice = (d = 640, { op = 0.22, color = '#fff', seed = 5, at = 'left:50%;top:50%' } = {}) => {
    const R = d / 2 - 22, id = 'v03l' + (++lid);
    const centered = /left:50%/.test(at) && /top:50%/.test(at);
    return `<svg style="position:absolute;${at};width:${d}px;height:${d}px;${centered ? `margin:${-d / 2}px 0 0 ${-d / 2}px;` : ''}pointer-events:none" viewBox="0 0 ${d} ${d}"><defs><clipPath id="${id}"><circle cx="${d / 2}" cy="${d / 2}" r="${R}"/></clipPath></defs>
<g clip-path="url(#${id})" opacity="${op}"><path d="${iceCrack(d, seed, d * d / 70)}" fill="none" stroke="${color}" stroke-width="1.4" stroke-linejoin="round"/></g>
<circle cx="${d / 2}" cy="${d / 2}" r="${R}" fill="none" stroke="${color}" stroke-opacity=".75" stroke-width="1.6"/><circle cx="${d / 2}" cy="${d / 2}" r="${d / 2 - 4}" fill="none" stroke="${color}" stroke-opacity=".45" stroke-width="1"/></svg>`;
  };

  const back = icon('chevron-left', 24, 1.4);
  const ui = {
    seal, moonGate, fan, frame, hills, sprig, lattice,
    // 字标：印章 + 霞鹜文楷大字距（网页顶栏 34px，App 里传 size: 22）；en 可选（Cormorant 大写）；mark 是印章里的字，默认取品牌名前两个字；color 是印章颜色，默认跟记号色；seal: false 只要字
    logo: (name, en = '', { mark = [...name].slice(0, 2).join(''), seal: withSeal = true, w = 34, size = 34, color } = {}) =>
      `<div class="v-logo">${withSeal ? seal(mark, { w, color }) : ''}<b style="font-size:${size}px">${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // wm(name)：小程序左上角的字标（只有字，放进 miniNav 的 left）
    wm: (name) => `<span class="v-wm">${name}</span>`,
    // back(attrs)：返回箭头（细线 chevron，放进 miniNav 的 left）
    back: (attrs = 'data-back') => `<span ${attrs} style="display:flex">${back}</span>`,
    // App 顶栏：细线返回 + 居中宋体标题；小程序用 L.miniNav
    nav: ({ title = '', back: b = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (b ? `<span data-back style="display:flex">${back}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 底部标签栏：只有字（这个风格不画图标，items 里的图标名忽略），当前格字变浓墨加粗，头上一个朱砂小点
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([, t], i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 主按钮：浓墨直角块；ic 默认不要图标
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${text}${ic ? icon(ic, 18, 1.4) : ''}</div>`,
    // 竖排题字：vt('桂花乌龙', { size: 60, at: 'left:292px;top:426px' })
    vt: (text, { size = 60, at = '' } = {}) => `<div class="v-vt" style="font-size:${size}px;${at ? 'position:absolute;' + at : ''}">${text}</div>`,
    // 竖排题款（节气、日期）：ins('丙午霜降', { at: 'left:266px;top:432px' })
    ins: (text, { size = 13, at = '' } = {}) => `<div class="v-ins" style="font-size:${size}px;${at ? 'position:absolute;' + at : ''}">${text}</div>`,
    // 日期一行：days([['六', 7], ['日', 8], …], 0)
    days: (list, cur = 0) => `<div class="v-days">${list.map(([w, d], i) => `<div class="v-day ${i === cur ? 'on' : ''}"><i>${w}</i><b>${d}</b></div>`).join('')}</div>`,
    // 时段一行：slot('14:00 — 16:00', '余一席', 'on' | 'off' | '')；放进 .v-list
    slot: (time, note, state = '', attrs = '') => `<div class="v-row ${state}" ${attrs}><span class="v-num">${time}</span><em>${note}<i class="v-ck" ${state === 'off' ? 'style="opacity:0"' : ''}></i></em></div>`,
    // 参数一行：kv('产地', '福建 · 安溪')；放进 .v-list
    kv: (k, v) => `<div class="v-row kv"><i>${k}</i>${v}</div>`,
    // 笺：竖排信笺，第一列在最右。cols = ['温阳灸', ['日期', '十一月七日'], …]；字符串列用题字大字，[标签, 内容] 列用宋体
    // jian(cols, { cw: 56, h: 380, fs: 20, ts: 46, seal: seal('和缓', { w: 34 }), at })；cw 列宽，fs 正文字号，ts 题字字号；印章压在左下角
    // 高度按最长一列定，留一点底（字占八成），整块放在留白中间，不要拉满一屏
    jian: (cols, { cw = 56, h = 380, fs = 20, ts = 46, seal: sl = '', at = '' } = {}) => `<div class="v-jian" style="height:${h}px;${at ? 'position:absolute;' + at : 'margin:0 auto;width:max-content'}">${cols.map((c) => (Array.isArray(c)
      ? `<div style="width:${cw}px;font-size:${fs}px"><i>${c[0]}</i>${c[1]}</div>`
      : `<div class="t" style="width:${Math.round(cw * 1.3)}px;font-size:${ts}px">${c}</div>`)).join('')}${sl ? `<span style="position:absolute;left:14px;bottom:16px">${sl}</span>` : ''}</div>`,
    // 网页顶栏：webNav(ui.logo('一盏'), ['茶席', '茶品'], '预约')
    webNav: (logo, links = [], cta = '', ctaAttrs = '') => `<div class="v-wnav">${logo}<nav>${links.map((t) => `<span>${t}</span>`).join('')}</nav>${cta ? `<div class="v-btn ghost" ${ctaAttrs}>${cta}</div>` : ''}</div>`,
  };
  return { key: 's03-oriental', no: 3, name: '新中式', root: 's03', T, css, ui, stage: C.qing, dark: false };
};
