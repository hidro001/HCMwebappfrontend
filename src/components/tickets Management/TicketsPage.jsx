// import React, { useState, useMemo } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // React Icons (fontawesome subset, or pick your favorites)
// import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
// import { MdOutlineFileDownload } from "react-icons/md"; // Example for CSV/Excel
// import { motion } from "framer-motion";

// const initialTickets = [
//   {
//     id: "#526534",
//     employeeId: "#526534",
//     assignedTo: "Sameer Hameed",
//     title: "Kathryn Murphy",
//     date: "2024-01-25",
//     priority: "Low",
//     status: "Done",
//     department: "Finance",
//   },
//   {
//     id: "#696589",
//     employeeId: "#696589",
//     assignedTo: "Kyser Shah",
//     title: "Annette Black",
//     date: "2024-01-25",
//     priority: "Medium",
//     status: "On Hold",
//     department: "Marketing",
//   },
//   {
//     id: "#256584",
//     employeeId: "#256584",
//     assignedTo: "Nikunj Gupta",
//     title: "Ronald Richards",
//     date: "2024-02-10",
//     priority: "Low",
//     status: "Done",
//     department: "HR",
//   },
//   {
//     id: "#526587",
//     employeeId: "#526587",
//     assignedTo: "Anand Sharma",
//     title: "Eleanor Pena",
//     date: "2024-02-10",
//     priority: "Low",
//     status: "Done",
//     department: "IT",
//   },
//   {
//     id: "#105986",
//     employeeId: "#105986",
//     assignedTo: "Yash Tandon",
//     title: "Leslie Alexander",
//     date: "2024-03-15",
//     priority: "High",
//     status: "Pending",
//     department: "Finance",
//   },
//   {
//     id: "#526589",
//     employeeId: "#526589",
//     assignedTo: "Rishi Kumar",
//     title: "Albert Flores",
//     date: "2024-03-15",
//     priority: "Low",
//     status: "Done",
//     department: "HR",
//   },
//   {
//     id: "#526520",
//     employeeId: "#526520",
//     assignedTo: "Akhilesh Sharma",
//     title: "Jacob Jones",
//     date: "2024-04-27",
//     priority: "Low",
//     status: "Done",
//     department: "IT",
//   },
//   {
//     id: "#256584_2",
//     employeeId: "#256584",
//     assignedTo: "Kyser Shah",
//     title: "Jerome Bell",
//     date: "2024-04-27",
//     priority: "High",
//     status: "Pending",
//     department: "Marketing",
//   },
//   {
//     id: "#200257",
//     employeeId: "#200257",
//     assignedTo: "Nishant Tandon",
//     title: "Marvin McKinney",
//     date: "2024-04-30",
//     priority: "Low",
//     status: "Done",
//     department: "Finance",
//   },
//   {
//     id: "#526525",
//     employeeId: "#526525",
//     assignedTo: "Nikunj Gupta",
//     title: "Cameron Williamson",
//     date: "2024-04-30",
//     priority: "Low",
//     status: "Done",
//     department: "HR",
//   },
//   // ... Add 10+ more for 20+ dummy items
//   {
//     id: "#111111",
//     employeeId: "#111111",
//     assignedTo: "Rohit Verma",
//     title: "John Doe",
//     date: "2024-05-10",
//     priority: "Medium",
//     status: "On Hold",
//     department: "IT",
//   },
//   {
//     id: "#222222",
//     employeeId: "#222222",
//     assignedTo: "Shreya Sen",
//     title: "Jane Smith",
//     date: "2024-05-12",
//     priority: "High",
//     status: "Pending",
//     department: "Marketing",
//   },
//   {
//     id: "#333333",
//     employeeId: "#333333",
//     assignedTo: "Vishal Singh",
//     title: "Mike Johnson",
//     date: "2024-06-10",
//     priority: "Low",
//     status: "Done",
//     department: "Finance",
//   },
//   {
//     id: "#444444",
//     employeeId: "#444444",
//     assignedTo: "Alia Bhatt",
//     title: "Chris Evans",
//     date: "2024-07-01",
//     priority: "Medium",
//     status: "On Hold",
//     department: "IT",
//   },
//   {
//     id: "#555555",
//     employeeId: "#555555",
//     assignedTo: "Devesh Iyer",
//     title: "Helena Carter",
//     date: "2024-08-15",
//     priority: "High",
//     status: "Pending",
//     department: "HR",
//   },
//   {
//     id: "#666666",
//     employeeId: "#666666",
//     assignedTo: "Pooja Kumari",
//     title: "Ashley Wilson",
//     date: "2024-08-20",
//     priority: "Low",
//     status: "Done",
//     department: "Finance",
//   },
//   {
//     id: "#777777",
//     employeeId: "#777777",
//     assignedTo: "Dhruv Shah",
//     title: "Emma Brown",
//     date: "2024-09-10",
//     priority: "Medium",
//     status: "On Hold",
//     department: "Marketing",
//   },
//   {
//     id: "#888888",
//     employeeId: "#888888",
//     assignedTo: "Fatima Sheikh",
//     title: "Oliver Harris",
//     date: "2024-09-30",
//     priority: "High",
//     status: "Pending",
//     department: "IT",
//   },
//   {
//     id: "#999999",
//     employeeId: "#999999",
//     assignedTo: "Raj Malhotra",
//     title: "Bruce Wayne",
//     date: "2024-10-05",
//     priority: "Low",
//     status: "Done",
//     department: "HR",
//   },
//   {
//     id: "#101010",
//     employeeId: "#101010",
//     assignedTo: "Sameer Hameed",
//     title: "Clark Kent",
//     date: "2024-11-01",
//     priority: "High",
//     status: "Pending",
//     department: "Finance",
//   },
// ];

// const departmentOptions = ["All Departments", "Finance", "HR", "IT", "Marketing"];
// const statusOptions = ["All Statuses", "Done", "Pending", "On Hold"];

// export default function TicketsPage() {
//   // Filters
//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [department, setDepartment] = useState("All Departments");
//   const [status, setStatus] = useState("All Statuses");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter logic
//   const filteredTickets = useMemo(() => {
//     return initialTickets.filter((ticket) => {
//       // Search filter
//       if (
//         searchText &&
//         !(
//           ticket.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
//           ticket.assignedTo.toLowerCase().includes(searchText.toLowerCase()) ||
//           ticket.title.toLowerCase().includes(searchText.toLowerCase())
//         )
//       ) {
//         return false;
//       }
//       // Department filter
//       if (department !== "All Departments" && ticket.department !== department) {
//         return false;
//       }
//       // Status filter
//       if (status !== "All Statuses" && ticket.status !== status) {
//         return false;
//       }
//       // Date filter
//       if (selectedDate) {
//         const ticketDate = new Date(ticket.date).setHours(0, 0, 0, 0);
//         const filterDate = new Date(selectedDate).setHours(0, 0, 0, 0);
//         if (ticketDate !== filterDate) return false;
//       }
//       return true;
//     });
//   }, [searchText, department, status, selectedDate]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredTickets.length / pageSize);
//   const paginatedTickets = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredTickets.slice(startIndex, startIndex + pageSize);
//   }, [filteredTickets, currentPage, pageSize]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Framer Motion variants (optional)
//   const containerVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.4 }
//     },
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
//       <h1 className="text-2xl font-bold">Previous Tickets</h1>

//       {/* Top toolbar with filters & icons (animated with framer-motion) */}
//       <motion.div
//         className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded shadow"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Left side: Show X & search */}
//         <div className="flex flex-wrap items-center gap-3">
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-semibold">Show</label>
//             <select
//               className="border rounded px-2 py-1 text-sm"
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//             </select>
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Search"
//               className="border rounded px-3 py-1 text-sm focus:outline-none"
//               value={searchText}
//               onChange={(e) => {
//                 setSearchText(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>
//         </div>

//         {/* Middle: datepicker, dept, status, export icons */}
//         <div className="flex flex-wrap items-center gap-3">
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setCurrentPage(1);
//             }}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="Select date"
//             className="border rounded px-3 py-1 text-sm focus:outline-none"
//           />

//           <select
//             className="border rounded px-2 py-1 text-sm"
//             value={department}
//             onChange={(e) => {
//               setDepartment(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             {departmentOptions.map((dep) => (
//               <option key={dep} value={dep}>
//                 {dep}
//               </option>
//             ))}
//           </select>

//           <select
//             className="border rounded px-2 py-1 text-sm"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             {statusOptions.map((st) => (
//               <option key={st} value={st}>
//                 {st}
//               </option>
//             ))}
//           </select>

//           <div className="flex items-center gap-2 text-gray-500">
//             {/* Print */}
//             <button
//               title="Print"
//               className="hover:text-gray-700 transition-colors"
//             >
//               <FaPrint size={18} />
//             </button>
//             {/* PDF */}
//             <button
//               title="Export to PDF"
//               className="hover:text-gray-700 transition-colors"
//             >
//               <FaFilePdf size={18} />
//             </button>
//             {/* CSV/Excel (placeholder) */}
//             <button
//               title="Export CSV/Excel"
//               className="hover:text-gray-700 transition-colors"
//             >
//               <MdOutlineFileDownload size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Right side: Raise Ticket */}
//         <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors">
//           + Raise Ticket
//         </button>
//       </motion.div>

//       {/* Table */}
//       <div className="bg-white rounded shadow overflow-x-auto">
//         <table className="w-full text-left border-collapse min-w-max">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-sm font-semibold">S.L</th>
//               <th className="p-3 text-sm font-semibold">Emp ID</th>
//               <th className="p-3 text-sm font-semibold">Assigned To</th>
//               <th className="p-3 text-sm font-semibold">Title</th>
//               <th className="p-3 text-sm font-semibold">Date</th>
//               <th className="p-3 text-sm font-semibold">Priority</th>
//               <th className="p-3 text-sm font-semibold">Status</th>
//               <th className="p-3 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedTickets.map((ticket, index) => {
//               const globalIndex = (currentPage - 1) * pageSize + (index + 1);
//               return (
//                 <tr
//                   key={ticket.id}
//                   className="border-b hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="p-3 text-sm">{String(globalIndex).padStart(2, "0")}</td>
//                   <td className="p-3 text-sm text-blue-600">{ticket.employeeId}</td>
//                   <td className="p-3 text-sm">{ticket.assignedTo}</td>
//                   <td className="p-3 text-sm">{ticket.title}</td>
//                   <td className="p-3 text-sm">
//                     {new Date(ticket.date).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={
//                         ticket.priority === "High"
//                           ? "text-red-600 font-semibold"
//                           : ticket.priority === "Medium"
//                           ? "text-yellow-600 font-semibold"
//                           : "text-green-600 font-semibold"
//                       }
//                     >
//                       {ticket.priority}
//                     </span>
//                   </td>
//                   <td className="p-3 text-sm">
//                     <span
//                       className={
//                         ticket.status === "Done"
//                           ? "bg-green-100 text-green-600 px-2 py-1 rounded text-xs"
//                           : ticket.status === "On Hold"
//                           ? "bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs"
//                           : "bg-red-100 text-red-600 px-2 py-1 rounded text-xs"
//                       }
//                     >
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-sm space-x-3">
//                     {/* View button */}
//                     <button
//                       className="text-blue-500 hover:text-blue-600 transition-colors"
//                       title="View"
//                     >
//                       <FaEye size={16} />
//                     </button>
//                     {/* Edit button */}
//                     <button
//                       className="text-green-500 hover:text-green-600 transition-colors"
//                       title="Edit"
//                     >
//                       <FaEdit size={16} />
//                     </button>
//                     {/* Delete button */}
//                     <button
//                       className="text-red-500 hover:text-red-600 transition-colors"
//                       title="Delete"
//                     >
//                       <FaTrash size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
//           <div>
//             Showing {paginatedTickets.length} of {filteredTickets.length} entries
//           </div>
//           <div className="flex items-center space-x-1">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 className={`px-3 py-1 rounded border ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//                 onClick={() => handlePageChange(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import your TicketFormModal component
import TicketFormModal from "./TicketFormModal";

// React Icons
import { FaEye, FaEdit, FaTrash, FaPrint, FaFilePdf } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { motion } from "framer-motion";

const initialTickets = [
  {
    id: "#526534",
    employeeId: "#526534",
    assignedTo: "Sameer Hameed",
    title: "Kathryn Murphy",
    date: "2024-01-25",
    priority: "Low",
    status: "Done",
    department: "Finance",
  },
  {
    id: "#696589",
    employeeId: "#696589",
    assignedTo: "Kyser Shah",
    title: "Annette Black",
    date: "2024-01-25",
    priority: "Medium",
    status: "On Hold",
    department: "Marketing",
  },
  // ... more dummy data ...
  {
    id: "#101010",
    employeeId: "#101010",
    assignedTo: "Sameer Hameed",
    title: "Clark Kent",
    date: "2024-11-01",
    priority: "High",
    status: "Pending",
    department: "Finance",
  },
];

const departmentOptions = ["All Departments", "Finance", "HR", "IT", "Marketing"];
const statusOptions = ["All Statuses", "Done", "Pending", "On Hold"];

export default function TicketsPage() {
  // Tickets data (If you need to edit tickets in state, store them here)
  const [tickets, setTickets] = useState(initialTickets);

  // --- Modal Controls ---
  const [isModalOpen, setIsModalOpen] = useState(false);   // controls open/close
  const [modalMode, setModalMode] = useState("create");    // "create" or "edit"
  const [selectedTicket, setSelectedTicket] = useState(null);

  // --- Filters ---
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Statuses");

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);

  // Handle create (Raise Ticket) button
  const handleRaiseTicket = () => {
    setModalMode("create");
    setSelectedTicket(null); // no ticket to edit
    setIsModalOpen(true);
  };

  // Handle edit icon
  const handleEdit = (ticket) => {
    setModalMode("edit");
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle the form submission from the modal
  const handleFormSubmit = (formData) => {
    if (modalMode === "create") {
      // Add new ticket
      const newTicket = {
        id: "TEMP_ID_" + Date.now(), // generate some ID
        ...formData,
      };
      setTickets((prev) => [...prev, newTicket]);
    } else {
      // Edit existing ticket
      setTickets((prev) =>
        prev.map((t) => (t.id === selectedTicket.id ? { ...t, ...formData } : t))
      );
    }
  };

  // --- Filtering ---
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Search filter
      if (
        searchText &&
        !(
          ticket.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
          ticket.assignedTo.toLowerCase().includes(searchText.toLowerCase()) ||
          ticket.title.toLowerCase().includes(searchText.toLowerCase())
        )
      ) {
        return false;
      }
      // Department filter
      if (department !== "All Departments" && ticket.department !== department) {
        return false;
      }
      // Status filter
      if (status !== "All Statuses" && ticket.status !== status) {
        return false;
      }
      // Date filter
      if (selectedDate) {
        const ticketDate = new Date(ticket.date).setHours(0, 0, 0, 0);
        const filterDate = new Date(selectedDate).setHours(0, 0, 0, 0);
        if (ticketDate !== filterDate) return false;
      }
      return true;
    });
  }, [tickets, searchText, department, status, selectedDate]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredTickets.length / pageSize);
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTickets.slice(startIndex, startIndex + pageSize);
  }, [filteredTickets, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Previous Tickets</h1>

      {/* Top toolbar with filters & icons */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded shadow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side: Show X & search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm focus:outline-none"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Middle: date picker, dept, status, export icons */}
        <div className="flex flex-wrap items-center gap-3">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="border rounded px-3 py-1 text-sm focus:outline-none"
          />

          <select
            className="border rounded px-2 py-1 text-sm"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            {departmentOptions.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-1 text-sm"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-gray-500">
            {/* Print */}
            <button title="Print" className="hover:text-gray-700 transition-colors">
              <FaPrint size={18} />
            </button>
            {/* PDF */}
            <button title="Export to PDF" className="hover:text-gray-700 transition-colors">
              <FaFilePdf size={18} />
            </button>
            {/* CSV/Excel (placeholder) */}
            <button
              title="Export CSV/Excel"
              className="hover:text-gray-700 transition-colors"
            >
              <MdOutlineFileDownload size={20} />
            </button>
          </div>
        </div>

        {/* Right side: Raise Ticket */}
        <button
          onClick={handleRaiseTicket}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
        >
          + Raise Ticket
        </button>
      </motion.div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-sm font-semibold">S.L</th>
              <th className="p-3 text-sm font-semibold">Emp ID</th>
              <th className="p-3 text-sm font-semibold">Assigned To</th>
              <th className="p-3 text-sm font-semibold">Title</th>
              <th className="p-3 text-sm font-semibold">Date</th>
              <th className="p-3 text-sm font-semibold">Priority</th>
              <th className="p-3 text-sm font-semibold">Status</th>
              <th className="p-3 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket, index) => {
              const globalIndex = (currentPage - 1) * pageSize + (index + 1);
              return (
                <tr
                  key={ticket.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-sm">
                    {String(globalIndex).padStart(2, "0")}
                  </td>
                  <td className="p-3 text-sm text-blue-600">{ticket.employeeId}</td>
                  <td className="p-3 text-sm">{ticket.assignedTo}</td>
                  <td className="p-3 text-sm">{ticket.title}</td>
                  <td className="p-3 text-sm">
                    {new Date(ticket.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm">
                    <span
                      className={
                        ticket.priority === "High"
                          ? "text-red-600 font-semibold"
                          : ticket.priority === "Medium"
                          ? "text-yellow-600 font-semibold"
                          : "text-green-600 font-semibold"
                      }
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    <span
                      className={
                        ticket.status === "Done"
                          ? "bg-green-100 text-green-600 px-2 py-1 rounded text-xs"
                          : ticket.status === "On Hold"
                          ? "bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs"
                          : "bg-red-100 text-red-600 px-2 py-1 rounded text-xs"
                      }
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm space-x-3">
                    {/* View button */}
                    <button
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      title="View"
                    >
                      <FaEye size={16} />
                    </button>
                    {/* Edit button */}
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-green-500 hover:text-green-600 transition-colors"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    {/* Delete button */}
                    <button
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
          <div>
            Showing {paginatedTickets.length} of {filteredTickets.length} entries
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL for Raise/Edit Ticket */}
      <TicketFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}                 // "create" or "edit"
        initialData={selectedTicket}     // pass selected ticket in edit mode
        onSubmit={handleFormSubmit}      // handle form data
      />
    </div>
  );
}
