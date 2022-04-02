import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const marketing = {
    path: "workbench/marketing",
    redirect: '/workbench/marketing/visited_record',
    component: AppMain,
    name: 'marketing',
    meta: {
        title: '营销',
        icon: 'marketing',
    },
    children: [
        {
            path: 'visited_record',
            component:views_dir["marketing_visited_record"],
            name: 'marketing_visited_record',
            meta: {
                title: '拜访记录',
                icon:"bfjl"
            }
        },
        {
            path: 'come_appointment',
            component:views_dir["marketing_come_appointment"],
            name: 'marketing_come_appointment',
            meta: {
                title: '适老化产品销售记录',
                icon:'slhcpxscp'
            }
        },
        {
            path: 'come_record',
            component: views_dir["marketing_come_record"],
            name: 'marketing_come_record',
            meta: {
                title: '来访记录',
                icon:'lfjl'
            }
        },
        {
            path: 'come_signIn',
            component: views_dir["marketing_come_signIn"],
            name: 'marketing_come_signIn',
            meta: {
                title: '来访登记',
                icon:'lfdj'
            }
        },
        {
            path: 'willing_client',
            component: views_dir["marketing_willing_client"],
            name: 'marketing_willing_client',
            meta: {
                title: '意向客户',
                icon:'yxkf'
            }
        },
        {
            path: 'willing_client_signIn',
            component: views_dir["marketing_willing_client_signIn"],
            name: 'marketing_willing_client_signIn',
            hidden:true,
            meta: {
                title: '意向客户登记',
                icon:'yxkf'
            }
        },
        {
            path: 'house_layout',
            component: views_dir["marketing_house_layout"],
            name: 'marketing_house_layout',
            meta: {
                title: '房态图展示',
                icon:'fttzs'
            }
        },
        {
            path: 'product_display',
            component: views_dir["marketing_product_display"],
            name: 'marketing_product_display',
            meta: {
                title: '适老化产品展示',
                icon:'slhcpzh'
            }
        },
        {
            path: 'is_satisfied',
            component: views_dir["marketing_is_satisfied"],
            name: 'marketing_is_satisfied',
            meta: {
                title: '满意度',
                icon:'myd'
            }
        },
        {
            path: 'return_visit',
            component: views_dir["marketing_return_visit"],
            name: 'marketing_return_visit',
            meta: {
                title: '入住回访',
                icon:'rzhf'
            }
        },
        {
            path: 'return_visit_signIn',
            component: views_dir["marketing_return_visit_signIn"],
            name: 'marketing_return_visit_signIn',
            hidden:true,
            meta: {
                title: '入住回访登记',
            }
        },
        {
            path: 'retreat_interview',
            component: views_dir["marketing_retreat_interview"],
            name: 'marketing_retreat_interview',
            meta: {
                title: '退住约谈',
                icon: 'tzyt',
            }
        },
        {
            path: 'retreat_interview_signIn',
            component: views_dir["marketing_retreat_interview_signIn"],
            name: 'marketing_retreat_interview_signIn',
            hidden:true,
            meta: {
                title: '退住约谈登记',
            }
        },
    ]
}