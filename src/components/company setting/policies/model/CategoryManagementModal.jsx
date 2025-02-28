


import React, { useState, useEffect } from "react";
import useCategoryStore from "../../../../store/useCategoryStore";
import ConfirmationDialog from "../../../common/ConfirmationDialog"; // Import the custom dialog
import BaseModal from "../../../common/BaseModal"; // Adjust the path as needed

const CategoryManagementModal = ({ isOpen, onClose }) => {
  const { categories, fetchCategories, createCategory, deleteCategory, loading } =
    useCategoryStore();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  if (!isOpen) return null;

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    await createCategory(newCategoryName.trim());
    setNewCategoryName("");
  };

  const confirmDelete = (id) => {
    setSelectedCategoryId(id);
    setConfirmationOpen(true);
  };

  const handleDelete = async () => {
    if (selectedCategoryId) {
      await deleteCategory(selectedCategoryId);
      setConfirmationOpen(false);
      setSelectedCategoryId(null);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Manage Categories
        </h2>
        <form onSubmit={handleAddCategory} className="mb-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Add Category
          </button>
        </form>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-1"
              >
                <span className="text-gray-800 dark:text-gray-100">{cat.name}</span>
                <button
                  onClick={() => confirmDelete(cat._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
      {/* Custom Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category?"
        onConfirm={handleDelete}
        onCancel={() => setConfirmationOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </BaseModal>
  );
};

export default CategoryManagementModal;
