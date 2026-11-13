// 自己画的图标：人、地点和沟通。要画哪些名字见 names.js 的 people，规矩见 SPEC.md
// 每个名字对应 24×24 画布里的 SVG 内部标记；颜色只用 currentColor，淡色层写 class="t"，压在淡色层上的细节写 class="k"
// 和另一个名字画成同一个形状时写 '=那个名字'
//
// 这一组定下来的部件（同组照用）：
//   人：头是圆，半径 4、圆心 (12, 6.5)；身子是底边封口的半圆，半径 8、底边 y 22（4 到 20）。头和身子中线隔 3.5，线宽 2.6 时也不粘
//   缩小的人（两人、加人）：头半径 3.5，身子半径 5 或 7，头和身子仍隔 3.5
//   气泡：圆的左下角做成直角当尾巴，不另画小尾巴；languages 是会说话的地球（气泡里画经线和赤道），不用「文A」
//   话筒、定位针、勋章：圆在上，下面接直线或 45 度斜线
module.exports = {
  // ---------- 人 ----------
  'user': '<path class="t" d="M8 6.5a4 4 0 1 0 8 0a4 4 0 1 0-8 0zM4 22a8 8 0 0 1 16 0z"/>'
    + '<circle cx="12" cy="6.5" r="4"/><path d="M4 22a8 8 0 0 1 16 0z"/>',
  'user-round': '=user',
  'users': '<path class="t" d="M3.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0zM13.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0zM2 20a5 5 0 0 1 10 0a5 5 0 0 1 10 0z"/>'
    + '<circle cx="7" cy="8" r="3.5"/><circle cx="17" cy="8" r="3.5"/><path d="M2 20a5 5 0 0 1 10 0a5 5 0 0 1 10 0z"/>',
  'users-round': '=users',
  'circle-user': '<circle class="t" cx="12" cy="12" r="10"/>'
    + '<circle cx="12" cy="12" r="10"/><circle class="k" cx="12" cy="9.5" r="3.5"/><path class="k" d="M6 20a6.5 6.5 0 0 1 12 0"/>',
  'user-plus': '<path class="t" d="M5.5 7a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0zM2 21a7 7 0 0 1 14 0z"/>'
    + '<circle cx="9" cy="7" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0z"/><path d="M19 4v6M16 7h6"/>',
  'badge-check': '<polygon class="t" points="12 2 15 5 19 5 19 9 22 12 19 15 19 19 15 19 12 22 9 19 5 19 5 15 2 12 5 9 5 5 9 5"/>'
    + '<polygon points="12 2 15 5 19 5 19 9 22 12 19 15 19 19 15 19 12 22 9 19 5 19 5 15 2 12 5 9 5 5 9 5"/><path class="k" d="M8.5 12.5l2.5 2.5 5-5"/>',
  'thumbs-up': '<path class="t" d="M8 21V11h2V5.5a2.5 2.5 0 0 1 5 0V11h3.5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0 5z"/>'
    + '<path d="M8 21V11h2V5.5a2.5 2.5 0 0 1 5 0V11h3.5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0 5z"/><rect x="3" y="11" width="5" height="10" rx="1.5"/>',

  // ---------- 沟通 ----------
  'message-circle': '<path class="t" d="M3 12a9 9 0 1 1 9 9H3z"/><path d="M3 12a9 9 0 1 1 9 9H3z"/>',
  'languages': '<path class="t" d="M3 12a9 9 0 1 1 9 9H3z"/>'
    + '<path d="M3 12a9 9 0 1 1 9 9H3z"/><ellipse class="k" cx="12" cy="12" rx="4" ry="9"/><path class="k" d="M3 12h18"/>',
  'phone': '<path class="t" d="M3 3h6v6l6 6h6v6A18 18 0 0 1 3 3z"/><path d="M3 3h6v6l6 6h6v6A18 18 0 0 1 3 3z"/>',
  'phone-call': '<path class="t" d="M3 3h6v6l6 6h6v6A18 18 0 0 1 3 3z"/><path d="M3 3h6v6l6 6h6v6A18 18 0 0 1 3 3z"/>'
    + '<path d="M13 8a3 3 0 0 1 3 3"/><path d="M13 3a8 8 0 0 1 8 8"/>',
  'send': '<polygon class="t" points="3 4 21 12 3 20 7 12"/><polygon points="3 4 21 12 3 20 7 12"/><path class="k" d="M7 12h7"/>',
  'mail': '<rect class="t" x="2" y="4" width="20" height="16" rx="2.5"/>'
    + '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path class="k" d="M4.5 4.5l7.5 7.5 7.5-7.5"/>',
  'bell': '<path class="t" d="M5 16v-6a7 7 0 0 1 14 0v6z"/><path d="M3 16h18M5 16v-6a7 7 0 0 1 14 0v6"/><path d="M10 19.5a2 2 0 0 0 4 0"/>',
  'mic': '<rect class="t" x="9" y="2" width="6" height="10" rx="3"/>'
    + '<rect x="9" y="2" width="6" height="10" rx="3"/><path d="M4.5 10a7.5 7.5 0 0 0 15 0"/><path d="M12 17.5V21m-4 0h8"/>',
  'mic-vocal': '<path class="t" d="M10.5 8.5a5 5 0 1 0 10 0a5 5 0 1 0-10 0zM10.8 10.2L3.5 17.5l3 3 7.3-7.3z"/>'
    + '<circle cx="15.5" cy="8.5" r="5"/><path class="k" d="M12 5l7 7"/><path d="M10.8 10.2L3.5 17.5l3 3 7.3-7.3"/>',
  'headphones': '<path class="t" d="M3 15.5a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 1-5 0zM16 15.5a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 1-5 0z"/>'
    + '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><rect x="3" y="13" width="5" height="8" rx="2.5"/><rect x="16" y="13" width="5" height="8" rx="2.5"/>',
  'video': '<rect class="t" x="2" y="6" width="14" height="12" rx="2.5"/>'
    + '<rect x="2" y="6" width="14" height="12" rx="2.5"/><path d="M16 10l5-5v14l-5-5"/>',
  'link': '<path d="M10 8l3-3a4.25 4.25 0 0 1 6 6l-3 3"/><path d="M14 16l-3 3a4.25 4.25 0 0 1-6-6l3-3"/><path d="M10 14l4-4"/>',
  'notebook-pen': '<path class="t" d="M3 4.5A2.5 2.5 0 0 1 5.5 2h9A2.5 2.5 0 0 1 17 4.5V8l-5 5v3h3l2-2v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 19.5z"/>'
    + '<path d="M17 6.5v-2A2.5 2.5 0 0 0 14.5 2h-9A2.5 2.5 0 0 0 3 4.5v15A2.5 2.5 0 0 0 5.5 22h9a2.5 2.5 0 0 0 2.5-2.5v-4"/>'
    + '<path class="k" d="M8 2v20"/><path d="M19 6l-7 7v3h3l7-7zM12 13l3 3"/>',

  // ---------- 收藏、评价 ----------
  'heart': '<path class="t" d="M12 21L4 13A5.66 5.66 0 0 1 12 5A5.66 5.66 0 0 1 20 13z"/><path d="M12 21L4 13A5.66 5.66 0 0 1 12 5A5.66 5.66 0 0 1 20 13z"/>',
  'star': '<polygon class="t" points="12 3 14.65 8.86 21.04 9.56 16.28 13.89 17.58 20.19 12 17 6.42 20.19 7.72 13.89 2.96 9.56 9.35 8.86"/>'
    + '<polygon points="12 3 14.65 8.86 21.04 9.56 16.28 13.89 17.58 20.19 12 17 6.42 20.19 7.72 13.89 2.96 9.56 9.35 8.86"/>',
  'bookmark': '<path class="t" d="M5 22V4.5A2.5 2.5 0 0 1 7.5 2h9A2.5 2.5 0 0 1 19 4.5V22l-7-7z"/><path d="M5 22V4.5A2.5 2.5 0 0 1 7.5 2h9A2.5 2.5 0 0 1 19 4.5V22l-7-7z"/>',
  'award': '<circle class="t" cx="12" cy="9" r="7"/><circle cx="12" cy="9" r="7"/><path d="M8.5 15.06V22l3.5-3.5 3.5 3.5v-6.94"/>',
  'sparkles': '<path class="t" d="M9 7a7 7 0 0 0 7 7a7 7 0 0 0-7 7a7 7 0 0 0-7-7a7 7 0 0 0 7-7zM18 2a4 4 0 0 0 4 4a4 4 0 0 0-4 4a4 4 0 0 0-4-4a4 4 0 0 0 4-4z"/>'
    + '<path d="M9 7a7 7 0 0 0 7 7a7 7 0 0 0-7 7a7 7 0 0 0-7-7a7 7 0 0 0 7-7z"/><path d="M18 2a4 4 0 0 0 4 4a4 4 0 0 0-4 4a4 4 0 0 0-4-4a4 4 0 0 0 4-4z"/>',

  // ---------- 地点和出行 ----------
  'map': '<polygon class="t" points="3 5 9 3 15 5 21 3 21 19 15 21 9 19 3 21"/>'
    + '<polygon points="3 5 9 3 15 5 21 3 21 19 15 21 9 19 3 21"/><path class="k" d="M9 3v16M15 5v16"/>',
  'map-pin': '<path class="t" d="M12 22L6.1 12.77A7 7 0 1 1 17.9 12.77z"/>'
    + '<path d="M12 22L6.1 12.77A7 7 0 1 1 17.9 12.77z"/><circle class="k" cx="12" cy="9" r="2.5"/>',
  'map-pin-check': '<path class="t" d="M12 22L6.1 12.77A7 7 0 1 1 17.9 12.77z"/>'
    + '<path d="M12 22L6.1 12.77A7 7 0 1 1 17.9 12.77z"/><path class="k" d="M9 9l2 2 4-4"/>',
  'route': '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M6 15.5V9a3 3 0 0 1 6 0v6a3 3 0 0 0 6 0V8.5"/>',
  'navigation': '<polygon class="t" points="21 3 12 21 10.5 13.5 3 12"/><polygon points="21 3 12 21 10.5 13.5 3 12"/>',
  'locate': '<circle class="t" cx="12" cy="12" r="7"/>'
    + '<circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle class="sk" cx="12" cy="12" r="2.5"/>',
  'locate-fixed': '=locate',
  'footprints': '<path class="t" d="M2.5 6a3.5 3.5 0 0 1 7 0v4l-2 2v4.5a2.5 2.5 0 0 1-5 0zM21.5 9a3.5 3.5 0 0 0-7 0v4l2 2v4.5a2.5 2.5 0 0 0 5 0z"/>'
    + '<path d="M2.5 6a3.5 3.5 0 0 1 7 0v4l-2 2v4.5a2.5 2.5 0 0 1-5 0z"/><path d="M21.5 9a3.5 3.5 0 0 0-7 0v4l2 2v4.5a2.5 2.5 0 0 0 5 0z"/>',
  'globe': '<circle class="t" cx="12" cy="12" r="10"/>'
    + '<circle cx="12" cy="12" r="10"/><ellipse class="k" cx="12" cy="12" rx="4.5" ry="10"/><path class="k" d="M2 12h20"/>',
  'store': '<path class="t" d="M3 9V5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5V9a3 3 0 0 1-6 0a3 3 0 0 1-6 0a3 3 0 0 1-6 0z"/>'
    + '<path d="M3 9V5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5V9a3 3 0 0 1-6 0a3 3 0 0 1-6 0a3 3 0 0 1-6 0z"/>'
    + '<path d="M4.5 11.6V21h5v-5h5v5h5v-9.4"/>',
  'building-2': '<path class="t" d="M4 21V4.5A2.5 2.5 0 0 1 6.5 2h5A2.5 2.5 0 0 1 14 4.5V10h3.5a2.5 2.5 0 0 1 2.5 2.5V21z"/>'
    + '<path d="M2 21h20M4 21V4.5A2.5 2.5 0 0 1 6.5 2h5A2.5 2.5 0 0 1 14 4.5V21M14 10h3.5a2.5 2.5 0 0 1 2.5 2.5V21"/>'
    + '<path class="k" d="M7.5 7h3M7.5 12h3M7.5 17h3"/>',
  'trees': '<path class="t" d="M2.5 9a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0-11 0zM18 5l3.5 11h-7z"/>'
    + '<circle cx="8" cy="9" r="5.5"/><polygon points="18 5 21.5 16 14.5 16"/><path d="M8 14.5V21M18 16v5M3 21h18"/>',
};
