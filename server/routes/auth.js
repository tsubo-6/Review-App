const router = require("express").Router();
//User.jsをインポート
const User = require("../models/User.js");
// 4/1~
const express=require("express");
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
// const cookieParser = require('cookie-parser')
const session = require("express-session")

router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure:false,httpOnly: false, maxAge:  24 * 60 * 60 * 1000 },
}));

router.use(express.urlencoded( { extended: true }))
router.use(flash());

router.use(passport.initialize());
//セッション管理
router.use(passport.session());

// // ユーザ情報をセッションへ保存
// // どの値をセッション管理するかをここで指定する
passport.serializeUser((user, done)=> {
  console.log("serialize:" + user)
  done(null, user._id);
});

//IDからユーザ情報を取得しreq.userに格納する
passport.deserializeUser(async(id, done) => {
  console.log("deserialize:" + id);
   await User.findById({id}).then((err, user)=>{
    console.log("deserialize:" + user);
    done(null, user);
  })
});

// strategyの設定
// passportとStrategyの関連付け
passport.use("local",new LocalStrategy(
// done:コールバック関数
async (username, password, done) => {
  await User.findOne({ username }).then((user, err) => {
    // console.log("userInfo:"+user)
    if (err) {
      return done("Error:" + err);
    }
    if (!user || user.password != password) {
      //req.flash("")
      return done(null, false, { message: "ユーザ名またはメールアドレスが正しくありません" });
    } else {
      // serializeUserの第一引数に受け渡される
      // 保存するデータは最小限に
      return done(null, user);
    }
  });
}
))

//ユーザ登録するAPI
router.post("/register", async (req, res) => {
  //try-catchはエラーハンドリングを実装するために
  try{
    //作成したスキーマをnewする
    const newUser = await new User({
      //reqに含まれるpostmanのbodyから取ってくる
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //ドキュメントを保存
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})

// 4/2~
//passport.jsでのログイン
router.post("/login", passport.authenticate('local', {
    //successRedirect: 'http://localhost:3000/main',
    failureRedirect: '', // 認証失敗した場合の飛び先
    // keepSessionInfo: true,
    // failureFlash:true,
    session: true,
  }),
  (req,res)=>{
  return res.status(200).json({
    // success:true,
    redirectUrl: '/main'
  })
}
)

router.get("/logout",(req,res) =>{
  req.logout()
})
// 4/2 ここまで

//ログイン
// router.post("/login", async (req,res) =>{
//   try{
//     //ユニークなユーザを探すfindOne
//     const user = await User.findOne({email: req.body.email});
//     if(!user) return res.status(404).send("ユーザが見つかりません")
//     //真偽値
//     const validPassword = req.body.password === user.password

//     if(!validPassword) return res.status(400).send("パスワードが違います")

//     return res.status(200).json(user);
//   }catch(err){
//     return res.status(500).json(err);
//   }
// })

//server.jsで呼び出せるようにする
module.exports=router;
