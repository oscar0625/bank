/*兼容到ie8 */
(function () {
    "use strict"
    function Router() {

        this._routes = {};

        this._currentHash='';

    }

    // 对路由的hash值进行监听,如果发生改变，则调用changeRoute函数
    Router.prototype.init=function () {

        var self=this;

        this._changeRoute(); //第一次进页面应该执行changeRoute
            //== undefined && ''
        window.onhashchange=function () {self._changeRoute()};
    };

    //hash改变 路由切换
    Router.prototype._changeRoute=function () {
        var hash=location.hash,
            hashFilt=hash.match(/^#(\w+)/) ? hash.match(/^#(\w+)/)[1] :'',//找匹配
            res=Object.keys(this._routes).indexOf(hashFilt),              //判断当前hash值下是否能匹配的上_routes里的callback
            params;                                                       //找参数
            try {
                params = eval(hash.match(/(\(.+\))$/)[1])
            } catch (e){
                params=null;
            }
        if(res === -1){
            //如果没有匹配上 就去执行首页'/' 且如果多次以上匹配不上 只执行一次不重复执行 (在'/'有定义的情况下)
            if(this._currentHash !=='/'){
                this._currentHash='/';
                try {this._routes[this._currentHash](params)}catch (e){ console.log(e)}
            }
        }else {
            this._currentHash=hashFilt;
            this._routes[this._currentHash](params);
        }

    };

    //配置路由
    Router.prototype.config=function (pageName,callback) {
        if(pageName && typeof pageName === 'string' && typeof callback === 'function'){
            this._routes[pageName]=callback
        }
        return this
    };

    window.Router=Router;
}());

// 1.调用
// var route = new Router();

// 2. 配置路由
// /**
//  *
//  * @param pageName      对应的页面名字  首页为 '/'  推荐必须设置'/' 因为如果当 hash 匹配不上config中的配置 都会执行 '/' 的回掉函数
//  * @param callback      对应的页面的回调函数
//  */
// route.config('/', function () {
//     console.log(11111)
// }).init();

// 3. 路由传参  以下格式  若参数传错 参数为null
// <a href="#({name:'oscar'})">
// <a href="#index({name:'oscar'})">
// <a href="#([1,2,3])">
// <a href="#(123)">
// <a href="#('asd')">
// <a href="#(true)">
