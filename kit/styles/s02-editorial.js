// 02 杂志编辑 Editorial —— 起手包
// 色值、字体、字号、线宽、滤镜都照图册模块 catalog/pages/s02-editorial.js（此间）原样取
// 图册里的小标签用苹方，这里换成开源的 Noto Sans SC（安卓上也一样），字号字距照旧
// 用法：const S = style('s02-editorial'); 屏幕根元素 <div class="scr s02 …">；组件见 S.ui
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#EFEAE0',          // 纸色
    surface: '#EFEAE0',     // 这个风格没有卡片底，标签栏也是纸色，靠细线分开
    ink: '#171513',         // 墨黑：标题、粗栏线
    ink2: '#6E685F',        // 铅灰：栏目名、署名、时间
    line: '#CFC6B6',        // 栏线：条目之间的浅细线
    primary: '#7E2125',     // 墨红：首字下沉、栏目名、主按钮，每屏一两处
    onPrimary: '#F6F1E8',
    accents: { text: '#2A2623', newsprint: '#E3DACB', watermark: '#D8CCB8' },  // 正文字色、旧新闻纸（展示板）、水印大数字
    fonts: { title: '"Noto Serif SC"', body: '"Noto Serif SC"', num: '"Playfair Display"', label: '"Noto Sans SC"' },
    radius: 0,
    border: '1px solid #171513',   // 报头下是 2px+1px 双线，引文上是 3px
    shadow: null,
    margin: 24,
    photo: 'grayscale(1) contrast(1.3) brightness(.9)',   // 再叠 mix-blend-mode:multiply，白处透出纸色
  };
  const SANS = '"Noto Sans SC",sans-serif';
  const SERIF = '"Noto Serif SC",serif';
  const PF = '"Playfair Display","Noto Serif SC",serif';
  // #xxxxxx 换算成半透明 rgba；已经是别的写法就原样用
  const alpha = (c, a = .82) => { const m = /^#([0-9a-f]{6})$/i.exec(c); if (!m) return c; const n = parseInt(m[1], 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const css = `
.s02{--pp:${T.bg};--ik:${T.ink};--rd:${T.primary};--gy:${T.ink2};--ln:${T.line};--tx:${T.accents.text};background:var(--pp);color:var(--ik);font-family:${SERIF};font-size:15px;line-height:1.6}
.s02 .v-pad{padding-left:24px;padding-right:24px}
/* 字号层级：大标题 57 宋体特粗，区块 32，条目 18，正文 15–16 宋体，标签 12 黑体加字距 */
.s02 .v-h1{font:900 57px/1.1 ${SERIF};letter-spacing:-.01em;margin:12px 24px 0 21px;color:var(--ik)}
.s02 .v-h2{font:900 32px/1.25 ${SERIF};letter-spacing:.01em;color:var(--ik)}
.s02 .v-h3{font:700 18px/1.35 ${SERIF};color:var(--ik)}
.s02 .v-tx{font:400 16px/30px ${SERIF};color:#25211E;text-align:justify}
.s02 .v-mut{font:500 12px/16px ${SANS};letter-spacing:.14em;color:var(--gy)}
.s02 .v-num{font-family:${PF};font-variant-numeric:lining-nums;letter-spacing:0}
.s02 .v-num i{font-style:normal;font-size:.72em;margin-right:2px}
.s02 .v-big{font:900 150px/.8 ${PF};font-variant-numeric:lining-nums;letter-spacing:-.04em;margin-left:-6px;color:var(--ik)}
.s02 .v-price{font:400 42px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);white-space:nowrap}
.s02 .v-price i{font-style:normal;font-size:.52em;margin-right:2px}
.s02 .v-price small{font:500 13px/1 ${SANS};letter-spacing:.08em;color:var(--gy);margin-left:4px}
/* 按钮：墨红实底直角，宋体特粗加大字距；ghost 是 1px 墨线框 */
.s02 .v-btn{height:56px;padding:0 28px 0 calc(28px + .3em);display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--rd);color:${T.onPrimary};font:900 20px/1 ${SERIF};letter-spacing:.3em;white-space:nowrap}
.s02 .v-btn .ic{margin-left:-.3em}
.s02 .v-btn.wide{display:flex;width:100%}
.s02 .v-btn.ghost{background:transparent;color:var(--ik);box-shadow:inset 0 0 0 1px var(--ik)}
.s02 .v-btn.ink{background:var(--ik);color:${T.onPrimary}}
/* 「卡片」= 一篇稿子：上面一道墨线，下面照片、栏目名、标题，没有底色、圆角、阴影 */
.s02 .v-card{position:relative;border-top:1px solid var(--ik);padding-top:14px}
.s02 .v-card>.ph{height:200px}
.s02 .v-card .bd{padding-top:14px}
.s02 .v-card .v-h2{margin-top:8px}
/* 自带左右 24px 的件放进 .v-pad 或卡片里时去掉自己的边距；大标题保留 -3px 对齐墨迹 */
.s02 :is(.v-pad,.v-card) :is(.v-kick,.v-r1,.v-r2,.v-rh,.v-date,.v-cols,.v-strip,.v-mg,.v-list,.v-pq,.v-issue){margin-left:0;margin-right:0}
.s02 :is(.v-pad,.v-card) .v-h1{margin-left:-3px;margin-right:0}
.s02 .v-card .v-kick{margin-top:0}
/* 列表：顶上一道墨线，行之间浅栏线 */
.s02 .v-list{margin:0 24px;border-top:1px solid var(--ik)}
.s02 .v-row{display:flex;align-items:baseline;gap:16px;min-height:52px;padding:15px 0 14px;border-bottom:1px solid var(--ln)}
.s02 .v-row>em{flex:none;width:44px;font:500 12px/16px ${SANS};font-style:normal;letter-spacing:.14em;color:var(--gy)}
.s02 .v-row>b{font:700 17px/1.35 ${SERIF};color:var(--ik)}
/* 筛选：像杂志栏目导航，文字加下划线，不用胶囊 */
.s02 .v-chips{display:flex;gap:24px;border-bottom:1px solid var(--ln)}
.s02 .v-chip{padding:0 0 10px;margin-bottom:-1px;border-bottom:2px solid transparent;font:500 15px/1 ${SERIF};letter-spacing:.06em;color:var(--gy);white-space:nowrap}
.s02 .v-chip.on{color:var(--ik);font-weight:900;border-bottom-color:var(--ik)}
.s02 .v-inp{height:48px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--ik);font:400 16px/1 ${SERIF};color:var(--gy)}
/* 照片：黑白、高对比、正片叠底进纸色；铺满到边，一屏一张 */
.s02 .ph{background-size:cover;background-position:center;filter:${T.photo};mix-blend-mode:multiply}
.s02 .v-photo{position:relative;width:100%}
.s02 :is(.v-date,.v-rh)+.v-photo{margin-top:12px}
/* 报头：字标 + 期号，下面 2px+1px 双线 */
.s02 .v-logo{display:inline-flex;align-items:baseline;font-size:24px;white-space:nowrap}
.s02 .v-logo b{font:900 1em/1 ${SERIF};letter-spacing:.04em;color:var(--ik)}
.s02 .v-logo i{width:calc(.17em + 3px);height:calc(.17em + 3px);border-radius:50%;background:var(--rd);margin-left:2px;flex:none}
.s02 .v-logo em{margin-left:.5em;font:italic 400 .75em/1 ${PF};color:var(--ik)}
.s02 .v-mast{position:relative;z-index:6;min-height:46px;margin:2px 24px 0;display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:10px}
.s02 .v-mast.mini{min-height:0;height:44px;margin-top:-44px;align-items:center;padding-bottom:0}
.s02 .v-iss{font:600 12.5px/1 ${SERIF};letter-spacing:.06em;color:var(--ik)}
.s02 .v-en{font:italic 400 18px/1 ${PF};color:var(--ik);padding-bottom:4px}
.s02 .v-r2{margin:0 24px;height:5px;border-top:2px solid var(--ik);border-bottom:1px solid var(--ik)}
.s02 .v-r1{margin:0 24px;height:0;border-top:1px solid var(--ik)}
.s02 .v-date{margin:9px 24px 0;display:flex;justify-content:space-between;font:600 12.5px/16px ${SERIF};letter-spacing:.06em;color:var(--ik)}
/* 栏目名 + 署名：墨红栏目名在左，铅灰署名在右 */
.s02 .v-kick{margin:14px 24px 0;display:flex;justify-content:space-between;align-items:baseline;gap:12px;font:500 12px/16px ${SANS};letter-spacing:.14em;color:var(--gy);white-space:nowrap}
.s02 .v-kick b{color:var(--rd);font-weight:600}
.s02 .v-r2+.v-kick{margin-top:18px}
/* 分栏正文：两栏，中间 1px 墨色栏线；首字下沉用墨红，字高加上边距刚好等于两行，第三行不缩进 */
.s02 .v-cols{margin:18px 24px 0;column-count:2;column-gap:27px;column-rule:1px solid var(--ik);font:400 15px/26px ${SERIF};color:var(--tx);text-align:justify}
.s02 .v-dc{float:left;font:900 52px/50px ${SERIF};color:var(--rd);margin:2px 6px 0 0}
.s02 .v-tx .v-dc{font-size:62px;line-height:58px;margin:2px 8px 0 0}
/* 引文：上 3px 下 1px 墨线，墨红 Playfair 引号 */
.s02 .v-pq{margin:28px 24px 0;padding:16px 0;border-top:3px solid var(--ik);border-bottom:1px solid var(--ik)}
.s02 .v-pq q{display:block;quotes:none;font:900 25px/37px ${SERIF};letter-spacing:.01em;color:var(--ik)}
.s02 .v-pq .qm{display:block;font:700 54px/34px ${PF};color:var(--rd);height:24px}
.s02 .v-pq cite{display:block;margin-top:10px;font:500 12px/16px ${SANS};font-style:normal;letter-spacing:.12em;color:var(--gy)}
/* 边注：左边斜体时间（或页码），浅栏线隔开 */
.s02 .v-mg{margin:16px 24px 0;display:grid;grid-template-columns:54px 1fr;column-gap:14px}
.s02 .v-mg+.v-mg{margin-top:4px}
.s02 .v-mg .tm{border-right:1px solid var(--ln);font:italic 400 17px/30px ${PF};font-variant-numeric:lining-nums;color:var(--ik)}
.s02 .v-mg p{font:400 16px/30px ${SERIF};color:#25211E;text-align:justify}
/* 书眉（顶栏下）和页脚：栏目名 + 页码 */
.s02 .v-rh{margin:6px 24px 0;padding:10px 0;border-top:1px solid var(--ik);border-bottom:1px solid var(--ln);display:flex;justify-content:space-between;font:500 12px/16px ${SANS};letter-spacing:.14em;color:var(--gy)}
.s02 .mn+.v-rh{margin-top:0}
.s02 :is(.v-rh,.v-date,.v-kick) .fn{font:700 14px/16px ${PF};font-style:normal;font-variant-numeric:lining-nums;color:var(--ik);letter-spacing:0}
.s02 .v-kick .fn{margin-left:14px}
.s02 .v-folio{position:absolute;left:24px;right:24px;bottom:30px;border-top:1px solid var(--ik);padding-top:10px;display:flex;justify-content:space-between;align-items:baseline;font:500 12px/1 ${SANS};letter-spacing:.12em;color:var(--gy)}
.s02 .v-folio .fn{font:700 16px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);letter-spacing:0}
/* 期号大数字 + 本期名 */
.s02 .v-issue{margin:18px 24px;display:flex;align-items:flex-end;justify-content:space-between}
.s02 .v-issue .meta{text-align:right;padding-bottom:2px}
.s02 .v-issue .meta b{display:block;font:900 36px/1 ${SERIF};letter-spacing:.06em;color:var(--ik)}
.s02 .v-issue .meta span{display:block;margin-top:10px;font:500 12px/1 ${SANS};letter-spacing:.12em;color:var(--gy)}
/* 目录：Playfair 页码 + 小栏目名 + 宋体标题，浅栏线分隔；当前条目栏目名变墨红 */
.s02 .v-toc{list-style:none;margin:0;padding:0}
.s02 .v-toc li{display:grid;grid-template-columns:60px 1fr;align-items:start;padding:14px 0 13px;border-bottom:1px solid var(--ln)}
.s02 .v-toc .pn{font:700 30px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);margin-top:-2px}
.s02 .v-toc em{display:block;font:500 12px/1 ${SANS};font-style:normal;letter-spacing:.16em;color:var(--gy)}
.s02 .v-toc b{display:block;margin-top:8px;font:700 18px/1.3 ${SERIF};color:var(--ik)}
.s02 .v-toc li.cur em{color:var(--rd)}
/* 信息条：上下两道墨线夹一行黑体小字 */
.s02 .v-strip{margin:18px 24px 0;padding:12px 0;border-top:1px solid var(--ik);border-bottom:1px solid var(--ik);font:500 14px/18px ${SANS};letter-spacing:.04em;color:#3A3530}
/* 底部操作：贴在屏幕底部，按钮 | 竖墨线 | 小标签 + 大数字 */
.s02 .v-act{position:absolute;left:24px;right:24px;bottom:44px;display:grid;grid-template-columns:1fr 1px 108px;column-gap:20px;align-items:center}
.s02 .v-act .vr{height:56px;background:var(--ik)}
.s02 .v-stat em{display:block;font:500 12px/1 ${SANS};font-style:normal;letter-spacing:.14em;color:var(--gy);white-space:nowrap}
.s02 .v-stat b{display:block;margin-top:9px;font:700 30px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);white-space:nowrap}
.s02 .v-stat b i{font-style:normal;font-size:.6em;margin-right:2px}
/* 顶栏、标签栏：只有字，没有图标；当前项宋体特粗 */
.s02 .v-nav{position:relative;height:46px;margin:2px 24px 0;display:flex;align-items:center;justify-content:space-between}
.s02 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:900 20px/1 ${SERIF};letter-spacing:.04em;white-space:nowrap}
.s02 .v-ibs{display:flex;gap:18px;align-items:center}
.s02 .v-back{display:inline-flex;align-items:center;height:44px;padding:0 6px 0 12px;color:var(--ik)}
.s02 .v-tabs{position:absolute;left:24px;right:24px;bottom:0;height:84px;border-top:1px solid var(--ik);display:flex;justify-content:space-between;padding:15px 8px 0;font:500 14px/1 ${SERIF};color:var(--gy);z-index:6;background:var(--pp)}
.s02 .v-tabs>div.on{font-weight:900;color:var(--ik)}
/* 网页：报纸式报头 + 多栏 */
.s02.web{background:var(--pp);font-family:${SERIF}}
.s02 .v-wtop{height:46px;margin:0 48px;display:flex;align-items:center;justify-content:space-between;font:500 15px/1 ${SANS};letter-spacing:.06em;color:var(--gy)}
.s02 .v-wtop b{font-weight:600;color:var(--ik)}
.s02 .v-wmast{height:112px;margin:0 48px;border-top:1px solid var(--ik);display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.s02 .v-wmast .v-logo{font-size:84px}
.s02 .v-wmast .v-logo b{letter-spacing:.06em}
.s02 .v-wmast .ear{font:500 15px/1.6 ${SANS};letter-spacing:.1em;color:var(--ik)}
.s02 .v-wmast .ear.rt{text-align:right}
.s02 .v-wnav{margin:0 48px;height:50px;border-top:3px solid var(--ik);border-bottom:1px solid var(--ik);display:flex;align-items:center;justify-content:center;gap:44px;font:600 16px/1 ${SERIF};letter-spacing:.12em;color:var(--ik)}
.s02 .v-wnav .on{color:var(--rd)}
/* 三栏容器：照片 560 | 正文 | 侧栏 236，从导航下贴到页底，照片写 h:'100%' */
.s02 .v-wgrid{position:absolute;left:48px;right:48px;top:232px;bottom:0;display:grid;grid-template-columns:560px 1fr 236px}
.s02 .v-wlead{padding:0 32px 0 36px;border-right:1px solid var(--ik)}
.s02 .v-wlead>em{display:block;font:600 16px/1 ${SANS};font-style:normal;letter-spacing:.18em;color:var(--rd)}
.s02 .v-wlead h2{margin-top:18px;font:900 52px/1.16 ${SERIF};letter-spacing:-.005em;color:var(--ik)}
.s02 .v-wlead .by{margin-top:22px;display:flex;align-items:baseline;gap:18px;font:500 15px/1 ${SANS};letter-spacing:.12em;color:var(--gy)}
.s02 .v-wlead .by .pn{margin-left:auto;font:italic 400 20px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);letter-spacing:0}
.s02 .v-wlead .ex{margin-top:26px;padding-top:24px;border-top:1px solid var(--ln);font:400 17px/32px ${SERIF};color:var(--tx);text-align:justify}
.s02 .v-wlead .ex .v-dc{font-size:58px;line-height:56px;margin:5px 8px 0 0}
/* 正文栏下面一篇短稿：只放字，不加第二张图 */
.s02 .v-wnote{margin-top:20px;padding-top:16px;border-top:1px solid var(--ik)}
.s02 .v-wnote em{display:block;font:500 12px/16px ${SANS};font-style:normal;letter-spacing:.14em;color:var(--gy)}
.s02 .v-wnote b{display:block;margin-top:8px;font:700 19px/1.35 ${SERIF};color:var(--ik)}
.s02 .v-wnote p{margin-top:6px;font:400 15px/26px ${SERIF};color:var(--tx);text-align:justify}
.s02 .v-wside{padding-left:28px}
.s02 .v-wside .hd{font:600 16px/1 ${SANS};letter-spacing:.18em;color:var(--ik);padding-bottom:14px;border-bottom:3px solid var(--ik)}
.s02 .v-wside ol{margin:0;padding:0;list-style:none}
.s02 .v-wside li{padding:16px 0 15px;border-bottom:1px solid var(--ln)}
.s02 .v-wside li span{display:block;font:italic 400 18px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik)}
.s02 .v-wside li b{display:block;margin-top:9px;font:700 19px/1.35 ${SERIF};color:var(--ik)}
`;
  const ui = {
    // 字标：宋体特粗的品牌名 + 墨红圆点，可带 Playfair 斜体英文；size 是字号（报头 24，大报头 40，网页 84）
    logo: (name, en = '', { size } = {}) => `<div class="v-logo"${size ? ` style="font-size:${size}px"` : ''}><b>${name}</b><i></i>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左返回、中间标题（可传 ui.logo）、右边图标组（ui.icons）；下面一般接 ui.runhead 或 v-r1
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<span data-back>${icon('chevron-left', 24, 1.6)}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 右上角图标组：icons(['a-large-small','bookmark'])
    icons: (names, attrs = []) => `<div class="v-ibs">${names.map((n, i) => `<span ${attrs[i] || ''}>${icon(n, 20, 1.6)}</span>`).join('')}</div>`,
    // 返回键 back()：小程序二级页用，放进 miniNav 的 left
    back: () => `<span class="v-back" data-back>${icon('chevron-left', 24, 1.6)}</span>`,
    // 底部标签栏：只有字（items 里的图标名不画，杂志不用图标），当前项宋体特粗；上面一道墨线
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</div>`).join('')}</div>`,
    // 主按钮：墨红直角；cls 'wide' 通栏、'ghost' 墨线框、'ink' 墨黑；默认不带图标
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${text}${ic ? icon(ic, 18, 1.8) : ''}</div>`,
    // 报头 masthead(name, right, { mini, en, size })：字标在左、期号（或英文名 en，Playfair 斜体）在右，下面双线；size 是字标字号（默认 24，店名做主角用 40）
    // mini: true 时字标放进小程序胶囊那一行（右边留给胶囊，right 和 en 都不画）
    masthead: (name, right = '', { mini = false, en = '', size } = {}) => {
      const r = mini ? '' : right ? (right.startsWith('<') ? right : `<div class="v-iss">${right}</div>`) : en ? `<span class="v-en">${en}</span>` : '';
      return `<div class="v-mast${mini ? ' mini' : ''}"${size > 30 && !mini ? ` style="min-height:${size + 34}px;padding-bottom:12px"` : ''}>${ui.logo(name, '', { size })}${r}</div><div class="v-r2"></div>`;
    },
    // 报头下的日期行 dateline(left, right, folio)：dateline('第 45 期 · 2026 年 11 月', '', 'p. 01')，folio 是 Playfair 页码，放最右
    dateline: (left, right = '', folio = '') => `<div class="v-date"><span>${left}</span>${right ? `<span>${right}</span>` : ''}${folio ? `<span class="fn">${folio}</span>` : ''}</div>`,
    // 铺满到边的黑白大图：photo(img('x'), { h: 286, pos: '52% 100%', size: 'auto 152%', f: '更狠的滤镜' })；h 可写 '100%'
    photo: (src, { h = 280, pos = '50% 50%', size = '', f = '', attrs = '', style = '' } = {}) => `<div class="ph v-photo" ${attrs} style="height:${typeof h === 'number' ? h + 'px' : h};background-image:url(${src});background-position:${pos};${size ? `background-size:${size};` : ''}${f ? `filter:${f};` : ''}${style}"></div>`,
    // 栏目名（墨红）+ 署名（铅灰）kick(left, right, folio)：kick('封面故事', '文 周远　摄影 林一')；folio 是跟在署名后面的 Playfair 页码
    kick: (left, right = '', folio = '') => `<div class="v-kick"><b>${left}</b>${right || folio ? `<span>${right}${folio ? `<i class="fn">${folio}</i>` : ''}</span>` : ''}</div>`,
    // 开篇正文 lede(text, { cols, attrs })：第一个字墨红下沉；cols 2 是两栏带栏线，1 是单栏大字
    lede: (text, { cols = 2, attrs = '' } = {}) => `<div class="${cols === 2 ? 'v-cols' : 'v-tx'}" ${attrs}><span class="v-dc">${text[0]}</span>${text.slice(1)}</div>`,
    // 引文：pull('十一点以后，<br>这座城市才开始说真话。', '王建国　夜班出租车司机')
    pull: (quote, cite = '') => `<div class="v-pq"><span class="qm">“</span><q>${quote}</q>${cite ? `<cite>${cite}</cite>` : ''}</div>`,
    // 边注 margin(tm, text)：左边斜体时间或页码，右边一段字
    margin: (tm, text) => `<div class="v-mg"><div class="tm">${tm}</div><p>${text}</p></div>`,
    // 书眉：runhead('封面故事 · 末班车之后', 26)
    runhead: (left, folio = '') => `<div class="v-rh"><span>${left}</span><span class="fn">${folio}</span></div>`,
    // 页脚 folio(n, label)：页码 + 栏目名，贴在屏幕底部
    folio: (n, label = '') => `<div class="v-folio"><span class="fn">${n}</span><span>${label}</span></div>`,
    // 期号大数字 + 本期名：issue('42', '夜行', '2026 年 11 月')
    issue: (num, title, sub = '') => `<div class="v-issue"><div class="v-big">${num}</div><div class="meta"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div></div>`,
    // 目录：toc([['06','城市笔记','在北京，找一级台阶坐下', 'data-go="x"'], …], 当前序号)
    toc: (items, cur = -1) => `<ol class="v-toc">${items.map(([pn, em, b, at = ''], i) => `<li class="${i === cur ? 'cur' : ''}" ${at}><span class="pn">${pn}</span><div><em>${em}</em><b>${b}</b></div></li>`).join('')}</ol>`,
    // 信息条 strip(text)：上下墨线夹一行
    strip: (text) => `<div class="v-strip">${text}</div>`,
    // 小标签 + Playfair 大数字（积分、余量）
    stat: (label, value) => `<div class="v-stat"><em>${label}</em><b>${value}</b></div>`,
    // 底部操作行：act(ui.btn('去点单', …), ui.stat('会员积分', '1,280'))
    act: (btn, stat) => `<div class="v-act">${btn}<i class="vr"></i>${stat}</div>`,
    // 价格：price(28) → 小 ¥ + Playfair 数字；unit 如 '/本'
    price: (n, unit = '') => `<span class="v-price"><i>¥</i>${n}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // 网页顶条 wtop(left, right)：日期 | 登录订阅
    wtop: (left, right) => `<div class="v-wtop"><span>${left}</span><span>${right}</span></div>`,
    // 网页报纸报头 wmast(name, earL, earR, en)：左耳、居中 84px 字标、右耳，en 是字标后的英文
    wmast: (name, earL = '', earR = '', en = '') => `<div class="v-wmast"><div class="ear">${earL}</div>${ui.logo(name, en)}<div class="ear rt">${earR}</div></div>`,
    // 网页栏目导航 wnav(items, cur)：上 3px 下 1px 墨线，cur 是当前项序号
    wnav: (items, cur = -1) => `<div class="v-wnav">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}">${t}</span>`).join('')}</div>`,
    // 网页短稿 wnote(label, title, text)：放在 .v-wlead 里导语下面，只有字
    wnote: (label, title, text) => `<div class="v-wnote"><em>${label}</em><b>${title}</b><p>${text}</p></div>`,
    // 展示板装饰 boardDeco(num, { size, color, line })（demo.boardDeco 用）：底下一个放大的期号水印 + 上下强调色双线
    //   line 默认墨红；项目 CSS 换了 --rd 就传同一个色（#xxxxxx 自动加 .82 透明度）。展示板在 .s02 外面，读不到 --rd
    boardDeco: (num = '42', { size = 820, color = T.accents.watermark, line = T.primary } = {}) => {
      const c = alpha(line);
      const dbl = (pos, v) => `<div style="position:absolute;left:36px;right:36px;${pos}:${v}px;height:6px;border-top:2px solid ${c};border-bottom:1px solid ${c}"></div>`;
      return `<div style="position:absolute;left:-120px;bottom:-96px;font:900 ${size}px/.74 'Playfair Display';font-variant-numeric:lining-nums;letter-spacing:-.05em;color:${color};white-space:nowrap">${num}</div>${dbl('top', 26)}${dbl('bottom', 36)}`;
    },
  };
  return { key: 's02-editorial', no: 2, name: '杂志编辑', root: 's02', T, css, ui, stage: T.accents.newsprint, dark: false };
};
