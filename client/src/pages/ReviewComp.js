import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

function ReviewComp() {
  const navigation = useNavigate()

  return (
    <div>
      <Navbar/>
      <label>投稿が完了しました!</label>
      <Link to="/main">メイン画面に戻る</Link>
    </div>
  )
}

export default ReviewComp
