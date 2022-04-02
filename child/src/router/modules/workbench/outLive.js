import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const outLive = {
    path: "workbench/outLive",
    redirect: '/workbench/outLive/handle/list',
    component: AppMain,
    name: 'outLive',
    meta: {
        title: '退住管理',
        icon: 'outLive',
    },
    children: [
        {
            path: 'handle/list',
            component: views_dir["outLive_handle_list"],
            name: 'outLive_handle_list',
            meta: {
                title: '退住办理一览',
                icon:'tzglyl'
            }
        },
        {
            path: 'handle/apply',
            component: views_dir["outLive_handle_apply"],
            name: 'outLive_handle_apply',
            hidden:true,
            meta: {
                title: '退住申请',
            }
        },
        {
            path: 'handle/verify',
            component: views_dir["outLive_handle_verify"],
            name: 'outLive_handle_verify',
            meta: {
                title: '退住审核',
                icon:'tzsh'
            }
        },
        {
            path: 'handle/confirm',
            component: views_dir["outLive_handle_confirm"],
            name: 'outLive_handle_confirm',
            hidden:true,
            meta: {
                title: '退住确认',
            }
        },
        {
            path: 'handle/final',
            component: views_dir["outLive_handle_final"],
            name: 'outLive_handle_final',
            hidden:true,
            meta: {
                title: '退住结算',
            }
        },
    ]
}