import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../../services/Service";

const ViewTaskEmployee = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // Fetch employee ID from localStorage
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await Task.fetchEmployeeTasks(employeeId);
        setTasks(tasksData);
      } catch (error) {
        console.error("Failed to fetch tasks:", error.message);
      }
    };

    if (employeeId) {
      getTasks();
    } else {
      console.error("No employee ID found in localStorage");
    }
  }, [employeeId]);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main">
      <section className="ems-content p-3">
        <div className="container">

          <div className="all-employee">
            <div className="all-head d-flex align-items-center justify-content-between">
              <h4>View Tasks</h4>
              <Link to="/dashboard/add-task" className="add-task">
                <button
                  className="btn btn-purple "
                  style={{ backgroundColor: "#679903", color: "white" }}
                >
                  Update Task
                </button>
              </Link>
            </div>
            <div className="row mt-4">
              <div className="emp-data">
                <div className="table-responsive">
                  <table className="text-center table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>S No.</th>
                        <th>Date</th>
                        <th>Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTasks.length > 0 ? (
                        currentTasks.map((task, index) => (
                          <tr key={task._id}>
                            <td>{index + 1 + startIndex}</td>
                            <td>{task.task_Date || "N/A"}</td>
                            <td className="task-dis">
                              <ul>
                                {task.task.length > 0 ? (
                                  task.task.map((taskItem, idx) => (
                                    <li key={idx}>{taskItem}</li>
                                  ))
                                ) : (
                                  <li>No tasks listed</li>
                                )}
                              </ul>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No tasks found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end">
                  <ul className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""
                          }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        <span className="page-link">{index + 1}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTaskEmployee;
