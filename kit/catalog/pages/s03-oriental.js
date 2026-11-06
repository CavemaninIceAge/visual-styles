// 03 新中式 · 一盏 YIZHAN（茶空间小程序）
const { img, icon, statusBar, miniNav, homeBar } = require('../lib');
const { stylePages } = require('../page');

const C = { xuan: '#F2EEE3', mo: '#1E1C1A', dan: '#8C877C', zhu: '#C2372B', qing: '#93A99B' };

// 宣纸：细颗粒 + 几处极淡的明暗
const PAPER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.95' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .33 0 0 0 0 .28 0 0 0 0 .2 .26 0 0 0 -.085'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E"),radial-gradient(90% 50% at 15% 8%,rgba(255,255,255,.45),transparent 70%),radial-gradient(70% 40% at 95% 70%,rgba(160,140,100,.07),transparent 70%)`;

// 朱砂印：竖长方白文印。字撑满印面（「一」只占一道横，「盏」占下面三分之二，按印章的疏密来分），边缘和印面有钤印的毛口
let sid = 0;
function sealGlyph(ch, top, bot, sx) {
  const fs = (bot - top) / 0.86, base = bot - fs * 0.07;
  return `<text x="15" y="${base.toFixed(2)}" text-anchor="middle" font-family="ZCOOL XiaoWei" font-size="${fs.toFixed(2)}" fill="${C.xuan}" stroke="${C.xuan}" stroke-width=".42" stroke-linejoin="round" transform="matrix(${sx} 0 0 1 ${(15 * (1 - sx)).toFixed(2)} 0)">${ch}</text>`;
}
function seal(w, chars = ['一', '盏']) {
  const id = 'x03s' + (++sid), h = Math.round(w * 40 / 30);
  const inner = chars[0] === '一'
    ? `<rect x="6.2" y="8.4" width="17.6" height="3.4" fill="${C.xuan}"/>${sealGlyph(chars[1], 15.4, 36.2, 1.12)}`
    : `${sealGlyph(chars[0], 3.8, 19.4, 1.24)}${sealGlyph(chars[1], 21, 36.4, 1.24)}`;
  return `<svg class="seal" width="${w}" height="${h}" viewBox="0 0 30 40"><defs><filter id="${id}" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="${sid + 2}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".9" xChannelSelector="R" yChannelSelector="G" result="d"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -7 5.45" result="m"/><feComposite in="d" in2="m" operator="in"/></filter></defs>
<g filter="url(#${id})"><rect x="1" y="1" width="28" height="38" rx="1.4" fill="${C.zhu}"/>${inner}</g></svg>`;
}

// 扇面：圆心 (cx,cy)，外半径 R，内半径 r，左右各张 a 度
function fanPath(cx, cy, R, r, a) {
  const t = (a * Math.PI) / 180, s = Math.sin(t), c = Math.cos(t);
  const p = (rad, k) => `${(cx + k * rad * s).toFixed(1)} ${(cy - rad * c).toFixed(1)}`;
  return `M ${p(R, -1)} A ${R} ${R} 0 0 1 ${p(R, 1)} L ${p(r, 1)} A ${r} ${r} 0 0 0 ${p(r, -1)} Z`;
}

// 月洞门：照片圆 + 两道细圈
const moon = (x, y, d, bg) => `<div class="ring" style="left:${x - 14}px;top:${y - 14}px;width:${d + 28}px;height:${d + 28}px;opacity:.55"></div>
<div class="ring" style="left:${x - 9}px;top:${y - 9}px;width:${d + 18}px;height:${d + 18}px"></div>
<div class="moon" style="left:${x}px;top:${y}px;width:${d}px;height:${d}px;${bg}"></div>`;
// 远山（水墨）
const hills = (top, h, op = 0.34, pos = 'center 72%') => `<div class="hills" style="top:${top}px;height:${h}px;opacity:${op};background-position:${pos}"></div>`;


// 一枝桂花（墨色没骨）：枝干按中线逐点加粗收细，叶子交错，叶腋里几簇赭黄小花
function rnd(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function stroke(pts, w0, w1) {
  const n = pts.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
    const w = (w0 + (w1 - w0) * (i / (n - 1))) / 2, nx = -dy / d * w, ny = dx / d * w;
    L.push(`${(pts[i][0] + nx).toFixed(1)} ${(pts[i][1] + ny).toFixed(1)}`); R.unshift(`${(pts[i][0] - nx).toFixed(1)} ${(pts[i][1] - ny).toFixed(1)}`);
  }
  return `M${L.join('L')}L${R.join('L')}Z`;
}
function bez(p0, p1, p2, p3, n = 24) {
  const o = [];
  for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; o.push([0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k])); }
  return o;
}
const leafD = (L, W) => `M0 0C${L * .22} ${-W} ${L * .62} ${-W * 1.05} ${L} ${-W * .25}C${L * .66} ${W * .5} ${L * .3} ${W * .72} 0 0Z`;
function sprig(w = 210) {
  const r = rnd(7), ink = C.mo;
  const main = bez([0, 126], [56, 116], [118, 86], [214, 34]);
  const twig = bez([96, 96], [112, 97], [128, 104], [146, 118], 12);
  const at = (pts, t) => pts[Math.round(t * (pts.length - 1))];
  const ang = (pts, t) => { const i = Math.round(t * (pts.length - 1)), a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; };
  const leaves = [], flowers = [];
  // 叶：淡墨没骨铺一笔，浓墨勾筋
  const put = (pts, t, side, len, k) => {
    const [x, y] = at(pts, t), a = ang(pts, t) + side * (36 + r() * 20), W = len * .26;
    leaves.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)})${side > 0 ? ' scale(1 -1)' : ''}"><path d="${leafD(len, W)}" fill="url(#x03lf${k})"/><path d="M1.5 0Q${len * .5} ${-W * .38} ${len * .94} ${-W * .25}" stroke="${ink}" stroke-opacity=".75" stroke-width=".7" fill="none"/></g>`);
  };
  // 花：叶腋里一小簇细点
  const bloom = (pts, t, k) => {
    const [x, y] = at(pts, t);
    for (let i = 0; i < k; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 5.5;
      flowers.push(`<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y - 2 + Math.sin(a) * d * .8).toFixed(1)}" r="${(1 + r() * .55).toFixed(2)}" fill="${r() < .3 ? '#B07E30' : '#D2A250'}"/>`);
    }
  };
  put(main, .26, -1, 34, 1); put(main, .4, 1, 38, 2); put(main, .54, -1, 31, 1); put(main, .68, 1, 30, 2); put(main, .82, -1, 26, 1); put(main, .96, 1, 21, 2);
  put(twig, .75, 1, 25, 2); put(twig, 1, -1, 20, 1);
  bloom(main, .34, 11); bloom(main, .61, 9); bloom(main, .76, 7); bloom(twig, .4, 7);
  const h = Math.round(w * 140 / 230);
  return `<svg width="${w}" height="${h}" viewBox="0 0 230 140" style="display:block;overflow:visible"><defs>
<linearGradient id="x03lf1" x1="0" x2="1"><stop offset="0" stop-color="${ink}" stop-opacity=".78"/><stop offset="1" stop-color="${ink}" stop-opacity=".46"/></linearGradient>
<linearGradient id="x03lf2" x1="0" x2="1"><stop offset="0" stop-color="${ink}" stop-opacity=".58"/><stop offset="1" stop-color="${ink}" stop-opacity=".3"/></linearGradient></defs>
<path d="${stroke(main, 4, .8)}" fill="${ink}" opacity=".82"/><path d="${stroke(twig, 2, .6)}" fill="${ink}" opacity=".74"/>${leaves.join('')}${flowers.join('')}</svg>`;
}

// 桂花乌龙的俯拍：窗格光影落在纸上，一只白瓷品茗杯盛着浅琥珀茶汤，旁边一小堆卷曲的乌龙干茶和几粒干桂花
function blob(cx, cy, rad, r) {
  const n = 8, pts = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, k = .66 + r() * .6; pts.push([cx + Math.cos(a) * rad * k, cy + Math.sin(a) * rad * k * .86]); }
  let d = '';
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    d += i === 0 ? `M${((pts[n - 1][0] + p[0]) / 2).toFixed(1)} ${((pts[n - 1][1] + p[1]) / 2).toFixed(1)}` : '';
    d += `Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + 'Z';
}
function teaStill() {
  const r = rnd(11), pel = [];
  for (let i = 0; i < 190; i++) {
    const top = i >= 120, a = r() * Math.PI * 2, d = Math.sqrt(r());
    const rx = top ? 26 : 42, ry = top ? 13 : 22, lift = top ? 6 + (1 - d) * 4 : (1 - d) * 3;
    pel.push([78 + Math.cos(a) * d * rx, 276 + Math.sin(a) * d * ry - lift, 2.4 + r() * 1.4, r()]);
  }
  for (const p of [[132, 302, 3.2, .3], [34, 250, 3, .8], [122, 254, 2.9, .5], [148, 288, 2.8, .2]]) pel.push(p);
  pel.sort((a, b) => a[1] - b[1]);
  const pellets = pel.map(([x, y, rad, k]) => { const c = r() * 6.28, ex = Math.cos(c) * rad * .7, ey = Math.sin(c) * rad * .6;
    return `<path d="${blob(x, y, rad, r)}" fill="url(#x03p${k < .6 ? 'a' : k < .85 ? 'b' : 'c'})"/><path d="M${(x - ex).toFixed(1)} ${(y - ey).toFixed(1)}Q${(x + ey * .5).toFixed(1)} ${(y - ex * .5).toFixed(1)} ${(x + ex).toFixed(1)} ${(y + ey).toFixed(1)}" stroke="#141609" stroke-opacity=".45" stroke-width=".55" fill="none"/>`; }).join('');
  const dot = (x, y, k, op = 1) => Array.from({ length: k }, () => { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 3.2; return `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="${(.9 + r() * .5).toFixed(2)}" fill="${r() < .35 ? '#B07E30' : '#D6A64F'}" opacity="${op}"/>`; }).join('');
  const fl = dot(98, 296, 4) + dot(46, 292, 3) + dot(108, 262, 3) + dot(150, 270, 3);
  const floats = dot(138, 160, 3, .9) + dot(128, 170, 2, .9);
  return `<svg width="224" height="344" viewBox="0 0 224 344" style="display:block">
<defs>
<filter id="x03b6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="x03b3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="x03b2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
<radialGradient id="x03cu" cx=".4" cy=".36" r=".66"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".72" stop-color="#F3EFE6"/><stop offset="1" stop-color="#D8D0C0"/></radialGradient>
<linearGradient id="x03cw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D2CABA"/><stop offset=".55" stop-color="#EEEAE1"/><stop offset="1" stop-color="#FBF9F4"/></linearGradient>
<radialGradient id="x03te" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#C98D45"/><stop offset=".62" stop-color="#D8A55C"/><stop offset=".92" stop-color="#E6C07E"/><stop offset="1" stop-color="#EFD39C"/></radialGradient>
<linearGradient id="x03ts" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4A2E0C" stop-opacity=".34"/><stop offset=".46" stop-color="#4A2E0C" stop-opacity="0"/></linearGradient>
<radialGradient id="x03pa" cx=".38" cy=".34" r=".8"><stop offset="0" stop-color="#565B38"/><stop offset=".6" stop-color="#33381F"/><stop offset="1" stop-color="#1B1E12"/></radialGradient>
<radialGradient id="x03pb" cx=".38" cy=".34" r=".8"><stop offset="0" stop-color="#5E5134"/><stop offset=".6" stop-color="#3B3120"/><stop offset="1" stop-color="#211B12"/></radialGradient>
<radialGradient id="x03pc" cx=".38" cy=".34" r=".8"><stop offset="0" stop-color="#6E7247"/><stop offset=".6" stop-color="#454A2A"/><stop offset="1" stop-color="#262A18"/></radialGradient>
</defs>
<rect width="224" height="344" fill="#E4DCCB"/>
<g filter="url(#x03b6)"><path d="M-30 64L196 -26L262 236L28 330Z" fill="#F6F1E6"/></g>
<g filter="url(#x03b3)" fill="#E4DCCB" opacity=".9"><path d="M76 20L84 17L148 290L140 293Z"/><path d="M-10 186L228 92L230 99L-8 193Z"/></g>
<ellipse cx="82" cy="282" rx="44" ry="22" fill="#4A3B22" opacity=".2" filter="url(#x03b3)"/>
<circle cx="132" cy="158" r="68" fill="#5E4C32" opacity=".3" filter="url(#x03b6)"/>
<circle cx="120" cy="146" r="66" fill="url(#x03cu)"/>
<circle cx="120" cy="146" r="64.6" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="1.2"/>
<circle cx="120" cy="146" r="59.5" fill="url(#x03cw)"/>
<circle cx="121" cy="147" r="50" fill="url(#x03te)"/>
<circle cx="121" cy="147" r="50" fill="url(#x03ts)"/>
<circle cx="121" cy="147" r="49.5" fill="none" stroke="#F7E7C4" stroke-opacity=".7" stroke-width="1"/>
<g filter="url(#x03b2)" opacity=".42"><path d="M96 113L120 104L126 116L102 125Z" fill="#FFF8EA"/></g>
${floats}
${pellets}
${fl}
</svg>`;
}

// 冰裂纹：把方块一刀刀斜切成大小不一的多边形（种子固定，每次一样）
function iceCrack(S, seed, minA) {
  const r = rnd(seed), out = [], q = [[[0, 0], [S, 0], [S, S], [0, S]]];
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

// 圆窗：月洞门放大，窗里一层冰裂纹窗棂（舞台用）
const roundLattice = (d, op = .3, seed = 5) => { const R = d / 2 - 22; return `<svg style="position:absolute;left:50%;top:50%;width:${d}px;height:${d}px;margin:${-d / 2}px 0 0 ${-d / 2}px" viewBox="0 0 ${d} ${d}"><defs><clipPath id="x03rl${d}"><circle cx="${d / 2}" cy="${d / 2}" r="${R}"/></clipPath></defs>
<g clip-path="url(#x03rl${d})" opacity="${op}"><path d="${iceCrack(d, seed, d * d / 70)}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></g>
<circle cx="${d / 2}" cy="${d / 2}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.6"/><circle cx="${d / 2}" cy="${d / 2}" r="${d / 2 - 4}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1"/></svg>`; };

const tabs = (names, on) => `<div class="tab">${names.map((t, i) => `<span class="${i === on ? 'on' : ''}">${t}</span>`).join('')}</div>`;
const back = icon('chevron-left', 24, 1.4);
const wm = `<span class="wm">一盏</span>`;

const css = `
.x03{background:${PAPER},${C.xuan};color:${C.mo};font-family:"Noto Serif SC","Songti SC",serif}
.x03 .mn-t{font-family:"Noto Serif SC";font-weight:600;letter-spacing:.12em}
.x03 .mn-l{color:${C.mo}}
.x03 .wm{font:500 20px/1 "LXGW WenKai";letter-spacing:.32em;padding-left:12px;color:${C.mo}}
.x03 .vt{position:absolute;writing-mode:vertical-rl;text-orientation:upright;font-family:"Ma Shan Zheng";font-weight:400;color:${C.mo};letter-spacing:.04em;line-height:1}
.x03 .ins{position:absolute;writing-mode:vertical-rl;text-orientation:upright;font:400 13px/1 "Noto Serif SC";letter-spacing:.5em;color:${C.dan}}
.x03 .seal{position:absolute;display:block}
.x03 .ring{position:absolute;border:1px solid rgba(43,41,38,.3);border-radius:50%}
.x03 .moon{position:absolute;border-radius:50%;background-repeat:no-repeat;filter:sepia(.18) saturate(.62) brightness(1.05) contrast(.9)}
.x03 .hills{position:absolute;left:0;right:0;background-image:url(${img('mist-mountains-blue')});background-size:cover;filter:grayscale(1) sepia(.45) hue-rotate(108deg) saturate(.9) contrast(1.1) brightness(1.06);mix-blend-mode:multiply;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 38%,#000 62%,transparent 100%)}
.x03 .btn{position:absolute;height:48px;display:flex;align-items:center;justify-content:center;background:${C.mo};color:${C.xuan};font:500 17px/1 "LXGW WenKai";letter-spacing:.4em;padding-left:.4em}
.x03 .num{font-family:"Cormorant Garamond";font-weight:500;letter-spacing:.01em;font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1}
.x03 .lb{font-size:13px;color:${C.dan};letter-spacing:.3em}
.x03 .tab{position:absolute;left:0;right:0;bottom:30px;height:48px;display:flex;justify-content:space-around;align-items:center;font-size:14px;letter-spacing:.2em;color:${C.dan}}
.x03 .tab span{position:relative;padding-left:.2em}
.x03 .tab .on{color:${C.mo};font-weight:600}
.x03 .tab .on:after{content:"";position:absolute;left:50%;top:-10px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:${C.zhu}}
/* 首页 */
.x03.h .times{position:absolute;left:24px;top:438px}
.x03.h .times .tt{font-size:25px;margin-top:10px;display:flex;gap:16px}
/* 预约 */
.x03.b1 .room{position:absolute;left:0;right:0;top:290px;text-align:center}
.x03.b1 .room b{display:block;font:400 34px/1 "Ma Shan Zheng";letter-spacing:.24em;padding-left:.24em;color:${C.mo}}
.x03.b1 .room span{display:block;margin-top:12px;font-size:13px;color:${C.dan};letter-spacing:.2em}
.x03.b1 .days{position:absolute;left:24px;right:24px;top:372px;display:flex;justify-content:space-between}
.x03.b1 .d{width:40px;text-align:center;color:${C.dan}}
.x03.b1 .d i{display:block;font-style:normal;font-size:12px;letter-spacing:0}
.x03.b1 .d b{display:block;margin:8px auto 0;width:40px;height:40px;border-radius:50%;font:500 21px/40px "Cormorant Garamond";font-feature-settings:"lnum" 1;color:${C.mo}}
.x03.b1 .d.on b{background:${C.mo};color:${C.xuan}}
.x03.b1 .slots{position:absolute;left:24px;right:24px;top:466px}
.x03.b1 .s{height:54px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(43,41,38,.14)}
.x03.b1 .s:last-child{border-bottom:1px solid rgba(43,41,38,.14)}
.x03.b1 .s .num{font-size:21px}
.x03.b1 .s em{font-style:normal;font-size:14px;color:${C.dan};letter-spacing:.12em}
.x03.b1 .s.off{opacity:.38}
.x03.b1 .s.on em{color:${C.mo}}
.x03.b1 .s .ck{display:inline-block;width:18px;height:18px;border-radius:50%;border:1px solid rgba(43,41,38,.3);margin-left:14px;vertical-align:-4px}
.x03.b1 .s.on .ck{background:${C.zhu};border-color:${C.zhu}}
.x03 .bar{position:absolute;left:24px;right:24px;bottom:40px;display:flex;align-items:center;justify-content:space-between}
.x03 .bar .num{font-size:32px}
.x03 .bar small{font-size:13px;color:${C.dan};letter-spacing:.2em;margin-right:10px}
.x03 .bar .num small{font-family:"Cormorant Garamond";font-size:20px;color:${C.mo};letter-spacing:0;margin-right:2px}
/* 茶品 */
.x03.b2 .pic{position:absolute;left:32px;top:112px;width:224px;height:344px;overflow:hidden}
.x03.b2 .frame{position:absolute;left:24px;top:104px;width:240px;height:360px;border:1px solid rgba(43,41,38,.3)}
.x03.b2 .rows{position:absolute;left:24px;right:24px;top:496px}
.x03.b2 .r{display:flex;height:48px;align-items:center;border-top:1px solid rgba(43,41,38,.14);font-size:15px;letter-spacing:.06em}
.x03.b2 .r:last-child{border-bottom:1px solid rgba(43,41,38,.14)}
.x03.b2 .r i{font-style:normal;width:76px;font-size:13px;color:${C.dan};letter-spacing:.3em}
/* 网页 */
.x03.web .nav{position:absolute;left:80px;right:80px;top:40px;display:flex;align-items:center}
.x03.web .nav .seal{position:static}
.x03.web .nav .wm2{font:500 34px/1 "LXGW WenKai";letter-spacing:.3em;margin-left:22px}
.x03.web .nav .ln{margin-left:auto;display:flex;gap:56px;font-size:24px;letter-spacing:.3em}
.x03.web .nav .bk{margin-left:64px;height:56px;padding:0 28px 0 35px;border:1px solid ${C.mo};display:flex;align-items:center;font-size:24px;letter-spacing:.3em}
.x03.web .ins{font-size:20px}
/* 半山 */
.x03.cmp .hd{position:absolute;left:24px;right:24px;top:58px;display:flex;align-items:center}
.x03.cmp .hd b{font:500 22px/1 "LXGW WenKai";letter-spacing:.24em}
.x03.cmp .pt{margin-left:auto;display:flex;align-items:baseline;gap:10px;padding:6px 11px 5px 13px;border:1px solid rgba(43,41,38,.42);outline:1px solid rgba(43,41,38,.16);outline-offset:3px}
.x03.cmp .pt i{font-style:normal}
.x03.cmp .pt .num{font-size:22px;line-height:1}
`;

const hero = `<div class="scr x03 h">${statusBar()}${miniNav({ left: wm })}
<div style="position:absolute;left:0;top:594px">${sprig(214)}</div>
${moon(52, 112, 272, `background-image:url(${img('tea-gaiwan-linen')});background-size:560px auto;background-position:-120px -64px;filter:sepia(.5) saturate(.55) hue-rotate(-6deg) brightness(1.07) contrast(.9)`)}
<div style="position:absolute;left:282px;top:318px">${seal(46)}</div>
<div class="vt" style="left:292px;top:426px;font-size:60px">桂花乌龙</div>
<div class="ins" style="left:266px;top:432px">丙午霜降</div>
<div class="times"><div class="lb">今日茶席</div><div class="tt num"><span>14:00</span><span>16:30</span><span>19:30</span></div></div>
<div class="btn" style="left:24px;top:528px;width:164px">预约茶席</div>
${tabs(['首页', '茶席', '茶品', '我的'], 0)}${homeBar()}</div>`;

const fanD = fanPath(187.5, 360, 264, 112, 33);
const fanO = fanPath(187.5, 360, 272, 104, 34.2);
const b1 = `<div class="scr x03 b1">${statusBar()}${miniNav({ title: '预约茶席', left: back })}
<svg style="position:absolute;left:0;top:0" width="375" height="300" viewBox="0 0 375 300">
<defs><clipPath id="x03fan"><path d="${fanD}"/></clipPath></defs>
<image href="${img('bamboo-stalks')}" x="20" y="90" width="335" height="190" preserveAspectRatio="xMidYMid slice" clip-path="url(#x03fan)" style="filter:grayscale(1) sepia(.32) brightness(1.16) contrast(1.02);mix-blend-mode:multiply"/>
<path d="${fanO}" fill="none" stroke="rgba(43,41,38,.3)" stroke-width="1"/></svg>
<div class="room"><b>竹里</b><span>四人茶席 · 两小时</span></div>
<div class="days">${[['四', 29], ['五', 30], ['六', 31], ['日', 1], ['一', 2], ['二', 3], ['三', 4]].map(([w, d], i) => `<div class="d ${i === 2 ? 'on' : ''}"><i>${w}</i><b>${d}</b></div>`).join('')}</div>
<div class="slots">
<div class="s"><span class="num">10:00 — 12:00</span><em>余三席<i class="ck"></i></em></div>
<div class="s on"><span class="num">14:00 — 16:00</span><em>余一席<i class="ck"></i></em></div>
<div class="s off"><span class="num">16:30 — 18:30</span><em>已约满<i class="ck" style="opacity:0"></i></em></div>
<div class="s"><span class="num">19:30 — 21:30</span><em>余四席<i class="ck"></i></em></div></div>
<div class="bar"><div><small>两位</small><span class="num"><small>¥</small>336</span></div><div class="btn" style="position:static;width:164px">确认预约</div></div>
${homeBar()}</div>`;

const b2 = `<div class="scr x03 b2">${statusBar()}${miniNav({ left: back })}
<div class="frame"></div><div class="pic">${teaStill()}</div>
<div class="vt" style="left:298px;top:108px;font-size:42px">桂花乌龙</div>
<div style="position:absolute;left:302px;top:300px">${seal(34)}</div>
<div class="rows">
<div class="r"><i>产地</i>福建 · 安溪</div>
<div class="r"><i>窨制</i>金桂三窨一提</div>
<div class="r"><i>冲泡</i>沸水 · 首泡十秒出汤</div>
<div class="r"><i>规格</i>五十克 · 锡罐</div></div>
<div class="bar"><span class="num"><small>¥</small>128</span><div class="btn" style="position:static;width:164px">加入茶篮</div></div>
${homeBar()}</div>`;

const web = `<div class="x03 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
${hills(380, 440, 0.5, 'center 64%')}
<div class="nav">${seal(34)}<span class="wm2">一盏</span><div class="ln"><span>茶席</span><span>茶品</span><span>空间</span><span>节气</span></div><div class="bk">预约</div></div>
<div class="ins" style="left:388px;top:170px">十月二十三日起</div>
<div class="vt" style="left:428px;top:150px;font-size:84px">霜降茶席</div>
${moon(600, 170, 300, `background-image:url(${img('mist-forest-bw')});background-size:560px auto;background-position:-150px -12px;filter:grayscale(1) sepia(.3) brightness(1.18) contrast(.86)`)}
<div style="position:absolute;left:852px;top:394px">${seal(50)}</div>
<div class="btn" style="left:650px;top:552px;width:200px;height:56px;font-size:20px">预约茶席</div>
</div>`;

const cmp = `<div class="scr x03 cmp">${statusBar()}
<div style="position:absolute;left:0;top:600px">${sprig(214)}</div>
<div class="hd"><b>半山咖啡</b><span class="pt"><i class="lb">积分</i><span class="num">1,280</span></span></div>
${moon(52, 122, 272, `background-image:url(${img('coffee-bed-linen')});background-size:580px auto;background-position:-98px -299px;filter:sepia(.34) saturate(.42) hue-rotate(-4deg) brightness(1.06) contrast(.84)`)}
<div style="position:absolute;left:282px;top:328px">${seal(46, ['半', '山'])}</div>
<div class="vt" style="left:292px;top:430px;font-size:60px">桂花拿铁</div>
<div class="ins" style="left:266px;top:434px">今日推荐</div>
<div class="num" style="position:absolute;left:22px;top:420px;font-size:40px;line-height:1"><small style="font-size:23px">¥</small>28</div>
<div style="position:absolute;left:24px;top:478px;font-size:14px;letter-spacing:.08em">东四店 · 到店自取约 6 分钟</div>
<div class="btn" style="left:24px;top:528px;width:212px;height:56px;font-size:20px">去点单</div>
${tabs(['首页', '菜单', '订单', '我的'], 0)}${homeBar()}</div>`;

module.exports = {
  css,
  screens: { 's03-hero': hero, 's03-b1': b1, 's03-b2': b2, 's03-web': web, 's03-cmp': cmp },
  desktop: ['s03-web'],
  marks: [[350, 300], [256, 640], [300, 128], [92, 330]],
  palette: [['宣纸', C.xuan], ['青瓷', C.qing], ['朱砂', C.zhu], ['淡墨', C.dan], ['浓墨', C.mo]],
  type: { font: '"Ma Shan Zheng","Cormorant Garamond"', weight: 400, sample: '盏 <span style="font-family:\'Cormorant Garamond\';font-weight:500">Aa</span>', lines: [['标题', '马善政楷书'], ['正文', '思源宋体'], ['数字', 'Cormorant']] },
  stageA: `linear-gradient(170deg,#A2B6A9,#869C8E)`,
  decoA: roundLattice(640, .22),
  stageB: {
    bg: `linear-gradient(170deg,#A2B6A9,#869C8E)`, color: C.mo, url: 'yizhan.tea', deco: roundLattice(900, .17),
  },
  zoom: [231, 124],
  page: (no) => stylePages(no, 's03-oriental', module.exports),
};
