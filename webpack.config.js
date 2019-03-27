const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        exclude: '/node_modules/react-table',
        loader:
          'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};
