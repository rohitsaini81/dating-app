import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { server_url } from "@/config";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();

  // profile picture
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Update login/register mode
    const mode = searchParams.get("type");
    setIsLogin(mode === "login");

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${server_url}verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setRedirect(true);
        }
      } catch (error) {
        console.info(error.message || "Token invalid or missing.");
      }
    };

    fetchData();
  }, [searchParams]);

  if (redirect) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = isLogin ? `${server_url}login` : `${server_url}user/create`;
    const data = isLogin
  ? { email, password }
  : { username, email, password, profilePic: profilePicUrl };




    if (!isLogin && !profilePicUrl) {
      toast.error("Please upload a profile picture before registering");
      return;
    }
    

    // Validations
    if (!email || !password || (!isLogin && !username)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (!isLogin) {
      if (!/^[a-zA-Z0-9]+$/.test(username)) {
        toast.error("Username can only contain letters and numbers");
        return;
      }
      if (username.length < 3 || username.length > 20) {
        toast.error("Username must be 3–20 characters long");
        return;
      }
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      toast.success(result.message || "Success");
      setRedirect(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to server");
    }
  };



  const handleUploadImage = async () => {
    if (!profilePic) return toast.error("Please select an image");
  
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", profilePic); // or whatever field your API expects
  
      const res = await fetch(`${server_url}upload`, {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.error || "Upload failed");
      }
  
      setProfilePicUrl(result.url); // Or result.path or whatever you get back
      toast.success("Profile picture uploaded!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>


              <input
                type="file"
                accept="image/*"
                placeholder="Profile Picture"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />


              {profilePic && (
                <>
                  <div className="mt-2 text-center">
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded-full mx-auto"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={uploading}
                    className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {uploading ? "Uploading..." : "Upload Profile Picture"}
                  </button>

                  <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                </>
              )}
            </>
          )}

          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  );
}
