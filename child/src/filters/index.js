import { parseTime } from "@/utils";
import { months } from '@/utils/enum';
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from "@/utils";
import { addvalue_fee_type } from '@/utils/enum';
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
    return time + label;
  }
  return time + label + "s";
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
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
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
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
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
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
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @functionName 取最后几个字符
 * @param { String } string
 * @description
 * @author 谭人杰
 * @date 2021-05-12 14:57:19
 */
export function getLastString(string) {
  return string.substring(string.length - 2);
}

/**
 * @functionName 补0
 * @param {} 参数1
 * @description
 * @author 谭人杰
 * @date 2021-06-06 13:46:20
 */
export function formatZero(num, len = 4) {
  if (String(num).length > len) return num;
  return (Array(len).join(0) + num).slice(-len);
}

/**
 * @functionName
 * @param { String } string
 * @description 去掉括号
 * @author 谭人杰
 * @date 2021-06-11 18:58:52
 */
export function remove_parenthesis(string) {
  return string.replace(/\（|）/g, "");
}

/**
 * @functionName jsfn
 * @param { Date } date
 * @description 获取当前时间是星期几
 * @author 谭人杰
 * @date 2021-06-11 19:14:42
 */
export function parseDateToWeek(date) {
  let w = date.getDay();
  let week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ][w];
  return week;
}

/**
 * @functionName
 * @description
 * @author 谭人杰
 * @date 2021-06-17 18:32:43
 */
export function parse_bed_number(str) {
  let temp = {
    单人间: 1,
    双人间: 2,
    四人间: 4,
    六人间: 6
  };
  return temp[str];
}
/**
 * @description:生日转年龄
 * @fileName: index.js
 * @author: 姜纬杰
 * @date: 2021-08-04 14:45:40
 * @后台人员:
 */
export function birthToAge(strBirthday) {
  if (strBirthday == "" || strBirthday == null || strBirthday == undefined) {
    return -1;
  }
  var age;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  let now = new Date();
  var nowYear = now.getFullYear();
  var nowMonth = now.getMonth() + 1;
  var nowDay = now.getDate();
  if (nowYear == birthYear) {
    age = 0;
  } else {
    var yearDiff = nowYear - birthYear;
    if (yearDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;
        if (dayDiff < 0) {
          age = yearDiff - 1;
        } else {
          age = yearDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth;
        if (monthDiff < 0) {
          age = yearDiff - 1;
        } else {
          age = yearDiff;
        }
      }
    } else {
      age = -1;
    }
  }
  return age;
}

export function parseDate(data) {
  if (!!data) {
    let year = data.substring(0, 4);
    let month = data.substring(4, 6);
    let day = data.substring(6, 8);
    return `${year}-${month}-${day}`;
  } else {
    return null;
  }
}


export function parseEventType(data) {
  let r = {
    "BS": "褥疮",
    "ME": "用药",
    "FE": "跌到",
  }
  if (!!data) {
    return r[data]
    
  } else {
    return "";
  }
}

export function parseAddValueType(data) {
  return addvalue_fee_type.filter(item => item.value == data)[0]?.label
}

export function parseTemp(val) {
  let res = ""
 
  return res
}

export function parsetNumber(val){
   return (Number(val)).toFixed(2)
}