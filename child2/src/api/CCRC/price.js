import request from '@/utils/request'
import background_address from '@/api/CCRC/config'

/** 
 * @description:定价/调价列表 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 11:47:48
 * @后台人员:  
*/
export function get_price_list(query) {
  return request({
      url: `/market-sale/price`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:新增价格方法 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 13:52:01
 * @后台人员:  
*/
export function add_price_programme(query) {
  return request({
      url:`/market-sale/price`,
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:价格方案详情 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 13:53:43
 * @后台人员:  
*/
export function price_programme_detail(id) {
  return request({
      url: `/market-sale/price/${id}`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
  })
}
/** 
 * @description:编辑价格方案 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 14:13:50
 * @后台人员:  
*/
export function edit_price_programme(id,query) {
  return request({
      url: `/market-sale/price/${id}`,
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description: 获取价格状态
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-12-07 23:53:08
 * @后台人员:  
*/
export function get_price_status() {
  return request({
      url: `/market-sale/price/query/price-status`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
  })
}
/** 
 * @description:获取价格方案列表 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 17:04:32
 * @后台人员:  
*/
export function get_price_lists() {
  return request({
      url: `/market-sale/price/on-price`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
  })
}
/** 
 * @description:楼栋统一定价 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 17:23:04
 * @后台人员:  
*/
export function binding_building_price(query) {
  return request({
      url: `/market-sale/houses/_bulk/_pricing`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:价格方案下房源 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-12-13 11:56:03
 * @后台人员:  
*/
export function house_price_inquiry(query) {
  return request({
      url: `/market-sale/houses/_price`,
      method: 'get',
      params:query
  })
}
/** 
 * @description:禁用 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-12-27 17:13:58
 * @后台人员:  
*/
export function forbidden_price(entity,id,query) {
  return request({
      url: `/market-sale/price/${entity}/${id}`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
    params:query
  })
}