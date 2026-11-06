// 把可点击演示打成一个自带图片和字体的单文件 HTML：node pack.js <项目目录>
// 图片缩到最长边 1600 再内嵌；字体只留演示里用到的字（fonttools 子集化成 woff2）
// 系统字体（苹方、宋体-简、Didot 等）没法内嵌：别的电脑和手机上会换成后备字体，所以要交 HTML 的 demo 尽量只用 fonts.css 里的开源字体
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const KIT = __dirname;
const P = path.resolve(process.argv[2] || '.');
const name = process.argv[3] || 'demo';
const SRC = path.join(P, 'out/prototype.html');
const TMP = path.join(P, '.pack'); fs.mkdirSync(TMP, { recursive: true });
const PYFT = path.join(KIT, '.venv/bin/pyftsubset');

(async () => {
  // 先去掉 CSS 注释（注释里提到的字体名不算用到）
  let h = fs.readFileSync(SRC, 'utf8').replace(/<style>([\s\S]*?)<\/style>/g, (m, c) => '<style>' + c.replace(/\/\*[\s\S]*?\*\//g, '') + '</style>');
  // 1. 去掉没用到的 @font-face，记下用到的
  const faces = [];
  h = h.replace(/@font-face\s*\{[^}]*\}/g, (blk) => { faces.push(blk); return '\u0000FACE' + (faces.length - 1) + '\u0000'; });
  const rest = h.replace(/\u0000FACE\d+\u0000/g, '');
  const famOf = (blk) => (/font-family:\s*["']?([^;"']+)["']?/.exec(blk) || [])[1];
  const used = new Set(faces.map(famOf).filter((f) => f && new RegExp(`["']?${f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?`).test(rest)));
  // 2. 演示里出现的全部字（非 ASCII 的都收，ASCII 全收）
  const chars = new Set();
  for (const c of rest) if (c.charCodeAt(0) > 127) chars.add(c);
  let text = [...chars].join('');
  for (let i = 32; i < 127; i++) text += String.fromCharCode(i);
  text += '“”‘’、。，：；！？·—…《》「」【】（）¥￥℃°×÷±→←↑↓';
  fs.writeFileSync(path.join(TMP, 'text.txt'), text);
  const done = {};
  function subset(file) {
    if (done[file]) return done[file];
    const out = path.join(TMP, path.basename(file).replace(/\.[ot]tf$/i, '') + '.woff2');
    const args = (feat) => [file, `--text-file=${path.join(TMP, 'text.txt')}`, '--flavor=woff2', feat, `--output-file=${out}`];
    // 个别字体（抖音美好体）的 GSUB 表有坏数据，全量特性会报错，退回不带排版特性
    try { execFileSync(PYFT, args('--layout-features=*'), { stdio: 'pipe' }); } catch (e) { console.log('字体排版特性读不了，已去掉：' + path.basename(file)); execFileSync(PYFT, args('--layout-features='), { stdio: 'pipe' }); }
    return (done[file] = 'data:font/woff2;base64,' + fs.readFileSync(out).toString('base64'));
  }
  h = h.replace(/\u0000FACE(\d+)\u0000/g, (_, i) => {
    const blk = faces[+i];
    if (!used.has(famOf(blk))) return '';
    return blk.replace(/url\("file:\/\/([^"]+)"\)\s*format\("[^"]+"\)/g, (_, f) => `url("${subset(decodeURI(f))}") format("woff2")`);
  });
  // 3. 图片内嵌
  const urls = [...new Set(h.match(/file:\/\/[^"')\s]+\.(jpe?g|png|webp)/gi) || [])];
  for (const u of urls) {
    const f = decodeURI(u.slice(7));
    const im = sharp(f).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true });
    const meta = await sharp(f).metadata();
    const buf = meta.hasAlpha ? await im.png({ compressionLevel: 9, palette: true }).toBuffer() : await im.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    h = h.split(u).join(`data:image/${meta.hasAlpha ? 'png' : 'jpeg'};base64,` + buf.toString('base64'));
  }
  const left = h.match(/file:\/\/[^"')\s]+/g);
  if (left) console.log('还有没内嵌的本地文件：', [...new Set(left)].slice(0, 5));
  const out = path.join(P, 'out', name + '.html');
  fs.writeFileSync(out, h);
  console.log(`单文件演示：${out}（${(fs.statSync(out).size / 1048576).toFixed(1)} MB；内嵌字体 ${Object.keys(done).length} 个、图片 ${urls.length} 张）`);
  console.log('内嵌的字体：' + [...used].join('、'));
})().catch((e) => { console.error(e.message); process.exit(1); });
