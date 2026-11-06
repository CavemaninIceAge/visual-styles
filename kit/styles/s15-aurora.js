// 15 弥散光 Aurora —— 起手包
// 色值、字体、圆角、阴影、光斑、发光输入框都照图册模块 catalog/pages/s15-aurora.js（微光）原样取
// 用法：const S = style('s15-aurora'); 屏幕根元素 <div class="scr s15">；组件见 S.ui
// 光斑垫在屏幕最底下（z-index:-1），信息放在白处；彩色只给光，按钮和字都是墨黑
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#FDFDFF',                    // 亮白，页面底色（色卡）
    surface: 'rgba(255,255,255,.72)', // 卡片、标签栏：半透明白，透出后面的光
    ink: '#14131B',                   // 墨黑：字、主按钮、用户气泡、发送键
    ink2: '#6E6B80',                  // 紫灰：次要字
    line: 'rgba(23,22,31,.07)',       // 分隔线、进度条底、光环未走完的部分
    primary: '#14131B',               // 主按钮是墨黑胶囊，四种光色不做实心按钮
    onPrimary: '#FFFFFF',
    accents: { peach: '#FF8A4C', pink: '#FF5FA2', violet: '#7C6CFF', blue: '#3FB8FF' },  // 晨橙、霓粉、电紫、冰蓝：只做光斑、渐变描边、光环
    fonts: { title: '"Noto Sans SC"', body: '"Noto Sans SC"', num: '"Instrument Serif"' },
    radius: 26,                       // 卡片 26；照片 18–30；胶囊全圆
    border: null,                     // 卡片没有实线框，只有 1px 3.5% 的内描边（写在 shadow 里）
    shadow: '0 1px 0 rgba(255,255,255,.9) inset,0 0 0 1px rgba(20,19,27,.035),0 10px 30px -16px rgba(60,40,120,.2)',
    margin: 24,                       // 文字离边 24，卡片和输入框离边 20
    photo: 'saturate(.92) brightness(1.06) contrast(.97)',
  };
  const { peach: C1, pink: C2, violet: C3, blue: C4 } = T.accents;
  const K = T.ink, G = T.ink2;
  const RGB = { peach: '255,138,76', pink: '255,95,162', violet: '124,108,255', blue: '63,184,255' };
  const CORE = { peach: '255,226,196', pink: '255,214,232', violet: '226,222,255', blue: '214,240,255' };
  const GRAD = `linear-gradient(100deg,${C1},${C2} 34%,${C3} 68%,${C4})`;
  const LT = { ...T.accents };   // 当前四色光，ui.recolor 换品牌色时改这里和 RGB、CORE
  let TEAL = '#7FE3D2';          // 图册手机身后那圈光从冰蓝回晨橙时多走的一段；ui.recolor 后不用，改沿四色原路走回去
  const SERIF = '"Instrument Serif","Noto Sans SC",serif';
  const SANS = '"Noto Sans SC",sans-serif';
  const CARD = `background:${T.surface};-webkit-backdrop-filter:blur(24px) saturate(1.4);backdrop-filter:blur(24px) saturate(1.4);box-shadow:${T.shadow}`;
  const css = `
.s15{--bg:${T.bg};--k:${K};--g:${G};--ln:${T.line};--c1:${C1};--c2:${C2};--c3:${C3};--c4:${C4};--r1:${RGB.peach};--r2:${RGB.pink};--r3:${RGB.violet};--r4:${RGB.blue};--grad:${GRAD};isolation:isolate;background:var(--bg);color:var(--k);font-family:${SANS};font-size:15px;line-height:1.5}
.s15 .v-pad{padding-left:24px;padding-right:24px}
/* 光斑层：放在屏幕根元素第一个，垫在所有内容下面 */
.s15 .v-blobs{position:absolute;inset:0;overflow:hidden;z-index:-1;pointer-events:none}
/* 字：标题干净的思源黑体 600；数字和西文只用 Instrument Serif 400 */
.s15 .v-h1{font:600 30px/1.25 ${SANS};letter-spacing:-.01em}
.s15 .v-h2{font:600 21px/1.3 ${SANS}}
.s15 .v-h3{font:600 18px/1.3 ${SANS}}
.s15 .v-tx{font:400 17px/1.65 ${SANS}}
.s15 .v-say{font:500 18px/1.4 ${SANS};text-align:center}
.s15 .v-mut{font:400 13px/1.4 ${SANS};color:var(--g);letter-spacing:.04em}
/* 压在光上的日期行：比紫灰深一档，晨橙上也读得清；数字留在黑体（Instrument Serif 的 1 旗角很小，20px 以下「11」读成「ll」，这款字也没有替代字形） */
.s15 .v-date{font:400 13px/1.4 ${SANS};color:#3A3848;letter-spacing:.04em}
.s15 .v-num{font-family:${SERIF};font-weight:400;letter-spacing:0}
.s15 .v-sf{font-family:${SERIF};font-size:1.24em;line-height:1;letter-spacing:0}
/* 13px 小字里的金额放到 18px、字距拉开，数字才和汉字一样高；日期行里写了 sf 也归黑体 */
.s15 .v-mut .v-sf,.s15 .v-ring .v>span .v-sf,.s15 .v-mrow .r1>span>.v-sf,.s15 .v-met>div>span .v-sf{font-size:1.4em;letter-spacing:.04em}
.s15 .v-date .v-sf{font:inherit;letter-spacing:inherit}
.s15 .v-big{font:400 138px/.8 ${SERIF};letter-spacing:-.02em;margin-left:-4px}
.s15 .v-big small{font-size:.5em;letter-spacing:0;margin:0 2px 0 4px}
.s15 .v-price{font:400 32px/1 ${SERIF};letter-spacing:0}
.s15 .v-price small{font:400 13px/1 ${SANS};color:var(--g);letter-spacing:.04em;margin-left:4px}
.s15 .v-xl{font:600 84px/1.1 ${SANS};letter-spacing:-.02em;text-align:center}
/* 按钮：墨黑胶囊。.wide 通栏 58 高，身后一圈四色光（光和底都用伪元素垫着，字在最上面） */
.s15 .v-btn{position:relative;height:50px;padding:0 26px;border-radius:25px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--k);color:#fff;font:600 18px/1 ${SANS};white-space:nowrap}
.s15 .v-btn.wide{display:flex;width:100%;height:58px;border-radius:29px;background:none;letter-spacing:.1em;z-index:0}
.s15 .v-btn.wide::before{content:"";position:absolute;inset:-3px;border-radius:32px;background:var(--grad);filter:blur(12px);opacity:.8;z-index:-2}
.s15 .v-btn.wide::after{content:"";position:absolute;inset:0;border-radius:29px;background:var(--k);z-index:-1}
.s15 .v-btn.ghost{background:${T.surface};color:var(--k);box-shadow:${T.shadow}}
.s15 .v-btn.wide.ghost{background:none;box-shadow:none}
.s15 .v-btn.wide.ghost::before{opacity:.35}
.s15 .v-btn.wide.ghost::after{background:#fff}
/* 卡片：半透明白、大圆角、阴影极轻；.ph 四周留 10px，.bd 正文 */
.s15 .v-card{position:relative;display:flow-root;${CARD};border-radius:26px}
.s15 .v-card>.ph{height:196px;margin:10px 10px 0;border-radius:18px}
.s15 .v-card .bd{padding:16px 18px 18px}
.s15 .v-card .bd .v-mut{margin-top:4px}
.s15 .ph{background-size:cover;background-position:center;filter:${T.photo}}
/* 照片上的光：左上暖、右下冷，叠在 .ph 上让照片和光斑是一个世界（咖啡那屏的做法） */
.s15 .ph.v-lit{position:relative;overflow:hidden;filter:saturate(.9) brightness(1.12) contrast(.9)}
.s15 .ph.v-lit::before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(var(--r1),.38),rgba(var(--r2),.12) 42%,rgba(var(--r3),.16) 72%,rgba(var(--r4),.3));mix-blend-mode:soft-light}
.s15 .ph.v-lit::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 55% at 6% 4%,rgba(255,255,255,.62),rgba(255,236,226,0) 70%),radial-gradient(50% 50% at 100% 100%,rgba(214,240,255,.5),rgba(214,240,255,0) 70%);mix-blend-mode:screen}
/* 列表：一张卡，行之间 1px 淡线 */
.s15 .v-list{position:relative;${CARD};border-radius:26px}
.s15 .v-row{display:flex;align-items:center;gap:12px;min-height:64px;padding:12px 18px}
.s15 .v-row+.v-row{border-top:1px solid var(--ln)}
/* 带进度的行：左边小光球，右边上面名字和金额、下面渐变进度条 */
.s15 .v-mrow{align-items:center}
.s15 .v-mrow .c{flex:1;min-width:0}
.s15 .v-mrow .r1{display:flex;align-items:baseline;justify-content:space-between}
.s15 .v-mrow .r1 b{font:600 16px/1.3 ${SANS}}
.s15 .v-mrow .r1>span{font:400 13px/1 ${SANS};color:var(--g);white-space:nowrap}
.s15 .v-mrow .r1>span>em{font:400 24px/1 ${SERIF};font-style:normal;color:var(--k);margin-right:3px}
/* 进度条：灰底上一段四色渐变 */
.s15 .v-gbar{display:block;height:4px;border-radius:2px;background:var(--ln);overflow:hidden}
.s15 .v-gbar::after{content:"";display:block;height:100%;width:var(--w);border-radius:2px;background:var(--grad)}
.s15 .v-mrow .v-gbar{margin-top:8px}
.s15 .v-chips{display:flex;gap:8px;flex-wrap:wrap}
.s15 .v-chip{height:36px;padding:0 16px;display:inline-flex;align-items:center;border-radius:18px;${CARD};font:500 14px/1 ${SANS};color:var(--g)}
.s15 .v-chip.on{background:var(--k);color:#fff;box-shadow:none}
.s15 .v-inp{height:52px;display:flex;align-items:center;gap:10px;padding:0 20px;border-radius:26px;${CARD};font:400 16px/1 ${SANS};color:var(--g)}
/* 发光输入框：1.5px 四色渐变描边 + 身后模糊 12px 的同色光晕 + 墨黑圆形发送键 */
.s15 .v-ask{position:relative;height:56px}
.s15 .v-ask .halo{position:absolute;inset:-3px;border-radius:31px;background:var(--grad);filter:blur(12px);opacity:.55}
.s15 .v-ask .in{position:absolute;inset:0;border-radius:28px;border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,var(--grad) border-box;display:flex;align-items:center;padding:0 8px 0 18px;gap:10px;font:400 16px/1 ${SANS};color:var(--g);white-space:nowrap}
.s15 .v-ask .in>svg{color:var(--c3)}
.s15 .v-ask .in b{margin-left:auto;width:40px;height:40px;border-radius:50%;background:var(--k);color:#fff;display:grid;place-items:center;flex:none}
/* .dock 停在屏幕底部；.dock.over 停在标签栏上面 */
.s15 .v-ask.dock{position:absolute;left:20px;right:20px;bottom:56px;z-index:5}
.s15 .v-ask.dock.over{bottom:108px}
.s15 .v-ask.lg{height:66px}
.s15 .v-ask.lg .halo{border-radius:36px}
.s15 .v-ask.lg .in{border-radius:33px;padding:0 13px 0 22px;font-size:19px}
/* 光环：中间白、外圈四色渐变、身后同样一圈模糊光，中间放主角数字 */
.s15 .v-ring{position:relative;border-radius:50%}
.s15 .v-ring .core{position:absolute;inset:var(--t);border-radius:50%;background:radial-gradient(circle,#fff,rgba(255,255,255,.9) 62%,rgba(255,255,255,.4))}
.s15 .v-ring .gw{position:absolute;inset:0;filter:blur(var(--bl));opacity:.7}
.s15 .v-ring .g,.s15 .v-ring .gl{position:absolute;inset:0;border-radius:50%;-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--t)),#000 calc(100% - var(--t) + 1px));mask:radial-gradient(farthest-side,transparent calc(100% - var(--t)),#000 calc(100% - var(--t) + 1px))}
.s15 .v-ring .e{position:absolute;width:var(--t);height:var(--t);margin:calc(var(--t) / -2) 0 0 calc(var(--t) / -2);border-radius:50%}
.s15 .v-ring .v{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.s15 .v-ring .v>span{font:400 13px/1.4 ${SANS};color:var(--g);letter-spacing:.04em}
.s15 .v-ring .v b{font:400 138px/.8 ${SERIF};letter-spacing:-.02em;margin:14px 0 0 -4px;white-space:nowrap}
.s15 .v-ring .v b small{font-size:.5em;letter-spacing:0;margin-right:2px}
/* 指标卡：一张卡分三格，大数字配细渐变条 */
.s15 .v-met{height:112px;display:flex;align-items:center;padding:0 6px}
.s15 .v-met>div{flex:1;min-width:0;padding:0 18px}
.s15 .v-met>div+div{border-left:1px solid var(--ln)}
.s15 .v-met>div>span{font:400 13px/1.4 ${SANS};color:var(--g);letter-spacing:.04em}
.s15 .v-met b{display:block;font:400 var(--fs,42px)/1 ${SERIF};letter-spacing:0;margin-top:6px;white-space:nowrap}
.s15 .v-met .v-gbar{margin-top:8px}
/* 网页报告卡：光环在左，三格在右 */
.s15 .v-rep{height:140px;display:flex;align-items:center;gap:40px;padding:0 28px}
.s15 .v-rep .v-met{flex:1;height:auto;padding:0}
.s15 .v-rep .v-met>div{padding:0 20px}
.s15 .v-rep .v-met>div>span{font-size:16px}
.s15 .v-rep .v-met b{font-size:52px}
.s15 .v-rep .v-met .v-gbar{height:5px;border-radius:3px}
/* 品牌光球和小光球 */
.s15 .v-dot{display:inline-block;flex:none;border-radius:50%;background:conic-gradient(from 200deg,var(--c1),var(--c2),var(--c3),var(--c4),var(--c1));box-shadow:0 0 10px rgba(var(--r2),.45);vertical-align:middle}
.s15 .v-orb{display:block;flex:none;border-radius:50%}
.s15 .v-av{display:block;flex:none;border-radius:50%;background-size:cover;background-position:center 30%;box-shadow:0 0 0 2px #fff}
/* 对话：用户墨黑气泡靠右，AI 不用气泡，光球领一段字 */
.s15 .v-me{width:fit-content;max-width:290px;margin-left:auto;background:var(--k);color:#fff;border-radius:22px 22px 6px 22px;padding:13px 18px;font:400 16px/1.5 ${SANS}}
.s15 .v-ai{font:400 17px/1.65 ${SANS}}
.s15 .v-ai .v-dot{margin:-3px 8px 0 0}
/* 对话里的结果卡：照片 + 名字 + 价格 + 圆按钮 */
.s15 .v-item{padding-bottom:2px}
.s15 .v-item .tx{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 10px 12px 12px}
.s15 .v-item h4{font:600 18px/1.3 ${SANS}}
.s15 .v-item .v-mut{margin-top:4px}
.s15 .v-item .pr{display:flex;align-items:center;gap:14px;flex:none}
.s15 .v-item .pr>span{width:40px;height:40px;border-radius:50%;background:var(--k);color:#fff;display:grid;place-items:center}
/* 方案小卡：光球 + 标签、右上角大数字、下面标题和一行内容 */
.s15 .v-plan{height:180px;padding:26px 24px}
.s15 .v-plan .hd{display:flex;align-items:center;gap:10px;height:30px}
.s15 .v-plan .hd>span{font:400 16px/1 ${SANS};color:var(--g);letter-spacing:.04em}
.s15 .v-plan>b{display:block;font:600 25px/1.3 ${SANS};letter-spacing:-.01em;margin-top:24px}
.s15 .v-plan>p{font:400 16px/1.4 ${SANS};color:var(--g);margin-top:10px;white-space:nowrap}
.s15 .v-plan>em{position:absolute;right:22px;top:18px;font:400 16px/1 ${SANS};font-style:normal;color:var(--g)}
.s15 .v-plan>em .v-sf{font-size:48px;color:var(--k);margin-right:4px}
/* 分段进度：四格，走完的是渐变，当前这格发光 */
.s15 .v-prog .r{display:flex;align-items:baseline;justify-content:space-between}
.s15 .v-prog .r>span{font:600 21px/1.3 ${SANS}}
.s15 .v-prog .r b{font:400 52px/1 ${SERIF}}
.s15 .v-prog .r b em{font-style:normal;color:var(--g);margin:0 2px}
.s15 .v-seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px;margin-top:14px}
.s15 .v-seg i{position:relative;height:6px;border-radius:3px;background:var(--ln)}
.s15 .v-seg i.d{background:var(--grad)}
.s15 .v-seg i.a::after{content:"";position:absolute;left:0;top:0;bottom:0;width:var(--w,58%);border-radius:3px;background:linear-gradient(90deg,var(--c3),var(--c4));box-shadow:0 0 14px rgba(var(--r3),.7)}
/* 扫描：大圆角照片，一道白线带紫蓝拖光扫过 */
.s15 .v-scan{position:relative;border-radius:30px;overflow:hidden;box-shadow:0 18px 40px -22px rgba(60,40,120,.35)}
.s15 .v-scan .im{position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(.74) brightness(1.08) contrast(.96)}
.s15 .v-scan .tint{position:absolute;inset:0;background:linear-gradient(160deg,rgba(var(--r1),.36),rgba(var(--r2),.12) 40%,rgba(var(--r3),.1) 72%,rgba(var(--r4),.26));mix-blend-mode:soft-light}
.s15 .v-scan .beam{position:absolute;left:0;right:0;height:132px;background:linear-gradient(180deg,rgba(255,255,255,0),rgba(var(--r2),.14) 45%,rgba(var(--r3),.3) 80%,rgba(var(--r4),.48));mix-blend-mode:screen}
.s15 .v-scan .beam::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#fff;box-shadow:0 0 10px 2px rgba(190,225,255,.95),0 0 34px 10px rgba(var(--r3),.55)}
.s15 .v-scan .oval{position:absolute;border-radius:50%;border:1.5px solid rgba(255,255,255,.85);box-shadow:0 0 18px rgba(255,255,255,.35)}
.s15 .v-scan .pt{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px rgba(255,255,255,.28),0 0 12px rgba(255,255,255,.9)}
/* 积分这类小胶囊：半透明白，40 高 */
.s15 .v-pill{height:40px;padding:0 16px;display:inline-flex;align-items:center;gap:8px;border-radius:20px;${CARD};font:400 13px/1 ${SANS};color:var(--g);letter-spacing:.04em;white-space:nowrap}
.s15 .v-pill b{font:400 24px/1 ${SERIF};color:var(--k);letter-spacing:0}
/* 顶栏：40 高，图标不加底 */
.s15 .v-nav{position:relative;height:40px;margin:8px 24px 0;display:flex;align-items:center;justify-content:space-between;z-index:3}
.s15 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:5px;font:600 17px/1 ${SANS};white-space:nowrap}
.s15 .v-nav .t em{font:italic 400 21px/1 ${SERIF}}
.s15 .v-ib{width:40px;height:40px;display:grid;place-items:center;margin:0 -7px}
.s15 .v-logo{display:inline-flex;align-items:center;gap:8px;font:600 19px/1 ${SANS};letter-spacing:.02em;white-space:nowrap}
.s15 .v-logo em{font:italic 400 1.12em/1 ${SERIF};letter-spacing:0;color:var(--g);margin-left:-1px}
/* 标签栏：浮着的白胶囊，只有字；当前格加粗变墨黑，字下一颗光点（不只靠颜色） */
.s15 .v-tabs{position:absolute;left:20px;right:20px;bottom:30px;height:60px;border-radius:30px;${CARD};display:flex;justify-content:space-around;align-items:center;font:400 14px/1 ${SANS};color:var(--g);z-index:6}
.s15 .v-tabs>div{position:relative;height:60px;min-width:56px;display:flex;align-items:center;justify-content:center;gap:5px}
.s15 .v-tabs>div.on{color:var(--k);font-weight:600}
.s15 .v-tabs>div.on::after{content:"";position:absolute;left:50%;bottom:10px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:conic-gradient(from 200deg,var(--c1),var(--c2),var(--c3),var(--c4),var(--c1))}
/* 网页：顶栏浮在光上 */
.s15.web{background:var(--bg)}
.s15 .v-wnav{position:relative;height:50px;margin:40px 112px 0;display:flex;align-items:center;z-index:3}
.s15 .v-wnav nav{display:flex;gap:44px;margin-left:64px;font:500 19px/1 ${SANS};color:#3A3848}
.s15 .v-wnav .v-btn{margin-left:auto}
/* 网页内容区：860 宽居中，紧跟 .v-wnav；大标题、输入框、报告卡、方案卡依次往下排，不用绝对定位 */
.s15 .v-wmain{position:relative;width:860px;margin:76px auto 0}
.s15 .v-wmain .v-ask{width:540px;margin:40px auto 0}
.s15 .v-wmain .v-rep{margin-top:40px}
.s15 .v-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;margin-top:24px}
`;
  // 一团光：中心发亮、往外散开。[颜色名, 圆心 x, 圆心 y, 直径, 不透明度]；blur 不写时按直径的 8%
  const spot = ([c, x, y, d, o = 1], blur) => `<i style="position:absolute;border-radius:50%;pointer-events:none;left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px;opacity:${o};background:radial-gradient(circle,rgba(${CORE[c]},1) 0%,rgba(${RGB[c]},.92) 26%,rgba(${RGB[c]},.42) 50%,rgba(${RGB[c]},0) 71%);filter:blur(${blur == null ? Math.round(d * 0.08) : blur}px)"></i>`;
  // 光斑摆法。a / b / c / d 是图册四屏原样（四团各占一角），web 是网页首屏（光集中在标题后面）；
  // e / f 把相邻的光叠上，四周连成一圈，「互相融合」更明显：e 给主屏，f 给内容屏，出 demo 优先用这两种
  const BLOBS = {
    a: [['peach', 18, 132, 240, 0.92], ['pink', 352, 228, 210, 0.82], ['violet', 30, 456, 196, 0.74], ['blue', 352, 676, 230, 0.78]],
    b: [['peach', 30, 70, 220, 0.85], ['pink', 352, 120, 170, 0.6], ['violet', 352, 700, 210, 0.62], ['blue', 22, 770, 200, 0.6]],
    c: [['peach', 14, 116, 210, 0.82], ['violet', 362, 360, 200, 0.58], ['blue', 18, 640, 210, 0.62], ['pink', 352, 790, 180, 0.56]],
    d: [['peach', 22, 96, 230, 0.9], ['pink', 356, 150, 200, 0.8], ['violet', 360, 580, 210, 0.66], ['blue', 18, 668, 230, 0.74]],
    e: [['peach', -4, 94, 280, 0.92], ['pink', 196, -26, 230, 0.5], ['pink', 348, 216, 240, 0.82], ['violet', 24, 470, 230, 0.74], ['blue', 352, 680, 270, 0.78], ['violet', 170, 838, 260, 0.5]],
    f: [['peach', -10, 62, 250, 0.88], ['pink', 226, -40, 220, 0.42], ['pink', 360, 150, 200, 0.68], ['violet', 366, 620, 210, 0.6], ['blue', 26, 716, 240, 0.66], ['violet', 196, 838, 240, 0.46], ['pink', 356, 806, 170, 0.5]],
    web: [['peach', 452, 214, 380, 0.9], ['pink', 618, 150, 340, 0.78], ['violet', 812, 230, 380, 0.74], ['blue', 900, 330, 300, 0.66], ['pink', 230, 640, 320, 0.42], ['blue', 1080, 660, 340, 0.46], ['violet', 640, 790, 300, 0.3]],
  };
  const dot = (d = 18) => `<i class="v-dot" style="width:${d}px;height:${d}px"></i>`;
  const sf = (t) => `<span class="v-sf">${t}</span>`;
  const orb = (a = 'peach', b = 'pink', d = 26) => `<i class="v-orb" style="width:${d}px;height:${d}px;background:radial-gradient(circle at 35% 35%,#fff 0%,rgba(${RGB[a]},.95) 38%,rgba(${RGB[b]},.85) 100%);box-shadow:0 0 18px rgba(${RGB[a]},.55)"></i>`;
  // 四色沿圆周分布，走完 pct% 处到冰蓝，后面是灰轨
  const conic = (pct, tail) => `conic-gradient(from 0deg,${LT.peach},${LT.pink} ${(pct * 0.349).toFixed(1)}%,${LT.violet} ${(pct * 0.674).toFixed(1)}%,${LT.blue} ${pct}%,${tail} ${pct + 0.4}%)`;
  const bar = (pct) => `<i class="v-gbar" style="--w:${pct}%"></i>`;
  const ringHtml = ({ num, label = '', pct = 86, d = 232, t = 11, fs = 138, blur = 10, attrs = '', style = '' }) => {
    const r = d / 2 - t / 2, a = (pct / 100) * 2 * Math.PI;
    const ex = (d / 2 + r * Math.sin(a)).toFixed(1), ey = (d / 2 - r * Math.cos(a)).toFixed(1);
    return `<div class="v-ring" style="width:${d}px;height:${d}px;--t:${t}px;--bl:${blur}px;${style}" ${attrs}><i class="core"></i><i class="gw"><i class="gl" style="background:${conic(pct, 'transparent')}"></i></i><i class="g" style="background:${conic(pct, T.line)}"></i><i class="e" style="left:${d / 2}px;top:${t / 2}px;background:${LT.peach}"></i><i class="e" style="left:${ex}px;top:${ey}px;background:${LT.blue}"></i><div class="v">${label ? `<span>${label}</span>` : ''}<b style="font-size:${fs}px${label ? '' : ';margin-top:4px'}">${num}</b></div></div>`;
  };
  const metHtml = (items) => items.map(([k, v, pct]) => `<div><span>${k}</span><b>${v}</b>${pct == null ? '' : bar(pct)}</div>`).join('');
  const ui = {
    // 换四色光：在 demo 开头、画屏幕之前调用，返回的 CSS 拼进 demo.css。键沿用 peach / pink / violet / blue，只传要换的
    // const tint = ui.recolor({ peach: '#FFB36B', pink: '#FF7FA8', violet: '#9B8CFF', blue: '#5CC8FF' })
    recolor: (map = {}) => {
      for (const k of Object.keys(LT)) {
        if (!map[k]) continue;
        const c = [1, 3, 5].map((i) => parseInt(map[k].slice(i, i + 2), 16));
        LT[k] = map[k]; RGB[k] = c.join(','); CORE[k] = c.map((v) => Math.round(v + (255 - v) * 0.7)).join(','); TEAL = null;
      }
      return `.s15{--c1:${LT.peach};--c2:${LT.pink};--c3:${LT.violet};--c4:${LT.blue};--r1:${RGB.peach};--r2:${RGB.pink};--r3:${RGB.violet};--r4:${RGB.blue};--grad:linear-gradient(100deg,${LT.peach},${LT.pink} 34%,${LT.violet} 68%,${LT.blue})}`;
    },
    dot,   // 品牌光球：dot(18)，四色圆锥渐变，字标和 AI 回话都用它
    sf,    // 句子里的数字换 Instrument Serif：sf('¥48')、sf('92')；20px 以下的日期不用它，放在 .v-date 里直接写
    orb,   // 小光球：orb('violet', 'blue', 26)，分类和方案的记号，两个颜色名 + 直径
    bar,   // 渐变进度条：bar(78)，参数是百分比
    // 光斑层：放在根元素第一个。blobs('e') 取现成摆法（a–f、web，见上面 BLOBS），也能传列表 blobs([['peach', 18, 132, 240, .92], …], 模糊 px)
    blobs: (list = 'a', blur) => `<div class="v-blobs">${(typeof list === 'string' ? BLOBS[list] || BLOBS.a : list).map((s) => spot(s, blur)).join('')}</div>`,
    // 展示板背景，写成函数才跟得上屏数：boardDeco: (g) => ui.stageGlow(g)。四角四团大光，g.phones 里每台手机身后加一圈彩光
    // 也能手写 stageGlow({ w, h, halos: [[左, 上, 宽, 高], …], r })：w、h 是展示板尺寸，halos 是要加光的外框，r 是外框圆角
    stageGlow: ({ w, h, phones = [], halos = phones.map((p) => [p.x, p.y, p.w, p.h]), r = 60 } = {}) => {
      if (!w || !h) throw new Error('ui.stageGlow 要展示板尺寸：写 boardDeco: (g) => ui.stageGlow(g)');
      const big = [['peach', 0.12 * w, 0.09 * h, 0.72 * w, 0.72], ['pink', 0.86 * w, 0.2 * h, 0.5 * w, 0.32], ['violet', 0.1 * w, 0.72 * h, 0.56 * w, 0.42], ['blue', 0.92 * w, 0.9 * h, 0.76 * w, 0.62]];
      const ring = `conic-gradient(from 210deg,${[LT.peach, LT.pink, LT.violet, LT.blue, ...(TEAL ? [TEAL] : [LT.violet, LT.pink]), LT.peach].join(',')})`;
      const hl = halos.map(([x, y, bw, bh]) => `<div style="position:absolute;left:${x - 24}px;top:${y - 24}px;width:${bw + 48}px;height:${bh + 48}px;border-radius:${r + 24}px;background:${ring};filter:blur(46px);opacity:.5"></div><div style="position:absolute;left:${x}px;top:${y}px;width:${bw}px;height:${bh}px;border-radius:${r}px;background:${ring};filter:blur(14px);opacity:.85"></div>`).join('');
      return `<div style="position:absolute;inset:0;overflow:hidden">${big.map((s) => spot(s.map((v) => (typeof v === 'number' && v > 1 ? Math.round(v) : v)), 60)).join('')}${hl}</div>`;
    },
    // 字标：光球 + 思源黑体 600 + 灰色斜体英文；logo('余光', 'Evenglow', { size: 24 })；sym 换成客户自己的小图标 HTML
    logo: (name, en = '', { size = 19, sym } = {}) => `<span class="v-logo" style="font-size:${size}px">${sym || dot(Math.round(size * 0.95))}${name}${en ? `<em>${en}</em>` : ''}</span>`,
    // App 顶栏：40 高，返回是不带底的细箭头；left / right 放字标、头像、积分胶囊
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<div class="v-ib" data-back>${icon('chevron-left', 26, 1.8)}</div>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 不带底的图标按钮：iconBtn('x')、iconBtn('sliders-horizontal', 'data-go="set"')
    iconBtn: (name, attrs = '') => `<div class="v-ib" ${attrs}>${icon(name, 24, 1.8)}</div>`,
    // 头像：avatar(img('p-woman-10'), { d: 36, pos: '50% 30%', size: '180%' })
    avatar: (src, { d = 36, pos = 'center 30%', size = 'cover', attrs = '' } = {}) => `<i class="v-av" style="width:${d}px;height:${d}px;background-image:url(${src});background-position:${pos};background-size:${size}" ${attrs}></i>`,
    // 半透明小胶囊：pill('积分', '1,280')
    pill: (label, num, attrs = '') => `<div class="v-pill" ${attrs}>${label}<b>${num}</b></div>`,
    // 底部标签栏：浮着的白胶囊，默认只有字（图册做法）；第四个参数 { icons: true } 才画 items 里的图标
    tabs: (items, cur = 0, go = [], { icons = false } = {}) => `<div class="v-tabs">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icons ? icon(ic, 18, 1.8) : ''}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：墨黑胶囊；cls 'wide' 通栏带四色光 / 'ghost' 半透明白；图标默认不要，箭头类放字后面
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => {
      const ico = ic ? icon(ic, 20, 2) : '';
      return `<div class="v-btn ${cls}" ${attrs}>${ic && !ic.startsWith('arrow') ? ico + text : text + ico}</div>`;
    },
    // 发光输入框：glowInput('问问微光')；cls 'dock' 停在屏幕底部、'dock over' 停在标签栏上面、'lg' 是网页 66 高；style 写定位，attrs 放 data-go
    glowInput: (text, { cls = '', style = '', attrs = '' } = {}) => `<div class="v-ask ${cls}" style="${style}" ${attrs}><i class="halo"></i><div class="in">${icon('sparkles', 20, 1.6)}<span>${text}</span><b>${icon('arrow-up', 18, 2.2)}</b></div></div>`,
    // 光环：ring({ num: '86', label: '肤况', pct: 86 })，num 可带 <small>；d 直径、t 环宽、fs 数字字号、blur 光晕（网页小环 d:108, t:7, fs:62, blur:6）
    ring: ringHtml,
    // 指标卡：metrics([['水分', '78', 78], ['油脂', '46', 46], ['泛红', '12', 12]])，每项 [标签, 数字, 进度百分比]；fs 数字字号（默认 42）、h 卡高（默认 112），首页有 96px 主角时写 { fs: 36, h: 104 }；style 写外边距，attrs 放 data-go
    metrics: (items, { fs, h, style = '', attrs = '' } = {}) => `<div class="v-card v-met" style="${h ? `height:${h}px;` : ''}${fs ? `--fs:${fs}px;` : ''}${style}" ${attrs}>${metHtml(items)}</div>`,
    // 网页报告卡：report({ ring: { num: '86', pct: 86 }, items: [['水分', '78', 78], …] })，光环在左、三格在右
    report: ({ ring: rg, items = [], attrs = '' } = {}) => `<div class="v-card v-rep" ${attrs}>${ringHtml({ d: 108, t: 7, fs: 62, blur: 6, ...rg })}<div class="v-met">${metHtml(items)}</div></div>`,
    // 带进度的行（放 .v-list 里）：meterRow({ a: 'peach', b: 'pink', title: '餐饮', value: '¥724', total: '¥2,400', pct: 30 })
    meterRow: ({ a = 'peach', b = 'pink', title = '', value = '', total = '', pct = 0, attrs = '' } = {}) => `<div class="v-row v-mrow" ${attrs}>${orb(a, b, 26)}<div class="c"><div class="r1"><b>${title}</b><span><em>${value}</em>${total ? `/ ${sf(total)}` : ''}</span></div>${bar(pct)}</div></div>`,
    // 用户气泡：me('两颊发干，晚上用什么精华？')
    me: (text) => `<div class="v-me">${text}</div>`,
    // AI 回话：ai('你的屏障分数低了 6 分')，不带气泡，默认光球领头；{ dot: false } 去掉光球（同一轮的第二段）
    ai: (html, { dot: d = true, style = '' } = {}) => `<div class="v-ai" style="${style}">${d ? dot(16) : ''}${html}</div>`,
    // 结果卡：item({ src: img('x'), title, meta, price: '¥239', ic: 'plus', attrs })；h 照片高、pos / size 裁切、lit 加照片上的光（暖调特写用，白天空会发灰）；对话里推荐一样东西用
    item: ({ src, h = 196, pos = '50% 50%', size = 'cover', title = '', meta = '', price = '', ic = 'plus', lit = false, attrs = '' } = {}) => `<div class="v-card v-item" ${attrs}><div class="ph ${lit ? 'v-lit' : ''}" style="height:${h}px;background-image:url(${src});background-position:${pos};background-size:${size}"></div><div class="tx"><div><h4>${title}</h4>${meta ? `<div class="v-mut">${meta}</div>` : ''}</div><div class="pr">${price ? `<b class="v-price">${price}</b>` : ''}${ic ? `<span>${icon(ic, 18, 2.2)}</span>` : ''}</div></div></div>`,
    // 方案小卡，三张放进 <div class="v-plans">：plan({ a: 'peach', b: 'pink', label: '晨间', n: '3', unit: '步', title: '清爽保湿', meta: '洁面 · 保湿乳 · 防晒', style, attrs })
    plan: ({ a = 'peach', b = 'pink', label = '', n = '', unit = '', title = '', meta = '', style = '', attrs = '' } = {}) => `<div class="v-card v-plan" style="${style}" ${attrs}><div class="hd">${orb(a, b, 26)}<span>${label}</span></div><b>${title}</b><p>${meta}</p>${n ? `<em>${sf(n)}${unit}</em>` : ''}</div>`,
    // 分段进度：prog({ label: '正在分析', cur: 3, total: 4, frac: 58 })；cur 是当前第几段，frac 是当前段走了百分之几
    prog: ({ label = '', cur = 1, total = 4, frac = 58 } = {}) => `<div class="v-prog"><div class="r"><span>${label}</span><b>${cur}<em>/</em>${total}</b></div><div class="v-seg">${Array.from({ length: total }, (_, i) => `<i class="${i < cur - 1 ? 'd' : i === cur - 1 ? 'a' : ''}" style="--w:${frac}%"></i>`).join('')}</div></div>`,
    // 扫描照片：scan(img('x'), { h: 548, beam: 176, oval: [57, 62, 220, 322], pts: [[122, 250], …], pos, size })；oval 是 [左, 上, 宽, 高]，beam 是拖光顶边的位置
    scan: (src, { h = 548, beam = 176, oval, pts = [], pos = 'center', size = 'cover' } = {}) => `<div class="v-scan" style="height:${h}px"><i class="im" style="background-image:url(${src});background-position:${pos};background-size:${size}"></i><i class="tint"></i><i class="beam" style="top:${beam}px"></i>${oval ? `<i class="oval" style="left:${oval[0]}px;top:${oval[1]}px;width:${oval[2]}px;height:${oval[3]}px"></i>` : ''}${pts.map(([x, y]) => `<i class="pt" style="left:${x}px;top:${y}px"></i>`).join('')}</div>`,
  };
  return { key: 's15-aurora', no: 15, name: '弥散光', root: 's15', T, css, ui, stage: '#ECE8F4', dark: false };
};
