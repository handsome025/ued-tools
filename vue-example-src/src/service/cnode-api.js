const baseURL = 'https://cnodejs.org/api/v1'

export default {
  async getList () {
    const res = await ued.get(`${baseURL}/topics`) // 演示 模板字符串 用法
    return res.data.map(({id, title, create_at}) => ({id, title, create_at})) // 只要部分字段，演示 JS解构 用法
  },
  async getDetail (id = '') { // 演示 默认参数 用法
    const res = await ued.get(`${baseURL}/topic/${id}`)
    return res.data
  }
}
