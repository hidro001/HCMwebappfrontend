import  { useState, useEffect } from 'react';
import { addTask, fetchAllTasks } from '../../../service/taskService'; // Adjust the import path as needed
import { toast } from 'react-hot-toast';

export default function UpdateTask() {
  // Each “task” is just a string
  const [taskList, setTaskList] = useState(['']);
  // This state will hold the tasks fetched from the GET API
  const [fetchedTasks, setFetchedTasks] = useState([]);
  // Loading state for fetch and submission operations
  const [loading, setLoading] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Number of tasks to display per page

  // Hardcoded employee ID; in a real app, you might pass this as a prop or derive it from context.
  const empId = "RI0526";

  // Add a new empty task field
  const handleAddTask = () => {
    setTaskList((prev) => [...prev, '']);
  };

  // Delete a specific task field
  const handleDeleteTask = (index) => {
    setTaskList((prev) => prev.filter((_, i) => i !== index));
  };

  // Update the value for a specific task
  const handleChange = (index, value) => {
    setTaskList((prev) =>
      prev.map((task, i) => (i === index ? value : task))
    );
  };

  // Fetch tasks from the API with loading indicator and error handling
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetchAllTasks(empId);
      if (res && res.success) {
        setFetchedTasks(res.data);
      } else {
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount and when the employee ID changes
  useEffect(() => {
    fetchTasks();
  }, [empId]);

  // Pagination calculations
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = fetchedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(fetchedTasks.length / tasksPerPage);

  // Additional pagination variables
  const totalItems = fetchedTasks.length;
  const startIndex = indexOfFirstTask;
  const endIndex = indexOfLastTask;

  // Function to handle page navigation
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  // Handle form submission to add new tasks
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out empty tasks (trim whitespace)
    const nonEmptyTasks = taskList.filter(task => task.trim().length > 0);
    if (nonEmptyTasks.length === 0) {
      toast.error("Please enter at least one non-empty task.");
      return;
    }
    // Build the payload; adjust the key ("task") as required by your backend.
    const payload = { task: nonEmptyTasks };

    setLoading(true);
    try {
      const result = await addTask(payload);
      console.log('Submitted tasks:', result);
      toast.success("Tasks submitted successfully!");
      // Reset the task list input fields after submission
      setTaskList(['']);
      // Refetch tasks to update the table with the new submission
      fetchTasks();
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Update Task Card */}
      <div className="rounded-md border border-green-300 p-6 dark:border-green-700 dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-semibold text-blue-700 dark:text-blue-400">
          Update Task
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {taskList.map((task, index) => (
            <div key={index} className="relative p-2 border rounded-md border-gray-300 dark:border-gray-600">
              <label
                htmlFor={`task-${index}`}
                className="mb-1 block text-sm font-medium"
              >
                Task {index + 1}
              </label>
              <textarea
                id={`task-${index}`}
                value={task}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Write here something..."
                rows={1}
                className="block w-full rounded border border-gray-300 bg-white p-2 
                           text-gray-700 focus:outline-none dark:border-gray-600 
                           dark:bg-gray-700 dark:text-gray-200"
              />
              {taskList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteTask(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 
                             dark:text-gray-300 dark:hover:text-red-500"
                  title="Delete this task"
                >
                  &#10005;
                </button>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 justify-end">
            <button
              type="button"
              onClick={handleAddTask}
              className="rounded border border-purple-500 px-6 py-1 font-medium 
                         text-purple-500 transition-colors hover:bg-purple-500 hover:text-white"
            >
              Add
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded border border-orange-500 px-6 py-1 font-medium
                         text-orange-500 transition-colors hover:bg-orange-500 hover:text-white disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Fetched Tasks Table */}
      <div className="mt-8 overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">
            <p>Loading tasks...</p>
          </div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                <th className="px-4 py-2">S.L</th>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {currentTasks.length > 0 ? (
                currentTasks.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{index + 1 + indexOfFirstTask}</td>
                    <td className="px-4 py-2">
                      {item.task && item.task.map((t, idx) => (
                        <div key={idx}>
                          {idx + 1}. {t}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">{item.task_Date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan="3">
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
        <span className="text-sm mb-2 sm:mb-0">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`
                  px-3 py-1 border rounded
                  ${currentPage === pageNum ? 'bg-blue-500 text-white' : ''}
                `}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
