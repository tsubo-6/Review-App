import './App.css';
// import Sidebar from "./components/Sidebar"
// import Navbar from "./components/Navbar"

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <Sidebar/>
//     </div>
//   );
// }

// export default App;

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/Main.js"
import Login from './pages/Login';
import Review from "./pages/Review"
import ReviewComp from './pages/ReviewComp';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/complete" element={<ReviewComp />} />

        </Routes>
    </BrowserRouter>
  );
}
export default App;
