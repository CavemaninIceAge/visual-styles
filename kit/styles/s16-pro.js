// 16 清晰专业 Pro —— 起手包
// 色值、字体、字号、线宽都照图册模块 catalog/pages/s16-pro.js（工时）原样取
// 用法：const S = style('s16-pro'); 屏幕根元素 <div class="scr s16">，后台根元素 <div class="web s16" style="height:800px">；组件见 S.ui
// 这种风格的主角是电脑后台：手机屏用 nav / week / today / row，后台用 side / head / kpis / table / timeline
module.exports = (L) => {
  const { icon } = L;
  const B = '#2F4FE0', BT = '#EEF1FD', K = '#111827', T2 = '#5B6475', T3 = '#8A92A3', LN = '#E6E8EC', BG = '#F6F7F9';
  const GR = '#16A34A', AM = '#E5A00D', RD = '#E5484D';
  // 标题是苹方中粗，后备思源黑体：可点击 HTML 在安卓上自动落到内嵌的思源黑体 600
  const FT = '"PingFang SC","Noto Sans SC",sans-serif';
  const FB = '"Noto Sans SC","Inter",sans-serif';
  const FN = '"Inter","Noto Sans SC",sans-serif';
  const TN = 'font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1';
  const T = {
    bg: '#FFFFFF',          // 色卡「纯白」：页面底
    surface: '#FFFFFF',     // 卡片、标签栏：靠 1px 灰线和底分开，不靠阴影
    ink: K,                 // 色卡「墨蓝黑」
    ink2: T2,               // 色卡「正文灰」
    line: LN,
    primary: B,             // 色卡「工时蓝」：只给按钮、选中、当前
    onPrimary: '#FFFFFF',
    accents: { gray: BG, tint: BT, mute: T3, green: GR, amber: AM, red: RD },  // 色卡「浅灰」、选中浅蓝、三级字；红黄绿只表示状态
    fonts: { title: FT, body: FB, num: FN },
    radius: 14,             // 卡片 14，表格 12，按钮 10，小按钮和筛选 9，表格格子 8
    border: `1px solid ${LN}`,
    shadow: null,           // 全套不用卡片阴影；只有分段选中项和后台浮层有一点
    margin: 20,
    photo: 'saturate(.62) brightness(1.12) contrast(.95)',
  };
  const css = `
.s16{--b:${B};--bt:${BT};--k:${K};--t2:${T2};--t3:${T3};--l:${LN};--bg:${BG};--gr:${GR};--am:${AM};--rd:${RD};background:#fff;color:var(--k);font-family:${FB};font-size:15px;line-height:1.45}
.s16 .v-pad{padding-left:20px;padding-right:20px}
/* 字号只有几档：54 / 34 / 28 / 26 / 24 / 20 / 17 / 15 / 14 / 13 / 12，标题苹方中粗，数字 Inter 等宽 */
.s16 .v-h1{font:600 26px/1.15 ${FT};letter-spacing:.01em}
.s16 .v-h2{font:600 24px/1.2 ${FT}}
.s16 .v-h3{font:600 15px/1.2 ${FB}}
.s16 .v-tx{font:400 15px/1.5 ${FB};color:var(--k)}
.s16 .v-mut{font:400 13px/1.3 ${FB};color:var(--t3)}
.s16 .v-num{font-family:${FN};${TN}}
.s16 .v-tm{font:600 34px/1 ${FN};letter-spacing:-.015em;${TN}}
.s16 .v-big{font:600 54px/1 ${FN};letter-spacing:-.02em;${TN}}
.s16 .v-price{font:600 26px/1 ${FN};${TN}}
.s16 .v-price small{font:500 15px/1 ${FN};color:var(--t3);margin-left:4px}
/* 按钮：蓝底白字 44 高、圆角 10；.wide 通栏 52 高 17 字；.ghost 白底灰线；.sm 36 高 14 字 */
.s16 .v-btn{height:44px;padding:0 18px;border-radius:10px;background:var(--b);color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:8px;font:600 15px/1 ${FB};white-space:nowrap}
.s16 .v-btn.wide{display:flex;width:100%;height:52px;font-size:17px}
.s16 .v-btn.ghost{padding:0 16px;background:#fff;border:1px solid var(--l);color:var(--k);font-weight:500}
.s16 .v-btn.sm{height:36px;padding:0 18px;font-size:14px;border-radius:9px}
.s16 .v-btn.ghost.sm{padding:0 14px}
.s16 .v-ib{width:36px;height:36px;flex:none;border-radius:10px;background:#fff;border:1px solid var(--l);color:var(--k);display:grid;place-items:center}
/* 卡片：1px 灰线、圆角 14、无阴影 */
.s16 .v-card{position:relative;background:#fff;border:1px solid var(--l);border-radius:14px;overflow:hidden}
.s16 .v-card>.ph{height:220px}
.s16 .v-card .bd{min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 18px}
/* 列表：行之间 1px 灰线，行高 52；.box 是带框的一组信息，行高 56 */
.s16 .v-list{position:relative}
.s16 .v-list.box{border:1px solid var(--l);border-radius:14px;padding:0 18px}
.s16 .v-row{display:flex;align-items:center;gap:10px;min-height:52px;border-top:1px solid var(--l)}
.s16 .v-row:first-child{border-top:none}
.s16 .v-list.box .v-row{min-height:56px}
/* 排班式的行：左时间、中内容、状态、右对齐数字 */
.s16 .v-row.sch{display:grid;grid-template-columns:56px 1fr 88px 36px;gap:0;height:52px}
.s16 .v-row.sch .d,.s16 .v-row.sch .s{font:500 15px/1 ${FB}}
.s16 .v-row.sch .d{font-family:${FN};${TN}}
.s16 .v-row.sch small{display:block;margin-top:5px;font:400 12px/1 ${FN};color:var(--t2);${TN}}
.s16 .v-row.sch .h{text-align:right;font:600 15px/1 ${FN};${TN}}
.s16 .v-row.rest .s{height:36px;grid-column:2/5;border:1px dashed #D5D9E0;border-radius:9px;display:flex;align-items:center;gap:8px;padding:0 12px;color:var(--t3);font:400 14px/1 ${FB}}
/* 键值行：左边灰字、右边墨色，数字一律靠右 */
.s16 .v-row.kv{justify-content:space-between;font:400 15px/1 ${FB};color:var(--t2)}
.s16 .v-row.kv>span{display:flex;align-items:center;gap:9px}
.s16 .v-row.kv>b{display:flex;align-items:center;gap:6px;font:500 15px/1 ${FN};color:var(--k);${TN}}
/* 筛选：直角微圆的灰线小块，选中浅蓝底 */
.s16 .v-chips{display:flex;align-items:center;gap:10px}
.s16 .v-chip{height:38px;padding:0 12px;border:1px solid var(--l);border-radius:9px;background:#fff;display:inline-flex;align-items:center;gap:7px;font:400 15px/1 ${FB};color:var(--t2);white-space:nowrap}
.s16 .v-chip b{font-weight:500;color:var(--k)}
.s16 .v-chip.on{background:var(--bt);border-color:var(--b);color:var(--b)}
.s16 .v-chip.on b{color:var(--b)}
.s16 .v-inp{height:38px;display:flex;align-items:center;gap:7px;padding:0 12px;border:1px solid var(--l);border-radius:9px;background:#fff;font:400 15px/1 ${FB};color:var(--t3)}
.s16 .ph{background-size:cover;background-position:center;filter:${T.photo}}
/* 分段切换：浅灰槽里一块白片 */
.s16 .v-seg{height:34px;padding:3px;border-radius:9px;background:#F0F1F4;display:inline-flex}
.s16 .v-seg span{padding:0 14px;border-radius:7px;display:flex;align-items:center;font:500 14px/1 ${FB};color:var(--t2);white-space:nowrap}
.s16 .v-seg .on{background:#fff;color:var(--k);box-shadow:0 1px 2px rgba(17,24,39,.12),0 0 0 .5px rgba(17,24,39,.06)}
/* 状态：小圆点（形状也不同）+ 文字，红黄绿只在这里出现 */
.s16 .v-dot{display:inline-block;flex:none;vertical-align:middle}
.s16 .v-st{display:inline-flex;align-items:center;gap:6px;font:400 13px/1 ${FB};color:var(--t2);white-space:nowrap}
.s16 .v-lg{margin-left:auto;display:flex;gap:16px;font:400 14px/1 ${FB};color:var(--t2)}
.s16 .v-lg span{display:flex;align-items:center;gap:6px;white-space:nowrap}
/* 日期条：七格，当天蓝底圆角 12 */
.s16 .v-wk{margin:14px 20px 0;display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.s16 .v-wk div{height:58px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px}
.s16 .v-wk span{font:500 12px/1 ${FB};color:var(--t3)}
.s16 .v-wk b{font:600 17px/1 ${FN};${TN}}
.s16 .v-wk .off b{color:var(--t3);font-weight:500}
.s16 .v-wk .on{background:var(--b)}
.s16 .v-wk .on span,.s16 .v-wk .on b{color:#fff}
/* 今日主卡：一行标签、一个 34px 时间、一行地点配按钮 */
.s16 .v-td{margin:16px 20px 0;border:1px solid var(--l);border-radius:14px;padding:16px}
.s16 .v-td .r1{display:flex;justify-content:space-between;align-items:center;font:500 14px/1 ${FB};color:var(--t2)}
.s16 .v-td .r1 .v-st{font:400 14px/1 ${FB}}
.s16 .v-td .v-tm{margin-top:12px}
.s16 .v-td .r3{margin-top:14px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.s16 .v-td .r3>span{display:flex;align-items:center;gap:5px;font:400 14px/1 ${FB};color:var(--t2);white-space:nowrap}
/* 小节头：13px 灰字，右边数字 */
.s16 .v-lh{margin:22px 20px 8px;display:flex;justify-content:space-between;align-items:baseline;font:500 13px/1 ${FB};color:var(--t3)}
.s16 .v-lh b{font:600 13px/1 ${FN};color:var(--t2);${TN}}
/* 线条页签：下面 2px 蓝线 */
.s16 .v-tb{margin:10px 20px 0;display:flex;gap:24px;border-bottom:1px solid var(--l)}
.s16 .v-tb span{height:40px;display:flex;align-items:center;gap:6px;font:500 15px/1 ${FB};color:var(--t2);position:relative}
.s16 .v-tb span em{font:600 12px/1 ${FN};font-style:normal;color:var(--t3)}
.s16 .v-tb .on{color:var(--k)}
.s16 .v-tb .on:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--b)}
/* 人物：灰底圆头像写姓，名字 15，一行灰字，右上状态，下面可放按钮 */
.s16 .v-who{display:grid;grid-template-columns:40px 1fr auto;gap:12px;align-items:start;padding:16px 0}
.s16 .v-who+.v-who{border-top:1px solid var(--l)}
.s16 .v-who b{display:block;font:600 15px/1.2 ${FB}}
.s16 .v-who p{margin-top:6px;font:400 14px/1.35 ${FB};color:var(--t2)}
.s16 .v-who .v-st{margin-top:2px}
.s16 .v-who.lg{grid-template-columns:48px 1fr auto;align-items:center;padding:0}
.s16 .v-who.lg .v-av{width:48px;height:48px;font-size:17px}
.s16 .v-who.lg b{font:600 20px/1 ${FT}}
.s16 .v-av{width:40px;height:40px;border-radius:50%;background:#EEF0F3;display:grid;place-items:center;font:600 15px/1 ${FB};color:var(--t2);flex:none}
.s16 .v-acts{margin-top:14px;display:flex;gap:10px}
/* 时段格：三列，选中蓝底，不可选灰字划线 */
.s16 .v-slots{display:grid;gap:8px}
.s16 .v-slot{height:44px;border:1px solid var(--l);border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px;font:500 15px/1 ${FN};color:var(--k);${TN}}
.s16 .v-slot.on{background:var(--b);border-color:var(--b);color:#fff;font-weight:600}
.s16 .v-slot.off{background:#F3F4F6;border-color:#F3F4F6;color:#B9BFCA;text-decoration:line-through}
/* 小格矩阵：牙位图、座位图、工位图这类一格一个编号的东西 */
.s16 .v-cells{display:grid}
.s16 .v-cells>div{display:flex;flex-direction:column;align-items:center;gap:3px;font:500 12px/1 ${FN};color:var(--t2);${TN}}
.s16 .v-cells>div.on{color:var(--b);font-weight:600}
/* 三种状态页：空、加载、出错都是设计过的块，不是一行字 */
.s16 .v-blank{height:164px;border-radius:14px;background:#F2F3F5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--t2)}
.s16 .v-blank b{font:500 17px/1 ${FB};color:var(--k)}
.s16 .v-blank .v-btn{margin-top:4px;height:40px;font-size:15px}
.s16 .v-blank.dash{background:none;border:1px dashed #D5D9E0}
.s16 .v-sk{display:block;border-radius:6px;background:linear-gradient(90deg,#F0F1F4,#F7F8FA 60%,#F0F1F4)}
.s16 .v-skimg{display:grid;place-items:center;border-radius:10px;background:linear-gradient(90deg,#F0F1F4,#F7F8FA 60%,#F0F1F4);color:#B9BFCA}
.s16 .v-skr{padding:16px 0;border-top:1px solid var(--l);display:grid;grid-template-columns:40px 1fr;gap:12px}
.s16 .v-skr:first-child{border-top:none}
.s16 .v-skr .c{width:40px;height:40px;border-radius:50%}
.s16 .v-skr .v-sk+.v-sk{margin-top:8px}
/* 地图卡 */
.s16 .v-map{position:relative;margin:14px 20px 0;border-radius:14px;overflow:hidden;border:1px solid var(--l);background:#F3F4F6}
/* 顶栏：一级页左边 26px 大标题；二级页中间 17px 标题、左边返回 */
.s16 .v-nav{position:relative;height:52px;margin:8px 20px 0;display:flex;align-items:center;justify-content:space-between;gap:10px}
.s16 .v-nav .t{font:600 26px/1 ${FT};letter-spacing:.01em;white-space:nowrap}
.s16 .v-nav.c .t{position:absolute;left:50%;transform:translateX(-50%);font-size:17px;letter-spacing:0}
.s16 .v-logo{display:flex;align-items:center;gap:10px;height:32px}
.s16 .v-logo b{font:600 20px/1 ${FT};letter-spacing:.02em;white-space:nowrap}
.s16 .v-logo span{font:600 12px/1 ${FN};letter-spacing:.12em;color:var(--t3);margin-top:2px;white-space:nowrap}
.s16 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;background:#fff;border-top:1px solid var(--l);display:grid;padding-top:9px;z-index:6}
/* 当前项不只变蓝：字加粗，格子顶上压一条 2px 蓝线（和线条页签、表格当前列同一种记号），色弱也分得开 */
.s16 .v-tabs>div{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--t3);font:500 12px/1 ${FB}}
.s16 .v-tabs>div.on{color:var(--b);font-weight:600}
.s16 .v-tabs>div.on::before{content:"";position:absolute;left:50%;top:-10px;width:40px;height:2px;margin-left:-20px;background:var(--b)}
/* 底部操作条 */
.s16 .v-bar{position:absolute;left:0;right:0;bottom:0;height:96px;background:#fff;border-top:1px solid var(--l);display:flex;gap:10px;padding:12px 20px 0;z-index:6}
.s16 .v-bar .v-btn{flex:1}
.s16 .v-bar .v-btn.ghost{flex:none;width:96px;height:52px;font-size:17px}
.s16 .v-bar .v-btn:not(.ghost){height:52px;font-size:17px}
/* ——— 后台 ——— */
.s16.web{display:flex;background:#fff}
.s16 .v-side{width:200px;flex:none;background:var(--bg);border-right:1px solid var(--l);padding:22px 14px;position:relative}
.s16 .v-side .v-logo{padding:0 8px}
.s16 .v-store{margin-top:22px;height:44px;border-radius:10px;background:#fff;border:1px solid var(--l);display:flex;align-items:center;gap:9px;padding:0 12px;font:500 15px/1 ${FB};white-space:nowrap}
.s16 .v-store .ic:last-child{margin-left:auto;color:var(--t3)}
.s16 .v-nv{margin-top:22px;display:flex;flex-direction:column;gap:2px}
.s16 .v-nv div{height:42px;border-radius:9px;display:flex;align-items:center;gap:11px;padding:0 12px;font:500 15px/1 ${FB};color:var(--t2)}
.s16 .v-nv .on{background:var(--bt);color:var(--b)}
.s16 .v-nv em{margin-left:auto;font:600 13px/1 ${FN};font-style:normal;color:var(--t2);background:#E9EBEF;border-radius:6px;padding:4px 7px;${TN}}
.s16 .v-me{position:absolute;left:14px;right:14px;bottom:20px;display:flex;align-items:center;gap:10px;padding:0 8px;font:500 15px/1 ${FB}}
.s16 .v-me .v-av{width:36px;height:36px;font-size:14px}
.s16 .v-me small{display:block;margin-top:5px;font-size:13px;color:var(--t3)}
.s16 .v-main{flex:1;position:relative;padding:24px 24px 0;min-width:0}
.s16 .v-mh{display:flex;align-items:center;gap:16px;height:44px}
.s16 .v-mh .sp{flex:1}
.s16 .v-mh .v-btn.ghost.d{height:40px}
.s16 .v-wsw{display:flex;align-items:center;gap:4px;height:40px;border:1px solid var(--l);border-radius:10px;padding:0 6px;font:500 15px/1 ${FN};white-space:nowrap;${TN}}
.s16 .v-wsw .ic{color:var(--t2)}
.s16 .v-wsw span{padding:0 8px}
/* 汇总数字条：一圈灰线隔成几格，最后一格可放小柱图 */
.s16 .v-kp{margin-top:26px;display:grid;border:1px solid var(--l);border-radius:12px}
.s16 .v-kp>div{padding:16px 20px;border-left:1px solid var(--l);position:relative}
.s16 .v-kp>div:first-child{border-left:none}
.s16 .v-kp span{display:flex;align-items:center;gap:6px;font:400 14px/1 ${FB};color:var(--t2)}
.s16 .v-kp b{display:block;margin-top:12px;font:600 28px/1 ${FN};letter-spacing:-.01em;${TN}}
.s16 .v-kp b small{font:500 15px/1 ${FN};color:var(--t3);margin-left:4px}
.s16 .v-kp .wd{display:flex;align-items:flex-end;justify-content:space-between}
.s16 .v-bars{display:flex;align-items:flex-end;gap:14px}
.s16 .v-bars div{display:flex;flex-direction:column;align-items:center;gap:4px}
.s16 .v-bars i{display:block;width:16px;border-radius:3px 3px 1px 1px;background:#D9DDE4}
.s16 .v-bars i.c{background:var(--b)}
.s16 .v-bars span{display:block;font:400 12px/1 ${FN};color:var(--t3);${TN}}
.s16 .v-fl{margin-top:22px;display:flex;align-items:center;gap:10px}
/* 表格：灰头、白身、细横线，今天这列蓝字蓝底线，最后一列数字靠右 */
.s16 .v-tbl{margin-top:14px;width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;border:1px solid var(--l);border-radius:12px;overflow:hidden}
.s16 .v-tbl th{height:42px;background:var(--bg);border-bottom:1px solid var(--l);font:500 14px/1 ${FB};color:var(--t2);text-align:left;padding:0 8px}
.s16 .v-tbl th .v-num{font-size:14px}
.s16 .v-tbl th.cur{color:var(--b);box-shadow:inset 0 -2px 0 var(--b)}
.s16 .v-tbl th:first-child,.s16 .v-tbl td:first-child{padding-left:16px}
.s16 .v-tbl th:last-child,.s16 .v-tbl td:last-child{padding-right:16px;text-align:right}
.s16 .v-tbl td{height:50px;border-bottom:1px solid #EEF0F3;padding:0 6px;font:400 14px/1 ${FB}}
.s16 .v-tbl tr:last-child td{border-bottom:none}
.s16 .v-tbl td.hr{font:600 15px/1 ${FN};${TN}}
.s16 .v-tbl td.hr.lo{color:var(--t3);font-weight:500}
.s16 .v-em{display:flex;align-items:center;gap:14px}
.s16 .v-em i{width:30px;height:30px;border-radius:50%;background:#EEF0F3;display:grid;place-items:center;font:600 13px/1 ${FB};font-style:normal;color:var(--t2);flex:none}
.s16 .v-em i.add{background:none;border:1px dashed #CDD2DA}
.s16 .v-em b{display:block;font:500 15px/1 ${FB};white-space:nowrap}
.s16 .v-em small{display:block;margin-top:4px;font:400 13px/1 ${FB};color:var(--t3);white-space:nowrap}
.s16 .v-cp{position:relative;height:34px;border-radius:8px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;padding:0 6px;font:500 14px/1 ${FN};color:#2B3342;white-space:nowrap;${TN}}
.s16 .v-cp.rs{background:none;color:#B9BFCA;font:400 14px/1 ${FB};justify-content:flex-start;padding-left:10px}
.s16 .v-cp .v-dot,.s16 .v-bk .v-dot{position:absolute;top:-3px;right:-3px}
.s16 .v-cp.op{background:none;border:1px dashed #CDD2DA;color:var(--t3)}
.s16 .v-cp.sel{background:var(--bt);border:1.5px solid var(--b);color:var(--b)}
/* 资源时间轴：左列人或椅位，横向是一天的小时，块按时间摆；约、排、订这类后台的主角 */
.s16 .v-tl{position:relative;margin-top:14px;border:1px solid var(--l);border-radius:12px;overflow:hidden;background:#fff}
.s16 .v-tl .hd{position:relative;height:42px;display:flex;background:var(--bg);border-bottom:1px solid var(--l);font:500 14px/42px ${FB};color:var(--t2)}
.s16 .v-tl .c1{flex:none;padding-left:16px}
.s16 .v-tl .c2{flex:none;padding-right:16px;text-align:right}
.s16 .v-tl .ln{position:relative;flex:1;min-width:0}
.s16 .v-tl .hd .ln span{position:absolute;top:0;bottom:0;padding-left:8px;font:500 14px/42px ${FN};${TN}}
.s16 .v-tl .bd{position:relative}
.s16 .v-tl .ov{position:absolute;top:0;bottom:0;pointer-events:none}
.s16 .v-tl .ov>i{position:absolute;top:0;bottom:0;width:1px;background:#F0F1F4}
.s16 .v-tl .ov>.off{position:absolute;top:0;bottom:0;padding-bottom:24px;background:var(--bg);display:flex;align-items:flex-end;justify-content:center;font:400 13px/1 ${FB};color:var(--t3);letter-spacing:.2em}
.s16 .v-tl .ov>i.now{width:1.5px;background:var(--b)}
.s16 .v-tl .ov>i.now:before{content:"";position:absolute;left:-3.25px;top:-4px;width:8px;height:8px;border-radius:50%;background:var(--b)}
.s16 .v-tl .rw{position:relative;display:flex;align-items:center;border-bottom:1px solid #EEF0F3;z-index:1}
.s16 .v-tl .rw:last-child{border-bottom:none}
.s16 .v-tl .rw .ln{align-self:stretch}
.s16 .v-tl .rw .c2{font:600 15px/1 ${FN};${TN}}
.s16 .v-tl .rw .c2.lo{color:var(--t3);font-weight:500}
/* 放不下的字省略：overflow 加在字上，.v-bk 自己不加，角上记号要露出来；左右 7px 正好放下 40 分钟块里的三字人名 */
.s16 .v-bk{position:absolute;top:7px;bottom:7px;border-radius:8px;background:#F3F4F6;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:0 7px;color:#2B3342;white-space:nowrap}
.s16 .v-bk b{display:flex;align-items:center;gap:5px;min-width:0;font:500 14px/1 ${FB}}
.s16 .v-bk b>span{min-width:0;overflow:hidden;text-overflow:ellipsis;line-height:1.2}
.s16 .v-bk>span{min-width:0;overflow:hidden;text-overflow:ellipsis;font:400 12px/1.2 ${FB};color:var(--t2)}
.s16 .v-bk.done{background:#fff;box-shadow:inset 0 0 0 1px var(--l);color:var(--t3)}
.s16 .v-bk.done>span{color:var(--t3)}
.s16 .v-bk.op{background:#fff;box-shadow:none;border:1px dashed #CDD2DA;color:var(--t3)}
.s16 .v-bk.op>span{color:var(--t3)}
.s16 .v-bk.sel{background:var(--bt);box-shadow:inset 0 0 0 1.5px var(--b);color:var(--b)}
.s16 .v-bk.sel>span{color:var(--b)}
/* 浮层：全套唯一悬浮的一层，点开一条时压在表格上 */
.s16 .v-pop{position:absolute;z-index:8;background:#fff;border:1px solid var(--l);border-radius:12px;padding:14px 16px;box-shadow:0 16px 36px -12px rgba(17,24,39,.22),0 4px 10px -4px rgba(17,24,39,.08)}
.s16 .v-pop .v-who{padding:0 0 8px}
.s16 .v-pop .v-row{min-height:30px;border-top:none}
.s16 .v-pop .v-row.kv{font-size:14px}
.s16 .v-pop .v-row.kv>b{font-size:14px}
.s16 .v-pop .v-acts{margin-top:10px}
.s16 .v-pop .v-acts .v-btn{flex:1}
`;
  // 状态记号：形状和颜色一起变，色弱也分得开。ok 绿圆、warn 黄三角、bad 红方、idle 灰空心圆、done 灰勾；on / fill / dash 是图例用的小方块
  const SHAPES = {
    ok: (c) => `<circle cx="5" cy="5" r="3.5" fill="${c || GR}"/>`,
    warn: (c) => `<path d="M5 1.5 8.8 8.3H1.2Z" fill="${c || AM}" stroke="${c || AM}" stroke-linejoin="round" stroke-width=".8"/>`,
    bad: (c) => `<rect x="1.6" y="1.6" width="6.8" height="6.8" rx="1" fill="${c || RD}"/>`,
    idle: () => '<circle cx="5" cy="5" r="2.9" fill="none" stroke="#B4BAC5" stroke-width="1.6"/>',
    done: () => `<path d="m1.4 5.3 2.5 2.5 4.7-5.4" fill="none" stroke="${T3}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
    on: () => '<rect x=".8" y=".8" width="8.4" height="8.4" rx="2" style="fill:var(--b)"/>',
    fill: () => '<rect x=".8" y=".8" width="8.4" height="8.4" rx="2" fill="#D9DDE4"/>',
    dash: () => '<rect x="1.2" y="1.2" width="7.6" height="7.6" rx="2" fill="none" stroke="#B9BFCA" stroke-width="1" stroke-dasharray="2 1.4"/>',
  };
  const dot = (kind = 'ok', s = 10) => `<svg class="v-dot" width="${s}" height="${s}" viewBox="0 0 10 10">${(SHAPES[kind] || SHAPES.ok)()}</svg>`;
  // 压在格子角上的记号：外面多一圈白描边
  const pin = (kind) => { const w = `<svg class="v-dot" width="13" height="13" viewBox="-1.5 -1.5 13 13">`; const body = (SHAPES[kind] || SHAPES.ok)('#fff').replace(/stroke-width="\.8"/, ''); return `${w}<g stroke="#fff" stroke-width="3" stroke-linejoin="round">${body}</g>${(SHAPES[kind] || SHAPES.ok)()}</svg>`; };
  // 品牌记号：蓝色圆角方块里一个白色线性小图形，24×24。clock 表盘（图册工时）、peak 山、tooth 牙、cross 十字、check 勾、stack 三层、chart 三根柱
  const MARKS = {
    clock: '<circle cx="12" cy="12" r="6.6" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 8.6V12l2.4 1.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    peak: '<path d="M4.5 17.5 10 9.5l3.2 4.4 2.3-2.9 4 6.5Z" fill="#fff"/>',
    tooth: '<path d="M12 7.9c-1-.7-2-1-3-1-1.9 0-3.1 1.5-3.1 3.5 0 1.3.5 2.4.9 3.7.4 1.3.5 2.4.7 3.3.2.6.5 1 1 1 .6 0 .9-.5 1.1-1.3.2-1.1.5-2.7 2.4-2.7s2.2 1.6 2.4 2.7c.2.8.5 1.3 1.1 1.3.5 0 .8-.4 1-1 .2-.9.3-2 .7-3.3.4-1.3.9-2.4.9-3.7 0-2-1.2-3.5-3.1-3.5-1 0-2 .3-3 1Z" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"/>',
    cross: '<path d="M12 6.5v11M6.5 12h11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
    check: '<path d="m7 12.4 3.3 3.3L17 8.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    stack: '<path d="m12 6 6.5 3.4L12 12.8 5.5 9.4Zm-6.5 7 6.5 3.4 6.5-3.4" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    chart: '<path d="M7.5 17v-4M12 17V7.5M16.5 17v-7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
  };
  const mark = (s = 28, kind = 'clock', c = `var(--b,${B})`) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="flex:none"><rect width="24" height="24" rx="6.5" style="fill:${c}"/>${MARKS[kind] || MARKS.clock}</svg>`;
  const IC = (n, s = 20) => icon(n, s, 1.75);
  const hrs = (t) => { if (typeof t === 'number') return t; const [h, m] = String(t).split(':').map(Number); return h + m / 60; };
  const ui = {
    mark,   // mark(28) / mark(28, 'tooth') / mark(30, 'peak', '#2F4FE0')；不传颜色时跟着 --b 走
    dot,    // 状态记号：dot('ok') / dot('warn', 12)，种类见 SHAPES
    // 字标：蓝方块记号 + 中文 + 字距开的英文；sym 传记号名或一段 SVG；s 是记号边长（后台 28，手机首页 30）
    logo: (name, en = '', sym = 'clock', s = 28) => `<div class="v-logo">${MARKS[sym] ? mark(s, sym) : sym}<b>${name}</b>${en ? `<span>${en}</span>` : ''}</div>`,
    // App 顶栏：back 为 false 时是一级页，左边 26px 大标题（或传 left 放字标）；back 为 true 时是二级页，标题 17px 居中
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => (back
      ? `<div class="v-nav c">${left || `<div class="v-ib" data-back>${IC('chevron-left', 20)}</div>`}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`
      : `<div class="v-nav">${left}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`),
    // 36px 灰线方块图标按钮（返回、筛选、更多）：iconBtn('sliders-horizontal')，attrs 原样放进标签
    iconBtn: (name, attrs = '') => `<div class="v-ib" ${attrs}>${IC(name, 18)}</div>`,
    // 底部标签栏：24px 线性图标 + 12px 字；当前项变蓝、字加粗、格子顶上一条 2px 蓝线，不加底色和角标
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs" style="grid-template-columns:repeat(${items.length},1fr)">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${IC(ic, 24)}<span>${t}</span></div>`).join('')}</div>`,
    // 主按钮：图标放字前面；cls 'wide' 通栏 / 'ghost' 白底灰线 / 'sm' 36 高，可叠加（'ghost sm'）
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => {
      const big = /\bwide\b/.test(cls), sm = /\bsm\b/.test(cls);
      return `<div class="v-btn ${cls}" ${attrs}>${ic ? IC(ic, big ? 20 : sm ? 16 : 18) : ''}${text}</div>`;
    },
    // 分段切换：seg(['我的', '全店'], 0)；go[i] 是点第 i 段跳去的屏幕编号
    seg: (items, cur = 0, go = []) => `<div class="v-seg">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 七格日期条：week([['一', 2], ['二', 3], ['三', 4, 'on'], ['四', 5, 'off'], …])，第三项 on 是当天、off 是没有安排的灰字
    week: (days) => `<div class="v-wk">${days.map(([w, d, c]) => `<div class="${c || ''}"><span>${w}</span><b>${d}</b></div>`).join('')}</div>`,
    // 状态：st('已到诊', 'ok')，小记号 + 文字，kind 见 dot；绝不只放颜色
    st: (text, kind = 'ok') => `<span class="v-st">${dot(kind)}${text}</span>`,
    // 图例（筛选行右边）：legend([['ok', '已到诊'], ['warn', '待确认'], ['bad', '爽约']])
    legend: (items) => `<div class="v-lg">${items.map(([k, t]) => `<span>${dot(k)}${t}</span>`).join('')}</div>`,
    // 今日主卡：today({ label: '今天 · 中班', st: ui.st('待上班', 'idle'), time: '10:00 – 18:00', foot: '国贸三期店', ic: 'map-pin', btn: ui.btn('上班打卡', { ic: 'log-in' }) })
    today: ({ label = '', st = '', time = '', foot = '', ic = 'map-pin', btn = '', attrs = '' } = {}) => `<div class="v-td" ${attrs}><div class="r1"><span>${label}</span>${st}</div><div class="v-tm">${time}</div><div class="r3"><span>${ic ? IC(ic, 15) : ''}${foot}</span>${btn}</div></div>`,
    // 小节头：lh('本周 5 个班', '40.0 h')，左灰字、右数字
    lh: (l, r = '') => `<div class="v-lh"><span>${l}</span>${r ? `<b>${r}</b>` : ''}</div>`,
    // 线条页签：tabline([['待处理', 3], ['已处理'], ['我发起的']], 0)，数字可不写
    tabline: (items, cur = 0) => `<div class="v-tb">${items.map(([t, n], i) => `<span class="${i === cur ? 'on' : ''}">${t}${n != null ? `<em>${n}</em>` : ''}</span>`).join('')}</div>`,
    // 排班式的行（放在 .v-list 里）：row({ a: '周一', a2: '10/26', t: '早班', t2: '07:00–15:00', st: ui.st('正常'), n: '8.0', attrs })
    row: ({ a = '', a2 = '', t = '', t2 = '', st = '', n = '', attrs = '' } = {}) => `<div class="v-row sch" ${attrs}><div class="d">${a}<small>${a2}</small></div><div class="s">${t}<small>${t2}</small></div><div>${st}</div><div class="h">${n}</div></div>`,
    // 空档行：虚线小框，休息、午休、没有安排都用它：rest({ a: '周四', a2: '10/29', text: '休息', ic: 'coffee' })
    rest: ({ a = '', a2 = '', text = '', ic = 'coffee' } = {}) => `<div class="v-row sch rest"><div class="d">${a}<small>${a2}</small></div><div class="s">${IC(ic, 17)}${text}</div></div>`,
    // 键值行（放在 .v-list 或 .v-list.box 里）：kv('牙位', '36')，kv('门店', '东四店', { ic: 'map-pin' })；值可以是 ui.st
    kv: (label, value, { ic = '' } = {}) => `<div class="v-row kv"><span>${ic ? IC(ic, 18) : ''}${label}</span><b>${value}</b></div>`,
    // 人物条（审批、患者、学员）：who({ ch: '郑', name: '郑磊 · 请假', meta: '事假 10/31', st: ui.st('待审批', 'warn'), acts: ui.btn('通过', { cls: 'sm' }), lg: true })；lg 是详情页 48px 大头像
    who: ({ ch = '', name = '', meta = '', st = '', acts = '', lg = false, attrs = '' } = {}) => `<div class="v-who ${lg ? 'lg' : ''}" ${attrs}><div class="v-av">${ch}</div><div><b>${name}</b>${meta ? `<p>${meta}</p>` : ''}${acts ? `<div class="v-acts">${acts}</div>` : ''}</div>${st || '<span></span>'}</div>`,
    // 时段格：slots([['09:00', 'off'], ['10:00', 'on'], ['10:30']], 3)，on 选中、off 不可选（灰字划线），第二个参数是列数
    slots: (items, cols = 3) => `<div class="v-slots" style="grid-template-columns:repeat(${cols},1fr)">${items.map(([t, c, go]) => `<div class="v-slot ${c || ''}" ${go ? `data-go="${go}"` : ''}>${t}</div>`).join('')}</div>`,
    // 小格矩阵（牙位图、座位图、工位图）：cells([{ html: '<svg…>', t: '36', cls: 'on' }, …], 16)，html 放图形、t 放编号
    cells: (items, cols = 8) => `<div class="v-cells" style="grid-template-columns:repeat(${cols},1fr)">${items.map(({ html = '', t = '', cls = '' }) => `<div class="${cls}">${html}${t !== '' ? `<span>${t}</span>` : ''}</div>`).join('')}</div>`,
    // 空状态：empty({ ic: 'inbox', title: '今天没有待办' })；btn 传按钮文字，h 改高度
    empty: ({ ic = 'inbox', title = '', btn = '', h = 164, attrs = '' } = {}) => `<div class="v-blank dash" style="height:${h}px" ${attrs}>${IC(ic, 30)}<b>${title}</b>${btn ? `<div class="v-btn ghost">${btn}</div>` : ''}</div>`,
    // 出错状态：err({ title: '加载失败', btn: '重试' })，灰底块 + 图标 + 重试按钮
    err: ({ ic = 'wifi-off', title = '加载失败', btn = '重试', h = 164 } = {}) => `<div class="v-blank" style="height:${h}px">${IC(ic, 30)}<b>${title}</b><div class="v-btn ghost">${IC('refresh-cw', 16)}${btn}</div></div>`,
    // 加载骨架：sk(120, 14) 一根灰条，第三个参数是圆角；skel(3) 三行「圆头像 + 两根灰条」
    sk: (w = 120, h = 14, r = 6) => `<i class="v-sk" style="width:${typeof w === 'number' ? w + 'px' : w};height:${h}px;border-radius:${r}px"></i>`,
    // 图片占位：skImg('100%', 96)，灰底上一个淡图标，照片、影像、文件预览还没载入时用
    skImg: (w = '100%', h = 96, ic = 'image') => `<div class="v-skimg" style="width:${typeof w === 'number' ? w + 'px' : w};height:${h}px">${IC(ic, 22)}</div>`,
    skel: (n = 3) => Array.from({ length: n }, (_, i) => `<div class="v-skr"><i class="v-sk c"></i><div><i class="v-sk" style="height:14px;width:${[64, 52, 70][i % 3]}%"></i><i class="v-sk" style="height:12px;width:${[88, 76, 82][i % 3]}%"></i></div></div>`).join(''),
    // 内容卡：card({ src: img('x'), pos: '50% 60%', title: '桂花拿铁', right: '<span class="v-price">¥28</span>', h: 220, attrs })；白底照片的图传 mask: true 把四边虚化融进白卡
    card: ({ src, h = 220, pos = '50% 50%', title = '', right = '', mask = false, attrs = '' } = {}) => `<div class="v-card" ${attrs}><div class="ph" style="height:${h}px;background-image:url(${src});background-position:${pos}${mask ? ';-webkit-mask:radial-gradient(50% 54% at 50% 54%,#000 66%,transparent 100%);mask:radial-gradient(50% 54% at 50% 54%,#000 66%,transparent 100%)' : ''}"></div><div class="bd"><div class="v-h2">${title}</div>${right}</div></div>`,
    // 示意地图：map({ h: 208, label: '门店名', roads: ['横路', '横路 2', '竖路'], range: true })，range 画绿色虚线打卡范围
    map: ({ h = 208, label = '', roads = [], range = true } = {}) => `<div class="v-map" style="height:${h}px"><svg width="100%" height="100%" viewBox="0 0 335 208" preserveAspectRatio="xMidYMid slice" font-family="Noto Sans SC">
<rect width="335" height="208" fill="#F1F2F4"/><rect width="92" height="56" fill="#DDEDDA"/>
<g fill="#C9DFC5"><circle cx="22" cy="18" r="6"/><circle cx="46" cy="30" r="7"/><circle cx="70" cy="14" r="5"/><circle cx="30" cy="44" r="5"/><circle cx="78" cy="40" r="6"/></g>
<g fill="#E5E7EB" stroke="#D9DCE1" stroke-width=".6"><rect x="104" y="6" width="44" height="22" rx="2"/><rect x="104" y="32" width="28" height="18" rx="2"/><rect x="154" y="6" width="58" height="44" rx="2"/><rect x="236" y="6" width="26" height="44" rx="2"/><rect x="266" y="6" width="28" height="20" rx="2"/><rect x="266" y="30" width="28" height="20" rx="2"/><rect x="306" y="6" width="29" height="44" rx="2"/><rect x="6" y="76" width="38" height="30" rx="2"/><rect x="48" y="76" width="38" height="66" rx="2"/><rect x="6" y="110" width="38" height="32" rx="2"/><rect x="106" y="76" width="26" height="66" rx="2"/><rect x="204" y="76" width="10" height="66" rx="2"/><rect x="236" y="76" width="58" height="30" rx="2"/><rect x="236" y="110" width="26" height="32" rx="2"/><rect x="266" y="110" width="28" height="32" rx="2"/><rect x="306" y="76" width="29" height="66" rx="2"/><rect x="6" y="160" width="56" height="42" rx="2"/><rect x="66" y="160" width="20" height="42" rx="2"/><rect x="104" y="160" width="50" height="20" rx="2"/><rect x="104" y="184" width="50" height="20" rx="2"/><rect x="158" y="160" width="54" height="42" rx="2"/><rect x="236" y="160" width="40" height="42" rx="2"/><rect x="280" y="160" width="14" height="42" rx="2"/><rect x="306" y="160" width="29" height="42" rx="2"/></g>
<rect x="138" y="78" width="60" height="62" rx="3" fill="#DADFE7" stroke="#C7CDD7" stroke-width=".8"/>
<g stroke="#FFFFFF" fill="none"><path d="M0 151H335M98 0V208M300 0V208" stroke-width="7"/></g>
<path d="M0 64H335" stroke="#E0E3E8" stroke-width="17"/><path d="M0 64H335" stroke="#FFFFFF" stroke-width="14"/>
<path d="M226 0V208" stroke="#EBCB7A" stroke-width="19"/><path d="M226 0V208" stroke="#FBE6A9" stroke-width="16"/>
${roads[0] ? `<text x="14" y="68" font-size="11" fill="${T3}">${roads[0]}</text>` : ''}${roads[1] ? `<text x="244" y="68" font-size="11" fill="${T3}">${roads[1]}</text>` : ''}${roads[2] ? `<text transform="translate(222 146) rotate(90)" font-size="11" fill="#9A7A2C">${roads[2]}</text>` : ''}
${range ? `<circle cx="168" cy="110" r="54" fill="${GR}" fill-opacity=".08" stroke="${GR}" stroke-opacity=".6" stroke-width="1.4" stroke-dasharray="4 4"/>` : ''}
<g transform="translate(168 110)"><path d="M0 0c-8-9-12-15-12-21a12 12 0 0 1 24 0c0 6-4 12-12 21Z" fill="${K}"/><circle cx="0" cy="-21" r="4.5" fill="#fff"/></g>
${label ? `<text x="168" y="134" text-anchor="middle" font-size="11" font-weight="600" fill="#3A4252" style="paint-order:stroke" stroke="#DADFE7" stroke-width="3">${label}</text>` : ''}
<circle cx="140" cy="152" r="11" fill="${K}" fill-opacity=".1"/><circle cx="140" cy="152" r="6" fill="${K}" stroke="#fff" stroke-width="2.5"/></svg></div>`,
    // 后台左侧导航：side({ logo: ui.logo('工时', 'GONGSHI'), store: '国贸三期店', items: [['calendar-days', '排班', true], ['file-check-2', '审批', false, 3, 'go编号']], me: { ch: '赵', name: '赵敏', role: '店长' } })；items 每项 [图标, 文字, 是否当前, 数字, 跳转]
    side: ({ logo = '', store = '', items = [], me = null } = {}) => `<div class="v-side">${logo}${store ? `<div class="v-store">${IC('store', 18)}${store}${IC('chevrons-up-down', 16)}</div>` : ''}<div class="v-nv">${items.map(([ic, t, on, n, go]) => `<div class="${on ? 'on' : ''}" ${go ? `data-go="${go}"` : ''}>${IC(ic, 19)}${t}${n != null ? `<em>${n}</em>` : ''}</div>`).join('')}</div>${me ? `<div class="v-me"><div class="v-av">${me.ch}</div><div>${me.name}<small>${me.role}</small></div></div>` : ''}</div>`,
    // 后台页头：head({ title: '排班', mid: ui.dateSw('10/26 – 11/01') + ui.btn('本周', { cls: 'ghost d' }), right: ui.btn('导出', …) + ui.btn('发布', …) })，右边靠右
    head: ({ title = '', mid = '', right = '' } = {}) => `<div class="v-mh"><div class="v-h2">${title}</div>${mid}<div class="sp"></div>${right}</div>`,
    // 日期切换：dateSw('10/26 – 11/01')，两边是 chevron
    dateSw: (text) => `<div class="v-wsw">${IC('chevron-left', 18)}<span>${text}</span>${IC('chevron-right', 18)}</div>`,
    // 汇总数字条：kpis([{ k: '出勤率', v: '96.4', u: '%' }, { k: '待审批', v: '3', st: 'warn' }, { k: '排班工时', v: '304.0', u: 'h', bars: ui.bars(…) }])；带 bars 的那格放最后、自动占满剩余宽度
    kpis: (items) => {
      const wide = items.some((i) => i.bars);
      const cols = wide ? `repeat(${items.length - 1},198.67px) 1fr` : `repeat(${items.length},1fr)`;
      const one = ({ k, v, u, st }) => `<span>${st ? dot(st) : ''}${k}</span><b>${v}${u ? `<small>${u}</small>` : ''}</b>`;
      return `<div class="v-kp" style="grid-template-columns:${cols}">${items.map((i) => (i.bars ? `<div class="wd"><div>${one(i)}</div>${i.bars}</div>` : `<div>${one(i)}</div>`)).join('')}</div>`;
    },
    // 小柱图：bars([['一', 48], ['二', 48], ['三', 44, true]], { k: .68, gap: 14 })；第三项 true 是当前（蓝），k 是每单位多少 px
    bars: (items, { k = 0.68, gap = 14 } = {}) => `<div class="v-bars" style="gap:${gap}px">${items.map(([d, h, c]) => `<div><i class="${c ? 'c' : ''}" style="height:${Math.round(h * k)}px"></i><span>${d}</span></div>`).join('')}</div>`,
    // 筛选块：filter('岗位', '全部')，右边带小箭头，放在 .v-fl 里；on 为 true 时是已选中的筛选
    filter: (label, value, on = false) => `<div class="v-chip ${on ? 'on' : ''}">${label} <b>${value}</b>${IC('chevron-down', 16)}</div>`,
    // 搜索框：search('搜索员工', 220)，第二个参数是宽度
    search: (text, w = 220) => `<div class="v-inp" style="width:${w}px">${IC('search', 17)}${text}</div>`,
    // 表格里的人物格：emp({ ch: '吴', name: '吴晓雨', meta: '咖啡师' })；add 为 true 时是虚线加号（待分配）
    emp: ({ ch = '', name = '', meta = '', add = false } = {}) => `<div class="v-em"><i class="${add ? 'add' : ''}">${add ? IC('plus', 15) : ch}</i><div><b ${add ? `style="color:${T2}"` : ''}>${name}</b>${meta ? `<small>${meta}</small>` : ''}</div></div>`,
    // 表格格子：cp('07:00–15:00', { st: 'ok', cls: 'sel' })；st 是角上的记号，cls 'rs' 灰字（休）/ 'op' 虚线（待分配）/ 'sel' 选中
    cp: (text, { st = '', cls = '' } = {}) => `<div class="v-cp ${cls}">${st ? pin(st) : ''}${text}</div>`,
    // 通用表格：table({ cols: ['140px', '', '', '94px'], head: ['员工', ['三 10/28', true], '工时'], rows: [[ui.emp(…), ui.cp(…), '40.0']] })；head 项写成 [文字, true] 是当前列，末列靠右，末列写成 [数字, 'lo'] 是灰字退后
    table: ({ cols = [], head = [], rows = [] } = {}) => `<table class="v-tbl"><colgroup>${cols.map((w) => `<col${w ? ` style="width:${w}"` : ''}>`).join('')}</colgroup><tr>${head.map((h) => (Array.isArray(h) ? `<th class="cur">${h[0]}</th>` : `<th>${h}</th>`)).join('')}</tr>${rows.map((r) => `<tr>${r.map((c, i) => (i === r.length - 1 ? `<td class="hr ${Array.isArray(c) ? c[1] : ''}">${Array.isArray(c) ? c[0] : c}</td>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</table>`,
    // 资源时间轴：timeline({ from: 9, to: 18, head: '椅位', tail: '分钟', now: '09:41', off: [['12:00', '13:30', '午休']], rows: [{ ch: '林', name: '林医生', meta: '2 号椅', tail: '300', items: [{ s: '10:00', e: '11:00', t: '陈某', d: '根管', st: 'ok', cls: 'sel', go: 'detail' }] }] })
    //   items 每块：s/e 起止、t 主字、d 副字、st 角上记号（ok/warn/bad）、cls 'done' 已结束 / 'sel' 选中 / 'op' 虚线空档、ic 主字前的线性图标、go 跳转
    //   rows 每行：add: true 是虚线加号（待分配），lo: true 是右列数字退后；c1、c2 是左右两列宽度
    timeline: ({ from = 9, to = 18, head = '', tail = '', now = null, off = [], rows = [], c1 = 148, c2 = 64, rh = 62 } = {}) => {
      const span = to - from;
      const X = (t) => ((hrs(t) - from) / span * 100).toFixed(3) + '%';
      const W = (s, e) => ((hrs(e) - hrs(s)) / span * 100).toFixed(3) + '%';
      const hours = Array.from({ length: span }, (_, i) => from + i);
      const bk = ({ s, e, t = '', d = '', st = '', cls = '', ic = '', go = '' }) => `<div class="v-bk ${cls}" style="left:calc(${X(s)} + 1.5px);width:calc(${W(s, e)} - 3px)" ${go ? `data-go="${go}"` : ''}>${st ? pin(st) : ''}<b>${ic ? IC(ic, 15) : ''}<span>${t}</span></b>${d ? `<span>${d}</span>` : ''}</div>`;
      const row = (r) => `<div class="rw" style="height:${rh}px"><div class="c1" style="width:${c1}px">${ui.emp(r)}</div><div class="ln">${(r.items || []).map(bk).join('')}</div><div class="c2 ${r.lo ? 'lo' : ''}" style="width:${c2}px">${r.tail == null ? '' : r.tail}</div></div>`;
      const pos = `left:${c1}px;right:${c2}px`;
      return `<div class="v-tl"><div class="hd"><div class="c1" style="width:${c1}px">${head}</div><div class="ln">${hours.map((h) => `<span style="left:${X(h)};width:${W(h, h + 1)}">${String(h).padStart(2, '0')}:00</span>`).join('')}</div><div class="c2" style="width:${c2}px">${tail}</div></div>
<div class="bd"><div class="ov" style="${pos}">${off.map(([s, e, t]) => `<div class="off" style="left:${X(s)};width:${W(s, e)}">${t || ''}</div>`).join('')}${hours.slice(1).map((h) => `<i style="left:${X(h)}"></i>`).join('')}${now == null ? '' : `<i class="now" style="left:${X(now)}"></i>`}</div>${rows.map(row).join('')}</div></div>`;
    },
    // 浮层：pop({ left: 566, top: 340, w: 300, html: ui.who(…) + ui.kv(…) + … })，放在 .v-main 里，定位相对 .v-main；点开表格里一条时用，全套唯一悬浮的一层；里面的按钮全用 ghost，蓝底按钮留给页头
    pop: ({ left = 0, top = 0, w = 300, html = '' } = {}) => `<div class="v-pop" style="left:${left}px;top:${top}px;width:${w}px">${html}</div>`,
  };
  return { key: 's16-pro', no: 16, name: '清晰专业', root: 's16', T, css, ui, stage: B, dark: false };
};
