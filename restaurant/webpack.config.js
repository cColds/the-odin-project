const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

/** @type { import('webpack').Configuration } */

module.exports = {
  mode: 'development',

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
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Zen - Restaurant',
      template: './src/index.html',
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: './styles/[name].css',
      chunkFilename: './styles/[id].css',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
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

  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    liveReload: true,
    watchFiles: [
      './src/index.html',
      './src/**/*.scss',
    ],
  },
};
