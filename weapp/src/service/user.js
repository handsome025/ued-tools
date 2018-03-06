import Request from '../util/request'
import asyncShare from '../util/async-share'

const loginRequest = new Request()
let loginResponse
const login = () => new Promise(resolve => {
  // 判断本地有，就直接返回，而不再发请求，这里是读内存（变量），你可以改成 storage
  if (loginResponse) {
    return resolve(loginResponse)
  }
  const wxLogin = cb => {
    wx.login({
      success: login => wx.getUserInfo({
        success: userInfo => cb({login, userInfo}),
        fail: () => cb({login})
      }),
      fail: () => setTimeout(() => wxLogin(cb), 3000)
    })
  }
  wxLogin(({login, userInfo}) => {
    loginRequest.request({
      // 这里填后端登录地址
      url: 'https://cnodejs.org/api',
      data: {
        code: login.code,
        userInfo: JSON.stringify(userInfo)
      }
    }).then(res => {
      // 做一些处理，比如存储登录态到本地，这里是存在内存（变量）中，你可以改成 storage
      loginResponse = res
      resolve(res)
    })
  })
})

const getUserInfo = () => new Promise(success => wx.getUserInfo({success}))

export default {
  login: asyncShare(login),
  getUserInfo: asyncShare(getUserInfo)
}
