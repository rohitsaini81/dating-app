import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthPage from "./comp/AuthPage";
import Dashboard from "./comp/Dashboard";
import LogoutPage from "./comp/Logout";
import ProfilePage from "./comp/Profile";
import Navbar from "./comp/Navbar";
import MatchingPage from "./comp/SwipePage";
import Home from "./comp/Home";
import Chat from "./pages/Chat";
import Notification from "./comp/Notification";

// Wrapper to handle location outside Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  // Exclude navbar on these paths:
  const hideNavbarPaths = ["/", "/auth"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {shouldShowNavbar && <Navbar />}
      <div className={shouldShowNavbar ? "pt-20 px-4" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/app/recs" element={<MatchingPage />} />
          <Route path="/app/notifications" element={<Notification />} />
          <Route path="/app/chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;
