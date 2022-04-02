export const ERR_CODE_API = {
    20100: '已存在',
    20400: '无数据',
    40000: '参数或者语法不对',
    40202: '登陆失败，账号未配置角色',
    40400: '请求的资源不存在',
    40500: '操作失败',
    40800: '请求超时',
    50000: '服务器内部错误',
}

export const ERR_CODE_HTTP = {
    400: '请求错误',
    401: '登录失效或在其他地方已登录', //当token验证错误或者超时
    403: '拒绝访问', // 拒绝返回时，应当返回msg,因为什么而拒绝访问，例如无权限等等
    404: '请求地址已不存在',
    405: '请求方式错误',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
}

export const TRY_CATCH_INFO = {
    RangeError: 'RangeError：数值超界',
    ReferenceError: 'ReferenceError：非法或不能识别的引用数值',
    SyntaxError: 'SyntaxError：发生语法解析错误',
    TypeError: 'TypeError：用户角色未获取到',
    URIError: 'URIError：URI处理函数使用不当'
}
/**
 * @functionName 获取错误信息
 * @param {object} error
 * @description 根据状态码获取错误信息
 * @author 谭人杰
 * @date 2020-06-10 11:01:21
*/
export function getErrMsg(error) {
    if (!error.response) {
        return { errCode: null, errMsg: '网络不可用，请刷新重试' }
    }
    const errCode = error.response.status // 错误码
    const errMsg = ERR_CODE_HTTP[errCode] // 错误消息

    return { errCode: errCode, errMsg: errMsg ? `${errMsg} [${errCode}]` : error.message }
}