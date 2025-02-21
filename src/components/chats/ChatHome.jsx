import React, { useContext } from 'react';
import { ChatContext } from '../../contexts/ChatContext';
import ChatMember from './ChatMember';
import ChatList from './ChatList';
import { FaCommentDots } from 'react-icons/fa';

export default function ChatHome() {
  const {
    employeeId,
    employees,
    selectedUser,
    unreadCounts,
    selectUser,
    messages,
    sendMessageHandler,
    message,
    setMessage,
    sendFileHandler,
  } = useContext(ChatContext);


  return (
    <div
      className="flex w-full bg-gray-100 dark:bg-gray-900 h-screen"
      style={{ height: '70vh' }}
    >
      {/* Left side: Team Member List */}
      <ChatMember
        employees={employees}
        currentUser={employeeId}
        onSelectUser={selectUser}
        unreadCounts={unreadCounts}
      />
      {/* Right side: Chat */}
      {selectedUser ? (
        <ChatList
          messages={messages}
          currentUser={employeeId}
          selectedUser={selectedUser}
          sendMessage={sendMessageHandler}
          message={message}
          setMessage={setMessage}
          sendFile={sendFileHandler}
        />
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-gray-600 dark:text-gray-400">
          <FaCommentDots className="w-20 h-20 mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-lg font-semibold">No Chats Selected</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Looks quiet here... Select a contact and start chatting!
          </p>
        </div>
      )}
    </div>
  );
}
