import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import axios from "axios"
import { Divider, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function RecipeReviewCard({post}) {

  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)

  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  const deleteAction = (id) =>{
    console.log("id:"+id)
    axios.delete("/api/posts/"+id).then((res)=>{
    });

    alert("投稿が削除されました")
    window.location.reload();
  }

  const handleLike=async(id)=>{
    try{
      //いいねのAPI
      await axios.put(`/api/posts/${post._id}/like`,id)
      await axios.put(`/api/posts/${post._id}/favorites`,id)
    }catch(err){
    console.log(err)
  }
    setLike(isLiked ? like-1:like+1)
    setIsLiked(!isLiked)
  }

  return (
    <Grid container alignItems='center' justifyContent='center' direction="column" sx={{m:2}}>
    <Card sx={{ minWidth:450 ,maxWidth: 450 }} className="card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {}
          </Avatar>
        }
        action={
          <CardActions disableSpacing>
            <IconButton>
              <Link
              to="/edit"
              state={{
                id:post._id,
                shop:post.shopName,
                vis:post.visit,
                sco:post.score,
                spi:post.spicy,
                cur:post.curry,
                des:post.desc
                }}>
                <EditIcon />
              </Link>
            </IconButton>
            <IconButton aria-label="share">
              <DeleteIcon onClick={()=>deleteAction(post._id)} />
            </IconButton>
          </CardActions>
        }
        title={post.shopName}
        subheader={(post.visit).substr(0,10)  }
        // subheader={post._id}
      />

      {/* <img src={"/uploads/" + post._id+ ".png"}/> */}
      <img
      src={"http://localhost:5000/uploads/"+post._id+".png"}
      height="280" width="450"
      />

      {/* <CardMedia
        component="img"
        height="194"
        // 画像をインポートする必要あり
        image={"/uploads/" + post._id+ ".png"}
        alt="画像データがありません"
      /> */}

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

      {/* Card下部のアイコン */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleLike(post._id)}>
          <FavoriteIcon /><span>{like} likes</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>


    </Card>
    </Grid>
    // </Grid>

  );
}
