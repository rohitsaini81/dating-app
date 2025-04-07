// src/pages/LogoutPage.jsx
import { server_url } from "@/App";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function LogoutPage() {
  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${server_url}logout`, {
              credentials: "include",
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // const data = await response.json();
          } catch (error) {
            console.info(error.Error || "Something went wrong");
          }
        };
    fetchData()
    localStorage.removeItem("token");
  }, []);

  return <Navigate to="/auth?type=login" replace />;
}
