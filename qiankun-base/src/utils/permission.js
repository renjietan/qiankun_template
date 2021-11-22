import store from '@/store'

/**
 * @functionName 权限切换
 * @param {Array} value
 * @description
 * @author 谭人杰
 * @date 2020-06-11 14:24:44
*/
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    return false
  }
}
