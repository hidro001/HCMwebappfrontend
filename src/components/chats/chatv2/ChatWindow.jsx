// src/components/ChatWindow.jsx
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import {
  IoArrowBack,
  IoSend,
  IoAttach,
  IoCloseCircle,
  IoPersonCircle,
} from "react-icons/io5";
import { FaCommentAlt, FaSpinner } from "react-icons/fa";
import { MdImage, MdPictureAsPdf } from "react-icons/md";
import { toast } from "react-toastify";

export default function ChatWindow() {
  const scrollViewRef = useRef(null);
  const fileInputRef = useRef(null);

  // For local file uploading animations
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // Grab context
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
  } = useContext(ChatContextv2);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]);

  // Actually send the text message
  const handleSend = useCallback(() => {
    if (!message.trim()) return;
    sendMessageHandler();
  }, [message, sendMessageHandler]);

  // For file attachments, we show a local "uploading" bubble
  const sendFileWithLoading = async (file) => {
    const uniqueId = `${file.name}-${Date.now()}`;
    setUploadingFiles((prev) => ({ ...prev, [uniqueId]: true }));
    try {
      await sendFileHandler(file);
      setUploadingFiles((prev) => {
        const updated = { ...prev };
        delete updated[uniqueId];
        return updated;
      });
      toast.success("File sent successfully.");
    } catch (error) {
      console.error("Error sending file:", error);
      setUploadingFiles((prev) => {
        const updated = { ...prev };
        delete updated[uniqueId];
        return updated;
      });
      toast.error("Failed to send file.");
    }
  };

  // Called when <input type="file"> changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    toast.success("Image picked successfully!");
    sendFileWithLoading(file);
    e.target.value = null; // reset so user can pick same file again
  };

  // If you pick an image from the modal
  const pickImage = () => {
    setModalVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // For PDF picking (stubbed out)
  const pickPDF = () => {
    setModalVisible(false);
    toast.info("PDF picker pressed (implement as needed)");
    // Could trigger a second hidden input with accept="application/pdf"
  };

  // Helper: decide bubble color
  const getBubbleColor = (isOwn) =>
    isOwn ? "bg-violet-200 dark:bg-violet-600" : "bg-cyan-200 dark:bg-cyan-600";

  // Render single message bubble
  const renderMessageBubble = useCallback(
    (msg, index) => {
      const isOwn = msg.sender === employeeId;
      const bubbleColor = getBubbleColor(isOwn);

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
              ${
                isOwn
                  ? "animate-fadeInRight"
                  : "animate-fadeInLeft"
              }
            `}
          >
            {msg.type === "file" ? (
              <>
                <div className="font-semibold mb-1 text-gray-900 dark:text-gray-100 break-words">
                  {msg.fileName || "File"}
                </div>
                {msg.fileType?.startsWith("image/") && msg.fileUrl && (
                  <img
                    src={msg.fileUrl}
                    alt={msg.fileName}
                    className="w-36 h-36 rounded-md mt-1 object-cover"
                  />
                )}
              </>
            ) : (
              <div className="whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100 text-base">
                {msg.message}
              </div>
            )}
            {/* Timestamp */}
            {msg.time && (
              <div
                className={`text-xs mt-2 text-gray-800 dark:text-gray-200 ${
                  isOwn ? "text-right" : "text-left"
                }`}
              >
                {new Date(msg.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
        </div>
      );
    },
    [employeeId]
  );

  // Main chat content
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

  // For in-progress file uploads
  const uploadingIndicators = Object.keys(uploadingFiles).map((fileId) => (
    <div key={fileId} className="flex w-full px-2 my-1 justify-end">
      <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-violet-200 dark:bg-violet-600 animate-pulse transition-colors">
        <div className="text-gray-900 dark:text-gray-100 mb-1">
          {employeeId} · Sending...
        </div>
        <div className="flex flex-row items-center">
          <FaSpinner className="animate-spin text-blue-600" />
          <span className="ml-2 text-blue-600 dark:text-blue-200">
            Uploading...
          </span>
        </div>
      </div>
    </div>
  ));

  // Final render
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
        <div className="flex flex-row items-center">
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
            <p className="text-xs font-light text-white/80">
              Online Now
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div
        ref={scrollViewRef}
        className="
          flex-1 overflow-y-auto
          bg-gradient-to-br from-gray-100 to-white
          dark:from-gray-800 dark:to-gray-900
          transition-all py-2 px-2 md:px-4
        "
      >
        {content}
        {uploadingIndicators}
      </div>

      {/* Footer area (input + attach) */}
      <div
        className="
          flex flex-row items-center p-2 md:p-3 border-t
          border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800
          shadow-sm space-x-2
          transition-colors
        "
      >
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
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={() => setModalVisible(true)}
          className="
            w-10 h-10 rounded-full
            bg-pink-400 dark:bg-pink-600
            flex items-center justify-center
            shadow
            hover:scale-105
            transition-transform
          "
        >
          <IoAttach size={22} color="#fff" />
        </button>
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

      {/* Hidden file input for images */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Modal for attachment options */}
      {modalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={() => setModalVisible(false)}
        >
          <div
            className="
              bg-white dark:bg-gray-800
              w-11/12 md:w-1/2 xl:w-1/3
              rounded-lg shadow-md relative
              transition-colors
            "
            onClick={(e) => e.stopPropagation()} // stop click from closing modal
          >
            {/* Modal Header */}
            <div
              className="
                flex flex-row items-center
                bg-pink-600 dark:bg-pink-700
                rounded-t-lg p-4
                transition-colors
              "
            >
              <IoAttach size={22} color="#fff" />
              <span className="text-lg font-bold text-white ml-2">
                Attach File
              </span>
            </div>

            {/* Modal Body (Attachment Options) */}
            <div className="px-4 py-3 space-y-3">
              <button
                className="
                  flex flex-row items-center py-2 w-full text-left
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  rounded px-2 transition-colors
                "
                onClick={pickImage}
              >
                <MdImage className="mr-2 text-green-600" size={20} />
                <span className="text-gray-700 dark:text-gray-200 text-base">
                  Image
                </span>
              </button>
              <button
                className="
                  flex flex-row items-center py-2 w-full text-left
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  rounded px-2 transition-colors
                "
                onClick={pickPDF}
              >
                <MdPictureAsPdf className="mr-2 text-red-500" size={20} />
                <span className="text-gray-700 dark:text-gray-200 text-base">
                  PDF
                </span>
              </button>
              <button
                className="
                  flex flex-row items-center mt-4 pt-4 border-t
                  border-gray-200 dark:border-gray-600
                  w-full justify-center
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  rounded px-2 transition-colors
                "
                onClick={() => setModalVisible(false)}
              >
                <IoCloseCircle
                  className="mr-2 text-pink-600 dark:text-pink-400"
                  size={20}
                />
                <span className="text-base text-pink-600 dark:text-pink-400">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
