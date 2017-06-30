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
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'font-loader' }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader?limit=100000'
        }
      }
    ]
  }
}
