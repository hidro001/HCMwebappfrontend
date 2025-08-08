

import React, { useState, useMemo, useContext, useCallback, useEffect } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

export default function ConversationList({ searchTerm }) {
  const {
    conversations,
    userStatus,
    loadingConversations,
    conversationsError,
    selectUser,
    employeeId,
  } = useContext(ChatContextv2);
  const [members, setmembers] = useState([]);
  const [active, setactive] = useState("chats");


  console.log("💬 ConversationList loaded:", conversations.length, "conversations");  




  const myId = localStorage.getItem("employeeId");
  useEffect(() => {
    const users = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/chat/member`
      );
      setmembers(response.data.data);
      const me = response.data.data.find((m) => m.employee_Id === myId);
      if (me) {
        setmyProfile(me.user_Avatar);
      }
    };

    users();
  }, []);

  const handleOnlineMemberClick = (member) => {
    const userData = {
      employeeId: member.employee_Id,
      firstName: member.first_Name,
      lastName: member.last_Name,
      userAvatar: member.user_Avatar,
    };
    selectUser(userData);
  };

  const filteredConversations = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    const filtered = !q
      ? conversations
      : conversations.filter(({ firstName, lastName, employeeId: id }) => {
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        return fullName.includes(q) || id.toLowerCase().includes(q);
      });

    return filtered.sort((a, b) => {
      const aOnline = userStatus[a.employeeId] ? 1 : 0;
      const bOnline = userStatus[b.employeeId] ? 1 : 0;
      return bOnline - aOnline;
    });
  }, [conversations, userStatus, searchTerm]);

  const renderItem = (item) => {
    const {
      employeeId: id,
      firstName,
      lastName,
      userAvatar,
      unreadCount = 0,
      lastMessage,
      lastMessageTimestamp,
      last_seen,
    } = item;

    const isOnline = userStatus[id];
    const text = lastMessage?.message || "No messages yet";
    const time = lastMessage?.timestamp || lastMessageTimestamp
      ? new Date(lastMessage?.timestamp || lastMessageTimestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";

    return (
      <button
        key={id}
        onClick={() => selectUser(item)}
        aria-label={`Conversation with ${firstName} ${lastName}`}
        className="group flex items-center w-full p-2 mb-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
      >
        <div className="relative mr-3 w-10 h-10 flex-shrink-0">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={`${firstName} ${lastName}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {firstName?.[0]}
              {lastName?.[0]}
            </div>
          )}

          {isOnline && (
            <span
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm"
              title="Online"
            />
          )}
        </div>

        <div className="flex-1 overflow-hidden min-w-0">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {firstName} {lastName}
            </span>
            {time && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                {time}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate mr-2">
              {text}
            </span>

            <div className="flex items-center gap-1 flex-shrink-0">
              {unreadCount > 0 ? (
                <div className="bg-blue-500 dark:bg-blue-600 rounded-full px-1.5 py-0.5 shadow-md min-w-[18px] flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                </div>
              ) : lastMessage?.sender === employeeId ? (
                lastMessage?.isRead ? (
                  <span
                    className="text-blue-500 dark:text-blue-400 text-xs"
                    title="Read"
                  >
                    ✓✓
                  </span>
                ) : (
                  <span
                    className="text-gray-400 dark:text-gray-500 text-xs"
                    title="Sent"
                  >
                    ✓
                  </span>
                )
              ) : null}
            </div>
          </div>
        </div>
      </button>
    );
  };

  if (loadingConversations) {
    return (
      <div className="flex flex-col items-center justify-center h-48 w-full">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400 mb-3"></div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Loading conversations...
        </div>
      </div>
    );
  }

  if (conversationsError) {
    return (
      <div className="flex items-center justify-center h-48 w-full p-3">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-center max-w-md">
          <div className="text-red-600 dark:text-red-400 text-sm mb-2">
            ⚠️ Error Loading Conversations
          </div>
          <div className="text-red-700 dark:text-red-300 text-xs">
            {conversationsError}
          </div>
        </div>
      </div>
    );
  }

  if (filteredConversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 w-full p-4">
        <div className="text-gray-400 dark:text-gray-500 text-4xl mb-3">💬</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
          {searchTerm ? "No conversations found" : "No conversations yet"}
        </div>
        <div className="text-gray-500 dark:text-gray-500 text-xs text-center">
          {searchTerm
            ? `Try searching for a different name or employee ID`
            : "Start chatting with your colleagues to see conversations here"}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`status mb-3`}>
        <div className="inner-status">
          <div className="top flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Online Now
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {members.filter((member) => member.isOnline).length} online
            </span>
          </div>

          <div className="profile-status flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
            {members
              .filter((member) => member.isOnline)
              .slice(0, 7)
              .map((member, index) => (
                <div
                  key={index}
                  className="relative inline-block text-center flex-shrink-0 cursor-pointer group"
                  onClick={() => handleOnlineMemberClick(member)}
                >
                  <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-200">
                    <img
                      src={member.user_Avatar}
                      alt={member.first_Name}
                      className="rounded-full w-8 h-8 border border-gray-200 dark:border-gray-600 object-cover shadow-sm group-hover:shadow-md group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-200"
                    />
                    <span
                      className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900"
                      title="Online"
                    ></span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate w-10 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {member.first_Name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-full">
        <div
          role="list"
          className="overflow-y-auto px-1 space-y-2 h-full custom-scrollbar [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300"
        >
          {filteredConversations.map(renderItem)}
        </div>
      </div>
    </>
  );
}