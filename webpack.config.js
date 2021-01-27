const path = require("path");

module.exports = {
  target: "web",
  entry: [path.join(__dirname, "src/js/script.js")],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    hot: true,
    compress: true,
    watchContentBase: true,
    open: true,
    port: 5000,
  },
};
