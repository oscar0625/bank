# 一、配置 
## 1. 全局配置
    app.json 小程序的配置
        pages       用于指定小程序由哪些页面组成，
        window      用于设置小程序的状态栏、导航条、标题、窗口背景色、下拉 loading 的样式、是否全局开启下拉刷新。
        tabBar      如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面）
        networkTimeout  各类网络请求的超时时间，单位均为毫秒。
        debug       是否开启 debug 模式，默认关闭
        functionalPages         是否启用插件功能页，默认关闭
        workers                 Worker 代码放置的目录
        requiredBackgroundModes 需要在后台使用的能力，如「音乐播放」	
        plugins                 使用到的插件
        navigateToMiniProgramAppIdList  需要跳转的小程序列表
        permission:{            小程序接口权限相关设置
            "scope.userLocation": {
            "desc": "你的位置信息将用于小程序位置接口的效果展示"
            }
        }
## 2. 页面配置    
    page.json 页面的配置只能设置 app.json 中部分 window 配置项的内容，页面中配置项会覆盖 app.json 的 window 中相同的配置项。
    backgroundColor  窗口的背景色是指页面下拉之后 后面的背景色 要是想给body设置颜色 
    page{
        background: #30c68c;
    }
## 3. 开发者工具的配置
    project.config.json 





# 二、逻辑层 (js)
## 1.注册程序 app.js   
```
    const app = getApp() //通过全局函数 getApp() 可以获取全局的应用实例  之后可以对app中的数据进行修改 修改后作用于全局 都变为修改之后的
```
```
    App({
        onLaunch: function(options) {
            // 小程序初始化完成时触发(全局只触发一次。)
            // options.scene  打开小程序的场景值
        },
        onShow: function(options) {
            // 小程序启动，或从后台进入前台显示时
            // 注意切换页面不会再次触发***
        },
        onHide: function() {
            // 小程序从前台进入后台时触发。
        },
        onError: function(msg) {
            // 小程序发生脚本错误，或者 api 调用失败时触发。
            console.log(msg)
        },
        onPageNotFound:function(options) {
            // 小程序要打开的页面不存在时触发。
            wx.redirectTo({             // 如果是 tabbar 页面，请使用 wx.switchTab
                url: 'pages/...'
            }) 
        },
        "其他":'开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问'
    })
```
### 注意
    前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
## 2.注册页面  page.js
```
    Page({
        data: {
            //data 是页面第一次渲染使用的初始数据。
            text: "This is page data."
        },
        //自定义事件
        //<view bindtap="viewTap"> click me </view>
        viewTap: function() {
            console.log(this.route);
        },
        //自定义数据
        customData: {
            hi: 'MINA'
        }

        //页面事件处理函数
        onPageScroll: function() {
            // 监听用户滑动页面事件。
        },
        onPullDownRefresh: function() {
            // 监听用户下拉刷新事件。 
            // dosomething
            wx.stopPullDownRefresh();
            
            // 1.需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
            // 2.处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
            // 3.可以通过wx.startPullDownRefresh触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
        },
        onReachBottom: function() {
            // 监听用户上拉触底事件。 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
        },
        onTabItemTap(item) {
            //点击 tabBar 时触发
            console.log(item.index)
            console.log(item.pagePath)
            console.log(item.text)
        },
        onShareAppMessage: function () {
            // 监听用户点击页面内转发按钮（<button> 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容。
        },

        //生命周期回调函数
        onLoad: function(options) {
            //页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
        },
        onShow: function() {
            //页面显示/切入前台时触发。
            //注意切换页面会再次触发***
            //获取数据放在这里最好***
        },
        onReady: function() {
            // 页面初次渲染完成时触发。一个页面只会调用一次，
            // 代表页面已经准备妥当，可以和视图层进行交互。
        },
        onHide: function() {
            // 页面隐藏/切入后台时触发。
        },
        onUnload: function() {
            // 页面卸载时触发。
        },
    })
```
```
   //api
   //1.当前页面的路径
   console.log(this.route) 
   //2.setData  修改data的值 并渲染到视图层
   //支持改变数组中的某一项或对象的某个属性，如 array[2].message，a.b.c.d
   this.setData(
       {text: 'Set some data for updating view.'}, 
       function() {
           //setData引起的界面更新渲染完毕后的回调函数
       }
    )
```
## 3.模块化 
    遵循commonJS规范


# 三、视图层（wxml+wxss）
## 1.WXML
### 1.1数据绑定
```
    <view> {{message}} </view>
```
### 1.2列表渲染 
```
    <view wx:for="{{array}}" wx:key="index">
        {{index}}: {{item.message}}
    </view>
    //默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item
    //使用 wx:for-item="itemName" 可以指定数组当前元素的变量，
    //使用 wx:for-index="idx"可以指定数组当前下标的变量名
     
    //最好指定key  官方有两种方法 
    wx:key="property" 其中property是代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
    wx:key="*this" 保留关键字 *this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字
    个人认为 wx:key="index"  就ok
```
### 1.3条件渲染
```
    <block  wx:if="{{length > 5}}"> 1 </block >
    <block  wx:elif="{{length > 2}}"> 2 </block >
    <block  wx:else> 3 </block >
```
### 1.4自定义属性
    data-*
    data-id="1"
### 1.5 hidden="false" 是否隐藏    

## 2.WXSS
### 2.1 尺寸单位 rpx
#### 2.1.1 px和rpx转化
    rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。
    如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
``` 
    function rpxTopx (rpx) {
        // rpx / 750 * 屏幕宽度  
        var px= rpx / 750 * wx.getSystemInfoSync().screenWidth;
        return px
    },
    function pxTorpx (px) {
        // px / 屏幕宽度 * 750 
        var rpx= px / wx.getSystemInfoSync().screenWidth * 750;
        return rpx
    }
```
#### 2.1.2 设计稿对应的rpx
    建议： 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。
    例如：设计稿750px宽度 那么恭喜您，你ps上量出宽度是多少，那么你就定义多少rpx，也就是 1px = 1rpx

    例如：设计稿640px宽度  那么很遗憾，你需要转换一下 640px = 750rpx   在psd量出的尺寸 num*750/640 的得到的对应 rpx数量

    
### 2.2 class_style
    class="{{className}}" 
    style="color:{{className}};"
### 2.3 全局样式与局部样式

## 3.WXML节点信息(dom)
    可以用于获取节点属性、样式、在界面上的位置等信息。最常见的用法是使用这个接口来查询某个节点的当前位置，以及界面的滚动位置。
```    
    const query = wx.createSelectorQuery();
    query.select('#the-id').boundingClientRect(function(res){
        //res.top       // #the-id 节点的上边界坐标（相对于显示区域）
    })
    query.selectViewport().scrollOffset(function(res){
        //res.scrollTop // 显示区域的竖直滚动位置
    })
    query.exec()
```
        


# 四、事件    
## 1.事件绑定
    bind* / catch*
    以bind或catch开头，bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。
## 2.事件类型  
    tap 手指触摸后马上离开
    longpress	手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
    touchstart	手指触摸动作开始	
    touchmove	手指触摸后移动	
    touchcancel	手指触摸动作被打断，如来电提醒，弹窗	
    touchend	手指触摸动作结束     
    等等
## 3.事件对象    
    event.target.dataset  //自定义数据
    event.detail //自定义事件所携带的数据，如表单组件的提交事件会携带用户的输入 点击事件的detail 带有的 x, y 同 pageX, pageY 代表距离文档左上角的距离。


# 五、模板
## 1.定义模板
```    
    <template name="模板名">
        <view>
            <text> {{index}}: {{msg}} </text>
            <text> Time: {{time}} </text>
        </view>
    </template>
```    
## 2.使用模板    
``` wxml引用
    <import src="../../template/template.wxml"/>

    wxss引用 可以直接在app.wxss中用,这样只需要一次引用
    @import "./template/template.wxss";
```
```
    <template is="模板名" data="{{...item}}"/>
    Page({data: {item: {index: 0,msg: 'this is a template',time: '2016-09-15' }}});

    //is 属性可以使用 Mustache 语法，来动态决定具体需要渲染哪个模板：
    <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
```
## 3.引用
    import  可以在该文件中使用目标文件定义的template
    include 可以将目标文件除了 <template/> <wxs/> 外的整个代码引用
    <include src="header.wxml"/>
    <include src="footer.wxml"/>    




# 六、小程序组件 
    https://developers.weixin.qq.com/miniprogram/dev/component/
## 1. view  相当于与div
## 2. swiper 轮播图组件
## 3. icon
    <icon type="{{type}}" size="{{size}}" color="{{color}}"/>
## 4. text   
## 5. progress
## 6. 表单组件
## 7. navigator 导航a标签
## 8. <block> </block >

    

# 七、小程序API
    https://developers.weixin.qq.com/miniprogram/dev/api/
## 1. API约定
   事件监听：我们约定，以 on 开头的 API 用来监听某个事件是否触发。
   同步API：我们约定，以 Sync 结尾的 API 都是同步 API。
   异步 API：大多数 API 都是异步 API，这类 API 接口通常都接受一个 Object 类型的参数
## 2. 前后端交互（ajax）
### 2.1 get/post
```
    wx.request({
        url: 'test.php',
        method:'post',
        header: {
            'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        data: {
            username: 'a',
            password:'aaaaaa1'
        },
        success:function (res) {
            if(res.statusCode == 200){
            console.log(res.data.token)
            }else{
            console.log(res.data.userMessage);
            }
        },
        fail:function (res) {
            console.log(res)
        }
    })
```
### 2.2 上传文件
```
    wx.uploadFile({        
        url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0], //一次只能上传一个，多个文件上传使用递归传
        name: 'file',
        formData: {
            'user': 'test'
        },
        success (res){
            const data = res.data
            //do something
        }
    })
```
### 2.3 form提交方式
## 3. 页面路由
    wx.navigateTo(Object), wx.redirectTo(Object) 只能打开非 tabBar 页面。前者能返回 后者不能返回
    wx.redirectTo(Object object)关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
    wx.switchTab(Object) 只能打开 tabBar 页面。并关闭其他所有非 tabBar 页面
    wx.reLaunch(Object) 可以打开任意页面。 并关闭之前所有页面。(可做刷新用)
    wx.navigateBack(Object) 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
          wx.navigateBack({delta: 1}) 返回上一层 （）
    调用页面路由带的参数可以在目标页面的onLoad中获取。
### 3.1 由于小程序生命周期 onload 不会反复触发 存在返回的页面无刷新的问题 
    解决办法 1.数据有的应该放在onshow 不都放在onload (优秀)
            2.wx.reLaunch(Object) 打开解决
## 4. 窗口(弹出框)  
    wx.onWindowResize(callback) //监听窗口尺寸变化事件
    wx.pageScrollTo(Object)  //将页面滚动到目标位置

    wx.showLoading(Object)	显示 loading 提示框
    wx.hideLoading(Object)	隐藏 loading 提示框

    wx.showModal(Object)	显示模态(对话框)

    wx.showToast(Object)	显示消息(提示框)
    wx.hideToast(Object)	隐藏消息(提示框)

    wx.showActionSheet(Object)	​显示操作菜单
## 5. 图片相关
    wx.chooseImage();   //从本地相册选择图片或使用相机拍照(选择图片)
    wx.previewImage()   //在新页面中全屏预览图片(预览图片)
    wx.getImageInfo()   //获取图片信息  
## 6. 数据缓存
    wx.setStorage(Object)
    wx.getStorage(Object)
    wx.removeStorage(Object)
    wx.clearStorage(Object)   
## 7.系统(获取手机型号 宽度 高度等)    
    wx.getSystemInfoSync()

# 八、用户信息
## 1.小程序登录
```
    wx.login({
        success (res) {
            if (res.code) {
                //发起网络请求

            } else {
                console.log('登录失败！' + res.errMsg)
            }
        }
    }) 
```
## 2.授权
    https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html

### 2.1 获取用户已经授权的设置
```
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        //如果没有开启用户信息权限
        if (!res.authSetting['scope.userInfo']) {
          
        }
      }
    })
```
### 2.2 打开授权设置页
```
    //必须由点击行为触发wx.openSetting接口的调用
    <view bindtap="openSetting">打开设置页</view>  openSetting() {  wx.openSetting()}
```
### 2.3 提前发起授权请求
```          
    wx.authorize({
        scope: 'scope.record',      //不支持 scope.userInfo了
        //同意授权
        success (res) {},
        //拒绝授权
        fail(res){}
    })
```

### 2.4 wx.getUserInfo()
```
    //必须使用 button 来授权登录
    <button  open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
    bindGetUserInfo (e) {
        console.log(e.detail.userInfo)
    }
```
### 2.5 授权流程
    scope.userInfo
    程序一开始  wx.getSetting() (2.1)  如果没有res.authSetting['scope.userInfo']授权  跳转到授权页面 进行授权操作 (2.4)  如果不授权不可以
    scope.userLocation等等...
    wx.authorize() (2.3)  调取授权弹框  如果同意ok 不同意 给用户主动点击的操作空间 用 wx.openSetting() (2.2) 再次进行授权

# 九、地图  
## 1.使用腾讯地图的功能
    注意：gcj02 比 wgs84 定位准确
    wx.getLocation(Object object)       //获取当前的地理位置、速度。
    wx.chooseLocation(Object object)    //打开腾讯地图搜索/选择位置。
    wx.openLocation(Object object)      //​使用微信内置地图查看位置。(可以用做导航用)
    更多扩展功能 使用腾讯地图微信小程序JavaScript SDK  https://lbs.qq.com/qqmap_wx_jssdk/index.html
## 2.使用本网页中地图的功能    
### 2.1 map组件
```
    <map id="map" style="width: 100%; height: 420px;" longitude="{{longitude}}" latitude="{{latitude}}" scale="16" show-location="true" markers="{{markers}}" bindtap="clickMap" ></map>
```
### 2.2 MapContext Api
     wx.createMapContext(string mapId, Object this)



# 十、WXS (暂时认为没用)
    WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
    wxs可以说就是为了满足能在页面中使用js存在的。
    wxs 与 javascript 是不同的语言，有自己的语法，并不和 javascript 一致。
    wxs 的运行环境和其他 javascript 代码是隔离的，wxs 中不能调用其他 javascript 文件中定义的函数，也不能调用小程序提供的API。
    wxs 函数不能作为组件的事件回调。
    由于运行环境的差异，在 iOS 设备上小程序内的 wxs 会比 javascript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。

# 十一、小程序社区
    http://www.wxapp-union.com/
# 十二、bug
    1.map、canvas、video、textarea 是由客户端创建的原生组件，原生组件的层级是最高的。








    


