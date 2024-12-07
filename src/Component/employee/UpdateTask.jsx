import { useState } from "react";
import { addTask } from "../../services/Service";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const [tasks, setTasks] = useState([{ description: "" }]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (index, event) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, description: event.target.value } : task
    );
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { description: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the tasks?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const taskDescriptions = tasks.map((task) => task.description);
          await addTask(taskDescriptions);
          setSuccess(true);
          toast.success("Tasks Posted Successfully!", {
            position: "top-center",
          });
          console.log("Tasks added successfully");
          setTasks([{ description: "" }]);
        } catch (err) {
          setError(err.message);
          toast.error("Error adding tasks", {
            position: "top-center",
          });
          console.error("Error adding tasks:", err);
        }
      }
    });
  };

  return (
    <div className="main">
      <ToastContainer />
      <section className="ems-content">
        <div className="container ">

          <div className="all-employee">
            <div className="all-head">
              <h4>Update Task</h4>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="task-wrap">
                  <form onSubmit={handleSubmit}>
                    {tasks.map((task, index) => (
                      <div key={index} className="col-lg-12 mb-3">
                        <label htmlFor={`task-${index}`}>
                          Update Task {index + 1}
                        </label>
                        <textarea
                          name={`task-${index}`}
                          required
                          className="form-control"
                          rows={2}
                          id={`task-${index}`}
                          placeholder="Write here..."
                          value={task.description}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddTask}
                      className="sb-task me-3"
                    >
                      Add Task
                    </button>
                    <button type="submit" className="sb-task">
                      Submit Tasks
                    </button>
                  </form>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateTask;
