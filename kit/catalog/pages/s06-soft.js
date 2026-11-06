// 06 柔和治愈 Soft —— 眠云 MIANYUN（睡眠和冥想 App）
// 掺了灰的雾粉、雾蓝、燕麦色，大块纯色加大圆；不用整屏渐变、不用纯黑；圆体轻字重
const { icon, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

const OAT = '#EFE8DD';    // 燕麦
const PINK = '#E3C8C1';   // 雾粉
const BLUE = '#B3C4D6';   // 雾蓝
const BTN = '#6B7D90';    // 石板蓝：主按钮和选中
const INK = '#46505C';    // 夜墨
const MUTE = '#8C93A0';   // 浅灰蓝
const MILK = '#FAF6F0';   // 奶白：枕头、卡片

// 云：一整条闭合的圆鼓鼓轮廓，平底圆角
const CLOUD_D = 'M22 60C10 60 4 52 4 44C4 35 11 29 20 29C21 17 31 9 43 9C51 9 58 13 62 19C66 14 72 11 79 11C92 11 102 21 102 33C110 34 116 40 116 47C116 54 110 60 102 60Z';
const cloud = (w, fill = MILK, op = 1) => `<svg width="${w}" height="${Math.round(w * 64 / 120)}" viewBox="0 0 120 64" style="display:block"><path d="${CLOUD_D}" fill="${fill}" fill-opacity="${op}"/></svg>`;

// 眠云的主视觉：一只云朵形的软枕头（奶白，底部一层浅影，一圈缝线），没有脸
const PIL_D = 'M44 122C20 122 6 107 8 90C10 75 22 66 36 66C36 45 53 31 74 34C83 17 102 9 122 13C135 5 156 3 170 11C185 5 207 10 216 27C236 27 252 42 252 62C264 69 266 87 259 100C252 114 238 122 222 122Z';
const pillow = (w) => `<svg width="${w}" height="${Math.round(w * 132 / 268)}" viewBox="0 0 268 132" style="display:block;overflow:visible">
<defs><clipPath id="x06pc"><path d="${PIL_D}"/></clipPath></defs>
<path d="${PIL_D}" fill="${MILK}"/>
<g clip-path="url(#x06pc)"><path d="M0 98C70 114 190 116 268 98V140H0Z" fill="#EDE4D8"/><ellipse cx="96" cy="44" rx="40" ry="14" fill="#fff" opacity=".7" transform="rotate(-12 96 44)"/></g>
<path d="${PIL_D}" fill="none" stroke="#E2D7C8" stroke-width="2.2" stroke-dasharray="1 7" stroke-linecap="round" transform="translate(134 66) scale(.9) translate(-134 -66)"/>
</svg>`;

// 小星点
const dot = (l, t, s = 5, c = MILK, o = .9) => `<i style="position:absolute;left:${l}px;top:${t}px;width:${s}px;height:${s}px;border-radius:50%;background:${c};opacity:${o}"></i>`;

// 品牌记号：一弯月亮靠在一朵小云上（平涂）
const mark = (s, moon = PINK, cl = INK) => `<svg width="${s}" height="${s}" viewBox="0 0 32 32" style="display:block"><defs><mask id="x06cm${s}"><rect width="32" height="32" fill="#fff"/><circle cx="18.5" cy="7.5" r="7.6" fill="#000"/></mask></defs><circle cx="13" cy="12" r="9.5" fill="${moon}" mask="url(#x06cm${s})"/><g transform="translate(5 16) scale(.19)"><path d="${CLOUD_D}" fill="${cl}"/></g></svg>`;
const wordmark = (s = 26, fs = 19, c = INK) => `<span class="wm" style="color:${c}">${mark(s, PINK, c)}<b style="font-size:${fs}px">眠云</b></span>`;

const play = (s = 26, c = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 44 44" style="display:block;margin-left:${Math.round(s * .12)}px"><path d="M12 8L35 22L12 36Z" fill="${c}" stroke="${c}" stroke-width="6" stroke-linejoin="round"/></svg>`;

// 波浪：纯色块的上沿
const wave = (w, h, fill, d) => `<svg style="position:absolute;left:0;bottom:0;display:block" width="${w}" height="${h}" viewBox="0 0 375 ${h}" preserveAspectRatio="none"><path d="${d}" fill="${fill}"/></svg>`;

const tabs = (items, on = 0) => `<div class="tab">${items.map(([ic, t], i) => `<div class="ti ${i === on ? 'on' : ''}">${icon(ic, 22, 1.6)}<span>${t}</span></div>`).join('')}</div>`;
const APP_TABS = [['moon', '今晚'], ['headphones', '声音'], ['chart-spline', '睡眠'], ['user-round', '我的']];

// 桂花：四瓣小花
const osm = (x, y, r = 4, c = '#E9B48E') => `<g transform="translate(${x} ${y})">${[0, 90, 180, 270].map((a) => `<circle cx="${(Math.cos((a + 45) * Math.PI / 180) * r * .8).toFixed(2)}" cy="${(Math.sin((a + 45) * Math.PI / 180) * r * .8).toFixed(2)}" r="${r * .62}" fill="${c}"/>`).join('')}<circle r="${r * .36}" fill="#D99A6E"/></g>`;
// 俯拍的一杯桂花拿铁：全部平涂
const latte = (w) => `<svg width="${w}" height="${w}" viewBox="0 0 240 240" style="display:block">
<circle cx="116" cy="120" r="104" fill="${MILK}"/>
<rect x="172" y="106" width="58" height="28" rx="14" fill="${MILK}"/>
<circle cx="116" cy="120" r="76" fill="#fff"/>
<circle cx="116" cy="120" r="62" fill="#D8B697"/>
<path d="M116 158C93 144 81 126 88 112C94 100 109 99 116 111C123 99 138 100 144 112C151 126 139 144 116 158Z" fill="#F8EFE4"/>
<path d="M116 146C102 137 95 126 99 118C103 111 111 111 116 118C121 111 129 111 133 118C137 126 130 137 116 146Z" fill="#DDBFA2"/>
<path d="M116 137C108 132 104 126 106.5 121.5C109 117.5 113 117.5 116 121.5C119 117.5 123 117.5 125.5 121.5C128 126 124 132 116 137Z" fill="#F8EFE4"/>
${osm(86, 94, 4.2)}${osm(150, 100, 3.6)}${osm(96, 156, 3.4)}${osm(142, 150, 4)}
</svg>`;

const css = `
.x06{font-family:"Chill Round","PingFang SC",sans-serif;color:${INK};background:${OAT};-webkit-font-smoothing:antialiased}
.x06 .n{font-family:"Nunito",sans-serif;font-weight:300}
.x06 .wm{display:inline-flex;align-items:center;gap:8px}
.x06 .wm b{font-weight:400;letter-spacing:.26em}
.x06 .hd{position:absolute;top:58px;left:0;right:0;display:flex;justify-content:center}
.x06 .soft{filter:drop-shadow(0 22px 26px rgba(70,80,92,.16)) drop-shadow(0 4px 8px rgba(70,80,92,.06))}
.x06 .ab{position:absolute}
.x06 .disc{position:absolute;border-radius:50%}
.x06 .ttl{position:absolute;left:0;right:0;text-align:center}
.x06 .ttl h1{font-weight:400;font-size:34px;line-height:1.2;letter-spacing:.16em;padding-left:.16em}
.x06 .ttl p{margin-top:12px;font-size:15px;letter-spacing:.12em;color:${MUTE}}
.x06 .ttl p .n{font-size:18px;font-weight:400;letter-spacing:.02em;margin-right:3px}
.x06 .pl{position:absolute;left:151px;width:74px;height:74px;border-radius:50%;background:${BTN};display:grid;place-items:center;box-shadow:0 18px 30px -14px rgba(70,80,92,.45)}
.x06 .side{position:absolute;width:44px;height:44px;display:grid;place-items:center;color:${MUTE}}
.x06 .side span{position:absolute;font:600 10px/1 "Nunito",sans-serif;letter-spacing:0;margin-top:1px}

/* 标签栏：浮起的圆角条 */
.x06 .tab{position:absolute;left:24px;right:24px;bottom:30px;height:66px;border-radius:33px;background:${MILK};box-shadow:0 20px 40px -20px rgba(70,80,92,.38),0 3px 10px -6px rgba(70,80,92,.12);display:flex;justify-content:space-around;align-items:center;padding:0 10px;z-index:6}
.x06 .ti{display:flex;flex-direction:column;align-items:center;gap:4px;color:#ADB3BC;width:60px}
.x06 .ti span{font-size:11px;letter-spacing:.06em}
.x06 .ti.on{color:${BTN}}

/* b1 呼吸 */
.x06 .top{position:absolute;top:56px;left:24px;right:24px;height:40px;display:flex;align-items:center;justify-content:center}
.x06 .top .x{position:absolute;left:0;top:2px;width:36px;height:36px;border-radius:50%;background:${MILK};display:grid;place-items:center;color:${INK}}
.x06 .top b{font-weight:400;font-size:16px;letter-spacing:.14em}
.x06 .in{position:absolute;left:0;right:0;text-align:center;font-weight:400;font-size:34px;line-height:1;letter-spacing:.26em;padding-left:.26em;color:${MILK}}
.x06 .sec{position:absolute;left:0;right:0;text-align:center;font-size:18px;letter-spacing:.12em;color:${MUTE}}
.x06 .sec .n{font-size:40px;font-weight:300;letter-spacing:0;margin-right:6px;color:${INK}}
.x06 .dots{position:absolute;left:0;right:0;display:flex;justify-content:center;gap:12px}
.x06 .dots i{width:8px;height:8px;border-radius:50%;background:rgba(70,80,92,.16)}
.x06 .dots i.d{background:${BLUE}}
.x06 .dots i.c{width:24px;border-radius:4px;background:${BTN}}
.x06 .pz{position:absolute;left:155px;width:64px;height:64px;border-radius:50%;background:${MILK};display:grid;place-items:center;color:${INK};box-shadow:0 18px 32px -16px rgba(70,80,92,.4);z-index:3}

/* b2 睡眠报告 */
.x06 .rp-h{position:absolute;top:66px;left:28px;right:28px}
.x06 .rp-h .d{font-size:14px;color:${MUTE};letter-spacing:.06em}
.x06 .rp-h .s{margin-top:22px;font-size:17px;letter-spacing:.1em}
.x06 .big{display:flex;align-items:baseline;gap:6px;margin-top:4px;white-space:nowrap}
.x06 .big .n{font-size:68px;line-height:1;letter-spacing:-.02em;font-weight:300}
.x06 .big u{text-decoration:none;font-size:19px;letter-spacing:.06em;margin-right:12px}
.x06 .axis{position:absolute;left:28px;right:28px;display:flex;justify-content:space-between;font-size:13px;color:${MUTE}}
.x06 .axis .n{font-weight:400;font-size:14px}
.x06 .lg{position:absolute;left:24px;right:24px;background:${MILK};border-radius:28px;padding:10px 24px;box-shadow:0 20px 36px -24px rgba(70,80,92,.36)}
.x06 .lg div{display:flex;align-items:center;height:48px;font-size:15px;letter-spacing:.08em}
.x06 .lg i{width:16px;height:16px;border-radius:6px;margin-right:12px}
.x06 .lg p{margin-left:auto;white-space:nowrap;font-size:14px;color:${MUTE};letter-spacing:.04em}
.x06 .lg p .n{font-size:22px;font-weight:400;color:${INK};margin:0 3px 0 6px}

/* 网页 */
.x06 .nav{position:absolute;top:36px;left:72px;right:72px;height:52px;display:flex;align-items:center;justify-content:space-between;z-index:3}
.x06 .nav nav{display:flex;align-items:center;gap:40px;font-size:17px;letter-spacing:.08em}
.x06 .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:999px;height:52px;padding:0 28px;font-size:17px;letter-spacing:.1em;white-space:nowrap}
.x06 .btn.p{background:${BTN};color:#fff;box-shadow:0 16px 30px -16px rgba(70,80,92,.55)}
.x06 .btn.s{background:${MILK};color:${INK};box-shadow:0 16px 30px -18px rgba(70,80,92,.35)}

.x06 .sc{position:absolute;top:372px;width:220px;height:340px;border-radius:40px;overflow:hidden;box-shadow:0 26px 44px -30px rgba(70,80,92,.5)}
.x06 .sc>svg{position:absolute;left:0;top:0}
.x06 .sc b{position:absolute;left:28px;bottom:58px;font-weight:400;font-size:24px;letter-spacing:.12em}
.x06 .sc em{position:absolute;left:28px;bottom:30px;font-style:normal;font-size:15px;letter-spacing:.08em;opacity:.72}
.x06 .sc em .n{font-size:18px;margin-right:2px}
.x06 .sc u{position:absolute;right:22px;bottom:26px;width:52px;height:52px;border-radius:50%;background:${MILK};display:grid;place-items:center;box-shadow:0 12px 22px -12px rgba(70,80,92,.45)}

/* 半山咖啡 */
.x06 .cf-w{display:flex;flex-direction:column;align-items:center;gap:6px}
.x06 .cf-w b{font-weight:400;font-size:22px;letter-spacing:.3em;padding-left:.3em}
.x06 .cf-w em{font:600 10px/1 "Nunito",sans-serif;font-style:normal;letter-spacing:.42em;padding-left:.42em;color:${MUTE}}
.x06 .cf-t{position:absolute;left:0;right:0;text-align:center}
.x06 .cf-t .k{font-size:13px;letter-spacing:.24em;padding-left:.24em;color:${MUTE}}
.x06 .cf-t h2{margin-top:8px;font-weight:400;font-size:32px;letter-spacing:.14em;padding-left:.14em;line-height:1.2}
.x06 .cf-t .pr{margin-top:6px;font-size:16px}
.x06 .cf-t .pr .n{font-size:28px;font-weight:300}
.x06 .cf-t .lo{margin-top:14px;font-size:14px;letter-spacing:.04em;color:${MUTE}}
.x06 .cf-b{position:absolute;left:87px;width:201px}
.x06 .pts{position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:baseline;gap:10px;font-size:14px;color:${MUTE};letter-spacing:.08em}
.x06 .pts .n{font-size:24px;font-weight:400;color:${INK};letter-spacing:.02em}
`;

// ---------- 主图：今晚的助眠声音 ----------
const HERO_WAVE = 'M0 46C60 18 120 14 190 34C254 52 312 40 375 22V420H0Z';
const hero = `<div class="scr x06" style="background:${BLUE}">${statusBar()}
<div class="hd">${wordmark(26, 19)}</div>
${dot(52, 132, 5)}${dot(318, 118, 4)}${dot(338, 262, 6, MILK, .7)}${dot(30, 300, 4, MILK, .7)}
<div class="disc" style="left:52px;top:150px;width:271px;height:271px;background:${PINK}"></div>
${wave(375, 420, OAT, HERO_WAVE)}
<div class="ab soft" style="left:47px;top:330px">${pillow(280)}</div>
<div class="ttl" style="top:500px"><h1>枕云而眠</h1><p><span class="n">45</span>分钟</p></div>
<div class="side" style="left:86px;top:612px">${icon('rotate-ccw', 26, 1.6)}<span>15</span></div>
<div class="pl" style="top:597px">${play(28)}</div>
<div class="side" style="left:245px;top:612px">${icon('rotate-cw', 26, 1.6)}<span>15</span></div>
${tabs(APP_TABS, 0)}${homeBar()}</div>`;

// ---------- b1：呼吸练习（一颗慢慢变大的圆） ----------
const b1 = `<div class="scr x06">${statusBar()}
<div class="top"><span class="x">${icon('x', 18, 1.8)}</span><b>睡前呼吸</b></div>
<div class="disc" style="left:17px;top:166px;width:341px;height:341px;background:${BLUE};opacity:.28"></div>
<div class="disc" style="left:47px;top:196px;width:281px;height:281px;background:${BLUE};opacity:.5"></div>
<div class="disc" style="left:82px;top:231px;width:211px;height:211px;background:${BLUE}"></div>
<div class="in" style="top:320px">吸气</div>
<div class="sec" style="top:556px"><span class="n">4</span>秒</div>
<div class="dots" style="top:630px"><i class="d"></i><i class="d"></i><i class="c"></i><i></i><i></i><i></i></div>
${wave(375, 150, PINK, 'M0 70C70 40 140 38 210 58C270 74 320 70 375 52V150H0Z')}
<div class="pz" style="top:698px">${icon('pause', 22, 1.8)}</div>
${homeBar()}</div>`;

// ---------- b2：睡眠报告（三条泳道的睡眠阶段条 + 色块图例） ----------
// 23:04 上床 → 06:30 起床，共 446 分钟：清醒 14 + 浅睡 326（5 小时 26 分）+ 深睡 106（1 小时 46 分）；睡着 7 小时 12 分
const DEEP = BTN, LIGHT = BLUE, AWAKE = '#DDB5AA';
const STG = [[0, 14, 0], [14, 44, 1], [44, 100, 2], [100, 184, 1], [184, 214, 2], [214, 310, 1], [310, 330, 2], [330, 446, 1]];
const hyp = (() => {
  const x0 = 28, W = 319, k = W / 446, lane = [26, 86, 146], h = 30, col = [AWAKE, LIGHT, DEEP];
  let link = '', bars = '';
  STG.forEach(([a, b, l], i) => {
    let x = x0 + a * k, w = (b - a) * k;
    if (w < h) { x -= (h - w) / 2; w = h; }
    bars += `<rect x="${x.toFixed(1)}" y="${lane[l] - h / 2}" width="${w.toFixed(1)}" height="${h}" rx="${h / 2}" fill="${col[l]}"/>`;
    if (i) { const p = STG[i - 1][2], xx = (x0 + a * k).toFixed(1); link += `<path d="M${xx} ${Math.min(lane[p], lane[l])}V${Math.max(lane[p], lane[l])}" stroke="${INK}" stroke-opacity=".14" stroke-width="2" stroke-linecap="round"/>`; }
  });
  const grid = lane.map((y) => `<path d="M${x0} ${y}H${x0 + W}" stroke="${INK}" stroke-opacity=".06" stroke-width="${h}" stroke-linecap="round"/>`).join('');
  return `<svg style="position:absolute;left:0;top:226px" width="375" height="176" viewBox="0 0 375 176">${grid}${link}${bars}</svg>`;
})();
const b2 = `<div class="scr x06">${statusBar()}
<div class="rp-h"><div class="d">10 月 28 日 · 周三</div><div class="s">昨晚睡了</div>
<div class="big"><span class="n">7</span><u>小时</u><span class="n">12</span><u>分</u></div></div>
<div class="ab" style="left:262px;top:84px">${cloud(84, PINK)}</div>
${hyp}
<div class="axis" style="top:414px"><span class="n">23:04</span><span class="n">03:00</span><span class="n">06:30</span></div>
<div class="lg" style="top:470px">
<div><i style="background:${DEEP}"></i>深睡<p><span class="n">1</span>小时<span class="n">46</span>分</p></div>
<div><i style="background:${LIGHT}"></i>浅睡<p><span class="n">5</span>小时<span class="n">26</span>分</p></div>
<div><i style="background:${AWAKE}"></i>清醒<p><span class="n">14</span>分</p></div></div>
${tabs(APP_TABS, 2)}${homeBar()}</div>`;

// ---------- 网页：声音场景（居中三张大圆角卡，每张一幅平涂小景；样例区里两台手机压在两侧，三张都露全） ----------
const rain = (x, y) => `<path d="M${x} ${y}l-6 16" stroke="${MILK}" stroke-opacity=".85" stroke-width="5" stroke-linecap="round"/>`;
const SCENES = [
  ['枕云而眠', 45, PINK, INK, `<circle cx="178" cy="78" r="30" fill="${OAT}"/><circle cx="192" cy="68" r="27" fill="${PINK}"/><g transform="translate(34 96)">${pillow(186).replace('<svg ', '<svg x="0" y="0" ')}</g>`],
  ['雨落竹林', 30, BLUE, INK, `<path d="M-10 214C50 168 110 160 170 186S240 200 270 178V340H-10Z" fill="${OAT}" fill-opacity=".9"/><path d="M-10 236C70 206 150 210 270 228V340H-10Z" fill="${MILK}"/>${[[60, 40], [104, 72], [150, 34], [196, 64], [82, 112], [170, 116], [216, 128], [40, 142], [128, 150]].map(([x, y]) => rain(x, y)).join('')}`],
  ['夏夜虫鸣', 40, BTN, MILK, `<defs><mask id="x06wm"><rect width="254" height="340" fill="#fff"/><circle cx="186" cy="66" r="34" fill="#000"/></mask></defs><circle cx="166" cy="84" r="40" fill="${MILK}" mask="url(#x06wm)"/><circle cx="60" cy="62" r="4" fill="${MILK}"/><circle cx="96" cy="120" r="3" fill="${MILK}" opacity=".7"/><circle cx="214" cy="150" r="3.5" fill="${MILK}" opacity=".8"/><circle cx="40" cy="160" r="3" fill="${MILK}" opacity=".6"/><path d="M-10 226C50 196 110 194 160 212S230 222 270 204V340H-10Z" fill="#596A7C"/>`],
];
const web = `<div class="x06 web" style="position:relative;width:1280px;height:800px;overflow:hidden;background:${OAT}">
<div class="nav">${wordmark(34, 24)}<nav><span>声音</span><span>呼吸</span><span>睡眠报告</span><span>会员</span><span class="btn p" style="height:46px;padding:0 24px;font-size:16px">下载 App</span></nav></div>
<div class="ab" style="left:1010px;top:150px">${cloud(130, MILK)}</div><div class="ab" style="left:150px;top:200px">${cloud(92, PINK)}</div>
${dot(300, 140, 7, BLUE, 1)}${dot(960, 300, 6, PINK, 1)}
<div style="position:absolute;left:0;right:0;top:132px;text-align:center"><h1 style="font-weight:400;font-size:56px;line-height:1.2;letter-spacing:.14em;padding-left:.14em">今晚想听点什么</h1>
<div style="display:flex;gap:16px;justify-content:center;margin-top:36px"><span class="btn p" style="height:60px;padding:0 34px;font-size:18px">免费试用 7 天</span><span class="btn s" style="height:60px;padding:0 34px;font-size:18px">${play(16, INK)}随便听听</span></div></div>
${SCENES.map(([t, m, bg, fg, art], i) => `<div class="sc" style="left:${288 + i * 242}px;background:${bg};color:${fg}"><svg width="220" height="340" viewBox="0 0 254 340" preserveAspectRatio="xMidYMid slice">${art}</svg><b>${t}</b><em><span class="n">${m}</span>分钟</em><u>${play(18, BTN)}</u></div>`).join('')}
</div>`;

// ---------- 半山咖啡 ----------
const cfMark = `<svg width="34" height="20" viewBox="0 0 34 20" style="display:block"><path d="M1 19C5 10 10 5 16 5S25 11 33 19Z" fill="${BLUE}"/><circle cx="24" cy="6" r="3.6" fill="${PINK}"/></svg>`;
const cmp = `<div class="scr x06" style="background:${PINK}">${statusBar()}
<div class="hd" style="top:60px"><div class="cf-w">${cfMark}<b>半山咖啡</b><em>BANSHAN</em></div></div>
<div class="disc" style="left:71px;top:134px;width:233px;height:233px;background:${BLUE}"></div>
<div class="ab soft" style="left:73px;top:134px">${latte(230)}</div>
${wave(375, 452, OAT, 'M0 52C64 26 130 22 196 40C258 56 316 46 375 26V452H0Z')}
<div class="cf-t" style="top:410px"><div class="k">今日推荐</div><h2>桂花拿铁</h2><div class="pr">¥<span class="n">28</span></div>
<div class="lo">东四店 · 到店自取约 6 分钟</div></div>
<div class="cf-b" style="top:584px"><span class="btn p" style="width:100%;height:56px;font-size:17px">去点单</span></div>
<div class="pts" style="top:664px"><span>会员积分</span><span class="n">1,280</span></div>
${tabs([['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user-round', '我的']], 0)}${homeBar()}</div>`;

// 风格页舞台装饰：一个燕麦色大圆和一朵完整的云
const STAGE = 'linear-gradient(180deg,#C3D2E2 0%,#AEC0D4 100%)';
const decoA = `<div style="position:absolute;inset:0;pointer-events:none;overflow:hidden">
<div style="position:absolute;left:50%;top:50%;width:560px;height:560px;margin:-300px 0 0 -280px;border-radius:50%;background:${OAT};opacity:.5"></div>
<div style="position:absolute;left:454px;top:150px">${cloud(76, MILK, .95)}</div>
${dot(470, 96, 6, MILK, .9)}${dot(40, 120, 5, MILK, .8)}${dot(62, 760, 6, MILK, .7)}</div>`;

const stageBDeco = `<div style="position:absolute;right:-90px;top:-120px;width:420px;height:420px;border-radius:50%;background:${OAT};opacity:.45"></div>
<div style="position:absolute;right:40px;top:6px">${cloud(140, MILK, .9)}</div>`;

module.exports = {
  css,
  screens: { 's06-hero': hero, 's06-b1': b1, 's06-b2': b2, 's06-web': web, 's06-cmp': cmp },
  desktop: ['s06-web'],
  // 附录网页页放大区：标题和两个按钮
  zoom: [220, 96],
  // ①颜色：雾粉大圆 ②形状：云朵枕头 ③字体：标题右侧 ④节奏：右上大片留白
  marks: [[58, 250], [334, 410], [300, 522], [318, 188]],
  palette: [['燕麦', OAT], ['雾粉', PINK], ['雾蓝', BLUE], ['石板蓝', BTN], ['夜墨', INK]],
  type: { font: '"Chill Round"', weight: 400, sample: '眠 Aa', color: INK, lines: [['标题', '寒蝉全圆体'], ['正文', '寒蝉全圆体'], ['数字', 'Nunito 细体']] },
  stageA: STAGE,
  decoA,
  stageB: { bg: STAGE, color: INK, url: 'mianyun.com', deco: stageBDeco },
  page: (no) => stylePages(no, 's06-soft', module.exports),
};
