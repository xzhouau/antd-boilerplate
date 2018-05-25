import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

export default {
  mode: 'production',
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index'],
  target: 'web',
  performance: {
    hints: false,
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'app.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new HtmlWebpackPlugin({
      filename: `${__dirname}/dist/index.html`,
      template: `${__dirname}/public/index.html`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), use: ['babel-loader'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: ['file-loader'] },
      { test: /\.(woff|woff2)$/, use: ['file-loader?prefix=font/&limit=5000'] },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader?limit=10000&mimetype=application/octet-stream'],
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader?limit=10000&mimetype=image/svg+xml'],
      },
      { test: /\.(jpe?g|png|gif)$/i, use: ['file-loader'] },
      { test: /\.ico$/, use: ['file-loader?name=[name].[ext]'] },
      // https://github.com/webpack/style-loader#recommended-configuration
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'node_modules/antd'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
