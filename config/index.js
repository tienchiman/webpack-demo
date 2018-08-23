const BuildConfig = require('./production.config');
const DevelopConfig = require('./develop.config');

const { join } = require('path');

module.exports ={
    dev:{
        config: DevelopConfig,
        devServer:{
            contentBase: join(__dirname, "dist"),
            index: 'index.html',
            port: '9527',
            host: 'localhost',
            inline: true,
            hot: true,
            /**
             * 这个配置属性用来在编译出错的时候，在浏览器页面上显示错误，默认是false，可设置为true
             * */
            overlay: true,

            /**
             * stats（字符串）
             *"errors-only"表示只打印错误：
             * "minimal"，"normal"，"verbose"，这里不多加赘述
             * */
            stats: "errors-only",

            /**
             * quiet
             当这个配置属性和devServer.stats属于同一类型的配置属性
             当它被设置为true的时候，控制台只输出第一次编译的信息，当你保存后再次编译的时候不会输出任何内容，包括错误和警告
             来做个对比吧：
             quiet：false（默认）：
             * */

            /**
             * compress
             这是一个布尔型的值，当它被设置为true的时候对所有的服务器资源采用gzip压缩
             采用gzip压缩的优点和缺点：
             优点：对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能
             缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
             *
             * */
        }
    },
    build: {
        config: BuildConfig,
    }
};

/**
 * 那怎么才能inline mode模式的刷新呢？

 你需要做这些：
 1在配置中写入devServer.hot：true和devServer.inline：true
 2增加一个插件配置webpack.HotModuleReplacementPlugin()

 /*省略entry ,output等内容*/
/*
plugins:[
    new webpack.HotModuleReplacementPlugin()
],
    devServer: {
    inline:true,
        hot:true
}
*/