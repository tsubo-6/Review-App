//ユーザ入力に応じたアクションの設定
//AuthAction: ログイン開始、成功、失敗のアクションを設定
export const LoginStart=(user)=>({
  //type:状態の名前
  type:"LOGIN_START",
});

export const LoginSuccess=(user)=>({
  type:"LOGIN_SUCCESS",
  payload: user,
});

export const LoginError=(error)=>({
  type:"LOGIN_ERROR",
  payload: error,
});
