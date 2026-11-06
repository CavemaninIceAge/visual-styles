// __NAME__ 演示 —— 风格 __STYLE__（__KIND__）
// 规矩（详见技能的 审美守则.md 和 styles/ 里这个风格的说明）：
//   每屏 375×812，根元素 <div class="scr 风格根类 p 屏名">；网页 1280×800，根元素 <div class="web 风格根类 p">
//   顶部 statusBar(S.dark)；小程序每屏都要 miniNav（微信胶囊），App 用 S.ui.nav；底部 homeBar(S.dark)
//   跳屏：任意元素加 data-go="屏幕编号"；返回：data-back
//   图库图片 img('latte-pour')；客户给的图放项目 img/ 下，用 img('./img/文件名.jpg')
//   不要说明性小字：标题下不加副标题、口号、提示语，不加「NEW」「HOT」角标
module.exports = ({ img, icon, statusBar, miniNav, homeBar, style }) => {
  const S = style('__STYLE__');
  const { ui } = S;
  const R = S.root;
  const KIND = '__KIND__';
  const top = (title, o = {}) => (KIND === 'mini' ? miniNav({ title, light: S.dark, ...o }) : ui.nav({ title, ...o }));
  const TABS = [['house', '首页'], ['layout-grid', '分类'], ['receipt-text', '订单'], ['user', '我的']];

  // 本项目的样式都挂在 .p 下，别改起手包和公用类（.sb .mn .hb .dev .scr .brw .ic）
  const css = `
.p .hello{margin-top:24px}
`;

  const home = `<div class="scr ${R} p home">${statusBar(S.dark)}${top('__NAME__', { back: false })}
<div class="v-pad hello"><div class="v-h1">__NAME__</div></div>
${ui.btn('开始', { attrs: 'data-go="detail"' })}
${ui.tabs(TABS, 0)}${homeBar(S.dark)}</div>`;

  const detail = `<div class="scr ${R} p detail">${statusBar(S.dark)}${top('详情')}
<div class="v-pad"><div class="v-h2">详情</div></div>
${homeBar(S.dark)}</div>`;

  return {
    name: '__NAME__',
    css,
    screens: { home, detail },   // 顺序就是展示板和演示里的顺序
    desktop: [],                 // 网页屏的编号，例如 ['web']
    start: 'home',
    url: '',                     // 网页屏地址栏里的网址
    // 下面几项按需要加：
    // board: ['home', 'web'],     展示板上放哪几屏（不写就是全部）
    // boardTitle: '',             展示板左上角的字（不写就是 name，空字符串不显示）
    // boardDeco: (geo) => '',     展示板底层装饰，字符串或函数；geo = { w, h, phones:[{id,x,y,w,h}], webs:[…] }
    // stage: '#xxxxxx',           换展示板底色；stageInk 换展示板标题色
    // heights: { web: 1200 },     网页屏不是 800 高时写
    // use: ['s05-organic'],       借图册模块的 CSS（根类 x05）
    // compare: true,              两套首页放一个项目时写：手机上打开也有翻屏圆点
    // boardWeight: 400,           展示板标题字重（字体只有一种字重时写 400，免得假粗）；boardFont 换标题字体，boardSpacing 换字距
  };
};
