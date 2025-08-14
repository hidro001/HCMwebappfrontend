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

    console.log(`groupicon ${group.groupIcon}`);
    return (
      <div
        key={group._id}
        onClick={() => selectGroup({ ...group, isGroup: true })}
        className="group flex items-center gap-3 px-2 py-2 mb-1 rounded-lg cursor-pointer transition-all duration-200
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
        <div className="relative flex-shrink-0">
          {group.groupIcon ? (
            <img
              src={group.groupIcon}
              alt={`${group.groupName} group icon`}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform duration-200">
              {group.groupName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm"></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {group.groupName}
            </h3>

            <div className="relative flex-shrink-0 ml-2">
              <FiMessageCircle className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 w-4 h-4 transition-colors duration-200" />
              {group.unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 dark:bg-red-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-full shadow-md min-w-[16px] flex items-center justify-center">
                  {group.unreadCount > 99 ? "99+" : group.unreadCount}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
              <FiUsers className="inline w-2.5 h-2.5 mr-1" />
              {group.members.length} member
              {group.members.length !== 1 ? "s" : ""}
            </p>

            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 w-full">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-blue-400 mb-3"></div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Loading groups...
        </div>
      </div>
    );
  }

  if (groupsError) {
    return (
      <div className="flex items-center justify-center h-48 w-full p-3">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-center max-w-md">
          <div className="flex items-center justify-center mb-2">
            <FiAlertCircle className="text-red-500 dark:text-red-400 w-5 h-5 mr-2" />
            <span className="text-red-600 dark:text-red-400 font-medium text-sm">
              Error Loading Groups
            </span>
          </div>
          <p className="text-red-700 dark:text-red-300 text-xs">
            {groupsError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-1 px-2 py-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FiUsers className="text-blue-600 dark:text-blue-400 w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              My Groups
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {groups.length} group{groups.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-2">
        {!groups || groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <FiUsers className="text-gray-400 dark:text-gray-500 w-6 h-6" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-medium mb-2 text-sm">
              No Groups Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs max-w-sm">
              You haven't joined any groups yet. Ask your colleagues to add you
              to a group or create a new one.
            </p>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <FiUsers className="text-gray-400 dark:text-gray-500 w-6 h-6" />
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-medium mb-2 text-sm">
              No Groups Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs max-w-sm">
              No groups match your search for "{searchTerm}". Try a different
              search term.
            </p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto space-y-1 pr-1 custom-scrollbar [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300">
            {filteredGroups.map(renderGroupItem)}
          </div>
        )}
      </div>
    </div>
  );
}