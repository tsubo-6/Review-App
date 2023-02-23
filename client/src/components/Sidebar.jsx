// import { Card } from '@mui/material'
import React from 'react'
import {SidebarData} from "./SidebarData"
import SidebarIcon from "./SidebarIcon"

function Sidebar(props) {
  // return全体を三項演算子で書き換え -> propsにて表示非表示を実装
  return props.sidebarVisible ?(
    // css適用時に使用
    <div className="Sidebar">
      <SidebarIcon/>
      <ul className="SidebarList">
        {SidebarData.map((value, key) => {
          return(
            <li
            key={key}
            className="row"
            onClick={()=>{
            // onClick : アイコンクリック時に指定したパスへ遷移
              window.location.pathname=value.link;
            }}>
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          )
        })}
      </ul>
    </div>

  ):(<></>)
}

export default Sidebar
