import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main.js"
import Login from './pages/Login';
import Review from "./pages/Review"
import ReviewComp from './pages/ReviewComp';
import {useState,useRef,useContext} from "react";
import {AuthContext} from "./states/AuthContext"


function App() {
  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
        <Routes>
          {/* ユーザが存在したらmain画面へと遷移 */}
          <Route path="/" element={user ? <Navigate to="/main"/> : <Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/complete" element={<ReviewComp />} />

        </Routes>
    </BrowserRouter>
  );
}
export default App;
