const router = require("express").Router();
//User.jsをインポート
const User = require("../models/User.js");

// 4/1~
const passport = require("passport")
const LocalStrategy = require('passport-local');
const session = require("express-session")
const flash = require("connect-flash")

router.use(flash());
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
router.use(passport.initialize());
// セッション管理
router.use(passport.session());

// passportとStrategyの関連付け
passport.use(new LocalStrategy(
  // done:コールバック関数
  function(username,password,done){
    User.findOne({userName:username},function(err,user){
      // DBのエラー
      if(err){return done(err);}
      if(!user){
        return done(null, false, {message: "ユーザ名が正しくありません"})
      }
      if(!user.validPassword(password)){
        return done(null, false,{message:"パスワードが正しくありません"})
      }
      return done(null,user);
    })
  }
))

// ユーザ情報をセッションへ保存
// どの値をセッション管理するかをここで指定する
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

//
passport.deserializeUser(function(id, done) {
  User.findById({_id:id}, function(err, user) {
    done(err, user);
  });
});
// 4/1~ ここまで

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


// passport.jsでのログイン
// router.post("/login",
//   passport.authenticate('local', {
//     failureRedirect: '/api/auth/login', // 認証失敗した場合の飛び先
//     failureFlash: true
//   }),
//   async (req, res) => {
//     // 認証成功した場合の処理
//     res.redirect('/main');
//   }
// )

//ログイン
router.post("/login", async (req,res) =>{
  try{
    //ユニークなユーザを探すfindOne
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send("ユーザが見つかりません")

    //真偽値
    const validPassword = req.body.password === user.password

    if(!validPassword) return res.status(400).send("パスワードが違います")

    return res.status(200).json(user);
  }catch(err){
    return res.status(500).json(err);
  }
})

//server.jsで呼び出せるようにする
module.exports=router;
