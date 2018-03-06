import EventEmitter from './event-emitter'

// 同时调用异步方法时，控制方法内只执行一次，并共享最终结果
export default promise => {
  const ee = new EventEmitter()
  let ready = true
  return function () {
    const args = arguments
    return new Promise((resolve, reject) => {
      ee.once('resolve', resolve)
      ee.once('reject', reject)
      if (ready) {
        ready = false
        promise.apply(null, args).then(res => {
          ee.emit('resolve', res)
          ready = true
        }, err => {
          ee.emit('reject', err)
          ready = true
        })
      }
    })
  }
}
