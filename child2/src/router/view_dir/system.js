/**
 *  菜单 角色 基础设置权限路由映射
 */
const system_dir = {
      //机构选择
  select_item: () => import('@/views/login/select_team'),
  system_account_mg: () => import('@/views/system/system/account_mg'),
  system_role_mg: () => import('@/views/system/system/role_mg'),
  system_menu_mg: () => import('@/views/system/system/menu_mg'),
  system_system_log: () => import('@/views/system/system/system_log'),
  system_dict_mg: () => import('@/views/system/system/dict_mg'),
}
export default system_dir; 