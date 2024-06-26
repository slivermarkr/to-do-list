const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
 mode: 'development',
 entry: {
  bundle: path.resolve(__dirname, 'src/index.js'),
 },
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name][contenthash].js',
  clean: true,
  assetModuleFilename: '[name][ext]',
 },
 devtool: 'source-map',
 devServer: {
  static: {
   directory: path.resolve(__dirname, 'dist'),
  },
  port: 9000,
  open: true,
  hot: true,
  compress: true,
  historyApiFallback: true,
 },
 module: {
  rules: [
   {
    test: /\.scss$/,
    use: ['style-loader','css-loader','sass-loader']
   },
   {
    test: /\.js$/,
    use: {
     loader: 'babel-loader',
     options: {
      presets: ['@babel/preset-env']
     }
    }
   },
   {
    test: /\.(png|svg|jpg|gif)$/i,
    type: 'asset/resource'
   },
  ],
 },
 plugins: [
  new HtmlWebpackPlugin({
   title: 'Todo List App',
   filename: 'index.html',
   template: 'src/template.html'
  }),
 ]
}