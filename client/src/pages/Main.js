import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect} from 'react';
import axios from "axios"
import { useNavigate} from "react-router-dom"
import {useDispatch} from 'react-redux'
import {logout} from "../features/AuthLoginSlice"
import CircularProgress from "@mui/material/CircularProgress";

// 親コンポーネント
function Main(){
  //投稿された情報を格納
  const [posts, setPosts]=useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // 画面切り替わりのローディング表示フラグ
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ログインユーザの投稿一覧画面であれば修正ボタンを表示する
  const hidden=true;

  //useEffectの無名関数にasyncがつけられない
  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      const res = await axios.get("/api/auth");
      if(!res.data){
        dispatch(logout())
        navigate("/")
      }
      const response = await axios.get("/api/posts/usersPosts");
      //引数にresponse.dataを設定することでuseStateのpostsに格納することができる
      setPosts(response.data)
      setIsLoading(true)
    }
    fetchPosts();
  },[])

  const main=
  <div>
      {/* 子コンポーネントに渡す */}
      <Navbar
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <div className="main">
        <Sidebar sidebarVisible={sidebarVisible}/>
        {posts.map((post)=>(
          <RecipeReviewCard post={post} key={post._id} hidden={hidden}/>
        ))}
      </div>
    </div>;

  return (
    <>
    {isLoading ? (main) : (<CircularProgress className="loading" style={{width:"150px", height:"150px"}}/>)}
    </>
  )
}

export default Main
