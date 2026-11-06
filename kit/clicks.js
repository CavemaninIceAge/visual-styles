// 点击测试：node clicks.js <项目目录> <文件名，不带 .html>
// 打开单文件演示，电脑、手机、矮手机（微信内置浏览器的高度）三种窗口各走一遍：每屏都翻到，每个 data-go 都真的点一次，
// 再查返回键、手机屏底部有没有被裁、图片、字体、残留的本地路径
const fs = require('fs');
const path = require('path');
const { launch, connect, page, open } = require('./shot');

const P = path.resolve(process.argv[2] || '.');
const NAME = process.argv[3] || 'demo';
const FILE = path.join(P, 'out', NAME + '.html');

const WALK = `(()=>{
  const bad=[];let n=0;
  for(const id of ids){
    show(id,false);
    const ly=document.querySelector('.ly.on');
    if(!ly||ly.dataset.id!==id){bad.push('翻不到 '+id);continue}
    if(ly.dataset.d!=='1'&&innerWidth<520&&ly.getBoundingClientRect().bottom>innerHeight+1)bad.push(id+' 底部被裁');
    const count=ly.querySelectorAll('[data-go]').length;
    for(let i=0;i<count;i++){
      show(id,false);hist.length=0;
      const t=document.querySelectorAll('.ly.on [data-go]')[i];
      const to=t.dataset.go;t.click();n++;
      if(cur!==to)bad.push(id+' 点不到 '+to);
    }
    show(id,false);hist.length=0;
    const backs=document.querySelectorAll('.ly.on [data-back]');
    if(backs.length){const from=ids.find(x=>x!==id);if(from){show(from,false);show(id,true);document.querySelectorAll('.ly.on [data-back]')[0].click();n++;if(cur!==from)bad.push(id+' 返回不了')}}
  }
  const imgs=[...document.images].filter(i=>!i.naturalWidth).length;
  const fonts=[...document.fonts].filter(f=>f.status==='error').map(f=>f.family);
  const dots=document.body.classList.contains('cmp');
  return JSON.stringify({n,bad,imgs,fonts,dots,screens:ids.length,local:document.documentElement.outerHTML.includes('file://')});
})()`;

(async () => {
  const dir = path.join(P, '.pack');
  fs.mkdirSync(dir, { recursive: true });
  const { ch, ws } = await launch(dir);
  let fail = 0;
  try {
    const cdp = await connect(ws);
    for (const [label, w, h] of [['电脑', 1440, 900], ['手机', 390, 844], ['矮手机', 390, 664]]) {
      const pg = await page(cdp);
      await pg.s('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
      await open(cdp, pg, 'file://' + encodeURI(FILE));
      const r = await pg.s('Runtime.evaluate', { expression: WALK, returnByValue: true });
      if (r.exceptionDetails) { console.log(`点击测试（${label}）出错：${r.exceptionDetails.text}`); fail++; await pg.close(); continue; }
      const d = JSON.parse(r.result.value);
      const probs = [...d.bad];
      if (d.imgs) probs.push(`${d.imgs} 张图没载入`);
      if (d.fonts.length) probs.push('字体载入失败：' + d.fonts.join('、'));
      if (d.local) probs.push('还有本地路径');
      fail += probs.length;
      console.log(`点击测试（${label}）：${d.screens} 屏、点了 ${d.n} 处，${probs.length ? '问题：' + probs.join('；') : '都通'}${label === '手机' ? `；手机上的翻屏圆点${d.dots ? '有' : '没有（两套首页要的话 demo 写 compare: true）'}` : ''}`);
      await pg.close();
    }
    cdp.close();
  } finally { ch.kill(); }
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log('点击测试失败：' + e.message); process.exit(1); });
