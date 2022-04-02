/**
 * 销售部路由
 */
const ccrc_dir = {
   // CCRC
  hourse_mg: () => import('@/views/CCRC/housing_mg/list/index'),
  hourse_detail: () => import('@/views/CCRC/housing_mg/handle/detail'),
  hourse_generated:()=>import('@/views/CCRC/hoursing_generated/list/index'),
  // hourse_from:()=>import('@/views/CCRC/hoursing_generated/hoursing_form/list'),
  hourse_adjument:()=>import('@/views/CCRC/housing_mg/handle/adjustment'),
  control_chart:()=>import('@/views/CCRC/housing_mg/handle/controlChart'),
  business_parameters:()=>import('@/views/CCRC/business_parameters/index'),
  business_parameters_group_mg:()=>import('@/views/CCRC/business_parameters/group_mg'),
  business_parameters_company_mg:()=>import('@/views/CCRC/business_parameters/company_mg'),
  payment_method:()=>import('@/views/CCRC/payment_method/index'),
  add_payment_method:()=>import('@/views/CCRC/payment_method/add_payment_method'),
  price_mg:()=>import('@/views/CCRC/price_mg/index'),
  price_mg_add_price:()=>import('@/views/CCRC/price_mg/add_price'),
  price_mg_price_detail:()=>import('@/views/CCRC/price_mg/price_detail'),
  price_mg_cost_price_detail:()=>import('@/views/CCRC/price_mg/cost_price_detail'),
  discount_mg:()=>import('@/views/CCRC/discount_mg/index'),
  discount_mg_add_discount:()=>import('@/views/CCRC/discount_mg/add_discount'),
  intended_customer:()=>import('@/views/CCRC/intended_customer/index'),
  intended_customer_media_mg:()=>import('@/views/CCRC/media_mg/index'),
  intended_customer_source_mg:()=>import('@/views/CCRC/source_mg/index'),
  sign_contract_list:()=>import('@/views/CCRC/sign_contract/index'),
}

export default ccrc_dir;