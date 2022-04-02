import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const system = {
    path: "workbench/system",
    redirect: '/workbench/system/account_mg',
    component: AppMain,
    name: 'system',
    meta: {
        title: '系统',
        icon: 'system',
    },
    children: [
        {
            path: 'account_mg',
            component: views_dir["system_account_mg"],
            name: 'system_account_mg',
            meta: {
                title: '账号管理',
                icon:'zhgl'
            }
        },
        {
            path: 'role_mg',
            component: views_dir["system_role_mg"],
            name: 'system_role_mg',
            meta: {
                title: '角色权限管理',
                icon:'jsqxgl'
            }
        },
        {
            path: 'menu_mg',
            component: views_dir["system_menu_mg"],
            name: 'system_menu_mg',
            meta: {
                title: '菜单管理',
                icon:'cdgl'
            }
        },
        {
            path: 'system_log',
            component:views_dir["system_system_log"],
            name: 'system_system_log',
            meta: {
                title: '系统日志',
                icon:'xtrz'
            }
        },
        {
            path: 'dict_mg',
            component: views_dir["system_dict_mg"],
            name: 'system_dict_mg',
            meta: {
                title: '字典管理',
                icon:'zdgl'
            }
        },
    ]
}