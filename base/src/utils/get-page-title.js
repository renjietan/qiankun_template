import defaultSettings from '@/settings'

const title = defaultSettings.title || '后台管理系统'
/**
 * @functionName 获取页面title
 * @param {string} pageTitle
 * @description
 * @author 谭人杰
 * @date 2020-06-11 09:51:50
*/
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
