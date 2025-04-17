import { useState } from "react"; import { Camera, Play } from "lucide-react";

const messages = [ { name: "Ravinder Malha", time: "3m", msg: "4+ new messages", muted: true, avatar: "https://randomuser.me/api/portraits/men/1.jpg", }, { name: "Goutam Katariya", time: "9w", msg: "4+ new messages", muted: true, avatar: "https://randomuser.me/api/portraits/men/2.jpg", reel: true, }, { name: ".", time: "3h", msg: "Sent a reel by shayari.for.peace...", avatar: "https://randomuser.me/api/portraits/men/3.jpg", camera: true, }, { name: "Happy", time: "7h", msg: "4+ new messages", avatar: "https://randomuser.me/api/portraits/men/4.jpg", }, { name: "Vishal USA", time: "11h", msg: "Sent a live video", avatar: "https://randomuser.me/api/portraits/men/5.jpg", }, { name: "Daniel Chen 毅 and 83 more", time: "2d", msg: "4+ new messages", avatar: "https://randomuser.me/api/portraits/women/1.jpg", }, { name: "Goutam Katariya, Happy", time: "3d", msg: "4+ new messages", avatar: "https://randomuser.me/api/portraits/men/6.jpg", }, { name: "Rohit Saini", time: "6d", msg: "2 new messages", avatar: "https://randomuser.me/api/portraits/men/7.jpg", }, ];

export default function Chat() { const [activeTab, setActiveTab] = useState("Primary");

return ( <div className="bg-black text-white min-h-screen px-4 py-2"> <div className="flex items-center justify-between mb-4"> <h1 className="text-xl font-bold">scientist.tech</h1> <div className="flex items-center gap-4"> <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> <div className="w-6 h-6 bg-gray-800 rounded-full" /> </div> </div>

<div className="flex gap-2 mb-4">
    {['Primary', 'General', 'Requests'].map(tab => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-3 py-1 rounded-full ${
          activeTab === tab ? 'bg-white text-black' : 'bg-gray-800'
        }`}
      >
        {tab} {tab === 'Primary' && '11'}
      </button>
    ))}
  </div>

  <div className="space-y-4">
    {messages.map((item, index) => (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-blue-500">{item.name}</p>
            <p className="text-sm text-gray-400">
              {item.msg} • {item.time} {item.muted && <span className="ml-1">🔇</span>}
            </p>
          </div>
        </div>
        {item.reel ? (
          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
            <Play className="w-4 h-4 mr-1" /> PLAY
          </button>
        ) : (
          item.camera && (
            <Camera className="w-5 h-5 text-white" />
          )
        )}
      </div>
    ))}
  </div>
</div>

); }

