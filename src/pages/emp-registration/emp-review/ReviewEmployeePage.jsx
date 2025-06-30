import React, { useEffect, useState } from 'react';
import ManagerTabOverview from './manager-tabs/ManagerTabOverview';
import axiosInstance from '../../../service/axiosInstance';

export default function EmployeeTabs() {
  const empid = localStorage.getItem('employeeId');
  const [employees, setEmployees] = useState([]);
  const [counts, setCounts] = useState({ Pending: 0, Verified: 0, 'Not Verified': 0 });
  const [activeTab, setActiveTab] = useState('Pending');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const limit = 10;
  const tabs = ['Not Verified', 'Pending', 'Verified'];

  useEffect(() => {
    fetchEmployees(activeTab, search, page);
  }, [activeTab, search, page]);

  const fetchEmployees = async (status, searchQuery, pageNo) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/registration/emp-status/${status}`, {
        params: { empid, search: searchQuery, page: pageNo, limit },
      });

      setEmployees(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setCounts(res.data.counts || {});
    } catch (err) {
      console.error(`Failed to fetch ${status} employees:`, err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">👥 Employee Status</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
              setSearch('');
            }}
            className={`relative px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tab}
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {counts[tab] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search by name or ID..."
        className="w-full md:w-1/3 px-3 py-2 rounded border dark:bg-gray-900 dark:border-gray-600 mb-4"
      />

      {loading ? (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      ) : (
        <EmployeeTable
          list={employees}
          page={page}
          limit={limit}
          activeTab={activeTab}
          onEmployeeClick={(emp) => setSelectedEmpId(emp.employee_Id)}
        />
      )}

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm py-1">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedEmpId && (
        <ManagerTabOverview employeeId={selectedEmpId} onClose={() => setSelectedEmpId(null)} />
      )}
    </div>
  );
}

function EmployeeTable({ list, page, limit, activeTab, onEmployeeClick }) {
  if (!list.length) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No employees found.</p>;
  }

  return (
    <div className="overflow-auto rounded-lg border shadow-sm dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">S.No</th>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Employee ID</th>
            <th className="px-4 py-2 text-left font-semibold">Mobile No</th>
            <th className="px-4 py-2 text-left font-semibold">Joining Date</th>
            <th className="px-4 py-2 text-left font-semibold">Added By</th>
            <th className="px-4 py-2 text-left font-semibold">Added At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((emp, index) => (
            <tr
              key={emp._id}
              onClick={() => activeTab !== 'Verified' && onEmployeeClick(emp)}
              className={`${
                activeTab === 'Verified'
                  ? 'cursor-not-allowed opacity-60'
                  : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
              } bg-white dark:bg-gray-900`}
            >
              <td className="px-4 py-2">{(page - 1) * limit + index + 1}</td>
              <td className="px-4 py-2">{emp.first_Name} {emp.last_Name}</td>
              <td className="px-4 py-2">{emp.employee_Id}</td>
              <td className="px-4 py-2">{emp.mobile_No}</td>
              <td className="px-4 py-2">{new Date(emp.date_of_Joining).toLocaleDateString()}</td>
              <td className="px-4 py-2">{emp.addedHistory?.[0]?.addedBy || '—'}</td>
              <td className="px-4 py-2">
                {emp.addedHistory?.[0]?.addedAt ? new Date(emp.addedHistory[0].addedAt).toLocaleString() : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
