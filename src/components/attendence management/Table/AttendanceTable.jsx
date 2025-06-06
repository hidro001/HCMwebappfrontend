import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const toArray = (maybe) =>
  Array.isArray(maybe)
    ? maybe
    : maybe && typeof maybe === "object"
      ? Object.values(maybe)
      : [];

export default function LateInToday({ data, activeTab }) {


  const [page, setPage]           = useState(1);
  const PER_PAGE                  = 5;

  const rows = toArray(data);              

  const filtered = useMemo(() => {
    if (activeTab === "All Departments")    return rows;
    if (activeTab === "onTime") return rows.filter(r => !r.late);
    return rows.filter(r => r.department === activeTab);
  }, [rows, activeTab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown     = filtered.slice((page - 1) * PER_PAGE,
                                   page          * PER_PAGE);


  useEffect(() => setPage(1), [activeTab]);


  const go = (p) => setPage(Math.min(Math.max(p, 1), pageCount));


  return (
    <div >
    
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Punch In</th>
              <th className="px-4 py-2">Minute</th>
              <th className="px-4 py-2">Late?</th>
              <th className="px-4 py-2">Manager&nbsp;Name</th>
            </tr>
          </thead>

          <AnimatePresence as="tbody" initial={false}>
            {shown.length ? (
              shown.map(row => (
                <motion.tr
                  key={`${row.employeeId}-${row.punchIn}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18 }}
                  className="even:bg-blue-50/40 text-sm"
                >
                  <td className="px-4 py-2">
                    <a
                      className="text-blue-600 hover:underline"
                      href={`/employee/${row.empID}`}
                    >
                      {row.empID}
                    </a>
                  </td>
                  <td className="px-4 py-2">{row.department}</td>
                  <td className="px-4 py-2">{row.login}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-600">
                      {row.late}
                    </span>
                  </td>
                  <td className="px-4 py-2 ">
                    <span className="inline-block px-2 py-1 rounded bg-green-200 text-green-700">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-2">{row.managerName}</td>
                </motion.tr>
              ))
            ) : (
              /* Empty-state row */
              <motion.tr
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No records to display
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-gray-600">
          Showing {(page - 1) * PER_PAGE + 1}
          {" – "}
          {Math.min(page * PER_PAGE, filtered.length)}
          {" of "}
          {filtered.length}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 1}
            className="w-8 h-8 grid place-content-center border rounded disabled:opacity-40"
          >
            &lt;
          </button>

          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i + 1)}
              className={`w-8 h-8 grid place-content-center border rounded
                ${page === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => go(page + 1)}
            disabled={page === pageCount}
            className="w-8 h-8 grid place-content-center border rounded disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

LateInToday.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  activeTab: PropTypes.string.isRequired,
};

LateInToday.defaultProps = { data: [] };

