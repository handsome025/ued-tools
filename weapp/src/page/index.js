import EventBus from '../service/event-bus'
import CnodeAPI from '../service/cnode-api'

Page({
  data: {
    testContent: '这是测试文字，请点击按钮到第二页',
    testCompList: [
      {name: 'C', light: false},
      {name: 'D', light: false},
      {name: 'E', light: true}
    ],
    articles: null
  },
  onLoad (query) {
    console.log(query)
    // wx.openSetting({
      
    // })
    // wx.onCompassChange(function (res) {
    //   console.log(res)
    // })
    // wx.startCompass()
    this.intervalId = setInterval(() => this.testInterval(), 3000)
    EventBus.on(EventBus.UPDATE_CONTENT, data => this.updateContent(data))
    this.getData()
  },
  // 记得在页面卸载的时候，把不需要的事件和定时器 也卸载掉！
  onUnload () {
    EventBus.off(EventBus.UPDATE_CONTENT)
    clearInterval(this.intervalId)
  },
  record () {
    // const recorderManager = wx.getRecorderManager()

    // recorderManager.onStart(() => {
    //   console.log('recorder start')
    // })
    // recorderManager.onResume(() => {
    //   console.log('recorder resume')
    // })
    // recorderManager.onPause(() => {
    //   console.log('recorder pause')
    // })
    // recorderManager.onStop((res) => {
    //   console.log('recorder stop', res)
    //   const { tempFilePath } = res
    // })
    // recorderManager.onFrameRecorded((res) => {
    //   const { frameBuffer } = res
    //   console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    // })

    // const options = {
    //   duration: 5000,
    //   sampleRate: 44100,
    //   numberOfChannels: 1,
    //   encodeBitRate: 192000,
    //   format: 'aac',
    //   frameSize: 50
    // }

    // recorderManager.start(options)
    wx.startRecord({
      success: res => {
        
      },
      fail: res => console.log(res)
    })

    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 3000)
  },
  testInterval () {
    // console.log(new Date())
  },
  getData () {
    CnodeAPI.getList().then(articles => this.setData({articles}))
  },
  updateContent (testContent) {
    this.setData({testContent})
  },
  onHello (event) {
    console.log('测试组件触发的事件', event.detail)
  }
})
