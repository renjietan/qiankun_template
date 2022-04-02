export const payment = {
  path: "/payment_method",
  component: "AppMain",
  redirect: '/payment_method/index',
  name: 'payment_method',
  title: '付款方式',
  icon: 'assess',
  children: [
    {
    path: 'index',
    component: "payment_method",
    name: 'payment_method_list',
    title: '付款方式',
    icon: 'pgzx'
  },
    {
    path: 'add_payment_method',
    hidden: true,
    component: "add_payment_method",
    name: 'add_payment_method',
    title: '新增',
    icon: 'pgzx'
  },
]
};