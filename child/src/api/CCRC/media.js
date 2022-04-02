import request from '@/utils/request'
import background_address from '@/api/CCRC/config'
/** 
 * @description:获取媒体列表---分页
 * @fileName: media.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 10:58:10
 * @后台人员:  
*/
export function get_media_page(query) {
  return request({
      url: `/market-sale/media/page`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:获取媒体列表 
 * @fileName: media.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 11:28:38
 * @后台人员:  
*/
export function get_media_list(query) {
  return request({
      url: `/market-sale/media`,
      method: 'get',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}
/** 
 * @description:新增媒体 
 * @fileName: media.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 10:59:17
 * @后台人员:  
*/
export function add_media(query) {
  return request({
      url:`/market-sale/media`,
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:删除媒体 
 * @fileName: media.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 11:00:36
 * @后台人员:  
*/
export function del_media(id,query) {
  return request({
      url: `/market-sale/media/${id}`,
      method: 'delete',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:修改媒体 
 * @fileName: media.js 
 * @author: 姜纬杰 
 * @date: 2021-11-18 11:01:51
 * @后台人员:  
*/
export function modify_media(id,query) {
  return request({
      url: `/market-sale/media/${id}`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}