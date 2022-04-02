import request from '@/utils/request'
/**
 * @description 在住预览-床位调整
 * @modifyContent
 * @author 王文涛
 * @date 2021-09-02 16:54:43
*/
export function charge_process(query) {
    return request({
        url: '/cim/charge-process/add',
        data: query,
        headers: {
            "Content-Type": 'application/json;'
        },
        method: 'post'
    })
}

/**
 * @description  各类调整一览
 * @modifyContent
 * @author 王文涛
 * @date 2021-09-03 09:14:42
*/
export function by_type_page(query){
    return request({
        url: '/cim/charge-process/query/by-type-page',
        data: query,
        headers: {
            "Content-Type": 'application/json;'
        },
        method: 'post'
    })
}

/**
 * @description 床位获取状态
 * @modifyContent
 * @author 王文涛
 * @date 2021-09-03 09:29:36
*/
export function process_handle_info(query ){
    return request({
        url: '/cim/charge-process/query/process-handle-info',
        params: query,
        method: 'get'
    })
}

/**
 * @description '在住查询基本信息'
 * @modifyContent
 * @author 王文涛
 * @date 2021-09-03 15:25:56
*/
export function base_info(query ){
    return request({
        url: '/cim/charge-process/query/charge-process/base-info',
        params: query,
        method: 'get'
    })
}

/**
 * @description '在住审核'
 * @modifyContent
 * @author 王文涛
 * @date 2021-09-06 14:13:55
*/

export function audit(query ){
    return request({
        url: '/cim/audit-record/add/charge-process/audit',
        data: query,
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
    })
}
/** 
 * @description:取消调整 
 * @fileName: bed_just.js 
 * @author: 姜纬杰 
 * @date: 2021-09-26 17:23:18
 * @后台人员:  
*/
export function change_process(query ){
    return request({
        url: '/cim/charge-process/delete/id',
        data: query,
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
    })
}