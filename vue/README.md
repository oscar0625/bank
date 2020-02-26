# 一、vue-cli
https://cli.vuejs.org/zh/guide/
https://cli.vuejs.org/zh/config/
## 1.安装Vue Devtools
在谷歌商店搜索Vue.js devtools安装
## 2.快速构建项目
3.0之后的新版本
```
npm install -g @vue/cli
vue create my-project
选择配置
->Manually select features
->Babel, Router, Vuex, CSS Pre-processors, Linter, Unit, E2E
->yes
->Less
->ESLint + Prettier
->Lint on save
->Jest
->Cypress
->In dedicated config files
->yes  // 是否记录一下以便下次继续使用这套配置
->commonConfig //通用配置 下次可以直接使用不用再重复上述步骤
```
3.0之前的老版本
```
npm install -g vue-cli
vue init webpack my-vue
```
## 3.环境变量
Vue CLI 自带的环境变量
```

    判断模式的环境变量
    process.env.NODE_ENV 
        development 模式用于 vue-cli-service serve
        production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e
        test 模式用于 vue-cli-service test:unit
    基础路径的环境变量    
    process.env.BASE_URL
```
自定义环境变量
```
    //创建 .env文件
    为一个特定模式准备的环境文件的 (例如 .env.production) 将会比一般的环境文件 (例如 .env) 拥有更高的优先级。
    .env                # 在所有的环境中被载入
    .env.[mode]         # 只在指定的模式中被载入

    //编写 .env文件
    只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中
    VUE_APP_SECRET=secret

    //访问
    process.env.VUE_APP_SECRET
```

## 4.其他
```
    构建一个多页应用    https://cli.vuejs.org/zh/config/#pages
```

# 二、vue语法
## 1.插值  
### 1.1 文本插值
支持变量 表达式( 但只支持简单的单个表达式 如三目运算，同样支持Math 和 Date) 函数
```
    <div>{{ oscar }}</div>
    <div>{{ number + 1 }}</div>
    <div>{{ ok ? 'YES' : 'NO' }}</div>
    <div>{{ message.split('').reverse().join('') }</div>
```
### 1.2 HTML插值
注意：尽量多地使用 vue自身的模板机制，减少HTML插值的使用
```
    <div v-html="oscar"></div> 
```
## 2.属性绑定
### 2.1 v-bind
```
    <div v-bind:id="变量"></div> 简写 <div :id="变量"></div>
```
### 2.2 类名绑定 v-bind:class
我们可以通过字符串、数组和对象三种方式为节点动态绑定类名属性
```
    <div v-bind:class="className"></div>
    data () {
        return {
            //字符串方式同html一样
            //数组方式，数组每一项的值，将作为该元素的类名
            className:['c1','c2'],
            //对象方式，对象的键名，将作为该元素的类名。当键值被判定为真时，该类名将被成功绑定
            className: {
                c1: true,
                c2: false
            }
        }
    }
```
### 2.3 样式绑定 v-bind:style
样式绑定同类名绑定一样都有三种方式
```
    <div v-bind:style="style"></div>
    data () {
        return {
            //字符串方式同html一样
            //数组方式
            style:[{ color: 'red'}, {fontSize:'13px'}],
            //对象方式
            style: {
                color: 'red',
                fontSize: '13px'
            }
        }
    }
```
## 3.事件绑定
vue封装事件的意义：
1.无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
2.解决不同浏览器之间的兼容问题。
3.当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。
4.提供了事件绑定修饰符
### 3.1 v-on
```
    <a v-on:click="doSomething"></a> 简写 <a @click="doSomething"></a>
```
### 3.2 事件对象 event
```
    //在事件函数doSomething不必传参时，不带()，默认会传递 event对象
    <a v-on:click="doSomething"></a>
    //手动传入$event对象
    <a v-on:click="doSomething($event)"></a>
```
### 3.3 事件修饰符
```
    修饰符可以串联 <a @click.stop.prevent="doSomething"></a>
    .stop    //阻止冒泡
    .prevent //阻止默认
    .once    //2.1.4开启 只执行一次
    .self    //只当事件在该元素本身（而不是子元素）触发时触发回调
    .capture //开启捕获模式
    键盘修饰符
        @keyup.enter="fn"
    鼠标修饰符
        @click.left="fn"
        @click.right="fn"
        @click.middle="fn"
    组合修饰符    
        <div @click.ctrl="doSomething">必须先按下ctrl 再点击才有效果</div>
```
## 4.双向绑定 v-model
v-model为可输入元素创建双向数据绑定，它会根据元素类型自动选取正确的方式来更新元素。（永远是为了拿到值 好向后台传啊！！！）
注：v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值。因为它会选择 Vue 实例数据来作为具体的值。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
### 4.1 单行和多行文本
```
    <input  type="text" v-model="textValue">
    <textarea v-model="textValue"></textarea>
```
### 4.2 单选框
```
    <label for=""><input type="radio" value="boy"  v-model="radioValue" >男</label>
    <label for=""><input type="radio" value="girl"  v-model="radioValue" >女</label>
```
### 4.3 复选框
用法1:正常的多选物品
```
    <input type="checkbox" v-model='checkedArr' value="衣服">衣服
    <input type="checkbox" v-model='checkedArr' value="裤子">裤子
    <input type="checkbox" v-model='checkedArr' value="鞋">鞋
    data () {
        return {
            checkedArr: []  //checkedArr是一个数组, 保存着多个复选框的value值 ["衣服", "裤子", "鞋"]
        }
    }
```
用法2:用复选框做开关时
```
    <input type="checkbox" v-model='checkedValue'>
    data () {
        return {
            checkedValue: true
        }
    }
```
两种用法解释：用法1正常的多选物品,目的是为了获取到用户所有选中的复选框的值，为了保存这些值，我们要用数组,所以checked是一个数组，这里有一个难理解的地方，就是比如多选框只有一个，那么checked是不是可以不用数组，该用字符串或者数字保存这个值那？但是其实是不可以的，因为如果checked是一个数字/字符串，其实都会转换成布尔类型，就变成了用法2复选框做开关的情况了。
### 4.4 下拉框
由于视图表现太差 所以根本不用
```
    <select v-model="selectedValue">
        <option value="boy">男</option>
        <option value="girl">女</option>
    </select>
    data () {
        return {
            selectedValue: 'boy'
        }
    }
```
### 4.5 修饰符
```
    v-model.lazy=""  在默认情况下，v-model在 input 事件中同步输入框的值与数据 添加一个修饰符 lazy ，从而转变为在 change 事件中同步
    v-model.trim=""  过滤首尾空格
```
## 5.条件渲染和列表渲染
### 5.1 v-if 和 v-show
v-if  true出现/false消失 （操作节点）
v-show true出现/false消失 （不操作节点，只是简单地切换元素的 CSS 属性 display。）
如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
```
    <div v-if="num==0">0</div>
    <div v-else-if="num==1">1</div> (元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。)
    <div v-else>2</div> (v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。)
```
如果想切换多个元素,此时用一个template元素将这些元素包裹起来，并在上面使用 v-if。最终的渲染结果将不包含template元素。
### 5.2 v-for
v-for 用于实现列表渲染，可以使用 item in items 或者 item of items的语法
```
    数组
    <li v-for="item in arr">{{item}}</li>
    <li v-for="(item,index) in arr">{{index}}{{item}}</li>
    对象
    <li v-for="item in obj">{{item}}</li>
    <li v-for="(item,key) in obj">{{key}}{{item}}</li>
    <li v-for="(item,key,index) in arr">{{key}}:{{item}}{{index}}</li>
    数字
    <li v-for="item in 5">{{item}}</li>
```
在使用v-for时，最好为每个迭代元素指定key
类似于 v-if，你也可以利用带有 v-for 的template渲染多个元素。

# 三、vue选项
## 1.数据选项 data 
数据选项(data)，可以接受的类型有对象和函数两种，但是定义一个组件是只能使用函数类型
vue会递归的将data中的数据加入响应式系统，所以应将可能在实例中被观察的对象预先在data中声明
```
    data(){
        return{
            //数据
        }
    }
```
## 2.属性选项 props
props选项可以是数组或者对象类型，用于接收从父组件传递过来的参数并允许开发者为其设置默认值，类型检测和校验规则等
```
    props: {
        text: String,
        color: {
            type: String,
            default: '#000',
            validator () {
                return true
            }
        }
    }
```
## 3.方法选项 methods
用于绑定事件的，绑定事件时调用的时候加不加()都行，加()可以传参
注意:不应该使用箭头函数来定义method函数。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例。
```
    methods:{
        //this指向 vm
        click(){

        }
    }
```
## 4.计算属性 computed
用于计算的，调用的时候不能加()，因为内部已经调用完。计算属性:对于任何复杂逻辑，你都应当使用计算属性
同methods一样，不应该使用箭头函数声明。
由于计算属性依赖于响应式属性，所以当且仅当响应式属性变化时，计算属性才会被重新计算，而且得到的结果将会被缓存，一直到响应式属性再次被修改
```
    computed:{
        //this指向 vm
        //仅读取
        aDouble: function () {
            return this.a * 2
        },
        //读取和设置
        aPlus: {
            get: function () {
                return this.a + 1
            },
            set: function (v) {
                this.a = v - 1
            }
        }
    }
```
```
    methods和computed区别：从某种程度上来说method可以完全代替computed但是有的情况computed有优势;
        1. methods调用的时候加不加()都行,加()可以传参
            computed调用的时候一定不加();
        2. 缓存区别：
            methods  每当触发重新渲染时，调用方法将总会再次执行函数。（不缓存）
            computed 是基于它们的依赖进行(缓存)的,只有在它的相关依赖发生改变时才会重新求值
            如果依赖不改变会立即返回之前的计算结果，而不必再次执行函数(缓存)
            所以在不改变的情况下只会执行一次，而且上来就会执行，不能于事件用computed，
            正是由于它的缓存，由于它只根据依赖才改变,所以当大量用此计算结果的时候，性能更好
```
## 5.侦听属性 watch 
监听某个变量，在变量被修改时调用
同methods一样，不应该使用箭头函数声明。
```
    watch: {
        a: function (val, oldVal) {
        },
        // 方法名
        b: 'someMethod',
        c: {
            handler: function (val, oldVal) {},
            deep: true  //深度观察 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        },
        d: {
            handler: 'someMethod',
            immediate: true //立即调用 该回调将会在侦听开始之后被立即调用
        },
        // watch vm.d.e's value
        'd.e': function (val, oldVal) { }
    }
```

# 四、组件
## 1.组件的注册
```
     components:{ MyComponents }
```
## 2.普通组件
注：当你写的html不符合规范的时候，像 ul、ol、table、select 这样的元素里允许包含的元素有限制(比如你在li中写入div是不规范的)，而另一些像 option 这样的元素只能出现在某些特定元素的内部。在使用上面的写法会导致渲染出错。
```
    <my-components></my-components > 
    <my-components />
```
## 3.动态组件
让多个组件可以使用同一个挂载点，并动态切换
```
    //核心 is属性   v-bind:is="组件名"  就会加载那个组件
    <component v-bind:is="MyComponents"></component>
```
## 4.组件缓存
```
    //keep-alive：把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。
    <keep-alive>
        <component v-bind:is="MyComponents"></component>
    </keep-alive>
```
## 5.组件通信
组件设计初衷就是要配合使用的，最常见的就是形成父子组件的关系：组件 A 在它的模板中使用了组件 B。它们之间必然需要相互通信
### 5.1父传子down  props方式
```
    父：写属性
        静态传递props方式：  <child title="1" age="2" my-props="3" />
        动态传递props方式：  <child  v-bind:my-props="data" />
    子：定义props变量
        <div class="child">{{title}}</div>
        {
            props:['title','age','myProps']
        }
    注1：Prop 是单向绑定的，当父组件的属性变化时，将传导给子组件，但是反过来不会。
        所以父更新会更新子组件，但不允许在子组件里修改props,这是为了防止子组件无意间修改了父组件的状态。
        在某些情况下，我们很容易忍不住想去修改 prop 中数据，
        a.Prop 作为初始值传入后，子组件想把它当作局部数据来用(就是只要初始值,不随着父组件的更新props去更新子组件)；
        props: ['title'],
        data: function () {
            return {
            constantTitle: this.title  //也可以这么写： this.$props.title
            }
        }
        b.Prop 作为初始值传入后,子组件需要随着父组件更新,但是props需要做进一步的处理
        定义一个计算属性，处理 props 的值并返回：
            props: ['title'],
            computed: {
                chuLiProps: function () {
                return this.title  //也可以这么写：this.$props.title
                }
        }
        绝对不允许直接对props进行修改
    注2：非 prop 特性 :所谓非 prop 特性，就是指它可以直接传入组件，而不需要定义相应的 prop。
        父:<child  data-id="50"/>
        子:而在子组件中 并没有写props:['dataId'] 即没有定义变量接收 那么 data-id="50" 这个属性会直接加在子组件的根模板上
            常见用法：
                父:<child  class="类名"/>
                子:不去定义变量接受这个class 那么这个类名会直接加在 子组件的根模板上( 如果子组件本身有类名 会和这个类名进行合并)    
```
### 5.2子传父up  自定义事件方式
```
    子：<div class="child" v-on:click="transmit"></div>
        methods:{
        //本例子是点击事件的时候(也可是其他事件的时候 blur mouseenter ...) 创建这个自定义事件
            transmit(){
            //核心 创建这个自定义事件
            this.$emit('transmitNum',123)  //自定义事件名 传递的参数
            }
        }
    父：<child  v-on:transmitNum="receive"/>
        methods:{
            receive(data){
                console.log(data)  //data==123
            }
        }
    注：由于在父组件中 给子组件child 绑定的时间会解析成自定义事件,所以：
        <child v-on:click="console.log(111)"/>
        这样写 原生click事件并不会执行 若想执行原生的click事件 应:
        <child v-on:click.native="console.log(111)"/>
        加  .native后缀代表是原生的
```
### 5.3父子双向绑定 .sync修饰符方式
```
    由于以上两种方式,父传子 子传父 都是单向的 有的时候我们需要一个双向的方式，即父亲传给子的变量，
    如果在子中改变这个变量,同时也要作用在父亲上;
    父:
    <div class="app_son">
        <div v-on:click="add">加1</div>
        {{bar}}
        <!--核心1-->
        <child :foo.sync="bar"/>
        <!--相当于扩展成这样-->
        <!--<child :foo="bar" @update:foo="val=>bar=val"/>-->
    </div>
    export default{
        name:'app_son',
        data(){
        return{
            bar:1
        }
        },
        methods:{
        add(){
            this.bar++;
        }
        },
        components:{child},
    }
    子:
    <div class="child" >
        <div v-on:click="jian">减1</div>
        {{foo}}
    </div>
    export default {
    props:['foo'],
    methods:{
        jian(){
        <!--核心2  -->
        this.$emit('update:foo',this.foo-1)
        }
    }
    }
```
### 5.4父子双向绑定 涉及到表单的 v-model方式
```
    //表单文本框情况下 组件的 v-model 使用 value(prop) 和 input 事件
    父：<div class="app_son">
    <!--核心1-->
    <child v-model="something" />  //相当于 <child v-bind:value="something" v-on:input="something = arguments[0]"> />
    </div>
    export default{
    data(){
    return{
    something:'oscar'
    }
    },
    components:{ child }
    }
    子：<div class="child" >
                                <!--核心2-->
    <input type="text" v-bind:value="value" v-on:input="updateValue" />
    </div>
    export default {
    props: ['value'],
    data(){
    return{
    }
    },
    methods: {
    updateValue: function (value) {
        // 通过 input 事件带出数值
        <!--核心3-->
        this.$emit('input', value)
    }
    }
    }
    //表单单选框 复选框 情况下 组件的 v-model 使用 checked(prop) 和 change 事件
    父：<div class="app_son">
    <!--核心1-->
    <child v-model="foo" value="some value"/>  //相当于 <child :checked="foo" @change="val => { foo = val }" value="some value"/>
    </div>
    export default{
        data(){
            return{
            foo:true
            }
        },
        components:{ child }
    }
    子:<div class="child" >
        <!--核心2-->
        <input  type="checkbox" :checked="checked" @change="updateValue" :value="value"/>
    </div>
    export default {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: ['checked','value'],
    data(){
        return{
        }
    },
    methods: {
        updateValue: function (checked) {
        // 通过 input 事件带出数值
            <!--核心3-->
        this.$emit('change', checked)
        }
    }
    }
```
### 5.5非父子组件的通信
vuex
## 6.插槽 slot
使用插槽分发内容 作用：父向子传递内容,内容可也是变量也可以是组件
### 6.1父单个插槽  父里面只有一个元素
```
    父 : <child> {{message}}</child>
    子 : <slot></slot>   //显示就是message变量的内容
    注:除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。
```
### 6.2父多个插槽 父里面有多个元素
```
    父: <child>                             
            <p slot="header">1</p>                
            <p slot="content">2</p>              
            <p slot="footer">3</p>                
        </child>
    子：    
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
```

# 五、路由 vue-router
$route:路由信息对象，只读对象 如获取路由参时：vm.$route.params vm.$route.query
$router:路由操作对象 ，只写对象 如跳转路由时： this.$router.push()
## 1.路由匹配规则的定义
```
    export default new Router({
        routes: [
            //基础路由
            {
                path: '/',
                name: 'index',
                component: index
            },
            //动态路由
            {
                path: '/info/:num',
                name: 'info',
                component: info
            },
            //嵌套路由
            {
                path: '/home',
                name: 'home',
                component: home,
                children:[
                    {
                        path: '',           //会被当作根路径。
                        name: 'root',
                        component: root,
                        alias: "/root"      //“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。 
                    }, 
                    {
                        path: 'me',
                        name: 'me',
                        component: me,
                        alias: "/me"       
                    }, 
                    {
                        path: 'he/:id',
                        name: 'he',
                        component: he,
                        alias: "/he"       
                    }
                ]
            },
            // 404路由 会匹配所有路径
            {
                path: "*",
                redirect: "/404"
            },
            {
                path: "/404",
                component: NotFound
            }
        ]
    })
```
## 2.路由的导航
html
```
    //路径方式 to是字符串
    <router-link to="/">基础路由</router-link>
    <router-link :to="'/info/'+num">动态路由</router-link>
    <router-link to="/home/me">嵌套路由</router-link>
    <router-link to="/home/he">嵌套路由</router-link>

    //命名方式 to是对象
    <router-link :to="{ name: 'register', params: { name: 'oscar' } }">命名方式</router-link>
```
js
```
    //路径方式 注意：路径方式时 参数在path里面写入
    <a @click="redirectByPath('/info/oscar', { plan: 'private' })">路径方式</a>

    //命名方式
    <a @click="redirectByName('register', { name: 'oscar' }, { plan: 'private' })">命名方式</a>

    methods: {
        redirectByPath(path, query) {
            this.$router.push({ path, query });
        },
        redirectByName(name, params, query) {
            this.$router.push({ name, params, query });
        }
    }
```
## 3.路由的视图
```
    <router-view></router-view>
```
多视图
```
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>

    const router = new VueRouter({
        routes: [
            {
            path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz
            }
            }
        ]
    })
```
## 4.路由的重定向
``` 
    const router = new VueRouter({
        routes: [
            { path: '/a', redirect: '/b' },
            { path: '/a', redirect: { name: 'foo' }},
            { path: '/a', redirect: to => {
                // 方法接收 目标路由 作为参数
                // return 重定向的 字符串路径/路径对象
            }}
        ]
    })
```
## 5.History 模式
待续
## 6.导航守卫
全局前置守卫
```
    const router = new VueRouter({ ... })
    router.beforeEach((to, from, next) => {
        console.log(to, from);
        next();
    })
```
路由独享的守卫
```
    const router = new VueRouter({
        routes: [
            {
                path: '/foo',
                component: Foo,
                beforeEnter: (to, from, next) => {
                    // 这些守卫与全局前置守卫的方法参数是一样的。
                }
            }
        ]
    })
```
组件内的守卫
```
    const Foo = {
        beforeRouteEnter (to, from, next) {
            // 这些守卫与全局前置守卫的方法参数是一样的。
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        },
        beforeRouteUpdate (to, from, next) {
            // 这些守卫与全局前置守卫的方法参数是一样的。
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。不会触发生命周期，而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        }
    }
```
## 7.其他
### 7.1 数据获取方式 
```
    https://router.vuejs.org/zh/guide/advanced/data-fetching.html
    解决详情页面id切换不触发路由参数切换的bug
```
### 7.2 滚动行为
```
    //就会像浏览器的原生表现那样
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
```
## 8.路由懒加载
```
    const Foo = () => import('./Foo.vue');
    const router = new VueRouter({
        routes: [
            { path: '/foo', component: Foo }
        ]
    })
```

# 六、其他
## 1.过滤器
Vue.filter( id, [definition] )
```
    //全局
    //全局注册
    Vue.filter('my-filter', function (value) {})
    //获取，返回已注册的过滤器
    var myFilter = Vue.filter('my-filter')

    //局部
    filters: {
        myFilter: function (value) {
        }
    }

    // 使用
    <div>{{ message | myFilter }}</div>
    <div v-bind:id="message | myFilter"></div>
```
## 2.混入
当组件和混入对象（myMixin）含有同名选项时，这些选项将以恰当的方式进行“合并”。
数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
同名钩子函数将合并为一个数组，因此都将被调用。混入对象的钩子将在组件自身钩子之前调用。
值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
```
    mixins: [myMixin]
```
混入也可以进行全局注册。使用时格外小心！
## 3.ref
ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
```
    <template>
        <div >
            //加在普通的 DOM 元素上使用，引用指向的就是 DOM 元素
            <div ref="target">target1</div>
            <div ref="target">target2</div>     //重复的情况下是最后一个
            
            //加在子组件上，引用就指向组件实例
            <child ref="child"></child>
        </div>
    </template>
    export default{
        methods:{
            click(){
                console.log(this.$refs.target);  //DOM 元素
                console.log(this.$refs.child);   //组件child
            }
        }
    }    
```  
## 4.自定义事件
```
    //事件的定义
    vm.$emit( eventName, […args] )
    //事件的监听
    vm.$on( event, callback )
    //只触发一次的事件监听
    vm.$once( event, callback )

    //example
    vm.$emit('test', 'hi')
    vm.$on('test', function (msg) {
        console.log(msg)
    })
```
``` 
    //事件的移除
    vm.$off( [event, callback] )
    如果没有提供参数，则移除所有的事件监听器；
    如果只提供了事件，则移除该事件所有的监听器；
    如果同时提供了事件与回调，则只移除这个回调的监听器
```
## 5.axios
见 axios.js

# 七、注意点
## 1.响应式系统检测数据改变后更新
```
    //数组
    可以被检测到 -> 对原数组进行改变操作的（有特殊看下面）
      a.直接给数组重新赋值
      b.对数组使用这些方法：push()pop()shift()unshift()splice()sort()reverse();
    不可以
      a.filter(), concat(), slice() 方法;
      b.当你利用索引直接设置一个项时，例如：vm.arr[index] = newValue 不可被检测更新到
        解决：vm.$set(arr,index,value) （当你要对数组的某一项进行修改的时候一定要这么做）

    //对象
    可以被检测到
        a.直接给对象重新赋值
        b.对key值进行修改的时候
    不可以:
        Vue 不能检测对象属性的添加或删除：
        解决：添加 vm.$set(object, key, value)
              删除 vm.$delete(object, key)    

    理解：对于 数组/对象 的可以/不可以的说明，这里的可以/不可以是指界面层会不会发送重新渲染，即更新界面，
        对于变量 数组/对象 来说，你修改了一定是修改了，只是暂时没更新到界面上，
        举个例子，你给对象添加了一个键值对，这个对象是改变了，但是由于 Vue 不能检测对象属性的添加或删除，所以没有更新界面，
        但如果你同时又把这个对象的一个键值对进行了修改，vue是可以检测到修改的，所以vue要更新，这个时候的更新，会把你新添加的那个键值对也展现出来
        this.$forceUpdate();//强制重新绘制 
```
## 2.v-for与v-if的优先级
当它们处于同一节点，v-for 的优先级比 v-if 更高. 这意味着 v-if 将分别重复运行于每个 v-for 循环中。 当你想为仅有的一些项渲染节点时，这种优先级的机制会十分有用:
```
    <li v-for="x in arr" v-if="x>5">   //渲染的结果为  数组arr中 只有大于5的才会被显示
        {{ x }}
    </li>
```
而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素:
```
    <ul v-if="arr.length">          //渲染的结果为  数组arr的length不等于 才会显示 才会执行下面的循环
        <li v-for="x in arr">
            {{ x }}
        </li>
    </ul>
```
## 3.key
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。
```
    <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username">
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address">
    </template>
```
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，input不会被替换掉——仅仅是替换了它的 placeholder。
这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可：
```
    //现在，每次切换时，输入框都将被重新渲染。
    <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
    </template>
```
## 4.引入图片路径的方式
```
    <img src="./assets/images/01.jpg" alt=""> 

    <img :src="require('./assets/images/03.jpg')" alt=""> 
    <img :src="require('./assets/images/'+ this.imgName +'.jpg')" alt=""> 
```

# 八、待续
## 自定义指令
https://cn.vuejs.org/v2/guide/custom-directive.html
## 过渡效果
https://cn.vuejs.org/v2/guide/transitions.html
## 状态管理
## 服务端渲染
## 生命周期

# 九 elementUI
```
elementUI 使用el-image组件双击图片会给body添加overflow: hidden;
```