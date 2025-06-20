import React, { useState, useMemo, useContext, useCallback } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { formatDistanceToNow } from "date-fns";

export default function ConversationList({ searchTerm }) {
  const {
    conversations,
    userStatus,
    conversationsLoading,
    conversationsError,
    selectUser,
    employeeId,
  } = useContext(ChatContextv2);

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

  const renderItem = useCallback(
    (item) => {
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
      const time = lastMessageTimestamp
        ? new Date(lastMessageTimestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      return (
        <button
          key={id}
          onClick={() => selectUser(item)}
          aria-label={`Conversation with ${firstName} ${lastName}`}
          className="flex items-start w-full p-3 mb-2 mt-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="relative mr-3 w-12 h-12 flex-shrink-0">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${firstName} ${lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {firstName?.[0]}
                {lastName?.[0]}
              </div>
            )}
            {isOnline && (
              <span
                className="absolute bottom-0 right-0 w-3 h-3 bg-[#2B85FF] rounded-full ring-2 ring-white"
                title="Online"
              />
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-800 truncate">
                {firstName} {lastName}
              </span>
              <span className="text-xs text-gray-400 ml-2">{time}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 truncate">{text}</span>
              {unreadCount > 0 ? (
                <div className="ml-2 bg-blue-500 rounded-full px-2 py-0.5 shadow-md">
                  <span className="text-white text-xs font-semibold">
                    {unreadCount}
                  </span>
                </div>
              ) : lastMessage?.sender === employeeId ? (
                lastMessage?.isRead ? (
                  <span className="ml-2 text-blue-500" title="Read">✓✓</span>
                ) : (
                  <span className="ml-2 text-gray-400" title="Sent">✓</span>
                )
              ) : null}
            </div>

            {!isOnline && last_seen && (
              <p className="text-xs text-gray-400 mt-1">
                Last seen {formatDistanceToNow(new Date(last_seen), { addSuffix: true })}
              </p>
            )}
          </div>
        </button>
      );
    },
    [userStatus, selectUser]
  );

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-pulse text-gray-400">Loading conversations…</div>
      </div>
    );
  }

  if (conversationsError) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-red-50 p-6 rounded-lg text-red-600">
          {conversationsError}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {filteredConversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="p-6 text-gray-500 text-center">
            No conversations found
          </div>
        </div>
      ) : (
        <div role="list" className="overflow-y-auto px-2 space-y-1 h-full">
          {filteredConversations.map(renderItem)}
        </div>
      )}
    </div>
  );
}
