// 接口检查：node lint.js [键或编号 …]（不写就查全部）
// 查起手包是否符合 起手包约定.md，以及风格说明的结构和色值。能用程序判断的都放这里，审稿只看审美。
// 风格说明和样例由 tools/lint.sh 同步到 kit/.docs/ 下再查；没有 .docs 就跳过文档部分。
// 报告分两档：错（必须改）、提醒（看一眼，可能有理由）。有错时退出码 1。
// 去 AI 味（审美守则第二节）的静态部分也在这里：起手包、风格说明、样例里不许有点、等宽字、小标题组件、加字距的小字、破折号
// 图标自己画（审美守则第一节第 7 条）：起手包和样例源码里不许引用网上图标库（lucide、iconfont、Font Awesome、Material Icons 等）
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const KIT = __dirname;
const STY = path.join(KIT, 'styles');
const DOCS = path.join(KIT, '.docs');

const T_FIELDS = ['bg', 'surface', 'ink', 'ink2', 'line', 'primary', 'onPrimary', 'accents', 'fonts', 'radius', 'border', 'shadow', 'margin', 'photo', 'icon'];
const NEED_CLASS = ['v-pad', 'v-h1', 'v-h2', 'v-h3', 'v-tx', 'v-mut', 'v-num', 'v-big', 'v-price', 'v-btn', 'v-card', 'v-list', 'v-row', 'v-chips', 'v-chip', 'v-inp', 'v-tabs', 'v-nav', 'v-logo'];
const NEED_SEL = [/\.v-btn\.wide\b/, /\.v-btn\.ghost\b/, /\.v-chip\.on\b/, /\.v-card\s*>\s*\.ph\b/, /\.v-card\s+\.bd\b/];
const PUBLIC = ['scr', 'web', 'sb', 'mn', 'cap', 'hb', 'dev', 'dev-s', 'dev-z', 'island', 'brw', 'ic'];
const DOC_SECTIONS = ['客户在图册里看到的', '设计令牌', '一眼认出它的几样东西', '起手包', '换品牌时怎么变', '和相邻风格拉开', '别做', '参考图'];
const REF_SHOTS = ['page-a', 'page-b', 'hero', 'b1', 'b2', 'web', 'cmp'];

// 去 AI 味用到的规则
const DOT_RE = /[·•・‧∙⋅●○◦◉]/;
const DASH_RE = /[—―]/;
const MONO_RE = /mono|courier|menlo|consolas|monaco/i;
const MONO_CSS = /["']?(JetBrains Mono|Space Mono|Courier Prime|Courier New|SF Mono|Menlo|Monaco|Consolas)["']?|\bmonospace\b/gi;
const KICKER_UI = /^(kick|kicker|eyebrow|overline|runhead|folio|dateline|issue)$/;
const firstHit = (text, re) => text.split('\n').map((l) => l.trim()).find((l) => re.test(l)) || '';
// 一条 CSS 规则：字距 ≥ 0.1em 且字号 < 24px（或用 em 写的字号），或全大写且字号 ≤ 16px，就是标签式小字 / 拉开字距的按钮
// 字号没写在这条规则里时（继承来的），字距 ≥ 0.1em 也报：界面字一律 0–0.04em，大标题要拉字距就在同一条规则里写明字号
function labelRule(rule) {
  const ls = /letter-spacing\s*:\s*(-?[\d.]+)em/.exec(rule);
  const fz = /font-size\s*:\s*([\d.]+)(px|em)/.exec(rule) || /(?:^|[;{\s])font\s*:[^;]*?([\d.]+)(px|em)/.exec(rule);
  const size = fz ? parseFloat(fz[1]) : null; const unit = fz ? fz[2] : '';
  const l = ls ? parseFloat(ls[1]) : 0;
  if (l >= 0.1 && (size === null || unit === 'em' || size < 24)) return `${size === null ? '继承字号' : size + unit} 字距 ${ls[1]}em`;
  if (/text-transform\s*:\s*uppercase/.test(rule) && (size === null || unit === 'em' || size <= 16)) return `${size === null ? '继承字号' : size + unit} 全大写`;
  return '';
}
const KICK_CLASS = /\.v-(kick|kicker|eyebrow|overline|folio|issue|runhead|dateline|mono|pageno)(?![\w-])/;
// 点和等宽字查全文（注释里的用法示例也会被照抄）；破折号只查会出现在界面上的部分（dashText）
function aiTells(text, label, err, dashText = text) {
  const dot = firstHit(text.split('\n').filter((l) => !l.includes('data-dot')).join('\n'), DOT_RE); if (dot) err(`${label}有「·」这类点：${dot.slice(0, 70)}`);
  const dash = firstHit(dashText, DASH_RE); if (dash) err(`${label}有破折号「—」：${dash.slice(0, 70)}`);
  const mono = [...new Set((text.match(MONO_CSS) || []).map((m) => m.replace(/["']/g, '')))];
  if (mono.length) err(`${label}用了等宽字体：${mono.join('、')}`);
}

// 网上图标库：源码（含注释，注释里的说法会被照抄）里提到或引用就报错
const ICON_LIB = /lucide|font-?awesome|material[- ](icons|symbols)|bootstrap-icons|iconify|icons8|flaticon|iconfont|at\.alicdn\.com|remixicon|ionicons|glyphicon|tabler-icons|phosphor-icons|\bbi-[a-z]|(^|[\s"'`])fa[srlb]?\s+fa-[a-z]|(^|[\s"'`])fa-[a-z][\w-]*/i;
function iconLibs(text, label, err) {
  const hit = firstHit(text, ICON_LIB);
  if (hit) err(`${label}引用了网上图标库：${hit.slice(0, 70)}（图标用 icon() 取自己画的那一套，缺的照 kit/icons/SPEC.md 画，项目专用的用 defineIcon）`);
}

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`])\/\/.*$/gm, '$1');

// 只按最外层逗号拆，:is(a,b) 里的逗号不算
function splitTop(head) {
  const out = []; let d = 0; let cur = '';
  for (const c of head) {
    if (c === '(') d++; else if (c === ')') d--;
    if (c === ',' && d === 0) { out.push(cur); cur = ''; } else cur += c;
  }
  out.push(cur);
  return out;
}

// 把 css 拆成选择器列表：跳过 @keyframes，进 @media / @supports 里面
function selectors(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [];
  let i = 0;
  function block(end) {
    while (i < end) {
      const b = src.indexOf('{', i);
      if (b < 0 || b >= end) return;
      const head = src.slice(i, b).trim();
      let depth = 1; let j = b + 1;
      while (j < src.length && depth) { if (src[j] === '{') depth++; else if (src[j] === '}') depth--; j++; }
      if (/^@(media|supports|container)/.test(head)) { i = b + 1; block(j - 1); i = j; continue; }
      if (!head.startsWith('@')) {
        const rule = src.slice(b + 1, j - 1);
        splitTop(head).forEach((s) => out.push({ sel: s.trim(), rule }));
      }
      i = j;
    }
  }
  block(src.length);
  return out;
}

const fontsCss = fs.readFileSync(path.join(KIT, 'fonts.css'), 'utf8');
const DECLARED = new Set([...fontsCss.matchAll(/font-family:\s*["']([^"']+)["']/g)].map((m) => m[1]));
const GENERIC = /^(serif|sans-serif|monospace|cursive|fantasy|inherit|system-ui|-apple-system|BlinkMacSystemFont|ui-sans-serif|ui-serif|ui-monospace)$/i;

let catalogBrands = [];
try {
  const content = fs.readFileSync(path.join(KIT, 'catalog/content.js'), 'utf8');
  catalogBrands = [...content.matchAll(/key:\s*'(s\d\d-[a-z]+)'[^\n]*?brand:\s*'([^']+)'/g)].map((m) => ({ key: m[1], brand: m[2] }));
} catch (e) { /* 没有就不查 */ }

const sysFonts = {};
function lintStyle(key) {
  const E = []; const W = [];
  const err = (m) => E.push(m); const warn = (m) => W.push(m);
  const file = path.join(STY, key + '.js');
  const raw = fs.readFileSync(file, 'utf8');
  let S;
  try { S = require(file)(L); } catch (e) { err('起手包加载失败：' + e.message); return { E, W }; }

  // 文件形状
  const no = key.slice(1, 3);
  if (S.key !== key) err(`key 写的是 ${S.key}，应是 ${key}`);
  if (Number(S.no) !== Number(no)) err(`no 写的是 ${S.no}，应是 ${Number(no)}`);
  if (S.root !== 's' + no) err(`root 写的是 ${S.root}，应是 s${no}`);
  if (!S.name) err('缺 name');
  if (typeof S.css !== 'string' || !S.css.length) err('缺 css');
  if (typeof S.dark !== 'boolean') err('dark 要写 true 或 false');
  if (!/^#[0-9a-f]{6}$/i.test(String(S.stage || ''))) err(`stage 只能是 #xxxxxx 纯色：现在是 ${S.stage}`);

  // 设计令牌
  const T = S.T || {};
  for (const f of T_FIELDS) if (!(f in T)) err(`T 缺字段 ${f}（没有的写 null）`);
  if (T.fonts) for (const f of ['title', 'body', 'num']) if (!(f in T.fonts)) err(`T.fonts 缺 ${f}`);
  if (T.accents && typeof T.accents !== 'object') err('T.accents 要是 { 名字: 色值 }');
  for (const f of ['radius', 'margin']) if (f in T && T[f] !== null && typeof T[f] !== 'number') err(`T.${f} 要是数字（px），现在是 ${JSON.stringify(T[f])}`);

  // 色卡五色都要在 T 里
  let cat = null;
  try { cat = require(path.join(KIT, 'catalog/pages', key + '.js')); } catch (e) { warn('图册模块读不了：' + e.message); }
  const tText = JSON.stringify(T).toLowerCase();
  if (cat && Array.isArray(cat.palette)) {
    for (const [nm, hex] of cat.palette) if (!tText.includes(String(hex).toLowerCase())) err(`色卡「${nm}」${hex} 不在 T 里`);
  }

  // 类名和作用域
  const css = S.css || '';
  const sels = selectors(css);
  for (const c of NEED_CLASS) if (!new RegExp('\\.' + c + '(?![\\w-])').test(css)) err(`css 没定义 .${c}`);
  NEED_SEL.forEach((re) => { if (!re.test(css)) err(`css 没定义 ${re.source.replace(/\\/g, '').replace(/s\*|s\+|b$/g, ' ').trim()}`); });
  const root = '.' + (S.root || '');
  for (const { sel, rule } of sels) {
    if (!sel.startsWith(root)) { err(`选择器没挂在根类下：${sel}`); continue; }
    const rest = sel.slice(root.length);
    // .sNN.web 是风格自己给网页屏写的，.v-xxx .ic 是自己组件里的图标，都不算动公用类
    const scoped = rest.replace(/^\.(web|scr)(?![\w-])/, '');
    if (!/\.v-/.test(scoped)) {
      for (const p of PUBLIC) {
        if (new RegExp('\\.' + p + '(?![\\w-])').test(scoped)) warn(`动到公用类 .${p}：${sel}`);
      }
    }
  }

  // 字体：排在字体串第一的系统字体，苹果设备上显示它，安卓上会变成后面的字；排在后面的只是兜底，不算
  const fontVals = Object.values(T.fonts || {}).filter(Boolean);
  const stacks = [...css.matchAll(/(?:font(?:-family)?|--[\w-]+)\s*:[^;}]*/g)].map((m) => m[0]).concat(fontVals);
  const lead = new Set();
  for (const st of stacks) { const m = /["']([^"'\n]{2,40})["']/.exec(st); if (m) lead.add(m[1]); }
  for (const f of lead) {
    if (DECLARED.has(f) || GENERIC.test(f) || !/^[A-Za-z一-龥][\w 一-龥-]*$/.test(f)) continue;
    warn(`字体「${f}」是系统字体，不在 fonts.css 里：可点击 HTML 内嵌不了，安卓上会变字，风格说明要写替代字`);
    (sysFonts[key] = sysFonts[key] || []).push(f);
  }

  // ui 四件套：参数和行为
  const ui = S.ui || {};
  for (const f of ['logo', 'nav', 'tabs', 'btn']) if (typeof ui[f] !== 'function') err(`缺 ui.${f}`);
  const tryCall = (label, fn, test) => {
    try { const h = fn(); if (typeof h !== 'string' || !h.length) err(`${label} 没返回 HTML`); else if (test) test(h); } catch (e) { err(`${label} 报错：${e.message}`); }
  };
  if (ui.logo) {
    tryCall("ui.logo('测试品牌','TEST')", () => ui.logo('测试品牌', 'TEST'), (h) => {
      if (!h.includes('v-logo')) err('ui.logo 没用 .v-logo');
      if (!h.includes('测试品牌')) err('ui.logo 没用传进去的品牌名（写死了？）');
    });
    tryCall("ui.logo('测试品牌')", () => ui.logo('测试品牌'), (h) => { if (/undefined|null/.test(h)) err('ui.logo 不传英文时输出了 undefined'); });
  }
  if (ui.nav) {
    tryCall("ui.nav({title})", () => ui.nav({ title: '顶栏标题' }), (h) => {
      if (!h.includes('v-nav')) err('ui.nav 没用 .v-nav');
      if (!h.includes('顶栏标题')) err('ui.nav 没用 title');
      if (!h.includes('data-back')) err('ui.nav 默认 back=true 时没有 data-back');
      if (/undefined/.test(h)) err('ui.nav 输出了 undefined');
    });
    tryCall('ui.nav({back:false,right,left})', () => ui.nav({ title: 'x', back: false, right: '<i>右</i>', left: '<i>左</i>' }), (h) => {
      if (h.includes('data-back')) err('ui.nav 传 back:false 还有 data-back');
      if (!h.includes('<i>右</i>')) err('ui.nav 没用 right');
      if (!h.includes('<i>左</i>')) err('ui.nav 没用 left');
    });
  }
  if (ui.tabs) {
    tryCall('ui.tabs(items,1,go)', () => ui.tabs([['house', '首页'], ['user', '我的']], 1, ['a', 'b']), (h) => {
      if (!h.includes('v-tabs')) err('ui.tabs 没用 .v-tabs');
      if (!h.includes('data-go="b"')) err('ui.tabs 没用第三个参数 go');
      if (!h.includes('我的')) err('ui.tabs 没用 items 的文字');
    });
    tryCall('ui.tabs(items)', () => ui.tabs([['house', '首页'], ['user', '我的']]), (h) => { if (/undefined/.test(h)) err('ui.tabs 只传 items 时输出了 undefined'); });
  }
  if (ui.btn) {
    tryCall('ui.btn(text,{ic:"",cls,attrs})', () => ui.btn('去看看', { ic: '', cls: 'wide', attrs: 'data-go="x"' }), (h) => {
      if (!h.includes('v-btn')) err('ui.btn 没用 .v-btn');
      if (!h.includes('wide')) err('ui.btn 没用 cls');
      if (!h.includes('data-go="x"')) err('ui.btn 没用 attrs');
      if (!h.includes('去看看')) err('ui.btn 没用 text');
      if (h.includes('<svg')) err('ui.btn 传 ic:"" 时还画了图标');
    });
    tryCall('ui.btn(text,{ic})', () => ui.btn('去看看', { ic: 'arrow-right' }), (h) => { if (!h.includes('<svg')) err('ui.btn 传 ic 时没画图标'); });
    tryCall('ui.btn(text)', () => ui.btn('去看看'), (h) => { if (/undefined/.test(h)) err('ui.btn 只传 text 时输出了 undefined'); });
  }

  // 去 AI 味：等宽字、点、破折号、小标题组件、标签式小字
  const code = stripComments(raw);
  for (const [k, v] of Object.entries(T.fonts || {})) if (v && MONO_RE.test(String(v).split(',')[0])) err(`T.fonts.${k} 是等宽字体 ${v}：换成风格自己的字体，数字对齐用 tabular-nums`);
  aiTells(raw, '起手包（含注释里的用法示例）', err);
  iconLibs(raw, '起手包（含注释）', err);
  if (T.icon) {
    const o = T.icon;
    if (typeof o.stroke !== 'number') err('T.icon.stroke 要是数字（没给线宽时的线宽）');
    if (!['round', 'square'].includes(o.cap)) err(`T.icon.cap 只能是 round 或 square：现在是 ${o.cap}`);
    if (!['round', 'miter'].includes(o.join)) err(`T.icon.join 只能是 round 或 miter：现在是 ${o.join}`);
    if (!['none', 'tint', 'solid'].includes(o.fill)) err(`T.icon.fill 只能是 none、tint、solid：现在是 ${o.fill}`);
  }
  for (const k of Object.keys(ui)) if (KICKER_UI.test(k)) err(`ui.${k} 是眉题 / 书眉 / 页码 / 期号组件：删掉，用到它的地方改掉`);
  for (const { sel, rule } of sels) { const why = labelRule(rule); if (why) err(`标签式小字 / 拉开字距（${why}）：${sel}`); }
  const kc = KICK_CLASS.exec(css); if (kc) err(`css 里有眉题 / 书眉 / 页码 / 等宽这类类名 ${kc[0]}：删掉，用到的地方改掉`);

  // 组件不写死图册品牌（注释里提到可以）
  const own = catalogBrands.find((b) => b.key === key);
  if (own && code.includes(own.brand)) {
    const hits = code.split('\n').filter((l) => l.includes(own.brand)).map((l) => l.trim().slice(0, 70));
    warn(`代码里出现图册品牌「${own.brand}」：${hits[0]}（要是参数默认值，改成必传或走参数）`);
  }

  // 每个 ui 函数要有一行注释
  const extras = Object.keys(ui).filter((k) => !['logo', 'nav', 'tabs', 'btn'].includes(k));
  for (const k of extras) {
    const commented = raw.split('\n').some((l) => { const i = l.indexOf('//'); return i >= 0 && new RegExp('\\b' + k + '\\b').test(l.slice(i)); });
    if (!commented) warn(`ui.${k} 没有注释说明参数`);
  }
  return { E, W, S, cat };
}

function lintDocs(key, S, cat) {
  const E = []; const W = [];
  const err = (m) => E.push(m); const warn = (m) => W.push(m);
  if (!fs.existsSync(DOCS)) return { E, W };
  const no = key.slice(1, 3);
  const dir = path.join(DOCS, 'styles');
  const mdName = fs.existsSync(dir) ? fs.readdirSync(dir).find((f) => f.startsWith(no + '-') && f.endsWith('.md')) : null;
  if (!mdName) { err(`风格说明 styles/${no}-*.md 还没有`); return { E, W }; }
  const md = fs.readFileSync(path.join(dir, mdName), 'utf8');
  for (const s of DOC_SECTIONS) if (!new RegExp('^##\\s+' + s, 'm').test(md)) err(`风格说明缺「${s}」一节`);
  for (const r of REF_SHOTS) if (!md.includes(r + '.jpg') && !md.includes(r)) err(`风格说明「参考图」没提到 ${r}`);
  if (!md.includes(`style('${key}')`)) err(`风格说明没写 style('${key}')`);
  if (S) {
    const mDark = md.match(/S\.dark\s*=\s*(true|false)/);
    if (!mDark) err('风格说明没写 S.dark');
    else if (String(S.dark) !== mDark[1]) err(`风格说明写 S.dark=${mDark[1]}，代码是 ${S.dark}`);
    const mStage = md.match(/S\.stage\s*=\s*[`'"]?(#[0-9a-fA-F]{6})/);
    if (!mStage) err('风格说明没写 S.stage');
    else if (mStage[1].toLowerCase() !== String(S.stage).toLowerCase()) err(`风格说明写 S.stage=${mStage[1]}，代码是 ${S.stage}`);
    // 文档里每个色值都要在起手包或图册模块里找得到
    const codeText = (fs.readFileSync(path.join(STY, key + '.js'), 'utf8') + fs.readFileSync(path.join(KIT, 'catalog/pages', key + '.js'), 'utf8')).toLowerCase();
    const expand = (h) => (h.length === 4 ? '#' + [...h.slice(1)].map((c) => c + c).join('') : h);
    // 只查「设计令牌」「一眼认出」两节：别的节里的色值是换品牌的举例和示例代码
    const sect = (name) => { const m = md.match(new RegExp('^##\\s+' + name + '[\\s\\S]*?(?=^##\\s|$(?![\\s\\S]))', 'm')); return m ? m[0] : ''; };
    const spec = sect('设计令牌') + sect('一眼认出它的几样东西');
    const hexes = new Set([...spec.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)].map((m) => m[0].toLowerCase()));
    for (const h of hexes) if (!codeText.includes(h) && !codeText.includes(expand(h))) err(`风格说明里的色值 ${h} 在起手包和图册模块里都没有`);
    // 色卡五色都要列
    if (cat && Array.isArray(cat.palette)) for (const [nm, hex] of cat.palette) if (!md.toLowerCase().includes(String(hex).toLowerCase())) err(`风格说明没列色卡「${nm}」${hex}`);
    // 文档提到的 ui 函数要真有
    for (const m of md.matchAll(/ui\.([a-zA-Z_]\w*)\s*\(/g)) if (!(m[1] in S.ui)) err(`风格说明提到 ui.${m[1]}()，起手包里没有`);
    // 起手包的 ui 函数文档都要写到
    for (const k of Object.keys(S.ui)) if (!['logo', 'nav', 'tabs', 'btn'].includes(k) && !md.includes(`ui.${k}`)) warn(`起手包有 ui.${k}，风格说明没写`);
  }
  if (md.length < 4000) warn(`风格说明才 ${md.length} 字，可能没写全`);
  // 去 AI 味：「别做」可以点名这些东西，「客户在图册里看到的」是图册原文照抄，这两节不查；别的地方不许再推荐
  const cut = (text, name) => text.replace(new RegExp('^##\\s+' + name + '[\\s\\S]*?(?=^##\\s|$(?![\\s\\S]))', 'm'), '');
  const noDont = cut(cut(md, '别做'), '客户在图册里看到的');
  const noRefs = cut(noDont, '参考图');
  const codeParts = [...noDont.matchAll(/```[\s\S]*?```|`[^`\n]+`/g)].map((m) => m[0]).join('\n');
  aiTells(noDont.replace(MONO_CSS, ''), '风格说明（「别做」以外）', err, codeParts);
  iconLibs(noDont, '风格说明（「别做」以外）', err);
  const dotAll = firstHit(md, DOT_RE); if (dotAll && !DOT_RE.test(noDont)) err(`风格说明（「别做」或图册原文里）有「·」这类点：${dotAll.slice(0, 70)}`);
  const monoNames = [...new Set((noRefs.match(MONO_CSS) || []).map((m) => m.replace(/["']/g, '')))];
  if (monoNames.length) err(`风格说明写了等宽字体名（只能写在「别做」「参考图」里）：${monoNames.join('、')}`);
  if (/等宽/.test(noRefs)) err(`风格说明提到等宽（只能写在「别做」「参考图」里）：${firstHit(noRefs, /等宽/).slice(0, 70)}`);
  const KICK_WORDS = /眉题|书眉|页码|期号|kicker|eyebrow/i;
  if (KICK_WORDS.test(noRefs)) err(`风格说明提到眉题 / 书眉 / 页码 / 期号（只能写在「别做」「参考图」里）：${firstHit(noRefs, KICK_WORDS).slice(0, 70)}`);
  if (/^##\s+客户在图册里看到的/m.test(md) && /等宽|期号|页码|书眉/.test((md.match(/^##\s+客户在图册里看到的[\s\S]*?(?=^##\s)/m) || [''])[0]) && !/审美守则/.test((md.match(/^##\s+客户在图册里看到的[\s\S]*?(?=^##\s)/m) || [''])[0])) err('图册原文里有等宽字 / 期号 / 页码 / 书眉：在这一节写一句 demo 里怎么做到这条特征（审美守则第二节不许用这些）');
  const ex = path.join(DOCS, 'examples', key);
  for (const f of ['demo.js', 'board.png']) if (!fs.existsSync(path.join(ex, f))) err(`examples/${key}/${f} 还没有`);
  if (fs.existsSync(path.join(ex, 'demo.js'))) lintDemo(path.join(ex, 'demo.js'), `examples/${key}/demo.js `, err);
  return { E, W };
}

// 样例 demo.js：去掉注释后不许有点、破折号、等宽字、标签式小字
function lintDemo(file, label, err) {
  const src = fs.readFileSync(file, 'utf8');
  const code = stripComments(src);
  aiTells(src, label, err);
  iconLibs(src, label, err);
  for (const { sel, rule } of selectors((/const css = `([\s\S]*?)`;/.exec(code) || [])[1] || '')) { const why = labelRule(rule); if (why) err(`${label}标签式小字（${why}）：${sel}`); }
}

const all = fs.readdirSync(STY).filter((f) => /^s\d\d-.*\.js$/.test(f)).map((f) => f.replace(/\.js$/, '')).sort();
const want = process.argv.slice(2);
const pick = want.length ? all.filter((k) => want.some((w) => k === w || k.startsWith(String(w) + '-') || k.startsWith('s' + String(w).padStart(2, '0') + '-'))) : all;
if (want.length && !pick.length) { console.log('没有这个起手包：' + want.join(' ')); process.exit(1); }
let nE = 0; let nW = 0;
for (const key of pick) {
  const a = lintStyle(key);
  const b = lintDocs(key, a.S, a.cat);
  const E = [...a.E, ...b.E]; const W = [...a.W, ...b.W];
  nE += E.length; nW += W.length;
  console.log(`${key}：${E.length ? E.length + ' 处错' : '没有错'}${W.length ? '，' + W.length + ' 条提醒' : ''}`);
  E.forEach((m) => console.log('  错    ' + m));
  W.forEach((m) => console.log('  提醒  ' + m));
}
if (!want.length) {
  const missing = [];
  for (let i = 1; i <= 16; i++) if (!all.some((k) => k.startsWith('s' + String(i).padStart(2, '0') + '-'))) missing.push(String(i).padStart(2, '0'));
  if (missing.length) { console.log('还没有起手包：' + missing.join(' ')); nE += missing.length; }
}
// 不对应某个起手包的样例（混搭等）也查
if (!want.length && fs.existsSync(path.join(DOCS, 'examples'))) {
  for (const d of fs.readdirSync(path.join(DOCS, 'examples'))) {
    if (all.includes(d)) continue;
    const f = path.join(DOCS, 'examples', d, 'demo.js');
    // 能用的应用样例（kit/app）：src 下每个文件都查点、破折号、等宽字
    if (fs.existsSync(path.join(DOCS, 'examples', d, 'app.json'))) {
      const E = [];
      const files = (dd) => fs.readdirSync(dd, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(path.join(dd, e.name)) : /\.(js|css)$/.test(e.name) ? [path.join(dd, e.name)] : []));
      for (const g of files(path.join(DOCS, 'examples', d, 'src'))) { const t = fs.readFileSync(g, 'utf8'); const lb = path.relative(path.join(DOCS, 'examples', d), g) + ' '; aiTells(t, lb, (m) => E.push(m)); iconLibs(t, lb, (m) => E.push(m)); }
      nE += E.length;
      console.log(`examples/${d}（应用）：${E.length ? E.length + ' 处错' : '没有错'}`);
      E.forEach((m) => console.log('  错    ' + m));
      continue;
    }
    if (!fs.existsSync(f)) continue;
    const E = [];
    lintDemo(f, '', (m) => E.push(m));
    nE += E.length;
    console.log(`examples/${d}：${E.length ? E.length + ' 处错' : '没有错'}`);
    E.forEach((m) => console.log('  错    ' + m));
  }
}
if (Object.keys(sysFonts).length) console.log('用了系统字体的风格（安卓上会变字）：' + Object.entries(sysFonts).map(([k, v]) => `${k}（${v.join('、')}）`).join('；'));
console.log(`接口检查：${pick.length} 种，${nE} 处错，${nW} 条提醒`);
process.exit(nE ? 1 : 0);
