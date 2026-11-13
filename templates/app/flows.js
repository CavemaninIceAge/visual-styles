// 主流程：tools/app.sh check 在电脑（1440×900）和手机（390×844）两种尺寸下各走一遍
// 步骤：['tap', 按钮上的字或选择器, 第几个]、['type', 输入框的 data-model 或选择器, 文字]、['pick', 下拉框, 值]、
//       ['see', 页面上要有的字]、['nosee', 不该有的字]、['end', 切到哪一端]、['back']、['reload']（刷新后数据还在）、['go', 地址]
module.exports = {
  flows: [
    {
      name: '新建一条，处理，看到结果',
      start: 'm/home', //@phone
      steps: [
        ['tap', '新建'], //@phone
        ['type', 'title', '周日下午的团课'], //@phone
        ['tap', '提交'], //@phone
        ['see', '待处理'], //@phone
        ['reload'],
        ['end', 'a'], //@both
        ['see', '周日下午的团课'], //@phone
        ['tap', '处理'], //@web
        ['see', '已处理'], //@web
        ['end', 'm'], //@both
        ['see', '已处理'], //@both
      ],
    },
  ],
  visit: ['m/me'], //@phone
};
