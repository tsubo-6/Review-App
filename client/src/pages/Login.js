import {useRef,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch} from 'react-redux'
import {isCookie} from "../features/AuthLoginSlice"

function Login (){
  const userName=useRef("");
  const email=useRef("");
  const password=useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [msg,setMsg] = useState("");

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const loginData ={
        username : e.target["userName"].value,
        email: e.target['email'].value,
        password: e.target['password'].value ,
      }
      await axios.post("/api/auth/login",
      loginData,
      );
      console.log(e.target)
      if(e.target["username"]!==loginData.username){
        setMsg("ユーザ名、メールアドレスまたはパスワードが違います")
      }
      const response = await axios.get("/api/auth/");
      if(response.data){
        dispatch(isCookie(response.data))
        navigate("main")
      }
      // console.log(response.data)
      // navigate("main")
    }catch(err){
      console.log(err);
    }
  }
  const errMsg = (req,res) =>{
    req.flash('err')
  }

  return(
    <body className="log">
      <div className="formContainer">
        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
        <form onSubmit={(e)=> handleSubmit(e)}>
          <h1>ログイン</h1>
          {/* 横線 */}
          <hr/>
          {/* User Pass入力する大枠 */}
          <div className="uiForm">
            {/* User */}
            <div className="formField">
              <label>User: </label>
              {/* name属性 : JSに使用 */}
              {/* onChange(): 入力された時に発火する */}
              <input
                type="text"
                placeholder="ユーザ名"
                name="userName"
                //onChange={(e)=>handleChange(e)}
                required
                ref={userName}
              />
            </div>

            <div className="formField">
              <label>Mail Address : </label>
              {/* name属性 : JSに使用 */}
              {/* onChange(): 入力された時に発火する */}
              <input
                type="email"
                placeholder="メールアドレス"
                name="email"
                //onChange={(e)=>handleChange(e)}
                required
                ref={email}
              />
            </div>
            <div className="formField">
              <label>Password : </label>
              {/* name属性 : JSに使用 */}
              <input
                type="password"
                placeholder="パスワード"
                name="password"
                //onChange={(e)=>handleChange(e)}
                required
                minLength="6"
                ref={password}
              />
            </div>
            <font color="red"><strong>{msg}</strong></font>
            <button className="loginButton">ログイン</button>
            <Link to="/register">
              <button className="loginButton">アカウント作成</button>
            </Link>
          </div>
        </form>
      </div>
    </body>
  )
}

export default Login;
