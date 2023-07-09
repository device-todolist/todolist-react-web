const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("../paths");
const { isDevelopment, isProduction } = require("../env");

const getCssLoaders = (importLoaders) => [
  isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      modules: false,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          require("postcss-flexbugs-fixes"),
          isProduction && [
            "postcss-preset-env",
            {
              autoprefixer: {
                grid: true,
                flexbox: "no-2009",
              },
              stage: 3,
            },
          ],
        ].filter(Boolean),
      },
    },
  },
];

module.exports = {
  entry: {
    app: paths.appIndex,
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  // output: {
  //   filename: `js/[name]${isDevelopment ? ".js" : ".[hash:8].js"}`,
  //   path: resolve(PROJECT_PATH, "./dist"),
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      Src: paths.appSrc,
      Components: paths.appSrcComponents,
      Utils: paths.appSrcUtils,
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: "less-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets/images",
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets/fonts",
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            limit: 10 * 1024,
            name: "[name].[contenthash:8].[ext]",
            outputPath: "assets/images",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: "index.html",
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDevelopment
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new CopyPlugin({
      patterns: [
        {
          context: paths.appPublic,
          from: "*",
          to: paths.appBuild,
          toType: "dir",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new WebpackBar({
      name: isDevelopment ? "正在启动" : "正在打包",
      color: isDevelopment ? "#52c41a" : "#722ed1",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
  ],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: "all",
      name: "vendors",
      minSize: 0,
    },
  },
};
