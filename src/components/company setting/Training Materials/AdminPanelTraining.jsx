// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaBuilding,
//   FaBoxOpen,
//   FaFileAlt,
//   FaEdit,
//   FaTrash,
//   FaPlus,
// } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// import useTrainingMaterialStore from "../../../store/useTrainingMaterialStore";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import FullScreenLoader from "../../common/FullScreenLoader";

// /**
//  * Simple fade-in variant for tab content transitions.
//  */
// const fadeVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
// };

// /**
//  * A generic modal for editing a single text field.
//  * - `entityLabel`: "Company", "Module", or "Material"
//  * - `value`: current value (name/title)
//  * - `onChange`: callback to update local state
//  * - `onSave`: callback to finalize changes
//  * - `onClose`: close the modal without saving
//  */
// function EditModal({ isOpen, entityLabel, value, onChange, onSave, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 sm:w-96 relative">
//         <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
//           Edit {entityLabel}
//         </h2>
//         <input
//           type="text"
//           className="w-full border border-gray-300 dark:border-gray-600 bg-bg-secondary rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AdminPanelTraining() {
//   // Zustand store actions & states
//   const {
//     companies,
//     modules,
//     materials,
//     loading,
//     fetchCompanies,
//     fetchModules,
//     fetchMaterials,
//     createCompany,
//     createModule,
//     createMaterial,
//     updateCompany,
//     updateModule,
//     updateMaterial,
//     deleteCompany,
//     deleteModule,
//     deleteMaterial,
//   } = useTrainingMaterialStore();

//   // Current tab: "Companies", "Modules", "Materials"
//   const [currentTab, setCurrentTab] = useState("Companies");

//   // Track selected Company/Module
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(null);

//   // Form fields for creating
//   const [companyName, setCompanyName] = useState("");
//   const [moduleName, setModuleName] = useState("");
//   const [materialTitle, setMaterialTitle] = useState("");
//   const [materialType, setMaterialType] = useState("pdf");
//   const [materialFile, setMaterialFile] = useState(null);

//   // Confirmation dialog for deletes
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmAction, setConfirmAction] = useState(() => {});

//   // Edit modals states
//   const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
//   const [editCompanyId, setEditCompanyId] = useState(null);
//   const [editCompanyName, setEditCompanyName] = useState("");

//   const [showEditModuleModal, setShowEditModuleModal] = useState(false);
//   const [editModuleId, setEditModuleId] = useState(null);
//   const [editModuleName, setEditModuleName] = useState("");

//   const [showEditMaterialModal, setShowEditMaterialModal] = useState(false);
//   const [editMaterialId, setEditMaterialId] = useState(null);
//   const [editMaterialTitle, setEditMaterialTitle] = useState("");

//   // Fetch companies on mount
//   useEffect(() => {
//     fetchCompanies();
//   }, [fetchCompanies]);

//   // Fetch modules when a company is selected
//   useEffect(() => {
//     if (selectedCompany) {
//       fetchModules(selectedCompany);
//     }
//   }, [selectedCompany, fetchModules]);

//   // Fetch materials when a module is selected
//   useEffect(() => {
//     if (selectedModule) {
//       fetchMaterials(selectedModule);
//     }
//   }, [selectedModule, fetchMaterials]);

//   /** ========== Company CRUD ========== **/
//   const handleCreateCompany = () => {
//     if (!companyName) return toast.error("Please provide a company name");
//     createCompany(companyName).then(() => setCompanyName(""));
//   };

//   // Instead of prompt(), open a small Edit modal:
//   const handleOpenEditCompany = (id, currentName) => {
//     setEditCompanyId(id);
//     setEditCompanyName(currentName);
//     setShowEditCompanyModal(true);
//   };
//   const handleSaveEditCompany = () => {
//     if (!editCompanyName) return toast.error("Name cannot be empty");
//     updateCompany(editCompanyId, editCompanyName).then(() => {
//       setShowEditCompanyModal(false);
//     });
//   };

//   const handleDeleteCompany = (id) => {
//     setConfirmOpen(true);
//     setConfirmMessage("Are you sure you want to delete this company?");
//     setConfirmAction(() => () => {
//       deleteCompany(id);
//       // Clear selections if this was the chosen company
//       if (selectedCompany === id) {
//         setSelectedCompany(null);
//         setSelectedModule(null);
//       }
//     });
//   };

//   /** ========== Module CRUD ========== **/
//   const handleCreateModule = () => {
//     if (!selectedCompany) return toast.error("Select a company first");
//     if (!moduleName) return toast.error("Please provide a module name");
//     createModule(selectedCompany, moduleName).then(() => setModuleName(""));
//   };

//   const handleOpenEditModule = (id, currentName) => {
//     setEditModuleId(id);
//     setEditModuleName(currentName);
//     setShowEditModuleModal(true);
//   };
//   const handleSaveEditModule = () => {
//     if (!editModuleName) return toast.error("Name cannot be empty");
//     updateModule(editModuleId, editModuleName).then(() => {
//       setShowEditModuleModal(false);
//     });
//   };

//   const handleDeleteModule = (id) => {
//     setConfirmOpen(true);
//     setConfirmMessage("Are you sure you want to delete this module?");
//     setConfirmAction(() => () => {
//       deleteModule(id);
//       if (selectedModule === id) {
//         setSelectedModule(null);
//       }
//     });
//   };

//   /** ========== Material CRUD ========== **/
//   const handleCreateMaterial = () => {
//     if (!selectedModule) return toast.error("Select a module first");
//     if (!materialTitle) return toast.error("Please provide a material title");
//     createMaterial({
//       title: materialTitle,
//       type: materialType,
//       moduleId: selectedModule,
//       file: materialFile,
//     }).then(() => {
//       setMaterialTitle("");
//       setMaterialFile(null);
//     });
//   };

//   const handleOpenEditMaterial = (id, currentTitle) => {
//     setEditMaterialId(id);
//     setEditMaterialTitle(currentTitle);
//     setShowEditMaterialModal(true);
//   };
//   const handleSaveEditMaterial = () => {
//     if (!editMaterialTitle) return toast.error("Title cannot be empty");
//     updateMaterial(editMaterialId, { title: editMaterialTitle, type: "pdf" }) // or keep the old type if stored
//       .then(() => {
//         setShowEditMaterialModal(false);
//       });
//   };

//   const handleDeleteMaterial = (id) => {
//     setConfirmOpen(true);
//     setConfirmMessage("Are you sure you want to delete this material?");
//     setConfirmAction(() => () => {
//       deleteMaterial(id);
//     });
//   };

//   /** ========== UI RENDERING ========== **/

//   // Tab definitions with icons
//   const tabs = [
//     { key: "Companies", label: "Companies", icon: <FaBuilding /> },
//     { key: "Modules", label: "Modules", icon: <FaBoxOpen /> },
//     { key: "Materials", label: "Materials", icon: <FaFileAlt /> },
//   ];

//   const renderCompaniesTab = () => (
//     <motion.div
//       key="companies-tab"
//       variants={fadeVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//     >
//       {/* Add new company */}
//       <div className="mb-4 flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="New company name"
//           className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2 transition-colors"
//           onClick={handleCreateCompany}
//         >
//           <FaPlus />
//           <span>Add Company</span>
//         </button>
//       </div>

//       {/* List of companies */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {companies.map((company) => (
//           <div
//             key={company._id}
//             onClick={() => {
//               setSelectedCompany(company._id);
//               setSelectedModule(null);
//             }}
//             className={`p-4 border rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
//               selectedCompany === company._id
//                 ? "bg-blue-50 border-blue-300 dark:bg-gray-700"
//                 : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold text-gray-800 dark:text-gray-100">
//                 {company.name}
//               </h3>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleOpenEditCompany(company._id, company.name);
//                   }}
//                   className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors flex items-center"
//                 >
//                   <FaEdit className="mr-1" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteCompany(company._id);
//                   }}
//                   className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors flex items-center"
//                 >
//                   <FaTrash className="mr-1" />
//                   Del
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );

//   const renderModulesTab = () => {
//     if (!selectedCompany) {
//       return (
//         <motion.div
//           key="modules-empty"
//           variants={fadeVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <p className="text-gray-600 dark:text-gray-300">
//             Please select a Company from the Companies tab.
//           </p>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div
//         key="modules-tab"
//         variants={fadeVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         {/* Add new module */}
//         <div className="mb-4 flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="New module name"
//             className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={moduleName}
//             onChange={(e) => setModuleName(e.target.value)}
//           />
//           <button
//             onClick={handleCreateModule}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2 transition-colors"
//           >
//             <FaPlus />
//             <span>Add Module</span>
//           </button>
//         </div>

//         {/* List of modules */}
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {modules.map((mod) => (
//             <div
//               key={mod._id}
//               onClick={() => setSelectedModule(mod._id)}
//               className={`p-4 border rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
//                 selectedModule === mod._id
//                   ? "bg-blue-50 border-blue-300 dark:bg-gray-700"
//                   : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="font-semibold text-gray-800 dark:text-gray-100">
//                   {mod.name}
//                 </h3>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleOpenEditModule(mod._id, mod.name);
//                     }}
//                     className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors flex items-center"
//                   >
//                     <FaEdit className="mr-1" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteModule(mod._id);
//                     }}
//                     className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors flex items-center"
//                   >
//                     <FaTrash className="mr-1" />
//                     Del
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };

//   const renderMaterialsTab = () => {
//     if (!selectedModule) {
//       return (
//         <motion.div
//           key="materials-empty"
//           variants={fadeVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <p className="text-gray-600 dark:text-gray-300">
//             Please select a Module to view/add Materials.
//           </p>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div
//         key="materials-tab"
//         variants={fadeVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         {/* Create new material */}
//         <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
//           <input
//             type="text"
//             placeholder="Material Title"
//             className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={materialTitle}
//             onChange={(e) => setMaterialTitle(e.target.value)}
//           />
//           <select
//             className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={materialType}
//             onChange={(e) => setMaterialType(e.target.value)}
//           >
//             <option value="pdf">PDF</option>
//             <option value="ppt">PPT</option>
//             <option value="video">Video</option>
//             <option value="image">Image</option>
//           </select>
//           <input
//             type="file"
//             onChange={(e) => setMaterialFile(e.target.files[0])}
//             className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleCreateMaterial}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2 transition-colors"
//           >
//             <FaPlus />
//             <span>Add Material</span>
//           </button>
//         </div>

//         {/* List of materials */}
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {materials.map((mat) => (
//             <div
//               key={mat._id}
//               className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col justify-between"
//             >
//               <div>
//                 <h4 className="font-semibold text-gray-800 dark:text-gray-100">
//                   {mat.title}
//                 </h4>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Type: {mat.type.toUpperCase()}
//                 </p>
//               </div>
//               <div className="mt-2 flex space-x-2">
//                 <button
//                   onClick={() => handleOpenEditMaterial(mat._id, mat.title)}
//                   className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors flex items-center"
//                 >
//                   <FaEdit className="mr-1" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteMaterial(mat._id)}
//                   className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors flex items-center"
//                 >
//                   <FaTrash className="mr-1" />
//                   Del
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="dark:bg-gray-900 dark:text-white min-h-screen px-6 py-8 relative">
//       {loading && <FullScreenLoader />}

//       <h1 className="text-3xl font-bold mb-6">
//         Training Materials - Admin Panel
//       </h1>

//       {/* Tabs Navigation */}
//       <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setCurrentTab(tab.key)}
//             className={`flex items-center space-x-2 px-4 py-2 focus:outline-none transition-colors ${
//               currentTab === tab.key
//                 ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white border-b-2 border-blue-600 dark:border-blue-500 rounded-t"
//                 : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//             }`}
//           >
//             <span>{tab.icon}</span>
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Animated Tab Content */}
//       <AnimatePresence mode="wait">
//         {currentTab === "Companies" && renderCompaniesTab()}
//         {currentTab === "Modules" && renderModulesTab()}
//         {currentTab === "Materials" && renderMaterialsTab()}
//       </AnimatePresence>

//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={confirmOpen}
//         title="Confirmation"
//         message={confirmMessage}
//         onConfirm={() => {
//           confirmAction();
//           setConfirmOpen(false);
//         }}
//         onCancel={() => setConfirmOpen(false)}
//       />

//       {/* Edit Company Modal */}
//       <EditModal
//         isOpen={showEditCompanyModal}
//         entityLabel="Company"
//         value={editCompanyName}
//         onChange={setEditCompanyName}
//         onSave={handleSaveEditCompany}
//         onClose={() => setShowEditCompanyModal(false)}
//       />

//       {/* Edit Module Modal */}
//       <EditModal
//         isOpen={showEditModuleModal}
//         entityLabel="Module"
//         value={editModuleName}
//         onChange={setEditModuleName}
//         onSave={handleSaveEditModule}
//         onClose={() => setShowEditModuleModal(false)}
//       />

//       {/* Edit Material Modal (Title only) */}
//       <EditModal
//         isOpen={showEditMaterialModal}
//         entityLabel="Material Title"
//         value={editMaterialTitle}
//         onChange={setEditMaterialTitle}
//         onSave={handleSaveEditMaterial}
//         onClose={() => setShowEditMaterialModal(false)}
//       />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaBoxOpen,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCog,
  FaUpload,
  FaDownload,
  FaEye,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSave,
  FaChartBar,
  FaUsers,
  FaBook
} from "react-icons/fa";
import {
  HiOfficeBuilding,
  HiCollection,
  HiDocumentText,
  HiPlus,
  HiPencil,
  HiTrash,
  HiX,
  HiCheck,
  HiCog,
  HiSearch,
  HiFilter
} from "react-icons/hi";
import { toast } from "react-hot-toast";

import useTrainingMaterialStore from "../../../store/useTrainingMaterialStore";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";

/**
 * Enhanced fade-in variant for tab content transitions.
 */
const fadeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      type: "spring", 
      stiffness: 100 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95, 
    transition: { duration: 0.3 } 
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  }
};

/**
 * Enhanced modal for editing entities with better styling.
 */
function EditModal({ isOpen, entityLabel, value, onChange, onSave, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit {entityLabel}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <HiX className="text-gray-500 dark:text-gray-400" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {entityLabel} Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${entityLabel.toLowerCase()} name`}
                autoFocus
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <HiCheck className="text-sm" />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminPanelTraining() {
  // Zustand store actions & states
  const {
    companies,
    modules,
    materials,
    loading,
    fetchCompanies,
    fetchModules,
    fetchMaterials,
    createCompany,
    createModule,
    createMaterial,
    updateCompany,
    updateModule,
    updateMaterial,
    deleteCompany,
    deleteModule,
    deleteMaterial,
  } = useTrainingMaterialStore();

  // Current tab: "Companies", "Modules", "Materials"
  const [currentTab, setCurrentTab] = useState("Companies");

  // Track selected Company/Module
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Form fields for creating
  const [companyName, setCompanyName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialType, setMaterialType] = useState("pdf");
  const [materialFile, setMaterialFile] = useState(null);

  // Confirmation dialog for deletes
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});

  // Edit modals states
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [editCompanyName, setEditCompanyName] = useState("");

  const [showEditModuleModal, setShowEditModuleModal] = useState(false);
  const [editModuleId, setEditModuleId] = useState(null);
  const [editModuleName, setEditModuleName] = useState("");

  const [showEditMaterialModal, setShowEditMaterialModal] = useState(false);
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editMaterialTitle, setEditMaterialTitle] = useState("");

  // Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Fetch modules when a company is selected
  useEffect(() => {
    if (selectedCompany) {
      fetchModules(selectedCompany);
    }
  }, [selectedCompany, fetchModules]);

  // Fetch materials when a module is selected
  useEffect(() => {
    if (selectedModule) {
      fetchMaterials(selectedModule);
    }
  }, [selectedModule, fetchMaterials]);

  /** ========== Company CRUD ========== **/
  const handleCreateCompany = () => {
    if (!companyName.trim()) return toast.error("Please provide a company name");
    createCompany(companyName.trim()).then(() => setCompanyName(""));
  };

  const handleOpenEditCompany = (id, currentName) => {
    setEditCompanyId(id);
    setEditCompanyName(currentName);
    setShowEditCompanyModal(true);
  };
  
  const handleSaveEditCompany = () => {
    if (!editCompanyName.trim()) return toast.error("Name cannot be empty");
    updateCompany(editCompanyId, editCompanyName.trim()).then(() => {
      setShowEditCompanyModal(false);
    });
  };

  const handleDeleteCompany = (id) => {
    setConfirmOpen(true);
    setConfirmMessage("Are you sure you want to delete this company? This action cannot be undone.");
    setConfirmAction(() => () => {
      deleteCompany(id);
      if (selectedCompany === id) {
        setSelectedCompany(null);
        setSelectedModule(null);
      }
    });
  };

  /** ========== Module CRUD ========== **/
  const handleCreateModule = () => {
    if (!selectedCompany) return toast.error("Select a company first");
    if (!moduleName.trim()) return toast.error("Please provide a module name");
    createModule(selectedCompany, moduleName.trim()).then(() => setModuleName(""));
  };

  const handleOpenEditModule = (id, currentName) => {
    setEditModuleId(id);
    setEditModuleName(currentName);
    setShowEditModuleModal(true);
  };
  
  const handleSaveEditModule = () => {
    if (!editModuleName.trim()) return toast.error("Name cannot be empty");
    updateModule(editModuleId, editModuleName.trim()).then(() => {
      setShowEditModuleModal(false);
    });
  };

  const handleDeleteModule = (id) => {
    setConfirmOpen(true);
    setConfirmMessage("Are you sure you want to delete this module? This action cannot be undone.");
    setConfirmAction(() => () => {
      deleteModule(id);
      if (selectedModule === id) {
        setSelectedModule(null);
      }
    });
  };

  /** ========== Material CRUD ========== **/
  const handleCreateMaterial = () => {
    if (!selectedModule) return toast.error("Select a module first");
    if (!materialTitle.trim()) return toast.error("Please provide a material title");
    createMaterial({
      title: materialTitle.trim(),
      type: materialType,
      moduleId: selectedModule,
      file: materialFile,
    }).then(() => {
      setMaterialTitle("");
      setMaterialFile(null);
    });
  };

  const handleOpenEditMaterial = (id, currentTitle) => {
    setEditMaterialId(id);
    setEditMaterialTitle(currentTitle);
    setShowEditMaterialModal(true);
  };
  
  const handleSaveEditMaterial = () => {
    if (!editMaterialTitle.trim()) return toast.error("Title cannot be empty");
    updateMaterial(editMaterialId, { title: editMaterialTitle.trim(), type: "pdf" })
      .then(() => {
        setShowEditMaterialModal(false);
      });
  };

  const handleDeleteMaterial = (id) => {
    setConfirmOpen(true);
    setConfirmMessage("Are you sure you want to delete this material? This action cannot be undone.");
    setConfirmAction(() => () => {
      deleteMaterial(id);
    });
  };

  /** ========== UI RENDERING ========== **/

  // Tab definitions with enhanced styling
  const tabs = [
    { 
      key: "Companies", 
      label: "Companies", 
      icon: HiOfficeBuilding, 
      color: "blue",
      count: companies?.length || 0,
      description: "Manage organizations"
    },
    { 
      key: "Modules", 
      label: "Modules", 
      icon: HiCollection, 
      color: "green",
      count: modules?.length || 0,
      description: "Training modules"
    },
    { 
      key: "Materials", 
      label: "Materials", 
      icon: HiDocumentText, 
      color: "purple",
      count: materials?.length || 0,
      description: "Learning resources"
    },
  ];

  // Filter data based on search
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCompaniesTab = () => (
    <motion.div
      key="companies-tab"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 "
    >
      {/* Add new company */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <HiPlus className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add New Training Materials For Department Process Etc
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter company name"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateCompany()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            onClick={handleCreateCompany}
          >
            <HiPlus />
            <span>Add Company</span>
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search companies..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List of companies */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredCompanies.map((company) => (
            <motion.div
              key={company._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              onClick={() => {
                setSelectedCompany(company._id);
                setSelectedModule(null);
                // Auto-navigate to Modules tab after selecting company
                setTimeout(() => setCurrentTab("Modules"), 300);
              }}
              className={`p-6 rounded-2xl shadow-lg border cursor-pointer transition-all duration-200 ${
                selectedCompany === company._id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 ring-2 ring-blue-500"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedCompany === company._id 
                      ? "bg-blue-100 dark:bg-blue-900/30" 
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}>
                    <HiOfficeBuilding className={`text-lg ${
                      selectedCompany === company._id 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-600 dark:text-gray-400"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Organization
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditCompany(company._id, company.name);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <HiPencil />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCompany(company._id);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <HiTrash />
                  <span>Delete</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCompanies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <HiOfficeBuilding className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {searchTerm ? "No companies found" : "No Companies Yet"}
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            {searchTerm ? "Try adjusting your search terms" : "Create your first company to get started"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  const renderModulesTab = () => {
    if (!selectedCompany) {
      return (
        <motion.div
          key="modules-empty"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <HiCollection className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Select a Company First
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Please select a company from the Companies tab to manage its training modules.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTab("Companies")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            Go to Companies
          </motion.button>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="modules-tab"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        {/* Add new module */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <HiPlus className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New Module
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter module name"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateModule()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateModule}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <HiPlus />
              <span>Add Module</span>
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List of modules */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredModules.map((mod) => (
              <motion.div
                key={mod._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                onClick={() => {
                  setSelectedModule(mod._id);
                  // Auto-navigate to Materials tab after selecting module
                  setTimeout(() => setCurrentTab("Materials"), 300);
                }}
                className={`p-6 rounded-2xl shadow-lg border cursor-pointer transition-all duration-200 ${
                  selectedModule === mod._id
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600 ring-2 ring-green-500"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedModule === mod._id 
                        ? "bg-green-100 dark:bg-green-900/30" 
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}>
                      <HiCollection className={`text-lg ${
                        selectedModule === mod._id 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-gray-600 dark:text-gray-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {mod.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Training Module
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModule(mod._id, mod.name);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <HiPencil />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModule(mod._id);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <HiTrash />
                    <span>Delete</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredModules.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <HiCollection className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchTerm ? "No modules found" : "No Modules Yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Create your first training module to get started"}
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderMaterialsTab = () => {
    if (!selectedModule) {
      return (
        <motion.div
          key="materials-empty"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <HiDocumentText className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Select a Module First
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Please select a module from the Modules tab to manage its training materials.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTab("Modules")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            Go to Modules
          </motion.button>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="materials-tab"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        {/* Create new material */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <HiPlus className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New Material
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Material title"
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
            />
            
            <select
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="pdf">PDF Document</option>
              <option value="ppt">PowerPoint</option>
              <option value="video">Video File</option>
              <option value="image">Image File</option>
            </select>
            
            <div className="relative">
              <input
                type="file"
                onChange={(e) => setMaterialFile(e.target.files[0])}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 w-full"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateMaterial}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <HiPlus />
              <span>Add Material</span>
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List of materials */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredMaterials.map((mat) => (
              <motion.div
                key={mat._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <HiDocumentText className="text-purple-600 dark:text-purple-400 text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {mat.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          mat.type === 'pdf' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          mat.type === 'ppt' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                          mat.type === 'video' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {mat.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenEditMaterial(mat._id, mat.title)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <HiPencil />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteMaterial(mat._id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    <HiTrash />
                    <span>Delete</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <HiDocumentText className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchTerm ? "No materials found" : "No Materials Yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Upload your first training material to get started"}
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-2xl"
    >
      {loading && <FullScreenLoader />}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl">
              <HiCog className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Training Admin Panel
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your organization's training materials, modules, and company structure
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.key}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all duration-200 ${
                currentTab === tab.key 
                  ? `ring-2 ring-${tab.color}-500 bg-${tab.color}-50 dark:bg-${tab.color}-900/10` 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setCurrentTab(tab.key)}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-${tab.color}-100 dark:bg-${tab.color}-900/20 rounded-xl`}>
                  <tab.icon className={`text-${tab.color}-600 dark:text-${tab.color}-400 text-2xl`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-lg font-semibold ${
                      currentTab === tab.key 
                        ? `text-${tab.color}-700 dark:text-${tab.color}-300` 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {tab.label}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${tab.color}-100 dark:bg-${tab.color}-900/20 text-${tab.color}-800 dark:text-${tab.color}-300`}>
                      {tab.count}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tab.description}
                  </p>
                </div>
                {currentTab === tab.key && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-3 h-3 bg-${tab.color}-600 rounded-full`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced navigation breadcrumb */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Navigation:</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentTab("Companies")}
                className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                  currentTab === "Companies" 
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Companies
              </motion.button>
              {selectedCompany && (
                <>
                  <span className="text-gray-400">→</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentTab("Modules")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                      currentTab === "Modules" 
                        ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Modules
                  </motion.button>
                </>
              )}
              {selectedModule && (
                <>
                  <span className="text-gray-400">→</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentTab("Materials")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                      currentTab === "Materials" 
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Materials
                  </motion.button>
                </>
              )}
            </div>
            
            {/* Quick action buttons */}
            <div className="flex items-center space-x-2">
              {selectedCompany && selectedModule && (
                <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  Ready to manage materials
                </span>
              )}
              {selectedCompany && !selectedModule && (
                <span className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                  Select a module
                </span>
              )}
              {!selectedCompany && (
                <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                  Select a company
                </span>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-0">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentTab(tab.key)}
                  className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 font-medium transition-all duration-200 relative ${
                    currentTab === tab.key
                      ? `text-${tab.color}-600 dark:text-${tab.color}-400 bg-${tab.color}-50 dark:bg-${tab.color}-900/10`
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <tab.icon className="text-lg" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  
                  {currentTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-${tab.color}-600`}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {currentTab === "Companies" && renderCompaniesTab()}
              {currentTab === "Modules" && renderModulesTab()}
              {currentTab === "Materials" && renderMaterialsTab()}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={confirmOpen}
        title="Confirm Deletion"
        message={confirmMessage}
        onConfirm={() => {
          confirmAction();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Edit Modals */}
      <AnimatePresence>
        {showEditCompanyModal && (
          <EditModal
            isOpen={showEditCompanyModal}
            entityLabel="Company"
            value={editCompanyName}
            onChange={setEditCompanyName}
            onSave={handleSaveEditCompany}
            onClose={() => setShowEditCompanyModal(false)}
          />
        )}

        {showEditModuleModal && (
          <EditModal
            isOpen={showEditModuleModal}
            entityLabel="Module"
            value={editModuleName}
            onChange={setEditModuleName}
            onSave={handleSaveEditModule}
            onClose={() => setShowEditModuleModal(false)}
          />
        )}

        {showEditMaterialModal && (
          <EditModal
            isOpen={showEditMaterialModal}
            entityLabel="Material"
            value={editMaterialTitle}
            onChange={setEditMaterialTitle}
            onSave={handleSaveEditMaterial}
            onClose={() => setShowEditMaterialModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}