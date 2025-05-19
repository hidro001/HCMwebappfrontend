import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaBoxOpen,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import useTrainingMaterialStore from "../../../store/useTrainingMaterialStore";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";

/**
 * Simple fade-in variant for tab content transitions.
 */
const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

/**
 * A generic modal for editing a single text field.
 * - `entityLabel`: "Company", "Module", or "Material"
 * - `value`: current value (name/title)
 * - `onChange`: callback to update local state
 * - `onSave`: callback to finalize changes
 * - `onClose`: close the modal without saving
 */
function EditModal({ isOpen, entityLabel, value, onChange, onSave, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 sm:w-96 relative">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          Edit {entityLabel}
        </h2>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 bg-bg-secondary rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
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
    if (!companyName) return toast.error("Please provide a company name");
    createCompany(companyName).then(() => setCompanyName(""));
  };

  // Instead of prompt(), open a small Edit modal:
  const handleOpenEditCompany = (id, currentName) => {
    setEditCompanyId(id);
    setEditCompanyName(currentName);
    setShowEditCompanyModal(true);
  };
  const handleSaveEditCompany = () => {
    if (!editCompanyName) return toast.error("Name cannot be empty");
    updateCompany(editCompanyId, editCompanyName).then(() => {
      setShowEditCompanyModal(false);
    });
  };

  const handleDeleteCompany = (id) => {
    setConfirmOpen(true);
    setConfirmMessage("Are you sure you want to delete this company?");
    setConfirmAction(() => () => {
      deleteCompany(id);
      // Clear selections if this was the chosen company
      if (selectedCompany === id) {
        setSelectedCompany(null);
        setSelectedModule(null);
      }
    });
  };

  /** ========== Module CRUD ========== **/
  const handleCreateModule = () => {
    if (!selectedCompany) return toast.error("Select a company first");
    if (!moduleName) return toast.error("Please provide a module name");
    createModule(selectedCompany, moduleName).then(() => setModuleName(""));
  };

  const handleOpenEditModule = (id, currentName) => {
    setEditModuleId(id);
    setEditModuleName(currentName);
    setShowEditModuleModal(true);
  };
  const handleSaveEditModule = () => {
    if (!editModuleName) return toast.error("Name cannot be empty");
    updateModule(editModuleId, editModuleName).then(() => {
      setShowEditModuleModal(false);
    });
  };

  const handleDeleteModule = (id) => {
    setConfirmOpen(true);
    setConfirmMessage("Are you sure you want to delete this module?");
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
    if (!materialTitle) return toast.error("Please provide a material title");
    createMaterial({
      title: materialTitle,
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
    if (!editMaterialTitle) return toast.error("Title cannot be empty");
    updateMaterial(editMaterialId, { title: editMaterialTitle, type: "pdf" }) // or keep the old type if stored
      .then(() => {
        setShowEditMaterialModal(false);
      });
  };

  const handleDeleteMaterial = (id) => {
    setConfirmOpen(true);
    setConfirmMessage("Are you sure you want to delete this material?");
    setConfirmAction(() => () => {
      deleteMaterial(id);
    });
  };

  /** ========== UI RENDERING ========== **/

  // Tab definitions with icons
  const tabs = [
    { key: "Companies", label: "Companies", icon: <FaBuilding /> },
    { key: "Modules", label: "Modules", icon: <FaBoxOpen /> },
    { key: "Materials", label: "Materials", icon: <FaFileAlt /> },
  ];

  const renderCompaniesTab = () => (
    <motion.div
      key="companies-tab"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Add new company */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="New company name"
          className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2 transition-colors"
          onClick={handleCreateCompany}
        >
          <FaPlus />
          <span>Add Company</span>
        </button>
      </div>

      {/* List of companies */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <div
            key={company._id}
            onClick={() => {
              setSelectedCompany(company._id);
              setSelectedModule(null);
            }}
            className={`p-4 border rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
              selectedCompany === company._id
                ? "bg-blue-50 border-blue-300 dark:bg-gray-700"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {company.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditCompany(company._id, company.name);
                  }}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCompany(company._id);
                  }}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors flex items-center"
                >
                  <FaTrash className="mr-1" />
                  Del
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        >
          <p className="text-gray-600 dark:text-gray-300">
            Please select a Company from the Companies tab.
          </p>
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
      >
        {/* Add new module */}
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="New module name"
            className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
          <button
            onClick={handleCreateModule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2 transition-colors"
          >
            <FaPlus />
            <span>Add Module</span>
          </button>
        </div>

        {/* List of modules */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod._id}
              onClick={() => setSelectedModule(mod._id)}
              className={`p-4 border rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                selectedModule === mod._id
                  ? "bg-blue-50 border-blue-300 dark:bg-gray-700"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  {mod.name}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModule(mod._id, mod.name);
                    }}
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors flex items-center"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModule(mod._id);
                    }}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors flex items-center"
                  >
                    <FaTrash className="mr-1" />
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
        >
          <p className="text-gray-600 dark:text-gray-300">
            Please select a Module to view/add Materials.
          </p>
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
      >
        {/* Create new material */}
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Material Title"
            className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={materialTitle}
            onChange={(e) => setMaterialTitle(e.target.value)}
          />
          <select
            className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="ppt">PPT</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
          </select>
          <input
            type="file"
            onChange={(e) => setMaterialFile(e.target.files[0])}
            className="border dark:border-gray-600 bg-bg-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateMaterial}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center space-x-2 transition-colors"
          >
            <FaPlus />
            <span>Add Material</span>
          </button>
        </div>

        {/* List of materials */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                  {mat.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Type: {mat.type.toUpperCase()}
                </p>
              </div>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleOpenEditMaterial(mat._id, mat.title)}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMaterial(mat._id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors flex items-center"
                >
                  <FaTrash className="mr-1" />
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen px-6 py-8 relative">
      {loading && <FullScreenLoader />}

      <h1 className="text-3xl font-bold mb-6">
        Training Materials - Admin Panel
      </h1>

      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentTab(tab.key)}
            className={`flex items-center space-x-2 px-4 py-2 focus:outline-none transition-colors ${
              currentTab === tab.key
                ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white border-b-2 border-blue-600 dark:border-blue-500 rounded-t"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Animated Tab Content */}
      <AnimatePresence mode="wait">
        {currentTab === "Companies" && renderCompaniesTab()}
        {currentTab === "Modules" && renderModulesTab()}
        {currentTab === "Materials" && renderMaterialsTab()}
      </AnimatePresence>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={confirmOpen}
        title="Confirmation"
        message={confirmMessage}
        onConfirm={() => {
          confirmAction();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* Edit Company Modal */}
      <EditModal
        isOpen={showEditCompanyModal}
        entityLabel="Company"
        value={editCompanyName}
        onChange={setEditCompanyName}
        onSave={handleSaveEditCompany}
        onClose={() => setShowEditCompanyModal(false)}
      />

      {/* Edit Module Modal */}
      <EditModal
        isOpen={showEditModuleModal}
        entityLabel="Module"
        value={editModuleName}
        onChange={setEditModuleName}
        onSave={handleSaveEditModule}
        onClose={() => setShowEditModuleModal(false)}
      />

      {/* Edit Material Modal (Title only) */}
      <EditModal
        isOpen={showEditMaterialModal}
        entityLabel="Material Title"
        value={editMaterialTitle}
        onChange={setEditMaterialTitle}
        onSave={handleSaveEditMaterial}
        onClose={() => setShowEditMaterialModal(false)}
      />
    </div>
  );
}
