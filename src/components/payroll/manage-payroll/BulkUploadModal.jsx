// // src/components/payroll/BulkUploadModal.jsx
// import { useState, useEffect } from "react";
// import {
//   FaTimes,
//   FaFileExcel,
//   FaDownload,
//   FaSpinner,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import axiosInstance from "../../../service/axiosInstance";

// export default function BulkUploadModal({
//   open,
//   onClose,
//   month,
//   year,
//   onUploaded,
// }) {
//   const [file, setFile] = useState(null);
//   const [busy, setBusy] = useState(false);
//   const [serverResp, setServerResp] = useState(null);
//   const [previousPayrolls, setPreviousPayrolls] = useState([]);
//   const [currentPayrollIndex, setCurrentPayrollIndex] = useState(0);

//   useEffect(() => {
//     if (open) fetchPreviousPayrolls();
//   }, [open]);

//   const fetchPreviousPayrolls = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `/payroll/bulk-upload-payroll?month=${month}&year=${year}`
//       );
//       setPreviousPayrolls(data.data);
//       setCurrentPayrollIndex(0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!open) return null;

//   const handleDownloadTemplate = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `/payroll/bulk-template?month=${month}&year=${year}`,
//         { responseType: "blob" }
//       );
//       const url = window.URL.createObjectURL(new Blob([data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `payroll_template_${month}_${year}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error("Template download failed:", err);
//       alert("Failed to download template.");
//     }
//   };
//   const handleUpload = async () => {
//     if (!file) return alert("Choose a file first.");
//     setBusy(true);
//     try {
//       const fd = new FormData();
//       fd.append("file", file);
//       fd.append("month", month);
//       fd.append("year", year);

//       const { data } = await axiosInstance.post("/payroll/bulk-upload", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setServerResp(data);
//       setPreviousPayrolls([data.data, ...previousPayrolls]); // FIX: data.data instead of data
//       setCurrentPayrollIndex(0);
//       onUploaded();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Upload failed.");
//     } finally {
//       setBusy(false);
//     }
//   };

//   const currentPayroll = previousPayrolls[currentPayrollIndex]?.payrolls ?? [];

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl p-6 relative">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>

//         <h2 className="text-xl font-semibold mb-4">Bulk Payroll Upload</h2>

//         <button
//           className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mb-4"
//           onClick={handleDownloadTemplate}
//         >
//           <FaDownload /> Download Excel Template
//         </button>

//         <input
//           type="file"
//           accept=".xlsx,.xls"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="mb-4"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={busy || !file}
//           className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ${
//             busy ? "opacity-60 cursor-not-allowed" : ""
//           }`}
//         >
//           {busy ? <FaSpinner className="animate-spin" /> : <FaFileExcel />}
//           Upload & Process
//         </button>

//         {serverResp && (
//           <div className="mt-4 text-sm">
//             <p className="font-medium">Processed: {serverResp.data.length}</p>
//             {serverResp.skipped && (
//               <p className="text-yellow-700">
//                 Skipped: {serverResp.skipped.length}
//               </p>
//             )}
//           </div>
//         )}

//         {currentPayroll.length > 0 && (
//           <div className="mt-6">
//             <div className="flex justify-between items-center mb-2">
//               <button
//                 disabled={currentPayrollIndex >= previousPayrolls.length - 1}
//                 onClick={() => setCurrentPayrollIndex(currentPayrollIndex + 1)}
//                 className="p-2 rounded bg-gray-300"
//               >
//                 <FaArrowLeft />
//               </button>
//               <span>
//                 Payroll for {month}/{year} (Upload #{currentPayrollIndex + 1})
//               </span>
//               <button
//                 disabled={currentPayrollIndex === 0}
//                 onClick={() => setCurrentPayrollIndex(currentPayrollIndex - 1)}
//                 className="p-2 rounded bg-gray-300"
//               >
//                 <FaArrowRight />
//               </button>
//             </div>
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th>Emp ID</th>
//                   <th>Name</th>
//                   <th>Gross Pay</th>
//                   <th>Deduction</th>
//                   <th>Final Salary</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentPayroll.map((emp, idx) => (
//                   <tr key={idx} className="border-b">
//                     <td>{emp.employeeId}</td>
//                     <td>{emp.name}</td>
//                     <td>{emp.grossPay.toFixed(2)}</td>
//                     <td>{emp.deduction.toFixed(2)}</td>
//                     <td>{emp.finalSalary.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/payroll/BulkUploadModal.jsx
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaFileExcel,
  FaDownload,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import axiosInstance from "../../../service/axiosInstance";

export default function BulkUploadModal({
  open,
  onClose,
  month,
  year,
  onUploaded,
}) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [serverResp, setServerResp] = useState(null);
  const [previousPayrolls, setPreviousPayrolls] = useState([]);
  const [currentPayrollIndex, setCurrentPayrollIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  useEffect(() => {
    if (open) fetchPreviousPayrolls();
  }, [open]);

  const fetchPreviousPayrolls = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/payroll/bulk-upload-payroll?month=${month}&year=${year}`
      );
      setPreviousPayrolls(data.data);
      setCurrentPayrollIndex(0);
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) return null;

  const handleDownloadTemplate = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/payroll/bulk-template?month=${selectedMonth}&year=${selectedYear}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `payroll_template_${selectedMonth}_${selectedYear}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Template download failed:", err);
      alert("Failed to download template.");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first.");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("month", month);
      fd.append("year", year);

      const { data } = await axiosInstance.post("/payroll/bulk-upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setServerResp(data);
      setPreviousPayrolls([data.data, ...previousPayrolls]);
      setCurrentPayrollIndex(0);
      onUploaded();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const currentPayroll = previousPayrolls[currentPayrollIndex]?.payrolls ?? [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-6">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4">Bulk Payroll Upload</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const yr = new Date().getFullYear() - i;
              return (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mb-4"
          onClick={handleDownloadTemplate}
        >
          <FaDownload /> Download Excel Template
        </button>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 block w-full"
        />

        <button
          onClick={handleUpload}
          disabled={busy || !file}
          className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 ${
            busy ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {busy ? <FaSpinner className="animate-spin" /> : <FaFileExcel />}
          Upload & Process
        </button>

        {serverResp && (
          <div className="mt-4 text-sm">
            <p className="font-medium">Processed: {serverResp.data.length}</p>
            {serverResp.skipped && (
              <p className="text-yellow-700">
                Skipped: {serverResp.skipped.length}
              </p>
            )}
          </div>
        )}

        {currentPayroll.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <button
                disabled={currentPayrollIndex >= previousPayrolls.length - 1}
                onClick={() => setCurrentPayrollIndex(currentPayrollIndex + 1)}
                className="p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                <FaArrowLeft />
              </button>
              <span>
                Payroll for {month}/{year} (Upload #{currentPayrollIndex + 1})
              </span>
              <button
                disabled={currentPayrollIndex === 0}
                onClick={() => setCurrentPayrollIndex(currentPayrollIndex - 1)}
                className="p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                <FaArrowRight />
              </button>
            </div>
            <table className="w-full text-left text-sm overflow-x-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2">Emp ID</th>
                  <th>Name</th>
                  <th>Gross Pay</th>
                  <th>Deduction</th>
                  <th>Final Salary</th>
                </tr>
              </thead>
              <tbody>
                {currentPayroll.map((emp, idx) => (
                  <tr key={idx} className="border-b">
                    <td>{emp.employeeId}</td>
                    <td>{emp.name}</td>
                    <td>{Number(emp.grossPay || 0).toFixed(2)}</td>
                    <td>{Number(emp.deduction || 0).toFixed(2)}</td>
                    <td>{Number(emp.finalSalary || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
