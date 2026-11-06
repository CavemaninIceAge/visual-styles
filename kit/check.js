// 自动检查（screens.html?check=1 时运行，结果写进 <pre id="report">，render.sh 用 --dump-dom 取）
// 查：字出界、字被截断、字太小、字体没生效、图片没载入；顺带数每屏可见元素
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
  document.querySelectorAll('.one').forEach((one) => {
    const root = one.firstElementChild || one;
    const R = one.getBoundingClientRect();
    const issues = [];
    let count = 0;
    const seenFam = new Set();
    root.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const txt = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
      if (!el.children.length || txt) count++;
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
    rep[one.dataset.s] = { 元素: count, 问题: issues };
  });
  const pre = document.createElement('pre');
  pre.id = 'report';
  pre.textContent = JSON.stringify(rep);
  document.body.prepend(pre);
})();
