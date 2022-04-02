import request from '@/utils/request';
/**
 * @functionName refund-list
 * @param {string}  nameOrBed 姓名床位
   @param {number}  pageNum  
   @param {number}  pageSize 
 * @description 账户管理页面列表页查询接口
 * @author 王文涛
 * @date 2021-11-25 10:47:51
*/
export function refund_list(query) {
    return request({
        url: '/fsm/bill-info/query/refund-list',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/**
 * @functionName refund-list
 * @param {string}  nameOrBed 姓名床位
   @param {number}  pageNum  
   @param {number}  pageSize 
 * @description 账户管理页面列表页查询接口
 * @author 王文涛
 * @date 2021-11-25 10:47:51
*/
export function refund_list_detail(query) {
    return request({
        url: '/fsm/bill-info/query/no-pay-bills',
        method: 'get',
        params: query
    })
}

/**
 * @functionName refund-list
 * @param {number}  allAmt 收费金额
   @param {array}  billIds  账单id 
   @param {number}  elderId 长者id
   @param {array}  payDetailList payDetailList
   @param {string}  refundDesc	说明
 * @description 完成收退费接口
 * @author 王文涛
 * @date 2021-11-25 10:47:51
*/
export function refound_add(query) {
    return request({
        url: '/fsm/refund-record/add',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}
/**
 * @functionName refund-list
 * @param {array}  billId  账单id 
   @param {string}  firstAmt 拆分金额1
   @param {string}  secondAmt 拆分金额2
 * @description 拆分金额接口
 * @author 王文涛
 * @date 2021-11-25 10:47:51
*/
export function refound_split(query) {
    return request({
        url: '/fsm/bill-info/split',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}
/**
 * @functionName refund-list
 * @description 获取所有登记科目
 * @author 王文涛
 * @date 2021-11-25 10:47:51
*/ 

export function all_fee_subject(query) {
    return request({
        url: '/fsm/bill-info/query/all-fee-subject',
        method: 'get',
        params: query
    })
}

/**
 * @functionName refund-list
 * @description 获取所有登记科目
 * @author 王文涛
 * @date 2021-11-25 10:47:51
*/ 

export function all_fee_add(query) {
    return request({
        url: '/fsm/bill-info/add',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/** 
 * @description: 
 * @fileName: refund-record.js 
 * @author: 王文涛 
 * @date: 2021-12-14 16:45:25
 * @后台人员:  
*/
export function all_fee_update(query) {
    return request({
        url: '/fsm/bill-info/modify',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}
/** 
 * @description: 费用取消 
 * @fileName: refund-record.js 
 * @author: 王文涛 
 * @date: 2021-12-28 16:02:22
 * @后台人员:  
*/

export function fee_cannel(query){
    return request({
        url: '/fsm/bill-info/cancel',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}