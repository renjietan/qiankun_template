/** 
 * @description:合同相关接口 
 * @fileName: contract.js 
 * @author: 姜纬杰 
 * @date: 2021-09-01 14:54:08
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description:合同一览 
 * @fileName: contract.js 
 * @author: 姜纬杰 
 * @date: 2021-09-01 14:54:38
 * @后台人员:  
*/
export function get_contract_list(query) {
  return request({
      url: '/cim/elder-contract/query/by-page',
      method: 'post',
      headers: {
        "Content-Type": 'application/json;'
    },
      data: query
  })
}
/** 
 * @description:根据id查询长者合同履历 
 * @fileName: contract.js 
 * @author: 姜纬杰 
 * @date: 2021-09-01 15:52:41
 * @后台人员:  
*/
export function get_elder_contract(query) {
  return request({
      url: '/cim/elder-contract/query/his-by-elder-id',
      method: 'get',
      params: query
  })
}
/** 
 * @description:根据id查询长者合同详情 
 * @fileName: contract.js 
 * @author: 姜纬杰 
 * @date: 2021-09-01 17:40:49
 * @后台人员:  
*/
export function get_contract_detail(query) {
  return request({
      url: '/cim/elder-contract/query/by-id',
      method: 'get',
      params: query
  })
}