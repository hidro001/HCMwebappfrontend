

// import React, { useState, useMemo, useContext, useCallback } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import { formatDistanceToNow } from "date-fns";

// export default function ConversationList({ searchTerm }) {
//   const {
//     conversations,
//     userStatus,
//     conversationsLoading,
//     conversationsError,
//     selectUser,
//     employeeId,
//   } = useContext(ChatContextv2);

//   console.log(`conversations`, conversations);

//   const filteredConversations = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();

//     const filtered = !q
//       ? conversations
//       : conversations.filter(({ firstName, lastName, employeeId: id }) => {
//           const fullName = `${firstName} ${lastName}`.toLowerCase();
//           return fullName.includes(q) || id.toLowerCase().includes(q);
//         });

//     return filtered.sort((a, b) => {
//       const aOnline = userStatus[a.employeeId] ? 1 : 0;
//       const bOnline = userStatus[b.employeeId] ? 1 : 0;
//       return bOnline - aOnline;
//     });
//   }, [conversations, userStatus, searchTerm]);

//   const renderItem = useCallback(
//     (item) => {
//       const {
//         employeeId: id,
//         firstName,
//         lastName,
//         userAvatar,
//         unreadCount = 0,
//         lastMessage,
//         lastMessageTimestamp,
//         last_seen,
//       } = item;

//       const isOnline = userStatus[id];
//       const text = lastMessage?.message || "No messages yet";
//       const time = lastMessageTimestamp
//         ? new Date(lastMessageTimestamp).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })
//         : "";

//       return (
//         <button
//           key={id}
//           onClick={() => selectUser(item)}
//           aria-label={`Conversation with ${firstName} ${lastName}`}
//           className="group flex items-start w-full p-4 mb-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
//         >
//           {/* Avatar Section */}
//           <div className="relative mr-4 w-14 h-14 flex-shrink-0">
//             {userAvatar ? (
//               <img
//                 src={userAvatar}
//                 alt={`${firstName} ${lastName}`}
//                 className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200"
//               />
//             ) : (
//               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                 {firstName?.[0]}
//                 {lastName?.[0]}
//               </div>
//             )}

//             {/* Online Status Indicator */}
//             {isOnline && (
//               <span
//                 className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm"
//                 title="Online"
//               />
//             )}
//           </div>

//           {/* Content Section */}
//           <div className="flex-1 overflow-hidden min-w-0">
//             {/* Header Row */}
//             <div className="flex justify-between items-center mb-2">
//               <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
//                 {firstName} {lastName}
//               </span>
//               {time && (
//                 <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
//                   {time}
//                 </span>
//               )}
//             </div>

//             {/* Message Row */}
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1 mr-2">
//                 {text}
//               </span>

//               {/* Message Status Indicators */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 {unreadCount > 0 ? (
//                   <div className="bg-blue-500 dark:bg-blue-600 rounded-full px-2 py-1 shadow-md min-w-[20px] flex items-center justify-center">
//                     <span className="text-white text-xs font-semibold">
//                       {unreadCount > 99 ? "99+" : unreadCount}
//                     </span>
//                   </div>
//                 ) : lastMessage?.sender === employeeId ? (
//                   lastMessage?.isRead ? (
//                     <span
//                       className="text-blue-500 dark:text-blue-400 text-sm"
//                       title="Read"
//                     >
//                       ✓✓
//                     </span>
//                   ) : (
//                     <span
//                       className="text-gray-400 dark:text-gray-500 text-sm"
//                       title="Sent"
//                     >
//                       ✓
//                     </span>
//                   )
//                 ) : null}
//               </div>
//             </div>

//             {/* Last Seen Row */}
//             {!isOnline && last_seen && (
//               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//                 Last seen{" "}
//                 {formatDistanceToNow(new Date(last_seen), { addSuffix: true })}
//               </p>
//             )}
//           </div>
//         </button>
//       );
//     },
//     [userStatus, selectUser, employeeId]
//   );

//   // Loading State
//   if (conversationsLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 w-full">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400 mb-4"></div>
//         <div className="text-gray-500 dark:text-gray-400 text-sm">
//           Loading conversations...
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (conversationsError) {
//     return (
//       <div className="flex items-center justify-center h-64 w-full p-4">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-xl text-center max-w-md">
//           <div className="text-red-600 dark:text-red-400 text-sm mb-2">
//             ⚠️ Error Loading Conversations
//           </div>
//           <div className="text-red-700 dark:text-red-300 text-xs">
//             {conversationsError}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty State
//   if (filteredConversations.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 w-full p-6">
//         <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">💬</div>
//         <div className="text-gray-600 dark:text-gray-400 text-base font-medium mb-2">
//           {searchTerm ? "No conversations found" : "No conversations yet"}
//         </div>
//         <div className="text-gray-500 dark:text-gray-500 text-sm text-center">
//           {searchTerm
//             ? `Try searching for a different name or employee ID`
//             : "Start chatting with your colleagues to see conversations here"}
//         </div>
//       </div>
//     );
//   }

//   // Main Content
//   return (
//     <div className="flex flex-col h-full w-full">
//       <div
//         role="list"
//         className="overflow-y-auto px-1 space-y-1 h-full custom-scrollbar [&::-webkit-scrollbar]:w-2
//     [&::-webkit-scrollbar-track]:rounded-full
//     [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//     [&::-webkit-scrollbar-thumb]:rounded-full
//     [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//     transition-colors duration-300"
//       >
//         {filteredConversations.map(renderItem)}
//       </div>
//     </div>
//   );
// }



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

  console.log(`conversations`, conversations);

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
          className="group flex items-center w-full p-2 mb-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        >
          {/* Avatar Section */}
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

            {/* Online Status Indicator */}
            {isOnline && (
              <span
                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm"
                title="Online"
              />
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-hidden min-w-0">
            {/* Header Row */}
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

            {/* Message Row */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1 mr-2">
                {text}
              </span>

              {/* Message Status Indicators */}
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

            {/* Last Seen Row */}
            {!isOnline && last_seen && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Last seen{" "}
                {formatDistanceToNow(new Date(last_seen), { addSuffix: true })}
              </p>
            )}
          </div>
        </button>
      );
    },
    [userStatus, selectUser, employeeId]
  );

  // Loading State
  if (conversationsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 w-full">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400 mb-3"></div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Loading conversations...
        </div>
      </div>
    );
  }

  // Error State
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

  // Empty State
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

  // Main Content
  return (
    <div className="flex flex-col h-full w-full">
      <div
        role="list"
        className="overflow-y-auto px-1 space-y-0.5 h-full custom-scrollbar [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300"
      >
        {filteredConversations.map(renderItem)}
      </div>
    </div>
  );
}