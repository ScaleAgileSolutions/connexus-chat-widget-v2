const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'chat-widget.js',  // Bundled JS file
    path: path.resolve(__dirname, 'dist'),
    library: 'ChatWidget',  // Expose ChatWidget globally
    libraryTarget: 'umd',   // Works in any environment (browser, CommonJS, etc.)
    globalObject: 'this',   // Ensures compatibility in browser environments
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Include this for local testing
    }),
  ],
  devtool: 'source-map',  // For easier debugging
};
