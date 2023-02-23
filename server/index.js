const PORT = process.env.PORT
//requireでexpressモジュールを読み込む
const express=require("express");

const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
//expressモジュールを実体化して、定数appに代入
const app=express()

//ミドルウェアとして設定
app.use(bodyParser.urlencoded({ extended: true }));
//'/'パスにGET要求があった際に実行する処理
// app.get('/review', (req, res) => {
//   res.send('Hello World!');
// });

//3000ポートでlisten
app.listen(PORT, ()=>{
  console.log("Application listening at ${PORT}")
});

const handleConnection = () =>{
  //データベースとのコネクション設定
  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Masaki61',
    database: 'review_info'
  });

  //DB接続
  conn.connect((err) =>{
    if(err) {return connect.end()}
    console.log('Mysql Connected...');
  });
}

handleConnection();

//送られてきたデータがreq.bodyに保存
// app.post('/review/', (req, res) => res.send(req.body))

// app.get("/review" ,(req, res) => res.sendFile(path.join(__dirname, '/client/src/pages/Review.js')))

//レビュー登録
app.post("/review", (req, res) => {
  console.log('ここ');
  conn.query(
    `insert into review_info values(0, "${req.body.shop}",
    ${req.body.visit}, ${req.body.score_id}, ${req.body.curry_id},${req.body.curry_review});`,
    (err, results, fields) =>{
      console.log(results)
      res.send(results);
    }
  );
});
