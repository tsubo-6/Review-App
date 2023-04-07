import {useState,useRef} from "react";
import { Link } from "react-router-dom";

import axios from "axios";


function Register (){
  const username=useRef("");
  const email=useRef("");
  const password=useRef("");

  const initialValues ={username:"",password:""};
  // 変数formValuesには初期値としてオブジェクトinitialValuesが格納されている
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});

  const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const newUser = {
    // userName: e.target['userName'].value,
    username: e.target['user'].value,
    email: e.target['mailAddress'].value,
    password: e.target['pass'].value ,
  };

    //package.jsonにproxy設定(http://localhost:5000省略)
    //registerAPIを叩く -> routesないのファイルで指定したroute.postの第一引数のエンドポイントを指定することでアクセス
    //第二引数:登録するデータ
    console.log(newUser)
    await axios.post("http://localhost:5000/api/auth/register" , newUser);
    // window.location.reload();
    console.log("新規登録されました");
  }catch(err){
    console.log(err);
  }
};

  return(
    <body className="log">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>新規登録</h1>
          {/* 横線 */}
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
                //onChange={(e)=>handleChange(e)}
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
                //onChange={(e)=>handleChange(e)}
                required
                ref={email}
              />
            </div>
            <p className="errorMsg">{formErrors.mailAddress}</p>
            <div className="formField">
              <label>Password : </label>
              {/* name属性 : JSに使用 */}
              <input
                type="password"
                placeholder="パスワード"
                name="pass"
                //onChange={(e)=>handleChange(e)}
                required
                minLength="6"
                ref={password}
              />
            </div>
            <p className="errorMsg">{formErrors.password}</p>

            <button className="loginButton">新規登録</button>
          </div>

        </form>
      </div>
    </body>
  )
}

export default Register;
