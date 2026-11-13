// 图标总览图和自查：node icons/sheet.js [组名|all] [--out 目录] [--stroke 1.5,2.6] [--fill none|tint|solid] [--cap round|square] [--join round|miter] [--dark]
// 每个图标排四个：24px 和 48px 两种大小，各用两种线宽；48px 的底下垫着安全边和中线。没画的名字留空框。
// 同时检查：只用允许的标签和属性、几何不出 2 到 22 的安全边、元素数、别名，以及和 lucide 有没有逐元素重合（照描的会报；
// 比对用的图库不随工具安装，出图目录里有 node_modules/lucide-static 时才比对）。
// 只用无头 Chrome，不开窗口。结果是 <out>/icons-<组名>.png，问题打在终端里，要做到零。
const fs = require('fs');
const os = require('os');
const path = require('path');
const { launch, connect, page, open } = require('../shot');
const NAMES = require('./names');
const I = require('./index');

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const flag = (k) => argv.includes('--' + k);
const G = argv[0] && !argv[0].startsWith('--') ? argv[0] : 'all';
const OUT = path.resolve(opt('out', path.join(__dirname, '.out')));
const STROKES = opt('stroke', '1.5,2.6').split(',').map(Number);
const FILL = opt('fill', 'none');
const CAP = opt('cap', 'round');
const JOIN = opt('join', 'round');
const DARK = flag('dark');
if (G !== 'all' && !NAMES[G]) { console.log(`没有这一组：${G}（有 ${Object.keys(NAMES).join('、')}、all）`); process.exit(1); }

const groups = G === 'all' ? Object.keys(NAMES) : [G];
const { icons, alias, from } = I.load(true);

// ---------- 静态检查 ----------
const TAGS = new Set(['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon']);
const ATTRS = new Set(['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'points', 'class']);
const CLASSES = new Set(['t', 'k', 's', 'sk']);
const elems = (s) => [...s.matchAll(/<([a-z]+)\b([^>]*?)\/?>/g)].map((m) => ({ tag: m[1], attrs: Object.fromEntries([...m[2].matchAll(/([a-z0-9-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])), raw: m[0] }));
const nums = (s) => (s.match(/-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/gi) || []).map(Number);
const toks = (s) => (s.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) || []).map((t) => (/[a-zA-Z]/.test(t) ? t : String(Math.round(Number(t) * 100) / 100))).join(' ');
const GEO = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'points'];
const sig = (e) => e.tag + '|' + GEO.filter((k) => k in e.attrs).map((k) => k + '=' + (k === 'd' || k === 'points' ? toks(e.attrs[k]) : toks(e.attrs[k]))).join(';');
// 「有形状的」一笔：带曲线或圆弧，或者折了三次以上。只重合几条直线、标准圆框不算照描
const shaped = (e) => (e.tag === 'path' && /[aAcCqQsStT]/.test(e.attrs.d || '')) || ((e.tag === 'path' || e.tag === 'polyline' || e.tag === 'polygon') && nums(e.attrs.d || e.attrs.points || '').length >= 8);

const LUCIDE = path.join(__dirname, '../node_modules/lucide-static/icons');
const lucide = new Map(); // 键是元素签名，值是用到它的 lucide 图标名
if (fs.existsSync(LUCIDE)) {
  for (const f of fs.readdirSync(LUCIDE)) {
    if (!f.endsWith('.svg')) continue;
    const n = f.slice(0, -4);
    for (const e of elems(fs.readFileSync(path.join(LUCIDE, f), 'utf8'))) {
      if (!TAGS.has(e.tag)) continue;
      const k = sig(e); if (!lucide.has(k)) lucide.set(k, []); lucide.get(k).push(n);
    }
  }
}

const problems = []; const notes = [];
const P = (n, t) => problems.push(`问题  ${n}  ${t}`);
const N = (n, t) => notes.push(`提醒  ${n}  ${t}`);
const planned = new Set(Object.values(NAMES).flatMap((g) => [...g.used, ...g.extra]));
for (const n of Object.keys(icons)) if (!planned.has(n)) N(n, `不在 names.js 的清单里（画在 ${from[n]}.js）`);
for (const g of groups) {
  for (const n of [...NAMES[g].used, ...NAMES[g].extra]) {
    if (!(n in icons)) continue;
    if (from[n] !== g && !alias[n]) N(n, `清单在 ${g}，画在了 ${from[n]}.js`);
    if (alias[n]) continue;
    const s = icons[n];
    const es = elems(s);
    const rest = s.replace(/<([a-z]+)\b[^>]*?\/?>/g, '').replace(/<\/[a-z]+>/g, '').trim();
    if (rest) P(n, `标签外面有多余的字「${rest.slice(0, 30)}」`);
    if (!es.length) P(n, '是空的');
    for (const e of es) {
      if (!TAGS.has(e.tag)) P(n, `不许用 <${e.tag}>（只用 path、circle、ellipse、rect、line、polyline、polygon）`);
      for (const [k, v] of Object.entries(e.attrs)) {
        if (!ATTRS.has(k)) P(n, `不许写属性 ${k}（颜色、线宽、端点都由外层定，淡色和挖空用 class）`);
        if (k === 'class' && !v.split(/\s+/).every((c) => CLASSES.has(c))) P(n, `class 只能是 t、k、s、sk，写了「${v}」`);
      }
      if (/\d\.\d{3,}/.test(e.raw)) N(n, '坐标有三位以上小数：只用整数和 .5（圆弧端点算出来的可以到两位）');
    }
    const draw = es.filter((e) => e.attrs.class !== 't');
    if (draw.length > 5) P(n, `线条元素 ${draw.length} 个，最多 5 个（细节要少）`);
    else if (draw.length > 4) N(n, `线条元素 ${draw.length} 个，能并成一笔的并掉`);
    // 和 lucide 逐元素比
    const tally = {}; const tallyShaped = {};
    for (const e of draw) {
      const hit = lucide.get(sig(e)); if (!hit) continue;
      for (const l of new Set(hit)) { tally[l] = (tally[l] || 0) + 1; if (shaped(e)) tallyShaped[l] = (tallyShaped[l] || 0) + 1; }
    }
    for (const [l, c] of Object.entries(tally)) {
      if (c * 2 >= draw.length && tallyShaped[l]) P(n, `和 lucide 的「${l}」有 ${c}/${draw.length} 笔一模一样，这是照描，按 SPEC.md 从关键形重画`);
      else if (tallyShaped[l]) N(n, `有一笔和 lucide 的「${l}」一模一样，自己画一笔`);
    }
  }
}

// ---------- 页面 ----------
const ink = DARK ? '#ECEAE6' : '#1C1B19';
const bg = DARK ? '#1B1C1F' : '#F5F3EF';
const mut = DARK ? '#8C8F96' : '#8A867F';
const card = DARK ? '#24262A' : '#FFFFFF';
const key = `<svg class="key" viewBox="0 0 24 24" width="48" height="48"><rect x="2" y="2" width="20" height="20" fill="none" stroke="${ink}" stroke-opacity=".13" stroke-width=".5"/><path d="M12 0v24M0 12h24" stroke="${ink}" stroke-opacity=".08" stroke-width=".5"/><circle cx="12" cy="12" r="10" fill="none" stroke="${ink}" stroke-opacity=".08" stroke-width=".5"/></svg>`;
const one = (n, size, st) => {
  const o = { size, stroke: st, cap: CAP, join: JOIN, extra: `data-n="${n}" data-s="${size}"` };
  if (FILL !== 'none') { o.fill = FILL; if (FILL === 'solid') o.cut = card; }
  return I.svg(n, o);
};
const cell = (n) => {
  const has = n in icons;
  const v = has ? STROKES.map((st) => one(n, 24, st)).join('') + STROKES.map((st) => `<span class="k48">${key}${one(n, 48, st)}</span>`).join('') : '<span class="none"></span>';
  const bad = problems.some((p) => p.startsWith(`问题  ${n}  `));
  return `<div class="cell${has ? '' : ' miss'}${bad ? ' bad' : ''}"><div class="v">${v}</div><div class="nm">${n}${alias[n] ? `<em>同 ${alias[n]}</em>` : ''}${!has ? '<em>没画</em>' : ''}${bad ? '<em>有问题</em>' : ''}</div></div>`;
};
const sections = groups.map((g) => {
  const list = [...NAMES[g].used, ...NAMES[g].extra];
  const done = list.filter((n) => n in icons).length;
  return `<h2>${NAMES[g].title}<span>${g}.js，画了 ${done} 个，共 ${list.length} 个</span></h2><div class="grid">${list.map(cell).join('')}</div>`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:28px 32px 36px;background:${bg};color:${ink};font:14px/1.4 "PingFang SC","Helvetica Neue",Helvetica,Arial,sans-serif}
h1{font-size:20px;margin:0 0 4px}h1+p{margin:0 0 18px;color:${mut}}
h2{font-size:17px;margin:26px 0 12px}h2 span{font-weight:400;color:${mut};margin-left:14px;font-size:14px}
.grid{display:grid;grid-template-columns:repeat(5,212px);gap:14px 18px}
.cell{padding:10px 10px 8px;border-radius:10px;background:${card}}
.cell.bad{outline:2px dashed #D0442E}
.v{display:flex;align-items:flex-end;gap:12px;height:48px}
.k48{position:relative;width:48px;height:48px}.k48 svg{position:absolute;left:0;top:0}
.none{width:184px;height:46px;border:1.5px dashed ${mut};border-radius:6px;opacity:.5}
.miss .nm{color:${mut}}
.nm{margin-top:8px;font-size:13px}.nm em{font-style:normal;color:${mut};margin-left:8px}.bad .nm em:last-child{color:#D0442E;font-weight:600}
</style><body><h1>图标总览</h1><p>每个图标四份：24px 和 48px，线宽 ${STROKES.join(' 和 ')}；端点 ${CAP === 'round' ? '圆' : '方'}，转角 ${JOIN === 'round' ? '圆' : '尖'}，${{ none: '不填色', tint: '淡色填充', solid: '实心' }[FILL] || '填 ' + FILL}</p>${sections}
<script>
// 量每个 24px 图标的几何范围（不含线宽），超出 2 到 22 的记下来
window.__bbox = [...document.querySelectorAll('svg[data-s="24"]')].filter((s, i, a) => a.findIndex((x) => x.dataset.n === s.dataset.n) === i).map((s) => {
  let x0 = 99, y0 = 99, x1 = -99, y1 = -99;
  for (const e of s.querySelectorAll('path,circle,ellipse,rect,line,polyline,polygon')) { const b = e.getBBox(); x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height); }
  return { n: s.dataset.n, b: [x0, y0, x1, y1].map((v) => Math.round(v * 100) / 100) };
});
</script>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const name = `icons-${G}${FILL !== 'none' ? '-' + FILL : ''}${CAP !== 'round' || JOIN !== 'round' ? '-' + CAP + '-' + JOIN : ''}${DARK ? '-dark' : ''}`;
  const htmlFile = path.join(OUT, name + '.html');
  fs.writeFileSync(htmlFile, html);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vs-icons-'));
  const { ch, ws } = await launch(tmp);
  let code = 0;
  try {
    const cdp = await connect(ws);
    const pg = await page(cdp);
    const W = 32 * 2 + 5 * 212 + 4 * 18;
    await pg.s('Emulation.setDeviceMetricsOverride', { width: W, height: 800, deviceScaleFactor: 2, mobile: false });
    await open(cdp, pg, 'file://' + htmlFile);
    const ev = async (x) => (await pg.s('Runtime.evaluate', { expression: x, returnByValue: true })).result.value;
    const H = await ev('document.documentElement.scrollHeight');
    await pg.s('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: false });
    for (const { n, b } of await ev('window.__bbox')) {
      const [x0, y0, x1, y1] = b;
      if (x0 < 1.99 || y0 < 1.99 || x1 > 22.01 || y1 > 22.01) P(n, `出了安全边：几何范围 x ${x0} 到 ${x1}，y ${y0} 到 ${y1}（要在 2 到 22 之间）`);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      if (Math.abs(cx - 12) > 1.01 || Math.abs(cy - 12) > 1.51) N(n, `没居中：外框中心在 (${cx.toFixed(1)}, ${cy.toFixed(1)})，确实要偏（三角形下沉、带尾巴的气泡）就留着`);
    }
    const { data } = await pg.s('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(data, 'base64'));
    await Promise.race([pg.close(), new Promise((r) => setTimeout(r, 2000))]);
    cdp.close();
  } catch (e) { console.log('出图失败：' + e.message); code = 1; }
  ch.kill();
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* 留着也不碍事 */ }
  const all = groups.flatMap((g) => [...NAMES[g].used, ...NAMES[g].extra]);
  const done = all.filter((n) => n in icons).length;
  const pr = [...new Set(problems)]; const nt = [...new Set(notes)];
  for (const x of [...pr, ...nt]) console.log(x);
  console.log(`${G === 'all' ? '全部' : NAMES[G].title}：画了 ${done} 个，共 ${all.length} 个；${pr.length ? `${pr.length} 处问题，要改到零` : '没有问题'}${nt.length ? `，${nt.length} 条提醒逐条看` : ''}`);
  if (code === 0) console.log(path.join(OUT, name + '.png'));
  process.exit(code);
})();
