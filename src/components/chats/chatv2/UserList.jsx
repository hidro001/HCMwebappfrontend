import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { FiSearch, FiUsers, FiAlertCircle } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    fetchMembers,
    members,
    totalCount,
    loading,
    error,
    handleSelectUser,
  } = useContext(ChatContextv2);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filteredMembers = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase();
    return members.filter((m) => {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const empId = m.employeeId?.toLowerCase() || "";
      return fullName.includes(lowerSearch) || empId.includes(lowerSearch);
    });
  }, [members, searchQuery]);

  const renderMemberItem = useCallback(
    (item) => {
      const name = `${item.firstName} ${item.lastName}`;
      const initials = `${item.firstName?.[0]}${item.lastName?.[0]}`;

      return (
        <button
          key={item.employeeId}
          onClick={() => handleSelectUser(item)}
          className="
            flex flex-row items-center
            w-full p-3 mb-3
            rounded-xl
            text-left
            transition-all duration-300
            bg-slate-800/70 hover:bg-slate-700/90
            backdrop-blur-sm
            border border-slate-700/50 hover:border-blue-500/30
            shadow-lg hover:shadow-blue-500/10
            cursor-pointer group
          "
        >
          <div
            className="
              w-12 h-12 rounded-full 
              flex items-center justify-center mr-3 overflow-hidden
              bg-gradient-to-br from-blue-500 to-purple-600
              group-hover:from-blue-400 group-hover:to-purple-500
              ring-2 ring-blue-500/30 group-hover:ring-blue-500/50
              transition-all
            "
          >
            {item.userAvatar ? (
              <img
                src={item.userAvatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-base font-bold">{initials}</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-100 group-hover:text-white">
              {name}
            </p>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 mt-1">
              {item.employeeId}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-blue-400 text-sm">+</span>
          </div>
        </button>
      );
    },
    [handleSelectUser]
  );

  if (loading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center p-4">
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 flex flex-col items-center">
          <BiLoaderAlt className="animate-spin text-4xl text-blue-500 mb-3" />
          <p className="text-slate-300">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center p-4">
        <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20 backdrop-blur-sm">
          <div className="text-red-500 text-xl mb-2 flex items-center">
            <FiAlertCircle className="mr-2" />
            Error
          </div>
          <p className="text-sm text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto    [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300 "
    >
      {totalCount > 0 && (
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center text-xs text-slate-400">
            <FiUsers className="mr-1" />
            <span>{totalCount} Members</span>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search members"
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

      {filteredMembers.length === 0 && (
        <div className="flex flex-col flex-1 items-center justify-center p-4">
          <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/30 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center mb-3 text-2xl text-slate-400">
              <FiUsers />
            </div>
            <p className="text-sm text-slate-400">No matching members found</p>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {filteredMembers.map((member) => renderMemberItem(member))}
      </div>
    </div>
  );
}
