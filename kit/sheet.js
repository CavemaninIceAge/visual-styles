// 图库缩略图总览：node sheet.js → assets/总览/图库总览-N.jpg。挑图时用 Read 看，缩略图下面写着图片名
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG = path.join(__dirname, 'assets/img');
const OUT = path.join(__dirname, 'assets/总览');
const COLS = 8, ROWS = 10, TW = 290, TH = 200, LABEL = 30, GAP = 10;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const names = fs.readdirSync(IMG).filter((f) => f.endsWith('.jpg')).sort();
  const per = COLS * ROWS;
  for (let n = 0; n * per < names.length; n++) {
    const part = names.slice(n * per, (n + 1) * per);
    const W = COLS * (TW + GAP) + GAP;
    const H = Math.ceil(part.length / COLS) * (TH + LABEL + GAP) + GAP;
    const at = (i) => ({ left: GAP + (i % COLS) * (TW + GAP), top: GAP + Math.floor(i / COLS) * (TH + LABEL + GAP) });
    const thumbs = await Promise.all(part.map(async (f, i) => ({ input: await sharp(path.join(IMG, f)).resize(TW, TH, { fit: 'cover' }).toBuffer(), ...at(i) })));
    const labels = part.map((f, i) => { const p = at(i); return `<text x="${p.left}" y="${p.top + TH + 21}" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#222">${f.replace(/\.jpg$/, '')}</text>`; }).join('');
    const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${labels}</svg>`);
    await sharp({ create: { width: W, height: H, channels: 3, background: '#fff' } })
      .composite([...thumbs, { input: svg, left: 0, top: 0 }])
      .jpeg({ quality: 78 })
      .toFile(path.join(OUT, `图库总览-${n}.jpg`));
  }
  console.log(`图库总览 ${Math.ceil(names.length / per)} 张，共 ${names.length} 张图`);
})();
