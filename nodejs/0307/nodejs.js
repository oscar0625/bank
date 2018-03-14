/**
     NodeJs
         0.1.xxx
         io.js   1.0 - 3.0

         4.x 常用
         6.x 最新

     a. npm
         Node Package Manager
         package.json 存储依赖包的文件

     b. gulp / webpack
         混淆代码, 合并js文件, 搭建测试环境, ES6 转 ES5

     c. 服务器
         Node + Js = Apache + php = Tomcat + Java
         Node => Express / Koa

     面试题： 如何区分 某个js 文件是运行在什么环境中的
        console.log(this);
        node = {}
         浏览器 = window
     顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。
     ES5之中，顶层对象的属性与全局变量是等价的。
/**/
console.log(this);