import axios from 'axios'
import { MessageBox, Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Encrypt } from './encrypt.js';
import { debounce } from '@/utils'
import {
  getErrMsg, ERR_CODE_API
} from '@/utils/http-error-msg'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 跨域请求时发送cookie
  timeout: 5000
})

// 服务拦截器
service.interceptors.request.use(
  config => {
    var time = new Date().getTime()
    var info = store.getters

    if (info.token) {
      config.headers['token'] = getToken()
      time = Encrypt(time, info.token.substring(0, 16), info.token.substring(info.token.length - 16, info.token.length))
      config.headers["time"] = time
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.msg || ERR_CODE_API[res.code],
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const { errCode, errMsg } = getErrMsg(error)
    if (errCode === 403 || errCode === 401) {
      MessageBox.confirm('您已经登出，您可以取消停留在此页面，或再次登录', '确认退出？', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: `${errCode || ''}：${errMsg}`,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
