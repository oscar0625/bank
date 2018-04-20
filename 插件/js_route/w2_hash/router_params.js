/*兼容到ie8 */
(function () {
    "use strict"
    function Router() {

        this._routes = {'*':function () {},'#':function () {}};

        this._currentHash='';

    }

    // 对路由的hash值进行监听,如果发生改变，则调用changeRoute函数
    Router.prototype.init=function () {

        var self=this;

        this._changeRoute(); //第一次进页面应该执行changeRoute

        window.onhashchange=function () {self._changeRoute()};
    };

    //hash改变 路由切换
    Router.prototype._changeRoute=function () {
        var hash=location.hash,
            currentHash=hash.match(/^#(\w+)/) ? hash.match(/^#(\w+)/)[1] :'',// 当前hash值,永不为'#'
            isMatch=Object.keys(this._routes).indexOf(currentHash),         //判断当前hash值下是否能匹配的上_routes里的callback

            params;                                                         //参数
            try {
                params = eval(hash.match(/(\(.+\))$/)[1]);
            } catch (e){
                params=null;
            }

        if(isMatch === -1){
            //如果没有匹配上 就去执行'#'
            if(this._currentHash !=='#' && (this._currentHash='#')){   //防止多次匹配不上 重复执行
                this._routes[this._currentHash](params);
            }
        }else {
            this._currentHash=currentHash;
            this._routes[this._currentHash](params);
        }

        //每个路由都执行的部分
        this._routes['*']();

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
//  * @param pageName      对应的页面名字  首页为 '#'  推荐必须设置'#' 因为如果当 hash 匹配不上config中的配置 都会执行 '#' 的回调函数   '*' 为每次都会值行的函数
//  * @param callback      对应的页面的回调函数
//  */
// route.config('#', function () {
//     console.log(11111)
// }).init();

// 3. 路由传参  以下格式  若参数传错 参数为null
// <a href="#({name:'oscar'})">
// <a href="#index({name:'oscar'})">
// <a href="#([1,2,3])">
// <a href="#(123)">
// <a href="#('asd')">
// <a href="#(true)">
