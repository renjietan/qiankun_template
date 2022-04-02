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
        url: '/aam/account-info/emp/login',
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
        url: '/aam/account-info/query/by-token',
        method: 'get',
        params: query
    })
}
/**
 * @functionName js
 
 * @description 查询账号
 * @author 王文涛
 * @date 2021-08-09 14:59:12
*/
export function batch(query) {
    return request({
        url: '/aam/account-info/query/batch',
        method: 'get',
        params: query
    })
}
/**
 * @description  "新增登录账号"
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 15:00:00
 * 
*/
export function add(query) {
    return request({
        url: '/aam/account-info/add',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/**
 * @description 删除账号
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 16:35:26
*/
export function by_emp_id(query) {
    return request({
        url: '/aam/account-info/delete/by-emp-id',
        method: 'post',
        params:query,
    })
}
 
/**
 * @functionName js
 * @param {number} empId
 * @param {string} newEmpNm
 * @description
 * @author 王文涛
 * @date 2021-08-09 16:59:57
*/
export function update(query) {
    return request({
        url: '/aam/account-info/manager',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
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
/**
 * @functionName  获取权限路由
 * @param {string} accid
 * @description
 * @author 王文涛
 * @date 2021-08-10 10:50:45
*/
export function getRouter(query) {
    return request({
        url: '/aam/menu-auth/query/by-acc-id',
        method: 'get',
        params: query
    })
}
/**
 * @functionName js
 * @param {number} posId
 * @param {array} authId

 * @description
 * @author 王文涛
 * @date 2021-08-10 17:49:46
*/
export function addPer(query) {
    return request({
        url: '/aam/position-auth/batch/add',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/**
 * @description 模糊查询账号
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-11 09:10:39
*/
export function acc_or_name(query) {
    return request({
        url: '/aam/account-info/query/like/acc-or-name',
        method: 'get',
        params: query
    })
}