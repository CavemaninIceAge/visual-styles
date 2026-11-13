// 演示数据：日期按打开的这一天往前排，什么时候打开都像刚发生的。
// 数据存在浏览器里（外壳负责），「恢复演示数据」时重新调用 seed()
const pad = (n) => String(n).padStart(2, '0');
export const day = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
export const nowStamp = () => { const d = new Date(); return `${day(0)} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };

export const KINDS = [['water', '水电'], ['door', '门窗'], ['wall', '墙面地面'], ['public', '公共区域']];
export const PARTS = { am: '9:00–12:00', pm: '14:00–18:00' };

export function seed() {
  const at = (off, hm) => `${day(off)} ${hm}`;
  const no = (off, n) => 'BX' + day(off).slice(2).replace(/-/g, '') + pad(n);
  const order = (o) => Object.assign({ worker: null, log: [] }, o);
  return {
    _seq: 200,
    me: { name: '林晓', room: '3 栋 1 单元 1202', phone: '138 1176 6021' },
    workers: [
      { id: 'w1', name: '王建国', trade: '水电', phone: '139 1062 4417' },
      { id: 'w2', name: '赵立新', trade: '门窗', phone: '137 2238 0915' },
      { id: 'w3', name: '陈海', trade: '泥瓦', phone: '135 0127 6648' },
      { id: 'w4', name: '刘志强', trade: '水电', phone: '186 1293 5072' },
    ],
    orders: [
      order({ id: 'r106', no: no(0, 6), mine: false, owner: '吴佳', room: '4 栋 1 单元 1103', phone: '139 6620 1187', kind: 'door', desc: '入户门锁芯卡住，钥匙转不动', slot: { date: day(0), part: 'pm' }, status: 'sent', worker: 'w2', at: at(0, '09:15'), log: [[at(0, '09:15'), '业主提交报修'], [at(0, '09:32'), '派单给赵立新']] }),
      order({ id: 'r105', no: no(0, 3), mine: false, owner: '孙浩', room: '2 栋 1 单元 302', phone: '158 0071 3326', kind: 'public', desc: '单元门门禁刷卡没反应', slot: { date: day(1), part: 'am' }, status: 'wait', at: at(0, '08:40'), log: [[at(0, '08:40'), '业主提交报修']] }),
      order({ id: 'r104', no: no(-1, 9), mine: false, owner: '何静', room: '7 栋 3 单元 1501', phone: '136 9918 2054', kind: 'wall', desc: '客厅墙角起皮发霉，面积有一个巴掌大', slot: { date: day(1), part: 'pm' }, status: 'wait', at: at(-1, '19:06'), log: [[at(-1, '19:06'), '业主提交报修']] }),
      order({ id: 'r103', no: no(-1, 4), mine: false, owner: '周敏', room: '5 栋 2 单元 601', phone: '152 3307 8841', kind: 'water', desc: '卫生间顶灯不亮，换了灯泡也不行', slot: { date: day(0), part: 'am' }, status: 'sent', worker: 'w1', at: at(-1, '10:22'), log: [[at(-1, '10:22'), '业主提交报修'], [at(-1, '10:41'), '派单给王建国']] }),
      order({ id: 'r102', no: no(-2, 7), mine: false, owner: '马骏', room: '1 栋 2 单元 902', phone: '189 1157 2290', kind: 'water', desc: '厨房插座一插电饭煲就跳闸', slot: { date: day(-1), part: 'am' }, status: 'done', worker: 'w4', at: at(-2, '16:48'), log: [[at(-2, '16:48'), '业主提交报修'], [at(-2, '17:03'), '派单给刘志强'], [at(-1, '10:26'), '维修完成']] }),
      order({ id: 'r101', no: no(-4, 2), mine: true, owner: '林晓', room: '3 栋 1 单元 1202', phone: '138 1176 6021', kind: 'door', desc: '主卧窗户关不严，晚上漏风', slot: { date: day(-3), part: 'pm' }, status: 'done', worker: 'w2', at: at(-4, '20:12'), log: [[at(-4, '20:12'), '业主提交报修'], [at(-3, '08:55'), '派单给赵立新'], [at(-3, '15:40'), '维修完成']] }),
    ],
  };
}
