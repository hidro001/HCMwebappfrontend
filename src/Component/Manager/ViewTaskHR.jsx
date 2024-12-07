// import { useState, useEffect } from "react";
// import taskService from "../../services/Service";
// import { format, subDays, addDays } from "date-fns";
// import { Link } from "react-router-dom";

// const ViewTaskHR = () => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isFetching, setIsFetching] = useState(false);

//   const fetchTasks = async (date) => {
//     try {
//       setIsFetching(true);
//       const formattedDate = format(new Date(date), "yyyy-MM-dd");
//       const response = await taskService.getManagerTaskList(formattedDate);
//       if (response.success) {
//         setTasks(response.data || []); // Set tasks to response data or empty array
//       } else {
//         setTasks([]);
//       }
//     } catch (err) {
//       setTasks([]);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks(selectedDate); // Fetch all tasks initially
//   }, [selectedDate]);

//   const handleDateChange = (event) => {
//     const newDate = new Date(event.target.value);
//     setSelectedDate(newDate);
//   };

//   const handleArrowClick = (direction) => {
//     const newDate =
//       direction === "prev"
//         ? subDays(selectedDate, 1)
//         : addDays(selectedDate, 1);
//     setSelectedDate(newDate);
//   };

//   return (
//     <div className="main">
//       <section className="ems-content">
//         <div className="container">

//         </div>
//       </section>
//       <section className="ems-content">
//         <div className="container">
//           <div className="all-employee">
//             <div className="all-head razor-task-hr-all-head d-flex align-items-center justify-content-between">
//               <h4 className="razor-task-hr-title">View Tasks</h4>
//               <div className="d-flex razor-task-hr-controls align-items-center">
//                 <button
//                   onClick={() => handleArrowClick("prev")}
//                   className="btn razor-task-hr-btn"
//                   style={{
//                     backgroundColor: "var(--primaryColor)",
//                     color: "white",
//                     marginRight: "10px",
//                   }}
//                   disabled={isFetching}
//                 >
//                   {"<"}
//                 </button>
//                 <input
//                   type="date"
//                   value={format(selectedDate, "yyyy-MM-dd")}
//                   onChange={handleDateChange}
//                   className="filter-btn razor-task-hr-filter-btn"
//                   style={{
//                     color: "black",
//                   }}
//                 />
//                 <button
//                   onClick={() => handleArrowClick("next")}
//                   className="btn razor-task-hr-btn ml-2"
//                   style={{
//                     backgroundColor: "var(--primaryColor)",
//                     color: "white",
//                     marginLeft: "10px",
//                   }}
//                   disabled={isFetching}
//                 >
//                   {">"}
//                 </button>
//               </div>
//             </div>

//             <div className="row mt-4">
//               <div className="emp-data">
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 {tasks.length > 0 ? (
//                   <div className="task-block mb-3">
//                     <div className="table-responsive">
//                       <table className="text-center table table-striped table-bordered table-hover">
//                         <thead>
//                           <tr>
//                             <th>S No.</th>
//                             <th>Emp ID</th>
//                             <th>Name</th>
//                             <th>Designation</th>
//                             <th>Task</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {tasks.map((task, index) => (
//                             <tr key={task._id}>
//                               <td>{index + 1}</td>
//                               <td>{task.employee_Id}</td>
//                               <td>{task.full_Name}</td>
//                               <td>{task.designation}</td>
//                               <td className="task-dis">
//                                 <ol>
//                                   {task.task.map((taskDetail, i) => (
//                                     <li key={i}>{taskDetail}</li>
//                                   ))}
//                                 </ol>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="text-center table table-striped table-bordered table-hover">
//                       <tbody>
//                         <tr>
//                           <td colSpan="5">No tasks available.</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ViewTaskHR;

// components/ViewTaskHR.js

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { format, subDays, addDays } from "date-fns";
// import { Link } from "react-router-dom";

// const ViewTaskHR = () => {
//   const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage
//   const getManagerTaskList = async (task_Date) => {
//     const response = await axios.get(
//       "https://apiv2.humanmaximizer.com/api/v1/task/manager-tasks",
//       {
//         params: { task_Date },
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   };
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isFetching, setIsFetching] = useState(false);

//   const fetchTasks = async (date) => {
//     try {
//       setIsFetching(true);
//       const formattedDate = format(new Date(date), "yyyy-MM-dd");
//       const response = await getManagerTaskList(formattedDate);

//       if (response.success) {
//         setTasks(response.data || []);
//       } else {
//         setTasks([]);
//       }
//     } catch (err) {
//       setTasks([]);
//       setError("Error fetching tasks.");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks(selectedDate);
//   }, [selectedDate]);

//   const handleDateChange = (event) => {
//     const newDate = new Date(event.target.value);
//     setSelectedDate(newDate);
//   };

//   const handleArrowClick = (direction) => {
//     const newDate =
//       direction === "prev"
//         ? subDays(selectedDate, 1)
//         : addDays(selectedDate, 1);
//     setSelectedDate(newDate);
//   };

//   return (
//     <div className="main">
//       <section className="ems-content">
//         <div className="container">
//           {/* ...other content */}
//           <div className="all-employee">
//             <div className="all-head razor-task-hr-all-head d-flex align-items-center justify-content-between">
//               <h4 className="razor-task-hr-title">View Tasks</h4>
//               <div className="d-flex razor-task-hr-controls align-items-center">
//                 <button
//                   onClick={() => handleArrowClick("prev")}
//                   className="btn razor-task-hr-btn"
//                   style={{
//                     backgroundColor: "var(--primaryColor)",
//                     color: "white",
//                     marginRight: "10px",
//                   }}
//                   disabled={isFetching}
//                 >
//                   {"<"}
//                 </button>
//                 <input
//                   type="date"
//                   value={format(selectedDate, "yyyy-MM-dd")}
//                   onChange={handleDateChange}
//                   className="filter-btn razor-task-hr-filter-btn"
//                   style={{
//                     color: "black",
//                   }}
//                 />
//                 <button
//                   onClick={() => handleArrowClick("next")}
//                   className="btn razor-task-hr-btn ml-2"
//                   style={{
//                     backgroundColor: "var(--primaryColor)",
//                     color: "white",
//                     marginLeft: "10px",
//                   }}
//                   disabled={isFetching}
//                 >
//                   {">"}
//                 </button>
//               </div>
//             </div>

//             <div className="row mt-4">
//               <div className="emp-data">
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 {tasks.length > 0 ? (
//                   <div className="task-block mb-3">
//                     <div className="table-responsive">
//                       <table className="text-center table table-striped table-bordered table-hover">
//                         <thead>
//                           <tr>
//                             <th>S No.</th>
//                             <th>Emp ID</th>
//                             <th>Name</th>
//                             <th>Designation</th>
//                             <th>Task</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {tasks.map((task, index) => (
//                             <tr key={task._id}>
//                               <td>{index + 1}</td>
//                               <td>{task.employee_Id}</td>
//                               <td>{task.full_Name}</td>
//                               <td>{task.designation}</td>
//                               <td className="task-dis">
//                                 <ol>
//                                   {task.task.map((taskDetail, i) => (
//                                     <li key={i}>{taskDetail}</li>
//                                   ))}
//                                 </ol>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="text-center table table-striped table-bordered table-hover">
//                       <tbody>
//                         <tr>
//                           <td colSpan="5">No tasks available.</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ViewTaskHR;

import { useState, useEffect } from "react";
import axios from "axios";
import { format, subDays, addDays } from "date-fns";
import { Link } from "react-router-dom";

const ViewTaskHR = () => {
  const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage

  const getManagerTaskList = async (task_Date) => {
    const response = await axios.get(
      "https://apiv2.humanmaximizer.com/api/v1/task/manager-tasks",
      {
        params: { task_Date },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };

  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFetching, setIsFetching] = useState(false);

  const fetchTasks = async (date) => {
    try {
      setIsFetching(true);
      const formattedDate = format(new Date(date), "yyyy-MM-dd");
      const response = await getManagerTaskList(formattedDate);

      if (response.success) {
        const taskData = response.data || [];
        setTasks(taskData);

        // Extract departments from the task data
        const departmentsSet = new Set();
        taskData.forEach((task) => {
          if (task.department) {
            departmentsSet.add(task.department);
          }
        });
        setDepartments(Array.from(departmentsSet));
      } else {
        setTasks([]);
        setDepartments([]);
      }
    } catch (err) {
      setTasks([]);
      setDepartments([]);
      setError("Error fetching tasks.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
  };

  const handleArrowClick = (direction) => {
    const newDate =
      direction === "prev"
        ? subDays(selectedDate, 1)
        : addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  // Filter tasks based on selected department
  const filteredTasks = selectedDepartment
    ? tasks.filter((task) => task.department === selectedDepartment)
    : tasks;

  return (
    <div className="main">
      <section className="ems-content p-5">
        <div className="container">
          {/* ...other content */}
          <div className="all-employee">
            <div className="all-head razor-task-hr-all-head d-flex align-items-center justify-content-between">
              <h4 className="razor-task-hr-title">View Tasks</h4>
              <div className="d-flex razor-task-hr-controls align-items-center">
                <button
                  onClick={() => handleArrowClick("prev")}
                  className="btn razor-task-hr-btn"
                  style={{
                    backgroundColor: "var(--primaryColor)",
                    color: "white",
                    marginRight: "10px",
                  }}
                  disabled={isFetching}
                >
                  {"<"}
                </button>
                <input
                  type="date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={handleDateChange}
                  className="filter-btn razor-task-hr-filter-btn"
                  style={{
                    color: "black",
                  }}
                />
                <button
                  onClick={() => handleArrowClick("next")}
                  className="btn razor-task-hr-btn ml-2"
                  style={{
                    backgroundColor: "var(--primaryColor)",
                    color: "white",
                    marginLeft: "10px",
                  }}
                  disabled={isFetching}
                >
                  {">"}
                </button>
                {/* Department Filter Dropdown */}
                <select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className="filter-btn razor-task-hr-filter-btn ml-2"
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                  }}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mt-4">
              <div className="emp-data">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {filteredTasks.length > 0 ? (
                  <div className="task-block mb-3">
                    <div className="table-responsive">
                      <table className="text-center table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>S No.</th>
                            <th>Emp ID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Task</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTasks.map((task, index) => (
                            <tr key={task._id}>
                              <td>{index + 1}</td>
                              <td>{task.employee_Id}</td>
                              <td>{task.full_Name}</td>
                              <td>{task.designation}</td>
                              <td>{task.department}</td>
                              <td className="task-dis">
                                <ol>
                                  {task.task.map((taskDetail, i) => (
                                    <li key={i}>{taskDetail}</li>
                                  ))}
                                </ol>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="text-center table table-striped table-bordered table-hover">
                      <tbody>
                        <tr>
                          <td colSpan="6">No tasks available.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTaskHR;
