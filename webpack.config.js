const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

require("dotenv").config();

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html"
  //   favicon: "./src/favicon.ico",
});

const cssPlugin = new MiniCSSExtractPlugin({
  filename: "./assets/css/styles.css"
});

const dotEnvPlugin = new Dotenv();
const webpackEnvPlugins = new webpack.DefinePlugin({
  "process.env.FIREBASEAPIKEY": JSON.stringify(process.env.FIREBASEAPIKEY),
  "process.env.FIREBASEAUTHDOMAIN": JSON.stringify(
    process.env.FIREBASEAUTHDOMAIN
  ),
  "process.env.FIREBASEDATABASEURL": JSON.stringify(
    process.env.FIREBASEDATABASEURL
  ),
  "process.env.FIREBASEPROJECTID": JSON.stringify(
    process.env.FIREBASEPROJECTID
  ),
  "process.env.FIREBASESTORAGEBUCKET": JSON.stringify(
    process.env.FIREBASESTORAGEBUCKET
  ),
  "process.env.FIREBASEMESSAGINGID": JSON.stringify(
    process.env.FIREBASEMESSAGINGID
  ),
  "process.env.FIREBASEAPPID": JSON.stringify(process.env.FIREBASEAPPID),
  "process.env.FIREBASEMEASUREMENTID": JSON.stringify(
    process.env.FIREBASEMEASUREMENTID
  ),
  "process.env.ENVIRONMENT": JSON.stringify(process.env.ENVIRONMENT)
});

module.exports = {
  devtool: "eval",
  entry: "./src/App.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".css",
      ".png",
      ".jpeg",
      ".jpg",
      ".gif",
      ".svg"
    ]
  },
  node: {
    net: "empty",
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {
              useEslintrc: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|pdf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1,
              name: "[name].[ext]",
              outputPath: "./assets/img/"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [htmlPlugin, cssPlugin, dotEnvPlugin, webpackEnvPlugins]
};
