/** 
 * @description:行政管理相关接口 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-22 09:40:29
 * @后台人员:岳喜多  
*/
import request from '@/utils/request'
// ---------------------------------------------------------------------------智能架构-------------------------------------------------------------------------
/** 
 * @description:部门列表 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-22 10:23:56
 * @后台人员:  
*/
export function get_all_department(query) {
  
  return request({
      url: '/asm/department-info/query/all',
      method: 'get',
      params: query
  })
}
/** 
 * @description:新增部门 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-22 09:41:06
 * @后台人员:  
*/
export function add_department(query) {
  return request({
      url: '/asm/department-info/add',
      method: 'post',
      data: query
  })
}
/** 
 * @description:修改删除部门信息 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-22 10:10:25
 * @后台人员:  
*/
export function modify_del_department(query) {
  return request({
      url: '/asm/department-info/modify',
      method: 'post',
      data: query
  })
}
/** 
 * @description:根据部门Id查询当前部门下所有职位 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-23 10:38:48
 * @后台人员:  
*/
export function get_position(query) {
  return request({
      url: '/asm/position-info/query/by-department',
      method: 'get',
      params: query
  })
}
/** 
 * @description:新增职位 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-22 16:40:12
 * @后台人员:  
*/
export function add_position(query) {
  return request({
      url: '/asm/position-info/add',
      method: 'post',
      data: query
  })
}
/** 
 * @description:修改删除职位 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-22 20:01:17
 * @后台人员:  
*/
export function modify_del_position(query) {
  return request({
      url: '/asm/position-info/modify',
      method: 'post',
      data: query
  })
}
/** 
 * @description:智能架构图 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-26 11:34:38
 * @后台人员:  
*/
export function get_organize(query) {
  return request({
      url: '/asm/service-center-info/query/organize',
      method: 'get',
      params: query
  })
}
// -------------------------------------------------------------------------新增员工---------------------------------------------------------------------------------------------------
/** 
 * @description:员工信息分页查询 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-28 11:57:13
 * @后台人员:  
*/
export function get_employees_info(data,query) {
  
  return request({
      url: '/asm/employee-info/query/batch/by-page',
      method: 'post',
      headers: {
        "Content-Type": "application/json;"
    },
      data: data,
      params:query
  })
}
/** 
 * @description:新增员工 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-23 15:24:56
 * @后台人员:  
*/
export function add_employee(query) {
  return request({
      url: '/asm/employee-info/add',
      method: 'post',
      headers: {
        "Content-Type": 'application/json;'
    },
      data: query
  })
}
/** 
 * @description:文件上传 
 * @fileName: administrative.js 
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
 * @description:员工信息管理 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-29 11:11:02
 * @后台人员:  
*/
export function modify_manager(query) {
  return request({
      url: '/asm/employee-info/manager',
      method: 'post',
      headers: {
        "Content-Type": 'application/json;'
    },
      data: query
  })
}
/** 
 * @description:修改就职状态 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-29 14:39:40
 * @后台人员:  
*/
export function modify_join_type(query) {
  return request({
      url: '/asm/employee-info/modify/join-type',
      method: 'post',
      params: query
  })
}
/** 
 * @description:删除员工 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-29 14:34:15
 * @后台人员:  
*/
export function del_manager(query) {
  return request({
      url: '/asm/employee-info/delete',
      method: 'post',
      params: query
  })
}
/** 
 * @description:员工信息查询 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-29 11:12:35
 * @后台人员:  
*/
export function get_employee_info(query) {
  return request({
      url: '/asm/employee-info/query/by-id',
      method: 'get',
      params: query
  })
}
/** 
 * @description:就职状态类型查询 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-26 19:54:50
 * @后台人员:  
*/
export function join_type_list(query) {
  return request({
      url: '/asm/employee-info/query/join-type',
      method: 'get',
      params: query
  })
}
/** 
 * @description:用工形式查询 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-26 19:56:15
 * @后台人员:  
*/
export function take_type_list(query) {
  return request({
      url: '/asm/employee-info/query/take-type',
      method: 'get',
      params: query
  })
}
/** 
 * @description:证件类型查询 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-07-27 19:45:06
 * @后台人员:  
*/
export function id_type_list(query) {
  return request({
      url: '/asm/employee-info/query/id-type',
      method: 'get',
      params: query
  })
}

/**
 * @functionName like_by_name
 * @param {String} empNm
 * @description 根据员工姓名模糊查询信息
 * @author 王文涛
 * @date 2021-08-09 11:22:35
 * @后台人员: 岳喜多
*/
export function like_by_name(query) {
  return request({
      url: '/asm/employee-info/query/like-by-name',
      method: 'get',
      params: query
  })
}
// -------------------------------------------------------------------------区域管理---------------------------------------------------------------------------------------------------
/** 
 * @description:新增单个区域 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-09-15 10:39:57
 * @后台人员:  
*/
export function add_area(query) {
  return request({
    url: "/asm/area/add/one",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:查询全部区域 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-09-15 11:16:17
 * @后台人员:  
*/
export function get_all_area(query) {
  return request({
      url: '/asm/area/query/all',
      method: 'post',
      data: query
  })
}
/** 
 * @description:根据id删除单个区域 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-09-15 10:41:46
 * @后台人员:  
*/
export function del_area(query) {
  return request({
    url: "/asm/area/delete/one",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    params: query
  });
}
/** 
 * @description:修改单个区域 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-09-15 10:43:41
 * @后台人员:  
*/
export function modify_area(query) {
  return request({
    url: "/asm/area/update/one",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:查询所有区域不分页 
 * @fileName: administrative.js 
 * @author: 姜纬杰 
 * @date: 2021-09-16 11:20:16
 * @后台人员:  
*/
export function get_all_areas(query) {
  return request({
      url: '/asm/area/query/all-area',
      method: 'get',
      params: query
  })
}