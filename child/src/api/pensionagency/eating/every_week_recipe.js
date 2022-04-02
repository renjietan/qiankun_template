/** 
 * @description:每周食谱 
 * @fileName: every_week_recipe.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 19:53:46
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description:查询本周食谱 
 * @fileName: every_week_recipe.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 19:54:12
 * @后台人员:  
*/
export function get_this_week_recipe(query){
  return request({
      url:'/dtm/cook-book/query/this-week-recipe',
      params:query,
      method:'get'
  })
} 
/** 
 * @description:根据日期查询食谱 
 * @fileName: every_week_recipe.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 19:55:14
 * @后台人员:  
*/

export function query_recipe(query){
  return request({
      url:'/dtm/cook-book/query/all-recipe-by-date',
      data:query,
      method:'post'
  })
}
/** 
 * @description:新增或者修改食谱 
 * @fileName: every_week_recipe.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 19:56:20
 * @后台人员:  
*/
export function add_cook_book(query){
  return request({
      url:'/dtm/cook-book/add/cook-book',
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'post'
  })
}