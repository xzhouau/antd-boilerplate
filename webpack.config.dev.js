import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true,
};

export default {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['./src/webpack-public-path', 'webpack-hot-middleware/client?reload=true', './src/index'],
  target: 'web',
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
      {
        test: /(\.css|\.scss)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap'],
      },
    ],
  },
};
