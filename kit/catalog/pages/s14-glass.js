// 14 液态玻璃 Liquid Glass —— 漫游 MANYOU，旅行行程 App（Roam 是现成的笔记软件名，英文字标改用拼音）
// 行程 2026-09-21 周一 — 09-27 周日（落叶松变黄、梦莲湖的路还开着）。第 3 天 09-23 周三，状态栏 9:41：人还在梦莲湖（07:00 到，停 3 小时），下一站 10:30 路易斯湖
// 字体：大标题苹方极细（Ultralight），数字和西文 Outfit 细体，正文苹方常规；和 16 的苹方中粗 + 思源黑体 + Inter 等宽数字分开
const { img, icon, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

const LAKE = img('lake-moraine'), LODGE = img('cabin-log-mountain'), LATTE = img('latte-plants');

// 液态玻璃的边缘折射：每块玻璃按自己的尺寸生成一张位移图。
// 中间是中性灰（不动），四周一圈斜面把背景往里拉，像一块凸透镜，边缘的线条会被弯过来。
const lmap = (w, h, r, b) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='x' x1='1' y1='0' x2='0' y2='0'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#f00'/></linearGradient><linearGradient id='y' x1='0' y1='1' x2='0' y2='0'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#00f'/></linearGradient><filter id='s' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='${(b / 2.2).toFixed(1)}'/></filter></defs><rect width='${w}' height='${h}' fill='#000'/><rect width='${w}' height='${h}' rx='${r}' fill='url(#x)'/><rect width='${w}' height='${h}' rx='${r}' fill='url(#y)' style='mix-blend-mode:screen'/><rect x='${b}' y='${b}' width='${w - 2 * b}' height='${h - 2 * b}' rx='${Math.max(2, r - b)}' fill='rgb(128,128,128)' filter='url(#s)'/></svg>`);
const FILTERS = {};
// L(宽, 高, 圆角, 折射强度) → 写进元素 style 的变量
function L(w, h, r, S) {
  const s = S || Math.round(Math.max(18, Math.min(46, Math.min(w, h) * 0.62)));
  const b = Math.round(Math.max(8, Math.min(20, Math.min(r, h / 2) * 0.62)));
  const id = `g14-${w}-${h}-${r}-${s}`;
  if (!FILTERS[id]) FILTERS[id] = `<filter id="${id}" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feImage href="${lmap(w, h, r, b)}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="${s}" xChannelSelector="R" yChannelSelector="B"/></filter>`;
  return `width:${w}px;height:${h}px;border-radius:${r}px;--lf:url(#${id});`;
}
const defs = () => `<svg width="0" height="0" style="position:absolute">${Object.values(FILTERS).join('')}</svg>`;

const css = `
.x14{color:#fff;font-family:"Outfit","PingFang SC",-apple-system,sans-serif;background:#123238;-webkit-font-smoothing:antialiased}
.x14 .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.x14 .g{--lf:blur(0px);--bl:4px;position:relative;isolation:isolate;background:linear-gradient(160deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,.06) 46%,rgba(255,255,255,.12) 100%);-webkit-backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.8) brightness(1.05);backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.8) brightness(1.05);text-shadow:0 1px 10px rgba(0,22,30,.22);box-shadow:inset 0 1px 1.5px rgba(255,255,255,.65),inset 0 -1px 1px rgba(255,255,255,.22),inset 0 0 22px rgba(255,255,255,.07),0 16px 36px -14px rgba(3,20,26,.5)}
.x14 .g::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.3px;background:linear-gradient(140deg,rgba(255,255,255,.98),rgba(255,255,255,.22) 24%,rgba(255,255,255,0) 50%,rgba(255,255,255,.12) 72%,rgba(255,255,255,.8));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.x14 .g::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 2.5px 1.5px 2px -1.5px rgba(255,150,190,.55),inset -2.5px -1.5px 2px -1.5px rgba(110,215,255,.6)}
.x14 .ab{position:absolute}
.x14 .g.thick{--bl:12px;background:linear-gradient(160deg,rgba(255,255,255,.2),rgba(255,255,255,.05) 46%,rgba(255,255,255,.1)),rgba(18,22,22,.2);-webkit-backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.7) brightness(.95);backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.7) brightness(.95)}
.x14 .wbtn,.x14 .days b,.x14 .pin,.x14.web .nv span.on{text-shadow:none}
.x14 .ts{text-shadow:0 1px 16px rgba(0,18,26,.32)}
.x14 .cir{display:grid;place-items:center}
.x14 .grp{display:flex;align-items:center;justify-content:center;gap:18px}
.x14 .wbtn{display:flex;align-items:center;justify-content:center;gap:7px;height:46px;border-radius:23px;background:rgba(255,255,255,.94);color:#0E2328;font-size:16px;font-weight:600;box-shadow:0 8px 20px -8px rgba(0,0,0,.35)}
.x14 .gbtn{display:flex;align-items:center;justify-content:center;gap:7px;font-size:16px;font-weight:600}
.x14 .num{font-family:"Outfit",sans-serif;font-weight:300;letter-spacing:0}
.x14 .lt3{font-family:"PingFang SC",sans-serif;font-weight:300}
.x14 .lb{font-size:13px;opacity:.8;font-weight:500}

/* hero */
.x14 .ttl .k{font-size:15px;font-weight:500;opacity:.92}
.x14 .ttl h1{font:100 76px/1.02 "PingFang SC",sans-serif;letter-spacing:-.02em;margin:4px 0 0 -4px}
.x14 .ttl .k2{display:flex;align-items:center;gap:6px;font-size:15px;font-weight:500;margin-top:10px;opacity:.92}
.x14 .card{padding:22px 20px 0}
.x14 .card .r1{display:flex;align-items:baseline;gap:12px}
.x14 .card .tm{font:400 16px/1 "Outfit",sans-serif;opacity:.86}
.x14 .card .nm{font:400 23px/1.2 "PingFang SC",sans-serif;letter-spacing:-.01em}
.x14 .card .meta{font-size:14px;opacity:.84;margin-top:8px;padding-left:55px}
.x14 .card .acts{display:flex;gap:10px;margin-top:18px;padding-left:55px}
.x14 .cps{display:flex;align-items:center;gap:10px;padding:0 18px;font-size:15px;font-weight:500;white-space:nowrap}
.x14 .cps .num{font-weight:400;opacity:.8}
.x14 .tab{display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 6px}
.x14 .tab .on{height:52px;border-radius:26px;display:flex;align-items:center;gap:7px;padding:0 18px 0 16px;font-size:15px;font-weight:600;background:rgba(255,255,255,.26);box-shadow:inset 0 1px 1px rgba(255,255,255,.55)}
.x14 .tab .it{width:52px;display:grid;place-items:center;opacity:.92}

/* b1 地图（深色地形底图，玻璃透出底下的青绿和岩灰） */
.x14 .srch{display:flex;align-items:center;gap:10px;padding:0 18px;font-size:16px}
.x14 .srch span{opacity:.7}
.x14 .days{display:flex;align-items:center;justify-content:space-between;padding:0 6px}
.x14 .days i{width:36px;height:36px;border-radius:18px;display:grid;place-items:center;font:400 16px/1 "Outfit",sans-serif;font-style:normal;opacity:.9}
.x14 .days b{height:40px;border-radius:20px;padding:0 16px;display:flex;align-items:center;background:rgba(255,255,255,.94);color:#0E2328;font-size:15px;font-weight:600}
.x14 .plate{padding:22px 22px 0}
.x14 .plate .rt{font-size:17px;font-weight:500;display:flex;align-items:center;gap:8px}
.x14 .plate .rt .ic{opacity:.6}
.x14 .stats{display:flex;gap:30px;margin-top:16px}
.x14 .stats b{display:block;font:300 34px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.x14 .stats b small{font-size:15px;font-weight:400;margin-left:3px;opacity:.72}
.x14 .stats span{display:block;font-size:13px;opacity:.72;margin-top:8px}
.x14 .pin{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:15px;display:grid;place-items:center;font:600 15px/1 "Outfit",sans-serif;background:#fff;color:#0F2A33;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 6px 14px -4px rgba(0,0,0,.6)}
.x14 .pin.now{width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:19px;font-size:16px;box-shadow:0 0 0 1px rgba(0,0,0,.2),0 0 0 12px rgba(255,255,255,.2),0 8px 18px -4px rgba(0,0,0,.6)}
.x14 .ml{position:absolute;font-size:14px;font-weight:600;white-space:nowrap;color:#fff;text-shadow:0 0 3px rgba(4,14,14,.9),0 0 8px rgba(4,14,14,.7),0 1px 2px rgba(0,0,0,.6)}

/* b2 酒店 */
.x14 .htl{padding:24px 24px 0}
.x14 .htl .st{display:flex;align-items:center;gap:6px;font-size:15px;font-weight:500;opacity:.92}
.x14 .htl h2{font:100 42px/1.1 "PingFang SC",sans-serif;letter-spacing:-.01em;margin:10px 0 0 -2px}
.x14 .htl .sub{font-size:15px;opacity:.84;margin-top:8px}
.x14 .dts{display:flex;align-items:flex-end;justify-content:space-between;margin-top:22px}
.x14 .dts b{display:block;font:300 44px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.x14 .dts span{display:block;font-size:13px;opacity:.78;margin-top:8px}
.x14 .nts{display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;margin-bottom:22px}
.x14 .hr{height:1px;background:rgba(255,255,255,.22);margin:20px 0 16px}
.x14 .cf{display:flex;justify-content:space-between;align-items:baseline;font-size:15px}
.x14 .cf b{font:400 19px/1 "Outfit",sans-serif;letter-spacing:.06em}

/* web */
.x14.web .g{--bl:7px}
.x14.web .wmk{font:500 26px/1 "Outfit",sans-serif;letter-spacing:.2em}
.x14.web .wmk small{font:400 17px/1 "PingFang SC",sans-serif;letter-spacing:.2em;margin-left:12px;opacity:.88}
.x14.web .nv{display:flex;align-items:center;gap:6px;padding:0 6px;font-size:16px;font-weight:500}
.x14.web .nv span{height:40px;padding:0 20px;border-radius:20px;display:flex;align-items:center;opacity:.9}
.x14.web .nv span.on{background:rgba(255,255,255,.94);color:#0E2328;opacity:1;font-weight:600}
.x14.web h1{font:100 80px/1.05 "PingFang SC",sans-serif;text-align:center;letter-spacing:-.01em;text-shadow:0 2px 28px rgba(4,8,22,.5)}
.x14.web .sub{font-size:19px;font-weight:400;text-align:center;opacity:.94;margin-top:16px;text-shadow:0 1px 14px rgba(4,8,22,.6)}
.x14.web .panel{padding:24px 32px}
.x14.web .phd{display:flex;align-items:baseline;justify-content:space-between}
.x14.web .phd b{font:400 22px/1 "PingFang SC",sans-serif}
.x14.web .rw{display:grid;grid-template-columns:84px 1fr auto;align-items:center;padding:14px 0;border-top:1px solid rgba(255,255,255,.18);font-size:17px}
.x14.web .rw .tt{font:400 18px/1 "Outfit",sans-serif;opacity:.84}
.x14.web .rw .n{font-weight:500}
.x14.web .rw .m{font-size:15px;opacity:.8}
.x14.web .rw.ex{border-top:none;padding:0 20px;margin:12px -20px 4px}

/* 网页：湖面在玻璃卡底下收成一片平整的青色（倒影只留在岸边），卡里才干净 */
.x14.web .calm{left:0;right:0;top:418px;bottom:0;background:linear-gradient(180deg,rgba(22,98,110,0) 0,rgba(22,98,110,.55) 46px,rgba(20,92,106,.9) 104px,#155C69 170px,#0F4753 100%)}
.x14.web .calm:after{content:"";position:absolute;inset:40px 0 0;background:repeating-linear-gradient(180deg,rgba(190,240,240,.05) 0 1px,rgba(190,240,240,0) 1px 9px);-webkit-mask:linear-gradient(180deg,transparent,#000 30%,#000 70%,transparent);mask:linear-gradient(180deg,transparent,#000 30%,#000 70%,transparent)}

/* cmp 半山咖啡 */
.x14 .bwm{height:46px;display:flex;align-items:center;gap:10px;text-shadow:0 1px 14px rgba(0,0,0,.45)}
.x14 .bwm b{font:500 22px/1 "PingFang SC",sans-serif;letter-spacing:.12em}
.x14 .bwm i{font:500 12px/1 "Outfit",sans-serif;font-style:normal;letter-spacing:.2em;opacity:.85}
.x14 .pts{height:46px;display:flex;align-items:center;gap:8px;font-size:13px;text-shadow:0 1px 14px rgba(0,0,0,.5)}
.x14 .pts span{opacity:.86}
.x14 .pts b{font:300 27px/1 "Outfit",sans-serif;letter-spacing:0}
.x14 .rec{padding:20px 22px 0}
.x14 .rec .r{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}
.x14 .rec h2{font:100 46px/1.1 "PingFang SC",sans-serif;letter-spacing:-.01em;margin-left:-2px}
.x14 .rec .r b{font:300 44px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.x14 .rec .s{display:flex;align-items:center;gap:6px;font-size:15px;opacity:.9;margin-top:8px}
.x14 .tab4{display:flex;align-items:center;justify-content:space-between;padding:0 6px}
.x14 .tab4 span{height:52px;padding:0 13px;border-radius:26px;display:flex;align-items:center;gap:6px;font-size:14px;font-weight:500;opacity:.92}
.x14 .tab4 span.on{background:rgba(255,255,255,.26);box-shadow:inset 0 1px 1px rgba(255,255,255,.55);opacity:1;padding:0 16px;font-weight:600}
`;

// ———— 主图：第 3 天行程 ————
const hero = `<div class="scr x14">
<img class="bg" src="${LAKE}" style="object-position:43% 50%">
<div class="ab" style="inset:0;background:linear-gradient(180deg,rgba(8,20,30,.36),rgba(8,20,30,.1) 32%,rgba(8,20,30,0) 50%,rgba(4,24,30,.3))"></div>
${statusBar(true)}
<div class="ab g cir" style="left:20px;top:58px;${L(48, 48, 24)}">${icon('chevron-left', 24, 2.2)}</div>
<div class="ab g grp" style="right:20px;top:58px;${L(92, 48, 24)}">${icon('share', 19, 2)}${icon('ellipsis', 21, 2.2)}</div>
<div class="ab ttl ts" style="left:24px;top:128px">
  <div class="k">第 3 天 · 9月23日 周三</div>
  <h1>梦莲湖</h1>
  <div class="k2">${icon('sunrise', 17, 2)}<span class="num">日出 07:31 · 2°</span></div>
</div>
<div class="ab g card" style="left:16px;top:458px;${L(343, 170, 30, 48)}">
  <div class="r1"><span class="tm">07:00</span><span class="nm">梦莲湖 · 看日出</span></div>
  <div class="meta">岩堆步道 0.8 km · 停留 3 小时</div>
  <div class="acts"><div class="wbtn" style="width:112px">${icon('navigation', 16, 2.2)}导航</div><div class="g gbtn" style="${L(96, 46, 23)}">打卡</div></div>
</div>
<div class="ab g cps" style="left:16px;top:642px;${L(166, 50, 25)}"><span class="num">10:30</span>路易斯湖</div>
<div class="ab g cps" style="left:193px;top:642px;${L(166, 50, 25)}"><span class="num">13:00</span>湖畔午餐</div>
<div class="ab g tab" style="left:16px;bottom:26px;${L(271, 64, 32)}">
  <div class="on">${icon('route', 20, 2)}行程</div>
  <div class="it">${icon('map', 22, 1.9)}</div><div class="it">${icon('ticket', 22, 1.9)}</div><div class="it">${icon('circle-user', 22, 1.9)}</div>
</div>
<div class="ab g cir" style="right:16px;bottom:26px;${L(64, 64, 32)}">${icon('search', 24, 2.1)}</div>
${defs()}${homeBar(true)}</div>`;

// ———— 地图：深色地形底图（路易斯湖一带）。噪声做高程、打一束西北光出山体阴影，按高度上色：林地深绿、岩石灰、山顶积雪 ————
const mapSvg = `<svg class="ab" style="left:0;top:0" width="375" height="812" viewBox="0 0 375 812">
<defs>
<filter id="m14t" x="0" y="0" width="375" height="812" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.0043 0.0058" numOctaves="5" seed="31" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.1 0 0 0 -0.62" result="h0"/>
<feGaussianBlur in="h0" stdDeviation="1.1" result="h"/>
<feDiffuseLighting in="h" surfaceScale="20" diffuseConstant="1.2" lighting-color="#fff" result="sh"><feDistantLight azimuth="305" elevation="32"/></feDiffuseLighting>
<feColorMatrix in="n" type="matrix" values="2.1 0 0 0 -0.62  2.1 0 0 0 -0.62  2.1 0 0 0 -0.62  0 0 0 0 1" result="g"/>
<feComponentTransfer in="g" result="col">
<feFuncR type="table" tableValues="0.05 0.07 0.1 0.2 0.36 0.62 0.9"/>
<feFuncG type="table" tableValues="0.12 0.16 0.19 0.24 0.36 0.62 0.92"/>
<feFuncB type="table" tableValues="0.1 0.11 0.13 0.2 0.35 0.63 0.95"/>
</feComponentTransfer>
<feComposite in="col" in2="sh" operator="arithmetic" k1="1.15" k2="0" k3="0" k4="0"/>
</filter>
<filter id="m14v" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="13"/></filter>
<radialGradient id="m14w" cx=".55" cy=".45" r=".7"><stop offset="0" stop-color="#45C3C6"/><stop offset=".65" stop-color="#2AA2AB"/><stop offset="1" stop-color="#17808C"/></radialGradient>
<radialGradient id="m14u" cx=".4" cy=".5" r=".75"><stop offset="0" stop-color="#5FCFC9"/><stop offset=".6" stop-color="#36ADB0"/><stop offset="1" stop-color="#1D8790"/></radialGradient>
</defs>
<rect width="375" height="812" fill="#16251F"/>
<rect width="375" height="812" filter="url(#m14t)"/>
<g filter="url(#m14v)" fill="none" stroke="#0F1F18" stroke-linecap="round" opacity=".62">
<path d="M226 60 C256 180 282 250 290 318 S312 430 330 470 S368 540 420 580" stroke-width="74"/>
<path d="M300 324 C262 306 206 278 120 262" stroke-width="52"/>
<path d="M214 283 C222 340 232 400 236 470" stroke-width="44"/>
</g>
<path d="M226 60 C256 180 282 250 290 318 S312 430 330 470 S368 540 420 580" fill="none" stroke="#2C8E98" stroke-width="2.6" stroke-opacity=".85"/>
<!-- 湖按真实轮廓画：路易斯湖细长，西南头是冰川入湖的浅滩，东北头收窄出水；梦莲湖短而弯，北头有乱石堆挡着；溪流把湖接进河里 -->
<g fill="none" stroke="#2C8E98" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".8">
<path d="M33 306 C26 312 22 316 14 318 C8 320 4 326 -2 330" stroke-width="1.3"/>
<path d="M152 247 C172 249 196 247 218 250 C240 254 262 252 286 258" stroke-width="1.4"/>
<path d="M271 446 C284 444 296 448 306 452 C312 455 318 456 324 457" stroke-width="1.4"/>
<path d="M182 495 C176 504 170 508 160 512" stroke-width="1.1"/>
</g>
<path d="M33 305 C31 299 34 294 41 292 C46 291 49 287 55 285 C62 283 67 281 73 278 C79 275 82 271 89 268 C96 265 101 262 106 258 C112 254 118 253 124 250 C130 247 135 243 142 242 C148 241 153 242 154 245 C155 249 151 252 146 254 C139 257 135 261 129 264 C122 267 119 272 112 275 C105 278 101 283 94 286 C89 288 87 292 81 294 C74 297 70 301 63 303 C56 305 52 309 45 310 C39 311 35 309 33 305Z" fill="url(#m14u)" stroke="rgba(214,246,244,.38)" stroke-width=".9"/>
<path d="M175 489 C173 483 177 478 184 475 C190 473 194 469 199 466 C204 462 209 460 216 459 C222 458 226 455 232 453 C238 451 241 448 247 446 C252 444 257 445 261 443 C265 441 270 441 272 444 C274 447 271 451 266 452 C260 454 257 458 252 461 C247 464 245 469 239 471 C233 473 229 472 224 475 C218 478 216 482 210 485 C204 488 199 493 192 495 C185 497 177 495 175 489Z" fill="url(#m14w)" stroke="rgba(214,246,244,.38)" stroke-width=".9"/>
<g fill="#7E8A86" fill-opacity=".55"><circle cx="268" cy="438" r="1.6"/><circle cx="274" cy="439" r="1.2"/><circle cx="263" cy="436" r="1.1"/><circle cx="271" cy="434" r="1"/></g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M256 60 C284 180 304 250 310 318 S334 430 350 470 S380 530 420 556" stroke="#0A1512" stroke-width="6.5" stroke-opacity=".7"/>
<path d="M256 60 C284 180 304 250 310 318 S334 430 350 470 S380 530 420 556" stroke="#E8C26A" stroke-width="3.6"/>
<path d="M300 324 C262 306 206 278 150 252" stroke="rgba(255,255,255,.5)" stroke-width="2.4"/>
<path d="M304 330 C318 400 334 440 350 470 S380 530 420 556" stroke="#fff" stroke-width="3" stroke-dasharray="1 7" stroke-opacity=".9"/>
<path d="M150 252 C190 270 250 298 300 324" stroke="#fff" stroke-width="3" stroke-dasharray="1 7" stroke-opacity=".9"/>
<path d="M236 462 C232 400 222 340 214 283 C190 272 170 262 150 252" stroke="rgba(0,0,0,.45)" stroke-width="9"/>
<path d="M236 462 C232 400 222 340 214 283 C190 272 170 262 150 252" stroke="#fff" stroke-width="5"/>
</g>
<g font-family="PingFang SC" font-size="11.5" font-weight="500" fill="rgba(255,255,255,.82)" style="paint-order:stroke" stroke="rgba(6,14,12,.75)" stroke-width="3" stroke-linejoin="round">
<text x="30" y="452">▲ 坦普尔山 3544</text>
<text x="118" y="210">▲ 费尔维尤山 2744</text>
<text x="96" y="560" fill="rgba(255,255,255,.62)" letter-spacing="1">班夫国家公园</text>
</g>
</svg>`;

const b1 = `<div class="scr x14">
${mapSvg}
<div class="pin now" style="left:236px;top:464px">1</div>
<div class="pin" style="left:100px;top:268px">2</div>
<div class="pin" style="left:300px;top:324px">3</div>
<div class="ml" style="left:164px;top:494px">梦莲湖</div>
<div class="ml" style="left:56px;top:292px">路易斯湖</div>
<div class="ml" style="left:240px;top:342px">湖畔午餐</div>
${statusBar(true)}
<div class="ab g srch" style="left:16px;top:58px;${L(283, 48, 24)}">${icon('search', 19, 2.1)}<span>搜索地点</span></div>
<div class="ab g cir" style="right:16px;top:58px;${L(48, 48, 24)}">${icon('layers', 21, 2)}</div>
<div class="ab g days" style="left:16px;top:118px;${L(343, 52, 26)}"><i>1</i><i>2</i><b>第 3 天</b><i>4</i><i>5</i><i>6</i><i>7</i></div>
<div class="ab g cir" style="right:16px;top:498px;${L(48, 48, 24)}">${icon('locate-fixed', 21, 2)}</div>
<div class="ab g plate" style="left:16px;top:562px;${L(343, 142, 32, 40)}">
  <div class="rt">梦莲湖${icon('arrow-right', 16, 2)}路易斯湖${icon('arrow-right', 16, 2)}班夫</div>
  <div class="stats"><div><b class="num">72<small>km</small></b><span>自驾</span></div><div><b class="num">4.0<small>km</small></b><span>步行</span></div><div><b class="num">10<small>小时</small></b><span>全天</span></div></div>
</div>
<div class="ab g tab" style="left:16px;bottom:26px;${L(271, 64, 32)}">
  <div class="it">${icon('route', 22, 1.9)}</div>
  <div class="on">${icon('map', 20, 2)}地图</div>
  <div class="it">${icon('ticket', 22, 1.9)}</div><div class="it">${icon('circle-user', 22, 1.9)}</div>
</div>
<div class="ab g cir" style="right:16px;bottom:26px;${L(64, 64, 32)}">${icon('search', 24, 2.1)}</div>
${defs()}${homeBar(true)}</div>`;

// ———— 酒店确认：玻璃卡浮在上半屏的山崖上，木屋露在下面 ————
const b2 = `<div class="scr x14">
<img class="bg" src="${LODGE}" style="object-position:50% 100%">
<div class="ab" style="inset:0;background:linear-gradient(180deg,rgba(10,16,22,.3),rgba(10,16,22,.04) 22%,rgba(10,16,22,0) 70%,rgba(10,16,22,.3))"></div>
${statusBar(true)}
<div class="ab g cir" style="left:20px;top:58px;${L(48, 48, 24)}">${icon('x', 22, 2.2)}</div>
<div class="ab g cir" style="right:20px;top:58px;${L(48, 48, 24)}">${icon('share', 19, 2)}</div>
<div class="ab g thick htl" style="left:16px;top:122px;${L(343, 300, 36, 50)}">
  <div class="st">${icon('circle-check', 18, 2.2)}已确认</div>
  <h2>云杉谷木屋</h2>
  <div class="sub">幽鹤国家公园 · 山景木屋 · 2 位成人</div>
  <div class="dts">
    <div><b>9.24</b><span>周四 15:00 后入住</span></div>
    <div class="g nts" style="${L(62, 34, 17)}">2 晚</div>
    <div style="text-align:right"><b>9.26</b><span>周六 11:00 前退房</span></div>
  </div>
  <div class="hr"></div>
  <div class="cf"><span style="opacity:.78">确认号</span><b>MY-48217</b></div>
</div>
<div class="ab" style="left:16px;right:16px;top:720px;display:flex;gap:10px"><div class="wbtn" style="flex:1;height:52px;border-radius:26px">${icon('navigation', 16, 2.2)}导航</div><div class="g gbtn" style="${L(160, 52, 26)}">${icon('phone', 16, 2.2)}联系酒店</div></div>
${defs()}${homeBar(true)}</div>`;

// ———— 网页版行程规划：内容收在中间 840 宽的一栏里 ————
const web = `<div class="x14 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<img class="bg" src="${LAKE}" style="object-position:50% 100%;filter:brightness(.86) saturate(1.04)">
<div class="ab calm"></div>
<div class="ab" style="inset:0;background:linear-gradient(180deg,rgba(8,14,30,.6) 0%,rgba(8,14,30,.42) 24%,rgba(8,14,30,.12) 40%,rgba(8,14,30,0) 50%)"></div>
<div class="ab" style="left:240px;right:240px;top:96px;height:200px;background:radial-gradient(50% 50% at 50% 50%,rgba(6,10,26,.42),rgba(6,10,26,0));pointer-events:none"></div>
<div class="ab wmk ts" style="left:238px;top:43px">MANYOU<small>漫游</small></div>
<div class="ab g nv" style="left:479px;top:30px;${L(322, 52, 26, 30)}"><span class="on">行程</span><span>地图</span><span>票夹</span><span>灵感</span></div>
<div class="ab g cir" style="left:994px;top:32px;overflow:hidden;${L(48, 48, 24)}"><img src="${img('p-woman-8')}" style="width:42px;height:42px;border-radius:21px;object-fit:cover"></div>
<div class="ab ts" style="left:0;right:0;top:122px"><h1>加拿大落基山 · 7 天</h1><div class="sub"><span class="num">9月21日 — 9月27日</span> · 2 人</div></div>
<div class="ab g days" style="left:430px;top:384px;${L(420, 52, 26, 30)}"><i>1</i><i>2</i><b>第 3 天 · 梦莲湖</b><i>4</i><i>5</i><i>6</i><i>7</i></div>
<div class="ab g panel" style="left:340px;top:464px;${L(600, 312, 36, 50)}">
  <div class="phd"><b>9月23日 周三</b><span style="display:flex;align-items:center;gap:6px;font-size:16px;opacity:.92">${icon('sunrise', 18, 2)}<span class="num">日出 07:31 · 2°</span></span></div>
  <div class="rw g ex" style="${L(576, 76, 24, 26)}"><span class="tt">07:00</span><div><div class="n">梦莲湖 · 看日出</div><div class="m" style="margin-top:5px">岩堆步道 0.8 km · 停留 3 小时</div></div><div class="wbtn" style="width:104px;height:42px">${icon('navigation', 15, 2.2)}导航</div></div>
  <div class="rw"><span class="tt">10:30</span><span class="n">路易斯湖</span><span class="m">湖畔步道 3.2 km</span></div>
  <div class="rw"><span class="tt">13:00</span><span class="n">湖畔午餐</span><span class="m">路易斯湖村</span></div>
  <div class="rw"><span class="tt">16:30</span><span class="n">回班夫</span><span class="m">自驾 45 分钟</span></div>
</div>
${defs()}</div>`;

// ———— 半山咖啡 ————
const cmp = `<div class="scr x14">
<img class="bg" src="${LATTE}" style="object-position:55% 50%">
<div class="ab" style="inset:0;background:linear-gradient(180deg,rgba(14,18,12,.5),rgba(14,18,12,.12) 22%,rgba(14,18,12,0) 40%,rgba(14,18,12,0) 80%,rgba(14,18,12,.28))"></div>
${statusBar(true)}
<div class="ab bwm" style="left:24px;top:58px"><b>半山咖啡</b><i>BANSHAN</i></div>
<div class="ab pts" style="right:24px;top:58px"><span>积分</span><b>1,280</b></div>
<div class="ab g rec" style="left:16px;top:268px;${L(343, 212, 34, 46)}">
  <div class="lb">今日推荐</div>
  <div class="r"><h2>桂花拿铁</h2><b>¥28</b></div>
  <div class="s">${icon('map-pin', 16, 2)}东四店 · 到店自取约 6 分钟</div>
  <div class="wbtn" style="margin-top:18px;height:52px;border-radius:26px;font-size:17px">去点单</div>
</div>
<div class="ab g tab4" style="left:16px;bottom:26px;${L(343, 64, 32)}">
  <span class="on">${icon('house', 19, 2)}首页</span><span>${icon('coffee', 19, 2)}菜单</span><span>${icon('receipt-text', 19, 2)}订单</span><span>${icon('circle-user', 19, 2)}我的</span>
</div>
${defs()}${homeBar(true)}</div>`;

module.exports = {
  css,
  screens: { 's14-hero': hero, 's14-b1': b1, 's14-b2': b2, 's14-web': web, 's14-cmp': cmp },
  desktop: ['s14-web'],
  zoom: [220, 376],
  marks: [[30, 724], [334, 330], [358, 690], [350, 476]],
  palette: [['湖青', '#2E8A8C'], ['晨粉', '#E9A08A'], ['玻璃白', '#FFFFFF'], ['岩灰', '#6B6460'], ['夜蓝', '#0F2A33']],
  type: { font: '"Outfit","PingFang SC",sans-serif', weight: 300, sample: `<span style="font-family:'PingFang SC';font-weight:100">游</span> Aa`, style: 'font-size:62px;letter-spacing:-.01em', lines: [['标题', '苹方 极细'], ['数字和西文', 'Outfit 细体'], ['正文', '苹方 常规']] },
  stageA: `url(${LAKE}) 40% 50%/cover`,
  decoA: `<div style="position:absolute;inset:0;-webkit-backdrop-filter:blur(26px) saturate(1.2);backdrop-filter:blur(26px) saturate(1.2);background:rgba(10,28,36,.1)"></div>`,
  stageB: { bg: `url(${LAKE}) 40% 50%/cover`, color: '#fff', url: 'manyou.travel', deco: `<div style="position:absolute;inset:0;-webkit-backdrop-filter:blur(26px);backdrop-filter:blur(26px);background:rgba(10,28,36,.12)"></div>` },
  page: (no) => stylePages(no, 's14-glass', module.exports),
};
