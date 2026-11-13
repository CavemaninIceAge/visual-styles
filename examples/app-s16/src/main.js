// 入口：先载入各页面（它们自己 definePage 注册），再启动
import { createApp, ui } from './shell.js';
import { seed } from './data.js';
import './pages/phone.js';
import './pages/admin.js';

createApp({
  name: '青桐物业',
  key: 'qingtong-repair',
  version: 1,
  seed,
  brand: ui.logo('青桐物业', '', 'peak'),   // 电脑上顶部切换条左边的字标，和后台侧栏一致
  ends: [
    { key: 'm', kind: 'app', label: '业主 App', home: 'm/home', tabs: [['wrench', '报修', 'm/home'], ['user', '我的', 'm/me']] },
    { key: 'a', kind: 'web', label: '物业后台', home: 'a/orders' },
  ],
});
