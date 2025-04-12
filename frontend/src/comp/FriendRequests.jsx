import { useEffect, useState } from "react";
import { server_url } from "@/config";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${server_url}user/friends/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
                },

      });
      const data = await res.json();
      if(!res.ok) {
        throw new Error(data.message || "Failed to fetch friend requests");
      }
      setRequests(data);
      console.log("your data");
      console.log(data);
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to perform this action");
      return;
    }
    if (action !== "accept" && action !== "reject") {
      toast.error("Invalid action");
      return;
    }
    try {
      const res = await fetch(`${server_url}user/friend/${action}/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        
      });
      if (res.ok) {
        setRequests((prev) => prev.filter((req) => req._id !== id));
        toast.success(`Friend request ${action}ed`);
      } else {
        toast.error("Action failed");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <ColorRing/>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Friend Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500">No pending requests.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li
                key={req._id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{req.username}</p>
                  <p className="text-sm text-gray-500">{req.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAction(req._id, "accept")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "reject")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FriendRequests;
