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
  // バリデーションエラー表示
  const [msg,setMsg] = useState("");

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const loginData ={
        username : e.target["userName"].value,
        email: e.target['email'].value,
        password: e.target['password'].value ,
      }
      await axios.post("/api/auth/login",loginData,);
      const response = await axios.get("/api/auth/");
      console.log(response.data)
      if(!response.data){
        setMsg("ユーザ名メールアドレスまたはパスワードが違います")
      }else{
        if(response.data){
          dispatch(isCookie(response.data))
          navigate("main")
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  return(
    <div className="log">
      <div className="formContainer">
        <form onSubmit={(e)=> handleSubmit(e)}>
          <h1>ログイン</h1>
          <hr/>
          <div className="uiForm">
            <div className="formField">
              <label>User: </label>
              {/* name属性 : JSに使用 */}
              <input
                type="text"
                placeholder="ユーザ名"
                name="userName"
                required
                ref={userName}
              />
            </div>

            <div className="formField">
              <label>Mail Address : </label>
              {/* name属性 : JSに使用 */}
              <input
                type="email"
                placeholder="メールアドレス"
                name="email"
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
                required
                minLength="6"
                ref={password}
              />
            </div>
            <div className="formField">
            <font color="red"><strong>{msg}</strong></font>
            <button className="loginButton">ログイン</button>
            </div>
            <Link to="/register">
              <button className="loginButton2">👉 新規アカウント作成はこちら</button>
            </Link>
          </div>
        </form>
      </div>

      {/* 背景にアニメーション追加予定 */}
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

    </div>
  )
}

export default Login;
