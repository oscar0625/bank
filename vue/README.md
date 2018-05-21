1.构建vue的项目
  1.全局安装 vue-cli(vue官方提供的脚手架)
    npm install --global vue-cli
  2.创建一个基于 webpack 模板的新项目
    vue init webpack my-project
  3.安装依赖，走你
    cd my-project
    npm install
  4.运行
    # serve with hot reload at localhost:8080
    npm run dev  //生产模式 搭建环境

    # build for production with minification
    npm run build  //上线模式 打包整个项目 dist整个文件  直接打开index.html看不了 需要服务器环境 (cnpm install -g httpserver)

    # build for production and view the bundle analyzer report
    npm run build --report

2.webstorm关于vue的配置
file-->setting -->file Types -> *.vue
http://blog.csdn.net/s8460049/article/details/53856534
下载插件 要翻墙

打包后的项目在dist文件下,需要放在服务器运行
下载：npm install http-server -g
运行：在dist文件目录下 命令行输入  http-server

3.vue优势：
  1.轻量级的前端界面框架
  2.2016年10月发布最新2.0版本，更强大，更极速
  3.数据渲染／数据同步 双向绑定
  4.组件化／模块化
  5.路由、ajax、数据流

4.参考
  中文网：https://cn.vuejs.org
  api:https://cn.vuejs.org/v2/api/#选项-数据

5.Vuejs特点：
  1.数据双向绑定
  2.组件化／模块化
  3.但文件组件：js、css、html共存与一个文件中
  4.打包工具：webpack+vue-loader／browserify-vueify





6.vue基本用法：
  1.创建组件
    注意：template里只能存在一个根容器
  2.v-html、v-text
  3.三目运算符
  4.列表渲染：v-for
    1.数组
    2.对象
    3.组件
  5.列表数据同步更新
  6.事件绑定
  7.计算属性

7.vue深入操作
  1.组件之间的通信
    父传子：props
    子传父：emit(自定义事件)
    插槽：slot
  2.vue的过度效果
    会有 4 个(CSS)类名在 enter/leave 的过渡中切换
    v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
    v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
    v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
    v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。
  3.自定义指令
    1.全局指令
    2.局部指令
