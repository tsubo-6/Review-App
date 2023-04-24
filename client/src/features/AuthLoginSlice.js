import {createSlice} from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


const initialState = {
  isAuthenticate:null
}

const authLoginSlice = createSlice({
  // Sliceの名前を設定
  name: "authLogin",
  initialState,
  reducers: {
    // reducerとactionを設定
    logout: (state)=>{
      return {isAuthenticate:null}
    },
    isCookie:(state,action)=>{
      state.isAuthenticate = action.payload;
    }
  },
})


// reducer内に設定されたactionの切り出し
export const {logout,isCookie} = authLoginSlice.actions
// reducerの切り出し
export default authLoginSlice.reducer;
