// 10 新粗野主义 Neo-Brutalism —— 起手包
// 色值、字体、线宽、阴影都照图册模块 catalog/pages/s10-brutal.js（造物所）原样取
// 用法：const S = style('s10-brutal'); 屏幕根元素 <div class="scr s10">；组件见 S.ui
// 换品牌色：项目 CSS 写 .p{--y:#主色;--p:#;--b:#;--g:#;--bg:#}，按钮、标签栏、卡片、贴纸、圆贴章、方块、头像、票头的默认底都走这几个变量；展示板底色在 demo 里写 stage
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#FBF6EC',          // 米白纸底
    surface: '#FFFFFF',     // 卡片、标签栏、底部操作条
    ink: '#111111',         // 字、描边、硬阴影全用它（色卡「纯黑」）
    ink2: '#111111',        // 这个风格没有灰字：次要信息靠等宽字和小字号区分
    line: '#111111',
    primary: '#FFD12E',     // 柠檬黄：主按钮、当前标签、最重要的一块
    onPrimary: '#111111',
    accents: { pink: '#FF8AD8', blue: '#4D7CFF', mint: '#7FE0C4' },  // 泡泡粉、钴蓝、薄荷：分类色块、贴纸
    fonts: { title: '"Noto Sans SC"', body: '"Noto Sans SC"', num: '"Space Mono"' },
    radius: 0,
    border: '3px solid #111111',   // 小件 2.5px
    shadow: '6px 6px 0 #111111',   // 小件 3px 3px 0，贴纸 4px 4px 0
    margin: 24,
    photo: 'contrast(1.2) brightness(.94) saturate(1.08)',
  };
  const { pink: P, blue: B, mint: G } = T.accents;
  const Y = T.primary, K = T.ink;
  const css = `
.s10{--bg:${T.bg};--k:${K};--y:${Y};--p:${P};--b:${B};--g:${G};isolation:isolate;background:var(--bg);color:var(--k);font-family:"Noto Sans SC","PingFang SC",sans-serif;font-size:15px;line-height:1.5}
.s10 .v-pad{padding-left:24px;padding-right:24px}
/* 外露网格：25px 一格、8% 黑细线，铺满整屏垫在最底下 */
.s10 .v-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(17,17,17,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,.08) 1px,transparent 1px);background-size:25px 25px;background-position:-1px -1px;pointer-events:none;z-index:-1}
/* 两档黑框：大块 3px + 6px 硬影，小件 2.5px + 3px 硬影 */
.s10 .v-bx{border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)}
.s10 .v-bx3{border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k)}
.s10 .v-mono{font-family:"Space Mono",monospace;font-weight:700}
/* 字号层级：大小对比要极端，大标题 56–66、其余 11–30 */
.s10 .v-h1{font:900 60px/1 "Noto Sans SC";letter-spacing:-.03em;margin-left:-3px}
.s10 .v-h2{font:900 30px/1.05 "Noto Sans SC";letter-spacing:-.01em}
.s10 .v-h3{font:900 17px/1.15 "Noto Sans SC"}
.s10 .v-tx{font:500 15px/1.6 "Noto Sans SC"}
.s10 .v-mut{font:700 12px/1.3 "Space Mono","Noto Sans SC";letter-spacing:.02em}
.s10 .v-wk{font:700 14px/1 "Space Mono","Noto Sans SC";letter-spacing:.02em}
.s10 .v-num{font-family:"Space Mono",monospace;font-weight:700;letter-spacing:-.02em}
.s10 .v-big{font:700 92px/1 "Space Mono";letter-spacing:-.05em}
.s10 .v-price{font:700 34px/1 "Space Mono";letter-spacing:-.03em}
.s10 .v-price small{font:700 13px/1 "Noto Sans SC";margin-left:4px}
.s10 .v-xl{font:900 170px/1 "Noto Sans SC";letter-spacing:-.05em;margin-left:-8px}
/* 按钮：黄底黑框实心硬影，像贴纸。默认 50 高（小件框），.wide 通栏 58 高（大块框），.lg 64 高 */
.s10 .v-btn{height:50px;padding:0 20px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--y);color:var(--k);border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k);font:900 18px/1 "Noto Sans SC";white-space:nowrap}
.s10 .v-btn.wide{display:flex;width:100%;height:58px;gap:10px;font-size:19px;border-width:3px;box-shadow:6px 6px 0 var(--k)}
.s10 .v-btn.lg{height:64px;padding:0 24px;font-size:23px;border-width:3px;box-shadow:6px 6px 0 var(--k)}
.s10 .v-btn.ghost{background:#fff}
.s10 .v-btn.dark{background:var(--k);color:#fff}
/* 卡片：白底黑框硬影；.v-card>.ph 顶部照片（默认 168 高），.v-card .bd 正文（ui.card 涂成色块） */
.s10 .v-card{position:relative;background:#fff;border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)}
.s10 .v-card>.ph{height:168px;border-bottom:3px solid var(--k)}
.s10 .v-card .bd{padding:14px 16px 15px}
.s10 .v-card .bd .v-mut{margin-top:9px;font-size:13px}
/* 色块方块：两两并排，大字 + 等宽时间 + 价格 */
.s10 .v-tiles{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.s10 .v-tile{position:relative;height:122px;padding:13px 14px;display:flex;flex-direction:column;justify-content:space-between;border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)}
.s10 .v-tile b{font:900 28px/1 "Noto Sans SC"}
.s10 .v-tile span{font:700 12px/1 "Space Mono","Noto Sans SC"}
.s10 .v-tile em{font:700 24px/1 "Space Mono";font-style:normal;letter-spacing:-.02em}
/* 列表：整块黑框，行之间 3px 黑线 */
.s10 .v-list{background:#fff;border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)}
.s10 .v-row{display:flex;align-items:center;gap:12px;min-height:60px;padding:12px 16px}
.s10 .v-row+.v-row{border-top:3px solid var(--k)}
/* 筛选：直角小方块，选中黑底白字 */
.s10 .v-chips{display:flex;gap:10px;flex-wrap:wrap}
.s10 .v-chip{height:36px;padding:0 14px;display:inline-flex;align-items:center;background:#fff;border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k);font:700 15px/1 "Noto Sans SC"}
.s10 .v-chip.on{background:var(--k);color:#fff}
.s10 .v-inp{height:54px;display:flex;align-items:center;gap:10px;padding:0 16px;background:#fff;border:3px solid var(--k);box-shadow:4px 4px 0 var(--k);font:700 15px/1 "Space Mono","Noto Sans SC"}
/* 照片：同一组高对比、略降饱和；.v-pic 是歪放的黑框照片（底下垫实心黑块，转角度也不漏缝） */
.s10 .ph{background-size:cover;background-position:center;filter:${T.photo}}
.s10 .v-pic{position:relative}
.s10 .v-pic::before{content:"";position:absolute;inset:0;background:var(--k);transform:translate(var(--o,6px),var(--o,6px))}
.s10 .v-pic>.ph{position:absolute;inset:0;border:3px solid var(--k)}
/* 贴纸：歪着贴的标签。价格用等宽 24px，中文用思源黑体 900 18px */
.s10 .v-stk{position:absolute;z-index:3;display:inline-block;padding:9px 12px 8px;border:3px solid var(--k);box-shadow:4px 4px 0 var(--k);font:700 24px/1 "Space Mono","Noto Sans SC";letter-spacing:-.02em;white-space:nowrap}
.s10 .v-stk.cn{padding:9px 13px;font:900 18px/1 "Noto Sans SC";letter-spacing:0}
/* 圆贴章：实心圆 + 黑框硬影，歪着贴（勾、记号） */
.s10 .v-badge{border-radius:50%;display:grid;place-items:center}
/* 方块格子信息表 */
.s10 .v-cells{display:grid;grid-template-columns:1fr 1fr;background:#fff;border:3px solid var(--k)}
.s10 .v-cells>div{padding:11px 13px 12px;border-top:3px solid var(--k)}
.s10 .v-cells>div:nth-child(-n+2){border-top:none}
.s10 .v-cells>div:nth-child(even){border-left:3px solid var(--k)}
.s10 .v-cells span{display:block;font:700 11px/1 "Noto Sans SC";letter-spacing:.04em}
.s10 .v-cells b{display:block;margin-top:8px;font:700 19px/1 "Space Mono","Noto Sans SC";letter-spacing:-.02em}
/* 人物行：方块头像（姓的第一个字）+ 名字 + 身份 */
.s10 .v-who{display:flex;align-items:center;gap:12px}
.s10 .v-who .av{width:48px;height:48px;display:grid;place-items:center;border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k);font:900 24px/1 "Noto Sans SC"}
.s10 .v-who b{display:block;font:900 17px/1 "Noto Sans SC"}
.s10 .v-who span{display:block;margin-top:6px;font:700 12px/1 "Noto Sans SC"}
/* 票：彩色票头、虚线撕口、两侧半圆缺口、格子、二维码 */
.s10 .v-tkt{position:relative;background:#fff;border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)}
.s10 .v-tkt .t1{position:relative;padding:18px;border-bottom:3px dashed var(--k)}
.s10 .v-tkt .t1 .br{display:flex;align-items:center;gap:6px;font:700 12px/1 "Space Mono","Noto Sans SC";letter-spacing:.06em}
.s10 .v-tkt .t1 b{display:block;margin-top:12px;font:900 44px/1 "Noto Sans SC";letter-spacing:-.02em}
.s10 .v-tkt .t1 span{display:block;margin-top:12px;font:700 16px/1 "Space Mono","Noto Sans SC"}
.s10 .v-tkt .nt{position:absolute;bottom:-13.5px;width:24px;height:24px;border-radius:50%;background:var(--bg);border:3px solid var(--k);z-index:2}
.s10 .v-tkt .nt.l{left:-21.5px}.s10 .v-tkt .nt.r{right:-21.5px}
.s10 .v-tkt .t2{position:relative;display:grid;grid-template-columns:1fr 1fr;border-bottom:3px dashed var(--k)}
.s10 .v-tkt .t2>div{padding:13px 18px 14px}
.s10 .v-tkt .t2>div.l2{border-left:3px solid var(--k)}
.s10 .v-tkt .t2>div.w{grid-column:1/3}
.s10 .v-tkt .t2>div.bt{border-top:3px solid var(--k)}
.s10 .v-tkt .t2 span{display:block;font:700 11px/1 "Noto Sans SC";letter-spacing:.04em}
.s10 .v-tkt .t2 b{display:block;margin-top:8px;font:900 19px/1.15 "Noto Sans SC"}
.s10 .v-tkt .t3{display:flex;align-items:center;gap:18px;padding:16px 18px}
.s10 .v-tkt .t3 .q{padding:5px;border:3px solid var(--k);line-height:0}
.s10 .v-tkt .t3 .no{font:700 34px/1 "Space Mono";letter-spacing:-.02em}
.s10 .v-tkt .t3 .no small{display:block;margin-bottom:8px;font:700 11px/1 "Noto Sans SC";letter-spacing:0}
/* 字牌：品牌名放进黄底黑框里，右边等宽英文 */
.s10 .v-plate{display:flex;align-items:center;justify-content:space-between}
.s10 .v-plate b{background:var(--y);border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k);padding:9px 12px 8px;font:900 27px/1 "Noto Sans SC";letter-spacing:.02em}
.s10 .v-plate em{font:700 14px/1 "Space Mono";font-style:normal;letter-spacing:.12em}
/* 字牌放进小程序顶栏左边：压到 40 高，和页边距对齐 */
.s10 .mn-l .v-plate{margin-left:12px}
.s10 .mn-l .v-plate b{padding:6px 10px 5px;font-size:22px}
/* 顶栏、标签栏 */
.s10 .v-nav{position:relative;height:52px;margin:6px 24px 0;display:flex;align-items:center;justify-content:space-between}
.s10 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:900 18px/1 "Noto Sans SC";white-space:nowrap}
.s10 .v-ib{width:42px;height:42px;background:#fff;color:var(--k);border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k);display:grid;place-items:center}
/* 小程序子页的返回键：34px 方块，放进 miniNav 的 left */
.s10 .v-mb{width:34px;height:34px;margin-left:12px;background:#fff;color:var(--k);border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k);display:grid;place-items:center}
.s10 .v-logo{display:flex;align-items:center;gap:9px}
.s10 .v-logo .as{width:38px;height:38px;background:var(--y);border:3px solid var(--k);display:grid;place-items:center;box-shadow:3px 3px 0 var(--k)}
.s10 .v-logo b{font:900 23px/1 "Noto Sans SC";letter-spacing:.02em;white-space:nowrap}
.s10 .v-logo em{font:700 13px/1 "Space Mono";font-style:normal;letter-spacing:.1em}
.s10 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:86px;background:#fff;border-top:3px solid var(--k);display:grid;z-index:6}
.s10 .v-tabs>div{height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;font:700 11px/1 "Noto Sans SC";border-left:3px solid var(--k)}
.s10 .v-tabs>div:first-child{border-left:none}
.s10 .v-tabs>div.on{background:var(--y)}
.s10 .v-tabs:after{content:"";position:absolute;left:0;right:0;top:62px;border-top:3px solid var(--k)}
/* 底部操作条（详情页：价格 + 按钮） */
.s10 .v-bar{position:absolute;left:0;right:0;bottom:0;height:104px;background:#fff;border-top:3px solid var(--k);display:flex;align-items:flex-start;justify-content:space-between;padding:16px 24px 0;z-index:6}
.s10 .v-bar .v-price{line-height:46px}
/* 网页：白底顶栏（大字标）、整行色块栏（3px 黑线分格） */
.s10.web{background:var(--bg)}
.s10 .v-wnav{position:relative;height:86px;border-bottom:3px solid var(--k);display:flex;align-items:center;padding:0 40px;background:#fff}
.s10 .v-wnav nav{display:flex;gap:40px;margin-left:auto;margin-right:40px;font:700 17px/1 "Noto Sans SC"}
.s10 .v-wnav .v-logo .as{width:46px;height:46px}
.s10 .v-wnav .v-logo b{font-size:28px}
.s10 .v-wnav .v-logo em{margin-left:6px;font-size:15px}
.s10 .v-wnav .v-btn{font-size:17px}
.s10 .v-wcols{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;border-top:3px solid var(--k)}
.s10 .v-wcols>div{position:relative;padding:28px 36px;border-left:3px solid var(--k)}
.s10 .v-wcols>div:first-child{border-left:none}
.s10 .v-wcols b{display:block;font:900 72px/1 "Noto Sans SC";letter-spacing:-.03em}
.s10 .v-wcols span{display:block;margin-top:18px;font:700 16px/1 "Space Mono","Noto Sans SC"}
.s10 .v-wcols em{display:block;margin-top:14px;font:700 38px/1 "Space Mono";font-style:normal;letter-spacing:-.03em}
.s10 .v-wcols .v-ib{position:absolute;right:30px;bottom:30px;width:56px;height:56px}
`;
  // 品牌记号：粗、实、黑的几何形，24×24 画布。star 八角星（图册造物所）、burst 十二角爆炸星、plus 粗十字、flower 四瓣花、bolt 闪电
  const burst = (() => { const p = []; for (let i = 0; i < 24; i++) { const r = i % 2 ? 7.4 : 11.6, a = (i * 15 - 90) * Math.PI / 180; p.push((12 + r * Math.cos(a)).toFixed(2) + ',' + (12 + r * Math.sin(a)).toFixed(2)); } return p.join(' '); })();
  const MARKS = {
    star: '<rect x="9.6" y="1" width="4.8" height="22"/><rect x="9.6" y="1" width="4.8" height="22" transform="rotate(45 12 12)"/><rect x="9.6" y="1" width="4.8" height="22" transform="rotate(90 12 12)"/><rect x="9.6" y="1" width="4.8" height="22" transform="rotate(135 12 12)"/>',
    burst: `<polygon points="${burst}"/>`,
    plus: '<rect x="8.4" y="1" width="7.2" height="22"/><rect x="1" y="8.4" width="22" height="7.2"/>',
    flower: '<circle cx="12" cy="6.6" r="5.4"/><circle cx="17.4" cy="12" r="5.4"/><circle cx="12" cy="17.4" r="5.4"/><circle cx="6.6" cy="12" r="5.4"/>',
    bolt: '<polygon points="14.5,1 3.5,14 11,14 9,23 20.5,9.2 13,9.2"/>',
  };
  const mark = (s, c = K, kind = 'star') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><g fill="${c}">${MARKS[kind] || MARKS.star}</g></svg>`;
  const BX = (big) => (big ? 'border:3px solid var(--k);box-shadow:6px 6px 0 var(--k)' : 'border:2.5px solid var(--k);box-shadow:3px 3px 0 var(--k)');
  // 色块上的字色：默认黑；深色底（藏青、酒红）传 fg: '#fff'
  const FG = (fg) => (fg ? `color:${fg};` : '');
  const ui = {
    mark,   // mark(20) / mark(92, '#111', 'burst')
    // 字标：黄方块里的记号 + 粗黑字，可带等宽英文；sym 传记号名（'burst'）或一段 SVG
    logo: (name, en = '', sym = 'star') => `<div class="v-logo"><span class="as">${MARKS[sym] ? mark(20, K, sym) : sym}</span><b>${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // 字牌：plate('半山咖啡', 'BANSHAN')，品牌名在黄底黑框里，右边等宽英文（没有顶栏字标时放在页面最上面）
    plate: (name, en = '') => `<div class="v-plate"><b>${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左右是方块图标按钮；小程序用 L.miniNav
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<div class="v-ib" data-back>${icon('arrow-left', 22, 2.6)}</div>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 小程序子页的返回键：miniNav({ left: ui.miniBack() })，带 data-back
    miniBack: (attrs = '') => `<div class="v-mb" data-back ${attrs}>${icon('arrow-left', 18, 2.6)}</div>`,
    // iconBtn('search', 'data-go="x"')：方块图标按钮（搜索、收藏、分享、网页色块里的箭头），参数是图标名和原样放进标签的属性
    iconBtn: (name, attrs = '') => `<div class="v-ib" ${attrs}>${icon(name, 20, 2.6)}</div>`,
    // 底部标签栏：格子分隔，当前格涂黄
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs" style="grid-template-columns:repeat(${items.length},1fr)">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(ic, 21, 2.4)}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：箭头类图标放字后面，别的图标放字前面；cls 'wide' 通栏 / 'lg' 大号 / 'ghost' 白底 / 'dark' 黑底
    btn: (text, { ic = 'arrow-right', cls = '', attrs = '' } = {}) => {
      const big = /\b(wide|lg)\b/.test(cls);
      const ico = ic ? icon(ic, big ? 22 : 20, big ? 2.6 : 2.8) : '';
      return `<div class="v-btn ${cls}" ${attrs}>${ic && !ic.startsWith('arrow') ? ico + text : text + ico}</div>`;
    },
    // 歪贴纸：sticker('¥268', { bg: 'var(--p)', rot: 7, pos: 'right:-10px;top:-16px' })；¥ 或数字开头用等宽字，其余用思源黑体 900；size 改字号，fg 改字色
    sticker: (text, { bg = 'var(--p)', fg = '', rot = 6, pos = '', size } = {}) => `<div class="v-stk ${/^[¥\d]/.test(text) ? '' : 'cn'}" style="background:${bg};${FG(fg)}transform:rotate(${rot}deg);${size ? `font-size:${size}px;` : ''}${pos}">${text}</div>`,
    // 圆贴章：badge(icon('check', 34, 3.4))，badge(mark(92), { d: 150, bg: 'var(--y)', rot: 14 })；d ≥ 100 用大块框
    badge: (inner, { d = 62, bg = 'var(--g)', rot = -10, pos = '' } = {}) => `<div class="v-badge" style="width:${d}px;height:${d}px;background:${bg};transform:rotate(${rot}deg);${BX(d >= 100)};${pos}">${inner}</div>`,
    // 外露网格，放在屏幕根元素第一个；网页用 grid(32)
    grid: (size = 25) => `<div class="v-grid" style="background-size:${size}px ${size}px"></div>`,
    // 展示板背景网格（demo 里写 boardDeco: ui.stageGrid()），和图册舞台一样：54px 一格、2px 13% 黑线
    stageGrid: (size = 54, c = 'rgba(17,17,17,.13)') => `<div style="position:absolute;inset:0;background-image:linear-gradient(${c} 2px,transparent 2px),linear-gradient(90deg,${c} 2px,transparent 2px);background-size:${size}px ${size}px;background-position:-1px -1px"></div>`,
    // 展示板实心硬影：boardDeco: ui.stageGrid() + ui.stageShadow()；off 是偏移（图册 12）。影子画在 build.js 包设备的外层盒子上，不动公用类 .dev .brw
    stageShadow: (off = 12, c = K) => `<style>.board>div:has(>.dev){border-radius:52px;box-shadow:${off}px ${off}px 0 ${c}}.board>div:has(>.brw){border-radius:16px;box-shadow:${off}px ${off}px 0 ${c}}</style>`,
    // 歪放的黑框照片：pic(img('xxx'), { h: 256, rot: -2.5 })；off 是垫底黑块的偏移（网页 8），size 是 background-size，extra 放贴纸
    pic: (src, { h = 240, rot = -2, pos = '50% 50%', size = 'cover', off = 6, extra = '' } = {}) => `<div class="v-pic" style="height:${h}px;transform:rotate(${rot}deg);--o:${off}px"><div class="ph" style="background-image:url(${src});background-position:${pos};background-size:${size}"></div>${extra}</div>`,
    // 首页主卡：上面照片、下面色块写标题和等宽信息，右上角可贴价格贴纸
    // card({ src: img('x'), title: '陶艺拉坯', meta: '周六 14:00 · 3 小时', sticker: ui.sticker('¥268', {...}), attrs: 'data-go="detail"' })；bg 默认 var(--y)，深色底传 fg: '#fff'
    card: ({ src, h = 168, pos = '50% 50%', title = '', meta = '', bg = 'var(--y)', fg = '', sticker = '', attrs = '' } = {}) => `<div class="v-card" ${attrs}><div class="ph" style="height:${h}px;background-image:url(${src});background-position:${pos}"></div><div class="bd" style="background:${bg};${FG(fg)}"><div class="v-h2">${title}</div>${meta ? `<div class="v-mut">${meta}</div>` : ''}</div>${sticker}</div>`,
    // 色块方块（两个一行，外面包 <div class="v-tiles">）：tile({ title: '木工', meta: '周日 10:00', price: '¥398', bg: 'var(--b)' })；深色底传 fg: '#fff'
    tile: ({ title = '', meta = '', price = '', bg = 'var(--b)', fg = '', attrs = '' } = {}) => `<div class="v-tile" style="background:${bg};${FG(fg)}" ${attrs}><b>${title}</b>${meta ? `<span>${meta}</span>` : ''}${price ? `<em>${price}</em>` : ''}</div>`,
    // 人物行：who({ ch: '许', name: '许晓', meta: '陶艺师 · 带课 8 年', bg: 'var(--p)' })
    who: ({ ch = '', name = '', meta = '', bg = 'var(--p)', fg = '' } = {}) => `<div class="v-who"><div class="av" style="background:${bg};${FG(fg)}">${ch}</div><div><b>${name}</b>${meta ? `<span>${meta}</span>` : ''}</div></div>`,
    // 票：ticket({ bg: 'var(--p)', brand: 'MAKERS · 造物所', title: '陶艺拉坯', when: '10.31 周六 14:00',
    //   cells: [['座位', '3 号拉坯机'], ['老师', '许晓'], ['地点', '798 艺术区 B 座 2 层', true]], code: '0142', sticker: ui.sticker('已付 ¥268', {...}) })
    //   cells 每项 [标签, 内容, 是否占整行]；codeLabel 默认「入场码」；rot 默认 -1.5 度；外边距由项目定；brand 可以带 ui.mark；深色票头传 fg: '#fff'
    ticket: ({ bg = 'var(--p)', fg = '', brand = '', title = '', when = '', cells = [], code = '', codeLabel = '入场码', qrSeed = 7, sticker = '', rot = -1.5, attrs = '' } = {}) => {
      let row = 0, col = 0;
      const cs = cells.map(([lb, v, wide]) => {
        let c;
        if (wide) { if (col) { row++; col = 0; } c = 'w' + (row ? ' bt' : ''); row++; }
        else { c = (col ? 'l2' : '') + (row ? ' bt' : ''); if (++col === 2) { col = 0; row++; } }
        return `<div class="${c}"><span>${lb}</span><b>${v}</b></div>`;
      }).join('');
      const nt = '<i class="nt l"></i><i class="nt r"></i>';
      return `<div class="v-tkt" style="transform:rotate(${rot}deg)" ${attrs}><div class="t1" style="background:${bg};${FG(fg)}">${brand ? `<div class="br">${brand}</div>` : ''}<b>${title}</b>${when ? `<span>${when}</span>` : ''}${nt}</div>${cells.length ? `<div class="t2">${cs}${nt}</div>` : ''}<div class="t3"><div class="q">${L.qr(92, K, '#fff', qrSeed)}</div><div class="no"><small>${codeLabel}</small>${code}</div></div>${sticker}</div>`;
    },
    // 网页整行色块栏：wcols([{ title: '陶艺', meta: '周六 14:00 · 3 小时', price: '¥268', bg: 'var(--p)', go: 'detail' }, …], { h: 291 })；深色格传 fg: '#fff'
    wcols: (items, { h = 291 } = {}) => `<div class="v-wcols" style="height:${h}px">${items.map((it) => `<div style="background:${it.bg || '#fff'};${FG(it.fg)}" ${it.go ? `data-go="${it.go}"` : ''}><b>${it.title}</b>${it.meta ? `<span>${it.meta}</span>` : ''}${it.price ? `<em>${it.price}</em>` : ''}<div class="v-ib">${icon('arrow-up-right', 26, 2.8)}</div></div>`).join('')}</div>`,
  };
  return { key: 's10-brutal', no: 10, name: '新粗野主义', root: 's10', T, css, ui, stage: P, dark: false };
};
