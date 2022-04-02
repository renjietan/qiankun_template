import AppMain from '@/layout/components/AppMain'
import { views_dir } from "../../view_dir/views_dir.js"
export const finance = {
  path: "workbench/finance",
  redirect: '/workbench/finance/finance_mg',
  component: AppMain, 
  name: 'finance',
  meta: {
    title: '财务',
    icon: 'finance',
  },
  children: [
    {
      path: 'finance_mg',
      component: views_dir["finance_mg"],
      name: 'finance_mg',
      meta: {
        title: '账户管理',
        icon:"zhgll"
      }
    },   
    {
      path: 'finance_detail',
      component: views_dir["finance_detail"],
      name: 'finance_detail',
      hidden:true,
      meta: {
        title: '账户明细',
      }
    },   
    {
      path: 'billing_details',
      component: views_dir["billing_details"],
      name: 'billing_details',
      hidden:true,
      meta: {
        title: '出账详情',
      }
    },   
    {
      path: 'entry_details',
      component: views_dir["entry_details"],
      name: 'entry_details',
      hidden:true,
      meta: {
        title: '入账详情',
      }
    },   
    {
      path: 'cost_mg',
      component:views_dir["finance_cost_mg"],
      name: 'finance_cost_mg',
      meta: {
        title: '费用管理',
        icon:'fygl'
      }
    },   
    {
      path: 'return_money_mg',
      component: views_dir["finance_return_money_mg"],
      name: 'finance_return_money_mg',
      meta: {
        title: '收退费管理',
        icon:'stfgl'
      }
    },   
    {
      path: 'return_money_detail',
      component: views_dir["finance_return_money_detail"],
      name: 'finance_return_money_detail',
      hidden:true,
      meta: {
        title: '收退费详情',
      }
    },   
    {
      path: 'cost_sum',
      component: views_dir["finance_cost_sum"],
      name: 'finance_cost_sum',
      meta: {
        title: '转账',
        icon:'fytj'
      }
    },
    {
      path: 'handle/transfer_other',
      component: views_dir["transfer_other"],
      name: 'transfer_other',
      meta: {
        title: '给他人转账',
        icon:'fytj'
      }
    },
    {
      path: 'handle/withdrawals',
      component: views_dir["withdrawals"],
      name: 'withdrawals',
      meta: {
        title: '取款',
        icon:'fytj'
      }
    },
    {
      path: 'handle/pay_play',
      component: views_dir["pay_play"],
      name: 'pay_play',
      meta: {
        title: '付款计划',
        icon:'fytj'
      }
    },
  ]
}