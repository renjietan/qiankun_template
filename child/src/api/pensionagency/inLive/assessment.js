import request from '@/utils/request'
export function assess_result(query){
    return request({
        url:'/cim/elder-assess-info/query/assess-result',
        params:query,
        method:'get'
    })
}