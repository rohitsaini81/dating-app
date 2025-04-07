import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, LogIn, UsersRound } from "lucide-react"

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link to="/home" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <UsersRound className="w-6 h-6" />
          SwipeMatch
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition">About</Link>
          <Link to="/features" className="text-sm text-gray-600 hover:text-blue-600 transition">Features</Link>
          <Link to="/societies" className="text-sm text-gray-600 hover:text-blue-600 transition">Societies</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/logout">
            <Button variant="ghost" className="flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              Logout
            </Button>
          </Link>
          <Link to="/profile">
            <Button className="flex items-center gap-1">
              <UsersRound className="w-4 h-4" />
              Profile
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </header>
  )
}
