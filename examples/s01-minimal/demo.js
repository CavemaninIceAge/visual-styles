// 素物 SUWU 家居器物（香薰、花器）App —— 起手包 s01-minimal 试跑
module.exports = ({ statusBar, homeBar, style }) => {
  const S = style('s01-minimal');
  const { ui } = S;
  const TABS = [['compass', '发现'], ['layout-grid', '器物'], ['shopping-bag', '购物袋'], ['user', '我的']];
  const GO = ['home', null, 'bag', 'orders'];

  // 素物的器物：用 ui.lathe 按轮廓画，像棚拍的去底产品照
  const GLAZE = {
    yuebai: { hi: '#FFFFFF', mid: '#E9ECEA', lo: '#AEB4B1' },   // 月白釉
    qinghui: { hi: '#B7BFBD', mid: '#8A9391', lo: '#535B59' },  // 青灰釉
    mo: { hi: '#606163', mid: '#38393B', lo: '#18191A' },       // 墨黑哑光
  };
  const WOOD = { hi: '#DCC8AA', mid: '#B89D79', lo: '#7A6246' };
  // 梅瓶：小口、短颈、丰肩、往下收
  const vase = (w, g = GLAZE.yuebai) => ui.lathe({ w, k: .14, parts: [{ prof: [[0, 15], [4, 14.4], [12, 12.8], [21, 14.5], [36, 31], [56, 52], [82, 63.5], [112, 63], [150, 55], [190, 44], [222, 37.5], [230, 37]], tone: g, top: 'open', lip: 2.8 }] });
  // 香薰蜡烛：直筒釉杯，蜡面比杯口低一点，一根细棉芯从蜡面中心立起来
  const wax = '<defs><linearGradient id="wax" x1="0" x2="1"><stop offset="0" stop-color="#DAD2C4"/><stop offset=".42" stop-color="#F5F0E6"/><stop offset="1" stop-color="#E0D8CA"/></linearGradient><clipPath id="mouth"><ellipse cx="100" cy="24.3" rx="46.8" ry="7.5"/></clipPath></defs><g clip-path="url(#mouth)"><ellipse cx="100" cy="29" rx="47" ry="7.5" fill="url(#wax)"/></g><path d="M100.2 29.2L113 30.4" stroke="#000" stroke-opacity=".1" stroke-width="1.4" stroke-linecap="round"/><path d="M100 29.2C100 24 100.2 18.4 101.6 13.6" stroke="#2F2823" stroke-width=".9" stroke-linecap="round" fill="none"/>';
  const candle = (w, g = GLAZE.qinghui) => ui.lathe({ w, k: .15, parts: [{ prof: [[24, 50], [56, 50], [86, 50], [96, 49.2], [100, 47]], tone: g, top: 'open', lip: 3.2 }], over: wax });
  // 无火香薰：圆肩瓷瓶 + 木口圈 + 一束藤条
  const reeds = [[-15, 128], [-9, 134], [-4, 122], [1, 136], [6, 126], [11, 132], [16, 120]].map(([a, l], i) => {
    const r = a * Math.PI / 180, x0 = 100 + (i - 3) * .9, x1 = x0 + l * Math.sin(r), y1 = 138 - l * Math.cos(r);
    return `<path d="M${x0.toFixed(1)} 139L${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="#A3865F" stroke-width="2.4" stroke-linecap="round"/><path d="M${(x0 - .5).toFixed(1)} 139L${(x1 - .5).toFixed(1)} ${y1.toFixed(1)}" stroke="#D2BC98" stroke-width=".7" stroke-linecap="round"/>`;
  }).join('');
  const diffuser = (w, g = GLAZE.mo) => ui.lathe({ w, k: .14, parts: [
    { prof: [[150, 12.6], [158, 13.2], [166, 24], [174, 39], [184, 49.5], [198, 55], [232, 56], [262, 55.2], [272, 53]], tone: g, top: 'none' },
    { prof: [[137, 13.8], [152, 13.8]], tone: WOOD, top: 'open', lip: 3.2 },
  ], over: reeds });

  // 三件商品：详情页、已下单页都按这张表出，点哪件就是哪件
  const MEI = { detail: 'detail', done: 'done', name: '素物 梅瓶', spec: '花器　月白釉　高 28 cm', unit: '月白釉', price: '¥680', big: vase(244), small: vase(150), sw: [GLAZE.yuebai.mid, GLAZE.qinghui.mid] };
  const SONG = { detail: 'detail2', done: 'done2', name: '素物 松间', spec: '香薰蜡烛　青灰釉　220 g', unit: '青灰釉', price: '¥198', big: candle(290), small: candle(188), sw: [GLAZE.qinghui.mid, GLAZE.yuebai.mid] };
  const CHA = { detail: 'detail3', done: 'done3', name: '素物 白茶', spec: '无火香薰　墨黑　200 ml', unit: '墨黑', price: '¥268', big: diffuser(180), small: diffuser(112), sw: [GLAZE.mo.mid, GLAZE.yuebai.mid] };

  const css = `
.p.home .v-nav+.v-tile{margin-top:10px}
.p.dt .info{margin-top:32px}
.p.dt .info .v-mut{margin-top:4px}
.p.dt .info .v-between{margin-top:20px}
.p .act{margin-top:32px}
.p .v-h1.sm{margin-top:34px}
.p.done .v-card{margin:30px 28px 0;height:262px}
.p.done .it{margin-top:24px}
.p.done .it .v-mut{margin-top:4px}
.p.done .v-kv{margin-top:44px}
.p.ord .v-list{margin-top:32px}
.p.ord .v-row{padding:18px 0}
`;

  const home = `<div class="scr s01 p home">${statusBar()}${ui.nav({ back: false, left: ui.logo('素物', '', ui.mark(14, 'base')), right: ui.bag('data-go="bag"'), pad: 38 })}
${ui.tile({ name: MEI.name, sub: '花器', price: MEI.price, obj: vase(196), h: 392, objTop: 104, attrs: 'data-go="detail"' })}
${ui.tile({ name: SONG.name, sub: '香薰蜡烛', obj: candle(196), h: 300, objTop: 100, attrs: 'data-go="detail2"' })}
${ui.tabs(TABS, 0, GO)}${homeBar()}</div>`;

  const pdp = (p) => `<div class="scr s01 p dt">${statusBar()}${ui.nav({ right: ui.bag('data-go="bag"') })}
${ui.stage(p.big, { h: 508, dy: 8 })}
<div class="v-pad info"><div class="v-h1">${p.name}</div><div class="v-mut lg">${p.spec}</div>
<div class="v-between"><span class="v-price">${p.price}</span>${ui.swatches(p.sw, 0)}</div>
<div class="act">${ui.btn('购买', { attrs: `data-go="${p.done}"` })}</div></div>
${homeBar()}</div>`;

  // 购物袋和已下单是同一个版式：页标题、浅灰卡里一件产品、合计、一个按钮
  const sheet = (title, p, note, btn) => `<div class="scr s01 p done">${statusBar()}
<div class="v-pad"><div class="v-h1 sm">${title}</div></div>
<div class="v-card show">${p.small}</div>
<div class="v-pad"><div class="it"><div class="v-h3">${p.name}</div><div class="v-mut">${note}</div></div>
${ui.kv('合计', p.price)}
<div class="act">${btn}</div></div>
${ui.tabs(TABS, 2, GO)}${homeBar()}</div>`;
  const placed = (p) => sheet('已下单', p, `${p.unit}　1 件　11 月 9 日送达`, ui.btn('查看订单', { attrs: 'data-go="orders"' }));
  const bag = sheet('购物袋', MEI, `${MEI.unit}　1 件`, ui.btn('结算', { attrs: `data-go="${MEI.done}"` }));

  const orders = `<div class="scr s01 p ord">${statusBar()}
<div class="v-pad"><div class="v-h1 sm">我的订单</div>
<div class="v-list sep">${[MEI, SONG, CHA].map((p) => `<div class="v-row" data-go="${p.detail}"><div><div class="v-h3">${p.name}</div><div class="v-mut">待发货　11 月 9 日送达</div></div><span class="v-price">${p.price}</span></div>`).join('')}</div></div>
${ui.tabs(TABS, 3, GO)}${homeBar()}</div>`;

  const web = `<div class="web s01 p" style="height:800px">
${ui.webNav(ui.logo('素物', '', ui.mark(17, 'base')), ['香薰', '花器', '蜡烛', '门店'])}
${ui.webHero({ title: CHA.name, price: CHA.price, btn: ui.btn('购买', { cls: 'lg', attrs: `data-go="${CHA.detail}"` }), objs: [diffuser(210, GLAZE.mo), diffuser(210, GLAZE.yuebai)] })}
</div>`;

  // 展示板：字标记号放大成一道细线大圆；板上的品牌名也用细字重、拉开字距（不用默认的粗体标题）
  const boardDeco = `<div class="s01" style="position:absolute;left:96px;top:54px;background:none"><span class="v-logo" style="gap:18px">${ui.mark(30, 'base')}<b style="font-size:38px;font-weight:300">素物</b></span></div>`;
  return {
    name: '素物', css, start: 'home', url: 'suwuhome.com', boardTitle: '', boardDeco,
    screens: { home, detail: pdp(MEI), done: placed(MEI), web, bag, orders, detail2: pdp(SONG), done2: placed(SONG), detail3: pdp(CHA), done3: placed(CHA) },
    desktop: ['web'],
    board: ['home', 'detail', 'done', 'web'],   // 展示板只放这四屏，其余屏幕在可点击原型里走得到
  };
};
