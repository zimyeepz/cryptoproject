const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // path to our input file
  output: {
    path: path.resolve(__dirname, '../static/cryptoapp/js'), //path to our Django static directory
    filename: "index-bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    /*new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),*/
  ],
};
