import { server_url } from "@/App";
import { useEffect, useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${server_url}user/profile`, {
          method: "GET",

          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 401) {
          // toast.error("Please Login to continue");

          window.location.href = "/auth?type=login";
        } else if (response.status === 200) {
          console.log(data);
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profilePicture || "/profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
            />
            <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">
              {user.bio ? user.bio : "Softwere Developer"}
            </p>
            <strong>Interests:</strong> {user.interests || "Not specified"}
            <div className="flex flex-wrap justify-center mt-4">
              <p className="mr-1 px-4 py-2 bg-white-600 text-black rounded-lg hover:bg-gray-700 transition">
                Codding
              </p>
              <p className="mr-1 px-4 py-2 bg-white-600 text-black rounded-lg hover:bg-gray-700 transition">
                Java
              </p>
              <p className="mr-1 px-4 py-2 bg-white-600 text-black rounded-lg hover:bg-gray-700 transition">
                Basket BAll
              </p>
            </div>
            <p className="text-gray-500">{user.location}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Close Editor" : "Edit Profile"}
            </button>
          </div>
          {editing && <EditProfile onClose={() => setEditing(false)} />}

          <h3 className="text-xl font-semibold mt-8 mb-4">Available Photos</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <img
                key={item}
                src={`https://via.placeholder.com/150?text=Photo+${item}`}
                alt={`Photo ${item}`}
                className="rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function EditProfile({ onClose }) {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Bio"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Interests"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
