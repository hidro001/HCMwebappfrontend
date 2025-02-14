import { useEffect, useState } from "react";
import { getResignationHistory, withdrawResignation } from "../../../service/recruitService";
import { toast } from "react-toastify";
import SubmitResignationModal from "./SubmitResignationModal";

export default function ResignationDashboard() {
  const [resignations, setResignations] = useState([]);
  const [latestResignation, setLatestResignation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getResignationHistory();
      setResignations(data);
      if (data.length > 0) {
        setLatestResignation(data[0]);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Withdraw resignation
  const handleWithdrawResignation = async () => {
    if (!latestResignation) return;

    try {
      const response = await withdrawResignation();
      toast.success(response.message);
      setLatestResignation(null); // Reset latest resignation after withdrawal
      await fetchData(); // Refresh data
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleRequestFNF=()=>{
    alert("hello")
  }

  // Refresh resignation list after submission
  const handleResignationSubmit = async () => {
    setIsModalOpen(false);
    await fetchData();
  };

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  if (message) {
    return <p className="text-center p-4 text-red-600">{message}</p>;
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Resignation Dashboard</h1>
        <button
          onClick={() => {
            setSelectedResignation(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit Resignation
        </button>
      </div>

      {/* Resignation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {latestResignation ? (
          <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Resignation Details
            </h2>
            <p className="mt-2">
              <span className="font-semibold">Status: </span>
              <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
                {latestResignation.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Awaiting manager approvals.
            </p>
            <p className="mt-2 font-semibold">Approvers:</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400">
              {latestResignation.approvers.map((approver, index) => (
                <li key={index}>
                  {approver.manager.first_Name} {approver.manager.last_Name} ({approver.manager.employee_Id})
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm">
              <span className="font-semibold">Requested At: </span>
              {new Date(latestResignation.createdAt).toLocaleString()}
            </p>
            <button
              onClick={handleWithdrawResignation}
              className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-800"
            >
              Withdraw Resignation
            </button>
          </div>
        ) : (
          <p>No recent resignations found.</p>
        )}


<div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            FNF Details
          </h2>
          <p className="mt-2">
            <span className="font-semibold">Status: </span>
            <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
              Pending
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            FNF has been requested. Awaiting approval.
          </p>
          <button onClick={(()=>handleRequestFNF())} className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800">
            Request FNF
          </button>
        </div>
      </div>

      {/* Resignation Table */}
      <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Resignation Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <th className="p-2 border dark:border-gray-600">S.L</th>
                <th className="p-2 border dark:border-gray-600">Employee Name</th>
                <th className="p-2 border dark:border-gray-600">Employee ID</th>
                <th className="p-2 border dark:border-gray-600">Resignation Date</th>
                <th className="p-2 border dark:border-gray-600">Last Working Day</th>
                <th className="p-2 border dark:border-gray-600">Status</th>
                <th className="p-2 border dark:border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resignations.length > 0 ? (
                resignations.map((row, index) => (
                  <tr key={row._id} className="border dark:border-gray-600">
                    <td className="p-2 border dark:border-gray-600">{index + 1}</td>
                    <td className="p-2 border dark:border-gray-600">
                      {row.employee?.first_Name} {row.employee?.last_Name}
                    </td>
                    <td className="p-2 border dark:border-gray-600">{row.employee?.employee_Id}</td>
                    <td className="p-2 border dark:border-gray-600">
                      {new Date(row.resignationDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {new Date(row.lastWorkingDay).toLocaleDateString()}
                    </td>
                    <td className="p-2 border dark:border-gray-600">{row.status}</td>
                    <td className="p-2 border dark:border-gray-600">
                      <button
                        onClick={() => setSelectedResignation(row)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">No resignation history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit & Update Modal */}
      <SubmitResignationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleResignationSubmit} />
    </div>
  );
}
