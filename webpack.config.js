var webpack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = function (env) {
    env = env || 'dev';
    var entry = path.resolve(__dirname, 'Binder.js'),
        dist = __dirname,
        plugins = []

    if (env === 'dev') {
        entry = __dirname + '/demo/src/index.js';
        dist = __dirname + '/demo';
        plugins.push(new HTMLPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    return {
        context: __dirname,
        entry,
        output: {
            filename:env === 'dev'? 'index.js':'Binder.js',
            path: dist,
            publicPath: ""
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: ['node_modules'],
                    loader: 'babel-loader'
                }
            ]

        },
        plugins: plugins,
        devServer: {
            contentBase: __dirname+'/demo/dist',
            compress: true,
            port: 8000,
            hot: true
        }

    }
}