import AppMain from '@/layout'
import old_dir from './old'
import ccrc_dir from './ccrc';
import system_dir from './system';
export const views_dir = {
  AppMain,

  // ---------------------------------------------------养老机构--------------------------------------------------------
  ...old_dir, 
  // ---------------------------------------------------销售机构--------------------------------------------------------
  ...ccrc_dir,
  // ---------------------------------------------------菜单系统--------------------------------------------------------
  ...system_dir
}
