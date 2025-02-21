// // src/components/UsersListForDisciplinary.jsx
// import React from "react";
// import { Button } from "@mui/material";
// import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
// import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";

// const UsersListForDisciplinary = () => {
//   const {
//     users,
//     fetchAllUsers,
//     createDisciplinaryAction,
//     loading,
//   } = useDisciplinaryStore();

//   const [openModal, setOpenModal] = React.useState(false);
//   const [selectedUserId, setSelectedUserId] = React.useState(null);

//   React.useEffect(() => {
//     fetchAllUsers();
//   }, [fetchAllUsers]);

//   const handleOpenModal = (userId) => {
//     setSelectedUserId(userId);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedUserId(null);
//   };

//   // Create Disciplinary Action
//   const handleCreate = (data) => {
//     // Ensure userId is included
//     data.userId = selectedUserId;
//     createDisciplinaryAction(data, () => {
//       handleCloseModal();
//     });
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">All Users</h1>

//       {loading && <p className="text-gray-500">Loading...</p>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Employee ID</th>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Department</th>
//               <th className="px-4 py-2 text-left">Designation</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="px-4 py-2">{user.employee_Id}</td>
//                 <td className="px-4 py-2">
//                   {user.first_Name} {user.last_Name}
//                 </td>
//                 <td className="px-4 py-2">{user.department}</td>
//                 <td className="px-4 py-2">{user.designation}</td>
//                 <td className="px-4 py-2">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleOpenModal(user._id)}
//                   >
//                     Disciplinary Action
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for Creating Disciplinary Action */}
//       <DisciplinaryActionFormModal
//         open={openModal}
//         onClose={handleCloseModal}
//         onSubmit={handleCreate}
//         isEdit={false}
//         defaultValues={{
//           actionType: "",
//           date: "",
//           notes: "",
//         }}
//       />
//     </div>
//   );
// };

// export default UsersListForDisciplinary;


import React from "react";
import { Button } from "@mui/material";
import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";

const UsersListForDisciplinary = () => {
  const {
    users,
    fetchAllUsers,
    createDisciplinaryAction,
    loading,
  } = useDisciplinaryStore();

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  React.useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  // Create Disciplinary Action
  const handleCreate = (data) => {
    data.userId = selectedUserId;
    createDisciplinaryAction(data, () => {
      handleCloseModal();
    });
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-bold mb-4 dark:text-white">All Users</h1>

      {loading && (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left dark:text-gray-200">
                Employee ID
              </th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Name</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">
                Department
              </th>
              <th className="px-4 py-2 text-left dark:text-gray-200">
                Designation
              </th>
              <th className="px-4 py-2 text-left dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="border-b dark:border-gray-700"
              >
                <td className="px-4 py-2 dark:text-gray-100">
                  {user.employee_Id}
                </td>
                <td className="px-4 py-2 dark:text-gray-100">
                  {user.first_Name} {user.last_Name}
                </td>
                <td className="px-4 py-2 dark:text-gray-100">
                  {user.department}
                </td>
                <td className="px-4 py-2 dark:text-gray-100">
                  {user.designation}
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(user._id)}
                  >
                    Disciplinary Action
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating Disciplinary Action */}
      <DisciplinaryActionFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
        isEdit={false}
        defaultValues={{
          actionType: "",
          date: "",
          notes: "",
        }}
      />
    </div>
  );
};

export default UsersListForDisciplinary;
