import { login, logout, findByToken } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  // name: '',
  // avatar: '',
  // introduction: '',
  // roles: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_INTRODUCTION: (state, introduction) => {
  //   state.introduction = introduction
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      findByToken({
        token: state.token
      }).then(response => {
        const { data } = response
        if (!data) {
          reject('获取用户信息失败，请重新登陆')
        }
        // const { id, nickname, phone, } = data
        // commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        commit("SET_USERINFO", data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout({
        token: state.token
      }).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除TOKEN
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 更改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getUserInfo')

      resetRouter()

      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      router.addRoutes(accessRoutes)

      //重置已访问的视图和缓存的视图
      dispatch('tagsView/delAllViews', null, { root: true })

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
