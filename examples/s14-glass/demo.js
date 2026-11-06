// 听澜 TINGLAN 音乐播放（App）—— 风格 s14-glass 液态玻璃试跑
// 2026-11-06 周五更新的歌单《散场以后》，12 首 52 分钟；正在放第一首《水中山》（陈向晚，专辑《静水》），4:24 放到 1:48，还剩 2:36
// 四屏用同一张湖景，换裁切：上面的天是静的一半，放极细大字；山和倒影是有色的一半，放玻璃
module.exports = ({ img, icon, statusBar, homeBar, style }) => {
  const S = style('s14-glass');
  const { ui } = S;
  const LAKE = img('lake-still-mountains');
  const TABS = [['disc-3', '在听'], ['list-music', '歌单'], ['radio', '电台'], ['circle-user', '我的']];
  const GO = ['play', 'list', null, null];
  const LYRICS = ['风停在第七块礁石', '你还没说出那句再见', '山把影子<br>放进水里', '我把灯留给下一个夜', '云从北边慢慢地来'];
  const SEEK = { now: '1:48', end: '−2:36', pct: 41 };
  // 这张照片的天和湖心很亮，上下各压一层湖水色，白字才站得住；中间露出原色的山。颜色取自湖面，不压成灰
  const SKY = 'linear-gradient(180deg,rgba(8,62,76,.66),rgba(8,62,76,.52) 24%,rgba(8,62,76,.24) 42%,rgba(8,62,76,.04) 56%,rgba(6,52,64,.44) 74%,rgba(6,46,56,.62) 100%)';
  const LIST = 'linear-gradient(180deg,rgba(8,62,76,.68),rgba(8,62,76,.6) 34%,rgba(8,62,76,.46) 58%,rgba(6,52,64,.44) 76%,rgba(6,46,56,.62) 100%)';
  const WEB = 'linear-gradient(180deg,rgba(6,48,60,.6),rgba(6,48,60,.5) 30%,rgba(6,48,60,.22) 50%,rgba(6,48,60,.06) 58%,rgba(6,46,56,.34) 74%,rgba(6,46,56,.52) 100%)';

  // 本项目只管位置，样子全在起手包里
  const css = `
.p .ctl{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:22px}
.p.list .act{display:flex;gap:10px}
.p.lyric .pl{display:flex;flex-direction:column;justify-content:center;padding:0 24px}
.p .sk{display:flex;align-items:center;padding:0 22px}
.p.web .top{position:absolute;left:0;right:0;top:246px}
.p.web .v-wrow{grid-template-columns:44px 1fr auto}
`;

  const play = `<div class="scr s14 p play">${ui.bg(LAKE, { pos: '14% 50%', scrim: SKY })}${statusBar(true)}
${ui.nav({ back: false, left: ui.logo('听澜', 'TINGLAN'), right: ui.pair(['heart', 'laptop'], { go: [null, 'web'] }) })}
<div class="v-ab v-ts" style="left:24px;top:128px"><div class="v-k">陈向晚 · 静水</div><div class="v-h1" style="margin-top:4px">水中山</div></div>
${ui.glass(`${ui.seek(SEEK)}<div class="ctl">${ui.circle('skip-back', { d: 46, ic: 20 })}${ui.btn('暂停', { ic: 'pause', w: 124 })}${ui.circle('skip-forward', { d: 46, ic: 20 })}</div>`, { w: 343, h: 140, r: 30, s: 36, bl: 7, at: 'left:16px;top:488px;padding:26px 20px 0;' })}
${ui.capsule('3:52', '雾中灯塔', { at: 'left:16px;top:642px;', attrs: 'data-go="list"' })}
${ui.capsule(icon('mic-vocal', 18, 2), '歌词', { at: 'left:193px;top:642px;', attrs: 'data-go="lyric"' })}
${ui.tabs(TABS, 0, GO)}${ui.defs()}${homeBar(true)}</div>`;

  const list = `<div class="scr s14 v-calm p list">${ui.bg(LAKE, { pos: '100% 50%', style: 'height:150%;top:-40%', scrim: LIST })}${statusBar(true)}
${ui.nav({ right: ui.pair(['share', 'ellipsis']) })}
<div class="v-ab v-ts" style="left:24px;top:124px"><div class="v-k">11月6日更新 · 12 首 · 52 分钟</div><div class="v-h1" style="margin-top:4px">散场以后</div></div>
<div class="v-ab act" style="left:24px;top:244px">${ui.btn('播放', { ic: 'play', w: 112, attrs: 'data-go="play"' })}${ui.btn('随机', { ic: 'shuffle', cls: 'ghost', w: 112 })}</div>
<div class="v-list v-ab" style="left:16px;top:314px;${ui.lens(343, 262, 32, 50)}">
${ui.row({ title: '水中山', meta: '陈向晚', end: icon('audio-lines', 20, 2) + '4:24', on: true, attrs: 'data-go="play"' })}
${ui.row({ title: '雾中灯塔', meta: '何砚', end: '3:52' })}
${ui.row({ title: '慢船', meta: '林屿', end: '5:08' })}
${ui.row({ title: '北风过境', meta: '苏见', end: '4:16' })}
</div>
${ui.bar({ cover: ui.cover(LAKE, { d: 44, r: 22, pos: '30% 62%' }), title: '水中山', meta: '陈向晚', thick: true, right: icon('pause', 22, 2) + icon('skip-forward', 22, 2), attrs: 'data-go="play"' })}
${ui.tabs(TABS, 1, GO)}${ui.defs()}${homeBar(true)}</div>`;

  const lyric = `<div class="scr s14 p lyric">${ui.bg(LAKE, { pos: '0% 50%', style: 'height:130%;top:-22%', scrim: SKY })}${statusBar(true)}
${ui.nav({ back: false, title: '水中山', left: ui.circle('chevron-down', { ic: 24, sw: 2.2, attrs: 'data-back' }), right: ui.circle('ellipsis') })}
${ui.glass(ui.stack(LYRICS, 2), { w: 343, h: 412, r: 36, s: 50, thick: true, at: 'left:16px;top:252px;', cls: 'pl' })}
${ui.glass(ui.seek(SEEK), { w: 271, h: 64, r: 32, at: 'left:16px;bottom:26px;', cls: 'sk' })}
${ui.circle('pause', { d: 64, ic: 24, sw: 2.1, at: 'right:16px;bottom:26px;' })}
${ui.defs()}${homeBar(true)}</div>`;

  const web = `<div class="web s14 p" style="height:800px">${ui.bg(LAKE, { pos: '50% 81%', scrim: WEB })}
${ui.wordmark('TINGLAN', '听澜', 'left:238px;top:43px;')}
${ui.wnav(['在听', '歌单', '电台', '发现'], 0, { at: 'left:479px;top:30px;', go: [null, 'list', null, null] })}
${ui.avatar(img('p-woman-8'), { at: 'left:994px;top:32px;' })}
<div class="top"><div class="v-wh1">水中山</div><div class="v-wsub">陈向晚 · 静水</div></div>
${ui.glass(ui.seek(SEEK), { w: 420, h: 52, r: 26, s: 30, at: 'left:430px;top:388px;', cls: 'sk' })}
${ui.glass(`<div class="v-phd"><b>散场以后</b><span class="v-num">12 首 · 52 分钟</span></div>
${ui.wrow({ lead: '1', title: '水中山', sub: '陈向晚', ex: true, right: ui.btn('暂停', { ic: 'pause', w: 104, h: 42 }) })}
${ui.wrow({ lead: '2', title: '雾中灯塔', meta: '何砚 · 3:52' })}
${ui.wrow({ lead: '3', title: '慢船', meta: '林屿 · 5:08' })}
${ui.wrow({ lead: '4', title: '北风过境', meta: '苏见 · 4:16' })}`, { w: 600, h: 320, r: 36, s: 40, thick: true, bl: 12, at: 'left:340px;top:456px;', cls: 'v-panel' })}
${ui.defs()}</div>`;

  return {
    name: '听澜', css,
    screens: { play, list, lyric, web }, desktop: ['web'], start: 'play', url: 'tinglan.fm',
    boardDeco: ui.stageBg(LAKE, { pos: '50% 60%', tint: .26, blur: 34, sat: 1.7 }),
  };
};
