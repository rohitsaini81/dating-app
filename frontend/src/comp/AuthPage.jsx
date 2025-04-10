import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import Navbar from "./Navbar";
import { server_url } from "@/config";
export default function AuthPage() {
  const [username,SetUsername] = useState("");
  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  // const [register_user, setRegisterUser] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server_url}verify`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if(response.status === 200){
          console.log(response)
          // setRedirect(true);
        }
        
      } catch (error) {
        console.info(error.Error || "Please Login");
      }
    };
    fetchData();
    setIsLogin(searchParams.get('type')=== "login")? true : false;
  }, [searchParams]); 
  if (redirect) {
        return <Navigate to="/home" replace />;
  }
  
  
 

 

  // Handle login/register submit
  const HandleSubmit = async (event) => {
    event.preventDefault();
    const url = isLogin ? `${server_url}login` : `${server_url}user/create`;
    const data = isLogin
    ? {
        email: email,
        password: password,
      }
    : {
      username: username,
      email: email,
      password: password,
    };
    // Validation
    if (!email || !password || (!isLogin && !username)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username) && !isLogin) {
      toast.error("Username can only contain letters and numbers");
      return;
    }
    if (username.length < 3 && !isLogin) {
      toast.error("Username must be at least 3 characters long");
      return;
    }
    if (username.length > 20 && !isLogin) {
      toast.error("Username must be at most 20 characters long");
      return;
    }


  console.info("data", JSON.stringify(data));
  console.info("url", url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error(errorData.error || "Something went wrong");
        return;
      }
      const result = await response.json();
      toast.success(result.message);
      // console.log(result);
      setRedirect(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to server");
    }



  };
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form className="space-y-4" onSubmit={HandleSubmit}>
          {!isLogin && (
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e)=>SetUsername(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e)=>SetEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e)=>SetPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
    </>
  );
}
