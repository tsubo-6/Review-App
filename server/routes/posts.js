const router = require("express").Router();
//ファイル読み込み
const Post = require("../models/Post");

//http://localhost:5000/api/posts/でpostリクエストが飛んできた時に実行される
//postmanに記述しているURL ???
router.post("/",async (req,res) => {

  const newPost = new Post({
    userName:req.body.userName,
    shopName:req.body.shopName,
    visit:req.body.visit,
    score:req.body.score,
    spicy:req.body.spicy,
    curry:req.body.curry,
    desc:req.body.desc
  });
  try{
    const savePost= await newPost.save();
    return res.status(200).json(savePost);
  }catch(err){
    //スキーマの条件を満たしていないときなど
    return res.status(500).json(err);
  }
})

//投稿を取得する
//:id ->　任意の数値文字列を指定できる
//パスパラメータを取得 -> req.params.:の後に続く変数
// router.get("/:username" , async (req,res) => {
router.get("/:user" , async (req,res) => {
  try{
    // :idに設定したparams
    // 変数postにreq.paramsで取得したusernameと合致するデータセットを格納
    const user=await Post.findOne({userName:req.params.username});
    //_id -> currentUserで取得したuserIdのpostの全ての情報
    const posts = await Post.find({userId: user._id});
    return res.status(200).json(posts);
  }catch(err){
    //スキーマの条件を満たしていないときなど
    return res.status(403).json(err);
  }
});

module.exports=router;
