/*
* 静态资源 加载网页
* */
const fs=require('fs');

//引入url模块
const url = require('url');

const event=require('./event-404');

let statics=(request,response)=>{
    let urlObject = url.parse(request.url.slice(1)); //01.html?wd=node
    fnName = urlObject.pathname;
    //判断文件是否存在
    if(fs.existsSync(fnName)){
        fs.readFile(fnName,(error,data)=>{
            // console.log(data)
            response.end(data)
        });
    }else {
        event.emit('404',request,response);
    }
};
module.exports={statics};