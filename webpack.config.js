const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'webpack-build/');
const APP_DIR = path.resolve(__dirname, 'src/');
const PAGES_DIR = path.resolve(__dirname, 'src/js/ui/pages/'); 
const config = {
  entry: {
    main:  APP_DIR + '/render_main.jsx',
    login: APP_DIR + '/render_login.jsx',
    about: APP_DIR + '/render_about.jsx',
	friends: APP_DIR + '/render_friends.jsx'
	
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].bundle.js"
  },
  plugins: [new HtmlWebpackPlugin()],
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