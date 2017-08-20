var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var fetch = require('node-fetch');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : false,
    entry: "./main/js/client.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    //presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },

            {
              test: /\.css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: "[name]--[local]--[hash:base64:8]"
                  }
                },
                "postcss-loader" // has separate config, see postcss.config.js nearby
              ]
            },
        ]
    },
    output: {
        path: __dirname + "/src/main/resources/static",
        filename: "client.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
