const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');

const path = require('path');

/** @type { import('webpack').Configuration } */

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: './assets/[name][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Weather',
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: './styles/[name].css',
      chunkFilename: './styles/[id].css',
    }),
    new DotenvWebpack(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ],
    chunkIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
