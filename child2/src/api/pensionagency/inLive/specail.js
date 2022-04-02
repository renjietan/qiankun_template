import request from '@/utils/request'
// 特殊膳食管理
/**
 * @description 请求列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 18:47:21
*/
export function getSpecialList(query){
    return request({
        url:'/cim/elder-special-diet/query/by-page',
        data:query,
        method:'post'
    })
}

/**
 * @description '添加特殊膳食'
 * @modifyContent
 * @author 姜纬杰
 * @date 2021-08-02 19:16:55
*/
export function addSpecailINfo(query){
    return request({
        url:'/cim/elder-special-diet/add',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}

/**
 * @description '删除/编辑特殊膳食'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 19:16:55
*/
export function updateSpecailInfo(query){
    return request({
        url:'/cim/elder-special-diet/manager',
        data:query,
        method:'post'
    })
}
/**
 * @description '新增特殊膳食'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 19:16:55
*/
export function addSpecailInfo(query){
    return request({
        url:'/cim/elder-special-diet/add',
        data:query,
        method:'post'
    })
}
/**
 * @description '根据老人ID 查询特殊膳食'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 20:00:46
*/
export function get_specali_foods_byId(query){
    return request({
        url:'/cim/elder-special-diet/query/by-elder-id',
        params:query,
        method:'get'
    })
}


/**
 * @description '根据长者姓名模糊查询'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 20:00:46
*/
export function getElderByName(query){
    return request({
        url:'/cim/elder-base-info/query/like-name',
        params:query,
        method:'get'
    })
}