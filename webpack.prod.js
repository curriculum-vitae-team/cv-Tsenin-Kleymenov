const { resolve } = require("path");
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const { EsbuildPlugin } = require("esbuild-loader");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: "es6",
        css: true,
      }),
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[name][ext]",
    path: resolve(__dirname, "./build"),
    clean: true,
  },
});
