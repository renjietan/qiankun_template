import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 公共样式
import variables from '@/styles/variables.scss';
import App from './App'
import store from './store'
import router from './router'

import './icons' 
import './permission' 
import './utils/error-log'

import * as filters from './filters'
import { InfiniteScroll } from 'element-ui';
import openMsg from '@/components/MsgBox';
import chaining from "@/directive/chaining";

const no_data = require("./assets/images/no_data.png")

Vue.use(InfiniteScroll) 
Vue.use(chaining)
Vue.config.devtools = true
Vue.use(Element, {
  size: Cookies.get('size') || 'small',
})
Vue.prototype.no_data = no_data
Vue.prototype.$variables = variables
Vue.prototype.$openMsg = openMsg

// Vue.prototype.$messgebox = Element.MessageBox()
// 全局注入过滤函数
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局创建event_bus
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

})
