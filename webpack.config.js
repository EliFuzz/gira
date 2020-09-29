const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: {
    background: './src/js/background.js',
    content: './src/js/content.js',
    options: './src/js/options.js',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  plugins: [
    new ChromeExtensionReloader({
      port: 9097,
      reloadPage: false,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: resolve(__dirname, 'src'),
          from: 'manifest.json',
          to: 'manifest.json',
        },
        {
          context: resolve(__dirname, 'src', 'images'),
          from: '**/*',
          to: 'images/',
        },
        {
          context: resolve(__dirname, 'src', 'css'),
          from: '**/*',
          to: 'css/',
        },
        {
          context: resolve(__dirname, 'src', 'html'),
          from: '**/*.html',
          to: 'html/[name].html',
        },
      ],
    }),
  ],
};
