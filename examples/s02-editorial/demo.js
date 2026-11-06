// 页边书店 YEBIAN 独立书店（小程序）—— 起手包 s02-editorial 试跑
// 北京东城的独立书店：每月一期选书、周末作者活动、会员价和积分
module.exports = ({ img, statusBar, miniNav, homeBar, style }) => {
  const S = style('s02-editorial');
  const { ui } = S;
  const TABS = [['house', '首页'], ['book-open', '选书'], ['calendar', '活动'], ['user', '我的']];
  const top = (title, back = true) => miniNav({ title, left: back ? ui.back() : '' });

  const home = `<div class="scr s02 p home">${statusBar()}${top('', false)}
${ui.masthead('页边', '', { mini: true })}
${ui.dateline('第 45 期 · 2026 年 11 月', '', 'p. 01')}
${ui.photo(img('book-shadow-light'), { h: 268, pos: '50% 34%', attrs: 'data-go="event"' })}
${ui.kick('本月选书', '选书人 陈默')}
<div class="v-h1" data-go="event">在入冬之前<br>读完六本书</div>
${ui.lede('冬天来得早。我们从秋天读过的四百多本书里挑出六本，摆在进门的长桌上。第一本是周屿的新小说《河床》，这周六晚上，他会来店里读第三章。', { attrs: 'data-go="event"' })}
${ui.tabs(TABS, 0, [null, null, 'event', null])}${homeBar()}</div>`;

  const event = `<div class="scr s02 p ev">${statusBar()}${top('活动')}
${ui.runhead('新书分享 · 周屿《河床》', 'p. 12')}
${ui.photo(img('bw-river-steps'), { h: 236, pos: '82% 54%', size: 'auto 175%' })}
${ui.kick('作者在场', '主持 陈默')}
<div class="v-h1">一条河<br>怎样过冬</div>
${ui.strip('11 月 7 日 周六 19:30 · 二楼长桌 · 余 12 席')}
${ui.margin('19:30', '周屿朗读《河床》第三章')}
${ui.margin('20:40', '签售，会员送一张手写书签')}
${ui.act(ui.btn('报 名', { attrs: 'data-go="ok"' }), ui.stat('会员价', '<i>¥</i>30'))}
${homeBar()}</div>`;

  const ok = `<div class="scr s02 p ok">${statusBar()}${top('报名成功')}
<div class="v-r2"></div>
${ui.kick('入场号', '第 112 场活动', 'p. 13')}
${ui.issue('29', '已报名', '11 月 7 日 周六 19:30')}
<div class="v-list">
<div class="v-row"><em>活动</em><b>周屿《河床》新书分享会</b></div>
<div class="v-row"><em>地点</em><b>二楼长桌 · 东城店</b></div>
<div class="v-row"><em>已付</em><b><span class="v-num"><i>¥</i>30</span> · 会员价</b></div>
</div>
${ui.pull('河不会在冬天停下，<br>它只是走到冰下面去了。', '周屿　《河床》')}
${ui.act(ui.btn('加入日历', { cls: 'ghost' }), ui.stat('会员积分', '1,310'))}
${homeBar()}</div>`;

  const web = `<div class="web s02 p" style="height:800px">
${ui.wtop('2026 年 11 月 6 日　星期五', '登录　　<b>成为会员</b>')}
${ui.wmast('页边', '第 45 期<br>十一月选书', '北京 · 东城店<br>每日 10:00 — 22:00')}
${ui.wnav(['选书', '活动', '会员', '书单', '二手书', '店铺'])}
<div class="v-wgrid">
${ui.photo(img('book-shadow-light'), { h: '100%', pos: '46% 50%' })}
<div class="v-wlead"><em>本月选书</em><h2>在入冬之前，<br>读完六本书</h2><div class="by"><span>选书人 陈默</span><span>摄影 林一</span><span class="pn">p. 01</span></div>
<p class="ex"><span class="v-dc">冬</span>天来得早。我们从秋天读过的四百多本书里挑出六本，摆在进门的长桌上：两本小说、一本诗、一本写河流的博物书，还有两本写胡同的随笔。每本书里都夹着一张手写便条。</p>
${ui.wnote('店员手记', '二楼的暖气来了', '十一月七日起，二楼长桌开到夜里十点。带上书来坐，热茶免费，桌上的灯自己开。')}</div>
<div class="v-wside"><div class="hd">本月活动</div><ol>
<li data-go="event"><span>11.07 周六</span><b>周屿《河床》<br>新书分享会</b></li>
<li><span>11.08 周日</span><b>旧书修补课：<br>给一本书换书脊</b></li>
<li><span>11.13 周五</span><b>冬夜诗会，<br>每人带一首诗</b></li>
<li><span>11.14 周六</span><b>胡同里的书摊</b></li>
<li><span>11.21 周六</span><b>十二月选书预告</b></li></ol></div>
</div></div>`;

  return {
    name: '页边书店',
    screens: { home, event, ok, web },
    desktop: ['web'],
    start: 'home',
    url: 'yebian.cn',
    boardFont: '"Noto Serif SC"',
    boardDeco: ui.boardDeco('45'),
  };
};
