const baseConfig = require('./webpack.config');
const { SRC } = require('./utils');

const { merge } = require('webpack-merge');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * @type {import('webpack').Configuration['plugins']}
 */
const PLUGINS = [
  new MiniCssExtractPlugin({
    filename: 'resources/[name].[contenthash:8].css'
  }),
];

if (!!process.env.ANALYZE) PLUGINS.push(new BundleAnalyzerPlugin());

module.exports = merge(baseConfig, {
  entry: [SRC('index.ts')],
  output: {
    clean: true,
    filename: 'resources/[name].[contenthash:8].js',
  },
  module: {
    noParse: /react\.production\.min\.js/,
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
        ]
      },
      {
        test: /\.s[ca]ss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'sass-loader',
        ]
      }
    ]
  },
  devtool: 'nosources-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerWebpackPlugin(),
    ],
    splitChunks: {
      // 表示选择哪些 chunks 进行分割，可选值有：async，initial 和 all 
      // async 为 dynamic import
      chunks: 'all',
      // 表示新分离出的 chunk 必须大于等于 minSize，单位 b
      minSize: 50 * 1000,
      // 通过确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块,仅在剩余单个 chunk 时生效
      minRemainingSize: 0,
      // 表示一个模块至少应被 minChunks 个 chunk 所包含才能分割。默认为 1
      minChunks: 1,
      // 表示按需加载文件时，并行请求的最大数目。
      maxAsyncRequests: 30,
      // 表示加载入口文件时，并行请求的最大数目。
      maxInitialRequests: 30,
      // 强制执行拆分的体积阈值和其他限制
      // （minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略
      enforceSizeThreshold: 50000,
      // chunk name 与文件名称的链接符
      automaticNameDelimiter: '~',
      // cacheGroups 下可以可以配置多个组，每个组根据 test 设置条件，符合 test 条件的模块，就分配到该组。
      // 模块可以被多个组引用，但最终会根据 priority 来决定打包到哪个组中。
      // 默认将所有来自 node_modules 目录的模块打包至 vendors 组，将两个以上的 chunk 所共享的模块打包至 default 组
      cacheGroups: {
        lodash: {
          name: 'lodash',
          // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。
          priority: 40,
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
          reuseExistingChunk: true,
        },
        asynchronous: {
          chunks: 'async',
          minChunks: 2,
          name: 'asynchronous',
          priority: 30,
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
        },
        semi: {
          name: 'semi',
          test: /[\\/]node_modules[\\/]@douyinfe[\\/]/,
          priority: 20,
          reuseExistingChunk: true
        },
        i18n: {
          name: 'i18n',
          test: /[\\/]node_modules[\\/]i18next/,
          priority: 20,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
          reuseExistingChunk: true,
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: PLUGINS
});