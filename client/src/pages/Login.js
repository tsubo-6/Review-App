import {useState} from "react";
import { Link } from "react-router-dom";

function Login (){
  const initialValues ={username:"",password:""};
  // 変数formValuesには初期値としてオブジェクトinitialValuesが格納されている
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});

  const handleChange= (e) => {
    // e.target: タグの要素を得ることができる
    const {name,value}=e.target;
    // name:value: initialValuesのusername
    // value: inputで打ち込んだ文字列->name(usename)に格納
    setFormValues({...formValues,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    //ログイン情報を送信
    //バリデーションチェック
    setFormErrors(validate(formValues));

  }

  const validate=(values)=>{
    const errors={};
    const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.username){
      errors.username="ユーザー名を入力してください";
    }
    if(!values.mailAddress){
      errors.mailAddress="メールアドレスを入力してください";
    }else if(!regex.test(values.mailAddress)){
      errors.mailAddress="正しいメールアドレスを入力してください"
    }
    if(!values.password){
      errors.password="パスワードを入力してください";
    }else if(values.password.length < 4){
      errors.password="6文字以上のパスワードを入力してください";
    }else if(values.password.length>15){
      errors.password="15文字以下のパスワードを入力してください";
    }
    return errors;
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
              <label>User : </label>
              {/* name属性 : JSに使用 */}
              {/* onChange(): 入力された時に発火する */}
              <input
                type="text"
                placeholder="ユーザ名"
                name="username"
                onChange={(e)=>handleChange(e)}
              />
            </div>
            <p className="errorMsg">{formErrors.username}</p>
            <div className="formField">
              <label>Mail Address : </label>
              {/* name属性 : JSに使用 */}
              {/* onChange(): 入力された時に発火する */}
              <input
                type="text"
                placeholder="メールアドレス"
                name="mailAddress"
                onChange={(e)=>handleChange(e)}
              />
            </div>
            <p className="errorMsg">{formErrors.mailAddress}</p>
            <div className="formField">
              <label>Password : </label>
              {/* name属性 : JSに使用 */}
              <input type="text" placeholder="パスワード" name="password" onChange={(e)=>handleChange(e)}/>
            </div>
            <p className="errorMsg">{formErrors.password}</p>

            <Link to="/main">Login</Link>
          </div>

        </form>
      </div>
    </body>
  )
}

export default Login;
