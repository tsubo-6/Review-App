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

module.exports=router;
