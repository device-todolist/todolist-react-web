const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
      ignoreOrder: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // 开一个本地服务查看报告
      analyzerHost: "127.0.0.1", // host 设置
      analyzerPort: 8888, // 端口号设置
    }),
    new Webpack.BannerPlugin({
      raw: true,
      banner: "/** @preserve Powered by todolist-react-web (https://github.com/device-todolist/todolist-react-web) */",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ["console.log"] },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
    },
  },
});
