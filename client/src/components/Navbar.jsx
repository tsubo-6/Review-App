import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { persistor } from './../store'

function Navbar(props){
  // isAuthenticate: initialStateのオブジェクト内からとってくる
  //const {isAuthenticate} = useSelector((store)=>store.isAuthLogin)

  const navigate = useNavigate();
  const handleClick = async(e)=>{
    e.preventDefault();
    persistor.purge()
    await axios.get("/api/auth/logout");
    navigate('/');
  }

  return(
    <div className="Nav">
      {/* flexGrow:1 ...　navbarに占める割合 */}
      <Box sx={{ flexGrow: 1 }}>
        {/* AppBar: アプリケーションの上部に配置して、よく使う機能へのショートカットを作成 */}
        {/* styleで詳細変更可能 */}
        <AppBar position="static" style={{color: "white" ,backgroundColor: "#448044"}}>
          {/* AppBarの中にToolbar : 部品が横並びになる */}
          <Toolbar>
            {/* IconButton : エフェクト */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            {/* Sidebar表示非表示 */}
            {/* <MenuIcon onClick={() => setVisible(!visible)}/> */}
            {/* Mainにprops渡す */}
            {/* <Main visible={visible}/> */}

            {/* Mainコンポーネントからprops受け取る */}
            <MenuIcon onClick={() => props.setSidebarVisible(!props.sidebarVisible)}/>

            </IconButton>
            {/* Typography : 文字デザイン */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Review App
            </Typography>
            {/* <Button color="secondary">Login</Button> */}
            <Button color="inherit" onClick={(e)=>handleClick(e)}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Trueならサイドバー表示 */}
      {/* {visible && <Sidebar/>} */}
    </div>
  )
}

export default Navbar;
