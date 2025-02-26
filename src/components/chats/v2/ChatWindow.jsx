import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaVideo, FaPaperclip, FaCommentDots } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { useCall } from '../../../contexts/CallContext';

export default function ChatList({
  messages,
  currentUser,
  selectedUser,
  sendMessage,
  message,
  setMessage,
  sendFile,
}) {
  const chatEndRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState({});
  const { initiateCall } = useCall();

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ];

      if (file.size > maxSize) {
        toast.error('File size exceeds 10MB limit.');
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        toast.error('Unsupported file type.');
        return;
      }
      sendFileWithLoading(file);
      e.target.value = null;
    }
  };

  const sendFileWithLoading = async (file) => {
    const uniqueId = `${file.name}-${Date.now()}`;
    setUploadingFiles((prev) => ({ ...prev, [uniqueId]: true }));
    try {
      await sendFile(file);
      setUploadingFiles((prev) => {
        const updated = { ...prev };
        delete updated[uniqueId];
        return updated;
      });
      toast.success('File sent successfully.');
    } catch (error) {
      console.error('Error sending file:', error);
      setUploadingFiles((prev) => {
        const updated = { ...prev };
        delete updated[uniqueId];
        return updated;
      });
      toast.error('Failed to send file.');
    }
  };

  const handleVideoCall = () => {
    if (!selectedUser) {
      toast.error('Select a user to call.');
      return;
    }
    initiateCall({ callType: 'video', participants: [selectedUser.employee_Id
    ] });
    console.log("Erfgdgdfgdfgd",selectedUser.employee_Id);
  };

  const handleVoiceCall = () => {
    if (!selectedUser) {
      toast.error('Select a user to call.');
      return;
    }
   
   
    
    initiateCall({ callType: 'voice', participants: [selectedUser.employee_Id
    ] });
    console.log("Erfgdgdfgdfgd",selectedUser.employee_Id);
    
  };

  const handleSend = () => {
    if (!message.trim()) return;
    // Wrap in a fake event to satisfy the handler signature
    sendMessage({ preventDefault: () => {} });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderFileMessage = (msg) => {
    if (msg.fileType?.startsWith('image/') && msg.fileUrl) {
      return (
        <img
          src={msg.fileUrl}
          alt={msg.fileName}
          className="max-w-xs rounded-md"
        />
      );
    }
    return (
      <div className="flex items-center">
        <a
          href={msg.fileUrl}
          download={msg.fileName}
          className="text-blue-500 underline break-all"
        >
          {msg.fileName}
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg w-full" style={{ height: '80vh' }}>
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0">
          {selectedUser 
            ? `${selectedUser.first_Name} ${selectedUser.last_Name} (${selectedUser.employee_Id})`
            : 'Select a User'
          }
        </h2>
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
      </header>

      <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => {
            const isOwn = msg.sender === currentUser;
            return (
              <div
                key={index}
                className={`max-w-xs p-3 rounded-lg break-words shadow-sm ${
                  isOwn
                    ? 'bg-gray-100 dark:bg-gray-700 self-end'
                    : 'bg-gray-200 dark:bg-gray-800 self-start'
                }`}
              >
                {msg.type === 'file'
                  ? renderFileMessage(msg)
                  : <p className="text-gray-900 dark:text-gray-100">{msg.message}</p>}
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {msg.time}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-400">
            <FaCommentDots className="w-20 h-20 mb-4" />
            <p className="text-lg font-semibold">No messages yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Say "Hello" to start the conversation.
            </p>
          </div>
        )}

        {Object.keys(uploadingFiles).map((fileId) => (
          <div key={fileId} className="mb-3 w-full clear-both">
            <div className="text-xs text-gray-500">
              {currentUser} &middot; Sending...
            </div>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <PuffLoader size={40} color="#1e90ff" />
              <span className="ml-2 text-blue-500">Uploading...</span>
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      <footer className="p-4 border-t bg-gray-200 dark:bg-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-grow p-2 rounded-full bg-white dark:bg-gray-800 outline-none text-gray-900 dark:text-gray-100 shadow-md"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Message input"
          />
          <label className="cursor-pointer text-gray-500 dark:text-gray-400">
            <FaPaperclip size={20} />
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
          </label>
          <button
            onClick={handleSend}
            className="bg-purple-600 hover:bg-purple-700 focus:outline-none text-white p-2 rounded-full shadow-md"
            aria-label="Send message"
          >
            <IoSend size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
