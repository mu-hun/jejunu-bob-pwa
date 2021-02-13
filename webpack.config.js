const webpack = require('webpack')
const path = require('path')

const sourcePath = path.resolve('src')
const outPath = path.resolve('dist')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, options) => {
  const isProduction = options.mode === 'production'

  return {
    context: sourcePath,
    entry: {
      app: './index.tsx'
    },
    output: {
      path: outPath,
      filename: 'main.js',
      chunkFilename: '[name].js'
    },
    target: 'web',
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      mainFields: ['module', 'browser', 'main']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /\.test.tsx?$/,
          use: ['ts-loader']
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: isProduction
                  ? '[hash:base64:5]'
                  : '[local]__[hash:base64:5]'
              }
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        name: true,
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            filename: 'vendor.js',
            priority: -10
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'app.css',
        disable: !isProduction
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve('public'),
          to: outPath,
          toType: 'dir',
          ignore: ['service-worker.ts']
        }
      ])
    ],
    devServer: {
      contentBase: sourcePath,
      hot: true,
      inline: true,
      historyApiFallback: {
        disableDotRule: true
      },
      stats: 'minimal',
      clientLogLevel: 'warning'
    },
    devtool: isProduction
      ? 'hidden-source-map'
      : 'cheap-module-eval-source-map',
    node: {
      fs: 'empty',
      net: 'empty'
    }
  }
}
