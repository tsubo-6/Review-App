import React,{useRef,useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import { Button, Container, Stack, TextField,InputLabel, Paper,Select, MenuItem} from '@mui/material'
import { Link } from "react-router-dom";
// 特定のエンドポイントへのリクエストを送信できるようにする、HTTPクライアント
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux'
import {logout,isCookie} from "../features/AuthLoginSlice"
import { persistor } from "./../store";

function Modify() {
  const loca = useLocation();
  const {id} = loca.state;
  const {shop} = loca.state;
  const {vis} = loca.state;
  const {sco} = loca.state;
  const {spi}=loca.state;
  const {cur}=loca.state;
  const {des}=loca.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const persistedState = persistor.getState();

  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      if(persistedState==null){
        navigate("/")
      }
    }
    fetchPosts();
  },[])

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
    const editPost = {
    // userName: e.target['userName'].value,
    shopName: e.target['shop'].value,
    visit: e.target['visit'].value,
    score: e.target['score'].value ,
    spicy: e.target['spicy'].value ,
    curry: e.target['curry'].value ,
    desc: e.target['desc'].value
  };
    await axios.put("https://example.herokuapp.com/api/posts/"+id , editPost);
    window.location.reload();
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
