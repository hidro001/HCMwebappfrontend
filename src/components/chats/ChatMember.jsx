import { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ChatMember({ employees, currentUser, onSelectUser }) {
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

  return (
    // The container takes full height (h-full) so that its parent must have a defined height (like h-screen)
    <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 flex flex-col shadow-lg" style={{height:"80vh"}}>
      <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 p-4">
        Your Team Member
      </h2>
      {/* This container grows and scrolls independently if the list is long */}
      <div className="flex-grow overflow-y-auto">
        <ul>
          {uniqueEmployees.map((member, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() =>
                onSelectUser(
                  `${member.first_Name} ${member.last_Name}`,
                  member.employee_Id
                )
              }
            >
              <div className="flex items-center space-x-3">
                {/* Use the avatar if available, otherwise fallback to icon */}
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
      </div>
    </div>
  );
}
