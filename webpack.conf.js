var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app/client/js/index.jsx'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /sinon\.js$/,
        loader: 'imports?define=>false,require=>false',
      },
      {
        test: /\.jsx?$/,
        exclude: /(sinon|chai)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(html?|css|json|svg)$/,
        loader: 'raw-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'src/app/build'),
    filename: 'demo.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
