// 14 液态玻璃 Liquid Glass —— 起手包
// 色值、字体、折射、亮边、阴影都照图册模块 catalog/pages/s14-glass.js（漫游）原样取
// 用法：const S = style('s14-glass'); 屏幕根元素 <div class="scr s14">，第一个子元素放 ui.bg(照片或颜色)，最后放 ui.defs()（折射滤镜）；底图对比强时根元素再加 v-calm
// 玻璃靠 backdrop-filter 透出底下的照片：玻璃的祖先不能加 opacity、filter、mask、mix-blend-mode，加了就透不出来
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#123238',          // 垫底色：屏幕全被照片盖住，只有照片载入前看得到
    surface: 'linear-gradient(160deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,.06) 46%,rgba(255,255,255,.12) 100%)',  // 玻璃本身：几乎无色的白
    ink: '#FFFFFF',         // 玻璃白：全部的字和图标
    ink2: 'rgba(255,255,255,.8)',   // 次要信息不换颜色，只降不透明度（.72–.84）
    line: 'rgba(255,255,255,.22)',  // 玻璃里的分隔线；网页列表行线 .18
    primary: '#FFFFFF',     // 主按钮和当前项：.94 的不透明白。主操作按钮一屏一颗，导航条和分段条的当前项不算
    onPrimary: '#0E2328',   // 白胶囊上的深字；换色写 .p{--on:#xxxxxx}
    accents: { lake: '#2E8A8C', dawn: '#E9A08A', rock: '#6B6460', night: '#0F2A33' },  // 湖青、晨粉、岩灰、夜蓝：只活在照片里，不进界面
    fonts: { title: '"PingFang SC","Noto Sans SC"', body: '"Outfit","PingFang SC","Noto Sans SC"', num: '"Outfit"' },
    radius: 30,             // 玻璃卡；大卡 32–36，胶囊 = 高度一半
    border: null,           // 不用 border：亮边是 ::before 的 1.3px 渐变环
    shadow: 'inset 0 1px 1.5px rgba(255,255,255,.65),inset 0 -1px 1px rgba(255,255,255,.22),inset 0 0 22px rgba(255,255,255,.07),0 16px 36px -14px rgba(3,20,26,.5)',
    margin: 16,             // 玻璃件贴 16，字贴 24，顶部圆按钮贴 20
    photo: 'none',          // 手机屏不加滤镜，照片原色就是界面的颜色；网页 brightness(.86) saturate(1.04)
  };
  const FH = '"PingFang SC","Noto Sans SC",sans-serif';            // 中文标题和正文（苹方；没有苹方的设备落到思源黑体）
  const FN = '"Outfit","PingFang SC","Noto Sans SC",sans-serif';   // 数字和西文（Outfit 没有中文，混排的中文落到苹方）
  const GLASS = ['v-g', 'v-card', 'v-list', 'v-chips', 'v-inp', 'v-tabs', 'v-btn.ghost'];
  const all = (suf = '') => GLASS.map((c) => `.s14 .${c}${suf}`).join(',');
  const calm = (list) => list.map((c) => `.s14.v-calm .${c}`).join(',');
  const css = `
.s14{--on:${T.onPrimary};color:#fff;font-family:${FN};background:${T.bg};-webkit-font-smoothing:antialiased}
/* 展示板的手机外框高度取整成 715，屏幕只缩到 714.56，底下露出 .dev-s 的白底；屏幕根元素往下多画一像素深色盖住，和机身连成一片。单屏 PNG 和可点击演示里这一像素被裁掉 */
.s14 .v-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.s14 div.v-bg{overflow:hidden}
.s14 .v-scrim{position:absolute;inset:0;pointer-events:none}
.s14 .v-pad{padding-left:16px;padding-right:16px}
.s14 .v-tpad{padding-left:24px;padding-right:24px}
/* 玻璃：半透明白 + 背景模糊提饱和 + 折射（--lf，ui.lens 写进元素 style）；::before 是左上右下亮的 1.3px 环，::after 是边缘的粉青色散 */
${all()}{--lf:blur(0px);--lc:blur(0px);--bl:4px;position:relative;isolation:isolate;background:${T.surface};-webkit-backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.8) brightness(1.05);backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.8) brightness(1.05);text-shadow:0 1px 10px rgba(0,22,30,.22);box-shadow:${T.shadow}}
${all('::before')}{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.3px;background:linear-gradient(140deg,rgba(255,255,255,.98),rgba(255,255,255,.22) 24%,rgba(255,255,255,0) 50%,rgba(255,255,255,.12) 72%,rgba(255,255,255,.8));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
${all('::after')}{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 2.5px 1.5px 2px -1.5px rgba(255,150,190,.55),inset -2.5px -1.5px 2px -1.5px rgba(110,215,255,.6)}
/* 厚玻璃：字多的大块用，模糊 12px、压一层深色 */
.s14 .v-g.thick,.s14 .v-list{--bl:12px;background:linear-gradient(160deg,rgba(255,255,255,.2),rgba(255,255,255,.05) 46%,rgba(255,255,255,.1)),rgba(18,22,22,.2);-webkit-backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.7) brightness(.95);backdrop-filter:var(--lf) blur(var(--bl)) saturate(1.7) brightness(.95)}
/* 安静档：底图对比强（彩纸、灯光、碎石）时在屏幕根元素加 v-calm，全部玻璃的折射强度封顶 36，薄玻璃模糊调到 7px，边缘不再拉出放射状条纹。--lc 是 ui.lens 配好的封顶折射 */
${calm(GLASS)}{--lf:var(--lc)!important}
${calm(GLASS.filter((c) => c !== 'v-list').map((c) => (c === 'v-g' ? 'v-g:not(.thick)' : c)))}{--bl:7px}
/* 降级：老手机在屏幕根元素加 v-lite（不模糊不折射，只留半透明夜蓝）；不支持 backdrop-filter 的浏览器自动降；Safari 不认 backdrop-filter 里的 url()，折射退成纯模糊 */
.s14.v-lite .v-g,.s14.v-lite .v-card,.s14.v-lite .v-list,.s14.v-lite .v-chips,.s14.v-lite .v-inp,.s14.v-lite .v-tabs,.s14.v-lite .v-btn.ghost{-webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(15,42,51,.58)}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){${all()}{background:rgba(15,42,51,.58)}}
@supports (background:-webkit-named-image(i)){${all()}{--lf:blur(0px)!important;--lc:blur(0px)!important}}
.s14 .v-ab{position:absolute}
.s14 .v-ts{text-shadow:0 1px 16px rgba(0,18,26,.32)}
.s14 .v-cir{display:grid;place-items:center}
.s14 .v-grp{display:flex;align-items:center;justify-content:center;gap:18px}
/* 字：标题苹方极细，越大越细；数字 Outfit 细体；次要信息不换色，只降不透明度 */
.s14 .v-h1{font:100 76px/1.02 ${FH};letter-spacing:-.02em;margin-left:-4px}
.s14 .v-h2{font:100 42px/1.1 ${FH};letter-spacing:-.01em;margin-left:-2px}
.s14 .v-h3{font:400 23px/1.2 ${FH};letter-spacing:-.01em}
.s14 .v-tx{font:400 15px/1.5 ${FN}}
.s14 .v-mut{font:400 14px/1.4 ${FN};opacity:.84}
.s14 .v-k{font:500 15px/1.3 ${FN};opacity:.92}
.s14 .v-lb{font:500 13px/1.3 ${FN};opacity:.8}
.s14 .v-num{font-family:"Outfit",sans-serif;font-weight:300;letter-spacing:0}
.s14 .v-big{font:300 44px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.s14 .v-price{font:300 44px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.s14 .v-price small{font:400 15px/1 ${FN};margin-left:3px;opacity:.72}
/* 按钮：主操作是白胶囊，一屏一颗；次按钮是玻璃。导航条和分段条的当前项也是白胶囊，不算在内 */
.s14 .v-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;height:46px;padding:0 24px;border-radius:23px;background:rgba(255,255,255,.94);color:var(--on);font:600 16px/1 ${FN};text-shadow:none;white-space:nowrap;box-shadow:0 8px 20px -8px rgba(0,0,0,.35)}
.s14 .v-btn.wide{display:flex;width:100%;height:52px;border-radius:26px;font-size:17px}
.s14 .v-btn.ghost{color:#fff}
/* 卡片：.v-card>.ph 顶部照片和玻璃边留 8px，同心圆角；.bd 是正文 */
.s14 .v-card{border-radius:30px}
.s14 .v-card>.ph{height:168px;margin:8px 8px 0;border-radius:22px}
.s14 .v-card .bd{padding:18px 20px 20px}
/* 列表：一整块厚玻璃，行线 18% 白；当前行展开成里面的一块玻璃胶囊 */
.s14 .v-list{border-radius:32px;padding:8px 20px}
.s14 .v-row{display:flex;align-items:center;gap:14px;min-height:60px;border-top:1px solid rgba(255,255,255,.18)}
.s14 .v-row:first-child{border-top:none}
.s14 .v-row .n{font:500 16px/1.25 ${FN};white-space:nowrap}
.s14 .v-row .m{font:400 13px/1.25 ${FN};opacity:.8;margin-top:3px;white-space:nowrap}
.s14 .v-row .tx{flex:1;min-width:0}
.s14 .v-row .e{display:flex;align-items:center;gap:10px;font:300 16px/1 "Outfit",sans-serif;opacity:.84}
.s14 .v-row.on{margin:0 -12px;padding:0 12px;border-top:none;border-radius:24px}
.s14 .v-row.on+.v-row{border-top:none}
/* 分段胶囊：一条玻璃里，当前项展开成白胶囊，其余收成小圆 */
.s14 .v-chips{display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 6px;border-radius:26px}
.s14 .v-chip{width:36px;height:36px;border-radius:18px;display:grid;place-items:center;font:400 16px/1 "Outfit",sans-serif;opacity:.9}
.s14 .v-chip.tx{width:auto;padding:0 14px;display:flex;align-items:center;font:500 15px/1 ${FN}}
.s14 .v-chip.on{width:auto;height:40px;border-radius:20px;padding:0 16px;display:flex;align-items:center;background:rgba(255,255,255,.94);color:var(--on);font:600 15px/1 ${FN};opacity:1;text-shadow:none;white-space:nowrap}
.s14 .v-inp{height:48px;border-radius:24px;display:flex;align-items:center;gap:10px;padding:0 18px;font:400 16px/1 ${FN}}
.s14 .v-inp span{opacity:.7}
/* 收起的小胶囊：时间 + 名字 */
.s14 .v-cps{display:flex;align-items:center;gap:10px;padding:0 18px;font:500 15px/1 ${FN};white-space:nowrap}
.s14 .v-cps .v-num{font-weight:400;opacity:.8}
/* 顶栏：圆形玻璃按钮浮在照片上，不要底色 */
.s14 .v-nav{position:relative;z-index:5;height:48px;margin:8px 20px 0;display:flex;align-items:center;justify-content:space-between}
.s14 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:600 17px/1 ${FN};white-space:nowrap;text-shadow:0 1px 14px rgba(0,0,0,.45)}
/* 字标：苹方中粗宽字距 + 宽字距 Outfit 英文，没有底色 */
.s14 .v-logo{height:46px;display:flex;align-items:center;gap:10px;text-shadow:0 1px 14px rgba(0,0,0,.45)}
.s14 .v-logo b{font:500 22px/1 ${FH};letter-spacing:.12em;white-space:nowrap}
.s14 .v-logo em{font:500 12px/1 "Outfit",sans-serif;font-style:normal;letter-spacing:.2em;opacity:.85}
/* 悬浮标签栏：玻璃胶囊，当前项展开成带字的亮胶囊，其余收成图标；右边单独一颗圆按钮 */
.s14 .v-tabs{position:absolute;z-index:6;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 6px}
.s14 .v-tabs .on{height:52px;border-radius:26px;display:flex;align-items:center;gap:7px;padding:0 18px 0 16px;font:600 15px/1 ${FN};white-space:nowrap;background:rgba(255,255,255,.26);box-shadow:inset 0 1px 1px rgba(255,255,255,.55)}
.s14 .v-tabs .it{width:52px;display:grid;place-items:center;opacity:.92}
.s14 .v-tabs.all{padding:0 6px}
.s14 .v-tabs.all .it{width:auto;height:52px;padding:0 13px;border-radius:26px;display:flex;align-items:center;gap:6px;font:500 14px/1 ${FN};white-space:nowrap}
.s14 .v-tabs.all .on{padding:0 16px;gap:6px;font-size:14px}
/* 悬浮条（底部播放条、进行中的订单）：缩略图 + 两行字 + 右边操作 */
.s14 .v-bar{position:absolute;z-index:6;display:flex;align-items:center;gap:12px;padding:0 18px 0 8px}
.s14 .v-bar .tx{flex:1;min-width:0}
.s14 .v-bar .n{font:500 15px/1.2 ${FN};white-space:nowrap}
.s14 .v-bar .m{font:400 13px/1.2 ${FN};opacity:.8;margin-top:3px;white-space:nowrap}
.s14 .v-bar .ac{display:flex;align-items:center;gap:16px}
.s14 .v-cover{flex:none;background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.28)}
/* 进度：白色细条 + 白胶囊把手，两头 Outfit 时间 */
.s14 .v-seek{display:flex;align-items:center;gap:12px;width:100%;font:400 13px/1 "Outfit",sans-serif}
.s14 .v-seek span{opacity:.86;min-width:34px}
.s14 .v-seek span:last-child{text-align:right}
.s14 .v-seek .tr{position:relative;flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.26)}
.s14 .v-seek .fl{position:absolute;left:0;top:0;bottom:0;border-radius:3px;background:rgba(255,255,255,.94)}
.s14 .v-seek .kn{position:absolute;top:50%;width:30px;height:18px;margin:-9px 0 0 -15px;border-radius:9px;background:#fff;box-shadow:0 4px 10px -3px rgba(0,0,0,.45)}
/* 竖排聚焦：当前一条放大变细，其余收小变淡（歌词、节目单、步骤） */
.s14 .v-stack>div{font:400 19px/1.5 ${FH};opacity:.62}
.s14 .v-stack>div+div{margin-top:12px}
.s14 .v-stack>.on{font:200 44px/1.2 ${FH};letter-spacing:-.01em;opacity:1;margin:20px 0}
/* 数字组（公里、时长）：Outfit 细体 34px + 小单位 + 13px 标签 */
.s14 .v-stats{display:flex;gap:30px}
.s14 .v-stats b{display:block;font:300 34px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.s14 .v-stats b small{font-size:15px;font-weight:400;margin-left:3px;opacity:.72}
.s14 .v-stats span{display:block;font-size:13px;opacity:.72;margin-top:8px}
/* 起止对：两头大数字，中间一颗小玻璃（入住退房、出发到达） */
.s14 .v-dts{display:flex;align-items:flex-end;justify-content:space-between}
.s14 .v-dts b{display:block;font:300 44px/1 "Outfit",sans-serif;letter-spacing:-.01em}
.s14 .v-dts span{display:block;font-size:13px;opacity:.78;margin-top:8px}
.s14 .v-dts .nt{display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;margin-bottom:22px}
.s14 .v-hr{height:1px;background:rgba(255,255,255,.22);margin:20px 0 16px}
.s14 .v-cf{display:flex;justify-content:space-between;align-items:baseline;font-size:15px}
.s14 .v-cf span{opacity:.78}
.s14 .v-cf b{font:400 19px/1 "Outfit",sans-serif;letter-spacing:.06em}
/* 地图：白色序号钉，当前一站更大、带一圈透明白；地名白字深色描边 */
.s14 .v-pin{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:15px;display:grid;place-items:center;font:600 15px/1 "Outfit",sans-serif;background:#fff;color:${T.accents.night};box-shadow:0 0 0 1px rgba(0,0,0,.25),0 6px 14px -4px rgba(0,0,0,.6)}
.s14 .v-pin.now{width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:19px;font-size:16px;box-shadow:0 0 0 1px rgba(0,0,0,.2),0 0 0 12px rgba(255,255,255,.2),0 8px 18px -4px rgba(0,0,0,.6)}
.s14 .v-ml{position:absolute;font-size:14px;font-weight:600;white-space:nowrap;color:#fff;text-shadow:0 0 3px rgba(4,14,14,.9),0 0 8px rgba(4,14,14,.7),0 1px 2px rgba(0,0,0,.6)}
/* 网页：玻璃模糊减到 7px，内容收在中间一栏 */
.s14.web .v-g,.s14.web .v-card,.s14.web .v-chips,.s14.web .v-tabs{--bl:7px}
.s14.web .v-bg{filter:brightness(.86) saturate(1.04)}
.s14 .v-wmk{font:500 26px/1 "Outfit",sans-serif;letter-spacing:.2em;white-space:nowrap}
.s14 .v-wmk small{font:400 17px/1 ${FH};letter-spacing:.2em;margin-left:12px;opacity:.88}
.s14 .v-wnav{display:flex;align-items:center;gap:6px;padding:0 6px;font:500 16px/1 ${FN}}
.s14 .v-wnav span{height:40px;padding:0 20px;border-radius:20px;display:flex;align-items:center;opacity:.9;white-space:nowrap}
.s14 .v-wnav span.on{background:rgba(255,255,255,.94);color:var(--on);opacity:1;font-weight:600;text-shadow:none}
.s14 .v-wh1{font:100 80px/1.05 ${FH};text-align:center;letter-spacing:-.01em;text-shadow:0 2px 28px rgba(4,8,22,.5)}
.s14 .v-wsub{font:400 19px/1.3 ${FN};text-align:center;opacity:.94;margin-top:16px;text-shadow:0 1px 14px rgba(4,8,22,.6)}
.s14 .v-panel{padding:24px 32px}
.s14 .v-phd{display:flex;align-items:baseline;justify-content:space-between}
.s14 .v-phd b{font:400 22px/1 ${FH}}
.s14 .v-phd span{font:400 16px/1 ${FN};opacity:.92}
.s14 .v-wrow{display:grid;grid-template-columns:84px 1fr auto;align-items:center;padding:14px 0;border-top:1px solid rgba(255,255,255,.18);font-size:17px}
.s14 .v-wrow .tt{font:400 18px/1 "Outfit",sans-serif;opacity:.84}
.s14 .v-wrow .n{font-weight:500}
.s14 .v-wrow .m{font-size:15px;opacity:.8}
.s14 .v-wrow.ex{border-top:none;padding:0 20px;margin:12px -20px 4px}
`;
  // 液态玻璃的边缘折射：每块玻璃按自己的尺寸生成一张位移图。中间是中性灰（不动），四周一圈斜面把背景往里拉，边缘的线条会被弯过来
  const lmap = (w, h, r, b) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><defs><linearGradient id='x' x1='1' y1='0' x2='0' y2='0'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#f00'/></linearGradient><linearGradient id='y' x1='0' y1='1' x2='0' y2='0'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#00f'/></linearGradient><filter id='s' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='${(b / 2.2).toFixed(1)}'/></filter></defs><rect width='${w}' height='${h}' fill='#000'/><rect width='${w}' height='${h}' rx='${r}' fill='url(#x)'/><rect width='${w}' height='${h}' rx='${r}' fill='url(#y)' style='mix-blend-mode:screen'/><rect x='${b}' y='${b}' width='${w - 2 * b}' height='${h - 2 * b}' rx='${Math.max(2, r - b)}' fill='rgb(128,128,128)' filter='url(#s)'/></svg>`);
  const FILTERS = {};
  const addFilter = (w, h, r, b, k) => {
    const id = `g14-${w}-${h}-${r}-${k}`;
    if (!FILTERS[id]) FILTERS[id] = `<filter id="${id}" x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feImage href="${lmap(w, h, r, b)}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="${k}" xChannelSelector="R" yChannelSelector="B"/></filter>`;
    return id;
  };
  // lens(宽, 高, 圆角, 折射强度)：返回写进元素 style 的字符串（宽高、圆角、--lf、--lc）。强度不写按短边算（18–46），大卡手写 40–50；--lc 是 v-calm 用的封顶 36 的折射
  const lens = (w, h, r, s) => {
    const k = s || Math.round(Math.max(18, Math.min(46, Math.min(w, h) * 0.62)));
    const b = Math.round(Math.max(8, Math.min(20, Math.min(r, h / 2) * 0.62)));
    const id = addFilter(w, h, r, b, k);
    return `width:${w}px;height:${h}px;border-radius:${r}px;--lf:url(#${id});--lc:url(#${k > 36 ? addFilter(w, h, r, b, 36) : id});`;
  };
  const blv = (bl) => (bl ? `--bl:${bl}px;` : '');   // 玻璃的 bl 参数：写进 style 的模糊半径
  const ab = (at) => (at ? 'v-ab' : '');
  // 图册里的压暗层：hero 上深下浅再收一点（默认）、top 只压顶部（亮照片）、none 不压；也可以直接传一段 CSS 渐变
  const SCRIM = {
    hero: 'linear-gradient(180deg,rgba(8,20,30,.36),rgba(8,20,30,.1) 32%,rgba(8,20,30,0) 50%,rgba(4,24,30,.3))',
    top: 'linear-gradient(180deg,rgba(14,18,12,.5),rgba(14,18,12,.12) 22%,rgba(14,18,12,0) 40%,rgba(14,18,12,0) 80%,rgba(14,18,12,.28))',
    web: 'linear-gradient(180deg,rgba(8,14,30,.6) 0%,rgba(8,14,30,.42) 24%,rgba(8,14,30,.12) 40%,rgba(8,14,30,0) 50%)',
  };
  const circle = (name, { d = 48, s, bl = 0, at = '', attrs = '', ic = 0, sw = 2 } = {}) => `<div class="v-g v-cir ${ab(at)}" style="${at}${lens(d, d, d / 2, s)}${blv(bl)}" ${attrs}>${/^</.test(name) ? name : icon(name, ic || Math.round(d * 0.44), sw)}</div>`;
  const ui = {
    lens,
    // 折射滤镜：放在每屏最后；缺了它玻璃只模糊不折射
    defs: () => `<svg width="0" height="0" style="position:absolute">${Object.values(FILTERS).join('')}</svg>`,
    // 满屏背景，放在屏幕根元素第一个。照片：bg(img('x'), { pos: '43% 50%', scrim: 'hero' })，pos 是 object-position，scrim 见上面 SCRIM
    // 没有好照片时用颜色：bg(null, { fill: 'linear-gradient(…)', shapes: [{ d: 420, x: -120, y: 90, c: '#E9835A' }, { w: 320, h: 150, r: 75, x: 130, y: 520, c: '#2E8A8C', rot: -18 }] })；shapes 是给玻璃透的大形状：d 是圆的直径，w、h、r 是圆角矩形，x、y 是左上角，c 是颜色或渐变（中等明度，太亮压不住白字），rot 是旋转度数；scrim 默认不压
    bg: (src, { pos = '50% 50%', scrim = src ? 'hero' : 'none', style = '', fill = '', shapes = [] } = {}) => `${src ? `<img class="v-bg" src="${src}" style="object-position:${pos};${style}">` : `<div class="v-bg" style="background:${fill || T.accents.night};${style}">${shapes.map(({ d = 0, w = d, h = d, r = d / 2, x = 0, y = 0, c = '#fff', rot = 0 }) => `<i style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;background:${c};${rot ? `transform:rotate(${rot}deg);` : ''}"></i>`).join('')}</div>`}${scrim === 'none' ? '' : `<div class="v-scrim" style="background:${SCRIM[scrim] || scrim}"></div>`}`,
    // 展示板背景（demo 里写 boardDeco: ui.stageBg(img('x'), { pos: '40% 50%' })）：同一张照片糊开，和图册舞台一样；tint 是压暗层的不透明度，亮照片调到 .3 左右，白标题才看得清；sat 是饱和度；纯色背景的项目 ui.stageBg(null, { fill: 'linear-gradient(…)' })
    stageBg: (src, { pos = '40% 50%', blur = 26, tint = .12, sat = 1.2, fill = '' } = {}) => `<div style="position:absolute;inset:0;background:${fill || `url(${src}) ${pos}/cover`}"></div><div style="position:absolute;inset:0;-webkit-backdrop-filter:blur(${blur}px) saturate(${sat});backdrop-filter:blur(${blur}px) saturate(${sat});background:rgba(10,28,36,${tint})"></div>`,
    // 字标：苹方中粗宽字距 + 可选 Outfit 英文，没有底色；sym 放一段 SVG 记号（默认不要）
    logo: (name, en = '', sym = '') => `<div class="v-logo">${sym}<b>${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // 网页字标：wordmark('MANYOU', '漫游', 'left:238px;top:43px')，英文在前、中文小字在后
    wordmark: (en, name = '', at = '') => `<div class="v-wmk v-ts ${ab(at)}" style="${at}">${en}${name ? `<small>${name}</small>` : ''}</div>`,
    // App 顶栏：左右是圆形玻璃按钮，不要底色；首页写 left: ui.logo(…)
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? circle('chevron-left', { ic: 24, sw: 2.2, attrs: 'data-back' }) : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 圆形玻璃按钮：circle('share', { d: 48, s: 30, bl: 7, at: 'right:16px;top:498px', attrs: 'data-go="x"' })；name 也可以传一段 SVG，ic 改图标大小；s 是折射强度，bl 是模糊半径（下面几个玻璃件都有这两个参数）
    circle,
    // 成组的圆角玻璃按钮：pair(['share', 'ellipsis'], { w: 92, go: [null, 'web'] })，同一块玻璃里放几个图标；go[i] 是第 i 个图标跳去的屏幕编号
    pair: (names, { w = 92, h = 48, s, bl = 0, at = '', attrs = '', go = [] } = {}) => `<div class="v-g v-grp ${ab(at)}" style="${at}${lens(w, h, h / 2, s)}${blv(bl)}" ${attrs}>${names.map((n, i) => (go[i] ? `<span class="v-cir" data-go="${go[i]}">${icon(n, 20, 2)}</span>` : icon(n, 20, 2))).join('')}</div>`,
    // 玻璃块：glass(内容, { w: 343, h: 170, r: 30, s: 48, at: 'left:16px;top:458px', thick: true, bl: 7, cls, attrs })；w、h 是折射图尺寸，要写准；字多时 thick；bl 改模糊半径（底下对比强时调到 6–8）
    glass: (html, { w, h, r = 30, s, at = '', thick = false, bl = 0, cls = '', attrs = '' } = {}) => `<div class="v-g ${ab(at)} ${thick ? 'thick' : ''} ${cls}" style="${at}${w ? lens(w, h, r, s) : ''}${bl ? `--bl:${bl}px;` : ''}" ${attrs}>${html}</div>`,
    // 收起的小胶囊：capsule('10:30', '路易斯湖', { w: 166, at: 'left:16px;top:642px', attrs })；lead 是 Outfit 数字，也可以传一段 SVG 图标
    capsule: (lead, text, { w = 166, h = 50, s, bl = 0, at = '', attrs = '' } = {}) => `<div class="v-g v-cps ${ab(at)}" style="${at}${lens(w, h, h / 2, s)}${blv(bl)}" ${attrs}>${/^</.test(lead) ? lead : `<span class="v-num">${lead}</span>`}${text}</div>`,
    // 悬浮标签栏：当前项展开带字，其余收成图标；opt.side 是右边圆按钮的图标（默认 search，'' 不要），opt.sideGo 它的跳转；opt.all 为 true 时全部带字通栏（图册半山咖啡那种）；opt.s、opt.bl 是折射强度和模糊半径
    tabs: (items, cur = 0, go = [], { side = 'search', sideGo = '', all: wide = false, s, bl = 0 } = {}) => {
      const onlyBar = wide || !side;
      const w = onlyBar ? 343 : 271;
      const cells = items.map(([ic, t], i) => {
        const a = go[i] ? `data-go="${go[i]}"` : '';
        if (i === cur) return `<div class="on" ${a}>${icon(ic, wide ? 19 : 20, 2)}${t}</div>`;
        return wide ? `<div class="it" ${a}>${icon(ic, 19, 2)}${t}</div>` : `<div class="it" ${a}>${icon(ic, 22, 1.9)}</div>`;
      }).join('');
      return `<div class="v-tabs ${wide ? 'all' : ''}" style="left:16px;bottom:26px;${lens(w, 64, 32, s)}${blv(bl)}">${cells}</div>${onlyBar ? '' : circle(side, { d: 64, s, bl, ic: 24, sw: 2.1, at: 'right:16px;bottom:26px;z-index:6;', attrs: sideGo ? `data-go="${sideGo}"` : '' })}`;
    },
    // 主按钮：白胶囊；箭头类图标放字后面，别的图标放字前面；cls 'wide' 通栏 / 'ghost' 玻璃次按钮（传 w 才有折射）；ic '' 不要图标；w、h 改宽高，实心和玻璃都生效
    btn: (text, { ic = '', cls = '', attrs = '', w = 0, h = 0 } = {}) => {
      const ico = ic ? icon(ic, /\bwide\b/.test(cls) ? 18 : 16, 2.2) : '';
      const st = /\bghost\b/.test(cls) && w ? `${lens(w, h || 46, (h || 46) / 2)}padding:0` : `${w ? `width:${w}px;padding:0;` : ''}${h ? `height:${h}px;border-radius:${h / 2}px;` : ''}`;
      return `<div class="v-btn ${cls}" ${st ? `style="${st}"` : ''} ${attrs}>${ic.startsWith('arrow') ? text + ico : ico + text}</div>`;
    },
    // 分段胶囊：seg(['1', '2', '第 3 天', '4'], 2, { w: 343, at: 'left:16px;top:118px', go: [] })；当前项白胶囊，其余收成小圆；不是纯数字的项自动放宽
    seg: (items, cur = 0, { w = 343, h = 52, s, at = '', go = [] } = {}) => `<div class="v-chips ${ab(at)}" style="${at}${lens(w, h, h / 2, s)}">${items.map((t, i) => `<span class="v-chip ${i === cur ? 'on' : (/^\d{1,2}$/.test(t) ? '' : 'tx')}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 搜索框：input('搜索地点', { w: 283, at: 'left:16px;top:58px' })
    input: (text, { ic = 'search', w = 283, at = '' } = {}) => `<div class="v-inp ${ab(at)}" style="${at}${lens(w, 48, 24)}">${icon(ic, 19, 2.1)}<span>${text}</span></div>`,
    // 卡片：card({ src: img('x'), h: 168, title: '云杉谷木屋', meta: '2 晚', w: 343, ht: 280, attrs })；w、ht 是整张卡的尺寸（有它才折射）
    card: ({ src = '', h = 168, pos = '50% 50%', title = '', meta = '', w = 0, ht = 0, attrs = '' } = {}) => `<div class="v-card" style="${w ? lens(w, ht, 30) : ''}" ${attrs}>${src ? `<div class="ph" style="height:${h}px;background-image:url(${src});background-position:${pos}"></div>` : ''}<div class="bd"><div class="v-h3">${title}</div>${meta ? `<div class="v-mut" style="margin-top:8px">${meta}</div>` : ''}</div></div>`,
    // 列表行：row({ lead, title, meta, end, on, w: 343, attrs })，放在 .v-list 里；lead 是左边的序号或图标，end 是右边的时长；on 为 true 时展开成玻璃胶囊，w 写胶囊宽度
    row: ({ lead = '', title = '', meta = '', end = '', on = false, w = 327, h = 64, attrs = '' } = {}) => `<div class="v-row ${on ? 'on v-g' : ''}" ${on ? `style="${lens(w, h, 24, 26)}"` : ''} ${attrs}>${lead}<div class="tx"><div class="n">${title}</div>${meta ? `<div class="m">${meta}</div>` : ''}</div>${end ? `<div class="e">${end}</div>` : ''}</div>`,
    // 方形封面：cover(img('x'), { d: 44, r: 12 })
    cover: (src, { d = 44, r = 12, pos = '50% 50%' } = {}) => `<div class="v-cover" style="width:${d}px;height:${d}px;border-radius:${r}px;background-image:url(${src});background-position:${pos}"></div>`,
    // 悬浮条：bar({ cover: ui.cover(img('x'), …), title: '水中山', meta: '陈向晚', right: icon(…), w: 343, h: 60, at: 'left:16px;bottom:102px', thick: true, attrs })；字压在亮处时 thick，s、bl 是折射强度和模糊半径
    bar: ({ cover = '', title = '', meta = '', right = '', w = 343, h = 60, s, bl = 0, thick = false, at = 'left:16px;bottom:102px;', attrs = '' } = {}) => `<div class="v-g v-bar ${thick ? 'thick' : ''}" style="${at}${lens(w, h, h / 2, s)}${blv(bl)}" ${attrs}>${cover}<div class="tx"><div class="n">${title}</div>${meta ? `<div class="m">${meta}</div>` : ''}</div>${right ? `<div class="ac">${right}</div>` : ''}</div>`,
    // 进度：seek({ now: '1:48', end: '−2:36', pct: 41 })；pct 是百分比，放在玻璃里
    seek: ({ now = '', end = '', pct = 0 } = {}) => `<div class="v-seek"><span>${now}</span><div class="tr"><div class="fl" style="width:${pct}%"></div><div class="kn" style="left:${pct}%"></div></div><span>${end}</span></div>`,
    // 竖排聚焦：stack(['上一句', '当前句', '下一句'], 1)；当前一条 44px 极细，其余 19px 降到 .62（歌词、节目单、步骤）
    stack: (items, cur = 0) => `<div class="v-stack">${items.map((t, i) => `<div class="${i === cur ? 'on' : ''}">${t}</div>`).join('')}</div>`,
    // 数字组：stats([['72', 'km', '自驾'], ['10', '小时', '全天']])，每项 [数字, 单位, 标签]
    stats: (items) => `<div class="v-stats">${items.map(([n, u, t]) => `<div><b>${n}${u ? `<small>${u}</small>` : ''}</b><span>${t}</span></div>`).join('')}</div>`,
    // 起止对：span(['9.24', '周四 15:00 后入住'], ['9.26', '周六 11:00 前退房'], '2 晚')，中间是一颗小玻璃
    span: (a, b, mid = '') => `<div class="v-dts"><div><b>${a[0]}</b><span>${a[1]}</span></div>${mid ? `<div class="v-g nt" style="${lens(62, 34, 17)}">${mid}</div>` : ''}<div style="text-align:right"><b>${b[0]}</b><span>${b[1]}</span></div></div>`,
    // 确认号一行：kv('确认号', 'MY-48217')，前面通常放一条 <div class="v-hr"></div>
    kv: (k, v) => `<div class="v-cf"><span>${k}</span><b>${v}</b></div>`,
    // 地图钉：pin(1, { x: 236, y: 464, now: true })；地名：mapLabel('梦莲湖', { x: 164, y: 494 })
    pin: (n, { x = 0, y = 0, now = false } = {}) => `<div class="v-pin ${now ? 'now' : ''}" style="left:${x}px;top:${y}px">${n}</div>`,
    mapLabel: (text, { x = 0, y = 0 } = {}) => `<div class="v-ml" style="left:${x}px;top:${y}px">${text}</div>`,
    // 网页导航胶囊：wnav(['行程', '地图'], 0, { w: 322, at: 'left:479px;top:30px', go: [] })；当前项白胶囊
    wnav: (items, cur = 0, { w = 322, h = 52, at = '', go = [] } = {}) => `<div class="v-g v-wnav ${ab(at)}" style="${at}${lens(w, h, h / 2, 30)}">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 网页头像：avatar(img('p-woman-8'), { at: 'left:994px;top:32px' })，48px 玻璃圆里放 42px 照片
    avatar: (src, { at = '', attrs = '' } = {}) => `<div class="v-g v-cir ${ab(at)}" style="${at}overflow:hidden;${lens(48, 48, 24)}" ${attrs}><img src="${src}" style="width:42px;height:42px;border-radius:21px;object-fit:cover"></div>`,
    // 网页列表行：wrow({ lead: '07:00', title: '梦莲湖', meta: '停留 3 小时', right, ex: true, w: 576, h: 76 })；ex 为 true 时展开成玻璃条，放在 .v-panel 里
    wrow: ({ lead = '', title = '', sub = '', meta = '', right = '', ex = false, w = 576, h = 76, attrs = '' } = {}) => `<div class="v-wrow ${ex ? 'ex v-g' : ''}" ${ex ? `style="${lens(w, h, 24, 26)}"` : ''} ${attrs}><span class="tt">${lead}</span><div><div class="n">${title}</div>${sub ? `<div class="m" style="margin-top:5px">${sub}</div>` : ''}</div>${right || (meta ? `<span class="m">${meta}</span>` : '<span></span>')}</div>`,
  };
  return { key: 's14-glass', no: 14, name: '液态玻璃', root: 's14', T, css, ui, stage: T.accents.night, dark: true, boardFont: FH, boardWeight: 200 };
};
