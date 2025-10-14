import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://classplut2.onrender.com");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [time, setTime] = useState("");


  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    axios
      .get("https://classplut2.onrender.com/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

 
  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  // ⬇Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  Load saved messages from backend on refresh
  useEffect(() => {
    axios
      .get("https://classplut2.onrender.com/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.log("Error loading messages:", err));
  }, []);

  //  Send message
  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      sender: users.username,
      text: message,
      time: time,
      role: users.role,
      userid: users._id,
    };

    socket.emit("chatMessage", newMsg);
    setMessage("");

    // Optional: instantly show message (optimistic UI)
    // setMessages((prev) => [...prev, newMsg]);
  };

  // console.log(messages)

  return (
    <div className="flex flex-col items-center justify-center h-[100%] p-4">
      <div className="w-full bg-white/50 rounded-2xl shadow-lg flex flex-col h-screen mt-15">
        {/* Header */}
        <div className="bg-black/50 text-white py-4 px-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat</h2>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === users.username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.sender === users.username
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm mb-1">{msg.sender}</p>
                <p className="font-bold">{msg.text}</p>
                <p className="text-xs text-right mt-1 opacity-80">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSend}
          className="border-t p-4 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-4 outline-none focus:ring-2 focus:ring-blue-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-full font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
