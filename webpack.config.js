const path = require("path");
 
module.exports = {
  mode: "production",
  target: "web",
  entry: path.join(__dirname, "index.js"),
  output: {
    filename: "masory-layout.min.js",
    path: path.resolve(__dirname, "dist"),
  },
  
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  devServer: {
    hot: true,
    compress: true,
    watchContentBase: true,
    open: true,
    port: 5000,
  },
};
