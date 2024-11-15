// NESE BENI NDONJE NDRYSHIM NE KETE FILE, MOS HARRONI TA RESTARTONI SERVERIN!!! (CTRL + C NE TERMINAL DHE NPM RUN DEV PERSERI)
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Definoni html filet e rinje ketu me poshte...
const pages = [
  //template eshte emri i file's, filename eshte ajo pjesa e url (si default lejeni si emri i file's)
  // "Chunks" e injekton automatikisht javaScript filen ne html,
  { template: "home.html", filename: "home.html", chunks: ["home"] },
  { template: "about.html", filename: "about.html", chunks: ["about"] },
  { template: "auth.html", filename: "auth.html", chunks: ["auth"] },
  { template: "translate.html", filename: "translate.html", chunks: ["translate"] },
  { template: "history.html", filename: "history.html", chunks: ["history"] },
  { template: "mesimet.html", filename: "mesimet.html", chunks: ["mesimet"] },
  { template: "faq-page.html", filename: "faq.html", chunks: ["faq"] },
  { template: "profile.html", filename: "profile.html", chunks: ["profile"] },
  { template: "admin.html", filename: "admin.html", chunks: ["admin"] },
  { template: "users.html", filename: "users.html", chunks: ["users"] },
  { template: "createAdmin.html", filename: "createAdmin.html", chunks: ["createAdmin"] },
];

const entryPoints = {
  //Pjesa e fileve JS ku do te injektohen lart
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
  createAdmin: "./src/js/admin/createAdmin.js",
  api: "./src/js/profile/apiUrls.js",
  forceReload: "./src/js/forceReload.js",
};

module.exports = {
  //Nuk ka nevoje modifikim ne kete pjese
  mode: "development",
  entry: entryPoints, 
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/**/*.html"],
    open: {
      target: "https://localhost:8080/home.html", // 
    },
    server: {
      type: "https",
    },
  },
  plugins: [
      //Ben lehtesim duke iteruar ne loop duke krijuar HtmlWebpackPlugin per secilin page
    ...pages.map(page => 
      new HtmlWebpackPlugin({
        template: `./src/${page.template}`,
        filename: page.filename,
        chunks: ["app", ...page.chunks], // Si default, "app.js" shtohet ne secilin file
      })
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css", // Gjeneron css
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], 
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
