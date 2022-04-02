import request from '@/utils/request'

/**
 * @description 请假列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-04 18:00:08
*/
export function getHolidyList(query){
    return request({
        url:'/cim/leave-apply/query/by-page',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}

/**
 * @description  请假一览获取请假状态
  * @modifyContent
 * @author 王文涛
 * @date 2021-08-31 15:04:04
*/

export function leave_status(query){
    return request({
        url:'/cim/leave-apply/query/leave-status',
        params:query,
        method:'get'
    })
}

/**
 * @description 请假详情
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-06 10:28:47
*/
export function getdetail(query){
    return request({
        url:'/cim/leave-apply/query/by-id',
        params:query,
        method:'get'
    })
}

/**
 * @description 个人档案-请假列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-31 15:12:23
*/
export function query_eleder(query){
    return request({
        url:'/cim/leave-apply/query/by-elder-id',
        params:query,
        method:'get'
    })
}

/**
 * @description 个人档案-请假申请
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-06 15:03:59
*/
export function updateHoliday(query){
    return request({
        url:'/cim/leave-apply/add',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}


/**
 * @description  '修改'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-31 18:01:30
*/
export function manager(query){
    return request({
        url:'/cim/leave-apply/manager',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}
/**
 * @description 销假
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-06 15:17:21
*/
export function goBack(query){
    return request({
        url:'/cim/leave-off/add',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}

/**
 * @description 取消请假
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-06 15:44:53
*/
export function deletHoliday(query){
    return request({
        url:'http://rap2api.taobao.org/app/mock/288322/inLive/delete',
        params:query,
        method:'post'
    })
}