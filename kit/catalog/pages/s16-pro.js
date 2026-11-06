// 16 清晰专业 Pro —— 工时 GONGSHI，连锁门店的排班和考勤（电脑后台 + 员工 App）
// 字体：标题苹方中粗，正文思源黑体（Noto Sans SC），数字 Inter 等宽；员工的姓全书不重复（吴郑陆赵杨刘孙谢）
const { img, icon, statusBar, homeBar, phone, browser } = require('../lib');
const { stylePages } = require('../page');

const B = '#2F4FE0', BT = '#EEF1FD', K = '#111827', T2 = '#5B6475', T3 = '#8A92A3', L = '#E6E8EC', BG = '#F6F7F9';
const GR = '#16A34A', AM = '#E5A00D', RD = '#E5484D';

// 品牌记号：蓝色圆角方块里一只白色表盘
const MARK = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><rect width="24" height="24" rx="6.5" fill="${B}"/><circle cx="12" cy="12" r="6.6" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 8.6V12l2.4 1.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const dot = (c) => `<i class="dt" style="background:${c}"></i>`;
const IC = (n, s = 20) => icon(n, s, 1.75);

const tabs = (cur) => `<div class="tabs">${[['calendar-days', '排班'], ['map-pin-check', '打卡'], ['file-check-2', '审批'], ['user-round', '我的']]
  .map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}">${IC(ic, 24)}<span>${t}</span></div>`).join('')}</div>`;

const css = `
.x16{--b:${B};--bt:${BT};--k:${K};--t2:${T2};--t3:${T3};--l:${L};--bg:${BG};background:#fff;color:var(--k);font-family:"Noto Sans SC","Inter",-apple-system,sans-serif}
.x16 .n{font-family:"Inter","Noto Sans SC",sans-serif;font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
.x16 .dt{display:inline-block;width:7px;height:7px;border-radius:50%;flex:none}
.x16 .ic{color:inherit}
.x16 .btn{height:44px;padding:0 18px;border-radius:10px;background:var(--b);color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:8px;font:600 15px/1 "Noto Sans SC"}
.x16 .btn2{height:44px;padding:0 16px;border-radius:10px;background:#fff;border:1px solid var(--l);color:var(--k);display:inline-flex;align-items:center;gap:8px;font:500 15px/1 "Noto Sans SC"}
.x16 .tabs{position:absolute;left:0;right:0;bottom:0;height:84px;background:#fff;border-top:1px solid var(--l);display:grid;grid-template-columns:repeat(4,1fr);padding-top:9px}
.x16 .tabs div{display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--t3);font:500 11px/1 "Noto Sans SC"}
.x16 .tabs .on{color:var(--b)}
.x16 .hd{height:52px;margin:8px 20px 0;display:flex;align-items:center;justify-content:space-between}
.x16 .hd h1{font:600 26px/1 "PingFang SC";letter-spacing:.01em}
.x16 .seg{height:34px;padding:3px;border-radius:9px;background:#F0F1F4;display:flex}
.x16 .seg span{padding:0 14px;border-radius:7px;display:flex;align-items:center;font:500 14px/1 "Noto Sans SC";color:var(--t2)}
.x16 .seg .on{background:#fff;color:var(--k);box-shadow:0 1px 2px rgba(17,24,39,.12),0 0 0 .5px rgba(17,24,39,.06)}
/* hero 本周排班 */
.x16 .wk{margin:14px 20px 0;display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.x16 .wk div{height:58px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px}
.x16 .wk span{font:500 12px/1 "Noto Sans SC";color:var(--t3)}
.x16 .wk b{font:600 17px/1 "Inter";font-variant-numeric:tabular-nums}
.x16 .wk .off b{color:var(--t3);font-weight:500}
.x16 .wk .on{background:var(--b)}
.x16 .wk .on span,.x16 .wk .on b{color:#fff}
.x16 .td{margin:16px 20px 0;border:1px solid var(--l);border-radius:14px;padding:16px 16px 16px}
.x16 .td .r1{display:flex;justify-content:space-between;align-items:center;font:500 14px/1 "Noto Sans SC";color:var(--t2)}
.x16 .td .r1 span{display:flex;align-items:center;gap:6px}
.x16 .td .tm{margin-top:12px;font:600 34px/1 "Inter";letter-spacing:-.015em;font-variant-numeric:tabular-nums}
.x16 .td .r3{margin-top:14px;display:flex;justify-content:space-between;align-items:center}
.x16 .td .r3 span{display:flex;align-items:center;gap:5px;font:400 14px/1 "Noto Sans SC";color:var(--t2)}
.x16 .lh{margin:22px 20px 0;display:flex;justify-content:space-between;font:500 13px/1 "Noto Sans SC";color:var(--t3)}
.x16 .lh b{font:600 13px/1 "Inter";color:var(--t2)}
.x16 .ls{margin:8px 20px 0}
.x16 .rw{height:52px;display:grid;grid-template-columns:56px 1fr 88px 36px;align-items:center;border-top:1px solid var(--l)}
.x16 .rw:first-child{border-top:none}
.x16 .rw .d{font:500 15px/1 "Noto Sans SC"}
.x16 .rw .d small{display:block;margin-top:5px;font:400 12px/1 "Inter";color:var(--t3);font-variant-numeric:tabular-nums}
.x16 .rw .s{font:500 15px/1 "Noto Sans SC"}
.x16 .rw .s small{display:block;margin-top:5px;font:400 12px/1 "Inter";color:var(--t3);font-variant-numeric:tabular-nums}
.x16 .rw .st{display:flex;align-items:center;gap:6px;font:400 13px/1 "Noto Sans SC";color:var(--t2)}
.x16 .rw .h{text-align:right;font:600 15px/1 "Inter";font-variant-numeric:tabular-nums}
.x16 .rw.rest .s{height:36px;margin-right:0;grid-column:2/5;border:1px dashed #D5D9E0;border-radius:9px;display:flex;align-items:center;gap:8px;padding:0 12px;color:var(--t3);font-weight:400;font-size:14px}
/* b1 打卡 */
.x16 .map{position:relative;margin:14px 20px 0;height:208px;border-radius:14px;overflow:hidden;border:1px solid var(--l);background:#F3F4F6}
.x16 .loc{margin:16px 20px 0;display:flex;align-items:center;gap:7px;font:500 14px/1 "Noto Sans SC";color:var(--t2)}
.x16 .clk{margin:18px 20px 0;font:600 54px/1 "Inter";letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.x16 .sh{margin:12px 20px 0;font:400 15px/1 "Noto Sans SC";color:var(--t2)}
.x16 .sh b{font:500 15px/1 "Inter";color:var(--k);font-variant-numeric:tabular-nums}
.x16 .big{position:absolute;left:20px;right:20px;top:476px;height:52px;font-size:17px}
.x16 .rec{position:absolute;left:20px;right:20px;top:552px}
.x16 .rec div{height:52px;display:flex;align-items:center;gap:10px;border-top:1px solid var(--l);font:400 15px/1 "Noto Sans SC";color:var(--t2)}
.x16 .rec div:first-child{border-top:none}
.x16 .rec b{margin-left:auto;font:500 15px/1 "Inter";color:var(--t3);font-variant-numeric:tabular-nums}
/* b2 审批 */
.x16 .tb{margin:10px 20px 0;display:flex;gap:24px;border-bottom:1px solid var(--l)}
.x16 .tb span{height:40px;display:flex;align-items:center;gap:6px;font:500 15px/1 "Noto Sans SC";color:var(--t2);position:relative}
.x16 .tb span em{font:600 12px/1 "Inter";font-style:normal;color:var(--t3)}
.x16 .tb .on{color:var(--k)}
.x16 .tb .on:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--b)}
.x16 .ap{margin:0 20px}
.x16 .ap>div{padding:16px 0;border-top:1px solid var(--l);display:grid;grid-template-columns:40px 1fr auto;gap:12px;align-items:start}
.x16 .ap>div:first-child{border-top:none}
.x16 .av{width:40px;height:40px;border-radius:50%;background:#EEF0F3;display:grid;place-items:center;font:600 15px/1 "Noto Sans SC";color:var(--t2)}
.x16 .ap b{display:block;font:600 15px/1.2 "Noto Sans SC"}
.x16 .ap p{margin-top:6px;font:400 14px/1.35 "Noto Sans SC";color:var(--t2)}
.x16 .ap p .n{font-size:14px}
.x16 .ap .st{display:flex;align-items:center;gap:6px;font:400 13px/1 "Noto Sans SC";color:var(--t2);margin-top:2px}
.x16 .sk{margin:0 20px}
.x16 .sk>div{padding:16px 0;border-top:1px solid var(--l);display:grid;grid-template-columns:40px 1fr;gap:12px}
.x16 .sk i{display:block;border-radius:6px;background:linear-gradient(90deg,#F0F1F4,#F7F8FA 60%,#F0F1F4)}
.x16 .sk .c{width:40px;height:40px;border-radius:50%}
.x16.cmp .cl{margin:22px 20px 0;font:500 14px/1 "Noto Sans SC";color:var(--t3)}
.x16.cmp .cc{margin:10px 20px 0;border:1px solid var(--l);border-radius:14px;overflow:hidden}
.x16.cmp .cc .ph{position:relative;height:274px;background:#fff;overflow:hidden}
.x16.cmp .cc .ph i{position:absolute;inset:0;background-repeat:no-repeat;background-size:400px auto;background-position:-3px -206px;filter:saturate(.62) brightness(1.12) contrast(.95);-webkit-mask:radial-gradient(50% 54% at 50% 54%,#000 66%,transparent 100%);mask:radial-gradient(50% 54% at 50% 54%,#000 66%,transparent 100%)}
.x16.cmp .cr{height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 18px}
.x16.cmp .cr b{font:600 24px/1 "PingFang SC"}
.x16.cmp .cr em{font:600 26px/1 "Inter";font-style:normal;font-variant-numeric:tabular-nums}
.x16.cmp .ci{margin:14px 20px 0;border:1px solid var(--l);border-radius:14px;padding:0 18px}
.x16.cmp .ci>div{height:56px;display:flex;align-items:center;gap:9px;font:500 16px/1 "Noto Sans SC";border-top:1px solid var(--l)}
.x16.cmp .ci>div:first-child{border-top:none}
.x16.cmp .ci .ic{color:var(--t2)}
.x16.cmp .ci span,.x16.cmp .ci b{margin-left:auto;font:400 15px/1 "Noto Sans SC";color:var(--t2)}
.x16.cmp .ci span span{margin:0}
.x16.cmp .ci b{font:600 20px/1 "Inter";color:var(--k)}
.x16.cmp .cb{position:absolute;left:20px;right:20px;bottom:104px;height:52px;font-size:17px}
.x16 .ap .acts{margin-top:14px;display:flex;gap:10px}
.x16 .ap .acts>div{height:36px;padding:0 18px;font-size:14px;border-radius:9px}
.x16 .sec{margin:20px 20px 0;font:500 13px/1 "Noto Sans SC";color:var(--t3)}
.x16 .err{margin:12px 20px 0;height:164px;border-radius:14px;background:#F2F3F5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--t2)}
.x16 .err b{font:500 17px/1 "Noto Sans SC";color:var(--k)}
.x16 .err .btn2{margin-top:4px}
/* 网页 */
.x16.web{position:relative;width:1280px;height:800px;overflow:hidden;background:#fff;display:flex}
.x16 .side{width:200px;flex:none;background:${BG};border-right:1px solid var(--l);padding:22px 14px;position:relative}
.x16 .brand{display:flex;align-items:center;gap:10px;padding:0 8px;height:32px}
.x16 .brand b{font:600 20px/1 "PingFang SC";letter-spacing:.02em;white-space:nowrap}
.x16 .brand span{font:600 12px/1 "Inter";letter-spacing:.12em;color:var(--t3);margin-top:2px;white-space:nowrap}
.x16 .store{margin-top:22px;height:44px;border-radius:10px;background:#fff;border:1px solid var(--l);display:flex;align-items:center;gap:9px;padding:0 12px;font:500 15px/1 "Noto Sans SC"}
.x16 .store .ic:last-child{margin-left:auto;color:var(--t3)}
.x16 .nv{margin-top:22px;display:flex;flex-direction:column;gap:2px}
.x16 .nv div{height:42px;border-radius:9px;display:flex;align-items:center;gap:11px;padding:0 12px;font:500 15px/1 "Noto Sans SC";color:var(--t2)}
.x16 .nv .on{background:var(--bt);color:var(--b)}
.x16 .nv em{margin-left:auto;font:600 13px/1 "Inter";font-style:normal;color:var(--t2);background:#E9EBEF;border-radius:6px;padding:4px 7px}
.x16 .me{position:absolute;left:14px;right:14px;bottom:20px;display:flex;align-items:center;gap:10px;padding:0 8px;font:500 15px/1 "Noto Sans SC"}
.x16 .me small{display:block;margin-top:5px;font-size:13px;color:var(--t3)}
.x16 .main{flex:1;padding:24px 24px 0;min-width:0}
.x16 .mh{display:flex;align-items:center;gap:16px;height:44px}
.x16 .mh h2{font:600 24px/1 "PingFang SC"}
.x16 .wsw{display:flex;align-items:center;gap:4px;height:40px;border:1px solid var(--l);border-radius:10px;padding:0 6px;font:500 15px/1 "Inter";font-variant-numeric:tabular-nums}
.x16 .wsw .ic{color:var(--t2)}
.x16 .wsw span{padding:0 8px}
.x16 .mh .sp{flex:1}
.x16 .kp{margin-top:26px;display:grid;grid-template-columns:198.67px 198.67px 198.67px 1fr;border:1px solid var(--l);border-radius:12px}
.x16 .kp .wd{display:flex;align-items:flex-end;justify-content:space-between}
.x16 .kp .bars{display:flex;align-items:flex-end;gap:14px}
.x16 .kp .bars div{display:flex;flex-direction:column;align-items:center;gap:4px}
.x16 .kp .bars i{display:block;width:16px;border-radius:3px 3px 1px 1px;background:#D9DDE4}
.x16 .kp .bars i.c{background:var(--b)}
.x16 .kp .bars span{display:block;font:400 12px/1 "Noto Sans SC";color:var(--t3)}
.x16 .kp>div{padding:16px 20px 16px;border-left:1px solid var(--l);position:relative}
.x16 .kp>div:first-child{border-left:none}
.x16 .kp span{display:flex;align-items:center;gap:6px;font:400 14px/1 "Noto Sans SC";color:var(--t2)}
.x16 .kp b{display:block;margin-top:12px;font:600 28px/1 "Inter";letter-spacing:-.01em;font-variant-numeric:tabular-nums}
.x16 .kp b small{font:500 15px/1 "Inter";color:var(--t3);margin-left:4px}
.x16 .fl{margin-top:22px;display:flex;align-items:center;gap:10px}
.x16 .fl .f{height:38px;border:1px solid var(--l);border-radius:9px;display:flex;align-items:center;gap:7px;padding:0 12px;font:400 15px/1 "Noto Sans SC";color:var(--t2)}
.x16 .fl .f b{font-weight:500;color:var(--k)}
.x16 .fl .q{width:220px;color:var(--t3)}
.x16 .fl .lg{margin-left:auto;display:flex;gap:16px;font:400 14px/1 "Noto Sans SC";color:var(--t2)}
.x16 .fl .lg span{display:flex;align-items:center;gap:6px}
.x16 table{margin-top:14px;width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;border:1px solid var(--l);border-radius:12px;overflow:hidden}
.x16 th{height:42px;background:${BG};border-bottom:1px solid var(--l);font:500 14px/1 "Noto Sans SC";color:var(--t2);text-align:left;padding:0 8px}
.x16 th .n{font-size:14px}
.x16 th.cur{color:var(--b);box-shadow:inset 0 -2px 0 var(--b)}
.x16 th:first-child,.x16 td:first-child{padding-left:16px}
.x16 th:last-child,.x16 td:last-child{padding-right:16px;text-align:right}
.x16 td{height:50px;border-bottom:1px solid #EEF0F3;padding:0 6px;font:400 14px/1 "Noto Sans SC"}
.x16 tr:last-child td{border-bottom:none}
.x16 td .em{display:flex;align-items:center;gap:14px}
.x16 td .em i{width:30px;height:30px;border-radius:50%;background:#EEF0F3;display:grid;place-items:center;font:600 13px/1 "Noto Sans SC";font-style:normal;color:var(--t2);flex:none}
.x16 td .em b{display:block;font:500 15px/1 "Noto Sans SC"}
.x16 td .em small{display:block;margin-top:4px;font:400 13px/1 "Noto Sans SC";color:var(--t3)}
.x16 .cp{position:relative;height:34px;border-radius:8px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;padding:0 6px;font:500 14px/1 "Inter";font-variant-numeric:tabular-nums;color:#2B3342;white-space:nowrap}
.x16 .cp.rs{background:none;color:#B9BFCA;font:400 14px/1 "Noto Sans SC";justify-content:flex-start;padding-left:10px}
.x16 .cp .dt{position:absolute;top:-3px;right:-3px;width:9px;height:9px;box-shadow:0 0 0 2px #fff}
.x16 .cp.op{background:none;border:1px dashed #CDD2DA;color:var(--t3);justify-content:center}
.x16 .cp.sel{background:var(--bt);border:1.5px solid var(--b);color:var(--b)}
.x16 td.hr{font:600 15px/1 "Inter";font-variant-numeric:tabular-nums}
.x16 td.hr.lo{color:var(--t3);font-weight:500}
`;

// ——— 员工 App：本周排班 ———
const days = [['一', 26], ['二', 27], ['三', 28, 'on'], ['四', 29, 'off'], ['五', 30], ['六', 31], ['日', 1, 'off']];
const rows = [
  ['周一', '10/26', '早班', '07:00–15:00', [GR, '正常'], '8.0'],
  ['周二', '10/27', '早班', '07:00–15:00', [AM, '迟到 4 分钟'], '8.0'],
  ['周四', '10/29', 0],
  ['周五', '10/30', '晚班', '14:00–22:00', 0, '8.0'],
  ['周六', '10/31', '晚班', '14:00–22:00', 0, '8.0'],
  ['周日', '11/01', 0],
];
const hero = `<div class="scr x16 hero">${statusBar()}
<div class="hd"><h1>本周排班</h1><div class="seg"><span class="on">我的</span><span>全店</span></div></div>
<div class="wk">${days.map(([w, d, c]) => `<div class="${c || ''}"><span>${w}</span><b>${d}</b></div>`).join('')}</div>
<div class="td"><div class="r1"><span>今天 · 中班</span><span>${dot('#B4BAC5')}待上班</span></div>
<div class="tm">10:00 – 18:00</div>
<div class="r3"><span>${IC('map-pin', 15)}国贸三期店</span><div class="btn">${IC('log-in', 18)}上班打卡</div></div></div>
<div class="lh"><span>本周 5 个班</span><b>40.0 h</b></div>
<div class="ls">${rows.map(([w, d, s, t, st, h]) => s === 0
  ? `<div class="rw rest"><div class="d">${w}<small>${d}</small></div><div class="s">${IC('coffee', 17)}休息</div></div>`
  : `<div class="rw"><div class="d">${w}<small>${d}</small></div><div class="s">${s}<small>${t}</small></div><div class="st">${st ? dot(st[0]) + st[1] : ''}</div><div class="h">${h}</div></div>`).join('')}</div>
${tabs(0)}${homeBar()}</div>`;

// ——— 员工 App：打卡 ———
const mapSvg = `<svg width="100%" height="100%" viewBox="0 0 335 208" preserveAspectRatio="xMidYMid slice" font-family="Noto Sans SC">
<rect width="335" height="208" fill="#F1F2F4"/>
<rect x="0" y="0" width="92" height="56" fill="#DDEDDA"/>
<g fill="#C9DFC5"><circle cx="22" cy="18" r="6"/><circle cx="46" cy="30" r="7"/><circle cx="70" cy="14" r="5"/><circle cx="30" cy="44" r="5"/><circle cx="78" cy="40" r="6"/></g>
<g fill="#E5E7EB" stroke="#D9DCE1" stroke-width=".6">
<rect x="104" y="6" width="44" height="22" rx="2"/><rect x="104" y="32" width="28" height="18" rx="2"/><rect x="154" y="6" width="58" height="44" rx="2"/>
<rect x="236" y="6" width="26" height="44" rx="2"/><rect x="266" y="6" width="28" height="20" rx="2"/><rect x="266" y="30" width="28" height="20" rx="2"/><rect x="306" y="6" width="29" height="44" rx="2"/>
<rect x="6" y="76" width="38" height="30" rx="2"/><rect x="48" y="76" width="38" height="66" rx="2"/><rect x="6" y="110" width="38" height="32" rx="2"/>
<rect x="106" y="76" width="26" height="66" rx="2"/><rect x="204" y="76" width="10" height="66" rx="2"/>
<rect x="236" y="76" width="58" height="30" rx="2"/><rect x="236" y="110" width="26" height="32" rx="2"/><rect x="266" y="110" width="28" height="32" rx="2"/><rect x="306" y="76" width="29" height="66" rx="2"/>
<rect x="6" y="160" width="56" height="42" rx="2"/><rect x="66" y="160" width="20" height="42" rx="2"/><rect x="104" y="160" width="50" height="20" rx="2"/><rect x="104" y="184" width="50" height="20" rx="2"/><rect x="158" y="160" width="54" height="42" rx="2"/>
<rect x="236" y="160" width="40" height="42" rx="2"/><rect x="280" y="160" width="14" height="42" rx="2"/><rect x="306" y="160" width="29" height="42" rx="2"/>
</g>
<rect x="138" y="78" width="60" height="62" rx="3" fill="#DADFE7" stroke="#C7CDD7" stroke-width=".8"/>
<g stroke="#FFFFFF" fill="none"><path d="M0 151H335M98 0V208M300 0V208" stroke-width="7"/></g>
<path d="M0 64H335" stroke="#E0E3E8" stroke-width="17"/><path d="M0 64H335" stroke="#FFFFFF" stroke-width="14"/>
<path d="M226 0V208" stroke="#EBCB7A" stroke-width="19"/><path d="M226 0V208" stroke="#FBE6A9" stroke-width="16"/>
<text x="16" y="67.4" font-size="8.5" fill="#8A92A3" letter-spacing=".5">建国门外大街</text>
<text x="256" y="67.4" font-size="8.5" fill="#8A92A3" letter-spacing=".5">建国路</text>
<text transform="translate(223 160) rotate(90)" font-size="8.5" fill="#9A7A2C" letter-spacing=".5">东三环中路</text>
<circle cx="168" cy="110" r="54" fill="${GR}" fill-opacity=".08" stroke="${GR}" stroke-opacity=".6" stroke-width="1.4" stroke-dasharray="4 4"/>
<g transform="translate(168 110)"><path d="M0 0c-8-9-12-15-12-21a12 12 0 0 1 24 0c0 6-4 12-12 21Z" fill="${K}"/><circle cx="0" cy="-21" r="4.5" fill="#fff"/></g>
<text x="168" y="134" text-anchor="middle" font-size="9.5" font-weight="600" fill="#3A4252" style="paint-order:stroke" stroke="#DADFE7" stroke-width="3">国贸三期店</text>
<circle cx="140" cy="152" r="11" fill="${K}" fill-opacity=".1"/><circle cx="140" cy="152" r="6" fill="${K}" stroke="#fff" stroke-width="2.5"/>
</svg>`;
const b1 = `<div class="scr x16 pc">${statusBar()}
<div class="hd"><h1>打卡</h1><div class="btn2" style="height:36px;padding:0 12px;font-size:14px">${IC('history', 17)}记录</div></div>
<div class="map">${mapSvg}</div>
<div class="loc">${dot(GR)}已在打卡范围内 · 国贸三期店</div>
<div class="clk n">09:41:26</div>
<div class="sh">今天 中班 <b>10:00 – 18:00</b></div>
<div class="btn big">${IC('log-in', 20)}上班打卡</div>
<div class="rec"><div>${IC('log-in', 18)}上班<b>--:--</b></div><div>${IC('log-out', 18)}下班<b>--:--</b></div></div>
${tabs(1)}${homeBar()}</div>`;

// ——— 员工 App：审批（店长视角） ———
const aps = [
  ['郑', '郑磊 · 请假', '事假　10/31 周六 <span class="n">14:00–22:00</span>'],
  ['刘', '刘洋 · 补卡', '10/26 周一 下班 <span class="n">22:00</span>'],
  ['陆', '陆逸 · 换班', '与孙悦互换 11/01 周日晚班'],
];
const b2 = `<div class="scr x16 apv">${statusBar()}
<div class="hd"><h1>审批</h1><div class="btn2" style="height:36px;width:36px;padding:0;justify-content:center">${IC('sliders-horizontal', 18)}</div></div>
<div class="tb"><span class="on">待处理<em class="n">3</em></span><span>已处理</span><span>我发起的</span></div>
<div class="ap">${aps.map(([a, t, p], i) => `<div><div class="av">${a}</div><div><b>${t}</b><p>${p}</p>${i === 0 ? `<div class="acts"><div class="btn2">驳回</div><div class="btn">通过</div></div>` : ''}</div><div class="st">${dot(AM)}待审批</div></div>`).join('')}</div>
<div class="sec">本周已处理</div>
<div class="err">${IC('wifi-off', 30)}<b>加载失败</b><div class="btn2" style="height:40px;font-size:15px">${IC('refresh-cw', 16)}重试</div></div>
${tabs(2)}${homeBar()}</div>`;

// ——— 电脑后台：周排班表 ———
const E = '07:00–15:00', Z = '10:00–18:00', W = '14:00–22:00', P = '18:00–22:00';
const staff = [
  ['吴', '吴晓雨', '咖啡师', [[E, GR], [E, AM], Z, 0, W, W, 0], '40.0'],
  ['郑', '郑磊', '咖啡师', [[Z, GR], [Z, GR], [E, GR], 0, 0, [W, AM], Z], '40.0'],
  ['陆', '陆逸', '收银', [[W, GR], [W, GR], 0, Z, Z, E, 0], '40.0'],
  ['赵', '赵敏', '店长', [[E, GR], [E, GR], [E, GR], E, E, 0, 0], '40.0'],
  ['杨', '杨婷', '店员', [0, [Z, AM], Z, W, W, Z, 0], '40.0'],
  ['刘', '刘洋', '店员', [[W, RD], 0, W, W, Z, W, 0], '40.0'],
  ['孙', '孙悦', '收银', [[Z, GR], [W, GR], 0, 0, E, E, W], '40.0'],
  ['谢', '谢嘉', '兼职', [0, 0, P, 0, P, Z, Z], '24.0'],
];
const cell = (c) => {
  if (c === 0) return `<div class="cp rs">休</div>`;
  if (Array.isArray(c)) return `<div class="cp">${dot(c[1])}${c[0]}</div>`;
  return `<div class="cp">${c}</div>`;
};
const heads = [['一', '10/26'], ['二', '10/27'], ['三', '10/28', 1], ['四', '10/29'], ['五', '10/30'], ['六', '10/31'], ['日', '11/01']];
// 每天排了多少工时（按下面的表加出来：48 48 44 32 52 56 24，合计 304），今天周三用品牌蓝
const bars = `<div class="bars">${[['一', 48], ['二', 48], ['三', 44, 1], ['四', 32], ['五', 52], ['六', 56], ['日', 24]].map(([d, h, c]) => `<div><i class="${c ? 'c' : ''}" style="height:${Math.round(h * 0.68)}px"></i><span>${d}</span></div>`).join('')}</div>`;
const web = `<div class="x16 web">
<div class="side"><div class="brand">${MARK(28)}<b>工时</b><span>GONGSHI</span></div>
<div class="store">${IC('store', 18)}国贸三期店${IC('chevrons-up-down', 16)}</div>
<div class="nv">${[['layout-dashboard', '概览'], ['calendar-days', '排班', 'on'], ['clock-3', '考勤'], ['file-check-2', '审批', '', '3'], ['users-round', '员工'], ['chart-column', '报表'], ['settings', '设置']]
  .map(([ic, t, c, n]) => `<div class="${c || ''}">${IC(ic, 19)}${t}${n ? `<em>${n}</em>` : ''}</div>`).join('')}</div>
<div class="me"><div class="av" style="width:36px;height:36px;font-size:14px">赵</div><div>赵敏<small>店长</small></div></div></div>
<div class="main">
<div class="mh"><h2>排班</h2><div class="wsw">${IC('chevron-left', 18)}<span>10/26 – 11/01</span>${IC('chevron-right', 18)}</div><div class="btn2" style="height:40px">本周</div><div class="sp"></div>
<div class="btn2">${IC('download', 18)}导出</div><div class="btn">${IC('send', 18)}发布排班</div></div>
<div class="kp">
<div><span>出勤率</span><b class="n">96.4<small>%</small></b></div>
<div><span>预计人力成本</span><b class="n">¥8,512</b></div>
<div><span>${dot(AM)}待审批</span><b class="n">3</b></div>
<div class="wd"><div><span>排班工时</span><b class="n">304.0<small>h</small></b></div>${bars}</div></div>
<div class="fl"><div class="f">岗位 <b>全部</b>${IC('chevron-down', 16)}</div><div class="f">班次 <b>全部</b>${IC('chevron-down', 16)}</div><div class="f q">${IC('search', 17)}搜索员工</div>
<div class="lg"><span>${dot(GR)}正常</span><span>${dot(AM)}迟到 / 待批</span><span>${dot(RD)}缺卡</span></div></div>
<table><colgroup><col style="width:140px">${heads.map(() => '<col>').join('')}<col style="width:94px"></colgroup>
<tr><th>员工</th>${heads.map(([w, d, c]) => `<th class="${c ? 'cur' : ''}">${w} <span class="n">${d}</span></th>`).join('')}<th>工时</th></tr>
${staff.map(([a, n, r, cs, h]) => `<tr><td><div class="em"><i>${a}</i><div><b>${n}</b><small>${r}</small></div></div></td>${cs.map((c) => `<td>${cell(c)}</td>`).join('')}<td class="hr${h === '24.0' ? ' lo' : ''}">${h}</td></tr>`).join('')}
<tr><td><div class="em"><i style="background:none;border:1px dashed #CDD2DA">${IC('plus', 15)}</i><div><b style="color:${T2}">待分配</b><small>2 个班</small></div></div></td>${[0, 0, 0, 1, 2, 0, 0].map((c) => `<td>${c === 0 ? '' : `<div class="cp op${c === 1 ? ' sel' : ''}">${c === 1 ? Z : W}</div>`}</td>`).join('')}<td class="hr lo">16.0</td></tr>
</table></div></div>`;

// ——— 半山咖啡 ———
const cmp = `<div class="scr x16 cmp">${statusBar()}
<div class="hd" style="margin-top:10px"><div class="brand" style="padding:0;gap:9px"><svg width="30" height="30" viewBox="0 0 24 24"><rect width="24" height="24" rx="6.5" fill="${B}"/><path d="M4.5 17.5 10 9.5l3.2 4.4 2.3-2.9 4 6.5Z" fill="#fff"/></svg><b style="font-size:21px">半山咖啡</b><span>BANSHAN</span></div></div>
<div class="cl">今日推荐</div>
<div class="cc"><div class="ph"><i style="background-image:url(${img('latte-croissant-wood')})"></i></div><div class="cr"><b>桂花拿铁</b><em class="n">¥28</em></div></div>
<div class="ci"><div>${IC('map-pin', 18)}东四店<span>到店自取约 <span class="n">6</span> 分钟</span></div><div>${IC('award', 18)}会员积分<b class="n">1,280</b></div></div>
<div class="btn cb">去点单</div>
<div class="tabs">${[['house', '首页'], ['coffee', '菜单'], ['receipt-text', '订单'], ['user-round', '我的']].map(([ic, t], i) => `<div class="${i === 0 ? 'on' : ''}">${IC(ic, 24)}<span>${t}</span></div>`).join('')}</div>
${homeBar()}</div>`;

module.exports = {
  css,
  screens: { 's16-hero': hero, 's16-b1': b1, 's16-b2': b2, 's16-web': web, 's16-cmp': cmp },
  desktop: ['s16-web'],
  zoom: [208, 196],
  marks: [[352, 296], [200, 374], [292, 626], [356, 519]],
  palette: [['纯白', '#FFFFFF'], ['浅灰', BG], ['工时蓝', B], ['正文灰', T2], ['墨蓝黑', K]],
  type: { font: '"PingFang SC"', weight: 600, sample: `工<span style="font-size:.62em;margin-left:.1em">工</span><span style="font-size:.4em;margin-left:.1em">工</span>`, style: 'display:flex;align-items:baseline', lines: [['标题', '苹方 中粗'], ['正文', '思源黑体'], ['数字', 'Inter 等宽']] },
  stageA: B,
  stageB: {
    bg: B, color: '#fff', url: 'app.gongshi.cn',
    // 两台手机压在网页上：左边那台的上沿落在侧栏「考勤」和「审批」之间，右边盖住头像、露出姓名；右边那台的左边落在「六」和「日」两列之间，露出来的格子都是完整的
    html: `<div style="position:absolute;left:62px;top:88px">${browser(web, { w: 780, url: 'app.gongshi.cn' })}</div>
<div style="position:absolute;left:15px;top:300px">${phone(b1, { w: 200 })}</div>
<div style="position:absolute;left:700px;top:250px">${phone(b2, { w: 200 })}</div>`,
  },
  page: (no) => stylePages(no, 's16-pro', module.exports),
};
