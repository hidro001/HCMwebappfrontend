import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AutomatedPerformanceReview = ({ tasks }) => {
  const userRole = useSelector((state) => state.auth.userRole);
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    notStartedTasks: 0,
    onHoldTasks: 0,
    highPriorityTasks: 0,
    mediumPriorityTasks: 0,
    lowPriorityTasks: 0,
    topPerformer: null,
    completedOnTime: [],
    completedLate: [],
    notCompleted: [],
    departmentStats: {},
  });

  useEffect(() => {
    const calculateStats = () => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
      ).length;
      const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
      ).length;
      const notStartedTasks = tasks.filter(
        (task) => task.status === "Not Started"
      ).length;
      const onHoldTasks = tasks.filter(
        (task) => task.status === "On Hold"
      ).length;
      const highPriorityTasks = tasks.filter(
        (task) => task.priority === "High"
      ).length;
      const mediumPriorityTasks = tasks.filter(
        (task) => task.priority === "Medium"
      ).length;
      const lowPriorityTasks = tasks.filter(
        (task) => task.priority === "Low"
      ).length;

      const completedTasksByEmployee = tasks
        .filter((task) => task.status === "Completed")
        .reduce((acc, task) => {
          acc[task.employee] = acc[task.employee] ? acc[task.employee] + 1 : 1;
          return acc;
        }, {});

      const topPerformer = Object.keys(completedTasksByEmployee).reduce(
        (a, b) =>
          completedTasksByEmployee[a] > completedTasksByEmployee[b] ? a : b,
        ""
      );

      const today = new Date();
      const completedOnTime = tasks.filter(
        (task) => task.status === "Completed" && new Date(task.dueDate) >= today
      );

      const completedLate = tasks.filter(
        (task) => task.status === "Completed" && new Date(task.dueDate) < today
      );

      const notCompleted = tasks.filter(
        (task) => task.status !== "Completed" && new Date(task.dueDate) < today
      );

      const departmentStats = tasks.reduce((acc, task) => {
        if (!acc[task.department]) {
          acc[task.department] = {
            total: 0,
            completed: 0,
            inProgress: 0,
            notStarted: 0,
            onHold: 0,
          };
        }
        acc[task.department].total += 1;
        if (task.status === "Completed") acc[task.department].completed += 1;
        if (task.status === "In Progress") acc[task.department].inProgress += 1;
        if (task.status === "Not Started") acc[task.department].notStarted += 1;
        if (task.status === "On Hold") acc[task.department].onHold += 1;
        return acc;
      }, {});

      setStats({
        totalTasks,
        completedTasks,
        inProgressTasks,
        notStartedTasks,
        onHoldTasks,
        highPriorityTasks,
        mediumPriorityTasks,
        lowPriorityTasks,
        topPerformer,
        completedOnTime,
        completedLate,
        notCompleted,
        departmentStats,
      });
    };

    calculateStats();
  }, [tasks]);

  return (


    <div className="razor-analysis-container">
      <h2 className="mb-5 mt-4">Automated Performance Review</h2>
      <div className="razor-stats-container">
        <div className="razor-stat-box">
          <h3>Total Tasks</h3>
          <p>{stats.totalTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>Completed Tasks</h3>
          <p>{stats.completedTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>In Progress Tasks</h3>
          <p>{stats.inProgressTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>Not Started Tasks</h3>
          <p>{stats.notStartedTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>On Hold Tasks</h3>
          <p>{stats.onHoldTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>High Priority Tasks</h3>
          <p>{stats.highPriorityTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>Medium Priority Tasks</h3>
          <p>{stats.mediumPriorityTasks}</p>
        </div>
        <div className="razor-stat-box">
          <h3>Low Priority Tasks</h3>
          <p>{stats.lowPriorityTasks}</p>
        </div>
      </div>



      <div className="razor-admin-topperformer-container">
        <h3>Top Performer</h3>
        <table className="razor-admin-topperformer-table" style={{ display: " inline-table" }}>
          <thead>
            <tr>
              <th>Employee</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.topPerformer}</td>

            </tr>
          </tbody>
        </table>

        <h3>Tasks Completed On Time</h3>
        <table className="razor-admin-topperformer-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Task Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.completedOnTime.map((task, index) => (
              <tr key={index}>
                <td>{task.employee}</td>
                <td>{task.taskDescription}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Tasks Completed Late</h3>
        <table className="razor-admin-topperformer-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Task Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.completedLate.map((task, index) => (
              <tr key={index}>
                <td>{task.employee}</td>
                <td>{task.taskDescription}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Tasks Not Completed</h3>
        <table className="razor-admin-topperformer-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Task Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.notCompleted.map((task, index) => (
              <tr key={index}>
                <td>{task.employee}</td>
                <td>{task.taskDescription}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {userRole === "admin" && (
        <>
          <h2 className="mb-5 mt-4">Department-wise Task Summary</h2>
          <div className="razor-stats-container">
            {Object.keys(stats.departmentStats).map((department, index) => (
              <div key={index} className="razor-stat-box">
                <h4>{department}</h4>
                <p>Total: {stats.departmentStats[department].total}</p>
                <p>Completed: {stats.departmentStats[department].completed}</p>
                <p>In Progress: {stats.departmentStats[department].inProgress}</p>
                <p>Not Started: {stats.departmentStats[department].notStarted}</p>
                <p>On Hold: {stats.departmentStats[department].onHold}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>


  );
};


export default AutomatedPerformanceReview;
