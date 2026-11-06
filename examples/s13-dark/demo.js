// 子午 ZIWU 新能源车车控（App + 车主网页）—— 风格 s13-dark 暗夜科技试跑
// 今天 11-06 周五，状态栏 9:41：车主把 子午 Z6（京A·DK0000）停在望京站 3 号桩，09:24 开始快充，31% → 现在 76%，目标 90%，预计 09:49 充完
// 电池 82 kWh：(76-31)% × 82 = 36.9 kWh；¥1.18/kWh → ¥43.54；76% 对应 418 km，90% 对应 495 km
// 近 30 天 6 次：36.9 + 41.6 + 52.3 + 44.8 + 38.2 + 47.5 = 261.3 kWh，快充 ¥1.18、家用桩 ¥0.49，合计 ¥222.35，平均 ¥0.85/kWh
module.exports = ({ img, icon, statusBar, homeBar, style }) => {
  const S = style('s13-dark');
  const { ui } = S;
  const TABS = [['car-front', '车况'], ['route', '行程'], ['zap', '充电'], ['user-round', '我的']];

  // 车模：侧面。图库没有车的照片，手画。每次调用换一组 id，免得可点击演示里隐藏层的渐变被引用到。勾边和地面光走 var(--a)，换主色时跟着变
  let uid = 0;
  const BODY = 'M40 264C24 262 14 250 12 232C10 214 12 196 22 178C28 168 44 160 72 152C130 136 214 124 296 104C344 92 400 44 492 18C540 7 610 6 662 14C740 28 810 62 872 96C900 110 930 116 958 120C972 122 982 128 984 142C986 166 984 200 976 232C972 254 960 264 940 264L861 264A84 84 0 1 0 711 264L261 264A84 84 0 1 0 111 264Z';
  const TOP = 'M26 172C32 165 46 159 72 152C130 136 214 124 296 104C344 92 400 44 492 18C540 7 610 6 662 14C740 28 810 62 872 96C900 110 930 116 958 120';
  const GLASS = 'M352 104C392 76 440 46 504 31C550 22 612 21 656 27C716 36 770 60 826 98C790 102 740 104 690 104L352 110Z';
  const wheel = (cx, cy, u) => {
    const sp = Array.from({ length: 5 }, (_, i) => `<g transform="rotate(${i * 72 + 12})"><path d="M-2.4 -13L-8 -50L-1.6 -50L-.6 -13Z" fill="url(#${u}sp)"/><path d="M.6 -13L1.6 -50L8 -50L2.4 -13Z" fill="url(#${u}sp)"/></g>`).join('');
    return `<g transform="translate(${cx} ${cy})"><circle r="68" fill="#050608" stroke="rgba(255,255,255,.1)"/><circle r="60" fill="none" stroke="rgba(255,255,255,.05)"/><circle r="52" fill="url(#${u}rim)" stroke="rgba(255,255,255,.26)" stroke-width="1.2"/>${sp}<circle r="14" fill="#15181D" stroke="rgba(255,255,255,.24)"/><circle r="4" fill="#9399A4"/></g>`;
  };
  const car = (w = 335) => {
    const u = 'c' + (++uid);
    return `<svg width="${w}" height="${Math.round(w * .3)}" viewBox="0 0 1000 300" style="display:block;overflow:visible"><defs>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3F4651"/><stop offset=".34" stop-color="#262A33"/><stop offset=".58" stop-color="#15181D"/><stop offset="1" stop-color="#0B0D10"/></linearGradient>
<linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A3644"/><stop offset=".5" stop-color="#0D1016"/><stop offset="1" stop-color="#07090C"/></linearGradient>
<linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--a)" stop-opacity=".1"/><stop offset=".3" stop-color="var(--a)"/><stop offset=".55" stop-color="#fff"/><stop offset=".8" stop-color="var(--a)" stop-opacity=".7"/><stop offset="1" stop-color="var(--a)" stop-opacity="0"/></linearGradient>
<linearGradient id="${u}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".24" stop-color="#fff" stop-opacity=".1"/><stop offset=".52" stop-color="#fff" stop-opacity=".34"/><stop offset=".8" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="${u}sp" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2A2E36"/><stop offset="1" stop-color="#6A717D"/></linearGradient>
<radialGradient id="${u}rim"><stop offset="0" stop-color="#1A1D23"/><stop offset="1" stop-color="#0B0D10"/></radialGradient>
<filter id="${u}f" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="${u}f2" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="2"/></filter>
<filter id="${u}f4" x="-5%" y="-100%" width="110%" height="300%"><feGaussianBlur stdDeviation="1.6"/></filter>
<filter id="${u}f3" x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="14"/></filter>
<clipPath id="${u}c"><path d="${BODY}"/></clipPath><clipPath id="${u}cg"><path d="${GLASS}"/></clipPath></defs>
<ellipse cx="500" cy="294" rx="480" ry="9" fill="#000" filter="url(#${u}f)"/>
<rect x="130" y="196" width="720" height="74" rx="8" fill="#040506"/>
<path d="${BODY}" fill="url(#${u}b)" stroke="rgba(255,255,255,.12)"/>
<g clip-path="url(#${u}c)">
<path d="M60 182C300 152 640 141 960 146C640 148 300 160 60 192Z" fill="url(#${u}s)" filter="url(#${u}f4)"/><path d="M40 196C300 164 640 150 972 152" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1.4"/>
<ellipse cx="490" cy="276" rx="430" ry="30" fill="var(--a)" opacity=".34" filter="url(#${u}f3)"/>
<path d="M262 244L710 244" stroke="rgba(255,255,255,.09)" stroke-width="1.2"/>
<path d="M14 234C60 236 96 240 112 248L108 266L30 266Z" fill="rgba(0,0,0,.6)"/>
<path d="M862 244C900 238 950 234 984 226L984 266L862 266Z" fill="rgba(0,0,0,.55)"/>
</g>
<path d="M261 264A84 84 0 1 0 111 264M861 264A84 84 0 1 0 711 264" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="1.2"/>
<path d="${GLASS}" fill="url(#${u}g)" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
<g clip-path="url(#${u}cg)"><path d="M530 20L610 20L540 112L440 112Z" fill="rgba(255,255,255,.045)"/></g>
<path d="M592 24L596 104" stroke="#0A0C10" stroke-width="7"/>
<path d="M366 100C354 94 340 95 335 102C333 108 344 113 360 111Z" fill="#1A1D23" stroke="rgba(255,255,255,.22)"/>
<path d="M352 114C338 160 336 210 342 262M596 106C600 160 602 210 600 262M748 104C744 140 730 168 716 192" fill="none" stroke="rgba(0,0,0,.62)" stroke-width="1.6"/>
<rect x="528" y="126" width="46" height="5" rx="2.5" fill="rgba(255,255,255,.22)"/><rect x="694" y="124" width="40" height="5" rx="2.5" fill="rgba(255,255,255,.22)"/>
${wheel(186, 226, u)}${wheel(786, 226, u)}
<path d="${TOP}" fill="none" stroke="url(#${u}r)" stroke-width="7" filter="url(#${u}f)" opacity=".85"/>
<path d="${TOP}" fill="none" stroke="url(#${u}r)" stroke-width="1.8"/>
<path d="M30 176C52 164 92 154 134 148" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="7" filter="url(#${u}f2)"/>
<path d="M30 176C52 164 92 154 134 148" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
<path d="M902 128L978 134" fill="none" stroke="var(--a)" stroke-width="6" filter="url(#${u}f2)"/>
<path d="M902 128L978 134" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
<circle cx="880" cy="150" r="9" fill="var(--a)" opacity=".55" filter="url(#${u}f2)"/><circle cx="880" cy="150" r="3" fill="#fff"/>
</svg>`;
  };
  // 充电功率曲线：09:24 起步，142 kW 峰值，现在 108 kW，到 90% 时掉到 70 kW 左右
  const power = (n) => Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const v = t < .05 ? .3 + t * 13 : t < .3 ? .96 : .96 - (t - .3) * .86;
    return +(v + Math.sin(i * 1.7) * .018).toFixed(3);
  });
  const css = `
.p.home .meta{margin-top:16px}
.p.home .v-plinth{margin:36px 0 0 10px}
.p.home .v-ctls{gap:0;justify-content:space-between;margin:66px 26px 0}
.p.home .v-panel{margin:28px 16px 0;padding:14px 16px 14px}
.p.home .top{display:flex;align-items:center;justify-content:space-between}
.p.home .v-ticks{margin-top:10px}
.p.home .v-stats{margin:30px 20px 0}
.p.ac .v-dial{margin-top:10px}
.p.ac .v-dial .v-big{margin:0 0 0 14px;font-size:64px;line-height:74px}
.p.ac .v-dial .v-mut{margin-top:4px;font-size:13px}
.p.ac .v-list{margin:14px 20px 0}
.p.ac .v-ctls{position:absolute;left:0;right:0;top:690px}
.p.ch .meta{margin-top:10px}
.p.ch .v-panel{margin:14px 16px 0;padding:22px 16px 16px}
.p.ch .v-stats{margin-top:14px;padding-top:14px;border-top:1px solid var(--ln)}
.p.ch .v-list{margin:14px 20px 0}
.p.ch .act{position:absolute;left:20px;right:20px;top:716px}
.p.web .bd{position:absolute;left:48px;right:48px;top:92px}
.p.web .bd .v-live{margin-top:14px;font-size:17px}
.p.web .carw{position:absolute;right:30px;top:112px}
.p.web .v-wplay{position:absolute;left:0;right:0;top:232px}
.p.web .v-stats{position:absolute;left:0;right:0;top:344px}
.p.web .v-list{position:absolute;left:0;right:0;top:446px}
.p.web .v-tag{height:34px}
`;
  const home = `<div class="scr s13 p home">${ui.glow('soft')}${statusBar(S.dark)}
${ui.nav({ back: false, left: ui.logo('子午', 'ZIWU', 'meridian'), right: ui.icons(['bell', 'ellipsis']) })}
<div class="v-pad"><p class="meta v-mut"><span class="v-num">Z6</span> 长续航 · <span class="v-num">京A·DK0000</span></p>
${ui.sum({ big: '418', unit: 'km', side: '76%' })}</div>
${ui.plinth(car(355), { h: 106 })}
<div class="v-ctls">${ui.ctl('lock', { label: '已上锁' })}${ui.ctl('fan', { on: true, label: '空调 22°', attrs: 'data-go="ac"' })}${ui.ctl('package-open', { label: '后备箱' })}${ui.ctl('locate', { label: '寻车' })}</div>
${ui.panel(`<div class="top">${ui.live('充电中')}<span class="v-mut">还需 <span class="v-num">00:08</span></span></div>${ui.ticks({ n: 60, at: .76, mark: .9, h: 14 })}`, { amb: false, attrs: 'data-go="ch"' })}
${ui.stats([['18.5°', '', '车内'], ['2.5', 'bar', '胎压'], ['12,846', 'km', '总里程']])}
${ui.tabs(TABS, 0, [null, null, 'ch', null])}${homeBar(S.dark)}</div>`;

  const ac = `<div class="scr s13 p ac">${ui.glow('mid', 'top:30px')}${statusBar(S.dark)}
${ui.nav({ back: 'down', title: ui.live('空调运行中'), right: ui.icons(['ellipsis']) })}
${ui.dial({ d: 280, at: .5, now: .21, lo: '16°', hi: '28°', inner: `<div class="v-big">22.0°</div><p class="v-mut">车内 <span class="v-num">18.5°</span> · 车外 <span class="v-num">6°</span></p>` })}
<div class="v-list">${ui.kv('风量', '3', '档', { ic: 'fan' })}${ui.kv('主驾座椅', '2', '档', { ic: 'armchair' })}${ui.kv('副驾座椅', '关', '', { ic: 'armchair' })}${ui.kv('前挡除雾', '关', '', { ic: 'wind' })}${ui.kv('预约', '17:50', '工作日', { ic: 'calendar-clock' })}</div>
<div class="v-ctls">${ui.ctl('minus')}${ui.ctl('power', { cls: 'lg', on: true })}${ui.ctl('plus')}</div>
${homeBar(S.dark)}</div>`;

  const ch = `<div class="scr s13 p ch">${ui.glow()}${statusBar(S.dark)}
${ui.nav({ title: ui.live('充电中'), right: `<span class="r" data-go="web">${icon('history', 20, 1.5)}</span>` })}
<div class="v-pad"><p class="meta v-mut">子午超充 望京站 · <span class="v-num">3</span> 号桩</p>
${ui.sum({ big: '76', unit: '%', side: '00:08', sideLabel: '到 90%' })}</div>
${ui.panel(`${ui.wave({ data: power(61), h: 84, at: .68, w: 2, gap: 3, up: true })}${ui.axis(['09:24', '09:41', '09:49'], .67)}${ui.stats([['108', 'kW', '当前功率'], ['142', 'kW', '峰值'], ['418', 'km', '可行驶']])}`)}
<div class="v-list">${ui.kv('已充入', '36.9', 'kWh')}${ui.kv('费用', '¥43.54')}${ui.kv('电价', '¥1.18', '/kWh')}${ui.kv('目标电量', '90%')}</div>
<div class="act">${ui.btn('结束充电', { cls: 'wide' })}</div>
${homeBar(S.dark)}</div>`;

  const web = `<div class="web s13 p" style="height:800px">
${ui.rail({ sym: 'meridian', items: ['car-front', 'zap', 'route', 'receipt-text'], cur: 1, me: '林', go: ['home', 'ch'] })}
<div class="v-col">${ui.colHead('充电记录', '近30天', 'list-filter')}
${ui.item({ title: '望京站 3 号桩', meta: ['11/06 09:24', '36.9 kWh'], live: '00:17', on: true })}
${ui.item({ title: '家用桩', meta: ['11/03 22:10', '05:48', '41.6 kWh'] })}
${ui.item({ title: '亦庄站 7 号桩', meta: ['10/31 13:02', '00:26', '52.3 kWh'] })}
${ui.item({ title: '家用桩', meta: ['10/27 22:31', '06:14', '44.8 kWh'] })}
${ui.item({ title: '家用桩', meta: ['10/22 21:48', '05:16', '38.2 kWh'] })}
${ui.item({ title: '酒仙桥站 2 号桩', meta: ['10/18 15:37', '00:24', '47.5 kWh'] })}
</div>
<div class="v-main">${ui.glow()}${ui.topbar('子午 Z6 / 充电', ['share', 'download', 'ellipsis'])}
<div class="carw">${ui.plinth(car(450), { h: 135 })}</div>
<div class="bd"><p class="v-mut"><span class="v-num">2026-11-06</span> 周五 · <span class="v-num">09:24</span> 起</p><h1 class="v-h1">望京站 3 号桩</h1>${ui.live('充电中')}
<div class="v-wplay">${ui.ctl('zap', { on: true })}<span class="tc v-num"><span class="v-a">76%</span> / 90%</span>${ui.wave({ data: power(64), h: 40, at: .68, w: 3, gap: 5, up: true })}</div>
${ui.stats([['108', 'kW', '当前功率'], ['36.9', 'kWh', '已充入'], ['¥43.54', '', '费用'], ['00:08', '', '到 90%']])}
<div class="v-list">${ui.tag('近30天', '6次')}${ui.kv('充入电量', '261.3', 'kWh')}${ui.kv('充电花费', '¥222.35')}${ui.kv('平均电价', '¥0.85', '/kWh')}</div>
</div></div></div>`;

  return { name: '子午', css, screens: { home, ac, ch, web }, desktop: ['web'], start: 'home', url: 'my.ziwu.auto', boardDeco: ui.stageGlow() };
};
