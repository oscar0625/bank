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