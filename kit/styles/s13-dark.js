// 13 暗夜科技 Dark Tech 起手包
// 色值、线宽、光晕照图册模块 catalog/pages/s13-dark.js（极点）原样取；字体按审美守则第二节改过：不用等宽字，数字是 Inter 细字重加 tabular-nums
// 用法：const S = style('s13-dark'); 屏幕根元素 <div class="scr s13">；组件见 S.ui
// 换主色：全部走 CSS 变量，项目里写 .p{--a:#xxxxxx;--ar:r,g,b} 一行就换完（--ar 是同一色的 RGB 三个数）
module.exports = (L) => {
  const { icon } = L;
  const T = {
    bg: '#0A0C10',          // 深空：页面底
    surface: '#15181D',     // 面板灰：输入框、面板
    ink: '#E8EAEE',         // 灰白：主字
    ink2: '#9399A4',        // 银灰：次要字、图标
    line: 'rgba(255,255,255,.08)',   // 一像素分隔线
    primary: '#58B4FF',     // 冷光蓝：全套唯一的彩色，只给进度、正在发生的事、搜索命中、主按钮
    onPrimary: '#03111F',
    accents: {
      panel2: '#1A1D23',    // 头像底、比面板再亮一档
      dim: '#767C88',       // 第三档字：时间戳、未选中的标签（图册 #5E636D 只有 3.24:1，放真实信息太暗，提到 4.67:1）
      bright: '#F4F5F7',    // 最亮的字：标题、大数字
      soft: '#D6D9DF',      // 列表正文
      bar: '#383C44',       // 声波未走到的部分
      line2: 'rgba(255,255,255,.13)',  // 面板、圆形按钮的描边
    },
    fonts: { title: '"Inter","Noto Sans SC"', body: '"Inter","Noto Sans SC"', num: '"Inter","Noto Sans SC"' },  // 数字也用 Inter：大数字 200、读数 300，一律 tabular-nums
    radius: 14,             // 照片、网页面板 14；手机主面板 18；输入框和按钮 12
    border: '1px solid rgba(255,255,255,.13)',
    shadow: null,           // 几乎不用阴影：亮度靠光晕，不靠投影
    margin: 20,
    photo: 'grayscale(.6) brightness(.86) contrast(1.12)',
    icon: { stroke: 1.5, cap: 'round', join: 'round', fill: 'none' },   // 图标（自己画的那一套）：没给线宽时的线宽、线头、转角、填法，见 kit/icons/SPEC.md 第六节
  };
  const A = T.primary, Ar = '88,180,255';
  const { panel2: P2, dim: T3, bright: HI, soft: SF, bar: BAR, line2: LN2 } = T.accents;
  const SANS = '"Inter","Noto Sans SC",sans-serif';
  const css = `
.s13{--bg:${T.bg};--p1:${T.surface};--p2:${P2};--t1:${T.ink};--t2:${T.ink2};--t3:${T3};--hi:${HI};--sf:${SF};--bar:${BAR};--ln:${T.line};--ln2:${LN2};--a:${A};--ar:${Ar};--on:${T.onPrimary};isolation:isolate;background:var(--bg);color:var(--t1);font-family:${SANS};font-feature-settings:"cv11","ss01";font-size:15px;line-height:1.45;letter-spacing:0}
.s13 .v-pad{padding-left:20px;padding-right:20px}
/* 字：Inter 紧排的标题、字重 200 的细数字；三档灰字 t1 / t2 / t3 拉出层次，不靠字号。数字一律 tabular-nums，数位一样宽，竖着对得齐 */
.s13 .v-h1{font:600 31px/38px ${SANS};letter-spacing:-.035em;color:var(--hi)}
.s13 .v-h2{font:600 21px/28px ${SANS};letter-spacing:-.02em;color:var(--t1)}
.s13 .v-h3{font:500 15px/21px ${SANS};color:var(--sf)}
.s13 .v-tx{font:400 15px/22px ${SANS};color:var(--t1)}
.s13 .v-mut{font:400 12.5px/16px ${SANS};letter-spacing:-.01em;color:var(--t2)}
.s13 .v-num{font-family:${SANS};font-variant-numeric:tabular-nums;letter-spacing:0}
/* 大数字：Inter 字重 200，细得像仪表盘上发光的白线，带一层白光 */
.s13 .v-big{font:200 76px/84px ${SANS};letter-spacing:-.035em;color:var(--hi);text-shadow:0 0 28px rgba(255,255,255,.14)}
.s13 .v-big small{font:300 22px/1 ${SANS};letter-spacing:0;color:var(--t2);text-shadow:none;margin-left:6px}
.s13 .v-price{font:300 30px/40px ${SANS};font-variant-numeric:tabular-nums;letter-spacing:-.02em;color:var(--t1)}
.s13 .v-price small{font:400 13px/1 ${SANS};letter-spacing:0;color:var(--t3);margin-left:6px}
.s13 .v-a{color:var(--a)}.s13 .v-t2{color:var(--t2)}.s13 .v-t3{color:var(--t3)}
/* 区块标题：17px 加粗的真标题，计数跟在后面用第三档灰，右边可以放一个「全部」入口 */
.s13 .v-sec{display:flex;align-items:baseline;gap:8px;padding:6px 0 4px;font:600 17px/24px ${SANS};letter-spacing:-.015em;color:var(--t1)}
.s13 .v-sec .n{font-weight:400;font-size:15px;letter-spacing:0;color:var(--t3);font-variant-numeric:tabular-nums}
.s13 .v-sec .r{margin-left:auto;display:flex;align-items:center;gap:2px;font-weight:400;font-size:14px;letter-spacing:0;color:var(--t2)}
/* 两样信息放一行：拆成两个元素，中间空 14px，不用点和竖线串 */
.s13 .v-pair{display:flex;align-items:baseline;flex-wrap:wrap;column-gap:14px;row-gap:2px}
/* 主按钮：冷光蓝实心 + 自己发光；次按钮只有一像素线 */
.s13 .v-btn{height:44px;padding:0 20px;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;background:var(--a);color:var(--on);font:600 15px/1 ${SANS};letter-spacing:.02em;white-space:nowrap;box-shadow:0 0 0 1px rgba(var(--ar),.4),0 0 24px rgba(var(--ar),.35)}
.s13 .v-btn.wide{display:flex;width:100%;height:56px;font-size:17px;letter-spacing:.04em;box-shadow:0 0 0 1px rgba(var(--ar),.4),0 0 36px rgba(var(--ar),.45)}
.s13 .v-btn.ghost{background:transparent;color:var(--t1);box-shadow:inset 0 0 0 1px var(--ln2);font-weight:500}
/* 卡片：一像素线框 + 从上往下淡掉的白 */
.s13 .v-card{position:relative;border-radius:14px;border:1px solid var(--ln2);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.012) 62%);overflow:hidden}
.s13 .v-card>.ph{position:relative;height:168px;border-bottom:1px solid var(--ln)}
.s13 .v-card .bd{padding:14px 16px}
.s13 .v-panel{position:relative;border-radius:18px;border:1px solid var(--ln2);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.012) 62%)}
.s13 .v-panel:before{content:"";position:absolute;left:18px;right:40px;top:-1px;height:1px;background:linear-gradient(90deg,rgba(var(--ar),0),rgba(var(--ar),.95) 38%,rgba(var(--ar),.5) 62%,rgba(var(--ar),0))}
.s13 .v-panel .amb{position:absolute;left:-10px;width:250px;top:-70px;height:230px;background:radial-gradient(50% 50% at 50% 50%,rgba(var(--ar),.2),rgba(var(--ar),0));pointer-events:none}
.s13 .v-panel>*:not(.amb){position:relative}
/* 列表：没有外框，行之间一像素线 */
.s13 .v-list{display:block}
.s13 .v-row{display:flex;align-items:flex-start;gap:14px;padding:11px 0;border-top:1px solid var(--ln);font-size:15px;line-height:21px;color:var(--sf)}
.s13 .v-row:first-child,.s13 .v-sec+.v-row{border-top:none}
.s13 .v-row>.v-num{flex:none;width:44px;font-size:13px;line-height:21px;color:var(--t3)}
/* 键值行：左边说明、右边数字，数位对齐、右对齐成一条线 */
.s13 .v-row.kv{align-items:center;justify-content:space-between}
.s13 .v-row.kv>span:first-child{display:flex;align-items:center;gap:10px;color:var(--t2)}
.s13 .v-row.kv>.v-num{width:auto;font-size:15px;color:var(--t1);text-align:right}
.s13 .v-row.kv>.v-num small{font-size:12px;color:var(--t3);margin-left:4px}
.s13 .v-row.td{align-items:center}
.s13 .v-row.td .tx{flex:1}
.s13 .v-row.td.dn .tx{color:var(--t3);text-decoration:line-through;text-decoration-color:rgba(255,255,255,.25)}
.s13 .v-row.td>.v-num{width:auto;text-align:right}
/* 筛选：下划线标签，不做胶囊 */
.s13 .v-chips{height:40px;display:flex;gap:22px;padding:0 20px;border-bottom:1px solid var(--ln)}
.s13 .v-chip{position:relative;height:40px;display:flex;align-items:center;gap:6px;font-size:13.5px;color:var(--t3)}
.s13 .v-chip .v-num{font-size:12px;color:var(--t3)}
.s13 .v-chip.on{font-weight:500;color:var(--t1)}
.s13 .v-chip.on:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:var(--t1)}
/* 输入框：面板灰底、发光光标 */
.s13 .v-inp{height:44px;display:flex;align-items:center;gap:10px;padding:0 14px;border-radius:12px;background:var(--p1);border:1px solid var(--ln2);color:var(--t2)}
.s13 .v-inp b{font-weight:400;font-size:16px;color:var(--t1)}
.s13 .v-inp .cr{width:1.5px;height:20px;margin-left:-8px;background:var(--a);box-shadow:0 0 6px rgba(var(--ar),.9)}
/* 光：顶部一团、屏幕中间一团，都很淡 */
.s13 .v-glow{position:absolute;left:-40px;right:-40px;top:-150px;height:420px;background:radial-gradient(50% 50% at 50% 50%,rgba(var(--ar),.34) 0%,rgba(var(--ar),.11) 44%,rgba(var(--ar),0) 100%);pointer-events:none;z-index:-1}
.s13 .v-glow.soft{top:-170px;height:400px;background:radial-gradient(50% 50% at 50% 50%,rgba(var(--ar),.26) 0%,rgba(var(--ar),.09) 42%,rgba(var(--ar),0) 100%)}
.s13 .v-glow.mid{left:-80px;right:-80px;top:180px;height:420px;background:radial-gradient(50% 50% at 50% 50%,rgba(var(--ar),.17) 0%,rgba(var(--ar),.05) 50%,rgba(var(--ar),0) 100%)}
/* 声波 / 柱状：走过的冷光蓝发光，没走到的灰，游标一像素竖线 */
.s13 .v-wave{display:flex;align-items:center;position:relative}
.s13 .v-wave>span{display:flex;flex:none;align-items:center;height:100%}
.s13 .v-wave i{display:block;flex:none;border-radius:1px;background:var(--bar)}
.s13 .v-wave .lit i{background:var(--a)}
.s13 .v-wave .lit{filter:drop-shadow(0 0 7px rgba(var(--ar),.65))}
.s13 .v-wave .hd{width:1px;height:140%;margin:0 3px 0 1px;background:var(--a);box-shadow:0 0 8px rgba(var(--ar),.9)}
.s13 .v-wave.up{align-items:flex-end}
.s13 .v-wave.up>span{align-items:flex-end}
.s13 .v-wave.up .hd{height:112%}
/* 录音声波：从左到右由暗变亮，最新的几根发光 */
.s13 .v-mw{height:132px;display:flex;align-items:center;justify-content:center;gap:2.6px}
.s13 .v-mw i{display:block;flex:none;width:3px;border-radius:2px;background:#3A3E46}
.s13 .v-mw i.a{background:var(--a);box-shadow:0 0 8px rgba(var(--ar),.7)}
/* 刻度：等高细线，走过的亮，目标位一根长线 */
.s13 .v-ticks{display:flex;align-items:center;justify-content:space-between}
.s13 .v-ticks i{display:block;flex:none;width:2px;border-radius:1px;background:var(--bar)}
.s13 .v-ticks i.a{background:var(--a);box-shadow:0 0 6px rgba(var(--ar),.7)}
.s13 .v-ticks i.m{background:var(--t1)}
/* 圆环刻度盘：放温度、电量这类一个数字说清的量；走过的亮，一根长白线是现在的位置 */
.s13 .v-dial{position:relative;margin:0 auto}
.s13 .v-dial svg{position:absolute;inset:0}
.s13 .v-dial .lit{filter:drop-shadow(0 0 5px rgba(var(--ar),.75))}
.s13 .v-dial .in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.s13 .v-dial .lo,.s13 .v-dial .hi{position:absolute;bottom:6%;font:400 13px/16px ${SANS};font-variant-numeric:tabular-nums;color:var(--t3)}
.s13 .v-dial .lo{left:17%}.s13 .v-dial .hi{right:17%}
/* 正在发生的状态：冷光蓝的字自己发光，前面配一个说明它是什么的线性图标；不画圆点，色弱的人靠字和图标认 */
.s13 .v-live{display:inline-flex;align-items:center;gap:6px;font:500 14px/1 ${SANS};color:var(--a);white-space:nowrap;text-shadow:0 0 12px rgba(var(--ar),.6)}
.s13 .v-live svg{flex:none;filter:drop-shadow(0 0 5px rgba(var(--ar),.8))}
/* 头像：姓一个字的小圆片 */
.s13 .v-av{display:inline-flex;align-items:center;justify-content:center;flex:none;border-radius:50%;background:var(--p2);color:var(--t2);border:1px solid var(--ln2);font-weight:500}
.s13 .v-avs{display:flex;align-items:center}
.s13 .v-avs .v-av{margin-right:-6px;box-shadow:0 0 0 2px var(--bg)}
.s13 .v-avs em{font-style:normal;font-size:12.5px;color:var(--t2);margin-left:16px}
/* 勾选框 */
.s13 .v-ck{display:inline-flex;align-items:center;justify-content:center;flex:none;border-radius:5px;border:1px solid rgba(255,255,255,.24);color:var(--bg)}
.s13 .v-ck.on{background:var(--t1);border-color:var(--t1)}
/* 圆形控制键：一像素线圈；.on 是开着（亮线 + 蓝图标），.lg 是主键；白实心圆 .v-play 是播放 */
.s13 .v-ctls{display:flex;align-items:center;justify-content:center;gap:40px}
.s13 .v-ctl{position:relative;width:52px;height:52px;flex:none;border-radius:50%;border:1px solid var(--ln2);display:flex;align-items:center;justify-content:center;color:var(--t2)}
.s13 .v-ctl.lg{width:72px;height:72px;border-color:rgba(255,255,255,.3);color:var(--t1)}
.s13 .v-ctl.on{border-color:rgba(var(--ar),.55);color:var(--a);box-shadow:0 0 18px rgba(var(--ar),.22),inset 0 0 12px rgba(var(--ar),.1)}
.s13 .v-ctl .sq{width:24px;height:24px;border-radius:6px;background:var(--t1)}
.s13 .v-cell{display:flex;flex-direction:column;align-items:center;gap:8px;font:400 12px/16px ${SANS};color:var(--t2);white-space:nowrap}
.s13 .v-play{width:40px;height:40px;flex:none;border-radius:50%;background:var(--t1);color:var(--bg);display:flex;align-items:center;justify-content:center}
/* 大数字一行：左边 .v-big，右边 24px 细读数，下面可以跟一个说明它是什么的词 */
.s13 .v-sum{display:flex;align-items:flex-end;justify-content:space-between;margin-top:2px}
.s13 .v-sum .v-big{margin-left:-3px}
.s13 .v-sum .sd{text-align:right;padding-bottom:12px}
.s13 .v-sum .sd b{display:block;font:300 24px/32px ${SANS};font-variant-numeric:tabular-nums;letter-spacing:-.01em;color:var(--t1)}
/* 时间轴：图表下面一行时间，数位对齐，两头贴边，当前时刻是冷光蓝 */
.s13 .v-axis{position:relative;display:flex;justify-content:space-between;margin-top:16px;font:400 13px/16px ${SANS};font-variant-numeric:tabular-nums;color:var(--t3)}
.s13 .v-axis .v-a{position:absolute;transform:translateX(-50%)}
/* 数字三格：一像素竖线分开，数字是字重 300 的细字，数位对齐 */
.s13 .v-stats{display:grid;grid-auto-flow:column;grid-auto-columns:1fr}
.s13 .v-stats>div{padding-left:14px;border-left:1px solid var(--ln)}
.s13 .v-stats>div:first-child{padding-left:0;border-left:none}
.s13 .v-stats b{display:block;font:300 23px/28px ${SANS};font-variant-numeric:tabular-nums;letter-spacing:-.015em;color:var(--t1);white-space:nowrap}
.s13 .v-stats b small{font-size:12px;line-height:1;color:var(--t3);letter-spacing:0;margin-left:3px}
.s13 .v-stats span{display:block;margin-top:2px;font-size:12.5px;line-height:16px;color:var(--t2)}
/* 说话行：头像 + 名字 + 时间戳 + 一段话，旧的话退成第三档灰 */
.s13 .v-msg{padding:14px 0;border-top:1px solid var(--ln)}
.s13 .v-msg:first-child{border-top:none}
.s13 .v-msg .who{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--t2)}
.s13 .v-msg p{margin-top:6px;font-size:15px;line-height:22px}
.s13 .v-msg.old p{color:var(--t3)}
/* 搜索结果：选中项一层淡白底，命中字发光 */
.s13 .v-res{padding:11px 8px 12px;border-radius:10px;border:1px solid transparent}
.s13 .v-res.sel{background:rgba(255,255,255,.035);border-color:var(--ln)}
.s13 .v-res .m{display:flex;justify-content:space-between;font-size:12.5px;color:var(--t2)}
.s13 .v-res .m .v-num{font-size:12.5px;color:var(--t3)}
.s13 .v-res p{margin-top:4px;font-size:14.5px;line-height:21px;color:var(--sf)}
.s13 .v-hit{font-style:normal;color:var(--a);background:rgba(var(--ar),.12);border-radius:3px;padding:0 2px;box-shadow:0 0 12px rgba(var(--ar),.18)}
/* 照片：压灰压暗、一层冷光、底部沉进黑里，上沿一道光 */
.s13 .ph{filter:${T.photo}}
.s13 .v-photo{position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--ln2);background:#07090C}
.s13 .v-photo>.ph{position:absolute;inset:0;background-size:cover}
.s13 .v-photo .tn{position:absolute;inset:0;background:linear-gradient(200deg,rgba(var(--ar),.22),rgba(var(--ar),0) 46%);mix-blend-mode:screen}
.s13 .v-photo .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,12,16,.35) 0%,rgba(10,12,16,0) 26%,rgba(10,12,16,0) 56%,rgba(10,12,16,.82) 100%)}
.s13 .v-photo .eg{position:absolute;left:20px;right:20px;top:0;height:1px;background:linear-gradient(90deg,rgba(var(--ar),0),rgba(var(--ar),.95) 45%,rgba(var(--ar),0));box-shadow:0 0 14px 1px rgba(var(--ar),.55)}
.s13 .v-photo .lb{position:absolute;left:16px;bottom:14px;font:500 15px/20px ${SANS};color:var(--t1)}
/* 发光地面：硬件、车放在上面，地上一团光 + 淡淡的倒影 */
.s13 .v-plinth{position:relative}
.s13 .v-plinth .fl{position:absolute;left:-12%;right:-12%;bottom:-34%;height:92%;background:radial-gradient(50% 50% at 50% 50%,rgba(var(--ar),.3) 0%,rgba(var(--ar),.1) 46%,rgba(var(--ar),0) 100%);pointer-events:none}
.s13 .v-plinth .ob{position:relative;line-height:0}
.s13 .v-plinth .rf{position:absolute;left:0;right:0;top:100%;line-height:0;transform:scaleY(-1);opacity:.5;-webkit-mask-image:linear-gradient(0deg,#000 0,rgba(0,0,0,.3) 16%,transparent 38%);mask-image:linear-gradient(0deg,#000 0,rgba(0,0,0,.3) 16%,transparent 38%)}
/* 顶栏、字标、标签栏 */
.s13 .v-nav{position:relative;height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:var(--t2);z-index:2}
.s13 .v-nav .t{position:absolute;left:50%;transform:translateX(-50%);font:500 14px/1 ${SANS};color:var(--t1);white-space:nowrap}
.s13 .v-nav .r{display:flex;align-items:center;gap:18px}
.s13 .v-logo{display:flex;align-items:center;gap:9px;color:var(--t1)}
.s13 .v-logo b{font:600 20px/1 "Noto Sans SC";letter-spacing:.04em;white-space:nowrap}
.s13 .v-logo em{font:500 15px/1 ${SANS};font-style:normal;letter-spacing:-.01em;color:var(--t3);white-space:nowrap}
.s13 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;display:flex;justify-content:space-around;padding:10px 12px 0;border-top:1px solid var(--ln);background:var(--bg);z-index:6}
.s13 .v-tabs>span{width:64px;display:flex;flex-direction:column;align-items:center;gap:4px;font:400 12px/14px ${SANS};letter-spacing:0;color:var(--t3)}
.s13 .v-tabs>span.on{color:var(--t1);font-weight:600}
/* 底部操作条：一像素线，价格 + 按钮 */
.s13 .v-bar{position:absolute;left:0;right:0;bottom:0;height:104px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 20px 0;border-top:1px solid var(--ln);background:var(--bg);z-index:6}
/* 网页：左边图标栏、中间列表、右边详情，全部一像素线分区。设计稿字不小于 16px */
.s13.web{font-size:18px}
.s13.web .v-h1{font-size:46px;line-height:54px}
.s13.web .v-h2{font-size:21px;line-height:28px}
.s13.web .v-mut{font-size:16px;line-height:22px}
.s13.web .v-sec{font-size:21px;line-height:28px;padding:0 0 10px;gap:10px}
.s13.web .v-sec .n{font-size:18px}
.s13.web .v-sec .r{font-size:16px}
.s13.web .v-row{align-items:center;gap:20px;min-height:50px;padding:0;font-size:19px;line-height:26px;white-space:nowrap}
.s13.web .v-row>.v-num{width:56px;font-size:16px;line-height:26px}
.s13.web .v-row.kv>.v-num{width:auto;font-size:19px}
.s13.web .v-row.kv>.v-num small{font-size:15px}
.s13.web .v-stats b{font-size:34px;line-height:40px}
.s13.web .v-stats b small{font-size:16px}
.s13.web .v-stats span{font-size:16px;line-height:20px}
.s13.web .v-stats>div{padding-left:24px}
.s13.web .v-stats>div:first-child{padding-left:0}
.s13.web .v-axis{font-size:16px;line-height:20px}
.s13 .v-rail{position:absolute;left:0;top:0;bottom:0;width:72px;display:flex;flex-direction:column;align-items:center;padding-top:18px;border-right:1px solid var(--ln);background:#0C0E12}
.s13 .v-rail .lg{height:46px;margin-bottom:22px;display:grid;place-items:center}
.s13 .v-rail a{width:46px;height:46px;margin-bottom:10px;border-radius:11px;display:grid;place-items:center;color:var(--t3)}
.s13 .v-rail a.on{background:rgba(255,255,255,.07);color:var(--t1);box-shadow:inset 0 0 0 1px var(--ln)}
.s13 .v-rail .me{position:absolute;bottom:22px}
.s13 .v-col{position:absolute;left:72px;top:0;bottom:0;width:368px;border-right:1px solid var(--ln);background:#0B0D11}
.s13 .v-col .hd{height:64px;display:flex;align-items:center;gap:14px;padding:0 28px;border-bottom:1px solid var(--ln);font-size:21px;font-weight:600}
.s13 .v-col .hd .f{margin-left:auto;display:flex;align-items:center;gap:4px;font-size:16px;font-weight:400;color:var(--t2)}
.s13 .v-col .hd .r{margin-left:auto;display:flex;color:var(--t2)}
.s13 .v-col .hd .f~.r{margin-left:0}
.s13 .v-item{position:relative;padding:20px 28px;border-bottom:1px solid var(--ln)}
.s13 .v-item b{display:block;font-weight:500;font-size:20px;line-height:28px;color:#DADDE3;white-space:nowrap}
.s13 .v-item .m{display:flex;gap:20px;margin-top:8px;font-size:16px;line-height:20px;color:var(--t2);white-space:nowrap}
.s13 .v-item .rec{color:var(--a);text-shadow:0 0 10px rgba(var(--ar),.6)}
.s13 .v-item.on{background:rgba(255,255,255,.04)}
.s13 .v-item.on:before{content:"";position:absolute;left:0;top:16px;bottom:16px;width:2px;background:var(--a);box-shadow:0 0 10px rgba(var(--ar),.9)}
.s13 .v-item.on b{color:var(--hi)}
.s13 .v-main{position:absolute;left:440px;right:0;top:0;bottom:0;overflow:hidden}
.s13 .v-main .v-glow{left:0;right:0;top:-240px;height:460px;z-index:0}
.s13 .v-top{position:relative;height:64px;display:flex;align-items:center;justify-content:flex-end;gap:22px;padding:0 32px 0 48px;border-bottom:1px solid var(--ln);color:var(--t2)}
.s13 .v-top .s{margin-right:auto;display:flex;align-items:center;gap:6px;font-size:16px;color:var(--t3)}
.s13 .v-top .s span:last-child{color:var(--t2)}
/* 网页数据条：左边 46px 的键、.tc 两样读数、ui.wave。波形靠右，右边和左边一样留 24px；.tc 第一样是当前值（灰白），第二样暗灰。同一屏已经有发光的状态字时，键不加 on、当前值不加 .v-a，正在发生的事只亮一次 */
.s13 .v-wplay{position:relative;height:84px;display:flex;align-items:center;gap:20px;padding:0 24px;border:1px solid var(--ln2);border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.012));box-shadow:0 0 48px -8px rgba(var(--ar),.22);overflow:hidden}
.s13 .v-wplay:before{content:"";position:absolute;left:24px;right:120px;top:-1px;height:1px;background:linear-gradient(90deg,rgba(var(--ar),0),rgba(var(--ar),.95) 40%,rgba(var(--ar),0))}
.s13 .v-wplay .v-play,.s13 .v-wplay .v-ctl{width:46px;height:46px}
.s13 .v-wplay .tc{flex:none;display:flex;align-items:baseline;gap:12px;font-size:17px;font-variant-numeric:tabular-nums;color:var(--t1);white-space:nowrap}
.s13 .v-wplay .tc>*+*{color:var(--t3)}
.s13 .v-wplay .v-wave{margin-left:auto}
`;
  // 品牌记号：细线几何，24×24 画布，线宽 1.4。rings 三道纬线圈（图册极点，圆心那颗实心是极点本身）、arc 地平线上半个圆、meridian 经线穿过的圆、orbit 轨道和一颗星（实心圆是星本身）、hex 细线立方体（六边形里三道棱）、pulse 一段脉冲。除了极点和星，记号里不加点缀的圆点
  const MARKS = {
    rings: (c) => `<circle cx="12" cy="12" r="10.3"/><circle cx="12" cy="12" r="6.4" stroke-opacity=".7"/><circle cx="12" cy="12" r="2.6" fill="${c}" stroke="none"/>`,
    arc: () => '<path d="M4.5 16a7.5 7.5 0 0 1 15 0" stroke-linecap="round"/><path d="M2 16h20" stroke-linecap="round"/><path d="M8.5 19.5h7" stroke-opacity=".5" stroke-linecap="round"/>',
    meridian: () => '<circle cx="12" cy="12" r="10.3"/><ellipse cx="12" cy="12" rx="4.6" ry="10.3" stroke-opacity=".7"/><path d="M12 .4v23.2"/>',
    orbit: (c) => `<ellipse cx="12" cy="12" rx="10.6" ry="4.6" transform="rotate(-28 12 12)"/><circle cx="12" cy="12" r="3.4" fill="${c}" stroke="none"/>`,
    hex: () => '<path d="M12 1.6 21 6.8v10.4L12 22.4 3 17.2V6.8Z" stroke-linejoin="round"/><path d="M3 6.8 12 12l9-5.2M12 12v10.4" stroke-opacity=".7" stroke-linejoin="round"/>',
    pulse: () => '<path d="M1.5 12h5l2.6-7 4.6 14 2.6-7h6.2" stroke-linecap="round" stroke-linejoin="round"/>',
  };
  const mark = (s = 18, c = T.ink, kind = 'rings') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.4">${(MARKS[kind] || MARKS.rings)(c)}</svg>`;
  // 声波高度：固定的伪随机，夹着几处停顿，像真人说话
  const levels = (n, seed = 1) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const v = Math.abs(Math.sin(i * 0.53 + seed) * 0.5 + Math.sin(i * 1.37 + seed * 2.1) * 0.32 + Math.sin(i * 0.11 + seed) * 0.28);
      const gap = Math.sin(i * 0.19 + seed * 3) > 0.86 ? 0.25 : 1;
      out.push(Math.max(0.12, Math.min(1, v * gap * 1.15)));
    }
    return out;
  };
  const rings = (s, op = .07) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-opacity="${op}" stroke-width="${(100 / s).toFixed(3)}"><circle cx="50" cy="50" r="49.5"/><circle cx="50" cy="50" r="36"/><circle cx="50" cy="50" r="22.5"/><circle cx="50" cy="50" r="9"/></svg>`;
  const av = (t, s = 24) => `<span class="v-av" style="width:${s}px;height:${s}px;font-size:${Math.max(11, Math.round(s * .46))}px">${t}</span>`;
  const check = (done, s = 18) => `<span class="v-ck${done ? ' on' : ''}" style="width:${s}px;height:${s}px">${done ? icon('check', Math.round(s * .66), 2.4) : ''}</span>`;
  const ui = {
    mark,     // mark(18) / mark(28, '#E8EAEE', 'meridian')
    levels,   // levels(64, 1.7) 伪随机声波高度（0–1 的数组），要自己算高度时用
    // 字标：logo('子午', '', 'meridian')，细线记号 + 思源黑体 600；品牌本来有英文名才传 en（15px Inter 500，不加字距、不大写）；sym 传记号名或一段 SVG
    logo: (name, en = '', sym = 'rings') => `<div class="v-logo">${MARKS[sym] ? mark(22, T.ink, sym) : sym}<b>${name}</b>${en ? `<em>${en}</em>` : ''}</div>`,
    // App 顶栏：44 高，没有底线；title 可以是文字，也可以放 ui.live('正在录音')；right 放 ui.icons([...])
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => `<div class="v-nav">${left || (back ? `<span data-back>${icon(back === 'down' ? 'chevron-down' : 'chevron-left', 24, 1.6)}</span>` : '<span></span>')}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`,
    // 顶栏右边的一组图标：icons(['share', 'ellipsis'])，线宽 1.5
    icons: (names, size = 20) => `<span class="r">${names.map((n) => icon(n, size, 1.5)).join('')}</span>`,
    // 底部标签栏：一像素上线，当前项字变亮、变粗，不涂色、不加点
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs">${items.map(([ic, t], i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(ic, 22, 1.5)}${t}</span>`).join('')}</div>`,
    // 主按钮：默认不带图标；箭头类图标放字后面，别的放字前面；cls 'wide' 通栏 56 高 / 'ghost' 一像素线框
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => {
      const ico = ic ? icon(ic, /\bwide\b/.test(cls) ? 20 : 18, 1.8) : '';
      return `<div class="v-btn ${cls}" ${attrs}>${ic && !ic.startsWith('arrow') ? ico + text : text + ico}</div>`;
    },
    // 区块标题：sec('要点', 4) 或 sec('待办', '1/3', '全部')，17px 加粗的真标题；n 是计数（不补零），more 是右边的入口字（自带 chevron-right），都可省
    sec: (title, n = '', more = '', attrs = '') => `<div class="v-sec" ${attrs}>${title}${n !== '' ? `<span class="n">${n}</span>` : ''}${more ? `<span class="r">${more}${icon('chevron-right', 16, 1.6)}</span>` : ''}</div>`,
    // 两样信息放一行：pair('车内 18.5°', '车外 6°')，拆成两个元素空 14px；cls 加类（比如 'v-mut'）
    pair: (a, b, cls = 'v-mut') => `<p class="v-pair ${cls}"><span>${a}</span><span>${b}</span></p>`,
    // 顶部光晕，放在屏幕根元素里第一个：glow() 主屏 / glow('soft') 淡一档 / glow('mid') 屏幕正中一团；style 可改位置
    glow: (kind = '', style = '') => `<div class="v-glow ${kind}" ${style ? `style="${style}"` : ''}></div>`,
    // 声波或柱状图：wave({ n: 62, h: 76, at: .49, w: 3, gap: 2, seed: 1.7 })。at 是游标位置（0–1）；data 传 0–1 数组就画自己的数据；up: true 柱子从底往上长
    wave: ({ n = 64, h = 30, at = .49, w = 2, gap = 2, seed = 1, data = null, up = false } = {}) => {
      const lv = data || levels(n, seed), k = Math.round(lv.length * at);
      const bar = (v, i) => `<i style="height:${Math.max(3, Math.round(v * h))}px;width:${w}px;margin-right:${gap}px"></i>`;
      return `<span class="v-wave${up ? ' up' : ''}" style="height:${h}px"><span class="lit">${lv.slice(0, k).map(bar).join('')}</span><span class="hd"></span><span>${lv.slice(k).map(bar).join('')}</span></span>`;
    },
    // 录音声波：recWave({ n: 56, lit: 47, seed: 4.2 })，正在录的时候用（回放用 wave）；lit 之后的几根发光，h 是最高那根的高度
    recWave: ({ n = 56, lit = 47, seed = 4.2, h = 112 } = {}) => `<div class="v-mw">${levels(n, seed).map((v, i) => `<i class="${i >= lit ? 'a' : ''}" style="height:${Math.round(8 + v * h * (0.3 + 0.7 * Math.sin(Math.PI * (i + 3) / (n + 6))))}px;opacity:${(0.3 + 0.7 * i / (n - 1)).toFixed(2)}"></i>`).join('')}</div>`,
    // 刻度条：ticks({ n: 61, at: .5, h: 20, mark: .75, every: 5 })。at 之前的亮，mark 处一根长白线（目标位），every 每几根加高一根
    ticks: ({ n = 60, at = .5, h = 16, mark: m = null, every = 0 } = {}) => {
      const k = Math.round((n - 1) * at), mi = m === null ? -1 : Math.round((n - 1) * m);
      return `<div class="v-ticks" style="height:${Math.round(h * 1.5)}px">${Array.from({ length: n }, (_, i) => `<i class="${i === mi ? 'm' : i <= k ? 'a' : ''}" style="height:${i === mi ? Math.round(h * 1.5) : every && i % every === 0 ? h : Math.round(h * .62)}px"></i>`).join('')}</div>`;
    },
    // 圆环刻度盘：dial({ d: 280, at: .5, now: .21, inner: '<div class="v-big">22.0°</div>', lo: '16°', hi: '28°' })。at 之前的刻度亮，now 处一根长白线，inner 放在圆心
    dial: ({ d = 280, n = 73, at = .5, now = null, sweep = 270, inner = '', lo = '', hi = '' } = {}) => {
      const c = d / 2, r = c - 3, k = Math.round((n - 1) * at), ni = now === null ? -1 : Math.round((n - 1) * now);
      const tick = (i, cls) => {
        const a = (-sweep / 2 + sweep * i / (n - 1) - 90) * Math.PI / 180, big = i === ni, len = big ? 22 : i % 6 === 0 ? 13 : 8, r0 = big ? r + 3 : r;
        const p = (q) => `${(c + q * Math.cos(a)).toFixed(2)} ${(c + q * Math.sin(a)).toFixed(2)}`;
        return `<path d="M${p(r0)}L${p(r0 - len)}" stroke="${cls}" stroke-width="${big ? 2 : 1.6}" stroke-linecap="round"/>`;
      };
      const seq = Array.from({ length: n }, (_, i) => i);
      return `<div class="v-dial" style="width:${d}px;height:${d}px"><svg width="${d}" height="${d}" viewBox="0 0 ${d} ${d}"><g>${seq.filter((i) => i > k && i !== ni).map((i) => tick(i, 'var(--bar)')).join('')}</g><g class="lit">${seq.filter((i) => i <= k && i !== ni).map((i) => tick(i, 'var(--a)')).join('')}</g>${ni >= 0 ? tick(ni, 'var(--t1)') : ''}</svg><div class="in">${inner}</div>${lo ? `<span class="lo">${lo}</span>` : ''}${hi ? `<span class="hi">${hi}</span>` : ''}</div>`;
    },
    // 正在发生的状态：live('充电中', 'zap')，冷光蓝的字自己发光；ic 是说明它是什么的图标（录音 mic、充电 zap、空调 fan），可省
    live: (text, ic = '') => `<span class="v-live">${ic ? icon(ic, 16, 1.8) : ''}${text}</span>`,
    // 头像：av('沈', 24)
    av,
    // 一排叠着的头像：avs(['沈', '陈', '姚'], '3 人参会')，text 只写一样；size 改尺寸
    avs: (names, text = '', size = 24) => `<div class="v-avs">${names.map((n) => av(n, size)).join('')}${text ? `<em>${text}</em>` : ''}</div>`,
    // 勾选框：check(true) 灰白实心带勾 / check(false) 一像素线框
    check,
    // 时间戳行：trow('04:12', 'Q4 先上团队空间')，放在 .v-list 里
    trow: (t, text, attrs = '') => `<div class="v-row" ${attrs}><span class="v-num">${t}</span><span>${text}</span></div>`,
    // 键值行：kv('已充入', '36.9', 'kWh')，右边数字右对齐；ic 放一个图标
    kv: (label, value, unit = '', { ic = '', attrs = '' } = {}) => `<div class="v-row kv" ${attrs}><span>${ic ? icon(ic, 18, 1.5) : ''}${label}</span><span class="v-num">${value}${unit ? `<small>${unit}</small>` : ''}</span></div>`,
    // 待办行：todo({ done: true, text: '更新定价页文案', who: '沈', date: '10/30' })
    todo: ({ done = false, text = '', who = '', date = '' } = {}) => `<div class="v-row td${done ? ' dn' : ''}">${check(done)}<span class="tx">${text}</span>${who ? av(who, 20) : ''}${date ? `<span class="v-num">${date}</span>` : ''}</div>`,
    // 说话行：msg({ ch: '陈', name: '陈默', at: '10:48', text: '……', old: true })，old 是已经说过的、退成第三档灰
    msg: ({ ch = '', name = '', at = '', text = '', old = false } = {}) => `<div class="v-msg${old ? ' old' : ''}"><div class="who">${av(ch, 20)}${name} <span class="v-num v-t3">${at}</span></div><p>${text}</p></div>`,
    // 下划线筛选：chips([['全部', 12], ['片段', 9]], 0)，第二项是计数，可省
    chips: (items, cur = 0) => `<div class="v-chips">${items.map(([t, n], i) => `<span class="v-chip${i === cur ? ' on' : ''}">${t}${n !== undefined ? ` <span class="v-num">${n}</span>` : ''}</span>`).join('')}</div>`,
    // 搜索框：search('定价')，带发光光标
    search: (text = '', attrs = '') => `<div class="v-inp" ${attrs}>${icon('search', 18, 1.6)}<b>${text}</b><span class="cr"></span></div>`,
    // 搜索结果项：res({ from: '销售周会', at: '10/27 08:52', html: `团队版${ui.hit('定价')}怎么算`, sel: true })
    res: ({ from = '', at = '', html = '', sel = false, attrs = '' } = {}) => `<div class="v-res${sel ? ' sel' : ''}" ${attrs}><div class="m"><span>${from}</span><span class="v-num">${at}</span></div><p>${html}</p></div>`,
    // 搜索命中的字：hit('定价')
    hit: (text) => `<em class="v-hit">${text}</em>`,
    // 圆形控制键：ctl('pause') 52 线圈；ctl('bookmark', { on: true }) 开着；ctl('', { cls: 'lg', inner: '<i class="sq"></i>' }) 72 主键；label 在下面写一行字
    ctl: (name, { on = false, cls = '', inner = '', label = '', attrs = '' } = {}) => {
      const big = /\blg\b/.test(cls);
      const b = `<span class="v-ctl ${cls}${on ? ' on' : ''}" ${label ? '' : attrs}>${inner || icon(name, big ? 26 : 20, 1.5)}</span>`;
      return label ? `<span class="v-cell" ${attrs}>${b}${label}</span>` : b;
    },
    // 白实心圆的播放键：play()，放在面板里，配 ui.wave。只有音视频内容才用；充电、用量这类放状态键 ctl('zap')，同一屏已经有发光的状态字时不加 on
    play: (size = 16) => `<span class="v-play">${icon('play', size, 2, 'fill="currentColor"')}</span>`,
    // 大数字一行：sum({ big: '76', unit: '%', side: '09:49', sideLabel: '充到 90%' })，左边 .v-big，右边 24px 细读数，sideLabel 是说明读数的词，可省；大数字已经往左修 3px
    sum: ({ big = '', unit = '', side = '', sideLabel = '' } = {}) => `<div class="v-sum"><div class="v-big">${big}${unit ? `<small>${unit}</small>` : ''}</div>${side ? `<div class="sd"><b>${side}</b>${sideLabel ? `<span class="v-mut">${sideLabel}</span>` : ''}</div>` : ''}</div>`,
    // 时间轴：axis(['09:24', '09:41', '09:49'], .67)，放在 ui.wave 下面；第一个和最后一个贴两头，中间那个是当前时刻，at 写它的位置（0–1，和 wave 的 at 对齐），冷光蓝；at 不写时全部平均排开
    axis: (labels, at = null) => `<div class="v-axis">${labels.map((t, i) => (at !== null && i > 0 && i < labels.length - 1 ? `<span class="v-a" style="left:${Math.round(at * 100)}%">${t}</span>` : `<span>${t}</span>`)).join('')}</div>`,
    // 数字格：stats([['96', 'kW', '当前功率'], ['36.9', 'kWh', '已充入']])，每项 [数字, 单位, 说明]，一像素竖线分开
    stats: (items) => `<div class="v-stats">${items.map(([v, u, t]) => `<div><b>${v}${u ? `<small>${u}</small>` : ''}</b>${t ? `<span>${t}</span>` : ''}</div>`).join('')}</div>`,
    // 发光面板：panel(内容, { h: 196, amb: true, attrs })，上沿一道冷光，amb 左上再加一团淡光，内容自己排
    panel: (inner, { h = 0, amb = true, attrs = '', style = '' } = {}) => `<div class="v-panel" ${attrs} style="${h ? `height:${h}px;` : ''}${style}">${amb ? '<div class="amb"></div>' : ''}${inner}</div>`,
    // 冷调照片：photo({ src: img('x'), h: 350, pos: '50% 74%', label: '东四店' })，压灰、冷光、底部沉黑，上沿一道光；label 是左下角 15px 的真信息（门店名、地点），可省
    photo: ({ src, h = 350, pos = '50% 50%', label = '', attrs = '' } = {}) => `<div class="v-photo" style="height:${h}px" ${attrs}><div class="ph" style="background-image:url(${src});background-position:${pos}"></div><i class="tn"></i><i class="sh"></i><i class="eg"></i>${label ? `<span class="lb">${label}</span>` : ''}</div>`,
    // 发光地面：plinth(svg, { h: 150 })，硬件、车放在上面，地上一团光和淡倒影；inner 是产品的 SVG 或 <img>，h 是产品高度
    plinth: (inner, { h = 150, reflect = true, style = '' } = {}) => `<div class="v-plinth" style="height:${h}px;${style}"><i class="fl"></i><div class="ob">${inner}</div>${reflect ? `<div class="rf" aria-hidden="true">${inner}</div>` : ''}</div>`,
    // 网页左边图标栏：rail({ sym: 'rings', items: ['audio-lines', 'search'], cur: 0, me: '沈', go: [] })
    rail: ({ sym = 'rings', items = [], cur = 0, me = '', go = [] } = {}) => `<div class="v-rail"><div class="lg">${MARKS[sym] ? mark(28, T.ink, sym) : sym}</div>${items.map((n, i) => `<a class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${icon(n, 22, 1.5)}</a>`).join('')}${me ? `<span class="me">${av(me, 36)}</span>` : ''}</div>`,
    // 网页中间列表栏的头：colHead('充电记录', '近 30 天', 'plus')，外面包 <div class="v-col">；filter 是右边的筛选（带 chevron-down），ic 是右边的图标键，都可省
    colHead: (title, filter = '', ic = '') => `<div class="hd">${title}${filter ? `<span class="f">${filter}${icon('chevron-down', 16, 1.6)}</span>` : ''}${ic ? `<span class="r">${icon(ic, 22, 1.5)}</span>` : ''}</div>`,
    // 网页列表项：item({ title: '增长周会', meta: ['09:30', '4 人'], on: true })，meta 最多两格；进行中的写 live: '11:26'，冷光蓝发光的字，插在第二格（这时 meta 只写一格）
    item: ({ title = '', meta = [], live = '', on = false, attrs = '' } = {}) => {
      const m = meta.map((x) => `<span>${x}</span>`);
      if (live) m.splice(1, 0, `<span class="rec">${live}</span>`);
      return `<div class="v-item${on ? ' on' : ''}" ${attrs}><b>${title}</b><div class="m v-num">${m.join('')}</div></div>`;
    },
    // 网页详情顶栏：topbar(['产品组', '会议'], ['share', 'star', 'ellipsis'])，path 传数组时中间用 chevron-right 图标隔开（最多两级），也可以只传一个字符串；放在 .v-main 里第二个（第一个是 ui.glow()）
    topbar: (path, names = []) => `<div class="v-top"><span class="s">${[].concat(path).map((x) => `<span>${x}</span>`).join(icon('chevron-right', 16, 1.5))}</span>${names.map((n) => icon(n, 20, 1.5)).join('')}</div>`,
    // 展示板背景（demo 里写 boardDeco: ui.stageGlow()）：一团冷光 + 四道同心细圈，和图册舞台一样；top 是光的高度，rgb 换主色时传 '88,180,255' 这样的三个数
    stageGlow: (top = '30%', rgb = Ar) => `<div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 50% ${top},rgba(${rgb},.13) 0%,rgba(${rgb},0) 100%)"></div><div style="position:absolute;left:50%;top:${top};transform:translate(-50%,-50%);pointer-events:none">${rings(1500, .05)}</div>`,
  };
  return { key: 's13-dark', no: 13, name: '暗夜科技', root: 's13', T, css, ui, stage: '#121825', dark: true };
};
