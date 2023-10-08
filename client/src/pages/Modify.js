import React,{useRef,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Button, Container, Stack, TextField,InputLabel, Paper,Select, MenuItem} from '@mui/material'
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import { persistor } from "./../store";

function Modify() {
  const location = useLocation();
  // 修正ボタン押下でLinkタグ(Cardコンポーネント)のstateから渡される値を受け取る変数
  const { id, shop, vis, sco, spi, cur, des } = location.state;
  const navigate = useNavigate();
  const persistedState = persistor.getState();

  // 入力フォームに入力された値を取ってくる
  const shopName = useRef("");
  const visit = useRef("");
  const score = useRef("");
  const spicy = useRef("");
  const curry = useRef("");
  const desc = useRef("");

  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      if(persistedState==null){
        navigate("/")
      }
    }
    fetchPosts();
  },[])

//レビュー登録
const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const editPost = {
    // userName: e.target['userName'].value,
    shopName: e.target['shop'].value,
    visit: e.target['visit'].value,
    score: e.target['score'].value ,
    spicy: e.target['spicy'].value ,
    curry: e.target['curry'].value ,
    desc: e.target['desc'].value
  };
    await axios.put("/api/posts/"+id , editPost);
    navigate("/review/complete");
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
          <h1>レビューの修正</h1>
          <hr/>

          <form onSubmit={(e)=> handleSubmit(e)}>
            <Stack spacing={3}>
              <InputLabel>店舗名</InputLabel>
              <TextField required defaultValue={shop} name='shop' inputRef={shopName}/>
              <InputLabel>訪問日</InputLabel>
              <TextField required defaultValue={vis} name='visit' inputRef={visit}/>
              <InputLabel>評価</InputLabel>
              <Select defaultValue={sco} inputRef={score} label="評価" name="score" notched>
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
              <TextField required defaultValue={spi} name='spicy' inputRef={spicy}/>
              <InputLabel>どんなカレー</InputLabel>
              <TextField required defaultValue={cur} name='curry' inputRef={curry}/>

              <InputLabel name='curry_review'>本文</InputLabel>
              <TextField
              required
              defaultValue={des}
              name='desc'
              //テキストボックスの行幅を変更
              multiline
              minRows="10"
              size="medium"
              inputRef={desc}/>
              <Button color="primary" variant="contained" size="large" type="submit">
                修正
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default Modify
