// 业主 App：报修首页、我要报修、报修详情、我的
import { definePage, ui, icon, db, go, toast, confirmBox, clearState, esc } from '../shell.js';
import { KINDS } from '../data.js';
import { STATUS, stTag, kindName, worker, order, when, slotText, slots, submitOrder, cancel } from '../common.js';

const IC = (n, s = 20) => icon(n, s, 2);

definePage({
  route: 'm/home',
  title: '报修',
  tab: 0,
  render: () => {
    const d = db();
    const mine = d.orders.filter((o) => o.mine);
    const open = mine.filter((o) => o.status === 'wait' || o.status === 'sent').length;
    return `<div class="m-home">
<div class="m-house"><div class="m-house-t">${IC('house', 20)}<b>${esc(d.me.room)}</b></div>${ui.btn('我要报修', { cls: 'wide', ic: 'wrench', attrs: 'data-go="m/new"' })}</div>
${ui.lh('我的报修', open ? `${open} 单在处理` : '')}
${mine.length ? `<div class="v-list box m-list">${mine.map((o) => `<div class="m-item" data-go="m/req/${o.id}">
<div class="m-item-a"><b>${kindName(o.kind)}</b>${stTag(o.status)}</div>
<p class="m-item-d">${esc(o.desc)}</p><div class="m-item-c v-num">${when(o.at)}</div></div>`).join('')}</div>`
    : `<div class="m-pad">${ui.empty({ ic: 'inbox', title: '还没有报修', h: 200 })}</div>`}
</div>`;
  },
});

definePage({
  route: 'm/new',
  title: '我要报修',
  init: (c) => { const me = db().me; Object.assign(c.state, { kind: '', room: me.room, desc: '', slot: '', phone: me.phone }); },
  render: (c) => {
    const s = c.state;
    return `<div class="m-form">
${ui.lh('报修类型')}<div class="m-chips">${KINDS.map(([k, t]) => `<button type="button" class="v-chip ${s.kind === k ? 'on' : ''}" data-act="kind" data-v="${k}">${s.kind === k ? IC('check', 16) : ''}${t}</button>`).join('')}</div>
${ui.lh('位置')}<label class="v-inp m-inp">${IC('map-pin', 18)}<input data-model="room" value="${esc(s.room)}" autocomplete="off"></label>
${ui.lh('问题描述')}<label class="v-inp m-inp m-area"><textarea data-model="desc" rows="4" placeholder="比如：厨房水槽下面一直滴水">${esc(s.desc)}</textarea></label>
${ui.lh('上门时间')}<div class="m-chips m-slots">${slots().map((x) => `<button type="button" class="v-chip ${s.slot === x.key ? 'on' : ''}" data-act="slot" data-v="${x.key}">${s.slot === x.key ? IC('check', 16) : ''}${x.label}</button>`).join('')}</div>
${ui.lh('联系电话')}<label class="v-inp m-inp">${IC('phone', 18)}<input data-model="phone" value="${esc(s.phone)}" inputmode="tel" autocomplete="off"></label>
</div>`;
  },
  foot: () => ui.btn('提交报修', { cls: 'wide', attrs: 'data-act="submit"' }),
  actions: {
    kind: (c, el) => { c.state.kind = el.dataset.v; },
    slot: (c, el) => { c.state.slot = el.dataset.v; },
    submit: (c) => {
      const s = c.state;
      if (!s.kind) return toast('先选报修类型', 'warn');
      if (String(s.desc).trim().length < 4) return toast('问题描述再写具体一点', 'warn');
      if (!s.slot) return toast('选一个上门时间', 'warn');
      if (!String(s.room).trim()) return toast('位置不能空着', 'warn');
      const sl = slots().find((x) => x.key === s.slot);
      const o = submitOrder({ kind: s.kind, room: s.room.trim(), desc: s.desc.trim(), slot: { date: sl.date, part: sl.part }, phone: s.phone.trim() });
      clearState('m/new');
      go('m/req/' + o.id, { replace: true });
      toast('已提交');
    },
  },
});

definePage({
  route: 'm/req/:id',
  title: '报修详情',
  render: (c) => {
    const o = order(c.params.id);
    if (!o) return `<div class="m-pad">${ui.empty({ ic: 'inbox', title: '这条报修不在了', h: 240 })}</div>`;
    const w = worker(o.worker);
    const [name, kind] = STATUS[o.status];
    const line = o.status === 'wait' ? `提交于 ${when(o.at)}` : o.status === 'sent' ? `${w.name}师傅 ${slotText(o.slot)} 上门` : o.status === 'done' ? `完成于 ${when(o.log[o.log.length - 1][0])}` : `取消于 ${when(o.log[o.log.length - 1][0])}`;
    return `<div class="m-req">
<div class="m-st m-st-${o.status}">${o.status === 'cancel' ? ui.sign('bad', 28, '#8F959E') : ui.sign(kind, 28)}<div><b>${name}</b><p>${line}</p></div></div>
${w ? `<div class="v-list box m-worker">${ui.who({ ch: w.name[0], name: w.name + '师傅', meta: w.trade + '维修', st: `<a class="v-btn ghost sm" href="tel:${w.phone.replace(/\s/g, '')}">${IC('phone', 16)}打电话</a>` })}</div>` : ''}
${ui.lh('报修内容')}
<div class="v-list box">${ui.kv('类型', kindName(o.kind))}${ui.kv('位置', esc(o.room))}${ui.kv('上门时间', slotText(o.slot))}${ui.kv('联系电话', `<span class="v-num">${esc(o.phone)}</span>`)}<p class="m-desc">${esc(o.desc)}</p></div>
${ui.lh('处理进度')}
<div class="v-list box m-log">${o.log.slice().reverse().map(([t, x], i) => `<div class="m-log-i ${i === 0 ? 'now' : ''}">${i === 0 && o.status !== 'cancel' ? ui.sign(kind, 16) : ui.sign('done', 16)}<b>${esc(x)}</b><span class="v-num">${when(t)}</span></div>`).join('')}</div>
</div>`;
  },
  foot: (c) => {
    const o = order(c.params.id);
    if (!o) return '';
    if (o.status === 'wait') return ui.btn('取消报修', { cls: 'wide ghost', attrs: 'data-act="cancel"' });
    if (o.status === 'done' || o.status === 'cancel') return ui.btn('再报一单', { cls: 'wide ghost', attrs: 'data-go="m/new"' });
    return '';
  },
  actions: {
    cancel: (c) => confirmBox({ title: '取消这次报修', text: '物业还没派单，取消后不会有人上门。', ok: '取消报修', danger: true, onOk: () => { cancel(c.params.id, 'owner'); toast('已取消'); } }),
  },
});

definePage({
  route: 'm/me',
  title: '我的',
  tab: 1,
  render: () => {
    const me = db().me;
    return `<div class="m-me">
<div class="v-list box m-who">${ui.who({ ch: me.name[0], name: me.name, meta: '业主', lg: true })}</div>
<div class="v-list box">${ui.kv('房屋', esc(me.room), { ic: 'house' })}${ui.kv('手机号', `<span class="v-num">${esc(me.phone)}</span>`, { ic: 'phone' })}${ui.kv('物业服务中心', '<span class="v-num">400 862 3150</span>', { ic: 'headset' })}</div>
<div class="v-list box"><button type="button" class="m-row-btn" data-act="_reset">${IC('rotate-ccw', 18)}<span>恢复演示数据</span></button></div>
</div>`;
  },
});
