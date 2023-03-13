const User = require("../models/User");
const router = require("express").Router();

//ユーザ情報の取得
router.get("/:id",async(req,res) =>{
  try{
    const user = await User.findById(req.params.id);
    //パスワードと更新日を取り除いた
    // const{password, updatedAt, ...other} =user._doc
    res.status(200).json(user)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports=router;
