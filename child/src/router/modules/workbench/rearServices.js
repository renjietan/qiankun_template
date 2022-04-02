import { views_dir } from "../../view_dir/views_dir.js"
import AppMain from '@/layout/components/AppMain'
export const rearServices = {
  path: "workbench/rearServices",
  redirect: '/workbench/rearServices/assets_fixed',
  component: AppMain,
  name: 'rearServices',
  meta: {
    title: '后勤',
    icon: 'rearServices',
  },
  children: [
    {
      path: 'assets_fixed',
      component: views_dir["rearServices_assets_fixed"],
      name: 'rearServices_assets_fixed',
      meta: {
        title: '固定资产管理',
        icon: 'gdzcgl'
      }
    },
    {
      path: 'warehouse',
      component: views_dir["rearServices_warehouse"],
      name: 'rearServices_warehouse',
      meta: {
        title: '仓库管理',
        icon: 'ckgl'
      }
    },
    {
      path: 'purchasing_mg',
      component: views_dir["rearServices_purchasing_mg"],
      name: 'rearServices_purchasing_mg',
      meta: {
        title: '采购管理',
        icon: 'cggl'
      }
    },
    {
      path: 'purchasing_verify',
      component: views_dir["rearServices_purchasing_verify"],
      name: 'rearServices_purchasing_verify',
      meta: {
        title: '采购申请',
        icon: 'cgsq'
      }
    },
    {
      path: 'purchasing_detail',
      component: views_dir["rearServices_purchasing_detail"],
      name: 'rearServices_purchasing_detail',
      meta: {
        title: '采购详情',
        icon: 'cgsq'
      }
    },
    {
      path: 'purchasing_aduit',
      component: views_dir["rearServices_purchasing_aduit"],
      name: 'rearServices_purchasing_aduit',
      meta: {
        title: '采购审核',
        icon: 'cgsq'
      }
    },
    {
      path: 'goods_list',
      component: views_dir["rearServices_goods_list"],
      name: 'rearServices_goods_list',
      meta: {
        title: '物品管理',
        icon: 'cgsq'
      }
    },
    {
      path: 'goods_type_list',
      component: views_dir["rearServices_goods_type_list"],
      name: 'rearServices_goods_type_list',
      meta: {
        title: '物品类别',
        icon: 'cgsq'
      }
    },
    {
      path: 'supplier_list',
      component: views_dir["rearServices_supplier_list"],
      name: 'rearServices_supplier_list',
      meta: {
        title: '供应商管理',
        icon: 'cgsq'
      }
    },
    {
      path: 'inventory_list',
      component: views_dir["rearServices_inventory_list"],
      name: 'rearServices_inventory_list',
      meta: {
        title: '库存管理',
        icon: 'cgsq'
      }
    },
    {
      path: 'handle_record',
      component: views_dir["rearServices_handle_record"],
      name: 'rearServices_handle_record',
      meta: {
        title: '出库库记录',
        icon: 'cgsq'
      }
    },
    {
      path: 'outbound_detail',
      component: views_dir["rearServices_outbound_detail"],
      name: 'rearServices_inventory_list',
      meta: {
        title: '出库',
        icon: 'cgsq'
      }
      },
      {
      path: 'putbound_detail',
      component: views_dir["rearServices_putbound_detail"],
      name: 'rearServices_putbound_detail',
      meta: {
        title: '入库',
        icon: 'cgsq'
      }
    },
  ]
}