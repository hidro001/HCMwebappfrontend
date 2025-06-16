
// import React, { useRef, useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { fetchSubordinates, submitTask } from "../../../service/taskService";
// import toast from "react-hot-toast";
// import BaseModal from "../../common/BaseModal";

// const AssignTask = ({ onClose, onAddSuccess }) => {
//   const modalRef = useRef(null);
//   const [attachment, setAttachment] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [subordinates, setSubordinates] = useState([]);
//   const [filteredSubordinates, setFilteredSubordinates] = useState([]);
//   const [selectedAssignees, setSelectedAssignees] = useState([]);
//   const [title, setTitle] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("High");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadSubordinates = async () => {
//       const data = await fetchSubordinates();
//       setSubordinates(data);
//     };
//     loadSubordinates();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredSubordinates([]);
//     } else {
//       const results = subordinates
//         .filter(
//           (sub) =>
//             `${sub.first_Name} ${sub.last_Name} ${sub.employee_Id}`
//               .toLowerCase()
//               .includes(searchQuery.toLowerCase())
//         )
//         .filter((sub) => !selectedAssignees.some((s) => s._id === sub._id)); // exclude already selected

//       setFilteredSubordinates(results);
//     }
//   }, [searchQuery, subordinates, selectedAssignees]);

//   const handleFileUpload = (e) => {
//     if (e.target.files.length > 0) {
//       setAttachment(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || selectedAssignees.length === 0 || !dueDate || !priority) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);

//     const taskData = {
//       title,
//       description,
//       assigned_to: selectedAssignees.map((user) => user.employee_Id),
//       due_date: dueDate,
//       priority,
//       attachment: attachment ? attachment.name : null,
//     };

//     try {
//       await submitTask(taskData);
//       toast.success("Task submitted successfully!");
//       if (onAddSuccess) onAddSuccess();
//       onClose();
//     } catch (error) {
//       alert("Error submitting task.");
//     }

//     setLoading(false);
//   };

//   return (
//     <AnimatePresence>
//       <BaseModal isOpen={true} onClose={onClose}>
//         <motion.div
//           ref={modalRef}
//           className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl overflow-auto relative h-3/4"
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.9 }}
//           transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600 transition duration-200"
//             aria-label="Close form"
//             disabled={loading}
//           >
//             <FaTimes size={20} />
//           </button>

//           <div className="bg-blue-900 text-white dark:bg-blue-700 p-4 text-lg font-semibold">
//             Assign Task
//           </div>

//           <div className="p-6">
//             <p className="text-gray-600 dark:text-gray-300 mb-4">
//               Assign tasks to multiple team members, set deadlines, and track progress seamlessly.
//             </p>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div>
//                 <label className="block text-sm font-medium">Title*</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Task Title"
//                   className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-medium">Assignees*</label>
//                 <input
//                   type="text"
//                   placeholder="Search for assignees..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   disabled={loading}
//                 />
//                 {filteredSubordinates.length > 0 && (
//                   <ul className="absolute z-10 bg-white dark:bg-gray-700 border rounded-md mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
//                     {filteredSubordinates.map((sub) => (
//                       <li
//                         key={sub._id}
//                         onClick={() => {
//                           setSelectedAssignees([...selectedAssignees, sub]);
//                           setSearchQuery("");
//                           setFilteredSubordinates([]);
//                         }}
//                         className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
//                       >
//                         {sub.first_Name} {sub.last_Name} ({sub.employee_Id})
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {selectedAssignees.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {selectedAssignees.map((assignee) => (
//                     <span
//                       key={assignee._id}
//                       className="bg-gray-200 dark:bg-gray-600 text-sm px-2 py-1 rounded flex items-center"
//                     >
//                       {assignee.first_Name} {assignee.last_Name} ({assignee.employee_Id})
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setSelectedAssignees(
//                             selectedAssignees.filter((a) => a._id !== assignee._id)
//                           )
//                         }
//                         className="ml-2 text-red-500"
//                       >
//                         <FaTimes />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium">Due Date*</label>
//                 <input
//                   type="date"
//                   className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   value={dueDate}
//                   onChange={(e) => setDueDate(e.target.value)}
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <fieldset className="flex space-x-4">
//                 <legend className="text-sm font-medium">Priority*</legend>
//                 {["High", "Medium", "Low"].map((level) => (
//                   <label key={level} className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="priority"
//                       value={level}
//                       checked={priority === level}
//                       onChange={() => setPriority(level)}
//                       className="mr-2"
//                     />
//                     {level}
//                   </label>
//                 ))}
//               </fieldset>

//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <textarea
//                   placeholder="Enter Task Description"
//                   className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : "Submit Task"}
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </BaseModal>
//     </AnimatePresence>
//   );
// };

// export default AssignTask;



import React, { useRef, useState, useEffect } from "react";
import { 
  FaTimes, 
  FaPlus, 
  FaSearch, 
  FaUser, 
  FaCalendarAlt, 
  FaFlag, 
  FaFileAlt, 
  FaPaperPlane,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
  FaUsers,
  FaTasks,
  FaIdCard
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSubordinates, submitTask } from "../../../service/taskService";
import toast from "react-hot-toast";
import BaseModal from "../../common/BaseModal";

const AssignTask = ({ onClose, onAddSuccess }) => {
  const modalRef = useRef(null);
  const [attachment, setAttachment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subordinates, setSubordinates] = useState([]);
  const [filteredSubordinates, setFilteredSubordinates] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSubordinates = async () => {
      const data = await fetchSubordinates();
      setSubordinates(data);
    };
    loadSubordinates();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSubordinates([]);
    } else {
      const results = subordinates
        .filter(
          (sub) =>
            `${sub.first_Name} ${sub.last_Name} ${sub.employee_Id}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
        .filter((sub) => !selectedAssignees.some((s) => s._id === sub._id)); // exclude already selected

      setFilteredSubordinates(results);
    }
  }, [searchQuery, subordinates, selectedAssignees]);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || selectedAssignees.length === 0 || !dueDate || !priority) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const taskData = {
      title,
      description,
      assigned_to: selectedAssignees.map((user) => user.employee_Id),
      due_date: dueDate,
      priority,
      attachment: attachment ? attachment.name : null,
    };

    try {
      await submitTask(taskData);
      toast.success("Task submitted successfully!");
      if (onAddSuccess) onAddSuccess();
      onClose();
    } catch (error) {
      toast.error("Error submitting task.");
    }

    setLoading(false);
  };

  // Get priority configuration
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "High":
        return {
          bgColor: "bg-red-500/10 dark:bg-red-500/20",
          textColor: "text-red-700 dark:text-red-300",
          borderColor: "border-red-500/30",
          radioColor: "text-red-600 focus:ring-red-500"
        };
      case "Medium":
        return {
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          textColor: "text-orange-700 dark:text-orange-300",
          borderColor: "border-orange-500/30",
          radioColor: "text-orange-600 focus:ring-orange-500"
        };
      default:
        return {
          bgColor: "bg-green-500/10 dark:bg-green-500/20",
          textColor: "text-green-700 dark:text-green-300",
          borderColor: "border-green-500/30",
          radioColor: "text-green-600 focus:ring-green-500"
        };
    }
  };

  return (
    <AnimatePresence>
      <BaseModal isOpen={true} onClose={onClose}>
        <motion.div
          ref={modalRef}
          className="w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FaTasks className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Assign New Task
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create and assign tasks to your team members
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 lg:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Task Title */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaFileAlt className="text-blue-500" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter a descriptive task title..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Assignees Section */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaUsers className="text-indigo-500" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">
                    Assignees <span className="text-red-500">*</span>
                  </label>
                </div>
                
                {/* Search Input */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search team members by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={loading}
                  />
                  
                  {/* Search Results Dropdown */}
                  {filteredSubordinates.length > 0 && (
                    <div className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {filteredSubordinates.map((sub, index) => (
                        <motion.div
                          key={sub._id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setSelectedAssignees([...selectedAssignees, sub]);
                            setSearchQuery("");
                            setFilteredSubordinates([]);
                          }}
                          className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-all duration-200 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg">
                            <FaUser className="text-indigo-600 dark:text-indigo-400 text-sm" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {sub.first_Name} {sub.last_Name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {sub.employee_Id}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Assignees */}
                {selectedAssignees.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Selected Team Members ({selectedAssignees.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssignees.map((assignee, index) => (
                        <motion.div
                          key={assignee._id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-lg"
                        >
                          <div className="p-1 bg-indigo-500/20 rounded">
                            <FaIdCard className="text-xs" />
                          </div>
                          <span className="text-sm font-medium">
                            {assignee.first_Name} {assignee.last_Name}
                          </span>
                          <span className="text-xs text-indigo-500 dark:text-indigo-400">
                            ({assignee.employee_Id})
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAssignees(
                                selectedAssignees.filter((a) => a._id !== assignee._id)
                              )
                            }
                            className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-all duration-200 hover:scale-110"
                            disabled={loading}
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedAssignees.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <FaUsers className="text-3xl mb-2 mx-auto opacity-50" />
                      <p className="text-sm">No team members selected</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Due Date and Priority Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Due Date */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <FaCalendarAlt className="text-green-500" />
                    <label className="text-lg font-semibold text-gray-900 dark:text-white">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Priority */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <FaFlag className="text-orange-500" />
                    <label className="text-lg font-semibold text-gray-900 dark:text-white">
                      Priority <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="space-y-3">
                    {["High", "Medium", "Low"].map((level) => {
                      const priorityConfig = getPriorityConfig(level);
                      return (
                        <label key={level} className={`flex items-center p-3 rounded-xl border ${priorityConfig.borderColor} ${priorityConfig.bgColor} cursor-pointer hover:scale-105 transition-all duration-200`}>
                          <input
                            type="radio"
                            name="priority"
                            value={level}
                            checked={priority === level}
                            onChange={() => setPriority(level)}
                            className={`mr-3 ${priorityConfig.radioColor}`}
                            disabled={loading}
                          />
                          <div className="flex items-center gap-2">
                            <FaFlag className={`${priorityConfig.textColor} text-sm`} />
                            <span className={`font-medium ${priorityConfig.textColor}`}>
                              {level} Priority
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <FaFileAlt className="text-purple-500" />
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">
                    Task Description
                  </label>
                </div>
                <textarea
                  placeholder="Provide detailed instructions and requirements for this task..."
                  rows={4}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading || !title || selectedAssignees.length === 0 || !dueDate}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Creating Task...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Create & Assign Task</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <style jsx>{`
            /* Custom scrollbar styling */
            div::-webkit-scrollbar {
              width: 6px;
            }
            
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            
            div::-webkit-scrollbar-thumb {
              background: #cbd5e0;
              border-radius: 3px;
            }
            
            div::-webkit-scrollbar-thumb:hover {
              background: #a0aec0;
            }
            
            .dark div::-webkit-scrollbar-thumb {
              background: #4a5568;
            }
            
            .dark div::-webkit-scrollbar-thumb:hover {
              background: #2d3748;
            }
          `}</style>
        </motion.div>
      </BaseModal>
    </AnimatePresence>
  );
};

export default AssignTask;