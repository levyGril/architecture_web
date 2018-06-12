/**
 * Created by levy on 2018/6/1.
 */

const argv = require("yargs-parser")(process.argv.slice(2));
//相同的配置会覆盖掉
const merge = require('webpack-merge');
const _mode = argv.mode||"development";
const _modeFlag = _mode === "production"?true:false;
const path = require("path");
// Match files using the patterns the shell uses, like stars and stuff.
const glob = require("glob");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//自定义插件
const HtmlAfterWebpackPlugin = require('./config/HtmlAfterWebpackPlugin');

//根据_mode获取相应的配置文件
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

// options is optional
const files = glob.sync("./src/webapp/views/**/*.entry.js");
let _entry = {}; //webpack公用入口
let _plugins = []; //公用插件
for(let  item of files){
    // . : 匹配除换行符（\n、\r）之外的任何单个字符。要匹配包括 '\n' 在内的任何字符
    //+ : 匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"
    if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item)){
        // index.entry.js -> index.index.js
        const entryKey = RegExp.$1;

        // dist: 外层文件夹的名字
        // template: 内部html的名字
        const [dist,template] = entryKey.split('-');

        _plugins.push(
            new HtmlWebpackPlugin({  // Also generate a test.html
                filename: `../views/${dist}/pages/${template}.html`,  //文件送到哪里,与output吐出的路径相对
                template: `src/webapp/views/${dist}/pages/${template}.html`, // 源文件在哪 此处webpack.config.js与src同级
                minify:{
                    collapseWhitespace: _modeFlag, // 空格
                    removeAttributeQuotes: _modeFlag //去掉引号
                },
                inject:false
            })
        );

        _entry[entryKey] = item;
    }
}
let webpackConfig = {
    entry: _entry,
    output:{
        path: path.join(__dirname, './dist/assets'),
        publicPath:"/",
        filename:"scripts/[name].bundle.js"
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1 ,
                                minimize: _modeFlag //是否开启压缩
                            } },
                        'postcss-loader'
                    ]
                })
            }
        ],
    },
    //1. 做webpack插件，提取压缩css/js，插入到应该在的文件之中
    //2. 插件什么时候生效
    //3. HtmlWebpackPlugin在将文件准备拷贝到dist之前，拦截，拿到生成的对应的entry, 然后将文件插入
    plugins: [
        ..._plugins, // 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
        new HtmlAfterWebpackPlugin()
    ],
    watch: _modeFlag,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    optimization: {
        minimize: _modeFlag,
        runtimeChunk: {
            name: "runtimechunk"
        },
        splitChunks:{
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                    minSize:0
                }
            }
        }
    }

};
module.exports = merge(webpackConfig, _mergeConfig);
