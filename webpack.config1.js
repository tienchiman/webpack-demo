const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * 1 . npm init -y 初始化npm,生成npm包
 *    https://webpack.docschina.org/guides/installation/#%E6%9C%AC%E5%9C%B0%E5%AE%89%E8%A3%85
 * 2 npm i webpack webpack-cli --save-dev
 *   安装path模块 如果提示错误安装提示的模块
 *
 *   在npm里面使用webpack --config ./目录/文件就可以运行了
 * */
console.error(`mode---${process.env.NODE_ENV}`);
module.exports = {
    entry: {
        // 这里的几个名字, 都是要引入html里面的, 在html  plugin的 chunk里面用的就是这个名字
        main: path.resolve(__dirname, './src/main.js'),
        // 此处用的是想对路径,  此处src和这个文件是平级 所以这么写
        index: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'js/[name].js',
        // 生成的名字: 这里的生成的名字在目录js下面 / name加chunkHash
        filename: 'js/[name]-[chunkhash].js', // 用于长效缓存
        // publicPath: 'static', //输出解析文件的路径, 相对于html文件
        // pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        // 要先安装一个插件
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 这里要安装url-loader file-loader
                            limit: 8192,
                            name: 'images/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.j(s|sx)$/,
                exclude: /node_modules/,
                use: {
                    // babel-loader babel-core @babel/core
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // 这里能控制打包后生成的css目录在哪里 此处在css下;注意, 这里是想对于dist目录下的
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        // 
        // 这里是配置不同环境的 process.env的 其值就在后面
        new webpack.DefinePlugin({"process.env": JSON.stringify({name: 'tienchi', NODE_ENV: 'develop'})}),
    ]
};
