import CnodeAPI from '../service/cnode-api'

Page({
  data: {
    article: null
  },
  onLoad (query) {
    this.id = query.id
    this.getData()
  },
  getData () {
    // loading 省略不码了。
    CnodeAPI.getDetail(this.id).then(article => {
      console.log(article)
      wx.setNavigationBarTitle({
        title: article.title
      })
      this.setData({article})
    })
  }
})
