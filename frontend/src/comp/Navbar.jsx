import { Link } from "react-router-dom";
import { Home, MessageCircle, Bell, MoreHorizontal, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Home Icon - Logo */}
        <Link to="/home" className="text-blue-600 hover:text-blue-700 transition">
          <Home className="w-6 h-6" />
        </Link>

        {/* Nav Icons */}
        <div className="flex items-center gap-6">
          <Link to="/chat" className="text-gray-700 hover:text-blue-600 transition">
            <MessageCircle className="w-6 h-6" />
          </Link>
          <Link to="/notifications" className="text-gray-700 hover:text-blue-600 transition">
            <Bell className="w-6 h-6" />
          </Link>
          <Link to="/settings" className="text-gray-700 hover:text-blue-600 transition">
            <MoreHorizontal className="w-6 h-6" />
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
