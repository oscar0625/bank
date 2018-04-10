/*
 * require会定义三个全局变量：
 * define：用来定义一个模块
 * require===requirejs(一般使用require更简短)： 加载依赖模块，并执行加载完后的回调函数
 *
 * */


/*一、配置模块加载位置*/

require.config({
    // 设置根目录
    baseUrl:'./js',
    // 设置别名
    paths:{
        jq:'../script/jquery-1.7.2.min',  //不带js后缀
        d1:'define1',
        d4:'define4',
        noAmd:'notAMDMoudle'

    },

    /*以下为非基础配置 需要时再引入*/
    //shim
    /*作用1：定义模块的依赖关系，这里面的模块加载之前会先把deps里面的模块先加载下来
     作用2：加载非规范的模块,有些库不是AMD兼容的，这时就需要指定shim属性的值。shim可以理解成“垫片”，用来帮助require.js加载非AMD规范的库。&&&&&& 很重要
     */
    shim:{
        /*只需加载依赖不需要导出任何模块值*/
        d4:['jq'],
        /*加载依赖还需要导出任何模块值*/
        noAmd:{
            deps:['jq'],
            exports:'oscar'   // 很重要，和notAMDMoudle.js中变量名必须一致
        }
    },
    /*Requirejs加载超时问题的一个解决方法：设置waitSeconds=0*/
    waitSeconds: 0
});


/*二、加载模块*/
//1.加载符合amd规范的模块         require([模块名])
require(['d4'],                 //加载的模块必须是数组格式，可以加载多个模块 加载多个模块时 参数1对应模块1  参数2对应模块2
    function (a) {              //回调函数在所有模块加载完成之后再执行，只执行一次
        console.log(a);         //回调函数的参数就是加载的模块所扩展出来的东西  相当于module.exports
    }
);
//注意: 在define() 中也可以使用 require()

//2.加载jsonp
// require(["http://example.com/api/data.json?callback=define"],
//     //requireJS中使用JSONP服务，须要将callback参数的值指定为"define"。
//     function (data) {
//         console.log(data);
//     }
// );

// //3.加载不符合amd规范的模块
// require(['noAmd'], function (a) {
//     //若没有在shim里配置的 exports  a的值为undefined
//     console.log(a)
// });



/*三、定义模块  几种定义方式 */

/*1 定义对象*/
// define(
//     /*该模块要导出的数据 就是此对象*/
//     {a:1, b:2}
// );

/*2 定义函数*/
// define(function () {
//     /*该模块要导出的数据 就是return的值 注:模块不必返回对象。任何有效的函数返回值都是允许的。*/
//    return function () {
//        console.log(111)
//    }
// });

/*3 常用 具有依赖关系的定义函数 第一个参数应该是一个依赖项名称数组，而第二个参数应该是一个定义函数。*/
// define(['d1','d4'], function (a,b) {
//     console.log(a);
//     console.log(b);
//     /*该模块要导出的数据 就是return的值*/
//     return 2
// });

/*4 定义cmd 模块*/
// define(function(require,exports,module){
//     //加载d1模块 并获取d1里面的数据
//     var a = require('d1');
//     console.log(a);
//
//     /*该模块要导出的数据就是exports 有两种导出方式*/
//     //a.直接修改exports后导出
//     exports.abc = 888;
//     //d.直接覆盖exports后导出
//     //module.exports = {
//     //    abc:888
//     //}
// });

/*四、其他*/
//1.依赖需要提前引入的解决方法
//a.
// define(['d1','d4'], function (a,b) {
//     //d1 d4依赖 会在回调函数执行之前引入
// });
//b.通过shim 提前引入依赖

/*注意：
 define(['d1','d4'], function () {});
 require(['d1','d4'], function () {});
 shim:{
 noAmd:{
 deps:['d1','d4'],
 }
 },
 d1 d4 它俩的引入顺序先后顺序是不一定的*/


