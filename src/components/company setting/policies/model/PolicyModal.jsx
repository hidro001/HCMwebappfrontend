import React, { useEffect, useState } from "react";
import BaseModal from "../../../common/BaseModal";
import useDepartmentStore from "../../../../store/departmentStore";
import useCategoryStore from "../../../../store/useCategoryStore";
import usePolicyStore from "../../../../store/usePolicyStore";

// Import your loader
import FullScreenLoader from "../../../common/FullScreenLoader";

const PolicyModal = ({ isOpen, onClose, policy }) => {
  // Zustand stores
  const { createPolicy, updatePolicy, loading: storeLoading } = usePolicyStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { categories, fetchCategories } = useCategoryStore();

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");

  // Load departments/categories when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
      fetchCategories();
    }
  }, [isOpen, fetchDepartments, fetchCategories]);

  // Decide if editing or creating
  const isEditMode = Boolean(policy && policy._id);

  // When "policy" changes, populate or clear fields
  useEffect(() => {
    if (policy) {
      // Edit mode => populate fields
      setTitle(policy.title || "");
      setPolicyNumber(policy.policyNumber || "");
      setCategory(policy.category || "");
      setDepartment(policy.department || "");
      setDescription(policy.description || "");
      setEffectiveDate(
        policy.effectiveDate ? policy.effectiveDate.substring(0, 10) : ""
      );
      setReviewDate(
        policy.reviewDate ? policy.reviewDate.substring(0, 10) : ""
      );
      setCoverImage(null);
      setPdfFile(null);
    } else {
      // Add mode => clear fields
      setTitle("");
      setPolicyNumber("");
      setCategory("");
      setDepartment("");
      setDescription("");
      setCoverImage(null);
      setPdfFile(null);
      setEffectiveDate("");
      setReviewDate("");
    }
  }, [policy]);

  if (!isOpen) return null;

  // On form submit, create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      title,
      policyNumber,
      category,
      department,
      description,
      effectiveDate,
      reviewDate,
    };
    if (coverImage) dataToSend.coverImage = coverImage;
    if (pdfFile) dataToSend.pdfFile = pdfFile;

    if (isEditMode) {
      await updatePolicy(policy._id, dataToSend);
    } else {
      await createPolicy(dataToSend);
    }

    onClose();
  };

  return (
    <>
      {/* If the store is loading, show the full-screen loader */}
      {storeLoading && <FullScreenLoader />}

      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg h-[90vh] overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
          "
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            {isEditMode ? "Edit Policy" : "Add New Policy"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Policy Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 
                           rounded px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Policy Number */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Policy Number
              </label>
              <input
                type="text"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 
                           rounded px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 
                           rounded px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            {/* <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full border border-gray-300 dark:border-gray-600 
                           rounded px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100"
              >
                <option value="">Select department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep.department}>
                    {dep.department}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-600 
                           rounded px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100"
              ></textarea>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Cover Image {isEditMode && "(upload new to replace existing)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="w-full text-gray-900 dark:text-gray-100"
              />
              {isEditMode && policy.coverImage && !coverImage && (
                <div className="text-xs text-gray-500 mt-1">
                  Current:{" "}
                  <a href={policy.coverImage} target="_blank" rel="noreferrer">
                    {policy.coverImage}
                  </a>
                </div>
              )}
            </div>

            {/* PDF File */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Policy Document (PDF)
                {isEditMode && " (upload new to replace)"}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="w-full text-gray-900 dark:text-gray-100"
                required={!isEditMode} 
                // only required in create mode
              />
              {isEditMode && policy.pdfUrl && !pdfFile && (
                <div className="text-xs text-gray-500 mt-1">
                  Current PDF:{" "}
                  <a href={policy.pdfUrl} target="_blank" rel="noreferrer">
                    {policy.pdfUrl}
                  </a>
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Effective Date
                </label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 
                             rounded px-3 py-2 bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Review Date
                </label>
                <input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 
                             rounded px-3 py-2 bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 
                           text-gray-700 dark:text-gray-200 
                           rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isEditMode ? "Save Changes" : "Upload Policy"}
              </button>
            </div>
          </form>
        </div>
      </BaseModal>
    </>
  );
};

export default PolicyModal;
