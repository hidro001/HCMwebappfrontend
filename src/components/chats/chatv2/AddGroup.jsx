// import React, { useState, useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import toast from "react-hot-toast";
// import { getsocket } from "../../../service/socketService";
// import { FiUsers, FiImage, FiCheck, FiLoader } from "react-icons/fi";

// export default function AddGroup({ onClose }) {
//   const { employeeId, members } = useContext(ChatContextv2);
//   const [groupName, setGroupName] = useState("");
//   const [groupIcon, setGroupIcon] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [creating, setCreating] = useState(false);

//   const toggleMember = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
//     );
//   };

//   const handleCreateGroup = () => {
//     if (!groupName.trim()) {
//       toast.error("Group name is required.");
//       return;
//     }

//     if (selectedMembers.length === 0) {
//       toast.error("Please select at least one member.");
//       return;
//     }

//     const socket = getsocket();
//     if (!socket) {
//       toast.error("Socket not connected.");
//       return;
//     }

//     setCreating(true);

//     const payload = {
//       groupName,
//       admin: employeeId,
//       members: selectedMembers,
//       groupIcon,
//     };

//     socket.emit("createGroup", payload, (res) => {
//       setCreating(false);
//       if (res.success) {
//         toast.success("Group created successfully!");
//         if (onClose) onClose();
//       } else {
//         toast.error(res.message || "Failed to create group.");
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-3  border-b border-gray-200 dark:border-gray-700">
//         <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//           <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//         </div>
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
//             Create New Group
//           </h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Add members and start chatting
//           </p>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {/* Group Name Input */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//             Group Name *
//           </label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             placeholder="Enter group name..."
//             className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
//             maxLength={50}
//           />
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             {groupName.length}/50 characters
//           </p>
//         </div>

//         {/* Group Icon Input */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//             Group Icon (Optional)
//           </label>
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <FiImage className="w-5 h-5 text-gray-400 dark:text-gray-500" />
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setGroupIcon(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
//             />
//           </div>
//         </div>

//         {/* Members Selection */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Select Members *
//             </label>
//             <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
//               {selectedMembers.length} selected
//             </span>
//           </div>

//           {/* Members List */}
//           <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
//             {members.length === 0 ? (
//               <div className="text-center py-8">
//                 <FiUsers className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No members available
//                 </p>
//               </div>
//             ) : (
//               members.map((member) => {
//                 if (member.employeeId === employeeId) return null;

//                 const isSelected = selectedMembers.includes(member.employeeId);

//                 return (
//                   <div
//                     key={member.employeeId}
//                     onClick={() => toggleMember(member.employeeId)}
//                     className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
//                       isSelected
//                         ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-[1.02]"
//                         : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
//                     }`}
//                   >
//                     <div className="flex items-center gap-4">
//                       {/* Avatar */}
//                       <div className="relative">
//                         <img
//                           src={
//                             member.user_Avatar ||
//                             "https://via.placeholder.com/40"
//                           }
//                           alt={`${member.firstName} ${member.lastName}`}
//                           className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200"
//                         />
//                         {member.isOnline && (
//                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
//                         )}
//                       </div>

//                       {/* Member Info */}
//                       <div className="min-w-0 flex-1">
//                         <p
//                           className={`font-semibold truncate ${
//                             isSelected
//                               ? "text-white"
//                               : "text-gray-900 dark:text-gray-100"
//                           }`}
//                         >
//                           {member.firstName} {member.lastName}
//                         </p>
//                         <p
//                           className={`text-sm truncate ${
//                             isSelected
//                               ? "text-white/80"
//                               : "text-gray-500 dark:text-gray-400"
//                           }`}
//                         >
//                           ID: {member.employeeId}
//                         </p>
//                         {member.department && (
//                           <p
//                             className={`text-xs truncate ${
//                               isSelected
//                                 ? "text-white/70"
//                                 : "text-gray-400 dark:text-gray-500"
//                             }`}
//                           >
//                             {member.department}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Selection Indicator */}
//                     <div
//                       className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
//                         isSelected
//                           ? "bg-white shadow-md"
//                           : "bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
//                       }`}
//                     >
//                       {isSelected ? (
//                         <FiCheck className="w-5 h-5 text-blue-600" />
//                       ) : (
//                         <div className="w-3 h-3 rounded-full border-2 border-gray-400 dark:border-gray-500"></div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Selection Summary */}
//           {selectedMembers.length > 0 && (
//             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
//               <p className="text-sm text-blue-800 dark:text-blue-300">
//                 <FiUsers className="inline w-4 h-4 mr-1" />
//                 {selectedMembers.length} member
//                 {selectedMembers.length !== 1 ? "s" : ""} will be added to the
//                 group
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Actions */}
//       <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             {groupName && selectedMembers.length > 0 ? (
//               <span className="text-green-600 dark:text-green-400">
//                 ✓ Ready to create
//               </span>
//             ) : (
//               <span>Fill in group details to continue</span>
//             )}
//           </div>

//           <button
//             onClick={handleCreateGroup}
//             disabled={
//               creating || !groupName.trim() || selectedMembers.length === 0
//             }
//             className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
//           >
//             {creating ? (
//               <FiLoader className="w-5 h-5 animate-spin" />
//             ) : (
//               <FiUsers className="w-5 h-5" />
//             )}
//             <span className="hidden sm:inline">
//               {creating ? "Creating..." : "Create Group"}
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import toast from "react-hot-toast";
// import { getsocket } from "../../../service/socketService";
// import { FiUsers, FiImage, FiCheck, FiLoader } from "react-icons/fi";

// export default function AddGroup({ onClose }) {
//   const { employeeId, members } = useContext(ChatContextv2);
//   const [groupName, setGroupName] = useState("");
//   const [groupIcon, setGroupIcon] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [creating, setCreating] = useState(false);

//   const toggleMember = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
//     );
//   };

//   const handleCreateGroup = () => {
//     if (!groupName.trim()) {
//       toast.error("Group name is required.");
//       return;
//     }

//     if (selectedMembers.length === 0) {
//       toast.error("Please select at least one member.");
//       return;
//     }

//     const socket = getsocket();
//     if (!socket) {
//       toast.error("Socket not connected.");
//       return;
//     }

//     setCreating(true);

//     const payload = {
//       groupName,
//       admin: employeeId,
//       members: selectedMembers,
//       groupIcon,
//     };

//     socket.emit("createGroup", payload, (res) => {
//       setCreating(false);
//       if (res.success) {
//         toast.success("Group created successfully!");
//         if (onClose) onClose();
//       } else {
//         toast.error(res.message || "Failed to create group.");
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
//         <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-md">
//           <FiUsers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
//             Create New Group
//           </h2>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             Add members and start chatting
//           </p>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-3">
//         {/* Group Name Input */}
//         <div className="space-y-1">
//           <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
//             Group Name *
//           </label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             placeholder="Enter group name..."
//             className="w-full px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
//             maxLength={50}
//           />
//           <p className="text-xs text-gray-400 dark:text-gray-500">
//             {groupName.length}/50
//           </p>
//         </div>

//         {/* Group Icon Input */}
//         <div className="space-y-1">
//           <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
//             Group Icon (Optional)
//           </label>
//           <div className="relative">
//             <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
//               <FiImage className="w-3 h-3 text-gray-400 dark:text-gray-500" />
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setGroupIcon(e.target.value)}
//               className="w-full pl-8 pr-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 text-sm"
//             />
//           </div>
//         </div>

//         {/* Members Selection */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
//               Select Members *
//             </label>
//             <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
//               {selectedMembers.length} selected
//             </span>
//           </div>

//           {/* Members List */}
//           <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
//             {members.length === 0 ? (
//               <div className="text-center py-4">
//                 <FiUsers className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
//                 <p className="text-gray-500 dark:text-gray-400 text-sm">
//                   No members available
//                 </p>
//               </div>
//             ) : (
//               members.map((member) => {
//                 if (member.employeeId === employeeId) return null;

//                 const isSelected = selectedMembers.includes(member.employeeId);

//                 return (
//                   <div
//                     key={member.employeeId}
//                     onClick={() => toggleMember(member.employeeId)}
//                     className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                       isSelected
//                         ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
//                         : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       {/* Avatar */}
//                       <div className="relative">
//                         <img
//                           src={
//                             member.user_Avatar ||
//                             "https://via.placeholder.com/40"
//                           }
//                           alt={`${member.firstName} ${member.lastName}`}
//                           className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200"
//                         />
//                         {member.isOnline && (
//                           <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 dark:bg-green-400 rounded-full ring-1 ring-white dark:ring-gray-800"></div>
//                         )}
//                       </div>

//                       {/* Member Info */}
//                       <div className="min-w-0 flex-1">
//                         <p
//                           className={`font-medium truncate text-sm ${
//                             isSelected
//                               ? "text-white"
//                               : "text-gray-900 dark:text-gray-100"
//                           }`}
//                         >
//                           {member.firstName} {member.lastName}
//                         </p>
//                         <p
//                           className={`text-xs truncate ${
//                             isSelected
//                               ? "text-white/80"
//                               : "text-gray-500 dark:text-gray-400"
//                           }`}
//                         >
//                           {member.employeeId}
//                           {member.department && ` • ${member.department}`}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Selection Indicator */}
//                     <div
//                       className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
//                         isSelected
//                           ? "bg-white shadow-sm"
//                           : "bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
//                       }`}
//                     >
//                       {isSelected ? (
//                         <FiCheck className="w-3 h-3 text-blue-600" />
//                       ) : (
//                         <div className="w-2 h-2 rounded-full border border-gray-400 dark:border-gray-500"></div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Selection Summary */}
//           {selectedMembers.length > 0 && (
//             <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//               <p className="text-xs text-blue-800 dark:text-blue-300">
//                 <FiUsers className="inline w-3 h-3 mr-1" />
//                 {selectedMembers.length} member
//                 {selectedMembers.length !== 1 ? "s" : ""} will be added
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Actions */}
//       <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//         <div className="flex items-center justify-between">
//           <div className="text-xs text-gray-500 dark:text-gray-400">
//             {groupName && selectedMembers.length > 0 ? (
//               <span className="text-green-600 dark:text-green-400">
//                 ✓ Ready to create
//               </span>
//             ) : (
//               <span>Fill details</span>
//             )}
//           </div>

//           <button
//             onClick={handleCreateGroup}
//             disabled={
//               creating || !groupName.trim() || selectedMembers.length === 0
//             }
//             className="flex items-center gap-1 px-3 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 text-sm"
//           >
//             {creating ? (
//               <FiLoader className="w-4 h-4 animate-spin" />
//             ) : (
//               <FiUsers className="w-4 h-4" />
//             )}
//             <span className="hidden sm:inline">
//               {creating ? "Creating..." : "Create Group"}
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import toast from "react-hot-toast";
import { getsocket } from "../../../service/socketService";
import { FiUsers, FiImage, FiCheck, FiLoader, FiChevronRight, FiChevronLeft, FiSearch } from "react-icons/fi";

export default function AddGroup({ onClose }) {
  const { employeeId, members } = useContext(ChatContextv2);
  const [currentStep, setCurrentStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [creating, setCreating] = useState(false);
  const [memberSearchTerm, setMemberSearchTerm] = useState("");

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const nextStep = () => {
    if (currentStep === 1 && !groupName.trim()) {
      toast.error("Group name is required.");
      return;
    }
    if (currentStep === 2 && selectedMembers.length === 0) {
      toast.error("Please select at least one member.");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCreateGroup = () => {
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

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Group Details";
      case 2: return "Select Members";
      case 3: return "Review & Create";
      default: return "Create Group";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return "Enter group name and choose icon";
      case 2: return "Add members to your group";
      case 3: return "Review your group settings";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-md">
            <FiUsers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              {getStepTitle()}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getStepSubtitle()}
            </p>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                step === currentStep
                  ? "bg-blue-500 dark:bg-blue-400"
                  : step < currentStep
                  ? "bg-green-500 dark:bg-green-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300">
        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Group Name Input */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Group Name *
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
                maxLength={50}
                autoFocus
              />
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {groupName.length}/50 characters
              </p>
            </div>

            {/* Group Icon Input */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Group Icon (Optional)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FiImage className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGroupIcon(e.target.value)}
                  className="w-full pl-12 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 text-sm"
                />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Upload a group photo to personalize your group
              </p>
            </div>

            {/* Preview */}
            {groupName && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {groupName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {groupName}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                Select Members *
              </label>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {selectedMembers.length} selected
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FiSearch className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={memberSearchTerm}
                onChange={(e) => setMemberSearchTerm(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            {/* Members List */}
            <div className="max-h-80 overflow-y-auto space-y-1 pr-1 [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300">
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <FiUsers className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No members available
                  </p>
                </div>
              ) : (
                members
                  .filter((member) => {
                    if (member.employeeId === employeeId) return false;
                    if (!memberSearchTerm.trim()) return true;
                    
                    const searchTerm = memberSearchTerm.toLowerCase();
                    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
                    const memberEmployeeId = member.employeeId.toLowerCase();
                    const department = member.department?.toLowerCase() || "";
                    
                    return fullName.includes(searchTerm) || 
                           memberEmployeeId.includes(searchTerm) || 
                           department.includes(searchTerm);
                  })
                  .map((member) => {
                    const isSelected = selectedMembers.includes(member.employeeId);

                    return (
                      <div
                        key={member.employeeId}
                        onClick={() => toggleMember(member.employeeId)}
                        className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <img
                              src={member.user_Avatar || "https://via.placeholder.com/40"}
                              alt={`${member.firstName} ${member.lastName}`}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200"
                            />
                            {member.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 dark:bg-green-400 rounded-full ring-1 ring-white dark:ring-gray-800"></div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className={`font-medium truncate text-sm ${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                              {member.firstName} {member.lastName}
                            </p>
                            <p className={`text-xs truncate ${isSelected ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                              {member.employeeId}
                              {member.department && ` • ${member.department}`}
                            </p>
                          </div>
                        </div>

                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "bg-white shadow-sm"
                            : "bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                        }`}>
                          {isSelected ? (
                            <FiCheck className="w-3 h-3 text-blue-600" />
                          ) : (
                            <div className="w-2 h-2 rounded-full border border-gray-400 dark:border-gray-500"></div>
                          )}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>

            {/* No Results Message */}
            {memberSearchTerm.trim() && 
             members.filter(member => {
               if (member.employeeId === employeeId) return false;
               const searchTerm = memberSearchTerm.toLowerCase();
               const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
               const memberEmployeeId = member.employeeId.toLowerCase();
               const department = member.department?.toLowerCase() || "";
               return fullName.includes(searchTerm) || memberEmployeeId.includes(searchTerm) || department.includes(searchTerm);
             }).length === 0 && (
              <div className="text-center py-6">
                <FiSearch className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No members found for "{memberSearchTerm}"
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  Try searching by name, employee ID, or department
                </p>
              </div>
            )}

            {/* Selection Summary */}
            {selectedMembers.length > 0 && (
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  <FiUsers className="inline w-3 h-3 mr-1" />
                  {selectedMembers.length} member{selectedMembers.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            {/* Group Summary */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Group Summary</h3>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {groupName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{groupName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedMembers.length + 1} member{selectedMembers.length !== 0 ? "s" : ""} (including you)
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Members */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Selected Members</h3>
              <div className="max-h-60 overflow-y-auto space-y-1 pr-1 [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300">
                {selectedMembers.map((memberId) => {
                  const member = members.find(m => m.employeeId === memberId);
                  if (!member) return null;

                  return (
                    <div key={memberId} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <img
                        src={member.user_Avatar || "https://via.placeholder.com/40"}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {member.employeeId}
                        </p>
                      </div>
                      {member.isOnline && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Create Group Button */}
            <button
              onClick={handleCreateGroup}
              disabled={creating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {creating ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <FiUsers className="w-4 h-4" />
              )}
              <span>
                {creating ? "Creating Group..." : "Create Group"}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
          >
            <FiChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Step {currentStep} of 3
          </div>

          {currentStep < 3 && (
            <button
              onClick={nextStep}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 3 && (
            <div className="w-16"></div>
          )}
        </div>
      </div>
    </div>
  );
}