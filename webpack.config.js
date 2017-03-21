const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    modeler: './src/modeler.js',
    viewer: './src/viewer.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true,
    watchContentBase: true,
    port: 8080,
    proxy: {
      "/workflow": "http://localhost:8088"
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}