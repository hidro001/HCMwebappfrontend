import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaUpload, FaCheck, FaTimes, FaSearch, FaEdit, FaFileExport, FaTable, FaTh } from "react-icons/fa";
import useFNFStore from "../../store/useFNFStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import BaseModal from "../common/BaseModal";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

export default function FNFApproval() {
  const {
    pendingFnfs,
    approvedFnfs,
    loading,
    fetchFNFRequests,
    approveFNF,
    updateFNF,
    rejectFNF,
  } = useFNFStore();

  const [activeTab, setActiveTab] = useState("pending");

  const [viewMode, setViewMode] = useState("auto");
  const [isTableOverflowing, setIsTableOverflowing] = useState(false);
  const [showViewToggle, setShowViewToggle] = useState(false);

  const pendingTableRef = useRef(null);
  const approvedTableRef = useRef(null);

  const [approveOpen, setApproveOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedFNF, setSelectedFNF] = useState(null);
  const [rejectComment, setRejectComment] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [searchText, setSearchText] = useState("");
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingPageSize, setPendingPageSize] = useState(10);

  const filteredPendingFnfs = useMemo(() => {
    if (!searchText) return pendingFnfs;
    const regex = new RegExp(searchText, "i");
    return pendingFnfs.filter((fnf) => {
      const firstName = fnf.employee?.first_Name || "";
      const lastName = fnf.employee?.last_Name || "";
      const empId = fnf.employee?.employee_Id || "";
      const fullName = `${firstName} ${lastName}`;
      return regex.test(fullName) || regex.test(empId);
    });
  }, [pendingFnfs, searchText]);

  const pendingTotalPages = Math.ceil(filteredPendingFnfs.length / pendingPageSize);

  const pendingPaginated = useMemo(() => {
    const startIndex = (pendingPage - 1) * pendingPageSize;
    return filteredPendingFnfs.slice(startIndex, startIndex + pendingPageSize);
  }, [filteredPendingFnfs, pendingPage, pendingPageSize]);

  const [approvedSearchText, setApprovedSearchText] = useState("");
  const [approvedPage, setApprovedPage] = useState(1);
  const [approvedPageSize, setApprovedPageSize] = useState(10);

  const filteredApprovedFnfs = useMemo(() => {
    if (!approvedSearchText) return approvedFnfs;
    const regex = new RegExp(approvedSearchText, "i");
    return approvedFnfs.filter((fnf) => {
      const firstName = fnf.employee?.first_Name || "";
      const lastName = fnf.employee?.last_Name || "";
      const empId = fnf.employee?.employee_Id || "";
      const fullName = `${firstName} ${lastName}`;
      return regex.test(fullName) || regex.test(empId);
    });
  }, [approvedFnfs, approvedSearchText]);

  const approvedTotalPages = Math.ceil(
    filteredApprovedFnfs.length / approvedPageSize
  );

  const approvedPaginated = useMemo(() => {
    const startIndex = (approvedPage - 1) * approvedPageSize;
    return filteredApprovedFnfs.slice(startIndex, startIndex + approvedPageSize);
  }, [filteredApprovedFnfs, approvedPage, approvedPageSize]);

  const checkTableOverflow = () => {
    const tableRef = activeTab === "pending" ? pendingTableRef : approvedTableRef;
    if (tableRef.current) {
      const container = tableRef.current;
      const isOverflowing = container.scrollWidth > container.clientWidth;
      setIsTableOverflowing(isOverflowing);
      setShowViewToggle(!isOverflowing); 
    }
  };

  useEffect(() => {
    const timer = setTimeout(checkTableOverflow, 100);
    return () => clearTimeout(timer);
  }, [activeTab, pendingPaginated, approvedPaginated, viewMode]);

  useEffect(() => {
    const handleResize = () => {
      checkTableOverflow();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const shouldShowCards = () => {
    if (viewMode === "cards") return true;
    if (viewMode === "table") return false;
    return isTableOverflowing;
  };

  useEffect(() => {
    fetchFNFRequests();
  }, [fetchFNFRequests]);

  const openApproveModal = (fnf) => {
    setSelectedFNF(fnf);
    reset({
      fnfAmount: fnf.fnfAmount || "",
      deductions: fnf.deductions || "",
      netPayable: fnf.netPayable || "",
      comments: "",
    });
    setApproveOpen(true);
  };

  const onApproveSubmit = async (data) => {
    try {
      await approveFNF(selectedFNF._id, data);
      // toast.success("FNF approved successfully!");
    } catch (error) {
      toast.error("Error approving FNF. Please try again.");
    } finally {
      setApproveOpen(false);
      setSelectedFNF(null);
    }
  };

  const openUpdateModal = (fnf) => {
    setSelectedFNF(fnf);
    reset({
      fnfAmount: fnf.fnfAmount || "",
      deductions: fnf.deductions || "",
      netPayable: fnf.netPayable || "",
    });
    setUpdateOpen(true);
  };

  const onUpdateSubmit = async (data) => {
    try {
      await updateFNF(selectedFNF._id, data);
      toast.success("FNF updated successfully!");
    } catch (error) {
      toast.error("Error updating FNF. Please try again.");
    } finally {
      setUpdateOpen(false);
      setSelectedFNF(null);
    }
  };

  const openRejectDialog = (fnf) => {
    setSelectedFNF(fnf);
    setRejectComment("");
    setRejectOpen(true);
  };

  const confirmReject = async () => {
    if (!rejectComment.trim()) {
      toast.error("Please provide rejection comments.");
      return;
    }
    try {
      await rejectFNF(selectedFNF._id, rejectComment);
      toast.success("FNF rejected successfully!");
    } catch (error) {
      toast.error("Error rejecting FNF. Please try again.");
    } finally {
      setRejectOpen(false);
      setSelectedFNF(null);
    }
  };

  const exportPendingToExcel = () => {
    const exportData = filteredPendingFnfs.map((fnf, index) => ({
      "S.L": index + 1,
      "Employee Name": fnf.employee
        ? `${fnf.employee.first_Name} ${fnf.employee.last_Name}`
        : "N/A",
      "Employee ID": fnf.employee?.employee_Id || "N/A",
      "Resignation Date": fnf.resignation?.resignationDate
        ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
        : "N/A",
     "Last Working Day": fnf.resignation?.approvers?.[0]?.approvedLastWorkingDay
  ? new Date(fnf.resignation.approvers[0].approvedLastWorkingDay).toLocaleDateString()
  : fnf.resignation?.lastWorkingDayCompany
  ? new Date(fnf.resignation.lastWorkingDayCompany).toLocaleDateString()
  : "N/A",

      "Requested At":   fnf.createdAt ?  new Date(fnf.createdAt).toLocaleString()
             : "N/A",
      "Created At": fnf.createdAt
        ? new Date(fnf.createdAt).toLocaleString()
        : "N/A",
      Status: fnf.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending FNF");
    XLSX.writeFile(workbook, "PendingFNF.xlsx");
  };

  const exportApprovedToExcel = () => {
    const exportData = filteredApprovedFnfs.map((fnf, index) => ({
      "S.L": index + 1,
      "Employee Name": fnf.employee
        ? `${fnf.employee.first_Name} ${fnf.employee.last_Name}`
        : "N/A",
      "Employee ID": fnf.employee?.employee_Id || "N/A",
      "Resignation Date": fnf.resignation?.resignationDate
        ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
        : "N/A",
      "Last Working Day": fnf.resignation?.lastWorkingDay
        ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
        : "N/A",
      "Requested At":  fnf.createdAt ?  new Date(fnf.createdAt).toLocaleString()
             : "N/A",
      "Processed By": fnf.processedBy
        ? `${fnf.processedBy.first_Name} ${fnf.processedBy.last_Name} (${fnf.processedBy.employee_Id})`
        : "N/A",
      "Processed At": fnf.processedAt
        ? new Date(fnf.processedAt).toLocaleString()
        : "N/A",
      "FNF Amount": fnf.fnfAmount || 0,
      "Deductions": fnf.deductions || 0,
      "Net Payable": fnf.netPayable || 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approved FNF");
    XLSX.writeFile(workbook, "ApprovedFNF.xlsx");
  };

  const renderPendingRow = (fnf, index) => (
    <tr
      key={fnf._id}
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-800 dark:hover:to-gray-750 transition-all duration-200"
    >
      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {fnf.employee
              ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
              : "N/A"}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-mono">
        {fnf.employee?.employee_Id || "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.resignation?.resignationDate
          ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
          : "N/A"}
      </td>
    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
  {fnf.resignation?.approvers?.[0]?.approvedLastWorkingDay
    ? new Date(fnf.resignation.approvers[0].approvedLastWorkingDay).toLocaleDateString()
    : fnf.resignation?.lastWorkingDayCompany
    ? new Date(fnf.resignation.lastWorkingDayCompany).toLocaleDateString()
    : "N/A"}
</td>

      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {/* {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"} */}
        {  fnf.createdAt ?  new Date(fnf.createdAt).toLocaleString()
             : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.createdAt ? new Date(fnf.createdAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
            fnf.status === "Pending"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
              : fnf.status === "Approved"
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
            fnf.status === "FNF Requested" ? "bg-amber-400" : fnf.status === "Approved" ? "bg-emerald-400" : "bg-red-400"
          }`}></div>
          {fnf.status}
        </span>
      </td>
      <td className="py-4 px-6">
        {fnf.status === "Pending" && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => openApproveModal(fnf)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaCheck className="w-3 h-3 mr-1" />
              Approve
            </button>
            <button
              onClick={() => openRejectDialog(fnf)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaTimes className="w-3 h-3 mr-1" />
              Reject
            </button>
          </div>
        )}
      </td>
    </tr>
  );

  const renderApprovedRow = (fnf, index) => (
    <tr
      key={fnf._id}
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-800 dark:hover:to-gray-750 transition-all duration-200"
    >
      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {fnf.employee
              ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
              : "N/A"}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-mono">
        {fnf.employee?.employee_Id || "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.resignation?.resignationDate
          ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
         {fnf.resignation?.approvers?.[0]?.approvedLastWorkingDay
    ? new Date(fnf.resignation.approvers[0].approvedLastWorkingDay).toLocaleDateString()
    : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {/* {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleString() : "N/A"} */}
        {  fnf.createdAt ?  new Date(fnf.createdAt).toLocaleString()
             : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.processedBy
          ? `${fnf.processedBy.first_Name || "N/A"} ${
              fnf.processedBy.last_Name || "N/A"
            } (${fnf.processedBy.employee_Id || "N/A"})`
          : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        {fnf.processedAt ? new Date(fnf.processedAt).toLocaleString() : "N/A"}
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        ₹{fnf.fnfAmount?.toFixed(2) || "0.00"}
      </td>
      <td className="py-4 px-6 text-sm font-semibold text-red-600 dark:text-red-400">
        ₹{fnf.deductions?.toFixed(2) || "0.00"}
      </td>
      <td className="py-4 px-6 text-sm font-bold text-blue-600 dark:text-blue-400">
        ₹{fnf.netPayable?.toFixed(2) || "0.00"}
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => openUpdateModal(fnf)}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FaEdit className="w-3 h-3 mr-1" />
          Update
        </button>
      </td>
    </tr>
  );

  const renderPendingCard = (fnf, index) => (
    
    <div
      key={fnf._id}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {fnf.employee
              ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
              : "N/A"}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
            ID: {fnf.employee?.employee_Id || "N/A"}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
            fnf.status === "Pending"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
              : fnf.status === "Approved"
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
            fnf.status === "FNF Requested" ? "bg-amber-400" : fnf.status === "Approved" ? "bg-emerald-400" : "bg-red-400"
          }`}></div>
          {fnf.status}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Resignation Date:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {fnf.resignation?.resignationDate
              ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Last Working Day:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {fnf.resignation?.approvers?.[0]?.approvedLastWorkingDay
              ? new Date(fnf.resignation.approvers[0].approvedLastWorkingDay).toLocaleDateString()
              : fnf.resignation?.lastWorkingDayCompany
              ? new Date(fnf.resignation.lastWorkingDayCompany).toLocaleDateString()
              : "N/A"}
          </span>

        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Requested At:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {/* {fnf.requestedAt ? new Date(fnf.requestedAt).toLocaleDateString() : "N/A"} */}
            { fnf.createdAt ?  new Date(fnf.createdAt).toLocaleString()
             : "N/A"}
          </span>
        </div>
      </div>

      {fnf.status === "Pending" && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => openApproveModal(fnf)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all duration-200"
          >
            <FaCheck className="w-3 h-3 mr-1" />
            Approve
          </button>
          <button
            onClick={() => openRejectDialog(fnf)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200"
          >
            <FaTimes className="w-3 h-3 mr-1" />
            Reject
          </button>
        </div>
      )}
    </div>
  );

  const renderApprovedCard = (fnf, index) => (
    <div
      key={fnf._id}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {fnf.employee
              ? `${fnf.employee.first_Name || "N/A"} ${fnf.employee.last_Name || "N/A"}`
              : "N/A"}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
            ID: {fnf.employee?.employee_Id || "N/A"}
          </p>
        </div>
        <button
          onClick={() => openUpdateModal(fnf)}
          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200"
        >
          <FaEdit className="w-3 h-3 mr-1" />
          Update
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Resignation Date:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {fnf.resignation?.resignationDate
              ? new Date(fnf.resignation.resignationDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Last Working Day:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {fnf.resignation?.lastWorkingDay
              ? new Date(fnf.resignation.lastWorkingDay).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Processed By:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {fnf.processedBy
              ? `${fnf.processedBy.first_Name || "N/A"} ${fnf.processedBy.last_Name || "N/A"}`
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Processed At:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {fnf.processedAt ? new Date(fnf.processedAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">FNF Amount</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">
              ₹{fnf.fnfAmount?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Deductions</div>
            <div className="font-semibold text-red-600 dark:text-red-400">
              ₹{fnf.deductions?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400">Net Payable</div>
            <div className="font-bold text-blue-600 dark:text-blue-400">
              ₹{fnf.netPayable?.toFixed(2) || "0.00"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ViewToggle = () => (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => setViewMode("table")}
        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
          viewMode === "table" || (!shouldShowCards() && viewMode === "auto")
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        }`}
      >
        <FaTable className="w-3 h-3 mr-1" />
        Table
      </button>
      <button
        onClick={() => setViewMode("cards")}
        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
          viewMode === "cards" || (shouldShowCards() && viewMode === "auto")
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        }`}
      >
        <FaTh className="w-3 h-3 mr-1" />
        Cards
      </button>
    </div>
  );


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading FNF requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-6 space-y-4 lg:space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <div className="w-1 h-6 lg:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3 lg:mr-4"></div>
          FNF Approvals
        </h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 dark:text-gray-400">Manage Full & Final settlement requests</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex space-x-1 p-1">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Requests
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === "pending" 
                ? "bg-white/20 text-white" 
                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
            }`}>
              {pendingFnfs.length}
            </span>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "approved"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("approved")}
          >
            Approved Requests
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === "approved" 
                ? "bg-white/20 text-white" 
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            }`}>
              {approvedFnfs.length}
            </span>
          </button>
        </div>

        {/* Pending Content */}
        {activeTab === "pending" && (
          <div className="p-3 lg:p-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              {/* Left side controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Show entries */}
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Show
                  </label>
                  <select
                    value={pendingPageSize}
                    onChange={(e) => {
                      setPendingPageSize(Number(e.target.value));
                      setPendingPage(1);
                    }}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
                </div>

                {/* View Toggle */}
                {showViewToggle && !isTableOverflowing && <ViewToggle />}
              </div>

              {/* Right side controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or employee ID..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setPendingPage(1);
                    }}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                  />
                </div>
                <button
                  onClick={exportPendingToExcel}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaFileExport className="w-4 h-4 mr-2" />
                  Export to Excel
                </button>
              </div>
            </div>

            {/* Auto overflow indicator */}
            {isTableOverflowing && viewMode === "auto" && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaTh className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Switched to card view due to limited screen space. 
                      <button 
                        onClick={() => setViewMode("table")} 
                        className="ml-1 underline hover:no-underline"
                      >
                        Force table view
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Table View */}
            {!shouldShowCards() && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto" ref={pendingTableRef}>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                      <tr>
                        {["S.L", "Employee Name", "Employee ID", "Resignation Date", "Last Working Day", "Requested At", "Created At", "Status", "Actions"].map((header) => (
                          <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                      {pendingPaginated.length === 0 ? (
                        <tr>
                          <td className="px-6 py-12 text-center text-gray-500 dark:text-gray-400" colSpan="9">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <FaSearch className="w-6 h-6 text-gray-400" />
                              </div>
                              <p className="text-lg font-medium">No pending requests found</p>
                              <p className="text-sm">Try adjusting your search criteria</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        pendingPaginated.map((fnf, idx) =>
                          renderPendingRow(fnf, (pendingPage - 1) * pendingPageSize + idx)
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Card View */}
            {shouldShowCards() && (
              <div>
                {pendingPaginated.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaSearch className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No pending requests found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {pendingPaginated.map((fnf, idx) =>
                      renderPendingCard(fnf, (pendingPage - 1) * pendingPageSize + idx)
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {pendingTotalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {(pendingPage - 1) * pendingPageSize + 1} to{" "}
                  {Math.min(pendingPage * pendingPageSize, filteredPendingFnfs.length)}{" "}
                  of {filteredPendingFnfs.length} entries
                </p>
                <div className="flex space-x-1 overflow-x-auto">
                  {Array.from({ length: pendingTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPendingPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        pendingPage === i + 1
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Approved Content */}
        {activeTab === "approved" && (
          <div className="p-3 lg:p-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              {/* Left side controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Show entries */}
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Show
                  </label>
                  <select
                    value={approvedPageSize}
                    onChange={(e) => {
                      setApprovedPageSize(Number(e.target.value));
                      setApprovedPage(1);
                    }}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
                </div>

                {/* View Toggle */}
                {showViewToggle && !isTableOverflowing && <ViewToggle />}
              </div>

              {/* Right side controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or employee ID..."
                    value={approvedSearchText}
                    onChange={(e) => {
                      setApprovedSearchText(e.target.value);
                      setApprovedPage(1);
                    }}
                    className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                  />
                </div>
                <button
                  onClick={exportApprovedToExcel}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaFileExport className="w-4 h-4 mr-2" />
                  Export to Excel
                </button>
              </div>
            </div>

            {/* Auto overflow indicator */}
            {isTableOverflowing && viewMode === "auto" && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaTh className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Switched to card view due to limited screen space. 
                      <button 
                        onClick={() => setViewMode("table")} 
                        className="ml-1 underline hover:no-underline"
                      >
                        Force table view
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Table View */}
            {!shouldShowCards() && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto" ref={approvedTableRef}>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                      <tr>
                        {["S.L", "Employee Name", "Employee ID", "Resignation Date", "Last Working Day", "Requested At", "Processed By", "Processed At", "FNF Amount (₹)", "Deductions (₹)", "Net Payable (₹)", "Action"].map((header) => (
                          <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                      {approvedPaginated.length === 0 ? (
                        <tr>
                          <td className="px-6 py-12 text-center text-gray-500 dark:text-gray-400" colSpan="12">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <FaCheck className="w-6 h-6 text-gray-400" />
                              </div>
                              <p className="text-lg font-medium">No approved requests found</p>
                              <p className="text-sm">Try adjusting your search criteria</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        approvedPaginated.map((fnf, idx) =>
                          renderApprovedRow(fnf, (approvedPage - 1) * approvedPageSize + idx)
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Card View */}
            {shouldShowCards() && (
              <div>
                {approvedPaginated.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No approved requests found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {approvedPaginated.map((fnf, idx) =>
                      renderApprovedCard(fnf, (approvedPage - 1) * approvedPageSize + idx)
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {approvedTotalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {(approvedPage - 1) * approvedPageSize + 1} to{" "}
                  {Math.min(approvedPage * approvedPageSize, filteredApprovedFnfs.length)}{" "}
                  of {filteredApprovedFnfs.length} entries
                </p>
                <div className="flex space-x-1 overflow-x-auto">
                  {Array.from({ length: approvedTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setApprovedPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        approvedPage === i + 1
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Approve Modal */}
      {approveOpen && (
        <BaseModal isOpen={approveOpen} onClose={() => setApproveOpen(false)}>
          <div className="bg-white dark:bg-gray-800 h-[90vh] p-6 lg:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto border overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Approve FNF</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Enter the final settlement details</p>
            </div>
            
            <form onSubmit={handleSubmit(onApproveSubmit)} className="space-y-6">


              {/* FNF Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  FNF Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter FNF amount"
                  {...register("fnfAmount", {
                    required: "FNF Amount is required",
                    min: 0,
                  })}
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.fnfAmount && (
                  <p className="text-red-500 text-sm mt-1">{errors.fnfAmount.message}</p>
                )}
              </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* Deductions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Deductions (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter deductions"
                    {...register("deductions", {
                      required: "Deductions amount is required",
                      min: 0,
                    })}
                    className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.deductions && (
                    <p className="text-red-500 text-sm mt-1">{errors.deductions.message}</p>
                  )}
                </div>
          
              
                {/* Net Payable */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Net Payable (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Net amount payable"
                    {...register("netPayable", {
                      required: "Net payable amount is required",
                      min: 0,
                    })}
                    className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.netPayable && (
                    <p className="text-red-500 text-sm mt-1">{errors.netPayable.message}</p>
                  )}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                  {/* Resignation Date (read-only) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      Resignation Date
                    </label>
                    <input
                      type="text"
                      value={new Date(selectedFNF.resignation.resignationDate).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  {/* Approved Date (read-only) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      Approved Date
                    </label>
                    <input
                      type="text"
                      value={new Date(selectedFNF.resignation.approvers[0].approvedLastWorkingDay).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
            </div>

            <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      Company Notice Period Date
                    </label>
                    <input
                      type="text"
                      value={new Date(selectedFNF.resignation.lastWorkingDayCompany).toLocaleDateString()}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
              {/* Comments */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  Comments (Optional)
                </label>
                <textarea
                  placeholder="Add any additional comments..."
                  rows="4"
                  {...register("comments")}
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  onClick={() => setApproveOpen(false)}
                  variant="outlined"
                  className="py-2 px-6 text-gray-700 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="py-2 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                >
                  Approve FNF
                </Button>
              </div>
            </form>
    
          </div>
        </BaseModal>
      )}

      {/* Update Modal */}
      {updateOpen && (
        <BaseModal isOpen={updateOpen} onClose={() => setUpdateOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEdit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Update FNF</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Modify the settlement details</p>
            </div>
            
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  FNF Amount (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("fnfAmount", { required: "FNF Amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.fnfAmount && (
                  <p className="text-red-500 text-sm mt-1">{errors.fnfAmount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Deductions (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("deductions", { required: "Deductions amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.deductions && (
                  <p className="text-red-500 text-sm mt-1">{errors.deductions.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Net Payable (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("netPayable", { required: "Net payable amount is required", min: 0 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.netPayable && (
                  <p className="text-red-500 text-sm mt-1">{errors.netPayable.message}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={() => setUpdateOpen(false)}
                  variant="outlined"
                  className="flex-1 py-3 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Update FNF
                </Button>
              </div>
            </form>
          </div>
        </BaseModal>
      )}

      {rejectOpen && (
        <ConfirmationDialog
          open={rejectOpen}
          title="Reject FNF Request"
          message={
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Please provide rejection comments for this FNF request:
              </p>
              <textarea
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Enter rejection reason..."
                rows="4"
              />
            </div>
          }
          onConfirm={confirmReject}
          onCancel={() => setRejectOpen(false)}
          confirmText="Reject Request"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}