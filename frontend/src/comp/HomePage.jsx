function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server_url}verify`, {
          credentials: "include",
        });
        if (!response.ok) {
          toast.error("Please Login");
          setLoading(false);
          setRedirect(true);
          throw new Error("Network response was not ok");
          
        }
        // const data = await response.text();
        toast.success("Welcome back!");
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        console.info(error.Error || "Something went wrong");
      }
    };
    fetchData();
  }, []);


  if (redirect) {
    return <Navigate to="/auth?type=login" replace />;
}



  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center text-center px-6">
        {loading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              Welcome to Our App
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Experience the future of authentication with a sleek, simple, and
              intuitive interface.
            </p>
            {isLoggedIn ? (
              <div className="flex flex-col w-full">
                <MatchingPage />
                <FriendRequests />
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/auth?type=login"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/auth?type=register"
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Register
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
import { ColorRing } from "react-loader-spinner";  

export default HomePage;
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server_url } from "@/config";
import MatchingPage from "./SwipePage";
import toast from "react-hot-toast";
import FriendRequests from "./FriendRequests";
