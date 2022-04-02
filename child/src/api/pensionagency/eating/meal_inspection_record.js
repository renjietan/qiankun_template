/** 
 * @description:验餐记录 
 * @fileName: meal_inspection_record.js 
 * @author: 姜纬杰 
 * @date: 2021-09-06 17:40:25
 * @后台人员:  
*/
import request from '@/utils/request'
/** 
 * @description:根据日期查询当日 早中下晚 餐检记录 
 * @fileName: meal_inspection_record.js 
 * @author: 姜纬杰 
 * @date: 2021-09-06 17:40:47
 * @后台人员:  
*/
export function inspction_foodrecord(query) {
  return request({
    url: '/dtm/inspection-food-record/query/one',
    params: query,
    method: 'get'
  })
}
/**
 * @functionName delete_eating_record
 * @description 删除验餐记录
 * @author 谭人杰
 * @date 2021-10-13 17:26:07
*/
export function delete_eating_record(query) {
  return request({
    url: '/dtm/inspection-food-record/delete/id',
    data: query,
    method: 'post'
  })
}

/**
 * @functionName delete_eating_record
 * @description 删除验餐记录
 * @author 谭人杰
 * @date 2021-10-13 17:26:07
*/
export function set_eating_record(query) {
  return request({
    url: '/dtm/inspection-food-record/update/id',
    data: query,
    method: 'post'
  })
}