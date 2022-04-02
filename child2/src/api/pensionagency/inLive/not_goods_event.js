import request from '@/utils/request'
/**
 * @functionName 
 * @description 添加不良事件
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function add_not_goods_event(query){
    return request({
        url:'/cim/elder-bad-event/add',
        headers:{
            "Content-Type": "application/json;"
        },
        data: query,
        method:'post'
    })
}

/**
 * @functionName 
 * @description 根据老人ID 查询老人不良事件列表
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function get_not_goods_event_byElderId(query){
    return request({
        url:'/cim/elder-bad-event/query/by-elder-id',
        params: query,
        method:'get'
    })
}


/**
 * @functionName 
 * @description 根据不良事件ID 查询不良事件详情
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function get_not_goods_event_byid(query){
    return request({
        url:'/cim/elder-bad-event/query/by-id',
        params: query,
        method:'get'
    })
}

/**
 * @functionName 
 * @description 根据不良事件ID 删除/编辑
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function set_or_del_event_byid(query){
    return request({
        url:'/cim/elder-bad-event/manager',
        headers:{
            "Content-Type": "application/json;"
        },
        data: query,
        method:'post'
    })
}

/**
 * @functionName 
 * @description 根据不良事件ID 删除/编辑
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function get_elder_linkman(query){
    return request({
        url:'/cim/elder-contact-info/query/first',
        params: query,
        method:'get'
    })
}

