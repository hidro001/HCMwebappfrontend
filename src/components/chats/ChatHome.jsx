import { useState } from "react";
import ChatMember from "./ChatMember";
import ChatList from "./ChatList";
import ProfileCard from "./ProfileCard";
import VideoCallUI from "./VideoCallUI";

export default function ChatHome() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({
    "Agent Rue": [{ sender: "Agent Rue", text: "Hello! How can I assist you today?", time: "10:00 AM" }],
    "Agent Daniel": [{ sender: "Agent Daniel", text: "Hey! Do you need any support?", time: "9:30 AM" }],
    "Agent Rose": [{ sender: "Agent Rose", text: "Good morning!", time: "8:45 AM" }],
    "Agent William": [{ sender: "Agent William", text: "Let me know if you have any questions.", time: "7:50 AM" }],
  });

  return (
 <>
    <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <ChatMember setSelectedChat={setSelectedChat} chatMessages={chatMessages} />
      <ChatList selectedChat={selectedChat} chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>

    <ProfileCard/>
    <VideoCallUI/>
 </>
  );
}
