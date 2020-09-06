const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: '/',
  indexPath: 'index.html',
  productionSourceMap: true,
  outputDir: path.join(__dirname, './docs'),
  configureWebpack: (config) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, './static'),
            to: path.join(__dirname, './docs'),
            toType: 'dir',
          },
        ],
      }),
    );
  },
};
