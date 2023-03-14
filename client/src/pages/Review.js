import React,{useRef} from 'react'
import Navbar from '../components/Navbar'
import { Button, Container, Stack, TextField,InputLabel, Paper,Select, MenuItem} from '@mui/material'
import { Link } from "react-router-dom";
// 特定のエンドポイントへのリクエストを送信できるようにする、HTTPクライアント
import axios from "axios";

function Review() {
  // const userName = useRef("");
  const shopName = useRef("");
  const visit = useRef("");
  const score = useRef("");
  const spicy = useRef("");
  const curry = useRef("");
  const desc = useRef("");


//レビュー登録
const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const newPost = {
    // userName: e.target['userName'].value,
    shopName: e.target['shop'].value,
    visit: e.target['visit'].value,
    score: e.target['score'].value ,
    spicy: e.target['spicy'].value ,
    curry: e.target['curry'].value ,
    desc: e.target['desc'].value
  };
    //package.jsonにproxy設定(http://localhost:5000省略)
    //registerAPIを叩く -> routesないのファイルで指定したroute.postの第一引数のエンドポイントを指定することでアクセス
    //第二引数:登録するデータ
    console.log(newPost)
    await axios.post("http://localhost:5000/api/posts" , newPost);
    window.location.reload();
    console.log("投稿されました");
  }catch(err){
    console.log(err);
  }
};

  return (
    <div>
      <Navbar/>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        {/* Paper : 浮かび具合を調整できる「紙」を表示する */}
        <Paper elevation={5} sx={{ padding: 4, marginY: 2 }}>
          {/* stack:一次元 Grid:二次元 */}
          <h1>口コミの投稿</h1>
          <hr/>

          <form onSubmit={(e)=> handleSubmit(e)}>
            <Stack spacing={3}>
              {/* <InputLabel>ユーザ名</InputLabel>
              <TextField required label="ユーザ名" name='userName' inputRef={userName}/> */}

              <InputLabel>店舗名</InputLabel>
              <TextField required label="店舗名" name='shop' inputRef={shopName}/>
              <InputLabel>訪問日</InputLabel>
              <TextField required label="訪問日 yyyy/mm/dd" name='visit' inputRef={visit}/>
              <InputLabel>評価</InputLabel>
              {/* <TextField required label="評価" /> */}

              <Select inputRef={score} label="評価" name="score" notched>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={1.0}>1.0</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={2.0}>2.0</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={3.0}>3.0</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={4.0}>4.0</MenuItem>
                <MenuItem value={4.5}>4.5</MenuItem>
                <MenuItem value={5.0}>5.0</MenuItem>
              </Select>
              <InputLabel>辛さ</InputLabel>
              <TextField required label="辛さ" name='spicy' inputRef={spicy}/>

              {/* <Select inputRef={spicy} label="辛さ" name="spicy" notched>
                <MenuItem name={"甘口"}>甘口</MenuItem>
                <MenuItem name={"中辛"}>中辛</MenuItem>
                <MenuItem value={2}>辛口</MenuItem>
                <MenuItem value={3}>激辛</MenuItem>
              </Select> */}

              <InputLabel>どんなカレー</InputLabel>
              <TextField required label="カレー" name='curry' inputRef={curry}/>

              {/* <Select inputRef={curry} label="辛さ" name="curry" notched>
                <MenuItem value={0}>スリランカカレー</MenuItem>
                <MenuItem value={1}>インドカレー</MenuItem>
                <MenuItem value={2}>ミャンマーカレー</MenuItem>
                <MenuItem value={3}>カンボジアカレー</MenuItem>
                <MenuItem value={4}>タイカレー</MenuItem>
                <MenuItem value={5}>お店のこだわりカレー</MenuItem>
              </Select> */}
              <InputLabel name='curry_review'>本文</InputLabel>
              <TextField
              required
              name='desc'
              //テキストボックスの行幅を変更
              multiline
              minRows="10"
              label="本文"
              size="medium"
              inputRef={desc}/>
              {/* <Link to="/review/complete"> */}
              <Button color="primary" variant="contained" size="large" type="submit">
                投稿
              </Button>
              {/* </Link> */}
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default Review
