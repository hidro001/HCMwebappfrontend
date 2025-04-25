import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { useCall } from "../../../contexts/CallContext";
import {
  IoArrowBack,
  IoSend,
  IoAttach,
  IoPersonCircle,
} from "react-icons/io5";
import {
  FaCommentAlt,
  FaSpinner,
  FaVideo,
  FaPhone,
  FaFilePdf,
  FaImage,
} from "react-icons/fa";

export default function ChatWindow() {
  const scrollViewRef = useRef(null);
  const fileInputRef = useRef(null);

  // ----------------------------------------------------------------
  // Destructure from context
  // ----------------------------------------------------------------
  const {
    employeeId,
    activeConversation,
    clearActiveConversation,
    messages,
    messagesLoading,
    message,
    setMessage,
    sendMessageHandler,
    sendFileHandler,
    requestFileURL, // <== We'll call this when user clicks on a file
  } = useContext(ChatContextv2);

  const { initiateCall } = useCall();

  // ----------------------------------------------------------------
  // Local states
  // ----------------------------------------------------------------
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [attachmentType, setAttachmentType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [filesRemaining, setFilesRemaining] = useState(0);

  // ----------------------------------------------------------------
  // Calls
  // ----------------------------------------------------------------
  const handleVideoCall = () => {
    if (!activeConversation?.employeeId) {
      console.error("No user or conversation selected for video call.");
      return;
    }
    initiateCall({
      callType: "video",
      participants: [activeConversation.employeeId],
    });
  };

  const handleVoiceCall = () => {
    if (!activeConversation?.employeeId) {
      console.error("No user or conversation selected for voice call.");
      return;
    }
    initiateCall({
      callType: "voice",
      participants: [activeConversation.employeeId],
    });
  };

  // ----------------------------------------------------------------
  // Auto-scroll
  // ----------------------------------------------------------------
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]);

  // ----------------------------------------------------------------
  // Send text
  // ----------------------------------------------------------------
  const handleSend = useCallback(() => {
    if (!message.trim()) return;
    sendMessageHandler();
  }, [message, sendMessageHandler]);

  // ----------------------------------------------------------------
  // Attach flow
  // ----------------------------------------------------------------
  const handleAttachClick = () => {
    setShowAttachmentMenu((prev) => !prev);
  };

  const handleAttachmentTypeSelect = (type) => {
    setAttachmentType(type);
    setShowAttachmentMenu(false);

    if (!fileInputRef.current) return;
    fileInputRef.current.value = null;

    if (type === "image") {
      fileInputRef.current.accept = "image/*";
    } else if (type === "pdf") {
      fileInputRef.current.accept = "application/pdf";
    } else {
      fileInputRef.current.accept = "*/*";
    }
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (!files || !files.length) return;
    const fileArray = Array.from(files);

    setIsUploading(true);
    setFilesRemaining(fileArray.length);

    // pass a progress callback
    sendFileHandler(fileArray, (fileName, percent) => {
      if (percent >= 100 || percent < 0) {
        setFilesRemaining((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            // Done
            setIsUploading(false);
            return 0;
          }
          return next;
        });
      }
    });

    setAttachmentType("");
  };

  // ----------------------------------------------------------------
  // Clicking on a file bubble => request fresh URL => open new tab
  // ----------------------------------------------------------------
  const handleFileClick = useCallback(
    (fileName) => {
      if (!fileName) return;
      requestFileURL(fileName)
        .then((url) => {
          if (url) {
            window.open(url, "_blank");
          }
        })
        .catch((err) => {
          console.error("Could not get file URL:", err);
        });
    },
    [requestFileURL]
  );

  // ----------------------------------------------------------------
  // Render message bubbles
  // ----------------------------------------------------------------
  const getBubbleColor = (isOwn) =>
    isOwn ? "bg-violet-200 dark:bg-violet-600" : "bg-cyan-200 dark:bg-cyan-600";

  const renderMessageBubble = useCallback(
    (msg, index) => {
      const isOwn = msg.sender === employeeId;
      const bubbleColor = getBubbleColor(isOwn);

      if (msg.fileUrl) {
        const fileType = msg.fileType || "";
        const isImage = fileType.startsWith("image/");
        const isPDF = fileType === "application/pdf";

        return (
          <div
            key={index}
            className={`flex w-full px-2 my-1 transition-all ${
              isOwn ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                relative max-w-[70%] p-3 rounded-xl shadow-lg
                ${bubbleColor} transition-colors
                ${isOwn ? "animate-fadeInRight" : "animate-fadeInLeft"}
              `}
            >
              {/* Instead of <a href=...>, we do onClick => handleFileClick(fileName) */}
              {isImage && (
                <div
                  className="flex flex-col items-start cursor-pointer"
                  onClick={() => handleFileClick(msg.fileUrl)}
                >
                  <FaImage className="text-2xl mb-1" />
                  <span className="text-sm underline break-all">
                    {msg.fileName || "Image"}
                  </span>
                </div>
              )}

              {isPDF && (
                <div
                  className="flex flex-col items-start cursor-pointer"
                  onClick={() => handleFileClick(msg.fileUrl)}
                >
                  <FaFilePdf className="text-4xl mb-1" />
                  <span className="text-sm underline break-all">
                    {msg.fileName || "PDF File"}
                  </span>
                </div>
              )}

              {!isImage && !isPDF && (
                <div
                  className="flex flex-col items-start cursor-pointer"
                  onClick={() => handleFileClick(msg.fileUrl)}
                >
                  <span className="underline break-all">
                    {msg.fileName || "File"}
                  </span>
                </div>
              )}

              <div
                className={`text-xs mt-2 text-gray-800 dark:text-gray-200 ${
                  isOwn ? "text-right" : "text-left"
                }`}
              >
                {msg.time
                  ? new Date(msg.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
            </div>
          </div>
        );
      }

      // Normal text bubble
      return (
        <div
          key={index}
          className={`flex w-full px-2 my-1 transition-all ${
            isOwn ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`
              relative max-w-[70%] p-3 rounded-xl shadow-lg
              ${bubbleColor} transition-colors
              ${isOwn ? "animate-fadeInRight" : "animate-fadeInLeft"}
            `}
          >
            <div className="whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100 text-base">
              {msg.message}
            </div>
            <div
              className={`text-xs mt-2 text-gray-800 dark:text-gray-200 ${
                isOwn ? "text-right" : "text-left"
              }`}
            >
              {msg.time
                ? new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </div>
          </div>
        </div>
      );
    },
    [employeeId, handleFileClick]
  );

  // ----------------------------------------------------------------
  // Main scrollable content
  // ----------------------------------------------------------------
  let content;
  if (messagesLoading) {
    content = (
      <div className="flex flex-col items-center justify-center py-10">
        <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-2" />
        <p className="text-lg text-indigo-600">Loading previous messages...</p>
      </div>
    );
  } else if (!messages || messages.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center rounded-xl bg-gray-50 dark:bg-gray-800 p-6 shadow-md transition-transform hover:scale-[1.01]">
          <FaCommentAlt className="text-6xl text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            No messages yet
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Say "Hello" to start the conversation.
          </p>
        </div>
      </div>
    );
  } else {
    content = messages.map((msg, index) => renderMessageBubble(msg, index));
  }

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------
  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900 transition-colors">
      {/* Header Bar */}
      <div
        className="
          bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600
          dark:bg-gradient-to-r dark:from-indigo-800 dark:via-purple-800 dark:to-pink-700
          shadow-md flex flex-row items-center px-3 py-3
          transition-colors
        "
      >
        {/* Back button */}
        <button
          className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors"
          onClick={clearActiveConversation}
        >
          <IoArrowBack size={24} color="#fff" />
        </button>

        {/* Active conversation info */}
        <div className="flex flex-row items-center flex-1">
          {activeConversation?.userAvatar ? (
            <img
              src={activeConversation.userAvatar}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2 object-cover border-2 border-white/40"
            />
          ) : (
            <IoPersonCircle size={36} color="#fff" className="mr-2" />
          )}
          <div className="text-white">
            <p className="text-base font-bold">
              {activeConversation
                ? `${activeConversation.firstName} ${activeConversation.lastName}`
                : "Chat"}
            </p>
          </div>
        </div>

        {/* Call Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleVideoCall}
            className="focus:outline-none w-10 h-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition-colors"
            title="Start Video Call"
          >
            <FaVideo size={20} />
          </button>
          <button
            onClick={handleVoiceCall}
            className="focus:outline-none w-10 h-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition-colors"
            title="Start Voice Call"
          >
            <FaPhone size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div
        ref={scrollViewRef}
        className="
          flex-1 overflow-y-auto
          bg-gradient-to-br from-gray-100 to-white
          dark:from-gray-800 dark:to-gray-900
          py-2 px-2 md:px-4
             [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
        "
      >
        {content}

        {/* If we have at least one file still uploading, show a spinner */}
        {isUploading && filesRemaining > 0 && (
          <div className="flex items-center justify-center py-4 text-indigo-600">
            <FaSpinner className="animate-spin text-2xl mr-2" />
            <span>Uploading files... Please wait.</span>
          </div>
        )}
      </div>

      {/* Footer area (input / attach / send) */}
      <div
        className="
          flex flex-row items-center p-2 md:p-3 border-t
          border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800
          shadow-sm space-x-2
          transition-colors relative
        "
      >
        {/* Hidden file input (multiple files allowed) */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Attach Button + small dropdown menu */}
        <div className="relative">
          <button
            className="
              p-2 rounded-full hover:bg-gray-200
              dark:hover:bg-gray-700 transition-colors
            "
            onClick={handleAttachClick}
            title="Attach files"
          >
            <IoAttach size={24} />
          </button>

          {showAttachmentMenu && (
            <div
              className="
                absolute bottom-[3rem] left-0
                flex flex-col bg-white dark:bg-gray-700
                rounded-md shadow-md py-2
                z-10
              "
            >
              <button
                className="
                  flex items-center gap-2 px-3 py-2
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  transition-colors
                "
                onClick={() => handleAttachmentTypeSelect("image")}
              >
                <FaImage />
                Image
              </button>
              <button
                className="
                  flex items-center gap-2 px-3 py-2
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  transition-colors
                "
                onClick={() => handleAttachmentTypeSelect("pdf")}
              >
                <FaFilePdf />
                PDF
              </button>
            </div>
          )}
        </div>

        {/* Text input */}
        <input
          className="
            flex-1
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            rounded-full px-3 py-2
            text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-colors
          "
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="
            w-10 h-10
            rounded-full
            bg-pink-600 dark:bg-pink-800
            flex items-center justify-center
            shadow
            hover:scale-105
            transition-transform
          "
        >
          <IoSend size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
}
