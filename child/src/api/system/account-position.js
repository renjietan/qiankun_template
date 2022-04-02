import request from '@/utils/request'
/**
 * @functionName account_position
 * @param {number} accId

 * @description 根据id获取所拥有的权限
 * @author 王文涛
 * @date 2021-08-09 10:47:51
*/
export function account_position(query) {
    return request({
        url: '/aam/account-position/query/by-acc-id',
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
export function by_pos_id(query) {
    return request({
        url: 'http://47.102.211.100:8888/aam/position-auth/query/by-pos-id',
        method: 'get',
        params: query
    })
}