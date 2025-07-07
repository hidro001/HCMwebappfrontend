import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaSave, FaStopwatch } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";

export default function LeavePolicies() {
  const {
    fetchAttendancePolicies,
    updateAttendancePolicies,
  } = useCompanySettingsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [localPolicies, setLocalPolicies] = useState({});

  useEffect(() => {
    fetchAttendancePolicies();
  }, [fetchAttendancePolicies]);

  const handleChange = (name, value) => {
    setLocalPolicies((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateAttendancePolicies({
        leavePolicies: localPolicies,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const inputFields = [
    {
        name: "leaveAccrualType",
        label: "Leave Accrual Type",
        icon: FaClock,
        color: "green",
        type: "select",
        options: ["Monthly", "Yearly"],
        description: "How leave is credited: monthly or yearly.",
    },
    {
        name: "carryForwardAllowed",
        label: "Carry Forward Allowed",
        icon: FaStopwatch,
        color: "purple",
        type: "boolean",
        description: "Can unused leave be carried forward to the next cycle?",
    },
    {
        name: "carryForwardResetDayMonth",
        label: "Carry Forward Reset (Day & Month)",
        icon: HiClock,
        color: "blue",
        type: "dayMonth",
        description: "Select the day and month when carry forward resets",
        condition: (policies) => policies.carryForwardAllowed === true,
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-8">
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <HiClock className="text-blue-600 dark:text-blue-400 text-2xl" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    General Leave Settings
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Configure how leave is accrued and carried forward in your organization.
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {inputFields
  .filter((field) => !field.condition || field.condition(localPolicies))
  .map((field) => (
    <motion.div
      key={field.name}
      whileHover={{ scale: 1.02 }}
      className="space-y-2"
    >
    
      <label className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200">
        <div className={`p-2 rounded-lg bg-${field.color}-100 dark:bg-${field.color}-900/30`}>
          <field.icon className={`text-${field.color}-600 dark:text-${field.color}-300 text-lg`} />
        </div>
        <span>{field.label}</span>
      </label>

      {field.type === "select" && (
        <select
          value={localPolicies[field.name] ?? ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          <option value="">Select</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {field.type === "boolean" && (
        <select
          value={localPolicies[field.name] ? "Yes" : "No"}
          onChange={(e) => handleChange(field.name, e.target.value === "Yes")}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      )}

      {field.type === "dayMonth" && (
        <div className="flex gap-4">
          <select
            value={localPolicies[field.name]?.split("-")[0] || "01"}
            onChange={(e) => {
              const [_, day] = (localPolicies[field.name] || "01-01").split("-");
              handleChange(field.name, `${e.target.value}-${day}`);
            }}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            {[
              ["Jan", "January"], ["Feb", "February"], ["Mar", "March"], ["Apr", "April"],
              ["May", "May"], ["Jun", "June"], ["Jul", "July"], ["Aug", "August"],
              ["Sep", "September"], ["Oct", "October"], ["Nov", "November"], ["Dec", "December"]
            ].map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            value={localPolicies[field.name]?.split("-")[1] || "Jan"}
            onChange={(e) => {
              const [month] = (localPolicies[field.name] || "Jan-01").split("-");
              handleChange(field.name, `${month}-${e.target.value}`);
            }}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            {Array.from({ length: 31 }, (_, i) => {
              const day = String(i + 1).padStart(2, "0");
              return <option key={day} value={day}>{day}</option>;
            })}
          </select>
        </div>
      )}

      {field.type !== "select" &&
        field.type !== "boolean" &&
        field.type !== "dayMonth" && (
          <input
            type={field.type}
            value={localPolicies[field.name] ?? ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
      )}

      {/* Description */}
      {field.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">{field.description}</p>
      )}
    </motion.div>
))}


              </div>
            </div>
          </motion.div>


          {/* Save Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium shadow-lg transition-all"
                >
                    {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                    </>
                    ) : (
                    <>
                        <FaSave className="text-lg" />
                        <span>Save Changes</span>
                    </>
                    )}
                </motion.button>
            </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
