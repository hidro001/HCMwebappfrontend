// src/components/ConversationList.jsx
import React, { useState, useMemo, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";

export default function ConversationList() {
  const {
    employeeId,
    conversations,
    conversationsLoading,
    conversationsError,
    handleSelectConversation,
  } = useContext(ChatContextv2);

  // Add search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations
  const filteredConversations = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase();
    return conversations.filter((item) => {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      const empId = (item.employeeId || "").toLowerCase();
      return fullName.includes(lowerSearch) || empId.includes(lowerSearch);
    });
  }, [conversations, searchQuery]);

  // Loading / error states
  if (conversationsLoading) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Loading conversations...
        </p>
      </div>
    );
  }

  if (conversationsError) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <p className="text-sm text-red-600 dark:text-red-400">
          Error: {conversationsError}
        </p>
      </div>
    );
  }

  // Render each conversation
  const renderConversationItem = (item) => {
    const handlePress = () => {
      if (!employeeId) return;
      handleSelectConversation(item);
    };

    return (
      <button
        key={item.employeeId}
        onClick={handlePress}
        className="
          flex flex-row items-center w-full p-2 mb-3
          rounded-lg shadow-md
          text-left transition-all
          bg-gradient-to-r from-white via-gray-50 to-white
          dark:from-gray-700 dark:via-gray-700 dark:to-gray-700
          hover:shadow-lg hover:scale-[1.01]
          cursor-pointer
        "
      >
        {item.userAvatar ? (
          <img
            src={item.userAvatar}
            alt="avatar"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
        ) : (
          <div
            className="
              w-12 h-12 rounded-full mr-3
              flex items-center justify-center
              bg-blue-600
            "
          >
            <span className="text-white text-sm font-bold">
              {item.employeeId?.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex-1">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {item.firstName} {item.lastName}
            </span>
            {/* Unread Badge */}
            {item.unreadCount > 0 && (
              <div className="bg-red-600 rounded-full px-2 py-1 ml-2">
                <span className="text-white text-xs font-bold">
                  {item.unreadCount}
                </span>
              </div>
            )}
          </div>
          <span className="block text-xs text-gray-500 dark:text-gray-300 mt-1">
            {item.employeeId}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div
      className="
        flex flex-col
        w-full h-full
        bg-gray-100 dark:bg-gray-800
        transition-colors p-3
        overflow-y-auto
      "
    >
      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Name or Employee ID"
        className="
          mb-4
          p-2
          rounded
          w-full
          text-sm
          text-gray-800 dark:text-gray-200
          bg-white dark:bg-gray-700
          placeholder-gray-400 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          border border-gray-300 dark:border-gray-600
          transition-colors
        "
      />

      {filteredConversations.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No matching conversations found
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {filteredConversations.map(renderConversationItem)}
        </div>
      )}
    </div>
  );
}
