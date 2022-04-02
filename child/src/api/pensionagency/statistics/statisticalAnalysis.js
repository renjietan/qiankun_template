/** 
 * @description:统计分析 
 * @fileName: statisticalAnalysis.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:55:00
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description: 
 * @fileName: statisticalAnalysis.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:55:19
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