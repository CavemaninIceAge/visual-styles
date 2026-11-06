// 01 留白极简 Minimal —— 起手包
// 色值、字体、字号、圆角、按钮、标签栏都照图册模块 catalog/pages/s01-minimal.js（声白）原样取
// 用法：const S = style('s01-minimal'); 屏幕根元素 <div class="scr s01">；组件见 S.ui
// 这个风格的四条底线：白和浅灰铺底、只有一个彩色按钮；一种黑体、细字重、不加粗；一屏一样东西、对齐一条边；产品去背景放正中
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#FFFFFF',          // 纸白：页面底
    surface: '#F2F2F0',     // 浅灰：产品大卡、展台
    ink: '#161616',         // 墨黑：主字
    ink2: '#8C8C89',        // 烟灰：次要字（规格、时间、标签名）
    line: '#E8E8E5',        // 极少用：只在列表要分行时用一根发丝线
    primary: '#C65A20',     // 锈橙：整屏只给一个按钮
    onPrimary: '#FFFFFF',
    accents: { tabOff: '#A3A3A0', stageHi: '#F8F8F6', stageMid: '#F1F1EE', stageLo: '#ECECE9', webHi: '#F6F6F4', webMid: '#F0F0ED', webLo: '#E9E9E5' },  // 标签栏未选中字、展台渐变三色、网页底渐变三色
    fonts: { title: '"Noto Sans SC"', body: '"Noto Sans SC"', num: '"Noto Sans SC"' },  // 只用思源黑体：标题 200/300，正文 400，数字 300
    radius: 24,             // 产品大卡（首页通栏大卡 26）
    border: null,           // 不描边
    shadow: null,           // 不加卡片阴影；只有产品脚下的接地影
    margin: 28,             // 文字左边线；顶栏图标 24
    photo: 'saturate(.9) brightness(1.04)',
  };
  const css = `
/* 换品牌只改这些变量：--acc 主色、--on 按钮字色、--bg 页面底和标签栏、--mist 卡片和次按钮、--st1/2/3 展台渐变、--wb1/2/3 网页底渐变 */
.s01{--bg:${T.bg};--mist:${T.surface};--k:${T.ink};--g:${T.ink2};--acc:${T.primary};--on:${T.onPrimary};--st1:${T.accents.stageHi};--st2:${T.accents.stageMid};--st3:${T.accents.stageLo};--wb1:${T.accents.webHi};--wb2:${T.accents.webMid};--wb3:${T.accents.webLo};background:var(--bg);color:var(--k);font-family:"Noto Sans SC",sans-serif;font-size:15px;line-height:1.5;font-weight:400;letter-spacing:.01em}
.s01 b,.s01 strong{font-weight:inherit}
.s01 .v-pad{padding-left:28px;padding-right:28px}
/* 字号层级：只靠大小和 200/300/400 三档细字重分主次，不加粗 */
.s01 .v-h1{font-size:44px;line-height:52px;font-weight:200;letter-spacing:-.01em}
.s01 .v-h1.sm{font-size:34px;line-height:42px;font-weight:300;letter-spacing:0}
.s01 .v-h2{font-size:30px;line-height:38px;font-weight:300;letter-spacing:0}
.s01 .v-h3{font-size:20px;line-height:28px;font-weight:300}
.s01 .v-tx{font-size:15px;line-height:24px;font-weight:400}
.s01 .v-mut{font-size:14px;line-height:22px;font-weight:400;color:var(--g);letter-spacing:.06em}
.s01 .v-mut.lg{font-size:15px}
.s01 .v-num{font-family:"Noto Sans SC",sans-serif;font-weight:300;font-variant-numeric:tabular-nums}
.s01 .v-big{font-size:56px;line-height:64px;font-weight:200;letter-spacing:-.01em;font-variant-numeric:tabular-nums}
.s01 .v-xl{font-size:104px;line-height:112px;font-weight:300;letter-spacing:0}
.s01 .v-price{font-size:22px;line-height:28px;font-weight:300;letter-spacing:.02em}
.s01 .v-price small{font-size:14px;color:var(--g);margin-left:2px;letter-spacing:.04em}
/* 按钮：锈橙小圆角实底，字距拉开；整屏只这一个彩色。.ghost 是浅灰底黑字（不描边） */
.s01 .v-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:136px;height:46px;border-radius:6px;background:var(--acc);color:var(--on);font-size:15px;line-height:1;font-weight:400;letter-spacing:.24em;padding-left:.24em;white-space:nowrap}
.s01 .v-btn.wide{display:flex;width:100%}
.s01 .v-btn.ghost{background:var(--mist);color:var(--k)}
.s01 .v-btn.lg{width:132px;height:50px;border-radius:7px;font-size:18px}
/* 卡片：浅灰圆角块，没有边框和阴影；.ph 顶部照片，.bd 文字区 */
.s01 .v-card{position:relative;background:var(--mist);border-radius:24px;overflow:hidden}
.s01 .v-card>.ph{height:220px}
.s01 .v-card .bd{padding:20px 24px 24px}
.s01 .v-card.show{display:flex;align-items:center;justify-content:center}
.s01 .v-between{display:flex;align-items:center;justify-content:space-between}
/* 列表：靠留白分行，不画分割线；真要分行加 .sep 用一根发丝线 */
.s01 .v-list{display:flex;flex-direction:column}
.s01 .v-row{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:56px;font-size:15px;line-height:22px}
.s01 .v-row>span:first-child{color:var(--g)}
.s01 .v-list.sep .v-row+.v-row{border-top:1px solid ${T.line}}
/* 筛选：没选中只是烟灰字，选中垫一块浅灰圆角底 */
.s01 .v-chips{display:flex;gap:4px;flex-wrap:wrap}
.s01 .v-chip{height:34px;padding:0 14px;display:inline-flex;align-items:center;border-radius:17px;color:var(--g);font-size:15px;letter-spacing:.06em}
.s01 .v-chip.on{background:var(--mist);color:var(--k)}
.s01 .v-inp{height:48px;display:flex;align-items:center;gap:10px;padding:0 16px;border-radius:12px;background:var(--mist);color:var(--g);font-size:15px;letter-spacing:.04em}
.s01 .v-inp .ic{color:var(--g)}
/* 照片：统一轻降饱和、提一点亮 */
.s01 .ph{filter:${T.photo}}
/* 展台：浅灰径向渐变，产品放正中（顶栏压在它上面） */
.s01 .v-stage{position:relative;z-index:0;display:flex;justify-content:center;background:radial-gradient(90% 60% at 50% 46%,var(--st1) 0%,var(--st2) 60%,var(--st3) 100%)}
.s01 .v-stage>*{flex:none}
/* 去背景的产品照：白底棚拍图用正片叠底融进底色，四边羽化 */
.s01 .v-prod{flex:none;background-repeat:no-repeat;background-position:center;background-size:contain;mix-blend-mode:multiply;-webkit-mask-image:radial-gradient(closest-side,#000 62%,transparent 100%);mask-image:radial-gradient(closest-side,#000 62%,transparent 100%)}
.s01 .v-obj{display:block;flex:none}
/* 首页通栏大卡：一件产品一张卡，名称左上、价格左下、产品正中 */
.s01 .v-tile{position:relative;margin:0 14px;border-radius:26px;background:var(--mist);overflow:hidden;padding:24px}
.s01 .v-tile+.v-tile{margin-top:12px}
.s01 .v-tile .v-mut{margin-top:2px;font-size:15px}
.s01 .v-tile .obj{position:absolute;left:0;right:0;display:flex;justify-content:center}
.s01 .v-tile .v-price{position:absolute;left:24px;bottom:26px;font-size:17px}
/* 颜色选择：16px 圆点，选中外面一圈细环 */
.s01 .v-sw{display:inline-flex;gap:16px;padding-right:4px}
.s01 .v-sw i{width:16px;height:16px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.14)}
.s01 .v-sw i.on{outline:1px solid var(--k);outline-offset:4px}
/* 键值：烟灰小标签在上，数字在下（合计、积分） */
.s01 .v-kv>span{display:block;font-size:14px;line-height:20px;color:var(--g);letter-spacing:.06em}
.s01 .v-kv>b{display:block;margin-top:2px;font-size:34px;line-height:44px;font-weight:300;letter-spacing:0}
/* 顶栏、字标、标签栏 */
.s01 .v-nav{position:relative;z-index:5;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;color:var(--k)}
.s01 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font-size:17px;font-weight:400;letter-spacing:.06em;white-space:nowrap}
.s01 .v-ib{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;color:var(--k)}
.s01 .v-logo{display:inline-flex;align-items:center;gap:10px;color:var(--k)}
.s01 .v-logo svg{flex:none}
.s01 .v-logo b{font-size:17px;line-height:1;font-weight:400;letter-spacing:.42em;margin-right:-.42em}
.s01 .v-logo em{font-style:normal;font-size:12px;line-height:1;letter-spacing:.3em;color:var(--g);margin-left:4px}
.s01 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:82px;background:var(--bg);display:flex;justify-content:space-around;padding:14px 18px 0;font-size:13px;line-height:20px;color:${T.accents.tabOff};letter-spacing:.08em;z-index:6}
.s01 .v-tabs .on{color:var(--k)}
/* 网页：浅暖灰竖向渐变（不平铺，底色接渐变末端），导航居中、字标和购物袋分在两头 */
.s01.web{background:linear-gradient(180deg,var(--wb1) 0%,var(--wb2) 70%,var(--wb3) 100%) no-repeat var(--wb3)}
.s01 .v-wnav{position:relative;height:88px;margin:0 72px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.s01 .v-wnav>:first-child,.s01 .v-wnav>:last-child{width:220px}
.s01 .v-wnav>:last-child{display:flex;justify-content:flex-end}
.s01 .v-wnav .v-logo b{font-size:22px}
.s01 .v-wnav nav{display:flex;gap:52px;font-size:18px;color:var(--g);letter-spacing:.1em}
.s01 .v-wnav nav .on{color:var(--k)}
/* 网页首屏：居中大标题、价格加按钮一行、产品并排落在下半屏 */
.s01 .v-whd{margin-top:30px;text-align:center}
.s01 .v-wbuy{display:flex;align-items:center;justify-content:center;gap:32px;margin-top:22px}
.s01 .v-wbuy .v-price{font-size:26px}
.s01 .v-wpair{position:absolute;left:0;right:0;display:flex;justify-content:center}
`;
  // 品牌记号：一个细线几何小记号，跟在字标前面，也可以放大成展示板上的细线大圆（ui.ring）
  // kind：'dot' 圈里一点（声白用的）、'ring' 空心圈、'base' 圈落在一条线上（像器物摆在台上）、'half' 半实心圈
  const mark = (s = 14, kind = 'dot', c = T.ink) => {
    const st = `fill="none" stroke="${c}" stroke-width="1.2"`;
    const g = {
      dot: `<circle cx="7" cy="7" r="6.4" ${st}/><circle cx="7" cy="7" r="2" fill="${c}"/>`,
      ring: `<circle cx="7" cy="7" r="6.4" ${st}/>`,
      base: `<circle cx="7" cy="5.4" r="4.8" ${st}/><path d="M.8 12.9H13.2" ${st}/>`,
      half: `<circle cx="7" cy="7" r="6.4" ${st}/><path d="M7 .6A6.4 6.4 0 0 1 7 13.4Z" fill="${c}"/>`,
    }[kind] || kind;
    return `<svg width="${s}" height="${s}" viewBox="0 0 14 14" style="overflow:visible">${g}</svg>`;
  };

  // ── 车削器物：按一条轮廓画旋转体（花器、瓶、罐、杯、蜡烛杯），棚拍质感 + 接地影 ──
  let uid = 0;
  const f = (n) => (Math.round(n * 10) / 10).toString();
  const hx = (c) => { const n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, t) => '#' + hx(a).map((v, i) => Math.round(v + (hx(b)[i] - v) * t).toString(16).padStart(2, '0')).join('');
  // Catmull-Rom 平滑成三次贝塞尔段；点的第三个值为 true 时那里是硬折角
  const segs = (P) => {
    const out = [];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      const a = p1[2] ? [0, 0] : [(p2[0] - p0[0]) / 6, (p2[1] - p0[1]) / 6];
      const b = p2[2] ? [0, 0] : [(p3[0] - p1[0]) / 6, (p3[1] - p1[1]) / 6];
      out.push([p1, [p1[0] + a[0], p1[1] + a[1]], [p2[0] - b[0], p2[1] - b[1]], p2]);
    }
    return out;
  };
  const segD = (S) => S.map(([, c1, c2, p2]) => `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`).join('');
  const bez = (q, t) => { const u = 1 - t; return [0, 1].map((j) => u * u * u * q[0][j] + 3 * u * u * t * q[1][j] + 3 * u * t * t * q[2][j] + t * t * t * q[3][j]); };
  function lathePart({ prof, tone, top = 'open', lip = 2.5, topFill, inner }, k) {
    const id = 'v01l' + (++uid);
    const [y0, r0] = prof[0];
    const [yb, rb] = prof[prof.length - 1];
    const SL = segs(prof.map(([y, r, sh]) => [100 - r, y, sh]));
    const SR = segs(prof.map(([y, r, sh]) => [100 + r, y, sh]).reverse());
    const d = `M${f(100 - r0)} ${f(y0)}${segD(SL)}A${f(rb)} ${f(rb * k)} 0 0 0 ${f(100 + rb)} ${f(yb)}${segD(SR)}A${f(r0)} ${f(r0 * k)} 0 0 0 ${f(100 - r0)} ${f(y0)}Z`;
    // 按高度取半径，切成 0.9 单位高的横条，每条各用一次横向渐变：高光和暗边跟着轮廓走（瓶颈、瓶脚也有立体感）
    const pts = [];
    for (const q of SL) for (let t = 0; t <= 1.0001; t += 1 / 24) pts.push(bez(q, t));
    const rAt = (y) => {
      if (y <= y0) return r0;
      if (y >= yb) return rb;
      for (let i = 1; i < pts.length; i++) {
        const [xa, ya] = pts[i - 1], [xb, yb2] = pts[i];
        if ((y - ya) * (y - yb2) <= 0 && ya !== yb2) return 100 - (xa + (xb - xa) * (y - ya) / (yb2 - ya));
      }
      return rb;
    };
    let strips = '';
    const DY = .9;
    for (let y = y0 - r0 * k - 1; y < yb + rb * k + 1; y += DY) {
      const r = rAt(y + DY / 2) + .15;
      strips += `<rect x="${f(100 - r)}" y="${f(y)}" width="${f(r * 2)}" height="${f(DY + .5)}"/>`;
    }
    const { hi, mid, lo } = tone;
    let s = `<defs>
<linearGradient id="${id}h" x1="0" x2="1"><stop offset="0" stop-color="${lo}"/><stop offset=".07" stop-color="${mid}"/><stop offset=".3" stop-color="${hi}"/><stop offset=".56" stop-color="${mid}"/><stop offset=".88" stop-color="${mix(mid, lo, .75)}"/><stop offset=".965" stop-color="${lo}"/><stop offset="1" stop-color="${mix(lo, mid, .45)}"/></linearGradient>
<linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".22" stop-color="#fff" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
<linearGradient id="${id}t" x1="0" x2="1"><stop offset="0" stop-color="${mid}"/><stop offset=".35" stop-color="${hi}"/><stop offset="1" stop-color="${mix(mid, lo, .4)}"/></linearGradient>
<linearGradient id="${id}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(lo, '#000000', .55)}"/><stop offset="1" stop-color="${mix(lo, mid, .3)}"/></linearGradient>
</defs>
<clipPath id="${id}c"><path d="${d}"/></clipPath>
<path d="${d}" fill="${mix(mid, lo, .8)}"/><g clip-path="url(#${id}c)" fill="url(#${id}h)">${strips}</g><path d="${d}" fill="url(#${id}v)"/>`;
    if (top === 'open') {
      const ri = Math.max(1, r0 - lip);
      s += `<ellipse cx="100" cy="${f(y0)}" rx="${f(r0)}" ry="${f(r0 * k)}" fill="url(#${id}t)"/><ellipse cx="100" cy="${f(y0 + .3)}" rx="${f(ri)}" ry="${f(ri * k)}" fill="${inner || `url(#${id}i)`}"/>`;
    } else if (top === 'flat') {
      s += `<ellipse cx="100" cy="${f(y0)}" rx="${f(r0)}" ry="${f(r0 * k)}" fill="${topFill || `url(#${id}t)`}"/><ellipse cx="100" cy="${f(y0)}" rx="${f(r0)}" ry="${f(r0 * k)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".7"/>`;
    }
    return s;
  }
  // lathe({ w, k, parts:[{ prof:[[y,r],…], tone:{hi,mid,lo}, top:'open'|'flat'|'none', lip, topFill, inner }], under, over })
  //   top 'open' 是有口的（花器、杯），inner 换掉口里的暗色（蜡烛杯口里是蜡面）；'flat' 是平顶（盖子），'none' 不画顶（被上一件盖住）
  //   prof 从上往下写，坐标单位：画布宽 200、中线 x=100，r 是半径；parts 按画的先后排（瓶身先、瓶口圈后）
  //   k 是俯视程度（截面椭圆的扁度）；under / over 是垫在下面 / 盖在上面的 SVG（同一坐标），比如香薰的藤条
  //   出来是一张 <img>（SVG 数据图）：一件器物只算一个元素，渐变 id 也不会和别的冲突；左右各多留 25% 画布给接地影，排版宽度仍是 w
  function lathe({ w = 200, k = .15, parts = [], under = '', over = '', shadow = true }) {
    const id = 'v01s' + (++uid);
    let yb = 0, rb = 0;
    for (const p of parts) { const [y, r] = p.prof[p.prof.length - 1]; if (y >= yb) { yb = y; rb = r; } }
    const H = Math.ceil(yb + rb * k * 1.6 + 34);
    const sh = shadow ? `<defs><filter id="${id}a" filterUnits="userSpaceOnUse" x="-50" y="${f(yb - 60)}" width="300" height="140"><feGaussianBlur stdDeviation="9"/></filter><filter id="${id}b" filterUnits="userSpaceOnUse" x="-20" y="${f(yb - 20)}" width="240" height="40"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
<ellipse cx="100" cy="${f(yb + 3)}" rx="${f(rb * 1.32)}" ry="${f(rb * k * 1.5 + 6)}" fill="#000" opacity=".15" filter="url(#${id}a)"/>
<ellipse cx="100" cy="${f(yb + .6)}" rx="${f(rb * .94)}" ry="${f(rb * k * .55 + 1.6)}" fill="#000" opacity=".36" filter="url(#${id}b)"/>` : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 0 300 ${H}" width="300" height="${H}">${sh}${under}${parts.map((p) => lathePart(p, k)).join('')}${over}</svg>`;
    const W = w * 1.5, side = w * .25;
    return `<img class="v-obj" alt="" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}" style="width:${f(W)}px;height:${f(W * H / 300)}px;margin:0 -${f(side)}px">`;
  }

  const bagIc = (s = 22) => icon('shopping-bag', s, 1.3);
  const ui = {
    mark,
    // 字标：细线记号 + 字距拉得很开的常规字重品牌名（logo('声白')、logo('素物', '', mark(14,'base'))）
    logo: (name, en = '', sym = mark(14)) => `<span class="v-logo">${sym}<b>${name}</b>${en ? `<em>${en}</em>` : ''}</span>`,
    // App 顶栏：左返回（细线 chevron）右购物袋，标题可省；没有底色、没有分割线
    //   pad 改左右边距：首页大卡里的字在 38px，顶栏跟着对齐 nav({ …, pad: 38 })
    nav: ({ title = '', back = true, right = '', left = '', pad = 0 } = {}) => `<div class="v-nav"${pad ? ` style="padding:0 ${pad}px"` : ''}>${left || (back ? `<span class="v-ib" data-back>${icon('chevron-left', 26, 1.3)}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 顶栏右边的购物袋 / 任意细线图标按钮：iconBtn('shopping-bag', 'data-go="bag"')
    iconBtn: (name, attrs = '', s = 22) => `<span class="v-ib" ${attrs}>${icon(name, s, 1.3)}</span>`,
    bag: (attrs = '') => `<span class="v-ib" ${attrs}>${bagIc()}</span>`,
    // 底部标签栏：只有字（图标名照约定传进来但不画），当前项变墨黑
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([, t], i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 主按钮：默认不带图标；cls 'wide' 通栏、'ghost' 浅灰次按钮、'lg' 网页大号
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${text}${ic ? icon(ic, 18, 1.3) : ''}</div>`,
    // 展台 stage(inner, { h, under, dy, attrs })：浅灰渐变底，产品正中；under 是压在它上面的状态栏 + 顶栏高度（默认 94，展台从屏幕最顶开始），dy 是产品相对可见区中心的下移量
    stage: (inner, { h = 508, under = 94, dy = 0, attrs = '' } = {}) => `<div class="v-stage" style="height:${h}px;margin-top:-${under}px;align-items:center;padding-top:${under + dy * 2}px" ${attrs}>${inner}</div>`,
    // 去背景产品照（客户给的白底 / 浅灰底棚拍图）：product(img('./img/xx.jpg'), { w: 260, h: 300 })
    //   正片叠底 + 四边羽化融进底色；lift 把浅灰背景提成白（背景越灰给得越大，1.0–1.25），真抠好的 PNG 给 1
    product: (src, { w = 260, h = 300, pos = 'center', size = 'contain', lift = 1.14 } = {}) => `<div class="v-prod" style="width:${w}px;height:${h}px;background-image:url(${src});background-position:${pos};background-size:${size};filter:saturate(.9) brightness(${lift}) contrast(1.06)"></div>`,
    lathe,
    // 首页通栏大卡：tile({ name:'声白 E1', sub:'头戴降噪耳机', price:'¥1,499', obj: 产品SVG或照片, h:392, objTop:124, attrs:'data-go="detail"' })
    tile: ({ name, sub = '', price = '', obj = '', h = 392, objTop = 120, attrs = '' }) => `<div class="v-tile" style="height:${h}px" ${attrs}><div class="v-h2">${name}</div>${sub ? `<div class="v-mut">${sub}</div>` : ''}<div class="obj" style="top:${objTop}px">${obj}</div>${price ? `<div class="v-price">${price}</div>` : ''}</div>`,
    // 颜色选择：swatches(['#3A3B3E','#E8E6E1'], 0)，选中的外面一圈细环（不只靠颜色区分）
    swatches: (colors, cur = 0) => `<span class="v-sw">${colors.map((c, i) => `<i class="${i === cur ? 'on' : ''}" style="background:${c}"></i>`).join('')}</span>`,
    // 键值：kv('合计', '¥2,499')
    kv: (label, value) => `<div class="v-kv"><span>${label}</span><b>${value}</b></div>`,
    // 细线大圆：字标记号放大后的装饰，只放在展示板 / 网页大背景上，屏幕里不用。全部写行内样式，放在 .s01 外面也能用
    ring: (d, { x = '50%', y = '50%', color = 'rgba(22,22,22,.18)', w = 1.5 } = {}) => `<div style="position:absolute;left:${x};top:${y};width:${d}px;height:${d}px;margin:${-d / 2}px 0 0 ${-d / 2}px;border:${w}px solid ${color};border-radius:50%;pointer-events:none"></div>`,
    // 网页顶栏：webNav(logo, ['音箱','耳机','配件','支持'], 右侧 HTML)；第一项可传 ['音箱', true] 表示当前
    webNav: (logo, links = [], right = `<span class="v-ib">${bagIc(26)}</span>`) => `<div class="v-wnav"><span>${logo}</span><nav>${links.map((l) => (Array.isArray(l) ? `<span class="${l[1] ? 'on' : ''}">${l[0]}</span>` : `<span>${l}</span>`)).join('')}</nav><span>${right}</span></div>`,
    // 网页首屏 webHero({ title, price, btn, objs, top, gap })：居中 104px 标题、价格加按钮一行、objs 里的产品并排；top 是产品区离页顶的距离，产品墨迹底边离页底留 120px 以上
    webHero: ({ title, price = '', btn = '', objs = [], top = 380, gap = 72 }) => `<div class="v-whd"><div class="v-xl">${title}</div><div class="v-wbuy">${price ? `<span class="v-price">${price}</span>` : ''}${btn}</div></div><div class="v-wpair" style="top:${top}px;gap:${gap}px">${objs.join('')}</div>`,
  };
  return { key: 's01-minimal', no: 1, name: '留白极简', root: 's01', T, css, ui, stage: '#EFEEEA', dark: false };
};
