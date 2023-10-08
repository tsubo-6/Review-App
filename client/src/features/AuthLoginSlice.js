import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isAuthenticate:null
}

const authLoginSlice = createSlice({
  // Sliceの名前を設定
  name: "authLogin",
  initialState,
  reducers: {
    // reducersに"logout"と"isCookie"関数を設定
    logout: (state)=>{
      return {isAuthenticate:null}
    },
    // ログイン成功時にユーザ情報をstoreに格納
    isCookie:(state,action)=>{
      state.isAuthenticate = action.payload;
    }
  },
})

// reducer内に設定されたactionの切り出し
export const {logout,isCookie} = authLoginSlice.actions
// reducerの切り出し
export default authLoginSlice.reducer;
