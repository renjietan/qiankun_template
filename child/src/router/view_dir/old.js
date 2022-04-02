/**
 * 养老机构路由
 */
const old_dir = {
    workbenchIndex: () => import('@/views/workbench/workbenchIndex'),

    // 行政
    administrative_staff_mg_list: () => import('@/views/workbench/administrative/staff_mg/list'),
    administrative_staff_mg_insert: () => import('@/views/workbench/administrative/staff_mg/insert/index'),
    administrative_staff_mg_insertdetail: () => import('@/views/workbench/administrative/staff_mg/insertdetail/index'),
    administrative_staff_mg_arg_msg: () => import('@/views/workbench/administrative/staff_mg/arg_msg'),
    administrative_ai_framework_list: () => import('@/views/workbench/administrative/ai_framework/list'),
    administrative_rules: () => import('@/views/workbench/administrative/rules'),
    administrative_file_mg: () => import('@/views/workbench/administrative/file_mg'),
    administrative_volunteer_mg: () => import('@/views/workbench/administrative/volunteer_mg'),
    administrative_region_mg: () => import('@/views/workbench/administrative/region_mg'),
    administrative_scheduling_mg: () => import('@/views/workbench/administrative/scheduling_mg'),
    administrative_notify_msg: () => import('@/views/workbench/administrative/notify_msg'),
    administrative_staff_cultivate: () => import('@/views/workbench/administrative/staff_cultivate'),
    administrative_staff_assess: () => import('@/views/workbench/administrative/staff_assess'),
    administrative_staff_checkIn: () => import('@/views/workbench/administrative/staff_checkIn'),
    administrative_staff_performance: () => import('@/views/workbench/administrative/staff_performance'),
    administrative_staff_leave: () => import('@/views/workbench/administrative/staff_leave'),
    administrative_staff_extra_work: () => import('@/views/workbench/administrative/staff_extra_work'),
    administrative_staff_remuneration: () => import('@/views/workbench/administrative/staff_remuneration'),
    administrative_staff_notify_birthday: () => import('@/views/workbench/administrative/staff_notify_birthday'),
    // 评估
    assess_list: () => import('@/views/workbench/assess/list'),
    assess_record_list: () => import('@/views/workbench/assess/record_list'),
    assess_sores_record_list: () => import('@/views/workbench/assess/sores_record_list'),
    assess_form_record_info: () => import('@/views/workbench/assess/form/record_info/index'),
    assess_form_record_sores_info: () => import('@/views/workbench/assess/form/record_sores_info/index'),
    // 基础
    basicConfig_bed_mg: () => import('@/views/workbench/basicConfig/bed_mg'),
    basicConfig_bed_fee_mg: () => import('@/views/workbench/basicConfig/bed_fee_mg'),
    basicConfig_house_fee_mg: () => import('@/views/workbench/basicConfig/house_fee_mg'),
    basicConfig_service_product_mg: () => import('@/views/workbench/basicConfig/service_product_mg'),
    basicConfig_service_added_mg: () => import('@/views/workbench/basicConfig/service_added_mg'),
    basicConfig_bed_state_mg: () => import('@/views/workbench/basicConfig/bed_state_mg'),
    basicConfig_service_level_mg: () => import('@/views/workbench/basicConfig/service_level_mg'),
    basicConfig_service_added_type_mg: () => import('@/views/workbench/basicConfig/service_added_type_mg'),
    service_elder_bind:()=> import('@/views/workbench/basicConfig/elder_bind'),
    // 饮食
    eating_every_week_recipe: () => import('@/views/workbench/eating/every_week_recipe'),
    eating_meals_record: () => import('@/views/workbench/eating/meals_record'),
    eating_special_diet: () => import('@/views/workbench/eating/special_diet'),
    eating_eating_valid_record: () => import('@/views/workbench/eating/eating_valid_record'),
    eating_foods_mg: () => import('@/views/workbench/eating/foods_mg'),
    eating_foods_type_mg: () => import('@/views/workbench/eating/foods_type_mg'),
    // 财务
    finance_mg: () => import('@/views/workbench/finance/finance_manage/finance_mg'),
    finance_detail: () => import('@/views/workbench/finance/finance_manage/handle/finance_detail'),
    billing_details: () => import('@/views/workbench/finance/finance_manage/handle/billing_details'),
    entry_details: () => import('@/views/workbench/finance/return_manage/handle/entry_details'),
    finance_cost_mg: () => import('@/views/workbench/finance/finance_manage/handle/cost_mg'),
    finance_return_money_mg: () => import('@/views/workbench/finance/return_manage/return_money_mg'),
    finance_return_money_detail: () => import('@/views/workbench/finance/return_manage/handle/return_money_detail'),
    finance_cost_sum: () => import('@/views/workbench/finance/finance_manage/handle/cost_sum'),
    transfer_other: ()=> import('@/views/workbench/finance/finance_manage/handle/transfer_other'),
    withdrawals:()=>import("@/views/workbench/finance/finance_manage/handle/withdrawals"),
    pay_play:()=>import('@/views/workbench/finance/finance_manage/handle/pay_play'),
    // 入住
    goLive_list: () => import('@/views/workbench/goLive/list'),
    goLive_form_apply: () => import('@/views/workbench/goLive/form/apply/index'),
    goLive_form_apply_detail: () => import('@/views/workbench/goLive/form/apply_detail/index'),
    goLive_form_pay_fee: () => import('@/views/workbench/goLive/form/pay_fee/index'),
    goLive_form_examination: () => import('@/views/workbench/goLive/form/examination/index'),
    goLive_form_ability_assess: () => import('@/views/workbench/goLive/form/ability_assess'),
    goLive_form_customServers: () => import('@/views/workbench/goLive/form/customServers/index'),
    goLive_form_payment_plan: () => import('@/views/workbench/goLive/form/payment_plan/index'),
    goLive_form_verify: () => import('@/views/workbench/goLive/form/verify/index'),
    goLive_form_contract_signing: () => import('@/views/workbench/goLive/form/contract_signing'),
    goLive_form_check_in: () => import('@/views/workbench/goLive/form/check_in/index'),
    // 在住
    inLive_handle_list: () => import('@/views/workbench/inLive/handle/list'),
    inLive_contract_list: () => import('@/views/workbench/inLive/contract/list'),
    inLive_contract_renew: () => import('@/views/workbench/inLive/contract/renew'),
    inLive_handle_form_apply_back: () => import('@/views/workbench/inLive/handle/form/apply_back'),
    inLive_handle_form_refund_info: () => import('@/views/workbench/inLive/handle/form/refund_info'),
    inLive_payment_plan_list: () => import('@/views/workbench/inLive/payment_plan/list'),
    inLive_payment_plan_info: () => import('@/views/workbench/inLive/payment_plan/info/index'),
    inLive_bunk_resize_list: () => import('@/views/workbench/inLive/bunk_resize/list'),
    inLive_bunk_resize_form_apply: () => import('@/views/workbench/inLive/bunk_resize/form/apply/index'),
    inLive_server_level_resize_list: () => import('@/views/workbench/inLive/server_level_resize/list'),
    inLive_server_level_resize_form_apply: () => import('@/views/workbench/inLive/server_level_resize/form/apply/index'),
    inLive_holiday_list: () => import('@/views/workbench/inLive/holiday/list'),
    inLive_holiday_apply: () => import('@/views/workbench/inLive/holiday/apply'),
    inLive_addedValue_list: () => import('@/views/workbench/inLive/addedValue/list'),
    inLive_special_foods_list: () => import('@/views/workbench/inLive/special_foods/list'),
    inLive_handle_form_case_file: () => import('@/views/workbench/inLive/handle/form/case_file/index'),
    inLive_handle_form_CV_record: () => import('@/views/workbench/inLive/handle/form/CV_record'),
    inLive_handle_form_add_not_good_event: () => import('@/views/workbench/inLive/handle/form/add_not_good_event'),
    inLive_birthday_list: () => import('@/views/workbench/inLive/birthday/list'),
    // 营销
    marketing_visited_record: () => import('@/views/workbench/marketing/visited_record'),
    marketing_come_appointment: () => import('@/views/workbench/marketing/come_appointment'),
    marketing_come_record: () => import('@/views/workbench/marketing/come_record'),
    marketing_come_signIn: () => import('@/views/workbench/marketing/come_signIn'),
    marketing_willing_client: () => import('@/views/workbench/marketing/willing_client'),
    marketing_willing_client_signIn: () => import('@/views/workbench/marketing/willing_client_signIn'),
    marketing_house_layout: () => import('@/views/workbench/marketing/house_layout'),
    marketing_product_display: () => import('@/views/workbench/marketing/product_display'),
    marketing_is_satisfied: () => import('@/views/workbench/marketing/is_satisfied'),
    marketing_return_visit: () => import('@/views/workbench/marketing/return_visit'),
    marketing_return_visit_signIn: () => import('@/views/workbench/marketing/return_visit_signIn'),
    marketing_retreat_interview: () => import('@/views/workbench/marketing/retreat_interview'),
    marketing_retreat_interview_signIn: () => import('@/views/workbench/marketing/retreat_interview_signIn'),
    // 退住管理
    outLive_handle_list: () => import('@/views/workbench/outLive/handle/list'),
    outLive_handle_apply: () => import('@/views/workbench/outLive/handle/apply'),
    outLive_handle_verify: () => import('@/views/workbench/outLive/handle/verify'),
    outLive_handle_confirm: () => import('@/views/workbench/outLive/handle/confirm'),
    outLive_handle_final: () => import('@/views/workbench/outLive/handle/final'),
    // 后勤
    rearServices_assets_fixed: () => import('@/views/workbench/rearServices/assets_fixed'),
    rearServices_warehouse: () => import('@/views/workbench/rearServices/warehouse'),
    rearServices_purchasing_mg: () => import('@/views/workbench/rearServices/procurement/purchasing_mg'),
    rearServices_purchasing_verify: () => import('@/views/workbench/rearServices/procurement/purchasing_verify'), //服务
    rearServices_purchasing_detail:()=>import('@/views/workbench/rearServices/procurement/purchasing_detail'),
    rearServices_purchasing_aduit:()=>import('@/views/workbench/rearServices/procurement/purchasing_aduit'),
    rearServices_goods_list:()=>import('@/views/workbench/rearServices/goodsManager/list'),
    rearServices_goods_type_list:()=>import('@/views/workbench/rearServices/goodsManager/type'),
    rearServices_supplier_list:()=>import('@/views/workbench/rearServices/supplier_mg'),
    rearServices_inventory_list:()=>import('@/views/workbench/rearServices/inventory_mg'),
    rearServices_handle_record:()=>import('@/views/workbench/rearServices/handle/record'),
    rearServices_outbound_detail:()=>import('@/views/workbench/rearServices/handle/outbounddetail'),
    rearServices_putbound_detail:()=>import('@/views/workbench/rearServices/handle/putbounddetail'),
    services_care_for_plan: () => import('@/views/workbench/services/care_for_plan'),
    services_care_for_imp: () => import('@/views/workbench/services/care_for_imp'),
    services_care_for_record: () => import('@/views/workbench/services/care_for_record'),
    services_care_for_team: () => import('@/views/workbench/services/care_for_team'),
    services_care_for_scheduling: () => import('@/views/workbench/services/care_for_scheduling'),
    services_handover_work: () => import('@/views/workbench/services/handover_work'),
    services_handover_work_detail: () => import('@/views/workbench/services/handover_work_detail'),
    services_oldman_log: () => import('@/views/workbench/services/oldman_log'),
    service_project_list: () => import('@/views/workbench/services/service_project'),
    shift_manage: () => import('@/views/workbench/services/shift_manage'),
    services_record_temperature: () => import('@/views/workbench/services/record/temperature'),
    services_record_patrol: () => import('@/views/workbench/services/record/patrol'),
    services_record_defecation: () => import('@/views/workbench/services/record/defecation'),
    services_record_rollover: () => import('@/views/workbench/services/record/rollover'),
    services_record_hygiene: () => import('@/views/workbench/services/record/hygiene'),
    services_record_bodyWeight: () => import('@/views/workbench/services/record/bodyWeight'),
    services_record_eating: () => import('@/views/workbench/services/record/eating'),
    services_record_special_things: () => import('@/views/workbench/services/record/special_things'),
    services_record_bath: () => import('@/views/workbench/services/record/bath'),
    service_elder_bind:()=> import('@/views/workbench/basicConfig/elder_bind'),

    //统计
    sum_Index: () => import('@/views/workbench/sum/index'),
}

export default old_dir