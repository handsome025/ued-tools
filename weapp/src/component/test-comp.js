Component({
  properties: {
    name: String, // 可以直接设置类型
    light: {
      type: Boolean,
      value: false // 也可以在设置类型的同时设置默认值
    }
    // 微信规定：属性名 JS 里必须为小写驼峰，WXML 里必须为连词
  },
  ready () {
    console.log(this.data)
  },
  methods: {
    tapText (event) {
      console.log(event)
      const {light} = this.data
      this.setData({light: !light})
      this.triggerEvent('hello', {world: Math.random()})
    }
  }
})
