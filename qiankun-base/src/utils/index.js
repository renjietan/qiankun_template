/**
 * @functionName 深拷贝
 * @param {Object} source
 * @description
 * @author 谭人杰
 * @date 2020-06-10 14:42:22
*/
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @functionName 简单数组去重
 * @param {Array} arr
 * @description [1,2,3,2] => [1,2,3]
 * @author 谭人杰
 * @date 2020-06-10 14:43:01
*/
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @functionName 创建随机字符串
 * @description
 * @author 谭人杰
 * @date 2020-06-10 14:44:42
*/
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}


/**
 * @functionName 是否存在某个class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @description 返回boolen
 * @author 谭人杰
 * @date 2020-06-10 14:45:12
*/
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * @functionName 添加class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @description
 * @author 谭人杰
 * @date 2020-06-10 14:45:12
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * @functionName 移除class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @description 
 * @author 谭人杰
 * @date 2020-06-10 14:47:24
*/
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}


/**
 * @functionName 时间转换
 * @param {Object|string|number} time
 * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s}
 * @description 返回字符串
 * @author 谭人杰
 * @date 2020-06-10 11:03:20
*/
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @functionName 时间转换
 * @param {Object|string|number} time
 * @param {string} option {y}-{m}-{d} {h}:{i}:{s}
 * @description 返回字符串
 * @author 谭人杰
 * @date 2020-06-10 11:03:20
*/
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}


/**
 * @functionName 字符串的byte长度
 * @param {string} str
 * @description 返回number
 * @author 谭人杰
 * @date 2020-06-10 11:10:01
*/

export function byteLength(str) {
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}


export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @functionName JSON转参数
 * @param {Object} json
 * @description {a:1,b:2 ,c:3} => a=1&b=2&c=3
 * @author 谭人杰
 * @date 2020-06-10 11:21:01
*/
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @functionName url中获取参数
 * @param {string} url
 * @description "http://www.baidu.com?a=1&b=2" => {a: "1", b: "2"}
 * @author 谭人杰
 * @date 2020-06-10 11:22:44
*/
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}


export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}


/**
 * @functionName 合并俩个对象，并赋予最后一个参数优先级
 * @param {object} target
 * @param {object|Array} source
 * @description {a:1,b:2,c:3} && [{a:2:b:4,c:6,d:8}] => [{a: 2, b: 4, c: 6, d: 8}]
 * @author 谭人杰
 * @date 2020-06-10 11:28:05
*/
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}


export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}


export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @functionName 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @description 函数防抖
 * @author 谭人杰
 * @date 2020-06-10 14:40:28
*/
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}



/**
 * @functionName 数组转JSON && 去重
 * @param {Array} array
 * @param {string} key
 * @description [{id:1, name:1}, {id:2, name:3}, {id: 2,name: 2}]
 * @author 谭人杰
 * @date 2020-06-10 14:48:53
*/
export function ArrayToJson(array, key) {
  var type = Object.prototype.toString.call(array)
  if (type != "[object Array]" || !key) return array
  array = array.reduce((cur, pre) => {
    cur[pre[key]] = pre
    return cur
  }, {})
  return array
}

/**
 * @functionName 数字金额转为中文金额
 * @param {number|string} money
 * @description 1.10 => 壹元壹角
 * @author 谭人杰
 * @date 2020-06-10 17:41:11
*/
export function parseMoney(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}


/**
 * @functionName 递归
 * @param {Array} arr
 * @param {string} child_key
 * @description
 * @author 谭人杰
 * @date 2020-06-10 17:32:22
*/
function parseTree(nodes, child_key = "children") {
  if (nodes.length == 0) return
  nodes.forEach((n, i) => {
    n[child_key] && parseTree(n[child_key], child_key)
  })
}

/**
 * @functionName 数组转树
 * @param {Array} array
 * @param {string} id_key
 * @param {string} parentId_key
 * @description array => tree
 * @author 谭人杰
 * @date 2020-06-10 17:52:18
*/
export function ArrayToTree({array = [], id_key = "id", parentId_key = "parentId"} = {}) {
  array.forEach(function (item) {
    delete item.children;
  });
  let map = {};
  array.forEach(i => {
    map[i[id_key]] = i;
  });
  let treeData = [];
  array.forEach(child => {
    const mapItem = map[child[parentId_key]];
    if (mapItem) {
      (mapItem.children || (mapItem.children = [])).push(child);
    } else {
      treeData.push(child);
    }
  });
  return treeData;
}

/**
 * @functionName 判断值是否有效
 * @param {any} isVaild
 * @description
 * @author 谭人杰
 * @date 2020-06-11 14:31:14
*/
export function isEffective(val) {
  var type = Object.prototype.toString.call(val)
  switch(type) {
      case "[object Array]":
          return val.length > 0 ? true : false
      break 
      case "[object Object]": 
          return Object.keys(val).length > 0 ? true : false
      break
      case "[object Null]":
          return false
      break
      case "[object Undefined]":
          return false
      break
      case "[object String]":
          return val != "" ? true : false
      break
      case "[object Number]":
          if(isNaN(val) || !isFinite(val)){
              return false
          }
          return true
      break
      case "[object Map]":
          return val.size > 0 ? true : false
      break
      case "[object Set]":
          return val.size > 0 ? true : false
      break
  }
}