// import React, { useEffect, useState } from "react";
// import useAuthStore from "../../../store/store";
// import axiosInstance from "../../../service/axiosInstance";

// const EmployeeListModal = ({ onClose, onSelectEmployee }) => {
//   const [employees, setEmployees] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         // Fetch subordinates & managers in parallel using your custom axiosInstance
//         const [subsResponse, managersResponse] = await Promise.all([
//           axiosInstance.get("/user/get-all"),
//           axiosInstance.get("/user/get-all"),
//         ]);

//         const subs = subsResponse.data?.data || [];
//         const managers = managersResponse.data?.data || [];

//         setEmployees([...subs, ...managers]);
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching employees. Please try again later.");
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[3000]">
//       <div className="bg-white dark:bg-gray-800 p-5 rounded-lg w-11/12 max-w-md max-h-[80vh] overflow-y-auto">
//         <h3 className="text-xl font-semibold mb-4">Select an Employee</h3>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <ul className="list-none p-0">
//           {employees.map((employee) => (
//             <li
//               key={employee._id}
//               className="py-2 px-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
//               onClick={() => {
//                 onSelectEmployee(employee.employee_Id);
//                 onClose();
//               }}
//             >
//               {employee.first_Name} {employee.last_Name} ({employee.employee_Id}
//               )
//             </li>
//           ))}
//         </ul>
//         <button
//           onClick={onClose}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeListModal;

// EmployeeListModal.jsx
import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../../service/axiosInstance";

const EmployeeListModal = ({ onClose, onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState(""); // ← search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ────────────────────────────────────────────────────────────────
     Fetch employees ONCE. Your previous version hit the same REST
     endpoint twice; here we call it once and deduplicate by employee_Id.
  ────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/user/get-all");
        const unique = new Map();
        (res.data?.data || []).forEach((e) => unique.set(e.employee_Id, e));
        setEmployees([...unique.values()]);
      } catch (e) {
        console.error(e);
        setError("Unable to load employees. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ────────────────────────────────────────────────────────────────
     Memo‑ised filtered list (case‑insensitive match against first
     name, last name OR employee_Id).
  ────────────────────────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) =>
      `${e.first_Name} ${e.last_Name} ${e.employee_Id}`
        .toLowerCase()
        .includes(q)
    );
  }, [search, employees]);

  /* ────────────────────────────────────────────────────────────────
     Simple keyboard support: Esc closes the modal
  ────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  /* ────────────────────────────────────────────────────────────────
     Render
  ────────────────────────────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 w-11/12 max-w-md rounded-lg shadow-lg">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Add participant</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-300"
          >
            ✕
          </button>
        </header>

        {/* Search input */}
        <div className="px-4 pt-4">
          <input
            type="text"
            placeholder="Search by name or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full px-3 py-2 mb-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
          />
        </div>

        {/* List */}
        <div className="max-h-[55vh] overflow-y-auto px-1">
          {loading && (
            <p className="text-center py-6 text-gray-500">Loading…</p>
          )}

          {error && <p className="text-center py-6 text-red-600">{error}</p>}

          {!loading && !error && filtered.length === 0 && (
            <p className="text-center py-6 text-gray-500">No matches</p>
          )}

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.map((emp) => (
              <li
                key={emp.employee_Id}
                tabIndex={0}
                onClick={() => {
                  onSelectEmployee(emp.employee_Id);
                  onClose();
                }}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  (onSelectEmployee(emp.employee_Id), onClose())
                }
                className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
              >
                <span className="font-medium">
                  {emp.first_Name} {emp.last_Name}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({emp.employee_Id})
                </span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EmployeeListModal;
