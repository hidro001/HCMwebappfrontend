import React from "react";

export default function TaskList() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Task List</h2>
        <div className="text-blue-500 cursor-pointer hover:underline font-medium">
          See All →
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="px-4 text-left">Emp ID</th>
              <th className="px-4 text-left">Email</th>
              <th className="px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Kathryn Murphy",
                email: "ulfaha@mail.ru",
                empID: "ulfaha@mail.ru",
                status: "Pending",
                statusColor: "bg-yellow-100 text-yellow-600",
              },
              {
                name: "Annette Black",
                email: "tinest@mail.ru",
                empID: "tinest@mail.ru",
                status: "Rejected",
                statusColor: "bg-red-100 text-red-600",
              },
              {
                name: "Ronald Richards",
                email: "hamli@gmail.com",
                empID: "hamli@gmail.com",
                status: "Completed",
                statusColor: "bg-green-100 text-green-600",
              },
              {
                name: "Eleanor Pena",
                email: "seannand@mail.ru",
                empID: "seannand@mail.ru",
                status: "Completed",
                statusColor: "bg-green-100 text-green-600",
              },
              {
                name: "Eleanor Pena",
                email: "miyokoto@mail.ru",
                empID: "miyokoto@mail.ru",
                status: "Completed",
                statusColor: "bg-green-100 text-green-600",
              },
            ].map((task, index) => (
              <tr key={index} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <span>{task.name}</span>
                </td>
                <td className="px-4">{task.empID}</td>
                <td className="px-4">{task.email}</td>
                <td className="px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${task.statusColor}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
