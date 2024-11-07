// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./js/app.js",
    faq: "./js/faq.js",
    history: "./js/history.js",
    // alfabeti: "./js/alfabeti.js",
    // auth: "./js/auth.js",
    // fjalori: "./js/fjalori.js",
    mesimet: "./js/mesimet.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./*.html"],
    static: {
      directory: path.join(__dirname, "public"), // Make sure `public` has `index.html`
    },
    open: true, // Automatically opens the browser
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./home.html", // Template for home page
      filename: "home.html", // Output filename for home page
      chunks: ["app"], // Include only home.js bundle
    }),
    new HtmlWebpackPlugin({
      template: "./faq-page.html", // Template for FAQ page
      filename: "faq-page.html", // Output filename for FAQ page
      chunks: ["faq"], // Include only faq-page.js bundle
    }),

    new HtmlWebpackPlugin({
      template: "./mesimet.html", // Template for mesimet page
      filename: "mesimet.html", // Output filename
      chunks: ["mesimet"], // Include only mesimet.js bundle
    }),
    new HtmlWebpackPlugin({
      template: "./history.html",
      filename: "history.html",
      chunks: ["history"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
