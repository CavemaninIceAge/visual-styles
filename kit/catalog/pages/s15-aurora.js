// 15 弥散光 · 微光 GLIMMER（AI 测肤 App）
// 白底，几团高亮的光斑（橙、粉、紫、蓝）只在边上做氛围，信息放在白处；西文和数字用 Instrument Serif
const { img, icon, statusBar, homeBar, phone, browser } = require('../lib');
const { stylePages } = require('../page');

const C = { bg: '#FDFDFF', peach: '#FF8A4C', pink: '#FF5FA2', violet: '#7C6CFF', blue: '#3FB8FF', ink: '#14131B', gray: '#6E6B80' };
const RGB = { peach: '255,138,76', pink: '255,95,162', violet: '124,108,255', blue: '63,184,255' };
const CORE = { peach: '255,226,196', pink: '255,214,232', violet: '226,222,255', blue: '214,240,255' };
const GRAD = `linear-gradient(100deg,${C.peach},${C.pink} 34%,${C.violet} 68%,${C.blue})`;
const SERIF = '"Instrument Serif","Noto Sans SC",serif';

// 一团光：中心发亮、往外散开。[颜色, 圆心 x, 圆心 y, 直径, 不透明度]
const spot = ([c, x, y, d, o = 1], blur) => `<i class="orb" style="position:absolute;border-radius:50%;pointer-events:none;left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px;opacity:${o};background:radial-gradient(circle,rgba(${CORE[c]},1) 0%,rgba(${RGB[c]},.92) 26%,rgba(${RGB[c]},.42) 50%,rgba(${RGB[c]},0) 71%);filter:blur(${blur == null ? Math.round(d * .08) : blur}px)"></i>`;
const spots = (list, blur) => list.map((s) => spot(s, blur)).join('');

// 品牌记号：一颗渐变光球
const dot = (d = 18) => `<i class="dot" style="width:${d}px;height:${d}px"></i>`;
const wm = (s = 19, en = true) => `<span class="wm" style="font-size:${s}px">${dot(Math.round(s * 0.95))}微光${en ? '<em>Glimmer</em>' : ''}</span>`;
// 发光输入框
const ask = (text, style = '') => `<div class="ask" style="${style}"><i class="halo"></i><div class="in">${icon('sparkles', 20, 1.6)}<span>${text}</span><b>${icon('arrow-up', 18, 2.2)}</b></div></div>`;
const sf = (t) => `<span class="sf">${t}</span>`;

const css = `
.x15{background:${C.bg};color:${C.ink};font-family:"Noto Sans SC","PingFang SC",sans-serif}
.x15 .orb{position:absolute;border-radius:50%;pointer-events:none}
.x15 .sf{font-family:${SERIF};font-size:1.24em;line-height:1;letter-spacing:0}
.x15 .dot{display:inline-block;border-radius:50%;background:conic-gradient(from 200deg,${C.peach},${C.pink},${C.violet},${C.blue},${C.peach});box-shadow:0 0 10px rgba(255,111,174,.45);vertical-align:middle}
.x15 .wm{display:inline-flex;align-items:center;gap:8px;font-weight:600;letter-spacing:.02em}
.x15 .wm em{font-family:${SERIF};font-style:italic;font-weight:400;font-size:1.12em;letter-spacing:0;color:${C.gray};margin-left:-1px}
.x15 .hd{position:absolute;left:24px;right:24px;top:58px;height:40px;display:flex;align-items:center;justify-content:space-between;z-index:3}
.x15 .av{width:36px;height:36px;border-radius:50%;background-size:cover;background-position:center 30%;box-shadow:0 0 0 2px #fff}
.x15 .card{position:absolute;background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(24px) saturate(1.4);backdrop-filter:blur(24px) saturate(1.4);border-radius:26px;box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 0 0 1px rgba(20,19,27,.035),0 10px 30px -16px rgba(60,40,120,.2)}
.x15 .ask{position:absolute;height:56px}
.x15 .ask .halo{position:absolute;inset:-3px;border-radius:31px;background:${GRAD};filter:blur(12px);opacity:.55}
.x15 .ask .in{position:absolute;inset:0;border-radius:28px;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,${GRAD} border-box;display:flex;align-items:center;padding:0 8px 0 18px;gap:10px;font-size:16px;color:${C.gray}}
.x15 .ask .in>svg{color:${C.violet}}
.x15 .ask .in b{margin-left:auto;width:40px;height:40px;border-radius:50%;background:${C.ink};color:#fff;display:grid;place-items:center}
.x15 .k{font-size:13px;color:${C.gray};letter-spacing:.04em}
/* 报告 */
.x15.h .date{position:absolute;left:24px;top:116px}
.x15.h .date .k{font-size:14px}
.x15.h .date b{display:block;font-size:30px;font-weight:600;letter-spacing:-.01em;margin-top:6px}
.x15 .ring{position:absolute;border-radius:50%}
.x15 .ring .gw{position:absolute;inset:0;filter:blur(10px);opacity:.7}
.x15 .ring .core{position:absolute;inset:11px;border-radius:50%;background:radial-gradient(circle,#fff,rgba(255,255,255,.9) 62%,rgba(255,255,255,.4))}
.x15 .ring .g,.x15 .ring .gl{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,${C.peach},${C.pink} 30%,${C.violet} 58%,${C.blue} 86%,rgba(23,22,31,.07) 86.4%);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 11px),#000 calc(100% - 10px));mask:radial-gradient(farthest-side,transparent calc(100% - 11px),#000 calc(100% - 10px))}
.x15 .ring .gl{background:conic-gradient(from 0deg,${C.peach},${C.pink} 30%,${C.violet} 58%,${C.blue} 86%,transparent 86.4%)}
.x15 .ring .v{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.x15 .ring .v b{font-family:${SERIF};font-weight:400;font-size:138px;line-height:.8;letter-spacing:-.02em;margin:14px 0 0 -4px}
.x15.h .say{position:absolute;left:0;right:0;top:470px;text-align:center;font-size:18px;font-weight:500}
.x15.h .met{left:20px;right:20px;top:516px;height:112px;display:flex;align-items:center;padding:0 6px}
.x15 .met>div{flex:1;padding:0 18px}
.x15 .met>div+div{border-left:1px solid rgba(23,22,31,.07)}
.x15 .met b{display:block;font-family:${SERIF};font-size:42px;line-height:1;font-weight:400;letter-spacing:0;margin-top:6px}
.x15 .met i{display:block;height:4px;border-radius:2px;background:rgba(23,22,31,.07);margin-top:8px;overflow:hidden}
.x15 .met i:after{content:"";display:block;height:100%;width:var(--w);border-radius:2px;background:${GRAD}}
/* 测肤中 */
.x15.b1 .ttl{position:absolute;left:0;right:0;top:58px;height:40px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:600;gap:5px}
.x15.b1 .ttl svg{position:absolute;left:24px}
.x15.b1 .ttl em{font-family:${SERIF};font-style:italic;font-weight:400;font-size:21px}
.x15.b1 .face{position:absolute;left:20px;right:20px;top:108px;height:548px;border-radius:30px;overflow:hidden;box-shadow:0 18px 40px -22px rgba(60,40,120,.35)}
.x15.b1 .face .im{position:absolute;inset:0;background-size:585px auto;background-position:65% 37%;filter:saturate(.74) brightness(1.08) contrast(.96)}
.x15.b1 .face .tint{position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,138,76,.36),rgba(255,95,162,.12) 40%,rgba(124,108,255,.1) 72%,rgba(63,184,255,.26));mix-blend-mode:soft-light}
.x15.b1 .oval{position:absolute;left:57px;top:62px;width:220px;height:322px;border-radius:50%;border:1.5px solid rgba(255,255,255,.85);box-shadow:0 0 18px rgba(255,255,255,.35)}
.x15.b1 .scan{position:absolute;left:0;right:0;top:176px;height:132px;background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,95,162,.14) 45%,rgba(124,108,255,.3) 80%,rgba(63,184,255,.48));mix-blend-mode:screen}
.x15.b1 .scan:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#fff;box-shadow:0 0 10px 2px rgba(190,225,255,.95),0 0 34px 10px rgba(124,108,255,.55)}
.x15.b1 .pt{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px rgba(255,255,255,.28),0 0 12px rgba(255,255,255,.9)}
.x15.b1 .prog{position:absolute;left:24px;right:24px;top:680px}
.x15.b1 .prog .r{display:flex;align-items:baseline;justify-content:space-between}
.x15.b1 .prog .r span{font-size:21px;font-weight:600}
.x15.b1 .prog .r b{font-family:${SERIF};font-size:52px;line-height:1;font-weight:400}
.x15.b1 .prog .r b em{font-style:normal;color:${C.gray};margin:0 2px}
.x15.b1 .seg{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:14px}
.x15.b1 .seg i{position:relative;height:6px;border-radius:3px;background:rgba(23,22,31,.07);overflow:visible}
.x15.b1 .seg i.d{background:${GRAD};background-size:400% 100%}
.x15.b1 .seg i.d:nth-child(1){background-position:0 0}.x15.b1 .seg i.d:nth-child(2){background-position:33% 0}
.x15.b1 .seg i.a:after{content:"";position:absolute;left:0;top:0;bottom:0;width:58%;border-radius:3px;background:linear-gradient(90deg,${C.violet},${C.blue});box-shadow:0 0 14px rgba(124,108,255,.7)}
/* 对话 */
.x15.b2 .ttl{position:absolute;left:0;right:0;top:58px;height:40px;display:flex;align-items:center;justify-content:center}
.x15.b2 .ttl svg{position:absolute;left:24px}
.x15.b2 .me{position:absolute;right:20px;top:126px;max-width:290px;background:${C.ink};color:#fff;border-radius:22px 22px 6px 22px;padding:13px 18px;font-size:16px;line-height:1.5}
.x15.b2 .ai{position:absolute;left:24px;right:36px;font-size:17px;line-height:1.65}
.x15.b2 .ai .dot{margin:-3px 8px 0 0}
.x15.b2 .pd{left:20px;right:20px;top:300px;height:302px;padding:10px}
.x15.b2 .pd .ph{position:relative;height:196px;border-radius:18px;overflow:hidden}
.x15.b2 .pd .ph i{position:absolute;inset:0;background-size:330px auto;background-position:58% 45%;filter:saturate(.92) brightness(1.06) contrast(.97)}
.x15.b2 .pd .tx{display:flex;align-items:center;justify-content:space-between;padding:16px 8px 0 10px}
.x15.b2 .pd h4{font-size:18px;font-weight:600;line-height:1.3}
.x15.b2 .pd .k{margin-top:4px}
.x15.b2 .pd .pr{display:flex;align-items:center;gap:14px}
.x15.b2 .pd .pr b{font-family:${SERIF};font-size:32px;line-height:1;font-weight:400}
.x15.b2 .pd .pr span{width:40px;height:40px;border-radius:50%;background:${C.ink};color:#fff;display:grid;place-items:center}
/* 网页 */
.x15.web .nav{position:absolute;left:112px;right:112px;top:40px;display:flex;align-items:center;z-index:3}
.x15.web .nav .ln{margin-left:64px;display:flex;gap:44px;font-size:19px;font-weight:500;color:#3A3848}
.x15.web .nav .cta{margin-left:auto;height:50px;padding:0 26px;border-radius:25px;background:${C.ink};color:#fff;display:flex;align-items:center;font-size:18px;font-weight:600}
.x15.web h1{position:absolute;left:0;right:0;top:166px;text-align:center;font-size:84px;font-weight:600;letter-spacing:-.02em;line-height:1.1}
.x15.web .pl{padding:26px 24px}
.x15.web .pl .hd2{display:flex;align-items:center;gap:10px;height:30px}
.x15.web .pl .o{display:block;width:26px;height:26px;border-radius:50%}
.x15.web .pl .k{font-size:16px}
.x15.web .pl b{display:block;font-size:25px;font-weight:600;margin-top:24px;letter-spacing:-.01em}
.x15.web .pl p{font-size:16px;color:${C.gray};margin-top:10px;white-space:nowrap}
.x15.web .pl em{position:absolute;right:22px;top:18px;font-style:normal;font-size:16px;color:${C.gray}}
.x15.web .pl em .sf{font-size:48px;color:${C.ink};margin-right:4px}
.x15.web .fl{position:absolute;z-index:2}
.x15.web .ask .in{font-size:19px}
.x15.web .rep .m3{position:absolute;left:180px;right:28px;top:34px;display:flex}
.x15.web .rep .m3>div{flex:1;padding:0 20px;border-left:1px solid rgba(23,22,31,.07)}
.x15.web .rep .k{font-size:16px}
.x15.web .rep .m3 b{display:block;font-family:${SERIF};font-size:52px;line-height:1;font-weight:400;margin-top:6px}
.x15.web .rep .m3 i{display:block;height:5px;border-radius:3px;background:rgba(23,22,31,.07);margin-top:8px;overflow:hidden}
.x15.web .rep .m3 i:after{content:"";display:block;height:100%;width:var(--w);background:${GRAD}}
.x15.web .rep .ring .g{-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px))}
/* 半山 */
.x15.cmp .hero{left:20px;right:20px;top:112px;height:414px;padding:10px}
.x15.cmp .hero .ph{position:relative;height:300px;border-radius:20px;overflow:hidden;background:#F6EEE8}
.x15.cmp .hero .ph i{position:absolute;inset:0;background-repeat:no-repeat;background-size:760px auto;background-position:-232px -92px;filter:saturate(.9) brightness(1.12) contrast(.9);transform:scaleX(-1)}
.x15.cmp .hero .ph i.lt,.x15.cmp .hero .ph i.lk{transform:none}
.x15.cmp .hero .ph .lt{background:linear-gradient(160deg,rgba(255,138,76,.38),rgba(255,95,162,.12) 42%,rgba(124,108,255,.16) 72%,rgba(63,184,255,.3));mix-blend-mode:soft-light;filter:none}
.x15.cmp .hero .ph .lk{background:radial-gradient(60% 55% at 6% 4%,rgba(255,255,255,.62),rgba(255,236,226,0) 70%),radial-gradient(50% 50% at 100% 100%,rgba(214,240,255,.5),rgba(214,240,255,0) 70%);mix-blend-mode:screen;filter:none}
.x15.cmp .hero .row{display:flex;align-items:baseline;justify-content:space-between;padding:4px 12px 0}
.x15.cmp .hero .lab{padding:16px 12px 0}
.x15.cmp .hero h3{font-size:30px;font-weight:600;letter-spacing:-.01em}
.x15.cmp .hero .row b{font-family:${SERIF};font-size:44px;line-height:1;font-weight:400}
.x15.cmp .pt{height:40px;padding:0 16px;display:flex;align-items:center;gap:8px;border-radius:20px}
.x15.cmp .pt b{font-family:${SERIF};font-size:24px;line-height:1;font-weight:400}
.x15.cmp .tabs{left:20px;right:20px;bottom:30px;height:60px;border-radius:30px;display:flex;justify-content:space-around;align-items:center;font-size:14px;color:${C.gray}}
.x15.cmp .tabs .on{color:${C.ink};font-weight:600}
`;

const hero = `<div class="scr x15 h">
${spots([['peach', 18, 132, 240, .92], ['pink', 352, 228, 210, .82], ['violet', 30, 456, 196, .74], ['blue', 352, 676, 230, .78]])}
${statusBar()}
<div class="hd">${wm()}<i class="av" style="background-image:url(${img('p-woman-7')});background-size:180%;background-position:52% 34%"></i></div>
<div class="date"><span class="k">周三 · ${sf('10.28')}</span><b>今天的皮肤</b></div>
<div class="ring" style="left:72px;top:196px;width:232px;height:232px"><i class="core"></i><i class="gw"><i class="gl"></i></i><i class="g"></i><div class="v"><span class="k">肤况</span><b>86</b></div></div>
<div class="say">水润回升，T 区略出油</div>
<div class="card met"><div><span class="k">水分</span><b>78</b><i style="--w:78%"></i></div><div><span class="k">油脂</span><b>46</b><i style="--w:46%"></i></div><div><span class="k">泛红</span><b>12</b><i style="--w:12%"></i></div></div>
${ask('问问微光', 'left:20px;right:20px;top:700px')}
${homeBar()}</div>`;

const b1 = `<div class="scr x15 b1">
${spots([['peach', 30, 70, 220, .85], ['pink', 352, 120, 170, .6], ['violet', 352, 700, 210, .62], ['blue', 22, 770, 200, .6]])}
${statusBar()}
<div class="ttl">${icon('x', 24, 1.8)}<em>AI</em>测肤</div>
<div class="face"><i class="im" style="background-image:url(${img('p-woman-7')})"></i><i class="tint"></i><i class="scan"></i><i class="oval"></i><i class="pt" style="left:122px;top:250px"></i><i class="pt" style="left:214px;top:262px"></i><i class="pt" style="left:168px;top:150px"></i></div>
<div class="prog"><div class="r"><span>正在分析</span><b>3<em>/</em>4</b></div><div class="seg"><i class="d"></i><i class="d"></i><i class="a"></i><i></i></div></div>
${homeBar()}</div>`;

const b2 = `<div class="scr x15 b2">
${spots([['peach', 14, 116, 210, .82], ['violet', 362, 360, 200, .58], ['blue', 18, 640, 210, .62], ['pink', 352, 790, 180, .56]])}
${statusBar()}
<div class="ttl">${icon('chevron-left', 26, 1.8)}${wm(18)}</div>
<div class="me">两颊发干，晚上用什么精华？</div>
<div class="ai" style="top:204px">${dot(16)}你的屏障分数比上周低了 ${sf('6')} 分。这周晚上以修护为主，先停用酸类。</div>
<div class="card pd"><div class="ph"><i style="background-image:url(${img('serum-amber-shadow')})"></i></div>
<div class="tx"><div><h4>神经酰胺修护精华</h4><div class="k">${sf('30')} ml · 每晚 ${sf('3')} 滴</div></div><div class="pr"><b>¥239</b><span>${icon('plus', 18, 2.2)}</span></div></div></div>
<div class="ai" style="top:624px">先连用两周，下次测肤看屏障分。</div>
${ask('问问微光', 'left:20px;right:20px;top:700px')}
${homeBar()}</div>`;

// 网页：白底，标题后面几团圆形的光，不用斜切彩带；下面一张报告卡、一排三张方案卡
const orbMini = (a, b) => `<i class="o" style="background:radial-gradient(circle at 35% 35%,#fff 0%,rgba(${RGB[a]},.95) 38%,rgba(${RGB[b]},.85) 100%);box-shadow:0 0 18px rgba(${RGB[a]},.55)"></i>`;
const plan = (x, o, k, t, st, n, u) => `<div class="card fl pl" style="left:${x}px;top:568px;width:270px;height:180px"><div class="hd2">${o}<span class="k">${k}</span></div><b>${t}</b><p>${st}</p><em>${sf(n)}${u}</em></div>`;
const web = `<div class="x15 web" style="position:relative;width:1280px;height:800px;overflow:hidden;background:${C.bg}">
${spots([['peach', 452, 214, 380, .9], ['pink', 618, 150, 340, .78], ['violet', 812, 230, 380, .74], ['blue', 900, 330, 300, .66], ['pink', 230, 640, 320, .42], ['blue', 1080, 660, 340, .46], ['violet', 640, 790, 300, .3]])}
<div class="nav">${wm(24)}<div class="ln"><span>测肤</span><span>护肤方案</span><span>成分</span><span>价格</span></div><div class="cta">免费测肤</div></div>
<h1>看清你的皮肤</h1>
${ask('问问微光：换季两颊发干怎么办？', 'left:370px;width:540px;top:300px;height:66px;font-size:20px')}
<div class="card fl rep" style="left:210px;top:404px;width:860px;height:140px"><div class="ring" style="left:28px;top:16px;width:108px;height:108px"><i class="core" style="inset:7px"></i><i class="gw" style="filter:blur(6px)"><i class="gl"></i></i><i class="g"></i><div class="v"><b style="font-size:62px;margin:8px 0 0 -2px">86</b></div></div>
<div class="m3"><div><span class="k">水分</span><b>78</b><i style="--w:78%"></i></div><div><span class="k">油脂</span><b>46</b><i style="--w:46%"></i></div><div><span class="k">泛红</span><b>12</b><i style="--w:12%"></i></div></div></div>
${plan(210, orbMini('peach', 'pink'), '晨间', '清爽保湿', '洁面 · 保湿乳 · 防晒', '3', '步')}
${plan(505, orbMini('violet', 'blue'), '晚间', '屏障修护', '洁面 · 修护精华 · 面霜 · 眼霜', '4', '步')}
${plan(800, orbMini('blue', 'violet'), '每周', '补水面膜', '周三 · 周日 睡前', '2', '次')}
</div>`;

const cmp = `<div class="scr x15 cmp">
${spots([['peach', 22, 96, 230, .9], ['pink', 356, 150, 200, .8], ['violet', 360, 580, 210, .66], ['blue', 18, 668, 230, .74]])}
${statusBar()}
<div class="hd"><span class="wm" style="font-size:20px">${dot(18)}半山咖啡<em>Banshan</em></span><div class="card pt" style="position:static"><span class="k">积分</span><b>1,280</b></div></div>
<div class="card hero"><div class="ph"><i style="background-image:url(${img('latte-pour')})"></i><i class="lt"></i><i class="lk"></i></div><div class="lab k">今日推荐</div><div class="row"><h3>桂花拿铁</h3><b>¥28</b></div></div>
<div style="position:absolute;left:24px;right:24px;top:550px;font-size:15px;color:${C.gray};text-align:center">东四店 · 到店自取约 ${sf('6')} 分钟</div>
<div class="ask" style="left:20px;right:20px;top:592px;height:58px"><i class="halo" style="opacity:.8"></i><div class="in" style="justify-content:center;padding:0;border:0;background:${C.ink};color:#fff;font-size:18px;font-weight:600;letter-spacing:.1em">去点单</div></div>
<div class="card tabs"><span class="on">首页</span><span>菜单</span><span>订单</span><span>我的</span></div>
${homeBar()}</div>`;

module.exports = {
  css,
  screens: { 's15-hero': hero, 's15-b1': b1, 's15-b2': b2, 's15-web': web, 's15-cmp': cmp },
  desktop: ['s15-web'],
  zoom: [84, 0],
  marks: [[352, 324], [24, 256], [356, 534], [36, 690]],
  palette: [['亮白', C.bg], ['晨橙', C.peach], ['霓粉', C.pink], ['电紫', C.violet], ['冰蓝', C.blue]],
  type: { font: '"Instrument Serif","Noto Sans SC"', weight: 400, sample: `<span style="font-family:'Noto Sans SC';font-weight:600">光</span> 86`, style: 'font-size:84px;letter-spacing:-.01em', lines: [['标题', '思源黑体'], ['正文', '思源黑体'], ['数字', 'Instrument Serif']] },
  stageA: `radial-gradient(60% 46% at 50% 50%,rgba(124,108,255,.08),rgba(124,108,255,0) 70%),#F4F2F9`,
  decoA: `<div style="position:absolute;left:50%;top:50%;width:420px;height:840px;margin:-420px 0 0 -210px;border-radius:90px;background:conic-gradient(from 210deg,${C.peach},${C.pink},${C.violet},${C.blue},#7FE3D2,${C.peach});filter:blur(60px);opacity:.5"></div><div style="position:absolute;left:50%;top:50%;width:372px;height:792px;margin:-396px 0 0 -186px;border-radius:66px;background:conic-gradient(from 210deg,${C.peach},${C.pink},${C.violet},${C.blue},#7FE3D2,${C.peach});filter:blur(16px);opacity:.9"></div>`,
  stageB: {
    bg: '#ECE8F4', color: C.ink, url: 'glimmer.ai',
    // 电脑居中；两台手机缩小一点贴在两边，刚好让开报告卡和方案卡
    html: `<div style="position:absolute;left:88px;top:88px">${browser(web, { w: 760, url: 'glimmer.ai' })}</div>
<div style="position:absolute;left:6px;top:318px">${phone(b1, { w: 190 })}</div>
<div style="position:absolute;left:726px;top:300px">${phone(b2, { w: 190 })}</div>`,
    deco: `<div style="position:absolute;inset:0;overflow:hidden">${spots([['peach', 110, 90, 480, .72], ['blue', 880, 740, 520, .6]], 60)}</div>`,
  },
  page: (no) => stylePages(no, 's15-aurora', module.exports),
};
