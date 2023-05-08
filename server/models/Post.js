
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      require: true,
    },
    userName:{
      type: String,
      require: true,
    },
    shopName: {
      type: String,
      require: true,
    },
    visit: {
      type: Date,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
    spicy: {
      type: String,
      require: true,
    },
    curry: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    likes:{
      type:Array,
      default:[],
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
