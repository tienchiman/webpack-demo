const glob = require('glob');
const {join, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
    // name src/views/html目录下的文件名  isDev是在build还是本地server commonChunk: 公共的chunk
const createOptions = (name, isDev, commonChunks = ['main']) =>  ({
    template: join(__dirname, `../src/views/html/${name}.html`),

    filename: `.${(name === 'index' ? '/' : '/pages/')}${name}.html`,
    /**
     chunks：允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
     在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
     * */
    chunks: commonChunks.concat([name]),
    // excludeChunks:[],  这个与chunks配置项正好相反，用来配置不允许注入的thunk。
    hash: false,
    /**
     * inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
             1、true或者body：所有JavaScript资源插入到body元素的底部
             2、head: 所有JavaScript资源插入到head元素中
             3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
     * */
    inject: true,
    compile: true,
    favicon: false,
    minify: isDev ? false : {"removeAttributeQuotes": true, "removeComments": true, "removeEmptyAttributes": true},
    /**
     * cache: true|fasle, 默认true； 如果为true表示在对应的thunk文件修改后就会emit文件
     * */
    cache: isDev,

    /*showErrors: true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试*/
    showErrors: isDev,
    title: name,
    /**favicon: 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值* */
});
// 入口和html相关所以一样也在这里写
const createEntries = (name) => ({[name]: resolve(__dirname, `../src/views/scripts/${name}.js`)});

module.exports = (isDev) => {
    const paths = glob.sync("src/views/scripts/*.js");//同步读取
    // console.log('------------------------目录下的文件有:------------------------------------');
    // console.log(paths);
    // console.log('------------------------------------------------------------');
    let entries = {main: resolve(__dirname, `../src/main.js`)} , htmls = [];

    paths.forEach(url => {
        const name = url.split('scripts/')[1].replace('.js', '').trim();
        Object.assign(entries, createEntries(name));// entries[name] = "./" + file;
        htmls.push(new HtmlWebpackPlugin(createOptions(name, isDev, ['main'])));
    });
    return { entries, htmls }
};

