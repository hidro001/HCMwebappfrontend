// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineEye } from "react-icons/ai";
// import useVacancyStore from "../../store/useVacancyStore";
// import FilterPanel from "./FilterPanel";
// import ReferralModal from "./model/ReferralModal";
// import JobDetailsModal from "./model/JobDetailsModal";

// export default function AllVacancies() {
//   const {
//     vacancies: storeVacancies,
//     loading,
//     error,
//     fetchAllVacancies,
//   } = useVacancyStore();

//   const [vacanciesData, setVacanciesData] = useState([]);

//   useEffect(() => {
//     fetchAllVacancies();
//   }, [fetchAllVacancies]);

//   useEffect(() => {
//     if (!loading && storeVacancies?.length) {
//       const transformed = storeVacancies.map((job) => ({
//         id: job._id,
//         title: job.jobTitle || "Untitled",
//         location:
//           job.jobLocations && job.jobLocations.length
//             ? job.jobLocations[0]
//             : "Remote",
//         department: job.jobDepartment || "Development",
//         salary: job.salary || 0,
//         status: mapStatus(job.vacancyStatus),
//         publication: new Date(job.createdAt).toDateString(),
//         positionType: job.jobTitle || "UX/UI Designer",
//         workExperience: job.workExperience || "Any Experience",
//         description: job.jobDescription || "No description provided",
//       }));
//       setVacanciesData(transformed);
//     } else if (!loading && storeVacancies?.length === 0) {
//       setVacanciesData([]);
//     }
//   }, [storeVacancies, loading]);

//   function mapStatus(backendStatus = "") {
//     const s = backendStatus.toLowerCase();
//     if (s === "open") return "OPEN";
//     if (s === "closed") return "COMPLETED";
//     if (s === "in progress") return "IN PROGRESS";
//     return "OPEN";
//   }

//   const [selectedTab, setSelectedTab] = useState("ALL");
//   const [filters, setFilters] = useState({
//     department: "All Department",
//     positionType: "All Positions",
//     workExperience: "Any Experience",
//     location: "Any Location",
//   });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isReferModalOpen, setIsReferModalOpen] = useState(false);
//   const [selectedVacancy, setSelectedVacancy] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   const handleFilterClick = (type, value) => {
//     setFilters((prev) => ({ ...prev, [type]: value }));
//     toast.success(`Filter updated: ${type} -> ${value}`);
//   };

//   const handleClearAll = () => {
//     setFilters({
//       department: "All Department",
//       positionType: "All Positions",
//       workExperience: "Any Experience",
//       location: "Any Location",
//     });
//     toast.success("All filters cleared!");
//   };

//   const handleOpenReferModal = (vacancy) => {
//     setSelectedVacancy(vacancy);
//     setIsReferModalOpen(true);
//   };

//   const handleCloseReferModal = () => {
//     setSelectedVacancy(null);
//     setIsReferModalOpen(false);
//   };

//   const handleOpenDetailsModal = (vacancy) => {
//     setSelectedVacancy(vacancy);
//     setIsDetailsModalOpen(true);
//   };

//   const handleCloseDetailsModal = () => {
//     setSelectedVacancy(null);
//     setIsDetailsModalOpen(false);
//   };

//   const filteredVacancies = vacanciesData.filter((vac) => {
//     if (selectedTab === "OPEN" && vac.status !== "OPEN") return false;
//     if (selectedTab === "COMPLETED" && vac.status !== "COMPLETED") return false;
//     if (selectedTab === "IN PROGRESS" && vac.status !== "IN PROGRESS") return false;
//     if (filters.department !== "All Department" && vac.department !== filters.department) {
//       return false;
//     }
//     if (filters.positionType !== "All Positions" && vac.positionType !== filters.positionType) {
//       return false;
//     }
//     if (
//       filters.workExperience !== "Any Experience" &&
//       vac.workExperience !== filters.workExperience
//     ) {
//       return false;
//     }
//     if (
//       filters.location !== "Any Location" &&
//       !vac.location.toLowerCase().includes(filters.location.toLowerCase())
//     ) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
//       <div className="mx-auto px-4 py-4 max-w-full">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b dark:border-gray-700 gap-2">
//           <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
       
//         </div>
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           <div className="flex space-x-2 overflow-x-auto">
//             {["ALL", "OPEN", "COMPLETED", "IN PROGRESS"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedTab(tab)}
//                 className={`px-4 py-2 rounded-full border whitespace-nowrap transition
//                   ${
//                     selectedTab === tab
//                       ? "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800"
//                       : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
//                   }
//                 `}
//               >
//                 {tab === "ALL"
//                   ? "All Vacancies"
//                   : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 2xl:hidden"
//           >
//             Show Filter
//           </button>
//         </div>
//         {error && (
//           <div className="bg-red-100 text-red-800 p-3 mt-4 rounded">{error}</div>
//         )}
//         {loading ? (
//           <div className="p-6 text-center text-gray-500 dark:text-gray-400">
//             Loading vacancies...
//           </div>
//         ) : (
//           <div className="flex flex-col 2xl:flex-row gap-4 py-4">
//             <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
//               <div className="overflow-x-auto w-full">
//                 <table className="min-w-full table-auto">
//                   <thead>
//                     <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
//                       <th className="px-6 py-3 font-semibold">Position Title</th>
//                       <th className="px-6 py-3 font-semibold">Location</th>
//                       <th className="px-6 py-3 font-semibold">Department</th>
//                       <th className="px-6 py-3 font-semibold">Salary</th>
//                       <th className="px-6 py-3 font-semibold">Status</th>
//                       <th className="px-6 py-3 font-semibold">Publication</th>
//                       <th className="px-6 py-3 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredVacancies.map((vacancy) => (
//                       <tr
//                         key={vacancy.id}
//                         className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap font-medium">
//                           {vacancy.title}
//                         </td>
//                         <td className="px-6 py-4">{vacancy.location}</td>
//                         <td className="px-6 py-4">{vacancy.department}</td>
//                         <td className="px-6 py-4">
//                           ${vacancy.salary.toLocaleString()}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`text-xs font-medium px-2 py-1 rounded
//                               ${
//                                 vacancy.status === "OPEN"
//                                   ? "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800"
//                                   : vacancy.status === "COMPLETED"
//                                   ? "bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800"
//                                   : "bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800"
//                               }
//                             `}
//                           >
//                             {vacancy.vacancyStatus}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">{vacancy.publication}</td>
//                         <td className="px-6 py-4 text-right flex items-center justify-end space-x-2">
//                           <button
//                             onClick={() => handleOpenDetailsModal(vacancy)}
//                             className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
//                             title="View Job Details"
//                           >
//                             <AiOutlineEye size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleOpenReferModal(vacancy)}
//                             className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
//                           >
//                             Refer
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
//                 <div>
//                   Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
//                 </div>
//                 <div className="flex space-x-3">
//                   <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                     &lt;
//                   </button>
//                   <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
//                     &gt;
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="hidden 2xl:block 2xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//               <FilterPanel
//                 filters={filters}
//                 handleFilterClick={handleFilterClick}
//                 handleClearAll={handleClearAll}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
//           isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         } 2xl:hidden`}
//         onClick={() => setIsFilterOpen(false)}
//       />
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
//           ${isFilterOpen ? "translate-x-0" : "translate-x-full"}
//           2xl:hidden
//         `}
//       >
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//           <h2 className="font-semibold text-lg">Vacancies Filter</h2>
//           <button
//             onClick={() => setIsFilterOpen(false)}
//             className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
//           >
//             Close
//           </button>
//         </div>
//         <div className="p-4 overflow-y-auto h-full">
//           <FilterPanel
//             filters={filters}
//             handleFilterClick={handleFilterClick}
//             handleClearAll={handleClearAll}
//           />
//         </div>
//       </div>
//       <ReferralModal
//         isOpen={isReferModalOpen}
//         onClose={handleCloseReferModal}
//         vacancy={selectedVacancy}
//       />
//       <JobDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={handleCloseDetailsModal}
//         vacancy={selectedVacancy}
//       />
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import useVacancyStore from "../../store/useVacancyStore";
import FilterPanel from "./FilterPanel";
import ReferralModal from "./model/ReferralModal";
import JobDetailsModal from "./model/JobDetailsModal";

export default function AllVacancies() {
  const {
    vacancies: storeVacancies,
    loading,
    error,
    fetchAllVacancies,
  } = useVacancyStore();

  const [vacanciesData, setVacanciesData] = useState([]);

  // Fetch vacancies when the component mounts.
  useEffect(() => {
    fetchAllVacancies();
  }, [fetchAllVacancies]);

  // Transform the API response data to the structure our UI expects.
  useEffect(() => {
    if (!loading && storeVacancies?.length) {
      const transformed = storeVacancies.map((job) => ({
        id: job._id,
        title: job.jobTitle || "Untitled",
        location:
          job.jobLocations && job.jobLocations.length
            ? job.jobLocations[0]
            : "Remote",
        department: job.jobDepartment || "Development",
        salary: job.salary || 0,
        currency: job.currency || "INR",
        status: mapStatus(job.vacancyStatus),
        publication: new Date(job.createdAt).toDateString(),
        positionType:
          job.employmentType && job.employmentType.length
            ? job.employmentType[0]
            : "Full Time",
        workExperience: job.workExperience || "Any Experience",
        description: job.jobDescription || "No description provided",
      }));
      setVacanciesData(transformed);
    } else if (!loading && storeVacancies?.length === 0) {
      setVacanciesData([]);
    }
  }, [storeVacancies, loading]);

  // Map the API's vacancyStatus to our UI status values.
  function mapStatus(backendStatus = "") {
    const s = backendStatus.toLowerCase();
    if (s === "open") return "OPEN";
    if (s === "closed") return "COMPLETED";
    if (s === "draft") return "DRAFT";
    return "OPEN";
  }

  const [selectedTab, setSelectedTab] = useState("ALL");
  const [filters, setFilters] = useState({
    department: "All Department",
    positionType: "All Positions",
    workExperience: "Any Experience",
    location: "Any Location",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleFilterClick = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    toast.success(`Filter updated: ${type} -> ${value}`);
  };

  const handleClearAll = () => {
    setFilters({
      department: "All Department",
      positionType: "All Positions",
      workExperience: "Any Experience",
      location: "Any Location",
    });
    toast.success("All filters cleared!");
  };

  const handleOpenReferModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsReferModalOpen(true);
  };

  const handleCloseReferModal = () => {
    setSelectedVacancy(null);
    setIsReferModalOpen(false);
  };

  const handleOpenDetailsModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedVacancy(null);
    setIsDetailsModalOpen(false);
  };

  // Filter vacancies based on the selected tab and filter values.
  const filteredVacancies = vacanciesData.filter((vac) => {
    if (selectedTab === "OPEN" && vac.status !== "OPEN") return false;
    if (selectedTab === "COMPLETED" && vac.status !== "COMPLETED") return false;
    if (selectedTab === "DRAFT" && vac.status !== "DRAFT") return false;
    if (filters.department !== "All Department" && vac.department !== filters.department)
      return false;
    if (filters.positionType !== "All Positions" && vac.positionType !== filters.positionType)
      return false;
    if (
      filters.workExperience !== "Any Experience" &&
      vac.workExperience !== filters.workExperience
    )
      return false;
    if (
      filters.location !== "Any Location" &&
      !vac.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    return true;
  });

  // Helper function to format salary with the correct currency symbol
  const formatSalary = (salary, currency) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 ">
      <div className="mx-auto px-4 py-4 max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b dark:border-gray-700 gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
        </div>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto">
            {["ALL", "OPEN", "COMPLETED", "DRAFT"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full border whitespace-nowrap transition
                  ${
                    selectedTab === tab
                      ? "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {tab === "ALL"
                  ? "All Vacancies"
                  : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 2xl:hidden"
          >
            Show Filter
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-800 p-3 mt-4 rounded">{error}</div>
        )}
        {loading ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Loading vacancies...
          </div>
        ) : (
          <div className="flex flex-col 2xl:flex-row gap-4 py-4">
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
                      <th className="px-6 py-3 font-semibold">Position Title</th>
                      <th className="px-6 py-3 font-semibold">Location</th>
                      <th className="px-6 py-3 font-semibold">Department</th>
                      <th className="px-6 py-3 font-semibold">Salary</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Publication</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVacancies.map((vacancy) => (
                      <tr
                        key={vacancy.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {vacancy.title}
                        </td>
                        <td className="px-6 py-4">{vacancy.location}</td>
                        <td className="px-6 py-4">{vacancy.department}</td>
                        <td className="px-6 py-4">
                          {formatSalary(vacancy.salary, vacancy.currency)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded
                              ${
                                vacancy.status === "OPEN"
                                  ? "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800"
                                  : vacancy.status === "COMPLETED"
                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800"
                                  : vacancy.status === "DRAFT"
                                  ? "bg-gray-100 text-gray-700 dark:bg-gray-200 dark:text-gray-800"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800"
                              }
                            `}
                          >
                            {vacancy.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {vacancy.publication}
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenDetailsModal(vacancy)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                            title="View Job Details"
                          >
                            <AiOutlineEye size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenReferModal(vacancy)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Refer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
                <div>
                  Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
                </div>
                <div className="flex space-x-3">
                  <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                    &lt;
                  </button>
                  <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden 2xl:block 2xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <FilterPanel
                filters={filters}
                handleFilterClick={handleFilterClick}
                handleClearAll={handleClearAll}
              />
            </div>
          </div>
        )}
      </div>
      {/* Mobile Filter Panel Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } 2xl:hidden`}
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
          ${isFilterOpen ? "translate-x-0" : "translate-x-full"}
          2xl:hidden
        `}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="font-semibold text-lg">Vacancies Filter</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-y-auto ">
          <FilterPanel
            filters={filters}
            handleFilterClick={handleFilterClick}
            handleClearAll={handleClearAll}
          />
        </div>
      </div>
      <ReferralModal
        isOpen={isReferModalOpen}
        onClose={handleCloseReferModal}
        vacancy={selectedVacancy}
      />
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        vacancy={selectedVacancy}
      />
    </div>
  );
}
