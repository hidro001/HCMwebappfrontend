import { useEffect, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import {
  FiUsers,
  FiLoader,
  FiAlertCircle,
  FiMessageCircle,
} from "react-icons/fi";

export default function GroupList({ searchTerm }) {
  const {
    groups,
    groupsLoading,
    groupsError,
    fetchUserGroups,
    selectGroup,
  } = useContext(ChatContextv2);

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
        className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl cursor-pointer transition-all
        dark:bg-black bg-white hover:bg-blue-100
        border border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md group"
      >
        {group.groupIcon ? (
          <img
            src={group.groupIcon}
            alt="Group"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-300 group-hover:ring-blue-500"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {group.groupName.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <p className="text-blue-800 font-semibold text-sm truncate dark:text-white dark:group-hover:text-sky-200 group-hover:text-blue-600">
            {group.groupName}
          </p>
          <p className="text-xs text-blue-400 group-hover:text-blue-500">
            {group.members.length} member{group.members.length !== 1 && "s"}
          </p>
        </div>

        <div className="relative">
          <FiMessageCircle className="text-blue-300 group-hover:text-blue-500" />
          {group.unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
              {group.unreadCount > 99 ? "99+" : group.unreadCount}
            </span>
          )}
        </div>
      </div>
    );
  };

  if (groupsLoading) {
    return (
      <div className="flex items-center justify-center h-full text-blue-400">
        <FiLoader className="animate-spin text-3xl" />
      </div>
    );
  }

  if (groupsError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-red-100 text-red-600 rounded-xl p-6 border border-red-300 shadow">
          <div className="text-xl mb-2 flex items-center">
            <FiAlertCircle className="mr-2" />
            Error
          </div>
          <p className="text-sm">{groupsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col px-3 py-4 dark:bg-black bg-white text-blue-900">
      <div className="flex items-center mb-4 gap-2">
        <FiUsers className="text-blue-600 dark:text-white" />
        <h2 className="text-base font-semibold tracking-wide dark:text-white">My Groups</h2>
      </div>

      {!groups || groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-blue-400 text-sm">
          <FiUsers className="text-4xl mb-2" />
          <p>You are not in any group yet.</p>
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-blue-400 text-sm">
          <FiUsers className="text-4xl mb-2" />
          <p>No groups matched your search.</p>
        </div>
      ) : (
        <div
          className="flex-1 overflow-y-auto space-y-2 pr-1
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-blue-100
            [&::-webkit-scrollbar-thumb]:bg-blue-300
            [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {filteredGroups.map(renderGroupItem)}
        </div>
      )}
    </div>
  );
}
