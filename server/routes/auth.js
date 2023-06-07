const router = require("express").Router();
//User.jsをインポート
const User = require("../models/User.js");
// 4/1~
const express=require("express");
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
// const cookieParser = require('cookie-parser')
const session = require("express-session");
const { default: mongoose } = require("mongoose");

router.use(express.urlencoded( { extended: true }))
router.use(flash());

// strategyの設定
// passportとStrategyの関連付け
passport.use("local",new LocalStrategy(
// done:コールバック関数
async (username, password, done) => {
  try{
    const user = await User.findOne({username});
    if(!user){
      return done(null,false);
    }else if(user.password != password){
      return done(null, false, { message: "ユーザ名またはメールアドレスが正しくありません" });
    }else{
      return done(null,user._id);
    }
  }catch(err){
    return done(err);
  }
}
))

// ユーザ情報をセッションへ保存
// どの値をセッション管理するかをここで指定する
passport.serializeUser((id, done)=> {
  console.log("serialize:" + id)
  done(null, id);
});

//IDからユーザ情報を取得しreq.userに格納する
passport.deserializeUser(async (id, done) =>{
  console.log("deserialize:"+ id);
  const user=await User.findOne({_id:id});
  done(null,user);
});

//ユーザ登録するAPI
router.post("/register", async (req, res) => {
  //try-catchはエラーハンドリングを実装するために
  try{
    //作成したスキーマをnewする
    const newUser = await new User({
      //reqに含まれるpostmanのbodyから取ってくる
      username: req.body.username,
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
// authenticate()=自動的にreq.login()を実行
router.post("/login", passport.authenticate('local', {
    failureRedirect: '/', // 認証失敗した場合の飛び先
    session: true,
  }),
  (req,res)=>{
    req.login(req.user, (err) =>{
      if(err){return next(err);}
      else{
        return res.redirect(200, "/main")
      }
    })
  }
)

//ユーザ情報を取得するAPI
router.get('/', async(req,res)=>{
  console.log("koko"+req.user)
  if(req.user){
    return res.send(req.user.username);
  }
  else{
    return res.send(false);
  }
});


router.get("/logout",(req,res) =>{
  req.session.destroy( (err)=> {
    if (!err) {
      res.status(200).clearCookie('session', {path: '/'}).json({status: "Success"});
    } else {
    // handle error case...
    }
  })
})

//server.jsで呼び出せるようにする
module.exports=router;
