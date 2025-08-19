import React, { useState, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";

function GroupSettingsModal({ group, onClose }) {
  const {
    members,
    addMemberToGroup,
    removeMemberFromGroup,
    updateGroupInfo,
    deleteGroup,
  } = useContext(ChatContextv2);

  const [newName, setNewName] = useState(group.groupName);
  const [newIcon, setNewIcon] = useState(group.groupIcon || "");
  const [userToAdd, setUserToAdd] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const existingIds = new Set(group.members || []);
  const possibleNewMembers = members.filter(
    (m) => !existingIds.has(m.employeeId)
  );

  const handleRemove = (memberId) => {
    if (!window.confirm("Remove this user from the group?")) return;
    removeMemberFromGroup(group._id, memberId);
  };

  const handleAdd = () => {
    if (!userToAdd) return;
    addMemberToGroup(group._id, userToAdd);
    setUserToAdd("");
  };

  const handleUpdateGroupInfo = () => {
    if (!newName.trim()) {
      alert("Group name cannot be blank");
      return;
    }
    updateGroupInfo(group._id, newName.trim(), newIcon.trim());
  };

  const handleDelete = () => {
    if (deleteConfirm !== "DELETE") {
      alert('Type "DELETE" in the box if you really want to delete this group.');
      return;
    }
    if (!window.confirm("Are you sure you want to permanently delete this group?"))
      return;
    deleteGroup(group._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            ⚙️ Group Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Group Info */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Group Name
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Group Icon (URL)
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
            onClick={handleUpdateGroupInfo}
          >
            💾 Save Group Info
          </button>

          <hr className="dark:border-gray-600" />

          {/* Add Member */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Add New Member
            </label>
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                value={userToAdd}
                onChange={(e) => setUserToAdd(e.target.value)}
              >
                <option value="">-- Select a user --</option>
                {possibleNewMembers.map((m) => (
                  <option key={m.employeeId} value={m.employeeId}>
                    {m.firstName} {m.lastName} ({m.employeeId})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                ➕ Add
              </button>
            </div>
          </div>

          <hr className="dark:border-gray-600" />

          {/* Members List */}
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
              👥 Current Members ({group.members?.length || 0})
            </p>
            <div className="space-y-2">
              {group.members?.map((mId) => (
                <div
                  key={mId}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {mId}
                    {mId === group.admin && (
                      <strong className="ml-1 text-pink-600">(Admin)</strong>
                    )}
                  </span>
                  {mId !== group.admin && (
                    <button
                      className="text-red-600 hover:text-red-800 text-xs font-medium"
                      onClick={() => handleRemove(mId)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="dark:border-gray-600" />

          {/* Delete Group */}
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
              Type <strong>DELETE</strong> to confirm:
            </p>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none mb-2"
              placeholder="DELETE"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              🗑️ Delete Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupSettingsModal;
