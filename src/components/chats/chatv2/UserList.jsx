import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { FaSpinner } from "react-icons/fa";

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");

  // From ChatContext
  const {
    fetchMembers,
    members,
    totalCount,
    loading,
    error,
    handleSelectUser,
  } = useContext(ChatContextv2);

  // On mount, fetch the members list
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase();
    return members.filter((m) => {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const empId = m.employeeId?.toLowerCase() || "";
      return fullName.includes(lowerSearch) || empId.includes(lowerSearch);
    });
  }, [members, searchQuery]);

  // Render each member
  const renderMemberItem = useCallback(
    (item) => {
      const name = `${item.firstName} ${item.lastName}`;

      return (
        <button
          key={item.employeeId}
          onClick={() => handleSelectUser(item)}
          className="
            flex flex-row items-center
            w-full p-3 mb-3
            rounded-lg
            shadow-md transform
            bg-gradient-to-r from-white via-gray-50 to-white
            dark:from-gray-700 dark:via-gray-700 dark:to-gray-700
            text-left
            transition-all
            hover:shadow-lg hover:scale-[1.01]
          "
        >
          <div
            className="
              w-10 h-10 rounded-full bg-[#075E54]
              flex items-center justify-center mr-3 overflow-hidden
            "
          >
            {item.userAvatar ? (
              <img
                src={item.userAvatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-base font-bold">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-200 mt-1">
              {item.employeeId}
            </p>
          </div>
        </button>
      );
    },
    [handleSelectUser]
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-50 dark:bg-gray-800">
        <FaSpinner className="animate-spin text-2xl text-[#075E54]" />
        <p className="mt-2 text-base text-[#075E54]">Loading contacts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-50 dark:bg-gray-800">
        <p className="text-base text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="
        flex flex-col flex-1
        bg-gray-50 dark:bg-gray-800
        p-2
        overflow-y-auto
      "
    >
    {/* <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
  All Member- {totalCount}
</h2> */}


      {/* Search Input */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Name or Employee ID"
        className="
          bg-white dark:bg-gray-700
          text-gray-800 dark:text-gray-100
          p-2 rounded-lg text-sm mb-2
          placeholder-gray-400 dark:placeholder-gray-400
          border border-gray-200 dark:border-gray-600
          w-full
          focus:outline-none
          focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500
          transition-colors
        "
      />

      {/* Render Members */}
      <div className="flex flex-col">
        {filteredMembers.map((member) => renderMemberItem(member))}
      </div>
    </div>
  );
}
