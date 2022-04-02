// 在住
import request from '@/utils/request'

/**
 * @description 获取等级
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 15:07:13
*/

export function getServeLevel(query){
    return request({
        url:'http://rap2api.taobao.org/app/mock/288322/api/getServeLevel',
        params:query,
        method:'get'
    })
}

/**
 * @description 获取状态
 * @modifyContent
 * @author 姜纬杰
 * @date 2021-08-02 15:27:14
*/
export function getStatus(query){
    return request({
        url:'/cim/elder-live-info/query/live-status',
        params:query,
        method:'get'
    })
}
//获取能力评估记录
/**
 * @description
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-27 14:41:10
*/
export function assess_his(query){
    return request({
        url:'/cim/elder-assess-info/query/ability-assess-his',
        params:query,
        method:'get'
    })
}
/**
 * @description 获取在住列表
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-02 15:54:56
*/
export function getinLeveList(query){
    return request({
        url:'/cim/elder-live-info/query/by-page',
        headers:{
            "Content-Type": "application/json;"
        },
        data:query,
        method:'post'
    })
}

