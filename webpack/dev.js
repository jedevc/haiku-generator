const merge = require('webpack-merge')
const common = require('./common.js')

const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: common.output.path,
    compress: true
  }
})
