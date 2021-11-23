import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 公共样式

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import chaining from "@/directive/chaining";

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.use(chaining)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // 设置elementUI初始尺寸
})

// 全局注入过滤函数
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

})
