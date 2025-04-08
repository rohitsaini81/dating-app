import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import TinderCard from "react-tinder-card";

function MatchingPage() {
  const [people, setPeople] = useState([
    {
      name: "Alice",
      url: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Bob",
      url: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    {
      name: "Clara",
      url: "https://randomuser.me/api/portraits/women/52.jpg"
    },
    {
      name: "David",
      url: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: ", direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Match 💘</h1>
      <div className="w-full max-w-xs">
        {people.map((person) => (
          <TinderCard
            className="absolute"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="relative bg-center bg-cover w-80 h-96 rounded-2xl shadow-xl flex items-end p-4 text-white text-xl font-bold"
            >
              {person.name}
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default MatchingPage