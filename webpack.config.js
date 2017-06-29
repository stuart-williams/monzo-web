const path = require('path')

const rootPath = path.join(__dirname, 'app')
const distPath = path.join(__dirname, 'public')

module.exports = {
  entry: path.join(rootPath, 'main.js'),
  output: {
    filename: '[name].js',
    path: distPath
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
