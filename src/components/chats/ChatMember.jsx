import React, { useMemo, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function ChatMember({ employees, currentUser, onSelectUser, unreadCounts }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out the current user and remove duplicates.
  const uniqueEmployees = useMemo(() => {
    return Array.from(
      new Map(
        employees
          .filter((user) => user.employee_Id !== currentUser)
          .map((user) => [user.employee_Id, user])
      ).values()
    );
  }, [employees, currentUser]);

  // Filter by search term.
  const filteredEmployees = useMemo(() => {
    return uniqueEmployees.filter((member) =>
      `${member.first_Name} ${member.last_Name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [uniqueEmployees, searchTerm]);

  // Sort so that those with unread messages appear first.
  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      const aUnread = unreadCounts[a.employee_Id] || 0;
      const bUnread = unreadCounts[b.employee_Id] || 0;
      return bUnread - aUnread;
    });
  }, [filteredEmployees, unreadCounts]);

  return (
    <div
      className="w-full md:w-1/4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col shadow-xl rounded-lg overflow-hidden"
      style={{ height: '80vh' }}
    >
      <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 p-4 border-b border-gray-300 dark:border-gray-700">
        Your Team Members
      </h2>

      <div className="px-4 pb-2">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex-grow overflow-y-auto">
        {sortedEmployees.length > 0 ? (
          <ul>
            {sortedEmployees.map((member) => (
              <li
                key={member.employee_Id}
                className="flex items-center justify-between p-3 border-b dark:border-gray-700 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors"
                onClick={() => onSelectUser(member)}
              >
                <div className="flex items-center space-x-3">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={`${member.first_Name} ${member.last_Name}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
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
                        member.status === 'Online'
                          ? 'text-green-500'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {member.status}
                    </p>
                  </div>
                  <span className="ml-auto text-sm font-medium text-gray-700 dark:text-gray-300">
                    {member.employee_Id}
                  </span>
                </div>
                {unreadCounts[member.employee_Id] > 0 && (
                  <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    {unreadCounts[member.employee_Id]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 p-4">
            No matching members found
          </p>
        )}
      </div>
    </div>
  );
}
