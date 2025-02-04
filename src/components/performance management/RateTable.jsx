
// import React from "react";

// export default function RateTable({ data, loading, onRateClick }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
//         View Top Performer
//       </h2>

//       {loading ? (
//         <p className="text-center">Loading subordinates...</p>
//       ) : data && data.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b">
//                 <th className="p-2">S.L</th>
//                 <th className="p-2">Emp ID</th>
//                 <th className="p-2">Employee Name</th>
//                 <th className="p-2">Designation</th>
//                 <th className="p-2">Department</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((member, idx) => (
//                 <tr key={member._id} className="border-b">
//                   <td className="p-2">{String(idx + 1).padStart(2, "0")}</td>
//                   <td className="p-2">{member.employee_Id}</td>
//                   <td className="p-2">
//                     {member.first_Name} {member.last_Name}
//                   </td>
//                   <td className="p-2">{member.designation}</td>
//                   <td className="p-2">{member.department}</td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => onRateClick(member)}
//                       className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded"
//                     >
//                       Rate
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No subordinates found.</p>
//       )}
//     </div>
//   );
// }


import React from "react";

export default function RateTable({ data, loading, onRateClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        View Top Performer
      </h2>

      {loading ? (
        <p className="text-center dark:text-gray-300">Loading subordinates...</p>
      ) : data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  S.L
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Emp ID
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Employee Name
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Designation
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Department
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {data.map((member, idx) => (
                <tr key={member._id}>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {member.employee_Id}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {member.first_Name} {member.last_Name}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {member.designation}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    {member.department}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-700">
                    <button
                      onClick={() => onRateClick(member)}
                      className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded"
                    >
                      Rate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="dark:text-gray-300">No subordinates found.</p>
      )}
    </div>
  );
}

