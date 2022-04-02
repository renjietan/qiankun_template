// import ParentView from '@/components/parentView'
import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'

export const goLive = {
    path: "workbench/goLive",
    redirect: '/workbench/goLive/list',
    component: AppMain,
    name: 'goLive',
    meta: {
        title: '入住',
        icon: 'goLive',
    },
    children: [
        {
            path: 'list',
            component:  views_dir["goLive_list"],
            name: 'goLive_list',
            meta: {
                title: '入住办理一览',
                icon:'rzblyl'
            }
        },
        {
            path: 'form/apply',
            component:  views_dir["goLive_form_apply"],
            name: 'goLive_form_apply',
            meta: {
                title: '入住申请',
                icon:'rzsq'
            }
        },
        {
            path: 'form/apply_detail',
            component:  views_dir["goLive_form_apply_detail"],
            name: 'goLive_form_apply_detail',
            hidden:true,
            meta: {
                title: '详细信息',
            }
        },
        {
            path: 'form/pay_fee',
            component:  views_dir["goLive_form_pay_fee"],
            name: 'goLive_form_pay_fee',
            hidden:true,
            meta: {
                title: '入住收费',
            }
        },
        {
            path: 'form/examination',
            component:  views_dir["goLive_form_examination"],
            name: 'goLive_form_examination',
            hidden:true,
            meta: {
                title: '入住体检',
            }
        },
        {
            path: 'form/ability_assess',
            component: views_dir["goLive_form_ability_assess"],
            name: 'goLive_form_ability_assess',
            hidden:true,
            meta: {
                title: '入住能力评估'
            },
        },
        {
            path: 'form/customServers',
            component:  views_dir["goLive_form_customServers"],
            name: 'goLive_form_customServers',
            hidden:true,
            meta: {
                title: '定制服务'
            },
        },
        {
            path: 'form/payment_plan',
            component:  views_dir["goLive_form_payment_plan"],
            name: 'goLive_form_payment_plan',
            hidden:true,
            meta: {
                title: '付款计划'
            },
        },
        {
            path: 'form/verify',
            component:  views_dir["goLive_form_verify"],
            name: 'goLive_form_verify',
            meta: {
                title: '入住审核',
                icon:"rzsh"
            },
        },
        {
            path: 'form/contract_signing',
            component:  views_dir["goLive_form_contract_signing"],
            name: 'goLive_form_contract_signing',
            hidden:true,
            meta: {
                title: '入住合同签订'
            },
        },
        {
            path: 'form/check_in',
            component: views_dir["goLive_form_check_in"],
            name: 'goLive_form_check_in',
            hidden:true,
            meta: {
                title: '办理入住'
            },
        },
    ]
}