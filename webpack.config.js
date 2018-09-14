const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinWebpackPlugin = require("imagemin-webpack-plugin").default;
const PurifyCSSPluginPurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const NODE_ENV = process.env.NODE_ENV;
let paramNode;
if (!NODE_ENV) {
    paramNode = true;
} else {
    paramNode = false;
}

let pathClean = ['dist'];
module.exports = {
    entry: [
        './src/index.js',
        './src/sass/main.sass',
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "main.js",
        publicPath: "dist/"
    },
    devServer: {
        contentBase: './src/templates/',
        overlay: true,

    },
    devtool: paramNode ? 'inline-source-map' : 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules"
            },

            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
                        }
                    },
                    'sass-loader'

                ],
            },

        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),


        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),

        new CopyWebpackPlugin([{
            from: './src/img/',
            to: './public/images/'
        }]),
        new ImageMinWebpackPlugin({
                disable: paramNode,
                test: /\.(jpe?g|png|gif|svg)$/i,
                jpegtran: {
                    progressive: true,
                },

            },
        ),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: 'index.html',
            template: 'src/templates/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: 'portfolio.html',
            template: 'src/templates/portfolio.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: 'about.html',
            template: 'src/templates/about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            filename: 'contacts.html',
            template: 'src/templates/contacts.html'
        })
    ],
};

