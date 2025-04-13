import AuthPage from "./comp/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./comp/Dashboard";
import LogoutPage from "./comp/Logout";
import ProfilePage from "./comp/Profile";
import Navbar from "./comp/Navbar";
import MatchingPage from "./comp/SwipePage";
import { server_url } from "./config";
import Home from "./comp/Home";
function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/logout" element={<LogoutPage/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/app/recs" element={<MatchingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;





// const fetchData = async () => {
//       try {
//         const response = await fetch(`${server_url}verify`, {
//           method:"POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token: localStorage.getItem("token") }),
//           credentials: "include",
//         });
//         if (!response.ok) {
//           return ("Network response was not ok");
//         }
//         if(response.status === 200){
//           return true;
//         }
        
//       } catch (error) {
//         return(error.Error || "Please Login");
//       }
//     };

    // export {fetchData};