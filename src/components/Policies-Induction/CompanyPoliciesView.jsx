
import React, { useState, useEffect } from "react";
import usePolicyStore from "../../store/usePolicyStore";
import useCategoryStore from "../../store/useCategoryStore";

export default function CompanyPoliciesView() {
  const [selectedTab, setSelectedTab] = useState("All");

  // Fetch policies and categories from Zustand stores
  const { policies, fetchPolicies } = usePolicyStore();
  const { categories, fetchCategories } = useCategoryStore();

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

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
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
            key={policy._id || policy.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
          >
            {policy.coverImage && (
              <img
                src={policy.coverImage}
                alt={policy.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                {policy.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {policy.category}
                 {/* | {policy.department} */}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {policy.description}
              </p>
              {policy.pdfUrl && (
                <div className="mt-4">
                  <button
                    onClick={() => window.open(policy.pdfUrl, "_blank")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    View Policy Document
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
