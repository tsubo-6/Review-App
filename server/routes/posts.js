const router = require("express").Router();
//ファイルの拡張子を取得
const path = require('path');
//ファイル読み込み
const Post = require("../models/Post");
const User = require("../models/User");
const session = require("express-session")
const passport = require("passport")



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
  router.get("/usersPosts" , async (req,res) => {

  try{
    // :idに設定したparams
    // console.log("req.user"+req.user)
    // 変数postにreq.paramsで取得したusernameと合致するデータセットを格納
    // const user=await User.findOne({userName:req.user.username});
    const posts = await Post.find({userName: req.user.username});
    // console.log("user:"+req.user)

    console.log("username:"+req.user.username)
    console.log("posts:"+posts)
    // res.render("/client/src/pages/Main.js")
    return res.status(200).json(posts);
  }catch(err){
    console.log(err)
    //スキーマの条件を満たしていないときなど
    return res.status(403).json(err);
  }
});

//全ての投稿を取得
  router.get("/" , async (req,res) => {
    // console.log("review表示:"+req.user)
    try{
    // find() : DBのデータ全権取得
    const posts = await Post.find();
    // console.log(posts)
    return res.status(200).json(posts);
  }catch(err){
    return res.status(403).json(err);
  }
});

//お気に入り投稿を取得
  router.get("/favorites" , async (req,res) => {
    // console.log("review表示:"+req.user)
    try{
    // find() : DBのデータ全権取得
    const posts = await Post.find({_id:req.user.favorites});
    // console.log(posts)
    return res.status(200).json(posts);
  }catch(err){
    return res.status(403).json(err);
  }
});

//   router.get("/" , async (req,res) => {
//   try{
//     // :idに設定したparams
//     // 変数postにreq.paramsで取得したusernameと合致するデータセットを格納
//     const user=await Post.findOne({userName:req.username});
//     const posts = await Post.find({userName:user.userName});
//     console.log("router.get"+post)
//     // res.render("/client/src/pages/Main.js")
//     return res.status(200).json(posts);
//   }catch(err){
//     //スキーマの条件を満たしていないときなど
//     return res.status(403).json(err);
//   }
// });


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

//投稿をいいねするAPI
router.put("/:id/like" ,async(req,res)=>{
  const likeUser = req.user
  console.log("likeuser:"+likeUser)
  try{
    const post= await Post.findById(req.params.id);
    //console.log("ここ"+req.body.userId)
    if(!post.likes.includes(likeUser._id)){
      await post.updateOne({
        $push:{
          likes: likeUser._id
        }
      });
      return res.status(200).json("投稿にいいねを押しました")
    }else{
      //いいねしたユーザの🆔を取り除く
      await post.updateOne({
        $pull:{
          likes: likeUser._id
        }
      })
      return res.status(200).json("いいねを外しました")
    }
  }catch(err){
    return res.status(500).json(err)
  }
});

//いいねした投稿を保存するAPI
router.put("/:id/favorites" ,async(req,res)=>{
  const id = req.user._id
  //onsole.log("id:"+id)
  const likeUser = await User.findById(id)
  //console.log("likeuser:"+likeUser)
  try{
    const post= await Post.findById(req.params.id);
    //console.log("ここ:"+post)
    if(!likeUser.favorites.includes(post._id)){
      await likeUser.updateOne({
        $push:{
          favorites: post._id
        }
      });
      return res.status(200).json("いいねを保存")
    }else{
      //いいねしたユーザの🆔を取り除く
      await likeUser.updateOne({
        $pull:{
          favorites: post._id
        }
      })
      return res.status(200).json("いいねを外しました")
    }
  }catch(err){
    return res.status(500).json(err)
  }
});


module.exports=router;
