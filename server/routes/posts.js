const router = require("express").Router();
//ファイルの拡張子を取得
const path = require('path');
//ファイル読み込み
const Post = require("../models/Post");

// http://localhost:5000/api/posts/でpostリクエストが飛んできた時に実行される
router.post("/", async (req,res) => {

  const newPost = new Post({
    userName:req.body.userName,
    shopName:req.body.shopName,
    visit:req.body.visit,
    score:req.body.score,
    spicy:req.body.spicy,
    curry:req.body.curry,
    img:req.body.img,
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

  //usernameから投稿取得
  // router.get("/" , async (req,res) => {
  router.get("/:username" , async (req,res) => {
  try{
    // :idに設定したparams
    // 変数postにreq.paramsで取得したusernameと合致するデータセットを格納
    const user=await Post.findOne({userName:req.params.username});
    const posts = await Post.find({userName: user.userName});
    console.log("router.get"+post)
    // res.render("/client/src/pages/Main.js")
    return res.status(200).json(posts);
  }catch(err){
    //スキーマの条件を満たしていないときなど
    return res.status(403).json(err);
  }
});

//全ての投稿を取得
  router.get("/" , async (req,res) => {
  try{
    // find() : DBのデータ全権取得
    const posts = await Post.find();
    console.log(posts)
    return res.status(200).json(posts);
  }catch(err){
    return res.status(403).json(err);
  }
});

//投稿を修正するAPI
router.put("/:id", async(req,res) =>{
  try{
    const post = await Post.findById(req.params.id);
    // if(post.userName === req.body.username){
      await post.updateOne({
        $set: req.body,
      });

      return res.status(200).json("編集完了")
    // }else{
    //   return res.status(403).json("あなたは他の人の投稿を編集できません")
    // }
  }catch (err){
    return res.status(403).json(err);
  }
})

//投稿を削除するAPI
router.delete("/:id" ,async(req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
  }catch(err){
    return res.status(403).json(err);
  }
})

module.exports=router;
