// 泡泡到家 演示 —— 风格 s07-friendly（App）：家政保洁，预约阿姨、看服务进度
// 换品牌色：泡泡橙 #F26A2A 替毛球珊瑚（.p 上改 --c，头像第一档用公式跟主色走，展示板底色取主色占 13%）
module.exports = ({ img, icon, statusBar, homeBar, style }) => {
  const S = style('s07-friendly');
  const { ui } = S;
  const R = S.root;
  const TABS = [['house', '首页'], ['calendar', '预约'], ['message-circle', '消息'], ['user-round', '我的']];
  const LOGO = (s) => ui.mark(s, 'var(--c)', 'bubble');

  const css = `
.p{--c:#F26A2A;--av0:linear-gradient(150deg,color-mix(in srgb,var(--c) 45%,#fff),color-mix(in srgb,var(--c) 78%,#fff))}
.p .v-h1{margin:22px 24px 0}
.p.home .v-svc{margin:26px 24px 0}
.p.home .v-card{margin:28px 24px 0}
.p.home .v-btn{position:absolute;left:24px;right:24px;bottom:98px}
.p.book .v-ppl{margin:30px 24px 0}
.p.book .v-h2{margin:48px 24px 0}
.p.book .v-days{margin:22px 24px 0}
.p.book .v-tms{margin:20px 24px 0}
.p.done .v-photo{margin:4px 16px 0}
.p.done .v-h1{margin-top:26px;font-size:36px}
.p.done .v-who{margin:12px 24px 0}
.p.done .v-steps{margin:32px 24px 0}
.p .wc{width:700px;margin:0 auto}
.p.web .v-h1{margin:40px 0 0;text-align:center;font-size:56px}
.p.web .v-go{margin:32px auto 0}
.p.web .v-photo{margin-top:36px}
.p.web .v-tiles{margin-top:20px}
`;

  const home = `<div class="scr ${R} p home">${statusBar(S.dark)}
${ui.nav({ back: false, left: ui.logo('泡泡到家', '', LOGO(32)), right: ui.pill('云杉里', { ic: 'map-pin' }) })}
<div class="v-h1">约个阿姨来打扫</div>
${ui.svc([['spray-can', '保洁'], ['grid-2x2', '擦玻璃'], ['package-open', '收纳'], ['washing-machine', '家电']], ['book'])}
${ui.card({ src: img('living-room'), pos: '52% 72%', size: '150% auto', title: '日常保洁 3 小时', meta: ['★ 4.9', '已服务 3.2 万户'], right: '<span class="v-price">¥159</span>', attrs: 'data-go="book"' })}
${ui.btn('预约保洁', { attrs: 'data-go="book"' })}
${ui.tabs(TABS, 0, [null, 'book', null, null])}${homeBar(S.dark)}</div>`;

  const book = `<div class="scr ${R} p book">${statusBar(S.dark)}
${ui.nav()}
<div class="v-h1">选阿姨</div>
${ui.people([['王', '王阿姨', '★ 4.9'], ['李', '李阿姨', '★ 4.8'], ['张', '张阿姨', '★ 4.9']], 0)}
<div class="v-h2">选时间</div>
${ui.days([['今天', 6], ['周六', 7], ['周日', 8], ['周一', 9], ['周二', 10]], 1)}
${ui.times(['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'], 1, [5])}
${ui.bar('日常保洁 · 王阿姨', '¥159', ui.btn('确认预约', { attrs: 'data-go="done"' }))}
${homeBar(S.dark)}</div>`;

  const done = `<div class="scr ${R} p done">${statusBar(S.dark)}
${ui.photo(img('bed-linen-white'), { h: 380, r: 32, pos: '46% 50%', size: 'auto 118%' })}
<div class="v-h1">家里收拾好啦</div>
${ui.who('王', '王阿姨 · 云杉里 6 号楼')}
${ui.steps([['客厅', '09:42'], ['卧室', '10:31'], ['厨房', '11:16'], ['卫生间', '11:58']], 4)}
${ui.acts(ui.rb('phone', { lg: true }), ui.btn('确认完成', { attrs: 'data-go="home"' }))}
${homeBar(S.dark)}</div>`;

  const web = `<div class="web ${R} p" style="height:800px">
<div class="v-wnav">${ui.logo('泡泡到家', '', LOGO(38))}
${ui.cats(['日常保洁', '深度保洁', '擦玻璃', '收纳整理', '家电清洗'], 0)}
<div class="rt">${ui.btn('我的订单', { cls: 'line sm' })}${ui.pill('云杉里', { ic: 'map-pin' })}</div></div>
<div class="wc">
<div class="v-h1">把家交给靠谱的阿姨</div>
${ui.go('约王阿姨来打扫', { av: ui.avatar('王', { s: 68, tone: 0 }), attrs: 'data-go="book"' })}
${ui.photo(img('living-room'), { h: 248, r: 32, pos: '50% 70%', size: '130% auto', extra: ui.float('badge-check', '王阿姨', '★ 4.9 · 服务 1,286 次', { pos: 'left:20px;bottom:20px' }) })}
<div class="v-tiles">${ui.tile('spray-can', '日常保洁', '¥159')}${ui.tile('sparkles', '深度保洁', '¥399')}${ui.tile('grid-2x2', '擦玻璃', '¥199')}</div>
</div></div>`;

  return {
    name: '泡泡到家',
    css,
    screens: { home, book, done, web },
    desktop: ['web'],
    start: 'home',
    url: 'paopaojia.cn',
    stage: '#FDECE3',
  };
};
