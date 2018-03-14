/**
 * 动态资源 函数
*
*  例如
*       http://localhost:3000/s
*       服务器接收到 s 请求
*       找到s 对应的函数
*
*  新加功能
*      会出现覆盖原有功能的现象
*          添加功能时,
*          如果出现重名,
*          报错 throw new Error()
*
*  出现 fn(string,function) 的结构 就想到是 给某个对象添加属性
*  反过来思考, 当给一个对象添加属性时, 可以放到函数中实现,
*  并且在函数中对赋值进行限制, 同时还可以保护这个对象, 不被外界获取到(私有属性)
* */
let dynamic = {};
const event=require('./event-404');

//引入url模块
const url = require('url');

let addDynamic = (name, callback)=> {
    if (dynamic[name] == 'function') {
        throw new Error
    } else {
        dynamic[name] = callback
    }
};
let invokeDynamic = (request, response)=> {
    let urlObject = url.parse(request.url.slice(1)); //a?wd=node
    fnName = urlObject.pathname;
    if (typeof dynamic[fnName] == 'function') {
        dynamic[fnName](request, response)
    } else {
        event.emit('404',request,response);
    }
};
module.exports = {addDynamic, invokeDynamic};