import request from '@/utils/request'
/**
 * @functionName 
 * @description 根据长者ID 查询长者日志信息
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function get_elderlog_list_byId(query){
    return request({
        url:'/cim/elder-life-log/query/by-elder-id',
        params:query,
        method:'get'
    })
}

/**
 * @functionName 
 * @description 根据长者ID 获取长者日志
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function get_elderlog_byId(query){
    return request({
        url:'http://rap2api.taobao.org/app/mock/288322/inLive/getdetail',
        params:query,
        method:'post'
    })
}

/**
 * @functionName 
 * @description 新增长者日志
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function add_elderlog(query){
    return request({
        url:'/cim/elder-life-log/add',
        data: query,
        method:'post'
    })
}

/**
 * @functionName 
 * @description 编辑/删除长者日志
 * @author 谭人杰
 * @date 2021-08-28 10:44:58
*/
export function set_or_del_elderlog(query){
    return request({
        url:'/cim/elder-life-log/manager',
        data:query,
        method:'post'
    })
}

/**
 * @description '查询长者信息'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-30 19:14:29
*/
export function simple_info(query){
    return request({
        url:'/cim/elder-base-info/query/simple-info',
        params:query,
        method:'get'
    })
} 