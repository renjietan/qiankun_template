import request from '@/utils/request'
import background_address from '@/api/CCRC/config'
/** 
 * @description:获取来源列表---分页
 * @fileName: source.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 10:58:10
 * @后台人员:  
*/
export function get_source_page(query) {
  return request({
      url: `/market-sale/source/page`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:获取来源列表 
 * @fileName: source.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 11:28:38
 * @后台人员:  
*/
export function get_source_list(query) {
  return request({
      url: `/market-sale/source`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:新增来源 
 * @fileName: source.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 10:59:17
 * @后台人员:  
*/
export function add_source(query) {
  return request({
      url:`/market-sale/source`,
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:删除来源 
 * @fileName: source.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 11:00:36
 * @后台人员:  
*/
export function del_source(query) {
  return request({
      url: `/market-sale/source/`,
      method: 'delete',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:修改来源 
 * @fileName: source.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 11:01:51
 * @后台人员:  
*/
export function modify_source(query) {
  return request({
      url: `/market-sale/source/`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}