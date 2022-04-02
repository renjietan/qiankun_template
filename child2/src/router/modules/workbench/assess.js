import AppMain from '@/layout/components/AppMain'
import { views_dir } from "../../view_dir/views_dir.js"
export const assess = {
  path: "workbench/assess",
  redirect: '/workbench/assess/list',
  component: AppMain, 
  name: 'assess',
  meta: {
    title: '评估',
    icon: 'assess',
  },
  children: [
    {
      path: 'list',
      component: views_dir["assess_list"],
      name: 'assess_list',
      meta: {
        title: '评估中心',
        icon:'pgzx'
      }
    },

    {
      path: 'record_list',
      component: views_dir["assess_record_list"],
      name: 'assess_record_list',
      hidden:true,
      meta: {
        title: '评估中心-查看记录-能力评估',
      }
    },
    {
      path: 'sores_record_list',
      component: views_dir["assess_sores_record_list"],
      name: 'assess_sores_record_list',
      hidden:true,
      meta: {
        title: '评估中心-查看记录-压疮',
      }
    },
    {
      path: 'form/record_info/:id',
      component: views_dir["assess_form_record_info"],
      name: 'assess_form_record_info',
      hidden:true,
      meta: {
        title: '评估/评估详情',
      }
    },
    {
      path: 'form/record_sores_info/:id',
      component:views_dir["assess_form_record_sores_info"],
      name: 'assess_form_record_sores_info',
      hidden:true,
      meta: {
        title: '压疮评估详情',
      }
    },
  ]
}