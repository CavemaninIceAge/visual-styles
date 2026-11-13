// __NAME__：入口。先载入各页面（它们自己 definePage 注册），再启动
// 几端写在 ends 里：kind 'app'（手机 App）、'mini'（小程序，自动带微信胶囊）、'web'（电脑网页，整页不套框）
// 电脑上打开：手机端放进手机外框，网页端整页，几端都有时顶上一条切换；手机上打开：手机端直接全屏
import { createApp } from './shell.js';
import { seed } from './data.js';
import './pages/phone.js'; //@phone
import './pages/admin.js'; //@web

createApp({
  name: '__NAME__',
  key: '__KEY__',          // 浏览器里存数据用的名字，换项目要换
  version: 1,              // 改了 seed 的数据结构就加一，旧的存档作废
  seed,
  ends: [
    { key: 'm', kind: '__KIND__', label: '__LABEL__', home: 'm/home', tabs: [['house', '首页', 'm/home'], ['user', '我的', 'm/me']] }, //@phone
    { key: 'a', kind: 'web', label: '管理后台', home: 'a/list' }, //@web
  ],
});
