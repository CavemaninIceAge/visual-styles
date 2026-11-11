// 04 黑白奢感 Luxury 起手包
// 色值、字体、线宽、照片滤镜、遮罩照图册模块 catalog/pages/s04-luxury.js 原样取；字号和字距按审美守则第二节重排过
// 用法：const S = style('s04-luxury');
//   深色屏 <div class="scr s04">（默认，照片铺满、象牙字）；象牙底屏 <div class="scr s04 v-iv">（单品、房型，黑字）
//   这种风格的版式是「一屏一件事、几行字按绝对位置摆」，块用 .v-abs（左右 28px）加 style="top:…" 定位
//   贵气靠四样东西撑：整屏黑白大片、200 字重的大号细宋体、Bodoni 发丝笔画的大数字、1px 细框和一根金线。小字不拉字距
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#0D0C0B',            // 墨黑：默认整屏底（首页、确认页、官网）
    surface: '#F2EDE4',       // 象牙白：浅色页（单品、房型）的整页底；深底上的正文字色也是它
    ink: '#F2EDE4',           // 深底上的字；象牙底上换成墨黑 #0D0C0B
    ink2: '#8C877E',          // 烟灰：字段名、规格、未选中的标签栏；象牙底上用 #6F6A62
    line: 'rgba(242,237,228,.16)',  // 深底上的细分隔线；象牙底上 rgba(13,12,11,.14)
    primary: '#FFFFFF',       // 纯白：字标、压在照片上的大名字、细框按钮（这个风格没有彩色主色）
    onPrimary: '#0D0C0B',
    accents: { gold: '#B49A6A', ivoryMut: '#6F6A62', plate: '#E7E2D9' }, // 香槟金只画一条 1px 细线；plate 是单品图的浅灰底
    fonts: { title: '"Noto Serif SC",serif', body: '"Noto Serif SC",serif', num: '"Bodoni Moda",serif' },
    radius: 0,
    border: '1px solid rgba(242,237,228,.86)',   // 细框直角按钮；象牙底上 1px solid #0D0C0B
    shadow: null,
    margin: 28,
    photo: 'grayscale(1) sepia(.07) contrast(1.08) brightness(.86)',  // 深底照片；象牙底上 grayscale(1) sepia(.06) contrast(1.05) brightness(1.06)
  };
  const css = `
.s04{--k:#0D0C0B;--iv:#F2EDE4;--sm:#8C877E;--au:#B49A6A;--bd:"Bodoni Moda",serif;--sg:"Noto Serif SC",serif;--bz:"Bodoni Moda","Noto Serif SC",serif;--fg:var(--iv);--hi:#fff;--mut:var(--sm);--ln:rgba(242,237,228,.16);--fr:rgba(242,237,228,.86);--pg:var(--k);background:var(--k);color:var(--fg);font-family:var(--sg);font-weight:300;font-size:15px;line-height:1.6;letter-spacing:.02em}
.s04.v-iv{--fg:var(--k);--hi:var(--k);--mut:#6F6A62;--ln:rgba(13,12,11,.14);--fr:var(--k);--pg:var(--iv);background:var(--iv)}
.s04 .v-pad{padding-left:28px;padding-right:28px}
.s04 .v-abs{position:absolute;left:28px;right:28px}
/* 字：中文只用细宋体（200 / 300），西文和数字用 Bodoni Moda
   字距只给 28px 以上的细宋体大字（.12–.16em，笔画细，放大后字面发挤）；28px 以下的字，按钮、标签栏、列表、规格，一律 0–.04em
   opsz 比图册模块低（大数字 96→40、西文 48→30、小数字 24→14）：图册的字里没有 4 和 W，高 opsz 下这两个字的发丝笔画缩小后会断 */
.s04 .v-h1{font:200 38px/1.15 var(--sg);letter-spacing:.16em;color:var(--hi)}
.s04 .v-en{font:italic 400 20px/1.2 var(--bd);font-variation-settings:"opsz" 30;letter-spacing:.01em;opacity:.8;color:var(--hi)}
.s04 .v-h2{font:200 28px/1.25 var(--sg);letter-spacing:.12em;color:var(--hi)}
.s04 .v-h3{font:300 18px/1.4 var(--sg);letter-spacing:.04em}
.s04 .v-tx{font:300 15px/1.9 var(--sg);letter-spacing:.04em}
.s04 .v-mut{font:300 14px/1.6 var(--sg);letter-spacing:.02em;color:var(--mut)}
.s04 .v-num{font-family:var(--bz);font-weight:400;font-variation-settings:"opsz" 14;letter-spacing:.02em;font-variant-numeric:tabular-nums}
.s04 .v-big{font:400 76px/.9 var(--bd);font-variation-settings:"opsz" 40;letter-spacing:.02em;color:var(--fg)}
/* 价格：¥ 用 ::first-letter 缩小上浮，约定写法 <span class="v-price">¥28<small>/杯</small></span> 和 ui.price 结果一样 */
.s04 .v-price{display:inline-block;font:400 20px/1 var(--bd);font-variation-settings:"opsz" 18;letter-spacing:.02em;color:var(--fg);white-space:nowrap}
.s04 .v-price::first-letter{font:200 max(12px,.62em)/1 var(--sg);margin-right:.14em;vertical-align:.32em}
/* Bodoni Moda 的逗号小字号下像句号：千分位逗号换成宋体的（ui.price / ui.num 自动包） */
.s04 .v-cm{font-family:var(--sg);font-weight:300;letter-spacing:0}
.s04 .v-price small{font:300 13px/1 var(--sg);letter-spacing:0;margin-left:4px;color:var(--mut)}
/* 名字块：一行 200 字重的大号细宋体；只有东西本来就是外文名时，下面才跟一行 Bodoni 斜体 */
.s04 .v-ttl .v-en{margin-top:10px}
/* 唯一的金色：一条 1px 细线，一屏最多一次 */
.s04 .v-au{display:block;width:36px;height:1px;background:var(--au)}
/* 按钮：1px 细框、直角、透明底、高 52，字 15px 不拉字距；贵气靠细框和框里的空，不靠把字拉开。.solid 实心（少用） */
.s04 .v-btn{height:52px;padding:0 36px;display:inline-flex;align-items:center;justify-content:center;gap:10px;border:1px solid var(--fr);background:transparent;color:var(--fg);font:300 15px/1 var(--sg);letter-spacing:.04em;white-space:nowrap}
.s04 .v-btn.wide{display:flex;width:100%;padding:0}
.s04 .v-btn.ghost{height:auto;padding:0 0 9px;border-color:transparent;border-bottom-color:var(--mut)}
.s04 .v-btn.solid{background:var(--hi);border-color:var(--hi);color:var(--pg)}
/* 卡片：没有框、没有阴影，照片在上、细字在下 */
.s04 .v-card{position:relative}
.s04 .v-card>.ph{aspect-ratio:4/5}
.s04 .v-card .bd{padding:18px 0 0}
.s04 .v-card .bd>*+*{margin-top:8px}
/* 列表：行高 52、只有 1px 细线；字段名和内容同一个字号，字段名用次要色 */
.s04 .v-list{border-bottom:1px solid var(--ln)}
.s04 .v-row{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:52px;border-top:1px solid var(--ln);font:300 15px/1.3 var(--sg);letter-spacing:.02em}
.s04 .v-row>span:first-child{color:var(--mut)}
.s04 .v-row b{font-weight:300;text-align:right}
.s04 .v-row b.v-num{font-weight:400;font-size:16px;letter-spacing:.04em}
/* 筛选：只有字，选中的变亮、下面一条细线 */
.s04 .v-chips{display:flex;gap:28px}
.s04 .v-chip{padding:0 0 10px;font:300 15px/1 var(--sg);letter-spacing:.02em;color:var(--mut);border-bottom:1px solid transparent;white-space:nowrap}
.s04 .v-chip.on{color:var(--fg);border-bottom-color:var(--fg)}
.s04 .v-inp{height:52px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--ln);font:300 15px/1 var(--sg);letter-spacing:.02em;color:var(--mut)}
/* 规格行：最多两样，左边一句规格、右边价格，中间只留空，不画竖线 */
.s04 .v-sp{display:flex;align-items:baseline;justify-content:space-between;gap:16px;font:300 15px/1.2 var(--sg);letter-spacing:.02em;color:var(--mut);white-space:nowrap}
.s04 .v-sp .v-num{color:var(--mut)}
.s04 .v-sp .v-price{font-size:18px;font-variation-settings:"opsz" 14;color:var(--fg)}
/* 大数字行：Bodoni 大日期 + 右边两行说明它的字（周日 / 到店） */
.s04 .v-dt{display:flex;align-items:flex-end;justify-content:space-between}
.s04 .v-dt>span{font:300 14px/1.7 var(--sg);letter-spacing:.02em;color:var(--mut);text-align:right;padding-bottom:6px}
.s04 .v-dt+.v-dt{margin-top:28px;padding-top:28px;border-top:1px solid var(--ln)}
/* 轮播位置：整屏大片真能翻到下一张时才放。一页一根 1px 细线，当前那根长而亮；不写数字 */
.s04 .v-sl{position:absolute;right:24px;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:4}
.s04 .v-sl i{display:block;width:1px;height:24px;background:var(--hi);opacity:.32}
.s04 .v-sl i.on{height:56px;opacity:.9}
.s04 .v-sl.h{right:auto;flex-direction:row}
.s04 .v-sl.h i{width:24px;height:1px}
.s04 .v-sl.h i.on{width:56px;height:1px}
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
.s04 .v-item .n{margin-top:14px;font:300 15px/1.4 var(--sg);letter-spacing:.02em}
.s04 .v-item .v-price{display:block;margin-top:8px;font-size:16px}
/* App 顶栏：左右 1px 细线图形，正中字标或页面标题 */
.s04 .v-nav{position:relative;height:60px;margin:0 24px;display:flex;align-items:center;justify-content:space-between;color:var(--hi);z-index:4}
.s04 .v-nav>.c{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap}
.s04 .v-nav .t{font:300 17px/1 var(--sg);letter-spacing:.04em}
.s04 .v-nav .r{min-width:24px;display:flex;justify-content:flex-end;font:300 15px/1 var(--sg);letter-spacing:.02em;white-space:nowrap}
.s04 .v-nav .ln{min-width:24px;height:44px;display:flex;align-items:center}
/* 字标：中文名用细宋体做大，字距只在 26px 以上的字标上拉开（.24em，官网大字标 .3em）
   客户本来有英文名才用 Bodoni Moda，照原本的大小写、不拉字距、不小于 14px。默认 26px 顶栏用，md 30px 展示板，xl 112px 官网首屏 */
.s04 .v-logo{text-align:center;color:var(--hi);line-height:1;white-space:nowrap;text-transform:none}
.s04 .v-logo b{display:block;font:300 26px/1 var(--sg);letter-spacing:.24em;padding-left:.24em}
.s04 .v-logo b.en{font:400 25px/1 var(--bd);font-variation-settings:"opsz" 18;letter-spacing:.02em;padding-left:0}
.s04 .v-logo.md b{font-size:30px}
.s04 .v-logo.md b.en{font-size:29px}
.s04 .v-logo.xl b{font:200 112px/1 var(--sg);letter-spacing:.3em;padding-left:.3em}
.s04 .v-logo.xl b.en{font:400 96px/1 var(--bd);font-variation-settings:"opsz" 24;letter-spacing:.01em;padding-left:0}
/* 底部标签栏：只有字，当前项变亮，没有图标、没有色块、没有圆点 */
.s04 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;border-top:1px solid var(--ln);display:flex;justify-content:space-around;padding:20px 18px 0;background:var(--pg);font:300 15px/1 var(--sg);letter-spacing:.02em;color:var(--mut);z-index:6}
.s04 .v-tabs>div.on{color:var(--fg)}
/* 网页 */
.s04.web{background:var(--k);color:var(--iv);font-family:var(--sg)}
.s04.web .v-h1{font-size:52px}
.s04.web .v-en{font-size:24px}
.s04.web .v-ttl .v-en{margin-top:16px}
.s04 .v-wnav{position:absolute;left:64px;right:64px;top:44px;height:46px;display:flex;align-items:center;justify-content:space-between;font:300 17px/1 var(--sg);letter-spacing:.04em;color:var(--hi);z-index:4}
.s04 .v-wnav .a,.s04 .v-wnav .b{display:flex;gap:48px;align-items:center;white-space:nowrap}
.s04 .v-wnav .b{gap:36px}
.s04 .v-wnav .b .lg{font:400 17px/1 var(--bd);font-variation-settings:"opsz" 14;letter-spacing:.02em}
.s04 .v-wnav .v-btn{height:46px;padding:0 28px;font-size:17px;color:var(--hi);border-color:var(--fr)}
.s04 .v-wnav>.c{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.s04.web>.v-logo.xl{position:absolute;left:0;right:0;top:344px}
.s04 .v-cue{position:absolute;left:50%;bottom:0;width:1px;height:72px;background:rgba(242,237,228,.6);z-index:4}
/* 展示板舞台：暖黑聚光 */
.s04.v-stage{position:absolute;inset:0;background:radial-gradient(ellipse 72% 56% at 50% 46%,#38332E 0%,#16130F 64%,#0D0C0B 100%)}
.s04.v-stage .v-logo{position:absolute;left:96px;top:56px;text-align:left}
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
  // 英文字标不全大写：四个字母以上的全大写词只留首字母大写（缩写 TTF、DR 这类三个字母以内的不动）
  const unCaps = (t) => String(t).replace(/\b[A-Z]{4,}\b/g, (w) => w[0] + w.slice(1).toLowerCase());
  const bgStyle = (src, pos, size, filter) => `background-image:url(${src});background-position:${pos};background-size:${size}${filter ? `;filter:${filter}` : ''}`;
  const ui = {
    // 细线图形：glyph('back' | 'close' | 'menu')
    glyph: (name) => G[name] || '',
    // lucide 图标按这个风格的线宽画（1px）：ic('search', 20)
    ic: (name, size = 20) => icon(name, size, 1),
    // 字标：logo('辰璧') 中文名细宋体；客户本来就有英文名时 logo('中文名', 'English Name')，只显示英文（Bodoni，照原本大小写），中文名放进 aria-label
    // 第三个参数 { size: '' | 'sm' | 'md' | 'xl', fs, ls }：默认和 sm 是顶栏 26px，md 展示板 30px，xl 官网首屏 112px；fs 字号 px、ls 字距 em，名字长到顶栏字标超过 200px 宽时收一收
    logo: (name, en = '', { size = '', fs = 0, ls = 0 } = {}) => {
      if (en) {
        const st = fs ? ` style="font-size:${Math.max(14, fs)}px"` : '';
        return `<div class="v-logo ${size}" aria-label="${name}"><b class="en"${st}>${unCaps(en)}</b></div>`;
      }
      const st = fs || ls ? ` style="${fs ? `font-size:${fs}px;` : ''}${ls ? `letter-spacing:${ls}em;padding-left:${ls}em` : ''}"` : '';
      return `<div class="v-logo ${size}"><b${st}>${name}</b></div>`;
    },
    // App 顶栏：title 传字（页面标题）或 HTML（比如 ui.logo('辰璧')）；left 换掉返回键（比如 ui.glyph('menu')）；right 传图标或一个词
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left ? `<div class="ln">${left}</div>` : back ? `<div class="ln" data-back>${G.back}</div>` : '<span class="ln"></span>'}${title ? `<div class="c">${String(title).trim().startsWith('<') ? title : `<div class="t">${title}</div>`}</div>` : ''}${right ? `<div class="r">${right}</div>` : '<span class="ln"></span>'}</div>`,
    // 底部标签栏：items 照约定传 [['house','首页'], …]，这个风格只显示字、不画图标，当前项变亮
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
    // 名字块：title('见山套房')；en 只给本来就是外文的名字（进口香水、酒款、外国作品），不给中文名配译名
    title: (cn, en = '') => `<div class="v-ttl"><div class="v-h1">${cn}</div>${en ? `<div class="v-en">${en}</div>` : ''}</div>`,
    // 金色细线（一屏最多一条）：hair(44)
    hair: (w = 36, style = '') => `<i class="v-au" style="width:${w}px;${style}"></i>`,
    // 轮播位置（整屏大片真能翻到下一张时才放）：slides(1, 3, { top: 300 }) 竖排贴右边；slides(1, 3, { dir: 'h', style: 'left:28px;top:540px' }) 横排
    slides: (cur, total, { dir = 'v', top = 300, style = '' } = {}) => `<div class="v-sl ${dir === 'h' ? 'h' : ''}" style="top:${top}px;${style}">${Array.from({ length: total }, (_, i) => `<i class="${i + 1 === cur ? 'on' : ''}"></i>`).join('')}</div>`,
    // 规格行，最多两样：specs('18K 白金，表径 38 mm', ui.price('268,000'))，左边一句规格、右边价格；传三样会报错，先删到两样
    specs: (...args) => {
      const items = (Array.isArray(args[0]) ? args[0] : args).filter((t) => t !== '' && t != null);
      if (items.length > 2) throw new Error('ui.specs 一行最多两样：先删，或者把规格写成一句话');
      return `<div class="v-sp">${items.map((t) => `<span>${t}</span>`).join('')}</div>`;
    },
    // 大数字行：big('11.15', '周日', '到店')，右边两行是说明这个数字的字；连着写两行自动加分隔线
    big: (num, l1 = '', l2 = '') => `<div class="v-dt"><b class="v-big">${num}</b><span>${l1}${l2 ? `<br>${l2}` : ''}</span></div>`,
    // 信息行：rows([['房型', '庭院套房'], ['入住', '两晚'], ['确认号', 'XB 2611 0704', true]])，第三项 true 用 Bodoni 数字
    rows: (list) => `<div class="v-list">${list.map(([k, v, n]) => `<div class="v-row"><span>${k}</span><b class="${n ? 'v-num' : ''}">${v}</b></div>`).join('')}</div>`,
    // 价格：price('4,800', '/晚')，¥ 用细宋体缩小上浮
    price: (amount, unit = '') => `<span class="v-price">¥${cm(amount)}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // Bodoni 数字（带千分位时用它，逗号不会看成句号）：num('1,280')
    num: (text) => `<span class="v-num">${cm(text)}</span>`,
    // cue()：官网首屏底部正中的一根竖线（往下翻）
    cue: () => '<div class="v-cue"></div>',
    // 官网顶栏：webNav(logo, links, right, cta, ctaAttrs)。links 在左；logo 在正中，首屏放大字标时传 ''；right 是语言切换（'English'）；cta 是细框按钮的字
    webNav: (logo = '', links = [], right = '', cta = '', ctaAttrs = '') => `<div class="v-wnav"><div class="a">${links.map((t) => `<span>${t}</span>`).join('')}</div>${logo ? `<div class="c">${logo}</div>` : ''}<div class="b">${right ? `<span class="lg">${right}</span>` : ''}${cta ? ui.btn(cta, { attrs: ctaAttrs }) : ''}</div></div>`,
    // 展示板装饰（demo 里写 boardTitle: '', boardDeco: S.ui.stage('辰璧')）：暖黑聚光 + 左上角字标；有英文名时 stage('中文名', 'English Name')
    stage: (name = '', en = '') => `<div class="s04 v-stage">${name || en ? ui.logo(name, en, { size: 'md' }) : ''}</div>`,
  };
  return { key: 's04-luxury', no: 4, name: '黑白奢感', root: 's04', T, css, ui, stage: '#0D0C0B', dark: true };
};
