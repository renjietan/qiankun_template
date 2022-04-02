/** 
 * @description:来访记录 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:28:38
 * @后台人员:  
*/
import request from "@/utils/request";
/** 
 * @description:获取来访记录分页 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:17:47
 * @后台人员:  
*/
export function get_record_page(query) {
  return request({
    url: "/mar/marketing-visit-record/page",
    method: "get",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}
/** 
 * @description:来访登记 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 16:51:39
 * @后台人员:  
*/
export function add_visit_registration(query) {
  return request({
    url: "/mar/marketing-visit-record/insert",
    method: "post",
    data: query
  });
}
/** 
 * @description:修改登记信息 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 16:53:55
 * @后台人员:  
*/
export function modify_visit_registration(query) {
  return request({
    url: "/mar/marketing-visit-record/update-id",
    method: "post",
    data: query
  });
}
/** 
 * @description:删除登记记录 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 16:55:03
 * @后台人员:  
*/
export function del_visit_registration(query) {
  return request({
    url: "/mar/marketing-visit-record/delete-id",
    method: "post",
    params: query
  });
}
/** 
 * @description:根据Id查详情 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 16:55:45
 * @后台人员:  
*/
export function detail_visit_registration(query) {
  return request({
    url: "/mar/marketing-visit-record/id",
    method: "get",
    params: query
  });
}
/** 
 * @description:来访类别 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 16:59:59
 * @后台人员:  
*/
export function get_come_type(query) {
  return request({
    url: "/mar/marketing-visit-record/getVisitType",
    method: "get",
    params: query
  });
}
/** 
 * @description:来访意图 
 * @fileName: visitRecord.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 17:01:29
 * @后台人员:  
*/
export function get_visiting_intention(query) {
  return request({
    url: "/mar/marketing-visit-record/getVisitIntention",
    method: "get",
    params: query
  });
}