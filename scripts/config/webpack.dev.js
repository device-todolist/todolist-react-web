const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const common = require("./webpack.common");
const { SERVER_HOST, SERVER_PORT } = require("../conf");
const proxySetting = require("./proxy");
const paths = require("../paths");

// NOTE - 配置信息有所调整，从v3迁移至v4，链接 https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  target: "web",
  output: {
    filename: "js/[name].js",
    path: paths.appBuild,
  },
  resolve: {
    fallback: {
      querystring: require.resolve("querystring-es3"),
    },
  },
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    devMiddleware: {
      stats: "errors-only", // 终端仅打印 error
    },
    client: {
      logging: "info", // 日志等级;
    },
    compress: true, // 是否启用 gzip 压缩
    open: false, // 打开默认浏览器
    hot: true, // 热更新
    proxy: { ...proxySetting }, // 代理
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
});
