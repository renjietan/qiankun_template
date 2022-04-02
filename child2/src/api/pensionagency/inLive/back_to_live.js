import request from '@/utils/request'

/**
 * @functionName set_back_live
 * @description 个人档案--退住总结
 * @author 谭人杰
 * @date 2021-09-01 19:52:41
*/
export function set_back_live(query) {
    return request({
        url: '/cim/elder-withdraw-sum/add',
        data: query,
        method: 'post'
    })
}


/**
 * @functionName get_back_live
 * @description 个人档案--查询长者退住总结信息
 * @author 谭人杰
 * @date 2021-09-01 19:52:41
*/
export function get_back_live(query) {
    return request({
        url: '/cim/elder-withdraw-sum/query/by-elder-id',
        params: query,
        method: 'get'
    })
}