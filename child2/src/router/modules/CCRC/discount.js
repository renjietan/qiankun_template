import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'

export const discount = {
  path: "/discount_mg",
  component: "AppMain",
  redirect: '/discount_mg/index',
  name: 'discount_mg',
  title: '折扣管理',
  icon: 'zhekouquan',
  children: [
    {
    path: 'index',
    component:views_dir[ "discount_mg"],
    name: 'discount_mg_list',
    title: '折扣管理',
  },
    {
    path: 'add_discount',
    hidden: true,
    component:views_dir[ "discount_mg_add_discount"],
    name: 'discount_mg_add_discount',
    title: '新增/编辑',
  },
]
};