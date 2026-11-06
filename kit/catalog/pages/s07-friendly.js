// 07 亲和圆润 Friendly —— 毛球 MAOQIU，宠物洗护和寄养 App
// 白底 + 一个偏粉的珊瑚红；标题思源黑体最粗档；圆角卡片、圆头像、圆头线性图标
// 豆豆全套是同一只金毛（同一张照片的不同裁切）；美容师用统一的柔色渐变圆头像，白色粗圆体首字，选中外圈珊瑚描边
const { img, icon, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

const C = '#F0545C', G = '#F4F3F1', M = '#8E8984', K = '#23201D';
const HV = '"Noto Sans SC","PingFang SC",sans-serif';
const AV = '"Yuanti SC","PingFang SC",sans-serif';
// 头像底：同一个方向、同一明度的三档柔色渐变（珊瑚、雾蓝、杏黄）
const GR = ['linear-gradient(150deg,#FFB4A6 0%,#F77C83 100%)', 'linear-gradient(150deg,#AFCDF0 0%,#7FA5DE 100%)', 'linear-gradient(150deg,#FFD49C 0%,#F2AE5E 100%)'];
const DOU = img('dog-grooming-golden');
// 豆豆的头像：从同一张照片里裁出脸
const douAv = (s) => `background:url(${DOU}) 69% 12%/${Math.round(s * 3.9)}px auto no-repeat`;

// 品牌记号：一团圆滚滚的毛球，顶上两只圆角小耳朵
const MARK = (s, c = C) => `<svg width="${s}" height="${s}" viewBox="0 0 32 32"><g fill="${c}" stroke="${c}" stroke-width="3.4" stroke-linejoin="round"><path d="M7.4 12.6 8.4 5 14 8.6Z"/><path d="M24.6 12.6 23.6 5 18 8.6Z"/></g><circle cx="16" cy="18.8" r="11.6" fill="${c}"/></svg>`;

const tabs = (cur, items = [['house', '首页'], ['calendar', '预约'], ['message-circle', '消息'], ['user-round', '我的']]) => `<div class="tabs">${items
  .map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}">${icon(ic, 26, 2)}<span>${t}</span></div>`).join('')}</div>`;

const css = `
.x07{--c:${C};--g:${G};--m:${M};--k:${K};background:#fff;color:var(--k);font-family:"PingFang SC",-apple-system,sans-serif}
.x07 .hv{font-family:${HV};font-weight:900}
.x07 .ph{background-size:cover;background-position:center;filter:saturate(1.08) brightness(1.04) contrast(1.02)}
.x07 .top{position:relative;height:44px;margin:6px 24px 0;display:flex;align-items:center;justify-content:space-between}
.x07 .logo{display:flex;align-items:center;gap:7px}
.x07 .logo b{font:900 24px/1 ${HV};letter-spacing:.02em;color:var(--k)}
.x07 .pet{height:44px;padding:0 14px 0 5px;border-radius:22px;background:var(--g);display:flex;align-items:center;gap:8px;font:600 15px/1 "PingFang SC"}
.x07 .pet i{width:34px;height:34px;border-radius:50%;${douAv(34)}}
.x07 .pet .ic{color:var(--m);margin-left:-2px}
.x07 .rb{width:44px;height:44px;border-radius:50%;background:var(--g);display:grid;place-items:center;color:var(--k);flex:none}
.x07 .tabs{position:absolute;left:0;right:0;bottom:0;height:84px;background:#fff;border-top:1px solid #EFEDEA;display:grid;grid-template-columns:repeat(4,1fr);padding-top:9px}
.x07 .tabs div{display:flex;flex-direction:column;align-items:center;gap:5px;color:#ABA6A1;font:600 12px/1 "PingFang SC"}
.x07 .tabs .on{color:var(--c)}
.x07 .cta{height:58px;border-radius:29px;background:var(--c);color:#fff;display:flex;align-items:center;justify-content:center;font:900 19px/1 ${HV};letter-spacing:.08em;box-shadow:0 12px 24px -12px rgba(240,84,92,.7)}
/* hero 首页 */
.x07.hero h1{margin:22px 24px 0;font:900 38px/1.15 ${HV};letter-spacing:.01em}
.x07 .svc{margin:26px 24px 0;display:grid;grid-template-columns:repeat(4,64px);gap:18px}
.x07 .svc div{display:flex;flex-direction:column;align-items:center;gap:10px;font:600 15px/1 "PingFang SC"}
.x07 .svc i{width:64px;height:64px;border-radius:22px;background:var(--g);display:grid;place-items:center;color:var(--k)}
.x07 .card{margin:28px 24px 0}
.x07 .card .ph{height:246px;border-radius:24px;background-position:74% 38%}
.x07 .card .bd{display:flex;justify-content:space-between;align-items:center;margin-top:14px}
.x07 .card b{display:block;font:600 19px/1.2 "PingFang SC"}
.x07 .mt{margin-top:7px;display:flex;align-items:center;gap:5px;font:500 14px/1 "PingFang SC";color:var(--m)}
.x07 .mt .st{color:var(--k)}
.x07.hero .cta{position:absolute;left:24px;right:24px;bottom:98px}
/* b1 预约 */
.x07.bk h1{margin:20px 24px 0;font:900 32px/1.15 ${HV}}
.x07.bk h2{margin:48px 24px 0;font:900 24px/1.15 ${HV}}
.x07 .grm{margin:30px 24px 0;display:grid;grid-template-columns:repeat(3,1fr)}
.x07 .grm div{display:flex;flex-direction:column;align-items:center}
.x07 .grm i{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;font:700 37px/1 ${AV};font-style:normal;color:#fff;padding-top:2px;box-shadow:inset 0 -6px 14px rgba(255,255,255,.18),inset 0 8px 14px rgba(255,255,255,.22)}
.x07 .grm .on i{box-shadow:inset 0 -6px 14px rgba(255,255,255,.18),inset 0 8px 14px rgba(255,255,255,.22),0 0 0 3px #fff,0 0 0 6.5px var(--c)}
.x07 .grm b{margin-top:16px;font:600 17px/1 "PingFang SC"}
.x07 .grm span{margin-top:7px;display:flex;align-items:center;gap:4px;font:500 13px/1 "PingFang SC";color:var(--m)}
.x07 .days{margin:22px 24px 0;display:flex;justify-content:space-between}
.x07 .days div{width:56px;height:78px;border-radius:28px;background:var(--g);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.x07 .days span{font:500 13px/1 "PingFang SC";color:var(--m)}
.x07 .days b{font:900 22px/1 "Nunito"}
.x07 .days .on{background:var(--k);color:#fff}
.x07 .days .on span{color:rgba(255,255,255,.7)}
.x07 .tms{margin:20px 24px 0;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.x07 .tms div{height:54px;border-radius:27px;background:var(--g);display:grid;place-items:center;font:800 18px/1 "Nunito"}
.x07 .tms .on{background:var(--k);color:#fff}
.x07 .tms .off{color:#C9C5C0;text-decoration:line-through}
.x07 .bar{position:absolute;left:0;right:0;bottom:0;height:112px;border-top:1px solid #EFEDEA;display:flex;align-items:flex-start;justify-content:space-between;padding:18px 24px 0}
.x07 .bar span{display:block;font:500 14px/1 "PingFang SC";color:var(--m)}
.x07 .bar b{display:block;margin-top:8px;font:900 28px/1 "Nunito"}
.x07 .bar .cta{width:190px}
/* b2 进度 */
.x07 .big{margin:4px 16px 0;height:380px;border-radius:32px;background:url(${DOU}) 80% 34%/auto 150% no-repeat}
.x07.dn h1{margin:26px 24px 0;font:900 36px/1.15 ${HV}}
.x07.dn .who{margin:12px 24px 0;display:flex;align-items:center;gap:8px;font:500 15px/1 "PingFang SC";color:var(--m)}
.x07.dn .who i{width:30px;height:30px;border-radius:50%;background:${GR[0]};color:#fff;display:grid;place-items:center;font:700 15px/1 ${AV};font-style:normal}
.x07 .stp{position:relative;margin:32px 24px 0;display:grid;grid-template-columns:repeat(4,1fr)}
.x07 .stp:before{content:"";position:absolute;left:12.5%;right:12.5%;top:15px;height:4px;border-radius:2px;background:var(--c)}
.x07 .stp div{position:relative;display:flex;flex-direction:column;align-items:center}
.x07 .stp i{width:34px;height:34px;border-radius:50%;background:var(--c);display:grid;place-items:center;color:#fff;box-shadow:0 0 0 4px #fff}
.x07 .stp b{margin-top:10px;font:600 15px/1 "PingFang SC"}
.x07 .stp span{margin-top:6px;font:700 13px/1 "Nunito";color:var(--m)}
.x07 .acts{position:absolute;left:24px;right:24px;bottom:42px;display:flex;gap:12px}
.x07 .acts .rb{width:58px;height:58px}
.x07 .acts .cta{flex:1}
/* 半山咖啡 */
.x07.cmp .bs{display:flex;align-items:center;gap:9px}
.x07.cmp .bs em{width:36px;height:36px;border-radius:50%;background:var(--c);color:#fff;display:grid;place-items:center;font:900 18px/1 ${HV};font-style:normal}
.x07.cmp .bs b{font:900 24px/1 ${HV};letter-spacing:.02em}
.x07.cmp .pts{display:flex;align-items:baseline;gap:6px;font:500 14px/1 "PingFang SC";color:var(--m)}
.x07.cmp .pts b{font:900 22px/1 "Nunito";color:var(--k);letter-spacing:.01em}
.x07.cmp .ph.lt{margin:20px 24px 0;height:378px;border-radius:28px}
.x07.cmp .rec{margin:24px 24px 0;font:500 14px/1 "PingFang SC";color:var(--m)}
.x07.cmp .pn{margin:10px 24px 0;display:flex;align-items:baseline;justify-content:space-between}
.x07.cmp .pn b{font:900 36px/1 ${HV}}
.x07.cmp .pn em{font:900 32px/1 "Nunito";font-style:normal}
.x07.cmp .pn em small{font-size:19px;margin-right:2px}
.x07.cmp .loc{margin:16px 24px 0;display:flex;align-items:center;gap:6px;font:500 15px/1 "PingFang SC";color:var(--m)}
.x07.cmp .cta{position:absolute;left:24px;right:24px;bottom:100px}
/* 网页 */
.x07.web{position:relative;width:1280px;height:800px;overflow:hidden;background:#fff}
.x07.web .nav{height:96px;margin:0 64px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #EFEDEA}
.x07.web .logo b{font-size:30px}
.x07.web .cats{display:flex;gap:6px}
.x07.web .cats span{height:46px;padding:0 22px;border-radius:23px;display:flex;align-items:center;font:600 17px/1 "PingFang SC";color:var(--m)}
.x07.web .cats .on{background:#FFE8E9;color:var(--c);font-weight:800}
.x07.web .rt{display:flex;align-items:center;gap:12px}
.x07.web .lg{height:48px;padding:0 24px;border-radius:24px;border:1.5px solid #E2DFDB;display:flex;align-items:center;font:600 16px/1 "PingFang SC"}
.x07.web .shop{height:48px;padding:0 16px 0 14px;border-radius:24px;background:var(--g);display:flex;align-items:center;gap:7px;font:600 16px/1 "PingFang SC";color:var(--k)}
.x07.web .shop .ic{color:var(--c)}
.x07.web .shop .ic:last-child{color:var(--m)}
.x07.web h1{position:absolute;left:0;right:0;top:136px;text-align:center;font:900 56px/1 ${HV};letter-spacing:.01em}
.x07.web .go{position:absolute;left:400px;top:224px;width:480px;height:88px;border-radius:44px;background:var(--c);display:flex;align-items:center;padding:0 10px;color:#fff;box-shadow:0 18px 34px -16px rgba(240,84,92,.75)}
.x07.web .go i{width:68px;height:68px;border-radius:50%;${douAv(68)};box-shadow:0 0 0 3px rgba(255,255,255,.9)}
.x07.web .go b{flex:1;text-align:center;font:900 28px/1 ${HV};letter-spacing:.06em;margin-right:14px}
.x07.web .go u{width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center}
.x07.web .pc{position:absolute;left:290px;top:348px;width:700px;height:248px;border-radius:32px;background:url(${img('dog-samoyed-pink')}) 50% 24%/cover no-repeat;filter:saturate(1.02) brightness(1.03)}
.x07.web .chip{position:absolute;left:310px;top:520px;height:56px;padding:0 22px 0 18px;border-radius:28px;background:#fff;display:flex;align-items:center;gap:10px;font:600 17px/1 "PingFang SC";box-shadow:0 10px 24px -14px rgba(35,32,29,.5)}
.x07.web .chip .ic{color:var(--c)}
.x07.web .chip em{font:500 15px/1 "PingFang SC";font-style:normal;color:var(--m)}
.x07.web .sv{position:absolute;top:616px;left:290px;width:700px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.x07.web .sv>div{height:132px;border-radius:28px;background:var(--g);display:flex;align-items:center;gap:16px;padding:0 22px}
.x07.web .sv i{flex:none;width:68px;height:68px;border-radius:50%;background:#fff;display:grid;place-items:center;color:var(--c)}
.x07.web .sv b{display:block;font:900 20px/1 ${HV}}
.x07.web .sv span{display:block;margin-top:10px;font:900 20px/1 "Nunito";color:var(--m)}
.x07.web .sv span small{font-size:14px;margin-right:1px}
`;

const hero = `<div class="scr x07 hero">${statusBar()}
<div class="top"><div class="logo">${MARK(32)}<b>毛球</b></div><div class="pet"><i></i>豆豆${icon('chevron-down', 16, 2.4)}</div></div>
<h1>给豆豆约个澡</h1>
<div class="svc">${[['bath', '洗澡'], ['scissors', '美容'], ['house', '寄养'], ['car', '上门']].map(([ic, t]) => `<div><i>${icon(ic, 30, 2)}</i>${t}</div>`).join('')}</div>
<div class="card"><div class="ph" style="background-image:url(${DOU})"></div>
<div class="bd"><div><b>望京店</b><div class="mt"><span class="st">★ 4.9</span>·<span>1.2 km</span>·<span>10:00–21:00</span></div></div><div class="rb">${icon('phone', 20, 2)}</div></div></div>
<div class="cta">预约洗澡</div>
${tabs(0)}${homeBar()}</div>`;

// 美容师：同一套柔色渐变底 + 白色粗圆体首字
const GRM = [['唐', '小唐', '4.9', 1, GR[0]], ['杰', '阿杰', '4.8', 0, GR[1]], ['朵', '朵朵', '4.9', 0, GR[2]]];
const b1 = `<div class="scr x07 bk">${statusBar()}
<div class="top"><div class="rb">${icon('chevron-left', 24, 2.2)}</div></div>
<h1>选美容师</h1>
<div class="grm">${GRM.map(([ch, n, r, on, bg]) => `<div class="${on ? 'on' : ''}"><i style="background:${bg}">${ch}</i><b>${n}</b><span>★ ${r}</span></div>`).join('')}</div>
<h2>选时间</h2>
<div class="days">${[['今天', 28], ['周四', 29], ['周五', 30], ['周六', 31, 1], ['周日', 1]].map(([w, d, on]) => `<div class="${on ? 'on' : ''}"><span>${w}</span><b>${d}</b></div>`).join('')}</div>
<div class="tms">${[['10:00'], ['11:30'], ['13:00'], ['14:30', 'on'], ['16:00'], ['17:30', 'off']].map(([t, c]) => `<div class="${c || ''}">${t}</div>`).join('')}</div>
<div class="bar"><div><span>精致洗护 · 豆豆</span><b>¥198</b></div><div class="cta">确认预约</div></div>
${homeBar()}</div>`;

const b2 = `<div class="scr x07 dn">${statusBar()}
<div class="big"></div>
<h1>豆豆洗好啦</h1>
<div class="who"><i>唐</i>小唐 · 望京店</div>
<div class="stp">${[['到店', '14:30'], ['洗澡', '14:42'], ['吹干', '15:05'], ['可接走', '15:20']].map(([t, h]) => `<div><i>${icon('check', 18, 3)}</i><b>${t}</b><span>${h}</span></div>`).join('')}</div>
<div class="acts"><div class="rb">${icon('phone', 22, 2)}</div><div class="cta">去接豆豆</div></div>
${homeBar()}</div>`;

const web = `<div class="x07 web">
<div class="nav"><div class="logo">${MARK(38)}<b>毛球</b></div>
<div class="cats">${[['洗澡', 1], ['美容'], ['寄养'], ['上门'], ['门店']].map(([t, on]) => `<span class="${on ? 'on' : ''}">${t}</span>`).join('')}</div>
<div class="rt"><div class="lg">我的预约</div><div class="shop">${icon('map-pin', 18, 2.2)}望京店${icon('chevron-down', 18, 2.2)}</div></div></div>
<h1>给毛孩子约个舒服澡</h1>
<div class="go"><i></i><b>给豆豆预约洗澡</b><u>${icon('arrow-right', 30, 2.6)}</u></div>
<div class="pc"></div>
<div class="chip">${icon('store', 20, 2.2)}望京店<em>★ 4.9 · 1.2 km</em></div>
<div class="sv">${[['bath', '基础洗澡', '98'], ['sparkles', '精致洗护', '198'], ['scissors', '美容造型', '268']].map(([ic, t, p]) => `<div><i>${icon(ic, 32, 2)}</i><div><b>${t}</b><span><small>¥</small>${p}</span></div></div>`).join('')}</div>
</div>`;

const cmp = `<div class="scr x07 cmp">${statusBar()}
<div class="top"><div class="bs"><em>半</em><b>半山咖啡</b></div><div class="pts">积分<b>1,280</b></div></div>
<div class="ph lt" style="background-image:url(${img('latte-cheers')});background-position:54% 50%"></div>
<div class="rec">今日推荐</div>
<div class="pn"><b>桂花拿铁</b><em><small>¥</small>28</em></div>
<div class="loc">${icon('map-pin', 17, 2)}东四店 · 到店自取约 6 分钟</div>
<div class="cta">去点单</div>
${tabs(0, [['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user-round', '我的']])}
${homeBar()}</div>`;

module.exports = {
  css,
  screens: { 's07-hero': hero, 's07-b1': b1, 's07-b2': b2, 's07-web': web, 's07-cmp': cmp },
  desktop: ['s07-web'],
  // 附录网页页放大区：大标题和预约大按钮
  zoom: [220, 108],
  // ①颜色：主按钮右端 ②形状：大照片卡左下圆角 ③字体：大标题右侧 ④用法：图标行右侧空白
  marks: [[352, 686], [28, 536], [294, 146], [354, 260]],
  palette: [['纯白', '#FFFFFF'], ['毛球珊瑚', C], ['浅灰', G], ['暖灰', M], ['墨色', K]],
  type: { font: HV, weight: 900, sample: '毛 Aa', lines: [['标题', '思源黑体 特粗'], ['正文', '苹方 常规'], ['数字', 'Nunito 特粗']] },
  stageA: '#FDE6E7',
  decoA: `<div style="position:absolute;left:50%;top:50%;width:500px;height:500px;margin:-170px 0 0 -250px;border-radius:50%;background:${C}"></div>`,
  stageB: { bg: C, color: '#fff', url: 'maoqiu.pet' },
  page: (no) => stylePages(no, 's07-friendly', module.exports),
};
