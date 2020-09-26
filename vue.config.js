/* eslint-disable no-param-reassign */
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  assetsDir: 'assets/',
  publicPath: process.env.VUE_APP_S3_BUCKET,
  devServer: {
    port: process.env.VUE_APP_DEV_SERVER_PORT,
  },
  chainWebpack: (config) => {
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
  configureWebpack: (config) => {
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[name].js';
  },
  css: {
    extract: {
      filename: '[name].css',
    },
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/styles/_variables.scss";`,
      },
    },
  },
};
