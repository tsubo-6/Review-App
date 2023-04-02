import {useRef,useContext} from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../states/AuthContext"
import {loginCall} from "../actionCalls"

function Login (){
  const userName=useRef();
  const email=useRef();
  const password=useRef();
  //AuthContext内のvalue
  const {user,isFetching,error,dispatch}= useContext(AuthContext);
  const initialValues ={username:"",email:"",password:""};

  const handleSubmit=(e)=>{
    e.preventDefault();
    loginCall(
      {
        // userの中身
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  }

  return(
    <body className="log">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
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
