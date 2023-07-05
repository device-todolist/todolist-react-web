const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { isDev, PROJECT_PATH } = require("../constants");

const getCssLoaders = (importLoaders) => [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          require("postcss-flexbugs-fixes"),
          isDev && [
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
    app: path.resolve(PROJECT_PATH, "./src/index.tsx"),
  },
  output: {
    filename: `js/[name]${isDev ? ".js" : ".[hash:8].js"}`,
    path: path.resolve(PROJECT_PATH, "./dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      Src: path.resolve(PROJECT_PATH, "./src"),
      Components: path.resolve(PROJECT_PATH, "./src/components"),
      Utils: path.resolve(PROJECT_PATH, "./src/utils"),
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
              sourceMap: isDev,
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
              sourceMap: isDev,
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
      template: path.resolve(PROJECT_PATH, "./public/index.html"),
      filename: "index.html",
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
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
          context: path.resolve(PROJECT_PATH, "./public"),
          from: "*",
          to: path.resolve(PROJECT_PATH, "./dist"),
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
      name: isDev ? "正在启动" : "正在打包",
      color: "#fa8c16",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, "./tsconfig.json"),
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
