/*
* 创建服务, 和判断静态动态的过程封装到模块中
*
* */
//引入模块
const http = require('http');
//加载动态方法模块
const {addDynamic, invokeDynamic}=require('./dynamic');
//加载静态模块
const {statics}=require('./statics');

module.exports=function () {
    //传入的参数, 监听 request , response
    let server = http.createServer((request, response)=> {
        // console.log('接收到请求');

        //没有头像带来的问题
        // if (request.url == '/favicon.ico') {
        //     return
        // }

        let url = request.url.substr(1);
        // console.log(url)
        if(url.indexOf('.') !=-1){
            //静态页面
            statics(request,response)
        }else{
            //动态方法
            invokeDynamic(request,response);
        }
    });
    server.addDynamic=addDynamic;
    return server
};