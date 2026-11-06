// 出 demo 用的公用件：图库图片、线性图标、iOS 状态栏、小程序胶囊、底部横条、手机外框、浏览器外框
const fs = require('fs');
const path = require('path');
const KIT = __dirname;

// 图库图片：img('latte-pour') → file:// 路径。项目自己的图放在项目的 img/ 下，用 img('./img/xxx.jpg')
let PROJECT = null;
const setProject = (p) => { PROJECT = p; };
function img(name) {
  if (name.startsWith('./') || name.startsWith('/')) {
    const p = name.startsWith('/') ? name : path.join(PROJECT || process.cwd(), name);
    if (!fs.existsSync(p)) throw new Error('图片不存在：' + p);
    return 'file://' + p;
  }
  const p = path.join(KIT, 'assets/img', name + '.jpg');
  if (!fs.existsSync(p)) throw new Error('图库里没有这张图：' + name + '（查技能的 refs/图库/图库清单.txt）');
  return 'file://' + p;
}
const logo = (name) => 'file://' + path.join(KIT, 'assets/logo', name + '.png');

// lucide 线性图标：icon('coffee', 20, 1.8)。名字查 node_modules/lucide-static/icons
const iconCache = {};
function icon(name, size = 20, stroke = 1.8, extra = '') {
  let svg = iconCache[name];
  if (!svg) {
    const p = path.join(KIT, 'node_modules/lucide-static/icons', name + '.svg');
    if (!fs.existsSync(p)) throw new Error('图标不存在：' + name + '（ls node_modules/lucide-static/icons | grep 关键词）');
    svg = fs.readFileSync(p, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim();
    iconCache[name] = svg;
  }
  return svg
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`)
    .replace(/stroke-width="2"/, `stroke-width="${stroke}"`)
    .replace(/class="[^"]*"/, `class="ic" ${extra}`);
}

// iOS 状态栏（深色底传 true）
function statusBar(light = false) {
  const c = light ? '#fff' : '#111';
  return `<div class="sb" style="color:${c}"><span class="sb-t">9:41</span><span class="sb-r">
<svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="${c}"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="${c}"/><rect x="10" y="3" width="3" height="9" rx="1" fill="${c}"/><rect x="15" y="0" width="3" height="12" rx="1" fill="${c}"/></svg>
<svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .6C5.3.6 2.8 1.6.9 3.4L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.3c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7.1 7.1 0 0 0 8 3.9c-1.8 0-3.5.7-4.8 1.8l1.1 1.2c1-.9 2.3-1.4 3.7-1.4Zm0 3.3c-.6 0-1.1.2-1.5.6L8 11l1.5-1.6c-.4-.4-.9-.6-1.5-.6Z" fill="${c}"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" stroke="${c}" stroke-opacity=".38" fill="none"/><rect x="2" y="2" width="20" height="9" rx="2.5" fill="${c}"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="${c}" fill-opacity=".4"/></svg>
</span></div>`;
}

// 小程序顶栏：标题居中 + 右上角微信胶囊（小程序的标志，小程序每屏都要有；App 不要）
function miniNav({ title = '', light = false, bg = 'transparent', left = '' } = {}) {
  const c = light ? '#fff' : '#111';
  const capBg = light ? 'rgba(0,0,0,.18)' : 'rgba(255,255,255,.72)';
  const capBd = light ? 'rgba(255,255,255,.28)' : 'rgba(0,0,0,.12)';
  return `<div class="mn" style="background:${bg};color:${c}">
<div class="mn-l">${left}</div><div class="mn-t">${title}</div>
<div class="cap" style="background:${capBg};border-color:${capBd}"><svg width="20" height="6" viewBox="0 0 20 6"><circle cx="3" cy="3" r="2.2" fill="${c}"/><circle cx="10" cy="3" r="2.8" fill="${c}"/><circle cx="17" cy="3" r="2.2" fill="${c}"/></svg><i style="background:${capBd}"></i><svg width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" stroke="${c}" stroke-width="1.6" fill="none"/><circle cx="9" cy="9" r="2.6" fill="${c}"/></svg></div></div>`;
}

// iPhone 底部横条（深色底传 true）
const homeBar = (light = false) => `<div class="hb" style="background:${light ? '#fff' : '#111'}"></div>`;

// 手机外框：screen 是 375×812 的屏幕 HTML，w 是显示宽度
function phone(screen, { w = 300, id = '' } = {}) {
  const k = w / 375;
  const H = Math.round(812 * k), W = Math.round(375 * k);
  const pad = Math.max(7, Math.round(12 * k));
  const r = Math.round(55 * k);
  return `<div class="dev" ${id ? `data-screen="${id}"` : ''} style="width:${W + pad * 2}px;height:${H + pad * 2}px;padding:${pad}px;border-radius:${r + pad * .4}px">
<div class="dev-s" style="width:${W}px;height:${H}px;border-radius:${r}px"><div class="dev-z" style="transform:scale(${W / 375},${H / 812})">${screen}</div>
<div class="island" style="width:${Math.round(118 * k)}px;height:${Math.round(34 * k)}px;top:${Math.round(11 * k)}px"></div></div></div>`;
}

// 浏览器外框：screen 是 1280×h 的网页 HTML，w 是显示宽度
function browser(screen, { w = 900, url = '', h = 800 } = {}) {
  const k = w / 1280;
  return `<div class="brw" style="width:${w}px"><div class="brw-bar"><span></span><span></span><span></span><div class="brw-url">${url}</div></div>
<div class="brw-s" style="height:${Math.round(h * k)}px"><div class="dev-z" style="transform:scale(${k},${Math.round(h * k) / h});width:1280px;height:${h}px">${screen}</div></div></div>`;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// 固定种子的伪随机（画二维码、噪点、柱状图用；每次出图一样）
function rng(seed = 7) { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }

// 票据、核销用的二维码（假的，画出来像）
function qr(size, color = '#111', bg = '#fff', seed = 7) {
  const n = 21; const r = rng(seed);
  const fin = (x, y) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  let rects = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if (fin(x, y)) continue; if (r() > 0.52) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }
  const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="${bg}"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><g fill="${color}">${rects}${f(0, 0)}${f(n - 7, 0)}${f(0, n - 7)}</g></svg>`;
}

// SVG 噪点颗粒（叠在照片或纸面上：<div style="position:absolute;inset:0;background:${grain(.18)}">）
const grain = (opacity = .16, freq = .9) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`)}")`;

module.exports = { KIT, setProject, img, logo, icon, statusBar, miniNav, homeBar, phone, browser, esc, rng, qr, grain };
