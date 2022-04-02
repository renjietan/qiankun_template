import request from '@/utils/request';
/**
 * @functionName batch
 * @param {string} liveStatus 长者状态
   @param {string}  nameOrBed 姓名床位
   @param {number}  pageNum  
   @param {number}  pageSize 
 * @description 账户管理页面列表页查询接口
 * @author 王文涛
 * @date 2021-11-22 10:47:51
*/
export function batch(query) {
    return request({
        url: '/fsm/elder-account-info/query/batch',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}


/**
 * @functionName batch
 * @param {number} elderId 长者id
 * @description 账户管理页面列表页查询接口
 * @author 王文涛
 * @date 2021-11-22 10:47:51
*/
export function by_elder_id(query) {
    return request({
        url: '/fsm/elder-account-info/query/by-elder-id',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}
/**
 * @functionName recharge
 * @param {number} elderId 长者id	
   @param {string}  desc 说明
   @param {number}  rechargeAmt  充值金额 
   @param {string}  type 账户类型	 
 * @description 长者账户充值
 * @author 王文涛
 * @date 2021-11-22 10:47:51
*/
export function recharge(query) {
    return request({
        url: '/fsm/elder-account-info/recharge',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/**
 * @functionName elderId_detail
 * @param {number} accountType 长者id	
   @param {number}  elderId 说明
   @param {string}  endTime  充值金额 
   @param {string}  startTime  充值金额 
   @param {string}  type 账户类型
   @param {number}  pageNum  充值金额 
   @param {number}  pageSize 账户类型	 
 * @description 获取长者账户明细
 * @author 王文涛
 * @date 2021-11-22 10:47:51
*/
export function elderId_detail(query) {
    return request({
        url: '/fsm/bill-info/query/elderId',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/**
 * @functionName elderId_detail
 * @param {number} billId 账单id	
 * @description 获取退费详情
 * @author 王文涛
 * @date 2021-11-22 10:47:51
*/
export function elderId_bill(query) {
    return request({
        url: '/fsm/bill-detail/query/billId',
        method: 'get',
        params: query
    })
}

/** 
 * @description: 
 * @fileName: elder_account_info.js 
 * @author: 王文涛 
 * @date: 2021-12-16 11:59:50
 * @后台人员:  
*/
export function elderId_bill_withdraw(query) {
    return request({
        url: '/fsm/elder-account-info/withdraw',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}


/** 
 * @description: 
 * @fileName: elder_account_info.js 
 * @author: 王文涛 
 * @date: 2021-12-17 11:06:51
 * @后台人员:  
*/
export function elderId_bill_trans(query) {
    return request({
        url: '/fsm/elder-account-info/transfer',
        method: 'post',
        headers: {
            "Content-Type": "application/json;"
        },
        data: query
    })
}

/** 
 * @description: 转出账户给他人
 * @fileName: elder_account_info.js 
 * @author: 王文涛 
 * @date: 2021-12-18 17:10:31
 * @后台人员:  
*/
export function elderId_trans_other(query) {
    return request({
        url: '/fsm/elder-account-info/transfer-to-other',
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
 * @date: 2021-12-27 13:55:43
 * @后台人员:  
*/
export function operate_type(query) {
    return request({
        url: '/fsm/bill-info/query/operate-type',
        method: 'get',
        data: query
    })
}