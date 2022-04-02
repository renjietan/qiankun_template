import { asyncRoutes, constantRoutes, asyncRoutes_CCRC } from "@/router";
import { parser_Add_path as parseTree } from "@/utils/index";
import { getRouter } from "@/api/system/auth";
import {find_admin_Menu} from "@/api/system/system_account"

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    let r = constantRoutes.concat(routes);
    parseTree(r);
    state.routes = r;
  }
};

const actions = {
  generateRoutes({ commit }, accId) {
    return new Promise(resolve => {
      getRouter({ accId }).then(res => {
        let accessedRoutes = !!res.length?parseTree(res):[];
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    });
  },
  find_admin_Menu({commit},centerId){
    return new Promise(resolve => {
      find_admin_Menu({centerId}).then(res => {
        let accessedRoutes =  !!res.length?parseTree(res):[];
        
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
