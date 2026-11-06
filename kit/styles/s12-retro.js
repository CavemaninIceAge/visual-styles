// 12 复古胶片 Retro —— 起手包
// 色值、字体、字号、纸纹颗粒、照片漏光、票根、邮戳、唱片、胶卷都照图册模块 catalog/pages/s12-retro.js（回声）原样取
// 颗粒图块比图册铺得细一档（180 铺成 140），其余数值不变
// 用法：const S = style('s12-retro'); 屏幕根元素 <div class="scr s12">；组件见 S.ui
// 换品牌色：项目 css 写 .p{--mu:主色;--br:强调色;--tl:冷色;--cr:纸底;--k:字色}，彩虹拱、邮戳、暗盒走各自的颜色参数
module.exports = (L) => {
  const { icon } = L;
  // 模块里的全部颜色（色卡五色 + 模块里写死的物件色）
  const C = {
    cream: '#F2E6CC',    // 奶油白：纸
    mustard: '#D99A2B',  // 芥末黄：票根、主按钮
    brick: '#A63F2A',    // 砖红：西文大字、价格、小标题、当前标签、邮戳
    teal: '#4F8C84',     // 旧青绿：票根右联、可选座位、展示板舞台（界面里只放这几处）
    brown: '#3A2618',    // 深棕：字、线
    film: '#1E1510',     // 胶卷片基
    print: '#FBF4E4',    // 拍立得相纸白、单据纸
    kraft: '#E6D4AE',    // 牛皮纸：次按钮
    cap: '#E9DCC0',      // 唱臂、浅色金属件
    edge: '#E0892F',     // 胶卷边上的字
    off: '#D6C8AC',      // 已订、不可选
    ink2: '#6E5C4A',     // 次要字（深棕 72% 叠在奶油白上）
  };
  const { cream: CR, mustard: MU, brick: BR, teal: TL, brown: BN, film: FM } = C;
  const T = {
    bg: CR,                 // 奶油白旧纸（根类自带颗粒 + 大块斑驳 + 四周压暗）
    surface: C.print,       // 拍立得白边、单据纸；标签栏是和页面一样的旧纸
    ink: BN,
    ink2: C.ink2,
    line: 'rgba(58,38,24,.4)',      // 列表行之间 1px 虚线；标签栏、输入框是 1.5px rgba(58,38,24,.75)
    primary: MU,            // 芥末黄：票根形主按钮、主要入口
    onPrimary: BN,
    accents: { brick: BR, teal: TL, film: FM, print: C.print, kraft: C.kraft, cap: C.cap, edge: C.edge, off: C.off },
    fonts: { title: '"Noto Serif SC"', body: '"Noto Serif SC"', num: '"Fraunces"', mono: '"Courier Prime"' },
    radius: 2,              // 照片、封套 2–3px；票根四角是 10px 凹角（.v-sc）
    border: '1.5px solid rgba(58,38,24,.75)',   // 双线：标签栏上沿、列表上沿
    shadow: '0 10px 22px -10px rgba(40,20,10,.55)',   // 拍立得、胶卷、唱片这些「放在桌上的物件」才有
    margin: 24,
    photo: 'sepia(.22) saturate(.95) contrast(.94) brightness(1.05)',   // 外加暖色柔光、褪色、漏光、灰尘颗粒四层（ui.photo 自带）
  };

  const uri = (svg) => `url('data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}')`;
  // 细颗粒（深色斑点）
  // 180 的图块铺成 140：2 倍图放大看才是细颗粒，不是一条条的虫纹
  const GRAIN = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".92" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .22 0 0 0 0 .14 0 0 0 0 .08 0 0 0 1 -.5"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`) + ' 0 0/140px 140px';
  // 旧纸的大块斑驳（图块比屏幕大，免得重复出接缝）
  const MOTTLE = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="1300"><filter id="m"><feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .58 0 0 0 0 .4 0 0 0 0 .2 0 0 0 .55 -.2"/></filter><rect width="100%" height="100%" filter="url(#m)"/></svg>`);
  // 照片上的亮斑灰尘
  const DUST = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="d"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="1" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .95 0 0 0 0 .85 0 0 0 1.6 -.62"/></filter><rect width="100%" height="100%" filter="url(#d)"/></svg>`);
  const PAPER = `${GRAIN},${MOTTLE},radial-gradient(130% 100% at 50% 30%,transparent 55%,rgba(140,90,40,.18)),var(--cr)`;
  // 票根的 10px 凹角：四个角各挖一个四分之一圆。两块并排时，中间自然拼出打孔缺口
  const SC = ['0 0', '100% 0', '0 100%', '100% 100%'].map((p) => `radial-gradient(circle at ${p},#0000 var(--r),#000 calc(var(--r) + .5px)) ${p}/51% 51% no-repeat`).join(',');

  const SERIF = '"Noto Serif SC",serif';
  const FR = 'Fraunces,"Noto Serif SC",serif';
  const TW = '"Courier Prime","Noto Serif SC",serif';
  const SOFT = 'font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144';
  const OF = 'text-shadow:.045em .045em 0 var(--cr),.09em .09em 0 var(--mu)';

  const css = `
.s12{--cr:${CR};--mu:${MU};--br:${BR};--tl:${TL};--k:${BN};--k2:${C.ink2};--fm:${FM};--pr:${C.print};--r:10px;isolation:isolate;background:${PAPER};color:var(--k);font:500 15px/1.6 ${SERIF};-webkit-font-smoothing:antialiased}
.s12 .v-pad{padding-left:24px;padding-right:24px}
.s12 .v-ab{position:absolute}
/* 三种字：粗宋（中文标题）、Fraunces 软黑（西文、数字、价格）、Courier Prime 打字机（日期、编号、规格） */
.s12 .v-sr{font-family:${SERIF};font-weight:900;line-height:1.15}
.s12 .v-fr{font-family:${FR};font-weight:900;${SOFT};line-height:1;letter-spacing:-.01em}
.s12 .v-fri{font-family:${FR};font-style:italic;font-weight:600;font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 72}
.s12 .v-tw{font-family:${TW};font-weight:700;font-size:14px;letter-spacing:.02em}
/* 错位双影：奶油白一层 + 芥末黄一层，像套色没对准的老印刷；.v-of2 是砖红影 */
.s12 .v-of{${OF}}
.s12 .v-of2{text-shadow:.04em .04em 0 var(--cr),.08em .08em 0 var(--br)}
.s12 .v-kick{font:700 12px/1 ${TW};letter-spacing:.2em;color:var(--br)}
/* 七十年代大斜体：菜单页的 Coffee，配一行粗宋 */
.s12 .v-en{font:italic 900 54px/1 ${FR};font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 72;color:var(--br)}
/* 署名行：粗宋 + 砖红 Fraunces 大数字（程川 1979、第 1 卷 36 张） */
.s12 .v-by{display:flex;align-items:baseline;gap:8px}
.s12 .v-by span{font:900 17px/1.15 ${SERIF}}
.s12 .v-by b{font:900 32px/1 ${FR};${SOFT};letter-spacing:-.01em;color:var(--br)}
.s12 .v-h1{font:900 46px/1.15 ${SERIF};letter-spacing:.01em;${OF}}
.s12 .v-hero{font:900 96px/1.1 ${SERIF};letter-spacing:.04em;${OF}}
.s12 .v-h2{font:900 28px/1.15 ${SERIF}}
.s12 .v-h3{font:600 17px/1.35 ${SERIF}}
.s12 .v-tx{font:600 15px/1.7 ${SERIF}}
.s12 .v-mut{font:700 13px/1.4 ${TW};letter-spacing:.04em;color:var(--k2)}
.s12 .v-num{font-family:${FR};font-weight:900;${SOFT};letter-spacing:-.01em}
.s12 .v-big{font:900 84px/1 ${FR};${SOFT};letter-spacing:-.01em;color:var(--br);margin-left:-3px}
.s12 .v-price{display:inline-block;font:900 44px/1 ${FR};${SOFT};color:var(--br);white-space:nowrap}
.s12 .v-price::first-letter{font-size:.5em}
.s12 .v-price small{font:600 15px/1 ${SERIF};color:var(--k2);margin-left:4px;letter-spacing:.02em}
/* 按钮 = 票根：芥末黄主联 + 旧青绿副联，四角凹、中间虚线打孔；.dark 深棕主联 + 芥末黄副联（结算条）；.ghost 牛皮纸 */
.s12 .v-btn{display:inline-flex;height:60px;vertical-align:middle}
.s12 .v-btn>.m{display:flex;align-items:center;gap:8px;padding:0 26px 0 22px;background:${GRAIN},var(--mu);color:var(--k);font:900 20px/1 ${SERIF};letter-spacing:.04em;white-space:nowrap}
.s12 .v-btn>.s{flex:none;width:72px;display:grid;place-items:center;background:${GRAIN},var(--tl);color:var(--cr);border-left:2px dashed rgba(242,230,204,.7)}
.s12 .v-btn.wide{display:flex;width:100%;height:64px}
.s12 .v-btn.wide>.m{flex:1;font-size:22px}
.s12 .v-btn.ghost>.m{background:${GRAIN},${C.kraft}}
.s12 .v-btn.ghost>.s{background:${GRAIN},var(--k)}
.s12 .v-btn.dark>.m{background:${GRAIN},var(--k);color:var(--cr)}
.s12 .v-btn.dark>.s{background:${GRAIN},var(--mu);color:var(--k);border-left-color:rgba(58,38,24,.45)}
.s12 .v-btn.sm{height:48px}
.s12 .v-btn.sm>.m{font-size:17px;padding:0 20px 0 18px}
.s12 .v-btn.sm>.s{width:56px}
.s12 .v-btn>*,.s12 .v-tk>*,.s12 .v-chip,.s12 .v-sc{-webkit-mask:${SC};mask:${SC}}
/* 票根卡：左联写事、右联写价钱和动作 */
.s12 .v-tk{position:relative;display:flex}
.s12 .v-tk>.m{flex:1;min-width:0;padding:18px 18px 0 20px;background:${GRAIN},var(--mu);color:var(--k)}
.s12 .v-tk>.s{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:${GRAIN},var(--tl);color:var(--cr);border-left:2px dashed rgba(242,230,204,.7)}
.s12 .v-tk .v-price{color:inherit;font-size:32px}
.s12 .v-tk .go{display:flex;align-items:center;gap:2px;font:900 16px/1 ${SERIF}}
/* 票根抬头：粗宋事由 + 砖红 Fraunces 编号 */
.s12 .v-tkh{display:flex;align-items:baseline;gap:10px}
.s12 .v-tkh b{font:900 28px/1.15 ${SERIF}}
.s12 .v-tkh em{font:900 21px/1 ${FR};${SOFT};font-style:normal;letter-spacing:-.01em;color:var(--br)}
.s12 .v-bar{position:absolute;left:16px;right:16px;bottom:24px;z-index:6}
/* 结算条（ui.settle）：粗宋文案 + 芥末黄 Fraunces 大数字 + 小一档收尾字，副联写动作 */
.s12 .v-set{display:flex;align-items:baseline;gap:10px;padding-top:7px}
.s12 .v-set span{font:900 20px/1.15 ${SERIF}}
.s12 .v-set b{font:900 28px/1 ${FR};${SOFT};letter-spacing:-.01em;color:var(--mu)}
.s12 .v-set small{font:900 16px/1.15 ${SERIF}}
.s12 .v-sgo{display:flex;align-items:center;gap:4px;font:900 18px/1.15 ${SERIF}}
/* 卡片 = 拍立得：相纸白边，下面留宽边写字 */
.s12 .v-card{position:relative;background:${GRAIN},var(--pr);padding:9px 9px 0;box-shadow:${T.shadow}}
.s12 .v-card>.ph,.s12 .v-card>.v-photo{height:200px}
.s12 .v-card .bd{padding:12px 4px 16px}
.s12 .v-pol{position:relative;background:${GRAIN},var(--pr);padding:9px 9px 34px;box-shadow:${T.shadow}}
.s12 .v-pol .pcap{position:absolute;left:12px;right:12px;bottom:0;height:34px;display:flex;align-items:center;justify-content:space-between;font:700 13px/1 ${TW};letter-spacing:.06em;color:var(--k2)}
.s12 .v-tape{position:absolute;width:74px;height:22px;background:rgba(236,220,180,.75);box-shadow:0 1px 2px rgba(0,0,0,.08)}
/* 单据纸：顶上三色条，像老冲印店的取件袋、点单小票 */
.s12 .v-slip{position:relative;background:${GRAIN},var(--pr);padding:30px 20px 6px;box-shadow:${T.shadow}}
.s12 .v-slip>.st{position:absolute;left:0;right:0;top:0;height:16px}
.s12 .v-slip .v-row{min-height:64px}
.s12 .v-slip .v-row:last-child{border-bottom:none}
.s12 .v-slip .v-mut{color:var(--k)}
/* 列表：上沿双线（1.5px，隔 3px 再一道，第二道画在背景里，中间透出纸纹），行之间 1px 虚线（菜单、价目、进度） */
.s12 .v-list{border-top:1.5px solid rgba(58,38,24,.75);background:linear-gradient(rgba(58,38,24,.75),rgba(58,38,24,.75)) 0 3px/100% 1.5px no-repeat;padding-top:4.5px}
.s12 .v-list.bare{border-top:none;background:none;padding-top:0}
.s12 .v-row{display:flex;align-items:center;gap:10px;min-height:58px;padding:10px 0;border-bottom:1px dashed rgba(58,38,24,.4)}
.s12 .v-row .lead{flex:1}
.s12 .v-no{font:700 13px/1 ${TW};opacity:.6}
.s12 .v-row .n{font:600 17px/1.3 ${SERIF}}
.s12 .v-row .p{font:700 17px/1 ${TW}}
.s12 .v-add{flex:none;width:26px;height:26px;border-radius:50%;border:1.6px solid var(--k);display:grid;place-items:center}
.s12 .v-add.on{background:var(--k);color:var(--cr)}
.s12 .v-step{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center}
.s12 .v-step.done{background:var(--k);color:var(--cr)}
.s12 .v-step.now{background:var(--br);color:var(--cr)}
.s12 .v-step.todo{border:1.6px dashed rgba(58,38,24,.55)}
.s12 .v-chips{display:flex;gap:8px;flex-wrap:wrap}
/* 筛选：牛皮纸小票根，四角凹，选中换深棕 */
.s12 .v-chip{--r:5px;height:34px;padding:0 15px;display:inline-flex;align-items:center;background:${GRAIN},${C.kraft};font:600 14px/1 ${SERIF};white-space:nowrap}
.s12 .v-chip.on{background:${GRAIN},var(--k);color:var(--cr)}
.s12 .v-inp{height:52px;display:flex;align-items:center;gap:10px;padding:0 2px;border-bottom:1.5px solid rgba(58,38,24,.75);font:700 15px/1 ${TW}}
/* 照片：褪色 + 暖色柔光 + 抬黑 + 一角漏光 + 灰尘颗粒 */
.s12 .ph{filter:${T.photo}}
.s12 .v-photo{position:relative;overflow:hidden;border-radius:2px}
.s12 .v-photo.fill{position:absolute;inset:0}
.s12 .v-photo>i{position:absolute;inset:0}
.s12 .v-photo .im{background-size:cover;background-position:center;filter:${T.photo}}
.s12 .v-photo .wa{background:rgba(255,176,96,.42);mix-blend-mode:soft-light}
.s12 .v-photo .fd{background:#46301F;mix-blend-mode:lighten;opacity:.8}
.s12 .v-photo .lk{mix-blend-mode:screen}
.s12 .v-photo .lk.tl{background:radial-gradient(75% 95% at -6% -6%,rgba(255,150,60,1),rgba(255,92,24,.85) 30%,rgba(230,60,20,.35) 55%,transparent 80%)}
.s12 .v-photo .lk.tr{background:radial-gradient(70% 95% at 106% -6%,rgba(255,150,60,1),rgba(255,92,24,.85) 30%,rgba(230,60,20,.35) 55%,transparent 80%)}
.s12 .v-photo .lk.l{background:linear-gradient(90deg,rgba(255,120,40,1),rgba(255,90,30,.7) 14%,rgba(255,140,50,.25) 32%,transparent 50%)}
.s12 .v-photo .lk.r{background:linear-gradient(270deg,rgba(255,120,40,1),rgba(255,90,30,.7) 14%,rgba(255,140,50,.25) 32%,transparent 50%)}
.s12 .v-photo .lk.bl{background:radial-gradient(70% 85% at -6% 106%,rgba(255,140,50,1),rgba(255,90,24,.8) 30%,rgba(230,60,20,.3) 55%,transparent 78%)}
.s12 .v-photo .lk.br{background:radial-gradient(70% 85% at 106% 106%,rgba(255,140,50,1),rgba(255,90,24,.8) 30%,rgba(230,60,20,.3) 55%,transparent 78%)}
.s12 .v-photo .gr{background:${DUST},${GRAIN};background-size:120px 120px,110px 110px;opacity:.42}
/* 胶卷：深棕片基、奶油白齿孔、边上橙色打字 */
.s12 .v-film{position:relative;background:var(--fm);box-shadow:0 10px 24px -12px rgba(40,20,10,.5)}
.s12 .v-film .fr{position:absolute;border-radius:3px;overflow:hidden}
.s12 .v-film .burn{position:absolute;inset:0;background:${GRAIN},radial-gradient(90% 70% at 0% 40%,#FFC274,#E8742A 45%,#9A3A16 80%,#5A2210)}
.s12 .v-film .eg{position:absolute;font:700 11px/1 ${TW};color:${C.edge};letter-spacing:.12em;white-space:nowrap}
/* 唱片封套、唱片、唱机 */
.s12 .v-slv{position:absolute;overflow:hidden;border-radius:2px;box-shadow:0 12px 24px -10px rgba(40,20,10,.6),inset 0 0 0 1px rgba(58,38,24,.25)}
.s12 .v-vy{position:relative;border-radius:50%;background:conic-gradient(from 30deg,rgba(255,240,210,0) 0deg,rgba(255,240,210,.16) 28deg,rgba(255,240,210,0) 62deg,rgba(255,240,210,0) 180deg,rgba(255,240,210,.12) 208deg,rgba(255,240,210,0) 242deg),repeating-radial-gradient(circle,#1D1612 0 1.1px,#2B231D 1.1px 2.4px);box-shadow:inset 0 0 0 3px #140F0B,0 14px 26px -12px rgba(40,20,10,.6)}
.s12 .v-vy .lb{position:absolute;left:32%;top:32%;width:36%;height:36%;border-radius:50%;display:grid;place-items:center}
.s12 .v-vy .lr{position:absolute;inset:14%;border-radius:50%;border:2px solid rgba(58,38,24,.55)}
.s12 .v-vy .la{position:relative;margin-top:-26%}
.s12 .v-vy .ho{position:absolute;left:50%;top:50%;width:8%;height:8%;margin:-4% 0 0 -4%;border-radius:50%;background:var(--cr)}
.s12 .v-tt{position:relative}
.s12 .v-tt .pl{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,#B9A27A 0 69%,#D9C7A1 71%,#CDB891 100%);box-shadow:inset 0 0 0 1.5px rgba(58,38,24,.45),0 16px 30px -14px rgba(40,20,10,.65)}
/* 邮戳、橡皮章：正片叠底压在纸上 */
.s12 .v-stamp{position:absolute;mix-blend-mode:multiply;opacity:.9;z-index:4;pointer-events:none}
.s12 .v-obj{filter:drop-shadow(0 12px 14px rgba(40,20,10,.32))}
.s12 .v-loop{position:absolute;z-index:4;pointer-events:none;overflow:visible}
/* 顶栏、标签栏、字标 */
.s12 .v-nav{position:relative;height:52px;margin:0 16px;display:flex;align-items:center;justify-content:space-between}
.s12 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:900 18px/1 ${SERIF};white-space:nowrap}
.s12 .v-ib{display:flex;align-items:center}
.s12 .v-logo{display:inline-flex;align-items:flex-end;gap:8px;color:var(--k)}
.s12 .v-logo>svg{margin-bottom:.12em}
.s12 .v-logo b{font-family:${SERIF};font-weight:900;line-height:1;letter-spacing:.06em;text-shadow:.05em .05em 0 var(--cr),.1em .1em 0 var(--mu)}
.s12 .v-logo em{font-family:${FR};font-style:italic;font-weight:600;font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 72;color:var(--br);line-height:1;margin-left:2px}
.s12 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;display:flex;justify-content:space-around;padding:10px 12px 0;border-top:1.5px solid rgba(58,38,24,.75);box-shadow:inset 0 3px 0 var(--cr),inset 0 4.5px 0 rgba(58,38,24,.75);background:${PAPER};z-index:6}
.s12 .v-tabs>div{display:flex;flex-direction:column;align-items:center;gap:3px;width:64px;font:600 11px/1.3 ${SERIF};color:rgba(58,38,24,.62)}
.s12 .v-tabs>div.on{color:var(--br);font-weight:900}
/* 网页 */
.s12 .v-wnav{position:absolute;left:56px;right:56px;top:30px;height:60px;display:flex;align-items:center;z-index:5}
.s12 .v-wnav nav{display:flex;gap:44px;margin-left:auto;margin-right:40px;font:600 18px/1 ${SERIF}}
/* 顶栏右端的地址：写 .v-tw。主字体是 Courier，中文回落到宋体，字面比导航字高 3px，这里压回来 */
.s12 .v-wnav>.v-tw{position:relative;top:3px;font-size:15px;line-height:1}
/* 订座：弧排座位、音箱 */
.s12 .v-seats{position:relative}
.s12 .v-seat{position:absolute;width:38px;height:34px;margin:-17px 0 0 -19px}
.s12 .v-legend{display:flex;justify-content:center;gap:30px;font:600 14px/1 ${SERIF}}
.s12 .v-legend span{display:flex;align-items:center;gap:7px}
.s12 .v-spk{width:40px;height:58px;border-radius:5px;background:var(--k);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;box-shadow:0 8px 16px -8px rgba(40,20,10,.6)}
.s12 .v-spk i{display:block;border-radius:50%;border:2px solid #C9A877;background:radial-gradient(circle,#5A3E28 0 30%,#2A1C12 32%)}
`;

  let uid = 0;
  // 品牌记号：七十年代彩虹拱。arch(宽, [外圈色, …, 内圈色])
  const arch = (w, cols = [MU, BR, TL]) => {
    const n = cols.length, sw = 40 / (2 * n + 1);
    return `<svg width="${w}" height="${w / 2}" viewBox="0 0 40 20" style="display:block">${cols.map((c, i) => { const r = 20 - sw * (i + .5); return `<path d="M${20 - r} 20A${r} ${r} 0 0 1 ${20 + r} 20" fill="none" stroke="${c}" stroke-width="${sw}"/>`; }).join('')}</svg>`;
  };
  // 大彩虹拱（网页、展示板背景）：圆心在底边中点
  const rainbow = (w, cols = [MU, BR, TL]) => { const n = cols.length, bw = w / 2 / (n + 1.4); return `<svg width="${w}" height="${w / 2}" viewBox="0 0 ${w} ${w / 2}" style="display:block">${cols.map((c, i) => { const r = w / 2 - bw * (i + .5); return `<path d="M${w / 2 - r} ${w / 2}A${r} ${r} 0 0 1 ${w / 2 + r} ${w / 2}" fill="none" stroke="${c}" stroke-width="${bw + .5}"/>`; }).join('')}</svg>`; };
  // 角上的四分之一彩虹弧（圆心在右上角）
  const cornerArch = (R, cols = [MU, BR, CR]) => { const sw = R / (cols.length + 1.6); return `<svg width="${R}" height="${R}" viewBox="0 0 ${R} ${R}" style="display:block">${cols.map((c, i) => { const r = R - sw * (i + .5); return `<path d="M${R - r} 0A${r} ${r} 0 0 0 ${R} ${r}" fill="none" stroke="${c}" stroke-width="${sw + .5}"/>`; }).join('')}</svg>`; };

  // 照片层：滤镜 + 暖光 + 抬黑 + 漏光 + 灰尘
  const layers = (src, { pos = 'center', leak = 'tr', size = 'cover' } = {}) => `<i class="im" style="background-image:url(${src});background-position:${pos};background-size:${size}"></i><i class="wa"></i><i class="fd"></i>${leak && leak !== 'none' ? `<i class="lk ${leak}"></i>` : ''}<i class="gr"></i>`;
  // 照片：不给 h 就铺满父元素（父元素要 position:relative/absolute）
  const photo = (src, { w, h, pos, leak, size, cls = '', style = '', attrs = '' } = {}) => `<div class="v-photo ${h ? '' : 'fill'} ${cls}" style="${w ? `width:${w}px;` : ''}${h ? `height:${h}px;` : ''}${style}" ${attrs}>${layers(src, { pos, leak, size })}</div>`;

  // 胶卷：frames = [[src, 宽, 取景位置, 漏光, 尺寸], …]，src 为 null 是一格曝光过头的橙色
  // edge 是印在上边的片名（'' 不印字，齿孔边窄一点），no 是第一格的编号，印在下边
  function film(w, h, frames, { edge = 'SAFETY 400', no = 22, gap = 12, ex = 16, style = '', attrs = '' } = {}) {
    const id = 'x12f' + (++uid);
    const band = edge ? 36 : 28;
    const holes = `<svg width="${w}" height="20" style="display:block"><defs><pattern id="${id}" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="5" y="4" width="10" height="12" rx="2.4" fill="${CR}"/></pattern></defs><rect width="${w}" height="20" fill="url(#${id})"/></svg>`;
    const fh = h - band * 2;
    let x = 12;
    const fr = frames.map(([src, fw, pos, leak, size], i) => {
      const nums = edge ? `<span class="eg" style="left:${x + 4}px;top:${h - band + 3}px">▸ ${no + i}</span><span class="eg" style="left:${x + Math.round(fw * .62)}px;top:${h - band + 3}px">${no + i}A</span>` : '';
      const s = `<div class="fr" style="left:${x}px;top:${band}px;width:${fw}px;height:${fh}px">${src ? `<div class="v-photo fill">${layers(src, { pos, leak, size })}</div>` : '<i class="burn"></i>'}</div>${nums}`;
      x += fw + gap; return s;
    }).join('');
    return `<div class="v-film" style="width:${w}px;height:${h}px;${style}" ${attrs}><div style="position:absolute;left:0;top:4px">${holes}</div>${edge ? `<span class="eg" style="left:${ex}px;top:22px">${edge}</span>` : ''}${fr}<div style="position:absolute;left:0;bottom:4px">${holes}</div></div>`;
  }

  // 墨迹不匀的滤镜（邮戳、橡皮章共用）
  const inkFilter = (id) => `<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="${uid}" result="n"/><feColorMatrix in="n" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.7 1.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>`;
  // 邮戳：圆戳 + 环形字 + 中间日期，wavy 带右边四道波浪线
  function postmark(w = 140, { date = '2026.11.05', top = '', bot = '', c = BR, wavy = true, rot = -10, style = '' } = {}) {
    const id = 'x12p' + (++uid);
    const waves = wavy ? [32, 46, 60, 74].map((y) => `<path d="M106 ${y}q9-7 18 0t18 0t18 0t18 0t18 0" fill="none" stroke="${c}" stroke-width="3"/>`).join('') : '';
    const vw = wavy ? 220 : 110;
    const svg = `<svg width="${w}" height="${(w * 110 / vw).toFixed(1)}" viewBox="0 0 ${vw} 110" style="display:block;overflow:visible"><defs>${inkFilter(id + 'i')}
<path id="${id}a" d="M17 55A38 38 0 0 1 93 55"/><path id="${id}b" d="M15 55A40 40 0 0 0 95 55"/></defs>
<g filter="url(#${id}i)" fill="${c}"><circle cx="55" cy="55" r="48" fill="none" stroke="${c}" stroke-width="3.2"/><circle cx="55" cy="55" r="31" fill="none" stroke="${c}" stroke-width="2"/>
<text font-family="Noto Serif SC" font-weight="700" font-size="11" letter-spacing="2"><textPath href="#${id}a" startOffset="50%" text-anchor="middle">${top}</textPath></text>
<text font-family="Noto Serif SC" font-weight="700" font-size="11" letter-spacing="2"><textPath href="#${id}b" startOffset="50%" text-anchor="middle" side="left">${bot}</textPath></text>
<text x="55" y="59" text-anchor="middle" font-family="Courier Prime" font-weight="700" font-size="11.5">${date}</text>${waves}</g></svg>`;
    return `<div class="v-stamp" style="transform:rotate(${rot}deg);${style}">${svg}</div>`;
  }
  // 长方形橡皮章（状态：已寄出、扫描中、售罄）：双框 + 粗宋大字 + 可选一行打字机小字
  function rubber(text, { w = 120, c = BR, sub = '', rot = -8, style = '' } = {}) {
    const id = 'x12r' + (++uid);
    const H = sub ? 62 : 48;
    const svg = `<svg width="${w}" height="${(w * H / 120).toFixed(1)}" viewBox="0 0 120 ${H}" style="display:block;overflow:visible"><defs>${inkFilter(id)}</defs><g filter="url(#${id})" fill="${c}"><rect x="2" y="2" width="116" height="${H - 4}" rx="4" fill="none" stroke="${c}" stroke-width="3.2"/><rect x="7.5" y="7.5" width="105" height="${H - 15}" rx="2" fill="none" stroke="${c}" stroke-width="1.4"/><text x="60" y="${sub ? 31 : 32}" text-anchor="middle" font-family="Noto Serif SC" font-weight="900" font-size="20" letter-spacing="4">${text}</text>${sub ? `<text x="60" y="49" text-anchor="middle" font-family="Courier Prime" font-weight="700" font-size="11" letter-spacing="1.5">${sub}</text>` : ''}</g></svg>`;
    return `<div class="v-stamp" style="transform:rotate(${rot}deg);${style}">${svg}</div>`;
  }

  // 黑胶唱片：label 是中心贴纸颜色，mark 是贴纸上的记号
  const vinyl = (d, { label = MU, mark } = {}) => `<div class="v-vy" style="width:${d}px;height:${d}px"><i class="lb" style="background:${label}"><i class="lr"></i><span class="la">${mark || arch(Math.round(d * .12), [BN, BR, BN])}</span><i class="ho"></i></i></div>`;
  // 唱臂
  const tonearm = (s = 1) => `<svg width="${80 * s}" height="${190 * s}" viewBox="0 0 80 190" style="display:block;overflow:visible"><circle cx="52" cy="22" r="17" fill="${C.cap}" stroke="${BN}" stroke-width="3"/><circle cx="52" cy="22" r="6" fill="${BN}"/><path d="M52 22L58 104L38 156" fill="none" stroke="${C.cap}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 22L58 104L38 156" fill="none" stroke="${BN}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".3"/><rect x="25" y="150" width="24" height="15" rx="3" transform="rotate(22 37 157)" fill="${BN}"/></svg>`;
  // 唱机：转盘 + 唱片 + 唱臂（图册主图的比例，d 是转盘直径）
  const turntable = (d = 284, opts = {}) => { const k = d / 284; return `<div class="v-tt" style="width:${d}px;height:${d}px"><i class="pl"></i><div class="v-ab" style="left:${7 * k}px;top:${7 * k}px">${vinyl(270 * k, opts)}</div><div class="v-ab" style="left:${193 * k}px;top:${-26 * k}px">${tonearm(1.2 * k)}</div></div>`; };

  // 135 胶卷暗盒：cols = [底色, 条纹 1, 条纹 2]，name 印在标签上，leader 是拉出来的片头长度（0 不要）
  function canister(w = 96, { cols = [MU, BR, TL], name = '', iso = '400', exp = '36 EXP', leader = 0, base = '#C46F33' } = {}) {
    const id = 'x12c' + (++uid);
    const VW = 100 + leader, x1 = 100 + leader * .42, x2 = 100 + leader;
    const holes = (y, a, b) => { let s = ''; for (let x = a; x + 4.5 <= b; x += 8) s += `<rect x="${x}" y="${y}" width="4.5" height="6" rx="1.2" fill="${CR}"/>`; return s; };
    const lead = leader ? `<path d="M86 38H${x1}L${x1 + 12} 72H${x2 - 9}Q${x2} 72 ${x2} 81V103Q${x2} 112 ${x2 - 9} 112H86Z" fill="${base}"/><path d="M86 38H${x1}L${x1 + 12} 72H${x2 - 9}Q${x2} 72 ${x2} 81V103Q${x2} 112 ${x2 - 9} 112H86Z" fill="url(#${id}l)"/>${holes(41, 104, x1 - 4)}${holes(102, 104, x2 - 14)}` : '';
    const ridges = [43, 47, 51, 55].map((x) => `<line x1="${x}" y1="4" x2="${x}" y2="14" stroke="rgba(30,20,12,.28)" stroke-width="1.2"/>`).join('');
    return `<svg width="${(w * VW / 100).toFixed(1)}" height="${w * 1.38}" viewBox="0 0 ${VW} 138" style="display:block;overflow:visible"><defs>
<linearGradient id="${id}m" x1="0" x2="1"><stop offset="0" stop-color="#5E564C"/><stop offset=".16" stop-color="#C9C0B0"/><stop offset=".3" stop-color="#F3EEE3"/><stop offset=".62" stop-color="#A39A8B"/><stop offset="1" stop-color="#4E473F"/></linearGradient>
<linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#1E1510" stop-opacity=".42"/><stop offset=".2" stop-color="#FFF6E0" stop-opacity=".26"/><stop offset=".34" stop-color="#FFF6E0" stop-opacity="0"/><stop offset=".72" stop-color="#1E1510" stop-opacity="0"/><stop offset="1" stop-color="#1E1510" stop-opacity=".45"/></linearGradient>
<linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE0B0" stop-opacity=".28"/><stop offset=".5" stop-color="#FFE0B0" stop-opacity="0"/><stop offset="1" stop-color="#3A1A08" stop-opacity=".3"/></linearGradient></defs>
${lead}
<rect x="39" y="1" width="22" height="15" rx="2" fill="url(#${id}m)"/>${ridges}
<rect x="7" y="24" width="86" height="92" fill="${cols[0]}"/>
<rect x="7" y="90" width="86" height="9" fill="${cols[1]}"/><rect x="7" y="99" width="86" height="6" fill="${cols[2]}"/>
${name ? `<text x="48" y="44" text-anchor="middle" font-family="Noto Serif SC" font-weight="900" font-size="14" letter-spacing="2" fill="${BN}">${name}</text>` : ''}
<text x="48" y="76" text-anchor="middle" font-family="Fraunces" font-weight="900" font-size="30" style="font-variation-settings:'SOFT' 100,'WONK' 1,'opsz' 144" fill="${BN}">${iso}</text>
<text x="48" y="113.5" text-anchor="middle" font-family="Courier Prime" font-weight="700" font-size="11" letter-spacing="1" fill="${BN}">${exp}</text>
<rect x="7" y="24" width="86" height="92" fill="url(#${id}s)"/>
<rect x="86" y="27" width="9" height="86" rx="1.5" fill="#2A1C12"/><rect x="86" y="27" width="2" height="86" fill="#5A4030"/>
<rect x="3" y="14" width="94" height="11" rx="2.5" fill="url(#${id}m)"/><rect x="3" y="115" width="94" height="11" rx="2.5" fill="url(#${id}m)"/>
<rect x="3" y="23.6" width="94" height="1.4" fill="rgba(30,20,12,.35)"/><rect x="3" y="115" width="94" height="1.4" fill="rgba(30,20,12,.35)"/></svg>`;
  }

  // 订座：一把实心沙发椅。st：a 可选（旧青绿 + 坐垫线）/ s 已选（砖红 + 勾）/ t 已订（浅影，什么都不画）；形状不同，色弱也分得清
  const SEAT = { a: TL, s: BR, t: C.off };
  const seat = (st = 'a', w = 38, rot = 0) => `<svg width="${w}" height="${(w * 34 / 38).toFixed(1)}" viewBox="0 0 38 34" style="display:block;transform:rotate(${rot.toFixed(1)}deg)"><g fill="${SEAT[st]}"><rect x="6" y="0" width="26" height="21" rx="7"/><rect x="0" y="8" width="9" height="26" rx="4.5"/><rect x="29" y="8" width="9" height="26" rx="4.5"/><rect x="5" y="19" width="28" height="15" rx="5"/></g>${st === 's' ? `<path d="M12.5 17.5l4.6 4.8 8.6-9.6" fill="none" stroke="${CR}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` : st === 't' ? '' : `<rect x="10" y="18" width="18" height="2.6" rx="1.3" fill="${CR}" opacity=".6"/>`}</svg>`;

  const ui = {
    C,            // ui.C：全部物件色 { cream, mustard, brick, teal, brown, film, print, kraft, cap, edge, off, ink2 }
    arch,         // 字标用的小彩虹拱：arch(32, [外圈色, …, 内圈色])
    rainbow,      // 大彩虹拱，圆心在底边中点：rainbow(960) 铺网页下半屏；rainbow(宽, 颜色数组)
    cornerArch,   // 四分之一彩虹弧，圆心在右上角：cornerArch(300, [芥末黄, 砖红, 奶油白])
    film,         // 胶卷：film(宽, 高, [[图, 宽, 取景, 漏光, 尺寸], [null, 200]], { edge: '片名', no: 12, gap: 12, ex: 16, style, attrs })；图为 null 是一格曝光过头的橙色
    postmark,     // 邮戳：postmark(84, { date: '2026.11.02', top: '环上半圈字', bot: '环下半圈字', c: 颜色, wavy: false, rot: -12, style: 'left:…;top:…' })；wavy 带右边四道波浪
    rubber,       // 长方形橡皮章（状态：扫描中、已寄出、售罄）：rubber('扫描中', { sub: '2026.11.06', w: 112, c, rot: -9, style })
    vinyl,        // 黑胶唱片：vinyl(270, { label: 中心贴纸色, mark: 贴纸上的记号 SVG })
    tonearm,      // 唱臂：tonearm(1.2)，参数是缩放
    turntable,    // 唱机整件（转盘 + 唱片 + 唱臂）：turntable(284, { label, mark })，d 是转盘直径
    canister,     // 135 胶卷暗盒：canister(84, { name: '印在标签上的字', iso: '400', exp: '36 EXP', cols: [底, 条纹1, 条纹2], leader: 片头长度, base: 片头色 })
    seat,         // 一把沙发椅：seat('a' 可选 / 's' 已选 / 't' 已订, 宽, 旋转角度)
    // 弧排订座：seats([{ label: 'A', taken: [2, 3] }, { label: 'B', taken: [0], sel: [2, 3] }], { n: 每排座数, gap: 座距, rowH: 排距, bend: 弯度, w: 容器宽 })；放进普通流里，自己占高度
    seats: (rows, { n = 6, gap = 48, rowH = 52, bend = 2.2, w = 375 } = {}) => {
      const mid = (n - 1) / 2, cx = w / 2 + .5, top = 17 + bend * mid * mid;
      const body = rows.map(({ label = '', taken = [], sel = [] }, r) => {
        const y0 = top + r * rowH;
        const cells = Array.from({ length: n }, (_, i) => {
          const u = i - mid, st = taken.includes(i) ? 't' : sel.includes(i) ? 's' : 'a';
          return `<i class="v-seat" style="left:${(cx + u * gap).toFixed(1)}px;top:${(y0 - bend * u * u).toFixed(1)}px">${seat(st, 38, Math.atan(-2 * bend * u / gap) * 180 / Math.PI)}</i>`;
        }).join('');
        return `${cells}${label ? `<span class="v-ab v-tw" style="left:22px;top:${(y0 - bend * mid * mid - 9).toFixed(0)}px;font-size:16px;color:var(--br)">${label}</span>` : ''}`;
      }).join('');
      return `<div class="v-seats" style="width:${w}px;height:${Math.round(top + (rows.length - 1) * rowH + 17)}px">${body}</div>`;
    },
    // 座位图例（状态靠形状和文字，不只靠颜色）：legend([['a', '可选'], ['s', '已选'], ['t', '已订']])
    legend: (items) => `<div class="v-legend">${items.map(([st, t]) => `<span>${seat(st, 20)}${t}</span>`).join('')}</div>`,
    // 落地音箱：speaker()，放在 .v-ab 里定位
    speaker: () => '<div class="v-spk"><i style="width:14px;height:14px"></i><i style="width:24px;height:24px"></i></div>',
    // 唱片封套：方形照片压在唱片后面，sleeve(src, { d: 196, rot: -5, pos, leak: 'tl', style: 'left:22px;top:116px' })
    sleeve: (src, { d = 196, rot = -5, pos, leak = 'tl', style = '' } = {}) => `<div class="v-slv" style="width:${d}px;height:${d}px;transform:rotate(${rot}deg);${style}"><div class="v-photo fill">${layers(src, { pos, leak })}</div></div>`,
    // 记号：mark(宽, 颜色数组)，默认彩虹拱；换品牌时换颜色顺序，或在 logo 的 sym 里放自己的几何记号
    mark: (w = 32, cols) => arch(w, cols),
    // 字标：彩虹拱 + 粗宋品牌名（奶油白 + 芥末黄错位双影）+ 可选砖红西文斜体。logo(name, en, { size: 26, sym: 自己的记号 SVG（'' 不要记号）, cols: 拱的颜色, c: 字色 })
    logo: (name, en = '', { size = 26, sym, cols, c } = {}) => `<span class="v-logo" ${c ? `style="color:${c}"` : ''}>${sym !== undefined ? sym : arch(Math.round(size * 1.25), cols)}<b style="font-size:${size}px">${name}</b>${en ? `<em style="font-size:${Math.round(size * .66)}px">${en}</em>` : ''}</span>`,
    // 小程序顶栏左边的返回：back()，写在 miniNav({ title, left: ui.back() }) 里
    back: () => `<span class="v-ib" data-back>${icon('chevron-left', 26, 2)}</span>`,
    // App 顶栏：返回 + 居中粗宋标题；小程序用 L.miniNav
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<span class="v-ib" data-back>${icon('chevron-left', 26, 2)}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 底部标签栏：tabs(items, cur, go)，旧纸底、上沿双线；当前项砖红，字和图标同时加粗（色弱也分得清）
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(ic, 22, i === cur ? 2.3 : 1.7)}<span>${t}</span></div>`).join('')}</div>`,
    // 票根按钮：ic 放在旧青绿副联里，ic 为 '' 就只有一联；cls：wide 通栏 / dark 深棕结算 / ghost 牛皮纸 / sm 小号
    btn: (text, { ic = 'arrow-right', cls = '', attrs = '' } = {}) => `<div class="v-btn ${cls}" ${attrs}><span class="m">${text}</span>${ic ? `<span class="s">${icon(ic, cls.includes('sm') ? 20 : 24, 2.4)}</span>` : ''}</div>`,
    // 票根抬头：tkHead('冲扫单', 'No.0412')，粗宋事由 + 砖红编号，放在票根左联第一行；size 改事由字号
    tkHead: (t, no = '', { size } = {}) => `<div class="v-tkh"><b ${size ? `style="font-size:${size}px"` : ''}>${t}</b>${no ? `<em ${size ? `style="font-size:${Math.round(size * .75)}px"` : ''}>${no}</em>` : ''}</div>`,
    // 署名行：by('程川', '1979') 或 by('第 1 卷', '36', '张')；粗宋 + 砖红 Fraunces 大数字 + 可选收尾字
    by: (a, num, b = '') => `<div class="v-by"><span>${a}</span><b>${num}</b>${b ? `<span>${b}</span>` : ''}</div>`,
    // 票根卡：ticket(main 左联 HTML, stub 右联 HTML, { w, h: 120, sw: 右联宽 96, bg, sbg, sc, c, cls, style, attrs })；w 不给就随父元素宽
    ticket: (main, stub, { w, h = 120, sw = 96, bg = 'var(--mu)', sbg = 'var(--tl)', sc = 'var(--cr)', c = 'var(--k)', cls = '', style = '', attrs = '' } = {}) => `<div class="v-tk ${cls}" style="${w ? `width:${w}px;` : ''}height:${h}px;${style}" ${attrs}><div class="m" style="background:${GRAIN},${bg};color:${c}">${main}</div><div class="s" style="width:${sw}px;background:${GRAIN},${sbg};color:${sc}">${stub}</div></div>`,
    // 右联常用写法：价钱 + 动作，stub('¥88', '订座')；第三个参数是图标名，'' 不要图标
    stub: (price, act, ic = 'arrow-right') => `${price ? `<span class="v-price">${price}</span>` : ''}${act ? `<span class="go">${act}${ic ? icon(ic, 15, 2.4) : ''}</span>` : ''}`,
    // 贴底的结算条（详情页没有标签栏时）：ui.bar(ui.settle(…))、ui.bar(ui.ticket(…)) 或 ui.bar(ui.btn(…))
    bar: (inner) => `<div class="v-bar">${inner}</div>`,
    // 结算票根（深棕主联 + 芥末黄副联）：settle('第 1 卷已出', '36', '张', '看相册', { attrs: 'data-go="album"' })；settle('2 杯', '¥64', '', '去结算', { ic: '' })；h 高 76，sw 副联宽 116，ic 动作后的图标（'' 不要）；外面包 ui.bar
    settle: (text, num = '', unit = '', act = '', { h = 76, sw = 116, ic = 'arrow-right', attrs = '' } = {}) => ui.ticket(`<div class="v-set"><span>${text}</span>${num ? `<b>${num}</b>` : ''}${unit ? `<small>${unit}</small>` : ''}</div>`, `<span class="v-sgo">${act}${ic ? icon(ic, 16, 2.4) : ''}</span>`, { h, sw, bg: 'var(--k)', sbg: 'var(--mu)', sc: 'var(--k)', c: 'var(--cr)', attrs }),
    // 价格：price(35, { unit: '/卷', style })；¥ 自动缩一半，unit 用粗宋小字
    price: (n, { unit = '', style = '' } = {}) => `<span class="v-price" ${style ? `style="${style}"` : ''}>¥${n}${unit ? `<small>${unit}</small>` : ''}</span>`,
    // 照片（滤镜 + 暖光 + 抬黑 + 漏光 + 灰尘）：photo(src, { w, h, pos, leak: 'tl'/'tr'/'l'/'r'/'bl'/'br'/'none', size, cls, style, attrs })；不给 h 就铺满定位的父元素
    photo,
    // 拍立得卡（.v-card 的组件写法）：card({ src, h: 200, pos, leak, title, meta, price, attrs })
    card: ({ src, h = 200, pos, leak = 'tr', title = '', meta = '', price = '', attrs = '' } = {}) => `<div class="v-card" ${attrs}>${photo(src, { h, pos, leak })}<div class="bd"><div class="v-h3" style="font-weight:900">${title}</div>${meta || price ? `<div style="display:flex;align-items:baseline;justify-content:space-between;margin-top:4px">${meta ? `<span class="v-mut">${meta}</span>` : '<span></span>'}${price ? `<span class="v-tw" style="font-size:17px">${price}</span>` : ''}</div>` : ''}</div></div>`,
    // 拍立得（散放的那种，转角度）：polaroid(src, { w: 156, h: 150, rot: 5, pos, leak, size, cap: '下边宽白边上的打字机字', tape: true, style, attrs })
    polaroid: (src, { w = 156, h = 150, rot = 5, pos, leak = 'tr', size, cap = '', tape = true, style = '', attrs = '' } = {}) => `<div class="v-pol" style="width:${w}px;transform:rotate(${rot}deg);${style}" ${attrs}>${photo(src, { h, pos, leak, size })}${cap ? `<div class="pcap">${cap}</div>` : ''}${tape ? `<i class="v-tape" style="left:50%;top:-11px;margin-left:-37px;transform:rotate(-7deg)"></i>` : ''}</div>`,
    // 单据纸：slip(inner, { cols: 三色条, style, cls })；inner 放 .v-list.bare 之类
    slip: (inner, { cols = [MU, BR, TL], style = '', cls = '' } = {}) => `<div class="v-slip ${cls}" style="${style}"><i class="st" style="background:linear-gradient(${cols[0]} 0 6px,${cols[1]} 6px 11px,${cols[2]} 11px 16px)"></i>${inner}</div>`,
    // 进度格：step('done' 深棕实心带勾 / 'now' 砖红实心带箭头 / 'todo' 虚线空圈)，形状不同，色弱也分得清
    step: (st = 'todo') => `<span class="v-step ${st}">${st === 'done' ? icon('check', 15, 2.8) : st === 'now' ? icon('arrow-right', 15, 2.8) : ''}</span>`,
    // 加购圆钮：add(on)，on 为 true 是深棕实心带勾
    add: (on = false) => `<span class="v-add ${on ? 'on' : ''}">${icon(on ? 'check' : 'plus', 15, 2.4)}</span>`,
    // 打字机菜单行：mrow('01', '美式', '22', on)，放进 .v-list；on 是已加购
    mrow: (no, n, p, on = false) => `<div class="v-row"><span class="v-no">${no}</span><span class="n">${n}</span><span class="lead"></span><span class="p">${p}</span><span class="v-add ${on ? 'on' : ''}">${icon(on ? 'check' : 'plus', 15, 2.4)}</span></div>`,
    // 红色油性笔圈：loop(宽, 高, { c, sw: 3, style: 'left:…;top:…' })，印样上圈出选中的那一格
    loop: (w, h, { c = BR, sw = 3, style = '' } = {}) => `<svg class="v-loop" width="${w}" height="${h}" viewBox="0 0 100 60" preserveAspectRatio="none" style="${style}"><path d="M10 36C5 17 30 5 54 5C80 5 97 15 95 31C93 49 69 57 46 56C22 55 5 46 8 29C10 20 18 13 28 9" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`,
    // 展示板舞台：backdrop({ arc: 1180, corner: 340, cols })，旧青绿底 + 右上角四分之一彩虹 + 底部大彩虹拱 + 颗粒（放进 demo 的 boardDeco）
    backdrop: ({ arc = 1180, corner = 340, cols = [MU, BR, CR] } = {}) => `<div style="position:absolute;inset:0;background:${TL}"></div><div style="position:absolute;right:0;top:0">${cornerArch(corner, cols)}</div><div style="position:absolute;left:50%;bottom:-6px;transform:translateX(-50%)">${rainbow(arc, cols)}</div><div style="position:absolute;inset:0;background:${GRAIN};opacity:.9"></div>`,
    GRAIN,   // ui.GRAIN：细颗粒，能叠进 background 第一层：background:${ui.GRAIN},#D99A2B
    PAPER,   // ui.PAPER：整张旧纸的 background 值（颗粒 + 斑驳 + 四周压暗 + 底色变量 --cr），只能用在 .s12 里面
  };
  return { key: 's12-retro', no: 12, name: '复古胶片', root: 's12', T, css, ui, stage: TL, stageInk: CR, dark: false };
};
