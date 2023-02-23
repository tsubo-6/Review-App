import React from 'react'
import Navbar from '../components/Navbar'
import { Button, Container, Stack, TextField,InputLabel, Paper} from '@mui/material'
import { Link } from "react-router-dom";
import Select from 'react-select';
// import axios from "axios";


const Countries = [
  { label: "0.5"},
  { label: "1.0"},
  { label: "1.5"},
  { label: "2.0"},
  { label: "2.5" },
  { label: "3.0" },
  { label: "3.5"},
  { label: "4.0" },
  { label: "4.5" },
  { label: "5.0"}
];

const Spicy = [
  { label: "激辛"},
  { label: "辛口"},
  { label: "中辛"},
  { label: "甘口"}
];

const Curry = [
  { label: "スリランカカレー"},
  { label: "インドカレー"},
  { label: "タイカレー"},
  { label: "ミャンマーカレー"},
  { label: "カンボジアカレー"},
  { label: "その他(店のこだわりカレー)"}
];

//レビュー登録
// const onSubmit =({data.shop}) ;

function Review() {
  return (
    <div>
      <Navbar/>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        {/* Paper : 浮かび具合を調整できる「紙」を表示する */}
        <Paper elevation={5} sx={{ padding: 4, marginY: 2 }}>
          {/* stack:一次元 Grid:二次元 */}
          <h1>口コミの投稿</h1>
          <hr/>
            <Stack spacing={3}>
              <InputLabel>店舗名</InputLabel>
              <TextField required label="店舗名" name='shop' />
              <InputLabel>訪問日</InputLabel>
              <TextField required label="訪問日 yyyy/mm/dd" name='visit'/>
              <InputLabel>評価</InputLabel>
              {/* <TextField required label="評価" /> */}
              <Select className='selectForm1' options={Countries}/>
              <InputLabel>辛さ</InputLabel>
              <Select className='selectForm2' options={Spicy} />
              <InputLabel>どんなカレー</InputLabel>
              <Select className='selectForm3' options={Curry} />
              <InputLabel name='curry_review'>本文</InputLabel>
              <TextField
              required
              //テキストボックスの行幅を変更
              multiline
              minRows="10"
              label="本文"
              size="medium"/>
              <Button color="primary" variant="contained" size="large">
                作成
              </Button>
              <Link to="/review/complete">投稿</Link>
            </Stack>
        </Paper>
      </Container>
    </div>
  )
}

export default Review
