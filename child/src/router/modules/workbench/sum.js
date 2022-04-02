import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const sum = {
    path: "workbench/sum",
    redirect: '/workbench/sum/index',
    component: AppMain,
    name: 'sum',
    meta: {
        title: '统计',
        icon: 'statistics',
    },
    children: [
        {
            path: 'index',
            component: views_dir["sum_Index"],
            name: 'sum_Index',
            meta: {
                title: '统计分析',
                icon:'tjfx'
            }
        },
    ]
}