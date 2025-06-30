import axiosInstance from "./axiosInstance";

export const fetchSubordinates = async () => {
  try {
    const response = await axiosInstance.get("/task/subordinates");
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return [];
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get("/task/assign");
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return [];
  }
};

export const deleteTasks = async (id) => {
  try {
    const response = await axiosInstance.delete(`/task/assign/${id}`); 
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    return null; 
  }
};

export const submitTask = async (taskData) => {
  try {

    const response = await axiosInstance.post("/task/assignv2", taskData);

    
    console.log("Task Submitted Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting task:", error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(`/task/assign/${id}`, taskData);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

export const updateTaskEmp = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(`/task/assign/emp/${id}`, taskData);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};

export const fetchManagerTasks = async (taskDate) => {
  try {
    // Replace the base URL and path as needed.
    const response = await axiosInstance.get(`/task/manager-tasks?task_Date=${taskDate}`);
    if (response.data.success) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching manager tasks:", error);
    return [];
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/task/add-task", taskData);
    console.log("Task added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const fetchAllTasks = async () => {
  try {
    // The empId is passed in the URL.
    const response = await axiosInstance.post(`/task/all-task`);
    console.log("Fetched tasks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};


export const fetchTasksEmp = async () => {
  try {
    const response = await axiosInstance.get("/task/assign");
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return [];
  }
};

export const getTaskStatusSummary = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/task/task-status`, {
      params: { employee_Id: employeeId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task status summary:", error);
    throw error;
  }
};

export const getSubordinateDepartments = async () => {
  try {
    const response = await axiosInstance.get("/task/subordinate/department");
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return [];
  }
};

export const getComments = async (taskId) => {
  try {
    const response = await axiosInstance.get(`/task/comment/${taskId}`, {
    
    });
    return response.data; // data.success, data.data, data.message, etc.
  } catch (error) {
    throw error; // Let the calling function handle errors
  }
};

export const addComment = async (taskId, comment) => {
  try {
    const response = await axiosInstance.post(
      `/task/comment/${taskId}`,
      { comment },
     
    );
    return response.data; // data.success, data.data, data.message, etc.
  } catch (error) {
    throw error;
  }
};

export const updateAcknowledgeStatus = async (taskId, status) => {
  try {
    // status should be "Acknowledged" in your scenario
    const response = await axiosInstance.patch(`/task/assign/acknowledge/${taskId}`, {
      acknowledge: status,
    });
    return response.data; // e.g. { success, message }
  } catch (error) {
    // Forward the entire response so the component can read error.data
    throw error.response;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axiosInstance.delete(`/task/delete/${taskId}`);
    return res.data; // e.g. { success, message }
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Error deleting task.");
    throw error;
  }
};

export const fetchTasksByEmployeeId = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/task/assign/employee/${employeeId}`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching tasks by employee:", error);
    return [];
  }
};

// e.g. "fetchDailyTasksByEmployeeId" calling the new route
export const fetchDailyTasksByEmployeeId = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/task/daily/employee/${employeeId}`);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching daily tasks:", error);
    return [];
  }
};



export const updateTaskdaily = async (taskId, payload) => {
  try {
    const res = await axiosInstance.put(`/task/edit/${taskId}`, payload);
    return res.data; // e.g. { success, message }
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Error updating task.");
    throw error;
  }
};