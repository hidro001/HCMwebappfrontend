// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import AddNewPolicyModal from "./model/AddNewPolicyModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import usePolicyStore from "../../../store/usePolicyStore";
// import useCategoryStore from "../../../store/useCategoryStore"; // For dynamic categories
// import CategoryManagementModal from "./model/CategoryManagementModal"; // Modal for managing categories

// export default function CompanyPolicies() {
//   // Local state for the new policy form in the modal
//   const [policyTitle, setPolicyTitle] = useState("");
//   const [policyCategory, setPolicyCategory] = useState("");
//   const [department, setDepartment] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [effectiveDate, setEffectiveDate] = useState("");
//   const [reviewDate, setReviewDate] = useState("");
//   const [policyNumber, setPolicyNumber] = useState("");

//   // UI state for modals, tab selection, and deletion confirmation dialogs
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("All");
//   const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
//   const [policyToDelete, setPolicyToDelete] = useState(null);

//   // Use the Zustand store for policies
//   const { policies, fetchPolicies, createPolicy, deletePolicy, loading } = usePolicyStore();

//   // Use the category store for dynamic categories
//   const { categories, fetchCategories, loading: catLoading } = useCategoryStore();

//   useEffect(() => {
//     fetchPolicies();
//     fetchCategories();
//   }, []);

//   // Build dynamic TABS: Prepend "All" to the list of category names.
//   const dynamicTabs = ["All", ...categories.map((cat) => cat.name)];

//   // Filter policies by the selected category
//   const filteredPolicies =
//     selectedTab === "All"
//       ? policies
//       : policies.filter((item) => item.category === selectedTab);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     clearForm();
//   };

//   const clearForm = () => {
//     setPolicyTitle("");
//     setPolicyCategory("");
//     setDepartment("");
//     setDescription("");
//     setCoverImage(null);
//     setPdfFile(null);
//     setEffectiveDate("");
//     setReviewDate("");
//     setPolicyNumber("");
//   };

//   // Prepare the data and call the store's createPolicy function
//   const handlePolicyUpload = async () => {
//     if (!policyTitle || !policyCategory || !department || !pdfFile) {
//       toast.error("Please fill in all required fields!");
//       return;
//     }

//     const policyData = {
//       title: policyTitle,
//       policyNumber,
//       category: policyCategory,
//       department,
//       description,
//       effectiveDate,
//       reviewDate,
//       coverImage, // This should be a File object (if provided)
//       pdfFile,    // This is required and should be a File object
//     };

//     await createPolicy(policyData);
//     closeModal();
//   };

//   // New: Delete confirmation dialog handlers
//   const onDeletePolicy = (policy) => {
//     setPolicyToDelete(policy);
//     setDeleteConfirmDialogOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (policyToDelete) {
//       await deletePolicy(policyToDelete._id || policyToDelete.id);
//       setPolicyToDelete(null);
//       setDeleteConfirmDialogOpen(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setPolicyToDelete(null);
//     setDeleteConfirmDialogOpen(false);
//   };

//   return (
//     <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Company Policies</h1>
//         <div className="flex gap-4">
//           <button
//             className="flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 text-white px-4 py-2 rounded-md"
//             onClick={() => setIsCategoryModalOpen(true)}
//           >
//             <FaPlus />
//             Manage Categories
//           </button>
//           <button
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 text-white px-4 py-2 rounded-md"
//             onClick={openModal}
//           >
//             <FaPlus />
//             Add New Policy
//           </button>
//         </div>
//       </div>

//       {/* Tabs for filtering */}
//       <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
//         {dynamicTabs.map((tab) => (
//           <button
//             key={tab}
//             className={`py-1 px-3 whitespace-nowrap focus:outline-none ${
//               selectedTab === tab
//                 ? "border-b-2 border-blue-600 dark:border-blue-500 font-semibold"
//                 : "text-gray-600 dark:text-gray-400"
//             }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Policy Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredPolicies.map((policy) => (
//           <div
//             key={policy._id || policy.id}
//             className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
//           >
//             <img
//               src={policy.coverImage}
//               alt={policy.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//                 {policy.title}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {policy.category} | {policy.department}
//               </p>
//               <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                 {policy.description}
//               </p>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => window.open(policy.pdfUrl, "_blank")}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//                 >
//                   View Policy Document
//                 </button>
//                 <button
//                   onClick={() => onDeletePolicy(policy)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
//                 >
//                   <FaTrash />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Adding New Policy */}
//       <AddNewPolicyModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         policyTitle={policyTitle}
//         setPolicyTitle={setPolicyTitle}
//         policyCategory={policyCategory}
//         setPolicyCategory={setPolicyCategory}
//         department={department}
//         setDepartment={setDepartment}
//         description={description}
//         setDescription={setDescription}
//         coverImage={coverImage}
//         setCoverImage={setCoverImage}
//         pdfFile={pdfFile}
//         setPdfFile={setPdfFile}
//         effectiveDate={effectiveDate}
//         setEffectiveDate={setEffectiveDate}
//         reviewDate={reviewDate}
//         setReviewDate={setReviewDate}
//         policyNumber={policyNumber}
//         setPolicyNumber={setPolicyNumber}
//         handleUpload={handlePolicyUpload} // Directly call upload without confirmation
//       />

//       {/* Confirmation Dialog for Delete */}
//       <ConfirmationDialog
//         open={deleteConfirmDialogOpen}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this policy?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Yes, Delete"
//         cancelText="Cancel"
//       />

//       {/* Modal for Managing Categories */}
//       <CategoryManagementModal
//         isOpen={isCategoryModalOpen}
//         onClose={() => setIsCategoryModalOpen(false)}
//       />
//     </div>
//   );
// }



// src/components/CompanyPolicies.jsx

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import usePolicyStore from "../../../store/usePolicyStore";
import useCategoryStore from "../../../store/useCategoryStore";
import PolicyModal from "./model/PolicyModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import CategoryManagementModal from "./model/CategoryManagementModal";

export default function CompanyPolicies() {
  // Zustand store hooks
  const { policies, fetchPolicies, deletePolicy, loading } = usePolicyStore();
  const { categories, fetchCategories } = useCategoryStore();

  // For controlling which tab is active (All, or a specific category)
  const [selectedTab, setSelectedTab] = useState("All");

  // For showing/hiding the PolicyModal & whether in "create" or "edit" mode
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyForEdit, setPolicyForEdit] = useState(null);

  // For the delete confirmation dialog
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);

  // For Category Management Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    fetchPolicies();
    fetchCategories();
  }, [fetchPolicies, fetchCategories]);

  // Build dynamic TABS: Prepend "All" to the list of category names.
  const dynamicTabs = ["All", ...categories.map((cat) => cat.name)];

  // Filter policies by the selected category
  const filteredPolicies =
    selectedTab === "All"
      ? policies
      : policies.filter((item) => item.category === selectedTab);

  // ----------- CREATE / EDIT MODAL -----------
  // "Add New Policy" button => open the modal in "create" mode
  const handleOpenCreatePolicy = () => {
    setPolicyForEdit(null); // no policy => new
    setIsPolicyModalOpen(true);
  };

  // "Edit" button on card => open the modal in "edit" mode
  const handleOpenEditPolicy = (policy) => {
    setPolicyForEdit(policy);
    setIsPolicyModalOpen(true);
  };

  // Close the policy modal
  const handleClosePolicyModal = () => {
    setIsPolicyModalOpen(false);
    setPolicyForEdit(null);
  };

  // ----------- DELETE CONFIRMATION -----------
  const onDeletePolicy = (policy) => {
    setPolicyToDelete(policy);
    setDeleteConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (policyToDelete) {
      await deletePolicy(policyToDelete._id);
      setPolicyToDelete(null);
      setDeleteConfirmDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setPolicyToDelete(null);
    setDeleteConfirmDialogOpen(false);
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Policies</h1>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 
                       dark:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <FaPlus />
            Manage Categories
          </button>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                       dark:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleOpenCreatePolicy}
          >
            <FaPlus />
            Add New Policy
          </button>
        </div>
      </div>

      {/* Tabs for filtering */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
        {dynamicTabs.map((tab) => (
          <button
            key={tab}
            className={`py-1 px-3 whitespace-nowrap focus:outline-none ${
              selectedTab === tab
                ? "border-b-2 border-blue-600 dark:border-blue-500 font-semibold"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <div
            key={policy._id}
            className="border border-gray-200 dark:border-gray-700 
                       rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
          >
            <img
              src={policy.coverImage}
              alt={policy.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                {policy.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {policy.category} | {policy.department}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {policy.description}
              </p>

              <div className="flex items-center gap-2 justify-between mt-4">
                {/* View Policy */}
                <button
                  onClick={() => window.open(policy.pdfUrl, "_blank")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 
                             rounded-md"
                >
                  View
                </button>

                {/* EDIT Button (In Red) */}
                <button
                  onClick={() => handleOpenEditPolicy(policy)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 
                             rounded-md flex items-center gap-1"
                >
                  <FaEdit />
                  Edit
                </button>

                {/* DELETE Button */}
                <button
                  onClick={() => onDeletePolicy(policy)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 
                             rounded-md flex items-center gap-1"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding/Editing Policy */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={handleClosePolicyModal}
        policy={policyForEdit} // if null => "create mode"; if not null => "edit mode"
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={deleteConfirmDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this policy?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Modal for Managing Categories */}
      <CategoryManagementModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
}
