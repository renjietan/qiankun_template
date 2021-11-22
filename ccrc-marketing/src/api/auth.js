import request from '@/utils/request'
/**
 * @functionName login
 * @param {string} username
 * @param {string} password
 * @description 系统登陆
 * @author 谭人杰
 * @date 2020-06-09 11:51:36
*/
export function login(query) {
    return request({
        url: '/auth/login',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}
/**
 * @functionName findByToken
 * @description 根据token获取用户信息
 * @param {string} token
 * @author 谭人杰
 * @date 2020-06-09 11:52:14
*/
export function findByToken(query) {
    return request({
        url: '/auth/findByToken',
        method: 'get',
        params: query
    })
}

/**
 * @functionName logout
 * @param {string} token
 * @description 系统退出
 * @author 谭人杰
 * @date 2020-06-09 15:24:29
*/
export function logout(query) {
    return request({
        url: '/auth/logout',
        method: 'post',
        params: query
    })
}
