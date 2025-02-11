import { useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ChatMember({ employees, currentUser, onSelectUser }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter out the current user and remove duplicates
  const uniqueEmployees = useMemo(() => {
    return Array.from(
      new Map(
        employees
          .filter((user) => user.employee_Id !== currentUser)
          .map((user) => [user.employee_Id, user])
      ).values()
    );
  }, [employees, currentUser]);

  // Filtered employees based on search input
  const filteredEmployees = useMemo(() => {
    return uniqueEmployees.filter((member) =>
      `${member.first_Name} ${member.last_Name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [uniqueEmployees, searchTerm]);

  return (
    <div
      className="w-full md:w-1/4 bg-white dark:bg-gray-800 flex flex-col shadow-lg"
      style={{ height: "80vh" }}
    >
      <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 p-4">
        Your Team Members
      </h2>

      {/* Search Input */}
      <div className="px-4 pb-2">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* List of Employees */}
      <div className="flex-grow overflow-y-auto">
        <ul>
          {filteredEmployees.map((member) => (
            <li
              key={member.employee_Id}
              className="flex items-center justify-between p-3 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() =>
                onSelectUser(
                  `${member.first_Name} ${member.last_Name}`,
                  member.employee_Id
                )
              }
            >
              <div className="flex items-center space-x-3">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={`${member.first_Name} ${member.last_Name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
                    {member.first_Name} {member.last_Name}
                  </p>
                  <p
                    className={`text-xs ${
                      member.status === "Online"
                        ? "text-green-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {member.status}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Show message if no users match the search */}
        {filteredEmployees.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 p-4">
            No matching members found.
          </p>
        )}
      </div>
    </div>
  );
}
