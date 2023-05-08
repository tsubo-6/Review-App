import React from 'react'
import { Link } from 'react-router-dom'

function RegisterComp() {
  return (
    <div>
      <label>新規登録が完了しました!</label>
      <Link to="/">ログイン画面に戻る</Link>
    </div>
  )
}

export default RegisterComp
