import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const media = {
  path: "/media_mg",
  component: "AppMain",
  redirect: '/media_mg/index',
  name: 'media_mg',
  title: '媒体管理',
  icon: 'assess',
  children: [{
    path: 'index',
    component: views_dir["intended_customer_media_mg"],
    name: 'intended_customer_media_mg',
    title: '媒体管理',
  },],
};