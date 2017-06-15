/**
 * Requires
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const JsDocPlugin = require('jsdoc-webpack-plugin');

/**
 * Variables
 */
const PATHS = {
  src: path.join(__dirname, '..', 'src'),
  dist: path.join(__dirname, '..', 'dist')
};

/**
 * Production Configuration
 */
module.exports = {
  context: PATHS.src,
  devtool: false,
  entry: {
    main: './main.js'
  },

  output: {
    filename: '[name]-[hash].js',
    path: PATHS.dist
  },

  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    inline: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  },

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name]-[hash:8].[ext]',
          }
        }
      },
      {
        test: /\.js$/,
        include: PATHS.src,
        exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      path: PATHS.dist,
      filename: 'index.html'
    }),
    new JsDocPlugin({
      conf: './jsdoc.json'
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        loops: true,
        unused: true,
        if_return: true,
        join_vars: true,
        warnings: true
      },
      comments: false
    }),
    new ExtractTextPlugin('app-[hash].css'),
  ],
};
