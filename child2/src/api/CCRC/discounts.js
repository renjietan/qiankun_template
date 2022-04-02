import request from '@/utils/request'
import background_address from '@/api/CCRC/config'

/** 
 * @description: 
 * @fileName: signIn.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 20:21:29
 * @后台人员:  
 */
// process.env.NODE_ENV === 'development'
export function get_discounts_list(query) {
  return request({
    url: `market-sale/discount`,
    // url: `/discounts`,
    method: 'get',
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  })
}
export function add_discounts(query) {

  return request({
    url: `market-sale/discount`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:编辑签约管理
 * @fileName: signIn.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 20:23:58
 * @后台人员:  
 */
export function modify_discounts(id, query) {
  return request({
    url: `market-sale/discount/${id}`,
    method: 'patch',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:删除折扣 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-11-15 20:43:22
 * @后台人员:  
 */
export function del_discounts(id) {
  return request({
    url: `market-sale/discount/${id}`,
    method: 'delete',
    headers: {
      "Content-Type": "application/json;"
    },
  })
}
/** 
 * @description:方案详情 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-11-16 17:10:02
 * @后台人员:  
 */
export function get_discounts_detail(id) {
  return request({
    url: `market-sale/discount/${id}`,
    method: 'get',
    headers: {
      "Content-Type": "application/json;"
    },
  })
}
/** 
 * @description:折扣管理表----新增 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-11-16 17:43:20
 * @后台人员:  
 */
export function add_discountPar(data, query) {
  return request({
    url: `/market-sale/discount-detail`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    },
    data: data,
    params: query
  })
}
/** 
 * @description:折扣管理表----编辑 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-11-16 17:44:49
 * @后台人员:  
 */
export function modify_discountPar(name, query) {
  return request({
    url: `market-sale/discount-detail/${name}`,
    method: 'patch',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:删除折扣类型 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-11-16 17:45:27
 * @后台人员:  
 */
export function del_discountPar(name, query) {
  return request({
    url: `/market-sale/discount-detail/${name}`,
    method: 'delete',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:获取折扣类型 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-11-16 20:03:20
 * @后台人员:  
 */
export function get_discount_type() {
  return request({
    url: `/market-sale/discount-detail/query/method`,
    method: 'get',
    headers: {
      "Content-Type": "application/json;"
    },
  })
}
/** 
 * @description:获取折扣方案下拉框 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-12-13 10:44:48
 * @后台人员:  
 */
export function get_discount_list() {
  return request({
    url: `/market-sale/discount/_simple`,
    method: 'get',
  })
}
/** 
 * @description:添加折扣 
 * @fileName: discounts.js 
 * @author: 姜纬杰 
 * @date: 2021-12-13 11:01:53
 * @后台人员:  
 */
export function add_discount(id, discountId, query) {
  return request({
    url: `market-sale/houses/${id}/discount/${discountId}`,
    method: 'patch',
    params: query
  })
}
/*
 * @description:楼栋统一折扣 
 * @fileName: price.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 17:23:04
 * @后台人员:  
 */
export function binding_building_discount(query) {
  return request({
    url: `/market-sale/houses/_bulk/discount`,
    method: 'patch',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
