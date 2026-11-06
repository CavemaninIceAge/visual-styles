// 13 暗夜科技 Dark Tech —— 极点 JIDIAN（AI 会议纪要，App + 电脑版）
// 今天 10-28 周三，状态栏 9:41：08:30–09:18 开完「Q4 产品路线评审」（纪要已出，要点 4 条、待办 3 条），09:30 起正在录「增长周会」
// 人名：沈舟（产品）、陈默（工程），头像另有姚、冯、邓；全书一个姓只出现一次
const { img, icon, statusBar, homeBar, phone, browser } = require('../lib');
const { stylePages } = require('../page');

const A = '#58B4FF';                 // 冷光蓝：全套唯一的彩色，只给进度、正在发生的事、搜索命中、主按钮（色相 207°，和 14 的湖青拉开 26°）
const Ar = '88,180,255';
const C = { bg: '#0A0C10', p1: '#15181D', p2: '#1A1D23', t1: '#E8EAEE', t2: '#9399A4', t3: '#5E636D', ln: 'rgba(255,255,255,.08)', ln2: 'rgba(255,255,255,.13)' };

// 极点的记号：俯看极点的三道纬线圈 + 中心一点
const mark = (s = 18, c = C.t1) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.4"><circle cx="12" cy="12" r="10.3"/><circle cx="12" cy="12" r="6.4" stroke-opacity=".7"/><circle cx="12" cy="12" r="2.6" fill="${c}" stroke="none"/></svg>`;

// 声波：固定的伪随机高度，夹着几处停顿，像真人说话
function levels(n, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const v = Math.abs(Math.sin(i * 0.53 + seed) * 0.5 + Math.sin(i * 1.37 + seed * 2.1) * 0.32 + Math.sin(i * 0.11 + seed) * 0.28);
    const gap = Math.sin(i * 0.19 + seed * 3) > 0.86 ? 0.25 : 1;
    out.push(Math.max(0.12, Math.min(1, v * gap * 1.15)));
  }
  return out;
}
// 播放条的波形：已播部分冷光蓝发光，未播部分灰
function waveBar({ n = 64, h = 30, at = 0.49, w = 2, gap = 2, seed = 1 } = {}) {
  const L = levels(n, seed), k = Math.round(n * at);
  const bar = (v, i) => `<i style="height:${Math.max(3, Math.round(v * h))}px;width:${w}px;margin-right:${gap}px"></i>`;
  return `<span class="wv" style="height:${h}px"><span class="on">${L.slice(0, k).map(bar).join('')}</span><span class="ph"></span><span class="off">${L.slice(k).map(bar).join('')}</span></span>`;
}
const av = (t, s = 24) => `<span class="av" style="width:${s}px;height:${s}px;font-size:${Math.round(s * .46)}px">${t}</span>`;
const box = (done, s = 18) => `<span class="ck${done ? ' on' : ''}" style="width:${s}px;height:${s}px">${done ? icon('check', Math.round(s * .66), 2.4) : ''}</span>`;

const css = `
.x13{background:${C.bg};color:${C.t1};font-family:"Inter","Noto Sans SC",sans-serif;font-feature-settings:"cv11","ss01";letter-spacing:0}
.x13 .mo{font-family:"JetBrains Mono","Noto Sans SC",monospace;font-variant-numeric:tabular-nums;letter-spacing:0}
.x13 .tag{font-family:"JetBrains Mono","Noto Sans SC",monospace;font-size:12px;line-height:16px;letter-spacing:.06em;color:${C.t3};display:flex;align-items:center;gap:7px}
.x13 .tag .mo{color:#4A4F58}
.x13 .t2{color:${C.t2}}.x13 .t3{color:${C.t3}}.x13 .ac{color:${A}}
.x13 .glow{position:absolute;left:-40px;right:-40px;top:-170px;height:400px;background:radial-gradient(50% 50% at 50% 50%,rgba(${Ar},.26) 0%,rgba(${Ar},.09) 42%,rgba(${Ar},0) 100%);pointer-events:none}
.x13 .av{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:${C.p2};color:${C.t2};border:1px solid ${C.ln2};font-weight:500;flex:none}
.x13 .ck{width:18px;height:18px;border-radius:5px;border:1px solid rgba(255,255,255,.24);display:inline-flex;align-items:center;justify-content:center;flex:none;color:${C.bg}}
.x13 .ck.on{background:${C.t1};border-color:${C.t1}}
.x13 .wv{display:flex;align-items:center;position:relative}
.x13 .wv>span{display:flex;align-items:center;height:100%}
.x13 .wv i{display:block;border-radius:1px;background:#383C44}
.x13 .wv .on i{background:${A}}
.x13 .wv .on{filter:drop-shadow(0 0 5px rgba(${Ar},.55))}
.x13 .wv .ph{width:1px;height:140%;background:${A};margin:0 3px 0 1px;box-shadow:0 0 8px rgba(${Ar},.9)}
.x13 .nv{position:absolute;left:0;right:0;top:50px;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:${C.t2};z-index:2}
.x13 .nv .r{display:flex;gap:18px}

/* hero 会议纪要 */
.x13.h .glow{top:-150px;height:420px;background:radial-gradient(50% 50% at 50% 50%,rgba(${Ar},.34) 0%,rgba(${Ar},.11) 44%,rgba(${Ar},0) 100%)}
.x13.h .hd{position:absolute;left:20px;right:20px;top:104px}
.x13.h .meta{font-size:12.5px;line-height:16px;color:${C.t2};letter-spacing:-.01em}
.x13.h h1{font-size:31px;line-height:38px;font-weight:600;letter-spacing:-.035em;margin-top:8px;color:#F4F5F7}
.x13.h .ppl{display:flex;align-items:center;margin-top:12px}
.x13.h .ppl .av{margin-right:-6px;box-shadow:0 0 0 2px ${C.bg}}
.x13.h .ppl em{font-style:normal;font-size:12.5px;color:${C.t2};margin-left:16px}
.x13.h .pc{position:absolute;left:16px;right:16px;top:226px;height:196px;border-radius:18px;border:1px solid ${C.ln2};background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.012) 62%)}
.x13.h .pc:before{content:"";position:absolute;left:18px;right:40px;top:-1px;height:1px;background:linear-gradient(90deg,rgba(${Ar},0),rgba(${Ar},.95) 38%,rgba(${Ar},.5) 62%,rgba(${Ar},0))}
.x13.h .pc .amb{position:absolute;left:-10px;width:250px;top:-70px;height:230px;background:radial-gradient(50% 50% at 50% 50%,rgba(${Ar},.2),rgba(${Ar},0));pointer-events:none}
.x13.h .pc .wv{position:absolute;left:16px;top:22px}
.x13.h .pc .wv .on{filter:drop-shadow(0 0 7px rgba(${Ar},.65))}
.x13.h .pc .tt{position:absolute;left:16px;right:16px;top:106px;display:flex;justify-content:space-between;font-size:12.5px;line-height:16px}
.x13.h .pc .now{position:absolute;left:16px;right:16px;top:138px;display:flex;align-items:center;gap:12px}
.x13.h .play{width:40px;height:40px;border-radius:50%;background:${C.t1};color:${C.bg};display:flex;align-items:center;justify-content:center;flex:none}
.x13.h .pc .now .w{font-size:12.5px;line-height:16px;color:${C.t2}}
.x13.h .pc .now p{font-size:14.5px;line-height:20px;color:${C.t1};margin-top:2px;white-space:nowrap}
.x13.h .sec{position:absolute;left:20px;right:20px}
.x13.h .lb{margin-bottom:4px}
.x13.h .row{display:flex;align-items:flex-start;gap:14px;padding:11px 0;border-top:1px solid ${C.ln};font-size:15px;line-height:21px;color:#D6D9DF}
.x13.h .row:first-of-type{border-top:none}
.x13.h .row .mo{font-size:12.5px;line-height:21px;color:${C.t3};width:42px;flex:none}
.x13.h .td{align-items:center}
.x13.h .td .tx{flex:1}
.x13.h .td.dn .tx{color:${C.t3};text-decoration:line-through;text-decoration-color:rgba(255,255,255,.25)}
.x13.h .td .mo{width:auto;text-align:right}

/* b1 正在录音 */
.x13.b1 .cg{position:absolute;left:-80px;right:-80px;top:180px;height:420px;background:radial-gradient(50% 50% at 50% 50%,rgba(${Ar},.17) 0%,rgba(${Ar},.05) 50%,rgba(${Ar},0) 100%)}
.x13.b1 .live{display:flex;align-items:center;gap:8px;color:${C.t1};font-size:14px;font-weight:500}
.x13.b1 .live i{width:7px;height:7px;border-radius:50%;background:${A};box-shadow:0 0 0 3px rgba(${Ar},.18),0 0 10px rgba(${Ar},.9)}
.x13.b1 .ttl{position:absolute;left:0;right:0;top:112px;text-align:center;font-size:14px;color:${C.t2};letter-spacing:-.01em}
.x13.b1 .clk{position:absolute;left:0;right:0;top:140px;text-align:center;font-size:68px;line-height:80px;font-weight:200;color:#F4F5F7;text-shadow:0 0 28px rgba(255,255,255,.12)}
.x13.b1 .mw{position:absolute;left:20px;right:20px;top:262px;height:132px;display:flex;align-items:center;justify-content:center;gap:2.6px}
.x13.b1 .mw i{display:block;width:3px;border-radius:2px;background:#3A3E46}
.x13.b1 .mw i.a{background:${A};box-shadow:0 0 8px rgba(${Ar},.7)}
.x13.b1 .tr{position:absolute;left:20px;right:20px;top:430px}
.x13.b1 .ln{display:flex;gap:12px;padding:14px 0;border-top:1px solid ${C.ln}}
.x13.b1 .ln:first-child{border-top:none}
.x13.b1 .ln .who{display:flex;align-items:center;gap:8px;font-size:12.5px;color:${C.t2}}
.x13.b1 .ln p{font-size:15px;line-height:22px;margin-top:6px}
.x13.b1 .ln.old p{color:${C.t3}}
.x13.b1 .ctl{position:absolute;left:0;right:0;top:690px;display:flex;align-items:center;justify-content:center;gap:40px}
.x13.b1 .ctl .s{width:52px;height:52px;border-radius:50%;border:1px solid ${C.ln2};display:flex;align-items:center;justify-content:center;color:${C.t2}}
.x13.b1 .ctl .stop{width:72px;height:72px;border-radius:50%;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center}
.x13.b1 .ctl .stop i{width:24px;height:24px;border-radius:6px;background:${C.t1}}

/* b2 搜索 */
.x13.b2 .sf{position:absolute;left:16px;right:72px;top:60px;height:44px;border-radius:12px;background:${C.p1};border:1px solid ${C.ln2};display:flex;align-items:center;gap:10px;padding:0 14px;color:${C.t2}}
.x13.b2 .sf b{font-weight:400;color:${C.t1};font-size:16px}
.x13.b2 .sf .cr{width:1.5px;height:20px;background:${A};box-shadow:0 0 6px rgba(${Ar},.9);margin-left:-8px}
.x13.b2 .cn{position:absolute;right:16px;top:60px;height:44px;display:flex;align-items:center;font-size:15px;color:${C.t2}}
.x13.b2 .ft{position:absolute;left:0;right:0;top:118px;height:40px;border-bottom:1px solid ${C.ln};display:flex;gap:22px;padding:0 20px;font-size:13.5px;color:${C.t3}}
.x13.b2 .ft span,.x13.b2 .ft b{display:flex;align-items:center;gap:6px;height:40px;position:relative}
.x13.b2 .ft b{font-weight:500;color:${C.t1}}
.x13.b2 .ft b:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:${C.t1}}
.x13.b2 .ft .mo{font-size:11.5px;color:${C.t3}}
.x13.b2 .ls{position:absolute;left:12px;right:12px;top:172px}
.x13.b2 .lb{padding:12px 8px 8px}
.x13.b2 .it{padding:11px 8px 12px;border-radius:10px;border:1px solid transparent}
.x13.b2 .it.sel{background:rgba(255,255,255,.035);border-color:${C.ln}}
.x13.b2 .it .m{display:flex;justify-content:space-between;font-size:12.5px;color:${C.t2}}
.x13.b2 .it .m .mo{color:${C.t3};font-size:12px}
.x13.b2 .it p{font-size:14.5px;line-height:21px;color:#D6D9DF;margin-top:4px}
.x13.b2 .it em{font-style:normal;color:${A};background:rgba(${Ar},.12);border-radius:3px;padding:0 2px;box-shadow:0 0 12px rgba(${Ar},.18)}
.x13.b2 .mt{display:flex;align-items:center;gap:12px;padding:12px 8px;border-top:1px solid ${C.ln}}
.x13.b2 .mt:first-of-type{border-top:none}
.x13.b2 .mt .ic{color:${C.t2}}
.x13.b2 .mt .n{flex:1;font-size:14.5px;color:#D6D9DF}
.x13.b2 .mt .mo{font-size:12px;color:${C.t3}}

/* web 电脑版：左边图标栏，中栏今天的会议，右边详情。参考页里缩到 0.625 倍，所以设计稿上的字都不小于 16px；
   参考页两台手机压住左下（x<266, y>272）和右下（x>1030, y>250），字都排在露出来的地方，不被切开 */
.x13.web{font-size:18px}
.x13.web .tag{font-size:16px;line-height:20px;letter-spacing:.05em;gap:9px}
.x13.web .rail{position:absolute;left:0;top:0;bottom:0;width:72px;border-right:1px solid ${C.ln};background:#0C0E12;display:flex;flex-direction:column;align-items:center;padding-top:18px}
.x13.web .rail .lg{height:46px;display:grid;place-items:center;margin-bottom:22px}
.x13.web .rail a{width:46px;height:46px;border-radius:11px;display:grid;place-items:center;color:${C.t3};margin-bottom:10px}
.x13.web .rail a.on{background:rgba(255,255,255,.07);color:${C.t1};box-shadow:inset 0 0 0 1px ${C.ln}}
.x13.web .rail .me{position:absolute;bottom:22px}
.x13.web .lst{position:absolute;left:72px;top:0;bottom:0;width:368px;border-right:1px solid ${C.ln};background:#0B0D11}
.x13.web .lst .hd{height:64px;display:flex;align-items:center;gap:14px;padding:0 28px;border-bottom:1px solid ${C.ln};font-size:21px;font-weight:600}
.x13.web .lst .hd .mo{font-size:16px;color:${C.t3};font-weight:400}
.x13.web .lst .hd .r{margin-left:auto;color:${C.t2};display:flex}
.x13.web .mi{position:relative;padding:20px 28px;border-bottom:1px solid ${C.ln}}
.x13.web .mi b{display:block;font-weight:500;font-size:20px;line-height:28px;color:#DADDE3;white-space:nowrap}
.x13.web .mi .m{display:flex;gap:20px;margin-top:8px;font-size:16px;line-height:20px;color:${C.t3}}
.x13.web .mi.on{background:rgba(255,255,255,.04)}
.x13.web .mi.on:before{content:"";position:absolute;left:0;top:16px;bottom:16px;width:2px;background:${A};box-shadow:0 0 10px rgba(${Ar},.9)}
.x13.web .mi.on b{color:#F4F5F7}
.x13.web .mi .rec{display:flex;align-items:center;gap:8px;color:${A}}
.x13.web .mi .rec i{width:8px;height:8px;border-radius:50%;background:${A};box-shadow:0 0 8px rgba(${Ar},.9)}
.x13.web .dt2{position:absolute;left:440px;right:0;top:0;bottom:0;overflow:hidden}
.x13.web .dt2 .glow{left:0;right:0;top:-240px;height:460px}
.x13.web .dt2 .tb{height:64px;display:flex;align-items:center;justify-content:flex-end;gap:22px;padding:0 32px 0 48px;border-bottom:1px solid ${C.ln};color:${C.t2};position:relative}
.x13.web .dt2 .tb .s{margin-right:auto;font-size:16px;color:${C.t3}}
.x13.web .dt2 .bd{position:absolute;left:48px;right:48px;top:92px}
.x13.web .dt2 .meta{font-size:16px;line-height:22px;color:${C.t2}}
.x13.web .dt2 h1{font-size:46px;line-height:54px;font-weight:600;letter-spacing:-.035em;margin-top:6px;color:#F4F5F7}
.x13.web .dt2 .ppl{display:flex;align-items:center;margin-top:12px;height:36px}
.x13.web .dt2 .ppl .av{margin-right:-8px;box-shadow:0 0 0 2px ${C.bg}}
.x13.web .dt2 .ppl em{font-style:normal;font-size:16px;color:${C.t2};margin-left:22px}
.x13.web .dt2 .pl{position:absolute;left:0;right:0;top:152px;height:84px;display:flex;align-items:center;gap:20px;padding:0 24px;border:1px solid ${C.ln2};border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.012));box-shadow:0 0 48px -8px rgba(${Ar},.22);overflow:hidden}
.x13.web .dt2 .pl:before{content:"";position:absolute;left:24px;right:120px;top:-1px;height:1px;background:linear-gradient(90deg,rgba(${Ar},0),rgba(${Ar},.95) 40%,rgba(${Ar},0))}
.x13.web .dt2 .pl .play{width:46px;height:46px;border-radius:50%;background:${C.t1};color:${C.bg};display:flex;align-items:center;justify-content:center;flex:none}
.x13.web .dt2 .pl .tc{font-size:17px;color:${C.t3};white-space:nowrap;flex:none}
.x13.web .kp{position:absolute;left:0;right:0;top:268px}
.x13.web .lb{height:30px}
.x13.web .row{display:flex;align-items:center;gap:20px;height:50px;border-top:1px solid ${C.ln};font-size:19px;line-height:26px;color:#D6D9DF;white-space:nowrap}
.x13.web .lb+.row{border-top:none}
.x13.web .row .mo{font-size:16px;color:${C.t3};width:52px;flex:none}
.x13.web .trs{position:absolute;left:0;right:0;top:520px}
.x13.web .tl{position:relative;display:flex;gap:16px;padding:8px 0 8px 18px}
.x13.web .tl .who{display:flex;gap:14px;align-items:baseline;font-size:16px;line-height:20px;color:${C.t2}}
.x13.web .tl .who .mo{font-size:16px;color:${C.t3}}
.x13.web .tl .who .ac{color:${A}}
.x13.web .tl p{font-size:19px;line-height:28px;color:${C.t3};margin-top:2px}
.x13.web .tl.on p{color:#E8EAEE}
.x13.web .tl.on:before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:1px;background:${A};box-shadow:0 0 8px rgba(${Ar},.9)}

/* cmp 半山咖啡 */
.x13.cmp .glow{top:-190px;height:420px}
.x13.cmp .wm{position:absolute;left:20px;top:58px;height:40px;display:flex;align-items:center;gap:9px}
.x13.cmp .wm b{font-family:"Noto Sans SC";font-weight:600;font-size:20px;letter-spacing:.04em}
.x13.cmp .wm .mo{font-size:11px;color:${C.t3};letter-spacing:.22em;margin-top:2px}
.x13.cmp .pts{position:absolute;right:20px;top:58px;height:40px;display:flex;align-items:baseline;gap:8px;padding-top:11px}
.x13.cmp .pts span{font-family:"JetBrains Mono","Noto Sans SC",monospace;font-size:12px;color:${C.t3};letter-spacing:.04em}
.x13.cmp .pts b{font-family:"JetBrains Mono",monospace;font-weight:500;font-size:18px;color:${C.t1};letter-spacing:-.02em}
.x13.cmp .ph{position:absolute;left:20px;right:20px;top:110px;height:350px;border-radius:14px;overflow:hidden;border:1px solid ${C.ln2};background:#07090C}
.x13.cmp .ph img{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:50% 74%;filter:grayscale(.6) brightness(.86) contrast(1.12)}
.x13.cmp .ph .tn{position:absolute;inset:0;background:linear-gradient(200deg,rgba(${Ar},.22),rgba(${Ar},0) 46%);mix-blend-mode:screen}
.x13.cmp .ph:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,12,16,.35) 0%,rgba(10,12,16,0) 26%,rgba(10,12,16,0) 56%,rgba(10,12,16,.82) 100%)}
.x13.cmp .ph .lb{position:absolute;left:16px;bottom:16px;z-index:2;color:${C.t2}}
.x13.cmp .edge{position:absolute;left:40px;right:40px;top:109px;height:1px;z-index:3;background:linear-gradient(90deg,rgba(${Ar},0),rgba(${Ar},.95) 45%,rgba(${Ar},0));box-shadow:0 0 14px 1px rgba(${Ar},.55)}
.x13.cmp .nm{position:absolute;left:20px;right:20px;top:482px;display:flex;align-items:baseline;justify-content:space-between}
.x13.cmp .nm h1{font-size:34px;line-height:40px;font-weight:600;letter-spacing:-.03em;color:#F4F5F7}
.x13.cmp .nm .mo{font-size:30px;color:${C.t1};letter-spacing:-.04em}
.x13.cmp .st{position:absolute;left:20px;right:20px;top:538px;padding-top:14px;border-top:1px solid ${C.ln};font-size:14px;color:${C.t2};display:flex;justify-content:space-between}
.x13.cmp .go{position:absolute;left:20px;right:20px;top:616px;height:56px;border-radius:12px;background:${A};color:#03111F;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:600;letter-spacing:.12em;box-shadow:0 0 0 1px rgba(${Ar},.4),0 0 36px rgba(${Ar},.45)}
.x13.cmp .tab{position:absolute;left:0;right:0;bottom:0;height:84px;border-top:1px solid ${C.ln};display:flex;justify-content:space-around;padding:10px 12px 0;background:${C.bg}}
.x13.cmp .tab span{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;color:${C.t3};font-family:"JetBrains Mono","Noto Sans SC",monospace}
.x13.cmp .tab span.on{color:${C.t1}}
`;

const play = icon('play', 16, 2, 'fill="currentColor"');
// Q4 产品路线评审的要点：手机和网页同一份（手机放得下前三条）
const KP = [['04:12', 'Q4 先上团队空间，权限放到下一版'], ['23:36', '专业版 ¥68 / 月，年付八折'], ['31:05', '转写延迟压到 2 秒以内'], ['42:48', '团队空间先给 20 家种子客户试用']];

const hero = `<div class="scr x13 h">${statusBar(true)}<div class="glow"></div>
<div class="nv">${icon('chevron-left', 24, 1.6)}<span class="r">${icon('share', 20, 1.5)}${icon('ellipsis', 20, 1.5)}</span></div>
<div class="hd"><p class="meta mo">2026-10-28 周三 · 08:30–09:18</p><h1>Q4 产品路线评审</h1>
<div class="ppl">${av('沈')}${av('陈')}${av('姚')}${av('冯')}${av('邓')}<em>5 人 · <span class="mo">48:12</span></em></div></div>
<div class="pc"><div class="amb"></div>${waveBar({ n: 62, h: 76, at: 0.49, w: 3, gap: 2, seed: 1.7 })}
<div class="tt mo"><span class="ac">23:41</span><span class="t3">48:12</span></div>
<div class="now"><span class="play">${play}</span><div><p class="w">沈舟 · <span class="mo">23:36</span></p><p>专业版定价 68 一个月，年付打八折。</p></div></div></div>
<div class="sec" style="top:442px"><p class="lb tag">${icon('sparkles', 12, 1.6)}要点<span class="mo">04</span></p>
${KP.slice(0, 3).map(([t, x]) => `<div class="row"><span class="mo">${t}</span><span>${x}</span></div>`).join('')}</div>
<div class="sec" style="top:612px"><p class="lb tag">待办<span class="mo">1/3</span></p>
<div class="row td dn">${box(true)}<span class="tx">更新定价页文案</span>${av('沈', 20)}<span class="mo">10/30</span></div>
<div class="row td">${box(false)}<span class="tx">确认 iOS 排期</span>${av('陈', 20)}<span class="mo">10/31</span></div>
<div class="row td">${box(false)}<span class="tx">整理转写延迟数据</span>${av('姚', 20)}<span class="mo">11/03</span></div></div>
${homeBar(true)}</div>`;

const mw = levels(56, 4.2).map((v, i) => {
  const hgt = Math.round(8 + v * 112 * (0.3 + 0.7 * Math.sin(Math.PI * (i + 3) / 62)));
  return `<i class="${i >= 47 ? 'a' : ''}" style="height:${hgt}px;opacity:${(0.3 + 0.7 * i / 55).toFixed(2)}"></i>`;
}).join('');
const b1 = `<div class="scr x13 b1">${statusBar(true)}<div class="cg"></div>
<div class="nv">${icon('chevron-down', 24, 1.6)}<span class="live"><i></i>正在录音</span><span style="width:24px"></span></div>
<p class="ttl">增长周会</p>
<p class="clk mo">11:26</p>
<div class="mw">${mw}</div>
<div class="tr">
<div class="ln old"><div><div class="who">${av('陈', 20)}陈默 <span class="mo t3">10:48</span></div><p>华东区上周试用转付费 18%，比九月高了 4 个点。</p></div></div>
<div class="ln"><div><div class="who">${av('沈', 20)}沈舟 <span class="mo t3">11:09</span></div><p>那团队版先在华东推，报价单月底前发给销售。</p></div></div>
</div>
<div class="ctl"><span class="s">${icon('bookmark', 20, 1.5)}</span><span class="stop"><i></i></span><span class="s">${icon('pause', 20, 1.5)}</span></div>
${homeBar(true)}</div>`;

const b2 = `<div class="scr x13 b2">${statusBar(true)}
<div class="sf">${icon('search', 18, 1.6)}<b>定价</b><span class="cr"></span></div><span class="cn">取消</span>
<div class="ft"><b>全部 <span class="mo">12</span></b><span>片段 <span class="mo">9</span></span><span>会议 <span class="mo">2</span></span><span>待办 <span class="mo">1</span></span></div>
<div class="ls">
<p class="lb tag">片段<span class="mo">09</span></p>
<div class="it sel"><div class="m"><span>Q4 产品路线评审</span><span class="mo">10/28 · 23:36</span></div><p>专业版<em>定价</em> 68 一个月，年付打八折</p></div>
<div class="it"><div class="m"><span>销售周会</span><span class="mo">10/27 · 08:52</span></div><p>客户最常问的是团队版<em>定价</em>怎么算</p></div>
<div class="it"><div class="m"><span>客户访谈 · 远川物流</span><span class="mo">10/27 · 31:40</span></div><p>他们更在意按席位<em>定价</em>还是按时长</p></div>
<div class="it"><div class="m"><span>定价策略复盘</span><span class="mo">10/26 · 02:15</span></div><p>竞品的<em>定价</em>页把年付放在最前面</p></div>
<p class="lb tag">会议<span class="mo">02</span></p>
<div class="mt">${icon('audio-lines', 18, 1.5)}<span class="n"><em style="font-style:normal;color:${A}">定价</em>策略复盘</span><span class="mo">10/26 · 36:08</span></div>
<div class="mt">${icon('audio-lines', 18, 1.5)}<span class="n">销售周会</span><span class="mo">10/27 · 41:30</span></div>
<p class="lb tag">待办<span class="mo">01</span></p>
<div class="mt">${box(false)}<span class="n">更新<em style="font-style:normal;color:${A}">定价</em>页文案</span><span class="mo">10/30</span></div>
</div>
${homeBar(true)}</div>`;

const web = `<div class="x13 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<div class="rail"><div class="lg">${mark(28)}</div>
<a class="on">${icon('audio-lines', 22, 1.5)}</a><a>${icon('circle-check', 22, 1.5)}</a><a>${icon('search', 22, 1.5)}</a><a>${icon('star', 22, 1.5)}</a>
<span class="me">${av('沈', 36)}</span></div>
<div class="lst">
<div class="hd">今天<span class="mo">10/28</span><span class="r">${icon('plus', 22, 1.5)}</span></div>
<div class="mi"><b>增长周会</b><div class="m mo"><span>09:30</span><span class="rec"><i></i>11:26</span><span>4 人</span></div></div>
<div class="mi on"><b>Q4 产品路线评审</b><div class="m mo"><span>08:30</span><span>48:12</span><span>5 人</span></div></div>
</div>
<div class="dt2"><div class="glow"></div>
<div class="tb"><span class="s">产品组 / 会议</span>${icon('share', 20, 1.5)}${icon('star', 20, 1.5)}${icon('ellipsis', 20, 1.5)}</div>
<div class="bd">
<p class="meta mo">2026-10-28 周三 · 08:30–09:18</p>
<h1>Q4 产品路线评审</h1>
<div class="ppl">${av('沈', 36)}${av('陈', 36)}${av('姚', 36)}${av('冯', 36)}${av('邓', 36)}<em>5 人</em></div>
<div class="pl"><span class="play">${icon('play', 18, 2, 'fill="currentColor"')}</span><span class="tc mo"><span class="ac">23:41</span> / 48:12</span>${waveBar({ n: 86, h: 36, at: 0.49, w: 3, gap: 2.4, seed: 1.7 })}</div>
<div class="kp"><p class="lb tag">${icon('sparkles', 16, 1.6)}要点<span class="mo">04</span></p>
${KP.map(([t, x]) => `<div class="row"><span class="mo">${t}</span><span>${x}</span></div>`).join('')}</div>
<div class="trs"><p class="lb tag">转写</p>
<div class="tl">${av('陈', 36)}<div><div class="who">陈默<span class="mo">23:12</span></div><p>iOS 那边下周能给到排期。</p></div></div>
<div class="tl on">${av('沈', 36)}<div><div class="who">沈舟<span class="mo ac">23:36</span></div><p>专业版定价 68 一个月，年付打八折。</p></div></div>
</div></div></div>
</div>`;

// 半山咖啡自己的记号：细线半圆压在一条地平线上（半座山 / 半个日出）
const bsMark = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${C.t1}" stroke-width="1.5" stroke-linecap="round"><path d="M4.5 16a7.5 7.5 0 0 1 15 0"/><path d="M2 16h20"/><path d="M8.5 19.5h7" stroke-opacity=".5"/></svg>`;
const cmp = `<div class="scr x13 cmp">${statusBar(true)}<div class="glow"></div>
<div class="wm">${bsMark}<b>半山咖啡</b><span class="mo">BANSHAN</span></div>
<div class="pts"><span>积分</span><b>1,280</b></div>
<div class="ph"><img src="${img('latte-saucer-dark')}" alt=""><i class="tn"></i><span class="lb tag">今日推荐</span></div><i class="edge"></i>
<div class="nm"><h1>桂花拿铁</h1><span class="mo">¥28</span></div>
<div class="st"><span>东四店 · 到店自取</span><span>约 <span class="mo" style="color:${C.t1}">6</span> 分钟</span></div>
<div class="go">去点单</div>
<div class="tab"><span class="on">${icon('house', 22, 1.5)}首页</span><span>${icon('coffee', 22, 1.5)}菜单</span><span>${icon('receipt-text', 22, 1.5)}订单</span><span>${icon('user-round', 22, 1.5)}我的</span></div>
${homeBar(true)}</div>`;

const STAGE = '#121825';   // 冷蓝黑：比界面亮两档，黑手机的轮廓才看得出
const rings = (s, op = .07) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-opacity="${op}" stroke-width="${(100 / s).toFixed(3)}"><circle cx="50" cy="50" r="49.5"/><circle cx="50" cy="50" r="36"/><circle cx="50" cy="50" r="22.5"/><circle cx="50" cy="50" r="9"/></svg>`;

module.exports = {
  css,
  screens: { 's13-hero': hero, 's13-b1': b1, 's13-b2': b2, 's13-web': web, 's13-cmp': cmp },
  desktop: ['s13-web'],
  zoom: [440, 86],
  marks: [[16, 290], [361, 424], [336, 134], [-17, 484]],
  palette: [['深空', '#0A0C10'], ['面板灰', '#15181D'], ['冷光蓝', A], ['银灰', '#9399A4'], ['灰白', '#E8EAEE']],
  type: { font: '"Inter","Noto Sans SC"', weight: 600, sample: `极 <span style="font-family:'JetBrains Mono';font-weight:400;letter-spacing:-.04em">09</span>`, style: 'font-size:64px;letter-spacing:-.03em', lines: [['标题', 'Inter 紧排'], ['正文', '思源黑体'], ['数字', 'JetBrains Mono']] },
  stageA: `radial-gradient(56% 40% at 50% 46%,rgba(${Ar},.15) 0%,rgba(${Ar},0) 100%),${STAGE}`,
  decoA: `<div style="position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);pointer-events:none">${rings(820, .06)}</div>`,
  stageB: {
    bg: `radial-gradient(60% 50% at 50% 30%,rgba(${Ar},.13) 0%,rgba(${Ar},0) 100%),${STAGE}`, color: '#E8EAEE', url: 'jidian.ai',
    deco: `<div style="position:absolute;left:50%;top:30%;transform:translate(-50%,-50%);pointer-events:none">${rings(1100, .05)}</div>`,
    html: `<div style="position:absolute;left:68px;top:88px">${browser(web, { w: 800, url: 'jidian.ai' })}</div>
<div style="position:absolute;left:14px;top:296px">${phone(b1, { w: 206 })}</div>
<div style="position:absolute;left:712px;top:282px">${phone(b2, { w: 206 })}</div>`,
  },
  page: (no) => stylePages(no, 's13-dark', module.exports),
};
