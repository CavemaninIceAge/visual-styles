// 组装一个 demo 项目：node build.js <项目目录>
// 项目目录里的 demo.js 导出一个函数 (ctx) => demo，见技能的 templates/demo.js
// 输出到 <项目目录>/out/：
//   screens.html   每屏单独（?s=编号），出单屏 PNG 用；?check=1 跑自动检查
//   board.html     展示板：全部屏幕放进手机/浏览器外框，排在风格底色上
//   prototype.html 可点击演示：点带 data-go="屏幕编号" 的元素跳屏，data-back 返回
//   screens.json / board.json  给 render.sh 用的尺寸
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const KIT = __dirname;
const P = path.resolve(process.argv[2] || '.');
const OUT = path.join(P, 'out');
L.setProject(P);

const rd = (f) => fs.readFileSync(path.join(KIT, f), 'utf8');
function fresh(f) { delete require.cache[require.resolve(f)]; return require(f); }

// 风格起手包：kit/styles/<键>.js，导出 (L) => ({ key, name, tokens, css, ui, stage, … })
function starter(key) {
  if (!key) return null;
  const f = path.join(KIT, 'styles', key + '.js');
  if (!fs.existsSync(f)) return null;
  return fresh(f)(L);
}
// 图册原模块（参考和借用 CSS）：catalog('s10-brutal') → { css, screens, palette, type, … }
function catalog(key) {
  const f = path.join(KIT, 'catalog/pages', key + '.js');
  if (!fs.existsSync(f)) throw new Error('图册里没有这个风格：' + key);
  return fresh(f);
}

const def = fresh(path.join(P, 'demo.js'));
// demo.js 导出函数 (ctx) => demo。ctx 里有 lib 的全部函数，外加：
//   style('s05-organic') → 该风格的起手包（tokens、css、ui 组件），它的 css 自动并入
//   catalog('s05-organic') → 图册原模块（css、screens…），要借它的 CSS 就在 demo.use 里写上键
//   style('s03-oriental', { borrow: true }) → 混搭时借的风格：CSS 也并入，但展示板底色这些还按主风格
let S = null; const borrowed = [];
const style = (key, o = {}) => {
  const st = starter(key);
  if (!st) throw new Error('没有这个风格的起手包：' + key);
  if (o.borrow) { borrowed.push(st); return st; }
  S = st; return S;
};
const demo = typeof def === 'function' ? def({ ...L, style, catalog }) : def;
if (!S && demo.style) S = starter(demo.style);

if (!demo || !demo.screens || !Object.keys(demo.screens).length) throw new Error('demo.js 没有导出 screens');
const ids = Object.keys(demo.screens);
// 屏幕根元素的类撞了公用类，整屏会被公用样式压扁，出来几乎是空的
const RESERVED = new Set(['sb', 'mn', 'cap', 'hb', 'dev', 'dev-s', 'dev-z', 'island', 'brw', 'ic', 'ph']);
for (const id of ids) {
  const m = /class="([^"]*)"/.exec(String(demo.screens[id]));
  for (const c of (m ? m[1] : '').split(/\s+/)) if (RESERVED.has(c)) throw new Error(`屏幕 ${id} 根元素的类「${c}」撞了公用类，换个名字`);
}
const desktop = new Set(demo.desktop || []);
const heights = demo.heights || {};
const size = (id) => (desktop.has(id) ? [1280, heights[id] || 800] : [375, 812]);
const stage = demo.stage || (S && S.stage) || '#ECE8E1';
const ink = demo.stageInk || (S && S.stageInk) || (lum(stage) < 0.45 ? '#fff' : '#111');

function lum(c) {
  const m = /^#([0-9a-f]{6})/i.exec(String(c).trim());
  if (!m) return 0.6;
  const n = parseInt(m[1], 16); const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

let css = rd('fonts.css').replace(/__ROOT__/g, 'file://' + KIT) + '\n' + rd('base.css');
if (S && S.css) css += '\n/* 风格起手包 ' + S.key + ' */\n' + S.css;
for (const b of borrowed) css += '\n/* 借来的 ' + b.key + ' */\n' + b.css;
for (const k of demo.use || []) css += '\n/* 图册模块 ' + k + ' */\n' + (catalog(k).css || '');
if (demo.css) css += '\n/* 本项目 */\n' + demo.css;

const head = (title, extra = '') => `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${L.esc(title)}</title><style>${css}${extra}</style></head>`;
fs.mkdirSync(OUT, { recursive: true });

// ── 单屏（截图、检查）──
const CHECK = fs.readFileSync(path.join(KIT, 'check.js'), 'utf8');
const one = ids.map((id) => `<div class="one" data-s="${id}" style="width:${size(id)[0]}px;height:${size(id)[1]}px;position:relative;overflow:hidden">${demo.screens[id]}</div>`).join('\n');
fs.writeFileSync(path.join(OUT, 'screens.html'), head(demo.name || 'demo', 'html,body{background:#fff}.one{margin:0 0 40px}') + `<body>${one}<script>
const q=new URLSearchParams(location.search);const s=q.get("s");
if(s){document.querySelectorAll(".one").forEach(e=>{if(e.dataset.s!==s)e.remove();else e.style.margin="0"})}
if(q.get("check")){${CHECK}}
</script></body></html>`);
fs.writeFileSync(path.join(OUT, 'screens.json'), JSON.stringify(Object.fromEntries(ids.map((id) => [id, size(id)]))));

// ── 展示板 ──
// 跳转目标要真有这一屏
for (const id of ids) for (const m of String(demo.screens[id]).matchAll(/data-go="([^"]*)"/g)) if (!ids.includes(m[1])) console.log(`跳转目标不存在：${id} → ${m[1]}`);

const boardOrder = demo.board || ids;
const phones = boardOrder.filter((id) => !desktop.has(id));
const webs = boardOrder.filter((id) => desktop.has(id));
const PW = 330, GAP = 56, PADX = 96, PADT = 150, PADB = 110;
const pk = PW / 375, ppad = Math.max(7, Math.round(12 * pk));
const phoneW = Math.round(375 * pk) + ppad * 2, phoneH = Math.round(812 * pk) + ppad * 2;
const rowW = phones.length ? phones.length * phoneW + (phones.length - 1) * GAP : 0;
const BW = Math.max(1100, Math.min(1400, rowW || 1100));
const webH = (id) => Math.round((heights[id] || 800) * (BW / 1280)) + 38;
const boardW = Math.max(rowW, webs.length ? BW : 0) + PADX * 2;
let y = PADT; let blocks = '';
const geo = { phones: [], webs: [] };
for (const id of webs) { const x = (boardW - BW) / 2; geo.webs.push({ id, x, y, w: BW, h: webH(id) }); blocks += `<div style="position:absolute;left:${x}px;top:${y}px">${L.browser(demo.screens[id], { w: BW, url: demo.url || '', h: heights[id] || 800 })}</div>`; y += webH(id) + GAP; }
if (phones.length) { let x = (boardW - rowW) / 2; for (const id of phones) { geo.phones.push({ id, x, y, w: phoneW, h: phoneH }); blocks += `<div style="position:absolute;left:${x}px;top:${y}px">${L.phone(demo.screens[id], { w: PW })}</div>`; x += phoneW + GAP; } y += phoneH; }
const boardH = y + PADB;
geo.w = boardW; geo.h = boardH;
// boardDeco 可以是字符串，也可以是函数 (geo) => 字符串，geo 里有展示板宽高和每台手机、浏览器的位置
const boardDeco = typeof demo.boardDeco === 'function' ? demo.boardDeco(geo) : (demo.boardDeco || '');
const brand = demo.boardTitle !== undefined ? demo.boardTitle : (demo.name || '');
fs.writeFileSync(path.join(OUT, 'board.html'), head((demo.name || 'demo') + ' 展示板', `html,body{background:${stage}}`) + `<body><div class="board" style="position:relative;width:${boardW}px;height:${boardH}px;background:${stage};overflow:hidden">${boardDeco}
${brand ? `<div style="position:absolute;left:${PADX}px;top:52px;font:${demo.boardWeight || (S && S.boardWeight) || 700} 44px/1 ${String(demo.boardFont || (S && S.boardFont) || "'Noto Sans SC','PingFang SC',sans-serif").replace(/"/g, "'")};color:${ink};letter-spacing:${demo.boardSpacing || (S && S.boardSpacing) || '.02em'}">${brand}</div>` : ''}
${blocks}</div></body></html>`);
fs.writeFileSync(path.join(OUT, 'board.json'), JSON.stringify({ w: boardW, h: boardH }));

// ── 可点击演示 ──
const layers = ids.map((id) => `<div class="ly" data-id="${id}" data-d="${desktop.has(id) ? 1 : 0}" style="width:${size(id)[0]}px;height:${size(id)[1]}px">${demo.screens[id]}</div>`).join('\n');
const start = demo.start || ids[0];
fs.writeFileSync(path.join(OUT, 'prototype.html'), head(demo.name || 'demo', `
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
html,body{background:${stage};height:100%;overflow:hidden}
#wrap{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
#box{position:relative;flex:none;transform-origin:center center}
.ly{position:absolute;left:0;top:0;overflow:hidden}
/* 跳屏转场：前进从右边进来，返回往右边退回去，200ms */
.ly.in-f{animation:lyInF .2s cubic-bezier(.22,.7,.2,1) both;z-index:2}
.ly.out-f{animation:lyOutF .2s cubic-bezier(.22,.7,.2,1) both;z-index:1}
.ly.in-b{animation:lyInB .2s cubic-bezier(.22,.7,.2,1) both;z-index:1}
.ly.out-b{animation:lyOutB .2s cubic-bezier(.22,.7,.2,1) both;z-index:2}
@keyframes lyInF{from{transform:translate3d(100%,0,0)}to{transform:translate3d(0,0,0)}}
@keyframes lyOutF{from{transform:translate3d(0,0,0)}to{transform:translate3d(-26%,0,0)}}
@keyframes lyInB{from{transform:translate3d(-26%,0,0)}to{transform:translate3d(0,0,0)}}
@keyframes lyOutB{from{transform:translate3d(0,0,0)}to{transform:translate3d(100%,0,0)}}
/* 按下反馈：用 scale 属性，不碰元素自己的 transform（贴纸、歪框有旋转） */
[data-go],[data-back],[data-to]{cursor:pointer;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;transition:scale .12s ease-out,opacity .12s ease-out}
[data-go].pd,[data-back].pd,[data-to].pd{scale:.965;opacity:.78!important}
[data-go].pd-lg,[data-back].pd-lg,[data-to].pd-lg{scale:.992;opacity:.86!important}
#dots{position:fixed;left:0;right:0;bottom:18px;display:flex;justify-content:center;gap:10px}
#dots i{width:9px;height:9px;border-radius:50%;background:${ink};opacity:.28;cursor:pointer}
#dots i.on{opacity:.9}
.phonebox{width:399px;height:836px;padding:12px;border-radius:60px}
.phonebox .scrn{position:relative;width:375px;height:812px;border-radius:55px;overflow:hidden;background:#fff}
.plain{width:375px;height:812px}
.plain .scrn{position:relative;width:375px;height:812px;overflow:hidden}
.webbox{border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -18px rgba(18,26,51,.4)}
body.bare{overflow:auto}
body.bare #wrap{position:static;display:block}
body.bare #box{transform-origin:0 0}
body.fitted .plain .scrn{border-radius:26px;box-shadow:0 14px 34px -14px rgba(0,0,0,.35)}
body.bare:not(.cmp) #dots{display:none}
body.bare.cmp #dots{left:50%;right:auto;bottom:14px;transform:translateX(-50%);gap:16px;padding:9px 16px;border-radius:999px;background:rgba(17,17,17,.46);z-index:50}
body.bare.cmp #dots i{width:11px;height:11px;background:#fff}
`) + `<body${demo.compare ? ' class="cmp"' : ''}><div id="wrap"><div id="box"></div></div><div id="dots">${ids.map((id) => `<i data-to="${id}"></i>`).join('')}</div>
<div id="pool" style="position:fixed;left:-30000px;top:0;width:0;height:0;overflow:hidden;visibility:hidden">${layers}</div>
<script>
const ids=${JSON.stringify(ids)};const URL0=${JSON.stringify(demo.url || '')};
const box=document.getElementById('box');const pool=document.getElementById('pool');
const phone=document.createElement('div');phone.className='dev phonebox';phone.innerHTML='<div class="scrn"></div><div class="island" style="width:118px;height:34px;top:23px"></div>';
const plain=document.createElement('div');plain.className='plain';plain.innerHTML='<div class="scrn"></div>';
const web=document.createElement('div');web.className='webbox';web.innerHTML='<div class="brw-bar"><span></span><span></span><span></span><div class="brw-url">'+URL0+'</div></div><div class="scrn" style="position:relative;overflow:hidden"></div>';
const hist=[];let cur=null;let anim=null;
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
// 上一次转场没放完就收掉，旧屏回池子
function settle(){if(!anim)return;const a=anim;anim=null;clearTimeout(a.t);[a.ly,a.old].forEach(e=>e.classList.remove('in-f','out-f','in-b','out-b'));pool.appendChild(a.old)}
// 手机上看（窄屏）：不画外框，屏幕按宽度铺满；电脑上看：手机外框居中，按窗口高度缩放。dir：'f' 前进、'b' 返回，不传就直接换
function show(id,push,dir){settle();const ly=document.querySelector('.ly[data-id="'+id+'"]');if(!ly)return;
 if(cur&&push&&cur!==id)hist.push(cur);cur=id;const d=ly.dataset.d==='1';const bare=!d&&innerWidth<520;
 const prev=document.querySelector('#box .ly');const prevHost=box.firstChild;
 document.body.classList.toggle('bare',bare);const host=d?web:(bare?plain:phone);const sc=host.querySelector('.scrn');
 if(dir&&!still&&prev&&prev!==ly&&prevHost===host){prev.classList.remove('on');sc.appendChild(ly);ly.classList.add('on','in-'+dir);prev.classList.add('out-'+dir);anim={ly,old:prev,t:setTimeout(settle,230)}}
 else{document.querySelectorAll('#box .ly').forEach(e=>{e.classList.remove('on');pool.appendChild(e)});box.innerHTML='';box.appendChild(host);sc.innerHTML='';sc.appendChild(ly);ly.classList.add('on')}
 if(d){sc.style.width=ly.style.width;sc.style.height=ly.style.height;host.style.width=ly.style.width}
 fit();window.scrollTo(0,0);document.body.scrollTop=0;document.querySelectorAll('#dots i').forEach(i=>i.classList.toggle('on',i.dataset.to===id));history.replaceState(null,'','#'+id)}
// 手机窗口比屏幕矮时（微信内置浏览器常见）整屏缩到放得下，标签栏和主按钮不被裁掉；太矮（缩不到六成）才让它上下滑
function fit(){const el=box.firstChild;const w=el.offsetWidth,h=el.offsetHeight;box.style.width=w+'px';box.style.height=h+'px';const wrap=document.getElementById('wrap');
 if(document.body.classList.contains('bare')){const room=innerHeight-(document.body.classList.contains('cmp')?46:0);const kw=innerWidth/375;const k=Math.max(Math.min(kw,room/h),kw*.62);const fitted=k<kw-.001;
  const x=Math.max(0,(innerWidth-w*k)/2),y=fitted?Math.max(0,(room-h*k)/2):0;
  box.style.transform='translate('+x+'px,'+y+'px) scale('+k+')';wrap.style.height=Math.ceil(h*k+y)+'px';document.body.classList.toggle('fitted',fitted)}
 else{const k=Math.min(1,(innerHeight-70)/h,(innerWidth-40)/w);box.style.transform='scale('+k+')';wrap.style.height='';document.body.classList.remove('fitted')}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-go],[data-back],[data-to]');if(!t)return;
 if(t.dataset.to){show(t.dataset.to,true,ids.indexOf(t.dataset.to)<ids.indexOf(cur)?'b':'f');return}
 if(t.hasAttribute('data-back')){const p=hist.pop()||ids[ids.indexOf(cur)-1];if(p)show(p,false,'b');return}
 show(t.dataset.go,true,'f')});
// 按下反馈：快速点一下也要看得见，至少留 90ms
let pd=null,pdAt=0;
function up(){if(!pd)return;const el=pd;pd=null;setTimeout(()=>el.classList.remove('pd','pd-lg'),Math.max(0,90-(Date.now()-pdAt)))}
document.addEventListener('pointerdown',e=>{const t=e.target.closest('[data-go],[data-back],[data-to]');if(!t)return;pd=t;pdAt=Date.now();t.classList.add(t.getBoundingClientRect().height>innerHeight*.28?'pd-lg':'pd')},{passive:true});
document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up);
document.addEventListener('keydown',e=>{const i=ids.indexOf(cur);if(e.key==='ArrowRight'&&i<ids.length-1)show(ids[i+1],true,'f');if(e.key==='ArrowLeft'&&i>0)show(ids[i-1],true,'b')});
addEventListener('resize',()=>show(cur,false));
// 手机上打开从手机屏开始，起始屏是电脑后台时缩到手机宽什么都看不清
const h0=decodeURIComponent(location.hash.slice(1));show(ids.includes(h0)?h0:(innerWidth<520?${JSON.stringify(desktop.has(start) ? (ids.find((x) => !desktop.has(x)) || start) : start)}:${JSON.stringify(start)}),false);
</script></body></html>`);

console.log(`${demo.name || ''}：${ids.length} 屏（网页 ${webs.length}）· 风格 ${S ? S.key : (demo.style || '无起手包')} → ${OUT}`);
