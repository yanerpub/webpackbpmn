const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true,
    watchContentBase: true,
    port: 8080
  }
}