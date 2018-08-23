const path = require('path');
const webpack = require('webpack');
const {moduleRules, resolve: webpackResolve, plugins } = require('./base')

const CleanWebpackPlugin = require('clean-webpack-plugin');
const {build: {config}} = require('../config/index.js');
const createHtml = require('./createHtml');
const {htmls, entries　} = createHtml(false);

module.exports = {
    entry:entries,
    output: {
        path: path.resolve(__dirname, '../dist'),
        // filename: 'js/[name].js',
        filename: 'js/[name]-[chunkhash].js', // 用于长效缓存
        // publicPath: 'static', //输出解析文件的路径, 相对于html文件
        // pathinfo: false
    },
    module:moduleRules,
    resolve: webpackResolve,
    plugins: [
        ...plugins,
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),  //根目录
            verbose: true,    //开启在控制台输出信息
            dry: false　　　　  //启用删除文件
        }),
        new webpack.DefinePlugin({"process.env": JSON.stringify(config)}),
        ...htmls
    ]
}
