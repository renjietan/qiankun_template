 import request from '@/utils/request'

/** 
 * @description:文件上传 
 * @fileName: upLoadFile.js 
 * @author: 姜纬杰 
 * @date: 2021-08-10 13:46:44
 * @后台人员:  
*/
export function upload_pic(query) {
  return request({
      url: '/base-manager/base-common/file/upload',
      method: 'post',
      headers: {
        "Content-Type": 'multipart/form-data'
    },
      data: query
  })
}
/** 
 * @description:用于多文件上传，返回id.拼接id用 
 * @fileName: upLoadFile.js 
 * @author: 姜纬杰 
 * @date: 2021-08-10 13:46:44
 * @后台人员:  
*/
export function upload_pics(query) {
  
  return request({
      url: '/base-manager/base-common/upload/files',
      method: 'post',
      headers: {
        "Content-Type": 'multipart/form-data'
    },
      data: query
  })
}