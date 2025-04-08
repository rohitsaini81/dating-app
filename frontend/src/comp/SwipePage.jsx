import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useRef, useState } from "react";
import TinderCard from "react-tinder-card";

function MatchingPage() {
  const [people, setPeople] = useState([
    {
      name: "Alice",
      url: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bob",
      url: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
      name: "Clara",
      url: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    {
      name: "David",
      url: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ]);

  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-pink-100 to-purple-200"
  );

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    if (direction === "right") {
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

  const childRefs = useRef([]);

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
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            swipeRequirementType="position"
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

export default MatchingPage;
