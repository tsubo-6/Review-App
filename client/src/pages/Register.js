import {useRef} from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register (){
  const username=useRef("");
  const email=useRef("");
  const password=useRef("");
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const newUser = {
    username: e.target['user'].value,
    email: e.target['mailAddress'].value,
    password: e.target['pass'].value ,
  };

    //package.jsonにproxy設定(http://localhost:5000省略)
    //registerAPIを叩く -> routesないのファイルで指定したroute.postの第一引数のエンドポイントを指定することでアクセス
    //第二引数:登録するデータ
    console.log(newUser)
    await axios.post("http://localhost:5000/api/auth/register" , newUser);
    navigate("/register/complete")
  }catch(err){
    console.log(err);
  }
};

  return(
    <div className="log">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>新規登録</h1>
          <hr/>
          {/* User Pass入力する大枠 */}
          <div className="uiForm">
            {/* User */}
            <div className="formField">
              <label>User Name : </label>
              {/* name属性 : JSに使用 */}
              {/* onChange(): 入力された時に発火する */}
              <input
                type="text"
                placeholder="ユーザネーム"
                name="user"
                required
                ref={username}
              />
            </div>
            <div className="formField">
              <label>Mail Address : </label>
              {/* name属性 : JSに使用 */}
              {/* onChange(): 入力された時に発火する */}
              <input
                type="email"
                placeholder="メールアドレス"
                name="mailAddress"
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
                name="pass"
                required
                minLength="6"
                ref={password}
              />
            </div>
            <div className="formField">
              <button className="loginButton">新規登録</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;
