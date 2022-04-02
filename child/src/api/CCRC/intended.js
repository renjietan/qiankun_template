import request from '@/utils/request'
import background_address from '@/api/CCRC/config'

/** 
 * @description:获取意向客户列表 
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-11-12 14:18:55
 * @后台人员:  
*/
export function get_clients_list(query) {
  return request({
      url: `/market-sale/potential-clients`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:添加意向客户 
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-11-12 14:32:04
 * @后台人员:  
*/
export function add_clients(query) {
  return request({
      url: `/market-sale/potential-clients`,
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:删除意向客户
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-11-12 14:32:59
 * @后台人员:  
*/
export function del_clients(id) {
  return request({
      url:`/market-sale/potential-clients/${id}`,
    
      method: 'delete',

  })
}
/** 
 * @description:修改意向客户
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-11-12 14:32:59
 * @后台人员:  
*/
export function modify_clients(id,query) {
  return request({
      url:`/market-sale/potential-clients/${id}`,
      method: 'patch',
      data:query
  })
}
/** 
 * @description:获取来源列表 
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 10:31:16
 * @后台人员:  
*/
export function get_source_list() {
  return request({
      url: `/market-sale/potential-clients/sources`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    }
  })
}
/** 
 * @description:获取单个意向客户信息 
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 14:58:43
 * @后台人员:  
*/
export function get_one_clients(id) {
  return request({
      url:`/market-sale/potential-clients/${id}`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    }
  })
}
/** 
 * @description:根据手机号码查询意向客户 
 * @fileName: intended.js 
 * @author: 姜纬杰 
 * @date: 2021-12-11 16:44:06
 * @后台人员:  
*/
export function get_clients_byphone(query) {
  return request({
      url:`/market-sale/potential-clients/id-phone`,
      method: 'get',
      params:query
  })
}
