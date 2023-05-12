import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect} from 'react';
import axios from "axios"
import { persistor } from "../store";
import { useNavigate } from "react-router-dom"

function Favorites() {
  const [posts, setPosts]=useState([]);
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
    };
    fetchPosts();
  },[])

  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div>
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
  )
}

export default Favorites
