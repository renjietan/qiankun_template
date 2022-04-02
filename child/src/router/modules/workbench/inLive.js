import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const inLive = {
    path: "workbench/inLive",
    redirect: '/workbench/inLive/handle/list',
    component: AppMain,
    name: 'inLive',
    meta: {
        title: '在住',
        icon: 'inLive',
    },
    children: [
        {
            path: 'handle/list',
            component: views_dir["inLive_handle_list"],
            name: 'inLive_handle_list',
            meta: {
                title: '在住办理一览',
                icon:'zzblyl'
            }
        },
        {
            path: 'birthday/list',
            component: views_dir["inLive_birthday_list"],
            name: 'inLive_birthday_list',
            meta: {
                title: '生日一览',
                icon:'zzblyl',
            }
        },
        {
            path: 'contract/list',
            component:views_dir["inLive_contract_list"],
            name: 'inLive_contract_list',
            meta: {
                title: '合同一览',
                icon:'htyl'
            }
        },
        {
            path: 'contract/renew/:id',
            component:views_dir["inLive_contract_renew"],
            name: 'inLive_contract_renew',
            hidden:true,
            meta: {
                title: '续签合同',
            }
        },
        {
            path: 'handle/form/apply_back/:id',
            component:views_dir["inLive_handle_form_apply_back"],
            name: 'inLive_handle_form_apply_back',
            hidden:true,
            meta: {
                title: '退住申请',
            }
        },
        {
            path: 'handle/form/refund_info/:id',
            component:views_dir["inLive_handle_form_refund_info"],
            name: 'inLive_handle_form_refund_info',
            hidden:true,
            meta: {
                title: '退费详情',
            }
        },
        {
            path: 'payment_plan/list',
            component:views_dir["inLive_payment_plan_list"],
            name: 'inLive_payment_plan_list',
            hidden:true,
            meta: {
                title: '付款计划一览',
            }
        },
        {
            path: 'payment_plan/info/:id',
            component:views_dir["inLive_payment_plan_info"],
            name: 'inLive_payment_plan_info',
            meta: {
                title: '付款计划调整',
                icon:"fkjhtz"
            }
        },
        {
            path: 'bunk_resize/list',
            component:views_dir["inLive_bunk_resize_list"],
            name: 'inLive_bunk_resize_list',
            meta: {
                title: '床位调整一览',
                icon:'cwtzyl'
            }
        },
        {
            path: 'bunk_resize/form/apply/:id',
            component: views_dir["inLive_bunk_resize_form_apply"],
            name: 'inLive_bunk_resize_form_apply',
            meta: {
                title: '床位调整申请',
                icon:'cwtzsq'
            }
        },
        {
            path: 'server_level_resize/list',
            component:views_dir["inLive_server_level_resize_list"],
            name: 'inLive_server_level_resize_list',
            meta: {
                title: '服务等级调整一览',
                icon:'fwdjtzyl'
            }
        },
        {
            path: 'server_level_resize/form/apply/:id',
            component: views_dir["inLive_server_level_resize_form_apply"],
            name: 'inLive_server_level_resize_form_apply',
            hidden:true,
            meta: {
                title: '服务等级调整申请',
            }
        },
        {
            path: 'holiday/list',
            component:views_dir["inLive_holiday_list"],
            name: 'inLive_holiday_list',
            meta: {
                title: '请假一览',
                icon:'qjyl'
            }
        },
        {
            path: 'holiday/apply/:id/:type',
            component:views_dir["inLive_holiday_apply"],
            name: 'inLive_holiday_apply',
            hidden:true,
            meta: {
                title: '请假申请',
            }
        },
        {
            path: 'addedValue/list',
            component: views_dir["inLive_addedValue_list"],
            name: 'inLive_addedValue_list',
            meta: {
                title: '增值服务',
                icon:'zzfwyl'
            }
        },
        {
            path: 'special_foods/list',
            component:views_dir["inLive_special_foods_list"],
            name: 'inLive_special_foods_list',
            meta: {
                title: '特殊膳食管理',
                icon:'tsssglyl'
            }
        },
        {
            path: 'handle/form/case_file/:id',
            component:views_dir["inLive_handle_form_case_file"],
            name: 'inLive_handle_form_case_file',
            hidden:true,
            meta: {
                title: '个人档案',
            }
        },
        {
            path: 'handle/form/CV_record/:id',
            component: views_dir["inLive_handle_form_CV_record"],
            name: 'inLive_handle_form_CV_record',
            hidden:true,
            meta: {
                title: '评估记录',
            }
        },
        
        {
            path: 'handle/form/add_not_good_event/:id',
            component: views_dir["inLive_handle_form_add_not_good_event"],
            name: 'inLive_handle_form_add_not_good_event',
            hidden:true,
            meta: {
                title: '添加不良事件',
            }
        },
    ]
}