// 演示数据：换成客户真实的店名、商品、价格、人名。日期按打开的这一天往前排，什么时候打开都像刚发生的
const pad = (n) => String(n).padStart(2, '0');
export const day = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
export const nowStamp = () => { const d = new Date(); return `${day(0)} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };

export function seed() {
  return {
    me: { name: '林晓', phone: '138 1176 6021' },
    items: [
      { id: 'i103', title: '周六上午的体验课', at: `${day(-1)} 19:06`, status: 'wait' },
      { id: 'i102', title: '十次卡续费', at: `${day(-2)} 10:22`, status: 'done' },
      { id: 'i101', title: '私教课改时间', at: `${day(-4)} 20:12`, status: 'done' },
    ],
  };
}
