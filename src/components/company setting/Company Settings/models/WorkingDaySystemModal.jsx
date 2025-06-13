import BaseModal from "../../../common/BaseModal";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkingDaySystemModal({
  isOpen,
  editId,
  sysName,
  workingDays,
  monthlyLeaves,
  onSysNameChange,
  onWorkingDaysChange,
  onMonthlyLeavesChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      onWorkingDaysChange(workingDays.filter((d) => d !== day));
    } else {
      onWorkingDaysChange([...workingDays, day]);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-sm p-6">
        <h3 className="text-xl font-bold mb-4">
          {editId ? "Edit Leave System" : "Add Leave System"}
        </h3>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={sysName}
            onChange={onSysNameChange}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Working Days</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded border ${
                  workingDays.includes(day)
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Monthly Paid Leaves</label>
          <input
            type="number"
            step="0.5"
            value={monthlyLeaves}
            onChange={onMonthlyLeavesChange}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
