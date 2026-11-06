const { statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

// 跳跳象：少儿识字 App
// 偏青的草绿 #27BB72、明黄 #FFC72C、天蓝 #2DB2F2、橙 #FF8A1E、藏青 #1F3159；插画平涂，不用渐变；主按钮一律天蓝厚底
// 自己的玩法：在小象的山水世界里点景物认字、把字卡拖进山水画里配景物、小象集贴纸；答题进度记成「小脚印」，攒的是「水滴」
const C = {
  g: '#27BB72', gd: '#16915A', y: '#FFC72C', yd: '#E5A200', b: '#2DB2F2', bd: '#168FD0', o: '#FF8A1E', od: '#DE6A00',
  ink: '#1F3159', sky: '#C9EDFF', h1: '#72CF8C', h2: '#5BC27A', grass: '#A8DE9C', grass2: '#95D48B', tuft: '#4FB873',
  e1: '#74C8F7', e2: '#46ABE6', pink: '#FFA3B5', river: '#5CC8FF',
  road: '#FFF2CF', road2: '#EED79D', lock: '#E8EDF2', lockd: '#C8D1DB', paper: '#FFFBF0', line: '#E2E7EE',
};
const STAGE = '#FFD24D';

const css = `
.x08{--g:${C.g};--gd:${C.gd};--y:${C.y};--yd:${C.yd};--b:${C.b};--bd:${C.bd};--o:${C.o};--od:${C.od};--ink:${C.ink};--hd:"ZCOOL KuaiLe","Douyin Sans","PingFang SC",sans-serif;--nu:"Fredoka","ZCOOL KuaiLe",sans-serif;--kai:"LXGW WenKai","Kaiti SC",serif}
.x08.scr{background:${C.paper};color:var(--ink);font-family:var(--hd);font-weight:400}
.x08 .abs{position:absolute}
.x08 svg{display:block}
.x08 .tk{border-radius:20px;display:flex;align-items:center;justify-content:center;font:400 24px/1 var(--hd);letter-spacing:.08em;color:#fff}
.x08 .tk.o{background:var(--o);box-shadow:0 6px 0 var(--od)}
.x08 .tk.g{background:var(--g);box-shadow:0 6px 0 var(--gd)}
.x08 .tk.b{background:var(--b);box-shadow:0 6px 0 var(--bd)}
.x08 .tk.w{background:#fff;color:var(--ink);box-shadow:0 6px 0 ${C.line},inset 0 0 0 3px ${C.line}}
.x08 .stat{display:flex;align-items:center;gap:5px;font:600 21px/1 var(--nu)}
.x08 .tk .bt{display:grid;place-items:center;width:42px;height:42px;margin-left:12px;border-radius:13px;background:var(--y);box-shadow:0 4px 0 var(--yd);font:500 30px/1 var(--kai);color:var(--ink);letter-spacing:0;padding-bottom:3px}
.x08 .wk{display:flex;align-items:baseline;gap:5px;font:400 17px/1 var(--hd);letter-spacing:.04em;color:#4E6588}
.x08 .wk b{font:600 28px/1 var(--nu);color:var(--od);letter-spacing:0;margin:0 1px}
.x08 .wmk{display:flex;align-items:center;gap:8px;font:400 25px/1 var(--hd);letter-spacing:.04em}
.x08 .card{background:#fff;border-radius:28px;box-shadow:inset 0 0 0 3px ${C.line},0 6px 0 ${C.line}}
/* 字卡 */
.x08 .zk{position:absolute;width:92px;height:92px;border-radius:24px;background:#fff;display:grid;place-items:center;font:500 58px/1 var(--kai);color:var(--ink);padding-bottom:4px}
.x08 .feet{display:flex;gap:6px}
/* 贴纸册 */
.x08 .alb{position:absolute;left:24px;right:24px;border-radius:28px;background:#fff;box-shadow:0 6px 0 #B9DDF0}
.x08 .alb h3{position:absolute;left:24px;top:22px;font:400 22px/1 var(--hd);letter-spacing:.06em}
.x08 .alb h3 b{font:600 22px/1 var(--nu);color:var(--o);margin-left:10px}
.x08 .alb h3 b small{color:#9AA6B6;font-size:18px}
.x08 .grid{position:absolute;left:18px;right:18px;top:66px;display:grid;grid-template-columns:repeat(4,1fr);row-gap:14px}
.x08 .grid div{display:flex;flex-direction:column;align-items:center;gap:6px;font:400 17px/1 var(--hd);color:var(--ink)}
.x08 .grid div.no{color:#B8C2CF}
/* 半山咖啡 */
.x08 .tabs{position:absolute;left:0;right:0;bottom:0;height:88px;background:#fff;box-shadow:0 -3px 0 #EEF1F5;display:flex;justify-content:space-around;padding:12px 10px 0}
.x08 .tabs div{width:64px;display:flex;flex-direction:column;align-items:center;gap:5px;font:400 14px/1 var(--hd);color:#9AA6B6}
.x08 .tabs div.on{color:var(--ink)}
/* 网页 */
.x08.web{background:${C.sky};color:var(--ink);font-family:var(--hd)}
.x08 .nu{font-family:var(--nu);font-weight:600;letter-spacing:.01em}
`;

// ───── 插画零件 ─────
// 小脚印：象脚掌 + 三个趾甲（连续天数）
const foot = (s, c = C.o) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><ellipse cx="12" cy="14.6" rx="8.4" ry="7.8" fill="${c}"/><circle cx="6" cy="5.8" r="2.7" fill="${c}"/><circle cx="12" cy="3.6" r="2.8" fill="${c}"/><circle cx="18" cy="5.8" r="2.7" fill="${c}"/></svg>`;
// 水滴：小象喷的水，攒着换贴纸
const drop = (s, c = C.b) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 1.8C12 1.8 4.4 10.2 4.4 15.2a7.6 7.6 0 0 0 15.2 0C19.6 10.2 12 1.8 12 1.8Z" fill="${c}"/><ellipse cx="9" cy="15" rx="1.9" ry="3" fill="#fff" opacity=".55" transform="rotate(18 9 15)"/></svg>`;
const pin = (s, c = C.o) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 22s7.5-7 7.5-12.6A7.5 7.5 0 0 0 4.5 9.4C4.5 15 12 22 12 22Z" fill="${c}"/><circle cx="12" cy="9.6" r="3" fill="#fff"/></svg>`;
const chk = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 18 18"><path d="M4 9.5l3.2 3.2L14 5.5" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

// 小象：front 视角，几何拼成。arms: down | wave | cheer；eyes: open | happy
function ele(w, { arms = 'down', eyes = 'open', shadow = true } = {}) {
  const h = Math.round(w * 132 / 120);
  const sh = '#5DB7F0', bl = '#AEE0FC';
  const A = (d, c = C.e1) => `<path d="${d}" stroke="${c}" stroke-width="13" stroke-linecap="round" fill="none"/>`;
  const armL = arms === 'cheer' ? 'M40 91 C30 89 21 83 13 71' : 'M39 89 C31 96 29 104 31 110';
  const armR = arms === 'down' ? 'M81 89 C89 96 91 104 89 110' : 'M80 91 C90 89 99 83 107 71';
  const eye = eyes === 'happy'
    ? `<path d="M39.5 48 Q46 39.5 52.5 48" stroke="${C.ink}" stroke-width="3.8" stroke-linecap="round" fill="none"/><path d="M67.5 48 Q74 39.5 80.5 48" stroke="${C.ink}" stroke-width="3.8" stroke-linecap="round" fill="none"/>`
    : `<ellipse cx="46" cy="47" rx="5.6" ry="6.6" fill="${C.ink}"/><ellipse cx="74" cy="47" rx="5.6" ry="6.6" fill="${C.ink}"/><circle cx="48.2" cy="44.2" r="2.3" fill="#fff"/><circle cx="76.2" cy="44.2" r="2.3" fill="#fff"/><circle cx="44.4" cy="50.2" r="1.1" fill="#fff"/><circle cx="72.4" cy="50.2" r="1.1" fill="#fff"/>`;
  const ear = (m) => {
    const X = (x) => (m ? 120 - x : x);
    return `<path d="M${X(34)} 35 C${X(21)} 21 ${X(2)} 25 ${X(3)} 46 C${X(4)} 64 ${X(18)} 73 ${X(33)} 64 C${X(37)} 55 ${X(38)} 43 ${X(34)} 35Z" fill="${C.e2}"/>
<path d="M${X(31)} 40 C${X(22)} 31 ${X(10)} 34 ${X(10.5)} 46.5 C${X(11)} 58 ${X(20)} 63.5 ${X(29.5)} 58.5 C${X(33)} 52 ${X(34)} 45 ${X(31)} 40Z" fill="${C.pink}"/>
<path d="M${X(13)} 44 C${X(14)} 38 ${X(19)} 36 ${X(24)} 38" stroke="#FFC4D0" stroke-width="2.4" stroke-linecap="round" fill="none"/>`;
  };
  return `<svg width="${w}" height="${h}" viewBox="0 0 120 132" overflow="visible">
${shadow ? `<ellipse cx="60" cy="128" rx="31" ry="4.5" fill="#1F3159" opacity=".13"/>` : ''}
${ear(0)}${ear(1)}
<rect x="40" y="101" width="17" height="26" rx="8.5" fill="${C.e1}"/><rect x="63" y="101" width="17" height="26" rx="8.5" fill="${sh}"/>
<path d="M42.5 127 a3 3 0 0 1 6 0Z M49 127 a3 3 0 0 1 6 0Z M65.5 127 a3 3 0 0 1 6 0Z M72 127 a3 3 0 0 1 6 0Z" fill="#fff"/>
<path d="M36 90 C36 78 46 73 60 73 C74 73 84 78 84 90 L85 110 C85 115 82 117 78 117 L42 117 C38 117 35 115 35 110 Z" fill="${C.e1}"/>
<path d="M71 75 C80 77 84 82 84 90 L85 110 C85 115 82 117 78 117 L73 117 C77 104 77 88 71 75 Z" fill="${sh}"/>
<ellipse cx="57" cy="105" rx="13" ry="9.5" fill="${bl}"/>
<path d="M37 80 C48 87 72 87 83 80 L84 87.5 C72 95.5 48 95.5 36 87.5 Z" fill="${C.o}"/>
<path d="M47 89 L69 89 L58 102 Z" fill="${C.o}" stroke="${C.o}" stroke-width="4.5" stroke-linejoin="round"/><path d="M58 89 L69 89 L58 102 Z" fill="${C.od}" opacity=".35"/>
${A(armL)}${A(armR, arms === 'down' ? sh : C.e1)}
<ellipse cx="60" cy="50" rx="35" ry="32" fill="${C.e1}"/>
<path d="M88.7 31.6 A35 32 0 0 1 70 80.6 Q91 63 88.7 31.6 Z" fill="${sh}"/>
<ellipse cx="42" cy="29" rx="9" ry="4.6" fill="#fff" opacity=".38" transform="rotate(-28 42 29)"/>
<path d="M57 19 C55 11 61 7 66 10.5" stroke="${C.e2}" stroke-width="3.6" stroke-linecap="round" fill="none"/>
${eye}
<ellipse cx="37.5" cy="60" rx="6.5" ry="4" fill="${C.pink}"/><ellipse cx="82.5" cy="60" rx="6.5" ry="4" fill="${C.pink}"/>
<path d="M44 64.5 Q49 76 56.5 68 Z" fill="#2A3D6A" stroke="#2A3D6A" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="50.5" cy="70.6" rx="2.8" ry="1.7" fill="#FF8FA6"/>
<path d="M60 58 C60 70 58 80 63 86.5 C67 91.5 75 90.5 76 84" stroke="${C.e1}" stroke-width="12.5" stroke-linecap="round" fill="none"/>
<ellipse cx="76.4" cy="82.6" rx="2" ry="1.4" fill="${C.e2}"/>
<path d="M54.5 68.5 q5.5 2.4 11 0M55 75.5 q5 2.2 10 0" stroke="${C.e2}" stroke-width="2.2" stroke-linecap="round" fill="none"/>
</svg>`;
}
// 小象头像（字标用）
const eleHead = (s) => {
  const sh = '#5DB7F0';
  const ear = (m) => {
    const X = (x) => (m ? 120 - x : x);
    return `<path d="M${X(34)} 35 C${X(21)} 21 ${X(2)} 25 ${X(3)} 46 C${X(4)} 64 ${X(18)} 73 ${X(33)} 64 C${X(37)} 55 ${X(38)} 43 ${X(34)} 35Z" fill="${C.e2}"/><path d="M${X(31)} 40 C${X(22)} 31 ${X(10)} 34 ${X(10.5)} 46.5 C${X(11)} 58 ${X(20)} 63.5 ${X(29.5)} 58.5 C${X(33)} 52 ${X(34)} 45 ${X(31)} 40Z" fill="${C.pink}"/>`;
  };
  return `<svg width="${s}" height="${s}" viewBox="0 4 120 92">${ear(0)}${ear(1)}
<ellipse cx="60" cy="50" rx="35" ry="32" fill="${C.e1}"/>
<path d="M88.7 31.6 A35 32 0 0 1 70 80.6 Q91 63 88.7 31.6 Z" fill="${sh}"/>
<ellipse cx="42" cy="29" rx="9" ry="4.6" fill="#fff" opacity=".38" transform="rotate(-28 42 29)"/>
<path d="M57 19 C55 11 61 7 66 10.5" stroke="${C.e2}" stroke-width="3.6" stroke-linecap="round" fill="none"/>
<ellipse cx="46" cy="47" rx="5.6" ry="6.6" fill="${C.ink}"/><ellipse cx="74" cy="47" rx="5.6" ry="6.6" fill="${C.ink}"/><circle cx="48.2" cy="44.2" r="2.3" fill="#fff"/><circle cx="76.2" cy="44.2" r="2.3" fill="#fff"/>
<ellipse cx="37.5" cy="60" rx="6.5" ry="4" fill="${C.pink}"/><ellipse cx="82.5" cy="60" rx="6.5" ry="4" fill="${C.pink}"/>
<path d="M60 58 C60 70 58 80 63 86.5 C67 91.5 75 90.5 76 84" stroke="${C.e1}" stroke-width="12.5" stroke-linecap="round" fill="none"/>
<path d="M54.5 68.5 q5.5 2.4 11 0M55 75.5 q5 2.2 10 0" stroke="${C.e2}" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>`;
};

const tree = (x, y, r = 20) => `<g><ellipse cx="${x}" cy="${y + r * 1.55}" rx="${r * .85}" ry="${r * .18}" fill="#1F3159" opacity=".1"/><rect x="${x - r * .14}" y="${y + r * .4}" width="${r * .28}" height="${r * 1.1}" rx="${r * .12}" fill="#B87A45"/><rect x="${x}" y="${y + r * .4}" width="${r * .14}" height="${r * 1.1}" fill="#9C6436"/><circle cx="${x}" cy="${y}" r="${r}" fill="#2FAE62"/><circle cx="${x + r * .5}" cy="${y + r * .28}" r="${r * .6}" fill="#269E57"/><circle cx="${x - r * .5}" cy="${y + r * .22}" r="${r * .62}" fill="#2FAE62"/><circle cx="${x - r * .16}" cy="${y - r * .22}" r="${r * .7}" fill="#45C277"/><ellipse cx="${x - r * .4}" cy="${y - r * .48}" rx="${r * .2}" ry="${r * .12}" fill="#fff" opacity=".35" transform="rotate(-30 ${x - r * .4} ${y - r * .48})"/></g>`;
const cloudFace = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 12 C-42 12 -42 -6 -28 -6 C-26 -20 -6 -22 0 -10 C6 -20 26 -16 24 -2 C36 -2 36 12 26 12 Z" fill="#fff"/><circle cx="-8" cy="2" r="2.4" fill="${C.ink}"/><circle cx="6" cy="2" r="2.4" fill="${C.ink}"/><path d="M-4 6 q3 3 6 0" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="-15" cy="6" rx="3.5" ry="2" fill="${C.pink}"/><ellipse cx="13" cy="6" rx="3.5" ry="2" fill="${C.pink}"/></g>`;
const sunFace = (x, y, r = 24) => {
  let rays = '';
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rays += `<path d="M${(x + Math.cos(a) * (r + 7)).toFixed(1)} ${(y + Math.sin(a) * (r + 7)).toFixed(1)} L${(x + Math.cos(a) * (r + 15)).toFixed(1)} ${(y + Math.sin(a) * (r + 15)).toFixed(1)}" stroke="${C.y}" stroke-width="5" stroke-linecap="round"/>`; }
  return `<g>${rays}<circle cx="${x}" cy="${y}" r="${r}" fill="${C.y}"/><circle cx="${x - 8}" cy="${y - 2}" r="2.8" fill="${C.ink}"/><circle cx="${x + 8}" cy="${y - 2}" r="2.8" fill="${C.ink}"/><path d="M${x - 6} ${y + 6} q6 6 12 0" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" fill="none"/><ellipse cx="${x - 14}" cy="${y + 6}" rx="4" ry="2.4" fill="#FF9E7A"/><ellipse cx="${x + 14}" cy="${y + 6}" rx="4" ry="2.4" fill="#FF9E7A"/></g>`;
};
const duck = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="6" rx="15" ry="9" fill="${C.y}"/><circle cx="9" cy="-6" r="8" fill="${C.y}"/><path d="M15 -6 l8 2 -8 3 z" fill="${C.o}"/><circle cx="11" cy="-8" r="1.8" fill="${C.ink}"/><path d="M-6 4 q6 -6 10 2" stroke="${C.yd}" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>`;
const tuft = (x, y, k = 1) => `<path d="M${x - 7 * k} ${y} q${2 * k} ${-8 * k} ${4 * k} 0 q${3 * k} ${-12 * k} ${6 * k} 0 q${2 * k} ${-8 * k} ${4 * k} 0" stroke="${C.tuft}" stroke-width="${2.6 * k}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
const bloom = (x, y, r = 5, c = '#fff') => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos((a - 90) * Math.PI / 180) * r * .9).toFixed(1)}" cy="${(Math.sin((a - 90) * Math.PI / 180) * r * .9).toFixed(1)}" r="${(r * .6).toFixed(1)}" fill="${c}"/>`).join('')}<circle r="${(r * .42).toFixed(1)}" fill="${C.y}"/></g>`;
const lockIc = (x, y) => `<g transform="translate(${x - 11} ${y - 12})"><path d="M6 10V7a5 5 0 0 1 10 0v3" stroke="#A9B4C2" stroke-width="3.2" fill="none" stroke-linecap="round"/><rect x="2.5" y="9.5" width="17" height="13" rx="4" fill="#A9B4C2"/></g>`;
const hill = (x0, x1, top, base, k = 0.5) => { const m = (x0 + x1) / 2; return `<path d="M${x0} ${base} Q${m} ${top} ${x1} ${base} Z" fill="${C.h1}"/><path d="M${m} ${(top + base) / 2 + (base - top) * 0.02} Q${m + (x1 - m) * k} ${(top + base) / 2} ${x1} ${base} L${m} ${base} Z" fill="${C.h2}"/>`; };

// ───── 主图：小象的山水世界 ─────
// 一整幅可以点的插画：山、水、日、月、云、木这些字就挂在对应的景物上，点景物开始学
// 学过的字是白色小字牌（带橙色对勾），今天要学的「水」是浮在河面上的大黄字牌，还没解锁的是灰色锁牌
const ch = (cx, cy, size, t, c) => `<text x="${cx}" y="${cy + size * .36}" text-anchor="middle" font-family="LXGW WenKai, Kaiti SC, serif" font-weight="500" font-size="${size}" fill="${c}">${t}</text>`;
const done = (x, y) => `<g transform="translate(${x - 11} ${y - 11})"><circle cx="11" cy="11" r="11" fill="${C.o}"/><path d="M6 11.5l3.4 3.4L16 8" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>`;
const tagL = (x, y, t) => `<g transform="translate(${x} ${y})"><rect x="-21" y="-16" width="42" height="42" rx="13" fill="${C.line}"/><rect x="-21" y="-21" width="42" height="42" rx="13" fill="#fff"/>${ch(0, 0, 28, t, C.ink)}<g transform="translate(16 -16)"><circle r="8.5" fill="${C.o}" stroke="#fff" stroke-width="2.5"/><path d="M-3.6 .3l2.4 2.4 4.6-4.8" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></g>`;
const tagX = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-19" y="-14" width="38" height="38" rx="12" fill="${C.lockd}"/><rect x="-19" y="-19" width="38" height="38" rx="12" fill="${C.lock}"/>${lockIc(0, 1)}</g>`;
const tagNow = (x, y, t) => `<g transform="translate(${x} ${y})"><ellipse rx="64" ry="22" cy="22" fill="#fff" opacity=".28"/><ellipse rx="46" ry="15" cy="22" fill="#fff" opacity=".4"/><rect x="-32" y="-26" width="64" height="64" rx="19" fill="${C.yd}"/><rect x="-32" y="-32" width="64" height="64" rx="19" fill="${C.y}"/><rect x="-22" y="-26" width="18" height="5" rx="2.5" fill="#fff" opacity=".5"/>${ch(0, 0, 44, t, C.ink)}</g>`;
// 白天的月亮：一弯淡黄
const moon = (x, y, r) => `<defs><mask id="x08mn" maskUnits="userSpaceOnUse" x="${x - r - 4}" y="${y - r - 4}" width="${2 * r + 8}" height="${2 * r + 8}"><rect x="${x - r - 4}" y="${y - r - 4}" width="${2 * r + 8}" height="${2 * r + 8}" fill="#fff"/><circle cx="${x + r * .5}" cy="${y - r * .38}" r="${r * .84}" fill="#000"/></mask></defs><circle cx="${x}" cy="${y}" r="${r}" fill="#FFF0A8" mask="url(#x08mn)"/>`;
// 圆顶的大山，右半边一层暗面，山尖一顶白雪帽
const mount = (x0, x1, px, py, base, c, cs, cap = true) => `<path d="M${x0} ${base} L${px - 17} ${py + 15} Q${px} ${py - 5} ${px + 17} ${py + 15} L${x1} ${base} Z" fill="${c}"/>
<path d="M${px + 8} ${py + 6} Q${px + 13} ${py + 9} ${px + 17} ${py + 15} L${x1} ${base} L${px + 44} ${base} Q${px + 26} ${(py + base) / 2} ${px + 8} ${py + 6} Z" fill="${cs}"/>
${cap ? `<path d="M${px - 17} ${py + 15} Q${px} ${py - 5} ${px + 17} ${py + 15} L${px + 22} ${py + 21} Q${px + 14} ${py + 28} ${px + 8} ${py + 22} Q${px} ${py + 31} ${px - 8} ${py + 22} Q${px - 15} ${py + 29} ${px - 22} ${py + 21} Z" fill="#fff"/>` : ''}`;
const rock = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cy="23" rx="42" ry="5.5" fill="#1F3159" opacity=".1"/><path d="M-36 20C-40 0-26-18-6-21C14-24 34-10 36 6C38 16 32 22 20 22H-28C-33 22-36 22-36 20Z" fill="#B9C4D1"/><path d="M-6-21C14-24 34-10 36 6C38 16 32 22 20 22H8C22 9 17-8-6-21Z" fill="#A1AEBE"/></g>`;
// 田：一块分成四格的麦田
const field = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-40-20H38L46 22H-48Z" fill="#F4D774"/><path d="M-1-20 -1 22M-44 1H42" stroke="#DDB94B" stroke-width="3.2" stroke-linecap="round"/><path d="M-40-20H38L46 22H-48Z" fill="none" stroke="#DDB94B" stroke-width="3.2" stroke-linejoin="round"/></g>`;
const RIVER = 'M-10 414C70 398 150 434 230 420S340 400 390 408V476C320 468 240 488 160 478S40 468-10 476Z';
const worldSvg = `<svg class="abs" style="left:0;top:172px" width="375" height="518" viewBox="0 0 375 518">
<rect width="375" height="518" fill="${C.sky}"/>
${moon(44, 50, 20)}${cloudFace(182, 42, 1.15)}${sunFace(320, 58, 22)}
${mount(170, 430, 302, 150, 272, '#93DBA8', '#7ECD95', false)}
${mount(-34, 274, 122, 104, 272, C.h1, C.h2)}
<path d="M0 264C70 250 150 272 230 260S340 248 375 256V518H0Z" fill="${C.grass}"/>
<ellipse cx="300" cy="306" rx="74" ry="14" fill="${C.grass2}"/><ellipse cx="70" cy="502" rx="110" ry="20" fill="${C.grass2}"/>
${tree(334, 256, 27)}
${rock(58, 344)}${field(298, 366)}
<path d="${RIVER}" fill="${C.river}"/>
<path d="M32 438h18M262 432h22M118 462h16" stroke="#A8E2FF" stroke-width="4" stroke-linecap="round"/>
${duck(332, 450)}
${tuft(160, 292)}${tuft(22, 398, .9)}${tuft(250, 404)}${tuft(232, 508, .9)}
${bloom(252, 296, 4.5, '#FFB3C2')}${bloom(104, 300, 5)}${bloom(150, 500, 5)}${bloom(352, 496, 4.5, '#FFB3C2')}
${tagL(78, 76, '月')}${tagL(222, 62, '云')}${tagL(290, 94, '日')}${tagL(86, 184, '山')}${tagL(292, 298, '木')}
${tagX(58, 336)}${tagX(298, 360)}
${tagNow(178, 446, '水')}
</svg>`;

const hero = `<div class="scr x08">${statusBar(false)}
<div class="abs" style="left:20px;right:20px;top:56px;height:44px;display:flex;align-items:center;justify-content:space-between">
<div class="wmk">${eleHead(38)}跳跳象</div>
<div class="wk">本周认了<b>12</b>个字</div></div>
<div class="abs" style="left:22px;top:100px;font:400 46px/1.1 var(--hd);letter-spacing:.04em;white-space:nowrap">山水篇</div>
${worldSvg}
<div class="abs" style="left:128px;top:458px">${ele(104, { arms: 'wave' })}</div>
<div class="abs tk b" style="left:24px;right:24px;top:712px;height:62px;font-size:26px">开始认<span class="bt">水</span></div>
${homeBar(false)}</div>`;

// ───── b1：把字卡拖进山水画里，配上对应的景物 ─────
// 画里三个空位：山（已放好）、日（框住太阳）、水（框住河，正在拖过去）
const slot = (x, y, s = 58) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="16" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="3.5" stroke-dasharray="8 7" stroke-linecap="round"/>`;
const placed = (x, y, t, face, bot, s = 58) => `<g><rect x="${x - s / 2}" y="${y - s / 2 + 5}" width="${s}" height="${s}" rx="16" fill="${bot}"/><rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="16" fill="${face}"/>${ch(x, y, 38, t, C.ink)}${done(x + s / 2 - 2, y - s / 2 + 2)}</g>`;
const scene = `<svg width="327" height="372" viewBox="0 0 327 372">
<defs><clipPath id="x08sc"><rect width="327" height="372" rx="28"/></clipPath></defs>
<g clip-path="url(#x08sc)">
<rect width="327" height="372" fill="${C.sky}"/>
${cloudFace(70, 56, .85)}${sunFace(256, 70, 21)}
${hill(-20, 210, 60, 252)}${hill(150, 350, 110, 252, .55)}
<path d="M0 244 C80 234 170 252 240 244 S310 236 327 240 V372 H0 Z" fill="${C.grass}"/>
<path d="M-10 300 C60 284 130 312 200 302 S300 284 340 294 V340 C280 330 200 350 120 340 S30 330 -10 338 Z" fill="${C.river}"/>
<path d="M30 318 h18 M228 312 h20 M120 326 h14" stroke="#A8E2FF" stroke-width="4" stroke-linecap="round"/>
${tree(298, 212, 18)}${tuft(150, 268)}${tuft(40, 262, .9)}${bloom(276, 356, 5)}${bloom(196, 360, 4.5, '#FFB3C2')}
${placed(98, 150, '山', C.y, C.yd)}
${slot(256, 70)}
${slot(200, 318, 62)}
<circle cx="200" cy="318" r="42" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
</g></svg>`;
const zk = (x, y, t, c, d, extra = '') => `<div class="zk" style="left:${x}px;top:${y}px;box-shadow:inset 0 0 0 4px ${c},0 7px 0 ${d};${extra}">${t}</div>`;
const b1 = `<div class="scr x08">${statusBar(false)}
<div class="abs" style="left:20px;right:20px;top:56px;height:46px;display:flex;align-items:center;justify-content:space-between">
<div class="tk w" style="width:46px;height:44px;border-radius:15px"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M12.5 4 6.5 10l6 6" stroke="${C.ink}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
<div class="feet">${[1, 1, 1, 1, 0, 0, 0, 0].map((on) => foot(22, on ? C.o : '#DDE3EA')).join('')}</div></div>
<div class="abs" style="left:24px;top:124px;font:400 30px/1 var(--hd);letter-spacing:.04em">把字放进画里</div>
<div class="abs tk b" style="right:24px;top:114px;width:54px;height:48px;border-radius:16px"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M3 9.5h4l5-4.5v14l-5-4.5H3z" fill="#fff"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg></div>
<div class="abs card" style="left:24px;top:180px;width:327px;height:372px;padding:0;overflow:hidden">${scene}</div>
<div class="abs" style="left:30px;top:402px">${ele(74, { arms: 'wave' })}</div>
<div class="abs" style="left:30px;top:660px;width:92px;height:92px;border-radius:24px;border:3.5px dashed #CDD6E0"></div>
${zk(142, 660, '日', C.y, C.yd)}${zk(254, 660, '木', C.g, C.gd)}
<svg class="abs" style="left:0;top:0;pointer-events:none" width="375" height="812" viewBox="0 0 375 812"><path d="M118 588 C140 562 164 547 190 538" stroke="${C.o}" stroke-width="5" stroke-dasharray="2 11" stroke-linecap="round" fill="none"/><path d="M180.5 532.4 L196 534 L185.5 545.6" stroke="${C.o}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
${zk(54, 584, '水', C.b, C.bd, 'transform:rotate(-9deg);box-shadow:inset 0 0 0 4px ' + C.b + ',0 7px 0 ' + C.bd + ',0 22px 28px -10px rgba(31,49,89,.4)')}
${homeBar(false)}</div>`;

// ───── b2：小象的贴纸册 ─────
const stk = (inner, s = 64, ring = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="32" cy="34" r="30" fill="#1F3159" opacity=".1"/><circle cx="32" cy="32" r="30" fill="${ring}"/><clipPath id="x08k${s}"><circle cx="32" cy="32" r="25"/></clipPath><g clip-path="url(#x08k${s})">${inner}</g></svg>`;
const ST = {
  日: `<rect width="64" height="64" fill="#FFE79A"/>${sunFace(32, 33, 13)}`,
  月: `<rect width="64" height="64" fill="#3B5A99"/><circle cx="30" cy="32" r="14" fill="${C.y}"/><circle cx="37" cy="27" r="12" fill="#3B5A99"/><circle cx="46" cy="44" r="2" fill="#fff"/><circle cx="18" cy="20" r="1.6" fill="#fff"/>`,
  山: `<rect width="64" height="64" fill="${C.sky}"/>${hill(4, 48, 12, 56)}${hill(26, 66, 24, 56)}<rect y="52" width="64" height="12" fill="${C.grass}"/>`,
  水: `<rect width="64" height="64" fill="#DDF4FF"/><path d="M4 26 q7 -8 14 0 t14 0 t14 0 t14 0 t14 0" stroke="${C.b}" stroke-width="5.5" stroke-linecap="round" fill="none"/><path d="M4 38 q7 -8 14 0 t14 0 t14 0 t14 0 t14 0" stroke="${C.river}" stroke-width="5.5" stroke-linecap="round" fill="none"/><path d="M4 50 q7 -8 14 0 t14 0 t14 0 t14 0 t14 0" stroke="${C.b}" stroke-width="5.5" stroke-linecap="round" fill="none"/>`,
  木: `<rect width="64" height="64" fill="#E4F7E2"/>${tree(32, 26, 15)}`,
  云: `<rect width="64" height="64" fill="${C.sky}"/>${cloudFace(32, 32, .78)}`,
};
let confetti = '';
[[40, 128, C.g, 18], [96, 150, C.o, 0], [306, 120, C.b, 30], [338, 186, C.o, -20], [56, 224, C.b, 40], [326, 262, C.g, 0], [28, 300, C.o, 10], [350, 330, C.y, -30], [282, 156, C.y, 60], [74, 352, C.g, 0]].forEach(([x, y, c, r], i) => {
  confetti += i % 3 === 1 ? `<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>` : `<rect x="${x - 8}" y="${y - 4}" width="16" height="8" rx="4" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`;
});
const b2 = `<div class="scr x08" style="background:#DDF3FF">
<svg class="abs" style="left:0;top:0" width="375" height="420" viewBox="0 0 375 420">${confetti}</svg>
${statusBar(false)}
<div class="abs" style="left:20px;right:20px;top:56px;height:46px;display:flex;align-items:center;justify-content:space-between">
<div class="tk w" style="width:46px;height:44px;border-radius:15px"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M12.5 4 6.5 10l6 6" stroke="${C.ink}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
<div style="font:400 28px/1 var(--hd);letter-spacing:.06em">贴纸册</div>
<div class="stat" style="color:${C.bd}">${drop(24)}128</div></div>
<div class="abs" style="left:0;right:0;top:220px;display:flex;justify-content:center">${ele(160, { arms: 'cheer', eyes: 'happy' })}</div>
<div class="abs" style="left:128px;top:104px;transform:rotate(-8deg)">${stk(ST['水'], 120)}</div>
<div class="alb" style="top:412px;height:280px">
<h3>山水篇<b>6<small> / 8</small></b></h3>
<div class="grid">${['日', '月', '山', '水', '木', '云', '', ''].map((t) => (t === '水'
    ? `<div><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#E3F5FF" stroke="${C.b}" stroke-width="3.5" stroke-dasharray="7 6" stroke-linecap="round"/></svg>水</div>`
    : t ? `<div>${stk(ST[t], 64, '#fff')}${t}</div>`
      : `<div class="no"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#F3F6F9" stroke="#D5DDE6" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round"/></svg>？</div>`)).join('')}</div></div>
<div class="abs tk o" style="left:78px;width:219px;top:714px;height:60px;font-size:26px">贴进册子</div>
${homeBar(false)}</div>`;

// ───── 官网（给家长看） ─────
// 样例区里左下、右下会被手机压住，主体放中间；附录放大区框住标题和按钮，字卡放在框外
const tile = (chr, x, y, rot, c, d) => `<div class="abs" style="left:${x}px;top:${y}px;width:104px;height:104px;border-radius:26px;background:#fff;box-shadow:inset 0 0 0 4px ${c},0 8px 0 ${d};transform:rotate(${rot}deg);display:grid;place-items:center;font:500 68px/1 var(--kai);color:${C.ink};padding-bottom:4px">${chr}</div>`;
const web = `<div class="x08 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<svg class="abs" style="left:0;top:0" width="1280" height="800" viewBox="0 0 1280 800">
${cloudFace(250, 230, 1.5)}${sunFace(1090, 210, 34)}${cloudFace(1170, 360, 1)}
${hill(80, 520, 300, 620)}${hill(780, 1200, 320, 620)}
<path d="M0 606 C200 586 420 620 640 610 S1040 580 1280 600 V800 H0 Z" fill="${C.grass}"/>
<ellipse cx="640" cy="770" rx="260" ry="36" fill="${C.grass2}"/>
${tuft(260, 670, 1.6)}${tuft(1010, 720, 1.6)}${tuft(560, 760, 1.4)}${tuft(860, 660, 1.3)}
${bloom(330, 710, 8)}${bloom(940, 770, 7, '#FFB3C2')}${bloom(480, 660, 6, '#FFB3C2')}${bloom(1080, 640, 6)}
${tree(150, 650, 26)}${tree(1150, 660, 30)}${tree(1210, 710, 18)}
</svg>
<div class="abs" style="left:64px;right:64px;top:30px;height:56px;display:flex;align-items:center;justify-content:space-between">
<div class="wmk" style="font-size:32px">${eleHead(46)}跳跳象</div>
<div style="display:flex;align-items:center;gap:44px;font:400 20px/1 var(--hd)"><span>课程</span><span>家长中心</span><span>关于我们</span>
<div class="tk w" style="width:120px;height:50px;font-size:20px;border-radius:16px">登录</div></div></div>
<div class="abs" style="left:0;right:0;top:120px;text-align:center;font:400 74px/1.15 var(--hd);letter-spacing:.04em">跟小象逛 <span class="nu">24</span> 个世界<br>认识 <span class="nu">1200</span> 个字</div>
<div class="abs tk b" style="left:530px;top:322px;width:220px;height:66px;font-size:26px">下载 <span class="nu" style="margin-left:.3em">App</span></div>
${tile('山', 430, 512, -8, C.g, C.gd)}${tile('水', 748, 506, 7, C.b, C.bd)}${tile('日', 884, 640, -5, C.y, C.yd)}
<div class="abs" style="left:545px;top:520px">${ele(190, { arms: 'cheer', eyes: 'happy' })}</div>
</div>`;

// ───── 半山咖啡 ─────
const cupChar = (w) => `<svg width="${w}" height="${Math.round(w * 1.05)}" viewBox="0 0 160 168">
<ellipse cx="78" cy="163" rx="66" ry="5.5" fill="#1F3159" opacity=".12"/>
<ellipse cx="78" cy="157.5" rx="62" ry="10" fill="#D7E3EE"/><ellipse cx="78" cy="153.5" rx="66" ry="11" fill="#fff"/>
<path d="M126 70 C152 70 152 112 122 112" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>
<path d="M131 77 C142 80 142 103 128 105" stroke="#E3ECF5" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M18 52 H138 L128 140 C126 152 118 158 106 158 H50 C38 158 30 152 28 140 Z" fill="#fff"/>
<path d="M114 52 H138 L128 140 C126 152 118 158 106 158 H101 C112 147 117 112 114 52 Z" fill="#E7EFF7"/>
<path d="M24 100 H132 L128 130 H28 Z" fill="${C.o}"/><path d="M115.5 100 H132 L128 130 H113.5 C115.5 120 116 110 115.5 100 Z" fill="${C.od}" opacity=".45"/>
<ellipse cx="78" cy="52" rx="60" ry="15" fill="#fff"/><ellipse cx="78" cy="53" rx="53" ry="11.5" fill="#C98B55"/>
<path d="M78 61.5 C68 57 62.5 53 65.5 49 C68 46 72.5 46.5 78 50.5 C83.5 46.5 88 46 90.5 49 C93.5 53 88 57 78 61.5 Z" fill="#FFF2DD"/>
<circle cx="58" cy="51" r="2.2" fill="${C.y}"/><circle cx="99" cy="55" r="1.8" fill="${C.y}"/><circle cx="94" cy="47" r="1.5" fill="${C.y}"/>
<circle cx="60" cy="80" r="5.4" fill="${C.ink}"/><circle cx="96" cy="80" r="5.4" fill="${C.ink}"/><circle cx="62" cy="78" r="1.9" fill="#fff"/><circle cx="98" cy="78" r="1.9" fill="#fff"/>
<path d="M70 88 q8 8 16 0" stroke="${C.ink}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
<ellipse cx="48" cy="90" rx="7" ry="4.2" fill="${C.pink}"/><ellipse cx="108" cy="90" rx="7" ry="4.2" fill="${C.pink}"/>
<path d="M62 30 q-8 -10 0 -20 M84 30 q-8 -10 0 -20" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
</svg>`;
const flower = (x, y, r = 7, c = C.y) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos(a * Math.PI / 180) * r * .9).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * r * .9).toFixed(1)}" r="${r * .62}" fill="${c}"/>`).join('')}<circle r="${r * .42}" fill="${C.o}"/></g>`;
const tabIc = {
  home: (c) => `<svg width="28" height="28" viewBox="0 0 28 28"><path d="M4 13 14 4l10 9v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" fill="${c}"/><rect x="11" y="17" width="6" height="9" rx="2" fill="#fff"/></svg>`,
  menu: (c) => `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="4" width="20" height="20" rx="6" fill="${c}"/><path d="M9 11h10M9 17h7" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`,
  order: (c) => `<svg width="28" height="28" viewBox="0 0 28 28"><path d="M6 4h16v20l-4-2.5-4 2.5-4-2.5L6 24Z" fill="${c}"/><path d="M10 10h8M10 15h5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`,
  me: (c) => `<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="10" r="6" fill="${c}"/><path d="M3.5 25c1-5.5 5-8.5 10.5-8.5S23.5 19.5 24.5 25Z" fill="${c}"/></svg>`,
};
// 半山咖啡：店的吉祥物是一座笑眯眯的小山（半山），旁边一杯会笑的拿铁；积分用厚厚的立体数字
const cmp = `<div class="scr x08" style="background:${C.sky}">
<svg class="abs" style="left:0;top:0" width="375" height="460" viewBox="0 0 375 460">
${sunFace(320, 150, 24)}${cloudFace(70, 140, .95)}
<path d="M-90 460 Q110 70 310 460 Z" fill="${C.h1}"/><path d="M110 265 Q210 265 310 460 L110 460 Z" fill="${C.h2}"/>
<circle cx="84" cy="300" r="5.5" fill="${C.ink}"/><circle cx="128" cy="300" r="5.5" fill="${C.ink}"/><path d="M95 315 q11 10 22 0" stroke="${C.ink}" stroke-width="3.6" stroke-linecap="round" fill="none"/><ellipse cx="68" cy="316" rx="9" ry="5" fill="${C.pink}"/><ellipse cx="144" cy="316" rx="9" ry="5" fill="${C.pink}"/>
<path d="M150 460 Q290 290 430 460 Z" fill="#45B96F"/>${flower(176, 244, 8)}${flower(40, 380, 6)}${flower(214, 340, 5)}
</svg>
${statusBar(false)}
<div class="abs" style="left:22px;right:22px;top:58px;display:flex;align-items:center;justify-content:space-between">
<div style="font:400 32px/1 var(--hd);letter-spacing:.04em">半山咖啡</div>
<div style="display:flex;align-items:baseline;gap:6px"><span style="font:400 16px/1 var(--hd);color:#4E6588">积分</span><b style="font:700 28px/1 var(--nu);color:#fff;text-shadow:0 3px 0 ${C.bd},2px 0 0 ${C.bd},-2px 0 0 ${C.bd},0 -2px 0 ${C.bd},0 5px 0 ${C.bd}">1,280</b></div></div>
<div class="abs" style="left:176px;top:196px">${cupChar(190)}</div>
<div class="abs" style="left:0;right:0;top:420px;bottom:0;background:${C.paper};border-radius:32px 32px 0 0"></div>
<div class="abs" style="left:24px;top:450px;font:400 18px/1 var(--hd);letter-spacing:.06em;color:${C.od}">今日推荐</div>
<div class="abs" style="left:24px;right:24px;top:482px;display:flex;justify-content:space-between;align-items:baseline"><span style="font:400 40px/1 var(--hd);letter-spacing:.04em">桂花拿铁</span><span style="font:700 34px/1 var(--nu);color:${C.o}"><small style="font-size:22px">¥</small>28</span></div>
<div class="abs" style="left:24px;right:24px;top:546px;display:flex;align-items:center;gap:6px;font:400 16px/1 var(--hd);color:#5B6B86">${pin(20)}东四店 · 到店自取约 <span class="nu" style="font-size:17px">6</span> 分钟</div>
<div class="abs tk b" style="left:24px;right:24px;top:600px;height:62px;font-size:26px">去点单</div>
<div class="tabs"><div class="on">${tabIc.home(C.g)}首页</div><div>${tabIc.menu('#C3CCD8')}菜单</div><div>${tabIc.order('#C3CCD8')}订单</div><div>${tabIc.me('#C3CCD8')}我的</div></div>
${homeBar(false)}</div>`;

module.exports = {
  css,
  screens: { 's08-hero': hero, 's08-b1': b1, 's08-b2': b2, 's08-web': web, 's08-cmp': cmp },
  desktop: ['s08-web'],
  // 附录网页页放大区：两行大标题和下载按钮
  zoom: [220, 92],
  // ①图形：小象头顶 ②颜色：蓝色河面 ③按钮：天蓝厚底按钮右端 ④字体：大标题右侧
  marks: [[226, 466], [52, 616], [352, 744], [190, 126]],
  palette: [['天蓝', C.b], ['草绿', C.g], ['明黄', C.y], ['活力橙', C.o], ['藏青', C.ink]],
  type: { font: '"ZCOOL KuaiLe"', weight: 400, sample: '象 Aa', lines: [['标题', '站酷快乐体'], ['汉字', '霞鹜文楷'], ['数字', 'Fredoka']] },
  stageA: STAGE,
  decoA: '',
  stageB: { bg: STAGE, color: C.ink, url: 'tiaotiaoxiang.com' },
  page: (no) => stylePages(no, 's08-playful', module.exports),
};
