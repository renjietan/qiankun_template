/** 
 * @description:菜品类别管理 
 * @fileName: foods_type_mg.js 
 * @author: 姜纬杰 
 * @date: 2022-02-21 16:48:56
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description:获取菜品类别管理列表页 
 * @fileName: foods_type_mg.js 
 * @author: 姜纬杰 
 * @date: 2022-02-21 16:54:14
 * @后台人员:  
*/
export function get_Dishes_type_list(query){
  return request({
      url:'/dtm/food-category/page',
      headers:{
          "Content-Type": "application/json;"
      },
      params:query,
      method:'get'
  })
}

/** 
 * @description:根据id删除菜品类别 
 * @fileName: foods_type_mg.js 
 * @author: 姜纬杰 
 * @date: 2022-02-21 16:50:59
 * @后台人员:  
*/
export function del_Dishes_type(id){
  return request({
      url:`/dtm/food-category/${id}`,
      headers:{
          "Content-Type": "application/json;"
      },
      method:'delete'
  })
}
/** 
 * @description:新增菜品类别 
 * @fileName: foods_type_mg.js 
 * @author: 姜纬杰 
 * @date: 2022-02-21 16:53:31
 * @后台人员:  
*/
export function add_Dishes_type(query){
  return request({
      url:'/dtm/food-category/insert',
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'post'
  })
}
/** 
 * @description:根据菜品类别Id修改菜品 
 * @fileName: foods_type_mg.js 
 * @author: 姜纬杰 
 * @date: 2022-02-21 16:52:56
 * @后台人员:  
*/
export function modify_dishes_type(id,query){
  return request({
      url:`/dtm/food-category/${id}`,
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'patch'
  })
}


