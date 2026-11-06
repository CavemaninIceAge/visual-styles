// 11 运动能量 Sport —— 疾风 GALE（城市跑团 App）
const { img, icon, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

const V = '#D0FF1A';     // 荧光黄绿
const BG = '#0B0B0B';    // 夜黑
const GR = '#8A8A8A';    // 中灰
const DV = '#2C3608';    // 暗荧绿：进度环、进度条的底槽

// 品牌记号：三道向后拖的风线
const wind = (h = 16, c = V) => `<svg width="${Math.round(h * 1.5)}" height="${h}" viewBox="0 0 24 16" style="display:block"><g fill="${c}" transform="skewX(-16)"><rect x="12" y="0.5" width="14" height="3.4"/><rect x="6" y="6.3" width="20" height="3.4"/><rect x="14" y="12.1" width="12" height="3.4"/></g></svg>`;
const wordmark = (s = 26, c = '#fff') => `<span class="wm">${wind(Math.round(s * .62))}<b style="font-size:${s}px;color:${c}">GALE</b></span>`;

// 速度模糊：只在水平方向模糊
const blurDef = `<svg width="0" height="0" style="position:absolute"><filter id="x11mb" x="-20%" y="0" width="140%" height="100%"><feGaussianBlur stdDeviation="18 0"/></filter><filter id="x11mb2" x="-20%" y="0" width="140%" height="100%"><feGaussianBlur stdDeviation="34 0"/></filter></svg>`;
// 高对比照片 + 两侧速度模糊
const photo = (name, { h, pos = 'center', size = 'cover', top = 0, dim = 0, side = 0, color = false } = {}) => `<div class="pz${color ? ' cl' : ''}" style="top:${top}px;height:${h}px">
<div class="ph" style="background-image:url(${img(name)});background-size:${size};background-position:${pos}"></div>
<div class="ph mb" style="background-image:url(${img(name)});background-size:${size};background-position:${pos}"></div>
${dim ? `<i style="position:absolute;inset:0;background:rgba(11,11,11,${dim})"></i>` : ''}${side ? `<i style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,11,11,${side}) 0%,rgba(11,11,11,0) 64%)"></i>` : ''}<i class="fade"></i></div>`;

// 进度环
const ring = (s, p, w = 10) => {
  const r = (s - w) / 2, c = 2 * Math.PI * r;
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="display:block;transform:rotate(-90deg)"><circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${DV}" stroke-width="${w}"/><circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${V}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}"/></svg>`;
};

// 路线图：深色街区 + 荧光路线
const routeMap = (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 200 116" preserveAspectRatio="xMidYMid slice" style="display:block">
<rect width="200" height="116" fill="#141414"/>
<g stroke="#232323" stroke-width="1.2" fill="none"><path d="M0 22H200M0 58H200M0 100H200M30 0V116M88 0V116M150 0V116M0 8L70 116M120 0L200 80"/></g>
<path d="M-4 74C30 60 52 70 84 56S140 30 204 40" stroke="#1D2628" stroke-width="9" fill="none"/>
<path d="M30 86C40 70 58 74 74 62S104 36 126 40S166 30 176 48S168 84 146 90S96 98 70 98S38 98 30 86Z" fill="none" stroke="${V}" stroke-width="3.4" stroke-linejoin="round"/>
<circle cx="30" cy="86" r="5" fill="#fff" stroke="#141414" stroke-width="2"/></svg>`;

const liveMap = (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 200 116" preserveAspectRatio="xMidYMid slice" style="display:block">
<rect width="200" height="116" fill="#141414"/>
<g stroke="#232323" stroke-width="1.2" fill="none"><path d="M0 22H200M0 58H200M0 100H200M30 0V116M88 0V116M150 0V116M0 8L70 116M120 0L200 80"/></g>
<path d="M-4 74C30 60 52 70 84 56S140 30 204 40" stroke="#1D2628" stroke-width="9" fill="none"/>
<path d="M30 86C40 70 58 74 74 62S104 36 126 40S158 30 166 42" fill="none" stroke="${V}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="30" cy="86" r="4" fill="#fff" stroke="#141414" stroke-width="2"/>
<circle cx="166" cy="42" r="11" fill="${V}" opacity=".18"/><circle cx="166" cy="42" r="5.4" fill="${V}" stroke="#141414" stroke-width="2"/></svg>`;

const tabs = (items, on) => `<div class="tab">${items.map(([ic, t], i) => `<div class="ti ${i === on ? 'on' : ''}">${icon(ic, 22, 2)}<span>${t}</span></div>`).join('')}</div>`;
const APP_TABS = [['house', '首页'], ['footprints', '跑步'], ['users', '跑团'], ['user', '我的']];

const css = `
.x11{background:${BG};color:#fff;font-family:"PingFang SC",sans-serif;-webkit-font-smoothing:antialiased}
.x11 .bc{font-family:"Barlow Condensed",sans-serif;font-weight:900;font-style:italic;letter-spacing:-.01em}
.x11 .sm{font-family:"Smiley Sans",sans-serif;font-weight:400}
.x11 .wm{display:inline-flex;align-items:center;gap:6px}
.x11 .wm b{font-family:"Barlow Condensed",sans-serif;font-weight:900;font-style:italic;letter-spacing:.02em;line-height:1}
.x11 .pz{position:absolute;left:0;right:0;overflow:hidden}
.x11 .ph{position:absolute;inset:0;filter:grayscale(1) contrast(1.75) brightness(.86)}
.x11 .ph.mb{filter:url(#x11mb) grayscale(1) contrast(1.75) brightness(.95);-webkit-mask-image:linear-gradient(90deg,#000 0%,rgba(0,0,0,.85) 18%,transparent 40%,transparent 62%,rgba(0,0,0,.85) 84%,#000 100%)}
/* 彩色版（半山咖啡）：不做黑白，高对比、压暗部、饱和略收；两侧拉出更长的速度拖影，中间杯子保持清楚 */
.x11 .pz.cl .ph{filter:saturate(.82) contrast(1.8) brightness(.8)}
.x11 .pz.cl .ph.mb{filter:url(#x11mb2) saturate(.82) contrast(1.8) brightness(.88);-webkit-mask-image:linear-gradient(90deg,#000 0%,rgba(0,0,0,.92) 14%,transparent 30%,transparent 76%,rgba(0,0,0,.92) 90%,#000 100%)}
.x11 .fade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,11,.6) 0%,rgba(11,11,11,0) 24%,rgba(11,11,11,0) 50%,${BG} 94%)}
.x11 .nv{position:absolute;top:52px;left:20px;right:20px;height:44px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.x11 .nv .ib{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center;color:#fff}
.x11 .lb{font-size:12px;color:${GR};letter-spacing:.06em}
.x11 .v{color:${V}}

/* 主图：跑后总结 */
.x11 .h-t{position:absolute;left:24px;right:24px}
.x11 .h-t h1{font-family:"Smiley Sans",sans-serif;font-weight:400;font-size:30px;line-height:1.1;letter-spacing:.02em}
.x11 .h-t p{margin-top:8px;font-size:13px;color:#A8A8A8;letter-spacing:.04em}
.x11 .huge{position:absolute;left:16px;font-size:174px;line-height:.8;color:${V};white-space:nowrap}
.x11 .unit{position:absolute;left:24px;font-family:"Smiley Sans",sans-serif;font-size:24px;letter-spacing:.06em}
.x11 .st{position:absolute;left:24px;right:24px;display:grid;grid-template-columns:1fr 1fr 1fr}
.x11 .st .bc{display:block;font-size:36px;line-height:1;margin-top:6px;font-weight:800}
.x11 .st small{font-size:13px;color:${GR};margin-left:3px;font-style:normal;font-family:"PingFang SC"}
.x11 .mapc{position:absolute;border-radius:10px;overflow:hidden}
.x11 .rg{position:absolute}
.x11 .rg .in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.x11 .rg .in .bc{font-size:30px;line-height:1}
.x11 .rg .in span{font-size:10px;color:${GR};margin-top:3px;letter-spacing:.06em}

/* b1 正在跑 */
.x11 .tm{position:absolute;left:14px;font-size:164px;line-height:.8;white-space:nowrap}
.x11 .two{position:absolute;left:24px;right:24px;display:grid;grid-template-columns:118px 124px 1fr}
.x11 .two .bc{display:block;font-size:52px;line-height:.86;margin-top:8px}
.x11 .two small{font-size:13px;color:${GR};margin-left:3px;font-style:normal;font-family:"PingFang SC";font-weight:400}
.x11 .seg{position:absolute;left:24px;right:24px;display:flex;gap:4px}
.x11 .seg i{flex:1;height:6px;background:${DV};transform:skewX(-20deg)}
.x11 .seg i.f{background:${V}}
.x11 .ctl{position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:40px}
.x11 .cb{width:60px;height:60px;border-radius:50%;background:#1C1C1C;display:grid;place-items:center;color:#fff}
.x11 .go{width:96px;height:96px;border-radius:50%;background:${V};display:grid;place-items:center;color:${BG}}

/* b2 挑战排行 */
.x11 .ch{position:absolute;left:24px;right:24px}
.x11 .ch h2{font-family:"Smiley Sans",sans-serif;font-weight:400;font-size:44px;line-height:1}
.x11 .ch p{margin-top:10px;font-size:14px;color:#A8A8A8}
.x11 .me{position:absolute;left:24px;right:24px;display:flex;align-items:baseline;gap:8px}
.x11 .me .bc{font-size:92px;line-height:.8;color:${V}}
.x11 .me span{font-size:15px;color:#cfcfcf}
.x11 .bar{position:absolute;left:24px;right:24px;height:8px;background:${DV};transform:skewX(-20deg)}
.x11 .bar i{position:absolute;left:0;top:0;bottom:0;background:${V}}
.x11 .lst{position:absolute;left:24px;right:24px}
.x11 .row{display:grid;grid-template-columns:34px 40px 1fr auto;align-items:center;gap:12px;height:58px;border-top:1px solid #1E1E1E}
.x11 .row .rk{font-size:26px;line-height:1;color:#6E6E6E}
.x11 .row .av{width:40px;height:40px;border-radius:50%;background:#1E1E1E;color:#E6E6E6;display:grid;place-items:center;font-family:"Smiley Sans",sans-serif;font-size:19px;line-height:1}
.x11 .row.mine .av{background:${V};color:${BG}}
.x11 .row b{font-size:16px;font-weight:500}
.x11 .row .km{font-size:28px;line-height:1;font-weight:800}
.x11 .row .km small{font-size:12px;color:${GR};font-family:"PingFang SC";font-style:normal;margin-left:3px;font-weight:400}
.x11 .row.mine .rk,.x11 .row.mine .km{color:${V}}
.x11 .tab{position:absolute;left:0;right:0;bottom:0;height:86px;background:${BG};border-top:1px solid #1E1E1E;display:flex;justify-content:space-around;padding-top:10px;z-index:6}
.x11 .ti{display:flex;flex-direction:column;align-items:center;gap:4px;color:#5E5E5E;width:64px}
.x11 .ti span{font-size:11px;font-weight:500}
.x11 .ti.on{color:#fff}

/* 斜切按钮 */
.x11 .sk{display:inline-flex;align-items:center;justify-content:center;background:${V};color:${BG};transform:skewX(-12deg);font-family:"Smiley Sans",sans-serif;white-space:nowrap}
.x11 .sk > span{transform:skewX(12deg);display:inline-flex;align-items:center;gap:10px}

/* 网页 */
.x11.web .ph{filter:grayscale(1) contrast(1.6) brightness(.8)}
.x11.web .ph.mb{filter:url(#x11mb) grayscale(1) contrast(1.6) brightness(.85)}
.x11 .wnav{position:absolute;top:34px;left:64px;right:64px;height:56px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.x11 .wnav nav{display:flex;align-items:center;gap:40px;font-size:17px;color:#E6E6E6}
/* 标题组放在右半边：参考页里两台手机压在电脑左下、右下，标题组落在中间不被挡 */
.x11 .wh{position:absolute;left:556px;top:140px}
.x11 .wh h1{font-family:"Smiley Sans",sans-serif;font-weight:400;font-size:108px;line-height:1.04;letter-spacing:.01em}
.x11 .wh p{margin-top:20px;font-size:20px;color:#CFCFCF;letter-spacing:.04em}
.x11 .wst{position:absolute;left:556px;right:64px;bottom:52px;display:flex;gap:40px;border-top:1px solid rgba(255,255,255,.18);padding-top:22px}
.x11 .wst .bc{display:block;font-size:56px;line-height:.9;color:${V}}
.x11 .wst span{font-size:15px;color:#A8A8A8;margin-top:6px;display:block}

/* 半山咖啡 */
.x11 .cfw{display:flex;align-items:center;gap:8px}
.x11 .cfw b{font-family:"Smiley Sans",sans-serif;font-weight:400;font-size:24px;letter-spacing:.04em}
.x11 .cfw em{font-family:"Barlow Condensed";font-weight:800;font-style:italic;font-size:15px;letter-spacing:.12em;color:${GR};margin-left:2px}
.x11 .cft{position:absolute;left:24px;right:24px}
.x11 .cft .k{font-size:13px;color:#A8A8A8;letter-spacing:.12em}
.x11 .cft h2{margin-top:8px;font-family:"Smiley Sans",sans-serif;font-weight:400;font-size:48px;line-height:1}
.x11 .price{position:absolute;left:18px;display:flex;align-items:flex-start;color:${V};white-space:nowrap}
.x11 .price i{font-family:"Barlow Condensed";font-weight:900;font-style:italic;font-size:44px;line-height:1;margin-top:10px;margin-right:4px}
.x11 .price .bc{font-size:132px;line-height:.8}
.x11 .info{position:absolute;left:24px;font-size:14px;color:#BDBDBD;letter-spacing:.04em}
.x11 .pts{position:absolute;left:24px;right:24px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #1E1E1E;padding-top:14px}
.x11 .pts .bc{font-size:34px;line-height:1;font-weight:800}
`;

// ---------- 主图：跑后总结 ----------
const hero = `<div class="scr x11">${blurDef}
${photo('runner-wet-road-dusk', { h: 400, size: 'auto 150%', pos: '50% 30%' })}
${statusBar(true)}
<div class="nv"><span class="ib">${icon('chevron-left', 22, 2)}</span>${wordmark(24)}<span class="ib">${icon('ellipsis', 20, 2)}</span></div>
<div class="h-t" style="top:246px"><h1>亮马河夜跑</h1><p>10月27日 周二 · 20:36</p></div>
<div class="huge bc" style="top:318px">10.42</div>
<div class="unit" style="top:462px">公里</div>
<div class="st" style="top:506px"><div><span class="lb">配速</span><span class="bc">5'12"</span></div><div><span class="lb">用时</span><span class="bc">54:11</span></div><div><span class="lb">心率</span><span class="bc">156<small>次/分</small></span></div></div>
<div class="mapc" style="left:24px;top:584px;width:208px;height:104px">${routeMap(208, 104)}</div>
<div class="rg" style="left:252px;top:582px;width:106px;height:106px">${ring(106, .864, 10)}<div class="in"><span style="margin:0 0 2px">十月</span><b class="bc">86.4</b><span>/ 100 公里</span></div></div>
<div style="position:absolute;left:30px;right:30px;top:714px"><span class="sk" style="width:100%;height:56px;font-size:22px"><span>${icon('share', 20, 2.4)}分享成绩</span></span></div>
${homeBar(true)}</div>`;

// ---------- b1：正在跑 ----------
const b1 = `<div class="scr x11">${statusBar(true)}
<div class="nv"><span class="ib">${icon('lock', 18, 2)}</span><span style="font-size:15px;font-weight:500">亮马河夜跑</span><span class="ib">${icon('music', 18, 2)}</span></div>
<div class="lb" style="position:absolute;left:24px;top:128px">用时</div>
<div class="tm bc" style="top:152px">32:08</div>
<div class="two" style="top:318px"><div><span class="lb">公里</span><span class="bc v">6.17</span></div><div><span class="lb">配速</span><span class="bc">5'12"</span></div><div><span class="lb">心率</span><span class="bc">152</span></div></div>
<div class="seg" style="top:414px">${Array.from({ length: 10 }, (_, i) => `<i class="${i < 6 ? 'f' : ''}"></i>`).join('')}</div>
<div class="mapc" style="left:24px;right:24px;top:446px;height:204px">${liveMap(327, 204)}</div>
<div class="ctl" style="top:680px"><span class="cb">${icon('square', 20, 2.4)}</span><span class="go">${icon('pause', 36, 2.6)}</span><span class="cb">${icon('map-pin', 20, 2.2)}</span></div>
${homeBar(true)}</div>`;

// ---------- b2：十月挑战 + 跑团排行 ----------
const people = [['1', '江', '江屿', '132.6'], ['2', '宋', '宋知夏', '121.8'], ['3', '何', '何默', '109.5'], ['6', '我', '我', '86.4', 1]];
const b2 = `<div class="scr x11">${blurDef}
${photo('track-aerial-runners', { h: 300, size: 'auto 160%', pos: '62% 50%', dim: .25, side: .8 })}
${statusBar(true)}
<div class="ch" style="top:172px"><h2>十月挑战</h2><p>100 公里 · 还剩 3 天</p></div>
<div class="me" style="top:290px"><span class="bc">86.4</span><span>/ 100 公里</span></div>
<div class="bar" style="top:386px"><i style="width:86.4%"></i></div>
<div class="lb" style="position:absolute;left:24px;top:428px">跑团排行</div>
<div class="lst" style="top:452px">${people.map(([r, p, n, k, m]) => `<div class="row ${m ? 'mine' : ''}"><span class="rk bc">${r}</span><span class="av">${p}</span><b>${n}</b><span class="km bc">${k}<small>公里</small></span></div>`).join('')}</div>
${tabs(APP_TABS, 2)}${homeBar(true)}</div>`;

// ---------- 网页：跑团官网首屏 ----------
const web = `<div class="x11 web" style="position:relative;width:1280px;height:800px;overflow:hidden">${blurDef}
<div class="pz" style="top:0;height:800px"><div class="ph" style="background-image:url(${img('runners-sunset')});background-size:1700px auto;background-position:-560px -40px"></div>
<div class="ph mb" style="background-image:url(${img('runners-sunset')});background-size:1700px auto;background-position:-560px -40px"></div>
<i style="position:absolute;inset:0;background:linear-gradient(270deg,rgba(11,11,11,.94) 0%,rgba(11,11,11,.78) 40%,rgba(11,11,11,0) 63%),linear-gradient(180deg,rgba(11,11,11,.5) 0%,rgba(11,11,11,0) 18%,rgba(11,11,11,0) 62%,rgba(11,11,11,.9) 100%)"></i></div>
<div class="wnav">${wordmark(34)}<nav><span>夜跑</span><span>训练营</span><span>赛事</span><span>跑团故事</span><span class="sk" style="height:46px;padding:0 26px;font-size:18px"><span>加入跑团</span></span></nav></div>
<div class="wh"><h1>周二夜跑<br>亮马河见</h1><p>11月3日 周二 20:30 · 燕莎桥集合 · 10 公里</p>
<div style="margin-top:30px"><span class="sk" style="height:60px;padding:0 40px;font-size:22px"><span>报名周二夜跑${icon('arrow-right', 22, 2.4)}</span></span></div></div>
<div class="wst"><div><b class="bc">3,286</b><span>跑团成员</span></div><div><b class="bc">41,280</b><span>十月累计公里</span></div><div><b class="bc">6</b><span>每周场次</span></div></div>
</div>`;

// ---------- 半山咖啡 ----------
const cmp = `<div class="scr x11">${blurDef}
${photo('latte-pour', { h: 400, size: 'auto 132%', pos: '46% 30%', color: true })}
${statusBar(true)}
<div class="nv" style="justify-content:flex-start;left:24px"><span class="cfw">${wind(14)}<b>半山咖啡</b><em>BANSHAN</em></span></div>
<div class="cft" style="top:296px"><div class="k">今日推荐</div><h2>桂花拿铁</h2></div>
<div class="price" style="top:376px"><i>¥</i><span class="bc">28</span></div>
<div class="info" style="top:496px">东四店 · 到店自取约 6 分钟</div>
<div style="position:absolute;left:30px;right:30px;top:536px"><span class="sk" style="width:100%;height:58px;font-size:22px"><span>去点单</span></span></div>
<div class="pts" style="top:628px"><span class="lb" style="font-size:13px">会员积分</span><span class="bc">1,280</span></div>
${tabs([['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user', '我的']], 0)}${homeBar(true)}</div>`;

// 字标的三道风线放大，横穿舞台
const gust = (w, y, h = 34, gap = 22, starts = [70, 0, 110], op = 1) => `<svg style="position:absolute;left:0;top:${y}px;opacity:${op}" width="${w}" height="${h * 3 + gap * 2}" viewBox="0 0 ${w} ${h * 3 + gap * 2}">${starts.map((x, i) => `<path d="M${x + h * .3} ${i * (h + gap)}H${w + 60}L${w + 60 - h * .3} ${i * (h + gap) + h}H${x}Z" fill="${BG}"/>`).join('')}</svg>`;

module.exports = {
  css,
  screens: { 's11-hero': hero, 's11-b1': b1, 's11-b2': b2, 's11-web': web, 's11-cmp': cmp },
  desktop: ['s11-web'],
  marks: [[350, 714], [356, 314], [334, 160], [238, 600]],
  // 附录放大区：两行标题、时间地点、报名按钮整组
  zoom: [346, 122],
  palette: [['夜黑', BG], ['荧光黄绿', V], ['暗荧绿', DV], ['中灰', GR], ['白', '#FFFFFF']],
  type: { font: '"Barlow Condensed","Smiley Sans"', weight: 900, style: 'font-style:italic;', sample: '疾 42', lines: [['标题', '得意黑'], ['正文', '苹方'], ['数字', 'Barlow 窄体']] },
  stageA: V,
  decoA: gust(540, 96, 64, 34, [150, 40, 230], .08),
  // 参考页用默认摆法（电脑居中在后，两台手机压在左右下角），和其他参考页同一个位置；底部保留斜条纹
  stageB: { bg: V, color: BG, url: 'galerun.cn', deco: gust(936, 650, 30, 20, [40, -10, 90]) },
  page: (no) => stylePages(no, 's11-sport', module.exports),
};
