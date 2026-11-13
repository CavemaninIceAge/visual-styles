// 手机端：首页（列表 + 新建）、详情、我的
import { definePage, ui, db, go, toast, clearState, esc } from '../shell.js';
import { stTag, item, when, addItem } from '../common.js';

definePage({
  route: 'm/home',
  title: '__NAME__',
  tab: 0,
  render: () => `<div class="m-list">${db().items.map((x) => `<div class="m-item" data-go="m/item/${x.id}"><b>${esc(x.title)}</b>${stTag(x.status)}<span class="v-num">${when(x.at)}</span></div>`).join('')}</div>`,
  foot: () => ui.btn('新建', { cls: 'wide', attrs: 'data-go="m/new"' }),
});

definePage({
  route: 'm/new',
  title: '新建',
  init: (c) => { c.state.title = ''; },
  render: (c) => `<div class="m-form"><h2 class="v-h2">内容</h2><label class="v-inp m-inp"><input data-model="title" value="${esc(c.state.title)}" placeholder="写点什么" autocomplete="off"></label></div>`,
  foot: () => ui.btn('提交', { cls: 'wide', attrs: 'data-act="submit"' }),
  actions: {
    submit: (c) => {
      if (!String(c.state.title).trim()) return toast('先写内容', 'warn');
      const x = addItem(c.state.title.trim());
      clearState('m/new');
      go('m/item/' + x.id, { replace: true });
      toast('已提交');
    },
  },
});

definePage({
  route: 'm/item/:id',
  title: '详情',
  render: (c) => {
    const x = item(c.params.id);
    if (!x) return '<div class="m-detail"><h2 class="v-h2">这一条不在了</h2></div>';
    return `<div class="m-detail"><h1 class="v-h1">${esc(x.title)}</h1>${stTag(x.status)}<p class="v-mut v-num">${when(x.at)}</p></div>`;
  },
});

definePage({
  route: 'm/me',
  title: '我的',
  tab: 1,
  render: () => `<div class="v-list m-me"><div class="v-row"><span class="v-mut">手机号</span><b class="v-num">${esc(db().me.phone)}</b></div><button type="button" class="v-row m-row-btn" data-act="_reset">恢复演示数据</button></div>`,
});
