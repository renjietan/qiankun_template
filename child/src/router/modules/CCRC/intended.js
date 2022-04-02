import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const intended = {
  path: "/intended_customer",
  component: "AppMain",
  redirect: '/intended_customer/index',
  name: 'intended_customer',
  title: '意向客户',
  icon: 'itend',
  children: [
    {
      path: 'index',
      component: views_dir["intended_customer"],
      name: 'intended_customer',
      title: '意向客户',
    },
  ],
};