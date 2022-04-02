import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const source = {
  path: "/source_mg",
  component: "AppMain",
  redirect: '/source_mg/index',
  name: 'source_mg',
  title: '来源管理',
  icon: 'assess',
  children: [{
    path: 'index',
    component: views_dir["intended_customer_source_mg"],
    name: 'intended_customer_source_mg',
    title: '来源管理',
  },],
};