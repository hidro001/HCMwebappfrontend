import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useIssuesStore from "../../store/useIssuesStore";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaTicketAlt,
  FaCalendarAlt,
  FaLayerGroup,
  FaFlag,
} from "react-icons/fa";
import { Skeleton } from "@mui/material";

const EmployeeTicketsPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { fetchEmployeeTickets, issues, employeeDetails, loading } =
    useIssuesStore();

  useEffect(() => {
    fetchEmployeeTickets(employeeId);
  }, [employeeId, fetchEmployeeTickets]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
      >
        <FaArrowLeft /> Back
      </button>
      {loading ? (
        <Skeleton variant="rectangular" height={100} className="mb-4" />
      ) : (
        employeeDetails && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Tickets by {employeeDetails.first_Name}{" "}
              {employeeDetails.last_Name}
            </h1>
            <div className="text-gray-500 dark:text-gray-400 mt-2">
              ID: {employeeDetails.employee_Id} | {employeeDetails.designation}{" "}
              - {employeeDetails.department}
            </div>
          </div>
        )
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} variant="rectangular" height={120} />
              ))
          : issues.map((issue) => (
              <motion.div
                key={issue._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <FaTicketAlt className="text-blue-500" /> {issue.issueTitle}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                  <FaCalendarAlt />{" "}
                  {new Date(issue.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <FaLayerGroup /> {issue.assignedTo}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                      issue.priority === "High"
                        ? "bg-red-200 dark:bg-red-700 text-red-600 dark:text-red-300"
                        : issue.priority === "Medium"
                        ? "bg-yellow-200 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-300"
                        : "bg-green-200 dark:bg-green-700 text-green-600 dark:text-green-300"
                    }`}
                  >
                    <FaFlag /> {issue.priority}
                  </span>
                </div>
              </motion.div>
            ))}
      </div>
      {!loading && issues.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No tickets found.
        </div>
      )}
    </div>
  );
};

export default EmployeeTicketsPage;
