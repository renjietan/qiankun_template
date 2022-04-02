import request from '@/utils/request'
/**=======================================床位管理==========================================================*/
/**
 * @functionName create_bed
 * @description 新增 楼宇-层号-房号-床号配置信息
 * @author 谭人杰
 * @date 2021-06-17 10:23:04
*/
export function create_bed(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/operation/apply/bed-config',
        method: 'post',
        data: query
    })
}



/**
 * @functionName edit_del_bed
 * @description 编辑/删除 床位
 * @author 谭人杰
 * @date 2021-06-17 10:24:06
*/
export function edit_del_bed(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/operation/modify/bed-config',
        method: 'post',
        data: query
    })
}


/**
 * @functionName query_batch_bed
 * @description 批量查询 楼宇-层号-房号-床号配置信息
 * @author 谭人杰
 * @date 2021-06-17 10:24:27
*/
export function query_batch_bed(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/query/batch/bed-config',
        method: 'get',
        params: query
    })
}



/**
 * @functionName query_bed
 * @description 查询 楼宇-层号-房号-床号相关信息
 * @author 谭人杰
 * @date 2021-06-17 10:24:27
*/
export function query_bed(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/query/bed-config',
        method: 'get',
        params: query
    })
}

export function get_house_bed(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/query/no-site-room',
        method: 'get',
        params: query
    })
}



/**=======================================包房费管理/床位费管理==========================================================*/
/**
 * @functionName create_fee
 * @description 新增 费用配置
 * @author 谭人杰
 * @date 2021-06-17 10:23:50
*/
export function create_fee(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/operation/apply/fee-config',
        method: 'post',
        data: query
    })
}
/**
 * @functionName edit_fee
 * @description 修改 费用配置
 * @author 谭人杰
 * @date 2021-06-17 10:24:27
*/
export function edit_fee(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/operation/modify/fee-config',
        method: 'post',
        data: query
    })
}

/**
 * @functionName query_batch_fee
 * @description 批量查询 费用配置
 * @author 谭人杰
 * @date 2021-06-17 10:24:27
*/
export function query_batch_fee(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/query/batch/fee-config',
        method: 'get',
        params: query
    })
}

/**
 * @functionName edit_del_batch_fee
 * @description 编辑/删除 费用
 * @author 谭人杰
 * @date 2021-06-17 10:24:27
*/
export function edit_del_batch_fee(query) {
    return request({
        url: '/base-manager/v1/build-bed/manage/operation/modify/fee-config',
        method: 'post',
        data: query
    })
}


/**=======================================服务项目管理==========================================================*/
/**
 * @functionName edit_del_server
 * @description 新增 服务项目
 * @author 谭人杰
 * @date 2021-06-18 18:01:18
*/
export function  create_server(query) {
    return request({
        url: '/tkm/v1/service/operation/apply/project',
        method: 'post',
        data: query
    })
}


/**
 * @functionName edit_del_server
 * @description 修改/删除 服务项目
 * @author 谭人杰
 * @date 2021-06-18 18:01:18
*/
export function  edit_del_server(query) {
    return request({
        url: '/tkm/v1/service/operation/modify/project',
        method: 'post',
        data: query
    })
}

/**
 * @functionName 
 * @description 批量查询 服务项目
 * @author 谭人杰
 * @date 2021-06-18 18:28:57
*/
export function query_batch_server(query) {
    return request({
        url: '/tkm/v1/service/query/batch/project',
        method: 'post',
        data: query
    })
}



/**
 * @functionName 
 * @description 查询 服务类型
 * @author 谭人杰
 * @date 2021-06-18 18:28:57
*/
export function query_server_type(query) {
    return request({
        url: '/tkm/v1/service/query/project-type',
        method: 'get',
        params: query
    })
}

/**
 * @functionName 
 * @description 查询 服务项目
 * @author 谭人杰
 * @date 2021-06-18 18:28:57
*/
export function query_project_type(query) {
    return request({
        url: '/tkm/v1/service/query/project-type',
        method: 'get',
        params: query
    })
}

/**
 * @functionName 
 * @description 查询 记录形式
 * @author 谭人杰
 * @date 2021-06-18 18:28:57
*/
export function query_note_type(query) {
    return request({
        url: '/tkm/v1/service/query/note-type',
        method: 'get',
        params: query
    })
}

/**==================================================增值服务类型管理==========================================================*/
/** 
 * @description:新增增值服务类型 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-30 16:03:04
 * @后台人员:  
*/
export function add_av_type(query) {
    return request({
        url: '/base-manager/av-type-info/add',
        method: 'post',
        data: query
    })
}
/** 
 * @description:管理增值服务类型 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-30 16:05:20
 * @后台人员:  
*/
export function manager_av_type(query) {
    return request({
        url: '/base-manager/av-type-info/manager',
        method: 'post',
        data: query
    })
}
/** 
 * @description: 查询 分页
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-30 16:06:23
 * @后台人员:  
*/
export function query_av_type(query) {
    return request({
        url: '/base-manager/av-type-info/query',
        method: 'get',
        params: query
    })
}
/** 
 * @description:查询全部增值服务类型 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-31 16:36:37
 * @后台人员:  
*/
export function all_av_type(query) {
    return request({
        url: '/base-manager/av-type-info/query/all',
        method: 'get',
        params: query
    })
}
/**=====================================================增值服务管理==========================================================*/
/** 
 * @description:新增增值服务 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-31 15:17:16
 * @后台人员:  
*/
export function add_av_service(query) {
    return request({
        url: '/base-manager/av-service/add',
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}
/** 
 * @description:增值服务批量条件查询 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-31 15:19:14
 * @后台人员:  
*/
export function batch_av_service(data,query) {
    return request({
        url: '/base-manager/av-service/batch-query',
        method: 'post',
        data:data,
        params: query,
    })
}

/** 
 * @description:根据增值服务类型 查询增值服务 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-31 15:19:14
 * @后台人员:  
*/
export function get_av_byType(query) {
    return request({
        url: '/base-manager/av-service/query/by-type-id',
        method: 'get',
        params: query
    })
}
/** 
 * @description:增值服务管理 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-07-31 15:21:20
 * @后台人员:  
*/
export function manager_av_service(query) {
    return request({
        url: '/base-manager/av-service/manager',
        method: 'post',
        data: query
    })
}


/**==================================================房态图管理==========================================================*/
/**
 * @functionName get_house_state
 * @description 根据楼层ID查询下属所有床位图
 * @author 谭人杰
 * @date 2021-07-31 16:48:50
*/
export function get_house_state(query) {
    return request({
        url: '/base-manager/bed-site/query/in-the-floor',
        method: 'get',
        params: query
    })
}
/**
 * @functionName set_house_state
 * @description 床态图新增
 * @author 谭人杰
 * @date 2021-07-31 20:27:21
*/
export function set_house_state(query) {
    return request({
        url: '/base-manager/bed-site/batch/add',
        method: 'post',
        data: query
    })
}

/**
 * @functionName get_bed_desc
 * @description 床态图信息（包含床位老人信息）
 * @author 谭人杰
 * @date 2021-07-31 20:27:21
*/
export function get_bed_desc(query) {
    return request({
        url: '/base-manager/bed-site/query/bed-site-elder',
        method: 'get',
        params: query
    })
}

/**=====================================================服务等级管理==========================================================*/
/** 
 * @description: 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-08-12 09:46:08
 * @后台人员:  
*/
export function all_service_level(query) {
    return request({
        url: '/tkm/service-level-config/query/all',
        method: 'get',
        params: query
    })
}
/** 
 * @description:新增服务等级 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-08-11 17:18:51
 * @后台人员:  
*/
export function add_service_level(query) {
    return request({
        url: '/tkm/service-level-config/add',
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}
/** 
 * @description:服务等级管理 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-08-11 17:20:32
 * @后台人员:  
*/
export function manager_service_level(query) {
    return request({
        url: '/tkm/service-level-config/manager',
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}
/** 
 * @description:新增服务等级关联服务项目 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-08-12 20:06:28
 * @后台人员:  
*/
export function add_level_projec(query) {
    return request({
        url: '/tkm/level2-project/add',
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}
/** 
 * @description:服务等级关联项目查询 
 * @fileName: basicConfig.js 
 * @author: 姜纬杰 
 * @date: 2021-08-12 20:07:24
 * @后台人员:  
*/
export function query_by_lv_id(query) {
    return request({
        url: '/tkm/level2-project/query/by-lv-id',
        method: 'get',
        params: query
    })
}


/**

 * @param {string} elderId
 * @description  入住申请- 选择床位
 * @author 王文涛
 * @date 2021-08-17 16:50:33
*/
export function by_elder_id(query) {
    return request({
        url: '/base-manager/bed-elder/query/by-elder-id',
        method: 'get',
        params: query
    })
}

/** 
 * @description: 
 * @fileName: basicConfig.js 
 * @author: 王文涛 
 * @date: 2021-12-14 10:08:21
 * @后台人员:  
*/

export function find_bind_elder(query){
    return request({
        url: '/aam/f-user/query/page',
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}

/** 
 * @description: 
 * @fileName: basicConfig.js 
 * @author: 王文涛 
 * @date: 2021-12-14 14:48:55
 * @后台人员:  
*/

export function bind_elder(query){
    return request({
        url: '/aam/f-user/add',
        method: 'post',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}

/** 
 * @description: 
 * @fileName: basicConfig.js 
 * @author: 王文涛 
 * @date: 2021-12-14 15:42:04
 * @后台人员:  
*/

export function del_bind_elder(query){
    return request({
        url: '/aam/f-user',
        method: 'delete',
        headers: {
            "Content-Type": 'application/json;'
        },
        data: query
    })
}