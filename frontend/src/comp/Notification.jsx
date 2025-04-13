import { useEffect, useState } from "react";
import { server_url } from "@/config";
import toast from "react-hot-toast";

function Notifications() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    fetchNotifs();
  }, []);

  const fetchNotifs = async () => {
    try {
      const res = await fetch(`${server_url}notifications`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setNotifs(data);
    } catch (err) {
        console.log(err.message);
      toast.error("Failed to load notifications");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifs.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifs.map((n) => (
            <div
              key={n._id}
              className="bg-white p-4 shadow rounded border border-gray-200"
            >
              <p>{n.message}</p>
              <span className="text-sm text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
