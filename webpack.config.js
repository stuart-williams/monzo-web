const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const rootPath = path.join(__dirname, 'app')
const distPath = path.join(__dirname, 'public')

module.exports = {
  entry: path.join(rootPath, 'main.js'),
  output: {
    filename: '[name].[hash].js',
    path: distPath,
    publicPath: '/'
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
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: true
    // }),
    new HtmlWebpackPlugin({
      template: path.join(rootPath, 'views/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        return module.context && module.context.indexOf('node_modules') > -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
}
