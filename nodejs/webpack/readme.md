# 一、开始
## 1. 安装
```
npm init -y
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
```
## 2. package.json
```
"scripts": {
    "start": "webpack-dev-server --open --config build/webpack.dev.js",
    "build": "webpack --config build/webpack.prod.js"
}
```

# 二、webpack.config配置
更多配置教程：https://www.webpackjs.com/configuration/
## 1. 入口起点
### 1.1 单页应用程序
```
const config = {
  entry: {
    app: './src/main.js',
  }
};
```
### 1.2 多页面应用程序
```
const config = {
  entry: {
    home: "./src/home/index.js",
    about: "./src/about/index.js",
    contact: "./src/contact/index.js"
  }
};
```
## 2. 输出
```
const config = {
  output: {
    //固定名称。
    filename: 'app.js',
    //根据入口名称生成名称
    filename: '[name].js',
    //根据入口名称的同时，再生成hash值，最后生成名称
    filename: '[name].[hash].js',

    path: path.resolve(__dirname, 'dist')
  }
};
```
## 3. loader
loader 用于对模块的源代码进行转换。
loader列表：https://www.webpackjs.com/loaders/

常用loader
```
const config = {
    module: {
        rules: [
            //加载 CSS 为了 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            //加载图片 ( import Icon from './icon.png')
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            //babel-loader 配置在babel.config里
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
```
## 4. 插件(plugins)
插件目的在于解决 loader 无法实现的其他事。
插件列表：https://www.webpackjs.com/plugins/

常用插件
```
HtmlWebpackPlugin  输出到/dist文件夹的同时创建 HTML 文件
CleanWebpackPlugin 清理 /dist 文件夹插件
```
## 5. devServer
webpack-dev-server 能够用于快速开发应用程序 或者使用 webpack-dev-middleware 但需要配合其他服务程序一起使用。
```
devServer: {
    contentBase: path.join(__dirname, "dist"),
    //启用热更新
    hot: true,
    port: 9000
},
```
## 6. 模式
```
const config = {
    mode: "development" 
    //从webpack4开始，mode:"production"会开启UglifyJsPlugin压缩插件
    mode: "production"  
};
```
### 6.1 process.env.NODE_ENV
```
process 是webpack的一个全局变量 
mode: development --> process.env.NODE_ENV = development
mode: production --> process.env.NODE_ENV = production
```
## 7. devtool
此选项控制是否生成，以及如何生成 source map。
```
const config = {
    //适合开发环境
    devtool: 'cheap-module-eval-source-map',
    //适合生产环境
    devtool: 'source-map',
    devtool: 'none',
    //针对一些第三方工具
    devtool: 'inline-source-map',
};
```

# 三、其他
## 1. 代码分离
https://www.webpackjs.com/guides/code-splitting/
```
1.入口起点：使用 entry 配置手动地分离代码。
2.防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。 ExtractTextPlugin: 用于将 CSS 从主应用程序中分离。
3.动态导入：通过模块的内联函数调用来分离代码。
```
## 2. 懒加载
```
https://www.webpackjs.com/guides/lazy-loading/
```
## 3. 缓存
分包：webpack4分包工具SplitChunksPlugin
```
optimization:{
    splitChunks: {
        cacheGroups: {
            //创建名为commons的代码块,它包含了入口之间共享的所有代码
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: 2
            },
            //创建一个vendor代码块,它包含了整个应用中所有来自node_modules的代码
            vendors: {
                name: "vendors",
                chunks: "all",
                test: /[\\/]node_modules[\\/]/
            }
        }
    }
}
```

# 四、API
https://www.webpackjs.com/api/