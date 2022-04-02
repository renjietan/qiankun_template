/** 
 * @description:菜品管理 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 14:40:15
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description:获取菜品管理列表页 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 14:40:46
 * @后台人员:  
*/
export function get_Dishes_list(query){
  return request({
      url:'/dtm/variety-dishes-management/query/variety-dishes-management',
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'post'
  })
}

/** 
 * @description:条件查询所有菜品 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 14:40:46
 * @后台人员:  
*/
export function get_foodsList_By(query){
  return request({
      url:'/dtm/variety-dishes-management/query/variety',
      data: query,
      method:'post'
  })
}
/** 
 * @description:根据id删除菜品 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 15:34:58
 * @后台人员:  
*/
export function del_Dishes(query){
  return request({
      url:'/dtm/variety-dishes-management/delete/varietydishes-id',
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'post'
  })
}
/** 
 * @description:新增菜品 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 15:36:30
 * @后台人员:  
*/
export function add_Dishes(query){
  return request({
      url:'/dtm/variety-dishes-management/insert/variety-dishes-management',
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'post'
  })
}
/** 
 * @description:菜品类别查询 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 17:57:21
 * @后台人员:  
*/
export function get_category(query){
  return request({
      url:'/dtm/food-category',
      params:query,
      method:'get'
  })
} 
/** 
 * @description:根据菜品Id修改菜品 
 * @fileName: food_mg.js 
 * @author: 姜纬杰 
 * @date: 2021-09-02 17:58:16
 * @后台人员:  
*/
export function modify_dishes(query){
  return request({
      url:'/dtm/variety-dishes-management/update/variety-dishes-management-id',
      headers:{
          "Content-Type": "application/json;"
      },
      data:query,
      method:'post'
  })
}

/**
 * @functionName get_foodsMenu_byType
 * @description 根据菜谱类型，查询菜谱
 * @author 谭人杰
 * @date 2021-10-02 17:02:09
*/
export function get_foodsMenu_byType(query){
  return request({
      url:'/dtm/cook-book/query/variety-dishes/by-type',
      params:query,
      method:'get'
  })
}

/**
 * @functionName get_foodsMenuType
 * @description 根据菜谱类型，查询菜谱
 * @author 谭人杰
 * @date 2021-10-02 17:02:09
*/
export function get_foodsMenuType(query){
  return request({
      url:'/dtm/cook-book/query/dishes-type',
      params:query,
      method:'get'
  })
}


/**
 * @functionName get_foodsMenu_total
 * @description 单日套餐菜品统计
 * @author 谭人杰
 * @date 2021-10-02 17:02:09
*/
export function get_foodsMenu_total(query){
  return request({
      url:'/dtm/elder-dishes-record/query/variety-static',
      params:query,
      method:'get'
  })
}


/**
 * @functionName get_dining_record
 * @description 获取用餐记录
 * @author 谭人杰
 * @date 2021-10-02 17:02:09
*/
export function get_dining_record(query){
  return request({
      url:'/dtm/elder-dishes-record/query/dishes',
      data:query,
      method:'post'
  })
} 

/**
 * @functionName get_dining_record
 * @description 获取用餐记录
 * @author 谭人杰
 * @date 2021-10-02 17:02:09
*/
export function get_specialFoods_total(query){
  return request({
      url:'/cim/elder-special-diet/static/no-special-main-food',
      params: query,
      method:'get'
  })
} 


