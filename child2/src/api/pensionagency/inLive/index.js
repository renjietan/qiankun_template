import request from '@/utils/request'

/**
 * @functionName setLabel
 * @description 设置标签
 * @author 谭人杰
 * @date 2021-09-01 19:52:41
*/
export function setLabel(query) {
    return request({
        url: '/cim/elder-live-info/modify/label',
        params: query,
        method: 'post'
    })
}

/**
 * @functionName setLabel
 * @description 生日一览
 * @author 谭人杰
 * @date 2021-09-01 19:52:41
*/
export function get_birthday_list(query) {
    return request({
        url: '/cim/elder-base-info/query/birthday-info/by-page',
        data: query,
        method: 'post'
    })
}

/// @description: 
/// @params: 
/// @fileName: index.js 
/// @author: 王文涛 
/// @date: 2021-12-13 18:52:01
/// @后台人员: 
export function get_elder_all(query) {
    return request({
        url: '/cim/elder-live-info/query/all',
        params: query,
        method: 'get'
    })
} 