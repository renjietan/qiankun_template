import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const price = {
  path: "/price_mg",
  component: "AppMain",
  redirect: '/price_mg/index',
  name: 'price_mg',
  title: '价格管理',
  icon: 'price_mg',
  children: [
    {
    path: 'index',
    component:views_dir[ "price_mg"],
    name: 'payment_method_list',
    title: '价格管理',
  },
    {
    path: 'add_price',
    hidden:true,
    component: views_dir["price_mg_add_price"],
    name: 'price_mg_add_price',
    title: '价格方案',
  },
    {
    path: 'price_detail',
    hidden:true,
    component: views_dir["price_mg_price_detail"],
    name: 'price_mg_price_detail',
    title: '方案详情',
  },
    {
    path: 'cost_price_detail',
    hidden:true,
    component: views_dir["price_mg_cost_price_detail"],
    name: 'price_mg_cost_price_detail',
    title: '低价详情',
  },
]
};