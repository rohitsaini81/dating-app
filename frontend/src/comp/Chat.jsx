import { useEffect, useState } from "react";
import { server_url } from "@/config";
import toast from "react-hot-toast";

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${server_url}chat/conversations`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setConversations(data);
    } catch (err) {
        console.log(err.message)
      toast.error("Failed to fetch chats");
    }
  };

  const fetchMessages = async (chatId) => {
    setSelectedChat(chatId);
    try {
      const res = await fetch(`${server_url}chat/messages/${chatId}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setMessages(data);
    } catch (err) {
        console.log(err.message)
      toast.error("Failed to fetch messages");
    }
  };

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    try {
      const res = await fetch(`${server_url}chat/send/${selectedChat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: newMsg }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, data]);
        setNewMsg("");
      }
    } catch (err) {
        console.log(err.message)
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="grid grid-cols-3 min-h-screen">
      <div className="bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => fetchMessages(c._id)}
            className="p-2 hover:bg-gray-100 cursor-pointer rounded"
          >
            {c.username}
          </div>
        ))}
      </div>
      <div className="col-span-2 bg-gray-50 flex flex-col p-4">
        {selectedChat ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg ${
                    msg.isMine ? "bg-blue-200 self-end" : "bg-gray-300 self-start"
                  } max-w-xs`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
