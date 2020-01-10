# 参考文档
https://www.babeljs.cn/docs/
https://www.babeljs.cn/setup

# 一、主要模块
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
@babel/core 核心库
@babel/cli  CLI 命令行工具
@babel/preset-env 插件和预设（preset）
@babel/polyfill  polyfill垫片

# 二、配置
## 1 babel.config.js
```
    module.exports = function (api) {
        api.cache(true);

        const presets = [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage"
                }
            ]
        ];

        const plugins = [
            ["@babel/plugin-proposal-class-properties", {
                "loose": true
            }],
            "@babel/plugin-transform-runtime"
        ];

        return {
            presets,
            plugins
        };
    }
```
## 2 .babelrc

# 三、@babel/cli
https://www.babeljs.cn/docs/babel-cli
babel src --out-dir lib  编译整个目录
babel src --out-file app.js 编译整个目录下的文件并将输出合并为一个文件。
babel src --out-dir lib --source-maps inline 编译并输出源码映射表（Source Maps）
babel src --out-dir lib --ignore "src/**/*.spec.js","src/**/*.test.js" 忽略某些文件

# 四、@babel/preset-env
https://babeljs.io/docs/en/babel-preset-env
## 1 .browserslistrc
```
    > 1%
    last 2 versions
    not ie <= 8
```
## 2. useBuiltIns
https://blog.hhking.cn/2019/04/02/babel-v7-update/
此选项配置如何@babel/preset-env处理polyfill
```
    useBuiltIns: false (默认) 
```
此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。
```
    useBuiltIns: "entry",
    corejs: 2
```
根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import '@babel/polyfill'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill。
注意：这里需要指定 corejs 的版本, 如果 "corejs": 3, 则@babel/polyfill被废弃需要更改为新的方式 见https://babeljs.io/docs/en/babel-polyfill
```
    useBuiltIns: "usage",
    corejs: 2
    //但是这么有一个问题，会引入大量相同的辅助函数，使用插件 @babel/plugin-transform-runtime 这个插件是用来复用辅助函数。
```
usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加。
注意：这里需要指定 corejs 的版本, 如果 "corejs": 3, 则@babel/polyfill被废弃需要更改为新的方式 见https://babeljs.io/docs/en/babel-polyfill

# 五、原理解析
https://segmentfault.com/a/1190000013261724
## 1. 分析
```
    babel转换代码的过程主要为三步：
        解析Parser :   使用babylon这个解析器，它会根据输入的javascript代码字符串根据ESTree规范生成AST（抽象语法树）。
        转换Transformer :   根据 presets,plugins的配置转换成新的AST。
        生成Generator :   使用babel-generator新的AST转换成普通代码。
```
## 2. 什么是AST?
在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
转换成抽象语法树的网址
//https://astexplorer.net/

## 3. 编写一个babel插件
//https://juejin.im/post/5b14257ef265da6e5546b14b
```
    demo   myPlugin.js
    Babel的插件入门比较简单，照葫芦画瓢即可。在编写插件过程中，可能会遇到的主要障碍，包括对ECMA规范不了解、对Babel的API不了解。

    1.对ECMA规范不了解：MemberExpression、FunctionDeclaration、Identifier等都是规范里的术语，如果对规范没有一定的了解，转换代码的时候就不知道如何入手。建议读者稍微了解下ECMA规范。
    2.对Babel的API不了解：Babel相关API的文档比较少，这会对插件编写造成不小的困难，目前比较好的解决办法，就是参考现有的插件进行修改。
```

    