import request from '@/utils/request'
/**
 * @functionName js
 * @param {} 参数1
 * @description
 * @author 王文涛
 * @date 2021-08-09 19:05:11
*/
export function menu_auth(query) {
  
    return request({
        url: '/aam/menu-auth/query/menu-auth',
        method: 'get',
        params: query
    })
}
/**
 * @functionName js
 * @param {} 参数1
 * @description
 * @author 王文涛
 * @date 2021-08-09 19:05:11
*/
export function menu_auth_org(query) {
  
    return request({
        url: '/aam/menu-auth/by-center-type',
        method: 'get',
        params: query
    })
}

/** 
 * @description: 
 * @fileName: menu-auth.js 
 * @author: 王文涛 
 * @date: 2022-01-24 14:32:22
 * @后台人员:  
*/
export function menu_auth_bind(query) {
  
    return request({
        url: '/aam/service-center/menu/manage',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
    })
}