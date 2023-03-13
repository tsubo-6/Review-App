const router = require("express").Router();
//User.jsをインポート
const User = require("../models/User.js");

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
