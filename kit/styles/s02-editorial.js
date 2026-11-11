// 02 杂志编辑 Editorial，起手包
// 色值、字体、字号、线宽、滤镜都照图册模块 catalog/pages/s02-editorial.js 原样取
// 图册里压在大标题上的栏目名和署名、报头右边的期号、书眉、页脚页码、字距拉开的黑体小标签，这一版都去掉了（审美守则第二节）。
// 杂志感改由这几样撑着：报头双线、报头下的栏目导航（当前栏目墨红）、黑白出血大图、57px 宋体特粗大标题、两栏栏线配墨红首字下沉、上 3 下 1 墨线的引文、Playfair 大数字
// 用法：const S = style('s02-editorial'); 屏幕根元素 <div class="scr s02 …">；组件见 S.ui
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#EFEAE0',          // 纸色
    surface: '#EFEAE0',     // 这个风格没有卡片底，标签栏也是纸色，靠细线分开
    ink: '#171513',         // 墨黑：标题、粗栏线、报头双线
    ink2: '#6E685F',        // 铅灰：没选中的栏目、字段名、单位、引文出处
    line: '#CFC6B6',        // 栏线：条目之间的浅细线
    primary: '#7E2125',     // 墨红：当前栏目、首字下沉、主按钮、引号，每屏一两处
    onPrimary: '#F6F1E8',
    accents: { text: '#2A2623', newsprint: '#E3DACB', watermark: '#D8CCB8' },  // 正文字色、旧新闻纸（展示板）、展示板水印大字
    fonts: { title: '"Noto Serif SC"', body: '"Noto Serif SC"', num: '"Playfair Display"', info: '"Noto Sans SC"' },
    radius: 0,
    border: '1px solid #171513',   // 报头下是 2px+1px 双线，引文上是 3px
    shadow: null,
    margin: 24,
    photo: 'grayscale(1) contrast(1.3) brightness(.9)',   // 再叠 mix-blend-mode:multiply，白处透出纸色
  };
  const SANS = '"Noto Sans SC",sans-serif';
  const SERIF = '"Noto Serif SC",serif';
  const PF = '"Playfair Display","Noto Serif SC",serif';
  const CJK = /[㐀-鿿]/;
  // #xxxxxx 换算成半透明 rgba；已经是别的写法就原样用
  const alpha = (c, a = .82) => { const m = /^#([0-9a-f]{6})$/i.exec(c); if (!m) return c; const n = parseInt(m[1], 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const css = `
.s02{--pp:${T.bg};--ik:${T.ink};--rd:${T.primary};--gy:${T.ink2};--ln:${T.line};--tx:${T.accents.text};background:var(--pp);color:var(--ik);font-family:${SERIF};font-size:15px;line-height:1.6}
.s02 .v-pad{padding-left:24px;padding-right:24px}
/* 字号层级：大标题 57 宋体特粗，区块 32，条目 18，正文 15–16 宋体，信息 15 黑体；全套最小 14px，字距都在 0–0.04em */
.s02 .v-h1{font:900 57px/1.1 ${SERIF};letter-spacing:-.01em;margin:20px 24px 0 21px;color:var(--ik)}
.s02 .v-h2{font:900 32px/1.25 ${SERIF};letter-spacing:0;color:var(--ik)}
.s02 .v-h3{font:700 18px/1.35 ${SERIF};color:var(--ik)}
.s02 .v-tx{font:400 16px/30px ${SERIF};color:#25211E;text-align:justify}
.s02 .v-mut{font:400 15px/22px ${SANS};letter-spacing:0;color:var(--gy)}
.s02 .v-num{font-family:${PF};font-variant-numeric:lining-nums tabular-nums;letter-spacing:0}
.s02 .v-num i{font-style:normal;font-size:.72em;margin-right:2px}
.s02 .v-big{font:900 150px/.8 ${PF};font-variant-numeric:lining-nums;letter-spacing:-.04em;margin-left:-6px;color:var(--ik)}
.s02 .v-price{font:400 42px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);white-space:nowrap}
.s02 .v-price i{font-style:normal;font-size:.52em;margin-right:2px}
.s02 .v-price small{font:400 15px/1 ${SANS};letter-spacing:0;color:var(--gy);margin-left:6px}
/* 按钮：墨红实底直角，宋体特粗 20px；ghost 是 1px 墨线框；sm 是网页报头里的小号 */
.s02 .v-btn{height:56px;padding:0 28px;display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--rd);color:${T.onPrimary};font:900 20px/1 ${SERIF};letter-spacing:.04em;white-space:nowrap}
.s02 .v-btn.wide{display:flex;width:100%}
.s02 .v-btn.ghost{background:transparent;color:var(--ik);box-shadow:inset 0 0 0 1px var(--ik)}
.s02 .v-btn.ink{background:var(--ik);color:${T.onPrimary}}
.s02 .v-btn.sm{height:42px;padding:0 20px;font-size:17px}
/* 「卡片」= 一篇稿子：上面一道墨线，下面照片、标题、正文，没有底色、圆角、阴影 */
.s02 .v-card{position:relative;border-top:1px solid var(--ik);padding-top:16px}
.s02 .v-card>.ph{height:200px}
.s02 .v-card .bd{padding-top:16px}
.s02 .v-card .v-h2+.v-tx{margin-top:8px}
/* 自带左右 24px 的件放进 .v-pad 或卡片里时去掉自己的边距；大标题保留 -3px 对齐墨迹 */
.s02 :is(.v-pad,.v-card) :is(.v-r1,.v-r2,.v-sec,.v-cols,.v-strip,.v-mg,.v-list,.v-pq,.v-bignum){margin-left:0;margin-right:0}
.s02 :is(.v-pad,.v-card) .v-h1{margin-left:-3px;margin-right:0}
/* 列表：顶上一道墨线，行之间浅栏线；字段名和内容一样大，字段名用铅灰 */
.s02 .v-list{margin:0 24px;border-top:1px solid var(--ik)}
.s02 .v-row{display:flex;align-items:baseline;gap:16px;min-height:54px;padding:14px 0 13px;border-bottom:1px solid var(--ln);font:400 16px/26px ${SERIF}}
.s02 .v-row>em{flex:none;width:48px;font:400 16px/26px ${SERIF};font-style:normal;color:var(--gy)}
.s02 .v-row>b{font:700 16px/26px ${SERIF};color:var(--ik)}
.s02 .v-row>span{margin-left:auto;color:var(--ik)}
/* 筛选：像杂志栏目导航，文字加下划线，不用胶囊 */
.s02 .v-chips{display:flex;gap:24px;border-bottom:1px solid var(--ln)}
.s02 .v-chip{padding:0 0 10px;margin-bottom:-1px;border-bottom:2px solid transparent;font:500 16px/1 ${SERIF};letter-spacing:.02em;color:var(--gy);white-space:nowrap}
.s02 .v-chip.on{color:var(--ik);font-weight:900;border-bottom-color:var(--ik)}
.s02 .v-inp{height:48px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--ik);font:400 16px/1 ${SERIF};color:var(--gy)}
/* 照片：黑白、高对比、正片叠底进纸色；铺满到边，一屏一张 */
.s02 .ph{background-size:cover;background-position:center;filter:${T.photo};mix-blend-mode:multiply}
.s02 .v-photo{position:relative;width:100%}
.s02 .v-r2+.v-photo{margin-top:12px}
/* 报头：宋体特粗字标，下面 2px+1px 墨黑双线；品牌本来就有的英文名跟在字标里，右边只放一组图标 */
.s02 .v-logo{display:inline-flex;align-items:baseline;font-size:24px;white-space:nowrap}
.s02 .v-logo b{font:900 1em/1 ${SERIF};letter-spacing:.04em;color:var(--ik)}
.s02 .v-logo em{margin-left:.45em;font:italic 400 max(14px,.75em)/1 ${PF};letter-spacing:0;color:var(--ik)}
.s02 .v-mast{position:relative;z-index:6;min-height:50px;margin:2px 24px 0;display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:10px}
.s02 .v-mast.mini{min-height:0;height:44px;margin-top:-44px;align-items:center;padding-bottom:0}
.s02 .v-r2{margin:0 24px;height:5px;border-top:2px solid var(--ik);border-bottom:1px solid var(--ik)}
.s02 .v-r1{margin:0 24px;height:0;border-top:1px solid var(--ik)}
/* 栏目导航：报头双线下面一行宋体栏目名，当前栏目墨红特粗、下面 2px 墨红线；整行底下一道浅栏线 */
.s02 .v-sec{margin:0 24px;height:46px;display:flex;align-items:stretch;gap:26px;border-bottom:1px solid var(--ln);font:500 16px/1 ${SERIF};letter-spacing:.02em;color:var(--gy);white-space:nowrap;overflow:hidden}
.s02 .v-sec>span{display:flex;align-items:center;margin-bottom:-1px;border-bottom:2px solid transparent}
.s02 .v-sec>span.on{color:var(--rd);font-weight:900;border-bottom-color:var(--rd)}
.s02 .v-sec+.v-photo{margin-top:16px}
/* 分栏正文：两栏，中间 1px 墨色栏线；首字下沉用墨红，字高加上边距刚好等于两行，第三行不缩进 */
.s02 .v-cols{margin:18px 24px 0;column-count:2;column-gap:27px;column-rule:1px solid var(--ik);font:400 15px/26px ${SERIF};color:var(--tx);text-align:justify}
.s02 .v-dc{float:left;font:900 52px/50px ${SERIF};color:var(--rd);margin:2px 6px 0 0}
.s02 .v-tx .v-dc{font-size:62px;line-height:58px;margin:2px 8px 0 0}
/* 引文：上 3px 下 1px 墨线，墨红 Playfair 引号；出处是一行正常大小的黑体 */
.s02 .v-pq{margin:28px 24px 0;padding:16px 0 18px;border-top:3px solid var(--ik);border-bottom:1px solid var(--ik)}
.s02 .v-pq q{display:block;quotes:none;font:900 25px/37px ${SERIF};letter-spacing:.01em;color:var(--ik)}
.s02 .v-pq .qm{display:block;font:700 54px/34px ${PF};color:var(--rd);height:24px}
.s02 .v-pq cite{display:block;margin-top:12px;font:400 15px/22px ${SANS};font-style:normal;letter-spacing:0;color:var(--gy)}
/* 边注：左边 Playfair 斜体时间，浅栏线隔开，右边一行字 */
.s02 .v-mg{margin:16px 24px 0;display:grid;grid-template-columns:54px 1fr;column-gap:14px}
.s02 .v-mg+.v-mg{margin-top:4px}
.s02 .v-mg .tm{border-right:1px solid var(--ln);font:italic 400 17px/30px ${PF};font-variant-numeric:lining-nums tabular-nums;color:var(--ik)}
.s02 .v-mg p{font:400 16px/30px ${SERIF};color:#25211E;text-align:justify}
/* 大数字：150px Playfair，右边一个说明它是什么的宋体词（入场号、本月读完），可再带一行黑体 */
.s02 .v-bignum{margin:20px 24px 0;display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.s02 .v-bignum .meta{text-align:right;padding-bottom:4px}
.s02 .v-bignum .meta b{display:block;font:900 36px/1 ${SERIF};letter-spacing:.02em;color:var(--ik)}
.s02 .v-bignum .meta span{display:block;margin-top:12px;font:400 15px/22px ${SANS};color:var(--gy)}
/* 文章列表：宋体条目标题，下面一行黑体出处；浅栏线分隔，当前条目标题变墨红 */
.s02 .v-toc{list-style:none;margin:0;padding:0;border-top:1px solid var(--ik)}
.s02 .v-toc li{padding:16px 0 15px;border-bottom:1px solid var(--ln)}
.s02 .v-toc b{display:block;font:700 19px/1.35 ${SERIF};color:var(--ik)}
.s02 .v-toc span{display:block;margin-top:6px;font:400 15px/22px ${SANS};color:var(--gy)}
.s02 .v-toc li.cur b{color:var(--rd)}
/* 信息条：上下两道墨线夹一行黑体，左右各一样 */
.s02 .v-strip{margin:20px 24px 0;padding:12px 0;border-top:1px solid var(--ik);border-bottom:1px solid var(--ik);display:flex;justify-content:space-between;gap:16px;font:500 15px/20px ${SANS};letter-spacing:.02em;color:#3A3530;white-space:nowrap}
/* 底部操作：贴在屏幕底部，按钮 | 竖墨线 | Playfair 大数字，说明它的词在数字下面 */
.s02 .v-act{position:absolute;left:24px;right:24px;bottom:44px;display:grid;grid-template-columns:1fr 1px 108px;column-gap:20px;align-items:center}
.s02 .v-act .vr{height:56px;background:var(--ik)}
.s02 .v-stat b{display:block;font:700 30px/1 ${PF};font-variant-numeric:lining-nums;color:var(--ik);white-space:nowrap}
.s02 .v-stat b i{font-style:normal;font-size:.6em;margin-right:2px}
.s02 .v-stat em{display:block;margin-top:9px;font:400 14px/1 ${SANS};font-style:normal;letter-spacing:0;color:var(--gy);white-space:nowrap}
/* 顶栏、标签栏：只有字，没有图标；当前项宋体特粗 */
.s02 .v-nav{position:relative;height:46px;margin:2px 24px 0;display:flex;align-items:center;justify-content:space-between}
.s02 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:900 20px/1 ${SERIF};letter-spacing:.04em;white-space:nowrap}
.s02 .v-ibs{display:flex;gap:18px;align-items:center}
.s02 .v-back{display:inline-flex;align-items:center;height:44px;padding:0 6px 0 12px;color:var(--ik)}
.s02 .v-tabs{position:absolute;left:24px;right:24px;bottom:0;height:84px;border-top:1px solid var(--ik);display:flex;justify-content:space-between;padding:15px 8px 0;font:500 15px/1 ${SERIF};letter-spacing:0;color:var(--gy);z-index:6;background:var(--pp)}
.s02 .v-tabs>div.on{font-weight:900;color:var(--ik)}
/* 网页：报纸式报头 + 多栏 */
.s02.web{background:var(--pp);font-family:${SERIF}}
.s02 .v-wtop{height:46px;margin:0 48px;display:flex;align-items:center;justify-content:space-between;font:400 15px/1 ${SANS};letter-spacing:.02em;color:var(--gy)}
.s02 .v-wtop b{font-weight:600;color:var(--ik)}
.s02 .v-wmast{height:116px;margin:0 48px;border-top:1px solid var(--ik);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;column-gap:32px}
.s02 .v-wmast .v-logo{font-size:84px}
.s02 .v-wmast .ear{font:400 16px/1.6 ${SERIF};letter-spacing:0;color:var(--ik)}
.s02 .v-wmast .ear.rt{justify-self:end;text-align:right}
.s02 .v-wmast .v-inp{width:240px;height:42px}
.s02 .v-wnav{margin:0 48px;height:52px;border-top:3px solid var(--ik);border-bottom:1px solid var(--ik);display:flex;align-items:center;justify-content:center;gap:48px;font:600 17px/1 ${SERIF};letter-spacing:.04em;color:var(--ik)}
.s02 .v-wnav .on{color:var(--rd);font-weight:900}
/* 三栏容器：照片 560 | 正文 | 侧栏 236，从导航下贴到页底，照片写 h:'100%' */
.s02 .v-wgrid{position:absolute;left:48px;right:48px;top:238px;bottom:0;display:grid;grid-template-columns:560px 1fr 236px}
.s02 .v-wlead{padding:0 32px 0 36px;border-right:1px solid var(--ik)}
.s02 .v-wlead h2{margin-top:-4px;font:900 52px/1.16 ${SERIF};letter-spacing:-.005em;color:var(--ik)}
.s02 .v-wlead .ex{margin-top:24px;padding-top:24px;border-top:1px solid var(--ln);font:400 17px/32px ${SERIF};color:var(--tx);text-align:justify}
.s02 .v-wlead .ex .v-dc{font-size:58px;line-height:56px;margin:5px 8px 0 0}
/* 正文栏下面一篇短稿：宋体标题加一段字，不加第二张图 */
.s02 .v-wnote{margin-top:24px;padding-top:20px;border-top:1px solid var(--ik)}
.s02 .v-wnote b{display:block;font:900 24px/1.3 ${SERIF};color:var(--ik)}
.s02 .v-wnote p{margin-top:10px;font:400 16px/28px ${SERIF};color:var(--tx);text-align:justify}
.s02 .v-wside{padding-left:28px}
.s02 .v-wside .hd{font:900 24px/1 ${SERIF};letter-spacing:0;color:var(--ik);padding-bottom:14px;border-bottom:3px solid var(--ik)}
.s02 .v-wside ol{margin:0;padding:0;list-style:none}
.s02 .v-wside li{padding:16px 0 15px;border-bottom:1px solid var(--ln)}
.s02 .v-wside li span{display:block;font:italic 400 18px/1 ${PF};font-variant-numeric:lining-nums tabular-nums;color:var(--ik)}
/* 日期后的星期放进 em，用正体宋体：斜体只给数字，汉字不进斜体（思源宋体没有斜体，会被浏览器硬拧斜） */
.s02 .v-wside li span em{font:400 16px/1 ${SERIF};font-style:normal;margin-left:6px;color:var(--gy)}
.s02 .v-wside li b{display:block;margin-top:9px;font:700 19px/1.35 ${SERIF};color:var(--ik)}
`;
  const ui = {
    // 字标：宋体特粗的品牌名，可带 Playfair 斜体英文（品牌本来就有英文名才传，不拼音、不全大写）；size 是字号（报头 24，店名做主角 40，网页 84）
    logo: (name, en = '', { size } = {}) => `<div class="v-logo"${size ? ` style="font-size:${size}px"` : ''}><b>${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左返回、中间标题（可传 ui.logo）、右边图标组（ui.icons）；下面一般接 v-r1 或 ui.photo
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<span data-back>${icon('chevron-left', 24, 1.6)}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 右上角图标组：icons(['a-large-small','bookmark'])
    icons: (names, attrs = []) => `<div class="v-ibs">${names.map((n, i) => `<span ${attrs[i] || ''}>${icon(n, 20, 1.6)}</span>`).join('')}</div>`,
    // 返回键 back()：小程序二级页用，放进 miniNav 的 left
    back: () => `<span class="v-back" data-back>${icon('chevron-left', 24, 1.6)}</span>`,
    // 底部标签栏：只有字（items 里的图标名不画，杂志不用图标），当前项宋体特粗；上面一道墨线
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</div>`).join('')}</div>`,
    // 主按钮：墨红直角；cls 'wide' 通栏、'ghost' 墨线框、'ink' 墨黑、'sm' 小号；默认不带图标
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${text}${ic ? icon(ic, 18, 1.8) : ''}</div>`,
    // 报头 masthead(name, { mini, right, size })：字标在左，右边只放一组图标 right（ui.icons），下面双线
    //   品牌本来就有英文名时 name 传 [中文名, 英文名]，英文跟在字标里（同 ui.logo 的 en）
    //   size 是字标字号（默认 24，店名做主角用 40）；mini: true 时字标放进小程序胶囊那一行，右边留给胶囊
    masthead: (name, { mini = false, right = '', size } = {}) => {
      const [cn, en = ''] = [].concat(name);
      return `<div class="v-mast${mini ? ' mini' : ''}"${size > 30 && !mini ? ` style="min-height:${size + 34}px;padding-bottom:12px"` : ''}>${ui.logo(cn, en, { size })}${mini ? '' : right}</div><div class="v-r2"></div>`;
    },
    // 栏目导航 sections(items, cur, go)：接在报头双线下面，一行宋体栏目名，当前栏目墨红特粗带下划线；go[i] 是点第 i 个跳去的屏幕编号
    sections: (items, cur = 0, go = []) => `<div class="v-sec">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 铺满到边的黑白大图：photo(img('x'), { h: 286, pos: '52% 100%', size: 'auto 152%', f: '更狠的滤镜' })；h 可写 '100%'
    photo: (src, { h = 280, pos = '50% 50%', size = '', f = '', attrs = '', style = '' } = {}) => `<div class="ph v-photo" ${attrs} style="height:${typeof h === 'number' ? h + 'px' : h};background-image:url(${src});background-position:${pos};${size ? `background-size:${size};` : ''}${f ? `filter:${f};` : ''}${style}"></div>`,
    // 开篇正文 lede(text, { cols, attrs })：第一个字墨红下沉；cols 2 是两栏带栏线，1 是单栏大字
    lede: (text, { cols = 2, attrs = '' } = {}) => `<div class="${cols === 2 ? 'v-cols' : 'v-tx'}" ${attrs}><span class="v-dc">${text[0]}</span>${text.slice(1)}</div>`,
    // 引文 pull(quote, cite)：pull('十一点以后，<br>这座城市才开始说真话。', '王建国，开了十九年夜班出租车')；cite 可不传，出处在上下文里说清了就不传
    pull: (quote, cite = '') => `<div class="v-pq"><span class="qm">“</span><q>${quote}</q>${cite ? `<cite>${cite}</cite>` : ''}</div>`,
    // 边注 margin(tm, text)：左边 Playfair 斜体时间，右边一行字（活动流程、时间线）
    margin: (tm, text) => `<div class="v-mg"><div class="tm">${tm}</div><p>${text}</p></div>`,
    // 大数字 bignum(num, word, sub)：150px Playfair 数字 + 右边说明它的词（入场号、本月读完），sub 是词下面一行黑体（时间、单位），可不传
    bignum: (num, word, sub = '') => `<div class="v-bignum"><div class="v-big">${num}</div><div class="meta"><b>${word}</b>${sub ? `<span>${sub}</span>` : ''}</div></div>`,
    // 文章列表 toc(items, cur)：[['在北京，找一级台阶坐下', '周远，12 分钟读完', 'data-go="x"'], …]；第二项是标题下一行黑体，可留空；cur 是当前条目
    toc: (items, cur = -1) => `<ol class="v-toc">${items.map(([b, sub = '', at = ''], i) => `<li class="${i === cur ? 'cur' : ''}" ${at}><b>${b}</b>${sub ? `<span>${sub}</span>` : ''}</li>`).join('')}</ol>`,
    // 信息条 strip(left, right)：上下墨线夹一行黑体，左右各一样（时间和余量、门店和取餐时间）；只有一样就只传 left
    strip: (left, right = '') => `<div class="v-strip"><span>${left}</span>${right ? `<span>${right}</span>` : ''}</div>`,
    // Playfair 大数字 + 下面说明它的词 stat(label, value)：stat('会员积分', '1,310')，value 里的 <i>¥</i> 自动缩小
    stat: (label, value) => `<div class="v-stat"><b>${value}</b><em>${label}</em></div>`,
    // 底部操作行：act(ui.btn('去点单', …), ui.stat('会员积分', '1,280'))
    act: (btn, stat) => `<div class="v-act">${btn}<i class="vr"></i>${stat}</div>`,
    // 价格：price(28) 是小 ¥ 加 Playfair 数字；unit 如 '/本'
    price: (n, unit = '') => `<span class="v-price"><i>¥</i>${n}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // 网页顶条 wtop(left, right)：左边门店地址和营业时间（写成一句），右边登录
    wtop: (left, right) => `<div class="v-wtop"><span>${left}</span><span>${right}</span></div>`,
    // 网页报纸报头 wmast(name, earL, earR, en)：左耳（搜索框）、居中 84px 字标、右耳（会员按钮），en 是字标后的英文名
    wmast: (name, earL = '', earR = '', en = '') => `<div class="v-wmast"><div class="ear">${earL}</div>${ui.logo(name, en)}<div class="ear rt">${earR}</div></div>`,
    // 网页栏目导航 wnav(items, cur)：上 3px 下 1px 墨线，cur 是当前栏目序号（墨红）
    wnav: (items, cur = -1) => `<div class="v-wnav">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}">${t}</span>`).join('')}</div>`,
    // 网页短稿 wnote(title, text)：放在 .v-wlead 里导语下面，宋体标题加一段字
    wnote: (title, text) => `<div class="v-wnote"><b>${title}</b><p>${text}</p></div>`,
    // 展示板装饰 boardDeco(mark, { size, color, line })（demo.boardDeco 用）：品牌名的一个字放大成水印压在左下角，上下各一道强调色双线
    //   mark 传品牌名里最有样子的一个字（中文用宋体特粗，英文用 Playfair）；line 默认墨红，项目 CSS 换了 --rd 就传同一个色（#xxxxxx 自动加 .82 透明度）。展示板在 .s02 外面，读不到 --rd
    boardDeco: (mark, { size = 760, color = T.accents.watermark, line = T.primary } = {}) => {
      const c = alpha(line);
      const dbl = (pos, v) => `<div style="position:absolute;left:36px;right:36px;${pos}:${v}px;height:6px;border-top:2px solid ${c};border-bottom:1px solid ${c}"></div>`;
      const font = CJK.test(mark || '') ? `900 ${size}px/.86 'Noto Serif SC'` : `900 ${size}px/.74 'Playfair Display'`;
      return `<div style="position:absolute;left:-${Math.round(size * .12)}px;bottom:-${Math.round(size * .2)}px;font:${font};color:${color};white-space:nowrap">${mark || ''}</div>${dbl('top', 26)}${dbl('bottom', 36)}`;
    },
  };
  return { key: 's02-editorial', no: 2, name: '杂志编辑', root: 's02', T, css, ui, stage: T.accents.newsprint, dark: false };
};
