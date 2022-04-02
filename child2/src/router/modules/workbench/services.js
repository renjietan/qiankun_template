import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const services = {
  path: "workbench/services",
  redirect: '/workbench/services/care_for_plan',
  component: AppMain, 
  name: 'services',
  meta: {
    title: '照料服务',
    icon: 'services',
  },
  children: [
    {
      path: 'care_for_record',
      component: views_dir["services_care_for_record"],
      name: 'services_care_for_record',
      meta: {
        title: '照护记录一览',    
        icon:"hzjl"             
      }
    },
    {
      path: 'record/patrol/:serviceTypeId',
      component: views_dir["services_record_patrol"],
      name: 'services_record_patrol',
      hidden: true,
      meta: {
        title: '巡视记录表',    
      }
    },
    {
      path: 'record/temperature/:serviceTypeId',
      component: views_dir["services_record_temperature"],
      name: 'services_record_temperature',
      hidden: true,
      meta: {
        title: '体温记录表',    
      }
    },
    {
      path: 'record/defecation/:serviceTypeId',
      component: views_dir["services_record_defecation"],
      name: 'services_record_defecation',
      hidden: true,
      meta: {
        title: '排泄记录表',    
      }
    },
    {
      path: 'record/bath/:serviceTypeId',
      component: views_dir["services_record_bath"],
      name: 'services_record_bath',
      hidden: true,
      meta: {
        title: '助浴记录表',    
      }
    },
    {
      path: 'record/rollover/:serviceTypeId',
      component: views_dir["services_record_rollover"],
      name: 'services_record_rollover',
      hidden: true,
      meta: {
        title: '翻身记录表',    
      }
    },
    {
      path: 'record/hygiene/:serviceTypeId',
      component: views_dir["services_record_hygiene"],
      name: 'services_record_hygiene',
      hidden: true,
      meta: {
        title: '卫生清洁表',    
      }
    },
    {
      path: 'record/bodyWeight/:serviceTypeId',
      component: views_dir["services_record_bodyWeight"],
      name: 'services_record_bodyWeight',
      hidden: true,
      meta: {
        title: '体重记录表',    
      }
    },
    {
      path: 'record/eating/:serviceTypeId',
      component: views_dir["services_record_eating"],
      name: 'services_record_eating',
      hidden: true,
      meta: {
        title: '饮食用量表',    
      }
    },
    {
      path: 'record/special_things/:serviceTypeId',
      component: views_dir["services_record_special_things"],
      name: 'services_record_special_things',
      hidden: true,
      meta: {
        title: '特殊事项记录表',    
      }
    },
    {
      path: 'care_for_plan',
      component: views_dir["services_care_for_plan"],
      name: 'services_care_for_plan',
      meta: {
        title: '照护计划',
        icon:'hzjh'
      }
    },
    {
      path: 'care_for_imp',
      component: views_dir["services_care_for_imp"],
      name: 'services_care_for_imp',
      meta: {
        title: '照护实施',
        icon:'hzss'                 
      }
    }, 
    
    {
      path: 'service_project_list',
      component: views_dir["service_project_list"],
      name: 'service_project_list',
      meta: {
        title: '服务记录',    
        icon:"hzjl"             
      }
    }, 
    {
      path:'service_project_record',
      component: views_dir["service_project_record"],
      name: 'service_project_record',
      meta: {
        title: '服务数据',    
        icon:"fwsj"             
      }
    },
    {
      path: 'care_for_team',
      component:views_dir["services_care_for_team"],
      name: 'services_care_for_team',
      meta: {
        title: '照护小组管理',
        icon:'hzxzgl'                 
      }
    }, 
    {
      path: 'care_for_scheduling',
      component: views_dir["services_care_for_scheduling"],
      name: 'services_care_for_scheduling',
      meta: {
        title: '照护排班管理',   
        icon:'hzpbgl'              
      }
    }, 
    {
      path: 'shift_manage',
      component: views_dir["shift_manage"],
      name: 'shift_manage',
      meta: {
        title: '班次管理',   
        icon:'hzpbgl'              
      }
    }, 
    {
      path: 'handover_work',
      component:views_dir["services_handover_work"],
      name: 'services_handover_work',
      meta: {
        title: '交接班管理',   
        icon:'jjbgl'              
      }
    }, 
    {
      path: 'handover_work_detail',
      component:views_dir["services_handover_work_detail"],
      name: 'services_handover_work_detail',
      hidden:true,
      meta: {
        title: '交接班管理详情',   
      }
    }, 
    {
      path: 'oldman_log',
      component: views_dir["services_oldman_log"],
      name: 'services_oldman_log',
      meta: {
        title: '长者日志',   
        icon:'zzrz'              
      }
    }, 
  ]
}