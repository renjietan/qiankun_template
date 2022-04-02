import request from '@/utils/request'
/** 
 * @description: 新增账号
 * @fileName: system_account.js 
 * @author: 王文涛 
 * @date: 2022-01-24 18:56:46
 * @后台人员:  
*/
export function add_service_center(query){
    return request({
        url: '/aam/account-info/add/manager-account',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
    }) 
}
/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 20:11:29
*/
export function get_admin_account(query) {
    return request({
        url: '/aam/account-info/query/manager-account',
        method: 'get',
        params: query
    })
}

/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 20:11:29
*/
export function bind_admin_account(query) {
    return request({
        url: '/aam/account-info/manage/account-ref-center',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
    })
}

/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 20:11:29
*/
export function find_admin_account(query) {
    return request({
        url: '/aam/account-info/query/ref-center',
        method: 'get',
        params:query,
    })
}

/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 20:11:29
*/
export function find_admin_Menu(query) {
    return request({
        url: '/aam/service-center/query/menu-by-id',
        method: 'get',
        params:query,
    })
}


