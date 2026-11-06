// 量色：node hue.js <png> [x y w h]（坐标是 CSS 像素，截图是 2 倍图；不写就量整张）
const sharp = require('sharp');
const [f, x, y, w, h] = process.argv.slice(2);
(async () => {
  let im = sharp(f);
  if (w) im = im.extract({ left: x * 2, top: y * 2, width: w * 2, height: h * 2 });
  const { channels } = await im.removeAlpha().stats();
  const [r, g, b] = channels.map((c) => c.mean / 255);
  const mx = Math.max(r, g, b); const mn = Math.min(r, g, b); const d = mx - mn; const l = (mx + mn) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  let hue = 0;
  if (d) hue = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  hue = (hue * 60 + 360) % 360;
  console.log(`色相 ${hue.toFixed(0)}°  饱和度 ${(s * 100).toFixed(0)}%  明度 ${(l * 100).toFixed(0)}%`);
})().catch((e) => { console.log('量不了：' + e.message); process.exit(1); });
