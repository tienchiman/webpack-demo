const {resolve} = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },

    moduleRules: {
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
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
    ]
}