(function (name,factory) {var hasDefine=typeof define === 'function', hasExports=typeof moudle !=='undefined' && moudle.exports;if(hasDefine){define(factory)}else if(hasExports){moudle.exports=factory();}else {window[name]=factory();}
})('Router',function () {
    "use strict";
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
        //每个路由都执行的部分
        this._routes['*']();

        var hash=location.hash,
            currentHash=hash.match(/^#(\w+)/) ? hash.match(/^#(\w+)/)[1] :'',// 当前hash值,永不为'#'
            isMatch=Object.keys(this._routes).indexOf(currentHash);         //判断当前hash值下是否能匹配的上_routes里的callback

        if(isMatch === -1){
            //如果没有匹配上 就去执行'#'
            if(this._currentHash !=='#' && (this._currentHash='#')){   //防止多次匹配不上 重复执行
                this._routes[this._currentHash]();
            }
        }else {
            this._currentHash=currentHash;
            this._routes[this._currentHash]();
        }

    };

    //配置路由
    Router.prototype.config=function (pageName,callback) {
        if(pageName && typeof pageName === 'string' && typeof callback === 'function'){
            this._routes[pageName]=callback
        }
        return this
    };

    return Router;
});

/*兼容到ie8 */
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