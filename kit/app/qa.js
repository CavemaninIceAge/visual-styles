// 应用检查：node app/qa.js <项目目录> [--no-shots]
// 先跑过 build.js。在本机起一个静态服务器开 out/site/，无头 Chrome 在电脑（1440×900）和手机（390×844，触屏）两种尺寸下
// 各把 flows.js 里的主流程真的点一遍、打一遍字：每一步要点得到、没被挡住、点了有反应；控制台不许报错；
// 每走到一屏新的（或打开一个浮层）就跑一次 kit/check.js 的自动检查，并截一张图放 out/qa/
// flows.js 写法见技能的 起手包约定.md「应用外壳」一节
const fs = require('fs');
const path = require('path');
const http = require('http');
const { launch, connect, page } = require('../shot');

const P = path.resolve(process.argv[2] || '.');
const SHOTS = !process.argv.includes('--no-shots');
const SITE = path.join(P, 'out', 'site');
const OUT = path.join(P, 'out', 'qa');
const CHECK = fs.readFileSync(path.join(__dirname, '..', 'check.js'), 'utf8');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (!fs.existsSync(path.join(SITE, 'index.html'))) { console.log('没有 out/site：先组装（tools/app.sh build）'); process.exit(1); }
const flowsFile = path.join(P, 'flows.js');
if (!fs.existsSync(flowsFile)) { console.log('没有 flows.js：写上主流程才能检查'); process.exit(1); }
const FL = require(flowsFile);
const FLOWS = FL.flows || [];
const VISIT = FL.visit || [];
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.otf': 'font/otf', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  const f = path.join(SITE, u === '/' ? 'index.html' : u);
  if (!f.startsWith(SITE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});

const VIEWS = [['电脑', 1440, 900, false], ['手机', 390, 844, true]];

async function run() {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const BASE = `http://127.0.0.1:${server.address().port}/index.html?qa=1`;
  const { ch, ws } = await launch(path.join(P, 'out'));
  const cdp = await connect(ws);
  const report = { views: {} };
  let bad = 0; let warn = 0;
  try {
    for (const [label, W, H, mobile] of VIEWS) {
      const pg = await page(cdp);
      const s = pg.s;
      let errs = [];
      cdp.on((m) => {
        if (m.sessionId !== pg.sessionId) return;
        if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails; errs.push(((d.exception && d.exception.description) || d.text || '').split('\n').slice(0, 2).join(' ')); }
        if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errs.push(m.params.args.map((a) => a.value || a.description || '').join(' ').slice(0, 300));
        if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errs.push('载入失败：' + m.params.entry.text + ' ' + (m.params.entry.url || ''));
      });
      await s('Log.enable');
      await s('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: mobile ? 2 : 1, mobile });
      await s('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: mobile ? 5 : 1 });
      const ev = async (expr) => { const r = await s('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text); return r.result.value; };
      const settle = async () => { for (let i = 0; i < 40; i++) { await sleep(60); if (await ev('!window.__asBusy && !!window.__asReady').catch(() => false)) break; } await sleep(120); };
      const loadAt = async (hash) => {
        const loaded = new Promise((r) => { const h = (m) => { if (m.sessionId === pg.sessionId && m.method === 'Page.loadEventFired') r(); }; cdp.on(h); });
        await s('Page.navigate', { url: 'about:blank' });   // 同一地址只换 # 后面不会重新载入，先清空
        await sleep(50);
        await s('Page.navigate', { url: BASE + (hash ? '#/' + hash : '') });
        await Promise.race([loaded, sleep(15000)]);
        for (let i = 0; i < 100; i++) { await sleep(80); if (await ev('!!window.__asReady').catch(() => false)) break; }
        await ev('document.fonts.ready.then(() => 1)').catch(() => 0);
        await settle();
      };
      const V = (report.views[label] = { flows: [], screens: [], errors: [] });
      const checked = new Set();
      let shotN = 0;
      // 当前这一屏：地址 + 打开的浮层，没查过就查一次
      async function checkHere(tag) {
        const st = await ev(`JSON.stringify({ p: window.__as.route.path, o: [...document.querySelectorAll('.as-ov')].map((e) => [...e.classList].find((c) => c.startsWith('ov-')) || 'ov').join(',') })`);
        const { p, o } = JSON.parse(st);
        const key = p + (o ? ' +' + o : '');
        if (checked.has(key)) return;
        checked.add(key);
        let file = '';
        if (SHOTS) {
          shotN++;
          file = path.join(OUT, `${mobile ? 'm' : 'd'}-${String(shotN).padStart(2, '0')}-${key.replace(/[^\w-]+/g, '_')}.png`);
          const r = await s('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
        }
        await ev(`(() => { const s = document.querySelector('[data-as-screen]'); document.documentElement.classList.add('as-flat'); s.parentElement.classList.add('one'); s.parentElement.dataset.s = 'x'; const r = document.getElementById('report'); if (r) r.remove(); return 1; })()`);
        await sleep(60);
        await ev(CHECK);
        let rep = null;
        for (let i = 0; i < 60 && !rep; i++) { await sleep(80); const t = await ev(`(document.getElementById('report') || {}).textContent || ''`); if (t) rep = JSON.parse(t).x; }
        await ev(`(() => { const r = document.getElementById('report'); if (r) r.remove(); document.documentElement.classList.remove('as-flat'); const o = document.querySelector('.one'); if (o) { o.classList.remove('one'); delete o.dataset.s; } return 1; })()`);
        await settle();
        rep = rep || { 元素: 0, 问题: [{ t: '检查没跑完', s: '', d: '' }], 提醒: [] };
        V.screens.push({ key, tag, file, ...rep });
      }
      // 找到要点的东西：选择器，或者按字找能点的元素（有浮层时只在最上面的浮层里找）
      const FIND = (target, nth) => `(() => {
        const t = ${JSON.stringify(target)}; const nth = ${nth | 0};
        document.querySelectorAll('[data-qa-t]').forEach((e) => e.removeAttribute('data-qa-t'));
        const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        let list;
        if (/^[.#\\[]|^[a-z]+[.#\\[]/.test(t)) list = [...document.querySelectorAll(t)].filter(vis);
        else {
          const ovs = [...document.querySelectorAll('.as-ov')];
          const scope = ovs.length ? ovs[ovs.length - 1] : document;
          const all = [...scope.querySelectorAll('[data-act],[data-go],[data-back],button,a,label,[role=button]')].filter(vis);
          const txt = (e) => (e.innerText || e.textContent || '').replace(/\\s+/g, ' ').trim();
          list = all.filter((e) => txt(e) === t);
          if (!list.length) list = all.filter((e) => txt(e).includes(t));
          list = list.filter((e) => !list.some((x) => x !== e && e.contains(x)));
        }
        const el = list[nth];
        if (!el) return JSON.stringify({ miss: list.length });
        el.setAttribute('data-qa-t', '1');
        el.scrollIntoView({ block: 'center', inline: 'nearest' });
        const r = el.getBoundingClientRect();
        const x = r.left + r.width / 2, y = r.top + Math.min(r.height / 2, 20);
        const hit = document.elementFromPoint(x, y);
        const ok = hit && (el === hit || el.contains(hit) || hit.contains(el));
        window.__qaHit = null;
        document.addEventListener('click', (ev) => { window.__qaHit = ev.target; }, { capture: true, once: true });
        return JSON.stringify({ x, y, ok, by: ok ? '' : (hit ? (hit.className && hit.className.baseVal === undefined ? hit.tagName.toLowerCase() + '.' + String(hit.className).split(' ')[0] : hit.tagName.toLowerCase()) : '窗口外'), n: list.length });
      })()`;
      async function tap(target, nth = 0) {
        const f = JSON.parse(await ev(FIND(target, nth)));
        if (f.miss != null) return `找不到「${target}」`;
        if (!f.ok) return `「${target}」被挡住了（点到的是 ${f.by}）`;
        if (mobile) {
          await s('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: f.x, y: f.y }] });
          await s('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        } else {
          await s('Input.dispatchMouseEvent', { type: 'mouseMoved', x: f.x, y: f.y });
          await s('Input.dispatchMouseEvent', { type: 'mousePressed', x: f.x, y: f.y, button: 'left', clickCount: 1 });
          await s('Input.dispatchMouseEvent', { type: 'mouseReleased', x: f.x, y: f.y, button: 'left', clickCount: 1 });
        }
        await sleep(50);
        const hit = await ev(`(() => { const t = document.querySelector('[data-qa-t]'); const h = window.__qaHit; return !!h && (!t || t === h || t.contains(h) || !document.contains(h) || h.contains(t)); })()`);
        if (!hit) return `点了「${target}」没有反应`;
        await settle();
        return '';
      }
      const asSel = (t) => (/^[\w.-]+$/.test(t) ? `[data-model="${t}"]` : t);
      async function step(st) {
        const [k, a, b] = st;
        if (k === 'go') { await ev(`location.hash = ${JSON.stringify('#/' + a)}; 1`); await settle(); return ''; }
        if (k === 'tap') return tap(a, b || 0);
        if (k === 'type') {
          const e = await tap(asSel(a)); if (e) return e;
          await ev(`(() => { const el = document.querySelector('[data-qa-t]'); const i = el.matches('input,textarea') ? el : el.querySelector('input,textarea'); i.focus(); i.select && i.select(); return 1; })()`);
          await s('Input.insertText', { text: String(b) });
          await settle();
          const v = await ev(`(() => { const el = document.querySelector(${JSON.stringify(asSel(a))}); const i = el && (el.matches('input,textarea') ? el : el.querySelector('input,textarea')); return i ? i.value : null; })()`);
          return v === String(b) ? '' : `「${a}」里打字没进去（现在是「${v}」）`;
        }
        if (k === 'pick') {
          const ok = await ev(`(() => { const el = document.querySelector(${JSON.stringify(asSel(a))}); if (!el) return false; el.value = ${JSON.stringify(String(b))}; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); return el.value === ${JSON.stringify(String(b))}; })()`);
          await settle();
          return ok ? '' : `「${a}」选不到「${b}」`;
        }
        if (k === 'see' || k === 'nosee') {
          let has = false;
          for (let i = 0; i < 10; i++) { has = await ev(`document.getElementById('as-root').innerText.replace(/\\s+/g, ' ').includes(${JSON.stringify(a)})`); if (has === (k === 'see')) break; await sleep(100); }
          if (k === 'see' && !has) return `页面上没看到「${a}」`;
          if (k === 'nosee' && has) return `页面上不该再有「${a}」`;
          return '';
        }
        if (k === 'end') {
          const n = await ev('window.__as.ends.length');
          if (n < 2) return '只有一端，不用切换';
          if (await ev('window.__as.route.end') === a) return '';
          if (mobile) { const e = await tap('.as-handle'); if (e) return e; return tap(`.as-sw-i[data-end="${a}"]`); }
          return tap(`.as-seg [data-end="${a}"]`);
        }
        if (k === 'back') return tap('[data-back]');
        if (k === 'reload') { await s('Page.reload', {}); for (let i = 0; i < 100; i++) { await sleep(80); if (await ev('!!window.__asReady').catch(() => false)) break; } await settle(); return ''; }
        if (k === 'wait') { await sleep(a || 300); return ''; }
        return '不认识的步骤：' + k;
      }
      const label2 = (st) => st.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' ');
      for (const fl of FLOWS) {
        const only = fl.only;
        if (only && only !== (mobile ? 'phone' : 'desk')) continue;
        await loadAt(fl.start || '');
        await ev('localStorage.clear(); 1');
        await loadAt(fl.start || '');
        errs = [];
        const R = { name: fl.name, steps: fl.steps.length, fail: '', errors: [] };
        await checkHere('开始');
        for (let i = 0; i < fl.steps.length; i++) {
          const st = fl.steps[i];
          const e = await step(st).catch((x) => '出错：' + x.message);
          if (e) {
            const at = await ev('location.hash').catch(() => '');
            R.fail = `第 ${i + 1} 步（${label2(st)}）：${e}（当时在 ${at}）`;
            const r = await s('Page.captureScreenshot', { format: 'png' });
            R.shot = path.join(OUT, `${mobile ? 'm' : 'd'}-fail-${V.flows.length + 1}.png`);
            fs.writeFileSync(R.shot, Buffer.from(r.data, 'base64'));
            break;
          }
          if (['tap', 'go', 'end', 'back', 'reload'].includes(st[0])) await checkHere(label2(st));
        }
        R.errors = [...new Set(errs)];
        V.flows.push(R);
      }
      for (const r of VISIT) { await loadAt(r); await checkHere('visit'); }
      V.errors = [...new Set(errs)];
      await pg.close();
    }
  } finally { cdp.close(); ch.kill(); server.close(); }

  // 汇总
  for (const [label, V] of Object.entries(report.views)) {
    const [, W, H] = VIEWS.find((v) => v[0] === label);
    console.log(`${label} ${W}×${H}`);
    for (const f of V.flows) {
      if (f.fail) bad++;
      bad += f.errors.length;
      console.log(`  流程「${f.name}」：${f.fail || `${f.steps} 步都走通`}${f.errors.length ? `；控制台报错 ${f.errors.length} 条` : ''}`);
      if (f.shot) console.log('     出错时的截图  ' + f.shot);
      f.errors.slice(0, 5).forEach((x) => console.log('     报错  ' + x));
    }
    for (const sc of V.screens) {
      const q = sc.问题 || []; const t = sc.提醒 || [];
      bad += q.length; warn += t.length;
      if (q.length || t.length) console.log(`  ${sc.key}：${sc.元素} 个元素${q.length ? `，${q.length} 处问题` : ''}${t.length ? `，${t.length} 条提醒` : ''}`);
      q.slice(0, 10).forEach((x) => console.log(`     问题  ${x.t}「${x.s}」${x.d}`));
      t.slice(0, 5).forEach((x) => console.log(`     提醒  ${x.t}「${x.s}」${x.d}`));
    }
    console.log(`  查了 ${V.screens.length} 屏`);
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  if (SHOTS) console.log('截图：' + OUT);
  console.log('应用检查：' + (bad ? `共 ${bad} 处问题，要改到零` : '没有问题') + (warn ? `；${warn} 条提醒，逐条看` : ''));
  process.exit(bad ? 1 : 0);
}
setTimeout(() => { console.log('应用检查超过 5 分钟，停了'); process.exit(1); }, 300000).unref();
run().catch((e) => { console.log('应用检查失败：' + e.message); process.exit(1); });
