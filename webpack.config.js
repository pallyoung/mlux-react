var webpack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = function (env) {
    env = env || 'dev';
    var entry = {
           'MluxBinder': path.resolve(__dirname, 'MluxBinder.js'),
           'MluxBinder.min':path.resolve(__dirname, 'MluxBinder.js'),
        },
        dist = __dirname + '/dist',
        plugins = [],
        output = {
            filename: '[name].js',
            path: dist,
            publicPath: ""
        }
    if (env === 'dev') {
        entry = __dirname + '/demo/src/index.js';
        dist = __dirname + '/demo/dist';
        output.filename = 'index.js';
        output.path = dist;
        plugins.push(new HTMLPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin())
    } else {
        output.library = 'MluxBinder';
        output.libraryTarget = 'umd';
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            test:'MluxBinder.min',
            comments:false
        }))
    }

    return {
        context: __dirname,
        entry,
        output,
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
            contentBase: __dirname + '/demo/dist',
            compress: true,
            port: 8000,
            hot: true
        }

    }
}