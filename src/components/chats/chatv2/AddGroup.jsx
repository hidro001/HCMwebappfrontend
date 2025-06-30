import React, { useState, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import toast from "react-hot-toast";
import { getsocket } from "../../../service/socketService";
import { FiUsers, FiImage, FiCheck, FiLoader } from "react-icons/fi";

export default function AddGroup({ onClose }) {
  const { employeeId, members } = useContext(ChatContextv2);
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [creating, setCreating] = useState(false);

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error("Group name is required.");
      return;
    }

    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member.");
      return;
    }

    const socket = getsocket();
    if (!socket) {
      toast.error("Socket not connected.");
      return;
    }

    setCreating(true);

    const payload = {
      groupName,
      admin: employeeId,
      members: selectedMembers,
      groupIcon,
    };

    socket.emit("createGroup", payload, (res) => {
      setCreating(false);
      if (res.success) {
        toast.success("Group created successfully!");
        if (onClose) onClose();
      } else {
        toast.error(res.message || "Failed to create group.");
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Create New Group
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add members and start chatting
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Group Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Group Name *
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            maxLength={50}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {groupName.length}/50 characters
          </p>
        </div>

        {/* Group Icon Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Group Icon (Optional)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FiImage className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGroupIcon(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
            />
          </div>
        </div>

        {/* Members Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Members *
            </label>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {selectedMembers.length} selected
            </span>
          </div>

          {/* Members List */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
            {members.length === 0 ? (
              <div className="text-center py-8">
                <FiUsers className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  No members available
                </p>
              </div>
            ) : (
              members.map((member) => {
                if (member.employeeId === employeeId) return null;

                const isSelected = selectedMembers.includes(member.employeeId);

                return (
                  <div
                    key={member.employeeId}
                    onClick={() => toggleMember(member.employeeId)}
                    className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-[1.02]"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={
                            member.user_Avatar ||
                            "https://via.placeholder.com/40"
                          }
                          alt={`${member.firstName} ${member.lastName}`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200"
                        />
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                        )}
                      </div>

                      {/* Member Info */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`font-semibold truncate ${
                            isSelected
                              ? "text-white"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {member.firstName} {member.lastName}
                        </p>
                        <p
                          className={`text-sm truncate ${
                            isSelected
                              ? "text-white/80"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          ID: {member.employeeId}
                        </p>
                        {member.department && (
                          <p
                            className={`text-xs truncate ${
                              isSelected
                                ? "text-white/70"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {member.department}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "bg-white shadow-md"
                          : "bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                      }`}
                    >
                      {isSelected ? (
                        <FiCheck className="w-5 h-5 text-blue-600" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border-2 border-gray-400 dark:border-gray-500"></div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Selection Summary */}
          {selectedMembers.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <FiUsers className="inline w-4 h-4 mr-1" />
                {selectedMembers.length} member
                {selectedMembers.length !== 1 ? "s" : ""} will be added to the
                group
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {groupName && selectedMembers.length > 0 ? (
              <span className="text-green-600 dark:text-green-400">
                ✓ Ready to create
              </span>
            ) : (
              <span>Fill in group details to continue</span>
            )}
          </div>

          <button
            onClick={handleCreateGroup}
            disabled={
              creating || !groupName.trim() || selectedMembers.length === 0
            }
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {creating ? (
              <FiLoader className="w-5 h-5 animate-spin" />
            ) : (
              <FiUsers className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">
              {creating ? "Creating..." : "Create Group"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
