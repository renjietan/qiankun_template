import request from '@/utils/request'
import background_address from '@/api/CCRC/config'

/** 
 * @description:获取房间列表 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-11-17 14:35:44
 * @后台人员:  
*/
export function get_houses_list(query) {
  return request({
      url: `/market-sale/houses`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:获取房间详情 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-11-17 14:55:11
 * @后台人员:  
*/
export function get_houses_detail(id) {
  return request({
      url:`market-sale/houses/${id}`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
  })
}

/** 
 * @description:获取户型列表 
 * @fileName: housing.js 
 * @author: 王文涛 
 * @date: 2021-11-25 14:55:11
 * @后台人员:  
*/
export function get_houses_type() {
  return request({
      url:`market-sale/houses/types`,
      method: 'get'
  })
}
/** 
 * @description:新建户型 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-01 15:20:47
 * @后台人员:  
*/
export function add_houses_type(query) {
  return request({
      url:`market-sale/houses/types`,
      method: 'post',
      data:query
  })
}
/** 
 * @description:删除户型
 * @fileName: housing.js 
 * @author: 王文涛 
 * @date: 2021-11-25 14:55:11
 * @后台人员:  
*/
export function delete_houses_type(id) {
  return request({
      url:`market-sale/houses/types/${id}`,
      method: 'delete'
  })
}
/** 
 * @description:房间资料 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-02 10:32:43
 * @后台人员:  
*/
export function get_houses_general(query) {
  return request({
      url:`/market-sale/houses/_general`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
    params:query
  })
}
/** 
 * @description:面积调整列表 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-02 10:34:33
 * @后台人员:  
*/
export function get_houses_area(query) {
  return request({
      url:`/market-sale/houses/_area`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
    params:query
  })
}
/** 
 * @description:房源面积调整 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-02 10:35:31
 * @后台人员:  
*/
export function modify_houses_area(id,query) {
  return request({
      url:`market-sale/houses/${id}/_area`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
    data:query
  })
}
/** 
 * @description:批量修改面积 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-06 19:49:25
 * @后台人员:  
*/
export function modify_houses_areas(query) {
  return request({
      url:`market-sale/houses/area/all`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
    data:query
  })
}
/** 
 * @description:基于楼栋生成房源 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-07 15:43:01
 * @后台人员:  
*/
export function create_building_houses(projectId,buildingNum,query) {
  return request({
      url:`market-sale/houses/_bulk/projects/${projectId}/buildings/${buildingNum}`,
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
    data:query
  })
}
/** 
 * @description: 调整某栋楼的定价
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-07 23:39:31
 * @后台人员:  
*/
export function design_building_price(id,pricingId,query) {
  return request({
      url:`market-sale/houses/${id}/pricing/${pricingId}`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
    data:query
  })
}
/** 
 * @description:房源详情 
 * @fileName: housing.js 
 * @author: 姜纬杰 
 * @date: 2021-12-13 09:34:42
 * @后台人员:  
*/
export function get_house_detail(id,query) {
  return request({
      url:`market-sale/houses/${id}/_simple`,
      method: 'get',
    params:query
  })
}