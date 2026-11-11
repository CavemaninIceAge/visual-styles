// 余光 AI 记账理财助手（App），风格 s15-aurora 弥散光试跑
// 账目（几屏对得上）：11 月预算 ¥6,000 = 餐饮 2,400 + 购物 2,000 + 出行 1,600；已花 ¥1,264 = 724 + 368 + 172；
// 还能花 ¥4,736（79%）；11 月 6 日到月底 25 天，每天 ¥189；攒钱目标还差 ¥1,200，每天降到 ¥141，少花 ¥48
module.exports = ({ img, icon, statusBar, homeBar, style }) => {
  const S = style('s15-aurora');
  const { ui } = S;
  const TABS = [['wallet', '本月'], ['receipt-text', '账单'], ['chart-pie', '预算'], ['user', '我的']];
  const GO = ['home', null, 'budget', null];
  const yen = (n) => `<small>¥</small>${n}`;
  const CATS = [['餐饮', '¥724', 30], ['购物', '¥368', 18], ['出行', '¥172', 11]];
  // 本项目只管位置，样子全在起手包里
  const css = `
.p .top{margin-top:18px}
.p.home .v-ring{margin:14px auto 0}
.p.home .v-say{margin-top:20px}
.p.chat .v-me{margin:18px 20px 0 auto}
.p.chat .v-ai{margin:18px 36px 0 24px}
.p.chat .v-item{margin:20px 20px 0}
.p.bud .v-big{margin-top:20px}
.p.bud .left{margin-top:12px;color:var(--g)}
.p.bud .v-list{margin:24px 20px 0}
.p.bud .act{position:absolute;left:20px;right:20px;bottom:124px}
`;
  const head = ui.nav({ back: false, left: ui.logo('余光'), right: ui.avatar(img('p-woman-10'), { pos: '50% 12%' }) });

  const home = `<div class="scr s15 p home">${ui.blobs('e')}${statusBar()}${head}
<div class="v-pad top"><div class="v-h1">本月还能花</div></div>
${ui.ring({ num: yen('4,736'), label: `预算 ${ui.sf('¥6,000')}`, pct: 79, d: 244, fs: 96, attrs: 'data-go="budget"' })}
<div class="v-say">已花 ${ui.sf('¥1,264')}，比上月同期少 ${ui.sf('¥218')}</div>
${ui.metrics(CATS, { fs: 36, h: 104, style: 'margin:16px 20px 0', attrs: 'data-go="budget"' })}
${ui.glowInput('问问余光', { cls: 'dock over', attrs: 'data-go="chat"' })}
${ui.tabs(TABS, 0, GO)}${homeBar()}</div>`;

  const chat = `<div class="scr s15 p chat">${ui.blobs('f')}${statusBar()}${ui.nav({ title: ui.logo('余光', '', { size: 18 }) })}
${ui.me('月底能把希腊的钱攒够吗？')}
${ui.ai(`能。还差 ${ui.sf('¥1,200')}，这个月每天从 ${ui.sf('¥189')} 降到 ${ui.sf('¥141')}，少花 ${ui.sf('¥48')} 就够。`)}
${ui.item({ src: img('santorini-domes'), h: 216, pos: '84% 62%', size: '150%', title: '圣托里尼七日', meta: `已存 ${ui.sf('¥13,800')}`, price: '¥15,000', ic: 'arrow-right', attrs: 'data-go="budget"' })}
${ui.ai(`餐饮、购物预算各减 ${ui.sf('¥600')} 最省力。`, { mark: false })}
${ui.glowInput('问问余光', { cls: 'dock' })}
${homeBar()}</div>`;

  const budget = `<div class="scr s15 p bud">${ui.blobs('f')}${statusBar()}${ui.nav({ back: false, title: '11 月预算', right: ui.avatar(img('p-woman-10'), { pos: '50% 12%' }) })}
<div class="v-pad top"><div class="v-h1">每天还能花</div>
<div class="v-big"><small>¥</small>189</div>
<div class="v-tx left">离月底还有 ${ui.sf('25')} 天</div></div>
<div class="v-list">
${ui.meterRow({ title: '餐饮', meta: `预算 ${ui.sf('¥2,400')}`, value: '¥724', pct: 30 })}
${ui.meterRow({ title: '购物', meta: `预算 ${ui.sf('¥2,000')}`, value: '¥368', pct: 18 })}
${ui.meterRow({ title: '出行', meta: `预算 ${ui.sf('¥1,600')}`, value: '¥172', pct: 11 })}
</div>
<div class="act">${ui.btn('调整预算', { cls: 'wide', attrs: 'data-go="chat"' })}</div>
${ui.tabs(TABS, 2, GO)}${homeBar()}</div>`;

  const web = `<div class="web s15 p" style="height:800px">${ui.blobs('web')}
<div class="v-wnav">${ui.logo('余光', '', { size: 24 })}<nav><span>记账</span><span>问 AI</span><span>预算</span><span>价格</span></nav>${ui.btn('免费开始', { attrs: 'data-go="home"' })}</div>
<div class="v-wmain"><div class="v-xl">把钱花得明白</div>
${ui.glowInput('问问余光：这个月还能花多少？', { cls: 'lg', attrs: 'data-go="chat"' })}
${ui.report({ ring: { num: '¥4,736', label: '还能花', pct: 79, fs: 30 }, items: CATS })}
<div class="v-plans">
${ui.plan({ n: '¥189', unit: '/天', title: '日常预算', meta: `离月底还有 ${ui.sf('25')} 天`, glow: 'peach' })}
${ui.plan({ n: '92', unit: '%', title: '圣托里尼七日', meta: `还差 ${ui.sf('¥1,200')}`, glow: 'violet' })}
${ui.plan({ n: '3', unit: '笔', title: '固定支出', meta: '房租、话费和健身卡', glow: 'blue' })}
</div></div>
</div>`;

  return { name: '余光', css, screens: { home, chat, budget, web }, desktop: ['web'], start: 'home', url: 'yuguang.app', boardDeco: (g) => ui.stageGlow(g) };
};
