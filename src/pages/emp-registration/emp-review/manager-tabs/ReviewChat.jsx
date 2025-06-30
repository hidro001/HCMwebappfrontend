import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../../service/axiosInstance";

export default function ManagerChatPanel({ employeeId }) {
  const managerId = localStorage.getItem("employeeId"); // reviewer or manager
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);
  const intervalRef = useRef(null);

  // Fetch messages periodically
  useEffect(() => {
    const fetchMessages = async () => {
      if (!managerId || !employeeId) return;
      try {
        const res = await axiosInstance.get(
          `/registration/remarks/${managerId}/${employeeId}`
        );
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("❌ Failed to load chat.");
      }
    };

    fetchMessages(); // initial
    intervalRef.current = setInterval(fetchMessages, 9000);

    return () => clearInterval(intervalRef.current); // cleanup
  }, [managerId, employeeId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return toast.error("Enter a message.");
    if (!managerId || !employeeId) return toast.error("Invalid participants.");

    try {
      await axiosInstance.post("/registration/remarks", {
        sender: managerId,
        receiver: employeeId,
        message: input,
      });

      setInput("");
      toast.success("Message sent.");
      // Don't push manually, will refresh in 3s
    } catch (err) {
      console.error("Send error:", err);
      toast.error("❌ Failed to send message.");
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
        💬 Manager Chat Panel
      </h2>

      <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-700 p-3 rounded">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              sender={msg.sender === managerId ? "You" : employeeId}
              text={msg.message}
              time={msg.createdAt}
            />
          ))
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">No messages yet.</p>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="flex gap-2 mt-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border dark:bg-gray-900 dark:text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPaperPlane /> Send
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ sender, text, time }) {
  const isYou = sender === "You";
  const formatted = new Date(time).toLocaleString();

  return (
    <div className={`mb-2 flex ${isYou ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg shadow text-sm max-w-md ${
          isYou ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-600 dark:text-white"
        }`}
      >
        <div className="font-semibold">{sender}</div>
        <div>{text}</div>
        <div className="text-xs mt-1 text-right">{formatted}</div>
      </div>
    </div>
  );
}
