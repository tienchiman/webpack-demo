const {resolve: pathResolve} = require('path');
const webpack = require('webpack');
const {moduleRules, resolve: webpackResolve, plugins } = require('./base')
const {dev: {devServer, config}} = require('../config/index.js');
//npm install internal-ip https://www.npmjs.com/package/internal-ip
if(config.useIp){
    const internalIp = require('internal-ip')
    const host = internalIp.v4.sync()
     Object.assign(devServer, {host})
}

const createHtml = require('./createHtml');
const {htmls, entries } = createHtml(true);

module.exports = {
    entry: entries,
    devtool: 'inline-source-map',
    devServer,
    output: {
        path: pathResolve(__dirname, '../dist'),
        //热更新(HMR)不能和[chunkhash]同时使用。
        // filename: 'js/[name]-[chunkhash].js', // 用于长效缓存
        filename: 'js/[name]-[hash].js', // 用于长效缓存
    },
    module:moduleRules,
    resolve: webpackResolve,
    plugins: [
        ...plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({"process.env": JSON.stringify(config)}),
        ...htmls
    ]
}
