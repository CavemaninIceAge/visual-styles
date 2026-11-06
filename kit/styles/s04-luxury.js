// 04 黑白奢感 Luxury —— 起手包
// 色值、字体、字号、线宽、照片滤镜、遮罩都照图册模块 catalog/pages/s04-luxury.js（玄白 XUANBAI）原样取
// 用法：const S = style('s04-luxury');
//   深色屏 <div class="scr s04">（默认，照片铺满、象牙字）；象牙底屏 <div class="scr s04 v-iv">（单品、房型，黑字）
//   这种风格的版式是「一屏一件事、几行字按绝对位置摆」，块用 .v-abs（左右 28px）加 style="top:…" 定位
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#0D0C0B',            // 墨黑：默认整屏底（首页、确认页、官网）
    surface: '#F2EDE4',       // 象牙白：浅色页（单品、房型）的整页底；深底上的正文字色也是它
    ink: '#F2EDE4',           // 深底上的字；象牙底上换成墨黑 #0D0C0B
    ink2: '#8C877E',          // 烟灰：标签、规格、未选中的标签栏；象牙底上用 #6F6A62
    line: 'rgba(242,237,228,.16)',  // 深底上的细分隔线；象牙底上 rgba(13,12,11,.14)，规格竖线 #B9B3A8
    primary: '#FFFFFF',       // 纯白：字标、压在照片上的大名字、细框按钮（这个风格没有彩色主色）
    onPrimary: '#0D0C0B',
    accents: { gold: '#B49A6A', ivoryMut: '#6F6A62', ivoryRule: '#B9B3A8', plate: '#E7E2D9' }, // 香槟金只画一条 1px 细线；plate 是单品图的浅灰底
    fonts: { title: '"Noto Serif SC",serif', body: '"Noto Serif SC",serif', num: '"Bodoni Moda",serif' },
    radius: 0,
    border: '1px solid rgba(242,237,228,.86)',   // 细框直角按钮；象牙底上 1px solid #0D0C0B
    shadow: null,
    margin: 28,
    photo: 'grayscale(1) sepia(.07) contrast(1.08) brightness(.86)',  // 深底照片；象牙底上 grayscale(1) sepia(.06) contrast(1.05) brightness(1.06)
  };
  const css = `
.s04{--k:#0D0C0B;--iv:#F2EDE4;--sm:#8C877E;--au:#B49A6A;--bd:"Bodoni Moda",serif;--sg:"Noto Serif SC",serif;--bz:"Bodoni Moda","Noto Serif SC",serif;--fg:var(--iv);--hi:#fff;--mut:var(--sm);--ln:rgba(242,237,228,.16);--rule:rgba(242,237,228,.3);--fr:rgba(242,237,228,.86);--pg:var(--k);background:var(--k);color:var(--fg);font-family:var(--sg);font-weight:300;font-size:15px;line-height:1.6}
.s04.v-iv{--fg:var(--k);--hi:var(--k);--mut:#6F6A62;--ln:rgba(13,12,11,.14);--rule:#B9B3A8;--fr:var(--k);--pg:var(--iv);background:var(--iv)}
.s04 .v-pad{padding-left:28px;padding-right:28px}
.s04 .v-abs{position:absolute;left:28px;right:28px}
/* 字：中文只用细宋体（200 / 300），西文和数字用 Bodoni Moda，字距拉开
   opsz 比图册模块低（大数字 96→40、副名 48→30、小数字 24→14）：图册的字里没有 4 和 W，高 opsz 下这两个字的发丝笔画缩小后会断 */
.s04 .v-h1{font:200 38px/1.15 var(--sg);letter-spacing:.16em;color:var(--hi)}
.s04 .v-en{font:italic 400 20px/1.2 var(--bd);font-variation-settings:"opsz" 30;letter-spacing:.01em;opacity:.8;color:var(--hi)}
.s04 .v-h2{font:200 28px/1.25 var(--sg);letter-spacing:.14em;color:var(--hi)}
.s04 .v-h3{font:300 17px/1.4 var(--sg);letter-spacing:.12em}
.s04 .v-tx{font:300 15px/1.9 var(--sg);letter-spacing:.06em}
.s04 .v-mut{font:300 13px/1.6 var(--sg);letter-spacing:.2em;color:var(--mut)}
.s04 .v-lab{font:300 14px/1 var(--sg);letter-spacing:.42em;color:var(--mut);white-space:nowrap}
.s04 .v-num{font-family:var(--bz);font-weight:400;font-variation-settings:"opsz" 14;letter-spacing:.06em}
.s04 .v-big{font:400 76px/.9 var(--bd);font-variation-settings:"opsz" 40;letter-spacing:.02em;color:var(--fg)}
/* 价格：¥ 用 ::first-letter 缩小上浮，约定写法 <span class="v-price">¥28<small>/杯</small></span> 和 ui.price 结果一样 */
.s04 .v-price{display:inline-block;font:400 20px/1 var(--bd);font-variation-settings:"opsz" 18;letter-spacing:.04em;color:var(--fg);white-space:nowrap}
.s04 .v-price::first-letter{font:200 max(11px,.62em)/1 var(--sg);margin-right:.14em;vertical-align:.32em}
/* Bodoni Moda 的逗号小字号下像句号：千分位逗号换成宋体的（ui.price / ui.num 自动包） */
.s04 .v-cm{font-family:var(--sg);font-weight:300;letter-spacing:0}
.s04 .v-price small{font:300 12px/1 var(--sg);letter-spacing:.14em;margin-left:5px;color:var(--mut)}
/* 名字块：中文细宋体大名 + 一行西文斜体 */
.s04 .v-ttl .v-en{margin-top:10px}
/* 唯一的金色：一条 1px 细线，一屏最多一次 */
.s04 .v-au{display:block;width:36px;height:1px;background:var(--au)}
/* 按钮：1px 细框、直角、透明底、宋体字距 .42em；.solid 实心（少用） */
.s04 .v-btn{height:52px;padding:0 32px 0 calc(32px + .42em);display:inline-flex;align-items:center;justify-content:center;gap:10px;border:1px solid var(--fr);background:transparent;color:var(--fg);font:300 14px/1 var(--sg);letter-spacing:.42em;white-space:nowrap}
.s04 .v-btn.wide{display:flex;width:100%;padding:0 0 0 .42em}
.s04 .v-btn.ghost{height:auto;padding:0 0 9px .42em;border-color:transparent;border-bottom-color:var(--mut)}
.s04 .v-btn.solid{background:var(--hi);border-color:var(--hi);color:var(--pg)}
/* 卡片：没有框、没有阴影，照片在上、细字在下 */
.s04 .v-card{position:relative}
.s04 .v-card>.ph{aspect-ratio:4/5}
.s04 .v-card .bd{padding:18px 0 0}
.s04 .v-card .bd>*+*{margin-top:8px}
/* 列表：行高 52、只有 1px 细线 */
.s04 .v-list{border-bottom:1px solid var(--ln)}
.s04 .v-row{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:52px;border-top:1px solid var(--ln);font:300 14px/1.3 var(--sg);letter-spacing:.12em}
.s04 .v-row>span:first-child{color:var(--mut)}
.s04 .v-row b{font-weight:300;text-align:right}
.s04 .v-row b.v-num{font-weight:400;letter-spacing:.14em}
/* 筛选：只有字，选中的下面一条细线 */
.s04 .v-chips{display:flex;gap:28px}
.s04 .v-chip{padding:0 0 9px;font:300 14px/1 var(--sg);letter-spacing:.24em;color:var(--mut);border-bottom:1px solid transparent;white-space:nowrap}
.s04 .v-chip.on{color:var(--fg);border-bottom-color:var(--fg)}
.s04 .v-inp{height:52px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--ln);font:300 15px/1 var(--sg);letter-spacing:.12em;color:var(--mut)}
/* 规格行：细竖线隔开（68 ㎡ | 庭院景观 | 每晚 ¥4,800 起） */
.s04 .v-sp{display:flex;gap:12px;align-items:center;font:300 14px/1 var(--sg);letter-spacing:.14em;color:var(--mut);white-space:nowrap}
.s04 .v-sp i{width:1px;height:11px;background:var(--rule);flex:none}
.s04 .v-sp .v-num{letter-spacing:.08em;color:var(--mut)}
.s04 .v-sp .v-price{font-size:15px;font-variation-settings:"opsz" 14;color:var(--fg)}
/* 大数字行：Bodoni 大日期 + 右边两行小字（11.07 周六 / 入住） */
.s04 .v-dt{display:flex;align-items:flex-end;justify-content:space-between}
.s04 .v-dt>span{font:300 13px/1.6 var(--sg);letter-spacing:.2em;color:var(--mut);text-align:right;padding-bottom:6px}
.s04 .v-dt+.v-dt{margin-top:28px;padding-top:28px;border-top:1px solid var(--ln)}
/* 页码：竖排（01 | 04）或横排（01 —— 04），表示往下翻还有几页 */
.s04 .v-pg{position:absolute;right:24px;display:flex;flex-direction:column;align-items:center;gap:12px;font:400 13px/1 var(--bd);font-variation-settings:"opsz" 14;letter-spacing:.06em;color:var(--hi);z-index:4}
.s04 .v-pg i{width:1px;height:72px;background:currentColor;opacity:.5}
.s04 .v-pg em,.s04 .v-fo em{font-style:normal;opacity:.55}
.s04 .v-fo{display:flex;align-items:center;gap:12px;font:400 13px/1 var(--bd);font-variation-settings:"opsz" 14;letter-spacing:.12em;color:var(--hi)}
.s04 .v-fo i{width:44px;height:1px;background:currentColor;opacity:.45}
/* 照片：整屏铺满 + 上下压暗的遮罩；象牙底上的照片是一条通栏（.v-pic） */
.s04 .ph{background-size:cover;background-position:center;background-repeat:no-repeat;filter:${T.photo}}
.s04.v-iv .ph{filter:grayscale(1) sepia(.06) contrast(1.05) brightness(1.06)}
.s04 .v-full{position:absolute;inset:0}
.s04 .v-veil{position:absolute;inset:0;pointer-events:none}
.s04 .v-pic{position:absolute;left:0;right:0;overflow:hidden}
.s04 .v-pic>.ph{position:absolute;inset:0}
/* 单品图：浅灰底板上放去底的单品（白底产品照自动 multiply 融进底板） */
.s04 .v-plate{position:relative;overflow:hidden;background:radial-gradient(ellipse 80% 70% at 50% 42%,#F4F0EA 0%,#E7E2D9 68%,#DDD7CC 100%)}
.s04 .v-plate>.ph{position:absolute;inset:0;mix-blend-mode:multiply;filter:grayscale(1) contrast(1.04)}
.s04 .v-item .v-plate{aspect-ratio:3/4}
.s04 .v-item .n{margin-top:14px;font:300 14px/1.4 var(--sg);letter-spacing:.12em}
.s04 .v-item .v-price{display:block;margin-top:8px;font-size:15px}
/* App 顶栏：左右 1px 细线图形，中间小字标或字距拉开的标题 */
.s04 .v-nav{position:relative;height:60px;margin:0 24px;display:flex;align-items:center;justify-content:space-between;color:var(--hi);z-index:4}
.s04 .v-nav>.c{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap}
.s04 .v-nav .t{font:400 15px/1 var(--bz);font-variation-settings:"opsz" 14;letter-spacing:.4em;padding-left:.4em}
.s04 .v-nav .r{font:400 12px/1 var(--bd);font-variation-settings:"opsz" 14;letter-spacing:.24em;white-space:nowrap}
.s04 .v-nav .ln{min-width:24px;height:44px;display:flex;align-items:center}
/* 字标：Bodoni 大写字距拉开 + 下面一行很小的中文；.sm 顶栏用（只留西文），.xl 官网首屏 */
.s04 .v-logo{text-align:center;color:var(--hi);line-height:1;white-space:nowrap}
.s04 .v-logo b{display:block;font:400 23px/1 var(--bd);font-variation-settings:"opsz" 18;letter-spacing:.36em;padding-left:.36em}
.s04 .v-logo b.cn{font:300 21px/1 var(--sg);letter-spacing:.6em;padding-left:.6em}
.s04 .v-logo i{display:block;font:300 11px/1 var(--sg);letter-spacing:1em;padding-left:1em;margin-top:9px;opacity:.82}
.s04 .v-logo.sm b{font-size:15px;letter-spacing:.4em;padding-left:.4em;font-variation-settings:"opsz" 14}
.s04 .v-logo.md b{font-size:28px;letter-spacing:.36em;padding-left:.36em}
.s04 .v-logo.md i{font-size:12px;margin-top:10px}
.s04 .v-logo.xl b{font-size:84px;letter-spacing:.28em;padding-left:.28em;font-variation-settings:"opsz" 24}
.s04 .v-logo.xl i{font:200 19px/1 var(--sg);letter-spacing:.9em;padding-left:.9em;margin-top:30px;opacity:1}
/* 底部标签栏：只有字，字距 .3em，当前项变亮，没有图标、没有色块 */
.s04 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;border-top:1px solid var(--ln);display:flex;justify-content:space-around;padding:20px 18px 0;background:var(--pg);font:300 13px/1 var(--sg);letter-spacing:.3em;color:var(--mut);z-index:6}
.s04 .v-tabs>div{padding-left:.3em}
.s04 .v-tabs>div.on{color:var(--fg)}
/* 网页 */
.s04.web{background:var(--k);color:var(--iv);font-family:var(--sg)}
.s04.web .v-h1{font-size:52px}
.s04.web .v-en{font-size:24px}
.s04.web .v-ttl .v-en{margin-top:16px}
.s04 .v-wnav{position:absolute;left:64px;right:64px;top:44px;height:46px;display:flex;align-items:center;justify-content:space-between;font:300 18px/1 var(--sg);letter-spacing:.32em;color:var(--hi);z-index:4}
.s04 .v-wnav .a,.s04 .v-wnav .b{display:flex;gap:44px;align-items:center;white-space:nowrap}
.s04 .v-wnav .b{gap:32px}
.s04 .v-wnav .b .lg{font:400 16px/1 var(--bd);font-variation-settings:"opsz" 14;letter-spacing:.24em}
.s04 .v-wnav .v-btn{height:46px;padding:0 28px 0 calc(28px + .42em);font-size:18px;color:var(--hi);border-color:var(--fr)}
.s04 .v-wnav>.c{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.s04.web>.v-logo.xl{position:absolute;left:0;right:0;top:336px}
.s04.web>.v-fo{position:absolute;left:64px;bottom:52px;font-size:18px}
.s04.web>.v-fo i{width:80px}
.s04 .v-cue{position:absolute;left:50%;bottom:0;width:1px;height:72px;background:rgba(242,237,228,.6);z-index:4}
/* 展示板舞台：暖黑聚光 */
.s04.v-stage{position:absolute;inset:0;background:radial-gradient(ellipse 72% 56% at 50% 46%,#38332E 0%,#16130F 64%,#0D0C0B 100%)}
.s04.v-stage .v-logo{position:absolute;left:96px;top:56px;text-align:left}
.s04.v-stage .v-logo i{text-align:left}
`;
  // 这种风格自己的 1px 细线图形（比 lucide 更细更长）：返回、关闭、菜单
  const G = {
    back: '<svg width="24" height="12" viewBox="0 0 24 12"><path d="M6.5 1 1 6l5.5 5M1 6h23" stroke="currentColor" stroke-width="1" fill="none"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M1 1l16 16M17 1 1 17" stroke="currentColor" stroke-width="1" fill="none"/></svg>',
    menu: '<svg width="24" height="10" viewBox="0 0 24 10"><path d="M0 1.5h24M0 8.5h15" stroke="currentColor" stroke-width="1" fill="none"/></svg>',
  };
  // 遮罩预设（从图册模块原样取）：hero 上下压暗、web 整体压暗、fade 下半截渐黑
  const VEIL = {
    hero: 'rgba(13,12,11,.58) 0%,rgba(13,12,11,.12) 15%,rgba(13,12,11,0) 28%,rgba(13,12,11,0) 64%,rgba(13,12,11,.55) 74%,rgba(13,12,11,.9) 86%,#0D0C0B 100%',
    web: 'rgba(13,12,11,.72) 0%,rgba(13,12,11,.36) 24%,rgba(13,12,11,.34) 60%,rgba(13,12,11,.8) 100%',
    fade: 'rgba(13,12,11,.66) 0%,rgba(13,12,11,0) 24%,rgba(13,12,11,0) 40%,rgba(13,12,11,.86) 64%,#0D0C0B 84%',
  };
  const cm = (t) => String(t).replace(/,/g, '<span class="v-cm">,</span>');
  const bgStyle = (src, pos, size, filter) => `background-image:url(${src});background-position:${pos};background-size:${size}${filter ? `;filter:${filter}` : ''}`;
  const ui = {
    // 细线图形：glyph('back' | 'close' | 'menu')
    glyph: (name) => G[name] || '',
    // lucide 图标按这个风格的线宽画（1px）：ic('search', 20)
    ic: (name, size = 20) => icon(name, size, 1),
    // 字标：logo('玄白', 'XUANBAI')；第三个参数 { size: 'sm' | 'md' | 'xl', fs: 19, ls: .24 }（sm 只留西文；fs 字号 px、ls 字距 em，长名字用）。没有英文名时中文名字距拉开当字标
    logo: (name, en = '', { size = '', fs = 0, ls = 0 } = {}) => {
      const st = fs || ls ? ` style="${fs ? `font-size:${fs}px;` : ''}${ls ? `letter-spacing:${ls}em;padding-left:${ls}em` : ''}"` : '';
      return `<div class="v-logo ${size}">${en ? `<b${st}>${en}</b>${name && size !== 'sm' ? `<i>${name}</i>` : ''}` : `<b class="cn"${st}>${name}</b>`}</div>`;
    },
    // App 顶栏：title 传字（字距拉开）或传 HTML（比如 ui.logo('玄白','XUANBAI',{size:'sm'})）；right 是右边的字（页码 02 / 04）或 HTML
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left ? `<div class="ln">${left}</div>` : back ? `<div class="ln" data-back>${G.back}</div>` : '<span class="ln"></span>'}${title ? `<div class="c">${String(title).trim().startsWith('<') ? title : `<div class="t">${title}</div>`}</div>` : ''}${right ? `<div class="r">${right}</div>` : '<span class="ln"></span>'}</div>`,
    // 底部标签栏：items 照约定传 [['house','首页'], …]，这个风格只显示字、不画图标
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</div>`).join('')}</div>`,
    // 主按钮：细框直角，默认不带图标；cls 'wide' 通栏、'ghost' 只有一条下划线、'solid' 实心
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${text}${ic ? icon(ic, 16, 1) : ''}</div>`,
    // 整屏照片 + 遮罩：full(img('xxx') 或 SVG/HTML, { pos: '53% 0%', size: 'cover', filter: '', veil: 'hero' | 'web' | 'fade' | 自定义渐变色标 | '' })
    full: (src, { pos = 'center', size = 'cover', filter = '', veil = 'hero' } = {}) => `${/^\s*</.test(src) ? `<div class="v-full">${src}</div>` : `<div class="ph v-full" style="${bgStyle(src, pos, size, filter)}"></div>`}${veil ? `<div class="v-veil" style="background:linear-gradient(180deg,${VEIL[veil] || veil})"></div>` : ''}`,
    // 通栏照片带（象牙底页用）：pic(img('xxx'), { top: 110, h: 420, pos, size, filter })
    pic: (src, { top = 110, h = 420, pos = 'center', size = 'cover', filter = '' } = {}) => `<div class="v-pic" style="top:${top}px;height:${h}px"><div class="ph" style="${bgStyle(src, pos, size, filter)}"></div></div>`,
    // 单品底板：plate(内容HTML 或 图片地址, 'top:110px;height:420px;position:absolute;left:0;right:0')
    plate: (inner, style = '') => `<div class="v-plate" style="${style}">${/^(file|https?|data):/.test(inner) ? `<div class="ph" style="background-image:url(${inner})"></div>` : inner}</div>`,
    // 商品列表的一格：item(内容HTML 或 图片地址, '名字', '268,000')
    item: (inner, name, price = '', attrs = '') => `<div class="v-item" ${attrs}>${ui.plate(inner)}<div class="n">${name}</div>${price ? ui.price(price) : ''}</div>`,
    // 名字块：title('见山套房', 'The Mountain Suite')
    title: (cn, en = '') => `<div class="v-ttl"><div class="v-h1">${cn}</div>${en ? `<div class="v-en">${en}</div>` : ''}</div>`,
    // 金色细线（一屏最多一条）：hair(44)
    hair: (w = 36, style = '') => `<i class="v-au" style="width:${w}px;${style}"></i>`,
    // 页码：pager(1, 4, { top: 318 }) 竖排在右边；pager(1, 4, { dir: 'h' }) 横排，放在 .web 根下自动落到左下角
    pager: (cur, total, { dir = 'v', top = 318, style = '' } = {}) => { const p = (n) => String(n).padStart(2, '0'); return dir === 'v' ? `<div class="v-pg" style="top:${top}px;${style}"><span>${p(cur)}</span><i></i><em>${p(total)}</em></div>` : `<div class="v-fo" style="${style}">${p(cur)}<i></i><em>${p(total)}</em></div>`; },
    // 规格行：specs(['68 ㎡', '庭院景观', '每晚 ¥4,800 起'])
    specs: (items) => `<div class="v-sp">${items.join('<i></i>')}</div>`,
    // 大数字行：big('11.07', '周六', '入住')；连着写两行自动加分隔线
    big: (num, l1 = '', l2 = '') => `<div class="v-dt"><b class="v-big">${num}</b><span>${l1}${l2 ? `<br>${l2}` : ''}</span></div>`,
    // 信息行：rows([['房型','庭院套房 · 两晚'], ['确认号','XB 26110 7042', true]])，第三项 true 用 Bodoni 数字
    rows: (list) => `<div class="v-list">${list.map(([k, v, n]) => `<div class="v-row"><span>${k}</span><b class="${n ? 'v-num' : ''}">${v}</b></div>`).join('')}</div>`,
    // 价格：price('4,800', '/晚')，¥ 用细宋体缩小上浮
    price: (amount, unit = '') => `<span class="v-price">¥${cm(amount)}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // Bodoni 数字（带千分位时用它，逗号不会看成句号）：num('1,280')
    num: (text) => `<span class="v-num">${cm(text)}</span>`,
    // label(text, style)：字距很开的小标签（预订已确认、今日推荐）
    label: (text, style = '') => `<div class="v-lab" style="${style}">${text}</div>`,
    // cue()：官网首屏底部正中的一根竖线（往下翻）
    cue: () => '<div class="v-cue"></div>',
    // 官网顶栏：webNav(logo, links, right, cta, ctaAttrs)。links 在左；logo 在正中，首屏放大字标时传 ''；right 是语言切换这类字；cta 是细框按钮的字
    webNav: (logo = '', links = [], right = '', cta = '', ctaAttrs = '') => `<div class="v-wnav"><div class="a">${links.map((t) => `<span>${t}</span>`).join('')}</div>${logo ? `<div class="c">${logo}</div>` : ''}<div class="b">${right ? `<span class="lg">${right}</span>` : ''}${cta ? ui.btn(cta, { attrs: ctaAttrs }) : ''}</div></div>`,
    // 展示板装饰（demo 里写 boardTitle: '', boardDeco: S.ui.stage('玄白', 'XUANBAI')）：暖黑聚光 + 左上角字标
    stage: (name = '', en = '') => `<div class="s04 v-stage">${name || en ? ui.logo(name, en, { size: 'md' }) : ''}</div>`,
  };
  return { key: 's04-luxury', no: 4, name: '黑白奢感', root: 's04', T, css, ui, stage: '#0D0C0B', dark: true };
};
