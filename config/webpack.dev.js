/**
 * Requires
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Variables
 */
const PATHS = {
  src: path.join(__dirname, '..', 'src'),
  dist: path.join(__dirname, '..', 'dist')
};

/**
 * Development Configuration
 */
module.exports = {
  context: PATHS.src,
  devtool: 'source-map',
  entry: {
    main: './main.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: PATHS.dist,
    publicPath: '/',
    sourceMapFilename: '[name].map',
  },

  devServer: {
    hot: true,
    contentBase: PATHS.src,
    publicPath: '/',
    stats: 'errors-only'
  },

  module: {
    rules: [{
      test: /\.js?$/,
      include: PATHS.src,
      exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/,
      enforce: 'pre',
      use: [
        {
          loader: 'eslint-loader',
          options: {
            emitWarning: true
          }
        }
      ]
    }, {
      test: /\.js?$/,
      include: PATHS.src,
      exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'assets/[name].[hash].[ext]'
      },
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      path: PATHS.dist,
      filename: 'index.html'
    })
  ]
};
