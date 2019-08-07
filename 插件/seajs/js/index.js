/**
 * Created by Administrator on 2017/2/4.
 */
//只能在js中定义模块
//定义模块
define(function (require) {
    //加载指定的模块 可以多个,require可以加载模块但是不提供回调函数   //等同于seajs.use
    //require是同步往下执行的，需要的异步加载模块可以使用 require.async 来进行加载：
    // require.async('app', function (exports) {
    //     //通过第一个参数exports获取app模块所对外开放的接口
    //     console.log(exports)
    // })
    return 123
});