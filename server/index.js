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
