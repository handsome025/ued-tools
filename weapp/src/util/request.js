export default class Request {
  constructor (options = {}) {
    Object.assign(this, {
      baseUrl: '',
      onRequest: (req, next) => next(req),
      onResponse: (req, res, next, retry) => next(res)
    }, options)
  }

  request (req = {}) {
    return new Promise(resolve => {
      if (typeof req === 'string') {
        req = {url: req}
      }
      req.header = req.header || {}
      req.data = req.data || {}
      req.method = (req.method || 'GET').toUpperCase()
      req.url = (req.baseUrl || this.baseUrl || '') + req.url

      const iccConsole = res => {
        try {
          let messages = res.header['ICC-Console']
          if (!messages) {
            return
          }
          messages = JSON.parse(messages)
          if (messages.length > 0) {
            console.info('[ICC-Console]', req.url)
            messages.forEach(item => console.log(item))
            console.log('\n')
          }
        } catch (e) {}
      }

      this.onRequest(req, req => {
        req.success = res => this.onResponse(req, res, res => {
          iccConsole(res)
          resolve(res)
        }, retry)

        const retry = () => {
          if (req.name && req.filePath) {
            wx.uploadFile(req)
          } else {
            if (req.method === 'POST' && !('content-type' in req.header)) {
              req.header['content-type'] = 'application/x-www-form-urlencoded'
            }
            wx.request(req)
          }
        }

        req.fail = () => setTimeout(retry, 3000)
        retry()
      })
    })
  }
}
