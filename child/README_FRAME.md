### **目录结构**

> build                      # 构建相关
>
> node_modules             # 第三方包
>
> plop-templates             # 基本模板
>
> public                     # 静态资源
>
   >> favicon.ico            # favicon图标
   >>
   >> index.html             # html模板
   >>
> src                        # 源代码
>
   >> api                    # 所有请求
   >>
   >> assets                 # 主题 字体等静态资源
   >>
   >> components             # 全局公用组件
   >>
   >> directive              # 全局指令
   >>
   >> filters                # 全局 filter
   >>
   >> icons                  # 项目所有 svg icons
   >>
   >> layout                 # 全局 layout
   >>
   >> router                 # 路由
   >>
   >> store                  # 全局 store管理
   >>
   >> styles                 # 全局样式
   >>
   >> utils                  # 全局公用方法
   >>
   >> vendor                 # 公用vendor
   >>
   >> views                  # views 所有页面
   >>
   >> App.vue                # 入口页面
   >>
   >> main.js                # 入口文件 加载组件 初始化等
   >>
   > permission.js           # 权限管理
   >>
> tests                      # 测试
>
> .env.xxx                   # 环境变量配置
>
> .editorconfig              # 格式化配置文件
>
> .eslintrc.js               # eslint 配置项
>
> ..gitignore                # git 配置项
>
> .babel.config.js           # babel-loader 配置
>
> jest.config.js             # 测试配置框架
>
> jsconfig.json              # 路径转化
>
> package.json               # 项目描述文件
>
> plopfile.js                # 自动化生成模板
>
> postcss.config.js          # 将px转为rem
>> README_ES & JS.md          # es & js
>
> README_FRAME.md            # vue框架讲解
>
> README_NOTE.md             # vue相关代码片段
>
> README_VUE.md              # vue基本知识
>
> vue.config.js              # webpack基础配置文件


### **规范**
- 注释
    - 工具类函数必须添加注释
    - 画页面，根据不同的区域，进行注释说明
- api命名
    ```
     例如服务地址为【/app/auth/login】，需在api下新建app文件，在app文件 添加函数login
    ```
- 方法以及命名
  - 单词之间使用 _ 
  - 禁止使用单词+数字的方式进行拼接



