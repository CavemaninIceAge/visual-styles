// 诊序 ZHENXU 口腔诊所预约管理（医生端 App + 前台电脑后台）—— 风格 s16-pro 清晰专业试跑
// 望京门诊，2026 年 11 月 6 日周五早上 09:41；林知远医生 2 号椅，下一位陈思远 10:00 根管治疗第 2 次
module.exports = ({ statusBar, homeBar, style }) => {
  const S = style('s16-pro');
  const { ui, T } = S;
  const TABS = [['calendar-days', '接诊'], ['users-round', '患者'], ['clipboard-check', '待办'], ['user-round', '我的']];

  // ——— 全诊所今天的预约：一份数据，后台时间轴、汇总数字、医生 App 都从这里取 ———
  // [开始, 结束, 患者, 项目, 状态] 状态：done 已完成、ok 已到诊或接诊中、warn 待确认、bad 爽约、sel 选中（已到诊）
  const CHAIRS = [
    { ch: '周', name: '周明澈', meta: '1 号椅', list: [['09:00', '09:40', '董力', '补牙', 'done'], ['09:50', '10:30', '贺一凡', '拔牙', 'ok'], ['10:40', '11:20', '蔡悦', '补牙', ''], ['11:20', '12:00', '孟洋', '复查', 'warn'], ['13:30', '14:10', '冯雪', '补牙', ''], ['14:20', '15:20', '彭浩', '拔牙', ''], ['15:30', '16:10', '梁晨', '复查', ''], ['16:20', '17:00', '白露', '补牙', 'warn']] },
    { ch: '林', name: '林知远', meta: '2 号椅', list: [['09:00', '09:40', '何建军', '补牙', 'done'], ['10:00', '11:00', '陈思远', '根管治疗', 'sel'], ['11:10', '11:50', '宋雨桐', '复查', ''], ['13:30', '14:30', '蒋文博', '根管治疗', ''], ['14:40', '15:20', '魏子涵', '补牙', 'warn'], ['15:30', '16:30', '罗婉清', '嵌体修复', '']] },
    { ch: '许', name: '许安然', meta: '3 号椅', list: [['09:00', '10:00', '邓楠', '冠修复', 'ok'], ['10:10', '10:50', '曹敏', '取模', ''], ['11:00', '12:00', '沈佳', '贴面', 'warn'], ['13:30', '14:10', '韦青', '复查', ''], ['14:20', '15:20', '贾宁', '冠修复', ''], ['16:00', '17:00', '谭悦', '贴面', '']] },
    { ch: '唐', name: '唐一鸣', meta: '4 号椅', list: [['09:30', '11:00', '石磊', '种植一期', 'ok'], ['11:10', '11:50', '范晓', '复查', ''], ['13:30', '15:00', '严冬', '种植二期', ''], ['15:20', '16:00', '廖青', '复查', 'warn'], ['16:10', '17:40', '顾言', '种植一期', '']] },
    { ch: '方', name: '方若', meta: '5 号椅', list: [['09:00', '09:40', '邵阳', '复诊', 'bad'], ['09:50', '10:30', '姚瑶', '复诊', 'ok'], ['10:40', '11:20', '戴安', '取模', ''], ['11:20', '12:00', '郝佳', '复诊', ''], ['13:30', '14:10', '侯宇', '复诊', ''], ['14:20', '15:00', '龚琪', '粘托槽', ''], ['15:10', '15:50', '袁帆', '复诊', ''], ['16:00', '16:40', '任晴', '复诊', ''], ['16:40', '17:20', '潘越', '取模', 'warn']] },
    { ch: '杜', name: '杜晓雯', meta: '6 号椅', list: [['14:00', '14:40', '夏晨', '洁牙', ''], ['14:50', '15:30', '江澜', '洁牙', ''], ['15:40', '16:20', '常乐', '洁牙', ''], ['16:30', '17:10', '汪宁', '洁牙', 'warn']], fix: ['09:00', '14:00', '设备检修'] },
  ];
  const WAIT = [['10:30', '11:10', '田野', '洁牙'], ['15:00', '15:40', '苗青', '补牙']];
  const min = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const dur = ([s, e]) => min(e) - min(s);
  const sum = (l) => l.reduce((a, x) => a + dur(x), 0);
  const all = CHAIRS.flatMap((c) => c.list);
  const count = (...k) => all.filter((x) => k.includes(x[4])).length;
  const arrived = count('done', 'ok', 'sel');
  const pending = count('warn');
  const open = CHAIRS.length * (9 * 60 - 90);
  const rate = (sum(all) / open * 100).toFixed(1);
  // 每小时排了多少椅位分钟（小柱图），当前 9 点这根用蓝
  const perHour = Array.from({ length: 9 }, (_, i) => { const a = (9 + i) * 60, b = a + 60; return all.reduce((n, x) => n + Math.max(0, Math.min(b, min(x[1])) - Math.max(a, min(x[0]))), 0); });
  const rows = CHAIRS.map((c) => ({
    ...c,
    tail: sum(c.list),
    items: [
      ...(c.fix ? [{ s: c.fix[0], e: c.fix[1], t: c.fix[2], ic: 'wrench', cls: 'op' }] : []),
      ...c.list.map(([s, e, t, d, st]) => ({ s, e, t, d, cls: st === 'done' || st === 'sel' ? st : '', st: st === 'done' ? '' : st === 'sel' ? 'ok' : st, go: st === 'sel' ? 'detail' : '' })),
    ],
  }));
  rows.push({ add: true, name: '待分配', meta: `${WAIT.length} 个预约`, lo: true, tail: sum(WAIT), items: WAIT.map(([s, e, t, d]) => ({ s, e, t, d, cls: 'op' })) });

  // ——— 牙位图：国际牙位编号，线性小牙形，本次 36、已治疗 16 26 46、缺失 18 48 ———
  const TOOTH = {
    i: 'M10 2.2c-1.4 0-2.4 3.6-3 7.6-.4 2.6-.9 4.4-1.6 6.2-.7 1.9-.9 4.2-.5 6 .4 1.7 1.6 3 5.1 3s4.7-1.3 5.1-3c.4-1.8.2-4.1-.5-6-.7-1.8-1.2-3.6-1.6-6.2-.6-4-1.6-7.6-3-7.6Z',
    c: 'M10 1.6c-1.5 0-2.5 4-3 8.2-.3 2.4-1 4.4-1.6 6.2-.6 2 .3 4.4 1.7 6.4.9 1.3 2 3 2.9 3s2-1.7 2.9-3c1.4-2 2.3-4.4 1.7-6.4-.6-1.8-1.3-3.8-1.6-6.2-.5-4.2-1.5-8.2-3-8.2Z',
    p: 'M10 2c-1.6 0-2.6 3.8-3.1 7.8-.2 1.8-1 3.4-1.9 5-1 1.8-1.4 4.2-.8 6.4.5 1.9 1.6 3 3 3 1.1 0 1.8-.7 2.8-.7s1.7.7 2.8.7c1.4 0 2.5-1.1 3-3 .6-2.2.2-4.6-.8-6.4-.9-1.6-1.7-3.2-1.9-5-.5-4-1.5-7.8-3.1-7.8Z',
    m: 'M5.8 2.4c-1.3 0-1.9 3.4-1.9 7 0 2-.4 3.6-1 5.2-.7 2-.9 4.6-.3 6.6.6 2 1.8 3.2 3.2 3.2 1.1 0 1.8-.6 2.6-.6s1.2.6 1.6.6.8-.6 1.6-.6 1.5.6 2.6.6c1.4 0 2.6-1.2 3.2-3.2.6-2 .4-4.6-.3-6.6-.6-1.6-1-3.2-1-5.2 0-3.6-.6-7-1.9-7-1.2 0-1.8 3.2-2.4 5.6-.3 1.3-.8 2.2-1.8 2.2s-1.5-.9-1.8-2.2c-.6-2.4-1.2-5.6-2.4-5.6Z',
  };
  const kindOf = (n) => { const u = n % 10; return u <= 2 ? 'i' : u === 3 ? 'c' : u <= 5 ? 'p' : 'm'; };
  const STATE = { 36: 'on', 16: 'fill', 26: 'fill', 46: 'fill', 18: 'miss', 48: 'miss' };
  const tooth = (n, low) => {
    const s = STATE[n];
    const fill = s === 'on' ? 'var(--b)' : s === 'fill' ? '#D9DDE4' : 'none';
    const stroke = s === 'on' ? 'var(--b)' : s === 'fill' ? T.accents.mute : s === 'miss' ? '#CDD2DA' : '#B4BAC5';
    return `<svg width="18" height="25" viewBox="0 0 20 28"><g ${low ? 'transform="matrix(1 0 0 -1 0 28)"' : ''}><path d="${TOOTH[kindOf(n)]}" style="fill:${fill};stroke:${stroke}" stroke-width="1.3" stroke-linejoin="round" ${s === 'miss' ? 'stroke-dasharray="2.4 2.2"' : ''}/></g></svg>`;
  };
  const upper = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lower = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const arch = (l, low) => ui.cells(l.map((n) => ({ html: tooth(n, low), t: n, cls: STATE[n] === 'on' ? 'on' : '' })), 16);

  // 本项目只管位置和牙位图的十字线，样子全在起手包里
  const css = `
.p .chart{position:relative;margin:0 20px;padding:14px 10px;border:1px solid var(--l);border-radius:14px}
.p .chart .low{margin-top:13px}
.p .chart .low .v-cells>div{flex-direction:column-reverse}
.p .chart:before{content:"";position:absolute;left:10px;right:10px;top:50%;height:1px;background:var(--l)}
.p .chart:after{content:"";position:absolute;left:50%;top:14px;bottom:14px;width:1px;background:var(--l)}
.p.dt .hdr{margin:12px 20px 20px}
.p.dt .v-lh{margin:0 20px 10px}
.p.dt .v-lh+.chart+.v-lh,.p.dt .v-list+.v-lh{margin-top:20px}
.p.dt .v-lg{gap:12px;font-size:13px}
.p.dt .v-list{margin-top:8px}
.p.dt .xr{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 20px}
.p.rb .hdr{margin:12px 20px 0}
.p.rb .v-blank{margin:0 20px}
.p.rb .v-list{margin-top:12px}
`;

  const home = `<div class="scr s16 p home">${statusBar()}
${ui.nav({ title: '今日接诊', back: false, right: ui.seg(['我的', '全诊所'], 0, [null, 'web']) })}
${ui.week([['一', 2], ['二', 3], ['三', 4], ['四', 5], ['五', 6, 'on'], ['六', 7], ['日', 8, 'off']])}
${ui.today({ label: '下一位 · 根管治疗', st: ui.st('已到诊', 'ok'), time: '10:00 – 11:00', foot: '陈思远 · 2 号椅', ic: 'user-round', btn: ui.btn('开始接诊', { ic: 'stethoscope', attrs: 'data-go="detail"' }) })}
${ui.lh('今日 6 位', '300 分钟')}
<div class="v-list v-pad">
${ui.row({ a: '09:00', a2: '09:40', t: '何建军', t2: '补牙 · 26', st: ui.st('已完成', 'done'), n: 40 })}
${ui.row({ a: '11:10', a2: '11:50', t: '宋雨桐', t2: '复查', n: 40 })}
${ui.rest({ a: '12:00', a2: '13:30', text: '午休', ic: 'coffee' })}
${ui.row({ a: '13:30', a2: '14:30', t: '蒋文博', t2: '根管治疗', n: 60 })}
${ui.row({ a: '14:40', a2: '15:20', t: '魏子涵', t2: '补牙 · 16', st: ui.st('待确认', 'warn'), n: 40 })}
${ui.row({ a: '15:30', a2: '16:30', t: '罗婉清', t2: '嵌体修复', n: 60 })}
</div>
${ui.tabs(TABS, 0, [null, 'detail', 'rebook', null])}${homeBar()}</div>`;

  const detail = `<div class="scr s16 p dt">${statusBar()}
${ui.nav({ title: '接诊', right: ui.iconBtn('ellipsis') })}
<div class="hdr">${ui.who({ ch: '陈', name: '陈思远', meta: '女 · 34 岁 · K0218', st: ui.st('接诊中', 'ok'), lg: true })}</div>
<div class="v-lh"><span>牙位图</span>${ui.legend([['on', '本次'], ['fill', '已治疗'], ['dash', '缺失']])}</div>
<div class="chart">${arch(upper)}<div class="low">${arch(lower, true)}</div></div>
<div class="v-list v-pad">
${ui.kv('项目', '根管治疗 第 2 次')}
${ui.kv('时间', '10:00 – 11:00 · 2 号椅')}
${ui.kv('上次', '10/23 开髓封药')}
${ui.kv('过敏史', ui.dot('bad') + '青霉素')}
</div>
<div class="v-lh"><span>影像</span><b>3 张</b></div>
<div class="xr">${ui.skImg('100%', 84)}${ui.skImg('100%', 84)}${ui.skImg('100%', 84)}</div>
<div class="v-bar">${ui.btn('改约', { cls: 'ghost' })}${ui.btn('完成接诊', { attrs: 'data-go="rebook"' })}</div>
${homeBar()}</div>`;

  const rebook = `<div class="scr s16 p rb">${statusBar()}
${ui.nav({ title: '约复诊' })}
<div class="hdr">${ui.who({ ch: '陈', name: '陈思远', meta: '根管治疗 第 3 次 · 60 分钟', lg: true })}</div>
${ui.week([['一', 9], ['二', 10], ['三', 11], ['四', 12], ['五', 13, 'on'], ['六', 14], ['日', 15, 'off']])}
${ui.lh('上午', '可约 3 个')}
<div class="v-pad">${ui.slots([['09:00', 'off'], ['09:30', 'off'], ['10:00', 'on'], ['10:30'], ['11:00'], ['11:30', 'off']], 3)}</div>
${ui.lh('下午')}
${ui.err({ title: '加载失败', btn: '重试' })}
<div class="v-list v-pad">${ui.kv('医生', '林知远 · 2 号椅')}${ui.kv('提醒患者', '提前 1 天 · 短信')}</div>
<div class="v-bar">${ui.btn('确认 <span class="v-num">11/13</span> 周五 <span class="v-num">10:00</span>', { attrs: 'data-go="home"' })}</div>
${homeBar()}</div>`;

  const web = `<div class="web s16 p" style="height:800px">
${ui.side({
    logo: ui.logo('诊序', 'ZHENXU', 'tooth'),
    store: '望京门诊',
    items: [['layout-dashboard', '概览'], ['calendar-days', '预约', true], ['users-round', '患者', false, null, 'detail'], ['receipt-text', '收费'], ['phone-call', '回访', false, pending], ['chart-column', '报表'], ['settings', '设置']],
    me: { ch: '苏', name: '苏晴', role: '前台' },
  })}
<div class="v-main">
${ui.head({
    title: '预约',
    mid: ui.dateSw('11/06 周五') + ui.btn('今天', { cls: 'ghost d' }) + ui.seg(['日', '周'], 0),
    right: ui.btn('导出', { ic: 'download', cls: 'ghost' }) + ui.btn('新建预约', { ic: 'plus', attrs: 'data-go="rebook"' }),
  })}
${ui.kpis([
    { k: '今日预约', v: all.length, u: '位' },
    { k: '已到诊', v: arrived, u: '位' },
    { k: '待确认', v: pending, st: 'warn' },
    { k: '椅位使用率', v: rate, u: '%', bars: ui.bars(perHour.map((m, i) => [9 + i, m, i === 0]), { k: 36 / Math.max(...perHour), gap: 11 }) },
  ])}
<div class="v-fl">${ui.filter('医生', '全部')}${ui.filter('项目', '全部')}${ui.search('搜索患者或手机号', 220)}${ui.legend([['ok', '已到诊'], ['warn', '待确认'], ['bad', '爽约']])}</div>
${ui.timeline({ from: 9, to: 18, head: '椅位', tail: '分钟', now: '09:41', off: [['12:00', '13:30', '午休']], rows })}
${ui.pop({
    left: 364, top: 362, w: 282,
    html: ui.who({ ch: '陈', name: '陈思远', meta: '女 · 34 岁', st: ui.st('已到诊', 'ok') })
      + `<div class="v-list">${ui.kv('时间', '10:00 – 11:00')}${ui.kv('项目', '根管治疗 · 36')}${ui.kv('手机', '138 **** 6024')}${ui.kv('过敏史', ui.dot('bad') + '青霉素')}</div>`
      + `<div class="v-acts">${ui.btn('改约', { cls: 'ghost sm' })}${ui.btn('叫号', { cls: 'ghost sm', attrs: 'data-go="detail"' })}</div>`,
  })}
</div></div>`;

  return { name: '诊序', css, screens: { home, detail, rebook, web }, desktop: ['web'], start: 'web', url: 'app.zhenxu.cn', boardFont: "'PingFang SC','Noto Sans SC',sans-serif" };
};
