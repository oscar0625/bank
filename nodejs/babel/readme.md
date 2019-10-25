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

# 二、配置 (待续)
## 1 babel.config.js
```
    module.exports = function (api) {
        api.cache(true);

        const presets = [
            [
                "@babel/preset-env",
                {
                    targets: {
                        edge: "17",
                        firefox: "60",
                        chrome: "67",
                        safari: "11.1",
                    },
                    useBuiltIns: "usage",
                }
            ]
        ];

        const plugins = [];

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
babel src --out-dir lib --presets=@babel/preset-env 使用 Preset
babel src --out-dir lib --plugins=@babel/proposal-class-properties,@babel/transform-modules-amd 使用插件
babel src --out-dir lib --source-maps inline 编译并输出源码映射表（Source Maps）