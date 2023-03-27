import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import Card from "../components/Card"
import RecipeReviewCard from "../components/Card"
import { useParams } from 'react-router-dom';
import React,{useState,useEffect,useContext} from 'react';
import { AuthContext } from '../states/AuthContext';
import axios from "axios"

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
      // 3/16
      // const response = await axios.get("http://localhost:5000/api/posts/", {
      const response = await axios.get("http://localhost:5000/api/posts/"+user.username, {

      //送りたいパラメータの指定
      // params: {username: user.useName}
    });
      //引数にresponse.dataを設定することでuseStateのpostsに格納することができる
      setPosts(response.data)
    };
    fetchPosts();

  },[user.username, user._id])

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
