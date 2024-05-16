const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      // Add any necessary loaders here
    ]
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    usedExports: true,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 300000,
    maxEntrypointSize: 500000,
  },
  stats: {
    assetsSort: '!size',
    children: false,
    modules: false,
    chunks: false,
    chunkModules: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});

