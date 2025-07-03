


// import { useEffect, useMemo, useState } from "react";
// import useBreakSettingsStore from "../../../store/breakSettingsStore.";

// export default function UsageCategorizer() {
//   /* =====================  ZUSTAND  ==================== */
//   const {
//     /* lists */
//     uniqueApps,
//     uniqueWebsites,
//     loading,

//     /* actions */
//     fetchUniqueUsage,
//     fetchDepartments,
//     fetchDeptCategories,
//     saveDeptCategories,

//     /* current dept tags */
//     deptCategories,
//   } = useBreakSettingsStore();

//   /* =====================  LOCAL STATE  ================= */
//   const [departments, setDepartments] = useState([]);
//   const [selectedDept, setSelectedDept] = useState("");
//   const [ratings, setRatings] = useState({}); // { itemName: "productive" }

//   /* ---------- load dept list once ---------- */
//   useEffect(() => {
//     fetchDepartments()
//       .then(setDepartments)
//       .catch(() => setDepartments([]));
//   }, []);

//   /* ---------- when dept changes: load tags & usage lists ---------- */
//   // useEffect(() => {
//   //   if (!selectedDept) {
//   //     setRatings({});
//   //     return;
//   //   }

//   //   // parallel fetch
//   //   Promise.all([
//   //     fetchUniqueUsage(),          // populates uniqueApps / uniqueWebsites
//   //     fetchDeptCategories(selectedDept), // populates deptCategories
//   //   ]).then(() => {
//   //     /* merge: if item has saved tag use it, else "unrated" */
//   //     const current = {};

//   //     [...uniqueApps, ...uniqueWebsites].forEach((item) => {
//   //       const tag =
//   //         deptCategories.productive.find((d) => d.name === item)?.category ||
//   //         deptCategories.unproductive.find((d) => d.name === item)?.category ||
//   //         deptCategories.unrated.find((d) => d.name === item)?.category ||
//   //         "unrated";
//   //       current[item] = tag;
//   //     });
//   //     setRatings(current);
//   //   });
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [selectedDept]);


//   // useEffect(() => {
//   //   if (!selectedDept) {
//   //     setRatings({});
//   //     return;
//   //   }
  
//   //   Promise.all([
//   //     fetchUniqueUsage(),
//   //     fetchDeptCategories(selectedDept),
//   //   ]).then(() => {
//   //     const { uniqueApps, uniqueWebsites, deptCategories } = useBreakSettingsStore.getState();
  
//   //     const current = {};
  
//   //     [...uniqueApps, ...uniqueWebsites].forEach((item) => {
//   //       const tag =
//   //         deptCategories.productive.find((d) => d.name === item)?.category ||
//   //         deptCategories.unproductive.find((d) => d.name === item)?.category ||
//   //         deptCategories.unrated.find((d) => d.name === item)?.category ||
//   //         "unrated";
//   //       current[item] = tag;
//   //     });
  
//   //     setRatings(current);
//   //   });
//   // }, [selectedDept]);


//   const isValidItem = (name) => {
//     const fileExtensionPattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp|pdf|docx?|xlsx?|pptx?)$/i;
//     const untitledPattern = /untitled/i;
//     const morePagesPattern = /and \s*\d+\s*more pages/i;
//     const googleSearchPattern = /-?\s?google search$/i;
  
//     return (
//       !fileExtensionPattern.test(name) &&
//       !untitledPattern.test(name) &&
//       !morePagesPattern.test(name) &&
//       !googleSearchPattern.test(name)
//     );
//   };
  
//   useEffect(() => {
//     if (!selectedDept) {
//       setRatings({});
//       return;
//     }
  
//     Promise.all([
//       fetchUniqueUsage(),
//       fetchDeptCategories(selectedDept),
//     ]).then(() => {
//       const { uniqueApps, uniqueWebsites, deptCategories } = useBreakSettingsStore.getState();
  
//       const filteredWebsites = uniqueWebsites.filter(isValidItem);
//       const filteredApps = uniqueApps.filter(isValidItem);
  
//       const current = {};
  
//       [...filteredApps, ...filteredWebsites].forEach((item) => {
//         const tag =
//           deptCategories.productive.find((d) => d.name === item)?.category ||
//           deptCategories.unproductive.find((d) => d.name === item)?.category ||
//           deptCategories.unrated.find((d) => d.name === item)?.category ||
//           "unrated";
//         current[item] = tag;
//       });
  
//       setRatings(current);
//     });
//   }, [selectedDept, fetchUniqueUsage, fetchDeptCategories]); // added dependencies explicitly
  
  
  
  
  
//   /* ---------- dropdown helper ---------- */
//   const Dropdown = ({ item }) => (
//     <select
//       className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
//       value={ratings[item] || "unrated"}
//       onChange={(e) =>
//         setRatings((prev) => ({ ...prev, [item]: e.target.value }))
//       }
//     >
//       <option value="productive">Productive</option>
//       <option value="unproductive">Unproductive</option>
//       <option value="unrated">Unrated</option>
//     </select>
//   );

//   /* ---------- detect unsaved changes ---------- */
//   const hasChanges = useMemo(() => {
//     const current = {};
//     [...deptCategories.productive,
//       ...deptCategories.unproductive,
//       ...deptCategories.unrated].forEach((d) => {
//       current[d.name] = d.category;
//     });
//     return Object.entries(ratings).some(
//       ([k, v]) => (current[k] || "unrated") !== v
//     );
//   }, [ratings, deptCategories]);

//   /* =====================  RENDER  ===================== */
//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//         Usage Productivity Categorizer
//       </h2>

//       {/* Department Picker */}
//       <div className="mb-6 flex flex-wrap items-center gap-2">
//         <label className="text-gray-700 dark:text-gray-300">Department:</label>
//         <select
//           className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
//           value={selectedDept}
//           onChange={(e) => setSelectedDept(e.target.value)}
//         >
//           <option value="">-- Select --</option>
//           {departments.map((d) => (
//             <option key={d._id} value={d.department}>
//               {d.department.trim()}
//             </option>
//           ))}
//         </select>
//         {selectedDept && (
//           <button
//             disabled={loading || !hasChanges}
//             onClick={() => saveDeptCategories(selectedDept, ratings)}
//             className={`ml-auto px-4 py-2 rounded text-white 
//               ${hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
//           >
//             {loading ? "Saving…" : "Save"}
//           </button>
//         )}
//       </div>

//       {/* Lists */}
//       {selectedDept && (
//   <>
//     <Section
//       title="Unique Apps"
//       items={uniqueApps.filter(name => !/\.(jpg|jpeg|png|gif|bmp|svg|webp|pdf|docx?|xlsx?|pptx?)/i.test(name))}
//       loading={loading}
//       Dropdown={Dropdown}
//     />

//     <Section
//       title="Unique Websites"
//       items={uniqueWebsites.filter(name => !/\.(jpg|jpeg|png|gif|bmp|svg|webp|pdf|docx?|xlsx?|pptx?)/i.test(name))}
//       loading={loading}
//       Dropdown={Dropdown}
//     />
//   </>
// )}

//     </div>
//   );
// }

// /* --------------------------------------------------------
//    Small presentational helper
// --------------------------------------------------------- */
// function Section({ title, items = [], loading, Dropdown }) {
//   return (
//     <div className="mb-8">
//       <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
//         {title}
//       </h3>
//       {loading ? (
//         <p className="text-gray-600 dark:text-gray-400">Loading…</p>
//       ) : !items.length ? (
//         <p className="text-gray-600 dark:text-gray-400">No items found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {items.map((it) => (
//             <div
//               key={it}
//               className="flex justify-between items-center p-3 border rounded dark:border-gray-700"
//             >
//               <span className="truncate text-gray-700 dark:text-gray-300">
//                 {it}
//               </span>
//               <Dropdown item={it} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import { 
  FiSave, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiSearch, 
  FiTag,
  FiUsers,
  FiMonitor,
  FiGlobe,
  FiChevronDown,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus
} from "react-icons/fi";
import { 
  HiOutlineSparkles, 
  HiOutlineChartBar,
  HiOutlineAcademicCap
} from "react-icons/hi";
import useBreakSettingsStore from "../../../store/breakSettingsStore.";
import ConfirmationDialog from "../../common/ConfirmationDialog";

export default function UsageCategorizer() {
  /* =====================  ZUSTAND  ==================== */
  const {
    uniqueApps,
    uniqueWebsites,
    loading,
    fetchUniqueUsage,
    fetchDepartments,
    fetchDeptCategories,
    saveDeptCategories,
    deptCategories,
  } = useBreakSettingsStore();

  /* =====================  LOCAL STATE  ================= */
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* ---------- load dept list once ---------- */
  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch(() => setDepartments([]));
  }, []);

  const isValidItem = (name) => {
    const fileExtensionPattern = /\.(jpg|jpeg|png|gif|bmp|svg|webp|pdf|docx?|xlsx?|pptx?)$/i;
    const untitledPattern = /untitled/i;
    const morePagesPattern = /and \s*\d+\s*more pages/i;
    const googleSearchPattern = /-?\s?google search$/i;
  
    return (
      !fileExtensionPattern.test(name) &&
      !untitledPattern.test(name) &&
      !morePagesPattern.test(name) &&
      !googleSearchPattern.test(name)
    );
  };
  
  useEffect(() => {
    if (!selectedDept) {
      setRatings({});
      return;
    }
  
    Promise.all([
      fetchUniqueUsage(),
      fetchDeptCategories(selectedDept),
    ]).then(() => {
      const { uniqueApps, uniqueWebsites, deptCategories } = useBreakSettingsStore.getState();
  
      const filteredWebsites = uniqueWebsites.filter(isValidItem);
      const filteredApps = uniqueApps.filter(isValidItem);
  
      const current = {};
  
      [...filteredApps, ...filteredWebsites].forEach((item) => {
        const tag =
          deptCategories.productive.find((d) => d.name === item)?.category ||
          deptCategories.unproductive.find((d) => d.name === item)?.category ||
          deptCategories.unrated.find((d) => d.name === item)?.category ||
          "unrated";
        current[item] = tag;
      });
  
      setRatings(current);
    });
  }, [selectedDept, fetchUniqueUsage, fetchDeptCategories]);

  /* ---------- detect unsaved changes ---------- */
  const hasChanges = useMemo(() => {
    const current = {};
    [...deptCategories.productive,
      ...deptCategories.unproductive,
      ...deptCategories.unrated].forEach((d) => {
      current[d.name] = d.category;
    });
    return Object.entries(ratings).some(
      ([k, v]) => (current[k] || "unrated") !== v
    );
  }, [ratings, deptCategories]);

  /* ---------- filtering and search ---------- */
  const filteredApps = useMemo(() => {
    let items = uniqueApps.filter(isValidItem);
    
    if (searchTerm) {
      items = items.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== "all") {
      items = items.filter(item => ratings[item] === filterCategory);
    }
    
    return items;
  }, [uniqueApps, searchTerm, filterCategory, ratings]);

  const filteredWebsites = useMemo(() => {
    let items = uniqueWebsites.filter(isValidItem);
    
    if (searchTerm) {
      items = items.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== "all") {
      items = items.filter(item => ratings[item] === filterCategory);
    }
    
    return items;
  }, [uniqueWebsites, searchTerm, filterCategory, ratings]);

  /* ---------- stats calculation ---------- */
  const stats = useMemo(() => {
    const allItems = [...filteredApps, ...filteredWebsites];
    const productive = allItems.filter(item => ratings[item] === "productive").length;
    const unproductive = allItems.filter(item => ratings[item] === "unproductive").length;
    const unrated = allItems.filter(item => ratings[item] === "unrated").length;
    
    return { productive, unproductive, unrated, total: allItems.length };
  }, [filteredApps, filteredWebsites, ratings]);

  /* ---------- handle save ---------- */
  const handleSaveClick = () => {
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    setIsSaving(true);
    try {
      await saveDeptCategories(selectedDept, ratings);
    } finally {
      setIsSaving(false);
      setSaveDialogOpen(false);
    }
  };

  /* ---------- dropdown helper ---------- */
  const CategoryDropdown = ({ item, type }) => {
    const currentValue = ratings[item] || "unrated";
    
    const getCategoryStyle = (category) => {
      switch (category) {
        case "productive":
          return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800";
        case "unproductive":
          return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800";
        default:
          return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600";
      }
    };

    const getCategoryIcon = (category) => {
      switch (category) {
        case "productive":
          return <FiTrendingUp className="w-3 h-3" />;
        case "unproductive":
          return <FiTrendingDown className="w-3 h-3" />;
        default:
          return <FiMinus className="w-3 h-3" />;
      }
    };

    return (
      <div className="relative">
        <select
          className={`appearance-none px-3 py-2 pr-8 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getCategoryStyle(currentValue)}`}
          value={currentValue}
          onChange={(e) =>
            setRatings((prev) => ({ ...prev, [item]: e.target.value }))
          }
        >
          <option value="productive">Productive</option>
          <option value="unproductive">Unproductive</option>
          <option value="unrated">Unrated</option>
        </select>
        <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none" />
      </div>
    );
  };

  /* ---------- render skeleton ---------- */
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  /* ---------- render grid view ---------- */
  const renderGridView = (items, icon, title) => {
    if (loading) return renderSkeleton();
    
    if (!items.length) {
      return (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {icon}
          </div>
          <p className="text-gray-500 dark:text-gray-400">No {title.toLowerCase()} found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => {
          const category = ratings[item] || "unrated";
          const categoryIcon = category === "productive" ? 
            <FiTrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" /> :
            category === "unproductive" ?
            <FiTrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" /> :
            <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-400" />;

          return (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                    {icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={item}>
                      {item}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {categoryIcon}
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <CategoryDropdown item={item} type={title} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /* ---------- render list view ---------- */
  const renderListView = (items, icon, title) => {
    if (loading) {
      return (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No {title.toLowerCase()} found.</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {items.map((item) => {
          const category = ratings[item] || "unrated";
          return (
            <div
              key={item}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="flex-shrink-0">
                  {icon}
                </div>
                <span className="text-sm text-gray-900 dark:text-white truncate" title={item}>
                  {item}
                </span>
              </div>
              <CategoryDropdown item={item} type={title} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl">
            <HiOutlineChartBar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Usage Productivity Categorizer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Categorize apps and websites by productivity level
            </p>
          </div>
        </div>

        {/* Department Selection */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiUsers className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Department:
              </label>
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="">-- Select Department --</option>
                {departments.map((d) => (
                  <option key={d._id} value={d.department}>
                    {d.department.trim()}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {selectedDept && hasChanges && (
            <button
              onClick={handleSaveClick}
              disabled={loading}
              className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <FiSave className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>

      {selectedDept && (
        <>
          {/* Stats Cards */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <HiOutlineSparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Items</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <FiTrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Productive</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.productive}</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <FiTrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">Unproductive</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.unproductive}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <FiMinus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Unrated</p>
                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.unrated}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search apps and websites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <FiFilter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">All Categories</option>
                    <option value="productive">Productive</option>
                    <option value="unproductive">Unproductive</option>
                    <option value="unrated">Unrated</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Apps Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FiMonitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Applications ({filteredApps.length})
                </h3>
              </div>
              {viewMode === 'grid' ? 
                renderGridView(filteredApps, <FiMonitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />, "Apps") :
                renderListView(filteredApps, <FiMonitor className="w-4 h-4 text-gray-600 dark:text-gray-400" />, "Apps")
              }
            </div>

            {/* Websites Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <FiGlobe className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Websites ({filteredWebsites.length})
                </h3>
              </div>
              {viewMode === 'grid' ? 
                renderGridView(filteredWebsites, <FiGlobe className="w-4 h-4 text-green-600 dark:text-green-400" />, "Websites") :
                renderListView(filteredWebsites, <FiGlobe className="w-4 h-4 text-gray-600 dark:text-gray-400" />, "Websites")
              }
            </div>
          </div>
        </>
      )}

      {!selectedDept && (
        <div className="p-12 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <HiOutlineAcademicCap className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Select a Department
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Choose a department from the dropdown above to start categorizing applications and websites by their productivity level.
          </p>
        </div>
      )}

      {/* Save Confirmation Dialog */}
      <ConfirmationDialog
        open={saveDialogOpen}
        title="Save Category Changes"
        message={`Are you sure you want to save the productivity categorization changes for ${selectedDept} department?`}
        onConfirm={handleSaveConfirm}
        onCancel={() => setSaveDialogOpen(false)}
        confirmText="Save Changes"
        cancelText="Cancel"
        type="info"
        loading={isSaving}
      />
    </div>
  );
}