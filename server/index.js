const PORT = process.env.PORT
//requireでexpressモジュールを読み込む
const express=require("express");
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
//expressモジュールを実体化して、定数appに代入
const app=express()

//ミドルウェアとして設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//3001ポートでlisten
app.listen(3000, ()=>{
  console.log("Application listening at 3001")
});

const handleConnection = () =>{
  //データベースとのコネクション設定
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Masaki61',
    database: 'review_info'
  });

  //DB接続
  con.connect((err) =>{
    if(err) {return connect.end()}
    console.log('Mysql Connected...');
  });
}

handleConnection();

//レビュー登録
app.post("/api/insert/review", (req, res) => {
  console.log('ここ');

  const sql = "INSERT INTO review (${req.body.shop},${req.body.visit},${req.body.score_id},${req.body.spicy_id},${req.body.curry_id},${req.body.curry_review}) VALUES (?,?,?,?,?)"
  con,query(sql,review,(err,result) => {
    res.send(result);
  });
});
