/*
* exports 和 module.exports 的区别
* 1.module.exports 初始值为一个空对象 {}
* 2.exports 是指向的 module.exports 的引用
* 3.require() 返回的是 module.exports 而不是 exports
*
* */
var a = {name: 1};              //module.exports
var b = a;                      //exports

console.log(a); //{ name: 1 }
console.log(b); //{ name: 1 }

b.name = 2;
console.log(a); //{ name: 2 }
console.log(b); //{ name: 2 }

b = {name: 3};
console.log(a); //{ name: 2 }
console.log(b); //{ name: 3 }
/*
* a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一块内存，所以前两个输出一样。
* 当对 b 作修改时，即 a 和 b 指向同一块内存地址的内容发生了改变，所以 a 也会体现出来，所以第三四个输出一样。
* 当 b 被覆盖时，b 指向了一块新的内存，a 还是指向原来的内存，所以最后两个输出不一样。
* */