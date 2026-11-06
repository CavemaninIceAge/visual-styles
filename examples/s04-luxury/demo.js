// 辰璧 CHENBI 高级珠宝腕表（新品、预约到店，App）—— 起手包 s04-luxury 试跑
module.exports = ({ img, statusBar, homeBar, style }) => {
  const S = style('s04-luxury');
  const { ui } = S;

  // 望舒月相腕表（18K 白金表壳、6 点位月相、黑色鳄鱼皮表带），画在 750×840 的 2 倍画布上
  // 单品页用乳白表盘；首页 dark: true 换成墨黑表盘，box 裁出微距，让表壳从左边出血
  const watch = ({ id = 'w', dark = false, w = 375, h = 420, box = '0 0 750 840', css: st0 = 'position:absolute;left:0;top:0' } = {}) => {
    const cx = 375, cy = 404, R = 184;
    const c = dark
      ? { dial: ['#2B2824', '#171512', '#0B0A09'], rim: 'rgba(255,255,255,.14)', line: '#BDB8AE', bat: '#ECE8DF', text: '#F2EDE4', hand: ['#FBFAF7', '#8E8981'], hub: '#55514B', sky: ['#050506', '#101013'], hump: '#14120F', arc: '#8A857D', glass: .12 }
      : { dial: ['#FDFCF9', '#F1EEE8', '#DCD7CE'], rim: 'rgba(0,0,0,.28)', line: '#3B3834', bat: '#3A3733', text: '#1C1A17', hand: ['#2B2825', '#8A857E'], hub: '#55514B', sky: ['#121214', '#2A2A2E'], hump: '#F0EDE7', arc: '#8A857D', glass: .35 };
    const u = (n) => `${id}${n}`;
    let ticks = '', bat = '', rays = '';
    for (let i = 0; i < 60; i++) ticks += `<line x1="${cx}" y1="${cy - 140}" x2="${cx}" y2="${cy - 150}" transform="rotate(${i * 6} ${cx} ${cy})"/>`;
    for (let h2 = 0; h2 < 12; h2++) {
      if (h2 === 6) continue;
      const xs = h2 === 0 ? [cx - 6.5, cx + 1.5] : [cx - 2.5];
      bat += xs.map((x) => `<rect x="${x}" y="${cy - 134}" width="5" height="30" transform="rotate(${h2 * 30} ${cx} ${cy})"/>`).join('');
    }
    if (dark) for (let i = 0; i < 240; i++) rays += `<line x1="${cx}" y1="${cy - 12}" x2="${cx}" y2="${cy - 162}" transform="rotate(${i * 1.5} ${cx} ${cy})"/>`;
    const hand = (len, wd, tail, a) => `<g transform="translate(${cx} ${cy}) rotate(${a})"><path d="M0 ${tail} L${-wd} 0 L0 ${-len} Z" fill="${c.hand[0]}"/><path d="M0 ${tail} L${wd} 0 L0 ${-len} Z" fill="${c.hand[1]}"/></g>`;
    const strap = (top) => {
      const d = top ? `M286 -10 L464 -10 L470 ${cy - R + 50} L280 ${cy - R + 50} Z` : `M280 ${cy + R - 50} L470 ${cy + R - 50} L464 850 L286 850 Z`;
      const y1 = top ? -10 : cy + R - 30, y2 = top ? cy - R + 30 : 850;
      return `<path d="${d}" fill="url(#${u('st')})"/><path d="M296 ${y1}V${y2}M454 ${y1}V${y2}" stroke="rgba(242,237,228,.22)" stroke-width="1.6" stroke-dasharray="7 6"/>`;
    };
    const lug = (x, top) => `<rect x="${x}" y="${top ? cy - R - 26 : cy + R - 58}" width="24" height="84" rx="6" fill="url(#${u('mv')})" stroke="#77736C" stroke-width="1"/>`;
    return `<svg viewBox="${box}" width="${w}" height="${h}" style="${st0}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="${u('st')}" x1="0" x2="1"><stop offset="0" stop-color="#0E0D0C"/><stop offset=".2" stop-color="#1D1A18"/><stop offset=".5" stop-color="#2A2622"/><stop offset=".8" stop-color="#1D1A18"/><stop offset="1" stop-color="#0E0D0C"/></linearGradient>
<linearGradient id="${u('m')}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBFAF8"/><stop offset=".26" stop-color="#C6C2BB"/><stop offset=".46" stop-color="#F3F1ED"/><stop offset=".62" stop-color="#A5A19A"/><stop offset=".82" stop-color="#E6E3DE"/><stop offset="1" stop-color="#8C8881"/></linearGradient>
<linearGradient id="${u('m2')}" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F6F4F0"/><stop offset=".4" stop-color="#B3AFA8"/><stop offset=".7" stop-color="#EDEBE6"/><stop offset="1" stop-color="#9C978F"/></linearGradient>
<linearGradient id="${u('mv')}" x1="0" x2="1"><stop offset="0" stop-color="#9A968F"/><stop offset=".45" stop-color="#F4F2EE"/><stop offset="1" stop-color="#A9A59E"/></linearGradient>
<radialGradient id="${u('dl')}" cx=".46" cy=".4" r=".62"><stop offset="0" stop-color="${c.dial[0]}"/><stop offset=".72" stop-color="${c.dial[1]}"/><stop offset="1" stop-color="${c.dial[2]}"/></radialGradient>
<linearGradient id="${u('sky')}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sky[0]}"/><stop offset="1" stop-color="${c.sky[1]}"/></linearGradient>
<radialGradient id="${u('mo')}" cx=".4" cy=".38" r=".7"><stop offset="0" stop-color="#FAF7F0"/><stop offset="1" stop-color="#C9C3B6"/></radialGradient>
<linearGradient id="${u('gl')}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="${u('lit')}" cx=".42" cy=".3" r=".78"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></radialGradient>
<filter id="${u('sh')}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="${dark ? '#000' : '#2A2520'}" flood-opacity=".3"/></filter>
<filter id="${u('hs')}"><feGaussianBlur stdDeviation="2.4"/></filter>
<clipPath id="${u('win')}"><path d="M327 ${cy + 92} A48 48 0 0 1 423 ${cy + 92} Z"/></clipPath>
</defs>
<g filter="url(#${u('sh')})">
${strap(true)}${strap(false)}
${lug(282, true)}${lug(444, true)}${lug(282, false)}${lug(444, false)}
<rect x="${cx + R - 8}" y="${cy - 9}" width="16" height="18" fill="url(#${u('mv')})"/>
<rect x="${cx + R + 4}" y="${cy - 22}" width="24" height="44" rx="5" fill="url(#${u('mv')})" stroke="#77736C" stroke-width="1"/>
<path d="M${cx + R + 9} ${cy - 18}v36M${cx + R + 14} ${cy - 19}v38M${cx + R + 19} ${cy - 19}v38M${cx + R + 24} ${cy - 18}v36" stroke="#8C8881" stroke-width="1.2"/>
<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${u('m')})" stroke="#6F6B65" stroke-width="1.2"/>
</g>
<circle cx="${cx}" cy="${cy}" r="${R - 14}" fill="url(#${u('m2')})"/>
<circle cx="${cx}" cy="${cy}" r="${R - 21}" fill="url(#${u('dl')})" stroke="${c.rim}" stroke-width="1"/>
${dark ? `<g stroke="#fff" stroke-opacity=".035" stroke-width=".5">${rays}</g>` : ''}
<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="${c.line}" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="${c.line}" stroke-width="1"/>
<g stroke="${c.line}" stroke-width="1.2">${ticks}</g>
<g fill="${c.bat}">${bat}</g>
<text x="${cx + 3}" y="${cy - 66}" text-anchor="middle" font-family="Bodoni Moda" font-size="${dark ? 15 : 22}" letter-spacing="${dark ? 4 : 6}" fill="${c.text}">CHENBI</text>
<path d="M327 ${cy + 92} A48 48 0 0 1 423 ${cy + 92} Z" fill="url(#${u('sky')})"/>
<g clip-path="url(#${u('win')})"><circle cx="${cx - 8}" cy="${cy + 66}" r="17" fill="url(#${u('mo')})"/><circle cx="${cx + 30}" cy="${cy + 60}" r="1.6" fill="#E8E4DA"/><circle cx="${cx + 14}" cy="${cy + 52}" r="1.2" fill="#E8E4DA"/><circle cx="${cx - 30}" cy="${cy + 62}" r="1.3" fill="#E8E4DA"/></g>
<g clip-path="url(#${u('win')})"><circle cx="350" cy="${cy + 92}" r="23" fill="${c.hump}"/><circle cx="400" cy="${cy + 92}" r="23" fill="${c.hump}"/><path d="M327 ${cy + 92} A23 23 0 0 1 373 ${cy + 92} M377 ${cy + 92} A23 23 0 0 1 423 ${cy + 92}" fill="none" stroke="${c.arc}" stroke-width="1"/></g>
<path d="M327 ${cy + 92} A48 48 0 0 1 423 ${cy + 92}" fill="none" stroke="${c.arc}" stroke-width="1"/>
<g filter="url(#${u('hs')})" opacity=".22" transform="translate(4 7)">${hand(98, 9, 22, 304.5).replace(/fill="#[0-9A-Fa-f]+"/g, 'fill="#000"')}${hand(146, 7.5, 26, 54).replace(/fill="#[0-9A-Fa-f]+"/g, 'fill="#000"')}</g>
${hand(98, 9, 22, 304.5)}${hand(146, 7.5, 26, 54)}
<circle cx="${cx}" cy="${cy}" r="9" fill="url(#${u('m')})" stroke="${c.hub}" stroke-width=".8"/>
<circle cx="${cx}" cy="${cy}" r="${R - 21}" fill="url(#${u('gl')})" opacity="${c.glass}"/>
${dark ? `<circle cx="${cx}" cy="${cy}" r="${R + 1}" fill="url(#${u('lit')})"/>` : ''}
</svg>`;
  };

  const css = '';

  // 首页：新品系列的大片，一屏只讲望舒系列。墨黑表盘的微距，表壳从左边出血，下半截沉进黑里
  const home = `<div class="scr s04 p home">${ui.full(watch({ id: 'h', dark: true, w: 375, h: 812, box: '295.7 102.3 323.3 700', css: 'display:block' }), { veil: '#0D0C0B 0%,#0D0C0B 9%,rgba(13,12,11,.6) 13%,rgba(13,12,11,0) 19%,rgba(13,12,11,0) 57%,rgba(13,12,11,.74) 64%,rgba(13,12,11,.96) 68.5%,#0D0C0B 76%' })}${statusBar(true)}
${ui.nav({ left: ui.glyph('menu'), title: ui.logo('辰璧', 'CHENBI') })}
${ui.pager(1, 4, { top: 150 })}
<div class="v-abs" style="top:560px">${ui.title('望舒系列', 'The Wangshu Collection')}</div>
<div class="v-abs" style="top:670px">${ui.hair(44)}</div>
<div class="v-abs" style="top:706px">${ui.btn('探索系列', { cls: 'wide', attrs: 'data-go="det"' })}</div>
${homeBar(true)}</div>`;

  // 单品：望舒月相腕表，浅灰底板上一只表
  const det = `<div class="scr s04 v-iv p det">${statusBar(false)}
${ui.nav({ title: ui.logo('辰璧', 'CHENBI', { size: 'sm' }), right: '02 / 04' })}
${ui.plate(watch(), 'position:absolute;left:0;right:0;top:110px;height:420px')}
<div class="v-abs" style="top:560px">${ui.title('望舒月相', 'Wangshu Moonphase')}</div>
<div class="v-abs" style="top:654px">${ui.specs(['<span class="v-num">38 mm</span>', '18K 白金', ui.price('268,000')])}</div>
<div class="v-abs" style="top:698px">${ui.btn('预约到店鉴赏', { cls: 'wide', attrs: 'data-go="ok"' })}</div>
${homeBar(false)}</div>`;

  // 预约确认：只有日期、时间和三行信息
  const ok = `<div class="scr s04 p ok">${statusBar(true)}
${ui.nav({ left: `<span data-go="home">${ui.glyph('close')}</span>`, title: ui.logo('辰璧', 'CHENBI', { size: 'sm' }) })}
<div class="v-abs" style="top:170px">${ui.label('预约已确认')}</div>
<div class="v-abs" style="top:204px">${ui.hair()}</div>
<div class="v-abs" style="top:262px">${ui.big('11.08', '周日', '到店')}${ui.big('14:30', '金宝街', '精品店')}</div>
<div class="v-abs" style="top:530px">${ui.rows([['鉴赏', '望舒月相 · 白金'], ['顾问', '沈清'], ['确认号', 'CB 2611 0814', true]])}</div>
<div class="v-abs" style="top:712px">${ui.btn('加入日历', { cls: 'wide' })}</div>
${homeBar(true)}</div>`;

  // 官网：望舒是月神，首屏一轮黑白的月，正中一个大字标
  const web = `<div class="web s04 p" style="height:800px">${ui.full(img('moon-pink-clouds'), { pos: '50% 30%', veil: 'web', filter: 'grayscale(1) sepia(.07) contrast(1.3) brightness(1.4)' })}
${ui.webNav('', ['高级珠宝', '腕表', '精品店'], '中 / EN', '预约到店', 'data-go="ok"')}
${ui.logo('辰璧', 'CHENBI', { size: 'xl' })}
${ui.pager(1, 4, { dir: 'h' })}
${ui.cue()}
</div>`;

  return {
    name: '辰璧',
    css,
    screens: { home, det, ok, web },
    desktop: ['web'],
    board: ['web', 'home', 'det', 'ok'],
    start: 'home',
    url: 'chenbi.com',
    boardTitle: '',
    boardDeco: ui.stage('辰璧', 'CHENBI'),
  };
};
