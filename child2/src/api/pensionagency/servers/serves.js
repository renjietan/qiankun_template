/** 
 * @description:服务模块相关接口 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 14:55:48
 * @后台人员:  
*/
import request from "@/utils/request";
/* -----------------------------------------------------------------------班次管理---------------------------------------------------------------------*/
/** 
 * @description:查询全部班次并分页 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 14:56:21
 * @后台人员:  
*/
export function all_shift_type(query) {
  return request({
    url: "/asm/shift-type/query/all-shift-type",
    method: "get",
    params: query
  });
}
/** 
 * @description:查询全部班次信息（选择负责长者用） 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 14:57:12
 * @后台人员:  
*/
export function get_all_types(query) {
  return request({
    url: "/asm/shift-type/query/all",
    method: "get",
    params: query
  });
}
/** 
 * @description:根据id查询班次信息（选择负责长者用） 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 14:58:42
 * @后台人员:  
*/
export function get_types_byId(query) {
  return request({
    url: "/asm/shift-type/query/one",
    method: "get",
    params: query
  });
}
/** 
 * @description:新增班次关联长者 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-15 16:37:07
 * @后台人员:  
*/
export function add_elders(query) {
  return request({
    url: "/asm/shift-type/add/elders",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:添加班次
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 14:59:43
 * @后台人员:  
*/
export function add_shift_type(query) {
  return request({
    url: "/asm/shift-type/add/one",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:根据id删除班次 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 15:00:47
 * @后台人员:  
*/
export function del_shift_type(query) {
  return request({
    url: "/asm/shift-type/delete/one",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:根据id修改班次
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-13 17:33:24
 * @后台人员:  
*/
export function update_shift_type(query) {
  return request({
    url: "/asm/shift-type/update/id ",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:批量删除长者 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-14 17:18:03
 * @后台人员:  
*/
export function del_shift_elders(query) {
  return request({
    url: "/asm/shift-elder/delete/all",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:根据床位相关条件查询在住长者基本信息 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-15 14:16:48
 * @后台人员:  
*/
export function get_all_elders(query) {
  return request({
    url: "/base-manager/bed-elder/query/by-bed-config",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/* -----------------------------------------------------------------------排班管理---------------------------------------------------------------------*/
/** 
 * @description:根据排班周一日期查询这周全部排班 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-14 20:30:30
 * @后台人员:  
*/
export function get_schedule_list(query) {
  return request({
    url: "/asm/work-schedule/query/all",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:批量修改或新增排班 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-14 20:31:44
 * @后台人员:  
*/
export function update_schedule(query) {
  return request({
    url: "/asm/work-schedule/update/all",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/* -----------------------------------------------------------------------交接班管理---------------------------------------------------------------------*/
/** 
 * @description:查询所有交接班记录(传入id查询单个) 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-22 11:44:46
 * @后台人员:  
*/
export function get_shift_records(query) {
  return request({
    url: "/asm/shift-records/query/all",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/** 
 * @description:批量查询重要事项 
 * @fileName: serves.js 
 * @author: 姜纬杰 
 * @date: 2021-09-22 17:35:19
 * @后台人员:  
*/
export function important_matter_list(query) {
  return request({
    url: `/asm/important-matter/query/ids`,
    method: "get",
    params: query
  });
}

/**
 * @functionName get_project_all
 * @description 获取所有需要记录的服务项目
 * @author 谭人杰
 * @date 2021-10-03 10:59:51
*/
export function get_project_all(query) {
  return request({
    url: `/tkm/v1/service/query/is_need_record`,
    method: "get",
    params: query
  });
}

// 
/**
 * @functionName 查询助浴记录表
 * @description 获取服务项目记录表
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function get_project_bath_record(query) {
  return request({
    url: `/tkm/elder-service-plan/query/bath-record`,
    method: "post",
    data: query
  });
}

/**
 * @functionName jsfn
 * @description 获取服务项目记录表
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function get_project_record(query) {
  return request({
    url: `/tkm/elder-service-plan/page/common-record`,
    method: "post",
    data: query
  });
}

 
/**
 * @functionName get_project_child_list
 * @description 获取服务项目中包含的配置
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function get_project_child_list(query) {
  return request({
    url: `/tkm/v1/service/batch/query/project`,
    method: "get",
    // headers: {
    //   "Content-Type": "application/json;"
    // },
    params: query
  });
}

/**
 * @functionName get_project_rollover_record
 * @description 获取翻身记录
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function get_project_rollover_record(query) {
  return request({
    url: `/tkm/elder-service-plan/query/turn-over/record`,
    method: "post",
    data: query
  });
}


/**
 * @functionName get_project_rollover_record
 * @description 获取翻身记录
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function get_project_record_by_elderId(query) {
  return request({
    url: `/tkm/elder-service-plan/query/elder-project-record`,
    method: "get",
    params: query
  });
}

/**
 * @functionName set_bath_plan
 * @description 设置沐浴计划
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function set_bath_plan(query) {
  return request({
    url: `/tkm/elder-service-plan/bath/add`,
    method: "post",
    data: query
  });
}


/**
 * @functionName set_bath_plan
 * @description 设置沐浴计划
 * @author 谭人杰
 * @date 2021-10-04 15:44:17
*/
export function get_service_data_list(query) {
  return request({
    url: `/tkm/elder-service-plan/query/service-record`,
    method: "post",
    data: query
  });
}



