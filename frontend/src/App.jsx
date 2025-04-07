import AuthPage from "./comp/AuthPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./comp/HomePage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./comp/Dashboard";
import LogoutPage from "./comp/Logout";
import ProfilePage from "./comp/Profile";
import FeedPage from "./comp/Feed";
import Navbar from "./comp/Navbar";

export const server_url = "http://localhost:5000/";
function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/logout" element={<LogoutPage/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
