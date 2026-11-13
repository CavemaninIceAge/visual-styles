// 图标清单：起手包、图册原模块、样例和模板实际传给 icon() 的全部名字，按意思分四组；extra 是现在没用到、以后出 demo 常用的
// 名字沿用 lucide 的叫法（老代码不用改），形状全部自己画，规矩见 SPEC.md
module.exports = {
  actions: {
    title: '导航和操作',
    used: [
      'arrow-left', 'arrow-right', 'arrow-up', 'arrow-up-right', 'chevron-left', 'chevron-right', 'chevron-down', 'chevrons-up-down',
      'check', 'plus', 'minus', 'x', 'ellipsis', 'search', 'share', 'share-2', 'download', 'refresh-cw', 'rotate-ccw', 'rotate-cw',
      'maximize', 'sliders-horizontal', 'settings', 'log-in', 'log-out', 'house', 'layout-dashboard', 'layout-grid', 'grid-2x2',
      'square', 'a-large-small', 'power',
    ],
    extra: ['menu', 'filter', 'pencil', 'trash-2', 'copy', 'eye'],
  },
  objects: {
    title: '物件和媒体',
    used: [
      'armchair', 'bath', 'bed-double', 'brush', 'car', 'car-front', 'coffee', 'cup-soda', 'croissant', 'fan', 'washing-machine',
      'weight', 'wrench', 'scissors', 'stethoscope', 'package-open', 'file-check-2', 'clipboard-check', 'layers', 'laptop',
      'image', 'images', 'film', 'disc-3', 'music', 'list-music', 'audio-lines', 'radio', 'play', 'pause', 'skip-back',
      'skip-forward', 'shuffle',
    ],
    extra: ['gift', 'book-open', 'monitor', 'smartphone', 'camera', 'clipboard-list'],
  },
  people: {
    title: '人、地点和沟通',
    used: [
      'user', 'user-round', 'users', 'users-round', 'circle-user', 'badge-check', 'message-circle', 'phone', 'phone-call', 'send',
      'bell', 'mic-vocal', 'headphones', 'notebook-pen', 'heart', 'star', 'bookmark', 'award', 'sparkles', 'map', 'map-pin',
      'map-pin-check', 'route', 'navigation', 'locate', 'locate-fixed', 'footprints', 'store', 'building-2', 'trees',
    ],
    extra: ['mail', 'languages', 'user-plus', 'thumbs-up', 'mic', 'globe', 'video', 'link'],
  },
  status: {
    title: '时间、状态和交易',
    used: [
      'calendar', 'calendar-days', 'calendar-clock', 'calendar-plus', 'clock', 'clock-3', 'history', 'sun', 'moon', 'sunrise',
      'cloud', 'cloud-sun', 'cloud-drizzle', 'cloud-lightning', 'wind', 'zap', 'activity', 'chart-column', 'chart-spline',
      'chart-pie', 'circle-check', 'circle-help', 'wifi-off', 'lock', 'inbox', 'qr-code', 'receipt-text', 'ticket',
      'shopping-bag', 'wallet',
    ],
    extra: ['credit-card', 'tag', 'percent', 'truck', 'timer', 'triangle-alert', 'circle-x', 'info', 'sigma'],
  },
};
