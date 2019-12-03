const path = require("path");

module.exports = {
  entry: "./src/playground/redux-expensify.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  // loader
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  //sourcemap
  devtool: "cheap-module-eval-sourcemap",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true
  }
};
