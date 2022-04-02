import request from '@/utils/request'
import background_address from '@/api/CCRC/config'

/** 
 * @description:签约 
 * @fileName: sign.js 
 * @author: 姜纬杰 
 * @date: 2021-11-30 17:12:59
 * @后台人员:  
*/
export function house_signin(id,query) {
  return request({
      url:`/market-sale/houses/${id}/_signing`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:解约 
 * @fileName: sign.js 
 * @author: 姜纬杰 
 * @date: 2021-11-30 17:14:43
 * @后台人员:  
*/
export function house_resign(id,query) {
  return request({
      url:`/market-sale/houses/${id}/_resign`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:预留 
 * @fileName: sign.js 
 * @author: 姜纬杰 
 * @date: 2021-11-30 17:14:43
 * @后台人员:  
*/
export function house_reserving(id,query) {
  return request({
      url:`/market-sale/houses/${id}/_reserving`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}
/** 
 * @description:预定 
 * @fileName: sign.js 
 * @author: 姜纬杰 
 * @date: 2021-11-30 17:14:43
 * @后台人员:  
*/
export function house_booking(id,query) {
  return request({
      url:`/market-sale/houses/${id}/_booking`,
      method: 'patch',
      headers: {
        "Content-Type": "application/json;"
    },
      data: query
  })
}