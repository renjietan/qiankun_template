import request from '@/utils/request'
/** 
 * @description: 新增机构
 * @param {string} address
 * @param {string} centerName
 * @param {string} describe
 * @param {string} joinType
 * @param {string} serviceType
 * @param {string} simpleName
 * @fileName: org.js 
 * @author: 王文涛 
 * @date: 2022-01-21 15:51:52
 * @后台人员:  岳喜多
*/

export function add_service_center(query){
    return request({
        url: '/aam/service-center/add',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
    }) 
}

/** 
 * @description:获取机构列表 
 * @fileName: org.js 
 * @author: 王文涛 
 * @date: 2022-01-24 10:46:41
 * @后台人员:  
*/
export function service_center_page(query){
    return request({
        url: '/aam/service-center/query/page',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
    }) 
}

/** 
 * @description: 
 * @fileName: org.js 
 * @author: 王文涛 
 * @date: 2022-01-24 11:13:35
 * @后台人员:  
*/
export function service_center_modify(query){
    return request({
        url: '/aam/service-center/modify',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data:query,
    }) 
}
/** 
 * @description: 
 * @fileName: org.js 
 * @author: 王文涛 
 * @date: 2022-01-24 11:13:35
 * @后台人员:  
*/
export function org_menu(query){
    return request({
        url: '/aam/service-center/query/center-ref-menu',
        method: 'get',
        params:query,
    }) 
}
/** 
 * @description: 
 * @fileName: org.js 
 * @author: 王文涛 
 * @date: 2022-01-24 20:50:37
 * @后台人员:  
*/
export function get_org(query){
    return request({
        url: '/aam/service-center/query/by-type',
        method: 'get',
        params:query,
    }) 
}