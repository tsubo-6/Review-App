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

//mongoDBとデータベース接続
mongoose.connect("mongodb+srv://tsubo:Masaki61@cluster0.lmi4zi6.mongodb.net/review?retryWrites=true&w=majority")
.then(()=>{
  console.log("DBと接続中...");
}).catch((err)=>{
  console.log(err);
});

//ミドルウェアとして設定
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))
app.use(express.json());

//passpport.jsの初期設定
// app.use(express.urlencoded( { extended: true }))
// app.use(flash());
// app.use(cookieParser())
// app.use(session({
//   secret: 'secret',
//   name: "session",
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure:false,httpOnly: true, maxAge:  24 * 60 * 60 * 1000 },
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use("local",new LocalStrategy(
// // done:コールバック関数
// async (username, password, done) => {
//   await User.findOne({ username }).then((user, err) => {
//     // console.log("userInfo:"+user)
//     if (err) {
//       return done("Error:" + err);
//     }
//     if (!user || user.password != password) {
//       //req.flash("")
//       return done(null, false, { message: "ユーザ名またはメールアドレスが正しくありません" });
//     } else {
//       // serializeUserの第一引数に受け渡される
//       // 保存するデータは最小限に
//       console.log("LocalStrategy:" + user)
//       return done(err, user);
//     }
//   });
// }
// ))

// // ユーザ情報をセッションへ保存
// // どの値をセッション管理するかをここで指定する
// passport.serializeUser((user, done)=> {
//   console.log("serialize(index.js):" + user)
//   process.nextTick(()=>{
//     done(null, user._id);
//   })
// });

// //IDからユーザ情報を取得しreq.userに格納する
// passport.deserializeUser((id, done) => {
//   console.log("deserialize:" + id);
//    User.findById(id).then((err, user)=>{
//     console.log("deserialize:" + user);
//     done(err, user);
//   })
// });


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
