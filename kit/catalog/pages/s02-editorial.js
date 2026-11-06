// 02 杂志编辑 Editorial —— 此间 CIJIAN，城市生活杂志的会员 App
const { img, icon, statusBar, homeBar } = require('../lib');
const { stylePages } = require('../page');

const css = `
.x02{--pp:#EFEAE0;--ik:#171513;--rd:#7E2125;--gy:#6E685F;--ln:#CFC6B6;background:var(--pp);color:var(--ik);font-family:"Noto Serif SC","Songti SC",serif}
.x02 h1,.x02 h2,.x02 h4,.x02 b,.x02 q{color:var(--ik)}
.x02 .wm{display:flex;align-items:baseline;font:900 24px/1 "Noto Serif SC";letter-spacing:.04em;color:var(--ik)}
.x02 .wm i{width:7px;height:7px;border-radius:50%;background:var(--rd);margin-left:2px}
.x02 .mh{height:46px;margin:2px 24px 0;display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:10px}
.x02 .iss{font:600 12.5px/1 "Noto Serif SC";letter-spacing:.06em;color:var(--ik)}
.x02 .r2{margin:0 24px;height:5px;border-top:2px solid var(--ik);border-bottom:1px solid var(--ik)}
.x02 .r1{margin:0 24px;height:0;border-top:1px solid var(--ik)}
.x02 .bw{background-size:cover;background-position:center;filter:grayscale(1) contrast(1.3) brightness(.9);mix-blend-mode:multiply}
/* hero 封面故事开篇 */
.x02.hero .ph{margin-top:12px;height:286px;background-size:auto 152%;background-position:52% 100%;filter:grayscale(1) contrast(1.5) brightness(.8)}
.x02 .kk{margin:14px 24px 0;display:flex;justify-content:space-between;font:500 12px/16px "PingFang SC";letter-spacing:.14em;color:var(--gy)}
.x02 .kk b{color:var(--rd);font-weight:600}
.x02.hero h1{margin:12px 24px 0 21px;font:900 57px/1.1 "Noto Serif SC";letter-spacing:-.01em}
.x02 .cols{margin:18px 24px 0;height:130px;column-count:2;column-gap:27px;column-rule:1px solid var(--ik);column-fill:auto;font:400 15px/26px "Noto Serif SC";color:#2A2623;text-align:justify;overflow:hidden}
.x02 .dc{float:left;font:900 52px/50px "Noto Serif SC";color:var(--rd);margin:3px 6px 0 0}
.x02 .fo{position:absolute;left:24px;right:24px;bottom:30px;border-top:1px solid var(--ik);padding-top:10px;display:flex;justify-content:space-between;align-items:baseline;font:500 11px/1 "PingFang SC";letter-spacing:.12em;color:var(--gy)}
.x02 .fo .fn{font:700 16px/1 "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik);letter-spacing:0}
/* b1 阅读页 */
.x02 .nv{height:46px;margin:2px 24px 0;display:flex;align-items:center;justify-content:space-between}
.x02 .nv .wm{font-size:20px}
.x02 .nv .ic2{display:flex;gap:18px}
.x02 .rh{margin:6px 24px 0;padding:10px 0;border-top:1px solid var(--ik);border-bottom:1px solid var(--ln);display:flex;justify-content:space-between;font:500 12px/16px "PingFang SC";letter-spacing:.14em;color:var(--gy)}
.x02 .rh .fn{font:700 14px/16px "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik);letter-spacing:0}
.x02 .art{position:absolute;left:24px;right:24px;top:158px;height:578px;overflow:hidden}
.x02 .art p{font:400 16px/30px "Noto Serif SC";color:#25211E;text-align:justify}
.x02 .art .dc{font-size:62px;line-height:58px;margin:5px 8px 0 0}
.x02 .pq{margin:22px 0 22px;padding:16px 0 16px;border-top:3px solid var(--ik);border-bottom:1px solid var(--ik)}
.x02 .pq q{display:block;quotes:none;font:900 25px/37px "Noto Serif SC";letter-spacing:.01em}
.x02 .pq .qm{display:block;font:700 54px/34px "Playfair Display";color:var(--rd);height:24px}
.x02 .pq cite{display:block;margin-top:10px;font:500 12px/16px "PingFang SC";font-style:normal;letter-spacing:.12em;color:var(--gy)}
.x02 .mg{display:grid;grid-template-columns:50px 1fr;column-gap:14px;margin-top:20px}
.x02 .mg .tm{border-right:1px solid var(--ln);font:italic 400 17px/30px "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik)}
/* b2 目录 */
.x02 .isn{margin:20px 24px 18px;display:flex;align-items:flex-end;justify-content:space-between}
.x02 .isn .big{font:900 150px/.8 "Playfair Display";font-variant-numeric:lining-nums;letter-spacing:-.04em;margin-left:-6px;color:var(--ik)}
.x02 .isn .meta{text-align:right;padding-bottom:2px}
.x02 .isn .meta b{display:block;font:900 36px/1 "Noto Serif SC";letter-spacing:.06em}
.x02 .isn .meta span{display:block;margin-top:10px;font:500 12px/1 "PingFang SC";letter-spacing:.12em;color:var(--gy)}
.x02 .tcl{list-style:none;margin:0 24px}
.x02 .tcl li{display:grid;grid-template-columns:60px 1fr;align-items:start;padding:14px 0 13px;border-bottom:1px solid var(--ln)}
.x02 .tcl .pn{font:700 30px/1 "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik);margin-top:-2px}
.x02 .tcl em{display:block;font:500 11px/1 "PingFang SC";font-style:normal;letter-spacing:.16em;color:var(--gy)}
.x02 .tcl b{display:block;margin-top:8px;font:700 18px/1.3 "Noto Serif SC"}
.x02 .tcl li.cur em{color:var(--rd)}
.x02 .tabs{position:absolute;left:24px;right:24px;bottom:0;height:84px;border-top:1px solid var(--ik);display:flex;justify-content:space-between;padding:15px 8px 0;font:500 14px/1 "Noto Serif SC";color:var(--gy)}
.x02 .tabs b{font-weight:900}
/* 半山咖啡 */
.x02.cmp .mh{height:74px;padding-bottom:12px}
.x02.cmp .wm{font-size:40px;letter-spacing:.02em}
.x02.cmp .wm i{width:9px;height:9px}
.x02.cmp .enm{font:italic 400 18px/1 "Playfair Display";color:var(--ik);padding-bottom:4px}
.x02.cmp .ph{margin-top:14px;height:306px;background-position:50% 55%}
.x02.cmp .kk{margin-top:16px;font-size:13px}
.x02.cmp .pd{margin:10px 24px 0;display:flex;justify-content:space-between;align-items:baseline}
.x02.cmp .pd b{font:900 52px/1 "Noto Serif SC";letter-spacing:.01em}
.x02.cmp .pd span{font:400 42px/1 "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik)}
.x02.cmp .pd span small{font-size:22px;margin-right:2px}
.x02.cmp .st{margin:18px 24px 0;padding:12px 0;border-top:1px solid var(--ik);border-bottom:1px solid var(--ik);font:500 14px/18px "PingFang SC";letter-spacing:.04em;color:#3A3530}
.x02.cmp .act{margin:18px 24px 0;display:grid;grid-template-columns:1fr 1px 108px;column-gap:20px;align-items:center}
.x02.cmp .go{height:56px;background:var(--rd);color:#F6F1E8;display:flex;align-items:center;justify-content:center;font:900 20px/1 "Noto Serif SC";letter-spacing:.3em;padding-left:.3em}
.x02.cmp .vr{height:56px;background:var(--ik)}
.x02.cmp .jf em{display:block;font:500 11px/1 "PingFang SC";font-style:normal;letter-spacing:.14em;color:var(--gy)}
.x02.cmp .jf b{display:block;margin-top:9px;font:700 30px/1 "Playfair Display";font-variant-numeric:lining-nums}
.x02.cmp .tabs{height:80px}
/* web */
.x02.web{font-family:"Noto Serif SC",serif}
.x02 .wt{height:46px;margin:0 48px;display:flex;align-items:center;justify-content:space-between;font:500 15px/1 "PingFang SC";letter-spacing:.06em;color:var(--gy)}
.x02 .wt b{font-weight:600}
.x02 .wm2{height:112px;margin:0 48px;border-top:1px solid var(--ik);display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.x02 .wm2 .wm{font-size:84px;letter-spacing:.06em}
.x02 .wm2 .wm i{width:16px;height:16px;margin-left:4px}
.x02 .wm2 .ear{font:500 15px/1.6 "PingFang SC";letter-spacing:.1em;color:var(--ik)}
.x02 .wm2 .ear.rt{text-align:right}
.x02 .wnav{margin:0 48px;height:50px;border-top:3px solid var(--ik);border-bottom:1px solid var(--ik);display:flex;align-items:center;justify-content:center;gap:44px;font:600 16px/1 "Noto Serif SC";letter-spacing:.12em;color:var(--ik)}
.x02 .wg{position:absolute;left:48px;right:48px;top:232px;bottom:0;display:grid;grid-template-columns:580px 1fr 196px}
.x02 .wg .ph{height:100%}
.x02 .ls{padding:0 32px 0 36px;border-right:1px solid var(--ik)}
.x02 .ls em{display:block;font:600 16px/1 "PingFang SC";font-style:normal;letter-spacing:.18em;color:var(--rd)}
.x02 .ls h2{margin-top:18px;font:900 52px/1.16 "Noto Serif SC";letter-spacing:-.005em}
.x02 .ls .by{margin-top:22px;display:flex;align-items:baseline;gap:18px;font:500 15px/1 "PingFang SC";letter-spacing:.12em;color:var(--gy)}
.x02 .ls .by .pn2{margin-left:auto;font:italic 400 20px/1 "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik);letter-spacing:0}
.x02 .ls p.ex{margin-top:26px;padding-top:24px;border-top:1px solid var(--ln);font:400 17px/32px "Noto Serif SC";color:#2A2623;text-align:justify}
.x02 .ls p.ex .dc{font-size:58px;line-height:56px;margin:5px 8px 0 0}
.x02 .tc2{padding-left:28px}
.x02 .tc2 ol{margin:0;padding:0}
.x02 .tc2 .hd2{font:600 16px/1 "PingFang SC";letter-spacing:.18em;color:var(--ik);padding-bottom:14px;border-bottom:3px solid var(--ik)}
.x02 .tc2 li{list-style:none;padding:16px 0 15px;border-bottom:1px solid var(--ln)}
.x02 .tc2 li span{display:block;font:italic 400 18px/1 "Playfair Display";font-variant-numeric:lining-nums;color:var(--ik)}
.x02 .tc2 li b{display:block;margin-top:9px;font:700 19px/1.35 "Noto Serif SC"}
`;

const mh = (right) => `<div class="mh"><div class="wm">此间<i></i></div>${right}</div><div class="r2"></div>`;

const hero = `<div class="scr x02 hero">${statusBar()}
${mh('<div class="iss">第 42 期 · 2026 年 11 月</div>')}
<div class="ph bw" style="background-image:url(${img('bw-subway-woman')})"></div>
<div class="kk"><b>封面故事</b><span>文 周远　摄影 林一</span></div>
<h1>末班车之后<br>北京还醒着</h1>
<div class="cols"><span class="dc">夜</span>里十一点，最后几班地铁开走以后，鼓楼东大街还亮着灯。卷帘门一扇接一扇拉下来。保洁员老韩推着水车走上街口，他的一天这时才开始。我们花了三个星期，跟着七位上夜班的人，从鼓楼一路走到国贸，再从国贸走回鼓楼。</div>
<div class="fo"><span class="fn">24</span><span>末班车之后</span></div>
${homeBar()}</div>`;

const b1 = `<div class="scr x02 rd">${statusBar()}
<div class="nv">${icon('chevron-left', 24, 1.6)}<div class="wm">此间<i></i></div><div class="ic2">${icon('a-large-small', 21, 1.6)}${icon('bookmark', 20, 1.6)}</div></div>
<div class="rh"><span>封面故事 · 末班车之后</span><span class="fn">26</span></div>
<div class="art">
<p><span class="dc">王</span>建国开了十九年夜班。他的车停在簋街东口，打着双闪，后座放着一个保温杯和半盒桃酥。零点以后，他只接两种客人：刚下班的，和不想回家的。</p>
<div class="pq"><span class="qm">“</span><q>十一点以后，<br>这座城市才开始说真话。</q><cite>王建国　夜班出租车司机</cite></div>
<div class="mg"><div class="tm">01:40</div><p>车开上二环，收音机里在放一首老歌。他说北京最好看的时候，是凌晨一点四十的长安街，红灯一路亮到西单，整条街只有他一辆车。</p></div>
<div class="mg"><div class="tm">03:15</div><p>最后一位客人在雍和宫下车。他把计价器归零，开回了簋街。</p></div>
</div>
<div class="fo"><span class="fn">26</span><span>此间 · 第 42 期</span></div>
${homeBar()}</div>`;

const b2 = `<div class="scr x02 tc">${statusBar()}
${mh(icon('search', 20, 1.6))}
<div class="isn"><div class="big">42</div><div class="meta"><b>夜行</b><span>2026 年 11 月</span></div></div>
<div class="r1"></div>
<ol class="tcl">
<li><span class="pn">06</span><div><em>城市笔记</em><b>在北京，找一级台阶坐下</b></div></li>
<li class="cur"><span class="pn">24</span><div><em>封面故事</em><b>末班车之后，北京还醒着</b></div></li>
<li><span class="pn">48</span><div><em>人物</em><b>鼓楼下的钟表铺</b></div></li>
<li><span class="pn">66</span><div><em>食物</em><b>一碗卤煮的四种吃法</b></div></li>
<li><span class="pn">82</span><div><em>居所</em><b>四十平米，住进一棵树</b></div></li>
<li><span class="pn">96</span><div><em>读书</em><b>十一月，读这八本书</b></div></li>
</ol>
<div class="tabs"><b>本期</b><span>往期</span><span>书架</span><span>我的</span></div>
${homeBar()}</div>`;

const web = `<div class="x02 web" style="position:relative;width:1280px;height:800px;overflow:hidden">
<div class="wt"><span>2026 年 10 月 28 日　星期三</span><span>登录　　<b>订阅</b></span></div>
<div class="wm2"><div class="ear">第 42 期<br>夜行</div><div class="wm">此间<i></i></div><div class="ear rt">2026 年 11 月<br>北京</div></div>
<div class="wnav"><span>城市</span><span>人物</span><span>食物</span><span>居所</span><span>夜生活</span><span>读书</span><span>影像</span></div>
<div class="wg">
<div class="ph bw" style="background-image:url(${img('bw-subway-woman')});background-size:auto 124%;background-position:47% 92%;filter:grayscale(1) contrast(1.42) brightness(.84)"></div>
<div class="ls"><em>封面故事</em><h2>末班车之后，<br>北京还醒着</h2><div class="by"><span>文 周远</span><span>摄影 林一</span><span class="pn2">p. 24</span></div>
<p class="ex"><span class="dc">夜</span>里十一点，最后几班地铁开走以后，鼓楼东大街还亮着灯。我们跟着七位上夜班的人，从鼓楼走到国贸。</p></div>
<div class="tc2"><div class="hd2">本期</div><ol>
<li><span>p. 06</span><b>在北京，<br>找一级台阶坐下</b></li>
<li><span>p. 48</span><b>鼓楼下的钟表铺</b></li>
<li><span>p. 66</span><b>一碗卤煮的<br>四种吃法</b></li></ol></div>
</div></div>`;

const cmp = `<div class="scr x02 cmp">${statusBar()}
<div class="mh"><div class="wm">半山咖啡<i></i></div><span class="enm">Banshan</span></div><div class="r2"></div>
<div class="ph bw" style="background-image:url(${img('bw-cafe-window')})"></div>
<div class="kk"><b>今日推荐</b></div>
<div class="pd"><b>桂花拿铁</b><span><small>¥</small>28</span></div>
<div class="st">东四店 · 到店自取约 6 分钟</div>
<div class="act"><div class="go">去点单</div><i class="vr"></i><div class="jf"><em>会员积分</em><b>1,280</b></div></div>
<div class="tabs"><b>首页</b><span>菜单</span><span>订单</span><span>我的</span></div>
${homeBar()}</div>`;

// 舞台：旧新闻纸色，上下各一道墨红双栏线；底下铺一个放大、被裁掉一角的期号「42」当纹理，只比纸色深一点
const NEWS = '#E3DACB';
const dbl = (pos, v, x) => `<div style="position:absolute;left:${x}px;right:${x}px;${pos}:${v}px;height:6px;border-top:2px solid rgba(126,33,37,.82);border-bottom:1px solid rgba(126,33,37,.82)"></div>`;
const big42 = (size, pos) => `<div style="position:absolute;${pos};font:900 ${size}px/.74 'Playfair Display';font-variant-numeric:lining-nums;letter-spacing:-.05em;color:#D8CCB8;white-space:nowrap">42</div>`;
const decoA = big42(820, 'left:-120px;bottom:-96px') + dbl('top', 36, 36) + dbl('bottom', 36, 36);
const decoB = big42(1060, 'right:-150px;top:-40px') + dbl('top', 84, 34) + dbl('bottom', 26, 34);

module.exports = {
  css,
  screens: { 's02-hero': hero, 's02-b1': b1, 's02-b2': b2, 's02-web': web, 's02-cmp': cmp },
  desktop: ['s02-web'],
  zoom: [440, 212],
  marks: [[342, 537], [74, 755], [352, 300], [112, 423]],
  palette: [['纸色', '#EFEAE0'], ['墨黑', '#171513'], ['墨红', '#7E2125'], ['铅灰', '#6E685F'], ['栏线', '#CFC6B6']],
  type: { font: '"Playfair Display","Noto Serif SC"', weight: 900, sample: '间 Aa', lines: [['标题', '思源宋体 粗'], ['西文', 'Playfair'], ['正文', '思源宋体']] },
  stageA: NEWS,
  decoA,
  stageB: { bg: NEWS, color: '#171513', url: 'cijian.cn', deco: decoB },
  page: (no) => stylePages(no, 's02-editorial', module.exports),
};
