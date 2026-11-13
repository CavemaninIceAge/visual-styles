// 自己画的图标：物件和媒体（names.js 的 objects 组）。规矩见 SPEC.md
// 每个名字对应 24×24 画布里的 SVG 内部标记；颜色只用 currentColor，淡色层写 class="t"，压在淡色层上的细节写 class="k"
// 播放、暂停、上一首、下一首的三角和竖条本来就是实心的小块：写 class="s" 填色，再用同一条路径描一遍边，转角跟着风格的端点参数走
module.exports = {
  // ---------- 家具和家电 ----------
  'armchair': '<path class="t" d="M2 12.5a2.5 2.5 0 0 1 5 0V14h10v-1.5a2.5 2.5 0 0 1 5 0V19H2z"/><path d="M4.5 10V6a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v4"/><path d="M2 12.5a2.5 2.5 0 0 1 5 0V14h10v-1.5a2.5 2.5 0 0 1 5 0V19H2z"/><path d="M4.5 19v3M19.5 19v3"/>',
  'bath': '<path class="t" d="M2 11h20v5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"/><path d="M2 11h20v5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"/><path d="M6 11V5.5a2.5 2.5 0 0 1 5 0"/><path d="M6 19v3M18 19v3"/>',
  'bed-double': '<path class="t" d="M3 12h15.5a2.5 2.5 0 0 1 2.5 2.5V17H3z"/><path d="M3 4v17M3 12h15.5a2.5 2.5 0 0 1 2.5 2.5V21M3 17h18"/><rect x="6" y="8" width="6" height="4" rx="1.5"/>',
  'fan': '<path class="t" d="M12 9.5V3a4.5 4.5 0 0 1 4.5 4.5L14 10M14.5 12H21a4.5 4.5 0 0 1-4.5 4.5L14 14M12 14.5V21a4.5 4.5 0 0 1-4.5-4.5L10 14M9.5 12H3a4.5 4.5 0 0 1 4.5-4.5L10 10"/><path d="M12 9.5V3a4.5 4.5 0 0 1 4.5 4.5L14 10M14.5 12H21a4.5 4.5 0 0 1-4.5 4.5L14 14M12 14.5V21a4.5 4.5 0 0 1-4.5-4.5L10 14M9.5 12H3a4.5 4.5 0 0 1 4.5-4.5L10 10"/><circle cx="12" cy="12" r="2.5"/>',
  'washing-machine': '<rect class="t" x="4" y="2" width="16" height="20" rx="3"/><rect x="4" y="2" width="16" height="20" rx="3"/><path class="k" d="M4 7h16"/><circle class="k" cx="12" cy="14.5" r="4.5"/>',

  // ---------- 吃的喝的 ----------
  'coffee': '<path class="t" d="M3 8h14v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="M3 8h14v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM17 10h1.5a3 3 0 0 1 0 6H17"/><path d="M7.5 2v3M12.5 2v3"/>',
  'cup-soda': '<path class="t" d="M5 10l2 11h10l2-11z"/><rect x="4" y="6" width="16" height="4" rx="1.5"/><path d="M5 10l2 11h10l2-11"/><path d="M12 6l4-4h3"/>',
  'croissant': '<path class="t" d="M3 18A6 6 0 0 1 7.5 10.5a4.5 4.5 0 0 1 9 0A6 6 0 0 1 21 18a13 13 0 0 0-18 0z"/><path d="M3 18A6 6 0 0 1 7.5 10.5a4.5 4.5 0 0 1 9 0A6 6 0 0 1 21 18a13 13 0 0 0-18 0z"/><path class="k" d="M7.5 10.5V15M16.5 10.5V15"/>',

  // ---------- 工具和服务 ----------
  'brush': '<path class="t" d="M9 11 6 14a2.83 2.83 0 0 0 4 4l3-3"/><path d="M20.5 3.5 13 11"/><path d="M11 9l4 4-2 2-4-4z"/><path d="M9 11 6 14a2.83 2.83 0 0 0 4 4l3-3"/>',
  'wrench': '<path d="M19.5 7.5l-3 3-3-3 3-3A4.74 4.74 0 1 0 19.5 7.5M12 12l-8 8"/>',
  'scissors': '<circle cx="6.5" cy="16.5" r="3.5"/><circle cx="17.5" cy="16.5" r="3.5"/><path d="M9 14 19 4M15 14 5 4"/>',
  'stethoscope': '<path d="M3 2v6a5 5 0 0 0 10 0V2M8 13v2a5 5 0 0 0 10 0v-2.5"/><circle cx="18" cy="10" r="2.5"/>',
  'weight': '<path class="t" d="M6 9h12l3 12H3z"/><path d="M6 9h12l3 12H3z"/><circle cx="12" cy="5.5" r="3.5"/>',
  'car': '<path class="t" d="M2 17.5v-6A2.5 2.5 0 0 1 4.5 9l5-5h5l5 5a2.5 2.5 0 0 1 2.5 2.5v6z"/><path d="M2 17.5v-6A2.5 2.5 0 0 1 4.5 9l5-5h5l5 5a2.5 2.5 0 0 1 2.5 2.5v6z"/><path class="k" d="M4.5 9h15M5 13.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M16 13.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M5.5 17.5v3M18.5 17.5v3"/>',
  'car-front': '=car',
  'gift': '<rect class="t" x="3" y="9" width="18" height="12" rx="2.5"/><rect x="3" y="9" width="18" height="12" rx="2.5"/><path class="k" d="M12 9v12"/><path d="M6 9a3 5 0 0 1 6 0 3 5 0 0 1 6 0"/>',

  // ---------- 单据和收纳 ----------
  'package-open': '<rect class="t" x="4" y="12" width="16" height="9" rx="2.5"/><rect x="2" y="3" width="20" height="4" rx="1.5"/><rect x="4" y="12" width="16" height="9" rx="2.5"/>',
  'file-check-2': '<rect class="t" x="4" y="2" width="16" height="20" rx="2.5"/><rect x="4" y="2" width="16" height="20" rx="2.5"/><path class="k" d="M8 7h8M8.5 15l2.5 2.5 5-5"/>',
  'clipboard-check': '<path class="t" d="M8 4H6.5A2.5 2.5 0 0 0 4 6.5v13A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 17.5 4H16v2H8z"/><path d="M8 4H6.5A2.5 2.5 0 0 0 4 6.5v13A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 17.5 4H16"/><rect x="8" y="2" width="8" height="4" rx="1.5"/><path class="k" d="M8.5 14l2.5 2.5 5-5"/>',
  'clipboard-list': '<path class="t" d="M8 4H6.5A2.5 2.5 0 0 0 4 6.5v13A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 17.5 4H16v2H8z"/><path d="M8 4H6.5A2.5 2.5 0 0 0 4 6.5v13A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 17.5 4H16"/><rect x="8" y="2" width="8" height="4" rx="1.5"/><path class="k" d="M8 11.5h8M8 16.5h5"/>',
  'layers': '<path class="t" d="M12 3l10 6-10 6L2 9z"/><path d="M12 3l10 6-10 6L2 9z"/><path d="M2 15l10 6 10-6"/>',
  'book-open': '<path class="t" d="M12 6l3-3h4.5A2.5 2.5 0 0 1 22 5.5v10a2.5 2.5 0 0 1-2.5 2.5H15l-3 3-3-3H4.5A2.5 2.5 0 0 1 2 15.5v-10A2.5 2.5 0 0 1 4.5 3H9z"/><path d="M12 6l3-3h4.5A2.5 2.5 0 0 1 22 5.5v10a2.5 2.5 0 0 1-2.5 2.5H15l-3 3-3-3H4.5A2.5 2.5 0 0 1 2 15.5v-10A2.5 2.5 0 0 1 4.5 3H9z"/><path class="k" d="M12 6v15"/>',

  // ---------- 屏幕和相机 ----------
  'laptop': '<rect class="t" x="4" y="4" width="16" height="11" rx="2.5"/><rect x="4" y="4" width="16" height="11" rx="2.5"/><path d="M2 20h20"/>',
  'monitor': '<rect class="t" x="2" y="2" width="20" height="14" rx="2.5"/><rect x="2" y="2" width="20" height="14" rx="2.5"/><path d="M12 16v5M8 21h8"/>',
  'smartphone': '<rect class="t" x="5" y="2" width="14" height="20" rx="3"/><rect x="5" y="2" width="14" height="20" rx="3"/><path class="k" d="M10 17h4"/>',
  'camera': '<path class="t" d="M2 9.5A2.5 2.5 0 0 1 4.5 7H7l3-3h4l3 3h2.5A2.5 2.5 0 0 1 22 9.5v9a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5z"/><path d="M2 9.5A2.5 2.5 0 0 1 4.5 7H7l3-3h4l3 3h2.5A2.5 2.5 0 0 1 22 9.5v9a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5z"/><circle class="k" cx="12" cy="14" r="4"/>',
  'image': '<rect class="t" x="2" y="4" width="20" height="16" rx="2.5"/><rect x="2" y="4" width="20" height="16" rx="2.5"/><path class="k" d="M2 17l7-7 10 10"/><circle class="k" cx="16" cy="9" r="2"/>',
  'images': '<rect class="t" x="2" y="8" width="15" height="13" rx="2.5"/><path d="M7 8V5.5A2.5 2.5 0 0 1 9.5 3h10A2.5 2.5 0 0 1 22 5.5v10a2.5 2.5 0 0 1-2.5 2.5H17"/><rect x="2" y="8" width="15" height="13" rx="2.5"/><path class="k" d="M2 18l5-5 8 8"/>',
  'film': '<rect class="t" x="3" y="3" width="18" height="18" rx="3"/><rect x="3" y="3" width="18" height="18" rx="3"/><path class="k" d="M8 3v18M16 3v18M3 8h5M3 16h5M16 8h5M16 16h5"/>',

  // ---------- 音乐和播放 ----------
  'disc-3': '<circle class="t" cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="10"/><circle class="k" cx="12" cy="12" r="3.5"/>',
  'music': '<path d="M9 18V6l12-3v15"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/>',
  'list-music': '<path d="M3 4h18M3 10h10M3 16h6"/><circle cx="16" cy="17" r="3"/><path d="M19 17V8l3 3"/>',
  'audio-lines': '<path d="M2 10v4M7 5v14M12 8v8M17 3v18M22 9v6"/>',
  'radio': '<rect class="t" x="2" y="8" width="20" height="13" rx="2.5"/><path d="M16 8l-6-6"/><rect x="2" y="8" width="20" height="13" rx="2.5"/><circle class="k" cx="8" cy="14.5" r="3.5"/><path class="k" d="M15 12h4M15 17h4"/>',
  'play': '<path class="s" d="M6 3.5v17L20 12z"/><path d="M6 3.5v17L20 12z"/>',
  'pause': '<path class="s" d="M5.5 4H9v16H5.5zM15 4h3.5v16H15z"/><path d="M5.5 4H9v16H5.5zM15 4h3.5v16H15z"/>',
  'skip-back': '<path class="s" d="M21 4.5v15L10 12zM5.5 4.5H4v15h1.5z"/><path d="M21 4.5v15L10 12zM5.5 4.5H4v15h1.5z"/>',
  'skip-forward': '<path class="s" d="M3 4.5v15L14 12zM18.5 4.5H20v15h-1.5z"/><path d="M3 4.5v15L14 12zM18.5 4.5H20v15h-1.5z"/>',
  'shuffle': '<path d="M2 18h3L17 6h4M17 2l4 4-4 4"/><path d="M2 6h3l12 12h4M17 14l4 4-4 4"/>',
};
