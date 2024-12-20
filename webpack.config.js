// GJATE NDRYSHIMIT TE WEBPACK, MOS HARRONI TA RESTARTONI SERVERIN!!! (CTRL + C NE TERMINAL DHE NPM RUN DEV PERSERI)
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Definoni html filet e rinje ketu me poshte...
const pages = [
  //template eshte emri i file's, filename eshte ajo pjesa e url (si default lejeni si emri i file's)
  // "Chunks" e injekton automatikisht javaScript filen ne html,
  { template: "home.html", filename: "home.html", chunks: ["home"] },
  { template: "about/about.html", filename: "about.html", chunks: ["about"] },
  {
    template: "translate/translate.html",
    filename: "translate.html",
    chunks: ["translate"],
  },
  {
    template: "history/history.html",
    filename: "history.html",
    chunks: ["history"],
  },
  { template: "faq/faq.html", filename: "faq.html", chunks: ["faq"] },
  {
    template: "mesimetPages/mesimet/mesimet.html",
    filename: "mesimet.html",
    chunks: ["mesimet"],
  },
  {
    template: "mesimetPages/alfabeti/alfabeti.html",
    filename: "alfabeti.html",
    chunks: ["alfabeti"],
  },
  {
    template: "mesimetPages/numrat/numrat.html",
    filename: "numrat.html",
    chunks: ["numrat"],
  },
  {
    template: "mesimetPages/fjalori/fjalori.html",
    filename: "fjalori.html",
    chunks: ["fjalori"],
  },
  {
    template: "mesimetPages/stinet/stinet.html",
    filename: "stinet.html",
    chunks: ["stinet"],
  },
  {
    template: "mesimetPages/ditetEJaves/ditetEJaves.html",
    filename: "ditetEJaves.html",
    chunks: ["ditetEJaves"],
  },
  {
    template: "mesimetPages/pemet/pemet.html",
    filename: "pemet.html",
    chunks: ["pemet"],
  },
  {
    template: "mesimetPages/perimet/perimet.html",
    filename: "perimet.html",
    chunks: ["perimet"],
  },
  {
    template: "mesimetPages/sportet/sportet.html",
    filename: "sportet.html",
    chunks: ["sportet"],
  },
  { template: "auth/auth.html", filename: "auth.html", chunks: ["auth"] },
  { template: "community/community.html", filename: "community.html", chunks: ["community"] },
  {
    template: "admin/admin.html",
    filename: "admin.html",
    chunks: ["admin", "eventListeners"],
  },
  {
    template: "admin/signs/signs.html",
    filename: "signs.html",
    chunks: ["admin","signs"],
  },
  {
    template: "admin/users/users.html",
    filename: "users.html",
    chunks: ["admin","users"],
  },
  {
    template: "admin/createAdmin/createAdmin.html",
    filename: "createAdmin.html",
    chunks: ["admin","createAdmin"],
  },
  {
    template: "admin/adminFaq/adminFaq.html",
    filename: "adminFaq.html",
    chunks: ["admin","adminFaq"],
  },
  {
    template: "profile/profile.html",
    filename: "profile.html",
    chunks: ["profilePage"],
  },
  { template: "quiz/quiz.html", filename: "quiz.html", chunks: ["quiz"] },
  {
    template: "profile/userHistory/userHistory.html",
    filename: "userHistory.html",
    chunks: ["userHistory"],
  },
  {
    template: "profile/dailyQuestion/dailyQuestion.html",
    filename: "dailyQuestion.html",
    chunks: ["dailyQuestion"],
  },
  { template: "games/games.html", filename: "games.html", chunks: ["games"] },

  {
    template: "games/puzzleGame/puzzle.html",
    filename: "puzzle.html",
    chunks: ["puzzle"],
  },
  { template: "games/memoryGame/memory.html", filename: "memory.html", chunks: ["memory"] },

];

const entryPoints = {
  //Pjesa e fileve JS ku do te injektohen me lart
  app: "./src/js/app.js",
  about: "./src/about/about.js",
  translate: "./src/translate/translate.js",
  history: "./src/history/history.js",
  community: "./src/community/community.js",
  faq: "./src/faq/faq.js",
  mesimet: "./src/mesimetPages/mesimet/mesimet.js",
  alfabeti: "./src/mesimetPages/alfabeti/alfabeti.js",
  numrat: "./src/mesimetPages/numrat/numrat.js",
  fjalori: "./src/mesimetPages/fjalori/fjalori.js",
  stinet: "./src/mesimetPages/stinet/stinet.js",
  ditetEJaves: "./src/mesimetPages/ditetEJaves/ditetEJaves.js",
  pemet: "./src/mesimetPages/pemet/pemet.js",
  perimet: "./src/mesimetPages/perimet/perimet.js",
  sportet: "./src/mesimetPages/sportet/sportet.js",
  auth: "./src/auth/auth.js",
  admin: "./src/admin/admin.js",
  eventListeners: "./src/profile/profileFunctions/eventListeners.js",
  createAdmin: "./src/admin/createAdmin/createAdmin.js",
  users: "./src/admin/users/users.js",
  profile: "./src/profile/profileManager.js",
  profilePage: "./src/profile/profilePage.js",
  resetPassword: "./src/profile/resetPassword/reset-password.js",
  home: "./src/js/home.js",
  signs: "./src/admin/signs/signs.js",
  adminFaq: "./src/admin/adminFaq/adminFaq.js",
  userHistory: "./src/profile/userHistory/userHistory.js",
  dailyQuestion: "./src/profile/dailyQuestion/dailyQuestion.js",
  quiz: "./src/quiz/quiz.js",
  games:"./src/games/games.js",
  puzzle:"./src/games/puzzleGame/puzzle.js",
  memory:"./src/games/memoryGame/memory.js"
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
      target: "https://localhost:8080/home.html",
    },
    server: {
      type: "https",
    },
  },
  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `./src/${page.template}`,
          filename: page.filename,
          chunks: ["app", ...page.chunks], // Si default, "app.js" shtohet ne secilin file
        })
    ),
    new MiniCssExtractPlugin({
      filename: "[name].css",
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
      {
        test: /\.(mp4|webm|ogv)$/,
        type: "asset/resource",
        generator: {
          filename: "videos/[name].[hash][ext]",
        },
      },
    ],
  },
};