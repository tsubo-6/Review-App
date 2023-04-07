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
  name: "session",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge:  24 * 60 * 60 * 1000 },
}));

router.use(passport.initialize());
// セッション管理
router.use(passport.session({}));

// ユーザ情報をセッションへ保存
// どの値をセッション管理するかをここで指定する
passport.serializeUser((id, done)=> {
  console.log("serialize:" + id)
  done(null, id);
    // done(null, user);

});

passport.deserializeUser((id, done) => {
  console.log("deserialize:" + id);
   User.findById({id}).then((err, user)=>{
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
      return done(null, user._id);
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
    failureFlash: true,
    session: true
  }),
  (req,res)=>{
  return res.status(200).json({
    success:true,
    redirectUrl: '/main'
  })
}
    // res.redirect("http://localhost:5000/api/posts/"+ req.body.username)
    // res.redirect(301,'http://127.0.0.1:3000/main')
)

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
