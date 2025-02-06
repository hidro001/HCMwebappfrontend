import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import AddNewPolicyModal from "./model/AddNewPolicyModal"; // <-- Import the modal
// Some dummy policy data
const DUMMY_POLICIES = [
  {
    id: 1,
    title: "Attendance & Discipline Policy",
    category: "Attendance",
    department: "All Department",
    description: "How Human Maximizing Transforming the Workplace",
    coverImage:
      "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
  },
  {
    id: 2,
    title: "Livekeeping Sales Process Framework",
    category: "Sales",
    department: "Live keeping",
    description: "A quick view of the sales process dashboards",
    coverImage:
      "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
  },
  {
    id: 3,
    title: "Disciplinary Procedures Policy",
    category: "Disciplinary",
    department: "All Department",
    description: "Formal procedures for handling disciplinary matters",
    coverImage:
      "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
  },
  {
    id: 4,
    title: "Attendance & Discipline Policy",
    category: "Attendance",
    department: "All Department",
    description: "How Human Maximizing Transforming the Workplace",
    coverImage:
      "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
  },
];

// Tabs to display at the top
const TABS = [
  "All",
  "Attendance & Discipline Policy",
  "Leaves",
  "Disciplinary Procedures",
  "Posh",
];

export default function CompanyPolicies() {
  const [policies, setPolicies] = useState(DUMMY_POLICIES);
  const [selectedTab, setSelectedTab] = useState("All");

  // Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for new policy
  const [roleName, setRoleName] = useState("");
  const [department, setDepartment] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState("");

  // Filter logic
  const filteredPolicies =
    selectedTab === "All"
      ? policies
      : policies.filter(
          (item) =>
            item.category === selectedTab ||
            item.title === selectedTab
        );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setRoleName("");
    setDepartment("");
    setCoverImage(null);
    setDescription("");
  };

  // Handler for final "Upload" in modal
  const handleUpload = () => {
    // Basic validation
    if (!roleName || !department) {
      toast.error("Please fill all required fields!");
      return;
    }

    const newPolicy = {
      id: policies.length + 1,
      title: roleName,
      category:
        selectedTab !== "All" ? selectedTab : "Attendance & Discipline Policy",
      department,
      description,
      coverImage: coverImage
        ? URL.createObjectURL(coverImage)
        : "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
    };

    setPolicies([...policies, newPolicy]);
    toast.success("New policy uploaded!");
    closeModal();
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Policies</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                     dark:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={openModal}
        >
          <FaPlus />
          Add New Policies
        </button>
      </div>

      {/* Tab filter buttons */}
      <div className="flex space-x-4 border-b border-gray-200 
                      dark:border-gray-700 pb-2 mb-6 overflow-x-auto"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`py-1 px-3 whitespace-nowrap focus:outline-none 
              ${
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

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
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
                {policy.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {policy.department}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {policy.description}
              </p>
              <button
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 
                           text-white px-4 py-2 rounded-md"
              >
                View Policy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (separate component) */}
      <AddNewPolicyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        roleName={roleName}
        setRoleName={setRoleName}
        department={department}
        setDepartment={setDepartment}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        description={description}
        setDescription={setDescription}
        handleUpload={handleUpload}
      />
    </div>
  );
}
