import request from '@/utils/request'
/**
 * @description 获取增值服务列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 20:32:08
*/
export function get_addValue_list(query){
    return request({
        url:'/cim/elder-av-service/query/by-page',
        data: query,
        method:'post'
    })
}

/**
 * @description 获取增值服务列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 20:32:08
*/
export function get_addValue_list_byId(query){
    return request({
        url:'/cim/elder-av-service/query/by-elder-id',
        data: query,
        method:'post'
    })
}

/**
 * @functionName jsfn
 * @description 编辑长者的 增值服务
 * @author 谭人杰
 * @date 2021-08-29 19:33:32
*/
export function set_or_del_addValue(query){
    return request({
        url:'/cim/elder-av-service/manager',
        data: query,
        method:'post'
    })
}
/**
 * @description 新增增值服务
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-03 09:31:27
*/
export function addValueInfo(query){
    return request({
        url:'/cim/elder-av-service/add',
        data: query,
        method:'post'
    })
}

/**
 * @description 更新增值服务
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-03 09:54:42
*/
export function updateAddValueInfo(query){
    return request({
        url:'http://rap2api.taobao.org/app/mock/288322/api/updateAddValueInfo',
        data:query,
        headers:{
            "Content-Type": "application/json;"
        },
        method:'post'
    })
}
/**
 * @description "删除增值服务"
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-04 16:59:32
*/
export function deleteValueInfo(query){
   return request({
    url:'http://rap2api.taobao.org/app/mock/288322/inLive/deleteValueInfo',
    data:query,
    method:'post'
   })
}
