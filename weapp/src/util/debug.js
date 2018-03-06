let last = ''

export default () => {
  wx.getClipboardData({
    success ({data}) {
      // 判断跟上一次复制的内容不同才执行
      if (last !== data) {
        wx.setEnableDebug({
          enableDebug: data === '天王盖地虎'
        })
        last = data
      }
    }
  })
}
