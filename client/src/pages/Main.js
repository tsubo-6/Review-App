import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import { useState } from "react";
import Card from "../components/Card"
import RecipeReviewCard from "../components/Card"
import { useParams } from 'react-router-dom';

// 親コンポーネント
function Main(props){
  ///URLのクエリを取得する
  //userの切り替え
  const username=useParams().username;

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
        <RecipeReviewCard/>
      </div>
    </div>
  )
}

export default Main
