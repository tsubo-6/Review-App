//requireでexpressモジュールを読み込む
const express=require("express");
const cors = require('cors');

// const mysql = require('mysql2');
const postRoute = require("./routes/posts.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const uploadRoute = require("./routes/upload.js");

//expressモジュールを実体化して、定数appに代入
const app=express()
// helmet実装
const helmet = require('helmet')
const mongoose = require("mongoose");
// require("dotenv").config();
const path = require("path")
const PORT = 5000;
const User = require("./models/User");

//passport.js 初期設定
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser')
const session = require("express-session")

require("dotenv").config();
//mongoDBとデータベース接続
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("DBと接続中...");
}).catch((err)=>{
  console.log(err);
});

//ミドルウェアとして設定
app.use(helmet())
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))
app.use(express.json());

app.use(express.urlencoded( { extended: false }));

//passpport.jsの初期設定
// app.use(express.urlencoded( { extended: true }))
// app.use(flash());
// app.use(cookieParser())
app.use(session({
  secret: 'secret',
  name: "session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure:false,httpOnly: true, maxAge:  24 * 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());

//第一引数をルートディレクトリとして
//リクエストされた時に第二引数呼び出し
///api/postsをルートディレクトリとして設定
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);

//3001ポートでlisten
app.listen(PORT, ()=>{
  console.log("サーバーが起動しました")
});
