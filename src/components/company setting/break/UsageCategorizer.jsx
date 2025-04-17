import { useEffect, useState } from "react";
import useBreakSettingsStore from "../../../store/breakSettingsStore.";

export default function UsageCategorizer() {
    const {
        fetchUniqueUsage,
        uniqueApps = [],
        uniqueWebsites = [],
        loading,
        fetchDepartments,
    } = useBreakSettingsStore();

  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [ratings, setRatings] = useState({}); 
  // ratings: { [itemName]: "productive" | "unproductive" | "unrated" }

  useEffect(() => {
    fetchDepartments()
      .then(dataArray => setDepartments(dataArray || [])) // fallback to [] if undefined/null
      .catch(err => {
        console.error(err);
        setDepartments([]); // Also handle case of error
      });
  }, []);
  

  // 2) fetch unique usage whenever dept changes
  useEffect(() => {
    if (selectedDept) {
      fetchUniqueUsage();
      // In future, you could load saved ratings here
    } else {
      // reset ratings when no dept
      setRatings({});
    }
  }, [selectedDept]);

  // 3) update a single rating
  const handleRatingChange = (name, value) => {
    setRatings(prev => ({ ...prev, [name]: value }));
  };

  // 4) dropdown renderer
  const renderDropdown = (key) => (
    <select
      className="border rounded px-2 py-1"
      value={ratings[key] || "unrated"}
      onChange={e => handleRatingChange(key, e.target.value)}
    >
      <option value="productive">Productive</option>
      <option value="unproductive">Unproductive</option>
      <option value="unrated">Unrated</option>
    </select>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Usage Productivity Categorizer
      </h2>

      {/* Department Picker */}
      <div className="mb-6">
        <label className="mr-2 text-gray-700 dark:text-gray-300">Department:</label>
        <select
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
          value={selectedDept}
          onChange={e => setSelectedDept(e.target.value)}
        >
          <option value="">-- Select a Department --</option>
          {Array.isArray(departments) && departments.map(dept => (
  <option key={dept._id} value={dept.department}>
    {dept.department.trim()}
  </option>
))}
        </select>
      </div>

      {/* Apps Section */}
      {selectedDept && (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              Unique Apps
            </h3>
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading apps…</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
               {Array.isArray(uniqueApps)
                 ? uniqueApps.map(app => (
                     <div key={app} className="flex justify-between …">
                       <span>{app}</span>
                       {renderDropdown(app)}
                     </div>
                   ))
                 : <p>No apps to categorize.</p>}
             </div>
              </div>
            )}
          </div>

          {/* Websites Section */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              Unique Websites
            </h3>
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading websites…</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uniqueWebsites.map(site => (
                  <div
                    key={site}
                    className="flex justify-between items-center p-3 border rounded"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{site}</span>
                    {renderDropdown(site)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
