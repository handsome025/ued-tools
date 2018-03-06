// 这是一个演示后端 API 的文件，可以删掉，或者修改成项目用的！！！
import Request from '../util/request'
import User from './user'

new Request({
  baseUrl: 'http://170206fg0043demo.umaman.com'
}).request('/default/index/test')

// 统一处理
const cnode = new Request({
  // 请求根路径
  baseUrl: 'https://cnodejs.org/api/v1',
  // req: Object 请求参数
  // next: Function 开始请求
  onRequest (req, next) {
    // 可以做一些统一的处理，如必须登录才能继续请求，或者增加固定的参数和头部信息

    req.header.aaa = 1
    req.data.bbb = 2
    User.login().then(() => next(req))
  },
  // req: Object 请求参数
  // res: Object 响应内容
  // next: Function 传递给 resolve
  // retry: Function 某些情况需要重新请求调用它，比如返回未登录，需要调用登录后再重新请求一次
  onResponse (req, res, next, retry) {
    // console.dir(req, res)
    // 可以在拿到响应之后做一些统一的处理

    // 没登录 登录后再 retry 重试
    if (res.data.errorCode === '未登录的code') {
      User.login().then(retry)
      return
    }

    // 登录了 成功返回
    // 改变 then 的回调内容
    next(res.data.data)
  }
})

// 对每个 API 做封装，参数处理、返回的处理
export default {
  getList () {
    return cnode.request('/topics')
      .then(res => res.map(({id, title}) => ({id, title}))) // 只要 id 和 title
  },
  getDetail (id) {
    return cnode.request(`/topic/${id}`)
  }
}
