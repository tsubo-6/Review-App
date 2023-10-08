import React from 'react'
import HouseIcon from '@mui/icons-material/House';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// サイドバーの項目を追加する
export const SidebarData = [
  {
    title: "ホーム",
    icon: <HouseIcon/>,
    link: "/main",
  },
  {
    title: "レビュー投稿",
    icon: <EmailIcon/>,
    link: "/review",
  },
  {
    title: "全体のレビュー",
    icon: <AssignmentIndIcon/>,
    link: "/allReview",
  },
  {
    title: "お気に入り",
    icon: <LocalAtmIcon/>,
    link: "/favorites",
  }
]
