const { SRC, isProd, DIST, NODE_MODULES, PROJECT_ROOT, LOADERS } = require('./utils');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

const chalk = require('chalk');

/**
 * @type {import('webpack').Configuration}
 */
const configuration = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: DIST(),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': SRC(),
      'semi': NODE_MODULES('@douyinfe', 'semi-ui'),
      'semi-icons': NODE_MODULES('@douyinfe', 'semi-icons')
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: SRC('index.html'),
      filename: 'index.html'
    }),
    new ProgressBarWebpackPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: PROJECT_ROOT('tsconfig.json')
      }
    }),
    new MonacoEditorWebpackPlugin({
      languages: ['css', 'javascript', 'typescript', 'json'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          },
          {
            loader: LOADERS('loadable.js')
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:jpe?g|png|svg|gif)/i,
        type: 'asset',
        generator: {
          filename: 'asset/imgs/[contenthash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      },
      {
        test: /\.ttf$/,
        type: 'asset',
        generator: {
          filename: 'asset/fonts/[contenthash][ext][query]'
        },
      }
    ]
  }
};

module.exports = configuration;
