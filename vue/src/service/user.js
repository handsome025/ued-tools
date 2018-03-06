export default {
  getUserInfo () {
    // 后端存的 cookie 名字
    const key = 'userInfo'
    // 如果是本地调试，写个假的 cookie
    if (ued.isLocal()) {
      ued.cookie.set(key, {
        FromUserName: 'test',
        nickname: 'test',
        headimgurl: 'test'
      })
    }
    return ued.cookie.getObject(key)
  },
  weixinAuth (callbackUrl = ued.href()) {
    ued.replace('/换成授权接口', {callbackUrl})
  }
}
