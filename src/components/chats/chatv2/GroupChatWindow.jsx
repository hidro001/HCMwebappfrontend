// // src/components/chats/groups/GroupChatWindow.jsx
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import { IoArrowBack } from "react-icons/io5";
// import { FaSpinner, FaUserPlus, FaUserMinus, FaEdit, FaTrash } from "react-icons/fa";

// export default function GroupChatWindow() {
//   const scrollViewRef = useRef(null);

//   const {
//     employeeId,
//     selectedGroup,
//     groupMessages,
//     groupMessagesLoading,
//     leaveGroupChat,
//     sendGroupTextMessage,
//     fetchGroupMessages,
//     isGroupAdmin,
//     openGroupSettingsModal,
//   } = useContext(ChatContextv2);

//   const [text, setText] = useState("");

//   // Scroll to bottom on new messages
//   useEffect(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
//     }
//   }, [groupMessages]);

//   // On mount, fetch messages for this group
//   useEffect(() => {
//     if (selectedGroup?._id) {
//       fetchGroupMessages(selectedGroup._id);
//     }
//   }, [selectedGroup?._id, fetchGroupMessages]);

//   const handleSend = () => {
//     if (!text.trim()) return;
//     sendGroupTextMessage(selectedGroup._id, text);
//     setText("");
//   };

//   if (!selectedGroup) return null;

//   // Render
//   return (
//     <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 flex items-center justify-between">
//         <div className="flex items-center">
//           <button
//             className="p-1 mr-3 rounded-full text-white hover:bg-white/20"
//             onClick={leaveGroupChat}
//           >
//             <IoArrowBack size={24} />
//           </button>
//           <div>
//             <h2 className="text-white text-lg font-semibold">{selectedGroup.groupName}</h2>
//             <p className="text-white/70 text-xs">
//               {selectedGroup.members.length} members
//             </p>
//           </div>
//         </div>

//         {/* If you are admin, show a "group settings" button */}
//         {isGroupAdmin(selectedGroup) && (
//           <button
//             onClick={() => openGroupSettingsModal(selectedGroup)}
//             className="bg-white text-gray-700 py-1 px-2 text-xs rounded shadow hover:bg-gray-200 flex items-center gap-1"
//           >
//             <FaEdit />
//             Settings
//           </button>
//         )}
//       </div>

//       {/* Messages */}
//       <div ref={scrollViewRef} className="flex-1 overflow-y-auto p-3">
//         {groupMessagesLoading ? (
//           <div className="flex items-center justify-center h-full">
//             <FaSpinner className="animate-spin text-3xl text-purple-600" />
//           </div>
//         ) : groupMessages && groupMessages.length > 0 ? (
//           groupMessages.map((msg, index) => {
//             const isMine = msg.sender === employeeId;
//             return (
//               <div
//                 key={index}
//                 className={`mb-2 flex ${
//                   isMine ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`p-2 rounded-lg shadow ${
//                     isMine ? "bg-blue-200" : "bg-gray-200"
//                   } max-w-[70%]`}
//                 >
//                   {/* Show sender if not me */}
//                   {!isMine && (
//                     <p className="text-xs font-bold mb-1">{msg.sender}</p>
//                   )}
//                   <p>{msg.text}</p>
//                   <p className="text-[10px] text-gray-600 text-right mt-1">
//                     {new Date(msg.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center text-gray-500 mt-4">
//             No messages yet. Be the first to say hello!
//           </div>
//         )}
//       </div>

//       {/* Input */}
//       <div className="border-t p-2 flex items-center">
//         <input
//           className="flex-1 border rounded px-3 py-2 mr-2"
//           placeholder="Type a message"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { IoArrowBack } from "react-icons/io5";
import { FaSpinner, FaEdit } from "react-icons/fa";

export default function GroupChatWindow() {
  const scrollViewRef = useRef(null);

  const {
    employeeId,
    selectedGroup,
    groupMessages,
    groupMessagesLoading,
    leaveGroupChat,
    sendGroupTextMessage,
    fetchGroupMessages,
    isGroupAdmin,
    openGroupSettingsModal,
  } = useContext(ChatContextv2);

  const [text, setText] = useState("");

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [groupMessages]);

  // On mount, fetch messages for this group
  useEffect(() => {
    if (selectedGroup?._id) {
      fetchGroupMessages(selectedGroup._id);
    }
  }, [selectedGroup?._id, fetchGroupMessages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendGroupTextMessage(selectedGroup._id, text);
    setText("");
  };

  if (!selectedGroup) return null;

  // Helper to pick bubble background color
  const getBubbleColor = (isMine) =>
    isMine
      ? "bg-violet-200 dark:bg-violet-600" // Your messages
      : "bg-cyan-200 dark:bg-cyan-600";    // Others' messages

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div
        className="
          bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600
          dark:bg-gradient-to-r dark:from-indigo-800 dark:via-purple-800 dark:to-pink-700
          px-3 py-2 flex items-center justify-between
          transition-colors
        "
      >
        <div className="flex items-center">
          <button
            className="p-1 mr-3 rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={leaveGroupChat}
          >
            <IoArrowBack size={24} />
          </button>
          <div>
            <h2 className="text-white text-lg font-semibold">
              {selectedGroup.groupName}
            </h2>
            <p className="text-white/70 text-xs">
              {selectedGroup.members.length} members
            </p>
          </div>
        </div>

        {/* If you are admin, show a "group settings" button */}
        {isGroupAdmin(selectedGroup) && (
          <button
            onClick={() => openGroupSettingsModal(selectedGroup)}
            className="
              bg-white text-gray-700 py-1 px-2 text-xs rounded shadow 
              hover:bg-gray-200 dark:hover:bg-gray-600
              flex items-center gap-1 transition-colors
            "
          >
            <FaEdit />
            Settings
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollViewRef}
        className="
          flex-1 overflow-y-auto p-3
          bg-gradient-to-br from-gray-100 to-white
          dark:from-gray-800 dark:to-gray-900
          transition-all
        "
      >
        {groupMessagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <FaSpinner className="animate-spin text-3xl text-indigo-600" />
          </div>
        ) : groupMessages && groupMessages.length > 0 ? (
          groupMessages.map((msg, index) => {
            const isMine = msg.sender === employeeId;
            const bubbleColor = getBubbleColor(isMine);

            return (
              <div
                key={index}
                className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className={`p-2 rounded-lg shadow ${bubbleColor} max-w-[70%]`}>
                  {/* Show sender if not me */}
                  {!isMine && (
                    <p className="text-xs font-bold mb-1 text-gray-800 dark:text-gray-100">
                    {msg.senderName} ({msg.sender})
                  </p>
                
                  )}
                  <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-200 text-right mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No messages yet. Be the first to say hello!
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="
          border-t border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800
          p-2 flex items-center
          transition-colors
        "
      >
        <input
          className="
            flex-1 border rounded px-3 py-2 mr-2
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-colors
          "
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="
            bg-pink-500 dark:bg-pink-700
            text-white py-2 px-4 rounded
            hover:bg-pink-600 dark:hover:bg-pink-800
            transition-colors
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
