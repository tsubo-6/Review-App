import React,{useRef,useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Button, Container, Stack, TextField,InputLabel, Paper,Select, MenuItem} from '@mui/material'
import FormData from "form-data";
// 特定のエンドポイントへのリクエストを送信できるようにする、HTTPクライアント
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux'
import {logout} from "../features/AuthLoginSlice"
import Sidebar from '../components/Sidebar';
import { persistor } from "./../store";
import CircularProgress from "@mui/material/CircularProgress";


function Review() {
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const persistedState = persistor.getState();
  const [isLoading, setIsLoading] = useState(false);


 useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      if(persistedState==null){
        navigation("/")
      }
      setIsLoading(true)
    }
    fetchPosts();
  },[])

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const userName = useRef("");
  const shopName = useRef("");
  const visit = useRef("");
  // const score = useRef("");
  const [score, setScore] = useState("");
  const spicy = useRef("");
  const curry = useRef("");
  const desc = useRef("");
  const [image, setImg] = useState("");

  //画像を添付したら発火
  const handleChange = async(e)=>{
    setImg(e.target.files)
  }

//レビュー登録
const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const newPost = {
    userName: e.target['userName'].value,
    shopName: e.target['shop'].value,
    visit: e.target['visit'].value,
    score: e.target['score'].value ,
    spicy: e.target['spicy'].value ,
    curry: e.target['curry'].value ,
    desc: e.target['desc'].value
  };
    //registerAPIを叩く -> routesないのファイルで指定したroute.postの第一引数のエンドポイントを指定することでアクセス
    //第二引数:登録するデータ
    const response = await axios.post("/api/posts" , newPost);
    const postData = new FormData();
    console.log("img:"+image[0])
    //postDataにキーとバリューを設定
    postData.append("post_id", response.data._id)
    postData.append("image_file", image[0])
    console.log("postData:"+JSON.stringify(postData))
    //imgにファイル名を保存
    newPost.img=response.post_id;
    console.log(newPost.img)
    const headers = { "content-type": "multipart/form-data;charset=utf-8" };
    axios.post("/api/upload",
      postData,
      headers
    );
    navigation("/review/complete")
  }catch(err){
    console.log(err);
  }
};

const main =
    <div>
      <Navbar
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
        />
      <Sidebar sidebarVisible={sidebarVisible}/>

      <Container maxWidth="sm" sx={{ pt: 2 }}>
        {/* Paper : 浮かび具合を調整できる「紙」を表示する */}
        <Paper elevation={5} sx={{ padding: 4, marginY: 2 }}>
          {/* stack:一次元 Grid:二次元 */}
          <h1>口コミの投稿</h1>
          <hr/>

          <form onSubmit={(e)=> handleSubmit(e)}>
            <Stack spacing={3}>
              <InputLabel>ユーザ名</InputLabel>
              <TextField required label="ユーザ名" name='userName' inputRef={userName}/>
              <InputLabel>店舗名</InputLabel>
              <TextField required label="店舗名" name='shop' inputRef={shopName}/>
              <InputLabel>訪問日</InputLabel>
              <TextField required label="訪問日 yyyy/mm/dd" name='visit' inputRef={visit}/>
              <InputLabel>評価</InputLabel>
              {/* scoreの値が格納されたらセッターで値保存 */}
              <Select value={score} label="評価" onChange = {(e) => setScore(e.target.value)} name="score" notched>
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
              <InputLabel>どんなカレー</InputLabel>
              <TextField required label="カレー" name='curry' inputRef={curry}/>
              <InputLabel>カレーの画像</InputLabel>
              {/* 3/17 */}
              {/*  style={{display:"none"}} -> ファイルを選択してくださいを隠すことが可能 */}
              {/* <form encType="multipart/form-data"> */}
                <input
                  type="file"
                  name='image'
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  required
                  onChange={(e)=>handleChange(e)}
                />
              {/* </form> */}
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
              <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              >
                投稿
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>

  return (
    <>
      {isLoading ? (main) : (<CircularProgress className="loading" style={{width:"150px", height:"150px"}}/>)}
    </>
  )
}

export default Review
