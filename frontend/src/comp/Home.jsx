import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-800 mt-8 mb-4 text-center">
        Connect & Thrive at University
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-8">
        SwipeMatch is the ultimate platform for students worldwide to match with peers, join societies, and make the most of their university experience.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card className="rounded-2xl shadow-lg p-6">
          <CardContent>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Why Choose SwipeMatch?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Designed specifically for university students</li>
              <li>Easy to build connections that matter</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg p-6">
          <CardContent>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Connect with students with similar interests</li>
              <li>Instant messaging and group chats</li>
              <li>Join societies with a simple swipe</li>
              <li>Smart academic-based matching</li>
              <li>Premium features to boost your profile</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <Link to="/auth?type=register">
          <Button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg flex items-center gap-2 rounded-2xl">
            <UserPlus className="w-5 h-5" /> Join Now
          </Button>
        </Link>
        <Link to="/auth?type=login">
          <Button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-3 text-lg flex items-center gap-2 rounded-2xl">
            <LogIn className="w-5 h-5" /> Login
          </Button>
        </Link>
      </div>

      <footer className="text-sm text-gray-500 text-center mt-12">
        <p className="mb-1">Ready to Transform Your University Experience?</p>
        <p className="font-semibold">SwipeMatch — Connect. Join. Thrive.</p>
        <p className="mt-2">Terms of Use and Conditions</p>
        <p>© 2025 SwipeMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}
