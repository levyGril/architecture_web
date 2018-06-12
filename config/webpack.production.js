/**
 * Created by levy on 2018/6/1.
 */
// Copies individual files or entire directories to the build directory
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const minify = require('html-minifier').minify;
const path = require('path');
module.exports = {
    output: {
        filename: 'scripts/[name].[hash:5].bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from:  path.join(__dirname,'..','/src/webapp/views/common/layout.html'),
                to: '../views/common/layout.html' // to 路径是相对于webpack的output
            }
        ]),
        new CopyWebpackPlugin([
            {
                from:  path.join(__dirname,'..','/src/webapp/widgets/'),
                to: '../widgets',
                transform (content, path) {
                    return minify(content.toString("utf-8"),{
                        collapseWhitespace: true, // 空格
                        removeAttributeQuotes: true //去掉引号
                    });
                }
            }
        ], {
            copyUnmodified: false, // Copies files, regardless of modification when using watch or webpack-dev-server. All files are copied on first build, regardless of this option
            ignore: [ '*.js','*.css', '*.less' ]
        }),
        new ExtractTextPlugin({
            filename: "styles/[name].[hash:5].css"
        })
    ]
};