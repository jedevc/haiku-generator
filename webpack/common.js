const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const base = path.resolve(__dirname, '..')

module.exports = {
  entry: [
    path.resolve(base, 'js/main.js'),
    path.resolve(base, 'css/main.css')
  ],
  output: {
    path: path.resolve(base, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      'favicon.ico'
    ]),
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
}
