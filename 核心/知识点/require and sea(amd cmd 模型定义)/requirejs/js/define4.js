
define(function(require,exports,module){
    //加载d1模块 并获取d1里面的数据
    var a = require('d1');
    console.log(a);

    /*该模块要导出的数据就是exports 有两种导出方式*/
    //a.直接修改exports后导出
    exports.abc = 888;
    //d.直接覆盖exports后导出
    //module.exports = {
    //    abc:888
    //}
});