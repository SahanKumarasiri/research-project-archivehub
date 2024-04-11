const slsw = require("serverless-webpack");
const WebpackCopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  target: "node",
  entry: slsw.lib.entries,
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: "babel-loader", // Use babel-loader for transformation
      },
    ],
  },
};
