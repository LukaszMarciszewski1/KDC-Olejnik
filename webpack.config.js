const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'assets',
                    }
                  }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new webpack.HotModuleReplacementPlugin(),
    ]
};