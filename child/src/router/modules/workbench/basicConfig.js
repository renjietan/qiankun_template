import AppMain from '@/layout/components/AppMain'
import { views_dir } from "../../view_dir/views_dir.js"
export const basicConfig = {
  path: "workbench/basicConfig",
  redirect: '/workbench/basicConfig/bed_mg',
  component: AppMain,
  name: 'basicConfig',
  meta: {
    title: '基础',
    icon: 'basicConfig',
  },
  children: [
    {
      path: 'bed_mg',
      component: views_dir["basicConfig_bed_mg"],
      name: 'basicConfig_bed_mg',
      meta: {
        title: '床位管理',
        icon:'cwgl'
      }
    },
    {
      path: 'bed_fee_mg',
      component:  views_dir["basicConfig_bed_fee_mg"],
      name: 'basicConfig_bed_fee_mg',
      meta: {
        title: '床位费管理',
        icon:'cwfgl'
      }
    },
    {
      path: 'house_fee_mg',
      component:  views_dir["basicConfig_house_fee_mg"],
      name: 'basicConfig_house_fee_mg',
      meta: {
        title: '包床费管理',
        icon:'bcfgl'
      }
    },
    {
      path: 'service_product_mg',
      component:  views_dir["basicConfig_service_product_mg"],
      name: 'basicConfig_service_product_mg',
      meta: {
        title: '服务项目管理',
        icon:'fwxmgl'
      }
    },
    {
      path: 'service_added_mg',
      component: views_dir["basicConfig_service_added_mg"],
      name: 'basicConfig_service_added_mg',
      meta: {
        title: '增值服务管理',
        icon:'zzfwgl'
      }
    },
    {
      path: 'bed_state_mg',
      component:  views_dir["basicConfig_bed_state_mg"],
      name: 'basicConfig_bed_state_mg',
      meta: {
        title: '房态图管理',
        icon:'fttgl'
      }
    },
    {
      path: 'service_level_mg',
      component:  views_dir["basicConfig_service_level_mg"],
      name: 'basicConfig_service_level_mg',
      meta: {
        title: '服务等级管理',
        icon:"fwdjgl"
      }
    },
    {
      path: 'service_added_type_mg',
      component:  views_dir["basicConfig_service_added_type_mg"],
      name: 'basicConfig_service_added_type_mg',
      meta: {
        title: '增值服务类型管理',
        icon:"zzfwlxgl"
      }
    },
    {
      path: 'service_elder_bind',
      component:  views_dir["service_elder_bind"],
      name: 'service_elder_bind',
      meta: {
        title: '长者绑定',
        icon:"zzfwlxgl"
      }
    }
  ]
}