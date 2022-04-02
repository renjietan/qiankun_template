import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const eating = {
    path: "workbench/eating",
    redirect: '/workbench/eating/every_week_recipe',
    component: AppMain,
    name: 'eating',
    meta: {
        title: '饮食',
        icon: 'eating',
    },
    children: [
        {
            path: 'every_week_recipe',
            component: views_dir["eating_every_week_recipe"],
            name: 'eating_every_week_recipe',
            meta: {
                title: '每周食谱',
                icon:"mzsp"
            }
        },
        {
            path: 'meals_record',
            component: views_dir["eating_meals_record"],
            name: 'eating_meals_record',
            meta: {
                title: '用餐记录',
                icon:'ycjl'
            }
        },
        {
            path: 'special_diet',
            component:views_dir["eating_special_diet"],
            name: 'eating_special_diet',
            meta: {
                title: '特殊膳食管理',
                icon:'tsssgl'
            }
        },
        {
            path: 'eating_valid_record',
            component: views_dir["eating_eating_valid_record"],
            name: 'eating_eating_valid_record',
            meta: {
                title: '验餐记录',
                icon:'ysycjl'
            }
        },
        {
            path: 'foods_mg',
            component: views_dir["eating_foods_mg"],
            name: 'eating_foods_mg',
            meta: {
                title: '菜品管理',
                icon:'cpgl'
            }
        },
        {
            path: 'foods_type_mg',
            component: views_dir["eating_foods_type_mg"],
            name: 'eating_foods_type_mg',
            meta: {
                title: '菜品类别管理',
                icon:'cpgl'
            }
        },
    ]
}