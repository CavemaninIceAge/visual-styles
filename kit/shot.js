// 截图：node shot.js <项目目录> [屏幕编号,…]
// 用 Chrome 调试协议设定精确的视口再截。不用 chrome --screenshot：新版无头模式的窗口比 --window-size 矮约 100px、
// 最窄 500px，截出来的图底部几十行是页面顶部卷回来的内容，自动检查也查不出来。
// 只用无头 Chrome，不开窗口、不抢焦点。Node 22 以上自带 WebSocket，不需要第三方库。
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const P = path.resolve(process.argv[2] || '.');
const ONLY = (process.argv[3] || '').split(',').filter(Boolean);
const OUT = path.join(P, 'out');
const CHROME = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => fs.existsSync(p));
const SCALE = 2;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function launch(dir = P) {
  if (!CHROME) throw new Error('找不到 Chrome：装 Google Chrome 或 Chromium，或者设环境变量 CHROME');
  const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${path.join(dir, '.chrome')}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  return new Promise((res, rej) => {
    let buf = '';
    const t = setTimeout(() => rej(new Error('Chrome 30 秒没起来')), 30000);
    ch.stderr.on('data', (d) => {
      buf += d;
      const m = buf.match(/DevTools listening on (ws:\S+)/);
      if (m) { clearTimeout(t); res({ ch, ws: m[1] }); }
    });
    ch.on('exit', (c) => { clearTimeout(t); rej(new Error('Chrome 退出了：' + c + '\n' + buf.slice(-400))); });
  });
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0; const wait = new Map(); const hooks = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && wait.has(m.id)) {
      const { ok, no } = wait.get(m.id); wait.delete(m.id);
      if (m.error) no(new Error(m.error.message)); else ok(m.result);
    } else hooks.forEach((h) => h(m));
  };
  const send = (method, params = {}, sessionId) => new Promise((ok, no) => {
    const n = ++id; wait.set(n, { ok, no });
    ws.send(JSON.stringify({ id: n, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
  return new Promise((res, rej) => {
    ws.onopen = () => res({ send, on: (h) => hooks.push(h), close: () => ws.close() });
    ws.onerror = () => rej(new Error('连不上 Chrome 调试口'));
  });
}

async function page(cdp) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => cdp.send(m, p, sessionId);
  await s('Page.enable');
  await s('Runtime.enable');
  return { s, sessionId, close: () => cdp.send('Target.closeTarget', { targetId }) };
}

// 打开页面，等字体和图片都到位
async function open(cdp, pg, url) {
  const loaded = new Promise((r) => cdp.on((m) => { if (m.sessionId === pg.sessionId && m.method === 'Page.loadEventFired') r(); }));
  await pg.s('Page.navigate', { url });
  await Promise.race([loaded, sleep(20000)]);
  await pg.s('Runtime.evaluate', {
    awaitPromise: true,
    expression: `(async()=>{await document.fonts.ready;
      await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));
      const urls=[...document.querySelectorAll('[style*="background"]')].flatMap(e=>[...getComputedStyle(e).backgroundImage.matchAll(/url\\("([^"]+)"\\)/g)].map(m=>m[1])).filter(u=>!u.startsWith('data:'));
      await Promise.all([...new Set(urls)].map(u=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=u})));
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));})()`,
  });
  await sleep(250);
}

async function capture(cdp, pg, url, w, h, file) {
  await pg.s('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: SCALE, mobile: false });
  await open(cdp, pg, url);
  const { data } = await pg.s('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(file, Buffer.from(data, 'base64'));
}

async function main() {
  const screens = JSON.parse(fs.readFileSync(path.join(OUT, 'screens.json'), 'utf8'));
  const board = JSON.parse(fs.readFileSync(path.join(OUT, 'board.json'), 'utf8'));
  fs.mkdirSync(path.join(OUT, 'png'), { recursive: true });
  const { ch, ws } = await launch();
  let code = 0;
  try {
    const cdp = await connect(ws);
    const pg = await page(cdp);
    const ids = Object.keys(screens);
    const wrong = ONLY.filter((x) => !ids.includes(x));
    if (wrong.length) throw new Error(`没有这一屏：${wrong.join('、')}（屏幕编号有 ${ids.join('、')}）`);
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (ONLY.length && !ONLY.includes(id)) continue;
      const [w, h] = screens[id];
      const f = path.join(OUT, 'png', `${String(i + 1).padStart(2, '0')}-${id}.png`);
      await capture(cdp, pg, `file://${OUT}/screens.html?s=${encodeURIComponent(id)}`, w, h, f);
    }
    if (!ONLY.length) await capture(cdp, pg, `file://${OUT}/board.html`, board.w, board.h, path.join(OUT, 'board.png'));
    await Promise.race([pg.close(), sleep(2000)]);
    cdp.close();
  } catch (e) {
    console.log('出图失败：' + e.message);
    code = 1;
  }
  ch.kill();
  process.exit(code);
}

// 整个截图最多 3 分钟，Chrome 挂住也不能把 render.sh 卡死
if (require.main === module) setTimeout(() => { console.log('出图失败：超过 3 分钟'); process.exit(1); }, 180000).unref();
if (require.main === module) main().catch((e) => { console.log('出图失败：' + e.message); process.exit(1); });
module.exports = { CHROME, launch, connect, page, open };
