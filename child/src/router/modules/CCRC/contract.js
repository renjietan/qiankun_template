export const contract = {
  path: "/sign_contract",
  component: "AppMain",
  redirect: '/sign_contract/index',
  name: 'sign_contract',
  title: '签约管理',
  icon: 'assess',
  children: [
    {
    path: 'index',
    component: "sign_contract_list",
    name: 'sign_contract_list',
    title: '签约管理',
    icon: 'pgzx'
  },
]
};