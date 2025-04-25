// import { useEffect, useState } from "react";
// import useBreakSettingsStore from "../../../store/breakSettingsStore.";

// export default function UsageCategorizer() {
//     const {
//         fetchUniqueUsage,
//         uniqueApps = [],
//         uniqueWebsites = [],
//         loading,
//         fetchDepartments,
//     } = useBreakSettingsStore();
// //HELLO
//   const [departments, setDepartments] = useState([]);
//   const [selectedDept, setSelectedDept] = useState("");
//   const [ratings, setRatings] = useState({}); 
//   // ratings: { [itemName]: "productive" | "unproductive" | "unrated" }

//   useEffect(() => {
//     fetchDepartments()
//       .then(dataArray => setDepartments(dataArray || [])) // fallback to [] if undefined/null
//       .catch(err => {
//         console.error(err);
//         setDepartments([]); // Also handle case of error
//       });
//   }, []);
  

//   // 2) fetch unique usage whenever dept changes
//   useEffect(() => {
//     if (selectedDept) {
//       fetchUniqueUsage();
//       // In future, you could load saved ratings here
//     } else {
//       // reset ratings when no dept
//       setRatings({});
//     }
//   }, [selectedDept]);

//   // 3) update a single rating
//   const handleRatingChange = (name, value) => {
//     setRatings(prev => ({ ...prev, [name]: value }));
//   };

//   // 4) dropdown renderer
//   const renderDropdown = (key) => (
//     <select
//       className="border rounded px-2 py-1"
//       value={ratings[key] || "unrated"}
//       onChange={e => handleRatingChange(key, e.target.value)}
//     >
//       <option value="productive">Productive</option>
//       <option value="unproductive">Unproductive</option>
//       <option value="unrated">Unrated</option>
//     </select>
//   );

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//         Usage Productivity Categorizer
//       </h2>

//       {/* Department Picker */}
//       <div className="mb-6">
//         <label className="mr-2 text-gray-700 dark:text-gray-300">Department:</label>
//         <select
//           className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
//           value={selectedDept}
//           onChange={e => setSelectedDept(e.target.value)}
//         >
//           <option value="">-- Select a Department --</option>
//           {Array.isArray(departments) && departments.map(dept => (
//   <option key={dept._id} value={dept.department}>
//     {dept.department.trim()}
//   </option>
// ))}
//         </select>
//       </div>

//       {/* Apps Section */}
//       {selectedDept && (
//         <>
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
//               Unique Apps
//             </h3>
//             {loading ? (
//               <p className="text-gray-600 dark:text-gray-400">Loading apps…</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                {Array.isArray(uniqueApps)
//                  ? uniqueApps.map(app => (
//                      <div key={app} className="flex justify-between …">
//                        <span>{app}</span>
//                        {renderDropdown(app)}
//                      </div>
//                    ))
//                  : <p>No apps to categorize.</p>}
//              </div>
//               </div>
//             )}
//           </div>

//           {/* Websites Section */}
//           <div>
//             <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
//               Unique Websites
//             </h3>
//             {loading ? (
//               <p className="text-gray-600 dark:text-gray-400">Loading websites…</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {uniqueWebsites.map(site => (
//                   <div
//                     key={site}
//                     className="flex justify-between items-center p-3 border rounded"
//                   >
//                     <span className="text-gray-700 dark:text-gray-300">{site}</span>
//                     {renderDropdown(site)}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import useBreakSettingsStore from "../../../store/breakSettingsStore.";

export default function UsageCategorizer() {
  /* =====================  ZUSTAND  ==================== */
  const {
    /* lists */
    uniqueApps,
    uniqueWebsites,
    loading,

    /* actions */
    fetchUniqueUsage,
    fetchDepartments,
    fetchDeptCategories,
    saveDeptCategories,

    /* current dept tags */
    deptCategories,
  } = useBreakSettingsStore();

  /* =====================  LOCAL STATE  ================= */
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [ratings, setRatings] = useState({}); // { itemName: "productive" }

  /* ---------- load dept list once ---------- */
  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch(() => setDepartments([]));
  }, []);

  /* ---------- when dept changes: load tags & usage lists ---------- */
  // useEffect(() => {
  //   if (!selectedDept) {
  //     setRatings({});
  //     return;
  //   }

  //   // parallel fetch
  //   Promise.all([
  //     fetchUniqueUsage(),          // populates uniqueApps / uniqueWebsites
  //     fetchDeptCategories(selectedDept), // populates deptCategories
  //   ]).then(() => {
  //     /* merge: if item has saved tag use it, else "unrated" */
  //     const current = {};

  //     [...uniqueApps, ...uniqueWebsites].forEach((item) => {
  //       const tag =
  //         deptCategories.productive.find((d) => d.name === item)?.category ||
  //         deptCategories.unproductive.find((d) => d.name === item)?.category ||
  //         deptCategories.unrated.find((d) => d.name === item)?.category ||
  //         "unrated";
  //       current[item] = tag;
  //     });
  //     setRatings(current);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedDept]);


  // useEffect(() => {
  //   if (!selectedDept) {
  //     setRatings({});
  //     return;
  //   }
  
  //   Promise.all([
  //     fetchUniqueUsage(),
  //     fetchDeptCategories(selectedDept),
  //   ]).then(() => {
  //     const { uniqueApps, uniqueWebsites, deptCategories } = useBreakSettingsStore.getState();
  
  //     const current = {};
  
  //     [...uniqueApps, ...uniqueWebsites].forEach((item) => {
  //       const tag =
  //         deptCategories.productive.find((d) => d.name === item)?.category ||
  //         deptCategories.unproductive.find((d) => d.name === item)?.category ||
  //         deptCategories.unrated.find((d) => d.name === item)?.category ||
  //         "unrated";
  //       current[item] = tag;
  //     });
  
  //     setRatings(current);
  //   });
  // }, [selectedDept]);


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
  }, [selectedDept, fetchUniqueUsage, fetchDeptCategories]); // added dependencies explicitly
  
  
  
  
  
  /* ---------- dropdown helper ---------- */
  const Dropdown = ({ item }) => (
    <select
      className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
      value={ratings[item] || "unrated"}
      onChange={(e) =>
        setRatings((prev) => ({ ...prev, [item]: e.target.value }))
      }
    >
      <option value="productive">Productive</option>
      <option value="unproductive">Unproductive</option>
      <option value="unrated">Unrated</option>
    </select>
  );

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

  /* =====================  RENDER  ===================== */
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Usage Productivity Categorizer
      </h2>

      {/* Department Picker */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <label className="text-gray-700 dark:text-gray-300">Department:</label>
        <select
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">-- Select --</option>
          {departments.map((d) => (
            <option key={d._id} value={d.department}>
              {d.department.trim()}
            </option>
          ))}
        </select>
        {selectedDept && (
          <button
            disabled={loading || !hasChanges}
            onClick={() => saveDeptCategories(selectedDept, ratings)}
            className={`ml-auto px-4 py-2 rounded text-white 
              ${hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
          >
            {loading ? "Saving…" : "Save"}
          </button>
        )}
      </div>

      {/* Lists */}
      {selectedDept && (
  <>
    <Section
      title="Unique Apps"
      items={uniqueApps.filter(name => !/\.(jpg|jpeg|png|gif|bmp|svg|webp|pdf|docx?|xlsx?|pptx?)/i.test(name))}
      loading={loading}
      Dropdown={Dropdown}
    />

    <Section
      title="Unique Websites"
      items={uniqueWebsites.filter(name => !/\.(jpg|jpeg|png|gif|bmp|svg|webp|pdf|docx?|xlsx?|pptx?)/i.test(name))}
      loading={loading}
      Dropdown={Dropdown}
    />
  </>
)}

    </div>
  );
}

/* --------------------------------------------------------
   Small presentational helper
--------------------------------------------------------- */
function Section({ title, items = [], loading, Dropdown }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading…</p>
      ) : !items.length ? (
        <p className="text-gray-600 dark:text-gray-400">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((it) => (
            <div
              key={it}
              className="flex justify-between items-center p-3 border rounded dark:border-gray-700"
            >
              <span className="truncate text-gray-700 dark:text-gray-300">
                {it}
              </span>
              <Dropdown item={it} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

