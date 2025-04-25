// GroupSettingsModal.jsx
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";

function GroupSettingsModal({ group, onClose }) {
  const {
    isGroupAdmin,
    employeeId,
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

  // Filter out existing members
  const existingIds = new Set(group.members || []);
  const possibleNewMembers = members.filter((m) => !existingIds.has(m.employeeId));

  // Remove a member
  const handleRemove = (memberId) => {
    if (!window.confirm("Remove this user from the group?")) return;
    removeMemberFromGroup(group._id, memberId);
  };

  // Add a member
  const handleAdd = () => {
    if (!userToAdd) return;
    addMemberToGroup(group._id, userToAdd);
    setUserToAdd("");
  };

  // Update the group's name/icon
  const handleUpdateGroupInfo = () => {
    if (!newName.trim()) {
      alert("Group name cannot be blank");
      return;
    }
    updateGroupInfo(group._id, newName.trim(), newIcon.trim());
  };

  // Permanently delete the group
  const handleDelete = () => {
    if (deleteConfirm !== "DELETE") {
      alert('Type "DELETE" in the box if you really want to delete this group.');
      return;
    }
    if (!window.confirm("Are you sure you want to permanently delete this group?")) return;
    deleteGroup(group._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-3">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded p-4 space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
          Group Settings
        </h2>

        {isGroupAdmin(group) ? (
          <>
            <div className="mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Group Name
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Group Icon (URL)
              </label>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mb-4"
              onClick={handleUpdateGroupInfo}
            >
              Update Group Info
            </button>

            <hr />

            {/* Add new member */}
            <div className="mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Add New Member
              </label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
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
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
                onClick={handleAdd}
              >
                Add Member
              </button>
            </div>

            <hr />

            {/* Existing members */}
            <div>
              <p className="text-sm font-semibold mb-1">
                Current Members ({group.members?.length || 0})
              </p>
              {group.members?.map((mId) => (
                <div key={mId} className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 dark:text-gray-200">
                    {mId}
                    {mId === group.admin && (
                      <strong className="ml-1 text-pink-600">(Admin)</strong>
                    )}
                  </span>
                  {mId !== group.admin && (
                    <button
                      className="text-red-600 hover:text-red-800 text-xs"
                      onClick={() => handleRemove(mId)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <hr />

            {/* Delete group */}
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
                placeholder="DELETE"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
              />
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete Group
              </button>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            You are <strong>not</strong> the admin, so you cannot update this group.
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupSettingsModal;
