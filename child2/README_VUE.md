### **基本介绍**
vue属于一套前后端分离框架，适用于非服务端渲染的项目构建，
优点：
1、维护成本低，
2、代码重复率低、解耦性较高
3、降低服务器压力
4、首页加载快
缺点：
1、不利于SEO优化
2、对低版本IE的支持程度较低
- MVVM
  - Model：数据层
  - View：视图展示层
  - ViewModel：逻辑处理层
    - user => view <=> ViewModel <=> Model
- MVP（Model-View-Presenter）
  - Model：数据层
  - View：视图展示层
  - Presenter：逻辑处理层
  - 基本逻辑
    - user => view => Presenter => model => Presenter => view
- MVC
  - Model: 提供数据
  - View：视图展示层
  - Controller：逻辑处理层
  - 基本逻辑
    - user => view => controller => model  => view
    - user => controller => model => view


### **vue需掌握以下模块**
- 指令集
  - 自有指令集
  - 自定义指令集
- template
  - 函数模板
  - 普通模板
- 路由
  - 路由前置守卫
  - 路由后置守卫
- 状态管理器
  - state
  - getter
  - modules
  - actions
  - mutations
- 组件
  - 页面
  - 小部件
- 事件处理
  - 普通事件
  - 事件修饰符
- 监听器、过滤器、计算器
### **Vue方法**
- Vue.use
  - 继承第三方库
- filters
  - 过滤器
    ```
      filters: {
          parse() {
              return 2
          }
      },
      
      <template>
        <div>
          {{ data  | parse}}
        </div>
      </template>
    ```
  - 
- watch
  - 数据监听
    ```
      // 常规
      watch: {
          data(newval,oldval) {
              console.log(newval)
          },
      },
      // 深度监听
      watch: {
          data(newval,oldval) {
              console.log(newval)
          },
          deep: true
      },
      // 变量初始化时，是否立即触发
      watch: {
          data(newval,oldval) {
              console.log(newval)
          },
          immediate: true
      },
    ```
  - 数据监听

- computed
  - 计算属性
    ```
      data_test: function() {
          return this.data + this.data2
      }
      <template>
        <div>
          {{ data_test }}
        </div>
      </template>
   ```
- $forceUpdate()
  - 强制更新
    ```
      this.$forceUpdate()
    ```
- $nextTick()
  - 当页面实例渲染完成后，开始执行
    ```
      this.$nextTick()
    ```
### **指令集**
- 自有指令集
  - v-if：传入boolen值，来决定元素是否显示
  - v-show: 传入boolen值，来决定元素是否显示， 与v-if的区别是， v-if传入false时，dom元素被移除，为true时，dom元素将被重新渲染，而v-show只是单纯的显示、隐藏DOM元素，并不会移除DOM元素
  - v-for：列表循环dom元素
  - v-bind:[attr] 或 :[attr]
    - v-bind:class | :class
      ```
        {blue: data.length % 2 }
        [data.length % 2 == 0 ? "blue" : "red" ]
      ```
    - v-bind:style | :style
      ```
        {background: data.length % 2 == 0 ? "red" : "blue"  }
      ```
  - v-on:[event] 或 @[event]  
  - v-model 或 {{  }}
  - v-html: 向元素插入innerHTML
  - v-text: 向元素插入InnerText,DOM元素必须具备关闭标签，
- 自定义指令集
  - 钩子函数
    - bind: 只调用一次
    - inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
    - update: 被绑定元素所在的模板更新时调用
    - componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
    - unbind: 只调用一次， 指令与元素解绑时调用
  - 参数说明
    - el：指令所绑定的元素，可以用来直接操作 DOM 。
    - vnode: Vue 编译生成的虚拟节点
    - binding: 一个对象，类似event,包含以下属性：
      - name: 指令名，不包括 v- 前缀。
      - 指令的绑定值， 
        - 例如： v-dir=”1 + 1”, value 的值是 2。
      - 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      - expression: 绑定值的字符串形式。 
        - 例如 v-my-directive=”1 + 1” ，expression 的值是 “1 + 1”。
      - arg: 传给指令的参数。
        - 例如 v-my-directive:foo， arg 的值是 “foo”。
      - modifiers: 一个包含修饰符的对象。 
        - 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
  - 注意
    - 除了el以外，其他的参数只可读，不可轻易修改值， 如果一定要修改值，可以通过vnode的dataset去设置值
  - 举例说明：  
    ```
      Vue.directive("dir", {
        bind(el, binding, vnode) {
          ///todo something
        },
        inserted(el, binding, vnode) {
          ///todo something
        },
        componentUpdated(el, binding, vnode) {
          ///todo something
        },
        unbind(el, binding, vnode) {
          ///todo something
        },
      })
    ```

### **路由**
- 路由三大基本概念
  - route：单个路由
  - routes: 路由集合
  - router：路由管理器
- 路由生产步骤
  - 注册
    ```
      import Vue from "vue";
      import VueRouter from "vue-router";
      Vue.use(VueRouter);
    ```
  - 生成路由实例
    ```
      const routes = [
        {
            path:"/home",
            component: home
        },
        {
            path: "/about/:id",     //动态路由
            component: about
        }
      ]
      var router =  new VueRouter({
        routes
      })
    ```
  - 导出模块
    ```
      export default router;
    ```
  - 注册到根实例
    ```
      new Vue({
        el: '#app',
        router,
        render: h => h(App),
      })
    ```
- 路由监听
  ```
    watch: {
      $route: {
        deep: true,
        handle: function(to,from) {
        
        }
      }
    }
  ```
- 路由前置守卫
  - router.beforeEach(to, from, next)
    - to: 即将跳转的路由
    - from：离开的路由
    - next()：路由释放
- 路由后置守卫
  - router.afterEach()
    - to: 即将跳转的路由
    - from：离开的路由
- 路由跳转
  ``` 
    // url中将显示参数
    this.$router.push({
        path: "/test2/list",
        query: {
            data: 1
        }
    })      
    // 简化跳转
    this.$router.push("url")      
    // url中不携带参数，参数会传入组件中
    this.$router.push({
        name: "list",
        params: {
          data: 1
        }
    })
  ```
  

### **状态管理器**
- Vuex 状态管理器
  - state：状态初始化
  - mutations: 同步状态更新
  - actions: 异步状态更新
  - getters：计算属性，便于状态监听
  - modules: 状态模块化
    - 开启命名空间
- Vuex 生产步骤
  -  声明一个状态：
    ```
      const state = {
        token: getToken(),
      }
    ```
  - 定义mutactions，便于状态更新
    ```
      const mutations = {
        SET_TOKEN: (state, token) => {
          state.token = token
        },
      }
    ```
  - 定义actions，如果为异步操作，则需定义actions(非必须)
    ```
      const actions = {
        login({ commit }, userInfo) {
          const { username, password } = userInfo
          return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
              const { data } = response
              commit('SET_TOKEN', data.token)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },
      }
    ```
  - 导出
    ```
      export default {
        namespaced: true,
        state,
        mutations,
        actions
      }
    ```
  - 定义getter
    ```
      const getters = {
        token: state => state.user.token,
      }
      export default getters
    ```
  - 注册
    ```
      import Vue from 'vue'
      import Vuex from 'vuex' 
      Vue.use(Vuex)
    ```
  - 创建Vuex实例
    ```
      import app from './modules/app'
      const store = new Vuex.Store({
        app,
        getters
      })
    ```
  - 挂载到vue根实例
    ```
      new Vue({
        el: '#app',
        store,
        render: h => h(App),
      })
    ```
- Vuex 操作状态
  - 单向取值
  ```
    this.$store.state.token （不可赋值）
  ```
  - 混入
    - mapStates
    ```
      computed: {
        ...mapState(["user"])
      },
      console.log(this.user)
    ```
    - mapGetters
    ```
      computed: {
        ...mapGetters(["token"])
      },
      console.log(this.token)
    ```
    - mapMutactions
    ```
      methods: {
        ...mapMutations(["user/SET_TOKEN"]),
      },
      this["user/SET_TOKEN"](3)
    ```
    - mapActions
    ```
      methods: {
        ...mapActions(["login"]),
      },
      this["user/login"]({
          username: "admin",
          pasword: "123456"
      }).then(res => {
          
      })
    ```
  - dispatch
    ```
      this.$store.dispatch('user/login', {username: "admin", password: "123456").then(() => {
      })
    ```



### **模板**
- 组件传参
  组件内部不做任何前后端交互行为，最多只允许做数据处理
  - 父传子
    - 组件封装
      ```
        Componenta.vue
        <div>
          {{ value }}
        </div>
        props: {
          value: {
            type: String,
            required: true,
            default: ''
          },
        },
      ```
    - 如何使用？
      ```
        <Componenta value="1111"></Componenta>
      ```
  - 子传父
    - 组件封装
      ```
        Componenta.vue
        <div @click="handClick"></div>
        methods: {
          handleClick() {
              this.$emit("handleEvent", "子传父")
          }
        }
        ```
      - 如何使用
        ```
          <Componenta @handleEvent="handleClick"></Componenta>
          methods: {
            handleClick(value) {
                console.log(value)
            }
          }
      ```
- 函数式组件

    ```
      case1:
        <template functional>

        </template>
      case2:
        <router-view></router-view>
    ```

### **BUS总线**
- 全局bus，在main中加入：
  ```
    var EventBus = new Vue();
    Object.defineProperties(Vue.prototype, {
      $bus: {
        get: function () {
          return EventBus
        }
      }
    })
  ```
- 发布
  ```
    this.$bus.$emit('msg', "22222");
  ```
- 订阅
  ```
    var self = this
    self.$bus.$on("msg", function(msg) {
        self.msg = msg
    })
  ```
