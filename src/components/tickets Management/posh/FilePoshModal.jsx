// import  { Fragment, useState, useEffect, useMemo } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePoshStore } from "../../../store/poshStore";

// export default function FilePoshModal({ isOpen, onClose, ticket, onSave }) {
//   const [accusedId, setAccusedId] = useState("");
//   const [complaintType, setComplaintType] = useState("");
//   const [incidentDate, setIncidentDate] = useState(null);
//   const [description, setDescription] = useState("");
//   const [fileAttachment, setFileAttachment] = useState(null);
//   const { employees, fetchAllEmployees, createPoshAct, updatePoshAct } = usePoshStore();
//   const isEdit = Boolean(ticket && ticket.id);

//   useEffect(() => {
//     if (isOpen) fetchAllEmployees();
//   }, [isOpen, fetchAllEmployees]);

//   useEffect(() => {
//     if (ticket) {
//       const foundEmp = employees.find(
//         (emp) => emp._id === ticket.accusedId || emp.employee_Id === ticket.accusedId
//       );
//       setAccusedId(foundEmp ? foundEmp._id : ticket.accusedId || "");
//       setComplaintType(ticket.type || "");
//       setIncidentDate(ticket.incidentDate ? new Date(ticket.incidentDate) : null);
//       setDescription(ticket.description || "");
//       setFileAttachment(null);
//     } else {
//       setAccusedId("");
//       setComplaintType("");
//       setIncidentDate(null);
//       setDescription("");
//       setFileAttachment(null);
//     }
//   }, [ticket, employees]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("accusedId", accusedId);
//       formData.append("type", complaintType);
//       if (incidentDate) {
//         formData.append("dateOfIncident", incidentDate.toISOString().split("T")[0]);
//       }
//       formData.append("description", description);
//       if (fileAttachment) {
//         formData.append("attachments", fileAttachment);
//       }
//       if (isEdit && ticket?.id) {
//         await updatePoshAct(ticket.id, formData);
//       } else {
//         await createPoshAct(formData);
//       }
//       if (onSave) onSave();
//       onClose();
//     } catch (err) {
//       console.error("Error saving POSH Act:", err);
//     }
//   };

//   const employeeOptions = useMemo(
//     () =>
//       employees.map((emp) => ({
//         value: emp._id,
//         label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
//       })),
//     [employees]
//   );

//   const selectedEmployeeOption = useMemo(
//     () => employeeOptions.find((option) => option.value === accusedId) || null,
//     [accusedId, employeeOptions]
//   );

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Transition appear show={isOpen} as={Fragment}>
//           <Dialog as="div" className="relative z-50" onClose={onClose}>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-200"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
//             </Transition.Child>
//             <div className="fixed inset-0 overflow-y-auto">
//               <div className="flex min-h-full items-center justify-center p-4">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-200"
//                   enterFrom="opacity-0 translate-y-4"
//                   enterTo="opacity-100 translate-y-0"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0"
//                   leaveTo="opacity-0 translate-y-4"
//                 >
//                   <Dialog.Panel className="w-full max-w-md">
//                     <motion.div
//                       className="p-6 rounded bg-white dark:bg-gray-800 shadow-lg transition-colors"
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                     >
//                       <Dialog.Title className="text-xl font-semibold mb-4 dark:text-gray-100">
//                         {isEdit ? "Edit POSH Issue" : "File a POSH Issue"}
//                       </Dialog.Title>
//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                           <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                             Accused Employee
//                           </label>
//                           <Select
//                             options={employeeOptions}
//                             value={selectedEmployeeOption}
//                             onChange={(selected) => setAccusedId(selected?.value || "")}
//                             isDisabled={isEdit}
//                             isSearchable={!isEdit}
//                             placeholder="Select or search an employee..."
//                             styles={{
//                               control: (base) => ({
//                                 ...base,
//                                 backgroundColor: "var(--tw-bg-opacity)",
//                                 borderColor: "#d1d5db",
//                               }),
//                             }}
//                           />
//                         </div>
//                         <div>
//                           <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                             Type of Complaint
//                           </label>
//                           <select
//                             className="w-full border rounded px-3 py-1 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
//                             value={complaintType}
//                             onChange={(e) => setComplaintType(e.target.value)}
//                             required
//                           >
//                             <option value="">Select Type</option>
//                             <option value="Sexual Harassment">Sexual Harassment</option>
//                             <option value="Abuse">Abuse</option>
//                             <option value="Discrimination">Discrimination</option>
//                             <option value="Other">Other</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                             Incident Date
//                           </label>
//                           <DatePicker
//                             selected={incidentDate}
//                             onChange={(date) => setIncidentDate(date)}
//                             dateFormat="dd/MM/yyyy"
//                             className="w-full border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
//                             placeholderText="DD/MM/YYYY"
//                           />
//                         </div>
//                         <div>
//                           <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                             Description
//                           </label>
//                           <textarea
//                             className="w-full border rounded px-3 py-1 h-24 dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block font-medium text-sm mb-1 dark:text-gray-100">
//                             Proof / Attachment
//                           </label>
//                           <input
//                             type="file"
//                             className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:bg-gray-700 dark:text-gray-100 dark:file:bg-gray-600 dark:file:text-gray-100"
//                             onChange={(e) => setFileAttachment(e.target.files?.[0] || null)}
//                           />
//                         </div>
//                         <div className="flex justify-end space-x-3">
//                           <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             type="submit"
//                             className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
//                           >
//                             {isEdit ? "Update Posh" : "Submit Posh"}
//                           </button>
//                         </div>
//                       </form>
//                     </motion.div>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition>
//       )}
//     </AnimatePresence>
//   );
// }


import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { usePoshStore } from "../../../store/poshStore";

// 1) Import your BaseModal
import BaseModal from "../../common/BaseModal"; // Adjust the path as needed

export default function FilePoshModal({ isOpen, onClose, ticket, onSave }) {
  const [accusedId, setAccusedId] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [incidentDate, setIncidentDate] = useState(null);
  const [description, setDescription] = useState("");
  const [fileAttachment, setFileAttachment] = useState(null);

  const { employees, fetchAllEmployees, createPoshAct, updatePoshAct } = usePoshStore();
  const isEdit = Boolean(ticket && ticket.id);

  useEffect(() => {
    if (isOpen) fetchAllEmployees();
  }, [isOpen, fetchAllEmployees]);

  useEffect(() => {
    if (ticket) {
      const foundEmp = employees.find(
        (emp) => emp._id === ticket.accusedId || emp.employee_Id === ticket.accusedId
      );
      setAccusedId(foundEmp ? foundEmp._id : ticket.accusedId || "");
      setComplaintType(ticket.type || "");
      setIncidentDate(ticket.incidentDate ? new Date(ticket.incidentDate) : null);
      setDescription(ticket.description || "");
      setFileAttachment(null);
    } else {
      setAccusedId("");
      setComplaintType("");
      setIncidentDate(null);
      setDescription("");
      setFileAttachment(null);
    }
  }, [ticket, employees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("accusedId", accusedId);
      formData.append("type", complaintType);
      if (incidentDate) {
        formData.append("dateOfIncident", incidentDate.toISOString().split("T")[0]);
      }
      formData.append("description", description);
      if (fileAttachment) {
        formData.append("attachments", fileAttachment);
      }

      if (isEdit && ticket?.id) {
        await updatePoshAct(ticket.id, formData);
      } else {
        await createPoshAct(formData);
      }
      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error("Error saving POSH Act:", err);
    }
  };

  const employeeOptions = useMemo(
    () =>
      employees.map((emp) => ({
        value: emp._id,
        label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id})`,
      })),
    [employees]
  );

  const selectedEmployeeOption = useMemo(
    () => employeeOptions.find((option) => option.value === accusedId) || null,
    [accusedId, employeeOptions]
  );

  if (!isOpen) return null;

  return (
    // 2) Wrap everything in a BaseModal
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 3) Keep <AnimatePresence> + <motion.div> for the panel animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full max-w-md p-6 rounded bg-white dark:bg-gray-800 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
              {isEdit ? "Edit POSH Issue" : "File a POSH Issue"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-sm mb-1 dark:text-gray-100">
                  Accused Employee
                </label>
                <Select
                  options={employeeOptions}
                  value={selectedEmployeeOption}
                  onChange={(selected) => setAccusedId(selected?.value || "")}
                  isDisabled={isEdit}
                  isSearchable={!isEdit}
                  placeholder="Select or search an employee..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#d1d5db",
                      backgroundColor: "var(--tw-bg-opacity)",
                    }),
                  }}
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1 dark:text-gray-100">
                  Type of Complaint
                </label>
                <select
                  className="w-full border rounded px-3 py-1 focus:outline-none 
                             dark:bg-gray-700 dark:text-gray-100"
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Sexual Harassment">Sexual Harassment</option>
                  <option value="Abuse">Abuse</option>
                  <option value="Discrimination">Discrimination</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-sm mb-1 dark:text-gray-100">
                  Incident Date
                </label>
                <DatePicker
                  selected={incidentDate}
                  onChange={(date) => setIncidentDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border rounded px-3 py-1 dark:bg-gray-700 
                             dark:text-gray-100 focus:outline-none"
                  placeholderText="DD/MM/YYYY"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1 dark:text-gray-100">
                  Description
                </label>
                <textarea
                  className="w-full border rounded px-3 py-1 h-24 dark:bg-gray-700 
                             dark:text-gray-100 focus:outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1 dark:text-gray-100">
                  Proof / Attachment
                </label>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-900 
                             file:mr-4 file:py-2 file:px-4 file:rounded 
                             file:border-0 file:text-sm file:font-semibold 
                             file:bg-blue-50 file:text-blue-700 
                             hover:file:bg-blue-100 
                             dark:bg-gray-700 dark:text-gray-100 
                             dark:file:bg-gray-600 dark:file:text-gray-100"
                  onChange={(e) => setFileAttachment(e.target.files?.[0] || null)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 
                             text-sm font-semibold hover:bg-gray-400 
                             dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white text-sm 
                             font-semibold hover:bg-blue-700"
                >
                  {isEdit ? "Update Posh" : "Submit Posh"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}
