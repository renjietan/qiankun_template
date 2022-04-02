import request from '@/utils/request'

/**
 * @description 请假列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-04 18:00:08
*/
export function getLevevList(query){
    return request({
        url:'http://rap2api.taobao.org/app/mock/288322/inLive/getLevevList',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}

/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 10:24:45
*/
export function addServeRejust(query){
    return request({
        url:'http://rap2api.taobao.org/app/mock/288322/InLive/addServeRejust',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}

/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 10:24:45
*/
export function get_charge_process_byId_byType(query){
    return request({
        url:'/cim/charge-process/query/elder-id-type',
        params: query,
        method:'get'
    })
}
//根据ID与Type 获取审核信息
export function get_AuditInfo(query) {
    return request({
        url:'/cim/audit-record/query/by-process',
        params: query,
        method:'get'
    })
}

/**
 * @description 床位调整--服务等级调整  付款计划保存
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 10:24:45
*/
export function  confirm_pay_plan(query){
    return request({
        url:'/cim/elder-pay-plan/save/charge-process/pay-plan',
        params: query,
        method:'post'
    })
}

/**
 * @description 付款计划调整  付款计划保存
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 10:24:45
*/
export function  confirm_pay_plan2(query){
    return request({
        url:'/cim//charge-process/add',
        data: query,
        method:'post'
    })
}



/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-09 10:24:45
*/
export function get_inLive_payPlan(query){
    return request({
        url:'/cim/elder-pay-plan/query/charge-pay-plan',
        params: query,
        method:'get'
    })
}