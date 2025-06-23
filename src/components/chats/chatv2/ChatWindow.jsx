import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import {
  FaVideo,
  FaRegSmile,
  FaFilePdf,
  FaImage,
  FaSpinner,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMdSend, IoIosAttach } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { useCall } from "../../../contexts/CallContext";
import fallbackAvatar from '../../../assets/logo/logo-eye.webp';
import EmojiPicker from "emoji-picker-react";


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
  } = useContext(ChatContextv2);

  const { initiateCall } = useCall();



  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filesRemaining, setFilesRemaining] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [resolvedFileURLs, setResolvedFileURLs] = useState({});



  useEffect(() => {
    const unresolved = messages
      .filter((m) => m.fileUrl && !resolvedFileURLs[m.fileUrl])
      .map((m) => m.fileUrl);

    unresolved.forEach(async (key) => {
      try {
        const url = await requestFileURL(key);
        setResolvedFileURLs((prev) => ({ ...prev, [key]: url }));
      } catch (err) {
        console.warn("Could not resolve file URL:", key, err);
      }
    });
  }, [messages, resolvedFileURLs, requestFileURL]);


  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(() => {
    console.log("Sending message:", message);
    if (!message || !message.trim()) return;
    sendMessageHandler();
  }, [message, sendMessageHandler]);


  const handleAttachment = (type) => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = null;
    fileInputRef.current.accept =
      type === "image" ? "image/*" : type === "pdf" ? "application/pdf" : "*/*";
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
    } catch (err) {
      console.error("Error opening file:", err);
    }
  };

  const handleVideoCall = () => {
    if (!activeConversation?.employeeId) return;
    initiateCall({
      callType: "video",
      participants: [activeConversation.employeeId],
    });
  };

  const handleVoiceCall = () => {
    if (!activeConversation?.employeeId) return;
    initiateCall({
      callType: "voice",
      participants: [activeConversation.employeeId],
    });
  };

  const renderMessages = () => {
    if (messagesLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <FaSpinner className="animate-spin text-blue-500 text-2xl" />
        </div>
      );
    }

    if (!messages || messages.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-10">
          No messages yet. Start the conversation!
        </div>
      );
    }

    return messages.map((msg, index) => {
      const isOwn = msg.sender === employeeId;
      const bubbleClass = isOwn
        ? "bg-blue-500 text-white justify-self-end"
        : "bg-gray-200 text-black justify-self-start";

      const resolvedUrl = msg.fileUrl ? resolvedFileURLs[msg.fileUrl] : null;

      // File Message
      if (msg.fileUrl && resolvedUrl) {
        const isImage = msg.fileType?.startsWith("image");
        const isPDF = msg.fileType === "application/pdf";

        return (
          <div key={index} className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-2 rounded-xl m-2 max-w-xs cursor-pointer ${bubbleClass}`}
              onClick={() => handleFileClick(msg.fileUrl)}
            >
              {isImage && (
                <img
                  src={resolvedUrl}
                  alt={msg.fileName}
                  className="max-w-full max-h-48 rounded-lg object-contain"
                />
              )}
              {isPDF && (
                <iframe
                  src={resolvedUrl}
                  className="w-full h-64 border rounded-lg"
                  title={msg.fileName}
                />
              )}
              {!isImage && !isPDF && (
                <p className="text-sm underline break-all">
                  {msg.fileName || "File"}
                </p>
              )}
              <p className="text-xs mt-2 text-right">
                {new Date(msg.time || msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      }
      return (
        <div
          key={index}
          className={`p-5 rounded-xl m-2 max-w-xs ${bubbleClass}`}
        >
          {!isOwn && activeConversation?.isGroup && msg.senderName && (
            <p className="text-xs font-semibold text-gray-500 mb-1">
              {msg.senderName}
            </p>
          )}
          <p className="text-sm">{msg.text || msg.message}</p>
          <p className="text-xs mt-1 text-right">
            {new Date(msg.time || msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    });
  };


  return (
    <div className="Chats-container border border-gray-400 rounded-br-xl rounded-tr-xl flex flex-col h-full">
      <header className="flex justify-between p-3 border-b-2 border-gray-400 dark:bg-black bg-gray-100">
        <div className="flex gap-3 items-center">
          <div className="bg-gray-300 rounded-full h-14 w-14 overflow-hidden">
            {activeConversation?.isGroup ? (
              activeConversation.groupIcon ? (
                <img
                  src={activeConversation.groupIcon}
                  alt="group"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
                  {activeConversation.groupName?.charAt(0)}
                </div>
              )
            ) : (
              activeConversation?.userAvatar && (
                <img
                  src={activeConversation.userAvatar || fallbackAvatar}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              )
            )}
          </div>
          <div>
            <p className="font-semibold">
              {activeConversation?.isGroup
                ? activeConversation.groupName
                : `${activeConversation?.firstName} ${activeConversation?.lastName}`}
            </p>
            <span className="text-xs text-gray-500">
              {activeConversation?.isGroup
                ? `${activeConversation.members?.length || 0} members`
                : activeConversation?.isOnline
                  ? "Online"
                  : activeConversation?.last_seen
                    ? `Last seen ${new Date(activeConversation.last_seen).toLocaleString()}`
                    : "Offline"}
            </span>

          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleVideoCall} className="border border-gray-400 rounded-full p-2 h-10 w-10 flex justify-center items-center">
            <FaVideo />
          </button>
          <button onClick={handleVoiceCall} className="border rounded-full p-2 bg-[#2B85FF] text-white h-10 w-10 flex justify-center items-center">
            <IoCall />
          </button>
        </div>
      </header>


      <div ref={scrollRef}
        className="chats-section flex-1 overflow-y-scroll px-4 py-2 dark:bg-black bg-white"
        style={{ minHeight: 0 }}> 
        {renderMessages()}
        {isUploading && (
          <div className="text-sm text-center text-gray-500 mt-4">
            Uploading files...
          </div>
        )}
      </div>


      <div className="message-writing flex gap-4 p-3 items-center border-t-2 border-gray-400 dark:bg-black bg-gray-100">
        <input ref={fileInputRef} type="file" multiple hidden onChange={handleFileChange} />

        <button
          className="h-10 w-10 bg-gray-300 rounded-full flex justify-center items-center"
          onClick={() => handleAttachment("image")}
        >
          <MdAddPhotoAlternate className="h-6 w-6 dark:text-black" />
        </button>
        <button
          className="h-10 w-10 bg-gray-300 rounded-full flex justify-center items-center"
          onClick={() => handleAttachment("pdf")}
        >
          <IoIosAttach className="h-6 w-6 dark:text-black" />
        </button>

        <div className="input-message flex gap-2 items-center dark:bg-gray-200 bg-white rounded-xl border border-gray-400 p-2 flex-1">

          {activeConversation?.userAvatar ? (
            <img src={activeConversation.userAvatar || fallbackAvatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
          ) : null}

          <input
            type="text"
            placeholder="Write the message..."
            className="dark:bg-gray-200 bg-white text-black outline-none resize-none w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <div className="relative">
            <button
              type="button"
              className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center"
              onClick={toggleEmojiPicker}
              title="Add Emoji"
            >
              <FaRegSmile className="h-5 w-5 text-gray-600" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
              </div>
            )}
          </div>

        </div>

        <button
          onClick={handleSend}
          className="flex gap-2 items-center bg-[#2B85FF] text-white px-4 py-2 rounded-xl"
        >
          <span>Send</span>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
