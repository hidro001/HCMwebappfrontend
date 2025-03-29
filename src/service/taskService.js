import axiosInstance from "./axiosInstance";

export const fetchSubordinates = async () => {
  try {
    const response = await axiosInstance.get("/admin/subordinates");
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
    const response = await axiosInstance.get("/admin/assign");
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
    const response = await axiosInstance.delete(`/admin/assign/${id}`); 
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
    const response = await axiosInstance.post("/admin/assign", taskData);
    console.log("Task Submitted Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting task:", error);
    throw error;
  }
};









export const updateTask = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(`/admin/assign/${id}`, taskData);
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
    const response = await axiosInstance.put(`/admin/assign/emp/${id}`, taskData);
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
      return response.data.data;
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



// EMPLOYEE TASKS



export const fetchTasksEmp = async () => {
  try {
    const response = await axiosInstance.get("/employee/assign");
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return [];
  }
};

//  task count main



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









// comment for task







export const getComments = async (taskId) => {
  try {
    // Adjust the base URL if needed, e.g., axios.create({ baseURL: 'http://localhost:4000' })
    const response = await axiosInstance.get(`/admin/comment/${taskId}`, {
    
    });
    return response.data; // data.success, data.data, data.message, etc.
  } catch (error) {
    throw error; // Let the calling function handle errors
  }
};


export const addComment = async (taskId, comment) => {
  try {
    const response = await axiosInstance.post(
      `/admin/comment/${taskId}`,
      { comment },
     
    );
    return response.data; // data.success, data.data, data.message, etc.
  } catch (error) {
    throw error;
  }
};
