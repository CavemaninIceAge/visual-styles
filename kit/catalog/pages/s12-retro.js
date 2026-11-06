// 12 复古胶片 Retro —— 回声（唱片咖啡店，小程序）
const { img, icon, statusBar, miniNav, homeBar } = require('../lib');
const { stylePages } = require('../page');

const CR = '#F2E6CC';   // 奶油白（纸）
const MU = '#D99A2B';   // 芥末黄
const BR = '#A63F2A';   // 砖红
const TL = '#4F8C84';   // 旧青绿（褪色的青绿：界面里只放在票根、座位这几处；两页舞台铺满它）
const BN = '#3A2618';   // 深棕（墨）
const FM = '#1E1510';   // 胶片底

const uri = (svg) => `url('data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}')`;
// 细颗粒（深色斑点）
const GRAIN = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".92" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .22 0 0 0 0 .14 0 0 0 0 .08 0 0 0 1 -.5"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`);
// 旧纸的大块斑驳
// 斑驳的图块做得比屏幕大，免得 420 一格重复时出现横向接缝
const MOTTLE = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="1300"><filter id="m"><feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .58 0 0 0 0 .4 0 0 0 0 .2 0 0 0 .55 -.2"/></filter><rect width="100%" height="100%" filter="url(#m)"/></svg>`);
// 照片上的亮斑灰尘
const DUST = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="d"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="1" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .95 0 0 0 0 .85 0 0 0 1.6 -.62"/></filter><rect width="100%" height="100%" filter="url(#d)"/></svg>`);
const PAPER = `${GRAIN},${MOTTLE},radial-gradient(130% 100% at 50% 30%,transparent 55%,rgba(140,90,40,.18)),${CR}`;

// 品牌记号：七十年代彩虹拱
const arch = (w, cols = [MU, BR, TL]) => {
  const n = cols.length, sw = 40 / (2 * n + 1);
  return `<svg width="${w}" height="${w / 2}" viewBox="0 0 40 20" style="display:block">${cols.map((c, i) => { const r = 20 - sw * (i + .5) - i * 0; return `<path d="M${20 - r} 20A${r} ${r} 0 0 1 ${20 + r} 20" fill="none" stroke="${c}" stroke-width="${sw}"/>`; }).join('')}</svg>`;
};
const wm = (s = 26, c = BN) => `<span class="wm" style="color:${c}">${arch(Math.round(s * 1.25))}<b style="font-size:${s}px">回声</b></span>`;

// 照片：褪色 + 漏光 + 颗粒
const photo = (name, pos = 'center', leak = 'tr', size = 'cover') => `<div class="pf"><i class="im" style="background-image:url(${img(name)});background-position:${pos};background-size:${size}"></i><i class="wa"></i><i class="fd"></i><i class="lk ${leak}"></i><i class="gr"></i></div>`;

// 胶卷：齿孔 + 一到两格照片
let uid = 0;
function film(w, h, frames, { edge = 'SAFETY 400', no = 22 } = {}) {
  const id = 'x12f' + (++uid);
  const holes = `<svg width="${w}" height="20" style="display:block"><defs><pattern id="${id}" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="5" y="4" width="10" height="12" rx="2.4" fill="${CR}"/></pattern></defs><rect width="${w}" height="20" fill="url(#${id})"/></svg>`;
  const fh = h - 56;
  let x = 12;
  const fr = frames.map(([name, fw, pos, leak, size], i) => { const s = `<div class="fr" style="left:${x}px;top:28px;width:${fw}px;height:${fh}px">${name ? photo(name, pos, leak, size) : `<i class="burn"></i>`}</div><span class="eg" style="left:${x + 6}px;top:${h - 27}px">${i === 0 ? edge : ''}&nbsp;&nbsp;▸ ${no + i}&nbsp;&nbsp;&nbsp;${no + i}A</span>`; x += fw + 12; return s; }).join('');
  return `<div class="fs" style="width:${w}px;height:${h}px"><div style="position:absolute;left:0;top:4px">${holes}</div>${fr}<div style="position:absolute;left:0;bottom:4px">${holes}</div></div>`;
}

// 黑胶唱片
const vinyl = (d, label = MU) => `<div class="vy" style="width:${d}px;height:${d}px"><i class="lb" style="background:${label}"><i class="lr"></i><span class="la">${arch(Math.round(d * .12), [BN, BR, BN])}</span><i class="ho"></i></i></div>`;
// 唱臂
const tonearm = (s = 1) => `<svg width="${80 * s}" height="${190 * s}" viewBox="0 0 80 190" style="display:block;overflow:visible"><circle cx="52" cy="22" r="17" fill="#E9DCC0" stroke="${BN}" stroke-width="3"/><circle cx="52" cy="22" r="6" fill="${BN}"/><path d="M52 22L58 104L38 156" fill="none" stroke="#E9DCC0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 22L58 104L38 156" fill="none" stroke="${BN}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".3"/><rect x="25" y="150" width="24" height="15" rx="3" transform="rotate(22 37 157)" fill="${BN}"/></svg>`;
// 邮戳
// wavy = false 时只有圆戳，不带右边的波浪线
function postmark(w = 150, date = '2026.10.31', top = '回声唱片咖啡', bot = '北京 · 东四', c = BR, wavy = true) {
  const id = 'x12p' + (++uid);
  const waves = wavy ? [32, 46, 60, 74].map((y) => `<path d="M106 ${y}q9-7 18 0t18 0t18 0t18 0t18 0" fill="none" stroke="${c}" stroke-width="3"/>`).join('') : '';
  const vw = wavy ? 220 : 110;
  return `<svg width="${w}" height="${w * 110 / vw}" viewBox="0 0 ${vw} 110" style="display:block;overflow:visible"><defs>
<filter id="${id}i"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="${uid}" result="n"/><feColorMatrix in="n" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.7 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
<path id="${id}a" d="M17 55A38 38 0 0 1 93 55"/><path id="${id}b" d="M15 55A40 40 0 0 0 95 55"/></defs>
<g filter="url(#${id}i)" fill="${c}"><circle cx="55" cy="55" r="48" fill="none" stroke="${c}" stroke-width="3.2"/><circle cx="55" cy="55" r="31" fill="none" stroke="${c}" stroke-width="2"/>
<text font-family="Noto Serif SC" font-weight="700" font-size="11" letter-spacing="2"><textPath href="#${id}a" startOffset="50%" text-anchor="middle">${top}</textPath></text>
<text font-family="Noto Serif SC" font-weight="700" font-size="10" letter-spacing="2"><textPath href="#${id}b" startOffset="50%" text-anchor="middle" side="left">${bot}</textPath></text>
<text x="55" y="59" text-anchor="middle" font-family="Courier Prime" font-weight="700" font-size="11.5">${date}</text>${waves}</g></svg>`;
}

// 票根：凹角 + 打孔缺口
const tkMask = (w, h, px, r = 10, q = 11) => uri(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><path d="M${r} 0H${px - q}A${q} ${q} 0 0 0 ${px + q} 0H${w - r}A${r} ${r} 0 0 0 ${w} ${r}V${h - r}A${r} ${r} 0 0 0 ${w - r} ${h}H${px + q}A${q} ${q} 0 0 0 ${px - q} ${h}H${r}A${r} ${r} 0 0 0 0 ${h - r}V${r}A${r} ${r} 0 0 0 ${r} 0Z"/></svg>`);
const ticket = (w, h, px, bg, main, stub, sbg = TL, sc = CR) => { const m = tkMask(w, h, px); return `<div class="tk" style="width:${w}px;height:${h}px;background:${GRAIN},${bg};-webkit-mask-image:${m};mask-image:${m}"><div class="tm" style="width:${px}px">${main}</div><div class="ts" style="left:${px}px;background:${GRAIN},${sbg};color:${sc}">${stub}</div></div>`; };

const TABS = [['house', '首页'], ['disc-3', '唱片'], ['ticket', '聆听会'], ['user', '我的']];
const tabs = (on, items = TABS) => `<div class="tb">${items.map(([ic, t], i) => `<div class="${i === on ? 'on' : ''}">${icon(ic, 22, 1.7)}<span>${t}</span></div>`).join('')}</div>`;

const css = `
.x12{background:${PAPER};color:${BN};font-family:"Noto Serif SC","Songti SC",serif;-webkit-font-smoothing:antialiased}
.x12 .ab{position:absolute}
.x12 .fr9{font-family:Fraunces;font-weight:900;font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144;line-height:1;letter-spacing:-.01em}
.x12 .fri{font-family:Fraunces;font-style:italic;font-weight:600;font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 72}
.x12 .tw{font-family:"Courier Prime","Noto Serif SC",serif;font-weight:700;letter-spacing:.02em}
.x12 .sr9{font-family:"Noto Serif SC";font-weight:900;line-height:1.15}
.x12 .of{text-shadow:.045em .045em 0 ${CR},.09em .09em 0 ${MU}}
.x12 .of2{text-shadow:.04em .04em 0 ${CR},.08em .08em 0 ${BR}}
.x12 .wm{display:inline-flex;align-items:flex-end;gap:8px}
.x12 .wm svg{margin-bottom:.12em}
.x12 .wm b{font-family:"Noto Serif SC";font-weight:900;line-height:1;letter-spacing:.06em;text-shadow:.05em .05em 0 ${CR},.1em .1em 0 ${MU}}
/* 照片 */
.x12 .pf{position:absolute;inset:0;overflow:hidden}
.x12 .pf i{position:absolute;inset:0}
.x12 .pf .im{background-size:cover;filter:sepia(.22) saturate(.95) contrast(.94) brightness(1.05)}
.x12 .pf .wa{background:rgba(255,176,96,.42);mix-blend-mode:soft-light}
.x12 .pf .fd{background:#46301F;mix-blend-mode:lighten;opacity:.8}
.x12 .pf .lk{mix-blend-mode:screen}
.x12 .pf .lk.tl{background:radial-gradient(75% 95% at -6% -6%,rgba(255,150,60,1),rgba(255,92,24,.85) 30%,rgba(230,60,20,.35) 55%,transparent 80%)}
.x12 .pf .lk.tr{background:radial-gradient(70% 95% at 106% -6%,rgba(255,150,60,1),rgba(255,92,24,.85) 30%,rgba(230,60,20,.35) 55%,transparent 80%)}
.x12 .pf .lk.l{background:linear-gradient(90deg,rgba(255,120,40,1),rgba(255,90,30,.7) 14%,rgba(255,140,50,.25) 32%,transparent 50%)}
.x12 .pf .lk.r{background:linear-gradient(270deg,rgba(255,120,40,1),rgba(255,90,30,.7) 14%,rgba(255,140,50,.25) 32%,transparent 50%)}
.x12 .pf .lk.bl{background:radial-gradient(70% 85% at -6% 106%,rgba(255,140,50,1),rgba(255,90,24,.8) 30%,rgba(230,60,20,.3) 55%,transparent 78%)}
.x12 .pf .gr{background:${DUST},${GRAIN};opacity:.42}
/* 胶卷 */
.x12 .fs{position:relative;background:${FM};box-shadow:0 10px 24px -12px rgba(40,20,10,.5)}
.x12 .fs .fr{position:absolute;border-radius:3px;overflow:hidden}
/* 唱片封套：方形照片，压在唱片后面 */
.x12 .slv{position:absolute;overflow:hidden;border-radius:2px;box-shadow:0 12px 24px -10px rgba(40,20,10,.6),inset 0 0 0 1px rgba(58,38,24,.25)}
.x12 .burn{position:absolute;inset:0;background:${GRAIN},radial-gradient(90% 70% at 0% 40%,#FFC274,#E8742A 45%,#9A3A16 80%,#5A2210)}
.x12 .fs .eg{position:absolute;font:700 8.5px/1 "Courier Prime",monospace;color:#E0892F;letter-spacing:.12em;white-space:nowrap}
/* 唱片 */
.x12 .vy{position:relative;border-radius:50%;background:conic-gradient(from 30deg,rgba(255,240,210,0) 0deg,rgba(255,240,210,.16) 28deg,rgba(255,240,210,0) 62deg,rgba(255,240,210,0) 180deg,rgba(255,240,210,.12) 208deg,rgba(255,240,210,0) 242deg),repeating-radial-gradient(circle,#1D1612 0 1.1px,#2B231D 1.1px 2.4px);box-shadow:inset 0 0 0 3px #140F0B,0 14px 26px -12px rgba(40,20,10,.6)}
.x12 .vy .lb{position:absolute;left:32%;top:32%;width:36%;height:36%;border-radius:50%;display:grid;place-items:center}
.x12 .vy .lr{position:absolute;inset:14%;border-radius:50%;border:2px solid rgba(58,38,24,.55)}
.x12 .vy .la{position:relative;margin-top:-26%}
.x12 .vy .ho{position:absolute;left:50%;top:50%;width:8%;height:8%;margin:-4% 0 0 -4%;border-radius:50%;background:${CR}}
/* 票根 */
.x12 .tk{position:relative}
.x12 .tm{position:absolute;left:0;top:0;bottom:0;padding:18px 18px 0 20px}
.x12 .ts{position:absolute;right:0;top:0;bottom:0;border-left:2px dashed rgba(242,230,204,.7);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
/* 标签栏 */
.x12 .tb{position:absolute;left:0;right:0;bottom:0;height:84px;display:flex;justify-content:space-around;padding:10px 12px 0;border-top:1.5px solid rgba(58,38,24,.75);box-shadow:inset 0 3px 0 ${CR},inset 0 4.5px 0 rgba(58,38,24,.75);background:${PAPER}}
.x12 .tb div{display:flex;flex-direction:column;align-items:center;gap:3px;width:64px;font-size:11px;font-weight:600;color:rgba(58,38,24,.62)}
.x12 .tb .on{color:${BR}}

/* b1 订座 */
.x12 .seat{position:absolute;width:38px;height:34px;margin:-17px 0 0 -19px}
.x12 .seat svg{display:block}
.x12 .spk{position:absolute;width:40px;height:58px;border-radius:5px;background:${BN};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;box-shadow:0 8px 16px -8px rgba(40,20,10,.6)}
.x12 .spk i{display:block;border-radius:50%;border:2px solid #C9A877;background:radial-gradient(circle,#5A3E28 0 30%,#2A1C12 32%)}
/* b2 菜单 */
.x12 .mrow{display:flex;align-items:baseline;gap:8px;height:58px;border-bottom:1px dashed rgba(58,38,24,.4);padding-top:18px}
.x12 .mrow .n{font-size:17px;font-weight:600}
.x12 .mrow .lead{flex:1}
.x12 .mrow .p{font-family:"Courier Prime";font-weight:700;font-size:17px}
.x12 .add{width:26px;height:26px;border-radius:50%;border:1.6px solid ${BN};display:grid;place-items:center;align-self:center;margin-left:6px}
.x12 .pol{position:absolute;background:#FBF4E4;padding:9px 9px 34px;box-shadow:0 10px 22px -10px rgba(40,20,10,.55)}
.x12 .tape{position:absolute;width:74px;height:22px;background:rgba(236,220,180,.75);box-shadow:0 1px 2px rgba(0,0,0,.08)}
/* 网页 */
.x12 .wnav{position:absolute;left:56px;right:56px;top:30px;height:60px;display:flex;align-items:center}
.x12 .wnav nav{display:flex;gap:44px;margin-left:auto;margin-right:40px;font-size:18px;font-weight:600}
`;

// ---------- 主图：首页（主角 = 正在转的唱片 + 唱臂，封套照片压在后面；下面一张票根） ----------
const heroTicket = ticket(327, 132, 232, MU,
  `<div style="display:flex;align-items:baseline;gap:10px"><span class="sr9" style="font-size:28px">聆听会</span><span class="fr9" style="font-size:21px;color:${BR}">No.44</span></div>
<div class="tw" style="font-size:14px;margin-top:14px">10.31 SAT 20:00</div><div style="font-size:15px;font-weight:600;margin-top:8px;margin-left:-.5em">《夏夜晚风》全碟</div>`,
  `<span class="fr9" style="font-size:32px"><small style="font-size:17px">¥</small>88</span><span class="sr9" style="font-size:16px;display:flex;align-items:center;gap:2px">订座${icon('arrow-right', 15, 2.4)}</span>`);
const hero = `<div class="scr x12">
${statusBar()}${miniNav({ left: wm(26) })}
<div class="slv" style="left:22px;top:116px;width:196px;height:196px;transform:rotate(-5deg)">${photo('moon-pink-clouds', '50% 34%', 'tl')}</div>
<i class="ab" style="left:86px;top:148px;width:284px;height:284px;border-radius:50%;background:radial-gradient(circle,#B9A27A 0 69%,#D9C7A1 71%,#CDB891 100%);box-shadow:inset 0 0 0 1.5px rgba(58,38,24,.45),0 16px 30px -14px rgba(40,20,10,.65)"></i>
<div class="ab" style="left:93px;top:155px">${vinyl(270)}</div>
<div class="ab" style="left:279px;top:122px">${tonearm(1.2)}</div>
<div class="ab" style="left:24px;top:446px"><div class="tw" style="font-size:12px;letter-spacing:.2em;color:${BR}">本周在转</div><div class="sr9 of" style="font-size:36px;margin-top:8px">夏夜晚风</div><div style="display:flex;align-items:baseline;gap:8px;margin-top:10px"><span class="sr9" style="font-size:17px">程川</span><span class="fr9" style="font-size:32px;color:${BR}">1979</span></div></div>
<div class="ab" style="left:24px;top:572px">${heroTicket}</div>
<div class="ab" style="left:212px;top:532px;transform:rotate(-12deg);mix-blend-mode:multiply;opacity:.9">${postmark(86, '2026.10.31', '回声唱片咖啡', '北京 · 东四', BR, false)}</div>
${tabs(0)}${homeBar()}</div>`;

// ---------- b1：聆听会订座（唱机和两只音箱在前，三排实心座位微微弯向唱机；可选青绿、已选砖红、已订只留浅影） ----------
const SEAT = { a: TL, s: BR, t: '#D6C8AC' };
const chair = (st, w = 38, rot = 0) => `<svg width="${w}" height="${(w * 34 / 38).toFixed(1)}" viewBox="0 0 38 34" style="display:block;transform:rotate(${rot.toFixed(1)}deg)"><g fill="${SEAT[st]}"><rect x="6" y="0" width="26" height="21" rx="7"/><rect x="0" y="8" width="9" height="26" rx="4.5"/><rect x="29" y="8" width="9" height="26" rx="4.5"/><rect x="5" y="19" width="28" height="15" rx="5"/></g>${st === 't' ? '' : `<rect x="10" y="18" width="18" height="2.6" rx="1.3" fill="${CR}" opacity=".6"/>`}</svg>`;
const SC = 188, SG = 48, SK = 2.2;   // 中心、座距、弯度
const seatRow = (y0, taken = [], sel = []) => Array.from({ length: 6 }, (_, i) => { const u = i - 2.5, x = SC + u * SG, y = y0 - SK * u * u, rot = Math.atan(-2 * SK * u / SG) * 180 / Math.PI; const st = taken.includes(i) ? 't' : sel.includes(i) ? 's' : 'a'; return `<i class="seat" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px">${chair(st, 38, rot)}</i>`; }).join('');
const rowLabel = (y0, t) => `<span class="ab tw" style="left:22px;top:${(y0 - SK * 6.25 - 9).toFixed(0)}px;font-size:16px;color:${BR}">${t}</span>`;
const b1Ticket = ticket(343, 108, 228, MU,
  `<div class="tw" style="font-size:13px;letter-spacing:.12em;color:${BR}">B3 · B4</div><div class="sr9" style="font-size:24px;margin-top:10px">已选 2 座</div>`,
  `<span class="fr9" style="font-size:28px"><small style="font-size:16px">¥</small>176</span><span class="sr9" style="font-size:15px;display:flex;align-items:center;gap:2px">确认${icon('arrow-right', 14, 2.4)}</span>`);
const legend = (st, t) => `<span style="display:flex;align-items:center;gap:7px">${chair(st, 20)}${t}</span>`;
const b1 = `<div class="scr x12">
${statusBar()}${miniNav({ title: '聆听会', left: icon('chevron-left', 26, 2) })}
<div class="ab" style="left:24px;top:108px;right:24px"><div class="fr9" style="font-size:84px;color:${BR}">No.44</div>
<div class="sr9 of" style="font-size:26px;margin-top:12px;margin-left:-.5em">《夏夜晚风》全碟</div>
<div class="tw" style="font-size:14px;margin-top:10px">10.31 SAT 20:00—22:00</div></div>
<div class="spk" style="left:92px;top:291px"><i style="width:14px;height:14px"></i><i style="width:24px;height:24px"></i></div>
<div class="ab" style="left:150px;top:282px">${vinyl(76)}</div>
<div class="spk" style="left:244px;top:291px"><i style="width:14px;height:14px"></i><i style="width:24px;height:24px"></i></div>
${seatRow(410, [2, 3])}${seatRow(462, [0], [2, 3])}${seatRow(514, [4, 5])}
${rowLabel(410, 'A')}${rowLabel(462, 'B')}${rowLabel(514, 'C')}
<div class="ab" style="left:0;right:0;top:556px;display:flex;justify-content:center;gap:30px;font-size:14px;font-weight:600">${legend('a', '可选')}${legend('s', '已选')}${legend('t', '已订')}</div>
<div class="ab" style="left:16px;top:626px">${b1Ticket}</div>
${homeBar()}</div>`;

// ---------- b2：咖啡菜单 ----------
const mrow = (no, n, p, on = false) => `<div class="mrow"><span class="tw" style="font-size:13px;opacity:.6">${no}</span><span class="n">${n}</span><span class="lead"></span><span class="p">${p}</span><span class="add" style="${on ? `background:${BN};color:${CR}` : ''}">${icon(on ? 'check' : 'plus', 15, 2.4)}</span></div>`;
const b2Ticket = ticket(343, 76, 236, BN, `<div style="display:flex;align-items:baseline;gap:12px;color:${CR};padding-top:6px"><span class="sr9" style="font-size:20px">2 杯</span><span class="fr9" style="font-size:26px;color:${MU}"><small style="font-size:15px">¥</small>64</span></div>`, `<span class="sr9" style="font-size:17px">去结算</span>`, MU, BN);
const b2 = `<div class="scr x12">
${statusBar()}${miniNav({ left: wm(26) })}
<div class="pol" style="left:196px;top:104px;width:156px;transform:rotate(5deg)"><div style="position:relative;width:138px;height:150px">${photo('iced-coffee', '50% 40%', 'tr')}</div></div>
<div class="tape" style="left:236px;top:96px;transform:rotate(-4deg)"></div>
<div class="ab" style="left:24px;top:132px"><div class="fri" style="font-size:54px;font-weight:900;color:${BR};line-height:1">Coffee</div><div class="sr9 of" style="font-size:30px;margin-top:10px">咖啡</div></div>
<div class="ab" style="left:24px;right:24px;top:310px;border-top:1.5px solid ${BN};box-shadow:0 -4px 0 -2.5px ${BN}">
${mrow('01', '美式', '22')}${mrow('02', '拿铁', '28', true)}${mrow('03', '夏夜特调', '36', true)}${mrow('04', '手冲 · 耶加雪菲', '38')}${mrow('05', '黑糖燕麦拿铁', '32')}${mrow('06', '冷萃 · 云南保山', '30')}</div>
<div class="ab" style="left:16px;top:712px">${b2Ticket}</div>
${homeBar()}</div>`;

// ---------- 网页 ----------
const bigArch = (w, cols) => { const n = cols.length, bw = w / 2 / (n + 1.4); return `<svg width="${w}" height="${w / 2}" viewBox="0 0 ${w} ${w / 2}" style="display:block">${cols.map((c, i) => { const r = w / 2 - bw * (i + .5); return `<path d="M${w / 2 - r} ${w / 2}A${r} ${r} 0 0 1 ${w / 2 + r} ${w / 2}" fill="none" stroke="${c}" stroke-width="${bw + .5}"/>`; }).join('')}</svg>`; };
const webTicket = ticket(330, 120, 236, MU,
  `<div style="display:flex;align-items:baseline;gap:10px"><span class="sr9" style="font-size:26px">聆听会</span><span class="fr9" style="font-size:20px;color:${BR}">No.44</span></div><div class="tw" style="font-size:15px;margin-top:12px">10.31 SAT 20:00</div>`,
  `<span class="fr9" style="font-size:28px"><small style="font-size:16px">¥</small>88</span><span class="sr9" style="font-size:16px">订座</span>`);
const web = `<div class="x12 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<div class="ab" style="left:160px;top:320px">${bigArch(960, [MU, BR, TL])}</div>
<div class="ab" style="left:440px;top:384px">${vinyl(400)}</div>
<div class="wnav">${wm(40)}<nav><span>唱片</span><span>咖啡</span><span>聆听会</span><span>到店</span></nav><span class="tw" style="font-size:15px">东四北大街 107 号</span></div>
<div class="ab" style="left:0;right:0;top:118px;text-align:center"><div class="sr9 of" style="font-size:96px;letter-spacing:.04em">回声唱片咖啡</div><div class="fri" style="font-size:30px;margin-top:14px;color:${BR}">Records &amp; Coffee · 10:00—23:00</div></div>
<div class="ab" style="left:296px;top:586px;transform:rotate(-5deg)">${film(300, 150, [['turntable-bw', 128, 'center', 'l'], ['vinyl-hand-lavender', 128, '50% 40%', 'tr']], { no: 8 })}</div>
<div class="ab" style="left:672px;top:606px;transform:rotate(4deg)">${webTicket}</div>
<div class="ab" style="left:852px;top:578px;transform:rotate(-10deg);mix-blend-mode:multiply;opacity:.85">${postmark(140)}</div>
</div>`;

// ---------- 半山咖啡 ----------
const cmpBtn = ticket(327, 64, 250, MU, `<div class="sr9" style="font-size:22px;padding-top:2px">去点单</div>`, `${icon('arrow-right', 24, 2.4)}`);
const cmp = `<div class="scr x12">
${statusBar()}
<div class="ab" style="left:24px;top:60px;display:flex;align-items:baseline;gap:10px"><span class="sr9" style="font-size:28px">半山咖啡</span><span class="fri" style="font-size:18px;color:${BR}">Banshan</span></div>
<div class="ab" style="right:24px;top:56px;text-align:right"><div class="tw" style="font-size:11px;letter-spacing:.12em;opacity:.7">会员积分</div><div class="fr9" style="font-size:28px;margin-top:3px">1,280</div></div>
<div class="ab" style="left:-8px;top:112px;transform:rotate(-2deg)">${film(392, 292, [['latte-plants', 300, '50% 76%', 'tr', '128% auto'], [null, 200]], { no: 6 })}</div>
<div class="ab" style="left:24px;top:438px"><div class="tw" style="font-size:12px;letter-spacing:.2em;color:${BR}">今日推荐</div><div style="display:flex;align-items:baseline;justify-content:space-between;width:327px;margin-top:8px"><span class="sr9 of" style="font-size:46px">桂花拿铁</span><span class="fr9" style="font-size:44px;color:${BR}"><small style="font-size:22px">¥</small>28</span></div>
<div style="font-size:15px;font-weight:600;margin-top:14px">东四店 · 到店自取约 6 分钟</div></div>
<div class="ab" style="left:24px;top:604px">${cmpBtn}</div>
${tabs(0, [['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user', '我的']])}${homeBar()}</div>`;

// 角上的四分之一彩虹弧（圆心在右上角）
const cornerArch = (R, cols) => { const sw = R / (cols.length + 1.6); return `<svg width="${R}" height="${R}" viewBox="0 0 ${R} ${R}" style="display:block">${cols.map((c, i) => { const r = R - sw * (i + .5); return `<path d="M${R - r} 0A${r} ${r} 0 0 0 ${R} ${r}" fill="none" stroke="${c}" stroke-width="${sw + .5}"/>`; }).join('')}</svg>`; };
// 舞台：旧青绿底 + 芥末黄、砖红、奶油白的七十年代彩虹弧
const decoA = `<div style="position:absolute;left:50%;bottom:-6px;transform:translateX(-50%)">${bigArch(760, [MU, BR, CR])}</div><div style="position:absolute;inset:0;background:${GRAIN};opacity:.9"></div>`;

module.exports = {
  css,
  screens: { 's12-hero': hero, 's12-b1': b1, 's12-b2': b2, 's12-web': web, 's12-cmp': cmp },
  desktop: ['s12-web'],
  marks: [[356, 700], [30, 236], [204, 486], [318, 548]],
  // 附录放大区：居中的「回声唱片咖啡」大标题和英文一行，下面露出彩虹拱和唱片上半
  zoom: [220, 100],
  palette: [['奶油白', CR], ['芥末黄', MU], ['砖红', BR], ['旧青绿', TL], ['深棕', BN]],
  type: { font: 'Fraunces,"Noto Serif SC"', weight: 900, style: 'font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144;', sample: '声 Aa', lines: [['标题', 'Fraunces 软黑'], ['中文', '思源宋体 粗'], ['打字机', 'Courier Prime']] },
  stageA: `${GRAIN},${TL}`,
  decoA,
  // 参考页和风格页同一个舞台：旧青绿底 + 七十年代彩虹拱
  stageB: { bg: `${GRAIN},${TL}`, color: CR, url: 'huishengrecords.cn', deco: `<div style="position:absolute;right:0;top:0">${cornerArch(300, [MU, BR, CR])}</div><div style="position:absolute;inset:0;background:${GRAIN};opacity:.9"></div>` },
  page: (no) => stylePages(no, 's12-retro', module.exports),
};
