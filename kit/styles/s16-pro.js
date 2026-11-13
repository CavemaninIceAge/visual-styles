// 16 清晰专业 Pro，起手包
// 这一版照飞书（Universe Design）的设计语言做：飞书蓝 #1456F0、带蓝调的中性灰、14/22 正文、6px 控件圆角、32px 控件高、浅灰画布上铺白色内容区
// 色值、字号、尺寸取自飞书开放平台和开发者后台线上 CSS 的设计令牌，后台骨架照飞书管理后台，手机照飞书 App；图册模块 catalog/pages/s16-pro.js 只留作对照
// 用法：const S = style('s16-pro'); 屏幕根元素 <div class="scr s16">，后台根元素 <div class="web s16" style="height:800px">；组件见 S.ui
// 这种风格的主角是电脑后台：后台用 topbar / side / head / tabline / filter / search / table / pager / kpis / timeline，手机用 nav / week / today / lh / row / kv / who
// 这一版新增的函数：topbar、av、tag、link、ops、check、pager、notice；table 加了 check / sel / last 三个参数（不传时和以前一样）
module.exports = (L) => {
  const { icon } = L;
  // 飞书蓝：主按钮和链接 B600，悬停 B500，按下 B700；浅底三档 B50 / B100 / B200
  const B = '#1456F0', BH = '#336DF4', BA = '#0442D2', BT = '#F0F4FF', BT1 = '#E0E9FF', BT2 = '#C2D4FF';
  // 中性灰（N 系，带一点蓝调）：字 N900 / N600 / N500 / N400，线 N300 / N350，底 N50 / N100 / N200
  const K = '#1F2329', T2 = '#646A73', T3 = '#8F959E', TD = '#BBBFC4', IC1 = '#2B2F36';
  const LN = '#DEE0E3', LC = '#D0D3D6', BG = '#F5F6F7', BG2 = '#F2F3F5', HV = '#EFF0F1';
  // 功能色：成功、警告、错误、等待（只表示状态）
  const GR = '#32A645', AM = '#ED6D0C', RD = '#F54A45', PU = '#8D55ED';
  // 字体：照飞书的系统字体栈。苹果设备上是苹方加系统西文字体；安卓和 Windows 上落到内嵌的 Inter 和思源黑体（可点击 HTML 自动内嵌）
  const FB = '-apple-system,BlinkMacSystemFont,"Inter","PingFang SC","Noto Sans SC","Microsoft Yahei",sans-serif';
  const FT = FB, FN = FB;
  const TN = 'font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1';
  // 阴影：颜色都是 N900，透明度 2% 到 6%；卡片基本不用，下拉、气泡、浮层用 SH_POP
  const SH_CARD = '0 1px 2px -2px rgba(31,35,41,.02),0 2px 4px rgba(31,35,41,.02),0 2px 8px 2px rgba(31,35,41,.02)';
  const SH_POP = '0 8px 24px 8px rgba(31,35,41,.04),0 6px 12px rgba(31,35,41,.04),0 4px 8px -8px rgba(31,35,41,.06)';
  const T = {
    bg: BG2,                // 手机页面底 #F2F3F5；电脑后台的画布是 accents.canvas #F5F6F7
    surface: '#FFFFFF',     // 卡片、侧栏选中以外的内容区、标签栏、浮层
    ink: K,                 // 标题和正文同一个色 #1F2329，不用纯黑
    ink2: T2,               // 次要字：表头、说明
    line: LN,               // 分隔线、卡片描边
    primary: B,             // 飞书蓝：只给主按钮、链接、选中项、当前页签、聚焦边框
    onPrimary: '#FFFFFF',
    accents: { canvas: BG, hover: HV, tint: BT, tint1: BT1, tint2: BT2, hoverBlue: BH, activeBlue: BA, mute: T3, disabled: TD, icon: IC1, control: LC, green: GR, amber: AM, red: RD, purple: PU },
    fonts: { title: FT, body: FB, num: FN },
    radius: 8,              // 卡片 8（手机分组卡 10），按钮和输入框 6，菜单项和标签 4，浮层 8，头像全圆
    border: `1px solid ${LN}`,
    shadow: null,           // 卡片不用阴影，分层靠底色和 1px 线；下拉、气泡、浮层用 SH_POP
    margin: 16,
    photo: 'none',
    // 图册色卡原色（纯白、浅灰、工时蓝、正文灰、墨蓝黑），这一版改照飞书，只留作对照，界面上不用
    catalog: { white: '#FFFFFF', gray: '#F6F7F9', blue: '#2F4FE0', text: '#5B6475', ink: '#111827' },
  };
  // 标签配色：底是该色 20% 透明（橙 15%），字是同色深一档，字重 500
  const TAGC = {
    blue: ['rgba(20,86,240,.2)', '#1456F0'], green: ['rgba(53,189,75,.2)', '#1A7526'], red: ['rgba(245,74,69,.2)', '#C02A26'],
    orange: ['rgba(255,129,26,.15)', '#C25705'], yellow: ['rgba(250,211,85,.2)', '#AD7A03'], purple: ['rgba(141,85,237,.2)', '#7A35F0'],
    teal: ['rgba(51,214,192,.2)', '#067062'], sky: ['rgba(62,195,247,.2)', '#076A94'], indigo: ['rgba(91,101,245,.2)', '#4752E6'], gray: ['rgba(31,35,41,.1)', T2],
  };
  // 状态对应的标签色：ok 绿、warn 橙、bad 和 alert 红、idle 和 done 灰、info 蓝（进行中）、wait 紫（等待）
  const KC = { ok: 'green', warn: 'orange', bad: 'red', alert: 'red', idle: 'gray', done: 'gray', info: 'blue', wait: 'purple' };
  const tagCss = Object.entries(TAGC).map(([k, [bg, fg]]) => `.s16 .v-tg-${k}{background:${bg};color:${fg}}`).join('\n');
  const css = `
.s16{--b:${B};--bh:${BH};--ba:${BA};--bt:${BT};--bt1:${BT1};--bt2:${BT2};--k:${K};--t2:${T2};--t3:${T3};--td:${TD};--l:${LN};--lc:${LC};--bg:${BG};--bg2:${BG2};--hv:${HV};--gr:${GR};--am:${AM};--rd:${RD};--pu:${PU};background:var(--bg2);color:var(--k);font-family:${FB};font-size:14px;line-height:22px;${TN}}
.s16 .v-pad{padding-left:16px;padding-right:16px}
/* 字号行高只有几档：12/20、14/22、16/24、17/24（手机标题）、20/28、24/32、30/38；字重只用 400 / 500 / 600 */
.s16 .v-h1{font:600 24px/32px ${FT}}
.s16 .v-h2{font:600 20px/28px ${FT}}
.s16 .v-h3{font:500 16px/24px ${FB}}
.s16 .v-tx{font:400 14px/22px ${FB};color:var(--k)}
.s16.scr .v-tx{font-size:16px;line-height:24px}
.s16 .v-mut{font:400 12px/20px ${FB};color:var(--t3)}
.s16.scr .v-mut{font-size:14px;line-height:22px}
.s16 .v-num{font-family:${FN};${TN}}
.s16 .v-tm{font:600 30px/38px ${FN};${TN}}
.s16 .v-big{font:600 48px/56px ${FN};letter-spacing:-.01em;${TN}}
.s16 .v-price{font:600 24px/32px ${FN};${TN}}
.s16 .v-price small{font:400 14px/22px ${FN};color:var(--t3);margin-left:4px}
/* 按钮：32 高、圆角 6、14px 常规字重；主按钮飞书蓝，次按钮白底 #D0D3D6 描边；.wide 手机通栏 48 高圆角 8；.sm 28 高 */
.s16 .v-btn{height:32px;min-width:80px;padding:0 15px;border-radius:6px;border:1px solid var(--b);background:var(--b);color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:4px;font:400 14px/22px ${FB};white-space:nowrap}
.s16 .v-btn.wide{display:flex;width:100%;height:48px;border-radius:8px;font:500 17px/24px ${FB}}
.s16 .v-btn.ghost{background:#fff;border-color:var(--lc);color:var(--k)}
.s16 .v-btn.sm{height:28px;min-width:48px;padding:0 11px}
/* 蓝描边按钮：次级但想突出的动作（编辑、预览、邀请）；文字按钮：没有底也没有边；.danger 危险操作红字红边 */
.s16 .v-btn.line{background:#fff;border-color:var(--b);color:var(--b)}
.s16 .v-btn.text{min-width:0;height:auto;padding:0;border:none;background:none;color:var(--b)}
.s16 .v-btn.danger{background:#fff;border-color:var(--rd);color:var(--rd)}
/* 图标按钮：32 见方、透明底、圆角 6，图标 #2B2F36；.bd 白底灰边；手机上图标 24 */
.s16 .v-ib{width:32px;height:32px;flex:none;border-radius:6px;color:${IC1};display:grid;place-items:center}
.s16 .v-ib.bd{background:#fff;border:1px solid var(--lc)}
.s16.scr .v-ib svg{width:24px;height:24px}
/* 卡片：白底；手机上是灰底上的圆角 10 分组卡，不加描边和阴影；电脑上 1px #DEE0E3、圆角 8 */
.s16 .v-card{position:relative;background:#fff;border-radius:10px;overflow:hidden}
.s16.web .v-card{border:1px solid var(--l);border-radius:8px}
.s16 .v-card>.ph{height:200px}
.s16 .v-card .bd{min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 16px}
/* 列表：手机上整组是白色圆角 10 的分组卡，左右离屏幕 16；行线极浅，从文字起点开始 */
.s16 .v-list{position:relative}
.s16.scr .v-list{background:#fff;border-radius:10px}
.s16.scr .v-list.v-pad{margin-left:16px;margin-right:16px;padding:0 16px}
.s16 .v-list.box{background:#fff;border-radius:10px;padding:0 16px}
.s16.web .v-list.box{border:1px solid var(--l);border-radius:8px}
.s16 .v-row{display:flex;align-items:center;gap:12px;min-height:52px;border-top:1px solid rgba(31,35,41,.08)}
.s16 .v-row:first-child{border-top:none}
.s16 .v-list.box .v-row{min-height:52px}
/* 排班式的行：左时间、中内容、状态、右对齐数字；第二行 12px 灰字 */
.s16 .v-row.sch{display:grid;grid-template-columns:56px 1fr auto 40px;gap:0 10px;height:60px}
.s16 .v-row.sch .d,.s16 .v-row.sch .s{font:500 16px/24px ${FB}}
.s16 .v-row.sch .s{font-weight:400}
.s16 .v-row.sch small{display:block;font:400 12px/20px ${FN};color:var(--t3);${TN}}
.s16 .v-row.sch .h{text-align:right;font:500 16px/24px ${FN};${TN}}
.s16 .v-row.rest .s{height:36px;grid-column:2/5;border-radius:6px;background:var(--bg2);display:flex;align-items:center;gap:8px;padding:0 12px;color:var(--t3);font:400 14px/22px ${FB}}
/* 键值行：左边灰字、右边墨色；手机 16px，浮层和电脑 14px */
.s16 .v-row.kv{justify-content:space-between;font:400 16px/24px ${FB};color:var(--t2)}
.s16 .v-row.kv>span{display:flex;align-items:center;gap:8px}
.s16 .v-row.kv>b{display:flex;align-items:center;gap:6px;font:400 16px/24px ${FN};color:var(--k);${TN}}
.s16.web .v-row.kv,.s16.web .v-row.kv>b{font-size:14px;line-height:22px}
/* 筛选：电脑上是 32 高的下拉框，「字段名」灰字加「当前值」深字加小箭头；手机上是灰底上的白色小块，选中浅蓝底蓝字 */
.s16 .v-chips{display:flex;align-items:center;gap:8px}
.s16 .v-chip{height:32px;padding:0 11px;border:1px solid var(--lc);border-radius:6px;background:#fff;display:inline-flex;align-items:center;gap:4px;font:400 14px/22px ${FB};color:var(--t2);white-space:nowrap}
.s16 .v-chip b{font-weight:400;color:var(--k);margin-left:4px}
.s16 .v-chip .ic{color:var(--t3)}
.s16 .v-chip.on{border-color:var(--b);background:var(--bt);color:var(--b)}
.s16 .v-chip.on b,.s16 .v-chip.on .ic{color:var(--b)}
.s16.scr .v-chip{border-color:transparent}
.s16.scr .v-chip.on{border-color:transparent;background:var(--bt1);font-weight:500}
/* 输入框：32 高、#D0D3D6 描边、圆角 6，占位字 #8F959E；手机上灰底页里是 36 高的白块 */
.s16 .v-inp{height:32px;display:flex;align-items:center;gap:8px;padding:0 11px;border:1px solid var(--lc);border-radius:6px;background:#fff;font:400 14px/22px ${FB};color:var(--t3);white-space:nowrap}
.s16.scr .v-inp{height:36px;border:none;border-radius:8px}
.s16 .ph{background-size:cover;background-position:center}
/* 分段切换：浅灰槽里一块白片，选中字 500 */
.s16 .v-seg{height:32px;padding:2px;border-radius:6px;background:rgba(31,35,41,.08);display:inline-flex}
.s16 .v-seg span{padding:0 12px;border-radius:4px;display:flex;align-items:center;font:400 14px/22px ${FB};color:var(--t2);white-space:nowrap}
.s16 .v-seg .on{background:#fff;color:var(--k);font-weight:500;box-shadow:0 1px 2px rgba(31,35,41,.1)}
/* 状态标签：该色 20% 浅底加深一档的同色字，前面一个同色实心小图标，圆角 4、字重 500；形状、文字、颜色一起变 */
.s16 .v-sg{display:inline-block;flex:none;vertical-align:middle}
.s16 .v-st,.s16 .v-tag{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 6px;border-radius:4px;font:500 12px/20px ${FB};white-space:nowrap;flex:none}
${tagCss}
/* 两样信息并排：拆成两个元素，中间空 12px，不拿符号串 */
.s16 .v-pr{display:inline-flex;align-items:baseline;gap:12px;white-space:nowrap}
.s16 .v-lg{margin-left:auto;display:flex;gap:16px;font:400 14px/22px ${FB};color:var(--t2)}
.s16 .v-lg span{display:flex;align-items:center;gap:6px;white-space:nowrap}
/* 日期条：白色分组卡里七格，当天飞书蓝底白字 */
.s16 .v-wk{margin:12px 16px 0;padding:8px;border-radius:10px;background:#fff;display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.s16 .v-wk div{height:56px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.s16 .v-wk span{font:400 12px/20px ${FB};color:var(--t3)}
.s16 .v-wk b{font:500 17px/24px ${FN};${TN}}
.s16 .v-wk .off b{color:var(--td);font-weight:400}
.s16 .v-wk .on{background:var(--b)}
.s16 .v-wk .on span,.s16 .v-wk .on b{color:#fff}
/* 今日主卡：白色分组卡，30px 时段打头、状态标签靠右，下面一句话，最后一行地点配按钮 */
.s16 .v-td{margin:12px 16px 0;border-radius:10px;background:#fff;padding:16px}
.s16 .v-td .r1{display:flex;justify-content:space-between;align-items:center;gap:12px}
.s16 .v-td .r2{margin-top:4px;font:500 16px/24px ${FB};color:var(--k)}
.s16 .v-td .r3{margin-top:12px;padding-top:12px;border-top:1px solid rgba(31,35,41,.08);display:flex;justify-content:space-between;align-items:center;gap:12px}
.s16 .v-td .r3>span{display:flex;align-items:center;gap:6px;font:400 14px/22px ${FB};color:var(--t2);white-space:nowrap}
/* 区块标题：17px 600 墨色真标题，右边一个灰色汇总数字或图例 */
.s16 .v-lh{margin:20px 16px 8px;min-height:24px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.s16 .v-lh>b{font:600 17px/24px ${FT};color:var(--k);white-space:nowrap}
.s16 .v-lh>span{font:400 14px/22px ${FN};color:var(--t3);white-space:nowrap;${TN}}
/* 线条页签：当前项飞书蓝字、字重 500、下面 2px 蓝条；下面一条 1px 通栏线 */
.s16 .v-tb{margin:8px 16px 0;display:flex;gap:32px;border-bottom:1px solid var(--l)}
.s16 .v-tb span{height:44px;display:flex;align-items:center;gap:4px;font:400 14px/22px ${FB};color:var(--k);position:relative;white-space:nowrap}
.s16.scr .v-tb span{font-size:16px;line-height:24px}
.s16 .v-tb span em{font:400 12px/20px ${FN};font-style:normal;color:var(--t3);${TN}}
.s16 .v-tb .on{color:var(--b);font-weight:500}
.s16 .v-tb .on em{color:var(--b)}
.s16 .v-tb .on:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;border-radius:1px;background:var(--b)}
/* 头像：彩色实心圆加白色姓，没有照片时飞书就是这么画的 */
.s16 .v-av{width:40px;height:40px;border-radius:50%;background:${BH};display:grid;place-items:center;font:500 16px/1 ${FB};color:#fff;flex:none}
/* 人物：头像、名字 16、一行灰字、右边状态，下面可放按钮 */
.s16 .v-who{display:grid;grid-template-columns:40px 1fr auto;gap:12px;align-items:center;padding:12px 0}
.s16 .v-who+.v-who{border-top:1px solid rgba(31,35,41,.08)}
.s16 .v-who b{display:block;font:500 16px/24px ${FB}}
.s16 .v-who p{font:400 14px/22px ${FB};color:var(--t3)}
.s16 .v-who.lg{grid-template-columns:48px 1fr auto;padding:0}
.s16 .v-who.lg .v-av{width:48px;height:48px;font-size:18px}
.s16 .v-who.lg b{font:600 20px/28px ${FT}}
.s16 .v-acts{margin-top:12px;display:flex;gap:8px}
/* 时段格：白块，选中浅蓝底蓝边蓝字加粗，不可选灰字划线 */
.s16 .v-slots{display:grid;gap:8px}
.s16 .v-slot{height:40px;border:1px solid transparent;border-radius:6px;background:#fff;display:flex;align-items:center;justify-content:center;gap:6px;font:400 16px/24px ${FN};color:var(--k);${TN}}
.s16.web .v-slot{border-color:var(--lc);font-size:14px}
.s16 .v-slot.on{background:var(--bt);border-color:var(--b);color:var(--b);font-weight:500}
.s16 .v-slot.off{background:transparent;border-color:rgba(31,35,41,.08);color:var(--td);text-decoration:line-through}
/* 小格矩阵：牙位图、座位图、工位图这类一格一个编号的东西 */
.s16 .v-cells{display:grid}
.s16 .v-cells>div{display:flex;flex-direction:column;align-items:center;gap:2px;font:400 12px/20px ${FN};color:var(--t2);${TN}}
.s16 .v-cells>div.on{color:var(--b);font-weight:600}
/* 空、加载、出错：图标、一句话、一个按钮；手机上是白色分组卡 */
.s16 .v-blank{height:164px;border-radius:10px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--t3)}
.s16.web .v-blank{background:none}
.s16 .v-blank b{font:400 14px/22px ${FB};color:var(--t2)}
.s16 .v-blank .v-btn{margin-top:4px}
.s16 .v-sk{display:block;border-radius:4px;background:rgba(31,35,41,.06)}
.s16 .v-skimg{display:grid;place-items:center;border-radius:6px;background:rgba(31,35,41,.06);color:var(--td)}
.s16 .v-skr{padding:12px 0;border-top:1px solid rgba(31,35,41,.08);display:grid;grid-template-columns:40px 1fr;gap:12px}
.s16 .v-skr:first-child{border-top:none}
.s16 .v-skr .c{width:40px;height:40px;border-radius:50%}
.s16 .v-skr .v-sk+.v-sk{margin-top:8px}
/* 地图卡 */
.s16 .v-map{position:relative;margin:12px 16px 0;border-radius:10px;overflow:hidden;background:#F1F2F4}
/* 手机顶栏：一级页左边 24px 大标题（左边可放头像）；二级页 44 高、中间 17px 标题、左边返回 */
.s16 .v-nav{position:relative;height:52px;margin:4px 16px 0;display:flex;align-items:center;justify-content:space-between;gap:12px}
.s16 .v-nav .t{flex:1;font:600 24px/32px ${FT};white-space:nowrap}
.s16 .v-nav.c{height:44px;margin:0 8px}
.s16 .v-nav.c .t{flex:none;position:absolute;left:50%;transform:translateX(-50%);font:600 17px/24px ${FT}}
.s16 .v-logo{display:flex;align-items:center;gap:8px;height:32px}
.s16 .v-logo b{font:600 18px/26px ${FT};white-space:nowrap}
/* 英文名只在品牌本来有时写：14px 灰字、不拉字距、不全大写 */
.s16 .v-logo span{font:400 14px/22px ${FN};letter-spacing:0;color:var(--t3);white-space:nowrap}
/* 标签栏：白底、顶上一根极浅的线；当前项蓝字、字重 500，图标描线变蓝、里面填一层浅蓝，形状也变 */
.s16 .v-tabs{position:absolute;left:0;right:0;bottom:0;height:84px;background:#fff;border-top:1px solid rgba(31,35,41,.08);display:grid;padding-top:7px;z-index:6}
.s16 .v-tabs>div{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;color:var(--t2);font:400 12px/20px ${FB}}
.s16 .v-tabs>div.on{color:var(--b);font-weight:500}
.s16 .v-tabs>div.on svg{fill:var(--bt2)}
/* 底部操作条：白底，按钮 44 高圆角 8 */
.s16 .v-bar{position:absolute;left:0;right:0;bottom:0;height:92px;background:#fff;border-top:1px solid rgba(31,35,41,.08);display:flex;gap:12px;padding:8px 16px 0;z-index:6}
.s16 .v-bar .v-btn{flex:1;height:44px;border-radius:8px;font:500 16px/24px ${FB}}
.s16 .v-bar .v-btn.ghost{flex:none;width:96px}
/* 电脑后台：#F5F6F7 灰画布，侧栏同色，右边一整块白色内容面板（圆角 8，四周留 8px 灰缝）；有 topbar 时顶上 56px 白色顶栏 */
.s16.web{display:flex;background:var(--bg)}
.s16.web:has(>.v-top){padding-top:56px}
.s16 .v-top{position:absolute;left:0;top:0;right:0;height:56px;background:#fff;border-bottom:1px solid var(--l);display:flex;align-items:center;gap:8px;padding:0 16px 0 20px;z-index:4}
.s16 .v-top .v-logo{margin-right:40px}
.s16 .v-top .sp{flex:1}
.s16 .v-top .v-av{width:32px;height:32px;font-size:14px;margin-left:8px}
.s16 .v-side{width:224px;flex:none;background:var(--bg);padding:16px 8px;position:relative}
.s16 .v-side>.v-logo{padding:0 12px;height:40px}
.s16 .v-store{margin:0 4px 12px;height:40px;border-radius:6px;background:#fff;border:1px solid var(--l);display:flex;align-items:center;gap:8px;padding:0 11px;font:500 14px/22px ${FB};white-space:nowrap}
.s16 .v-side>.v-logo+.v-store{margin-top:16px}
.s16 .v-store .ic{color:var(--t2)}
.s16 .v-store .ic:last-child{margin-left:auto;color:var(--t3)}
.s16 .v-nv{display:flex;flex-direction:column;gap:2px}
.s16 .v-nv div{height:40px;border-radius:6px;display:flex;align-items:center;gap:8px;padding:0 12px;font:400 14px/22px ${FB};color:var(--k)}
.s16 .v-nv div .ic{color:var(--t2)}
.s16 .v-nv .on{background:color-mix(in srgb,var(--b) 10%,transparent);color:var(--b);font-weight:500}
.s16 .v-nv .on .ic{color:var(--b)}
.s16 .v-nv em{margin-left:auto;min-width:20px;height:20px;padding:0 6px;border-radius:10px;background:rgba(31,35,41,.08);font:500 12px/20px ${FN};font-style:normal;color:var(--t2);text-align:center;${TN}}
.s16 .v-me{position:absolute;left:8px;right:8px;bottom:16px;display:flex;align-items:center;gap:8px;padding:0 12px;font:500 14px/22px ${FB}}
.s16 .v-me .v-av{width:32px;height:32px;font-size:14px}
.s16 .v-me small{display:block;font:400 12px/20px ${FB};color:var(--t3)}
.s16 .v-main{flex:1;position:relative;margin:8px 8px 8px 0;padding:20px 24px;min-width:0;background:#fff;border-radius:8px;overflow:hidden}
.s16 .v-mh{display:flex;align-items:center;gap:12px;height:32px}
.s16 .v-mh .v-h2{font:600 20px/28px ${FT};white-space:nowrap}
.s16 .v-mh .sp{flex:1}
.s16 .v-main .v-tb{margin:12px 0 0}
.s16 .v-wsw{display:flex;align-items:center;gap:2px;height:32px;border:1px solid var(--lc);border-radius:6px;padding:0 4px;font:400 14px/22px ${FN};white-space:nowrap;${TN}}
.s16 .v-wsw .ic{color:var(--t2)}
.s16 .v-wsw span{padding:0 6px}
/* 提示条：飞书蓝 B50 浅底、蓝色实心信息图标、14px 字，右边可放文字按钮；warn 是橙色那一档 */
.s16 .v-note{display:flex;align-items:center;gap:8px;min-height:40px;padding:9px 16px;border-radius:6px;background:var(--bt);font:400 14px/22px ${FB};color:var(--k)}
.s16 .v-note.warn{background:#FFF3E5}
.s16 .v-note .v-link{margin-left:auto}
.s16.scr .v-note{margin:12px 16px 0}
/* 汇总数字：一圈 1px #DEE0E3、圆角 8，格子之间一条线；28px 数字在上，14px 灰色说明词在下，最后一格可放小柱图 */
.s16 .v-kp{margin-top:16px;display:grid;border:1px solid var(--l);border-radius:8px}
.s16 .v-kp>div{padding:16px 20px;border-left:1px solid var(--l);position:relative}
.s16 .v-kp>div:first-child{border-left:none}
.s16 .v-kp b{display:block;font:600 28px/36px ${FN};${TN}}
.s16 .v-kp b+span{display:flex;align-items:center;gap:6px;margin-top:2px;font:400 14px/22px ${FB};color:var(--t2)}
.s16 .v-kp b small{font:400 14px/22px ${FN};color:var(--t3);margin-left:4px}
.s16 .v-kp .wd{display:flex;align-items:flex-end;justify-content:space-between}
.s16 .v-bars{display:flex;align-items:flex-end;gap:12px}
.s16 .v-bars div{display:flex;flex-direction:column;align-items:center;gap:4px}
.s16 .v-bars i{display:block;width:12px;border-radius:2px 2px 0 0;background:var(--bt2)}
.s16 .v-bars i.c{background:var(--b)}
.s16 .v-bars span{display:block;font:400 12px/16px ${FN};color:var(--t3);${TN}}
.s16 .v-fl{margin-top:16px;display:flex;align-items:center;gap:8px}
/* 表格：表头 #F2F3F5 底、#646A73 常规字重；行白底，1px #DEE0E3 横线，没有竖线、没有斑马纹、没有外框；行悬停 #EFF0F1，选中 #F0F4FF */
.s16 .v-tbl{margin-top:12px;width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}
.s16 .v-tbl th{height:44px;background:var(--bg2);font:400 14px/22px ${FB};color:var(--t2);text-align:left;padding:0 12px;white-space:nowrap}
.s16 .v-tbl th.cur{color:var(--b);font-weight:500;box-shadow:inset 0 -2px 0 var(--b)}
.s16 .v-tbl th:first-child,.s16 .v-tbl td:first-child{padding-left:16px}
.s16 .v-tbl th:last-child,.s16 .v-tbl td:last-child{padding-right:16px}
.s16 .v-tbl.n th:last-child,.s16 .v-tbl.n td:last-child{text-align:right}
.s16 .v-tbl td{height:48px;border-bottom:1px solid var(--l);padding:8px 12px;font:400 14px/22px ${FB};color:var(--k);vertical-align:middle}
.s16 .v-tbl td.hr{font:400 14px/22px ${FN};${TN}}
.s16 .v-tbl td.hr.lo{color:var(--t3)}
.s16 .v-tbl tr.sel td{background:var(--bt)}
.s16 .v-tbl tr.hv td{background:var(--hv)}
.s16 .v-tbl th.ck,.s16 .v-tbl td.ck{padding-right:0}
/* 复选框：16 见方、圆角 4，未选 1px 灰边；选中飞书蓝底白勾，半选蓝底白横杠 */
.s16 .v-ck{width:16px;height:16px;border-radius:4px;border:1px solid var(--td);background:#fff;display:inline-grid;place-items:center;vertical-align:middle;flex:none}
.s16 .v-ck.on,.s16 .v-ck.part{background:var(--b);border-color:var(--b)}
/* 文字按钮：蓝字没有底；.red 危险操作红字；操作列一排文字按钮间距 16，多的收进更多 */
.s16 .v-link{display:inline-flex;align-items:center;gap:4px;font:400 14px/22px ${FB};color:var(--b);white-space:nowrap}
.s16 .v-link.red{color:var(--rd)}
.s16 .v-ops{display:flex;align-items:center;gap:16px}
/* 分页：右下，「共 N 条」、上一页、页码、下一页、每页条数；当前页蓝字浅蓝底 */
.s16 .v-pg{margin-top:16px;display:flex;align-items:center;justify-content:flex-end;gap:4px;font:400 14px/22px ${FN};color:var(--t2);${TN}}
.s16 .v-pg>span{min-width:32px;height:32px;padding:0 6px;border-radius:6px;display:grid;place-items:center;color:var(--k)}
.s16 .v-pg>span.on{background:var(--bt);color:var(--b);font-weight:500}
.s16 .v-pg>span.off{color:var(--td)}
.s16 .v-pg>em{font-style:normal;margin-right:8px}
.s16 .v-pg .v-chip{margin-left:8px}
.s16 .v-em{display:flex;align-items:center;gap:8px}
.s16 .v-em i{width:32px;height:32px;border-radius:50%;background:${BH};display:grid;place-items:center;font:500 14px/1 ${FB};font-style:normal;color:#fff;flex:none}
.s16 .v-em i.add{background:var(--hv);color:var(--t2)}
.s16 .v-em b{display:block;font:400 14px/22px ${FB};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.s16 .v-em small{display:block;font:400 12px/18px ${FB};color:var(--t3);white-space:nowrap}
.s16 .v-cp{position:relative;height:32px;border-radius:6px;background:var(--bg2);display:flex;align-items:center;justify-content:center;padding:0 6px;font:400 14px/22px ${FN};color:var(--k);white-space:nowrap;${TN}}
.s16 .v-cp.rs{background:none;color:var(--td);font-family:${FB};justify-content:flex-start;padding-left:10px}
.s16 .v-cp .v-sg,.s16 .v-bk .v-sg{position:absolute;top:-5px;right:-5px}
.s16 .v-cp.op{background:none;border:1px dashed var(--lc);color:var(--t3)}
.s16 .v-cp.sel{background:var(--bt);border:1px solid var(--b);color:var(--b);font-weight:500}
/* 资源时间轴：像飞书日历的日视图，块是 B100 浅蓝底深字，选中是实心飞书蓝白字，已结束灰，空档虚线 */
.s16 .v-tl{position:relative;margin-top:12px;border:1px solid var(--l);border-radius:8px;overflow:hidden;background:#fff}
.s16 .v-tl .hd{position:relative;height:40px;display:flex;background:var(--bg2);font:400 14px/40px ${FB};color:var(--t2)}
.s16 .v-tl .c1{flex:none;padding-left:16px}
.s16 .v-tl .c2{flex:none;padding-right:16px;text-align:right}
.s16 .v-tl .ln{position:relative;flex:1;min-width:0}
.s16 .v-tl .hd .ln span{position:absolute;top:0;bottom:0;padding-left:6px;font:400 12px/40px ${FN};${TN}}
.s16 .v-tl .bd{position:relative}
.s16 .v-tl .ov{position:absolute;top:0;bottom:0;pointer-events:none}
.s16 .v-tl .ov>i{position:absolute;top:0;bottom:0;width:1px;background:${HV}}
/* 午休这类全列时段带：浅灰整列，底部一个线性图标配 14px 灰字 */
.s16 .v-tl .ov>.off{position:absolute;top:0;bottom:0;padding-bottom:18px;background:var(--bg);display:flex;align-items:flex-end;justify-content:center}
.s16 .v-tl .ov>.off>span{display:flex;align-items:center;gap:6px;font:400 14px/22px ${FB};color:var(--t3);white-space:nowrap}
/* 现在线：1.5px 蓝线，顶头一个朝下的小三角；不画圆点 */
.s16 .v-tl .ov>i.now{width:1.5px;background:var(--b)}
.s16 .v-tl .ov>i.now:before{content:"";position:absolute;left:-4.25px;top:0;border-style:solid;border-width:6px 5px 0;border-color:var(--b) transparent transparent}
.s16 .v-tl .rw{position:relative;display:flex;align-items:center;border-bottom:1px solid var(--l);z-index:1}
.s16 .v-tl .rw:last-child{border-bottom:none}
.s16 .v-tl .rw .ln{align-self:stretch}
.s16 .v-tl .rw .c2{font:400 14px/22px ${FN};${TN}}
.s16 .v-tl .rw .c2.lo{color:var(--t3)}
/* 放不下的字省略：overflow 加在字上，.v-bk 自己不加，角上记号要露出来 */
.s16 .v-bk{position:absolute;top:6px;bottom:6px;border-radius:6px;background:var(--bt1);display:flex;flex-direction:column;justify-content:center;padding:0 7px;color:var(--k);white-space:nowrap}
.s16 .v-bk b{display:flex;align-items:center;gap:4px;min-width:0;font:500 13px/20px ${FB}}
.s16 .v-bk b>span{min-width:0;overflow:hidden;text-overflow:ellipsis}
.s16 .v-bk>span{min-width:0;overflow:hidden;text-overflow:ellipsis;font:400 12px/18px ${FB};color:var(--t2)}
.s16 .v-bk.done{background:var(--bg2);color:var(--t3)}
.s16 .v-bk.done>span{color:var(--t3)}
.s16 .v-bk.op{background:#fff;border:1px dashed var(--lc);color:var(--t3)}
.s16 .v-bk.op>span{color:var(--t3)}
.s16 .v-bk.sel{background:var(--b);color:#fff}
.s16 .v-bk.sel>span{color:rgba(255,255,255,.85)}
/* 浮层：白底、1px #DEE0E3、圆角 8、飞书浮层阴影；点开一条时压在旁边 */
.s16 .v-pop{position:absolute;z-index:8;background:#fff;border:1px solid var(--l);border-radius:8px;padding:12px 16px 16px;box-shadow:${SH_POP}}
.s16 .v-pop .v-who{padding:0 0 8px;border-bottom:1px solid var(--l);margin-bottom:4px}
.s16 .v-pop .v-who b{font-size:16px}
.s16 .v-pop .v-row{min-height:32px;border-top:none}
.s16 .v-pop .v-row.kv,.s16 .v-pop .v-row.kv>b{font-size:14px;line-height:22px}
.s16 .v-pop .v-acts{margin-top:8px}
.s16 .v-pop .v-acts .v-btn{flex:1}
`;
  // 状态记号：每种是一个看得懂的小图标，形状、颜色、里面的字形一起变，色弱也分得开；不用小圆点
  //   ok 实心圆白勾（已到诊、正常、通过）、warn 实心三角白叹号（待确认）、bad 圆角方白叉（爽约、驳回）、alert 圆角方白叹号（过敏、禁忌）、
  //   info 实心圆白竖线（进行中）、wait 实心圆白钟（等待）、idle 线圈钟（未开始）、done 一个勾（已完成）；on / fill / dash 是图例用的小方块
  const SC = { ok: GR, warn: AM, bad: RD, alert: RD, info: B, wait: PU, idle: T3, done: T3 };
  const W2 = 'fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
  const SIGNS = {
    ok: { base: (c) => `<circle cx="7" cy="7" r="6.3" fill="${c}"/>`, mark: () => `<path d="m4.3 7.2 1.9 1.9 3.6-4" ${W2}/>` },
    warn: { base: (c) => `<path d="M6 2.1a1.15 1.15 0 0 1 2 0l5 8.6c.45.78-.1 1.75-1 1.75H2c-.9 0-1.45-.97-1-1.75Z" fill="${c}"/>`, mark: () => `<path d="M7 5.6v2.6" ${W2}/><circle cx="7" cy="10.35" r=".9" fill="#fff"/>` },
    bad: { base: (c) => `<rect x=".9" y=".9" width="12.2" height="12.2" rx="3" fill="${c}"/>`, mark: () => `<path d="m5 5 4 4m0-4-4 4" ${W2}/>` },
    alert: { base: (c) => `<rect x=".9" y=".9" width="12.2" height="12.2" rx="3" fill="${c}"/>`, mark: () => `<path d="M7 3.9v3.5" ${W2}/><circle cx="7" cy="9.9" r=".9" fill="#fff"/>` },
    info: { base: (c) => `<circle cx="7" cy="7" r="6.3" fill="${c}"/>`, mark: () => `<path d="M7 6.4v3.6" ${W2}/><circle cx="7" cy="4.3" r=".9" fill="#fff"/>` },
    wait: { base: (c) => `<circle cx="7" cy="7" r="6.3" fill="${c}"/>`, mark: () => `<path d="M7 4.2V7l1.9 1.3" ${W2}/>` },
    idle: { base: (c, w) => `<circle cx="7" cy="7" r="5.7" fill="${w ? '#fff' : 'none'}" stroke="${c}" stroke-width="1.5"/>`, mark: (c) => `<path d="M7 4.3V7l1.8 1.2" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` },
    done: { base: (c, w) => (w ? `<path d="m2.8 7.3 2.7 2.7 5.7-6.2" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : ''), mark: (c) => `<path d="m2.8 7.3 2.7 2.7 5.7-6.2" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` },
    on: { base: () => '<rect x="1.5" y="1.5" width="11" height="11" rx="3" style="fill:var(--b)"/>', mark: () => '' },
    fill: { base: () => `<rect x="1.5" y="1.5" width="11" height="11" rx="3" fill="${BT2}"/>`, mark: () => '' },
    dash: { base: () => `<rect x="2" y="2" width="10" height="10" rx="2.6" fill="none" stroke="${TD}" stroke-width="1" stroke-dasharray="2 1.4"/>`, mark: () => '' },
  };
  // sign(kind, size, color)：不传颜色时用这种状态的实心色；标签里传标签的字色
  const sign = (kind = 'ok', s = 14, c = '') => { const g = SIGNS[kind] || SIGNS.ok; const col = c || SC[kind] || GR; return `<svg class="v-sg" width="${s}" height="${s}" viewBox="0 0 14 14">${g.base(col)}${g.mark(col)}</svg>`; };
  // 压在格子角上的记号：底形先用白色加粗描一圈，再画本身，压在浅色格子上轮廓清楚
  const pin = (kind) => { const g = SIGNS[kind] || SIGNS.ok; const col = SC[kind] || GR; return `<svg class="v-sg" width="17" height="17" viewBox="-1.5 -1.5 17 17"><g stroke="#fff" stroke-width="3" stroke-linejoin="round">${g.base('#fff', true)}</g>${g.base(col)}${g.mark(col)}</svg>`; };
  // 一行最多两样：传数组时拆成两个元素中间空 12px，多出来的不要
  const pair = (a, b) => `<span class="v-pr"><span>${a}</span>${b != null && b !== '' ? `<span>${b}</span>` : ''}</span>`;
  const two = (x) => (Array.isArray(x) ? pair(x[0], x[1]) : x);
  // 全大写的长英文名（拼音大写这种）改成首字母大写；缩写（不超过四个字母）照写
  const enCase = (en) => (/^[A-Z]{5,}$/.test(en) ? en[0] + en.slice(1).toLowerCase() : en);
  // 品牌记号：主色圆角方块里一个白色线性小图形，24×24。clock 表盘、peak 山、tooth 牙、cross 十字、check 勾、stack 三层、chart 三根柱、star 星
  const MARKS = {
    clock: '<circle cx="12" cy="12" r="6.6" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 8.6V12l2.4 1.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    peak: '<path d="M4.5 17.5 10 9.5l3.2 4.4 2.3-2.9 4 6.5Z" fill="#fff"/>',
    tooth: '<path d="M12 7.9c-1-.7-2-1-3-1-1.9 0-3.1 1.5-3.1 3.5 0 1.3.5 2.4.9 3.7.4 1.3.5 2.4.7 3.3.2.6.5 1 1 1 .6 0 .9-.5 1.1-1.3.2-1.1.5-2.7 2.4-2.7s2.2 1.6 2.4 2.7c.2.8.5 1.3 1.1 1.3.5 0 .8-.4 1-1 .2-.9.3-2 .7-3.3.4-1.3.9-2.4.9-3.7 0-2-1.2-3.5-3.1-3.5-1 0-2 .3-3 1Z" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"/>',
    cross: '<path d="M12 6.5v11M6.5 12h11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
    check: '<path d="m7 12.4 3.3 3.3L17 8.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    stack: '<path d="m12 6 6.5 3.4L12 12.8 5.5 9.4Zm-6.5 7 6.5 3.4 6.5-3.4" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    chart: '<path d="M7.5 17v-4M12 17V7.5M16.5 17v-7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
    star: '<path d="m12 6.2 1.8 3.7 4 .6-2.9 2.8.7 4L12 15.4l-3.6 1.9.7-4-2.9-2.8 4-.6Z" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"/>',
  };
  const mark = (s = 28, kind = 'clock', c = `var(--b,${B})`) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="flex:none"><rect width="24" height="24" rx="6" style="fill:${c}"/>${MARKS[kind] || MARKS.clock}</svg>`;
  // lucide 图标照飞书的线宽：24 网格上 2 个单位、圆头圆角；按钮和输入框里 16，侧栏 18，顶栏 20，手机 24
  const IC = (n, s = 16) => icon(n, s, 2);
  const hrs = (t) => { if (typeof t === 'number') return t; const [h, m] = String(t).split(':').map(Number); return h + m / 60; };
  // 头像色：没有照片时按姓轮换几种飞书色板里的色，白字
  const AVC = ['#336DF4', '#10A893', '#ED6D0C', '#9F6FF1', '#1295CA', '#5B65F5', '#DF58A5'];
  const avc = (ch) => AVC[[...String(ch || '')].reduce((a, c) => a + c.codePointAt(0), 0) % AVC.length];
  const avStyle = (ch, c) => `background:${c || avc(ch)}`;
  const tagCls = (c) => (TAGC[c] ? c : TAGC[KC[c]] ? KC[c] : 'gray');
  const CK = { on: '<svg width="10" height="10" viewBox="0 0 10 10"><path d="m2 5.2 2 2 4-4.4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>', part: '<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2.5 5h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>' };
  const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : n);
  const ui = {
    mark,   // mark(28) / mark(28, 'tooth') / mark(30, 'peak', '#1456F0')；不传颜色时跟着 --b 走
    sign,   // 状态记号：sign('ok') / sign('alert', 16) / sign('info', 12, '#1456F0')，单独放在键值行的值前面也行；种类见 SIGNS
    pair,   // 两样信息并排：pair('女', '34 岁')，中间空 12px；who 的 meta、row 的 t2、today 的 label 和 foot 直接传数组也一样
    // 字标：记号 + 18px 中文，品牌本来有英文名才传 en（14px 灰字，不拉字距，全大写的长词改成首字母大写）；sym 传记号名或一段 SVG；s 是记号边长（后台 28，手机 30）
    logo: (name, en = '', sym = 'clock', s = 28) => `<div class="v-logo">${MARKS[sym] ? mark(s, sym) : sym}<b>${name}</b>${en ? `<span>${enCase(en)}</span>` : ''}</div>`,
    // 手机顶栏：back 为 false 时是一级页，left 放头像（ui.av）或字标，后面 24px 大标题；back 为 true 时是二级页，44 高，标题 17px 居中，左边返回
    nav: ({ title = '', back = true, right = '', left = '' } = {}) => (back
      ? `<div class="v-nav c">${left || `<div class="v-ib" data-back>${IC('chevron-left', 24)}</div>`}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`
      : `<div class="v-nav">${left}${title ? `<div class="t">${title}</div>` : ''}${right || '<span></span>'}</div>`),
    // 图标按钮：iconBtn('ellipsis')，32 见方透明底，手机上图标自动 24；attrs 原样放进标签，加 class 请用 iconBtn(name, attrs, 'bd') 得到白底灰边
    iconBtn: (name, attrs = '', cls = '') => `<div class="v-ib ${cls}" ${attrs}>${IC(name, 20)}</div>`,
    // 底部标签栏：24px 线性图标 + 12px 字；当前项蓝字 500，图标描线变蓝、里面填一层浅蓝
    tabs: (items, cur = 0, go = []) => `<div class="v-tabs" style="grid-template-columns:repeat(${items.length},1fr)">${items.map(([ic, t], i) => `<div class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${IC(ic, 24)}<span>${t}</span></div>`).join('')}</div>`,
    // 按钮：图标放字前面；cls 'wide' 手机通栏 48 高 / 'ghost' 白底灰边次按钮 / 'line' 白底蓝边蓝字 / 'text' 文字按钮 / 'danger' 红边红字 / 'sm' 28 高，可叠加（'ghost sm'）
    btn: (text, { ic = '', cls = '', attrs = '' } = {}) => {
      const big = /\bwide\b/.test(cls);
      return `<div class="v-btn ${cls}" ${attrs}>${ic ? IC(ic, big ? 20 : 16) : ''}${text}</div>`;
    },
    // 分段切换：seg(['我的', '全诊所'], 0)；go[i] 是点第 i 段跳去的屏幕编号
    seg: (items, cur = 0, go = []) => `<div class="v-seg">${items.map((t, i) => `<span class="${i === cur ? 'on' : ''}" ${go[i] ? `data-go="${go[i]}"` : ''}>${t}</span>`).join('')}</div>`,
    // 七格日期条：week([['一', 2], ['二', 3], ['三', 4, 'on'], ['四', 5, 'off'], …])，第三项 on 是当天、off 是没有安排的灰字
    week: (days) => `<div class="v-wk">${days.map(([w, d, c]) => `<div class="${c || ''}"><span>${w}</span><b>${d}</b></div>`).join('')}</div>`,
    // 状态标签：st('已到诊', 'ok')，浅色底 + 同色深字 + 实心小图标，kind 见 SIGNS；绝不只放颜色
    st: (text, kind = 'ok') => `<span class="v-st v-tg-${tagCls(kind)}">${sign(kind, 12, TAGC[tagCls(kind)][1])}${text}</span>`,
    // 数据标签（分类、渠道、等级，不表示状态）：tag('种植', 'teal')；色有 blue green red orange yellow purple teal sky indigo gray
    tag: (text, color = 'gray') => `<span class="v-tag v-tg-${tagCls(color)}">${text}</span>`,
    // 图例（筛选行右边）：legend([['ok', '已到诊'], ['warn', '待确认'], ['bad', '爽约']])
    legend: (items) => `<div class="v-lg">${items.map(([k, t]) => `<span>${sign(k)}${t}</span>`).join('')}</div>`,
    // 今日主卡：today({ time: '10:00–18:00', st: ui.st('待上班', 'idle'), label: '今天的中班', foot: '国贸三期店', ic: 'map-pin', btn: ui.btn('上班打卡', { ic: 'log-in' }) })
    //   时段打头、状态靠右，label 是时段下面一句话，foot 是最后一行的地点；label、foot 传数组就拆成两个元素
    today: ({ label = '', st = '', time = '', foot = '', ic = 'map-pin', btn = '', attrs = '' } = {}) => `<div class="v-td" ${attrs}><div class="r1"><div class="v-tm">${time}</div>${st}</div>${label ? `<div class="r2">${two(label)}</div>` : ''}<div class="r3"><span>${ic ? IC(ic, 16) : ''}${two(foot)}</span>${btn}</div></div>`,
    // 区块标题：lh('本周 5 个班', '40.0 h')，左边 17px 600 真标题，右边灰色数字；右边也可以放 ui.legend 或 ui.link
    lh: (l, r = '') => `<div class="v-lh"><b>${l}</b>${r ? `<span>${r}</span>` : ''}</div>`,
    // 线条页签：tabline([['待处理', 3], ['已处理'], ['我发起的']], 0)，数字可不写；当前项蓝字蓝条
    tabline: (items, cur = 0) => `<div class="v-tb">${items.map(([t, n], i) => `<span class="${i === cur ? 'on' : ''}">${t}${n != null ? `<em>${fmt(n)}</em>` : ''}</span>`).join('')}</div>`,
    // 排班式的行（放在 .v-list 里）：row({ a: '周一', a2: '10/26', t: '早班', t2: '07:00–15:00', st: ui.st('正常'), n: '8.0', attrs })
    row: ({ a = '', a2 = '', t = '', t2 = '', st = '', n = '', attrs = '' } = {}) => `<div class="v-row sch" ${attrs}><div class="d">${a}<small>${a2}</small></div><div class="s">${t}<small>${two(t2)}</small></div><div>${st}</div><div class="h">${n}</div></div>`,
    // 空档行：浅灰小块，休息、午休、没有安排都用它：rest({ a: '周四', a2: '10/29', text: '休息', ic: 'coffee' })
    rest: ({ a = '', a2 = '', text = '', ic = 'coffee' } = {}) => `<div class="v-row sch rest"><div class="d">${a}<small>${a2}</small></div><div class="s">${IC(ic, 16)}${text}</div></div>`,
    // 键值行（放在 .v-list 或 .v-list.box 里）：kv('牙位', '36')，kv('门店', '东四店', { ic: 'map-pin' })；值可以是 ui.st，或 ui.sign('alert') + '青霉素'
    kv: (label, value, { ic = '' } = {}) => `<div class="v-row kv"><span>${ic ? IC(ic, 18) : ''}${label}</span><b>${value}</b></div>`,
    // 头像：av('林', 32)，彩色实心圆加白字，颜色按字自动轮换；第三个参数指定颜色
    av: (ch, s = 40, c = '') => `<div class="v-av" style="width:${s}px;height:${s}px;font-size:${Math.round(s * 0.42)}px;${avStyle(ch, c)}">${ch}</div>`,
    // 人物条（审批、患者、学员）：who({ ch: '郑', name: '郑磊的事假', meta: ['10/31 周六', '14:00–22:00'], st: ui.st('待审批', 'warn'), acts: ui.btn('通过', { cls: 'sm' }), lg: true })；meta 传数组拆成两个元素；lg 是详情页 48px 大头像
    who: ({ ch = '', name = '', meta = '', st = '', acts = '', lg = false, attrs = '' } = {}) => `<div class="v-who ${lg ? 'lg' : ''}" ${attrs}><div class="v-av" style="${avStyle(ch)}">${ch}</div><div><b>${name}</b>${meta ? `<p>${two(meta)}</p>` : ''}${acts ? `<div class="v-acts">${acts}</div>` : ''}</div>${st || '<span></span>'}</div>`,
    // 时段格：slots([['09:00', 'off'], ['10:00', 'on'], ['10:30']], 3)，on 选中、off 不可选（灰字划线），第二个参数是列数
    slots: (items, cols = 3) => `<div class="v-slots" style="grid-template-columns:repeat(${cols},1fr)">${items.map(([t, c, go]) => `<div class="v-slot ${c || ''}" ${go ? `data-go="${go}"` : ''}>${t}</div>`).join('')}</div>`,
    // 小格矩阵（牙位图、座位图、工位图）：cells([{ html: '<svg…>', t: '36', cls: 'on' }, …], 16)，html 放图形、t 放编号
    cells: (items, cols = 8) => `<div class="v-cells" style="grid-template-columns:repeat(${cols},1fr)">${items.map(({ html = '', t = '', cls = '' }) => `<div class="${cls}">${html}${t !== '' ? `<span>${t}</span>` : ''}</div>`).join('')}</div>`,
    // 空状态：empty({ ic: 'inbox', title: '今天没有待办' })；btn 传按钮文字，h 改高度
    empty: ({ ic = 'inbox', title = '', btn = '', h = 164, attrs = '' } = {}) => `<div class="v-blank" style="height:${h}px" ${attrs}>${IC(ic, 32)}<b>${title}</b>${btn ? `<div class="v-btn">${btn}</div>` : ''}</div>`,
    // 出错状态：err({ title: '加载失败', btn: '重试' })，图标 + 一句话 + 次按钮
    err: ({ ic = 'wifi-off', title = '加载失败', btn = '重试', h = 164 } = {}) => `<div class="v-blank" style="height:${h}px">${IC(ic, 32)}<b>${title}</b><div class="v-btn ghost sm">${IC('refresh-cw', 14)}${btn}</div></div>`,
    // 加载骨架：sk(120, 14) 一根灰条，第三个参数是圆角；skel(3) 三行「圆头像 + 两根灰条」
    sk: (w = 120, h = 14, r = 4) => `<i class="v-sk" style="width:${typeof w === 'number' ? w + 'px' : w};height:${h}px;border-radius:${r}px"></i>`,
    // 图片占位：skImg('100%', 96)，半透明灰底上一个淡图标，照片、影像、文件预览还没载入时用
    skImg: (w = '100%', h = 96, ic = 'image') => `<div class="v-skimg" style="width:${typeof w === 'number' ? w + 'px' : w};height:${h}px">${IC(ic, 20)}</div>`,
    skel: (n = 3) => Array.from({ length: n }, (_, i) => `<div class="v-skr"><i class="v-sk c"></i><div><i class="v-sk" style="height:14px;width:${[64, 52, 70][i % 3]}%"></i><i class="v-sk" style="height:12px;width:${[88, 76, 82][i % 3]}%"></i></div></div>`).join(''),
    // 内容卡：card({ src: img('x'), pos: '50% 60%', title: '桂花拿铁', right: '<span class="v-price">¥28</span>', h: 200, attrs })；白底照片的图传 mask: true 把四边虚化融进白卡
    card: ({ src, h = 200, pos = '50% 50%', title = '', right = '', mask = false, attrs = '' } = {}) => `<div class="v-card" ${attrs}><div class="ph" style="height:${h}px;background-image:url(${src});background-position:${pos}${mask ? ';-webkit-mask:radial-gradient(50% 54% at 50% 54%,#000 66%,transparent 100%);mask:radial-gradient(50% 54% at 50% 54%,#000 66%,transparent 100%)' : ''}"></div><div class="bd"><div class="v-h3">${title}</div>${right}</div></div>`,
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
<g transform="translate(168 110)"><path d="M0 0c-8-9-12-15-12-21a12 12 0 0 1 24 0c0 6-4 12-12 21Z" fill="${B}"/><circle cx="0" cy="-21" r="4.5" fill="#fff"/></g>
${label ? `<text x="168" y="134" text-anchor="middle" font-size="11" font-weight="600" fill="${K}" style="paint-order:stroke" stroke="#DADFE7" stroke-width="3">${label}</text>` : ''}
<circle cx="140" cy="152" r="11" fill="${B}" fill-opacity=".14"/><circle cx="140" cy="152" r="6" fill="${B}" stroke="#fff" stroke-width="2.5"/></svg></div>`,
    // 后台顶栏（新）：topbar({ logo: ui.logo('诊序', '', 'tooth'), search: '搜索患者、预约', right: ui.iconBtn('bell') + ui.iconBtn('circle-help'), me: { ch: '苏' } })
    //   56 高白底，左字标、搜索框，右边一排图标和头像；放在后台根元素里第一个，侧栏和内容区自动让出顶上 56px
    topbar: ({ logo = '', search = '', right = '', me = null } = {}) => `<div class="v-top">${logo}${search ? `<div class="v-inp" style="width:280px">${IC('search', 16)}${search}</div>` : ''}<div class="sp"></div>${right}${me ? ui.av(me.ch, 32) : ''}</div>`,
    // 后台左侧导航：side({ logo: ui.logo('工序'), store: '国贸三期店', items: [['calendar-days', '排班', true], ['file-check-2', '审批', false, 3, 'go编号']], me: { ch: '赵', name: '赵敏', role: '店长' } })
    //   items 每项 [图标, 文字, 是否当前, 数字, 跳转]；有 topbar 时 logo 可以不传；侧栏和画布同为 #F5F6F7，当前项浅蓝块加蓝字
    side: ({ logo = '', store = '', items = [], me = null } = {}) => `<div class="v-side">${logo}${store ? `<div class="v-store">${IC('building-2', 16)}${store}${IC('chevrons-up-down', 16)}</div>` : ''}<div class="v-nv">${items.map(([ic, t, on, n, go]) => `<div class="${on ? 'on' : ''}" ${go ? `data-go="${go}"` : ''}>${IC(ic, 18)}${t}${n != null ? `<em>${n}</em>` : ''}</div>`).join('')}</div>${me ? `<div class="v-me">${ui.av(me.ch, 32)}<div>${me.name}<small>${me.role}</small></div></div>` : ''}</div>`,
    // 后台页头：head({ title: '排班', mid: ui.dateSw('10/26–11/01') + ui.btn('本周', { cls: 'ghost' }), right: ui.btn('导出', { cls: 'ghost' }) + ui.btn('发布') })，20px 标题，右边靠右，主按钮一个
    head: ({ title = '', mid = '', right = '' } = {}) => `<div class="v-mh"><div class="v-h2">${title}</div>${mid}<div class="sp"></div>${right}</div>`,
    // 日期切换：dateSw('10/26–11/01')，两边是 chevron
    dateSw: (text) => `<div class="v-wsw">${IC('chevron-left', 16)}<span>${text}</span>${IC('chevron-right', 16)}</div>`,
    // 提示条（新）：notice('有 3 位患者的预约待确认', { link: '去处理', kind: 'info' })，B50 浅蓝底；kind 'warn' 是橙色；link 是右边的文字按钮
    notice: (text, { kind = 'info', link = '', attrs = '' } = {}) => `<div class="v-note ${kind === 'warn' ? 'warn' : ''}" ${attrs}>${sign(kind === 'warn' ? 'warn' : 'info', 16)}<span>${text}</span>${link ? `<span class="v-link">${link}</span>` : ''}</div>`,
    // 汇总数字条：kpis([{ k: '出勤率', v: '96.4', u: '%' }, { k: '待审批', v: '3', st: 'warn' }, { k: '排班工时', v: '304.0', u: 'h', bars: ui.bars(…) }])；带 bars 的那格放最后、自动占满剩余宽度
    kpis: (items) => {
      const wide = items.some((i) => i.bars);
      const cols = wide ? `repeat(${items.length - 1},minmax(0,1fr)) minmax(0,2.2fr)` : `repeat(${items.length},minmax(0,1fr))`;
      const one = ({ k, v, u, st }) => `<b>${fmt(v)}${u ? `<small>${u}</small>` : ''}</b><span>${st ? sign(st) : ''}${k}</span>`;
      return `<div class="v-kp" style="grid-template-columns:${cols}">${items.map((i) => (i.bars ? `<div class="wd"><div>${one(i)}</div>${i.bars}</div>` : `<div>${one(i)}</div>`)).join('')}</div>`;
    },
    // 小柱图：bars([['一', 48], ['二', 48], ['三', 44, true]], { k: .68, gap: 12 })；第三项 true 是当前（蓝），k 是每单位多少 px，最高别超过 40px
    bars: (items, { k = 0.68, gap = 12 } = {}) => `<div class="v-bars" style="gap:${gap}px">${items.map(([d, h, c]) => `<div><i class="${c ? 'c' : ''}" style="height:${Math.round(h * k)}px"></i><span>${d}</span></div>`).join('')}</div>`,
    // 筛选下拉：filter('岗位', '全部')，字段名灰字、当前值深字、右边小箭头，放在 .v-fl 里；on 为 true 时是已选中的筛选（蓝边蓝字）
    filter: (label, value, on = false) => `<div class="v-chip ${on ? 'on' : ''}">${label}<b>${value}</b>${IC('chevron-down', 16)}</div>`,
    // 搜索框：search('搜索员工', 220)，第二个参数是宽度
    search: (text, w = 220) => `<div class="v-inp" style="width:${w}px">${IC('search', 16)}${text}</div>`,
    // 表格里的人物格：emp({ ch: '吴', name: '吴晓雨', meta: '咖啡师' })，32px 彩色头像；add 为 true 时是灰底加号（待分配）
    emp: ({ ch = '', name = '', meta = '', add = false } = {}) => `<div class="v-em"><i class="${add ? 'add' : ''}" ${add ? '' : `style="${avStyle(ch)}"`}>${add ? IC('plus', 16) : ch}</i><div style="min-width:0"><b ${add ? `style="color:${T2}"` : ''}>${name}</b>${meta ? `<small>${meta}</small>` : ''}</div></div>`,
    // 表格格子：cp('07:00–15:00', { st: 'ok', cls: 'sel' })；st 是角上的记号，cls 'rs' 灰字（休）/ 'op' 虚线（待分配）/ 'sel' 选中
    cp: (text, { st = '', cls = '' } = {}) => `<div class="v-cp ${cls}">${st ? pin(st) : ''}${text}</div>`,
    // 复选框（新）：check('') 未选 / check('on') 选中 / check('part') 半选
    check: (state = '') => `<span class="v-ck ${state}">${CK[state] || ''}</span>`,
    // 文字按钮（新）：link('详情')，link('移除', { red: true })，link('添加记录', { ic: 'plus' })；attrs 原样放进标签
    link: (text, { ic = '', red = false, attrs = '' } = {}) => `<span class="v-link ${red ? 'red' : ''}" ${attrs}>${ic ? IC(ic, 16) : ''}${text}</span>`,
    // 操作列（新）：ops(['详情', '预约', ['移除', { red: true }]], true)，一排蓝字文字按钮，第二个参数 true 时最后加一个「更多」图标
    ops: (items, more = false) => `<div class="v-ops">${items.map((x) => (Array.isArray(x) ? ui.link(x[0], x[1] || {}) : ui.link(x))).join('')}${more ? `<span class="v-link">${IC('ellipsis', 16)}</span>` : ''}</div>`,
    // 分页（新）：pager({ total: 1286, cur: 1, size: 20 })，放在表格下面靠右；页码多时中间用省略图标
    pager: ({ total = 0, cur = 1, size = 20 } = {}) => {
      const n = Math.max(1, Math.ceil(total / size));
      const list = n <= 7 ? Array.from({ length: n }, (_, i) => i + 1) : cur <= 4 ? [1, 2, 3, 4, 5, 0, n] : cur >= n - 3 ? [1, 0, n - 4, n - 3, n - 2, n - 1, n] : [1, 0, cur - 1, cur, cur + 1, 0, n];
      return `<div class="v-pg"><em>共 ${fmt(total)} 条</em><span class="${cur <= 1 ? 'off' : ''}">${IC('chevron-left', 16)}</span>${list.map((p) => (p ? `<span class="${p === cur ? 'on' : ''}">${p}</span>` : `<span>${IC('ellipsis', 16)}</span>`)).join('')}<span class="${cur >= n ? 'off' : ''}">${IC('chevron-right', 16)}</span>${ui.filter('', `${size} 条/页`)}</div>`;
    },
    // 通用表格：table({ cols: ['140px', '', '', '94px'], head: ['员工', ['三 10/28', true], '工时'], rows: [[ui.emp(…), ui.cp(…), '40.0']] })；head 项写成 [文字, true] 是当前列
    //   last：'num'（默认）末列是数字、靠右，写成 [数字, 'lo'] 是灰字退后；'ops' 末列是操作列（放 ui.ops）；'text' 末列照普通格
    //   check: true 时最前面加一列复选框，sel 是选中的行号数组（[0, 2]），选中行浅蓝底，表头复选框自动全选或半选；hover 是悬停行号
    table: ({ cols = [], head = [], rows = [], last = 'num', check = false, sel = [], hover = -1 } = {}) => {
      const hs = sel.length === 0 ? '' : sel.length === rows.length ? 'on' : 'part';
      const cw = check ? ['48px', ...cols] : cols;
      const lastCell = (c) => (last === 'num' ? `<td class="hr ${Array.isArray(c) ? c[1] : ''}">${Array.isArray(c) ? c[0] : c}</td>` : `<td class="${last === 'ops' ? 'op' : ''}">${c}</td>`);
      return `<table class="v-tbl ${last === 'num' ? 'n' : ''}"><colgroup>${cw.map((w) => `<col${w ? ` style="width:${w}"` : ''}>`).join('')}</colgroup><tr>${check ? `<th class="ck">${ui.check(hs)}</th>` : ''}${head.map((h) => (Array.isArray(h) ? `<th class="cur">${h[0]}</th>` : `<th>${h}</th>`)).join('')}</tr>${rows.map((r, ri) => `<tr class="${sel.includes(ri) ? 'sel' : ri === hover ? 'hv' : ''}">${check ? `<td class="ck">${ui.check(sel.includes(ri) ? 'on' : '')}</td>` : ''}${r.map((c, i) => (i === r.length - 1 ? lastCell(c) : `<td>${c}</td>`)).join('')}</tr>`).join('')}</table>`;
    },
    // 资源时间轴：timeline({ from: 9, to: 18, head: '椅位', tail: '分钟', now: '09:41', off: [['12:00', '13:30', '午休', 'coffee']], rows: [{ ch: '林', name: '林医生', meta: '2 号椅', tail: '300', items: [{ s: '10:00', e: '11:00', t: '陈某', d: '根管', st: 'ok', cls: 'sel', go: 'detail' }] }] })
    //   items 每块：s/e 起止、t 主字、d 副字、st 角上记号（ok/warn/bad）、cls 'done' 已结束 / 'sel' 选中 / 'op' 虚线空档、ic 主字前的线性图标、go 跳转
    //   rows 每行：add: true 是灰底加号（待分配），lo: true 是右列数字退后；c1、c2 是左右两列宽度，rh 是行高
    //   off 每段：[起, 止, 字, 线性图标]，整列浅灰带；now 是现在线，顶头一个朝下的小三角
    timeline: ({ from = 9, to = 18, head = '', tail = '', now = null, off = [], rows = [], c1 = 148, c2 = 64, rh = 56 } = {}) => {
      const span = to - from;
      const X = (t) => ((hrs(t) - from) / span * 100).toFixed(3) + '%';
      const W = (s, e) => ((hrs(e) - hrs(s)) / span * 100).toFixed(3) + '%';
      const hours = Array.from({ length: span }, (_, i) => from + i);
      const bk = ({ s, e, t = '', d = '', st = '', cls = '', ic = '', go = '' }) => `<div class="v-bk ${cls}" style="left:calc(${X(s)} + 1.5px);width:calc(${W(s, e)} - 3px)" ${go ? `data-go="${go}"` : ''}>${st ? pin(st) : ''}<b>${ic ? IC(ic, 14) : ''}<span>${t}</span></b>${d ? `<span>${d}</span>` : ''}</div>`;
      const row = (r) => `<div class="rw" style="height:${rh}px"><div class="c1" style="width:${c1}px">${ui.emp(r)}</div><div class="ln">${(r.items || []).map(bk).join('')}</div><div class="c2 ${r.lo ? 'lo' : ''}" style="width:${c2}px">${r.tail == null ? '' : r.tail}</div></div>`;
      const pos = `left:${c1}px;right:${c2}px`;
      return `<div class="v-tl"><div class="hd"><div class="c1" style="width:${c1}px">${head}</div><div class="ln">${hours.map((h) => `<span style="left:${X(h)};width:${W(h, h + 1)}">${String(h).padStart(2, '0')}:00</span>`).join('')}</div><div class="c2" style="width:${c2}px">${tail}</div></div>
<div class="bd"><div class="ov" style="${pos}">${off.map(([s, e, t, ic]) => `<div class="off" style="left:${X(s)};width:${W(s, e)}"><span>${ic ? IC(ic, 16) : ''}${t || ''}</span></div>`).join('')}${hours.slice(1).map((h) => `<i style="left:${X(h)}"></i>`).join('')}${now == null ? '' : `<i class="now" style="left:${X(now)}"></i>`}</div>${rows.map(row).join('')}</div></div>`;
    },
    // 浮层：pop({ left: 566, top: 340, w: 300, html: ui.who(…) + ui.kv(…) + … })，放在 .v-main 里，定位相对 .v-main；里面的按钮用 ghost sm，蓝底主按钮留给页头
    pop: ({ left = 0, top = 0, w = 300, html = '' } = {}) => `<div class="v-pop" style="left:${left}px;top:${top}px;width:${w}px">${html}</div>`,
  };
  return { key: 's16-pro', no: 16, name: '清晰专业', root: 's16', T, css, ui, stage: '#E0E9FF', stageInk: K, boardFont: "-apple-system,BlinkMacSystemFont,'PingFang SC','Noto Sans SC',sans-serif", boardWeight: 600, boardSpacing: '0', dark: false };
};
