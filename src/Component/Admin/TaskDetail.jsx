import { useState, useEffect } from "react";
import { format, subDays, addDays } from "date-fns";
import { Link, useLocation } from "react-router-dom";
import taskService from "../../services/Service"; // Ensure this service fetches the task list by date
import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1"; // Define the base API URL

const TaskDetail = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const team = location.state?.team || "";

  const department = location.state?.department || ""; // Retrieve department

  const fetchTasks = async (date) => {
    try {
      setIsFetching(true);
      const formattedDate = format(new Date(date), "yyyy-MM-dd");
      const accessToken = localStorage.getItem("accessToken");

      // Use the new API endpoint with department, teamName, and date as query parameters
      const response = await axios.get(
        `${API_URL}/task/fetch-task?department=${department}&teamName=${team}&date=${formattedDate}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const taskList = response.data.data; // Adjust based on your API's response structure
      setTasks(taskList);
    } catch (err) {
      setError("Error fetching tasks");
      setTasks([]); // Clear tasks on error
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (team) {
      fetchTasks(selectedDate);
    }
  }, [team, selectedDate]);

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

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="all-employee">
            <div className="all-head d-flex align-items-center justify-content-between">
              <h4 className="razor-task-hr-title">View Tasks for {team}</h4>
              <div className="d-flex align-items-center">
                <button
                  onClick={() => handleArrowClick("prev")}
                  className="btn razor-task-hr-btn"
                  disabled={isFetching}
                >
                  {"<"}
                </button>
                <input
                  type="date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={handleDateChange}
                  className="filter-btn razor-task-hr-filter-btn"
                />
                <button
                  onClick={() => handleArrowClick("next")}
                  className="btn razor-task-hr-btn ml-2"
                  disabled={isFetching}
                >
                  {">"}
                </button>
              </div>
            </div>

            <div className="row mt-4">
              <div className="emp-data">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {tasks.length > 0 ? (
                  <div className="task-block mb-3">
                    <div className="table-responsive">
                      <table className="text-center table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>S No.</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Task</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task, index) => (
                            <tr key={task._id}>
                              <td>{index + 1}</td>
                              <td>{task.employee_Id}</td>
                              <td>{task.full_Name}</td>
                              <td>{task.designation}</td>
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
                          <td colSpan="5">No tasks available.</td>
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

export default TaskDetail;
