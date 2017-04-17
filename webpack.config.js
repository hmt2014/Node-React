var webpack = require('webpack');
var path = require('path');

module.exports = {
    // 页面入口文件配置
    entry : {
        'view/main/index': './client/js/view/main/index.js'
    },
    // 入口文件输出配置
    output : {
        path : path.resolve(__dirname , './client/output/js/'),
        filename : '[name].bundle.js'
    },
    module: {
        loaders: [
                {
                    test: /\.css$/,
                        loader: 'style-loader!css-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader!jsx-loader?harmony'
                }
            ]
        },
    // 其他解决方案配置
    resolve: {
        extensions: [ '.js', '.jsx', '.css', '.json'],
    }
}