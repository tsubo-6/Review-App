import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect} from 'react';
import axios from "axios"
import { persistor } from "../store";
import { useNavigate } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress";

// いいねを押した投稿を全件表示
function Favorites() {
  const [posts, setPosts]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigate()
  const hidden=false;
  const persistedState = persistor.getState();

  useEffect(()=>{
    const fetchPosts=async ()=>{
      if(persistedState==null){
        return navigation("/")
      }
      const response = await axios.get("/api/posts/favorites", {
    });
      setPosts(response.data)
      // true→スピナー表示を解除
      setIsLoading(true)
    };
    fetchPosts();
  },[])

  const main= <div>
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
  </div>

  return (
    <>
      {isLoading ? (main) : (<CircularProgress className="loading" style={{width:"150px", height:"150px"}}/>)}
    </>
  )
}

export default Favorites
