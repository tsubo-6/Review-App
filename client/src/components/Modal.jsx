import React from 'react'

// 追加機能として修正中
function Modal() {
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>レビューを削除してもよろしいですか？</h4>
        <div className="btn-container">
          <button className="btn confirm-btn">削除</button>
          <button className="btn confirm-btn">キャンセル</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal
