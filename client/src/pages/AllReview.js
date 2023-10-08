import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect} from 'react';
import axios from "axios"
import { persistor } from "./../store";
import { useNavigate } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress";

// webアプリに投稿された全ての投稿を表示
function AllReview() {
  const [posts, setPosts]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  // 全投稿が見れる画面では修正ボタン・削除ボタンは表示されてほしくない
  const hideButton=false;
  const persistedState = persistor.getState();

  useEffect(()=>{
    const fetchPosts=async ()=>{
      if(persistedState==null){
        return navigation("/")
      }
      const response = await axios.get("/api/posts", {
    });
      setPosts(response.data)
      setIsLoading(true)
    };
    fetchPosts();
  },[])

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const main = <div>
      <Navbar
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <div className="main">
        <Sidebar sidebarVisible={sidebarVisible}/>
        {posts.map((post)=>(
          <RecipeReviewCard post={post} key={post._id} hidden={hideButton}/>
        ))}
      </div>
    </div>

  return (
    <>
      {isLoading ? (main) : (<CircularProgress className="loading" style={{width:"150px", height:"150px"}}/>)}
    </>
  )
}

export default AllReview
