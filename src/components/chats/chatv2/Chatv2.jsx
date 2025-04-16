import React, { useState, useContext } from "react";
import ConversationList from "./ConversationList";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import GroupList from "./GroupList"; // <== NEW
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import GroupChatWindow from "./GroupChatWindow";

export default function Chat() {
  const [activeTab, setActiveTab] = useState("Conversations");
  const {
    activeConversation,
    clearActiveConversation,
    setSelectedUser,
    setSelectedConversation,
    // We'll also add selectedGroup in the ChatContext below
    selectedGroup,
    clearActiveGroup, // We'll define in context
  } = useContext(ChatContextv2);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    // Reset everything
    clearActiveConversation();
    clearActiveGroup?.();
    setSelectedUser(null);
    setSelectedConversation(null);
  };

  const renderLeftPanelContent = () => {
    if (activeTab === "Members") return <UserList />;
    if (activeTab === "Groups") return <GroupList />;
    return <ConversationList />;
  };

  const renderRightPanelContent = () => {
    // If a 1-to-1 conversation is selected
    if (activeConversation) return <ChatWindow />;

    // If a group is selected, we’ll create GroupChatWindow
    if (selectedGroup) {
      // Show the group chat window
      return <GroupChatWindow />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6 flex flex-col items-center">
          <div className="text-4xl mb-4" role="img" aria-label="Chat icon">
            💬
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Select a conversation or group to start chatting
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-[70vh] w-full bg-gray-100 dark:bg-gray-800 transition-colors">
      {/* LEFT PANEL */}
      <div className="w-full md:w-3/12 h-auto md:h-full flex flex-col transition-all">
        {/* Tabs */}
        <div className="flex flex-row h-12 md:h-14 p-2 gap-2 justify-center">
          {/* Chat tab */}
          <div
            onClick={() => handleTabSwitch("Conversations")}
            className={`
              w-1/3 flex items-center justify-center
              text-sm font-semibold cursor-pointer
              shadow-md transition-all rounded-l-lg
              ${
                activeTab === "Conversations"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }
            `}
          >
            Chat
          </div>

          {/* Members Tab */}
          <div
            onClick={() => handleTabSwitch("Members")}
            className={`
              w-1/3 flex items-center justify-center
              text-sm font-semibold cursor-pointer
              shadow-md transition-all
              ${
                activeTab === "Members"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }
            `}
          >
            Members
          </div>

          {/* Groups Tab */}
          <div
            onClick={() => handleTabSwitch("Groups")}
            className={`
              w-1/3 flex items-center justify-center
              text-sm font-semibold cursor-pointer
              shadow-md transition-all rounded-r-lg
              ${
                activeTab === "Groups"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }
            `}
          >
            Groups
          </div>
        </div>

        {/* List area */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {renderLeftPanelContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 h-full p-4 overflow-y-auto">
        {renderRightPanelContent()}
      </div>
    </div>
  );
}


