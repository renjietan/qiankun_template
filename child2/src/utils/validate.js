/**
 * @functionName 是否是外部链接
 * @param {string} path
 * @description
 * @author 谭人杰
 * @date 2020-06-11 09:57:12
*/
export function isExternal(path) {
  return /^((https|http)?:|mailto:|tel:)/.test(path)
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


/**
 * @functionName jsfn
 * @description 必填且必须是数字
 * @author 谭人杰
 * @date 2021-06-17 15:54:33
*/

export function isNumber_mustFill(rule, value, callback) {
  let temp = value / 1
  if (isNaN(temp)) {
    callback(new Error('请输入数字'));
  } else {
    callback();
  }
};


/**
 * @functionName jsfn
 * @description 必填且必须身份证
 * @author 谭人杰
 * @date 2021-06-17 15:54:33
*/

export function isCert_code(rule, value, callback) {
  // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  var reg = /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/
  if (value == "") {
    callback("不可为空")
  } else if (!reg.test(value)) {
    callback("证件号不合法");
  } else {
    callback();
  }
};
/**
 * @functionName js
 * @description 电话号码校验规则
 * @author 胡洁
 * @date 2021-07-27 16:50:14
*/
export function isPhone(rule, value, callback) {
  var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
  if (value == '' || value == undefined) {
    callback("请输入手机号码")
  } else if (!reg.test(value)) {
    callback("手机号码格式不正确")
  } else {
    callback();
  }
}

/**
 * @functionName 可以为空的手机号
 * @description
 * @author 谭人杰
 * @date 2021-08-23 19:20:45
*/
export function isPhone_maybeNull(rule, value, callback) {
  var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
  if (value == '' || value == undefined) {
    callback()
  } else if (!reg.test(value)) {
    callback("手机号码格式不正确")
  } else {
    callback();
  }
}



/**
 * @functionName js
 * @description 姓名校验规则
 * @author 胡洁
 * @date 2021-07-27 17:04:03
*/

export function isOldman_name(rule, value, callback) {
  var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  if (value == '' || value == undefined) {
    callback("请输入姓名")
  } else if (!reg.test(value)) {
    callback("请输入文字")
  } else {
    callback();
  }
}


/**
 * @functionName js
 * @description 邮政编码校验
 * @author 胡洁
 * @date 2021-07-27 19:44:34
*/
export function isPostal_code(rule, value, callback) {
  var reg = /^[1-9][0-9]{5}$/;
  if (value == '' || value == undefined) {
    callback()
  } else if (!reg.test(value)) {
    callback("请输入正确邮政编码格式")
  } else {
    callback();
  }
}

/**
 * @functionName js
 *  @description 营业执照校验
 * @author 胡洁
 * @date 2021-07-29 13:56:41
*/
export function isBusiness_lic(rule, value, callback) {
  var reg = /^([159Y]{1})([1239]{1})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY]{1})$/;
  if (value == "") {
    callback("不可为空")
  } else if (!reg.test(value)) {
    callback("请输入正确格式编号");
  } else {
    callback();
  }
};
/**
 * @functionName js
 * @param {String} password
 * @param {String} password2
 * @description
 * @author 王文涛
 * @date 2021-08-09 15:17:08
*/
export function isPassword(rule, password, password2) {
  if (password === password2) {
    return false
  } else {
    return true;
  }
};

/**
 * @functionName js
 * @description  邮箱可为空验证
 * @author 王文涛
 * @date 2021-08-23 11:08:09
*/

export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
  if (value == "" || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}
/**
 * @functionName jsfn
 * @description 不可小于当前日期 且不可为空
 * @author 谭人杰
 * @date 2021-10-01 16:38:39
*/

// export function not_less_than_curDate(rule, value, callback) {
//   if (value == "" || value == undefined || value == null) {
//     callback(new Error('不可为空'))
//   } else {
//     if (new Date().getTime() > new Date(value).getTime()) {
//       console.log(2222222);

//       callback(new Error('不可小于今天的日期'))
//     } else {
//       callback()
//     }
//   }
// }