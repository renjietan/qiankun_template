/**
 * @functionName 是否是外部链接
 * @param {string} path
 * @description
 * @author 谭人杰
 * @date 2020-06-11 09:57:12
*/
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


/**
 * @functionName 是否是url地址
 * @param {url} url
 * @description
 * @author 谭人杰
 * @date 2020-06-11 09:59:18
*/
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @functionName 是否是小写字母
 * @param {string} str
 * @description
 * @author 谭人杰
 * @date 2020-06-11 10:04:01
*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @functionName 是否是大写字母
 * @param {string} str
 * @description
 * @author 谭人杰
 * @date 2020-06-11 17:01:30
*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @functionName 是否是字母
 * @param {string} str
 * @description
 * @author 谭人杰
 * @date 2020-06-11 10:01:47
*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @functionName 是否是email
 * @param {string} email
 * @description
 * @author 谭人杰
 * @date 2020-06-11 17:01:52
*/
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @functionName 是否是字符串
 * @param {string} str
 * @description
 * @author 谭人杰
 * @date 2020-06-11 17:02:34
*/
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @functionName 是否是数组
 * @param {any} arg
 * @description
 * @author 谭人杰
 * @date 2020-06-11 17:02:49
*/
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
