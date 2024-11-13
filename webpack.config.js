const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Define the pages and their corresponding entry points and specific chunks
const pages = [
  { template: "home.html", filename: "home", chunks: ["home"] },
  { template: "about.html", filename: "about", chunks: ["about"] },
  { template: "auth.html", filename: "auth", chunks: ["auth"] },
  { template: "translate.html", filename: "translate", chunks: ["translate"] },
  { template: "history.html", filename: "history", chunks: ["history"] },
  { template: "mesimet.html", filename: "mesimet", chunks: ["mesimet"] },
  { template: "faq-page.html", filename: "faq", chunks: ["faq"] },
  { template: "profile.html", filename: "profile", chunks: ["profile"] },
  { template: "admin.html", filename: "admin", chunks: ["admin", "eventListeners"] },
  { template: "users.html", filename: "users", chunks: ["profile", "users"] },
];

const entryPoints = {
  app: "./src/js/app.js", 
  home: "./src/js/home.js",
  auth: "./src/js/auth.js",
  alfabeti: "./src/js/alfabeti.js",
  ditetEJaves: "./src/js/ditetEJaves.js",
  faq: "./src/js/faq.js",
  fjalori: "./src/js/fjalori.js",
  numrat: "./src/js/numrat.js",
  search: "./src/js/search.js",
  sportet: "./src/js/sportet.js",
  translate: "./src/js/translate.js",
  video: "./src/js/video.js",
  about: "./src/js/about.js",
  history: "./src/js/history.js",
  mesimet: "./src/js/mesimet.js",
  profile: "./src/js/profile/profile.js",
  eventListeners: "./src/js/profile/eventListeners.js",
  admin: "./src/js/admin/admin.js",
  users: "./src/js/admin/users.js",
};

module.exports = {
  mode: "development",
  entry: entryPoints, // Using entryPoints from the defined object
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/**/*.html"],
    open: {
      target: "https://localhost:8080/home", // Automatically open home
    },
    server: {
      type: "https",
    },
  },
  plugins: [
    // Loop to generate HtmlWebpackPlugin for each page
    ...pages.map(page => 
      new HtmlWebpackPlugin({
        template: `./src/${page.template}`,
        filename: page.filename,
        chunks: ["app", ...page.chunks], // Add "app" chunk as a base for each page
      })
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css", // Generate separate CSS files for each page
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS
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
