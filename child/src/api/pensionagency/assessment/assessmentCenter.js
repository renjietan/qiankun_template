/** 
 * @description:评估中心 
 * @fileName: assessmentCenter.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:53:06
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description:评估中心列表 
 * @fileName: assessmentCenter.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:53:43
 * @后台人员:  
*/
export function get_all_record(query) {
  return request({
    url: "/cim/check-in-process/query/by-page",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}