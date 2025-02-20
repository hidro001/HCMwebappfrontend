import axiosInstance from "./axiosInstance";

// Fetch all tasks for logged-in employee (Optional Date Filtering)
export const getTasks = async (filterDate = "") => {
  try {
    const url = filterDate ? `/todo/tasks?date=${filterDate}` : "/todo/tasks";
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post(`/todo/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axiosInstance.put(`/todo/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Update task completion status
export const updateTaskStatus = async (taskId, statusData) => {
  try {
    const response = await axiosInstance.patch(`/todo/tasks/${taskId}/status`, statusData);
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`/todo/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
