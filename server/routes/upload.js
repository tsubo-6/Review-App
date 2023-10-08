const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.dir(req.body.post_id)
    cb(null, "/Users/info/Documents/review-app/server/public/uploads");
  },
  filename: (req, file, cb) => {
    console.log("file", file)
    // review.jsのpostDataに保存したpost._idを取得
    cb(null, req.body.post_id+"."+file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
});

//画像アップロードAPI
//upload.single関数によってreq.fileで画像データにアクセス可能となる
//single("image_file")はReview.jsのpostData.append("image_file", image[0])と紐づけられている
router.post("/",upload.single('image_file'), (req,res) =>{
  console.log("upload.js:"+req.file);
  res.send('ファイルのアップロードが完了しました。');
})

module.exports = router;
