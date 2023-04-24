import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "./features/AuthLoginSlice"

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import rootReducer from './features/AuthLoginSlice'

const persistConfig = {
  key: 'root',
  storage,
}

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    persistedReducer,
    // authLogin:　slice内のname
    // loginReducer: importしたSliceを受け取っている
    // sliceを登録していく
    authLogin: loginReducer,
  },
});
export const persistor = persistStore(store);
