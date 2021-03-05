const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const {
    PLATFORM,
    VERSION
  } = env;
  return merge([{
    entry: './index.jsx',
    output: {
      filename: 'react-basic.js',
      libraryTarget: 'global',
      library: 'Basic',
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react']
            },  
          }
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /node_modules/,
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1
              }
            },
            // MiniCssExtractPlugin.loader,
            // {
            //   loader: 'css-loader',
            //   options: {
            //     modules: true,
            //     sourceMap: true,
            //     importLoaders: 1,
            //   }
            // },
          'sass-loader',
          ]
        },
        {
          test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  importLoaders: 1
                }
              }
            ],
            include: /\.module\.css$/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
          exclude: /\.module\.css$/
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loaders: ['file-loader'],
          include: path.resolve(__dirname, '../')
      }
        ]
      },
    resolve:{
      extensions:['*', '.js', '.jsx', 'scss', 'sass']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
        reloadAll: true,
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // disable creating additional chunks
    }),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: './index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(env.VERSION),
        'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
      }),
      new CopyWebpackPlugin([{
        from: 'src/static'
      }]),
    ],
    devtool: 'eval-source-map',
  }])
};
