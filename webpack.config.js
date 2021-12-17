const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
  },
  stats: {
    modules: false,
  },
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
  ],
  resolve: {
    modules: ["node_modules", path.join(__dirname)],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".json", ".css"],
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@designs": path.resolve(__dirname, "./src/designs"),
      "@hook": path.resolve(__dirname, "./src/hook"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
};
