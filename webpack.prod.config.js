const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpackProd.config.babel');
const prodConfiguration = env => {
  return merge([{
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
    },
  }, ]);
}
module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
}