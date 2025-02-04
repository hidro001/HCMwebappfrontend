import React, { useState, useEffect } from 'react';
import { addTask, fetchAllTasks } from '../../../service/taskService'; // Adjust the import path as needed
import { toast } from 'react-hot-toast';

export default function UpdateTask() {
  // Each “task” is just a string
  const [taskList, setTaskList] = useState(['']);
  // This state will hold the tasks fetched from the GET API
  const [fetchedTasks, setFetchedTasks] = useState([]);
  
  // Hardcoded employee ID; in a real app, you might pass this as a prop or derive it from context.
  const empId = "RI0526";

  // Add a new text area
  const handleAddTask = () => {
    setTaskList((prev) => [...prev, '']);
  };

  // Delete a specific row
  const handleDeleteTask = (index) => {
    setTaskList((prev) => prev.filter((_, i) => i !== index));
  };

  // Update the user’s text
  const handleChange = (index, value) => {
    setTaskList((prev) =>
      prev.map((task, i) => (i === index ? value : task))
    );
  };

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const res = await fetchAllTasks(empId);
      if (res && res.success) {
        setFetchedTasks(res.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks.");
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [empId]);

  // Handle form submission
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

    try {
      const result = await addTask(payload);
      console.log('Submitted tasks:', result);
      toast.success("Tasks submitted successfully!");
      // Clear the fields after submission by resetting the state.
      setTaskList(['']);
      // Optionally refetch tasks to update the table with the new submission.
      fetchTasks();
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Top banner with "Hide Help" */}
      <div className="relative mb-6 rounded-md border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-gray-800">
        <button
          type="button"
          className="absolute top-4 right-4 text-sm font-medium text-gray-700 hover:underline dark:text-gray-200"
        >
          Hide Help
        </button>
        <p className="leading-snug">
          Stay on top of your department's progress with Department Statistics! Gain insights into 
          department-wise tasks, track delayed and assigned tasks, and highlight important dates on 
          the calendar. Keep your team organized, efficient, and always a step ahead!
        </p>
      </div>

      {/* Update Task card */}
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
              {/* “X” button in top-right corner if more than 1 task */}
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

          {/* Buttons row aligned to the right */}
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
              className="rounded border border-orange-500 px-6 py-1 font-medium
                         text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Table Section: Display fetched tasks */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              <th className="px-4 py-2">S.L</th>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {fetchedTasks.length > 0 ? (
              fetchedTasks.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{index + 1}</td>
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
      </div>
    </div>
  );
}
