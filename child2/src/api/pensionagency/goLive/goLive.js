/**
 * @description:入住管理相关接口
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-02 15:33:20
 * @后台人员:岳喜多
 */
import request from "@/utils/request";
/**
 * @description:入住列表分页
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-02 15:35:01
 * @后台人员:
 */
export function get_all_lives(query) {
  return request({
    url: "/cim/check-in-process/query/by-page",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
//  /**
//   * @description 入住申请-选择床位
//   * @param {string} bedName
//   * @param {number} elderId
//   * @param {number} step
//   * @author 王文涛
//   * @date 2021-08-16 16:24:38
//  */

export function update_bed_name(query) {
  return request({
    url: "/base-manager/bed-elder/add",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/**
 * @description 入住流程状态查询
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-12 17:27:16
 */
export function process_status(query) {
  return request({
    url: "/cim/check-in-process/query/process-status",
    method: "get",
    params: query
  });
}
/**
 * @description:提交基本信息
 * @fileName: add_base_info.js
 * @author: 王文涛
 * @date: 2021-08-06 10:03:08
 * @后台人员:岳喜多
 */
export function add_base_info(query) {
  return request({
    url: "/cim/elder-base-info/add",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/**
 * @description:目前生活状况
 * @fileName: goLive.js
 * @author: 王文涛
 * @date: 2021-08-06 10:07:37
 * @后台人员:
 */
export function add_live_lifeState(query) {
  return request({
    url: "/cim/elder-info-ex/add",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}
/**
 * @description:入住申请---兴趣爱好
 * @fileName: goLive.js
 * @author: 王文涛
 * @date: 2021-08-06 10:09:21
 * @后台人员:
 */
export function add_live_hobby(query) {
  return request({
    url: "/cim/elder-hobby/add",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}

/**
 * @functionName get_live_hobby
 * @description 入住申请---根据ID获取老人兴趣爱好信息
 * @author 谭人杰
 * @date 2021-08-14 20:58:20
 */
export function get_live_hobby(query) {
  return request({
    url: "/cim/elder-hobby/query",
    method: "get",
    params: query
  });
}

/**
 * @description:入住申请--添加联系人
 * @fileName: goLive.js
 * @author: 王文涛
 * @date: 2021-08-06 10:10:01
 * @后台人员:
 */
export function add_live_linkMan(query) {
  return request({
    url: "/cim/elder-contact-info/add",
    method: "post",
    data: query,
    headers: {
      "Content-Type": "application/json;"
    }
  });
}
/**
 * @functionName jsfn
 * @description 入住申请---获取联系人
 * @author 谭人杰
 * @date 2021-08-15 20:40:37
 */
export function get_live_linkMan(query) {
  return request({
    url: "/cim/elder-contact-info/query/contact",
    method: "get",
    params: query
  });
}

/**
 * @description:选择床位
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-06 10:10:54
 * @后台人员:
 */
export function get_live_selectBed(query) {
  return request({
    url:
      "http://rap2api.taobao.org/app/mock/288322/golive/list/apply/selectBed",
    method: "post",
    params: query
  });
}
/**
 * @description:入住体检-健康评估
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-06 17:08:36
 * @后台人员:
 */
export function get_live_healthEval(query) {
  return request({
    url:
      "http://rap2api.taobao.org/app/mock/288322/golive/list/examination/healthEval",
    method: "post",
    params: query
  });
}
/**
 * @description:入住能力评估-日常生活活动-获
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-06 17:10:53
 * @后台人员:
 */
export function get_live_actives_list(query) {
  return request({
    url:
      "http://rap2api.taobao.org/app/mock/288322/golive/list/ability_assess/actives/get",
    method: "get",
    params: query
  });
}
/**
 * @description:入住能力评估-日常生活-提交
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-06 17:12:19
 * @后台人员:
 */
export function get_live_actives_submit(query) {
  return request({
    url:
      "http://rap2api.taobao.org/app/mock/288322/golive/list/ability_assess/actives/submit",
    method: "post",
    params: query
  });
}

/**
 * @description:根据ID 查询入住申请-基本信息
 * @fileName: goLive.js
 * @author: 谭人杰
 * @date: 2021-08-06 17:12:19
 * @后台人员:
 */
export function get_older_baseinfo(query) {
  return request({
    url: "/cim/elder-base-info/query/by-id",
    method: "get",
    params: query
  });
}

/**
 * @description:入住申请-入住体检-新增
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-16 14:53:19
 * @后台人员:
 */
export function add_live_health(query) {
  return request({
    url: "/cim/elder-health-info/manager",
    method: "post",
    data: query,
    headers: {
      "Content-Type": "application/json;"
    }
  });
}
/**
 * @description:入住申请-入住体检-详情
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-16 16:37:00
 * @后台人员:
 */
export function get_older_healthinfo(query) {
  return request({
    url: "/cim/elder-health-info/query",
    method: "get",
    params: query
  });
}
/**
 * @description:查询能力评估配置
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-17 13:51:17
 * @后台人员:
 */
export function get_ability_assess_config(query) {
  return request({
    url: "/cim/ability-assess-config/query",
    method: "get",
    params: query
  });
}
/**
 * @description:新增长者评估结果-评估等级
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-17 20:43:59
 * @后台人员:
 */
export function add_elder_assess(query) {
  return request({
    url: "/cim/elder-assess-info/add",
    method: "post",
    data: query,
    headers: {
      "Content-Type": "application/json;"
    }
  });
}
/**
 * @description:查询长者能力评估结果-评估等级
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-17 20:45:09
 * @后台人员:
 */
export function get_assess_info(query) {
  return request({
    url: "/cim/elder-assess-info/query/by-elder-id",
    method: "get",
    params: query
  });
}
/**
 * @description:新增/修改长者评估得分
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-18 14:18:21
 * @后台人员:
 */
export function manager_assess_score(query) {
  return request({
    url: "/cim/assess-score/manager",
    method: "post",
    data: query,
    headers: {
      "Content-Type": "application/json;"
    }
  });
}
/**
 * @description:根据能力评估项目类型查询长者得分
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-18 17:01:10
 * @后台人员:
 */
export function get_assessinfo_by_type(query) {
  return request({
    url: "/cim/assess-score/query/by-type",
    method: "get",
    params: query
  });
}
/**
 * @description:根据长者id查询总评估结果
 * @fileName: goLive.js
 * @author: 姜纬杰
 * @date: 2021-08-18 17:02:41
 * @后台人员:
 */
export function get_assessinfo_all(query) {
  return request({
    url: "/cim/assess-score/query/all",
    method: "get",
    params: query
  });
}
/**
 * @description 定制服务-服务等级批量查询
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-19 10:04:17
 */
export function service_level_config(query) {
  return request({
    url: "/tkm/service-level-config/query/all",
    method: "get",
    params: query
  });
}

/**
 * @description 定制服务-评估等级查询
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-19 10:04:17
 */
export function assess_level(query) {
  return request({
    url: "/cim/elder-assess-info/query/assess-level",
    method: "get",
    params: query
  });
}

/**
 * @description  入住管理-目前生活状态
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-19 11:08:18
 */
export function elder_info(query) {
  return request({
    url: "/cim/elder-info-ex/query",
    method: "get",
    params: query
  });
}

/**
 * @description '选择床位-获取合同类型'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-19 11:33:28
 */
export function type(query) {
  return request({
    url: "/cim/elder-contract/query/type",
    method: "get",
    params: query
  });
}

/**
 * @description 定位服务-分类查询服务等级
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-19 11:45:56
 */
export function group(query) {
  return request({
    url: "/tkm/level2-project/query/group",
    method: "get",
    params: query
  });
}

/**
 * @description '定位服务-新增服务等级'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-19 13:55:13
 */
export function elder_service_level(query) {
  return request({
    url: "/cim/elder-service-level/add",
    method: "post",
    params: query
  });
}

/**
 * @description 查询长者服务
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-19 14:38:33
 */
export function by_elder_id(query) {
  return request({
    url: "/cim/elder-service-level/query/by-elder-id",
    method: "get",
    params: query
  });
}

/**
 * @description  付款计划-获取科目名称
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-20 09:33:22
 */
export function pay_type(query) {
  return request({
    url: "/cim/pay-plan/query/pay-type",
    method: "get",
    params: query
  });
}

/**
 * @description '付款计划 新增'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-20 09:42:12
 */
export function pay_add(query) {
  return request({
    url: "/cim/pay-plan/add",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}

/**
 * @functionName '付款计划 更新状态 为已完成'
 * @description
 * @author 谭人杰
 * @date 2021-08-22 16:03:08
 */

export function pay_plan_complete(query) {
  return request({
    url: "/cim/pay-plan/update/pay-plan-status",
    method: "post",
    params: query
  });
}

/**
 * @description '付款计划-查询付款计划'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-20 10:27:47
 */

export function by_plan_type(query) {
  return request({
    url: "/cim/pay-plan/query/batch/by-plan-type",
    method: "get",
    params: query
  });
}

/**
 * @description '付款计划-删除修改'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-20 10:29:59
 */
export function pay_plan_manager(query) {
  return request({
    url: "/cim/pay-plan/manager",
    method: "post",
    headers: {
      "Content-Type": "application/json;"
    },
    data: query
  });
}

/**
 * @description '入住审核---获取审核状况'
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:29:59
 */
export function getApplyStatus(query) {
  return request({
    url: "/cim/check-in-process/query/by-elder-id",
    method: "get",
    params: query
  });
}

/**
 * @description 入住审核-----查询长者服务项目
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function get_service_project(query) {
  return request({
    url: "/cim/elder-service-level/query/elder-service",
    method: "get",
    params: query
  });
}

/**
 * @description 入住审核-----全量查询长者关联服务计划
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function get_pay_plan(query) {
  return request({
    url: "/cim/elder-pay-plan/query/all",
    method: "get",
    params: query
  });
}

/**
 * @description 入住审核-----最终审核
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function set_verify_status(query) {
  return request({
    url: "/cim/audit-record/add",
    method: "post",
    data: query
  });
}

/**
 * @description 入住审核-----查询审核步骤
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function get_verify_steps(query) {
  return request({
    url: "/cim/audit-record/query/return-code",
    method: "get",
    params: query
  });
}

/**
 * @description 合同签约-----查询入住老人合同信息
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function get_older_contractInfo(query) {
  return request({
    url: "/cim/elder-contract/query/base-info",
    method: "get",
    params: query
  });
}

/**
 * @description 合同签约-----合同签约
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function set_older_contractInfo(query) {
  return request({
    url: "/cim/elder-contract/add",
    method: "post",
    data: query
  });
}

/**
 * @description 入住收费
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function set_fee_record(query) {
  return request({
    url: "/cim/elder-charge-record/add",
    method: "post",
    data: query
  });
}

/**
 * @description 办理入住
 * @modifyContent
 * @author 谭人杰
 * @date 2021-08-21 10:04:17
 */
export function handle_live(query) {
  return request({
    url: "/cim/check-in-process/handle",
    method: "post",
    data: query
  });
}

/**
 * @description '单次科目类型'
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-23 18:51:11
 */
export function one_time_type(query) {
  return request({
    url: "/cim/pay-plan/query/one-time-type",
    method: "get",
    data: query
  });
}

/**
 * @description 入住分页-终止恢复删除入住办理流程
 * @modifyContent
 * @author 王文涛
 * @date 2021-08-23 20:29:13
 */
export function process(query) {
  
  return request({
    url: "/cim/check-in-process/manager/process",
    method: "post",
    
    params: query
  });
}
