// 引入, 需要先下载express,确保有 express 依赖文件, 否则Cannot Found Module "XXXXX
const express=require('express');

//引入user路由模块
let user=require('./routes/user');

//定义主模块
let app=express();
//配置监听端口
app.listen(3001,()=>console.log('服务器启动成功!'));

//静态文件，'static'指 静态文件的根目录
app.use(express.static('static'));

//建立路由中间件
app.use('/user', user);

//定义接口
app.get('/test', (req, res)=> {
    //resp.send()====resp.end(JSON.stringify({}))
    res.send({
        name: 'gulp',
        info: '基于 node.js 平台, 搭建测试环境'
    })
});