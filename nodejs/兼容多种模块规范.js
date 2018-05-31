//1. 兼容多种模块规范  amd/cmd/commonjs
(function (name,factory) {
    //检测上下文环境是否为AMD规范或CMD规范
    var hasDefine=typeof define === 'function',
        //检测上下文环境是否为Node(CommonJS规范)
        hasExports=typeof moudle !=='undefined' && moudle.exports;
    if(hasDefine){
        //AMD环境或CMD环境
        define(factory)
    }else if(hasExports){
        //nodeJs环境
        moudle.exports=factory();
    }else {
        //无规范 挂在window下
        window[name]=factory();
    }
})('模块名',function () {
   return {};
});



//2.兼容两种模块规范  amd/commonjs
(function (name, factory) {

    if ( typeof define === "function" && define.amd ) {
        // AMD
        // define([], factory);
        define([],factory);
    }else if (typeof module === "object" && typeof module.exports === "object") {
        // Node.js
        module.exports = factory();
    } else {
        // Browser globals
        window[name]=factory();
    }
})('模块名',function () {
    return {};
});

