import EventBus from '../service/event-bus'

Page({
  onLoad () {

  },
  tapTest () {
    // 发送事件，通知 index 更新
    EventBus.emit(EventBus.UPDATE_CONTENT, Math.random())

    // 返回上一页查看效果
    wx.navigateBack()
  }
})
