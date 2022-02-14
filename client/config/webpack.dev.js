const baseConfig = require('./webpack.config');
const { SRC, PROJECT_ROOT } = require('./utils');

const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
  entry: ['react-hot-loader/patch', SRC('index.ts')],
  output: {
    filename: 'resources/[name].js',
  },
  cache: {
    type: 'memory'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
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
          'style-loader',
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
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 7001,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false,
      }
    }
  },
  watchOptions: {
    ignored: [
      PROJECT_ROOT('../server'),
      PROJECT_ROOT('dist'),
      PROJECT_ROOT('config'),
    ],
  },
  optimization: {
    runtimeChunk: true
  }
});
