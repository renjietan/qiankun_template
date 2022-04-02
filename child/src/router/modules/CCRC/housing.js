import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const housing = {
  path: "/CCRC",
  component: "AppMain",
  redirect: '/CCRC/list/index',
  name: 'CCRC',
  title: '房源管理',
  icon: 'house',
  children: [{
    path: 'list/index',
    component:views_dir ["hourse_mg"],
    name: 'CCRC_list_hourse_mg',
    title: '房源管理',
  }, {
    path: 'handle/detail',
    component: views_dir["hourse_detail"],
    name: 'CCRC_handle_hourse_detail',
    title: '房源详情',
  },{
    path: 'handle/adjument',
    component: views_dir["hourse_adjument"],
    name: 'CCRC_handle_hourse_adjument',
    title: '房源调整',
  },{
    path: 'handle/control_chart',
    component: views_dir["control_chart"],
    name: 'CCRC_handle_hourse_control_chart',
    title: '销控调整图',
  }],
};
