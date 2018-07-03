const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'js/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true
  }
}
