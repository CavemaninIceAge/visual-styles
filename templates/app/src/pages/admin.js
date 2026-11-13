// 电脑网页（管理后台）：整页显示，自己适配窄屏
import { definePage, ui, db, toast, esc } from '../shell.js';
import { stTag, when, markDone } from '../common.js';

definePage({
  route: 'a/list',
  render: (c) => `<div class="ad"><main class="ad-main">
<h1 class="v-h1">全部记录</h1>
<div class="ad-list">${db().items.map((x) => `<div class="ad-row"><b>${esc(x.title)}</b><span class="v-num">${when(x.at)}</span>${stTag(x.status)}${x.status === 'wait' ? ui.btn('处理', { cls: 'sm', attrs: `data-act="done" data-id="${x.id}"` }) : '<span></span>'}</div>`).join('')}</div>
</main></div>`,
  actions: { done: (c, el) => { markDone(el.dataset.id); toast('已处理'); } },
});
