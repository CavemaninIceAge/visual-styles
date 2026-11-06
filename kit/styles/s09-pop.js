// 09 撞色波普 Bold Pop —— 起手包
// 色值、字体、字号、按钮、波浪、爆炸星、闪星、斜色块、飘带都照图册模块 catalog/pages/s09-pop.js（啵啵 BOBO）原样取
// 用法：const S = style('s09-pop'); 屏幕根元素 <div class="scr s09">（默认电光紫底、白字）；整屏黄底写 <div class="scr s09 v-c-y">
// 画面靠四样东西撑：两三种高饱和色大块撞色、超大倾斜的庆科黄油体、歪着出框的色块和贴纸、星星 / 波浪 / 爆炸星这类平面图形
// 图册正文用苹方，这里换成开源的思源黑体（交 HTML 时安卓上也一样）；字号字距照旧
// 换配色：const S = style('s09-pop'); S.recolor({ bg, primary, red, pink, ink, deep }); 之后再取 S.ui、S.T。T、css、组件默认色全部跟着换
module.exports = function starter(L, over = {}) {
  const { icon } = L;
  const T = {
    bg: over.bg || '#5A2DF4',          // 电光紫：整屏底色（默认）
    surface: '#FFFFFF',     // 白：贴纸的模切白边、二维码卡、输入框、列表行
    ink: '#FFFFFF',         // 紫底上的字是白的；黄、红、粉色块上的字自动换成墨黑（.v-c-* 换）
    ink2: 'rgba(255,255,255,.75)',
    line: over.ink || '#17121F',        // 墨黑：波浪线、步骤圈的边（这个风格不用分割线）
    primary: over.primary || '#FFEE38', // 荧光黄：紫底上的主按钮、当前分类、价格高亮、波浪和标签栏
    onPrimary: over.ink || '#17121F',
    accents: {
      red: over.red || '#FF5233',       // 番茄红：爆炸星价格贴、飘带、第二块撞色
      pink: over.pink || '#FFB3C1',     // 蜜桃粉：第三块撞色
      ink: over.ink || '#17121F',       // 墨黑：黄底上的主按钮、底部购物条、黄红粉色块上的字
      deep: over.deep || '#4420D2',     // 深一档的紫：紫底上要再分一层时用（照片暗部、参考页舞台）
    },
    fonts: { title: '"ZCOOL QingKe HuangYou"', body: '"Noto Sans SC"', num: '"Bricolage Grotesque"' },  // 数字一律 800 + font-stretch:75%
    radius: 28,             // 卡片；按钮、购物条、标签全圆（高度一半）
    border: null,           // 不描边（和新粗野主义拉开）
    shadow: null,           // 不加阴影：靠撞色分层
    margin: 24,
    photo: 'saturate(1.2) contrast(1.08)',   // 普通照片；要和色卡融成一体用 ui.pic 的双色调
  };
  const P = T.bg, Y = T.primary, { red: R, pink: PK, ink: K, deep: DP } = T.accents;
  const QK = '"ZCOOL QingKe HuangYou","Noto Sans SC",sans-serif';
  const BG = '"Bricolage Grotesque",sans-serif';
  const SANS = '"Noto Sans SC",sans-serif';
  let uid = 0;

  const css = `
.s09{--p:${P};--y:${Y};--r:${R};--pk:${PK};--k:${K};--dp:${DP};--fg:#fff;--hl:var(--y);--big:var(--y);--bgc:var(--p);background:var(--p);color:var(--fg);font-family:${SANS};font-weight:500;font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.s09 .v-pad{padding-left:24px;padding-right:24px}
.s09 .v-ab{position:absolute}
/* 显示字：站酷庆科黄油体本身窄，横向放大 1.12、斜切 -10°，再描一圈同色细边加粗 */
.s09 .v-qk{font-family:${QK};font-weight:400;line-height:1;white-space:nowrap;letter-spacing:.02em;-webkit-text-stroke:.012em currentColor}
.s09 .v-sk{display:inline-block;transform:skewX(-10deg) scaleX(1.12);transform-origin:0 100%}
.s09 .v-sk.r{transform-origin:100% 100%}
.s09 .v-h1{display:block;width:max-content;font:400 90px/1 ${QK};letter-spacing:.02em;white-space:nowrap;color:var(--hl);-webkit-text-stroke:.016em currentColor;transform:rotate(-4deg) skewX(-10deg) scaleX(1.14);transform-origin:0 100%}
.s09 .v-h2{display:block;width:max-content;font:400 48px/1 ${QK};letter-spacing:.02em;white-space:nowrap;color:var(--hl);-webkit-text-stroke:.012em currentColor;transform:skewX(-10deg) scaleX(1.12);transform-origin:0 100%}
.s09 .v-h2.r{transform-origin:100% 100%;margin-left:auto}
.s09 .v-h3{display:inline-block;font:400 28px/1.1 ${QK};letter-spacing:.02em;white-space:nowrap;color:var(--hl);-webkit-text-stroke:.01em currentColor;transform:skewX(-10deg);transform-origin:0 100%}
.s09 .v-tx{font:500 15px/1.6 ${SANS}}
.s09 .v-mut{font:600 14px/1.4 ${SANS};opacity:.75}
/* 色块上的小粗字：舞台、件数、规格这类跟在大字旁边的信息 */
.s09 .v-lb{font:700 15px/1 ${SANS};white-space:nowrap}
.s09 .v-num{font-family:${BG};font-weight:800;font-stretch:75%;letter-spacing:-.01em}
.s09 .v-tx .v-num,.s09 .v-mut .v-num{font-size:1.14em}
/* 主角大数字（取单号、日期、分数）：窄粗、斜切、轻转；紫底上是荧光黄，黄 / 粉底上是电光紫 */
.s09 .v-big{display:block;width:max-content;font:800 200px/1 ${BG};font-stretch:75%;letter-spacing:-.03em;white-space:nowrap;color:var(--big);transform:skewX(-8deg) rotate(-4deg);transform-origin:0 100%}
/* 日期、时间这类带标点的大数字（ui.big 生成）：字距 -.03em 到了 200px 以上 1、0、7 和点会粘成一块，字距归零，点再单独拉开 */
.s09 .v-big.dt{letter-spacing:0}
.s09 .v-big .v-pt{margin:0 .03em}
/* 价格：¥ 缩小上提，后缀用正文字 */
.s09 .v-price{display:inline-block;font:800 36px/1 ${BG};font-stretch:75%;letter-spacing:-.01em;white-space:nowrap}
.s09 .v-price::first-letter{font-size:.56em;vertical-align:.32em;margin-right:.04em}
.s09 .v-price small{font:700 .4em/1 ${SANS};letter-spacing:0;margin-left:.2em}
/* 按钮：墨黑胶囊、荧光黄字、字距 .12em（放在黄色块上）；.y 是紫底上的黄胶囊；.ghost 是一圈粗边的次按钮 */
.s09 .v-btn{height:60px;padding:0 30px;display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:30px;background:var(--k);color:var(--y);font:700 19px/1 ${SANS};letter-spacing:.12em;white-space:nowrap}
.s09 .v-btn.wide{display:flex;width:100%}
.s09 .v-btn.y{background:var(--y);color:var(--k)}
.s09 .v-btn.ghost{background:transparent;color:inherit;box-shadow:inset 0 0 0 3px currentColor}
.s09 .v-btn.sm{height:50px;padding:0 26px;border-radius:25px;font-size:17px;letter-spacing:.08em}
.s09 .v-round{width:40px;height:40px;border-radius:50%;background:var(--k);color:var(--y);display:grid;place-items:center;flex:none}
/* 卡片：一整块纯色、大圆角，不描边不加影；贴纸可以压出卡片边 */
.s09 .v-card{position:relative;border-radius:28px;background:var(--y);--fg:var(--k);--hl:var(--k);--big:var(--p);--bgc:var(--y);color:var(--fg)}
.s09 .v-card>.ph{height:180px;border-radius:28px 28px 0 0}
.s09 .v-card .bd{padding:18px 22px 22px}
/* 列表：白色胶囊行，像一排贴纸 */
.s09 .v-list{display:flex;flex-direction:column;gap:10px}
.s09 .v-row{display:flex;align-items:center;gap:14px;min-height:64px;padding:10px 12px 10px 22px;border-radius:32px;background:#fff;--fg:var(--k);--hl:var(--k);--big:var(--p);--bgc:#fff;color:var(--fg)}
/* 筛选：粗边胶囊，选中是墨黑底荧光黄字（任何底色上都看得见） */
.s09 .v-chips{display:flex;gap:10px;flex-wrap:wrap}
.s09 .v-chip{height:40px;padding:0 18px;display:inline-flex;align-items:center;border-radius:20px;box-shadow:inset 0 0 0 2.5px currentColor;font:700 15px/1 ${SANS};letter-spacing:.04em;white-space:nowrap}
.s09 .v-chip.on{background:var(--k);color:var(--y);box-shadow:none}
/* 大字分类（图册菜单页）：当前一项大一号、变荧光黄，其余小、半透明 */
.s09 .v-cat{display:flex;align-items:baseline;gap:22px;white-space:nowrap}
.s09 .v-cat span{font:400 22px/1 ${QK};letter-spacing:.02em;opacity:.55;display:inline-block;transform:skewX(-10deg)}
.s09 .v-cat span.on{font-size:34px;color:var(--hl);opacity:1;-webkit-text-stroke:.012em currentColor}
.s09 .v-inp{height:54px;display:flex;align-items:center;gap:10px;padding:0 20px;border-radius:27px;background:#fff;color:var(--k);font:500 16px/1 ${SANS}}
.s09 .v-inp .ph-t{opacity:.45}
/* 照片：普通照片提一点饱和；ui.pic 是双色调 + 白边的贴纸 */
.s09 .ph{background-size:cover;background-position:center;filter:${T.photo}}
.s09 .v-fx{position:absolute;width:0;height:0;overflow:hidden}
.s09 .v-pic{background:#fff;flex:none}
.s09 .v-pic>.ph{width:100%;height:100%}
/* 平面图形 */
.s09 .v-disc{position:absolute;border-radius:50%;display:block}
.s09 .v-slab{position:absolute;left:-30px;right:-30px}
.s09 .v-burst{position:relative;flex:none}
.s09 .v-burst svg{position:absolute;left:0;top:0}
.s09 .v-burst .bi{position:absolute;inset:0;display:grid;place-items:center;color:#fff}
.s09 .v-dot{display:inline-block;border-radius:50%;position:relative}
.s09 .v-dot::after{content:"";position:absolute;left:24%;top:22%;width:22%;height:22%;border-radius:50%;background:var(--hl2)}
/* 字标：庆科黄油体中文名（斜）+ 宽字距英文；ui.wordmark 是把 o 换成气泡的英文字标 */
.s09 .v-logo{display:inline-flex;align-items:baseline;gap:10px;white-space:nowrap}
.s09 .v-logo b{display:inline-block;font:400 32px/1 ${QK};letter-spacing:.02em;color:var(--hl);-webkit-text-stroke:.012em currentColor;transform:skewX(-10deg)}
.s09 .v-logo em{font:800 14px/1 ${BG};font-style:normal;letter-spacing:.14em;color:var(--fg)}
.s09 .v-wm{display:inline-flex;align-items:baseline;font-family:${BG};font-weight:800;line-height:1;letter-spacing:-.02em;white-space:nowrap}
.s09 .v-wm i{display:inline-block;width:.54em;height:.54em;border-radius:50%;background:currentColor;margin:0 .03em 0 .04em;position:relative}
.s09 .v-wm i::after{content:"";position:absolute;left:24%;top:22%;width:22%;height:22%;border-radius:50%;background:var(--hl2)}
/* 小程序顶栏左边的门店 / 城市切换 */
.s09 .v-city{display:flex;align-items:center;gap:4px;padding-left:6px;font:600 16px/1 ${SANS};white-space:nowrap}
/* 右上角小数据（会员积分、余额） */
.s09 .v-pts{text-align:right;white-space:nowrap}
.s09 .v-pts span{display:block;font:600 12px/1.4 ${SANS};opacity:.7}
.s09 .v-pts b{display:block;margin-top:2px;font:800 30px/1 ${BG};font-stretch:75%;letter-spacing:-.01em}
/* 二维码贴纸：白底圆角，歪着贴 */
.s09 .v-qr{width:max-content;padding:16px;border-radius:24px;background:#fff;line-height:0}
/* App 顶栏（小程序用 L.miniNav）：左右是墨黑小圆钮，标题斜的庆科体 */
.s09 .v-nav{position:relative;height:56px;margin:0 16px;display:flex;align-items:center;justify-content:space-between}
.s09 .v-nav .t{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) skewX(-10deg);font:400 26px/1 ${QK};letter-spacing:.02em;color:var(--hl);white-space:nowrap}
/* 标签栏：荧光黄底（通常压在黄波浪上），当前项电光紫 + 字加粗 + 下面一个小圆点（不只靠颜色） */
.s09 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;display:flex;justify-content:space-around;padding:8px 12px 0;background:var(--y);color:var(--k);z-index:6}
.s09 .v-tabs>div{display:flex;flex-direction:column;align-items:center;gap:3px;width:64px;font:600 12px/1.2 ${SANS}}
.s09 .v-tabs>div.on{color:var(--p);font-weight:800}
.s09 .v-tabs>div.on::after{content:"";width:5px;height:5px;border-radius:50%;background:currentColor;margin-top:1px}
/* 步骤：波浪线串起三四个圆，做完的填色带勾，当前的番茄红，没到的空心 */
.s09 .v-steps{position:relative;display:flex;justify-content:space-between}
.s09 .v-steps>div{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:8px;width:64px;font:600 13px/1.2 ${SANS};white-space:nowrap}
.s09 .v-steps i{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:3px solid var(--fg);background:var(--bgc);color:#fff}
.s09 .v-steps .done i{background:var(--p);border-color:var(--p)}
.s09 .v-steps .cur i{background:var(--r);border-color:var(--r)}
.s09 .v-steps>.sq{position:absolute;left:32px;top:6px;z-index:0;display:block}
/* 底部购物条：墨黑胶囊，左边件数和价格，右边荧光黄胶囊按钮 */
.s09 .v-bar{position:absolute;left:16px;right:16px;bottom:28px;height:62px;border-radius:31px;background:var(--k);color:#fff;display:flex;align-items:center;gap:12px;padding:0 6px 0 22px;z-index:6;white-space:nowrap}
.s09 .v-bar .v-btn{margin-left:auto;height:50px;padding:0 26px;border-radius:25px;background:var(--y);color:var(--k);font-size:17px;letter-spacing:.08em}
/* 飘带：斜着横穿整屏的番茄红长条，大字名单中间夹闪星 */
.s09 .v-rib{position:absolute;left:-40px;right:-40px;height:108px;background:var(--r);display:flex;align-items:center;justify-content:center;gap:56px;white-space:nowrap;overflow:hidden;transform:rotate(-2.5deg)}
.s09 .v-rib span{flex:none;font:400 60px/1 ${QK};color:#fff;letter-spacing:.02em;-webkit-text-stroke:.01em currentColor;transform:skewX(-10deg) scaleX(1.12)}
.s09 .v-rib svg{flex:none}
/* 网页顶栏 */
.s09.web{background:var(--p)}
.s09 .v-wnav{position:absolute;left:56px;right:56px;top:34px;height:56px;display:flex;align-items:center;z-index:5}
.s09 .v-wnav nav{display:flex;gap:40px;margin-left:72px;font:600 18px/1 ${SANS};color:#fff}
.s09 .v-wnav .v-btn{margin-left:auto;height:50px;padding:0 28px;border-radius:25px;background:var(--y);color:var(--k);font-size:17px;letter-spacing:.06em}
/* 色块语境：整块换底色，里面的字色、大字色、大数字色跟着换（根元素或任意块上都能用） */
.s09.v-c-p,.s09 .v-c-p{background:var(--p);--fg:#fff;--hl:var(--y);--big:var(--y);--bgc:var(--p);color:var(--fg)}
.s09.v-c-y,.s09 .v-c-y{background:var(--y);--fg:var(--k);--hl:var(--k);--big:var(--p);--bgc:var(--y);color:var(--fg)}
.s09.v-c-r,.s09 .v-c-r{background:var(--r);--fg:var(--k);--hl:var(--k);--big:var(--k);--bgc:var(--r);color:var(--fg)}
.s09.v-c-pk,.s09 .v-c-pk{background:var(--pk);--fg:var(--k);--hl:var(--k);--big:var(--p);--bgc:var(--pk);color:var(--fg)}
.s09.v-c-k,.s09 .v-c-k{background:var(--k);--fg:#fff;--hl:var(--y);--big:var(--y);--bgc:var(--k);color:var(--fg)}
/* 只换字色不换底色（字压在斜色块上、但不在色块元素里面时用）：on-l = 黄红粉块上的墨黑字，on-d = 紫黑块上的白字黄大字 */
.s09 .v-on-l{--fg:var(--k);--hl:var(--k);--big:var(--p);color:var(--fg)}
.s09 .v-on-d{--fg:#fff;--hl:var(--y);--big:var(--y);color:var(--fg)}
/* ui.band 的字块：大名 + 一行（价格 / 时间 + 小圆钮），右对齐的整行反过来 */
.s09 .v-band-t{position:absolute;z-index:2}
.s09 .v-band-t .row{display:flex;align-items:center;gap:14px;margin-top:16px}
.s09 .v-band-t.r{text-align:right}
.s09 .v-band-t.r .row{flex-direction:row-reverse}
`;

  // ── 平面图形 ──
  const at = (html, pos, extra = '') => (pos ? `<div class="v-ab" style="${pos}" ${extra}>${html}</div>` : html);
  // 四角闪星（实心）：spark(24, '#fff')，别处能直接当记号用；要绝对定位用 ui.sp
  const spark = (s, c = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="display:block"><path d="M12 0C12.8 7.6 16.4 11.2 24 12C16.4 12.8 12.8 16.4 12 24C11.2 16.4 7.6 12.8 0 12C7.6 11.2 11.2 7.6 12 0Z" fill="${c}"/></svg>`;
  // 爆炸星：n 个尖，外半径 49、内半径 40（100 见方）
  function burst(size, color = R, inner = '', { rot = -12, n = 14, pos = '' } = {}) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 40 : 49, a = Math.PI * i / n - Math.PI / 2; pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`); }
    return at(`<div class="v-burst" style="width:${size}px;height:${size}px;transform:rotate(${rot}deg)"><svg viewBox="0 0 100 100" width="${size}" height="${size}"><polygon points="${pts.join(' ')}" fill="${color}" stroke="${color}" stroke-width="3" stroke-linejoin="round"/></svg><div class="bi">${inner}</div></div>`, pos);
  }
  // 波浪顶边的色块（SVG）：waveSvg(936, 210, T.primary, 14, 96)，参数是宽、高、颜色、起伏、一个波长；放在普通流里用，绝对定位用 ui.wave
  function waveSvg(w, h, color, amp = 9, Lw = 64) {
    let d = `M0 ${amp}`, x = 0, k = 0;
    while (x < w) { d += ` Q${x + Lw / 4} ${k % 2 ? 3 * amp : -amp} ${x + Lw / 2} ${amp}`; x += Lw / 2; k++; }
    d += ` L${x} ${h} L0 ${h}Z`;
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block"><path d="${d}" fill="${color}"/></svg>`;
  }
  // 波浪线：squiggle(256, T.accents.ink, { amp: 6, L: 44, sw: 3 })，amp 起伏、L 一个波长、sw 线宽
  function squiggle(w, color = K, { amp = 6, L: Lw = 44, sw = 3 } = {}) {
    let d = `M0 ${amp + sw}`, x = 0, k = 0;
    while (x < w) { d += ` Q${x + Lw / 4} ${k % 2 ? 3 * amp + sw : -amp + sw} ${x + Lw / 2} ${amp + sw}`; x += Lw / 2; k++; }
    return `<svg width="${w}" height="${2 * amp + 2 * sw}" style="display:block;overflow:visible"><path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/></svg>`;
  }
  // 海报大字（SVG）：庆科黄油体横向放大 1.2 倍、斜切、轻转；halo 是外圈一道底色，压在黄圆和贴纸上也分得开
  function bigT(text, size, { fill = Y, halo = P, fat = 0.005, ring = 0.045, sx = 1.2, skew = -10, rot = -4, pos = '' } = {}) {
    const w = Math.ceil(text.length * size * 0.86), h = Math.ceil(size * 1.12);
    const t = (c, sw) => `<text x="${(size * 0.06).toFixed(1)}" y="${(size * 0.9).toFixed(1)}" font-family="ZCOOL QingKe HuangYou, Noto Sans SC, sans-serif" font-size="${size}" fill="${c}" stroke="${c}" stroke-width="${sw.toFixed(1)}" stroke-linejoin="round">${text}</text>`;
    return at(`<svg width="${w}" height="${h}" style="display:block;overflow:visible;transform:rotate(${rot}deg) skewX(${skew}deg) scaleX(${sx});transform-origin:0 100%">${halo ? t(halo, 2 * size * (fat + ring)) : ''}${t(fill, 2 * size * fat)}</svg>`, pos, 'data-bleed');
  }
  // 双色调滤镜：照片先转灰、拉对比，再把暗→亮映射到 cols（2 或 3 个色卡色）
  const rgb = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
  function duo(id, cols, contrast = 1.3, bright = 0.04) {
    const cs = cols.map(rgb), tv = (k) => cs.map((c) => c[k].toFixed(3)).join(' ');
    const b = ((1 - contrast) / 2 + bright).toFixed(3);
    const lin = ['R', 'G', 'B'].map((ch) => `<feFunc${ch} type="linear" slope="${contrast}" intercept="${b}"/>`).join('');
    const tab = ['R', 'G', 'B'].map((ch, k) => `<feFunc${ch} type="table" tableValues="${tv(k)}"/>`).join('');
    return `<svg class="v-fx" aria-hidden="true"><filter id="${id}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/><feComponentTransfer>${lin}</feComponentTransfer><feComponentTransfer>${tab}</feComponentTransfer></filter></svg>`;
  }
  // 杯子：图册模块的 cup()，色值走参数（用法见 ui.cup 的注释）
  function cup(w = 180, { top = '#FFB3C4', bot = '#FF7F9D', fruit = ['#FFD9B0', '#FF7B6B'], straw = R, rot = 0, edge = 7, mark = '', simple = false, pos = '' } = {}) {
    const id = 'v09k' + (++uid), h = Math.round(w * 444 / 224);
    const body = 'M20 132H180L160 404Q159 414 149 414H51Q41 414 40 404Z';
    const slice = (x, y, a, s = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M-24 0A24 24 0 0 0 24 0Z" fill="${fruit[0]}"/><path d="M-24 0A24 24 0 0 0 24 0" fill="none" stroke="${fruit[1]}" stroke-width="5"/></g>`;
    const bub = simple ? [[62, 210, 10], [140, 300, 9], [80, 360, 12], [146, 196, 6]] : [[62, 206, 8], [138, 186, 5], [104, 232, 4], [70, 318, 11], [142, 300, 7], [112, 362, 5], [58, 386, 4], [150, 356, 4], [96, 286, 3]];
    return at(`<svg width="${w}" height="${h}" viewBox="-12 -12 224 444" style="display:block;overflow:visible;transform:rotate(${rot}deg)">
<defs><clipPath id="${id}b"><path d="${body}"/></clipPath>
<filter id="${id}s" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="${edge}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#${id}s)">
<path d="M26 126C26 66 174 66 174 126Z" fill="#F4EFFF"/>
<path d="M113 4L135 0L124 92H102Z" fill="${straw}"/>
<path d="${body}" fill="#FBF7FF"/>
<g clip-path="url(#${id}b)">
<path d="M0 166Q25 154 50 166T100 166T150 166T200 166V420H0Z" fill="${top}"/>
<path d="M0 276Q25 262 50 276T100 276T150 276T200 276V420H0Z" fill="${bot}"/>
${simple ? `${slice(84, 240, -18, 1.25)}${slice(118, 352, 14, 1.15)}` : `${slice(70, 228, -18)}${slice(132, 252, 24, 0.85)}${slice(96, 352, 8, 0.9)}`}
${bub.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('')}
<path d="M36 150L48 150L40 380L30 380Z" fill="#fff" opacity=".6"/>
</g>${mark ? `<g transform="translate(108 318) rotate(-8)"><circle r="34" fill="${Y}"/><text y="12" text-anchor="middle" font-family="Bricolage Grotesque,ZCOOL QingKe HuangYou" font-weight="800" font-size="34" fill="${P}">${mark}</text></g>` : ''}
<rect x="12" y="120" width="176" height="16" rx="8" fill="#fff"/>
</g></svg>`, pos);
  }
  const SHAPE = { pill: '999px', circle: '50%', round: '28px', arch: '999px 999px 28px 28px' };

  const ui = {
    spark,
    // 绝对定位的闪星：sp(44, 270, 24, '#fff')
    sp: (x, y, s, c = '#fff') => `<div class="v-ab" style="left:${x}px;top:${y}px">${spark(s, c)}</div>`,
    // 爆炸星价格贴：burst(124, T.accents.red, ui.price(16, 50), { rot: -12, pos: 'left:14px;top:118px' })
    burst,
    // 实心大圆（常放在主角贴纸后面，出框）：disc(300, T.primary, 'left:104px;top:104px')
    disc: (size, color = Y, pos = '') => `<i class="v-disc" style="width:${size}px;height:${size}px;background:${color};${pos}"></i>`,
    // 波浪顶边色块，从 top 一直铺到屏幕底：wave(624, T.primary)；网页传 { w: 1280, h: 200 }
    wave: (top, color = Y, { w = 375, h = 0, amp = 9, L: Lw = 64, left = 0 } = {}) => `<div class="v-ab" style="left:${left}px;top:${top}px">${waveSvg(w, h || 812 - top + 4, color, amp, Lw)}</div>`,
    waveSvg,
    squiggle,
    // 斜色块：slab(560, 300, T.bg, -3)，参数是顶边、高、颜色、角度、补充样式；横跨整屏、左右各出框 30px，内容另外绝对定位放在上面（字不跟着转）
    slab: (top, h, color, rot = -2.5, extra = '') => `<div class="v-slab" style="top:${top}px;height:${h}px;background:${color};transform:rotate(${rot}deg);${extra}"></div>`,
    // 菜单 / 阵容的一条斜色块（图册菜单页的做法）：色块横跨整屏转一点角度，字块不转，贴纸压出色块上沿
    //   band({ top: 166, bg: T.primary, rot: -2.5, title: '桃桃气泡', row: ui.price(16, 36) + ui.round('plus'), art: ui.pic(…) 或 ui.cutout(…), right: false })
    //   right: true 字块靠右、贴纸靠左；dark: true 是紫 / 黑色块（白字）；artX / artY 微调贴纸位置
    //   h 默认 240，比条与条的间距 196 多出一截压到下一条底下，接缝才不漏底色；最后一条写 h: 300 一直铺到屏幕底
    band: ({ top, h = 240, bg = Y, rot = -2.5, title = '', row = '', art = '', right = false, dark = false, artX = null, artY = -24, size = 48 }) => {
      const ax = artX !== null ? artX : right ? 6 : 226;
      return `<div class="v-slab" style="top:${top}px;height:${h}px;background:${bg};transform:rotate(${rot}deg)"></div>
<div class="v-band-t ${right ? 'r' : ''} ${dark ? 'v-on-d' : 'v-on-l'}" style="top:${top + 46}px;${right ? 'right:24px' : 'left:24px'}"><div class="v-h2 ${right ? 'r' : ''}" style="font-size:${size}px">${title}</div>${row ? `<div class="row">${row}</div>` : ''}</div>
${art ? `<div class="v-ab" style="left:${ax}px;top:${top + artY}px">${art}</div>` : ''}`;
    },
    // 海报大字：bigT('桃桃', 132, { pos: 'left:12px;top:322px' })；黄底上用 { fill: T.bg, halo: T.primary }
    bigT,
    // 带标点的主角大数字（日期、时间）：big('11.07', 220, 'left:10px;top:154px')，字距归零、点和冒号自动拉开；参数是文字、字号、绝对定位（不写就留在普通流）
    big: (text, size = 200, pos = '') => at(`<div class="v-big dt" style="font-size:${size}px">${String(text).replace(/[.:]/g, '<span class="v-pt">$&</span>')}</div>`, pos),
    // 价格（数字窄粗、¥ 缩小上提）：price(16, 50, '#fff')；unit 是后缀「/张」
    price: (n, size = 36, color = '', unit = '') => `<span class="v-price" style="font-size:${size}px;${color ? `color:${color}` : ''}">¥${n}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // 双色调照片贴纸（白色模切边）：pic(img('xxx'), { w: 170, h: 236, shape: 'pill', duo: [T.accents.deep, T.accents.pink], rot: 8, pos: 'left:180px;top:120px' })
    //   shape：pill 胶囊 / circle 圆 / round 圆角 28 / arch 拱门；duo 两色（暗→亮）或三色（暗→中→亮），只用色卡色；duo: null 是原色照片
    //   紫→黄两色在中间调会发灰发脏（只适合舞台灯光、剪影这种反差极大的照片）；人像用三色让中间调走粉或红：
    //   [深紫, 蜜桃粉, 荧光黄] 干净偏亮（默认）、[深紫, 番茄红, 荧光黄] 最热烈、[深紫, 蜜桃粉] 紫粉、[墨黑, 电光紫, 荧光黄] 舞台夜景
    //   一套 demo 里人像只定一组、舞台夜景单独一组，别按色块换色调，同一个人换了色调就像两个人。贴纸多半压在黄块上就选 [深紫, 蜜桃粉]，亮部才和黄分得开
    //   at 是照片的 background-position，zoom 是放大倍数（裁得更紧）
    pic: (src, { w = 160, h = 220, shape = 'pill', duo: cols = [DP, PK, Y], rot = 0, edge = 7, pos = '', at: ap = '50% 30%', zoom = 1, contrast = 1.4, attrs = '' } = {}) => {
      const id = 'v09d' + (++uid), r = SHAPE[shape] || shape;
      const f = cols ? duo(id, cols, contrast) : '';
      return `<div class="v-pic${pos ? ' v-ab' : ''}" style="width:${w + 2 * edge}px;height:${h + 2 * edge}px;padding:${edge}px;border-radius:${r};transform:rotate(${rot}deg);${pos}" ${attrs}>${f}<div class="ph" style="border-radius:${r};background-image:url(${src});background-position:${ap};${zoom !== 1 ? `background-size:${Math.round(zoom * 100)}% auto;` : ''}${cols ? `filter:url(#${id})` : ''}"></div></div>`;
    },
    // 卡片顶部 / 大块照片（双色调，不带白边）：<div class="v-card">${ui.ph(img('xxx'), { h: 180 })}<div class="bd">…</div></div>
    ph: (src, { h = 180, duo: cols = [DP, PK, Y], at: ap = '50% 40%', radius = '28px 28px 0 0', contrast = 1.4, style: st = '' } = {}) => {
      const id = 'v09d' + (++uid);
      return `${cols ? duo(id, cols, contrast) : ''}<div class="ph" style="height:${h}px;border-radius:${radius};background-image:url(${src});background-position:${ap};${cols ? `filter:url(#${id});` : ''}${st}"></div>`;
    },
    // 平面插画贴纸：把自己画的 SVG 内容外面加一圈白色模切边（图册杯子的做法）
    //   cutout('<path …/>…', { w: 180, vb: [224, 444], edge: 7, rot: 9 })；vb 是内容的 viewBox 宽高
    cutout: (inner, { w = 180, vb = [200, 200], edge = 7, rot = 0, pos = '' } = {}) => {
      const id = 'v09c' + (++uid), h = Math.round(w * vb[1] / vb[0]), pad = Math.round(edge * 1.8);
      return at(`<svg width="${w}" height="${h}" viewBox="${-pad} ${-pad} ${vb[0] + 2 * pad} ${vb[1] + 2 * pad}" style="display:block;overflow:visible;transform:rotate(${rot}deg)"><defs><filter id="${id}" x="-25%" y="-25%" width="150%" height="150%"><feMorphology in="SourceAlpha" operator="dilate" radius="${edge}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#${id})">${inner}</g></svg>`, pos);
    },
    // 杯子贴纸（图册的杯子，平面插画 + 白色模切边）：cup(184, { rot: 9, mark: 'b', pos: 'left:152px;top:92px' })
    //   top / bot 上下两层饮料色，fruit 果片 [肉, 皮]，straw 吸管色；mark 杯身圆标里的一个字（品牌首字），不传不画；simple: true 气泡少一半（132 以下的小杯用）
    //   默认是桃子；柠檬 { top: '#FFF7B0', bot: '#FFE03D', fruit: ['#FFF6C9', '#F2C600'], straw: T.bg }；葡萄 { top: '#C7B5FF', bot: '#8A63FF', fruit: ['#E2D6FF', '#5A2DF4'], straw: T.primary }
    cup,
    // 气泡记号：dot(40, T.primary, T.bg)，实心圆 + 左上一点高光，参数是直径、圆色、高光色（品牌记号，也能放大当背景元素）
    dot: (size, color = Y, hl = P) => `<span class="v-dot" style="width:${size}px;height:${size}px;background:${color};--hl2:${hl}"></span>`,
    // 英文字标：字母 o 换成气泡（bobo → b●b●）；wordmark('loop', 30)
    wordmark: (text, size = 30, color = Y, hl = P) => `<span class="v-wm" style="font-size:${size}px;color:${color};--hl2:${hl}">${[...text].map((ch) => (/[oO]/.test(ch) ? '<i></i>' : `<b style="font-weight:800">${ch}</b>`)).join('')}</span>`,
    // 小程序返回箭头（放在 miniNav 左边，能跟 ui.city 连着写）：miniNav({ light: true, left: ui.back() + ui.city('上海站') })；除了首页，每屏都要有回去的路
    back: () => `<span data-back>${icon('chevron-left', 26, 2.4)}</span>`,
    // 门店 / 城市切换（放在 miniNav 左边）：miniNav({ light: true, left: ui.city('三里屯店') })
    city: (name) => `<span class="v-city">${name}${icon('chevron-down', 18, 2.4)}</span>`,
    // 右上角小数据：pts('会员积分', '1,280', 'right:24px;top:58px')
    pts: (label, value, pos = '') => at(`<div class="v-pts"><span>${label}</span><b>${value}</b></div>`, pos),
    // 二维码贴纸：qrCard(150, { rot: -4, seed: 11, pos: 'left:24px;top:446px' })，seed 换一张码
    qrCard: (size = 150, { rot = -4, seed = 7, pos = '' } = {}) => at(`<div class="v-qr" style="transform:rotate(${rot}deg)">${L.qr(size, K, '#fff', seed)}</div>`, pos),
    // 展示板背景（demo 里写 boardDeco: ui.stageDeco()）：图册舞台的做法，底色上两个大圆从对角撞出去（主色右上、番茄红左下，都同时出两条边），闪星落在板边空白处
    //   a / b 换两个圆的颜色；返回 (geo) => 字符串，大小和位置按展示板尺寸算
    stageDeco: ({ a = P, b = R } = {}) => (geo) => {
      const { w, h } = geo, top = geo.webs[0] || geo.phones[0] || { x: 96, y: 150 };
      const da = Math.round(w * .62), db = Math.round(w * .68), m = top.x / 2;
      const star = (x, y, s, c) => `<div style="position:absolute;left:${Math.round(x - s / 2)}px;top:${Math.round(y - s / 2)}px">${spark(s, c)}</div>`;
      return `<i style="position:absolute;right:${-Math.round(w * .22)}px;top:${-Math.round(w * .24)}px;width:${da}px;height:${da}px;border-radius:50%;background:${a}"></i><i style="position:absolute;left:${-Math.round(w * .26)}px;bottom:${-Math.round(w * .26)}px;width:${db}px;height:${db}px;border-radius:50%;background:${b}"></i>${star(w * .49, top.y / 2, 44, '#fff')}${star(w - m, Math.max(h * .43, w * .38 + 60), 36, a)}${star(m, h * .17, 30, a)}`;
    },
    // 中文字标：庆科体品牌名（斜）+ 宽字距英文：logo('半山咖啡', 'BANSHAN')
    logo: (name, en = '', { size = 32, color = '' } = {}) => `<div class="v-logo"><b style="font-size:${size}px;${color ? `color:${color}` : ''}">${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：左右是墨黑小圆钮；小程序用 L.miniNav
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<div class="v-round" data-back>${icon('chevron-left', 22, 2.6)}</div>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 墨黑小圆钮（加号、收藏、返回）：round('plus', { attrs: 'data-go="cart"' })；on: true 时图标填实（表示已选，不只靠颜色）
    round: (ic, { size = 40, bg = K, color = Y, attrs = '', on = false } = {}) => `<span class="v-round" style="width:${size}px;height:${size}px;background:${bg};color:${color}" ${attrs}>${icon(ic, Math.round(size * 0.55), 3, on ? 'style="fill:currentColor"' : '')}</span>`,
    // 底部标签栏：荧光黄底；当前项电光紫 + 加粗 + 小圆点
    tabs: (items, cur = 0, go = [], { bg = Y } = {}) => `<div class="v-tabs" style="background:${bg}">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(ic, 23, 2.2)}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：墨黑胶囊荧光黄字（放黄色块上）；紫底上加 cls 'y'；底部通栏加 'wide'；箭头类图标放字后面，别的图标放字前面
    btn: (text, { ic = 'arrow-right', cls = '', attrs = '' } = {}) => {
      const ico = ic ? icon(ic, 22, 2.6) : '';
      return `<div class="v-btn ${cls}" ${attrs}>${ic && !ic.startsWith('arrow') ? ico + text : text + ico}</div>`;
    },
    // 大字分类：cat(['气泡','果茶','奶茶','加料'], 0, { pos: 'left:24px;top:104px' })
    cat: (items, cur = 0, { pos = '', go = [] } = {}) => at(`<div class="v-cat">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`, pos),
    // 步骤：steps(['已下单','制作中','可取餐'], 1, { w: 327 })；cur 之前的算做完
    steps: (items, cur = 0, { w = 327, color = K } = {}) => `<div class="v-steps" style="width:${w}px"><span class="sq">${squiggle(w - 64, color)}</span>${items.map((t, i) => `<div class="${i < cur ? 'done' : i === cur ? 'cur' : ''}"><i>${i < cur ? icon('check', 16, 3.4) : ''}</i>${t}</div>`).join('')}</div>`,
    // 底部购物条：bar(`${icon('shopping-bag',24,2.2)}<span>2 杯</span>${ui.price(31,28,T.primary)}`, '去结算', 'data-go="pay"')
    bar: (left, btnText, attrs = '') => `<div class="v-bar">${left}<span class="v-btn" ${attrs}>${btnText}</span></div>`,
    // 飘带：ribbon(['桃桃气泡','柠柠气泡','葡萄气泡'], { top: 686 })；网页常用，手机上 size 改 34
    ribbon: (items, { top = 0, bg = R, color = '#fff', size = 60, rot = -2.5, sep = Y, h = 108, gap = 56 } = {}) => `<div class="v-rib" data-bleed style="top:${top}px;height:${h}px;background:${bg};gap:${gap}px;transform:rotate(${rot}deg)">${items.map((t) => `<span style="font-size:${size}px;color:${color}">${t}</span>`).join(spark(Math.round(size * 0.56), sep))}</div>`,
  };
  const S = { key: 's09-pop', no: 9, name: '撞色波普', root: 's09', T, css, ui, stage: over.stage || Y, dark: true };
  // 换配色：S.recolor({ bg, primary, red, pink, ink, deep, stage })，只写要换的字段，就地改 S（要在取 S.ui、S.T 之前调）
  S.recolor = (pal) => Object.assign(S, starter(L, { ...over, ...pal }), { recolor: S.recolor });
  return S;
};
