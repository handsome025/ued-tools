import EvenEmitter from '../util/event-emitter'

// 全局事件对象，所有事件名在这个文件统一定义管理
const ee = new EvenEmitter()

ee.UPDATE_CONTENT = 'UPDATE_CONTENT'

export default ee
