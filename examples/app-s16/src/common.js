// 两端共用：状态、格式、改数据的几个动作（手机端提交，后台派单、完成，都走这里，两端看到的是同一份数据）
import { ui, db, mutate, uid, esc } from './shell.js';
import { day, nowStamp, KINDS, PARTS } from './data.js';

// 状态：每种一个记号形状加文字，不只靠颜色
export const STATUS = { wait: ['待受理', 'idle'], sent: ['已派单', 'info'], done: ['已完成', 'ok'], cancel: ['已取消', 'bad'] };
export const stTag = (s) => (s === 'cancel' ? `<span class="v-st v-tg-gray">${ui.sign('bad', 12, '#646A73')}已取消</span>` : ui.st(STATUS[s][0], STATUS[s][1]));
export const kindName = (k) => (KINDS.find((x) => x[0] === k) || [k, k])[1];
export const worker = (id) => db().workers.find((w) => w.id === id) || null;
export const order = (id) => db().orders.find((o) => o.id === id) || null;

// 时间：今天写「今天 14:20」，昨天「昨天 19:06」，更早「11-09 20:12」
export const when = (s) => { const d = s.slice(0, 10); const t = s.slice(11, 16); return d === day(0) ? '今天 ' + t : d === day(-1) ? '昨天 ' + t : d.slice(5) + ' ' + t; };
const dayWord = (d) => (d === day(0) ? '今天' : d === day(1) ? '明天' : d === day(2) ? '后天' : d.slice(5));
export const slotText = (sl) => `${dayWord(sl.date)} ${PARTS[sl.part]}`;
// 可选的上门时间：明天、后天的上午和下午
export const slots = () => [1, 2].flatMap((off) => ['am', 'pm'].map((part) => ({ key: `${off}${part}`, date: day(off), part, label: `${dayWord(day(off))}${part === 'am' ? '上午' : '下午'}` })));

// 改数据
export function submitOrder({ kind, room, desc, slot, phone }) {
  return mutate((d) => {
    const id = uid('r');
    const n = d.orders.filter((o) => o.at.slice(0, 10) === day(0)).length + 1;
    const o = { id, no: 'BX' + day(0).slice(2).replace(/-/g, '') + String(n + 10).padStart(2, '0'), mine: true, owner: d.me.name, room, phone, kind, desc, slot, status: 'wait', worker: null, at: nowStamp(), log: [[nowStamp(), '业主提交报修']] };
    d.orders.unshift(o);
    return o;
  });
}
export const assign = (id, wid) => mutate(() => { const o = order(id); const w = worker(wid); o.status = 'sent'; o.worker = wid; o.log.push([nowStamp(), '派单给' + w.name]); });
export const finish = (id) => mutate(() => { const o = order(id); o.status = 'done'; o.log.push([nowStamp(), '维修完成']); });
export const cancel = (id, by) => mutate(() => { const o = order(id); o.status = 'cancel'; o.log.push([nowStamp(), by === 'owner' ? '业主取消报修' : '物业取消工单']); });
export const busy = (wid) => db().orders.filter((o) => o.worker === wid && o.status === 'sent').length;

export { esc };
