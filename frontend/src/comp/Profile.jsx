import { server_url, static_url } from "@/config";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${server_url}user/profile`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 401) {
          window.location.href = "/auth?type=login";
        } else if (response.status === 200) {
          setUser(data);
          console.log(data);
          setImages((data?.posts || []).filter(Boolean));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${server_url}upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setImages((prev) => [...prev, data.url]);
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      toast.error("Upload error: " + err.message);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

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
          <p className="text-gray-500">{user.bio || "Software Developer"}</p>
          <p className="text-gray-600">{user.interests || "Not specified"}</p>
          <p className="text-gray-500">{user.location || ""}</p>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Close Editor" : "Edit Profile"}
          </button>
        </div>

        {editing && (
          <EditProfile
            user={user}
            images={images}
            setImages={setImages}
            onClose={() => setEditing(false)}
          />
        )}

        <h3 className="text-xl font-semibold mt-8 mb-4">Available Photos</h3>
        <div className="grid grid-cols-3 gap-4 p-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow"
            >
              <img src={static_url+img} alt={`post-${index}`} className="w-full h-full object-cover" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="flex items-center justify-center w-full aspect-square bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-500"
          >
            <Plus className="w-6 h-6" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

function EditProfile({ user, images, setImages, onClose }) {
  const [username, setUserName] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [interests, setInterests] = useState(user.interests || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      bio,
      interests,
      images,
    };

    try {
      const response = await fetch(`${server_url}user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Profile updated!");
        onClose();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("Update error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
      <input
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        placeholder="Your Name"
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        type="text"
        placeholder="Bio"
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <input
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        type="text"
        placeholder="Interests"
        className="w-full p-3 border border-gray-300 rounded-lg"
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
  );
}

export default ProfilePage;
