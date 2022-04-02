import request from '@/utils/request'
/** 
 * @description:CCRC登录接口 
 * @fileName: login.js 
 * @author: 姜纬杰 
 * @date: 2021-11-11 17:23:33
 * @后台人员:  
*/
export function login_CCRC(query) {
  return request({
      url: '/login',
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      params: query
  })
}