import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "./features/AuthLoginSlice"

export const store = configureStore({
  reducer: {
    // authLogin:　slice内のname
    // loginReducer: importしたSliceを受け取っている
    // sliceを登録していく
    authLogin: loginReducer,
  },
});
