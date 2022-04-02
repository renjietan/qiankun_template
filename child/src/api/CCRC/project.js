import request from '@/utils/request'
import background_address from '@/api/CCRC/config'

/** 
 * @description:CCRC项目列表获取 
 * @fileName: login.js 
 * @author: 姜纬杰 
 * @date: 2021-11-11 17:23:33
 * @后台人员:  
 */

export function get_project(query) {

  return request({
    url: `/market-sale/projects`,
    method: 'get',
    params: query
  })
}
/** 
 * @description:新建项目
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-11-19 10:24:45
 * @后台人员:  
 */
export function add_project(query) {

  return request({
    url: `/market-sale/projects`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:新建分区 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-11-19 10:26:13
 * @后台人员:  
 */
export function add_projec_districtst(id, query) {

  return request({
    url: `/market-sale/projects/${id}/districts`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:编辑分区 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-11-19 10:26:13
 * @后台人员:  
 */
export function modify_projec_districtst(id, query) {

  return request({
    url: `/market-sale/projects/${id}/districts`,
    method: 'patch',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:新增楼栋 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-11-19 10:28:10
 * @后台人员:  
 */
export function add_projec_districtst_buildings(id, query) {

  return request({
    url: `/market-sale/projects/${id}/buildings`,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:更新项目名称 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-11-23 20:39:17
 * @后台人员:  
*/
export function modify_project(id,query) {

  return request({
    url: `/market-sale/projects/${id}`,
    method: 'patch',
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  })
}
/** 
 * @description:查询单元数 楼层数 住户数 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-02 19:55:16
 * @后台人员:  
*/
export function get_house_num(query) {
  return request({
    url: `/market-sale/projects/query/projectNum`,
    method: 'get',
    params: query
  })
}
/** 
 * @description:选择框下的分区列表
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-06 15:53:43
 * @后台人员:  
*/
export function get_project_list(query) {
  return request({
    url: `/market-sale/projects/_simple`,
    method: 'get',
    params: query
  })
}
/** 
 * @description:选择框下的分区列表
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-06 15:53:43
 * @后台人员:  
*/
export function get_districts_list(id) {
  return request({
    url: `/market-sale/projects/${id}/districts/buildings`,
    method: 'get',
  })
}
/** 
 * @description:删除项目 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 09:22:28
 * @后台人员:  
*/
export function delete_projec(id) {

  return request({
    url: `/market-sale/projects/${id}`,
    method: 'delete',
  })
}
/** 
 * @description:删除楼栋 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 09:24:34
 * @后台人员:  
*/
export function delete_buildings(id,buildingNum) {

  return request({
    url: `/market-sale/projects/${id}/buildings/${buildingNum}`,
    method: 'delete',
  })
}
/** 
 * @description:删除分区 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 09:26:16
 * @后台人员:  
*/
export function delete_districts(id,districtsName) {

  return request({
    url: `/market-sale/projects/${id}/districts/${districtsName}`,
    method: 'delete',
  })
}
/** 
 * @description:项目之下，所有楼栋 
 * @fileName: project.js 
 * @author: 姜纬杰 
 * @date: 2021-12-10 11:34:13
 * @后台人员:  
*/
export function get_all_buildings(id) {
  return request({
    url: `/market-sale/projects/${id}/buildings`,
    method: 'get',
  })
}