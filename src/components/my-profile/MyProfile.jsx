import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { getEmployeeProfile } from "../../service/myProfileService";

function MyProfile() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  // Get employeeId from localStorage instead of using URL params or a store
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeProfile(employeeId);
        setEmployee(data.data);
      } catch (err) {
        setError("Failed to fetch employee profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployee();
    } else {
      setError("Employee ID not found in localStorage");
      setLoading(false);
    }
  }, [employeeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Toaster />
        <div className="animate-pulse">
          <div className="flex justify-between mb-6">
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-24 h-24 -mt-12 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mt-2"></div>
            </div>
            <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex space-x-4 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Toaster />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  const formatDate = (str) => (str ? new Date(str).toLocaleDateString() : "N/A");
  const orNA = (value) => (value ? value : "N/A");
  const fullName = `${orNA(employee.first_Name)} ${orNA(employee.last_Name)}`.trim();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </motion.button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Employees Details Of{" "}
          <span className="text-blue-600 dark:text-blue-400">{fullName}</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Employee Profile Card */}
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden border-4 border-white dark:border-gray-800">
                {employee.user_Avatar ? (
                  <img
                    src={employee.user_Avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center pt-16 px-4 pb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {fullName || "N/A"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {orNA(employee.designation)}
            </p>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="px-4 py-4">
            <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
              Personal Info
            </h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Full Name:
                </strong>{" "}
                {fullName}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Email:
                </strong>{" "}
                {orNA(employee.personal_Email_Id)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Phone Number:
                </strong>{" "}
                {orNA(employee.mobile_No)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Department:
                </strong>{" "}
                {orNA(employee.department)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Designation:
                </strong>{" "}
                {orNA(employee.designation)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Date of Joining:
                </strong>{" "}
                {formatDate(employee.date_of_Joining)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Employee ID:
                </strong>{" "}
                {orNA(employee.employee_Id)}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Salary:
                </strong>{" "}
                ₹{employee.salary ?? 0}
              </li>
              <li>
                <strong className="text-blue-600 dark:text-blue-400">
                  Personal Address:
                </strong>{" "}
                {orNA(employee.user_Address)}
              </li>
            </ul>
          </div>
        </div>
        {/* Right side: Tabs with details */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 mb-4">
            <button
              onClick={() => setActiveTab("personal")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "personal"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Personal Details
            </button>
            <button
              onClick={() => setActiveTab("employment")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "employment"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Employment Information
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "documents"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Documents
            </button>
          </div>
          {activeTab === "personal" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-3">
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Full Name
                </span>{" "}
                : {fullName}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Personal Email Address
                </span>{" "}
                : {orNA(employee.personal_Email_Id)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Personal Contact Number
                </span>{" "}
                : {orNA(employee.mobile_No)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Fathers Name
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Date of Birth
                </span>{" "}
                : {formatDate(employee.dob)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Marital Status
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Location
                </span>{" "}
                : {orNA(employee.office_address)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Nationality
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Permanent Residential Address
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Current Residential Address
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Emergency Contact Person
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Emergency Contact Number
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  PAN Number
                </span>{" "}
                : {orNA(employee.pan_No)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Aadhaar Number
                </span>{" "}
                : {orNA(employee.adhaar_Number)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Passport Number
                </span>{" "}
                : N/A
              </p>
            </div>
          )}
          {activeTab === "employment" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-2">
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Employee ID
                </span>{" "}
                : {orNA(employee.employee_Id)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Date of Joining
                </span>{" "}
                : {formatDate(employee.date_of_Joining)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Date of Confirmation
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Employment Status
                </span>{" "}
                : {employee.isActive ? "Active" : "Inactive"}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Designation / Role
                </span>{" "}
                : {orNA(employee.designation)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Department
                </span>{" "}
                : {orNA(employee.department)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Reporting Manager Name & ID
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Job Location
                </span>{" "}
                : {orNA(employee.office_address)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Work Shift
                </span>{" "}
                : {orNA(employee.shift_Timing)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Total Work Experience
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Base Salary at Joining
                </span>{" "}
                : N/A
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Current Base Salary
                </span>{" "}
                : {employee.salary ?? 0}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Working Mail
                </span>{" "}
                : {orNA(employee.working_Email_Id)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Paid Leave
                </span>{" "}
                : {employee.no_of_Paid_Leave ?? 0}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Office Address
                </span>{" "}
                : {orNA(employee.office_address)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  OTP Required
                </span>{" "}
                : {employee.otp === "no" ? "NO" : "YES"}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Latitude & Longitude
                </span>{" "}
                : {orNA(employee.latitude)}, {orNA(employee.longitude)}
              </p>
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Permissions
                </span>{" "}
                :{" "}
                <button
                  onClick={() => setShowPermissionsModal(true)}
                  className="text-blue-600 dark:text-blue-400 underline ml-1"
                >
                  View all
                </button>
              </p>
            </div>
          )}
          {activeTab === "documents" && (
            <div className="leading-6 text-gray-700 dark:text-gray-300 text-sm space-y-4">
              <div>
                <p>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Highest Educational Qualification
                  </span>{" "}
                  : N/A
                </p>
                <p>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Institution/University
                  </span>{" "}
                  : N/A
                </p>
                <p>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Year of Passing
                  </span>{" "}
                  : N/A
                </p>
                <p>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Previous Organization Name
                  </span>{" "}
                  : N/A
                </p>
                <p>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Previous Organization Designation
                  </span>{" "}
                  : N/A
                </p>
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-2">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="space-y-3">
                  {employee.documents?.map((doc) => (
                    <p key={doc._id}>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {doc.name}
                      </span>{" "}
                      :{" "}
                      <span className="text-blue-600 dark:text-blue-400 underline ml-1 cursor-pointer">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          {doc.name || "Document"}
                        </a>
                      </span>
                    </p>
                  ))}
                </div>
                <div className="space-y-3"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded shadow-lg relative p-6">
            <button
              onClick={() => setShowPermissionsModal(false)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              All Permission List
            </h2>
            {employee.permission && employee.permission.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {employee.permission.map((perm, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                No permissions assigned.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
