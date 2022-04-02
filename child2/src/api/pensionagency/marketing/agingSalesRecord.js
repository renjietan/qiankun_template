/** 
 * @description:适老化销售记录 
 * @fileName: agingSalesRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:16:59
 * @后台人员:  
*/
import request from "@/utils/request";
/** 
 * @description:获取适老化销售记录分页 
 * @fileName: agingSalesRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:17:47
 * @后台人员:  
*/
export function get_sale_record(query) {
  return request({
    url: "/mar/marketing-sale-record/page",
    method: "get",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}
/** 
 * @description:新增适老化销售记 
 * @fileName: agingSalesRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-07 09:17:36
 * @后台人员:  
*/
export function add_sale_record(query) {
  return request({
    url: "/mar/marketing-sale-record/insert",
    method: "post",
    data: query
  });
}
/** 
 * @description:删除适老化销售记  
 * @fileName: agingSalesRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-07 09:18:45
 * @后台人员:  
*/
export function del_sale_record(query) {
  return request({
    url: "/mar/marketing-sale-record/id",
    method: "post",
    data: query
  });
}
/** 
 * @description:修改适老化销售记 
 * @fileName: agingSalesRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-07 09:19:54
 * @后台人员:  
*/
export function modify_sale_record(query) {
  return request({
    url: "/mar/marketing-sale-record/update-id",
    method: "post",
    data: query
  });
}
/** 
 * @description:根据Id查详情 
 * @fileName: agingSalesRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-07 20:49:50
 * @后台人员:  
*/
export function detail_sale_record(query) {
  return request({
    url: "/mar/marketing-sale-record/id",
    method: "get",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}