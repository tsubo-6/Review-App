import { createContext, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { useReducer } from "react";

//最初のユーザ状態を定義
export const initialState = {
  user:null,
  // user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching:false,
  error:false,
};

//状態をグローバルに管理:createContext
//createContext(intialState); ->初期値のユーザ状態をどこでも使えるようにする
export const AuthContext = createContext(initialState);

export const AuthContextProvider=({children}) =>{
  //useReducer()
  //第一引数:Reducer関数(昔のstateを新しいstateに更新する
  //第二引数:stateの初期値
  //state: 新しい状態
  //dispatch:アクションの通知
  const [state,dispatch]= useReducer(AuthReducer, initialState);

  // useEffect(()=>{
  //   localStorage.setItem("user", JSON.stringify(state.user))
  // },[state.user])

  return(
    //createContext使用時(l15)に利用可能
    <AuthContext.Provider
    value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      dispatch,
    }}
    >
      {/* children->AuthContextで囲まれたchildrenはvalueの値を全て使用できる */}
      {/* <App/> */}
      {children}
    </AuthContext.Provider>
  );
};
