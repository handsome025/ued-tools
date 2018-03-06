import User from './user'

ued.ajax.mock('mock')

ued.ajax.before(options => {

})

ued.ajax.after(response => {
  if (response.errorCode == '未授权的错误码') {
    User.weixinAuth()
    return response.stop = true
  }
})

export default {
  async getHome () {
    const res = await ued.get('/api/home')
    return res.result
  }
}
