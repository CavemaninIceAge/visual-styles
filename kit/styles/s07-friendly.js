// 07 亲和圆润 Friendly —— 起手包
// 色值、字号、圆角、阴影、滤镜照图册模块 catalog/pages/s07-friendly.js（毛球）原样取
// 用法：const S = style('s07-friendly'); 屏幕根元素 <div class="scr s07">；组件见 S.ui
// 换品牌色：项目 CSS 写 .p{--c:#客户色}，主按钮、阴影、选中圈、浅色底（--cs）一起跟着变；展示板底色在 demo 里写 stage
// 字体：模块正文用的苹方是苹果系统字体，可点击 HTML 要在安卓上也对，这里正文换思源黑体（苹方垫后）；头像首字的圆体（模块用 Yuanti SC）换寒蝉全圆体
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#FFFFFF',          // 纯白：页面底色
    surface: '#F4F3F1',     // 浅灰：图标方块、圆按钮、日期时间胶囊、服务卡的底（卡片没有白底和阴影，靠浅灰块）
    ink: '#23201D',         // 墨色：主字色，也是「选中」的填色（日期、时间）
    ink2: '#8E8984',        // 暖灰：次要信息
    line: '#EFEDEA',        // 标签栏、底部操作条、网页顶栏上面那条 1px 线
    primary: '#F0545C',     // 毛球珊瑚：主按钮、当前标签、选中头像外圈；一屏一到两处
    onPrimary: '#FFFFFF',
    accents: {
      soft: '#FFE8E9',      // 珊瑚浅底：网页导航当前项（换色后用 var(--cs) 自动算）
      off: '#ABA6A1',       // 没选中的标签栏图标和字
      stroke: '#E2DFDB',    // 次按钮（描边胶囊）的 1.5px 边
      gone: '#C9C5C0',      // 约满 / 不可选的字（另加删除线）
      avCoral: '#F77C83',   // 头像三档柔色渐变的深端：珊瑚
      avBlue: '#7FA5DE',    // 雾蓝
      avApricot: '#F2AE5E', // 杏黄
    },
    fonts: { title: '"Noto Sans SC"', body: '"Noto Sans SC"', num: '"Nunito"', avatar: '"Chill Round"' },  // 标题 900、正文 400–600、数字 800–900、头像首字 700
    radius: 24,             // 照片卡；大照片 32，服务卡 28，图标方块 22，按钮 / 胶囊 / 头像全圆
    border: null,           // 不描边（只有网页的次按钮有一圈 1.5px #E2DFDB）
    shadow: '0 12px 24px -12px rgba(240,84,92,.7)',   // 只给主按钮：主色的柔光往下沉；网页浮签用 0 10px 24px -14px rgba(35,32,29,.5)
    margin: 24,
    photo: 'saturate(1.08) brightness(1.04) contrast(1.02)',
  };
  const A = T.accents;
  const HV = '"Noto Sans SC","PingFang SC",sans-serif';      // 标题：思源黑体 900
  const SANS = '"Noto Sans SC","PingFang SC",sans-serif';    // 正文、标签
  const NU = '"Nunito","Noto Sans SC",sans-serif';           // 数字
  const AV = '"Chill Round","Noto Sans SC",sans-serif';      // 头像首字
  // 头像底：同一方向、同一明度的三档柔色渐变（珊瑚、雾蓝、杏黄）
  // 第一档跟品牌走：CSS 变量 --av0，默认是图册的珊瑚渐变；换主色时项目里写 --av0，浅端主色占 45%、深端占 78%（公式见风格说明）
  const GR0 = 'linear-gradient(150deg,#FFB4A6 0%,#F77C83 100%)';
  const GR = ['var(--av0)', 'linear-gradient(150deg,#AFCDF0 0%,#7FA5DE 100%)', 'linear-gradient(150deg,#FFD49C 0%,#F2AE5E 100%)'];
  const css = `
.s07{--c:${T.primary};--av0:${GR0};--cs:color-mix(in srgb,var(--c) 14%,#fff);--csh:color-mix(in srgb,var(--c) 70%,transparent);--g:${T.surface};--m:${T.ink2};--k:${T.ink};--ln:${T.line};--off:${A.off};background:${T.bg};color:var(--k);font-family:${SANS};font-size:15px;line-height:1.5}
.s07 i,.s07 em,.s07 u{font-style:normal;text-decoration:none}
.s07 .v-pad{padding-left:24px;padding-right:24px}
/* 字：标题思源黑体 900 大字号；正文 15–17px 中等字重；数字 Nunito 特粗 */
.s07 .v-h1{font:900 38px/1.15 ${HV};letter-spacing:.01em}
.s07 .v-h2{font:900 24px/1.15 ${HV}}
.s07 .v-h3{font:600 19px/1.2 ${SANS}}
.s07 .v-tx{font:400 16px/1.65 ${SANS}}
.s07 .v-mut{font:500 14px/1.4 ${SANS};color:var(--m)}
.s07 .v-num{font-family:${NU};font-weight:800}
.s07 .v-big{font:900 64px/1 ${NU};letter-spacing:-.01em}
.s07 .v-big small{font-size:.42em;margin-left:4px}
.s07 .v-price{display:inline-block;font:900 28px/1 ${NU};white-space:nowrap}
.s07 .v-price::first-letter{font-size:.62em;margin-right:2px}
.s07 .v-price small{font:500 14px/1 ${SANS};color:var(--m);margin-left:3px}
.s07 .v-stat{display:flex;align-items:baseline;gap:6px;font:500 14px/1 ${SANS};color:var(--m);white-space:nowrap}
.s07 .v-stat b{font:900 22px/1 ${NU};color:var(--k);letter-spacing:.01em}
/* 一行灰字信息：★ 4.9 · 1.2 km · 10:00–21:00，评分那一段用墨色 */
.s07 .v-mt{display:flex;align-items:center;gap:5px;font:500 14px/1 ${SANS};color:var(--m);white-space:nowrap}
.s07 .v-mt .st{color:var(--k)}
/* 主按钮：58px 全圆胶囊、主色、白色特粗字、主色柔光往下沉 */
.s07 .v-btn{height:58px;padding:0 32px;border-radius:29px;background:var(--c);color:${T.onPrimary};display:inline-flex;align-items:center;justify-content:center;gap:8px;font:900 19px/1 ${HV};letter-spacing:.08em;white-space:nowrap;box-shadow:0 12px 24px -12px var(--csh)}
.s07 .v-btn>span{margin-right:-.08em}
.s07 .v-btn.wide{display:flex;width:100%}
.s07 .v-btn.ghost{background:var(--g);color:var(--k);box-shadow:none}
.s07 .v-btn.line{background:#fff;color:var(--k);border:1.5px solid ${A.stroke};box-shadow:none;font:600 16px/1 ${SANS};letter-spacing:0}
.s07 .v-btn.sm{height:48px;border-radius:24px;padding:0 24px;font-size:16px}
/* 圆按钮：浅灰圆底（返回、电话、收藏）；.lg 58px 配主按钮并排 */
.s07 .v-rb{width:44px;height:44px;border-radius:50%;background:var(--g);display:grid;place-items:center;color:var(--k);flex:none}
.s07 .v-rb.lg{width:58px;height:58px}
/* 照片：同一组微提亮、微加饱和；大照片圆角 24–32，没有边框和阴影 */
.s07 .ph{background-size:cover;background-position:center;filter:${T.photo}}
.s07 .v-photo{position:relative;border-radius:24px}
/* 卡片：大圆角照片在上，字放在照片下面（不加白底、不加阴影） */
.s07 .v-card{position:relative}
.s07 .v-card>.ph{height:246px;border-radius:24px}
.s07 .v-card .bd{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px}
.s07 .v-card .bd .v-mt{margin-top:7px}
/* 列表：一行一块浅灰圆角块，左边白圆里放图标 */
.s07 .v-list{display:flex;flex-direction:column;gap:12px}
.s07 .v-row{display:flex;align-items:center;gap:14px;min-height:76px;padding:14px 18px;border-radius:24px;background:var(--g)}
.s07 .v-row>i{flex:none;width:48px;height:48px;border-radius:50%;background:#fff;display:grid;place-items:center;color:var(--c)}
.s07 .v-row .v-h3{font-size:17px}
.s07 .v-row .v-mut{margin-top:5px}
.s07 .v-row>:last-child{margin-left:auto}
/* 选项：浅灰胶囊，选中填墨色（不用主色，主色留给按钮） */
.s07 .v-chips{display:flex;gap:10px;flex-wrap:wrap}
.s07 .v-chip{height:42px;padding:0 20px;border-radius:21px;background:var(--g);display:inline-flex;align-items:center;gap:6px;font:600 15px/1 ${SANS};white-space:nowrap}
.s07 .v-chip.on{background:var(--k);color:#fff}
.s07 .v-chip.off{color:${A.gone};text-decoration:line-through}
.s07 .v-inp{height:54px;border-radius:27px;background:var(--g);display:flex;align-items:center;gap:10px;padding:0 20px;font:500 16px/1 ${SANS};color:var(--m)}
/* 顶栏、字标、标签栏 */
.s07 .v-nav{position:relative;height:44px;margin:6px 24px 0;display:flex;align-items:center;justify-content:space-between}
.s07 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:600 17px/1 ${SANS};white-space:nowrap}
.s07 .v-logo{display:flex;align-items:center;gap:7px}
.s07 .v-logo b{font:900 24px/1 ${HV};letter-spacing:.02em;color:var(--k);white-space:nowrap}
.s07 .v-logo em{font:800 12px/1 ${NU};letter-spacing:.14em;color:var(--m);margin-left:2px}
.s07 .v-ini{border-radius:50%;background:var(--c);color:#fff;display:grid;place-items:center;font-family:${HV};font-weight:900;flex:none}
.s07 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;background:#fff;border-top:1px solid var(--ln);display:grid;padding-top:9px;z-index:6}
.s07 .v-tabs>div{position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;color:var(--off);font:600 12px/1 ${SANS}}
/* 当前项不只靠颜色：字 800、图标线宽 2.6、格子顶部一条 3px 圆头短条（色弱时橙和灰的明度差不够） */
.s07 .v-tabs>div.on{color:var(--c);font-weight:800}
.s07 .v-tabs>div.on .ic{stroke-width:2.6}
.s07 .v-tabs>div.on::before{content:"";position:absolute;left:50%;top:-9px;width:26px;height:3px;margin-left:-13px;border-radius:2px;background:var(--c)}
/* 选择胶囊：浅灰底，左边小圆头像或图标，右边小箭头（选宠物、选地址、选门店） */
.s07 .v-pill{height:44px;padding:0 14px;border-radius:22px;background:var(--g);display:inline-flex;align-items:center;gap:8px;font:600 15px/1 ${SANS};color:var(--k);white-space:nowrap}
.s07 .v-pill.av{padding-left:5px}
.s07 .v-pill [data-more]{color:var(--m);margin-left:-2px}
/* 服务入口：64px 浅灰圆角方块里一个 30px 圆头线性图标，下面两三个字 */
.s07 .v-svc{display:flex;justify-content:space-between}
.s07 .v-svc>div{display:flex;flex-direction:column;align-items:center;gap:10px;font:600 15px/1 ${SANS};white-space:nowrap}
.s07 .v-svc i{width:64px;height:64px;border-radius:22px;background:var(--g);display:grid;place-items:center;color:var(--k)}
/* 头像：柔色渐变圆 + 白色圆体首字；选中外圈白 3px + 主色 3.5px；小头像（48 以下）首字用墨色，白字在浅渐变上看不清 */
.s07 .v-av{border-radius:50%;display:grid;place-items:center;color:#fff;font-family:${AV};font-weight:700;flex:none;padding-top:2px;box-shadow:inset 0 -6px 14px rgba(255,255,255,.18),inset 0 8px 14px rgba(255,255,255,.22)}
.s07 .v-av.on{box-shadow:inset 0 -6px 14px rgba(255,255,255,.18),inset 0 8px 14px rgba(255,255,255,.22),0 0 0 3px #fff,0 0 0 6.5px var(--c)}
.s07 .v-av.sm{box-shadow:none;padding-top:1px;color:var(--k)}
.s07 .v-ppl{display:grid}
.s07 .v-ppl>div{display:flex;flex-direction:column;align-items:center}
.s07 .v-ppl b{margin-top:16px;font:600 17px/1 ${SANS}}
.s07 .v-ppl span{margin-top:7px;font:500 13px/1 ${SANS};color:var(--m);white-space:nowrap}
.s07 .v-who{display:flex;align-items:center;gap:8px;font:500 15px/1 ${SANS};color:var(--m);white-space:nowrap}
/* 日期块 56×78、时间胶囊 54 高：浅灰底，选中填墨色，约满灰字加删除线 */
.s07 .v-days{display:flex;justify-content:space-between}
.s07 .v-days>div{width:56px;height:78px;border-radius:28px;background:var(--g);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.s07 .v-days span{font:500 13px/1 ${SANS};color:var(--m)}
.s07 .v-days b{font:900 22px/1 ${NU}}
.s07 .v-days .on{background:var(--k);color:#fff}
.s07 .v-days .on span{color:rgba(255,255,255,.7)}
.s07 .v-tms{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.s07 .v-tms>div{height:54px;border-radius:27px;background:var(--g);display:grid;place-items:center;font:800 18px/1 ${NU}}
.s07 .v-tms .on{background:var(--k);color:#fff}
.s07 .v-tms .off{color:${A.gone};text-decoration:line-through}
/* 进度：一串 34px 圆点连一条 4px 圆头线；做完的主色圆里打勾，正在做的白底主色圈加实心点，没到的浅灰圆写序号 */
.s07 .v-steps{position:relative;display:grid}
.s07 .v-steps>u{position:absolute;top:15px;height:4px;border-radius:2px;background:var(--g)}
.s07 .v-steps>u.on{background:var(--c)}
.s07 .v-steps>div{position:relative;display:flex;flex-direction:column;align-items:center}
.s07 .v-steps i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 4px #fff;font:800 15px/1 ${NU}}
.s07 .v-steps .ok i{background:var(--c);color:#fff}
.s07 .v-steps .cur i{background:#fff;border:3.5px solid var(--c)}
.s07 .v-steps .cur i::after{content:"";width:11px;height:11px;border-radius:50%;background:var(--c)}
.s07 .v-steps .todo i{background:var(--g);color:var(--off)}
.s07 .v-steps b{margin-top:10px;font:600 15px/1 ${SANS};white-space:nowrap}
.s07 .v-steps .todo b{color:var(--m)}
.s07 .v-steps span{margin-top:6px;font:700 13px/1 ${NU};color:var(--m);white-space:nowrap}
.s07 .v-steps .cur span{color:var(--k)}
/* 底部：操作条（左价格右按钮）、并排的圆按钮 + 主按钮 */
.s07 .v-bar{position:absolute;left:0;right:0;bottom:0;height:112px;background:#fff;border-top:1px solid var(--ln);display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px 24px 0;z-index:6}
.s07 .v-bar .lb{display:block;font:500 14px/1 ${SANS};color:var(--m);white-space:nowrap}
.s07 .v-bar .v-price{margin-top:8px}
.s07 .v-bar .v-btn{flex:none;width:190px;padding:0}
.s07 .v-acts{position:absolute;left:24px;right:24px;bottom:42px;display:flex;gap:12px;z-index:6}
.s07 .v-acts .v-btn{flex:1}
/* 浮在照片上的白胶囊（门店、评分），只有它带一层淡墨色阴影 */
.s07 .v-float{position:absolute;z-index:2;height:56px;padding:0 22px 0 18px;border-radius:28px;background:#fff;display:flex;align-items:center;gap:10px;font:600 17px/1 ${SANS};white-space:nowrap;box-shadow:0 10px 24px -14px rgba(35,32,29,.5)}
.s07 .v-float>.ic{color:var(--c)}
.s07 .v-float em{font:500 15px/1 ${SANS};color:var(--m)}
.s07 .v-float.sm{height:44px;padding:0 16px 0 14px;gap:8px;font-size:15px}
.s07 .v-float.sm em{font-size:13px}
/* 服务卡：浅灰圆角 28 的块，左边白圆里一个主色图标，右边名称和价格 */
.s07 .v-tile{height:132px;border-radius:28px;background:var(--g);display:flex;align-items:center;gap:16px;padding:0 22px}
.s07 .v-tile>i{flex:none;width:68px;height:68px;border-radius:50%;background:#fff;display:grid;place-items:center;color:var(--c)}
.s07 .v-tile b{display:block;font:900 20px/1 ${HV};white-space:nowrap}
.s07 .v-tile .v-price{display:block;margin-top:10px;font-size:20px;color:var(--m)}
.s07 .v-tile{min-width:0}
/* 服务卡一排三个的容器（网页） */
.s07 .v-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
/* .sm：手机上两三个一排用，竖着排（白圆图标在上，名称价格在下） */
.s07 .v-tile.sm{height:auto;flex-direction:column;align-items:flex-start;gap:14px;padding:18px;border-radius:24px}
.s07 .v-tile.sm>i{width:48px;height:48px}
.s07 .v-tile.sm b{font-size:17px}
.s07 .v-tile.sm .v-price{margin-top:8px;font-size:18px}
/* 超大预约按钮（网页首屏）：左边头像、中间字、右边半透明白圆箭头 */
.s07 .v-go{height:88px;border-radius:44px;background:var(--c);display:flex;align-items:center;padding:0 10px;color:#fff;box-shadow:0 18px 34px -16px var(--csh)}
.s07 .v-go>.v-av{box-shadow:0 0 0 3px rgba(255,255,255,.9)}
.s07 .v-go b{flex:1;text-align:center;font:900 28px/1 ${HV};letter-spacing:.06em;margin-right:14px;white-space:nowrap}
.s07 .v-go u{flex:none;width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center}
/* 网页 */
.s07.web{background:#fff}
.s07 .v-wnav{height:96px;margin:0 64px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--ln)}
.s07 .v-wnav .v-logo b{font-size:30px}
.s07 .v-wnav .rt{display:flex;align-items:center;gap:12px}
.s07 .v-wnav .v-pill{height:48px;border-radius:24px;padding:0 16px 0 14px;font-size:16px;gap:7px}
.s07 .v-cats{display:flex;gap:6px}
.s07 .v-cats>span{height:46px;padding:0 22px;border-radius:23px;display:flex;align-items:center;font:600 17px/1 ${SANS};color:var(--m);white-space:nowrap}
.s07 .v-cats>.on{background:var(--cs);color:var(--c);font-weight:800}
`;
  // 品牌记号：ui.mark(32, 'var(--c)', 'bubble')，参数是尺寸、颜色、kind。粗圆的几何小图形，填主色。kind：'ears' 两只圆角耳朵的毛球（宠物）、'bubble' 一大一小两个泡泡（洗护、清洁）、'home' 圆角小房子（家居、社区）、'drop' 水滴（饮品、洗衣）
  const mark = (s = 32, c = 'var(--c)', kind = 'ears') => {
    const f = `style="fill:${c};stroke:${c}"`;
    const body = {
      ears: `<g ${f} stroke-width="3.4" stroke-linejoin="round"><path d="M7.4 12.6 8.4 5 14 8.6Z"/><path d="M24.6 12.6 23.6 5 18 8.6Z"/></g><circle cx="16" cy="18.8" r="11.6" style="fill:${c}"/>`,
      bubble: `<circle cx="13.6" cy="18.4" r="11.2" style="fill:${c}"/><circle cx="26" cy="7.4" r="4.6" style="fill:${c}"/><path d="M7.6 17.2a6.4 6.4 0 0 1 5-5.6" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>`,
      home: `<path d="M5.6 15.2 16 5.6l10.4 9.6V26.4H5.6Z" ${f} stroke-width="3.6" stroke-linejoin="round"/><circle cx="16" cy="19.4" r="3.2" fill="#fff"/>`,
      drop: `<path d="M16 3.6C16 3.6 6.4 14 6.4 20.2a9.6 9.6 0 0 0 19.2 0C25.6 14 16 3.6 16 3.6Z" ${f} stroke-width="1.6" stroke-linejoin="round"/><path d="M11.4 20.6a4.8 4.8 0 0 0 3.4 4.2" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`,
    }[kind];
    return `<svg width="${s}" height="${s}" viewBox="0 0 32 32">${body}</svg>`;
  };
  // 首字圆章：ui.initial('半', 36)，参数是一个字和直径；主色圆里一个白色粗黑字（图册「半山咖啡」的字标）
  const initial = (ch, s = 36) => `<i class="v-ini" style="width:${s}px;height:${s}px;font-size:${Math.round(s * 0.5)}px">${ch}</i>`;
  // 头像：avatar('唐', { s: 88, tone: 0, on: true })；tone 0 珊瑚 1 雾蓝 2 杏黄；photo 传图片地址和位置就是照片头像（比如宠物脸）
  const avatar = (ch, { s = 88, tone = 0, on = false, photo = '', pos = '50% 50%', zoom = 0 } = {}) => {
    const bg = photo ? `background:url(${photo}) ${pos}/${zoom ? Math.round(s * zoom) + 'px auto' : 'cover'} no-repeat` : `background:${GR[tone % 3]}`;
    return `<i class="v-av ${on ? 'on' : ''} ${s < 48 ? 'sm' : ''}" style="width:${s}px;height:${s}px;font-size:${Math.round(s * (s < 48 ? 0.5 : 0.42))}px;${bg}">${photo ? '' : ch}</i>`;
  };
  const ui = {
    mark, initial, avatar,
    // grads：头像三档渐变的数组 [var(--av0), 雾蓝, 杏黄]，要自己画头像底时取 ui.grads[1]
    grads: GR,
    // 字标：记号 + 特粗黑体名；sym 不传就用品牌名首字圆章；en 可选（Nunito 小字宽字距）
    logo: (name, en = '', sym = '') => `<div class="v-logo">${sym || initial(name[0], 34)}<b>${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左边浅灰圆返回键，标题居中（大多数屏不写标题，标题用下面的 .v-h1 大字），right 放 ui.pill / ui.rb / .v-stat
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<div class="v-rb" data-back>${icon('chevron-left', 24, 2.2)}</div>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 浅灰圆按钮：rb('phone')；lg 为 true 是 58px（和主按钮并排）
    rb: (name, { lg = false, attrs = '' } = {}) => `<div class="v-rb ${lg ? 'lg' : ''}" ${attrs}>${icon(name, lg ? 22 : 20, 2)}</div>`,
    // 底部标签栏：白底、上面 1px 浅线，26px 圆头图标 + 12px 字，当前项主色
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs" style="grid-template-columns:repeat(${items.length},1fr)">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(ic, 26, 2)}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：默认不带图标；cls 'wide' 通栏、'ghost' 浅灰、'line' 描边、'sm' 48 高
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}><span>${text}</span>${ic ? icon(ic, 20, 2.6) : ''}</div>`,
    // 选择胶囊：pill('豆豆', { av: avatar('',{s:34,photo,…}) }) 或 pill('望京店', { ic: 'map-pin', hi: true })；hi 让图标变主色
    pill: (text, { av = '', ic = '', hi = false, more = true, attrs = '' } = {}) => `<div class="v-pill ${av ? 'av' : ''}" ${attrs}>${av}${ic ? icon(ic, 18, 2.2, hi ? 'style="color:var(--c)"' : '') : ''}${text}${more ? icon('chevron-down', 16, 2.4, 'data-more') : ''}</div>`,
    // 一行灰字信息：meta(['★ 4.9', '1.2 km', '10:00–21:00'])，★ 开头的那段用墨色
    meta: (items) => `<div class="v-mt">${items.map((t) => `<span class="${String(t).startsWith('★') ? 'st' : ''}">${t}</span>`).join('<span>·</span>')}</div>`,
    // 服务入口：svc([['bath','洗澡'],…], ['book', …])，四个一排两端对齐
    svc: (items, go = []) => `<div class="v-svc">${items.map(([ic, t], i) => `<div ${go[i] ? `data-go="${go[i]}"` : ''}><i>${icon(ic, 30, 2)}</i>${t}</div>`).join('')}</div>`,
    // 大圆角照片：photo(img('xxx'), { h: 380, r: 32, pos: '50% 40%', size: 'auto 150%', extra: ui.float(…) })
    photo: (src, { h = 246, r = 24, pos = '50% 50%', size = 'cover', extra = '', attrs = '', cls = '' } = {}) => `<div class="v-photo ${cls}" style="height:${h}px;border-radius:${r}px" ${attrs}><div class="ph" style="position:absolute;inset:0;border-radius:${r}px;background-image:url(${src});background-position:${pos};background-size:${size}"></div>${extra}</div>`,
    // 照片卡：card({ src, h, pos, size, title, meta, right, attrs })，和别的风格一样传对象，也接受 card(src, { … })；size 放大照片好裁掉边上的杂物（比如 '135% auto'），right 放价格或圆按钮
    card: (a, b = {}) => {
      const { src, h = 246, pos = '50% 50%', size = 'cover', title = '', meta = [], right = '', attrs = '' } = typeof a === 'string' ? { ...b, src: a } : (a || {});
      return `<div class="v-card" ${attrs}><div class="ph" style="height:${h}px;background-image:url(${src});background-position:${pos};background-size:${size}"></div><div class="bd"><div><div class="v-h3">${title}</div>${meta.length ? ui.meta(meta) : ''}</div>${right}</div></div>`;
    },
    // 选人：people([['唐','小唐','★ 4.9'],…], 0)，一排三个 88px 头像，选中的带主色外圈；tone 按顺序 0/1/2
    people: (items, cur = 0, { s = 88 } = {}) => `<div class="v-ppl" style="grid-template-columns:repeat(${items.length},1fr)">${items.map(([ch, n, sub], i) => `<div>${avatar(ch, { s, tone: i, on: i === cur })}<b>${n}</b>${sub ? `<span>${sub}</span>` : ''}</div>`).join('')}</div>`,
    // 头像 + 一行灰字：who('唐', '小唐 · 望京店')
    who: (ch, text, { tone = 0 } = {}) => `<div class="v-who">${avatar(ch, { s: 30, tone })}${text}</div>`,
    // 日期：days([['今天',28],['周六',31]], 1)
    days: (items, cur = 0) => `<div class="v-days">${items.map(([w, d], i) => `<div class="${i === cur ? 'on' : ''}"><span>${w}</span><b>${d}</b></div>`).join('')}</div>`,
    // 时间：times(['10:00','11:30',…], 3, [5])，第三个参数是约满的序号
    times: (items, cur = 0, off = []) => `<div class="v-tms">${items.map((t, i) => `<div class="${i === cur ? 'on' : off.includes(i) ? 'off' : ''}">${t}</div>`).join('')}</div>`,
    // 进度：steps([['到店','14:30'],…], done)；done = 做完了几步，下一步是「正在做」，再往后是「没到」
    steps: (items, done = items.length) => {
      const n = items.length, half = 50 / n, cur = Math.min(done, n - 1);
      return `<div class="v-steps" style="grid-template-columns:repeat(${n},1fr)"><u style="left:${half}%;right:${half}%"></u><u class="on" style="left:${half}%;width:${(cur * 100) / n}%"></u>${items.map(([t, sub], i) => {
        const st = i < done ? 'ok' : i === done ? 'cur' : 'todo';
        return `<div class="${st}"><i>${st === 'ok' ? icon('check', 18, 3) : st === 'todo' ? i + 1 : ''}</i><b>${t}</b>${sub ? `<span>${sub}</span>` : ''}</div>`;
      }).join('')}</div>`;
    },
    // 底部操作条：bar('精致洗护 · 豆豆', '¥198', ui.btn('确认预约', …))
    bar: (label, price, btn) => `<div class="v-bar"><div><span class="lb">${label}</span><span class="v-price">${price}</span></div>${btn}</div>`,
    // 底部并排：圆按钮 + 主按钮：acts(ui.rb('phone', { lg: true }), ui.btn('去接豆豆'))
    acts: (rb, btn) => `<div class="v-acts">${rb}${btn}</div>`,
    // 浮在照片上的白胶囊：float('store', '望京店', '★ 4.9 · 1.2 km', { pos: 'left:20px;bottom:20px', sm: true })
    float: (ic, text, em = '', { pos = 'left:20px;bottom:20px', sm = false } = {}) => `<div class="v-float ${sm ? 'sm' : ''}" style="${pos}">${ic ? icon(ic, sm ? 18 : 20, 2.2) : ''}${text}${em ? `<em>${em}</em>` : ''}</div>`,
    // 服务卡：tile('bath', '基础洗澡', '¥98', { sm, attrs })；网页一排三个用默认（横排 132 高），手机两三个一排用 sm（竖排）
    tile: (ic, title, price, { sm = false, attrs = '' } = {}) => `<div class="v-tile ${sm ? 'sm' : ''}" ${attrs}><i>${icon(ic, sm ? 24 : 32, 2)}</i><div><b>${title}</b><span class="v-price">${price}</span></div></div>`,
    // 超大预约按钮：go('给豆豆预约洗澡', { av: avatar('',{s:68,photo…}), w: 480, attrs })
    go: (text, { av = '', w = 480, attrs = '' } = {}) => `<div class="v-go" style="width:${w}px" ${attrs}>${av}<b>${text}</b><u>${icon('arrow-right', 30, 2.6)}</u></div>`,
    // 网页导航分类：cats(['洗澡','美容','寄养'], 0)，当前项主色浅底
    cats: (items, cur = 0) => `<div class="v-cats">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}">${t}</span>`).join('')}</div>`,
  };
  return { key: 's07-friendly', no: 7, name: '亲和圆润', root: 's07', T, css, ui, stage: '#FDE6E7', dark: false };
};
