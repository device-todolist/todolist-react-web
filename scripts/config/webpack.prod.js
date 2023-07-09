const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require("../conf");
const common = require("./webpack.common");
const paths = require("../paths");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  target: "browserslist",
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: paths.appBuild,
    assetModuleFilename: "images/[name].[contenthash:8].[ext]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
      ignoreOrder: false,
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: "server", // 开一个本地服务查看报告
        analyzerHost: ANALYZER_HOST, // host 设置
        analyzerPort: ANALYZER_PORT, // 端口号设置
      }),
    new Webpack.BannerPlugin({
      raw: true,
      banner: "/** @preserve Powered by todolist-react-web (https://github.com/device-todolist/todolist-react-web) */",
    }),
  ].filter(Boolean),
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
