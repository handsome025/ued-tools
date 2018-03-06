const safeDecodeURIComponent = str => {
  try {
    return decodeURIComponent(str)
  } catch (e) {}
  return str
}

/**
 * url query string
 */
export default {
  /**
   * 序列化
   *
   * @param {Object} query
   * @returns {String}
   */
  stringify (query = {}) {
    return Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&')
  },
  /**
   * 反序列化
   *
   * @param {String} queryString
   * @returns {Object}
   */
  parse (queryString = '') {
    return queryString.split('&').reduce((obj, kv) => {
      const [key, value] = kv.split('=')
      obj[safeDecodeURIComponent(key)] = safeDecodeURIComponent(value)
      return obj
    }, {})
  }
}
