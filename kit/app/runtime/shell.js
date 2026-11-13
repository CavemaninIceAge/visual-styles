// 应用外壳：路由、页面注册、数据仓库、设备外壳（电脑上手机放进外框，手机上全屏）、浮层和提示
// kit/app/build.js 把它拷到站点根目录，项目的页面只 import 这一个文件：import { definePage, ui, db, save } from '../shell.js'
// 接口说明见技能的 起手包约定.md 第「应用外壳」节
import { S, L, B } from './kit/style.js';

export const ui = S.ui;
export const T = S.T;
export const { icon, img, defineIcon } = L;
// 转义：放进 HTML 文字和属性值的用户输入都要过一遍
export const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
export { S, L, B };

const Q = new URLSearchParams(location.search);
export const QA = Q.get('qa') === '1';

let CFG = null;
let ENDS = [];
const PAGES = [];
const OVERLAYS = {};
let DB = null;
let KEY = '';
let VER = 1;
let STATE = {};          // 每个地址一份页面内状态（表单、筛选），离开再回来还在，不存盘
let LAST = {};           // 每一端最后停在哪
let STACK = {};          // 每一端自己的返回栈
let overlays = [];       // 打开着的浮层
let toastMsg = null;
let toastTimer = 0;
let dir = '';            // 'f' 前进、'b' 返回，手机端翻页动画用
let replacing = false;   // go(…, { replace: true })：新页顶替返回栈里的当前页
let layoutKey = '';
let switcher = false;    // 手机上打开时的「切换」面板
let PHONE = false;
let seq = 0;
export const route = { path: '', end: '', page: null, params: {}, query: {} };

/* ---------------------------------------------------------------- 注册 */
// definePage({ route: 'm/order/:id', title, tab, back, nav, render(ctx), foot(ctx), actions: { 名字(ctx, el, ev) }, init(ctx) })
export function definePage(p) {
  if (!p || !p.route || typeof p.render !== 'function') throw new Error('definePage 要有 route 和 render');
  p.end = p.route.split('/')[0];
  PAGES.push(p);
}
// defineOverlay('assign', { kind: 'sheet' | 'dialog' | 'drawer', title, w, render(o, ctx), actions: { 名字(o, ctx, el, ev) } })
export function defineOverlay(id, d) { OVERLAYS[id] = Object.assign({ w: 480 }, d, { id }); }

/* ---------------------------------------------------------------- 数据 */
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* 浏览器不让存（无痕模式等）就只留在内存里 */ } },
  del() { try { localStorage.removeItem(KEY); } catch (e) { /* 同上 */ } },
};
function load() {
  const saved = store.get();
  DB = saved && saved.v === VER && saved.data ? saved.data : CFG.seed();
}
export const db = () => DB;
export function save() { store.set({ v: VER, data: DB }); refresh(); }
export function mutate(fn) { const r = fn(DB); save(); return r; }
export function uid(prefix = 'id') { DB._seq = (DB._seq || 100) + 1; return prefix + DB._seq; }
export function resetDemo() {
  store.del();
  DB = CFG.seed();
  STATE = {}; STACK = {}; LAST = {}; overlays = []; switcher = false;
  const home = endOf(route.end).home;
  dir = '';
  location.replace('#/' + home);
  if (route.path === home) onRoute();
  toast('演示数据已恢复');
}

/* ---------------------------------------------------------------- 路由 */
const endOf = (k) => ENDS.find((e) => e.key === k) || ENDS[0];
const isWeb = (e) => e.kind === 'web';
function parseHash() {
  const h = decodeURI((location.hash || '').replace(/^#\/?/, ''));
  const [p, q = ''] = h.split('?');
  const query = {};
  for (const kv of q.split('&').filter(Boolean)) { const [k, v = ''] = kv.split('='); query[decodeURIComponent(k)] = decodeURIComponent(v); }
  return { path: p.replace(/^\/+|\/+$/g, ''), query };
}
function match(path) {
  const seg = path.split('/');
  for (const p of PAGES) {
    const rs = p.route.split('/');
    if (rs.length !== seg.length) continue;
    const params = {};
    if (rs.every((r, i) => (r.startsWith(':') ? ((params[r.slice(1)] = seg[i]), true) : r === seg[i]))) return { page: p, params };
  }
  return null;
}
function defaultEnd() { return PHONE ? ENDS.find((e) => !isWeb(e)) || ENDS[0] : ENDS[0]; }
// go('m/order/r12')、go('#/a/orders?st=wait')；go(-1) 等于 back()
// replace: true 时新页顶替当前页（提交表单后跳到结果页，返回时不再回到表单）
export function go(href, { replace = false } = {}) {
  if (href === -1) { back(); return; }
  const url = '#/' + String(href).replace(/^#?\/*/, '');
  dir = 'f';
  replacing = replace;
  if (location.hash === url) onRoute(); else if (replace) location.replace(url); else location.hash = url;
}
// 返回：回到这一端上一页；没有上一页就回这一端的首页
export function back() {
  const st = STACK[route.end] || [];
  dir = 'b';
  if (st.length > 1) { st.pop(); location.replace('#/' + st[st.length - 1]); return; }
  const home = endOf(route.end).home;
  if (route.path !== home) { STACK[route.end] = []; location.replace('#/' + home); }
}
// 切到另一端，回到那一端上次停的页
export function switchEnd(key) {
  const e = endOf(key);
  switcher = false;
  overlays = [];
  dir = '';
  location.hash = '#/' + (LAST[e.key] || e.home);
}
function onRoute() {
  const { path, query } = parseHash();
  const m = path ? match(path) : null;
  if (!m) { dir = ''; location.replace('#/' + defaultEnd().home); return; }
  const prev = route.page;
  Object.assign(route, { path, query, page: m.page, params: m.params, end: m.page.end });
  const st = STACK[route.end] || (STACK[route.end] = []);
  if (m.page.tab != null) st.length = 0;
  if (replacing && st.length) st.pop();
  replacing = false;
  if (st.length > 1 && st[st.length - 2] === path) { st.pop(); dir = 'b'; }   // 浏览器的返回键
  else if (st[st.length - 1] !== path) st.push(path);
  LAST[route.end] = path;
  if (!prev || prev.end !== m.page.end || (prev.tab != null && m.page.tab != null) || isWeb(endOf(route.end))) dir = '';
  if (!STATE[path]) { STATE[path] = {}; if (m.page.init) m.page.init(ctx()); }
  overlays = overlays.filter((o) => o.keep);
  paint(true);
}
// 清掉某一页的页面内状态（表单提交后），下次进来重新 init
export function clearState(path = route.path) { delete STATE[path]; }
// 改地址里的查询参数（筛选、页签写进地址，刷新不丢）
export function setQuery(patch) {
  const q = Object.assign({}, route.query, patch);
  const s = Object.keys(q).filter((k) => q[k] !== '' && q[k] != null).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(q[k])).join('&');
  dir = '';
  location.replace('#/' + route.path + (s ? '?' + s : ''));
}
export function ctx() {
  const e = endOf(route.end);
  return { path: route.path, params: route.params, query: route.query, end: route.end, kind: e.kind, state: STATE[route.path] || (STATE[route.path] = {}), db: DB, phone: PHONE, framed: !PHONE && !isWeb(e) };
}

/* ---------------------------------------------------------------- 浮层、确认、提示 */
export function openOverlay(id, props = {}) {
  if (!OVERLAYS[id]) { console.error('没有这个浮层：' + id); return null; }
  const o = Object.assign({ id, k: ++seq, end: route.end }, props);
  overlays.push(o);
  refresh();
  return o;
}
export function closeOverlay(o) { overlays = o ? overlays.filter((x) => x !== o) : overlays.slice(0, -1); refresh(); }
// confirmBox({ title, text, ok: '确定', danger: false, onOk() {} })
export function confirmBox(o) { openOverlay('_confirm', o); }
defineOverlay('_confirm', {
  w: 400,
  render: (o) => `${o.text ? `<p class="as-ov-p">${o.text}</p>` : ''}<div class="as-ov-f">${ui.btn('取消', { cls: 'ghost', attrs: 'data-act="_close"' })}${ui.btn(o.ok || '确定', { cls: o.danger ? 'danger' : '', attrs: 'data-act="_ok"' })}</div>`,
  title: (o) => o.title || '确认',
});
// toast('已提交')、toast('请先选报修类型', 'warn')；kind：ok / warn / err
export function toast(text, kind = 'ok') {
  toastMsg = { text, kind, k: ++seq };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastMsg = null; refresh(); }, 2400);
  refresh();
}

/* ---------------------------------------------------------------- 外壳自己画的几个小图（不依赖图标集） */
const SV = (s, d, extra = '') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const G = {
  ok: '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.7 2.7L16.2 9.4"/>',
  warn: '<path d="M10.3 4.2a2 2 0 0 1 3.4 0l7 12.1a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3Z"/><path d="M12 9.5v3.8M12 16.6v.1"/>',
  err: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="m9 9 6 6m0-6-6 6"/>',
  back: '<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>',
  x: '<path d="m6.5 6.5 11 11m0-11-11 11"/>',
  swap: '<path d="M5 8.5h13.5l-3.5-3.5M19 15.5H5.5L9 19"/>',
  reset: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v3.8h3.8"/>',
  right: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
};

// 状态标签：status('已完成', 'ok')。记号形状加文字，色弱也分得开。起手包有 ui.st 就用起手包的，没有就用外壳画的
// kind：ok 圆圈勾、wait 时钟、warn 三角叹号、bad 方块叉、info 圆圈 i、idle 空圈时钟、done 灰勾
const ST = {
  ok: '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.7 2.7L16.2 9.4"/>',
  wait: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  idle: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  warn: '<path d="M10.3 4.2a2 2 0 0 1 3.4 0l7 12.1a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3Z"/><path d="M12 9.5v3.8M12 16.6v.1"/>',
  bad: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="m9 9 6 6m0-6-6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>',
  done: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
};
export function status(text, kind = 'ok') {
  if (typeof ui.st === 'function') return ui.st(esc(text), kind);
  return `<span class="as-st as-st-${ST[kind] ? kind : 'ok'}">${SV(14, ST[kind] || ST.ok, 'stroke-width="2.4"')}${esc(text)}</span>`;
}

/* ---------------------------------------------------------------- 画 */
const kindWord = (e) => (e.kind === 'mini' ? '小程序' : ' App');
function chrome(e) {
  const multi = ENDS.length > 1;
  const resetBtn = `<button type="button" class="as-reset" data-act="_reset">${SV(16, G.reset)}<span>恢复演示数据</span></button>`;
  let h = '';
  if (!PHONE && multi) {
    h += `<header class="as-bar ${S.root}"><div class="as-brand">${CFG.brand || ui.logo(CFG.name)}</div>
<nav class="as-seg" aria-label="切换">${ENDS.map((x) => `<button type="button" data-act="_end" data-end="${x.key}">${esc(x.label)}</button>`).join('')}</nav>${resetBtn}</header>`;
  }
  if (!PHONE && !isWeb(e)) {
    h += `<main class="as-stage"><div class="as-fit"><div class="as-dev"><div class="as-dev-s" data-as-host></div><i class="as-island"></i></div></div>
<div class="as-note"><p>这是在手机上模拟的${kindWord(e)}，<br>可以直接点着用</p>${multi ? '' : resetBtn}</div></main>`;
  } else if (PHONE && !isWeb(e)) h += '<div class="as-full" data-as-host></div>';
  else h += '<div class="as-webwrap" data-as-host></div>';
  if (PHONE && multi) h += `<button type="button" class="as-handle" data-act="_switcher" aria-label="切换">${SV(18, G.swap)}</button><div data-as-sw></div>`;
  return h;
}
function overlayHtml(o, e) {
  const d = OVERLAYS[o.id]; const c = ctx();
  let inner = '';
  try { inner = d.render(o, c); } catch (err) { console.error(err); inner = `<p class="as-ov-p">这里出错了：${esc(err.message)}</p>`; }
  const title = typeof d.title === 'function' ? d.title(o, c) : d.title || '';
  const kind = isWeb(e) ? d.kind || 'dialog' : 'sheet';
  const w = kind === 'sheet' ? '' : `style="width:${d.w}px"`;
  return `<div class="as-layer ${S.root} p"><div class="as-scrim" data-act="_close" data-ov="${o.k}"></div><div class="as-ov as-${kind} ov-${o.id}" data-ov="${o.k}" role="dialog" ${w}>
${title ? `<div class="as-ov-h"><b>${title}</b><button type="button" class="as-x" data-act="_close" aria-label="关闭">${SV(20, G.x)}</button></div>` : ''}<div class="as-ov-b">${inner}</div></div></div>`;
}
const toastHtml = () => (toastMsg ? `<div class="as-toast as-t-${toastMsg.kind}" role="status" data-k="${toastMsg.k}">${SV(20, G[toastMsg.kind] || G.ok)}<span>${esc(toastMsg.text)}</span></div>` : '');
function screen(e) {
  const p = route.page; const c = ctx();
  const slug = 'pg-' + p.route.replace(/\/:[^/]+/g, '').replace(/[^\w-]+/g, '-');
  let body = '';
  try { body = p.render(c); } catch (err) { console.error(err); body = `<div class="as-oops">这一页出错了：${esc(err.message)}</div>`; }
  const ovs = overlays.filter((o) => o.end === e.key).map((o) => overlayHtml(o, e)).join('');
  if (isWeb(e)) return `<div class="as-web web ${S.root} p e-${e.key} ${slug}" data-as-screen>${body}${ovs}${toastHtml()}</div>`;
  const title = typeof p.title === 'function' ? p.title(c) : p.title || '';
  const hasBack = p.back != null ? p.back : p.tab == null;
  let top = '';
  if (p.nav === false) top = '';
  else if (typeof p.nav === 'function') top = p.nav(c);
  else if (e.kind === 'mini') top = L.miniNav({ title, light: S.dark, left: hasBack ? `<span class="as-mback" data-back aria-label="返回">${SV(24, G.back)}</span>` : '' });
  else top = ui.nav({ title, back: hasBack });
  const tabs = e.tabs && p.tab != null ? ui.tabs(e.tabs.map((t) => [t[0], t[1]]), p.tab, e.tabs.map((t) => t[2])) : '';
  const framed = !PHONE;
  return `<div class="as-scr scr ${S.root} p e-${e.key} k-${e.kind} ${slug}" data-as-screen>${framed ? L.statusBar(S.dark) : ''}
<div class="as-top">${top}</div><div class="as-body ${dir ? 'as-in-' + dir : ''}">${body}</div>
${p.foot ? `<div class="as-foot">${p.foot(c)}</div>` : ''}${tabs}${ovs}${toastHtml()}${framed ? L.homeBar(S.dark) : ''}</div>`;
}
function switcherHtml() {
  if (!switcher) return '';
  return `<div class="as-layer ${S.root}"><div class="as-scrim" data-act="_switcher"></div><div class="as-ov as-sheet as-swp" role="dialog">
<div class="as-ov-h"><b>切换到</b><button type="button" class="as-x" data-act="_switcher" aria-label="关闭">${SV(20, G.x)}</button></div><div class="as-ov-b">
${ENDS.map((x) => `<button type="button" class="as-sw-i ${x.key === route.end ? 'on' : ''}" data-act="_end" data-end="${x.key}"><span>${esc(x.label)}</span>${x.key === route.end ? '<em>正在看</em>' : SV(18, G.right)}</button>`).join('')}
<button type="button" class="as-sw-i" data-act="_reset"><span>恢复演示数据</span>${SV(18, G.reset)}</button></div></div></div>`;
}

let raf = 0;
export function refresh() { if (raf) return; window.__asBusy = true; raf = requestAnimationFrame(() => { raf = 0; paint(false); }); }
function paint(routeChanged) {
  if (raf) { cancelAnimationFrame(raf); raf = 0; }
  const root = document.getElementById('as-root');
  const e = endOf(route.end);
  const lk = [PHONE ? 'p' : 'd', e.key].join('|');
  if (lk !== layoutKey) { root.className = (PHONE ? 'as-phone' : 'as-desk') + (isWeb(e) ? ' as-w' : ' as-m'); root.innerHTML = chrome(e); layoutKey = lk; fit(); }
  root.querySelectorAll('.as-seg [data-end]').forEach((b) => { const on = b.dataset.end === e.key; b.classList.toggle('on', on); b.setAttribute('aria-current', on ? 'page' : 'false'); });
  const host = root.querySelector('[data-as-host]');
  // 记下焦点和滚动位置，重画后放回去
  const a = document.activeElement;
  const focus = a && a.dataset && a.dataset.model && host.contains(a) ? { m: a.dataset.model, s: a.selectionStart, t: a.selectionEnd } : null;
  const sc = host.querySelector('.as-body');
  const keep = !routeChanged && sc ? sc.scrollTop : 0;
  const ovScroll = {};
  host.querySelectorAll('.as-ov[data-ov] .as-ov-b').forEach((b) => { ovScroll[b.parentElement.dataset.ov] = b.scrollTop; });
  host.innerHTML = screen(e);
  const sw = root.querySelector('[data-as-sw]');
  if (sw) sw.innerHTML = switcherHtml();
  const sc2 = host.querySelector('.as-body');
  if (sc2) sc2.scrollTop = keep;
  if (routeChanged && isWeb(e)) window.scrollTo(0, 0);
  host.querySelectorAll('.as-ov[data-ov] .as-ov-b').forEach((b) => { const v = ovScroll[b.parentElement.dataset.ov]; if (v) b.scrollTop = v; });
  if (focus) {
    const el = [...host.querySelectorAll('[data-model]')].find((x) => x.dataset.model === focus.m);
    if (el) { el.focus({ preventScroll: true }); try { el.setSelectionRange(focus.s, focus.t); } catch (err) { /* 有的输入框不支持 */ } }
  }
  dir = '';
  layoutBottom(host);
  window.__asBusy = false;
  window.__asReady = true;
}
// 手机屏：标签栏、底部按钮条是贴底浮着的，内容区底部留出它们的高度
function layoutBottom(host) {
  const scr = host.querySelector('.as-scr');
  if (!scr) return;
  const body = scr.querySelector(':scope > .as-body');
  const tabs = scr.querySelector(':scope > .v-tabs');
  const foot = scr.querySelector(':scope > .as-foot');
  const H = scr.clientHeight;
  let pb = 0;
  if (tabs && getComputedStyle(tabs).position === 'absolute') pb = H - tabs.offsetTop;
  if (foot) { foot.style.bottom = pb + 'px'; pb += foot.offsetHeight; }
  body.style.paddingBottom = pb ? pb + 'px' : '';
}
// 电脑上的手机外框按窗口高度缩放
function fit() {
  const f = document.querySelector('.as-fit');
  if (!f) return;
  const top = !PHONE && ENDS.length > 1 ? 56 : 0;
  const H = 836, W = 399;
  const s = Math.min(1, Math.max(0.5, (innerHeight - top - 48) / H));
  f.style.setProperty('--s', s);
  f.style.width = Math.round(W * s) + 'px';
  f.style.height = Math.round(H * s) + 'px';
}

/* ---------------------------------------------------------------- 事件 */
const findOv = (el) => { const x = el.closest && el.closest('[data-ov]'); return x ? overlays.find((o) => String(o.k) === x.dataset.ov) || null : null; };
function setPath(obj, path, v) { const ks = path.split('.'); let o = obj; for (const k of ks.slice(0, -1)) { if (o[k] == null || typeof o[k] !== 'object') o[k] = {}; o = o[k]; } o[ks[ks.length - 1]] = v; }
export const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
const CORE = {
  _close: (el, o) => closeOverlay(o || undefined),
  _ok: (el, o) => { closeOverlay(o); if (o && o.onOk) o.onOk(); },
  _reset: () => { switcher = false; confirmBox({ title: '恢复演示数据', text: '刚才在这个演示里做的改动会清掉，回到一开始的样子。', ok: '恢复', onOk: resetDemo }); },
  _end: (el) => switchEnd(el.dataset.end),
  _switcher: () => { switcher = !switcher; refresh(); },
};
export function act(name, el, ev) {
  const o = findOv(el);
  if (CORE[name]) { CORE[name](el, o, ev); return; }
  const c = ctx();
  if (o) { const d = OVERLAYS[o.id]; if (d.actions && d.actions[name]) { d.actions[name](o, c, el, ev); refresh(); return; } }
  const p = route.page;
  if (p && p.actions && p.actions[name]) { p.actions[name](c, el, ev); refresh(); return; }
  console.error(`没有处理的操作：${name}（${route.path}）`);
}
function value(el) { if (el.type === 'checkbox') return el.checked; if (el.type === 'number') return el.value === '' ? '' : Number(el.value); return el.value; }
function writeModel(el) {
  const o = findOv(el);
  setPath(o || ctx().state, el.dataset.model, value(el));
}
function bind() {
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('[data-act],[data-go],[data-back]');
    if (!t || t.matches('[disabled],[aria-disabled="true"]')) return;
    if (t.tagName === 'A') ev.preventDefault();
    if (t.dataset.act) act(t.dataset.act, t, ev);
    else if (t.hasAttribute('data-back')) back();
    else if (t.dataset.go) go(t.dataset.go);
  });
  document.addEventListener('input', (ev) => { const el = ev.target; if (!el.dataset || !el.dataset.model) return; writeModel(el); if (el.hasAttribute('data-live')) refresh(); });
  document.addEventListener('change', (ev) => { const el = ev.target; if (!el.dataset || !el.dataset.model) return; writeModel(el); if (/^(checkbox|radio|select-one|select-multiple)$/.test(el.type) || el.hasAttribute('data-live')) refresh(); if (el.dataset.act) act(el.dataset.act, el, ev); });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && overlays.length) { closeOverlay(); return; }
    const el = ev.target;
    if (ev.key === 'Enter' && el.dataset && el.dataset.enter && el.tagName !== 'TEXTAREA') { ev.preventDefault(); writeModel(el); act(el.dataset.enter, el, ev); }
  });
  document.addEventListener('submit', (ev) => ev.preventDefault());
  addEventListener('hashchange', onRoute);
  addEventListener('resize', () => { const p = phoneMode(); if (p !== PHONE) { PHONE = p; layoutKey = ''; paint(false); } else { fit(); layoutBottom(document.querySelector('[data-as-host]') || document.body); } });
  // 另一个标签页里改了数据（比如一边开手机端一边开后台），这边跟着变
  addEventListener('storage', (ev) => { if (ev.key !== KEY) return; const s = store.get(); DB = s && s.v === VER && s.data ? s.data : CFG.seed(); refresh(); });
}
// 手机上打开（窄屏，或触屏的小屏设备）直接全屏；地址带 ?view=phone / ?view=desk 可以强制
function phoneMode() {
  const v = Q.get('view');
  if (v === 'phone') return true;
  if (v === 'desk') return false;
  return innerWidth < 768 || (matchMedia('(pointer:coarse)').matches && Math.min(screen.width, screen.height) < 600);
}
const lum = (c) => { const m = /^#([0-9a-f]{6})/i.exec(String(c || '')); if (!m) return 0.6; const n = parseInt(m[1], 16); return (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; };

/* ---------------------------------------------------------------- 启动 */
// createApp({ name, key, version, seed, brand, ends: [{ key: 'm', kind: 'app' | 'mini' | 'web', label, home, tabs: [[图标, 文字, 地址]] }] })
export function createApp(cfg) {
  if (!cfg || !cfg.ends || !cfg.ends.length || typeof cfg.seed !== 'function') throw new Error('createApp 要有 ends 和 seed');
  CFG = cfg; ENDS = cfg.ends; VER = cfg.version || 1;
  KEY = 'app:' + (cfg.key || cfg.name || 'demo');
  for (const e of ENDS) if (!match(e.home)) throw new Error(`「${e.label}」的首页 ${e.home} 没有用 definePage 注册`);
  if (Q.get('reset') === '1') store.del();
  load();
  const r = document.documentElement;
  const set = (k, v) => { if (v != null && v !== '') r.style.setProperty(k, v); };
  set('--as-stage', S.stage); set('--as-stage-ink', S.stageInk || (lum(S.stage) < 0.45 ? '#fff' : '#1b1b1b'));
  set('--as-bg', T.bg); set('--as-surface', T.surface || '#fff'); set('--as-ink', T.ink); set('--as-ink2', T.ink2);
  set('--as-line', T.line); set('--as-pri', T.primary); set('--as-on-pri', T.onPrimary);
  set('--as-font', T.fonts && T.fonts.body); set('--as-title', T.fonts && T.fonts.title);
  r.classList.toggle('as-qa', QA);
  if (S.dark) r.classList.add('as-dark');
  PHONE = phoneMode();
  bind();
  window.__as = { route, db: () => DB, go, back, switchEnd, ends: ENDS };
  onRoute();
}
