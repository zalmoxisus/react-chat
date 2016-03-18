var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass') }
    ]
  }
};


// When inside Chat repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var chatSrc = path.join(__dirname, '..', '..', 'src');
var chatNodeModules = path.join(__dirname, '..', '..', 'node_modules');
var fs = require('fs');
if (fs.existsSync(chatSrc) && fs.existsSync(chatNodeModules)) {
  // Resolve to source
  module.exports.resolve = { alias: { 'react-chat': chatSrc } };
  // Compile from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: chatSrc
  });
}
