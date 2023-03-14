import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import food from "./../images/curry1.jpg"
import axios from "axios"
import { Divider } from '@mui/material';
import { AuthContext } from '../states/AuthContext';
import {useRef,useContext} from "react";

export default function RecipeReviewCard({post}) {
  // //投稿された情報を格納 @
  // const [posts, setPosts]=useState({});
  // //ログイン時のユーザ情報
  // const {user} = useContext(AuthContext)

  // //useEffectの無名関数にasyncがつけられない
  // useEffect(()=>{
  //   //promise状態（データ取得中）を回避
  //   const fetchPosts=async ()=>{
  //     const response = await axios.get(`http://localhost:5000/api/posts/`, {
  //     params: { username: user.username },
  //   });
      //undifined
      //console.log(posts.shopName);

  //   // console.log("username："+user.username);
  //     // const response = await axios.get(`http://localhost:5000/api/posts/${user.username}`)
  //     //引数にresponse.dataを設定することでuseStateのpostsに格納することができる
  //     setPosts(response.data)
  //   };
  //   fetchPosts();

  // },[user.username, user._id])


  return (
    // {posts.map((post)=>(
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            t
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.shopName}
        subheader={post.visit}
      />
      <CardMedia
        component="img"
        height="194"
        // 画像をインポートする必要あり
        image={food}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          評価: {post.score}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          辛さ: {post.spicy}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          カレーの種類: {post.curry}
        </Typography>

        <Divider />
        <Typography variant="body2" color="text.secondary">
          レビュー: {post.desc}
        </Typography>
      </CardContent>
      {/* ))} */}

      {/* Card下部のアイコン */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
