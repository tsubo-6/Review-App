import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar.jsx'
import { useState } from "react";
import Card from "../components/Card"

// 親コンポーネント
function Main(props){
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div>
      {/* 子コンポーネントに渡す */}
      <Navbar
        setSidebarVisible={setSidebarVisible}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar sidebarVisible={sidebarVisible}/>

      {/* {props.visible && <Sidebar/>} */}
      <Card/>
    </div>
  )
}

export default Main
