// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { FaPlus } from "react-icons/fa";
// import AddNewPolicyModal from "./model/AddNewPolicyModal"; // <-- Import the modal
// // Some dummy policy data
// const DUMMY_POLICIES = [
//   {
//     id: 1,
//     title: "Attendance & Discipline Policy",
//     category: "Attendance",
//     department: "All Department",
//     description: "How Human Maximizing Transforming the Workplace",
//     coverImage:
//       "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
//   },
//   {
//     id: 2,
//     title: "Livekeeping Sales Process Framework",
//     category: "Sales",
//     department: "Live keeping",
//     description: "A quick view of the sales process dashboards",
//     coverImage:
//       "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
//   },
//   {
//     id: 3,
//     title: "Disciplinary Procedures Policy",
//     category: "Disciplinary",
//     department: "All Department",
//     description: "Formal procedures for handling disciplinary matters",
//     coverImage:
//       "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
//   },
//   {
//     id: 4,
//     title: "Attendance & Discipline Policy",
//     category: "Attendance",
//     department: "All Department",
//     description: "How Human Maximizing Transforming the Workplace",
//     coverImage:
//       "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
//   },
// ];

// // Tabs to display at the top
// const TABS = [
//   "All",
//   "Attendance & Discipline Policy",
//   "Leaves",
//   "Disciplinary Procedures",
//   "Posh",
// ];

// export default function CompanyPolicies() {
//   const [policies, setPolicies] = useState(DUMMY_POLICIES);
//   const [selectedTab, setSelectedTab] = useState("All");

//   // Modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Form states for new policy
//   const [roleName, setRoleName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [description, setDescription] = useState("");

//   // Filter logic
//   const filteredPolicies =
//     selectedTab === "All"
//       ? policies
//       : policies.filter(
//           (item) =>
//             item.category === selectedTab ||
//             item.title === selectedTab
//         );

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     clearForm();
//   };

//   const clearForm = () => {
//     setRoleName("");
//     setDepartment("");
//     setCoverImage(null);
//     setDescription("");
//   };

//   // Handler for final "Upload" in modal
//   const handleUpload = () => {
//     // Basic validation
//     if (!roleName || !department) {
//       toast.error("Please fill all required fields!");
//       return;
//     }

//     const newPolicy = {
//       id: policies.length + 1,
//       title: roleName,
//       category:
//         selectedTab !== "All" ? selectedTab : "Attendance & Discipline Policy",
//       department,
//       description,
//       coverImage: coverImage
//         ? URL.createObjectURL(coverImage)
//         : "https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg",
//     };

//     setPolicies([...policies, newPolicy]);
//     toast.success("New policy uploaded!");
//     closeModal();
//   };

//   return (
//     <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Company Policies</h1>
//         <button
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
//                      dark:bg-blue-700 text-white px-4 py-2 rounded-md"
//           onClick={openModal}
//         >
//           <FaPlus />
//           Add New Policies
//         </button>
//       </div>

//       {/* Tab filter buttons */}
//       <div className="flex space-x-4 border-b border-gray-200 
//                       dark:border-gray-700 pb-2 mb-6 overflow-x-auto"
//       >
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             className={`py-1 px-3 whitespace-nowrap focus:outline-none 
//               ${
//                 selectedTab === tab
//                   ? "border-b-2 border-blue-600 dark:border-blue-500 font-semibold"
//                   : "text-gray-600 dark:text-gray-400"
//               }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Policy Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredPolicies.map((policy) => (
//           <div
//             key={policy.id}
//             className="border border-gray-200 dark:border-gray-700 
//               rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
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
//                 {policy.category}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {policy.department}
//               </p>
//               <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                 {policy.description}
//               </p>
//               <button
//                 className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 
//                            text-white px-4 py-2 rounded-md"
//               >
//                 View Policy
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

   
//     </div>
//   );
// }


import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import AddNewPolicyModal from "./model/AddNewPolicyModal";

// Dummy policy data with extra fields
const DUMMY_POLICIES = [
  {
    id: 1,
    title: "Attendance & Discipline Policy",
    category: "Attendance",
    department: "All Departments",
    description: "Comprehensive guidelines on attendance and discipline.",
    coverImage: "https://via.placeholder.com/400x200.png?text=Attendance+Policy",
    pdfUrl: "https://example.com/attendance_policy.pdf",
    effectiveDate: "2023-01-01",
    reviewDate: "2024-01-01",
    policyNumber: "POL-001",
  },
  {
    id: 2,
    title: "Sales Process Framework",
    category: "Sales",
    department: "Sales Department",
    description: "Guidelines for the sales process and customer engagement.",
    coverImage: "https://via.placeholder.com/400x200.png?text=Sales+Policy",
    pdfUrl: "https://example.com/sales_policy.pdf",
    effectiveDate: "2023-02-01",
    reviewDate: "2024-02-01",
    policyNumber: "POL-002",
  },
  {
    id: 3,
    title: "Employee Code of Conduct",
    category: "HR",
    department: "Human Resources",
    description: "Standards of behavior and ethical guidelines for employees.",
    coverImage: "https://via.placeholder.com/400x200.png?text=Code+of+Conduct",
    pdfUrl: "https://example.com/code_of_conduct.pdf",
    effectiveDate: "2023-03-01",
    reviewDate: "2024-03-01",
    policyNumber: "POL-003",
  },
  {
    id: 4,
    title: "IT Security Policy",
    category: "IT",
    department: "IT Department",
    description: "Measures and protocols to ensure data security and privacy.",
    coverImage: "https://via.placeholder.com/400x200.png?text=IT+Security+Policy",
    pdfUrl: "https://example.com/it_security_policy.pdf",
    effectiveDate: "2023-04-01",
    reviewDate: "2024-04-01",
    policyNumber: "POL-004",
  },
];

// Tabs for filtering (feel free to adjust as needed)
const TABS = [
  "All",
  "Attendance",
  "Sales",
  "HR",
  "IT",
];

export default function CompanyPolicies() {
  const [policies, setPolicies] = useState(DUMMY_POLICIES);
  const [selectedTab, setSelectedTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States for new policy form (in the modal)
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyCategory, setPolicyCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");

  // Filter policies based on selected tab (by category)
  const filteredPolicies =
    selectedTab === "All"
      ? policies
      : policies.filter((item) => item.category === selectedTab);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setPolicyTitle("");
    setPolicyCategory("");
    setDepartment("");
    setDescription("");
    setCoverImage(null);
    setPdfFile(null);
    setEffectiveDate("");
    setReviewDate("");
    setPolicyNumber("");
  };

  // Handler for uploading a new policy
  const handleUpload = () => {
    // Validate required fields
    if (!policyTitle || !policyCategory || !department || !pdfFile) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const newPolicy = {
      id: policies.length + 1,
      title: policyTitle,
      category: policyCategory,
      department,
      description,
      coverImage: coverImage
        ? URL.createObjectURL(coverImage)
        : "https://via.placeholder.com/400x200.png?text=Default+Cover",
      pdfUrl: URL.createObjectURL(pdfFile),
      effectiveDate,
      reviewDate,
      policyNumber,
    };

    setPolicies([...policies, newPolicy]);
    toast.success("New policy uploaded successfully!");
    closeModal();
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Policies</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={openModal}
        >
          <FaPlus />
          Add New Policy
        </button>
      </div>

      {/* Tabs for filtering */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
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
            key={policy.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden"
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
              <button
                onClick={() => window.open(policy.pdfUrl, "_blank")}
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                View Policy Document
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Policy */}
      <AddNewPolicyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        policyTitle={policyTitle}
        setPolicyTitle={setPolicyTitle}
        policyCategory={policyCategory}
        setPolicyCategory={setPolicyCategory}
        department={department}
        setDepartment={setDepartment}
        description={description}
        setDescription={setDescription}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        effectiveDate={effectiveDate}
        setEffectiveDate={setEffectiveDate}
        reviewDate={reviewDate}
        setReviewDate={setReviewDate}
        policyNumber={policyNumber}
        setPolicyNumber={setPolicyNumber}
        handleUpload={handleUpload}
      />
    </div>
  );
}
