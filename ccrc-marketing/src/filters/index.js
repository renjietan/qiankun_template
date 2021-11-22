// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * @functionName pluralize
 * @param {string} time
 * @param {string} label
 * @returns {string}
 * @description 如果时间为复数，则返回复数文本
 * @author 谭人杰
 * @date 2020-06-04 17:50:15
*/
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}


export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * @functionName numberFormatter
 * @param {number} num
 * @param {number} digits
 * @returns {string}
 * @description 10000 => 10k
 * @author 谭人杰
 * @date 2020-06-04 17:55:24
*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * @functionName toThousandFilter
 * @param {number} num
 * @returns {string}
 * @description 10000 => "10,000"
 * @author 谭人杰
 * @date 2020-06-04 17:59:12
*/
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @functionName uppercaseFirst
 * @param {string} string
 * @returns {string}
 * @description 首字母大写
 * @author 谭人杰
 * @date 2020-06-04 18:00:19
*/
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
