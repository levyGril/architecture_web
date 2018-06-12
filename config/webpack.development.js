/**
 * Created by levy on 2018/6/1.
 */
// Copies individual files or entire directories to the build directory
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
module.exports = {
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
                to: '../widgets'
            }
        ], {
            copyUnmodified: true, // Copies files, regardless of modification when using watch or webpack-dev-server. All files are copied on first build, regardless of this option
            ignore: [ '*.js','*.css', '*.less' ]
        }),
        new ExtractTextPlugin({
            filename: "styles/[name].bundle.css"
        })
    ]
};