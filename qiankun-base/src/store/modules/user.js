import {
  login,
  logout,
  findByToken
} from '@/api/auth'
import {
  getToken,
  setToken,
  removeToken,
  getOrgInfo,
  setOrgInfo,
  removeOrgInfo,
  getUserInfo,
  setUserInfo,
  removeUserInfo
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  userInfo: getUserInfo(),
  orgInfo: getOrgInfo()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },

  SET_ORG: (state, orgInfo) => {
    state.orgInfo = orgInfo
  },
}

const actions = {

  // 登录
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        account: username.trim(),
        password: password
      }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setOrgInfo({
    commit,
  }, data) {
    return new Promise((resolve, reject) => {
      commit("SET_ORG", data)
      setOrgInfo(data)
      resolve()
    })

  },
  getUserInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {

      findByToken({
        token: state.token
      }).then(response => {
        if (!response) {
          reject('获取用户信息失败，请重新登陆')
        }
        commit("SET_USERINFO", response)
        setUserInfo(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', '')
      commit('SET_ORG', ''),
        removeToken()
      resetRouter()
      removeOrgInfo()
      removeUserInfo(),
        dispatch('tagsView/delAllViews', null, {
          root: true
        })
      resolve()
      // logout({
      //   token: state.token
      // }).then(() => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resetRouter()
      //   dispatch('tagsView/delAllViews', null, { root: true })
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 删除TOKEN
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 更改权限
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getUserInfo')

      resetRouter()

      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      router.addRoutes(accessRoutes)

      //重置已访问的视图和缓存的视图
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
