import AppMain from '@/layout/components/AppMain'
import { views_dir } from "../../view_dir/views_dir.js"
export const administrative = {
  path: "workbench/administrative",
  redirect: '/workbench/administrative/staff_mg',
  component: AppMain,
  name: 'administrative',
  meta: {
    title: '行政',
    icon: 'administrative',
  },
  children: [
    {
      path: 'staff_mg/list',
      component: views_dir["administrative_staff_mg_list"],
      name: 'administrative_staff_mg_list',
      meta: {
        icon:'staff',
        title: '员工管理',
        noCache: true,
      }
    },
    {
      path: 'staff_mg/insert',
      component: views_dir["administrative_staff_mg_insert"],
      name: 'administrative_staff_mg_insert',
      hidden:true,
      meta: {
        title: '新增职工',
      }
    },
    {
      path: 'staff_mg/insertdetail',
      component: views_dir["administrative_staff_mg_insertdetail"],
      name: 'administrative_staff_mg_insertdetail',
      hidden:true,
      meta: {
        title: '职工详情',
      }
    },
    {
      path: 'staff_mg/arg_msg',
      component: views_dir["administrative_staff_mg_arg_msg"],
      name: 'administrative_staff_mg_arg_msg',
      meta: {
        title: '机构信息管理',
        icon:"jgxxgl"
      }
    },
    {
      path: 'ai_framework/list',
      component: views_dir["administrative_ai_framework_list"],
      name: 'administrative_ai_framework_list',
      meta: {
        title: '智能架构',
        icon:'znjg'
      }
    },
    {
      path: 'region_mg',
      component: views_dir["administrative_region_mg"],
      name: 'administrative_region_mg',
      meta: {
        title: '区域管理',
        icon:'qugl'
      }
    },

    {
      path: 'rules',
      component:views_dir["administrative_rules"],
      name: 'administrative_rules',
      hidden:true,
      meta: {
        title: '规章制度',
      }
    },
    {
      path: 'file_mg',
      component: views_dir["administrative_file_mg"],
      name: 'administrative_file_mg',
      hidden:true,
      meta: {
        title: '文件管理',
      }
    },
    {
      path: 'volunteer_mg',
      component:views_dir["administrative_volunteer_mg"],
      name: 'administrative_volunteer_mg',
      hidden:true,
      meta: {
        title: '志愿者管理',
      }
    },
    {
      path: 'scheduling_mg',
      component: views_dir["administrative_scheduling_mg"],
      name: 'administrative_scheduling_mg',
      hidden:true,
      meta: {
        title: '排班管理',
      }
    },
    {
      path: 'notify_msg',
      component:views_dir["administrative_notify_msg"],
      name: 'administrative_notify_msg',
      hidden:true,
      meta: {
        title: '通知消息',
      }
    },
    {
      path: 'staff_cultivate',
      component: views_dir["administrative_staff_cultivate"],
      name: 'administrative_staff_cultivate',
      hidden:true,
      meta: {
        title: '员工培训',
      }
    },
    {
      path: 'staff_assess',
      component: views_dir["administrative_staff_assess"],
      name: 'administrative_staff_assess',
      hidden:true,
      meta: {
        title: '员工考核',
      }
    },
    {
      path: 'staff_checkIn',
      component:views_dir["administrative_staff_checkIn"],
      name: 'administrative_staff_checkIn',
      hidden:true,
      meta: {
        title: '考勤',
      }
    },
    {
      path: 'staff_performance',
      component: views_dir["administrative_staff_performance"],
      name: 'administrative_staff_performance',
      hidden:true,
      meta: {
        title: '绩效',
      }
    },
    {
      path: 'staff_leave',
      component: views_dir["administrative_staff_leave"],
      name: 'administrative_staff_leave',
      hidden:true,
      meta: {
        title: '请假',
      }
    },
    {
      path: 'staff_extra_work',
      component: views_dir["administrative_staff_extra_work"],
      name: 'administrative_staff_extra_work',
      hidden:true,
      meta: {
        title: '加班',
      }
    },
    {
      path: 'staff_remuneration',
      component:views_dir["administrative_staff_remuneration"],
      name: 'administrative_staff_remuneration',
      hidden:true,
      meta: {
        title: '薪酬',
      }
    },
    {
      path: 'staff_notify_birthday',
      component: views_dir["administrative_staff_notify_birthday"],
      name: 'administrative_staff_notify_birthday',
      hidden:true,
      meta: {
        title: '职工生日提醒',
      }
    },
  ]
}