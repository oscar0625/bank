/*  如何监听端口, 创建自己的服务器,读取文件

 *  //创建自己的服务器
 *  const http = require('http');
 *  let server=http.createServer(callback)
 *       return: 创建服务对象
 *       callback: 当接收到请求时, 触发函数
 *       (request,response)=>{
 *          let url=request.url
 *          response.end('<h1>404</h1>')
 *       }
 *  //配置监听端口
 *  server.listen(port, callback)
 *      port: 端口号
 *      callback: 当监听成功时, 触发函数
 *
 *  //读取文件
 *  const fs = require('fs');
 *  fs.readFile('path', callback)
 *          'path' : 文件的路径
 *           callback   : 文件读取完毕后执行的回调函数
 *           (error, data)=>{}
 *
 * */
//引入模块
const http = require('http');
const fs = require('fs');

//传入的参数, 监听 request , response
let server = http.createServer((request, response)=> {
    // console.log('接收到请求');
    //没有头像带来的问题
    if (request.url == '/favicon.ico') {
        return
    }
    let path = request.url.substr(1);
    // console.log(path)
    fs.readFile(path, (err, data)=> {
        if (err) throw err;
        // console.log(data);
        response.end(data);
    });
});

//配置监听端口
server.listen(3000, ()=> {
    console.log('服务启动成功!');
});