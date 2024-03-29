module.exports={
    entry:__dirname+"/app/js/root.js",
    output:{
        path:__dirname+"/build",
        filename:"app.js"
    },
    devtool:"eval-source-map",
    module:{
        loaders:[
            {
                test:/\.json$/,
                loader:"json-loader"
            },
            {
                test:/\.js$/,
                exclude:"/node_modules",
                loader:"babel-loader",
                query:{
                    presets:["es2015","react"]
                }
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:"url-loader?limit=8129"
            }
        ]
    }
};