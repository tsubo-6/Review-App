// //action:AuthActionで設定したtype
// //returnの中身->状態
// //AuthReducer: 状態(state)を変える仕組み
// const AuthReducer=(state,action)=>{
//   switch (action.type) {
//     case "LOGIN_START":
//       return{
//         user:null,
//         // 情報を取得するか
//         isFetching: true,
//         error:false,
//       };
//     case "LOGIN_SUCCESS":
//       return{
//         //action.payload:状態を返す
//         //payload->AuthActionで設定したpayload
//         user:action.payload,
//         isFetching: false,
//         error:false,
//       };
//     case "LOGIN_ERROR":
//       return{
//         user:null,
//         isFetching: false,
//         error:action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default AuthReducer;
