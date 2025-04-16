// src/components/chats/groups/GroupList.jsx
import React, { useState, useEffect, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { FaSpinner } from "react-icons/fa";

export default function GroupList() {
  const {
    groups,
    groupsLoading,
    groupsError,
    fetchUserGroups,
    createGroupUIFlow,
    selectGroup,
  } = useContext(ChatContextv2);

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchUserGroups();
  }, [fetchUserGroups]);

  const handleCreateGroupClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  // After user picks members and group name, call createGroup from ChatContext
  const handleCreateGroup = async (groupName, selectedMemberIds, groupIcon) => {
    await createGroupUIFlow(groupName, selectedMemberIds, groupIcon);
    setShowCreateModal(false);
  };

  // Loading / error states
  if (groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <FaSpinner className="animate-spin text-2xl mb-2" />
        <p>Loading your groups...</p>
      </div>
    );
  }
  if (groupsError) {
    return <div className="text-red-500">Error: {groupsError}</div>;
  }

  const renderGroupItem = (g) => {
    return (
      <div
        key={g._id}
        onClick={() => selectGroup(g)}
        className="
          w-full mb-3 p-2
          bg-gray-100 dark:bg-gray-700
          rounded-lg shadow-md
          flex flex-row items-center
          hover:scale-[1.01] transition-transform cursor-pointer
        "
      >
        {g.groupIcon ? (
          <img
            src={g.groupIcon}
            alt="group-icon"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-indigo-500 rounded-full mr-3 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {g.groupName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
            {g.groupName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {g.members.length} members
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* If no groups, show create button up top */}
      <div className="flex flex-row justify-between items-center mb-2">
        <h2 className="text-sm font-bold">My Groups</h2>
        <button
          onClick={handleCreateGroupClick}
          className="
            px-3 py-1 text-sm rounded-md
            bg-blue-500 text-white hover:bg-blue-600
            transition-colors
          "
        >
          Create Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300">
          You are not in any group. Create one?
        </div>
      ) : (
        groups.map(renderGroupItem)
      )}

      {showCreateModal && (
        <CreateGroupModal onClose={handleCloseModal} onCreateGroup={handleCreateGroup} />
      )}
    </div>
  );
}

/**
 * A very simple “create group” modal that does:
 *  1. Show all users (excluding me).
 *  2. Let user pick >=2 members.
 *  3. Enter group name, optional group icon (URL).
 */
function CreateGroupModal({ onClose, onCreateGroup }) {
  const { members, employeeId } = useContext(ChatContextv2);
  const [selectedIds, setSelectedIds] = useState([]);
  const [stage, setStage] = useState("selectMembers");
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");

  // Filter out the current user
  const available = members.filter((m) => m.employeeId !== employeeId);

  const toggleMember = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleNext = () => {
    // must pick at least 2 members
    if (selectedIds.length < 2) {
      alert("Please select at least 2 members!");
      return;
    }
    setStage("nameGroup");
  };

  const handleCreate = () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }
    onCreateGroup(groupName.trim(), selectedIds, groupIcon.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-md p-4 w-[90%] max-w-md">
        {stage === "selectMembers" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Select Members</h2>
            <div className="max-h-64 overflow-y-auto">
              {available.map((user) => {
                const isSelected = selectedIds.includes(user.employeeId);
                return (
                  <div
                    key={user.employeeId}
                    onClick={() => toggleMember(user.employeeId)}
                    className={`
                      flex items-center mb-1 p-2 rounded-md
                      cursor-pointer
                      ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }
                    `}
                  >
                    <span className="text-sm">
                      {user.firstName} {user.lastName} ({user.employeeId})
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={onClose}
                className="px-3 py-1 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1 bg-blue-600 text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {stage === "nameGroup" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Name Your Group</h2>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="
                w-full p-2 mb-2
                border rounded
                text-sm
                bg-gray-100 dark:bg-gray-700
              "
            />
            <input
              type="text"
              value={groupIcon}
              onChange={(e) => setGroupIcon(e.target.value)}
              placeholder="Optional group icon URL"
              className="
                w-full p-2 mb-2
                border rounded
                text-sm
                bg-gray-100 dark:bg-gray-700
              "
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setStage("selectMembers")}
                className="px-3 py-1 bg-gray-300 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                className="px-3 py-1 bg-blue-600 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
