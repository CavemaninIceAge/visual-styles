// 千钧 KILO 连锁健身房（App：约团课、入场、训练成绩、官网）—— 起手包 s11-sport 试跑
module.exports = ({ img, statusBar, homeBar, style, qr }) => {
  const S = style('s11-sport');
  const { ui, T } = S;
  const TABS = [['house', '首页'], ['calendar-days', '团课'], ['activity', '训练'], ['user', '我的']];
  const GO = ['home', 'sched', 'rec', null];
  // 千钧的记号：一根斜着冲出去的杠铃。颜色不写，跟着 ui.brand 走
  const logo = (size = 24) => ui.logo('千钧', 'KILO', { size, sym: ui.mark(Math.round(size * .62), undefined, 'bar') });

  // 首页：今晚约好的这节课是主角，时间做成巨大的斜体荧光数字
  const home = `<div class="scr s11 p home">
${ui.photo(img('woman-weights'), { h: 360, size: 'auto 165%', pos: '38% 26%', side: .6, fade: [.34, .66], lift: 1.5 })}
${statusBar(true)}${ui.nav({ back: false, left: logo(), right: ui.iconBtn('bell') })}
<div class="v-abs" style="top:236px"><div class="v-mut">今晚 · 已约</div><div class="v-h1" style="margin-top:8px;font-size:48px">杠铃燃脂</div></div>
<div class="v-abs" style="top:326px"><span class="v-big tm">19:30</span></div>
<div class="v-abs v-tx" style="top:472px">国贸店 2 号操房 · 教练 陈野 · 45 分钟</div>
<div class="v-abs" style="top:516px">${ui.btn('入场码', { ic: 'qr-code', at: 'start', cls: 'wide', attrs: 'data-go="code"' })}</div>
<div class="v-abs v-sep" style="top:612px" data-go="rec">
<div class="v-kv"><span class="v-mut">本周训练</span><span class="v-num">2<small>/ 4 次</small></span></div>
<div style="margin-top:16px">${ui.seg(4, 2)}</div></div>
${ui.tabs(TABS, 0, GO)}${homeBar(true)}</div>`;

  // 入场码：白底黑码是主角，入场号是这屏唯一的荧光
  const code = `<div class="scr s11 p code">
${statusBar(true)}${ui.nav({ title: '入场码' })}
<div class="v-abs" style="top:140px"><div class="v-h1">杠铃燃脂</div><div class="v-mut" style="margin-top:12px">今晚 19:30 · 国贸店 2 号操房</div></div>
<div class="v-abs v-qr" style="top:236px">${qr(279, T.bg, '#fff', 11)}</div>
<div class="v-abs v-sep" style="top:612px"><div class="v-kv"><span class="v-mut">入场号</span><span class="v-num v-v">0726</span></div></div>
${homeBar(true)}</div>`;

  // 团课表：今天的日期做成大数字，下面日期条 + 四节课；已约那节荧光带勾
  const rows = [
    ['12:15', '午间核心', '苏棠 · 1 号操房 · 30 分钟', '剩 6 位'],
    ['18:30', '搏击操', '周牧 · 2 号操房 · 50 分钟', '满员'],
    ['19:30', '杠铃燃脂', '陈野 · 2 号操房 · 45 分钟', '', { on: true, attrs: 'data-go="home"' }],
    ['21:30', '动感单车', '林骁 · 单车房 · 45 分钟', '剩 3 位'],
  ];
  const sched = `<div class="scr s11 p sched">
${ui.photo(img('gym-dumbbells'), { h: 300, size: '820px auto', pos: '8% 42%', dim: .16, side: .85, fade: [.3, .66] })}
${statusBar(true)}
<div class="v-abs v-mut" style="top:128px">团课 · 国贸店</div>
<div class="v-abs" style="top:156px"><span class="v-big xl">11.06</span></div>
<div class="v-abs" style="top:322px">${ui.days([['周五', '6'], ['周六', '7'], ['周日', '8'], ['周一', '9'], ['周二', '10']], 0)}</div>
<div class="v-abs v-list" style="top:410px">${rows.map((r) => ui.slot(...r)).join('')}</div>
${ui.tabs(TABS, 1, GO)}${homeBar(true)}</div>`;

  // 训练成绩：上一节力量课的总训练量做主角，心率曲线 + 完成组数进度环
  const hr = [96, 118, 134, 122, 143, 127, 148, 130, 154, 133, 158, 136, 146, 121, 104];
  const rec = `<div class="scr s11 p rec">
${ui.photo(img('gym-bw'), { h: 330, size: 'auto 112%', pos: '100% 44px', fade: [.5, .82], veil: 'linear-gradient(180deg,#0B0B0B 0%,#0B0B0B 14%,rgba(11,11,11,0) 30%)' })}
${statusBar(true)}${ui.nav({ title: logo(20), right: ui.iconBtn('ellipsis') })}
<div class="v-abs" style="top:246px"><div class="v-h2">臀腿力量</div><div class="v-mut" style="margin-top:8px">11月4日 周三 · 19:00 · 国贸店</div></div>
<div class="v-abs" style="top:318px;left:28px"><span class="v-big xl">4.86</span></div>
<div class="v-abs v-unit" style="top:462px">吨</div>
<div class="v-abs" style="top:506px">${ui.stats([['时长', '52:40'], ['平均心率', '132', '次/分'], ['消耗', '386', '千卡']])}</div>
<div class="v-abs v-map" style="top:584px;right:auto;width:201px;height:104px">${ui.chart(hr)}</div>
<div class="v-abs" style="top:583px;left:245px;right:auto">${ui.ring(106, .9, { top: '完成', value: '18', sub: '/ 20 组' })}</div>
<div class="v-abs" style="top:714px">${ui.btn('分享成绩', { ic: 'share', at: 'start', cls: 'wide' })}</div>
${homeBar(true)}</div>`;

  // 官网首屏：新店开业
  const web = `<div class="web s11 p" style="height:800px">
${ui.photo(img('gym-dumbbells'), { h: 800, size: '1700px auto', pos: '-520px -150px', web: true, fade: false, veil: 'linear-gradient(270deg,rgba(11,11,11,.95) 0%,rgba(11,11,11,.86) 42%,rgba(11,11,11,0) 68%),linear-gradient(180deg,rgba(11,11,11,.88) 0%,rgba(11,11,11,0) 24%,rgba(11,11,11,0) 60%,rgba(11,11,11,.9) 100%)', dim: .14 })}
<div class="v-wnav">${logo(30)}<nav><span>团课</span><span>私教</span><span>门店</span><span>会员卡</span>${ui.btn('加入会员')}</nav></div>
<div class="v-wh"><div class="v-wh1">三里屯店<br>11月8日开业</div>
<div class="v-wt">三里屯店 · 1,200 ㎡ · 每天 6:00–24:00</div>
${ui.btn('预约到店体验', { ic: 'arrow-right', attrs: 'data-go="home"' })}</div>
${ui.wstats([['6', '北京门店'], ['42', '认证教练'], ['380', '每周团课']])}
</div>`;

  return {
    name: '千钧',
    screens: { home, sched, rec, web, code },
    board: ['home', 'sched', 'rec', 'web'],
    desktop: ['web'],
    start: 'home',
    url: 'kilofit.cn',
    boardFont: '"Smiley Sans"',
    boardDeco: (g) => ui.gust(g.w, g.h - 190, { h: 34, gap: 22, starts: [60, -10, 130] }),
  };
};
