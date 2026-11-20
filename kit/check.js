// 自动检查（screens.html?check=1 时运行，结果写进 <pre id="report">，render.sh 用 --dump-dom 取）
// 查：字出界、字被截断、字太小、字体没生效、图片没载入；顺带数每屏可见元素
// 还查 AI 味（审美守则第二节）：点和分隔符、装饰圆点、等宽字、眉题、加字距的小字、大写英文小字、编号、破折号、
// emoji 和箭头字符、渐变字、用空格拉开的字、压在大数字上的说明词。这些算「问题」，要改到零；
// 副标题、左侧竖条、套话、整数假数据、SVG 里的成串小圆点、画出来的竖线分隔算「提醒」，看一眼
// 还查网上图标库的痕迹（审美守则第一节第 7 条：图标自己画）：lucide、iconfont、Font Awesome、Material Icons / Symbols、Bootstrap Icons、
// Iconify、icons8、flaticon 等的类名、标签、字体、图片地址、外链脚本和样式表，算「问题」
(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
  await new Promise((r) => setTimeout(r, 300));
  const SYS = /^(PingFang SC|Songti SC|Kaiti SC|Yuanti SC|Lantinghei SC|Libian SC|Weibei SC|HanziPen SC|STSong|STKaiti|Hiragino.*|Avenir Next.*|Avenir|Helvetica Neue|Helvetica|DIN Alternate|DIN Condensed|Futura|Gill Sans|Didot|Bodoni 72.*|Baskerville|Big Caslon|New York|Iowan Old Style|Charter|Optima|Hoefler Text|American Typewriter|Rockwell|Menlo|Courier New|Georgia|Times New Roman|Arial|SF Pro.*|-apple-system|system-ui|BlinkMacSystemFont|sans-serif|serif|monospace|cursive|fantasy|inherit)$/i;
  const cv = document.createElement('canvas').getContext('2d');
  const famCache = {};
  // 字体是否真的生效：和两种后备字体比宽度，都一样就是没生效
  function famOk(f, wt = 400, st = 'normal') {
    const key = f + wt + st;
    if (key in famCache) return famCache[key];
    const t = '汉字永Aa0Qg@';
    const w = (font) => { cv.font = `${st} ${wt} ${font}`; return cv.measureText(t).width; };
    const a = w(`40px "${f}", monospace`), b = w('40px monospace'), c = w(`40px "${f}", serif`), d = w('40px serif');
    return (famCache[key] = !(a === b && c === d));
  }
  const GEN = /^(-apple-system|system-ui|BlinkMacSystemFont|sans-serif|serif|monospace|cursive|fantasy|inherit|ui-sans-serif|ui-serif|ui-monospace)$/i;
  const declared = new Set([...document.fonts].map((f) => f.family.replace(/["']/g, '')));
  const failed = new Set([...document.fonts].filter((f) => f.status === 'error').map((f) => f.family.replace(/["']/g, '')));
  const rep = {};

  // ---------- 网上图标库（审美守则第一节第 7 条） ----------
  // 图标一律是 icon() 出的自己画的那一套（<svg class="ic">）；下面这些是从图标库拿来的记号
  const LIB_CLASS = /^(lucide(-[\w-]+)?|fa[srlbdtk]|fa-[a-z][\w-]*|material-(icons|symbols)[\w-]*|bi-[a-z][\w-]*|iconify[\w-]*|iconfont|icon-?font-[\w-]+|icons8[\w-]*|flaticon[\w-]*|fi-[a-z]{1,3}-[\w-]+|glyphicon[\w-]*|feather(-[\w-]+)?|ri-[a-z][\w-]*-(line|fill)|ionicon[\w-]*|tabler-icon[\w-]*|remixicon)$/i;
  const LIB_TAG = /^(iconify-icon|ion-icon|lord-icon|box-icon)$/i;
  const LIB_ATTR = /^(data-lucide|data-feather|data-icon|data-fa-[\w-]+|data-iconify[\w-]*)$/i;
  const LIB_FONT = /font ?awesome|material (icons|symbols)|bootstrap-icons|iconfont|remixicon|ionicons|icomoon|flaticon|glyphicons|tabler-icons|phosphor/i;
  const LIB_URL = /lucide|font-?awesome|fontawesome|material-?(icons|symbols)|bootstrap-icons|iconify|icons8|flaticon|iconfont|at\.alicdn\.com|remixicon|ionicons|icomoon|tabler-icons|phosphor-icons/i;
  const libWhy = (el, cs) => {
    const cls = el.getAttribute('class') || '';
    const c = cls.split(/\s+/).find((x) => x && LIB_CLASS.test(x));
    if (c) return `类名「${c}」`;
    if (LIB_TAG.test(el.tagName)) return `<${el.tagName.toLowerCase()}> 标签`;
    for (const a of el.attributes) if (LIB_ATTR.test(a.name)) return `属性 ${a.name}`;
    const fam = cs.fontFamily || '';
    if (LIB_FONT.test(fam)) return `图标字体 ${fam.split(',')[0].replace(/["']/g, '')}`;
    for (const pe of ['::before', '::after']) { const pf = getComputedStyle(el, pe).fontFamily || ''; if (getComputedStyle(el, pe).content !== 'none' && LIB_FONT.test(pf)) return `${pe} 用图标字体 ${pf.split(',')[0].replace(/["']/g, '')}`; }
    const src = el.getAttribute('src') || el.getAttribute('href') || el.getAttribute('xlink:href') || '';
    if (src && LIB_URL.test(src)) return `地址 ${src.slice(0, 50)}`;
    if (cs.backgroundImage && cs.backgroundImage !== 'none' && LIB_URL.test(cs.backgroundImage)) return '背景图来自图标库';
    if ((cs.maskImage || cs.webkitMaskImage || 'none') !== 'none' && LIB_URL.test(cs.maskImage || cs.webkitMaskImage)) return '遮罩图来自图标库';
    return '';
  };
  const LIB_DOC = [];
  for (const e of document.querySelectorAll('link[href], script[src]')) { const u = e.getAttribute('href') || e.getAttribute('src'); if (LIB_URL.test(u)) LIB_DOC.push(`页面引用了 ${u.slice(0, 60)}`); }
  for (const f of document.fonts) if (LIB_FONT.test(f.family)) LIB_DOC.push(`载入了图标字体 ${f.family.replace(/["']/g, '')}`);
  const LIB_HINT = '图标自己画：用 icon() 取我们的图标集，缺的照 kit/icons/SPEC.md 画（项目专用的 defineIcon），不用网上图标库';

  // ---------- AI 味（审美守则第二节） ----------
  // 状态栏、微信胶囊、底部横条、灵动岛、浏览器外框是真实系统界面，不查；data-dot 包着的是允许的点（轮播页码、未读红点、点阵图）
  const PUBLIC_UI = '.sb, .cap, .hb, .island, .brw-bar';
  const DOTS = /[·•・‧∙⋅●○◦◉]/;
  const BARS = /\S\s*[|｜]\s*\S/;
  const DASH = /[—―]/;
  const SYMBOL = /[←-⇿☀-➿⬀-⯿«»‹›]|\p{Extended_Pictographic}/u;
  const SYMBOL_OK = /^[©®™]$/;
  const NUMBERED = /^(0\d(\s*[\/／]\s*\d+)?|No\.?\s*\d+|№\s*\d+|§\s*\d*|p\.\s*\d+|(part|chapter|section|step|vol\.?|issue)\s*\d+|第\s*\d+\s*(期|章|节|部分)|第[一二三四五六七八九十]+(期|章|节|部分|卷)|(其|卷)[一二三四五六七八九十]+|[壹贰叁肆柒捌玖]|[壹贰叁肆伍陆柒捌玖拾]{2,})$/i;
  const SPACED = /^([\u4e00-\u9fff][ \u3000\u00a0]+)+[\u4e00-\u9fff]$/;   // 「预　约」「立 即 购 买」：用空格拉字距
  const SLASH = /\S\s+[\/／]\s+\S/;
  const MONO = /mono|courier|menlo|consolas|monaco|^monospace$/i;
  const CLICHE = /(开启|探索|赋能|一站式|臻选|匠心|品质生活|美好|专属|沉浸式|焕新|尽在|触手可及)/;
  const FAKE = /(\d{1,3}(,000)+\s*\+|\d+\s*[万千]\s*\+|(^|[^\d.])(99|100)\s*%)/;
  const hasDotOk = (el) => !!el.closest('[data-dot]');
  const SHAPES = /[\u25A0-\u25FF]/;   // ■ ▲ ▶ ▸ ◆ 这类几何符号（圆点另算在 DOTS 里）
  const symbols = (t) => [...t].filter((c) => ((SYMBOL.test(c) && !SYMBOL_OK.test(c)) || (SHAPES.test(c) && !DOTS.test(c))));
  const tint = (c) => c && c !== 'transparent' && !/rgba\([^)]*,\s*0\)$/.test(c);
  // 小圆点：3–14px 见方、圆角到一半、有底色或描边
  function isDot(st, w, h) {
    if (!(w >= 3 && w <= 14 && Math.abs(w - h) <= 1.5)) return false;
    const rad = st.borderTopLeftRadius;
    const round = rad.endsWith('%') ? parseFloat(rad) >= 40 : parseFloat(rad) >= w / 2 - 0.6;
    if (!round) return false;
    return tint(st.backgroundColor) || st.backgroundImage !== 'none' || (parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== 'none' && tint(st.borderTopColor));
  }
  // 只量元素自己那几段文字的框，不量整个按钮、胶囊
  function textRect(el, r) {
    const rg = document.createRange(); let box = null;
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      rg.selectNodeContents(n); const b = rg.getBoundingClientRect();
      if (!b.width) continue;
      box = box ? { left: Math.min(box.left, b.left), top: Math.min(box.top, b.top), right: Math.max(box.right, b.right), bottom: Math.max(box.bottom, b.bottom) } : { left: b.left, top: b.top, right: b.right, bottom: b.bottom };
    }
    return box || r;
  }
  // SVG 里的小圆点：字标里的直接算问题，别处一张图里有三颗以上算提醒；虚线画的点线也提醒
  function svgDots(svg, issues, notes) {
    // 图标集里的图标（<svg class="ic">）按 kit/icons/SPEC.md 画，省略号的三个点是图形本身
    if (svg.closest(PUBLIC_UI) || svg.closest('[data-dot]') || svg.classList.contains('ic')) return;
    const small = [...svg.querySelectorAll('circle, ellipse')].filter((c) => {
      const b = c.getBoundingClientRect(); const f = getComputedStyle(c).fill;
      return b.width >= 2 && b.width <= 10 && Math.abs(b.width - b.height) <= 1.5 && f && f !== 'none' && tint(f);
    });
    if (small.length && svg.closest('.v-logo')) {
      // 落在别的大图形里面的（眼睛、圆心）算图形的一部分，只提醒；单独挂在外面的、整个记号就是几个点的，算圆点
      const big = [...svg.querySelectorAll('path, rect, polygon, polyline, line, circle, ellipse')].map((e) => e.getBoundingClientRect()).filter((b) => b.width > 10 || b.height > 10);
      const inside = (c) => { const b = c.getBoundingClientRect(); const cx = b.left + b.width / 2; const cy = b.top + b.height / 2; return big.some((g) => cx > g.left && cx < g.right && cy > g.top && cy < g.bottom); };
      const loose = small.filter((c) => !inside(c));
      if (loose.length || !big.length) issues.push({ t: '圆点', s: 'v-logo svg', d: `字标记号里有 ${loose.length || small.length} 个单独的小圆点：记号换成别的形状` });
      else notes.push({ t: '字标小圆点', s: 'v-logo svg', d: `字标图形里有 ${small.length} 个小圆点：确认是图形的一部分（眼睛、圆心），不是点缀` });
    } else if (small.length >= 3) notes.push({ t: 'SVG 小圆点', s: (svg.getAttribute('class') || 'svg').slice(0, 18), d: `一张图里 ${small.length} 颗小圆点：是装饰就删，是数据图就在外层加 data-dot` });
    const dotted = [...svg.querySelectorAll('[stroke-dasharray]')].filter((e) => { const a = String(e.getAttribute('stroke-dasharray')).split(/[\s,]+/).map(parseFloat); return a[0] <= 2 && /round/.test(getComputedStyle(e).strokeLinecap); });
    if (dotted.length) notes.push({ t: 'SVG 点线', s: (svg.getAttribute('class') || 'svg').slice(0, 18), d: '圆头虚线画的一串点：换成实线或删掉' });
  }
  function aiLook(el, cs, r, txt, issues, notes, seenMono, texts) {
    if (el.tagName.toLowerCase() === 'svg') { svgDots(el, issues, notes); return; }
    if (el.closest('svg')) return;
    const okDot = hasDotOk(el);
    // 圆点：元素本身和 ::before / ::after
    if (!okDot && !txt && !el.children.length && isDot(cs, r.width, r.height)) issues.push({ t: '圆点', s: (el.className && el.className.baseVal === undefined ? String(el.className) : el.tagName.toLowerCase()).slice(0, 18), d: `${Math.round(r.width)}px 的装饰圆点：状态写字或配图标；轮播页码、未读红点加 data-dot` });
    for (const pe of ['::before', '::after']) {
      const ps = getComputedStyle(el, pe);
      if (!ps.content || ps.content === 'none' || ps.content === 'normal' || ps.display === 'none') continue;
      const pc = ps.content.replace(/^["']|["']$/g, '');
      if (!okDot && DOTS.test(pc)) issues.push({ t: '点', s: (txt || el.tagName.toLowerCase()).slice(0, 18), d: `${pe} 里写了「${pc.slice(0, 6)}」` });
      if (DASH.test(pc) || /[|｜]/.test(pc) || /^\s*[\/／]\s*$/.test(pc)) issues.push({ t: '分隔符', s: (txt || el.tagName.toLowerCase()).slice(0, 18), d: `${pe} 里写了「${pc.slice(0, 6)}」` });
      const sy = symbols(pc);
      if (sy.length) issues.push({ t: '符号装饰', s: (txt || el.tagName.toLowerCase()).slice(0, 18), d: `${pe} 里写了「${sy.join('')}」：换成 icon() 图标或删掉` });
      const w = parseFloat(ps.width); const h = parseFloat(ps.height);
      if (!okDot && isDot(ps, w, h)) issues.push({ t: '圆点', s: (txt || String(el.className) || el.tagName.toLowerCase()).slice(0, 18), d: `${pe} 画了 ${Math.round(w)}px 的圆点：删掉；状态写字或配图标` });
    }
    // 渐变字
    if ((cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text') && cs.backgroundImage !== 'none') issues.push({ t: '渐变字', s: (el.textContent || '').trim().slice(0, 18), d: '字用纯色' });
    // 画出来的竖线夹在两段字中间串信息
    if (!txt && !el.children.length && r.width <= 2 && r.height >= 8 && r.height <= 24) {
      const pv = el.previousElementSibling; const nx = el.nextElementSibling;
      if (pv && nx && (pv.textContent || '').trim() && (nx.textContent || '').trim() && /flex|inline/.test(getComputedStyle(el.parentElement).display)) notes.push({ t: '竖线分隔', s: `${(pv.textContent || '').trim().slice(0, 8)}｜${(nx.textContent || '').trim().slice(0, 8)}`, d: '画一道竖线串两段信息：拆开放或写成一句话' });
    }
    // 左侧竖条（卡片、引文）；格子之间同样的左边框是网格线，不算
    const bl = parseFloat(cs.borderLeftWidth);
    const gridLine = () => { const p = el.parentElement; if (!p || !/grid|flex/.test(getComputedStyle(p).display)) return false; return [...p.children].filter((c) => c !== el && parseFloat(getComputedStyle(c).borderLeftWidth) === bl).length >= 1; };
    if (bl >= 2 && !gridLine() && cs.borderLeftStyle !== 'none' && tint(cs.borderLeftColor) && !parseFloat(cs.borderTopWidth) && !parseFloat(cs.borderRightWidth) && !parseFloat(cs.borderBottomWidth) && r.height >= 16 && (el.textContent || '').trim()) notes.push({ t: '左侧竖条', s: (el.textContent || '').trim().slice(0, 18), d: `${bl}px 竖条：AI 常用的卡片 / 引文做法，风格说明没要求就去掉` });
    if (!txt) return;
    const snip = txt.slice(0, 18);
    const fs = parseFloat(cs.fontSize);
    if (!okDot && DOTS.test(txt)) issues.push({ t: '点', s: snip, d: '文字里有「·」这类点：拆成两个元素用间距隔开，或写成一句话（审美守则 2.1）' });
    if (BARS.test(txt)) issues.push({ t: '分隔符', s: snip, d: '用「|」串信息：拆成两个元素或写成一句话' });
    if (SLASH.test(txt)) issues.push({ t: '分隔符', s: snip, d: '用「 / 」串信息：拆成两个元素或写成一句话（「¥28/杯」这种单位写法不加空格）' });
    if (txt.split(/\u3000+/).filter((x) => x.trim()).length >= 3) notes.push({ t: '空格串信息', s: snip, d: '用全角空格串了三样以上：删到两样，拆成元素或写成一句话' });
    if (SPACED.test(txt)) issues.push({ t: '空格拉字距', s: snip, d: '字中间夹空格拉开距离：去掉空格，字距 0–0.04em' });
    if (DASH.test(txt)) issues.push({ t: '破折号', s: snip, d: '去掉「—」：区间用短横「–」，句子改写' });
    const sy = symbols(txt);
    if (sy.length) issues.push({ t: '符号装饰', s: snip, d: `「${[...new Set(sy)].join('')}」：评分用 star 图标，箭头用 chevron 图标，其余删` });
    const fam = cs.fontFamily.split(',')[0].trim().replace(/["']/g, '');
    if (MONO.test(fam) && !seenMono.has(fam)) { seenMono.add(fam); issues.push({ t: '等宽字体', s: snip, d: `${fam}：换成风格的数字字体，数字对齐用 tabular-nums` }); }
    const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) / fs;
    if (fs <= 14 && ls >= 0.1) issues.push({ t: '字距小字', s: snip, d: `${fs}px 字距 ${ls.toFixed(2)}em：标签字不拉字距，要么删，要么做成正常大小的字` });
    else if (fs < 24 && ls >= 0.1) issues.push({ t: '字距过大', s: snip, d: `${fs}px 字距 ${ls.toFixed(2)}em：按钮、标签栏、正文字距 0–0.04em` });
    else if (fs < 24 && ls >= 0.05) notes.push({ t: '字距偏大', s: snip, d: `${fs}px 字距 ${ls.toFixed(2)}em：按钮、标签栏、正文字距 0–0.04em` });
    if (fs <= 16 && cs.textTransform === 'uppercase' && /[a-z]/i.test(txt)) issues.push({ t: '大写小字', s: snip, d: `${fs}px 全大写英文：删掉或换成中文正常字` });
    else if (/^[A-Z][A-Z .'’-]{2,}$/.test(txt) && /[A-Z]{3}/.test(txt) && el.closest('.v-logo')) issues.push({ t: '大写英文', s: snip, d: '字标里的英文不全大写（拼音大写名直接删）' });
    else if (fs <= 18 && /^[A-Z][A-Z .'’-]{2,}$/.test(txt) && /[A-Z]{3}/.test(txt)) notes.push({ t: '大写英文', s: snip, d: `${fs}px 全大写英文：中文品牌编的拼音名删掉，真英文名不全大写` });
    else if (fs < 14 && /[A-Z]{3}/.test(txt) && /^[A-Z0-9][A-Z0-9 &.'’-]{2,}$/.test(txt)) issues.push({ t: '大写小字', s: snip, d: `${fs}px 全大写英文：删掉或换成中文正常字` });
    if (txt.length <= 14 && NUMBERED.test(txt)) issues.push({ t: '编号', s: snip, d: '给区块、页面、期数编号的小标签：删掉' });
    if (CLICHE.test(txt)) notes.push({ t: '套话', s: snip, d: `「${txt.match(CLICHE)[1]}」：换成具体的事实` });
    if (FAKE.test(txt)) notes.push({ t: '假数据', s: snip, d: '整数假数据：换成像真的数字' });
    texts.push({ el, r: textRect(el, r), fs, txt, all: (el.textContent || '').trim() });
  }
  // 眉题：大标题正上方贴着的一行小字；副标题：大标题正下方贴着的一行没有数字的小字
  const wordy = (t) => { const d = (t.match(/[\d.,:%¥￥$]/g) || []).length; return d / t.length < 0.5; };
  function eyebrows(texts, issues, notes) {
    // 浮层和下面的页面不是一层：只拿同一层里的字配对（浮层里的小字压在页面大标题上不算眉题）
    const lay = (t) => (t.lay === undefined ? (t.lay = t.el.closest('.as-layer') || null) : t.lay);
    const heads = texts.filter((b) => b.fs >= 24 && wordy(b.txt));
    const nums = texts.filter((b) => b.fs >= 32 && !wordy(b.txt));
    // 压在大数字正上方的说明词：守则要求放在数字右边或下面
    for (const a of texts) {
      if (a.fs > 15 || a.txt.length > 12 || a.el.closest('[data-dot]')) continue;
      const b = nums.find((n) => lay(n) === lay(a) && !n.el.contains(a.el) && !a.el.contains(n.el) && a.r.left < n.r.right && a.r.right > n.r.left && n.r.top - a.r.bottom >= -2 && n.r.top - a.r.bottom <= 16);
      // 它正上方紧贴着另一个大数字时，它是那个数字下面的说明，不算
      const owner = b && nums.find((n) => n !== b && lay(n) === lay(a) && a.r.left < n.r.right && a.r.right > n.r.left && a.r.top - n.r.bottom >= -2 && a.r.top - n.r.bottom <= 12);
      if (b && !owner) issues.push({ t: '数字眉题', s: a.txt.slice(0, 18), d: `压在「${b.txt.slice(0, 8)}」上面的说明词：挪到数字右边或下面` });
    }
    for (const a of texts) {
      if (a.fs > 15 || a.txt.length > 20 || a.el.closest('[data-dot]')) continue;
      for (const b of heads) {
        if (b.fs < Math.max(24, a.fs * 1.8) || lay(b) !== lay(a) || b.el.contains(a.el) || a.el.contains(b.el)) continue;
        const hx = a.r.left >= b.r.left - 6 && a.r.left <= b.r.right && a.r.right >= b.r.left;
        if (!hx) continue;
        const above = b.r.top - a.r.bottom; const below = a.r.top - b.r.bottom;
        if (above >= -2 && above <= 24) { issues.push({ t: '眉题', s: a.txt.slice(0, 18), d: `压在「${b.txt.slice(0, 8)}」上面的小字：删掉，分类放进顶栏或筛选项` }); break; }
        if (below >= -2 && below <= 20 && a.txt.length >= 6 && !/\d/.test(a.all)) { notes.push({ t: '副标题', s: a.txt.slice(0, 18), d: `「${b.txt.slice(0, 8)}」下面没有数字的一行小字：是口号、说明就删` }); break; }
      }
    }
  }
  document.querySelectorAll('.one').forEach((one) => {
    const root = one.firstElementChild || one;
    const R = one.getBoundingClientRect();
    const issues = [];
    const notes = [];
    let count = 0;
    const seenFam = new Set();
    const seenMono = new Set();
    const texts = [];
    root.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const txt = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
      if (!el.children.length || txt) count++;
      const lib = libWhy(el, cs);
      if (lib) issues.push({ t: '图标库', s: (txt || el.getAttribute('class') || el.tagName.toLowerCase()).slice(0, 18), d: `${lib}：${LIB_HINT}` });
      if (!el.closest(PUBLIC_UI)) aiLook(el, cs, r, txt, issues, notes, seenMono, texts);
      if (!txt) return;
      const snip = txt.slice(0, 18);
      const bleed = el.closest('[data-bleed]');
      if (!bleed && (r.right > R.right + 1 || r.left < R.left - 1 || r.bottom > R.bottom + 1 || r.top < R.top - 1)) {
        // 只报真看得见的：被祖先 overflow 裁掉的也算出界
        issues.push({ t: '出界', s: snip, d: `${Math.round(r.left - R.left)},${Math.round(r.top - R.top)} ${Math.round(r.width)}×${Math.round(r.height)}` });
      }
      if ((cs.overflow.includes('hidden') || cs.textOverflow === 'ellipsis') && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2) && !bleed) {
        issues.push({ t: '截断', s: snip, d: `内容 ${el.scrollWidth}×${el.scrollHeight} 框 ${el.clientWidth}×${el.clientHeight}` });
      }
      const fs = parseFloat(cs.fontSize);
      if (fs < 11) issues.push({ t: '字太小', s: snip, d: fs + 'px' });
      const fam = cs.fontFamily.split(',')[0].trim().replace(/["']/g, '');
      if (!seenFam.has(fam)) {
        seenFam.add(fam);
        if (declared.has(fam)) {
          const fl = [...document.fonts].filter((f) => f.family.replace(/["']/g, '') === fam);
          if (fl.some((f) => f.status === 'loaded')) { /* 生效 */ }
          else if (fl.some((f) => f.status === 'error')) issues.push({ t: '字体载入失败', s: snip, d: fam });
          else issues.push({ t: '字体没生效', s: snip, d: fam });
        } else if (GEN.test(fam)) { /* 通用写法 */ }
        else if (SYS.test(fam)) { if (!famOk(fam, cs.fontWeight, cs.fontStyle)) issues.push({ t: '系统里没有这款字体', s: snip, d: fam }); }
        else issues.push({ t: '字体没声明', s: snip, d: fam + '（fonts.css 里没有，也不是系统字体）' });
      }
    });
    root.querySelectorAll('img').forEach((i) => { if (!i.naturalWidth) issues.push({ t: '图片没载入', s: i.src.slice(-40), d: '' }); });
    // 字体串的双引号写进 style="…" 会把属性截断，样式悄悄失效，这里能查出来
    [root, ...root.querySelectorAll('*')].forEach((el) => { for (const a of el.attributes) if (!/^[a-zA-Z_:][-\w:.]*$/.test(a.name)) issues.push({ t: '属性被截断', s: a.name.slice(0, 18), d: el.tagName.toLowerCase() + '（style 里的双引号换成单引号）' }); });
    for (const d of LIB_DOC) issues.push({ t: '图标库', s: '页面', d: `${d}：${LIB_HINT}` });
    eyebrows(texts, issues, notes);
    rep[one.dataset.s] = { 元素: count, 问题: issues, 提醒: notes };
  });
  const pre = document.createElement('pre');
  pre.id = 'report';
  pre.textContent = JSON.stringify(rep);
  document.body.prepend(pre);
})();
