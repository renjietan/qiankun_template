import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css";
import { getToken, getOrgInfo,getRouter,getAccount_type } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";
import { deepClone } from "@/utils/index";
import path from "path";
import { views_dir } from "@/router/view_dir/views_dir";

NProgress.configure({ showSpinner: false }); // 进度条配置
const getFlatRoutes = routes => {
  return routes.map(child => {
    child.component = views_dir[child.component];
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child);
    }
    return child;
  });
};
const formatRouter = (routes, basePath = "/", list = [], parent) => {
  routes.map(item => {
    if (item.component) {
      item.component = views_dir[item.component];
    } else {
      delete item.component;
    }
    item.path = path.resolve(basePath, item.path);
    const meta = item.meta || {};
    if (!meta.parent && parent && item.title) {
      meta.parent = parent.path;
      item.meta = meta;
    }
    if (item.redirect) item.redirect = path.resolve(basePath, item.redirect);
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, item);
      delete item.children;
      list.concat(arr);
    }else{ 
      delete item.children;
    }
    list.push(item);
  });
  return list;
};
const whiteList = ["/login"]; // 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 设置标题
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();
  const orginfo = getOrgInfo();
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登陆，重定向到首页
      next({ path: "/" });
      NProgress.done();
    } else {
      next()
      //删除-开始
      // if (store.getters.permission_routes.length > 0) {
      //   next();
      // } else {
      //   try {
      //     const { accId } = await store.dispatch("user/getUserInfo");
      //     let accessRoutes = [];
      //     if(orginfo){
      //       accessRoutes= await store.dispatch(
      //         "permission/find_admin_Menu",
      //         orginfo.id
      //       );
      //     }else{
      //         accessRoutes = await store.dispatch(
      //         "permission/generateRoutes",
      //         accId
      //       );
      //     }
      //     const flatRoutes = deepClone(accessRoutes, ["component"]);
      //     const temp = getFlatRoutes(flatRoutes);
      //     router.addRoutes(temp);
      //     next({ ...to, replace: true });
      //   } catch (error) {
      //     await store.dispatch("user/resetToken");
      //     Message.error(error || "获取权限出现未知错误");
      //     next(`/login?redirect=${to.path}`);
      //     NProgress.done();
      //   }
      // }
      //删除-结束
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
