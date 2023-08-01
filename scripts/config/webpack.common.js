const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const paths = require("../paths");
const { isDevelopment, isProduction } = require("../env");
const { imageInlineSizeLimit } = require("../conf");

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
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": paths.appSrc,
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
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true,
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
};
