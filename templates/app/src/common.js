// 几端共用：状态、格式、改数据的动作。改数据一律走 mutate()，存进浏览器、几端同时看到
import { status, db, mutate, uid } from './shell.js';
import { day, nowStamp } from './data.js';

// 状态：记号形状加文字，不只靠颜色
export const STATUS = { wait: ['待处理', 'idle'], done: ['已处理', 'ok'] };
export const stTag = (s) => status(STATUS[s][0], STATUS[s][1]);
export const item = (id) => db().items.find((x) => x.id === id) || null;
export const when = (s) => { const d = s.slice(0, 10); const t = s.slice(11, 16); return d === day(0) ? '今天 ' + t : d === day(-1) ? '昨天 ' + t : d.slice(5) + ' ' + t; };

export const addItem = (title) => mutate((d) => { const x = { id: uid('i'), title, at: nowStamp(), status: 'wait' }; d.items.unshift(x); return x; });
export const markDone = (id) => mutate(() => { item(id).status = 'done'; });
