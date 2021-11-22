import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login'] // 白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 设置标题
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
     // 如果已登陆，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.permission_routes
      if (store.getters.permission_routes.length > 0) {
        next()
      } else {
        try {
          const { id } = await store.dispatch('user/getUserInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', id)
          // 动态加入路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || '获取权限出现未知错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
