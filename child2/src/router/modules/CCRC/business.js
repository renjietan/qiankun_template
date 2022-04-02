export const business = {
  path: "/CCRC/business_parameters",
  component: "AppMain",
  redirect: '/CCRC/business_parameters/index',
  name: 'business_parameters',
  title: '业务参数',
  icon: 'assess',
  children: [
    {
    path: 'index',
    component: "business_parameters",
    name: 'business_parameters_list',
    title: '业务参数',
    icon: 'pgzx'
  },
    {
    path: 'group_mg',
    component: "business_parameters_group_mg",
    name: 'business_parameters_group_mg',
    title: '集团管理',
    icon: 'pgzx'
  },
    {
    path: 'company_mg',
    component: "business_parameters_company_mg",
    name: 'business_parameters_company_mg',
    title: '公司管理',
    icon: 'pgzx'
  },
]
};