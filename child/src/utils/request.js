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
  // baseURL: "http://47.101.185.231:8358/",
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 5000
})

// 服务拦截器
service.interceptors.request.use(
  config => {
    var time = new Date().getTime()
    var info = store.getters
    if (config.data) {
      config.data = config.data ?? {}

      config.data.centerId = config.data.centerId ? config.data.centerId : info.orgInfo?.id ?? info.userInfo?.centerId
      config.data.operatorId = info.userInfo?.empId
      config.data.operator = info.userInfo?.empNm


    } else {
      config.params = config.params ?? {}

      config.params.centerId = config.params.centerId ? config.params.centerId : info.orgInfo?.id ?? info.userInfo?.centerId
      config.params.operatorId = info.userInfo?.empId
      config.params.operator = info.userInfo?.empNm



    }

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

    if (res.returnCode !== 0 && res.code !== 0) {
      Message({
        message: res.returnMsg || res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.returnMsg || res.message || 'Error'))
    } {
      return res.body ?? res;
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
    console.log(error);
    return Promise.reject(error)
  }
)

export default service
