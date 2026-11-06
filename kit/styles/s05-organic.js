// 05 暖调自然 Organic —— 起手包
// 色值、字体、字号、圆角、照片滤镜、颗粒、竹叶影都照图册模块 catalog/pages/s05-organic.js（林下）原样取
// 用法：const S = style('s05-organic'); 屏幕根元素 <div class="scr s05">；组件见 S.ui
module.exports = (L) => {
  const { icon } = L;
  // 模块里的全部颜色（C 原名照抄，另补模块 CSS 里写死的三种字色）
  const C = {
    oat: '#F2EADD', oat2: '#E6D6BE', wood: '#B98A58', sage: '#7B8A66', sageD: '#5D6B4B',
    ink: '#3B2F25', ink2: '#87776A', milk: '#FBF6EE',
    body: '#6A5B4E',   // 正文段落、网页导航
    mute: '#AD9E8B',   // 标签栏没选中的字
    off: '#C9B9A4',    // 约满、不可选的日期
  };
  const T = {
    bg: C.oat,              // 燕麦米：页面底色
    surface: C.oat2,        // 浅木：日期条、积分条、卡片、底部弧形面板
    ink: C.ink,             // 栗墨：标题和主字
    ink2: C.ink2,           // 次要字、小标签
    line: 'rgba(59,47,37,.12)',   // 模块里没有分隔线；起手包补的，列表行之间用，栗墨 12%
    primary: C.sage,        // 鼠尾草绿：主按钮、选中的日期、当前标签的小圆点
    onPrimary: C.milk,
    accents: { wood: C.wood, sageD: C.sageD, milk: C.milk, body: C.body, mute: C.mute, off: C.off },
    fonts: { title: '"LXGW Marker Gothic"', body: '"Noto Sans SC"', num: '"LXGW Marker Gothic"' },
    radius: 32,             // 卡片、拱门下角；胶囊件一律半高圆角
    border: null,
    shadow: null,           // 不用投影；圆形小图外圈一道 10px 底色描边（box-shadow:0 0 0 10px 燕麦米）
    margin: 24,
    photo: 'sepia(.5) saturate(1.05) contrast(1) brightness(.95)',   // 主图那张的滤镜；外加暖光叠层 + 胶片颗粒（.v-photo 自带）
  };
  const HW = '"LXGW Marker Gothic","Noto Sans SC",sans-serif';
  const SANS = '"Noto Sans SC",sans-serif';

  // 胶片颗粒：粗一点的灰度噪点，缩小了也看得见（模块原样）
  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.56' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncR type='linear' slope='2.6' intercept='-.8'/><feFuncG type='linear' slope='2.6' intercept='-.8'/><feFuncB type='linear' slope='2.6' intercept='-.8'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const NOISE = `url("data:image/svg+xml,${encodeURIComponent(noiseSvg).replace(/'/g, '%27')}")`;

  const css = `
.s05{--bg:${C.oat};--bg2:${C.oat2};--wd:${C.wood};--sg:${C.sage};--sgd:${C.sageD};--k:${C.ink};--k2:${C.ink2};--mk:${C.milk};--tx:${C.body};isolation:isolate;background:var(--bg);color:var(--k);font:400 15px/1.6 ${SANS}}
.s05 .v-pad{padding-left:24px;padding-right:24px}
.s05 .v-hw{font-family:${HW};font-weight:400}
/* 字号：标题全用霞鹜漫黑 400（手写马克笔感的圆头字），字距放开；正文思源黑体，行距 1.95 排得松 */
.s05 .v-h1{font:400 64px/1 ${HW};letter-spacing:.06em;margin-left:-2px}
.s05 .v-hero{font:400 78px/1.2 ${HW};letter-spacing:.04em}
.s05 .v-h2{font:400 31px/1.25 ${HW};letter-spacing:.04em}
.s05 .v-h3{font:400 22px/1.3 ${HW};letter-spacing:.02em}
.s05 .v-tx{font:400 15px/1.95 ${SANS};letter-spacing:.05em;color:var(--tx)}
.s05 .v-mut{font:400 14px/1.5 ${SANS};letter-spacing:.06em;color:var(--k2)}
.s05 .v-lbl{font:400 12px/1.4 ${SANS};letter-spacing:.16em;color:var(--k2)}
.s05 .v-loc{font:400 13px/1 ${SANS};letter-spacing:.42em;color:var(--wd)}
.s05 .v-num{font-family:${HW};font-weight:400}
.s05 .v-big{font:400 104px/1 ${HW};letter-spacing:.02em;margin-left:-4px}
.s05 .v-price{font:400 34px/1 ${HW};white-space:nowrap}
.s05 .v-price small{font:400 14px/1 ${SANS};color:var(--k2);margin-left:6px;letter-spacing:.04em}
/* 按钮：鼠尾草绿胶囊，字距 .32em；.v-go 是圆形的「预订」 */
.s05 .v-btn{height:56px;padding:0 36px;border-radius:28px;background:var(--sg);color:var(--mk);display:inline-flex;align-items:center;justify-content:center;gap:10px;font:500 17px/1 ${SANS};letter-spacing:.32em;text-indent:.32em;white-space:nowrap}
.s05 .v-btn.wide{display:flex;width:100%}
.s05 .v-btn.ghost{background:transparent;color:var(--k);box-shadow:inset 0 0 0 1.2px var(--k)}
.s05 .v-btn.soft{background:var(--bg2);color:var(--k)}
.s05 .v-btn.sm{height:44px;padding:0 24px;border-radius:22px;font-size:15px;letter-spacing:.2em;text-indent:.2em}
.s05 .v-go{flex:none;width:68px;height:68px;border-radius:50%;background:var(--sg);color:var(--mk);display:grid;place-items:center;font:500 16px/1 ${SANS};letter-spacing:.12em;text-indent:.12em}
/* 卡片：浅木底大圆角，没有边框和投影 */
.s05 .v-card{position:relative;background:var(--bg2);border-radius:32px;overflow:hidden;isolation:isolate}
.s05 .v-card>.ph{height:200px}
.s05 .v-card .bd{padding:20px 24px 24px}
/* 列表：浅木圆角块，行之间一道很淡的线；.bare 直接排在底色上 */
.s05 .v-list{background:var(--bg2);border-radius:32px;padding:4px 24px}
.s05 .v-list.bare{background:none;border-radius:0;padding:0}
.s05 .v-row{display:flex;align-items:center;gap:14px;min-height:60px;padding:12px 0}
.s05 .v-row+.v-row{border-top:1px solid ${T.line}}
/* 订单行：霞鹜漫黑品名 + 数量 + 右对齐金额（.n）；合计那行的 .v-price 也靠右 */
.s05 .v-row .v-hw{font-size:20px}
.s05 .v-row .v-hw+.v-mut{margin-left:auto}
.s05 .v-row .n{margin-left:auto;min-width:64px;text-align:right;font:400 20px/1 ${HW}}
.s05 .v-row .v-mut+.n{margin-left:0}
.s05 .v-row .v-price{margin-left:auto}
.s05 .v-chips{display:flex;gap:10px;flex-wrap:wrap}
.s05 .v-chip{height:40px;padding:0 20px;border-radius:20px;background:var(--bg2);display:inline-flex;align-items:center;font:400 14px/1 ${SANS};letter-spacing:.08em;color:var(--k)}
.s05 .v-chip.on{background:var(--sg);color:var(--mk)}
.s05 .v-inp{height:56px;border-radius:28px;background:var(--bg2);display:flex;align-items:center;gap:10px;padding:0 24px;font:400 15px/1 ${SANS};letter-spacing:.06em;color:var(--k2)}
.s05 .v-inp .ic{color:var(--wd)}
/* 照片：.v-photo 里放 .ph；统一暖调滤镜 + 柔光暖色叠层 + 胶片颗粒；.v-tint 是从一角压下来的暖褐色（正片叠底） */
.s05 .ph{background-size:cover;background-position:center;filter:${T.photo}}
.s05 .v-photo{position:relative;overflow:hidden;background:var(--bg2);isolation:isolate}
.s05 .v-photo>.ph{position:absolute;inset:0}
.s05 .v-photo::before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,214,160,.22),rgba(190,130,70,.16));mix-blend-mode:soft-light;z-index:2;pointer-events:none}
.s05 .v-photo::after{content:"";position:absolute;inset:0;background:${NOISE};background-size:300px;mix-blend-mode:overlay;opacity:.5;z-index:3;pointer-events:none}
.s05 .v-photo.ng::after{display:none}
.s05 .v-photo.nw::before{display:none}
.s05 .v-tint{position:absolute;inset:0;z-index:1;mix-blend-mode:multiply;pointer-events:none}
.s05 .v-sun{position:absolute;left:0;top:0;z-index:2;pointer-events:none}
.s05 .v-glow{position:absolute;inset:0;z-index:2;pointer-events:none}
.s05 .v-arch.fill{background:var(--bg2)}
.s05 .v-arch.fill::before,.s05 .v-arch.fill::after{display:none}
.s05 .v-arch>.in{position:absolute;inset:0;z-index:4}
/* 拱门里居中堆叠：状态 + 小标签 + 大数字 + 时间地点（取货码、会员卡、结果页） */
.s05 .v-arch>.in.c{display:flex;flex-direction:column;align-items:center;padding-top:72px;text-align:center}
.s05 .v-arch>.in.c .v-lbl{margin-top:28px}
.s05 .v-arch>.in.c .v-big{margin:12px 0 0}
.s05 .v-arch>.in.c .v-h3{margin-top:22px}
.s05 .v-arch>.in.c .v-mut{margin-top:6px}
/* 通栏照片贴顶（详情页大图，底下压弧形面板）：photo(src, { h: 546, cls: 'v-top' }) */
.s05 .v-photo.v-top{position:absolute;left:0;top:0;width:100%}
/* 底部操作条：左价格、右按钮，放在弧形面板里或贴屏幕底 */
.s05 .v-bar{position:absolute;left:24px;right:24px;bottom:38px;display:flex;align-items:center;justify-content:space-between;z-index:4}
.s05 .v-bar.tabs{bottom:102px}
/* 底部弧形面板：上沿是一整条缓弧（横 188 / 竖 40 的椭圆角） */
.s05 .v-dome{position:absolute;left:0;right:0;bottom:0;z-index:3;background:var(--bg);border-radius:188px 188px 0 0/40px 40px 0 0}
.s05 .v-dome.soft{background:var(--bg2)}
/* 日期条：浅木大胶囊，左边两三栏信息，右边一个圆形绿按钮 */
.s05 .v-pill{height:84px;border-radius:42px;background:var(--bg2);display:flex;align-items:center;padding:0 8px 0 28px}
.s05 .v-pill .f+.f{margin-left:30px}
.s05 .v-pill .f b{display:block;margin-top:6px;font:400 22px/1.15 ${HW};letter-spacing:.02em;white-space:nowrap}
.s05 .v-pill .f .v-lbl{white-space:nowrap}
.s05 .v-pill .mid{display:flex;flex-direction:column;align-items:center;margin:0 14px;color:var(--k2);font-size:12px;letter-spacing:.1em}
.s05 .v-pill .mid b{font:400 20px/1 ${HW};color:var(--k);letter-spacing:0;margin-right:2px}
.s05 .v-pill .mid .arc{margin-top:2px;color:var(--wd)}
.s05 .v-pill .mid+.f{margin-left:0}
.s05 .v-pill .v-go{margin-left:auto}
.s05 .v-pill.lg{height:88px;border-radius:44px;padding:0 10px 0 38px}
.s05 .v-pill.lg .f+.f{margin-left:36px}
.s05 .v-pill.lg .f b{font-size:24px;line-height:1.2}
.s05 .v-pill.lg .f .v-lbl{font-size:13px}
.s05 .v-pill.lg .v-go{margin-left:40px}
/* 规格行：原木色细线图标 + 灰字 */
.s05 .v-facts{display:flex;gap:24px;font:400 14px/1 ${SANS};color:var(--k2);letter-spacing:.04em}
.s05 .v-facts span{display:flex;align-items:center;gap:7px;white-space:nowrap}
.s05 .v-facts .ic{color:var(--wd)}
/* 状态：绿圆里一个勾 + 字（色弱也分得清） */
.s05 .v-state{display:inline-flex;align-items:center;gap:8px;font:500 14px/1 ${SANS};letter-spacing:.14em;color:var(--sgd)}
.s05 .v-state i{width:22px;height:22px;border-radius:50%;background:var(--sg);color:var(--mk);display:grid;place-items:center}
/* 日历：霞鹜漫黑数字，选中是绿圆，区间是浅木色条，约满的划掉 */
.s05 .v-mh{display:flex;align-items:baseline;gap:12px}
.s05 .v-mh b{font:400 32px/1 ${HW};letter-spacing:.06em}
.s05 .v-mh i{font:400 20px/1 ${HW};font-style:normal;color:var(--wd);letter-spacing:.04em}
.s05 .v-wk,.s05 .v-cal{display:grid;grid-template-columns:repeat(7,1fr)}
.s05 .v-wk{margin-top:28px;font-size:13px;color:var(--k2);text-align:center}
.s05 .v-cal{margin-top:6px;grid-auto-rows:50px}
.s05 .v-cal span{position:relative;display:grid;place-items:center;font:400 20px/1 ${HW};z-index:1}
.s05 .v-cal span.off{color:${C.off};text-decoration:line-through;text-decoration-thickness:1px}
.s05 .v-cal span.s{color:var(--mk)}
.s05 .v-cal span.s::before{content:"";position:absolute;width:44px;height:44px;border-radius:50%;background:var(--sg);z-index:-1}
.s05 .v-cal span.in::after{content:"";position:absolute;left:0;right:0;top:3px;bottom:3px;background:var(--bg2);z-index:-2}
.s05 .v-cal span.s.a::after{left:50%}
.s05 .v-cal span.s.z::after{right:50%}
/* 顶栏、字标、标签栏 */
.s05 .v-nav{position:relative;height:52px;margin:0 24px;display:flex;align-items:center;justify-content:space-between;z-index:5}
.s05 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:500 17px/1 ${SANS};letter-spacing:.08em}
.s05 .v-cb{width:36px;height:36px;border-radius:18px;background:rgba(251,246,238,.92);display:grid;place-items:center;color:var(--k)}
.s05 .v-cb.bare{background:none}
.s05 .mn-l>.v-nm{margin-left:12px;display:flex;align-items:center}
.s05 .v-logo{display:flex;align-items:center;gap:10px}
.s05 .v-logo b{font:400 24px/1 ${HW};letter-spacing:.12em;color:var(--k);white-space:nowrap}
.s05 .v-logo em{font:500 13px/1 ${SANS};font-style:normal;color:var(--wd);letter-spacing:.32em;margin-left:2px;white-space:nowrap}
.s05 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:86px;display:flex;justify-content:space-around;padding:14px 20px 0;font:400 13px/1 ${SANS};color:${C.mute};letter-spacing:.08em;z-index:6}
.s05 .v-tabs>div{display:flex;flex-direction:column;align-items:center;gap:6px}
.s05 .v-tabs>div.on{color:var(--k);font-weight:500}
.s05 .v-tabs>div::after{content:"";width:5px;height:5px;border-radius:50%}
.s05 .v-tabs>div.on::after{background:var(--sg)}
/* 网页 */
.s05.web{background:var(--bg)}
.s05 .v-wnav{position:absolute;left:80px;right:80px;top:40px;height:48px;display:flex;align-items:center;z-index:5}
.s05 .v-wnav .v-logo b{font-size:30px}
.s05 .v-wnav nav{position:absolute;left:560px;display:flex;gap:48px;font:400 16px/1 ${SANS};color:var(--tx);letter-spacing:.12em}
.s05 .v-wnav>.v-btn{margin-left:auto}
`;

  // ui.mark(h, { c 线色, fill 太阳色, sw 线宽, inner })：拱门 + 落在门里的半个太阳，fill 默认跟 --wd 走。
  //   inner 换成自己的形状（viewBox 18×22，门口在 x 1.6–16.4、底边 y 21.2）
  const mark = (h = 22, { c = C.ink, fill = `var(--wd,${C.wood})`, sw = 1.6, inner = null } = {}) =>
    `<svg class="v-mark" width="${+((h * 18) / 22).toFixed(1)}" height="${h}" viewBox="0 0 18 22" fill="none"><path d="M1.6 21.2V9a7.4 7.4 0 0 1 14.8 0v12.2" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>${inner != null ? inner : `<path d="M4.4 21.2a4.6 4.6 0 0 1 9.2 0z" fill="${fill}"/>`}</svg>`;

  // ui.arc：弧形箭头 SVG 字符串，不是函数（「2 晚」底下那根，颜色跟 currentColor）
  const arc = `<svg class="arc" width="30" height="12" viewBox="0 0 30 12" fill="none"><path d="M1 10C8 1.6 22 1.6 29 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M24.8 9.7 29 10l.5-4.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // 竹叶虚影（模块原样）：twig(x, y, 角度, 枝长, 叶数, 缩放)
  const leaf = (x, y, len, wid, ang) => `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})" d="M0 0C${(len * 0.28).toFixed(1)} ${(-wid).toFixed(1)} ${(len * 0.74).toFixed(1)} ${(-wid * 0.62).toFixed(1)} ${len.toFixed(1)} 0C${(len * 0.74).toFixed(1)} ${(wid * 0.5).toFixed(1)} ${(len * 0.28).toFixed(1)} ${(wid * 0.78).toFixed(1)} 0 0Z"/>`;
  function twig(x, y, ang, len, n, s = 1) {
    const r = (ang * Math.PI) / 180;
    const ex = x + Math.cos(r) * len, ey = y + Math.sin(r) * len;
    let o = `<path d="M${x} ${y}Q${((x + ex) / 2 + Math.sin(r) * len * 0.1).toFixed(1)} ${((y + ey) / 2 - Math.cos(r) * len * 0.1).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke-width="${(3.2 * s).toFixed(1)}"/>`;
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1), side = i % 2 ? 1 : -1;
      o += leaf(x + (ex - x) * t, y + (ey - y) * t, (78 + ((i * 29) % 26)) * s, 14 * s, ang + side * (34 + ((i * 13) % 14)));
    }
    [-34, -12, 10, 32].forEach((d, k) => { o += leaf(ex, ey, (104 - k * 7) * s, 15 * s, ang + d); });
    return o;
  }
  let uid = 0;
  // 斜射进来的阳光 + 竹叶影（铺在底色上）：leaves(宽, 高, [[x,y,角度,枝长,叶数,缩放],…], 浓度)
  const leaves = (w, h, twigs = [[-60, 20, 30, 240, 4, 1.5], [w + 60, 150, 168, 230, 3, 1.45]], op = 0.3, light = true) => {
    const id = 'x05l' + ++uid;
    return `<svg class="v-sun" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><filter id="${id}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4.5"/></filter>
<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6E6" stop-opacity="0"/><stop offset=".42" stop-color="#FFF6E6" stop-opacity=".46"/><stop offset=".62" stop-color="#FFF6E6" stop-opacity="0"/></linearGradient></defs>
${light ? `<rect width="${w}" height="${h}" fill="url(#${id}g)"/>` : ''}<g transform="skewX(-14)" fill="#5A3A1C" stroke="#5A3A1C" stroke-linecap="round" opacity="${op}" filter="url(#${id}b)">${twigs.map((t) => twig(...t)).join('')}</g></svg>`;
  };
  // 照片上的一道暖光 + 两枝竹叶影（叠在照片里，放进 photo 的 over）：sun(宽, 高, 叶影浓度)
  const sun = (w = 375, h = 546, op = 0.16) => {
    const id = 'x05s' + ++uid;
    return `<svg class="v-sun" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2=".7"><stop offset=".08" stop-color="#FFD9A0" stop-opacity="0"/><stop offset=".36" stop-color="#FFD9A0" stop-opacity=".34"/><stop offset=".6" stop-color="#FFD9A0" stop-opacity="0"/></linearGradient><filter id="${id}b"><feGaussianBlur stdDeviation="5"/></filter></defs>
<rect width="${w}" height="${h}" fill="url(#${id}g)" style="mix-blend-mode:soft-light"/>
<g transform="skewX(-12)" fill="#4A3018" stroke="#4A3018" stroke-linecap="round" opacity="${op}" filter="url(#${id}b)">${twig(w * 0.8, -10, 112, 120, 3, 0.62)}${twig(w * 1.12, 30, 150, 110, 2, 0.55)}</g></svg>`;
  };

  const px = (v) => (typeof v === 'number' ? v + 'px' : v);
  // 暖调照片：photo(src, { w, h, r, pos, zoom, origin, f, tint, grain, warm, over, cls, style, attrs })
  //   r 圆角（数字或 CSS 值）；zoom/origin 放大裁切；f 单独调滤镜；tint 暖褐压角的角度（false 不要）；over 叠在照片上的 HTML（比如 sun()）
  const photo = (src, { w = null, h = 300, r = 0, pos = '50% 50%', zoom = 1, origin = '50% 50%', f = '', tint = 200, grain = true, warm = true, over = '', cls = '', style = '', attrs = '' } = {}) =>
    `<div class="v-photo${grain ? '' : ' ng'}${warm ? '' : ' nw'} ${cls}" style="${w != null ? `width:${px(w)};` : ''}height:${px(h)};border-radius:${px(r)};${style}" ${attrs}>${src ? `<div class="ph" style="background-image:url(${src});background-position:${pos};${zoom !== 1 ? `transform:scale(${zoom});transform-origin:${origin};` : ''}${f ? `filter:${f};` : ''}"></div>` : ''}${src && tint !== false ? `<i class="v-tint" style="background:linear-gradient(${tint}deg,rgba(150,104,58,.42) 0%,rgba(150,104,58,0) 46%)"></i>` : ''}${over}</div>`;

  // ui.tone.base / cool / dark / light：照片调色预设，传给 photo 的 f 参数；调完要和 base 是同一种暖色
  const tone = {
    base: T.photo,                                                   // 原片本来就暖（木头、阳光、亚麻）
    cool: 'brightness(.86) sepia(.5) saturate(1.2) contrast(1.1)',    // 白墙、灰底、窗光：先压亮度，不然高光顶到 255 后红色通道截断，白墙发柠檬黄
    dark: 'sepia(.5) saturate(1.22) contrast(.94) brightness(1.14)', // 深色桌面、暗背景
    light: 'brightness(.88) sepia(.44) saturate(1.12) contrast(1)',  // 白底棚拍、小圆图：同样先压亮度
  };
  const ui = {
    mark,
    arc,
    tone,
    leaves,
    sun,
    photo,
    // ui.glow(op, to)：窗光，从照片顶上往下化开的一层奶白，放进 photo 的 over；窗外偏暗偏绿时用它把上半截提亮。op 浓度，to 化开到多高
    glow: (op = 0.6, to = '44%') => `<i class="v-glow" style="background:linear-gradient(180deg,rgba(255,241,219,${op}),rgba(255,241,219,0) ${to})"></i>`,
    // 字标：拱门记号 + 霞鹜漫黑品牌名（字距 .12em）+ 可选原木色英文；size 是字号，sym 换成自己的记号
    logo: (name, en = '', { size = 24, sym = null } = {}) => `<div class="v-logo">${sym || mark(Math.round(size * 1.05))}<b style="font-size:${size}px">${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // 小程序顶栏左边放记号：miniNav({ left: ui.navMark() })
    navMark: (h = 26, o = {}) => `<span class="v-nm">${mark(h, o)}</span>`,
    // ui.back({ bare, attrs })：圆形返回钮，浮在照片上用奶白底；bare 只要箭头；attrs 默认 data-back
    back: ({ bare = false, attrs = 'data-back' } = {}) => `<div class="v-cb${bare ? ' bare' : ''}" ${attrs}>${icon('chevron-left', bare ? 22 : 20, 1.8)}</div>`,
    // App 顶栏：左返回圆钮、居中标题；小程序用 L.miniNav
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? ui.back() : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 底部标签栏：只有字，当前格字变深、下面一个绿色小圆点（图册原样）；icons:true 时字上加细线图标
    tabs: (items, cur = 0, go = [], { icons = false } = {}) => `<div class="v-tabs">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icons ? icon(ic, 22, 1.5) : ''}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：图册的按钮不带图标，ic 默认空
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}>${text}${ic ? icon(ic, 18, 1.6) : ''}</div>`,
    // ui.go(text, attrs)：68px 圆形绿按钮（日期条右端）；text 默认「预订」，attrs 放 data-go
    go: (text = '预订', attrs = '') => `<div class="v-go" ${attrs}>${text}</div>`,
    // 日期条：pill([['入住 · 周五','11月6日'], { n: 2, unit: '晚' }, ['退房 · 周日','11月8日']], { btn: '预订', attrs, lg })
    //   数组是一栏（小标签 + 大字），{ n, unit } 是中间带弧形箭头的「2 晚」；btn 为空就不要圆按钮
    pill: (items, { btn = '预订', attrs = '', lg = false, cls = '', style = '' } = {}) => `<div class="v-pill${lg ? ' lg' : ''} ${cls}" style="${style}">${items.map((it) => (Array.isArray(it) ? `<div class="f"><span class="v-lbl">${it[0]}</span><b>${it[1]}</b></div>` : `<div class="mid"><span><b>${it.n}</b>${it.unit || ''}</span>${arc}</div>`)).join('')}${btn ? ui.go(btn, attrs) : ''}</div>`,
    // 拱门照片（上半圆、下面大圆角，不描边）：arch(src, { w: 327, h: 452, bottom: 32, inner, center, …photo 的参数 })
    //   src 为 null 时是浅木色拱门面板，inner 放里面的内容；center: true 时 inner 居中堆叠（取货码、会员卡）
    arch: (src, o = {}) => {
      const { w = 327, h = 452, bottom = 32, inner = '', center = false, cls = '' } = o;
      return photo(src, { ...o, w, h, r: `${w / 2}px ${w / 2}px ${bottom}px ${bottom}px`, cls: `v-arch${src ? '' : ' fill'} ${cls}`, over: (o.over || '') + (inner ? `<div class="in${center ? ' c' : ''}">${inner}</div>` : '') });
    },
    // 圆形小照片，外圈一道底色描边，压在拱门边上：disc(src, { size: 184, ring: 10, ring色 })
    disc: (src, o = {}) => {
      const { size = 184, ring = 10, ringColor = 'var(--bg)' } = o;
      return photo(src, { tint: false, ...o, w: size, h: size, r: '50%', style: `box-shadow:0 0 0 ${ring}px ${ringColor};${o.style || ''}` });
    },
    // 底部弧形面板：dome(内容, { h, soft: 浅木底, style })
    dome: (inner, { h = 334, soft = false, style = '', cls = '' } = {}) => `<div class="v-dome${soft ? ' soft' : ''} ${cls}" style="height:${h}px;${style}">${inner}</div>`,
    // 规格行：facts([['bed-double','1.8 米大床'], ['maximize','36 ㎡']])
    facts: (items) => `<div class="v-facts">${items.map(([ic, t]) => `<span>${icon(ic, 17, 1.5)}${t}</span>`).join('')}</div>`,
    // ui.state(text, ic)：状态，绿圆里一个 lucide 图标（默认 check）+ 字
    state: (text, ic = 'check') => `<span class="v-state"><i>${icon(ic, 14, 2.2)}</i>${text}</span>`,
    // 月历：month({ name: '十一月', year: '2026', lead: 6（1 号前空几格，周一起）, days: 30, from: 6, to: 8, off: [14,15,21], week: true })
    month: ({ name, year = '', lead = 0, days = 30, from = 0, to = 0, off = [], week = true } = {}) => {
      const a = [];
      for (let i = 0; i < lead; i++) a.push('<span></span>');
      for (let d = 1; d <= days; d++) {
        const c = [];
        if (d === from || d === to) c.push('s');
        if (from && to && d >= from && d <= to && from !== to) c.push('in');
        if (d === from && to > from) c.push('a');
        if (d === to && to > from) c.push('z');
        if (off.includes(d) && !c.length) c.push('off');
        a.push(`<span class="${c.join(' ')}">${d}</span>`);
      }
      return `<div class="v-mh"><b>${name}</b>${year ? `<i>${year}</i>` : ''}</div>${week ? '<div class="v-wk"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>' : ''}<div class="v-cal">${a.join('')}</div>`;
    },
    // ui.backdrop(w, h)：展示板背景，暖米到原木的斜向渐变 + 阳光 + 竹叶影（demo 的 boardDeco 用，w、h 是展示板宽高）
    backdrop: (w = 1400, h = 1900) => `<div style="position:absolute;inset:0;background:linear-gradient(122deg,#EBDFCB 0%,#E3D2B7 34%,#D6BA92 68%,#C9A57A 100%)"></div><div style="position:absolute;inset:0;overflow:hidden;pointer-events:none">${leaves(w, h, [[-60, 20, 30, 300, 4, 1.8], [w + 120, 160, 168, 280, 3, 1.75], [w + 200, h * 0.7, 196, 270, 3, 1.8], [-20, h - 120, -26, 280, 4, 1.7]], 0.26)}</div>`,
  };
  return { key: 's05-organic', no: 5, name: '暖调自然', root: 's05', T, css, ui, stage: '#E3D2B7', dark: false };
};
