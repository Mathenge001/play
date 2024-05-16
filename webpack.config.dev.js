const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // Enables live reloading and hot module replacement
    liveReload: true,
    hot: true,
    // Automatically opens the browser when dev server starts
    open: true,
    // Specifies the directory where to serve the static files
    static: { directory: './' },
    // Additional devServer options can be added here
  },
});

