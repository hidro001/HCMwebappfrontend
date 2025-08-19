import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { FaVideo, FaRegSmile, FaFilePdf, FaImage, FaSpinner } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMdSend, IoIosAttach } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FiMoreVertical, FiFile, FiDownload } from "react-icons/fi";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { useCall } from "../../../contexts/CallContext";
import fallbackAvatar from "../../../assets/logo/logo-eye.webp";
import EmojiPicker from "emoji-picker-react";
import GroupSettingsModal from "./GroupSettingsModal";

function ChatWindow() {
  const {
    activeConversation,
    employeeId,
    messages,
    messagesLoading,
    message,
    setMessage,
    sendMessageHandler,
    sendFileHandler,
    requestFileURL,
    userStatus,
  } = useContext(ChatContextv2);

  const { initiateCall } = useCall();
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filesRemaining, setFilesRemaining] = useState(0);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [resolvedFileURLs, setResolvedFileURLs] = useState({});
  const isOnline = activeConversation?.employeeId ? userStatus[activeConversation.employeeId] : false;

  useEffect(() => {
    const unresolved = messages.filter((m) => m.fileUrl && !resolvedFileURLs[m.fileUrl]).map((m) => m.fileUrl);
    unresolved.forEach(async (key) => {
      try {
        const url = await requestFileURL(key);
        setResolvedFileURLs((prev) => ({ ...prev, [key]: url }));
      } catch { }
    });
  }, [messages, resolvedFileURLs, requestFileURL]);




  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!message || !message.trim()) return;
    sendMessageHandler();
  }, [message, sendMessageHandler]);

  const handleAttachment = (type) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = null;
    fileInputRef.current.accept = type === "image" ? "image/*" : type === "pdf" ? "application/pdf" : "*/*";
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (!files || !files.length) return;
    const fileArray = Array.from(files);
    setIsUploading(true);
    setFilesRemaining(fileArray.length);
    sendFileHandler(fileArray, (fileName, percent) => {
      if (percent >= 100 || percent < 0) {
        setFilesRemaining((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setIsUploading(false);
            return 0;
          }
          return next;
        });
      }
    });
  };

  const handleFileClick = async (fileUrl) => {
    try {
      const url = await requestFileURL(fileUrl);
      if (url) window.open(url, "_blank");
    } catch { }
  };

  const handleVideoCall = () => {
    if (!activeConversation?.employeeId) return;
    initiateCall({ callType: "video", participants: [activeConversation.employeeId] });
  };

  const handleVoiceCall = () => {
    if (!activeConversation?.employeeId) return;
    initiateCall({ callType: "voice", participants: [activeConversation.employeeId] });
  };

  const renderMessages = () => {
    if (messagesLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-3">
            <FaSpinner className="animate-spin text-blue-500 dark:text-blue-400 text-3xl" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading messages...</p>
          </div>
        </div>
      );
    }
    if (!messages || messages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <IoMdSend className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-gray-900 dark:text-gray-100 font-medium mb-2">No messages yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Start the conversation by sending a message below</p>
        </div>
      );
    }

    return messages.map((msg, index) => {
      console.log(`message ${msg.message}`)
      const isOwn = msg.sender === employeeId;
      const resolvedUrl = msg.fileUrl ? resolvedFileURLs[msg.fileUrl] : null;
      if (msg.fileUrl && resolvedUrl) {
        const isImage = msg.fileType?.startsWith("image");
        const isPDF = msg.fileType === "application/pdf";
        return (
          <div key={index} className={`flex w-full mb-4 ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`group relative max-w-xs sm:max-w-md cursor-pointer ${isOwn
                ? "bg-blue-500 dark:bg-blue-600 text-white rounded-2xl rounded-br-md"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md"
                } p-3 shadow-md hover:shadow-lg transition-all duration-200`}
              onClick={() => handleFileClick(msg.fileUrl)}
            >
              {isImage && (
                <div className="relative">
                  <img src={resolvedUrl} alt={msg.fileName} className="max-w-full max-h-64 rounded-xl object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <FiDownload className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              {isPDF && (
                <div className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <FaFilePdf className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{msg.fileName || "PDF Document"}</p>
                    <p className={`${isOwn ? "text-white/80" : "text-gray-500 dark:text-gray-400"} text-xs`}>Click to open</p>
                  </div>
                </div>
              )}
              {!isImage && !isPDF && (
                <div className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <FiFile className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{msg.fileName || "File"}</p>
                    <p className={`${isOwn ? "text-white/80" : "text-gray-500 dark:text-gray-400"} text-xs`}>Click to download</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <div></div>
                <p className={`${isOwn ? "text-white/80" : "text-gray-500 dark:text-gray-400"} text-xs`}>
                  {new Date(msg.time || msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div key={index} className={`flex w-full mb-4 ${isOwn ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-xs sm:max-w-md ${isOwn
              ? "bg-blue-500 dark:bg-blue-600 text-white rounded-2xl rounded-br-md"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md"
              } p-4 shadow-md`}
          >
            {!isOwn && activeConversation?.isGroup && msg.senderName && (
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">{msg.senderName}</p>
            )}
            <p className="text-sm leading-relaxed break-words">
              {msg.text || msg.message}
            </p>


            <div className="flex items-center justify-between mt-2">
              <div></div>
              <p className={`${isOwn ? "text-white/80" : "text-gray-500 dark:text-gray-400"} text-xs`}>
                {new Date(msg.time || msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  if (!activeConversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 text-center p-8">
        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <IoMdSend className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Select a conversation</h3>
        <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the sidebar to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-12 w-12 overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600">
              {activeConversation?.isGroup ? (
                activeConversation.groupIcon ? (
                  <img src={activeConversation.groupIcon} alt="Group" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-white flex items-center justify-center text-lg font-bold">
                    {activeConversation.groupName?.charAt(0).toUpperCase()}
                  </div>
                )
              ) : (
                <img src={activeConversation?.userAvatar || fallbackAvatar} alt="Avatar" className="h-full w-full object-cover" />
              )}
            </div>
            {!activeConversation?.isGroup && isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-900"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {activeConversation?.isGroup ? activeConversation.groupName : `${activeConversation?.firstName} ${activeConversation?.lastName}`}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {activeConversation?.isGroup
                ? `${activeConversation.members?.length || 0} members`
                : isOnline
                  ? "Online"
                  : activeConversation?.last_seen
                    ? `Last seen ${new Date(activeConversation.last_seen).toLocaleString()}`
                    : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {activeConversation?.isGroup && (
            <button
              onClick={() => setShowGroupSettings(true)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              title="Edit Group Settings"
            >
              ✏️
            </button>
          )}
          <button
            onClick={handleVideoCall}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <FaVideo className="w-4 h-4" />
          </button>
          <button
            onClick={handleVoiceCall}
            className="p-2 rounded-full bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
          >
            <IoCall className="w-4 h-4" />
          </button>
        </div>
      </header>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 dark:bg-gray-800 custom-scrollbar [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 transition-colors duration-300"
        style={{ minHeight: 0 }}
      >
        {renderMessages()}
        {isUploading && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full">
              <FaSpinner className="animate-spin w-4 h-4" />
              <span className="text-sm">Uploading files...</span>
            </div>
          </div>
        )}
      </div>

      {showGroupSettings && (
        <GroupSettingsModal
          group={activeConversation}
          onClose={() => setShowGroupSettings(false)}
        />
      )}

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <input ref={fileInputRef} type="file" multiple hidden onChange={handleFileChange} />
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => handleAttachment("image")}
              title="Add Image"
            >
              <MdAddPhotoAlternate className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => handleAttachment("pdf")}
              title="Attach File"
            >
              <IoIosAttach className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 border border-gray-200 dark:border-gray-600">
            {activeConversation?.userAvatar && (
              <img src={activeConversation.userAvatar || fallbackAvatar} alt="Your avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            )}
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={toggleEmojiPicker}
                title="Add Emoji"
              >
                <FaRegSmile className="w-4 h-4" />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-14 right-0 z-50 shadow-2xl rounded-lg overflow-hidden">
                  <EmojiPicker onEmojiClick={handleEmojiClick} theme="auto" width={300} height={400} />
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!message?.trim()}
            className="flex items-center gap-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-2xl font-medium transition-colors duration-200"
          >
            <span className="hidden sm:inline">Send</span>
            <IoMdSend className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
