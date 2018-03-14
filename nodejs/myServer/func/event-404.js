/*
 *  封装 404
 *      EventEmitter
 *      1.引入模块 const EventEmitter = require('events');
 *      2.实例化一个eventEmitter对象 let e =  new EventEmitter();
 *      3. e.on(定义的事件名, (形参1,形参2,...)=>{
 *      })
 *      4.e.emit(需要触发的事件名,实参1,实参2,....)
 *
* */
const EventEmitter = require('events');
const fs = require('fs');

let eventEmitter = new EventEmitter();
eventEmitter.on('404', (request, response)=> {
    fs.readFile('404.html', (error, data)=> {
        response.statusCode = 404;
        response.end(data);
    })
});
module.exports=eventEmitter;