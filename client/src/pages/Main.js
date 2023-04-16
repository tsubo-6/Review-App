import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect} from 'react';
import axios from "axios"

// 親コンポーネント
function Main(){

  //投稿された情報を格納 @
  const [posts, setPosts]=useState([]);
  //ログイン時のユーザ情報

  //useEffectの無名関数にasyncがつけられない
  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts=async ()=>{
      const response = await axios.get("http://localhost:5000/api/posts", {
        //4/2
      // const response = await axios.get("http://localhost:5000/api/posts/"+username, {

      //送りたいパラメータの指定
      // params: {username: user.useName}
    });
      //引数にresponse.dataを設定することでuseStateのpostsに格納することができる
      setPosts(response.data)
    };
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
