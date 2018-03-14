const main=require('./func/main');
//引入查询字符串模块(get方式传参?后面)
const queryString = require('querystring');

let app=main();
app.listen(2999, ()=> {
    console.log('服务启动成功!');
});
app.addDynamic('a',(request, response)=>{response.end('<h1>这是A的内容</h1>')});
app.addDynamic('b',(request, response)=>{response.end('<h1>这是B的内容</h1>')});
app.addDynamic('c',(request, response)=>{response.end('<h1>这是C的内容</h1>')});