// 11 运动能量 Sport —— 起手包
// 色值、字体、字号、滤镜、线宽都照图册模块 catalog/pages/s11-sport.js（疾风 GALE）原样取
// 用法：const S = style('s11-sport'); 屏幕根元素 <div class="scr s11">；组件见 S.ui
// 这种风格的版式是「一屏几块按位置摆」：照片铺顶、得意黑标题、巨大的斜体数字、数据行、斜切按钮，各块用 .v-abs + style="top:…px" 摆
module.exports = (L) => {
  const { icon } = L;
  const V = '#D0FF1A';   // 荧光黄绿：数据和主按钮都用它
  const BG = '#0B0B0B';  // 夜黑
  const GR = '#8A8A8A';  // 中灰：小标签、单位
  const DV = '#2C3608';  // 暗荧绿：进度环、进度条的底槽
  const T = {
    bg: BG,
    surface: '#141414',     // 路线图 / 图表底板、卡片
    ink: '#FFFFFF',
    ink2: GR,
    line: '#1E1E1E',        // 列表分隔线、标签栏顶线（1px）
    primary: V,
    onPrimary: BG,
    accents: { dim: DV, soft: '#A8A8A8', panel: '#1C1C1C', water: '#1D2628', white: '#FFFFFF' },  // 暗荧绿、浅灰字、圆钮底、路线图里的河
    fonts: { title: '"Smiley Sans"', body: '"Noto Sans SC"', num: '"Barlow Condensed"' },     // 得意黑 / 思源黑体（图册写苹方，交付用思源黑体）/ Barlow 窄体 900 斜
    radius: 10,
    border: null,
    shadow: null,
    margin: 24,
    photo: 'grayscale(1) contrast(1.75) brightness(.86)',
  };
  const css = `
.s11{--v:${V};--bg:${BG};--gr:${GR};--dv:${DV};--ln:#1E1E1E;--pn:#1C1C1C;--sf:#141414;--sub:#A8A8A8;background:var(--bg);color:#fff;font-family:"Noto Sans SC",sans-serif;font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.s11 .v-pad{padding-left:24px;padding-right:24px}
/* 字：标题得意黑（字形自带斜），数字 Barlow Condensed 900 斜体，正文思源黑体；大小对比要极端 */
.s11 .v-h1{font:400 44px/1 "Smiley Sans";letter-spacing:.01em}
.s11 .v-h2{font:400 30px/1.1 "Smiley Sans";letter-spacing:.02em}
.s11 .v-h3{font:500 16px/1.3 "Noto Sans SC"}
.s11 .v-tx{font:400 15px/1.6 "Noto Sans SC";color:#CFCFCF}
.s11 .v-mut{font:400 13px/1.4 "Noto Sans SC";color:var(--sub);letter-spacing:.04em}
.s11 .v-lb{display:block;font:400 12px/1.2 "Noto Sans SC";color:var(--gr);letter-spacing:.06em}
.s11 .v-num{font-family:"Barlow Condensed",sans-serif;font-weight:900;font-style:italic;letter-spacing:-.01em}
.s11 .v-num small{font:400 13px/1 "Noto Sans SC";font-style:normal;color:var(--gr);margin-left:4px;letter-spacing:0}
.s11 .v-kv{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.s11 .v-kv .v-num{font-size:34px;line-height:.8;font-weight:800}
.s11 .v-sep{border-top:1px solid var(--ln);padding-top:16px}
/* 大数字：默认 132（价格、三四位数），.xl 174（10.42 这种带小数点的成绩），.tm 164（32:08 这种五个字符的时间），.md 92（目标进度）；.w 白色（正在计时） */
.s11 .v-big{display:block;font:italic 900 132px/.8 "Barlow Condensed";letter-spacing:-.01em;color:var(--v);white-space:nowrap;margin-left:-6px}
.s11 .v-big.xl{font-size:174px}
.s11 .v-big.tm{font-size:164px}
.s11 .v-big.md{font-size:92px;margin-left:-3px}
.s11 .v-big.w{color:#fff}
.s11 .v-unit{display:block;font:400 24px/1 "Smiley Sans";letter-spacing:.06em}
.s11 .v-v{color:var(--v)}
.s11 .v-price{display:inline-flex;align-items:baseline;font:italic 900 34px/.8 "Barlow Condensed";letter-spacing:-.01em;color:#fff;white-space:nowrap}
/* ¥ 是价格字号的 .34 倍，下限 16px：34px 的常规价格里 .34em 只剩一撇 */
.s11 .v-price i{align-self:flex-start;font-size:max(.34em,16px);line-height:1;margin:.08em .08em 0 0}
.s11 .v-price small{font:400 12px/1 "Noto Sans SC";color:var(--gr);margin-left:4px;letter-spacing:.02em}
/* 斜切按钮：底色是斜 12° 的平行四边形，字是正的；通栏时左右各收 6px，斜边正好落在 24px 页边上 */
.s11 .v-btn{position:relative;isolation:isolate;height:56px;padding:0 30px;display:inline-flex;align-items:center;justify-content:center;gap:10px;color:var(--bg);font:400 22px/1 "Smiley Sans";letter-spacing:.02em;white-space:nowrap}
.s11 .v-btn::before{content:"";position:absolute;inset:0;background:var(--v);transform:skewX(-12deg);z-index:-1}
.s11 .v-btn.wide{display:flex;margin:0 6px}
.s11 .v-btn.ghost{color:#fff}
.s11 .v-btn.ghost::before{background:var(--pn)}
.s11 .v-btn.sm{height:38px;padding:0 18px;font-size:17px;gap:6px}
/* 卡片 / 底板：#141414、圆角 10，没有描边和阴影 */
.s11 .v-card{position:relative;background:var(--sf);border-radius:10px;overflow:hidden}
.s11 .v-card>.ph{height:180px}
.s11 .v-card .bd{padding:16px 18px 18px}
.s11 .v-map{border-radius:10px;overflow:hidden;background:var(--sf)}
/* 入场码、核销码的底板：白底黑码（荧光不铺大色块，闸机也读得稳）；里面放 qr(279, T.bg, '#fff') */
.s11 .v-qr{padding:24px;background:#fff;border-radius:10px}
.s11 .v-qr svg{display:block}
/* 列表：行之间 1px #1E1E1E，没有底色 */
.s11 .v-list{border-bottom:1px solid var(--ln)}
.s11 .v-row{display:flex;align-items:center;gap:14px;min-height:58px;padding:10px 0;border-top:1px solid var(--ln)}
.s11 .v-st{display:inline-flex;align-items:center;gap:4px;font:500 14px/1 "Noto Sans SC";color:var(--sub);white-space:nowrap}
.s11 .v-st.on{color:var(--v)}
/* 课表 / 场次行（ui.slot）：左边斜体大时间，中间名字 + 次要信息，右边状态 */
.s11 .v-slot{min-height:72px;padding:0}
.s11 .v-slot .tm{width:78px;flex:none;font-size:32px;line-height:1}
.s11 .v-slot .m{flex:1;min-width:0}
.s11 .v-slot .m .v-mut{margin-top:5px}
/* 筛选：斜切小块，选中是白底黑字（荧光色只留给数据和主按钮） */
.s11 .v-chips{display:flex;gap:12px;flex-wrap:wrap;padding:0 6px}
.s11 .v-chip{position:relative;isolation:isolate;height:36px;padding:0 16px;display:inline-flex;align-items:center;gap:6px;font:500 14px/1 "Noto Sans SC";color:#CFCFCF;white-space:nowrap}
.s11 .v-chip::before{content:"";position:absolute;inset:0;background:var(--pn);transform:skewX(-12deg);z-index:-1}
.s11 .v-chip.on{color:var(--bg)}
.s11 .v-chip.on::before{background:#fff}
/* 日期条（约课、订场） */
.s11 .v-days{display:flex;gap:10px;padding:0 7px}
.s11 .v-day{position:relative;isolation:isolate;flex:1;height:64px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:var(--sub)}
.s11 .v-day::before{content:"";position:absolute;inset:0;background:var(--pn);transform:skewX(-12deg);z-index:-1}
.s11 .v-day span{font:400 12px/1 "Noto Sans SC"}
.s11 .v-day b{font-size:28px;line-height:.8;color:#fff}
.s11 .v-day.on{color:var(--bg)}
.s11 .v-day.on::before{background:#fff}
.s11 .v-day.on b{color:var(--bg)}
.s11 .v-inp{height:54px;display:flex;align-items:center;gap:10px;padding:0 16px;background:var(--sf);border-radius:10px;font:400 15px/1 "Noto Sans SC";color:#fff}
.s11 .v-inp .ic{color:var(--gr)}
/* 照片：黑白高对比 + 两侧水平速度模糊 + 下沿渐黑（ui.photo） */
.s11 .ph{background-size:cover;background-position:center;filter:${T.photo}}
.s11 .v-photo{position:absolute;left:0;right:0;overflow:hidden}
.s11 .v-photo>.ph{position:absolute;inset:0;background-repeat:no-repeat}
.s11 .v-photo>.mb{-webkit-mask-image:linear-gradient(90deg,#000 0%,rgba(0,0,0,.85) 18%,transparent 40%,transparent 62%,rgba(0,0,0,.85) 84%,#000 100%)}
.s11 .v-photo.cl>.mb{-webkit-mask-image:linear-gradient(90deg,#000 0%,rgba(0,0,0,.92) 14%,transparent 30%,transparent 76%,rgba(0,0,0,.92) 90%,#000 100%)}
.s11 .v-photo>i{position:absolute;inset:0}
.s11 .v-photo>i.fade{background:linear-gradient(180deg,rgba(11,11,11,.6) 0%,rgba(11,11,11,0) 24%,rgba(11,11,11,0) 50%,${BG} 94%)}
/* 数据：三列数字、分段条、进度条、进度环 */
.s11 .v-stats{display:grid;grid-template-columns:repeat(3,1fr)}
.s11 .v-stats b{display:block;margin-top:6px;font-size:36px;line-height:1;font-weight:800;white-space:nowrap}
.s11 .v-stats small{font:400 13px/1 "Noto Sans SC";color:var(--gr);margin-left:3px;letter-spacing:0}
.s11 .v-seg{display:flex;gap:4px}
.s11 .v-seg i{flex:1;height:6px;background:var(--dv);transform:skewX(-20deg)}
.s11 .v-seg i.f{background:var(--v)}
.s11 .v-prog{position:relative;height:8px;background:var(--dv);transform:skewX(-20deg)}
.s11 .v-prog i{position:absolute;left:0;top:0;bottom:0;background:var(--v)}
.s11 .v-ring{position:relative;flex:none}
.s11 .v-ring .in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.s11 .v-ring .in b{line-height:1;color:#fff}
.s11 .v-ring .in span{font:400 11px/1.2 "Noto Sans SC";color:var(--gr);letter-spacing:.04em;margin-top:3px}
.s11 .v-ring .in span:first-child{margin:0 0 3px}
/* 目标进度（ui.goal）：92px 斜体数字 + 灰字目标 + 斜切进度条 */
.s11 .v-goal .r{display:flex;align-items:baseline;gap:8px;margin-bottom:22px}
.s11 .v-goal .r span:last-child{font:400 15px/1 "Noto Sans SC";color:#CFCFCF;white-space:nowrap}
/* 排行 */
.s11 .v-rank .v-row{display:grid;grid-template-columns:34px 40px 1fr auto;gap:12px;padding:0;height:58px}
.s11 .v-rank .rk{font-size:26px;line-height:1;color:#6E6E6E}
.s11 .v-rank b{font:500 16px/1.2 "Noto Sans SC"}
.s11 .v-rank .km{font-size:28px;line-height:1;font-weight:800;white-space:nowrap}
.s11 .v-rank .km small{font:400 12px/1 "Noto Sans SC";color:var(--gr);margin-left:3px}
.s11 .v-rank .me .rk,.s11 .v-rank .me .km{color:var(--v)}
.s11 .v-av{width:40px;height:40px;border-radius:50%;background:var(--ln);color:#E6E6E6;display:grid;place-items:center;font:400 19px/1 "Smiley Sans"}
.s11 .v-av.on,.s11 .v-rank .me .v-av{background:var(--v);color:var(--bg)}
/* 圆形控制钮（暂停 / 结束 / 定位） */
.s11 .v-cb{width:60px;height:60px;border-radius:50%;background:var(--pn);display:grid;place-items:center;color:#fff;flex:none}
.s11 .v-cb.go{width:96px;height:96px;background:var(--v);color:var(--bg)}
.s11 .v-ctls{display:flex;justify-content:center;align-items:center;gap:40px}
/* 顶栏、字标、标签栏 */
.s11 .v-nav{position:relative;z-index:5;height:44px;margin:2px 20px 0;display:flex;align-items:center;justify-content:space-between}
.s11 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:500 15px/1 "Noto Sans SC";white-space:nowrap}
.s11 .v-ib{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center;color:#fff;flex:none}
.s11 .v-logo{display:inline-flex;align-items:center;gap:8px;color:#fff;white-space:nowrap}
.s11 .v-logo b{font-family:"Smiley Sans";font-weight:400;line-height:1;letter-spacing:.04em}
.s11 .v-logo b.lat{font-family:"Barlow Condensed";font-weight:900;font-style:italic;letter-spacing:.02em}
.s11 .v-logo em{font-family:"Barlow Condensed";font-weight:800;font-style:italic;line-height:1;letter-spacing:.12em;color:var(--gr);margin-left:2px}
.s11 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:86px;background:var(--bg);border-top:1px solid var(--ln);display:flex;justify-content:space-around;padding-top:10px;z-index:6}
.s11 .v-tabs>div{display:flex;flex-direction:column;align-items:center;gap:4px;color:#5E5E5E;width:64px}
.s11 .v-tabs span{font:500 11px/1.2 "Noto Sans SC"}
.s11 .v-tabs>div.on{color:#fff}
/* 底部操作条（详情页：价格 + 按钮） */
.s11 .v-bar{position:absolute;left:0;right:0;bottom:0;height:104px;background:var(--bg);border-top:1px solid var(--ln);display:flex;align-items:flex-start;justify-content:space-between;padding:18px 24px 0;z-index:6}
/* 网页 */
.s11.web{background:var(--bg)}
.s11 .v-wnav{position:absolute;top:34px;left:64px;right:64px;height:56px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.s11 .v-wnav nav{display:flex;align-items:center;gap:40px;font:400 17px/1 "Noto Sans SC";color:#E6E6E6}
.s11 .v-wnav .v-btn{height:46px;padding:0 26px;font-size:18px}
/* 网页顶栏压在照片上，字标的西文从中灰提到 #CFCFCF，不然碰到亮窗就看不见 */
.s11 .v-wnav .v-logo em{color:#CFCFCF}
/* 标题组放在右半边，左边让给照片里的人；.v-wh 和 .v-wst 的 left 跟着改就能整组挪 */
.s11 .v-wh{position:absolute;left:556px;top:140px;z-index:2}
.s11 .v-wh1{font:400 108px/1.04 "Smiley Sans";letter-spacing:.01em}
.s11 .v-wt{margin-top:20px;font:400 20px/1.4 "Noto Sans SC";color:#CFCFCF;letter-spacing:.04em}
.s11 .v-wh .v-btn{height:60px;margin-top:30px;padding:0 40px}
.s11 .v-wst{position:absolute;left:556px;right:64px;bottom:52px;z-index:2;display:flex;gap:44px;border-top:1px solid rgba(255,255,255,.18);padding-top:22px}
.s11 .v-wst b{display:block;font-size:56px;line-height:.9;color:var(--v)}
.s11 .v-wst span{display:block;margin-top:8px;font:400 15px/1.3 "Noto Sans SC";color:var(--sub)}
/* 按位置摆的块。写在最后：和 .v-card、.v-btn 这些自带 position:relative 的类写在同一个元素上时，绝对定位要赢 */
.s11 .v-abs{position:absolute;left:24px;right:24px;z-index:2}
`;
  let uid = 0;
  // 当前荧光色（ui.brand 改它）；画图的函数在调用时取，CSS 走变量 --v / --dv
  const C = { v: V, dv: DV };
  // 品牌记号：全部「粗、斜 16°、向右冲」，画布高 16。wind 三道风线（图册的跑团）、bar 杠铃（健身房）、chevron 双箭头（运动品牌、电竞）、ball 带拖尾的球（球馆）、peak 山形（户外）、bolt 闪电（电竞）
  const MARKS = {
    wind: [24, '<rect x="12" y="0.5" width="14" height="3.4"/><rect x="6" y="6.3" width="20" height="3.4"/><rect x="14" y="12.1" width="12" height="3.4"/>'],
    bar: [30, '<rect x="5" y="4" width="3" height="8"/><rect x="9" y="0" width="4" height="16"/><rect x="13" y="6.3" width="9" height="3.4"/><rect x="22" y="0" width="4" height="16"/><rect x="27" y="4" width="3" height="8"/>'],
    chevron: [28, '<polygon points="7,0 13,0 21,8 13,16 7,16 15,8"/><polygon points="16,0 22,0 30,8 22,16 16,16 24,8"/>'],
    ball: [28, '<circle cx="20" cy="8" r="7.4"/><rect x="7" y="2.5" width="8" height="3"/><rect x="5" y="10.5" width="10" height="3"/>'],
    peak: [24, '<polygon points="5,16 14,1 19,8.5 21.5,5 28,16"/>'],
    bolt: [18, '<polygon points="12,0 4,9 9,9 6,16 18,6 12,6 17,0"/>'],
  };
  const mark = (h = 16, c = C.v, kind = 'wind') => { const [w, d] = MARKS[kind] || MARKS.wind; return `<svg width="${Math.round(h * w / 16)}" height="${h}" viewBox="0 0 ${w} 16" style="display:block;flex:none"><g fill="${c}" transform="skewX(-16)">${d}</g></svg>`; };
  const ring = (s, p, { w = 10, top = '', value = '', sub = '', size = 0, color = C.v, track = C.dv } = {}) => {
    const r = (s - w) / 2, c = 2 * Math.PI * r;
    const inner = top || value || sub ? `<div class="in">${top ? `<span>${top}</span>` : ''}${value ? `<b class="v-num" style="font-size:${size || Math.round(s * .28)}px">${value}</b>` : ''}${sub ? `<span>${sub}</span>` : ''}</div>` : '';
    return `<div class="v-ring" style="width:${s}px;height:${s}px"><svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="display:block;transform:rotate(-90deg)"><circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${w}"/><circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}"/></svg>${inner}</div>`;
  };
  // 平滑折线（Catmull-Rom 转贝塞尔）
  const smooth = (pts) => {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const f = (n) => n.toFixed(1);
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d;
  };
  const ui = {
    // 换荧光色（客户品牌色）：在项目 css 最前面写 ui.brand('#FF6A1A') 并把返回的 CSS 拼进去；要在生成屏幕之前调用；T.primary、T.accents.dim 跟着变。
    // dim 不给就自动按「两成主色 + 八成夜黑」调出底槽色；展示板底色在 demo 里另写 stage: 新颜色
    brand: (v, dim = '') => {
      const h = (x) => parseInt(x, 16);
      const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(v);
      C.v = v;
      C.dv = dim || (m ? '#' + [m[1], m[2], m[3]].map((x) => Math.round(h(x) * .2 + 11 * .8).toString(16).padStart(2, '0')).join('').toUpperCase() : DV);
      T.primary = C.v;
      T.accents.dim = C.dv;
      return `.s11{--v:${C.v};--dv:${C.dv}}\n`;
    },
    // ui.mark(高, 颜色, 种类)：mark(16)、mark(16, '#fff', 'bar')；种类见上面 MARKS
    mark,
    // 字标：logo('千钧', 'KILO', { size: 24, sym: ui.mark(15, undefined, 'bar') })；记号 + 品牌名（中文用得意黑，纯西文用 Barlow 窄体 900 斜）+ 可选灰色西文；sym 传记号或自己的 SVG
    logo: (name, en = '', { size = 24, sym = null, color = '#fff' } = {}) => {
      const lat = /^[A-Za-z0-9 .&'-]+$/.test(name);
      return `<span class="v-logo" style="color:${color}">${sym || mark(Math.round(size * .62))}<b class="${lat ? 'lat' : ''}" style="font-size:${size}px">${name}</b>${en ? `<em style="font-size:${Math.round(size * .62)}px">${en}</em>` : ''}</span>`;
    },
    // App 顶栏：左右是半透明圆钮，title 可以是字或 ui.logo(...)；小程序用 L.miniNav
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<span class="v-ib" data-back>${icon('chevron-left', 22, 2)}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 半透明圆钮：iconBtn('ellipsis')
    iconBtn: (name, attrs = '', size = 20) => `<span class="v-ib" ${attrs}>${icon(name, size, 2)}</span>`,
    // 底部标签栏：灰色图标 + 字，当前项变白（不用荧光色）
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(ic, 22, 2)}<span>${t}</span></div>`).join('')}</div>`,
    // 斜切按钮；ic 图标名，at: 'end'（默认，箭头放字后）/ 'start'（分享、扫码这类放字前）
    btn: (text, { ic = '', cls = '', attrs = '', at = 'end' } = {}) => {
      const sz = /\bsm\b/.test(cls) ? 17 : 21;
      const i = ic ? icon(ic, sz, 2.4) : '';
      return `<div class="v-btn ${cls}" ${attrs}>${at === 'start' ? i + text : text + i}</div>`;
    },
    // 高对比运动照片：黑白、两侧水平速度模糊、下沿渐黑到夜黑
    // photo(img('gym-bw'), { h: 400, top: 0, size: 'auto 150%', pos: '60% 30%', dim: .25, side: .8 })
    // color: true 彩色版（食物、产品照用，压暗收饱和）；web: true 网页大图的稍弱对比；veil 自定义遮罩渐变；blur 模糊强度
    // fade: false 不要下沿渐黑；fade: [.4, .78] 改渐黑起止（默认 [.5, .94]），标题压在照片亮处时把它提前；lift: 1.3 提亮偏暗的原图，人和背景糊在一起时用
    photo: (src, { h = 400, top = 0, pos = 'center', size = 'cover', dim = 0, side = 0, color = false, web = false, veil = '', fade = true, blur = 0, lift = 1 } = {}) => {
      const id = 's11mb' + (++uid);
      const sd = blur || (color ? 34 : 18);
      const base = color ? 'saturate(.82) contrast(1.8)' : (web ? 'grayscale(1) contrast(1.6)' : 'grayscale(1) contrast(1.75)');
      const b1 = (color ? .8 : (web ? .8 : .86)) * lift, b2 = (color ? .88 : (web ? .85 : .95)) * lift;
      const bg = `background-image:url(${src});background-size:${size};background-position:${pos}`;
      return `<div class="v-photo${color ? ' cl' : ''}" style="top:${top}px;height:${h}px"><svg width="0" height="0" style="position:absolute"><filter id="${id}" x="-20%" y="0" width="140%" height="100%"><feGaussianBlur stdDeviation="${sd} 0"/></filter></svg>
<div class="ph" style="${bg};filter:${base} brightness(${b1})"></div><div class="ph mb" style="${bg};filter:url(#${id}) ${base} brightness(${b2})"></div>${dim ? `<i style="background:rgba(11,11,11,${dim})"></i>` : ''}${side ? `<i style="background:linear-gradient(90deg,rgba(11,11,11,${side}) 0%,rgba(11,11,11,0) 64%)"></i>` : ''}${veil ? `<i style="background:${veil}"></i>` : ''}${Array.isArray(fade) ? `<i style="background:linear-gradient(180deg,rgba(11,11,11,.6) 0%,rgba(11,11,11,0) 24%,rgba(11,11,11,0) ${fade[0] * 100}%,${BG} ${fade[1] * 100}%)"></i>` : (fade ? '<i class="fade"></i>' : '')}</div>`;
    },
    // 进度环：ring(106, .864, { top: '十月', value: '86.4', sub: '/ 100 公里' })
    ring,
    // 分段进度（斜切小段）：seg(10, 6)
    seg: (n, f, { h = 6 } = {}) => `<div class="v-seg">${Array.from({ length: n }, (_, i) => `<i class="${i < f ? 'f' : ''}" style="height:${h}px"></i>`).join('')}</div>`,
    // 斜切进度条：prog(.864)
    prog: (p, { h = 8 } = {}) => `<div class="v-prog" style="height:${h}px"><i style="width:${(p * 100).toFixed(1)}%"></i></div>`,
    // 目标进度：goal('86.4', '/ 100 公里', .864)
    goal: (val, rest, p) => `<div class="v-goal"><div class="r"><span class="v-big md">${val}</span><span>${rest}</span></div>${ui.prog(p)}</div>`,
    // 三列数据：stats([['配速', `5'12"`], ['用时', '54:11'], ['心率', '156', '次/分']], { size: 36, cols: '1fr 1fr 1fr' })；第四项 'v' 让这个数变荧光色
    stats: (items, { size = 36, cols = '' } = {}) => `<div class="v-stats" ${cols ? `style="grid-template-columns:${cols}"` : ''}>${items.map(([l, v, u = '', c = '']) => `<div><span class="v-lb">${l}</span><b class="v-num ${c === 'v' ? 'v-v' : ''}" style="font-size:${size}px">${v}${u ? `<small>${u}</small>` : ''}</b></div>`).join('')}</div>`,
    // 价格：¥ 缩小顶齐；price(28, '/次', { size: 132, color: '#D0FF1A' })
    price: (n, unit = '', { size = 34, color = '' } = {}) => `<span class="v-price" style="font-size:${size}px;${color ? `color:${color}` : ''}"><i>¥</i>${n}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // 运动路线：route(201, 104)；深色街区 + 荧光路线（画布 200×116）；live: true 是正在跑（路线没闭合、终点带光晕）；
    // pts: [[30,86],[74,62],…] 换成客户自己的路线，按点连成平滑线（闭合路线首尾写同一点）
    route: (w, h, { live = false, pts = null } = {}) => `<svg width="${w}" height="${h}" viewBox="0 0 200 116" preserveAspectRatio="xMidYMid slice" style="display:block">
<rect width="200" height="116" fill="#141414"/>
<g stroke="#232323" stroke-width="1.2" fill="none"><path d="M0 22H200M0 58H200M0 100H200M30 0V116M88 0V116M150 0V116M0 8L70 116M120 0L200 80"/></g>
<path d="M-4 74C30 60 52 70 84 56S140 30 204 40" stroke="#1D2628" stroke-width="9" fill="none"/>
${pts ? `<path d="${smooth(pts)}" fill="none" stroke="${C.v}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="5" fill="#fff" stroke="#141414" stroke-width="2"/>${live ? `<circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="11" fill="${C.v}" opacity=".18"/><circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="5.4" fill="${C.v}" stroke="#141414" stroke-width="2"/>` : ''}` : live ? `<path d="M30 86C40 70 58 74 74 62S104 36 126 40S158 30 166 42" fill="none" stroke="${C.v}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="30" cy="86" r="4" fill="#fff" stroke="#141414" stroke-width="2"/>
<circle cx="166" cy="42" r="11" fill="${C.v}" opacity=".18"/><circle cx="166" cy="42" r="5.4" fill="${C.v}" stroke="#141414" stroke-width="2"/>` : `<path d="M30 86C40 70 58 74 74 62S104 36 126 40S166 30 176 48S168 84 146 90S96 98 70 98S38 98 30 86Z" fill="none" stroke="${C.v}" stroke-width="3.4" stroke-linejoin="round"/>
<circle cx="30" cy="86" r="5" fill="#fff" stroke="#141414" stroke-width="2"/>`}</svg>`,
    // 单条曲线图（心率、配速、功率）：chart([112,128,…], { w: 201, h: 104 })；最高点带荧光光晕，下方淡淡的荧光面，面铺到底板左右边缘；和 106 的进度环并排时宽 201、环 left:245px
    chart: (vals, { w = 201, h = 104, min = null, max = null, peak = true, area = true, color = C.v } = {}) => {
      const lo = min ?? Math.min(...vals) - 8, hi = max ?? Math.max(...vals) + 8;
      const px = 10, py = 14;
      const X = (i) => px + (w - 2 * px) * i / (vals.length - 1);
      const Y = (v) => h - py - (h - 2 * py) * (v - lo) / (hi - lo);
      const pts = vals.map((v, i) => [X(i), Y(v)]);
      const d = smooth(pts);
      const gid = 's11ga' + (++uid);
      const pk = vals.indexOf(Math.max(...vals));
      const grid = [0.25, 0.5, 0.75].map((k) => `M0 ${(h * k).toFixed(1)}H${w}`).join('');
      return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".26"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="#141414"/><path d="${grid}" stroke="#232323" stroke-width="1.2"/>
${area ? `<path d="M0 ${h} L0 ${pts[0][1].toFixed(1)} ${d.replace('M', 'L')} L${w} ${pts[pts.length - 1][1].toFixed(1)} L${w} ${h} Z" fill="url(#${gid})"/>` : ''}
<path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="${X(0).toFixed(1)}" cy="${Y(vals[0]).toFixed(1)}" r="4" fill="#fff" stroke="#141414" stroke-width="2"/>
${peak ? `<circle cx="${X(pk).toFixed(1)}" cy="${Y(vals[pk]).toFixed(1)}" r="11" fill="${color}" opacity=".18"/><circle cx="${X(pk).toFixed(1)}" cy="${Y(vals[pk]).toFixed(1)}" r="5" fill="${color}" stroke="#141414" stroke-width="2"/>` : ''}</svg>`;
    },
    // 日期条：days([['周五','6'],['周六','7'],…], 0)；当前是白底
    days: (items, cur = 0, go = []) => `<div class="v-days">${items.map(([w, d], i) => `<div class="v-day ${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}><span>${w}</span><b class="v-num">${d}</b></div>`).join('')}</div>`,
    // 课表 / 场次行，放在 .v-list 里：slot('19:30', '杠铃燃脂', '陈野 · 2 号操房 · 45 分钟', '剩 4 位')；
    // on: true 是「我已约」——时间变荧光、状态换成 ✓ + onText；attrs 原样放进行（比如 'data-go="detail"'）
    slot: (time, title, meta, status = '', { on = false, onText = '已约', attrs = '' } = {}) => `<div class="v-row v-slot" ${attrs}><b class="v-num tm ${on ? 'v-v' : ''}">${time}</b><div class="m"><div class="v-h3">${title}</div>${meta ? `<div class="v-mut">${meta}</div>` : ''}</div>${on ? `<span class="v-st on">${icon('check', 16, 2.8)}${onText}</span>` : (status ? `<span class="v-st">${status}</span>` : '')}</div>`,
    // 排行：rank([['1','江','江屿','132.6','公里'], …, ['6','我','我','86.4','公里',1]])；最后一个 1 表示「我」，整行荧光
    rank: (rows) => `<div class="v-rank v-list">${rows.map(([rk, ch, name, val, unit = '', me]) => `<div class="v-row ${me ? 'me' : ''}"><span class="rk v-num">${rk}</span><span class="v-av">${ch}</span><b>${name}</b><span class="km v-num">${val}${unit ? `<small>${unit}</small>` : ''}</span></div>`).join('')}</div>`,
    // 圆形控制钮：ctl('pause', { go: true }) 是 96px 荧光大钮，其余 60px 深灰；一行三个包在 <div class="v-ctls"> 里
    ctl: (name, { go = false, attrs = '' } = {}) => `<span class="v-cb ${go ? 'go' : ''}" ${attrs}>${icon(name, go ? 36 : 20, go ? 2.6 : 2.4)}</span>`,
    // 网页底部数据组：wstats([['3,286','跑团成员'], …])
    wstats: (items) => `<div class="v-wst">${items.map(([n, l]) => `<div><b class="v-num">${n}</b><span>${l}</span></div>`).join('')}</div>`,
    // 展示板装饰：字标的三道风线放大横穿舞台（夜黑斜条）：boardDeco: (g) => ui.gust(g.w, g.h - 190, { h: 34, gap: 22, starts: [60, -10, 130] })；参数是宽、顶边 y
    gust: (w, y, { h = 34, gap = 22, starts = [70, 0, 110], op = 1, color = BG } = {}) => `<svg style="position:absolute;left:0;top:${y}px;opacity:${op}" width="${w}" height="${h * 3 + gap * 2}" viewBox="0 0 ${w} ${h * 3 + gap * 2}">${starts.map((x, i) => `<path d="M${x + h * .3} ${i * (h + gap)}H${w + 60}L${w + 60 - h * .3} ${i * (h + gap) + h}H${x}Z" fill="${color}"/>`).join('')}</svg>`,
  };
  return { key: 's11-sport', no: 11, name: '运动能量', root: 's11', T, css, ui, stage: V, dark: true };
};
