// // src/components/chats/groups/GroupList.jsx
// import React, { useState, useEffect, useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import { FaSpinner } from "react-icons/fa";

// export default function GroupList() {
//   const {
//     groups,
//     groupsLoading,
//     groupsError,
//     fetchUserGroups,
//     createGroupUIFlow,
//     selectGroup,
//   } = useContext(ChatContextv2);

//   const [showCreateModal, setShowCreateModal] = useState(false);

//   useEffect(() => {
//     fetchUserGroups();
//   }, [fetchUserGroups]);

//   const handleCreateGroupClick = () => {
//     setShowCreateModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowCreateModal(false);
//   };

//   // After user picks members and group name, call createGroup from ChatContext
//   const handleCreateGroup = async (groupName, selectedMemberIds, groupIcon) => {
//     await createGroupUIFlow(groupName, selectedMemberIds, groupIcon);
//     setShowCreateModal(false);
//   };

//   // Loading / error states
//   if (groupsLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-6">
//         <FaSpinner className="animate-spin text-2xl mb-2" />
//         <p>Loading your groups...</p>
//       </div>
//     );
//   }
//   if (groupsError) {
//     return <div className="text-red-500">Error: {groupsError}</div>;
//   }

//   const renderGroupItem = (g) => {
//     return (
//       <div
//         key={g._id}
//         onClick={() => selectGroup(g)}
//         className="
//           w-full mb-3 p-2
//           bg-gray-100 dark:bg-gray-700
//           rounded-lg shadow-md
//           flex flex-row items-center
//           hover:scale-[1.01] transition-transform cursor-pointer
//         "
//       >
//         {g.groupIcon ? (
//           <img
//             src={g.groupIcon}
//             alt="group-icon"
//             className="w-12 h-12 rounded-full mr-3 object-cover"
//           />
//         ) : (
//           <div className="w-12 h-12 bg-indigo-500 rounded-full mr-3 flex items-center justify-center">
//             <span className="text-white text-xl font-bold">
//               {g.groupName.charAt(0)}
//             </span>
//           </div>
//         )}
//         <div>
//           <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
//             {g.groupName}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-300">
//             {g.members.length} members
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full h-full flex flex-col">
//       {/* If no groups, show create button up top */}
//       <div className="flex flex-row justify-between items-center mb-2">
//         <h2 className="text-sm font-bold">My Groups</h2>
//         <button
//           onClick={handleCreateGroupClick}
//           className="
//             px-3 py-1 text-sm rounded-md
//             bg-blue-500 text-white hover:bg-blue-600
//             transition-colors
//           "
//         >
//           Create Group
//         </button>
//       </div>

//       {groups.length === 0 ? (
//         <div className="text-gray-500 dark:text-gray-300">
//           You are not in any group. Create one?
//         </div>
//       ) : (
//         groups.map(renderGroupItem)
//       )}

//       {showCreateModal && (
//         <CreateGroupModal onClose={handleCloseModal} onCreateGroup={handleCreateGroup} />
//       )}
//     </div>
//   );
// }

// /**
//  * A very simple “create group” modal that does:
//  *  1. Show all users (excluding me).
//  *  2. Let user pick >=2 members.
//  *  3. Enter group name, optional group icon (URL).
//  */
// function CreateGroupModal({ onClose, onCreateGroup }) {
//   const { members, employeeId } = useContext(ChatContextv2);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [stage, setStage] = useState("selectMembers");
//   const [groupName, setGroupName] = useState("");
//   const [groupIcon, setGroupIcon] = useState("");

//   // Filter out the current user
//   const available = members.filter((m) => m.employeeId !== employeeId);

//   const toggleMember = (id) => {
//     if (selectedIds.includes(id)) {
//       setSelectedIds(selectedIds.filter((i) => i !== id));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//     }
//   };

//   const handleNext = () => {
//     // must pick at least 2 members
//     if (selectedIds.length < 2) {
//       alert("Please select at least 2 members!");
//       return;
//     }
//     setStage("nameGroup");
//   };

//   const handleCreate = () => {
//     if (!groupName.trim()) {
//       alert("Please enter a group name.");
//       return;
//     }
//     onCreateGroup(groupName.trim(), selectedIds, groupIcon.trim());
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
//       <div className="bg-white dark:bg-gray-800 rounded-md p-4 w-[90%] max-w-md">
//         {stage === "selectMembers" && (
//           <div>
//             <h2 className="text-lg font-bold mb-2">Select Members</h2>
//             <div className="max-h-64 overflow-y-auto">
//               {available.map((user) => {
//                 const isSelected = selectedIds.includes(user.employeeId);
//                 return (
//                   <div
//                     key={user.employeeId}
//                     onClick={() => toggleMember(user.employeeId)}
//                     className={`
//                       flex items-center mb-1 p-2 rounded-md
//                       cursor-pointer
//                       ${
//                         isSelected
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//                       }
//                     `}
//                   >
//                     <span className="text-sm">
//                       {user.firstName} {user.lastName} ({user.employeeId})
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={onClose}
//                 className="px-3 py-1 bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {stage === "nameGroup" && (
//           <div>
//             <h2 className="text-lg font-bold mb-2">Name Your Group</h2>
//             <input
//               type="text"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               placeholder="Enter group name"
//               className="
//                 w-full p-2 mb-2
//                 border rounded
//                 text-sm
//                 bg-gray-100 dark:bg-gray-700
//               "
//             />
//             <input
//               type="text"
//               value={groupIcon}
//               onChange={(e) => setGroupIcon(e.target.value)}
//               placeholder="Optional group icon URL"
//               className="
//                 w-full p-2 mb-2
//                 border rounded
//                 text-sm
//                 bg-gray-100 dark:bg-gray-700
//               "
//             />
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setStage("selectMembers")}
//                 className="px-3 py-1 bg-gray-300 rounded-md"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleCreate}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/components/chats/groups/GroupList.jsx
import React, { useState, useEffect, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import { 
  FiUsers, 
  FiUserPlus, 
  FiX, 
  FiArrowLeft, 
  FiArrowRight, 
  FiCheck,
  FiLoader,
  FiAlertCircle,
  FiPlus
} from "react-icons/fi";

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

  // Loading state
  if (groupsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-6 bg-slate-800/30 backdrop-blur-sm rounded-xl">
        <div className="p-6 bg-slate-800/50 rounded-xl shadow-lg flex flex-col items-center border border-slate-700/40">
          <div className="text-blue-400 mb-4">
            <FiLoader className="animate-spin text-3xl" />
          </div>
          <p className="text-slate-300 text-sm">Loading your groups...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (groupsError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20 backdrop-blur-sm shadow-lg">
          <div className="text-red-500 text-xl mb-2 flex items-center">
            <FiAlertCircle className="mr-2" />
            Error
          </div>
          <p className="text-sm text-slate-300">{groupsError}</p>
        </div>
      </div>
    );
  }

  const renderGroupItem = (g) => {
    return (
      <div
        key={g._id}
        onClick={() => selectGroup(g)}
        className="
          w-full mb-3 p-3
          bg-slate-800/70 hover:bg-slate-700/90
          rounded-xl shadow-lg
          border border-slate-700/50 hover:border-blue-500/30
          flex flex-row items-center
          hover:shadow-blue-500/10
          transition-all duration-300 cursor-pointer group
        "
      >
        {g.groupIcon ? (
          <img
            src={g.groupIcon}
            alt="group-icon"
            className="w-12 h-12 rounded-full mr-3 object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/50"
          />
        ) : (
          <div className="
            w-12 h-12 
            bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:from-indigo-400 group-hover:to-purple-500
            rounded-full mr-3 flex items-center justify-center
            shadow-lg shadow-indigo-500/20
            transition-all
          ">
            <span className="text-white text-xl font-bold">
              {g.groupName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-slate-100 group-hover:text-white text-sm font-bold">
            {g.groupName}
          </p>
          <p className="text-slate-400 group-hover:text-slate-300 text-xs">
            {g.members.length} members
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Group header and create button */}
      <div className="flex flex-row justify-between items-center mb-4 px-1">
        <div className="flex items-center">
          <FiUsers className="text-blue-400 mr-2" />
          <h2 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My Groups
          </h2>
        </div>
        <button
          onClick={handleCreateGroupClick}
          className="
            px-3 py-1.5 text-xs rounded-lg
            bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500
            text-white font-medium
            flex items-center
            shadow-lg shadow-blue-500/20
            transition-all duration-300
            border border-blue-500/30
          "
        >
          <FiPlus className="mr-1" /> Create Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 h-full">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center shadow-lg">
            <div className="text-3xl mb-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-3 inline-block">
              <FiUsers className="text-white" />
            </div>
            <p className="text-slate-300 text-sm">
              You are not in any group yet.
            </p>
            <button
              onClick={handleCreateGroupClick}
              className="
                mt-4 px-4 py-2 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500
                text-white text-sm font-medium
                shadow-lg shadow-blue-500/20
                transition-all
              "
            >
              Create Your First Group
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto">
          {groups.map(renderGroupItem)}
        </div>
      )}

      {showCreateModal && (
        <CreateGroupModal onClose={handleCloseModal} onCreateGroup={handleCreateGroup} />
      )}
    </div>
  );
}

/**
 * Redesigned Create Group Modal with futuristic UI
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-slate-900 rounded-xl p-6 w-[90%] max-w-md border border-slate-700/50 shadow-2xl">
        {stage === "selectMembers" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Select Group Members
              </h2>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <FiX />
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto pr-1 mb-4">
              {available.map((user) => {
                const isSelected = selectedIds.includes(user.employeeId);
                return (
                  <div
                    key={user.employeeId}
                    onClick={() => toggleMember(user.employeeId)}
                    className={`
                      flex items-center mb-2 p-3 rounded-lg
                      cursor-pointer transition-all
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                          : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/50"
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-2
                      ${isSelected ? "bg-white/20" : "bg-gradient-to-br from-blue-500 to-purple-600"}
                    `}>
                      {isSelected ? (
                        <FiCheck className="text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </span>
                      )}
                    </div>
                    <span className="text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs ml-auto opacity-70">
                      {user.employeeId}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
              <div className="text-slate-400 text-sm">
                {selectedIds.length} selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  className="
                    px-4 py-2 rounded-lg
                    bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500
                    text-white flex items-center
                    shadow-lg shadow-blue-500/20 
                    transition-all
                  "
                >
                  Next <FiArrowRight className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "nameGroup" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Name Your Group
              </h2>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <FiX />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs mb-1 ml-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter a name for your group"
                  className="
                    w-full p-3
                    rounded-lg
                    text-sm
                    bg-slate-800
                    border border-slate-700 focus:border-blue-500
                    text-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    transition-all
                  "
                />
              </div>
              
              <div>
                <label className="block text-slate-400 text-xs mb-1 ml-1">
                  Group Icon URL (Optional)
                </label>
                <input
                  type="text"
                  value={groupIcon}
                  onChange={(e) => setGroupIcon(e.target.value)}
                  placeholder="https://example.com/icon.png"
                  className="
                    w-full p-3
                    rounded-lg
                    text-sm
                    bg-slate-800
                    border border-slate-700 focus:border-blue-500
                    text-slate-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    transition-all
                  "
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
              <button
                onClick={() => setStage("selectMembers")}
                className="
                  px-4 py-2
                  bg-slate-800 hover:bg-slate-700
                  text-slate-200
                  rounded-lg
                  transition-colors
                  border border-slate-700
                  flex items-center
                "
              >
                <FiArrowLeft className="mr-1" /> Back
              </button>
              <button
                onClick={handleCreate}
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500
                  text-white
                  shadow-lg shadow-blue-500/20
                  transition-all
                  flex items-center
                "
              >
                Create Group <FiCheck className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}