import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const housing_gen = {
  path: "/HOURSE_GENERATED",
  component: "AppMain",
  redirect: '/HOURSE_GENERATED/list/index',
  name: 'HOURSE_GENERATED',
  title: '项目管理',
  icon: 'project',
  children: [{
    path: 'list/index',
    component: views_dir["hourse_generated"],
    name: 'CCRC_list_hourse_generated',
    title: '项目管理',
  }, ],
};