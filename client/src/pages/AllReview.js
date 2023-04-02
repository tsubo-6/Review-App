import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import RecipeReviewCard from "../components/Card"
import React,{useState,useEffect,useContext} from 'react';
import { AuthContext } from '../states/AuthContext';
import axios from "axios"

function AllReview() {
  const [posts, setPosts]=useState([]);

  useEffect(()=>{
    const fetchPosts=async ()=>{
      const response = await axios.get("http://localhost:5000/api/posts/", {
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
          <RecipeReviewCard post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
}

export default AllReview
