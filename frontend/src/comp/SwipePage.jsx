import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import { server_url } from "@/config";
import toast from "react-hot-toast";
export default function MatchingPage() {
  const [people, setPeople] = useState([]);
  const childRefs = useRef([]);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-pink-100 to-purple-200"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server_url}users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,

            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        console.log(data);
        setPeople((prevPeople) => [...prevPeople, ...data]);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

const sendRequest = async (userId) => {
  const token = localStorage.getItem("token");
  console.log(userId);
  if (!token) {
    console.error("No token found");
    return;
  }
  try {
    const response = await fetch(`${server_url}user/add/friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      
      // throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending request:", error.message);
}}


  const swiped = (direction, nameToDelete, personId) => {
    console.log("removing: " + nameToDelete);
    if (direction === "right") {
      sendRequest(personId);
      setBgColor("bg-green-200");
    } else if (direction === "left") {
      setBgColor("bg-red-200");
    }
    setTimeout(() => {
      setBgColor("bg-gradient-to-br from-pink-100 to-purple-200");
    }, 500);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    setPeople((prevPeople) => prevPeople.filter((p) => p.name !== name));
    setBgColor("bg-gradient-to-br from-pink-100 to-purple-200");
  };


  const swipe = (dir) => {
    const currentIndex = people.length - 1;

    if (currentIndex >= 0 && childRefs.current[currentIndex]) {
      childRefs.current[currentIndex].swipe(dir);
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-6 transition-colors duration-300 ${bgColor}`}
    >
      <h1 className="text-3xl font-bold mb-6">Find Your Match 💘</h1>
      <div className="w-full max-w-xs relative h-96 mb-10">
        {people.map((person,index) => (
          <TinderCard
            ref={(el) => (childRefs.current[index] = el)}
            className="absolute"
            key={person._id}
            onSwipe={(dir) => swiped(dir, person.username, person._id)}
            onCardLeftScreen={() => outOfFrame(person.username)}
            swipeRequirementType="position"
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.profilePic})` }}
              className="relative bg-center bg-cover w-80 h-96 rounded-2xl shadow-xl flex items-end p-4 text-white text-xl font-bold"
            >
              {person.username}
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => swipe("left")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg"
        >
          👎 Swipe Left
        </button>
        <button
          onClick={() => swipe("right")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg"
        >
          👍 Swipe Right
        </button>
      </div>
    </div>
  );
}