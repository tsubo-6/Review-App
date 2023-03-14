import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import Card from "../components/Card"
import RecipeReviewCard from "../components/Card"
import { useParams } from 'react-router-dom';
import React,{useState,useEffect,useContext} from 'react';
import { AuthContext } from '../states/AuthContext';
import axios from "axios"
import { Grid } from "@mui/material";

// 親コンポーネント
function Main(){

  //投稿された情報を格納 @
  const [posts, setPosts]=useState([]);
  //ログイン時のユーザ情報
  const {user} = useContext(AuthContext)

  //useEffectの無名関数にasyncがつけられない
  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      const response = await axios.get(`http://localhost:5000/api/posts/`, {
      params: { username: user.username },
    });
      console.log(response.data);

    // console.log("username："+user.username);
      // const response = await axios.get(`http://localhost:5000/api/posts/${user.username}`)
      //引数にresponse.dataを設定することでuseStateのpostsに格納することができる
      setPosts(response.data)
    };
    fetchPosts();

  },[user.username, user._id])
  ///URLのクエリを取得する
  //userの切り替え
  // const username=useParams().username;

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
