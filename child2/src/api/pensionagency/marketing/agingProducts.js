/** 
 * @description:适老化产品 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:32:52
 * @后台人员:  
*/
import request from "@/utils/request";
/** 
 * @description:获取适老化产品分页 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-01 19:33:08
 * @后台人员:  
*/
export function get_all_product(query) {
  return request({
    url: "/mar/marketing-product/page",
    method: "get",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}
/** 
 * @description:添加产品 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 17:57:05
 * @后台人员:  
*/
export function add_product(query) {
  return request({
    url: "/mar/marketing-product/insert",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:修改产品 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 17:59:33
 * @后台人员:  
*/
export function modify_product(query) {
  return request({
    url: "/mar/marketing-product/update-id",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:删除产品 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 18:00:15
 * @后台人员:  
*/
export function del_product(query) {
  return request({
    url: "/mar/marketing-product/delete-id",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}
/** 
 * @description:产品详情 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-04 18:00:58
 * @后台人员:  
*/
export function detail_product(query) {
  return request({
    url: "/mar/marketing-product/id",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:产品类别列表 
 * @fileName: agingProducts.js 
 * @author: 姜纬杰 
 * @date: 2022-03-07 16:42:55
 * @后台人员:  
*/
export function get_category_list(query) {
  return request({
    url: "/mar/marketing-product/getProductType",
    method: "get",
    params: query
  });
}
