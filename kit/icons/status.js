// 自己画的图标：时间、状态和交易（names.js 的 status 组）。规矩见 SPEC.md
// 每个名字对应 24×24 画布里的 SVG 内部标记；颜色只用 currentColor，淡色层写 class="t"，压在淡色层上的细节写 class="k"
// 部件：钟面直径 20、指针竖 5 斜 45 度；圆形状态底直径 20，勾叉问号叹号按 12 见方放，点是半径 1.25 的实心小圆；
// 日历本体 18×16 圆角 3、两个吊环在 x 8 和 16；云是平底三个包（两边一样大、中间大一圈），小号的云同一比例；
// 挖空的细节（class k）写在外框前面，实心时外框能盖住它的两头
module.exports = {
  // ---------- 日历和时间 ----------
  'calendar': '<rect class="t" x="3" y="5" width="18" height="16" rx="3"/><path class="k" d="M3 10h18"/><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4"/>',
  'calendar-days': '=calendar',
  'calendar-clock': '<circle class="t" cx="17" cy="17" r="5"/><path class="k" d="M17 14v3l2 2"/><path d="M10 21H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2H3M8 3v4M16 3v4"/><circle cx="17" cy="17" r="5"/>',
  'calendar-plus': '<rect class="t" x="3" y="5" width="18" height="16" rx="3"/><path class="k" d="M3 10h18M12 12.5v6M9 15.5h6"/><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4"/>',
  'clock': '<circle class="t" cx="12" cy="12" r="10"/><path class="k" d="M12 7v5l3 3"/><circle cx="12" cy="12" r="10"/>',
  'clock-3': '=clock',
  'history': '<path d="M2 9.5 4.5 12 7 9.5M4.5 12A8.5 8.5 0 1 1 6.99 18.01"/><path d="M13 7.5V12l3 3"/>',
  'timer': '<circle class="t" cx="12" cy="13.5" r="8.5"/><path class="k" d="M12 13.5 15.5 10"/><circle cx="12" cy="13.5" r="8.5"/><path d="M9 2h6M12 2v3"/>',

  // ---------- 天气 ----------
  'sun': '<circle class="t" cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  'moon': '<path class="t" d="M12 2A10 10 0 1 0 22 12A7.5 7.5 0 0 1 12 2Z"/><path d="M12 2A10 10 0 1 0 22 12A7.5 7.5 0 0 1 12 2Z"/>',
  'sunrise': '<path class="t" d="M6 20a6 6 0 0 1 12 0Z"/><path d="M2 20h4a6 6 0 0 1 12 0h4"/><path d="M12 11V4M9.5 6.5 12 4l2.5 2.5"/><path d="M6 14 3.5 11.5M18 14l2.5-2.5"/>',
  'cloud': '<path class="t" d="M6.5 20A4.5 4.5 0 0 1 6.5 11A5.66 5.66 0 1 1 17.5 11A4.5 4.5 0 0 1 17.5 20Z"/><path d="M6.5 20A4.5 4.5 0 0 1 6.5 11A5.66 5.66 0 1 1 17.5 11A4.5 4.5 0 0 1 17.5 20Z"/>',
  'cloud-sun': '<path class="t" d="M5.5 21A3.5 3.5 0 0 1 5.5 14A4.59 4.59 0 1 1 14.5 14A3.5 3.5 0 0 1 14.5 21Z"/><path d="M5.5 21A3.5 3.5 0 0 1 5.5 14A4.59 4.59 0 1 1 14.5 14A3.5 3.5 0 0 1 14.5 21Z"/><path d="M13.24 6.78A3 3 0 0 1 16.87 11.34"/><path d="M14.5 4.5V2M18 6l2-2M19.5 9.5H22M18 13l2 2"/>',
  'cloud-drizzle': '<path class="t" d="M7.5 14.5A3.5 3.5 0 0 1 7.5 7.5A4.59 4.59 0 1 1 16.5 7.5A3.5 3.5 0 0 1 16.5 14.5Z"/><path d="M7.5 14.5A3.5 3.5 0 0 1 7.5 7.5A4.59 4.59 0 1 1 16.5 7.5A3.5 3.5 0 0 1 16.5 14.5Z"/><path d="M7 17.5v3M12 18.5v3M17 17.5v3"/>',
  'cloud-lightning': '<path class="t" d="M7.5 14.5A3.5 3.5 0 0 1 7.5 7.5A4.59 4.59 0 1 1 16.5 7.5A3.5 3.5 0 0 1 16.5 14.5Z"/><path d="M9.5 14.5H7.5A3.5 3.5 0 0 1 7.5 7.5A4.59 4.59 0 1 1 16.5 7.5A3.5 3.5 0 0 1 16.5 14.5H14.5"/><path d="M13.5 11.5 10.5 16.5H14.5L11.5 21.5"/>',
  'wind': '<path d="M3 9h15a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>',
  'zap': '<polygon class="t" points="15 2 5 14 9 14 9 22 19 10 15 10"/><polygon points="15 2 5 14 9 14 9 22 19 10 15 10"/>',

  // ---------- 数据和图表 ----------
  'activity': '<polyline points="2 12 6 12 9 6 15 18 18 12 22 12"/>',
  'chart-column': '<rect class="t" x="3" y="3" width="18" height="18" rx="3"/><path class="k" d="M7 17v-4M12 17V7M17 17v-7"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
  'chart-spline': '<rect class="t" x="3" y="3" width="18" height="18" rx="3"/><path class="k" d="M7 16c2.5 0 2.5-7 5-7s2.5 5 5 5"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
  'chart-pie': '<path class="t" d="M14 2a8 8 0 0 1 8 8h-8Z"/><path d="M14 2a8 8 0 0 1 8 8h-8Z"/><path d="M10 6A8 8 0 1 0 18 14H10Z"/>',
  'sigma': '<polyline points="19 2.5 5 2.5 10.5 12 5 21.5 19 21.5"/>',
  'percent': '<path d="M20 4 4 20"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>',

  // ---------- 状态 ----------
  'circle-check': '<circle class="t" cx="12" cy="12" r="10"/><path class="k" d="M7.5 12l3 3 6-6"/><circle cx="12" cy="12" r="10"/>',
  'circle-x': '<circle class="t" cx="12" cy="12" r="10"/><path class="k" d="M8 8l8 8M16 8l-8 8"/><circle cx="12" cy="12" r="10"/>',
  'circle-help': '<circle class="t" cx="12" cy="12" r="10"/><path class="k" d="M8.5 8.5a3.5 3.5 0 1 1 3.5 3.5v2"/><circle class="sk" cx="12" cy="17.5" r="1.25"/><circle cx="12" cy="12" r="10"/>',
  'info': '<circle class="t" cx="12" cy="12" r="10"/><path class="k" d="M12 11v6"/><circle class="sk" cx="12" cy="7.5" r="1.25"/><circle cx="12" cy="12" r="10"/>',
  'triangle-alert': '<polygon class="t" points="12 4.5 22 21.5 2 21.5"/><path class="k" d="M12 9.5v5"/><circle class="sk" cx="12" cy="18" r="1.25"/><polygon points="12 4.5 22 21.5 2 21.5"/>',
  'wifi-off': '<path d="M3.51 11.51A12 12 0 0 1 20.49 11.51M7.76 15.76A6 6 0 0 1 16.24 15.76"/><circle class="s" cx="12" cy="20" r="1.25"/><path d="M3 3l18 18"/>',
  'lock': '<rect class="t" x="4" y="10" width="16" height="11" rx="2.5"/><path class="k" d="M12 14v3"/><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  'inbox': '<rect class="t" x="3" y="3" width="18" height="18" rx="3"/><path class="k" d="M3 13h4l3 3h4l3-3h4"/><rect x="3" y="3" width="18" height="18" rx="3"/>',

  // ---------- 交易 ----------
  'qr-code': '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path class="s" d="M14 14h3v3h-3ZM18 18h3v3h-3Z"/>',
  'receipt-text': '<path class="t" d="M4 22V4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5V22l-2-2-2 2-2-2-2 2-2-2-2 2-2-2Z"/><path class="k" d="M8 8h8M8 13h8"/><path d="M4 22V4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5V22l-2-2-2 2-2-2-2 2-2-2-2 2-2-2Z"/>',
  'ticket': '<path class="t" d="M4.5 5H13a2.5 2.5 0 0 0 5 0h1.5A2.5 2.5 0 0 1 22 7.5v9a2.5 2.5 0 0 1-2.5 2.5H18a2.5 2.5 0 0 0-5 0H4.5A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5Z"/><path class="k" d="M15.5 10v4"/><path d="M4.5 5H13a2.5 2.5 0 0 0 5 0h1.5A2.5 2.5 0 0 1 22 7.5v9a2.5 2.5 0 0 1-2.5 2.5H18a2.5 2.5 0 0 0-5 0H4.5A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5Z"/>',
  'shopping-bag': '<rect class="t" x="4" y="8" width="16" height="13" rx="2.5"/><path d="M7 8a5 5 0 0 1 10 0h.5A2.5 2.5 0 0 1 20 10.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-8A2.5 2.5 0 0 1 6.5 8H17"/>',
  'wallet': '<rect class="t" x="2" y="4" width="20" height="16" rx="3"/><path class="k" d="M22 9h-5a3 3 0 0 0 0 6h5"/><rect x="2" y="4" width="20" height="16" rx="3"/>',
  'credit-card': '<rect class="t" x="2" y="5" width="20" height="14" rx="2.5"/><path class="k" d="M2 10h20M6 15h4"/><rect x="2" y="5" width="20" height="14" rx="2.5"/>',
  'tag': '<polygon class="t" points="3 3 11 3 21 13 13 21 3 11"/><circle class="k" cx="8" cy="8" r="1.5"/><polygon points="3 3 11 3 21 13 13 21 3 11"/>',
  'truck': '<path class="t" d="M2 16V6.5A2.5 2.5 0 0 1 4.5 4h7A2.5 2.5 0 0 1 14 6.5V9h4l4 4v3Z"/><path d="M2 16V6.5A2.5 2.5 0 0 1 4.5 4h7A2.5 2.5 0 0 1 14 6.5V9h4l4 4v3Z"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
};
