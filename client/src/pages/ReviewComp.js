import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom"

function ReviewComp() {
  const navigation = useNavigate()

  const handleClick = async(e) =>{
    navigation("/main")
    console.log(e.target)
  }

  return (
    <div>
      <Navbar/>
      <label>投稿が完了しました!</label>
      <button onClick={(e)=>handleClick}>メイン画面へ戻る</button>
    </div>
  )
}

export default ReviewComp
