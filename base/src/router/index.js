import Vue from 'vue'
import Router from 'vue-router'
import { getAccount_type,} from "@/utils/auth";
Vue.use(Router)

/**
 * @description 
 * hidden: true                   当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * 
 * alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * 
 * redirect: noRedirect           重定向：当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，防止<keep-alive>时出现问题
 * meta : {
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: false                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  如果设置为true，它则会固定在tags-view中(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    activeMenu: '/example/list'  当路由设置了该属性，则会高亮相对应的侧边栏。
                                 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
                                 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  }
 * @author 谭人杰
 * @date 2020-06-11 15:32:43
*/


/**
 * @description 白名单页，无需权限即可访问
 * @author 谭人杰
 * @date 2020-06-11 15:31:37
*/
export const constantRoutes = [
  

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/system/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/system/error-page/401'),
    hidden: true
  },
   {
     path:'/',
     redirect:getAccount_type()==='P'||getAccount_type()==='S'?'/select_team':'/workbench/index',
   },
   {
     path:'/select_team',
     component:()=>import('@/views/login/select_team')
   },
  {
    path:'/org_manage',
    name:'org_manage',
    component:()=>import('@/views/system/org-msg/index'),
    hidden:true
  },
  {
    path:'/accout_manage',
    name:'accout_manage',
    component:()=>import('@/views/system/account-manage/index'),
    hidden:true
  },
]

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history'
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置router
}

export default router
