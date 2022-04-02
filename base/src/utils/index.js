import { views_dir } from "@/router/view_dir/views_dir";
import { node } from "clipboard";
import { toJSONSchema } from "mockjs";
import path from "path";


/**
 * @functionName 
 * @description 根据身份证号码 获取城市、生日、性别
 * @author 谭人杰
 * @date 2021-09-10 17:07:04
*/
export function parse_cert_card(cert_card, cityList) {
  let sex = parseInt(cert_card.substr(16, 1)) % 2 == 1 ? ["男"] : ["女"]
  let birthday = undefined
  let addr = cityList[cert_card.substring(0, 6)]
  if (cert_card.length == 15) {
    birthday = "19" + cert_card.substring(6, 8) + "-" + cert_card.substring(8, 10) + "-" +
      cert_card.substring(10, 12);
  }
  if (cert_card.length == 18) {
    birthday = cert_card.substring(6, 10) + "-" + cert_card.substring(10, 12) + "-" +
      cert_card.substring(12, 14);
  }
  return {
    sex,
    birthday,
    addr,
  }
}


/**
 * @functionName 深拷贝
 * @param {Object} source
 * @description
 * @author 谭人杰
 * @date 2020-06-10 14:42:22
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @functionName 简单数组去重
 * @param {Array} arr
 * @description [1,2,3,2] => [1,2,3]
 * @author 谭人杰
 * @date 2020-06-10 14:43:01
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @functionName 创建随机字符串
 * @description
 * @author 谭人杰
 * @date 2020-06-10 14:44:42
 */
export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
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
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
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
  if (!hasClass(ele, cls)) ele.className += " " + cls;
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
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
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
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
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
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
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
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @functionName JSON转参数
 * @param {Object} json
 * @description {a:1,b:2 ,c:3} => a=1&b=2&c=3
 * @author 谭人杰
 * @date 2020-06-10 11:21:01
 */
export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
  ).join("&");
}

/**
 * @functionName url中获取参数
 * @param {string} url
 * @description "http://www.baidu.com?a=1&b=2" => {a: "1", b: "2"}
 * @author 谭人杰
 * @date 2020-06-10 11:22:44
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, " ") +
    '"}'
  );
}

export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
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
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
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
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
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
  var type = Object.prototype.toString.call(array);
  if (type != "[object Array]" || !key) return array;
  array = array.reduce((cur, pre) => {
    cur[pre[key]] = pre;
    return cur;
  }, {});
  return array;
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
  var cnNums = new Array(
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  );
  //基本单位
  var cnIntRadice = new Array("", "拾", "佰", "仟");
  //对应整数部分扩展单位
  var cnIntUnits = new Array("", "万", "亿", "兆");
  //对应小数部分单位
  var cnDecUnits = new Array("角", "分", "毫", "厘");
  //整数金额时后面跟的字符
  var cnInteger = "整";
  //整型完以后的单位
  var cnIntLast = "元";
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = "";
  //分离金额后用的数组，预定义
  var parts;
  if (money == "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return "";
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf(".") == -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
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
      if (n == "0") {
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
  if (decimalNum != "") {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != "0") {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == "") {
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
export function parseTree(nodes, child_key = "children") {
  if (nodes.length == 0) return;
  nodes.forEach((n, i) => {
    n[child_key] && parseTree(n[child_key], child_key);
  });
}

/**
 * @functionName 添加路径
 * @param {} 参数1
 * @description
 * @author 谭人杰
 * @date 2021-05-14 17:46:36
 */

export function parser_Add_path(
  nodes,
  params = "path",
  children = "children",
  items = []
) {
  if (nodes.length == 0) return;
  nodes.forEach((n, i) => {
    const _items = [...items];
    const meta = {} || null;
    n.meta = meta;
    n.meta.title = n.title;
    n.meta.icon = n.icon;
    n.hidden = n.hidden == null || n.hidden == "0" ? false : true;

    n.meta.affix = n.affix == 1 ? true : false
    n.meta.noCache = n.noCache == 1 ? true : false
    if (!n.noCache) delete n.noCache;
    if (!n.redirect) delete n.redirect;
    if (!n.activeMenu) delete n.activeMenu;
    if (!n.alwaysShow) delete n.alwaysShow;
    if (!n.breadcrumb) delete n.breadcrumb;
    if (!n.affix) delete n.affix;
    if (!n.name) delete n.name;
    delete n.type;
    _items.push(n[params]);
    n.items = _items;
    n[children] && parser_Add_path(n[children], params, children, [...n.items]);
  });
  return nodes;
}

/**
 * @functionName 找出树中所有子节点，并返回数组
 * @param {} 参数1
 * @description
 * @author 谭人杰
 * @date 2021-05-14 17:46:36
 */

export function findAllChldren(nodes, children = "children", arrs = []) {
  let flat = function (nodes, children, arr = []) {
    if (!Array.isArray(nodes)) return;
    nodes.forEach((n, i) => {
      if (!n.children) {
        arr.push(n);
      }
      n[children] && flat(n[children], children, arr);
    });
    return arr;
  };
  return flat(nodes, children, arrs);
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
export function ArrayToTree({
  array = [],
  id_key = "id",
  parentId_key = "parentId"
} = {}) {
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
  var type = Object.prototype.toString.call(val);
  switch (type) {
    case "[object Array]":
      return val.length > 0 ? true : false;
      break;
    case "[object Object]":
      return Object.keys(val).length > 0 ? true : false;
      break;
    case "[object Null]":
      return false;
      break;
    case "[object Undefined]":
      return false;
      break;
    case "[object String]":
      return val != "" ? true : false;
      break;
    case "[object Number]":
      if (isNaN(val) || !isFinite(val)) {
        return false;
      }
      return true;
      break;
    case "[object Map]":
      return val.size > 0 ? true : false;
      break;
    case "[object Set]":
      return val.size > 0 ? true : false;
      break;
  }
}

/**
 * @functionName 数组分组 返回json
 * @param {} 参数1
 * @description
 * @author 谭人杰
 * @date 2021-05-29 13:36:33
 */
export function arrayGroupBy(arr, key) {
  if (!Array.isArray(arr)) return;
  return arr.reduce((cur, pre) => {
    if (cur[pre[key]] == undefined) {
      pre.isFirst = true;
      cur[pre[key]] = [pre];
    } else {
      cur[pre[key]] = [...cur[pre[key]], ...[pre]];
    }
    return cur;
  }, {});
}

export class Calendar {
  constructor() {
    this.currentWeekFirst = null;
  }
  /**
   * @functionName   jsfn
   * @param { Date } date
   * @description 根据日期获取 以一周为单位的日期
   * @author 谭人杰
   * @date 2021-06-10 20:51:19
   */
  _setDate(date) {
    let weekList = []; // 周列表
    let passed = date.getDay() - 1;
    let _date = this._addDate(date, passed * -1); // 获取周一的时间
    this.currentWeekFirst = new Date(_date);
    for (let i = 0; i < 7; i++) {
      let _ = this.format(i === 0 ? _date : this._addDate(_date, 1));
      weekList.push(_);
    }
    return weekList;
  }

  /**
   * @functionName jsfn
   * @param { Date } date
   * @param { 天数 } days
   * @description 增加时间
   * @author 谭人杰
   * @date 2021-06-10 20:50:06
   */
  _addDate(date, days) {
    return new Date(date.setDate(date.getDate() + days));
  }

  /**
   * @functionName   ThisWeek
   * @param { Date } date
   * @description 获取本周日期
   * @author 谭人杰
   * @date 2021-06-10 20:48:35
   */
  ThisWeek(date) {
    let data = this._setDate(date);
    return data;
  }

  /**
   * @functionName  prev
   * @description 上星期
   * @author 谭人杰
   * @date 2021-06-10 20:47:55
   */
  prev() {
    let data = this._setDate(this._addDate(this.currentWeekFirst, -7));
    return data;
  }

  /**
   * @functionName  next
   * @description 下星期
   * @author 谭人杰
   * @date 2021-06-10 20:47:41
   */
  next() {
    let data = this._setDate(this._addDate(this.currentWeekFirst, 7));
    return data;
  }

  /**
   * @functionName format
   * @param { Date } date
   * @description 格式化年月日，以-隔开
   * @author 谭人杰
   * @date 2021-06-10 20:47:09
   */

  format(date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let w = date.getDay();
    let week =
      [
        "（星期日）",
        "（星期一）",
        "（星期二）",
        "（星期三）",
        "（星期四）",
        "（星期五）",
        "（星期六）"
      ][w] + " ";
    return (
      [year, month, day].map(item => (item[1] ? item : "0" + item)).join("-") +
      "  " +
      week
    );
  }
}

/**
 * @functionName jsf
 * @param { String } startTime  开始时间 时间格式为 12:00
 * @param { String } endTime  结束时间 时间格式为 12:00
 * @param {} 参数3
 * @param {} 参数4
 * @description
 * @author 谭人杰
 * @date 2021-06-18 19:44:27
 */
export function bt_getTime(startTime = "00:00", endTime = "24:00") {
  const timeMap = {
    "00": 0,
    "15": 1,
    "30": 2,
    "45": 3
  };
  const numTotimeMap = ["00", "15", "30", "45"];
  let [startHours, startMin] = startTime.split(":");
  let [endHours, endMin] = endTime.split(":");
  let len = endHours - startHours;
  let res = [];
  for (let i = 0; i < len + 1; i++) {
    let num = i === 0 ? timeMap[startMin] : 0;
    let inlen = i === len ? timeMap[endMin] + 1 : 4;
    for (let q = num; q < inlen; q++) {
      let hours = parseInt(startHours) + parseInt(i);
      let item = `${hours > 9 ? hours : `0${hours}`}:${numTotimeMap[q]}`;
      res.push(item);
    }
  }
  return res;
}

/**
 * @functionName jsfn
 * @param {} 开始日期 与 结束日期 相隔 几年几月几日
 * @description
 * @author 谭人杰
 * @date 2021-06-24 14:48:22
 */

export function bt_getDays(sDate1, sDate2) {
  var fixDate = function (sDate) {
    var aD = sDate.split("-");
    for (var i = 0; i < aD.length; i++) {
      aD[i] = fixZero(parseInt(aD[i]));
    }
    return aD.join("-");
  };
  var fixZero = function (n) {
    return n < 10 ? "0" + n : n;
  };
  var fixInt = function (a) {
    for (var i = 0; i < a.length; i++) {
      a[i] = parseInt(a[i]);
    }
    return a;
  };
  var getMonthDays = function (y, m) {
    var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) {
      aMonthDays[2] = 29;
    }
    return aMonthDays[m];
  };
  var checkDate = function (sDate) { };
  var y = 0;
  var m = 0;
  var d = 0;
  var sTmp;
  var aTmp;
  sDate1 = fixDate(sDate1);
  sDate2 = fixDate(sDate2);
  if (sDate1 > sDate2) {
    sTmp = sDate2;
    sDate2 = sDate1;
    sDate1 = sTmp;
  }
  var aDate1 = sDate1.split("-");
  aDate1 = fixInt(aDate1);
  var aDate2 = sDate2.split("-");
  aDate2 = fixInt(aDate2);
  y = aDate2[0] - aDate1[0];
  if (sDate2.replace(aDate2[0], "") < sDate1.replace(aDate1[0], "")) {
    y = y - 1;
  }
  aTmp = [aDate1[0] + y, aDate1[1], fixZero(aDate1[2])];
  while (true) {
    if (aTmp[1] == 12) {
      aTmp[0]++;
      aTmp[1] = 1;
    } else {
      aTmp[1]++;
    }
    if ([aTmp[0], fixZero(aTmp[1]), aTmp[2]].join("-") <= sDate2) {
      m++;
    } else {
      break;
    }
  }
  aTmp = [aDate1[0] + y, aDate1[1] + m, aDate1[2]];
  if (aTmp[1] > 12) {
    aTmp[0]++;
    aTmp[1] -= 12;
  }
  while (true) {
    if (aTmp[2] == getMonthDays(aTmp[0], aTmp[1])) {
      aTmp[1]++;
      aTmp[2] = 1;
    } else {
      aTmp[2]++;
    }
    sTmp = [aTmp[0], fixZero(aTmp[1]), fixZero(aTmp[2])].join("-");
    if (sTmp <= sDate2) {
      d++;
    } else {
      break;
    }
  }
  return {
    y: y,
    m: m,
    d: d
  };
}

export function parseOrgInfo(nodes, res = [], items = []) {
  const r = res;
  nodes.forEach(item => {
    item.nodeId = item.departmentId ?? item.id ?? item.centerId;
    // item.parentNodeId = item.departmentInfo ? "0" : item.blongDepm ?? item.centerId;
    const _items = [...items];
    _items.push(item.nodeId);
    const __items = [..._items].filter((item, index) => index != _items.length - 1)
    item.nodeId = _items.join("-");

    item.parentNodeId = item.departmentInfo ? null : __items.join("-")

    item.items = _items;
    item.width = 250;
    item.height = 90;
    item.borderWidth = 1;
    item.borderRadius = 5;
    item.borderColor = {
      red: 1,
      green: 124,
      blue: 255,
      alpha: 1
    };
    item.backgroundColor = {
      red: 1,
      green: 124,
      blue: 255,
      alpha: 0.8
    };
    item.connectorLineColor = {
      red: 1,
      green: 124,
      blue: 255,
      alpha: 1
    };
    item.connectorLineWidth = 5;
    item.dashArray = "";
    item.expanded = true;
    item.template = `<div style="text-align:center; font-size:30px;line-height: 90px">${(item.departmentName ? item.departmentName : item.positionName) ?? item.centerName
      }</div>`;
    delete item.blongDepm;
    delete item.id;
    delete item.departmentId;
    delete item.centerId;
    r.push(item);
    var temp = item.departmentInfo ?? item.positions;
    temp && parseOrgInfo(temp, r, _items);
  });
  return r;
}


/**
 * js浮点数计算处理
 */

export function floatObj() {
  /*
   * 判断obj是否为一个整数
   */
  function isInteger(obj) {
    return Math.floor(obj) === obj
  }

  /*
   * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
   * @param floatNum {number} 小数
   * @return {object}
   *   {times:100, num: 314}
   */
  function toInteger(floatNum) {
    var ret = { times: 1, num: 0 }
    if (isInteger(floatNum)) {
      ret.num = floatNum
      return ret
    }
    var strfi = floatNum + ''
    var dotPos = strfi.indexOf('.')
    var len = strfi.substr(dotPos + 1).length
    var times = Math.pow(10, len)
    var intNum = parseInt(floatNum * times + 0.5, 10)
    ret.times = times
    ret.num = intNum
    return ret
  }

  /*
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   *
   * @param a {number} 运算数1
   * @param b {number} 运算数2
   * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
   * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
   *
   */
  function operation(a, b, digits, op) {
    var o1 = toInteger(a)
    var o2 = toInteger(b)
    var n1 = o1.num
    var n2 = o2.num
    var t1 = o1.times
    var t2 = o2.times
    var max = t1 > t2 ? t1 : t2
    var result = null
    switch (op) {
      case 'add':
        if (t1 === t2) { // 两个小数位数相同
          result = n1 + n2
        } else if (t1 > t2) { // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2)
        } else { // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2
        }
        return result / max
      case 'subtract':
        if (t1 === t2) {
          result = n1 - n2
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2)
        } else {
          result = n1 * (t2 / t1) - n2
        }
        return result / max
      case 'multiply':
        result = (n1 * n2) / (t1 * t2)
        return result
      case 'divide':
        result = (n1 / n2) * (t2 / t1)
        return result
    }
  }

  // 加减乘除的四个接口
  function add(a, b, digits) {
    
    return operation(a, b, digits, 'add')
  }
  function subtract(a, b, digits) {
    return operation(a, b, digits, 'subtract')
  }
  function multiply(a, b, digits) {
    return operation(a, b, digits, 'multiply')
  }
  function divide(a, b, digits) {
    return operation(a, b, digits, 'divide')
  }

  // exports
  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  }
}
export function getFlatRoutes(routes){
  return routes.map(child => {

    child.component = views_dir[child.component];
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child);
    }
    return child;
  });
}
const formatRouter = (routes, basePath = "/", list = [], parent) => {
  routes.map(item => {
    if (item.component) {
      item.component = views_dir[item.component];
    } else {
      delete item.component;
    }
    item.path = path.resolve(basePath, item.path);
    const meta = item.meta || {};
    if (!meta.parent && parent && item.title) {
      meta.parent = parent.path;
      item.meta = meta;
    }
    if (item.redirect) item.redirect = path.resolve(basePath, item.redirect);
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, item);
      delete item.children;
      list.concat(arr);
    }else{
      delete item.children;
    }
    list.push(item);
  });
  return list;
};