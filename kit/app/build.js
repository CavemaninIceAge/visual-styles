// 把一个应用项目组装成能直接上传的静态站点：node app/build.js <项目目录> [--final]
// 项目目录里：app.json（{ "name": "品牌名", "style": "s16-pro", "borrow": [] }）、src/（main.js、页面、app.css）、img/（客户的图）
// 输出 <项目目录>/out/site/：
//   index.html          入口（生成的）
//   shell.js shell.css  应用外壳（kit/app/runtime/）
//   kit/style.js        起手包改成的浏览器模块：S（T、css、ui）、L（icon、defineIcon、img、statusBar、miniNav、homeBar、qr、grain、rng、esc）、B（借来的风格）
//   kit/icons.js        用到的图标（自己画的那一套 kit/icons/，和出图时的 icon() 同一个函数）和 defineIcon
//   kit/style.css       用到的字体 + 公用类 + 起手包 css
//   fonts/ img/         字体、图片；src/ 下的文件原样放在站点根目录
// 开发时字体是软链（快）；--final 按用到的字裁成 woff2、图库图片缩到 1600，交付和上线用
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KIT = path.resolve(__dirname, '..');
const L = require(path.join(KIT, 'lib'));
const P = path.resolve(process.argv[2] || '.');
const FINAL = process.argv.includes('--final');
const SITE = path.join(P, 'out', 'site');
const rd = (f) => fs.readFileSync(f, 'utf8');
const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).filter((e) => !e.name.startsWith('.')).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
const put = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const fail = (m) => { console.log(m); process.exit(1); };

if (!fs.existsSync(path.join(P, 'app.json'))) fail('没有 app.json：先用 tools/new_app.sh 建项目');
const cfg = JSON.parse(rd(path.join(P, 'app.json')));
const styleFile = (k) => { const f = path.join(KIT, 'styles', k + '.js'); if (!fs.existsSync(f)) fail('没有这个风格的起手包：' + k); return f; };
const SF = styleFile(cfg.style);
const borrow = cfg.borrow || [];
if (!fs.existsSync(path.join(P, 'src', 'main.js'))) fail('没有 src/main.js');
L.setProject(P);

fs.rmSync(SITE, { recursive: true, force: true });
fs.mkdirSync(SITE, { recursive: true });

// 1 项目源码、外壳、客户的图
const SRC = path.join(P, 'src');
for (const f of walk(SRC)) { const to = path.join(SITE, path.relative(SRC, f)); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(f, to); }
for (const f of ['shell.js', 'shell.css']) fs.copyFileSync(path.join(__dirname, 'runtime', f), path.join(SITE, f));
for (const f of walk(path.join(P, 'img'))) { const to = path.join(SITE, 'img', path.relative(path.join(P, 'img'), f)); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(f, to); }

const projText = walk(SRC).filter((f) => /\.(js|css|html|json)$/.test(f)).map(rd).join('\n');
const styleSrc = [SF, ...borrow.map(styleFile)].map(rd);
const allCode = projText + '\n' + styleSrc.join('\n') + '\n' + rd(path.join(__dirname, 'runtime', 'shell.js'));

// 2 图标：代码里出现的字符串，是图标集里的名字就收进来（自己画的那一套，kit/icons/）；项目自己的业务图标在浏览器里 defineIcon
const I = require(path.join(KIT, 'icons'));
const icons = {};
for (const m of allCode.matchAll(/['"`]([a-z][a-z0-9-]{0,40})['"`]/g)) {
  const n = m[1];
  if (n in icons) continue;
  try { icons[n] = L.iconMarkup(n); } catch (e) { icons[n] = null; }
}
for (const k of Object.keys(icons)) if (!icons[k]) delete icons[k];
put(path.join(SITE, 'kit/icons.js'), `// 由 kit/app/build.js 生成，不要手改：项目用到的图标（自己画的那一套，kit/icons/）
export const ICONS = ${JSON.stringify(icons)};
const OWN = {};
const wrap = ${I.wrap.toString()};
const expand = ${I.expand.toString()};
const validate = ${I.validate.toString()};
// 项目自己的业务图标：defineIcon('kettle', '<path class="t" d="…"/><path d="…"/>')，规矩和 kit/icons/SPEC.md 一样
export function defineIcon(name, markup) {
  if (name in ICONS) throw new Error('图标集里已经有「' + name + '」，直接 icon() 取；要画不一样的就换个名字');
  const bad = validate(markup);
  if (bad.length) throw new Error('defineIcon(' + name + ') 不合规范：' + bad.join('；'));
  OWN[name] = expand(String(markup).trim());
  return name;
}
// icon('house', 20, 1.8)：和出图时的 icon() 一样；名字不在这里时说明代码里拼了名字（改成写完整的字符串），或者图标集里没有（照 kit/icons/SPEC.md 画）
export function icon(name, size = 20, stroke, extra = '') {
  const svg = OWN[name] !== undefined ? OWN[name] : ICONS[name];
  if (svg === undefined) { console.error('图标不存在：' + name + '（图标集里没有就照 kit/icons/SPEC.md 自己画，项目专用的用 defineIcon）'); return '<svg class="ic" width="' + size + '" height="' + size + '" aria-hidden="true"></svg>'; }
  return wrap(svg, size, stroke, extra);
}
`);

// 3 起手包改成浏览器模块：lib 里的纯函数原样搬过去，img 换成站点里的相对路径
const fnSrc = (name) => `const ${name} = ${L[name].toString()};`;
const wrap = (src) => `(() => { const module = { exports: {} };\n${src}\nreturn module.exports(L); })()`;
put(path.join(SITE, 'kit/style.js'), `// 由 kit/app/build.js 从起手包 ${cfg.style} 生成，不要手改
import { icon, defineIcon } from './icons.js';
${['esc', 'rng', 'qr', 'grain', 'statusBar', 'miniNav', 'homeBar'].map(fnSrc).join('\n')}
// 图片：img('图库图片名') → img/lib/图片名.jpg；img('./img/logo.png') → img/logo.png
const img = (name) => (name.startsWith('./') ? name.slice(2) : name.startsWith('/') || name.includes(':') ? name : 'img/lib/' + name + '.jpg');
export const L = { icon, defineIcon, img, esc, rng, qr, grain, statusBar, miniNav, homeBar };
export const S = ${wrap(styleSrc[0])};
export const B = {${borrow.map((k, i) => `\n  '${k}': ${wrap(styleSrc[i + 1])},`).join('')}
};
`);

// 4 CSS：用到的字体 + 公用类 + 起手包
const S = require(SF)(L);
const BS = borrow.map((k) => require(styleFile(k))(L));
// 图标规则（起手包 T.icon）放在起手包 css 前面：起手包里同样具体的图标规则压得过它
let css = rd(path.join(KIT, 'base.css')) + '\n/* 图标 */\n' + [null, S, ...BS].map(L.iconCss).join('') + '\n/* 起手包 ' + S.key + ' */\n' + S.css;
BS.forEach((b, i) => { css += '\n/* 借来的 ' + borrow[i] + ' */\n' + b.css; });
const faces = rd(path.join(KIT, 'fonts.css')).replace(/\/\*[\s\S]*?\*\//g, '').match(/@font-face\s*\{[^}]*\}/g) || [];
const famOf = (blk) => (/font-family:\s*["']?([^;"']+)["']?/.exec(blk) || [])[1];
const usedText = css + rd(path.join(__dirname, 'runtime', 'shell.css')) + projText;
const used = [...new Set(faces.map(famOf))].filter((f) => f && new RegExp(`["']${f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(usedText));
const FD = path.join(SITE, 'fonts');
fs.mkdirSync(FD, { recursive: true });
const safe = (f) => path.basename(f).replace(/\[[^\]]*\]/g, (m) => '-' + m.slice(1, -1).replace(/,/g, '-')).replace(/[^\w.-]/g, '');
const fontFiles = {};
let chars = '';
if (FINAL) {
  // 收字：站点里所有源码和页面里出现的字，加 ASCII 和常用标点；项目目录有 chars.txt（比如输入框里可能打的常用字）也收
  const all = walk(SITE).filter((f) => /\.(js|css|html)$/.test(f)).map(rd).join('') + (fs.existsSync(path.join(P, 'chars.txt')) ? rd(path.join(P, 'chars.txt')) : '');
  chars = [...new Set([...all].filter((c) => c.codePointAt(0) > 0x7f))].join('') + '“”‘’、。，：；！？…《》「」【】（）¥￥℃°×÷±';
  fs.writeFileSync(path.join(P, 'out', '.chars.txt'), chars);
}
const PYFT = path.join(KIT, '.venv/bin/pyftsubset');
function font(file) {
  if (fontFiles[file]) return fontFiles[file];
  const src = path.join(KIT, 'assets/fonts', file);
  if (!fs.existsSync(src)) fail('字体文件不在：' + src + '（先跑 tools/setup.sh）');
  if (!FINAL) { const to = safe(file); fs.symlinkSync(src, path.join(FD, to)); return (fontFiles[file] = [to, 'truetype']); }
  const to = safe(file).replace(/\.[ot]tf$/i, '') + '.woff2';
  const args = (feat) => [src, `--text-file=${path.join(P, 'out', '.chars.txt')}`, '--unicodes=U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+3000-303F,U+FF01-FF5E', '--flavor=woff2', feat, '--no-hinting', `--output-file=${path.join(FD, to)}`];
  try { execFileSync(PYFT, args('--layout-features=*'), { stdio: 'pipe' }); } catch (e) { execFileSync(PYFT, args('--layout-features='), { stdio: 'pipe' }); }
  return (fontFiles[file] = [to, 'woff2']);
}
const fontCss = faces.filter((b) => used.includes(famOf(b))).map((b) => b.replace(/url\("__ROOT__\/assets\/fonts\/([^"]+)"\)\s*format\("[^"]+"\)/g, (_, f) => { const [to, fmt] = font(f); return `url("../fonts/${to}") format("${fmt}")`; }).replace(/font-display:\s*block/, 'font-display: swap')).join('\n');
put(path.join(SITE, 'kit/style.css'), `/* 由 kit/app/build.js 生成，不要手改 */\n${fontCss}\n${css}`);

// 5 图库图片：代码里 img('图片名') 用到的拷进 img/lib/
const noComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');
const lib = new Set([...noComments(allCode).matchAll(/img\(\s*['"`]([^'"`./:][^'"`]*)['"`]\s*\)/g)].map((m) => m[1]));
let sharp = null;
if (FINAL && lib.size) { try { sharp = require(path.join(KIT, 'node_modules/sharp')); } catch (e) { sharp = null; } }
const jobs = [];
for (const n of lib) {
  const from = path.join(KIT, 'assets/img', n + '.jpg');
  if (!fs.existsSync(from)) { console.log('图库里没有这张图：' + n); continue; }
  const to = path.join(SITE, 'img/lib', n + '.jpg');
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (sharp) jobs.push(sharp(from).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(to));
  else fs.copyFileSync(from, to);
}

// 6 入口页
const title = L.esc(cfg.title || cfg.name || '演示');
const appCss = fs.existsSync(path.join(SITE, 'app.css')) ? '\n<link rel="stylesheet" href="app.css">' : '';
put(path.join(SITE, 'index.html'), `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${title}</title>
<link rel="icon" href="data:,">
<link rel="stylesheet" href="kit/style.css">
<link rel="stylesheet" href="shell.css">${appCss}
</head>
<body>
<div id="as-root"></div>
<script>
if (location.protocol === 'file:') document.getElementById('as-root').innerHTML = '<div style="max-width:520px;margin:15vh auto;padding:0 24px;font:16px/1.7 sans-serif;color:#333"><p style="font-size:20px;font-weight:600;margin-bottom:12px">这个演示要放在网站上打开</p><p>把这个文件夹整个上传到任意静态网站就能用。只在自己电脑上看：在这个文件夹里运行 python3 -m http.server 8000，再打开 http://localhost:8000</p></div>';
</script>
<script type="module" src="main.js"></script>
</body>
</html>
`);

Promise.all(jobs).then(() => {
  const n = walk(SITE).length;
  console.log(`站点：${SITE}（${n} 个文件；风格 ${S.key}${borrow.length ? '，借 ' + borrow.join('、') : ''}；图标 ${Object.keys(icons).length} 个；字体 ${used.join('、') || '无'}；图库图片 ${lib.size} 张${FINAL ? '；上线版：字体已按用到的字裁好' : ''}）`);
}).catch((e) => fail('图片处理失败：' + e.message));
