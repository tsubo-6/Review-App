import {useState,useRef,useContext} from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../states/AuthContext"
import {loginCall} from "../actionCalls"

function Login (){
  const email=useRef();
  const password=useRef();
  const {user,isFetching,error,dispatch}= useContext(AuthContext);


  const initialValues ={username:"",password:""};
  // 変数formValuesには初期値としてオブジェクトinitialValuesが格納されている
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});

  // const handleChange= (e) => {
  //   // e.target: タグの要素を得ることができる
  //   const {name,value}=e.target;
  //   // name:value: initialValuesのusername
  //   // value: inputで打ち込んだ文字列->name(usename)に格納
  //   setFormValues({...formValues,[name]:value});
  // }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(email.current.value)
    // console.log(password.current.value)

    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
    //ログイン情報を送信
    //バリデーションチェック
    // setFormErrors(validate(formValues));
  }


  // const validate=(values)=>{
  //   const errors={};
  //   const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  //   if(!values.username){
  //     errors.username="ユーザー名を入力してください";
  //   }
  //   if(!values.mailAddress){
  //     errors.mailAddress="メールアドレスを入力してください";
  //   }else if(!regex.test(values.mailAddress)){
  //     errors.mailAddress="正しいメールアドレスを入力してください"
  //   }
  //   if(!values.password){
  //     errors.password="パスワードを入力してください";
  //   }else if(values.password.length < 4){
  //     errors.password="6文字以上のパスワードを入力してください";
  //   }else if(values.password.length>15){
  //     errors.password="15文字以下のパスワードを入力してください";
  //   }
  //   return errors;
  // }

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
                name="password"
                //onChange={(e)=>handleChange(e)}
                required
                minLength="6"
                ref={password}
              />
            </div>
            <p className="errorMsg">{formErrors.password}</p>

            <button className="loginButton">ログイン</button>
            <button className="loginButton">アカウント作成</button>

          </div>

        </form>
      </div>
    </body>
  )
}

export default Login;
