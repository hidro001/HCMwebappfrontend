
// import React, { useState, useMemo, useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";

// export default function ConversationList() {
//   const {
//     employeeId,
//     conversations,
//     conversationsLoading,
//     conversationsError,
//     handleSelectConversation,
//   } = useContext(ChatContextv2);

//   // Add search state
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter conversations
//   const filteredConversations = useMemo(() => {
//     const lowerSearch = searchQuery.toLowerCase();
//     return conversations.filter((item) => {
//       const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
//       const empId = (item.employeeId || "").toLowerCase();
//       return fullName.includes(lowerSearch) || empId.includes(lowerSearch);
//     });
//   }, [conversations, searchQuery]);

//   // Clicking a conversation triggers handleSelectConversation from context
//   const handleConversationPress = (item) => {
//     if (!employeeId) return;
//     handleSelectConversation(item);
//   };

//   // Loading or error states
//   if (conversationsLoading) {
//     return (
//       <div className="flex flex-col w-full h-full items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
//         <p className="text-sm text-gray-600 dark:text-gray-200">
//           Loading conversations...
//         </p>
//       </div>
//     );
//   }

//   if (conversationsError) {
//     return (
//       <div className="flex flex-col w-full h-full items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
//         <p className="text-sm text-red-600 dark:text-red-400">
//           Error: {conversationsError}
//         </p>
//       </div>
//     );
//   }

//   // Render each conversation
//   const renderConversationItem = (item) => (
//     <button
//       key={item.employeeId}
//       onClick={() => handleConversationPress(item)}
//       className="
//         flex flex-row items-center w-full p-2 mb-3
//         rounded-lg shadow-md
//         text-left transition-all
//         bg-gradient-to-r from-white via-gray-50 to-white
//         dark:from-gray-700 dark:via-gray-700 dark:to-gray-700
//         hover:shadow-lg hover:scale-[1.01]
//         cursor-pointer
//       "
//     >
//       {item.userAvatar ? (
//         <img
//           src={item.userAvatar}
//           alt="avatar"
//           className="w-12 h-12 rounded-full mr-3 object-cover"
//         />
//       ) : (
//         <div
//           className="
//             w-12 h-12 rounded-full mr-3
//             flex items-center justify-center
//             bg-blue-600
//           "
//         >
//           <span className="text-white text-sm font-bold">
//             {item.employeeId?.charAt(0)}
//           </span>
//         </div>
//       )}

//       <div className="flex-1">
//         <div className="flex flex-row justify-between items-center">
//           <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//             {item.firstName} {item.lastName}
//           </span>
//           {item.unreadCount > 0 && (
//             <div className="bg-red-600 rounded-full px-2 py-1 ml-2">
//               <span className="text-white text-xs font-bold">
//                 {item.unreadCount}
//               </span>
//             </div>
//           )}
//         </div>
//         <span className="block text-xs text-gray-500 dark:text-gray-300 mt-1">
//           {item.employeeId}
//         </span>
//       </div>
//     </button>
//   );

//   // Final render
//   return (
//     <div
//       className="
//         flex flex-col
//         w-full h-full
//         bg-gray-100 dark:bg-gray-800
//         transition-colors p-3
//         overflow-y-auto
//       "
//       style={{
//         scrollbarColor: "#000 #2f2f2f",
//         scrollbarWidth: "thin",
//       }}
//     >
//       {/* Search Bar */}
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search by Name or Employee ID"
//         className="
//           mb-4
//           p-2
//           rounded
//           w-full
//           text-sm
//           text-gray-800 dark:text-gray-200
//           bg-white dark:bg-gray-700
//           placeholder-gray-400 dark:placeholder-gray-400
//           focus:outline-none focus:ring-2 focus:ring-blue-500
//           border border-gray-300 dark:border-gray-600
//           transition-colors
//         "
//       />

//       {filteredConversations.length === 0 ? (
//         <div className="flex flex-col flex-1 items-center justify-center">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             No matching conversations found
//           </p>
//         </div>
//       ) : (
//         <div className="flex flex-col">
//           {filteredConversations.map(renderConversationItem)}
//         </div>
//       )}
//     </div>
//   );
// }





import React, { useState, useMemo, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { FiSearch, FiMessageCircle, FiAlertCircle } from "react-icons/fi";

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

  // Clicking a conversation triggers handleSelectConversation from context
  const handleConversationPress = (item) => {
    if (!employeeId) return;
    handleSelectConversation(item);
  };

  // Loading state
  if (conversationsLoading) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-700 h-12 w-12 mb-4"></div>
          <div className="h-2 bg-slate-700 rounded w-24 mb-2.5"></div>
          <div className="h-2 bg-slate-700 rounded w-16"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (conversationsError) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20 backdrop-blur-sm">
          <div className="text-red-500 text-xl mb-2 flex items-center">
            <FiAlertCircle className="mr-2" />
            Error
          </div>
          <p className="text-sm text-slate-300">
            {conversationsError}
          </p>
        </div>
      </div>
    );
  }

  // Render each conversation
  const renderConversationItem = (item) => (
    <button
      key={item.employeeId}
      onClick={() => handleConversationPress(item)}
      className="
        flex flex-row items-center w-full p-3 mb-3
        rounded-xl 
        text-left transition-all
        bg-slate-800/70 hover:bg-slate-700/90
        backdrop-blur-sm
        border border-slate-700/50 hover:border-blue-500/30
        shadow-lg hover:shadow-blue-500/10
        cursor-pointer group
      "
    >
      {item.userAvatar ? (
        <img
          src={item.userAvatar}
          alt="avatar"
          className="w-12 h-12 rounded-full mr-3 object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/50"
        />
      ) : (
        <div
          className="
            w-12 h-12 rounded-full mr-3
            flex items-center justify-center
            bg-gradient-to-br from-blue-500 to-purple-600
            group-hover:from-blue-400 group-hover:to-purple-500
            transition-all
          "
        >
          <span className="text-white text-sm font-bold">
            {item.firstName?.[0]}{item.lastName?.[0]}
          </span>
        </div>
      )}

      <div className="flex-1">
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm font-semibold text-slate-100 group-hover:text-white">
            {item.firstName} {item.lastName}
          </span>
          {item.unreadCount > 0 && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-2 py-1 ml-2 shadow-lg shadow-blue-500/20">
              <span className="text-white text-xs font-bold">
                {item.unreadCount}
              </span>
            </div>
          )}
        </div>
        <span className="block text-xs text-slate-400 group-hover:text-slate-300 mt-1">
          {item.employeeId}
        </span>
      </div>
    </button>
  );

  // Final render
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversations"
          className="
            p-2.5 pl-10
            rounded-xl
            w-full
            text-sm
            text-slate-200
            bg-slate-800/70
            placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            border border-slate-700/50 focus:border-blue-500/50
            transition-all
            backdrop-blur-sm
          "
        />
        <FiSearch className="absolute left-3 top-3 text-slate-400" />
      </div>

      {filteredConversations.length === 0 ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-3 text-2xl text-slate-400">
              <FiMessageCircle />
            </div>
            <p className="text-sm text-slate-400 text-center">
              No matching conversations found
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-1">
          {filteredConversations.map(renderConversationItem)}
        </div>
      )}
    </div>
  );
}