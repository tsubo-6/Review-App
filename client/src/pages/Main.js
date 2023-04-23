import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect} from 'react';
import axios from "axios"
import { useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux'
import {logout,isCookie} from "../features/AuthLoginSlice"

// 親コンポーネント
function Main(){
  //投稿された情報を格納 @
  const [posts, setPosts]=useState([]);
  //ログイン時のユーザ情報
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=>state.authLogin.isAuthenticate);

  //useEffectの無名関数にasyncがつけられない
  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      const res = await axios.get("/api/auth/");
      if(!res.data){
        dispatch(logout())
        navigate("/")
      }
      const response = await axios.get("/api/posts/usersPosts");
      //引数にresponse.dataを設定することでuseStateのpostsに格納することができる
      setPosts(response.data)
    }
    fetchPosts();
  },[])

  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div>
      {/* 子コンポーネントに渡す */}
      <Navbar
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <div className="main">
        <Sidebar sidebarVisible={sidebarVisible}/>
        {posts.map((post)=>(
          <RecipeReviewCard post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
}

export default Main
