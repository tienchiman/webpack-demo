const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const createHtml = require('./build/createHtml.js');
const someConfig = createHtml(true);

module.exports = {
    entry: someConfig.entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[chunkhash].js', // 用于长效缓存
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        index: 'index.html',
        port: '9527',
        host: 'localhost'
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
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
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({"process.env": JSON.stringify({name: 'tienchi', NODE_ENV: 'develop'})}),
        ...someConfig.htmls
    ]
}
