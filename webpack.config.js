var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'webpack-build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }, { test: /\.css$/, loader: "style-loader!css-loader" },
			{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      },
    },
  ],
}
    ]
  },
  
  resolve: {
  modules: [
    path.resolve('./src'),
    path.resolve('./node_modules')
  ]
}
};

module.exports = config;