/** 
 * @description:意向客户 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:31:26
 * @后台人员:  
*/
import request from "@/utils/request";
/** 
 * @description:获取意向客户分页 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:31:48
 * @后台人员:  
*/
export function get_all_customer(query) {
  return request({
    url: "/mar/marketing-intention/page",
    method: "get",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}
/** 
 * @description:客户详情 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-03 15:22:12
 * @后台人员:  
*/
export function detail_customer(query) {
  return request({
    url: "/mar/marketing-intention/id",
    method: "get",
    params: query
  });
}
/** 
 * @description:添加意向客户 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-03 15:46:59
 * @后台人员:  
*/
export function add_customer(query) {
  return request({
    url: "/mar/marketing-intention/insert",
    method: "post",
    data: query
  });
}
/** 
 * @description:修改意向客户 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-03 15:48:25
 * @后台人员:  
*/
export function modify_customer(query) {
  return request({
    url: "/mar/marketing-intention/update-id",
    method: "post",
    data: query
  });
}
/** 
 * @description:删除意向客户 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-03 15:49:09
 * @后台人员:  
*/
export function delete_customer(query) {
  return request({
    url: "/mar/marketing-intention/delete-id",
    method: "post",
    params: query
  });
}
/** 
 * @description:查询与长者关系 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 09:43:03
 * @后台人员:  
*/
export function get_RelationshipEnum(query) {
  return request({
    url: "/mar/marketing-intention/RelationshipEnum",
    method: "get",
    params: query
  });
}
/** 
 * @description:获取销售列表 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 09:58:38
 * @后台人员:  
*/
export function get_salesmen(query) {
  return request({
    url: "/asm/employee-info/query/centerId",
    method: "get",
    params: query
  });
}
/** 
 * @description:获取跟进状态列表 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 09:58:38
 * @后台人员:  
*/
export function get_status_list(query) {
  return request({
    url: "/mar/marketing-follow-up/follow-status",
    method: "get",
    params: query
  });
}
/** 
 * @description:删除跟进状态 
 * @fileName: intendedCustomer.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 16:26:29
 * @后台人员:  
*/
export function del_follow_status(query) {
  return request({
    url: "/mar/marketing-follow-up/delete-id",
    method: "post",
    params: query
  });
}