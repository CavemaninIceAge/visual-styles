// 01 留白极简 Minimal —— 声白 SHENGBAI（音箱和耳机，App）
const { img, icon, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

const C = { bg: '#FFFFFF', mist: '#F2F2F0', grey: '#8C8C89', ink: '#161616', acc: '#C65A20' };
let uid = 0;

// 声白 S2 桌面音箱：矮宽的方盒，正面整块细孔铝网罩，顶面右侧一颗滚花旋钮，柔和的接地阴影（视角略高于顶面）
function speaker(w = 240, tone = 'graphite') {
  const id = 'x01s' + (++uid);
  const G = tone === 'graphite';
  const T = G
    ? { top1: '#5A5B5F', top2: '#3B3C40', body: '#2E2F32', net: '#3E4044', hole: '#141517', edge: .55, hi: .1, rim: 'rgba(255,255,255,.22)', k1: '#F2F2F0', k2: '#A9AAA8', k3: '#6E6F70' }
    : { top1: '#FBFAF8', top2: '#E6E4DF', body: '#E2E0DB', net: '#ECEAE6', hole: '#AFACA6', edge: .22, hi: .5, rim: 'rgba(255,255,255,.9)', k1: '#FFFFFF', k2: '#CFCDC8', k3: '#9C9A95' };
  const h = Math.round(w * 196 / 260);
  return `<svg class="pd" width="${w}" height="${h}" viewBox="0 0 260 196" style="overflow:visible">
<defs>
<linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.top2}"/><stop offset=".55" stop-color="${T.top1}"/><stop offset="1" stop-color="${T.top1}"/></linearGradient>
<linearGradient id="${id}h" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity="${T.edge}"/><stop offset=".05" stop-color="#000" stop-opacity="${T.edge * .25}"/><stop offset=".3" stop-color="#fff" stop-opacity="${T.hi * .5}"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset=".9" stop-color="#000" stop-opacity="${T.edge * .2}"/><stop offset=".97" stop-color="#000" stop-opacity="${T.edge * .6}"/><stop offset="1" stop-color="#000" stop-opacity="${T.edge}"/></linearGradient>
<linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${T.hi * .5}"/><stop offset=".22" stop-color="#fff" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${G ? .42 : .16}"/></linearGradient>
<pattern id="${id}p" width="3.4" height="3.4" patternUnits="userSpaceOnUse"><rect width="3.4" height="3.4" fill="${T.net}"/><circle cx="1.7" cy="1.7" r=".95" fill="${T.hole}"/></pattern>
<linearGradient id="${id}k" x1="0" x2="1"><stop offset="0" stop-color="${T.k3}"/><stop offset=".3" stop-color="${T.k1}"/><stop offset=".55" stop-color="${T.k2}"/><stop offset="1" stop-color="${T.k3}"/></linearGradient>
<radialGradient id="${id}kt" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="${T.k1}"/><stop offset="1" stop-color="${T.k2}"/></radialGradient>
<pattern id="${id}kn" width="1.6" height="10" patternUnits="userSpaceOnUse"><rect width=".7" height="10" fill="#000" opacity=".16"/></pattern>
<filter id="${id}b" filterUnits="userSpaceOnUse" x="-60" y="140" width="380" height="90"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="${id}c" filterUnits="userSpaceOnUse" x="0" y="160" width="260" height="40"><feGaussianBlur stdDeviation="2.2"/></filter>
<clipPath id="${id}f"><path d="M18 58H242V164Q242 178 228 178H32Q18 178 18 164Z"/></clipPath>
</defs>
<ellipse cx="130" cy="182" rx="128" ry="12" fill="#000" opacity="${G ? .2 : .16}" filter="url(#${id}b)"/>
<ellipse cx="130" cy="178.5" rx="104" ry="3.6" fill="#000" opacity="${G ? .5 : .34}" filter="url(#${id}c)"/>
<rect x="40" y="172" width="180" height="9" rx="3" fill="${G ? '#18191B' : '#B9B6B0'}"/>
<path d="M33 36H227Q236 36 238.6 44L242 56Q242.4 58 240 58H20Q17.6 58 18 56L21.4 44Q24 36 33 36Z" fill="url(#${id}t)"/>
<g clip-path="url(#${id}f)">
<rect x="18" y="58" width="224" height="120" fill="${T.body}"/>
<rect x="27" y="66" width="206" height="103" rx="7" fill="url(#${id}p)"/>
<rect x="27" y="66" width="206" height="103" rx="7" fill="none" stroke="#000" stroke-opacity="${G ? .35 : .1}" stroke-width=".8"/>
<rect x="18" y="58" width="224" height="120" fill="url(#${id}v)"/>
<rect x="18" y="58" width="224" height="120" fill="url(#${id}h)"/>
</g>
<path d="M19 58.4H241" stroke="${T.rim}" stroke-width="1"/>
<ellipse cx="205" cy="47" rx="11.5" ry="3.4" fill="#000" opacity=".22"/>
<path d="M193.5 38V46.4A11.5 3.4 0 0 0 216.5 46.4V38Z" fill="url(#${id}k)"/>
<path d="M193.5 38V46.4A11.5 3.4 0 0 0 216.5 46.4V38Z" fill="url(#${id}kn)"/>
<ellipse cx="205" cy="38" rx="11.5" ry="3.4" fill="url(#${id}kt)"/>
<ellipse cx="205" cy="38" rx="11.5" ry="3.4" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width=".5"/>
</svg>`;
}

// 声白 E1 头戴降噪耳机：雾白外壳、暖灰耳垫，一条细头梁，两只圆耳罩微微外转、立在台面上（不带任何标志）
function cans(w = 230) {
  const id = 'x01h' + (++uid);
  const h = Math.round(w * 200 / 240);
  const cup = (fx, dir) => {
    const sx = fx + dir * 12, cx = fx + dir * 22;
    const q = dir < 0 ? 'l' : 'r';
    return `<ellipse cx="${cx}" cy="141" rx="19" ry="43.5" fill="url(#${id}u)"/>
<ellipse cx="${cx}" cy="141" rx="19" ry="43.5" fill="url(#${id}us${q})"/>
<path d="M${fx} 95.5H${sx}V186.5H${fx}Z" fill="url(#${id}sd)"/>
<ellipse cx="${sx}" cy="141" rx="22.5" ry="45.5" fill="url(#${id}sd)"/>
<ellipse cx="${fx}" cy="141" rx="22.5" ry="45.5" fill="url(#${id}f${q})"/>
<ellipse cx="${fx}" cy="141" rx="22.5" ry="45.5" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".8"/>
<ellipse cx="${fx + dir * .6}" cy="141" rx="16.5" ry="34" fill="none" stroke="#000" stroke-opacity=".045" stroke-width=".8"/>
<ellipse cx="${fx - dir * 5}" cy="118" rx="7" ry="17" fill="url(#${id}hl)"/>`;
  };
  return `<svg class="pd" width="${w}" height="${h}" viewBox="0 0 240 200" style="overflow:visible">
<defs>
<radialGradient id="${id}fl" cx=".32" cy=".26" r=".9"><stop offset="0" stop-color="#FDFCFA"/><stop offset=".45" stop-color="#ECE9E3"/><stop offset=".82" stop-color="#D3CEC5"/><stop offset="1" stop-color="#BDB7AC"/></radialGradient>
<radialGradient id="${id}fr" cx=".5" cy=".26" r=".9"><stop offset="0" stop-color="#F6F4F0"/><stop offset=".45" stop-color="#E3DFD8"/><stop offset=".82" stop-color="#CAC4BA"/><stop offset="1" stop-color="#B3ACA1"/></radialGradient>
<linearGradient id="${id}sd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E2DED7"/><stop offset=".55" stop-color="#C9C3B9"/><stop offset="1" stop-color="#A9A296"/></linearGradient>
<linearGradient id="${id}u" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8A196"/><stop offset=".5" stop-color="#8E877C"/><stop offset="1" stop-color="#6F695F"/></linearGradient>
<linearGradient id="${id}usl" x1="0" x2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
<linearGradient id="${id}usr" x1="1" x2="0"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
<radialGradient id="${id}hl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FAF9F6"/><stop offset=".5" stop-color="#E4E0D9"/><stop offset="1" stop-color="#C7C1B7"/></linearGradient>
<linearGradient id="${id}m" x1="0" x2="1"><stop offset="0" stop-color="#8F908D"/><stop offset=".35" stop-color="#E6E6E3"/><stop offset=".6" stop-color="#BDBDB9"/><stop offset="1" stop-color="#7E7F7C"/></linearGradient>
<filter id="${id}g" filterUnits="userSpaceOnUse" x="-40" y="160" width="320" height="60"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="${id}c" filterUnits="userSpaceOnUse" x="0" y="176" width="240" height="24"><feGaussianBlur stdDeviation="2"/></filter>
</defs>
<ellipse cx="120" cy="190" rx="112" ry="9" fill="#000" opacity=".13" filter="url(#${id}g)"/>
<ellipse cx="54" cy="187" rx="27" ry="3.4" fill="#000" opacity=".34" filter="url(#${id}c)"/>
<ellipse cx="186" cy="187" rx="27" ry="3.4" fill="#000" opacity=".34" filter="url(#${id}c)"/>
<path d="M53.5 72C58 36 86 19.6 120 19.6S182 36 186.5 72" fill="none" stroke="url(#${id}u)" stroke-width="7" stroke-linecap="round"/>
<path d="M47 98C46 40 80 12 120 12S194 40 193 98" fill="none" stroke="url(#${id}b)" stroke-width="8" stroke-linecap="round"/>
<path d="M50 70C55 32 84 9.4 120 9.4S185 32 190 70" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1"/>
<rect x="44.5" y="82" width="5" height="18" rx="2.5" fill="url(#${id}m)"/>
<rect x="190.5" y="82" width="5" height="18" rx="2.5" fill="url(#${id}m)"/>
${cup(40, 1)}
${cup(200, -1)}
</svg>`;
}

// 半山咖啡的桂花拿铁：无柄白瓷杯，杯脚一圈素烧；杯口是真实的拿铁拉花照片，压成透视的椭圆
function latte(w = 240) {
  const id = 'x01l' + (++uid);
  const h = Math.round(w * 230 / 240);
  const s = 66.4 / 126;
  return `<svg class="pd" width="${w}" height="${h}" viewBox="0 0 240 230" style="overflow:visible">
<defs>
<linearGradient id="${id}c" x1="0" x2="1"><stop offset="0" stop-color="#C6C6C2"/><stop offset=".14" stop-color="#E9E9E6"/><stop offset=".38" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F8F8F6"/><stop offset=".86" stop-color="#DCDCD9"/><stop offset="1" stop-color="#BBBBB7"/></linearGradient>
<linearGradient id="${id}f" x1="0" x2="1"><stop offset="0" stop-color="#B3A893"/><stop offset=".38" stop-color="#E2D8C6"/><stop offset="1" stop-color="#A89C86"/></linearGradient>
<linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".75" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient>
<radialGradient id="${id}k" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-color="#5A3317" stop-opacity="0"/><stop offset="1" stop-color="#5A3317" stop-opacity=".45"/></radialGradient>
<filter id="${id}b" filterUnits="userSpaceOnUse" x="-40" y="160" width="320" height="90"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="${id}d" filterUnits="userSpaceOnUse" x="20" y="180" width="200" height="40"><feGaussianBlur stdDeviation="2.5"/></filter>
<clipPath id="${id}q"><path d="M46 60C48 118 55 166 60 194A60 15 0 0 0 180 194C185 166 192 118 194 60Z"/></clipPath>
<clipPath id="${id}s"><ellipse cx="120" cy="63" rx="66.4" ry="14.6"/></clipPath>
</defs>
<ellipse cx="120" cy="204" rx="96" ry="12" fill="#000" opacity=".2" filter="url(#${id}b)"/>
<ellipse cx="120" cy="200" rx="60" ry="5" fill="#000" opacity=".32" filter="url(#${id}d)"/>
<g clip-path="url(#${id}q)">
<rect x="40" y="40" width="160" height="180" fill="url(#${id}c)"/>
<path d="M40 184A80 15 0 0 0 200 184V220H40Z" fill="url(#${id}f)"/>
<rect x="40" y="40" width="160" height="180" fill="url(#${id}v)"/>
</g>
<ellipse cx="120" cy="60" rx="74" ry="19" fill="#FBFBF9"/>
<ellipse cx="120" cy="60.6" rx="68" ry="16.6" fill="#DEDCD7"/>
<g clip-path="url(#${id}s)"><g transform="translate(120 63) scale(1 .22)">
<image href="${img('latte-cheers')}" x="${(-690 * s).toFixed(1)}" y="${(-272 * s).toFixed(1)}" width="${(1400 * s).toFixed(1)}" height="${(933 * s).toFixed(1)}" style="filter:saturate(.9) brightness(1.04)"/>
</g><ellipse cx="120" cy="63" rx="66.4" ry="14.6" fill="url(#${id}k)"/></g>
<g fill="#E3A23A"><circle cx="101" cy="60" r="1.1"/><circle cx="139" cy="66.5" r="1"/><circle cx="131" cy="58" r=".95"/><circle cx="112" cy="68" r=".9"/></g>
</svg>`;
}

const css = `
.x01{font-family:"Noto Sans SC",sans-serif;color:${C.ink};background:${C.bg};font-weight:400;letter-spacing:.01em}
.x01 .pd{display:block}
.x01 .nv{position:absolute;left:0;right:0;top:50px;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;color:${C.ink}}
.x01 .wm{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:400;letter-spacing:.42em;color:${C.ink}}
.x01 .wm i{width:14px;height:14px;border-radius:50%;border:1.2px solid ${C.ink};position:relative}
.x01 .wm i:after{content:"";position:absolute;left:50%;top:50%;width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:50%;background:${C.ink}}
.x01 .g{color:${C.grey}}
.x01 .buy{display:flex;align-items:center;justify-content:center;width:136px;height:46px;border-radius:6px;background:${C.acc};color:#fff;font-size:15px;font-weight:400;letter-spacing:.24em;padding-left:.24em}
.x01 .tab{position:absolute;left:0;right:0;bottom:0;height:82px;background:#fff;display:flex;justify-content:space-around;padding:14px 18px 0;font-size:13px;color:#A3A3A0;letter-spacing:.08em}
.x01 .tab b{font-weight:400;color:${C.ink}}

/* hero 商品页 */
.x01.h .stg{position:absolute;left:0;right:0;top:0;height:508px;background:radial-gradient(90% 60% at 50% 46%,#F8F8F6 0%,#F1F1EE 60%,#ECECE9 100%)}
.x01.h .stg .pd{position:absolute;left:37.5px;top:168px}
.x01.h .inf{position:absolute;left:28px;right:28px;top:508px;bottom:0}
.x01.h h1{font-size:44px;line-height:52px;font-weight:200;letter-spacing:-.01em;margin-top:32px}
.x01.h .sub{font-size:15px;line-height:22px;margin-top:4px;letter-spacing:.06em}
.x01.h .prw{display:flex;justify-content:space-between;align-items:center;margin-top:20px}
.x01.h .pr{font-size:22px;line-height:28px;font-weight:300;letter-spacing:.02em}
.x01.h .sw{display:flex;gap:16px;padding-right:4px}
.x01.h .sw i{width:16px;height:16px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.14)}
.x01.h .sw i.on{outline:1px solid ${C.ink};outline-offset:4px}
.x01.h .buy{position:absolute;left:0;top:190px}

/* b1 首页 */
.x01.b1 .nv{padding:0 38px}
.x01.b1 .tile{position:absolute;left:14px;right:14px;border-radius:26px;background:${C.mist};overflow:hidden}
.x01.b1 .t1{top:104px;height:392px}
.x01.b1 .t2{top:508px;height:300px}
.x01.b1 .tile h2{position:absolute;left:24px;top:24px;font-size:30px;line-height:38px;font-weight:300;letter-spacing:0}
.x01.b1 .tile p{position:absolute;left:24px;top:64px;font-size:15px;line-height:22px}
.x01.b1 .tile .pr{top:auto;bottom:26px;color:${C.ink};font-size:17px;font-weight:300}
.x01.b1 .t1 .pd{position:absolute;left:58.5px;top:124px}
.x01.b1 .t2 .pd{position:absolute;left:63px;top:108px}

/* b2 购物袋 */
.x01.b2 h1{position:absolute;left:28px;top:84px;font-size:34px;line-height:42px;font-weight:300;letter-spacing:0}
.x01.b2 .tile{position:absolute;left:28px;right:28px;top:156px;height:262px;border-radius:24px;background:${C.mist}}
.x01.b2 .tile .pd{position:absolute;left:54px;top:46px}
.x01.b2 .it{position:absolute;left:28px;right:28px;top:442px}
.x01.b2 .it b{display:block;font-size:20px;line-height:28px;font-weight:300}
.x01.b2 .it span{display:block;font-size:14px;line-height:22px;margin-top:4px}
.x01.b2 .tot{position:absolute;left:28px;top:540px}
.x01.b2 .tot span{display:block;font-size:14px;line-height:20px}
.x01.b2 .tot b{display:block;font-size:34px;line-height:44px;font-weight:300;letter-spacing:0;margin-top:2px}
.x01.b2 .buy{position:absolute;left:28px;top:644px}

/* web 新品发布：居中发布页，两种颜色并排落在展台上 */
.x01.web{background:linear-gradient(180deg,#F6F6F4 0%,#F0F0ED 70%,#E9E9E5 100%)}
.x01.web .wn{position:absolute;left:72px;right:72px;top:0;height:88px;display:flex;align-items:center;justify-content:space-between}
.x01.web .wn .wm{font-size:22px;width:220px}
.x01.web .wn .wm i{width:17px;height:17px}
.x01.web .wn nav{display:flex;gap:52px;font-size:18px;color:${C.grey};letter-spacing:.1em}
.x01.web .wn .r{width:220px;display:flex;justify-content:flex-end;color:${C.ink}}
.x01.web .tx{position:absolute;left:0;right:0;top:118px;text-align:center}
.x01.web .tx h1{font-size:104px;line-height:112px;font-weight:300;letter-spacing:0}
.x01.web .tx .row{display:flex;justify-content:center;align-items:center;gap:32px;margin-top:22px}
.x01.web .tx .pr{font-size:26px;font-weight:300;color:${C.ink}}
.x01.web .tx .buy{width:132px;height:50px;border-radius:7px;font-size:18px}
.x01.web .pd{position:absolute;top:376px}

/* cmp 半山咖啡 */
.x01.cmp .stg{position:absolute;left:0;right:0;top:0;height:470px;background:linear-gradient(180deg,#F5F5F3 0%,#EFEFEC 75%,#F3F3F1 100%)}
.x01.cmp .nv{padding:0 28px}
.x01.cmp .wm{font-size:18px;letter-spacing:.32em}
.x01.cmp .pts{text-align:right;line-height:1}
.x01.cmp .pts span{font-size:12px;color:${C.grey};letter-spacing:.1em;margin-right:8px}
.x01.cmp .pts b{font-size:20px;font-weight:300}
.x01.cmp .stg .pd{position:absolute;left:53.5px;top:156px}
.x01.cmp .inf{position:absolute;left:28px;right:28px;top:494px}
.x01.cmp .lb{font-size:13px;line-height:18px;letter-spacing:.12em}
.x01.cmp h1{font-size:40px;line-height:48px;font-weight:200;letter-spacing:-.01em;margin-top:6px}
.x01.cmp .pr{font-size:20px;line-height:28px;font-weight:300;margin-top:4px}
.x01.cmp .st{font-size:14px;line-height:20px;margin-top:14px}
.x01.cmp .buy{position:absolute;left:28px;top:654px}
.x01.cmp .tab{height:76px}
`;

const back = icon('chevron-left', 26, 1.3);
const bag = icon('shopping-bag', 22, 1.3);

const hero = `<div class="scr x01 h">${statusBar()}
<div class="stg">${speaker(300, 'graphite')}</div>
<div class="nv">${back}${bag}</div>
<div class="inf"><h1>声白 S2</h1><p class="sub g">桌面音箱　石墨</p><div class="prw"><p class="pr">¥2,499</p><span class="sw"><i class="on" style="background:#3A3B3E"></i><i style="background:#E8E6E1"></i></span></div><a class="buy">购买</a></div>
${homeBar()}</div>`;

const b1 = `<div class="scr x01 b1">${statusBar()}
<div class="nv"><span class="wm"><i></i>声白</span>${bag}</div>
<div class="tile t1"><h2>声白 E1</h2><p class="g">头戴降噪耳机</p>${cans(230)}<p class="pr">¥1,499</p></div>
<div class="tile t2"><h2>声白 S2</h2><p class="g">桌面音箱</p>${speaker(220, 'graphite')}</div>
<div class="tab"><b>发现</b><span>产品</span><span>购物袋</span><span>我的</span></div>
${homeBar()}</div>`;

const b2 = `<div class="scr x01 b2">${statusBar()}
<h1>购物袋</h1>
<div class="tile">${speaker(210, 'graphite')}</div>
<div class="it"><b>声白 S2</b><span class="g">石墨　1 件　10 月 30 日送达</span></div>
<div class="tot"><span class="g">合计</span><b>¥2,499</b></div>
<a class="buy">结算</a>
<div class="tab"><span>发现</span><span>产品</span><b>购物袋</b><span>我的</span></div>
${homeBar()}</div>`;

const web = `<div class="x01 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<div class="wn"><span class="wm"><i></i>声白</span><nav><span>音箱</span><span>耳机</span><span>配件</span><span>支持</span></nav><span class="r">${icon('shopping-bag', 26, 1.3)}</span></div>
<div class="tx"><h1>声白 S2</h1><div class="row"><span class="pr">¥2,499</span><a class="buy">购买</a></div></div>
<div style="position:absolute;left:0;top:0">${speaker(368, 'graphite').replace('class="pd"', 'class="pd" style="left:248px;overflow:visible"')}${speaker(368, 'white').replace('class="pd"', 'class="pd" style="left:664px;overflow:visible"')}</div>
</div>`;

const cmp = `<div class="scr x01 cmp">${statusBar()}
<div class="stg">${latte(268)}</div>
<div class="nv"><span class="wm">半山咖啡</span><span class="pts"><span>积分</span><b>1,280</b></span></div>
<div class="inf"><p class="lb g">今日推荐</p><h1>桂花拿铁</h1><p class="pr">¥28</p><p class="st g">东四店 · 到店自取约 6 分钟</p></div>
<a class="buy">去点单</a>
<div class="tab"><b>首页</b><span>菜单</span><span>订单</span><span>我的</span></div>
${homeBar()}</div>`;

// 舞台：字标「⊙」的外圈放大成一道细线大圆
const RING = (d) => `<div style="position:absolute;left:50%;top:50%;width:${d}px;height:${d}px;margin:${-d / 2}px 0 0 ${-d / 2}px;border:1.5px solid rgba(22,22,22,.18);border-radius:50%"></div>`;

module.exports = {
  css,
  screens: { 's01-hero': hero, 's01-b1': b1, 's01-b2': b2, 's01-web': web, 's01-cmp': cmp },
  desktop: ['s01-web'],
  zoom: [220, 14],
  marks: [[200, 721], [222, 568], [-6, 636], [333, 216]],
  palette: [['纸白', '#FFFFFF'], ['浅灰', '#F2F2F0'], ['烟灰', '#8C8C89'], ['锈橙', '#C65A20'], ['墨黑', '#161616']],
  type: { font: '"Noto Sans SC"', weight: 300, sample: '声 Aa', lines: [['标题', '思源黑体 细'], ['正文', '思源黑体 常规'], ['数字', '思源黑体 细']] },
  stageA: 'radial-gradient(110% 62% at 50% 30%,#FBFAF8 0%,#EFEEEA 52%,#DFDED9 100%)',
  decoA: RING(500),
  stageB: { bg: 'radial-gradient(90% 75% at 50% 32%,#FBFAF8 0%,#EFEEEA 52%,#DFDED9 100%)', color: '#161616', url: 'shengbai.com', deco: RING(700) },
  page: (no) => stylePages(no, 's01-minimal', module.exports),
};
