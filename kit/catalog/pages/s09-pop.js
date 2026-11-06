// 09 撞色波普 Bold Pop —— 啵啵 BOBO（气泡果茶，小程序）
const { img, icon, statusBar, miniNav, homeBar } = require('../lib');
const { stylePages } = require('../page');

const P = '#5A2DF4';   // 电光紫
const Y = '#FFEE38';   // 荧光黄
const R = '#FF5233';   // 番茄红
const PK = '#FFB3C1';  // 蜜桃粉
const K = '#17121F';   // 墨黑

let uid = 0;
// 杯子：平面插画 + 白色模切贴纸边
const DRINKS = {
  peach: { top: '#FFB3C4', bot: '#FF7F9D', fruit: ['#FFD9B0', '#FF7B6B'], straw: R },
  lemon: { top: '#FFF7B0', bot: '#FFE03D', fruit: ['#FFF6C9', '#F2C600'], straw: P },
  grape: { top: '#C7B5FF', bot: '#8A63FF', fruit: ['#E2D6FF', '#5A2DF4'], straw: Y },
};
function cup(w = 180, kind = 'peach', rot = 0, edge = 7, logo = false, simple = false) {
  const d = DRINKS[kind], id = 'x09c' + (++uid);
  const h = Math.round(w * 444 / 224);
  const body = 'M20 132H180L160 404Q159 414 149 414H51Q41 414 40 404Z';
  const slice = (x, y, a, s = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M-24 0A24 24 0 0 0 24 0Z" fill="${d.fruit[0]}"/><path d="M-24 0A24 24 0 0 0 24 0" fill="none" stroke="${d.fruit[1]}" stroke-width="5"/></g>`;
  const bub = simple ? [[62, 210, 10], [140, 300, 9], [80, 360, 12], [146, 196, 6]] : [[62, 206, 8], [138, 186, 5], [104, 232, 4], [70, 318, 11], [142, 300, 7], [112, 362, 5], [58, 386, 4], [150, 356, 4], [96, 286, 3]];
  return `<svg width="${w}" height="${h}" viewBox="-12 -12 224 444" style="display:block;overflow:visible;transform:rotate(${rot}deg)">
<defs><clipPath id="${id}b"><path d="${body}"/></clipPath>
<filter id="${id}s" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="${edge}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#${id}s)">
<path d="M26 126C26 66 174 66 174 126Z" fill="#F4EFFF"/>
<path d="M113 4L135 0L124 92H102Z" fill="${d.straw}"/>
<path d="${body}" fill="#FBF7FF"/>
<g clip-path="url(#${id}b)">
<path d="M0 166Q25 154 50 166T100 166T150 166T200 166V420H0Z" fill="${d.top}"/>
<path d="M0 276Q25 262 50 276T100 276T150 276T200 276V420H0Z" fill="${d.bot}"/>
${simple ? `${slice(84, 240, -18, 1.25)}${slice(118, 352, 14, 1.15)}` : `${slice(70, 228, -18)}${slice(132, 252, 24, .85)}${slice(96, 352, 8, .9)}`}
${bub.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('')}
<path d="M36 150L48 150L40 380L30 380Z" fill="#fff" opacity=".6"/>
</g>${logo ? `<g transform="translate(108 318) rotate(-8)"><circle r="34" fill="${Y}"/><text x="-3" y="10" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="34" fill="${P}">b</text><circle cx="13" cy="2" r="7.5" fill="${P}"/><circle cx="11" cy="0" r="2" fill="${Y}"/></g>` : ''}
<rect x="12" y="120" width="176" height="16" rx="8" fill="#fff"/>
</g></svg>`;
}

// 桂花拿铁：玻璃杯里三层（奶泡、奶咖、浓缩），奶泡上拉花和三朵桂花，外面一圈白色模切贴纸边
const OSM = '#FF9A1F';   // 桂花橙（只在这杯拿铁上）
function latte(w = 220, rot = 0, edge = 8) {
  const id = 'x09l' + (++uid);
  const h = Math.round(w * 290 / 250);
  const body = 'M30 74H170L160 232Q158 250 140 250H60Q42 250 40 232Z';
  const flower = (x, y, s, a) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">${[0, 90, 180, 270].map((d) => `<ellipse cx="0" cy="-5.2" rx="3.6" ry="5.2" transform="rotate(${d})" fill="${OSM}"/>`).join('')}<circle r="2.2" fill="#FFD24A"/></g>`;
  return `<svg width="${w}" height="${h}" viewBox="-16 -16 250 290" style="display:block;overflow:visible;transform:rotate(${rot}deg)">
<defs><clipPath id="${id}b"><path d="${body}"/></clipPath>
<filter id="${id}s" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="${edge}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#${id}s)">
<path d="M166 104C214 98 222 192 158 196" fill="none" stroke="#E6DDFF" stroke-width="20" stroke-linecap="round"/>
<path d="${body}" fill="#FBF7FF"/>
<g clip-path="url(#${id}b)">
<path d="M0 84H200V260H0Z" fill="#FFF1D6"/>
<path d="M0 116Q25 106 50 116T100 116T150 116T200 116V260H0Z" fill="#EDB57C"/>
<path d="M0 182Q25 170 50 182T100 182T150 182T200 182V260H0Z" fill="#8B4A22"/>
<path d="M42 92L54 92L52 236L46 236Z" fill="#fff" opacity=".55"/>
</g>
<ellipse cx="100" cy="74" rx="72" ry="17" fill="#FFF6E6"/>
<path d="M100 88C86 80 82 72 88 67C93 63 99 66 100 70C101 66 107 63 112 67C118 72 114 80 100 88Z" fill="#D9955A"/>
<ellipse cx="100" cy="74" rx="72" ry="17" fill="none" stroke="#fff" stroke-width="5"/>
${flower(66, 72, 1, 12)}${flower(136, 70, .85, 40)}${flower(124, 82, .7, -20)}
</g></svg>`;
}

// 爆炸星贴纸
function burst(size, color, inner = '', rot = 0, n = 14) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 40 : 49, a = Math.PI * i / n - Math.PI / 2; pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`); }
  return `<div class="bst" style="width:${size}px;height:${size}px;transform:rotate(${rot}deg)"><svg viewBox="0 0 100 100" width="${size}" height="${size}"><polygon points="${pts.join(' ')}" fill="${color}" stroke="${color}" stroke-width="3" stroke-linejoin="round"/></svg><div class="bi">${inner}</div></div>`;
}
// 四角闪星
const spark = (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="display:block"><path d="M12 0C12.8 7.6 16.4 11.2 24 12C16.4 12.8 12.8 16.4 12 24C11.2 16.4 7.6 12.8 0 12C7.6 11.2 11.2 7.6 12 0Z" fill="${c}"/></svg>`;
const sp = (x, y, s, c) => `<div class="ab" style="left:${x}px;top:${y}px">${spark(s, c)}</div>`;
// 波浪顶边的色块
function wave(w, h, color, amp = 9, L = 64) {
  let d = `M0 ${amp}`, x = 0, k = 0;
  while (x < w) { d += ` Q${x + L / 4} ${k % 2 ? 3 * amp : -amp} ${x + L / 2} ${amp}`; x += L / 2; k++; }
  d += ` L${x} ${h} L0 ${h}Z`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block"><path d="${d}" fill="${color}"/></svg>`;
}
// 波浪线
function squiggle(w, color, amp = 6, L = 44, sw = 3) {
  let d = `M0 ${amp + sw}`, x = 0, k = 0;
  while (x < w) { d += ` Q${x + L / 4} ${k % 2 ? 3 * amp + sw : -amp + sw} ${x + L / 2} ${amp + sw}`; x += L / 2; k++; }
  return `<svg width="${w}" height="${2 * amp + 2 * sw}" style="display:block;overflow:visible"><path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/></svg>`;
}
// 字标：b + 气泡 + b + 气泡
const wm = (s, c = Y, hl = P) => `<span class="wm" style="font-size:${s}px;color:${c};--hl:${hl}"><b>b</b><i></i><b>b</b><i></i></span>`;
const price = (n, s, c = K) => `<span class="nb pr" style="font-size:${s}px;color:${c}"><small>¥</small>${n}</span>`;
// 海报大字：庆科黄油体本身窄，这里横向放大 1.2 倍、字号加大，再斜切、轻转；halo 是外圈一道底色，字压在黄圆和杯子上也分得开
function bigT(text, size, { fill = Y, halo = P, fat = .005, ring = .045, sx = 1.2, skew = -10, rot = -4 } = {}) {
  const w = Math.ceil(text.length * size * .86), h = Math.ceil(size * 1.12);
  const t = (c, sw) => `<text x="${(size * .06).toFixed(1)}" y="${(size * .9).toFixed(1)}" font-family="ZCOOL QingKe HuangYou" font-size="${size}" fill="${c}" stroke="${c}" stroke-width="${sw.toFixed(1)}" stroke-linejoin="round">${text}</text>`;
  return `<svg width="${w}" height="${h}" style="display:block;overflow:visible;transform:rotate(${rot}deg) skewX(${skew}deg) scaleX(${sx});transform-origin:0 100%">${halo ? t(halo, 2 * size * (fat + ring)) : ''}${t(fill, 2 * size * fat)}</svg>`;
}
const TABS = [['house', '首页'], ['cup-soda', '点单'], ['receipt-text', '订单'], ['user', '我的']];
const tabs = (on, items = TABS, c = K, a = P) => `<div class="tb">${items.map(([ic, t], i) => `<div style="color:${i === on ? a : c}">${icon(ic, 23, 2.2)}<span>${t}</span></div>`).join('')}</div>`;

const css = `
.x09{background:${P};color:#fff;font-family:"PingFang SC",sans-serif;-webkit-font-smoothing:antialiased}
.x09 .ab{position:absolute}
.x09 .dot{position:absolute;border-radius:50%;display:block}
.x09 .qk{font-family:"ZCOOL QingKe HuangYou";font-weight:400;line-height:1;white-space:nowrap;-webkit-text-stroke:.01em currentColor}
.x09 .nb{font-family:"Bricolage Grotesque";font-weight:800;font-stretch:75%;line-height:1;white-space:nowrap;letter-spacing:-.01em}
.x09 .pr small{font-size:.56em;margin-right:.04em;vertical-align:.32em}
.x09 .hd{position:absolute;transform:rotate(-4deg) skewX(-10deg) scaleX(1.14);transform-origin:0 100%;-webkit-text-stroke:.016em currentColor;letter-spacing:.02em}
.x09 .bst{position:relative}
.x09 .bst svg{position:absolute;left:0;top:0}
.x09 .bst .bi{position:absolute;inset:0;display:grid;place-items:center;color:#fff}
.x09 .wm{display:inline-flex;align-items:baseline;font-family:"Bricolage Grotesque";font-weight:800;font-stretch:100%;line-height:1;letter-spacing:-.02em}
.x09 .wm i{display:inline-block;width:.54em;height:.54em;border-radius:50%;background:currentColor;margin:0 .03em 0 .04em;position:relative}
.x09 .wm i::after{content:"";position:absolute;left:24%;top:22%;width:22%;height:22%;border-radius:50%;background:var(--hl)}
.x09 .btn{position:absolute;left:24px;right:24px;height:60px;border-radius:30px;background:${K};color:${Y};display:flex;align-items:center;justify-content:center;gap:10px;font-size:19px;font-weight:700;letter-spacing:.12em}
.x09 .tb{position:absolute;left:0;right:0;bottom:0;height:84px;display:flex;justify-content:space-around;padding:8px 12px 0}
.x09 .tb div{display:flex;flex-direction:column;align-items:center;gap:3px;width:64px;font-size:11px;font-weight:600}

/* b1 菜单 */
.x09 .cat{position:absolute;left:24px;right:24px;top:104px;display:flex;align-items:baseline;gap:22px}
.x09 .cat span{font-family:"ZCOOL QingKe HuangYou";font-size:22px;color:rgba(255,255,255,.55)}
.x09 .cat span.on{font-size:34px;color:${Y}}
.x09 .slab{position:absolute;left:-30px;right:-30px;height:200px}
.x09 .sl-t{position:absolute}
.x09 .sl-t .qk{font-size:48px;color:${K};display:block;transform:skewX(-10deg) scaleX(1.12);transform-origin:0 100%;letter-spacing:.02em}
.x09 .sl-t.r .qk{transform-origin:100% 100%}
.x09 .sl-t .row{display:flex;align-items:center;gap:14px;margin-top:16px}
.x09 .sl-t.r .row{flex-direction:row-reverse}
.x09 .plus{width:40px;height:40px;border-radius:50%;background:${K};color:${Y};display:grid;place-items:center}
.x09 .cart{position:absolute;left:16px;right:16px;height:62px;border-radius:31px;background:${K};display:flex;align-items:center;padding:0 6px 0 22px;gap:12px}
.x09 .cart .go{margin-left:auto;height:50px;padding:0 26px;border-radius:25px;background:${Y};color:${K};display:flex;align-items:center;font-size:17px;font-weight:700;letter-spacing:.08em}

/* b2 取单号 */
.x09 .steps{position:absolute;left:24px;right:24px;display:flex;justify-content:space-between}
.x09 .steps div{display:flex;flex-direction:column;align-items:center;gap:8px;width:64px;font-size:13px;font-weight:600;color:${K}}
.x09 .steps i{width:30px;height:30px;border-radius:50%;display:block;border:3px solid ${K};background:${Y}}
.x09 .ord{position:absolute;left:-24px;right:-24px;height:220px;background:${P};transform:rotate(-3deg)}

/* 网页 */
.x09 .wnav{position:absolute;left:56px;right:56px;top:34px;height:56px;display:flex;align-items:center}
.x09 .wnav nav{display:flex;gap:40px;margin-left:72px;font-size:18px;font-weight:600;color:#fff}
.x09 .wnav .wb{margin-left:auto;height:50px;padding:0 28px;border-radius:25px;background:${Y};color:${K};display:flex;align-items:center;gap:8px;font-size:17px;font-weight:700;letter-spacing:.06em}
.x09 .rib{position:absolute;left:-40px;right:-40px;height:108px;background:${R};display:flex;align-items:center;justify-content:center;gap:56px;white-space:nowrap;overflow:hidden;transform:rotate(-2.5deg)}
.x09 .rib span{font-family:"ZCOOL QingKe HuangYou";font-size:60px;line-height:1;color:#fff;transform:skewX(-10deg) scaleX(1.12);letter-spacing:.02em}

/* 半山咖啡 */
.x09 .cfw{position:absolute;left:24px;top:62px;display:flex;align-items:baseline;gap:10px}
.x09 .cfw .qk{font-size:32px;color:${Y};transform:skewX(-10deg)}
.x09 .cfw em{font-family:"Bricolage Grotesque";font-weight:800;font-style:normal;font-size:14px;letter-spacing:.14em;color:#fff}
.x09 .pts{position:absolute;right:24px;top:58px;text-align:right}
.x09 .pts span{display:block;font-size:12px;color:rgba(255,255,255,.7);font-weight:600}
.x09 .pts .nb{font-size:30px;color:#fff;margin-top:2px}
`;

// ---------- 主图：新品海报首页 ----------
const hero = `<div class="scr x09">
${statusBar(true)}${miniNav({ light: true, left: wm(30, Y, P) })}
<i class="dot" style="left:104px;top:104px;width:300px;height:300px;background:${Y}"></i>
<div class="ab" style="left:152px;top:92px">${cup(184, 'peach', 9, 7, true)}</div>
<div class="ab" style="left:14px;top:118px">${burst(124, R, price(16, 50, '#fff'), -12)}</div>
${sp(44, 270, 24, '#fff')}${sp(30, 560, 16, Y)}
<div class="ab" style="left:12px;top:322px">${bigT('桃桃', 132)}</div>
<div class="ab" style="left:84px;top:452px">${bigT('气泡', 132)}</div>
<div class="ab" style="left:0;top:614px">${wave(375, 198, Y)}</div>
<div class="btn" style="top:648px">去点单${icon('arrow-right', 22, 2.6)}</div>
${tabs(0)}${homeBar()}</div>`;

// ---------- b1：菜单（一块色一杯，杯子左右交替，像三张小海报叠着） ----------
const slab = (top, bg, rot, name, n, kind, cupRot, right, h = 200, dy = 0, fg = K) => `<div class="slab" style="top:${top}px;height:${h}px;background:${bg};transform:rotate(${rot}deg)"></div>
<div class="sl-t ${right ? 'r' : ''}" style="top:${top + 46}px;${right ? 'right:24px;text-align:right' : 'left:24px'}"><span class="qk" style="color:${fg}">${name}</span><div class="row">${price(n, 36, fg)}<span class="plus">${icon('plus', 22, 3)}</span></div></div>
<div class="ab" style="${right ? 'left:6px' : 'left:226px'};top:${top - 24 + dy}px">${cup(132, kind, cupRot, 6, false, true)}</div>`;
const b1 = `<div class="scr x09">
${statusBar(true)}${miniNav({ light: true, left: `<span style="display:flex;align-items:center;gap:4px;font-size:16px;font-weight:600;padding-left:6px">三里屯店${icon('chevron-down', 18, 2.4)}</span>` })}
<div class="cat"><span class="on">气泡</span><span>果茶</span><span>奶茶</span><span>加料</span></div>
${slab(166, Y, -2.5, '桃桃气泡', 16, 'peach', 10, false)}
${slab(362, R, 2, '柠柠气泡', 15, 'lemon', -9, true)}
${slab(558, PK, -2, '葡萄气泡', 17, 'grape', 9, false, 300, -30)}
<div class="cart" style="top:722px">${icon('shopping-bag', 24, 2.2, `style="color:${Y}"`)}<span style="font-size:16px;font-weight:600">2 杯</span>${price(31, 28, Y)}<span class="go">去结算</span></div>
${homeBar(true)}</div>`;

// ---------- b2：取单号 ----------
const b2 = `<div class="scr x09" style="background:${Y};color:${K}">
${statusBar()}${miniNav({ left: icon('chevron-left', 26, 2.4) })}
<div class="qk ab" style="left:24px;top:110px;font-size:30px;transform:skewX(-10deg)">取单号</div>
<div class="nb ab" style="left:14px;top:150px;font-size:200px;color:${P};transform:skewX(-8deg) rotate(-4deg);transform-origin:0 100%;letter-spacing:-.03em">A042</div>
${sp(318, 132, 30, R)}${sp(28, 356, 18, P)}
<div class="ab" style="left:24px;right:24px;top:392px;display:flex;align-items:baseline;justify-content:space-between"><span class="qk" style="font-size:40px;transform:skewX(-10deg)">制作中</span><span style="font-size:15px;font-weight:600">前面 3 杯 · 约 6 分钟</span></div>
<div class="ab" style="left:60px;top:468px">${squiggle(256, K)}</div>
<div class="steps" style="top:462px"><div><i style="background:${P};border-color:${P}"></i>已下单</div><div><i style="background:${R};border-color:${R}"></i>制作中</div><div><i></i>可取餐</div></div>
<div class="ord" style="top:590px;height:260px"></div>
<div class="ab" style="left:212px;top:516px">${cup(80, 'lemon', -12, 5)}</div><div class="ab" style="left:268px;top:534px">${cup(84, 'peach', 10, 5)}</div>
<div class="ab" style="left:24px;top:646px;color:#fff"><div class="qk" style="font-size:28px;color:${Y};transform:skewX(-10deg)">桃桃气泡 <span class="nb" style="font-size:26px">× 1</span></div><div class="qk" style="font-size:28px;color:${Y};transform:skewX(-10deg);margin-top:8px">柠柠气泡 <span class="nb" style="font-size:26px">× 1</span></div><div style="font-size:14px;margin-top:14px;opacity:.85">三里屯店 · 到店自取</div></div>
<div class="ab" style="right:24px;top:724px">${price(31, 44, '#fff')}</div>
${homeBar()}</div>`;

// ---------- 网页：一张海报，主杯压在大字上，两杯从两边斜着冲进来 ----------
// 底部飘带：只放三杯的名字，大字，杯子都停在飘带上沿以上，不交叉
const ribbon = ['桃桃气泡', '柠柠气泡', '葡萄气泡'].map((t) => `<span>${t}</span>`).join(spark(34, Y));
const web = `<div class="x09 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<i class="dot" style="left:350px;top:262px;width:580px;height:580px;background:${Y}"></i>
<div class="wnav">${wm(46, Y, P)}<nav><span>新品</span><span>菜单</span><span>门店</span><span>加盟</span></nav><span class="wb">小程序点单${icon('arrow-right', 20, 2.6)}</span></div>
<div class="ab" style="left:236px;top:140px">${bigT('桃桃气泡', 214, { ring: .035 })}</div>
<div class="ab" style="left:104px;top:312px">${cup(190, 'lemon', -16, 9, false, true)}</div>
<div class="ab" style="left:1000px;top:266px">${cup(190, 'grape', 15, 9, false, true)}</div>
<div class="ab" style="left:510px;top:184px">${cup(256, 'peach', 8, 10, true)}</div>
<div class="ab" style="left:806px;top:350px">${burst(140, R, price(16, 58, '#fff'), -12)}</div>
${sp(1080, 150, 46, '#fff')}${sp(176, 250, 32, Y)}
<div class="rib" style="top:686px">${ribbon}</div>
</div>`;

// ---------- 半山咖啡 ----------
const cmp = `<div class="scr x09">
${statusBar(true)}
<div class="cfw"><span class="qk">半山咖啡</span><em>BANSHAN</em></div>
<div class="pts"><span>会员积分</span><b class="nb">1,280</b></div>
<i class="dot" style="left:104px;top:124px;width:300px;height:300px;background:${Y}"></i>
<div class="ab" style="left:124px;top:116px">${latte(232, 8)}</div>
<div class="ab" style="left:24px;top:300px">${burst(118, R, price(28, 46, '#fff'), -12)}</div>
${sp(340, 118, 26, '#fff')}${sp(52, 160, 18, Y)}
<div class="ab" style="left:24px;top:438px;font-size:14px;font-weight:600;color:rgba(255,255,255,.75)">今日推荐</div>
<div class="hd qk" style="left:20px;top:466px;font-size:90px;color:${Y}">桂花拿铁</div>
<div class="ab" style="left:24px;top:584px;font-size:15px;font-weight:500">东四店 · 到店自取约 6 分钟</div>
<div class="ab" style="left:0;top:624px">${wave(375, 190, Y)}</div>
<div class="btn" style="top:656px">去点单${icon('arrow-right', 24, 2.6)}</div>
${tabs(0, [['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user', '我的']])}${homeBar()}</div>`;

const decoA = `<i style="position:absolute;left:-140px;top:-120px;width:460px;height:460px;border-radius:50%;background:${P}"></i>
<i style="position:absolute;right:-110px;bottom:-90px;width:330px;height:330px;border-radius:50%;background:${R}"></i>
<div style="position:absolute;left:452px;top:96px">${spark(44, '#fff')}</div><div style="position:absolute;left:46px;top:760px">${spark(34, P)}</div>`;

module.exports = {
  css,
  screens: { 's09-hero': hero, 's09-b1': b1, 's09-b2': b2, 's09-web': web, 's09-cmp': cmp },
  desktop: ['s09-web'],
  marks: [[350, 414], [58, 532], [352, 116], [130, 126]],
  // 附录放大区：居中包住「桃桃气泡」大字和主杯上半（避开顶部导航）
  zoom: [238, 90],
  palette: [['电光紫', P], ['荧光黄', Y], ['番茄红', R], ['蜜桃粉', PK], ['墨黑', K]],
  type: { font: '"Bricolage Grotesque","ZCOOL QingKe HuangYou"', weight: 800, style: 'font-stretch:75%;', sample: '啵 Aa', lines: [['标题', '站酷庆科黄油体'], ['数字', 'Bricolage 窄粗'], ['正文', '苹方']] },
  stageA: Y,
  decoA,
  // 参考页：电光紫满铺，荧光黄只做底部一块撞色波浪
  // 舞台紫比网页紫深一档，电脑窗口的边才分得开
  stageB: { bg: '#4420D2', color: '#fff', url: 'bobotea.cn', deco: `<div style="position:absolute;left:0;right:0;bottom:0">${wave(936, 210, Y, 14, 96)}</div><div style="position:absolute;left:836px;top:30px">${spark(56, Y)}</div>` },
  page: (no) => stylePages(no, 's09-pop', module.exports),
};
