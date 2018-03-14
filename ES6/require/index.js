/*
* 1.定义模块的出口
*  module.exports =
*   单独出口
*
*  exports.属性名 = 值
*   每一个属性都可以被外部调用
* 2 .模块调用
* require
*   内部模块
*       require('模块名');
*   自定义模块
*       require('./模块名');
*
*       require('../01')
*
* */
let http = require('http');
let c = require('./c');
let b = require('./b');
console.log(b.name);
console.log(c.e.getObj1());
