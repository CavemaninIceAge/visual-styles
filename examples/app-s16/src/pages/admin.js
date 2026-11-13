// 物业后台：报修工单（列表、详情、派单、完成）、维修师傅
import { definePage, defineOverlay, openOverlay, closeOverlay, confirmBox, ui, icon, db, toast, setQuery, esc } from '../shell.js';
import { day } from '../data.js';
import { STATUS, stTag, kindName, worker, order, when, slotText, assign, finish, cancel, busy } from '../common.js';

const IC = (n, s = 16) => icon(n, s, 2);
const waiting = () => db().orders.filter((o) => o.status === 'wait').length;
// 后台骨架：左边侧栏，右边白色内容区
const frame = (cur, main) => `<div class="ad">${ui.side({
  logo: ui.logo('青桐物业', '', 'peak'),
  items: [['clipboard-list', '报修工单', cur === 'orders', waiting() || null, 'a/orders'], ['users', '维修师傅', cur === 'staff', null, 'a/staff']],
  me: { ch: '郑', name: '郑悦', role: '客服主管' },
})}<main class="v-main ad-main">${main}</main></div>`;

const TABS = [['all', '全部'], ['wait', '待受理'], ['sent', '已派单'], ['done', '已完成'], ['cancel', '已取消']];
// 操作列：待受理派单，已派单标记完成，别的看详情
const ops = (o) => (o.status === 'wait' ? ui.link('派单', { attrs: `data-act="assign" data-id="${o.id}"` })
  : o.status === 'sent' ? ui.link('完成', { attrs: `data-act="finish" data-id="${o.id}"` })
    : ui.link('详情', { attrs: `data-go="a/order/${o.id}"` }));

definePage({
  route: 'a/orders',
  render: (c) => {
    const tab = c.query.st || 'all';
    const q = String(c.state.q || '').trim();
    const all = db().orders;
    const list = all.filter((o) => (tab === 'all' || o.status === tab) && (!q || [o.room, o.owner, o.desc, o.no, kindName(o.kind)].some((x) => x.includes(q))));
    const count = (k) => (k === 'all' ? all.length : all.filter((o) => o.status === k).length);
    const today = all.filter((o) => o.status === 'done' && o.log[o.log.length - 1][0].slice(0, 10) === day(0)).length;
    return frame('orders', `
${ui.head({ title: '报修工单', right: `<label class="v-inp ad-q">${IC('search')}<input data-model="q" data-live value="${esc(c.state.q || '')}" placeholder="房号、业主、问题" autocomplete="off"></label>` })}
${ui.kpis([{ k: '待受理', v: count('wait'), u: '单', st: count('wait') ? 'idle' : '' }, { k: '已派单', v: count('sent'), u: '单', st: 'info' }, { k: '今天完成', v: today, u: '单', st: 'ok' }])}
<div class="v-tb ad-tb">${TABS.map(([k, t]) => `<span class="${k === tab ? 'on' : ''}" data-act="tab" data-k="${k}">${t}${c.phone ? '' : `<em>${count(k)}</em>`}</span>`).join('')}</div>
${!list.length ? `<div class="ad-empty">${ui.empty({ ic: 'search-x', title: q ? '没有找到相关工单' : '这里没有工单', h: 240 })}</div>`
    : c.phone ? `<div class="ad-cards">${list.map((o) => `<div class="ad-ci" data-go="a/order/${o.id}"><div class="ad-ci-a"><b>${esc(o.room)}</b>${stTag(o.status)}</div><p>${kindName(o.kind)}，${esc(o.desc)}</p><div class="ad-ci-c"><span class="v-num">${slotText(o.slot)}</span>${ops(o)}</div></div>`).join('')}</div>`
    : `<div class="ad-tw"><table class="v-tbl ad-tbl"><colgroup><col style="width:136px"><col style="width:168px"><col style="width:96px"><col><col class="ad-o" style="width:168px"><col style="width:104px"><col style="width:88px"></colgroup>
<tr><th>单号</th><th>房号</th><th>类型</th><th>问题</th><th class="ad-o">上门时间</th><th>状态</th><th>操作</th></tr>
${list.map((o) => `<tr class="ad-r" data-go="a/order/${o.id}"><td class="v-num">${o.no}</td><td><b class="ad-room">${esc(o.room)}</b><small>${esc(o.owner)}</small></td><td>${kindName(o.kind)}</td><td><span class="ad-desc">${esc(o.desc)}</span></td><td class="ad-o v-num">${slotText(o.slot)}</td><td>${stTag(o.status)}</td><td class="ad-op">${ops(o)}</td></tr>`).join('')}
</table></div>`}
`);
  },
  actions: {
    tab: (c, el) => setQuery({ st: el.dataset.k === 'all' ? '' : el.dataset.k }),
    assign: (c, el) => openOverlay('assign', { order: el.dataset.id, pick: '' }),
    finish: (c, el) => askFinish(el.dataset.id),
  },
});

function askFinish(id) {
  const o = order(id);
  confirmBox({ title: '标记维修完成', text: `${esc(o.room)} 的${kindName(o.kind)}报修，${worker(o.worker).name}已经修好了？业主那边会看到「已完成」。`, ok: '标记完成', onOk: () => { finish(id); toast('已标记完成'); } });
}

defineOverlay('assign', {
  kind: 'dialog',
  w: 480,
  title: '派单',
  render: (o) => {
    const r = order(o.order);
    return `<p class="ad-dlg-p">${esc(r.room)}，${kindName(r.kind)}，${slotText(r.slot)} 上门</p>
<div class="ad-pick">${db().workers.map((w) => `<button type="button" class="ad-w ${o.pick === w.id ? 'on' : ''}" data-act="pick" data-w="${w.id}">${ui.av(w.name[0], 36)}<span><b>${w.name}</b><small>${w.trade}</small></span><em class="v-num">手上 ${busy(w.id)} 单</em>${o.pick === w.id ? IC('check', 18) : ''}</button>`).join('')}</div>
<div class="as-ov-f">${ui.btn('取消', { cls: 'ghost', attrs: 'data-act="_close"' })}${ui.btn('派单', { attrs: `data-act="go" ${o.pick ? '' : 'aria-disabled="true"'}` })}</div>`;
  },
  actions: {
    pick: (o, c, el) => { o.pick = el.dataset.w; },
    go: (o) => { assign(o.order, o.pick); closeOverlay(o); toast('已派给' + worker(o.pick).name); },
  },
});
definePage({
  route: 'a/order/:id',
  render: (c) => {
    const o = order(c.params.id);
    if (!o) return frame('orders', ui.empty({ ic: 'inbox', title: '这张工单不在了', h: 240 }));
    const w = worker(o.worker);
    const acts = o.status === 'wait' ? `${ui.btn('取消工单', { cls: 'ghost', attrs: 'data-act="cancel"' })}${ui.btn('派单', { ic: 'user-check', attrs: 'data-act="assign"' })}`
      : o.status === 'sent' ? ui.btn('标记完成', { ic: 'check', attrs: 'data-act="finish"' }) : '';
    return frame('orders', `
<div class="ad-back" data-back>${IC('chevron-left')}<span>报修工单</span></div>
${ui.head({ title: `${kindName(o.kind)}报修`, mid: stTag(o.status), right: acts })}
<div class="ad-detail">
<section class="ad-card"><h3 class="v-h3">报修内容</h3>
<p class="ad-big">${esc(o.desc)}</p>
<div class="ad-kv">${[['单号', `<span class="v-num">${o.no}</span>`], ['房号', esc(o.room)], ['业主', esc(o.owner)], ['电话', `<span class="v-num">${esc(o.phone)}</span>`], ['上门时间', slotText(o.slot)], ['维修师傅', w ? `${w.name}，${w.trade}` : '还没派单']].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div></section>
<section class="ad-card"><h3 class="v-h3">处理进度</h3>
<div class="ad-log">${o.log.slice().reverse().map(([t, x]) => `<div><span class="v-num">${when(t)}</span><b>${esc(x)}</b></div>`).join('')}</div></section>
</div>`);
  },
  actions: {
    assign: (c) => openOverlay('assign', { order: c.params.id, pick: '' }),
    finish: (c) => askFinish(c.params.id),
    cancel: (c) => confirmBox({ title: '取消这张工单', text: '业主会看到「已取消」。', ok: '取消工单', danger: true, onOk: () => { cancel(c.params.id, 'staff'); toast('工单已取消'); } }),
  },
});

definePage({
  route: 'a/staff',
  render: (c) => frame('staff', `
${ui.head({ title: '维修师傅' })}
${c.phone ? `<div class="ad-cards">${db().workers.map((w) => `<div class="ad-ci"><div class="ad-ci-a">${ui.emp({ ch: w.name[0], name: w.name, meta: w.trade })}<span class="v-num">手上 ${busy(w.id)} 单</span></div><div class="ad-ci-c"><span class="v-num">${w.phone}</span></div></div>`).join('')}</div>` : `<div class="ad-tw"><table class="v-tbl ad-tbl"><colgroup><col style="width:220px"><col style="width:120px"><col><col style="width:120px"></colgroup>
<tr><th>师傅</th><th>工种</th><th>电话</th><th>手上工单</th></tr>
${db().workers.map((w) => `<tr><td>${ui.emp({ ch: w.name[0], name: w.name })}</td><td>${w.trade}</td><td class="v-num">${w.phone}</td><td class="v-num">${busy(w.id)} 单</td></tr>`).join('')}
</table></div>`}`),
});

