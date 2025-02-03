import { useState } from "react";
import { FaPhone, FaVideo, FaPaperclip, FaCommentDots } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function ChatList({ selectedChat, chatMessages, setChatMessages }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), { sender: "Me", text: message, time: new Date().toLocaleTimeString() }],
    }));
    setMessage("");
  };

  return (
    <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-lg md:w-3/4 w-full overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <h2 className="text-lg font-semibold">{selectedChat || "Select a chat"}</h2>
        <div className="flex gap-3">
          <FaVideo className="cursor-pointer" />
          <FaPhone className="cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto">
        {selectedChat && chatMessages[selectedChat] ? (
          chatMessages[selectedChat].map((msg, index) => (
            <div key={index} className={`max-w-xs p-3 rounded-lg ${msg.sender === "Me" ? "bg-gray-100 dark:bg-gray-700 self-end shadow-sm" : "bg-gray-200 dark:bg-gray-800 self-start shadow-sm"}`}>
              <p className="text-gray-900 dark:text-gray-100">{msg.text}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">{msg.time}</span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-400">
            <FaCommentDots className="w-20 h-20 mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-lg font-semibold">Empty, Message...</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Don't worry, just take a deep breath & say "Hello"</p>
          </div>
        )}
      </div>

      <div className="flex items-center p-4 border-t mt-4 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md">
        <input 
          type="text" 
          className="flex-grow p-2 bg-transparent outline-none text-gray-900 dark:text-gray-100" 
          placeholder="Start typing here" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <FaPaperclip className="cursor-pointer text-gray-500 dark:text-gray-400 mx-2" />
        <button onClick={handleSend} className="bg-purple-600 text-white p-2 rounded-full shadow-md">
          <IoSend />
        </button>
      </div>
    </div>
  );
}
