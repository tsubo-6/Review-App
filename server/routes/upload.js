const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.dir(req.body.post_id)
    // cb(null, __dirname + "../public/uploads/");
    cb(null, "/Users/info/Documents/review-app/server/public/uploads");

  },
  filename: (req, file, cb) => {
    console.log("file", file)
    // cb(null, file.filename + "-" + Date.now());
    // review.jsのpostDataに保存したpost._idを取得
    cb(null, req.body.post_id+"."+file.mimetype.split("/")[1]);
    // cb(null, req.body.post_id);

  },
});

const upload = multer({
  storage: storage,
});

//画像アップロードAPI
router.post("/",upload.single('image_file'), (req,res) =>{
  // console.log("req："+req.file.imageFile);
  // try{
  //   return res.status(200).json("画像アップに成功しました")
  // }catch (err){
  //   console.log(err);
  // }
})

module.exports = router;
