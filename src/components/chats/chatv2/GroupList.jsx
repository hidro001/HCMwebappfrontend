// import { useEffect, useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import {
//   FiUsers,
//   FiLoader,
//   FiAlertCircle,
//   FiMessageCircle,
// } from "react-icons/fi";

// export default function GroupList({ searchTerm }) {
//   const {
//     groups,
//     groupsLoading,
//     groupsError,
//     fetchUserGroups,
//     selectGroup,
//   } = useContext(ChatContextv2);

//   useEffect(() => {
//     fetchUserGroups();
//   }, [fetchUserGroups]);

//   const filteredGroups = groups.filter((group) => {
//     const name = group.groupName.toLowerCase();
//     const search = searchTerm.toLowerCase();
//     return name.includes(search);
//   });

//   const renderGroupItem = (group) => {
//     return (
//       <div
//         key={group._id}
//         onClick={() => selectGroup({ ...group, isGroup: true })}
//         className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl cursor-pointer transition-all
//         dark:bg-black bg-white hover:bg-blue-100
//         border border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md group"
//       >
//         {group.groupIcon ? (
//           <img
//             src={group.groupIcon}
//             alt="Group"
//             className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-300 group-hover:ring-blue-500"
//           />
//         ) : (
//           <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
//             {group.groupName.charAt(0)}
//           </div>
//         )}
//         <div className="flex-1">
//           <p className="text-blue-800 font-semibold text-sm truncate dark:text-white dark:group-hover:text-sky-200 group-hover:text-blue-600">
//             {group.groupName}
//           </p>
//           <p className="text-xs text-blue-400 group-hover:text-blue-500">
//             {group.members.length} member{group.members.length !== 1 && "s"}
//           </p>
//         </div>

//         <div className="relative">
//           <FiMessageCircle className="text-blue-300 group-hover:text-blue-500" />
//           {group.unreadCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
//               {group.unreadCount > 99 ? "99+" : group.unreadCount}
//             </span>
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (groupsLoading) {
//     return (
//       <div className="flex items-center justify-center h-full text-blue-400">
//         <FiLoader className="animate-spin text-3xl" />
//       </div>
//     );
//   }

//   if (groupsError) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full">
//         <div className="bg-red-100 text-red-600 rounded-xl p-6 border border-red-300 shadow">
//           <div className="text-xl mb-2 flex items-center">
//             <FiAlertCircle className="mr-2" />
//             Error
//           </div>
//           <p className="text-sm">{groupsError}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-full flex flex-col px-3 py-4 dark:bg-black bg-white text-blue-900">
//       <div className="flex items-center mb-4 gap-2">
//         <FiUsers className="text-blue-600 dark:text-white" />
//         <h2 className="text-base font-semibold tracking-wide dark:text-white">My Groups</h2>
//       </div>

//       {!groups || groups.length === 0 ? (
//         <div className="flex flex-col items-center justify-center flex-1 text-blue-400 text-sm">
//           <FiUsers className="text-4xl mb-2" />
//           <p>You are not in any group yet.</p>
//         </div>
//       ) : filteredGroups.length === 0 ? (
//         <div className="flex flex-col items-center justify-center flex-1 text-blue-400 text-sm">
//           <FiUsers className="text-4xl mb-2" />
//           <p>No groups matched your search.</p>
//         </div>
//       ) : (
//         <div
//           className="flex-1 overflow-y-auto space-y-2 pr-1
//             [&::-webkit-scrollbar]:w-2
//             [&::-webkit-scrollbar-track]:bg-blue-100
//             [&::-webkit-scrollbar-thumb]:bg-blue-300
//             [&::-webkit-scrollbar-thumb]:rounded-full"
//         >
//           {filteredGroups.map(renderGroupItem)}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import {
  FiUsers,
  FiLoader,
  FiAlertCircle,
  FiMessageCircle,
} from "react-icons/fi";

export default function GroupList({ searchTerm }) {
  const { groups, groupsLoading, groupsError, fetchUserGroups, selectGroup } =
    useContext(ChatContextv2);

  useEffect(() => {
    fetchUserGroups();
  }, [fetchUserGroups]);

  const filteredGroups = groups.filter((group) => {
    const name = group.groupName.toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search);
  });

  const renderGroupItem = (group) => {
    return (
      <div
        key={group._id}
        onClick={() => selectGroup({ ...group, isGroup: true })}
        className="group flex items-center gap-4 px-4 py-4 mb-2 rounded-xl cursor-pointer transition-all duration-200
        bg-white dark:bg-gray-800 
        hover:bg-blue-50 dark:hover:bg-gray-700 
        border border-gray-200 dark:border-gray-700 
        hover:border-blue-300 dark:hover:border-blue-500 
        shadow-sm hover:shadow-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        tabIndex={0}
        role="button"
        aria-label={`Open group ${group.groupName}`}
      >
        {/* Group Avatar */}
        <div className="relative flex-shrink-0">
          {group.groupIcon ? (
            <img
              src={group.groupIcon}
              alt={`${group.groupName} group icon`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-200">
              {group.groupName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Online/Active Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm"></div>
        </div>

        {/* Group Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {group.groupName}
            </h3>

            {/* Message Icon with Unread Badge */}
            <div className="relative flex-shrink-0 ml-2">
              <FiMessageCircle className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 w-5 h-5 transition-colors duration-200" />
              {group.unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md min-w-[18px] flex items-center justify-center">
                  {group.unreadCount > 99 ? "99+" : group.unreadCount}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
              <FiUsers className="inline w-3 h-3 mr-1" />
              {group.members.length} member
              {group.members.length !== 1 ? "s" : ""}
            </p>

            {/* Activity Status */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading State
  if (groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400 mb-4"></div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Loading groups...
        </div>
      </div>
    );
  }

  // Error State
  if (groupsError) {
    return (
      <div className="flex items-center justify-center h-64 w-full p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-xl text-center max-w-md">
          <div className="flex items-center justify-center mb-3">
            <FiAlertCircle className="text-red-500 dark:text-red-400 w-6 h-6 mr-2" />
            <span className="text-red-600 dark:text-red-400 font-medium">
              Error Loading Groups
            </span>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm">
            {groupsError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FiUsers className="text-blue-600 dark:text-blue-400 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              My Groups
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {groups.length} group{groups.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-4">
        {!groups || groups.length === 0 ? (
          // Empty State - No Groups
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FiUsers className="text-gray-400 dark:text-gray-500 w-8 h-8" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-medium mb-2">
              No Groups Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              You haven't joined any groups yet. Ask your colleagues to add you
              to a group or create a new one.
            </p>
          </div>
        ) : filteredGroups.length === 0 ? (
          // Empty State - No Search Results
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FiUsers className="text-gray-400 dark:text-gray-500 w-8 h-8" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-medium mb-2">
              No Groups Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              No groups match your search for "{searchTerm}". Try a different
              search term.
            </p>
          </div>
        ) : (
          // Groups List
          <div className="h-full overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {filteredGroups.map(renderGroupItem)}
          </div>
        )}
      </div>
    </div>
  );
}
