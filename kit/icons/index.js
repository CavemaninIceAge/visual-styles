// 自己画的图标：把 icons/ 下四组合并成一张表，给 lib.js 的 icon() 用
// 规矩见 SPEC.md；要画的名字见 names.js；总览图 node icons/sheet.js <组名>
// wrap、expand、validate 三个函数不引用外面的变量：kit/app/build.js 把它们原样搬进浏览器
const fs = require('fs');
const path = require('path');

const GROUPS = ['actions', 'objects', 'people', 'status'];

// 没在起手包 T.icon 里写的风格用这一套
const DEFAULT = { stroke: 1.75, cap: 'round', join: 'round', fill: 'none' };

// 图标里四种角色。组文件里只写 class，出图时展开成行内样式，单独拿出去用也不缺样式
//   t   淡色层：主体里面的一块面，默认看不见，风格开了淡色或实心才显出来
//   k   压在淡色层上的细节线，实心时换成挖空色
//   s   本来就是实心的小块（省略号的三个圆、播放的三角）
//   sk  压在淡色层上的实心小块
const ROLE = {
  t: 'fill:var(--ic-fill,none);stroke:none',
  k: 'stroke:var(--ic-cut,currentColor)',
  s: 'fill:currentColor;stroke:none',
  sk: 'fill:var(--ic-cut,currentColor);stroke:none',
};
function expand(inner) {
  const R = { t: 'fill:var(--ic-fill,none);stroke:none', k: 'stroke:var(--ic-cut,currentColor)', s: 'fill:currentColor;stroke:none', sk: 'fill:var(--ic-cut,currentColor);stroke:none' };
  return String(inner).replace(/\sclass="(t|k|s|sk)"/g, (_, c) => ` style="${R[c]}"`);
}

// 外层 <svg>：icon(name, size, stroke, extra) 都走这里。
//   stroke 给了就写成 stroke-width 属性并带 data-sw，风格的线宽规则（.sNN .ic:not([data-sw])）就不管它；没给就用风格的线宽
//   extra 是原样放进 <svg> 的属性（'data-more'、'style="color:#E33"'、'fill="currentColor"'）；class 和 style 合并，别的同名属性以 extra 为准
function wrap(inner, size = 20, stroke, extra = '') {
  const own = [];
  for (const m of String(extra || '').matchAll(/([^\s=]+)(?:\s*=\s*("[^"]*"|'[^']*'))?/g)) own.push([m[1], m[2] === undefined ? null : m[2].slice(1, -1)]);
  const has = (k) => own.some((a) => a[0] === k);
  const get = (k) => (own.find((a) => a[0] === k) || [])[1];
  const sw = stroke !== undefined && stroke !== null && stroke !== '';
  const base = [['class', 'ic' + (get('class') ? ' ' + get('class') : '')], ['xmlns', 'http://www.w3.org/2000/svg'], ['width', size], ['height', size], ['viewBox', '0 0 24 24'],
    ['fill', 'none'], ['stroke', 'currentColor'], ['stroke-width', sw ? stroke : 1.75], ['stroke-linecap', 'round'], ['stroke-linejoin', 'round'], ['aria-hidden', 'true']];
  if (sw) base.push(['data-sw', null]);
  const attrs = base.filter((a) => a[0] === 'class' || !has(a[0])).concat(own.filter((a) => a[0] !== 'class'));
  return '<svg ' + attrs.map(([k, v]) => (v === null ? k : `${k}="${v}"`)).join(' ') + '>' + inner + '</svg>';
}

// 查一个图标的标记合不合 SPEC.md 第八节：只许七种标签、只写几何属性和四个 class、元素不超过 5 个、坐标在画布里。返回问题列表，空数组就是合格
function validate(markup) {
  const s = String(markup || '').trim();
  const bad = [];
  if (!s) return ['是空的'];
  if (/<svg\b/i.test(s)) bad.push('只写 <svg> 里面的标记，不带外层 <svg>（整张 SVG 多半是从图库拷来的，照 SPEC.md 自己画）');
  const TAGS = ['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'];
  const ATTRS = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'points', 'class'];
  const es = [...s.matchAll(/<([a-zA-Z]+)\b([^>]*?)\/?>/g)];
  if (!es.length) bad.push('没有图形元素');
  let draw = 0;
  for (const m of es) {
    if (!TAGS.includes(m[1])) { bad.push(`不许用 <${m[1]}>（只用 ${TAGS.join('、')}）`); continue; }
    const at = [...m[2].matchAll(/([a-zA-Z:-]+)\s*=\s*"([^"]*)"/g)];
    for (const [, k, v] of at) {
      if (!ATTRS.includes(k)) bad.push(`<${m[1]}> 不许写 ${k}（颜色、线宽、端点由外层和风格定，淡色和挖空用 class）`);
      else if (k === 'class' && !/^(t|k|s|sk)$/.test(v)) bad.push(`class 只能是 t、k、s、sk，写了「${v}」`);
      else if (k !== 'class') for (const n of (v.match(/-?(?:\d+\.?\d*|\.\d+)/g) || []).map(Number)) if (k !== 'd' && (n < -0.01 || n > 24.01)) { bad.push(`${k}="${v}" 出了 24 的画布`); break; }
    }
    if (!at.some(([, k, v]) => k === 'class' && v === 't')) draw++;
  }
  if (draw > 5) bad.push(`线条元素 ${draw} 个，最多 5 个（细节要少）`);
  const rest = s.replace(/<[^>]*>/g, '').trim();
  if (rest) bad.push(`标签外面有多余的字「${rest.slice(0, 20)}」`);
  return bad;
}

// 读四组，合并，解开 '=别名'。fresh 为 true 时重新读文件（总览图边画边看时用）
function load(fresh = false) {
  const raw = {}; const from = {};
  for (const g of GROUPS) {
    const f = path.join(__dirname, g + '.js');
    if (!fs.existsSync(f)) continue;
    if (fresh) delete require.cache[require.resolve(f)];
    const m = require(f);
    for (const [k, v] of Object.entries(m)) {
      if (k in raw) throw new Error(`图标「${k}」在 ${from[k]} 和 ${g} 里都画了`);
      raw[k] = String(v); from[k] = g;
    }
  }
  const icons = {}; const alias = {};
  for (const k of Object.keys(raw)) {
    let v = raw[k]; let n = 0;
    while (v.startsWith('=')) {
      const to = v.slice(1).trim();
      if (!(to in raw)) throw new Error(`图标「${k}」写的别名「${to}」不存在`);
      if (++n > 5) throw new Error(`图标「${k}」的别名绕成圈了`);
      alias[k] = to; v = raw[to];
    }
    icons[k] = v;
  }
  return { icons, alias, from };
}

let cache = null;
const icons = () => (cache || (cache = load())).icons;

// 起手包 T.icon 变成 CSS：css('s10', T.icon, T) 得到 '.s10 .ic{…}.s10 .ic:not([data-sw]){stroke-width:…}'
// 组装（kit/build.js、kit/app/build.js）时自动接在起手包 css 后面，起手包自己不用写
// 线宽只管调用 icon() 时没给线宽的图标（给了的带 data-sw）；起手包里更具体的规则（.v-tabs .on .ic）照样压得过它
function css(root, o = {}, T = {}) {
  const c = { ...DEFAULT, ...(o || {}) };
  const fill = c.fill === 'tint' ? (c.tint || 'color-mix(in srgb,currentColor 16%,transparent)')
    : c.fill === 'solid' ? 'currentColor' : 'none';
  const cut = c.fill === 'solid' ? (c.cut || T.surface || T.bg || '#fff') : 'currentColor';
  const sel = root ? `.${root} .ic` : '.ic';
  return `${sel}{stroke-linecap:${c.cap};stroke-linejoin:${c.join};--ic-fill:${fill};--ic-cut:${cut}}${sel}:not([data-sw]){stroke-width:${c.stroke}}`;
}

// 拼一个完整的 <svg>。stroke、cap、join、fill 不给就跟着 CSS 走；fill 给 'tint' / 'solid' / 任意颜色时只改这一个（比如选中项填浅色）
function svg(name, { size = 24, stroke, cap, join, fill, cut, cls = 'ic', extra = '' } = {}) {
  const inner = icons()[name];
  if (inner === undefined) return null;
  const st = [];
  if (stroke !== undefined) st.push(`stroke-width:${stroke}`);
  if (cap) st.push(`stroke-linecap:${cap}`);
  if (join) st.push(`stroke-linejoin:${join}`);
  if (fill) st.push(`--ic-fill:${fill === 'tint' ? 'color-mix(in srgb,currentColor 16%,transparent)' : fill === 'solid' ? 'currentColor' : fill}`);
  if (cut) st.push(`--ic-cut:${cut}`);
  return `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${DEFAULT.stroke}" stroke-linecap="round" stroke-linejoin="round"${st.length ? ` style="${st.join(';')}"` : ''} ${extra}>${expand(inner)}</svg>`;
}

module.exports = { GROUPS, DEFAULT, ROLE, expand, wrap, validate, load, icons, css, svg };
