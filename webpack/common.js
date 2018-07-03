const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const base = path.resolve(__dirname, '..')

module.exports = {
  entry: [
    path.resolve(base, 'js/main.js'),
    path.resolve(base, 'css/main.css')
  ],
  output: {
    path: path.resolve(base, 'dist'),
    filename: 'bundle.js'
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
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    })
  ]
}
