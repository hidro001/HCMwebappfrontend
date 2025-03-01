import axiosInstance from "./axiosInstance";

// main page #############################################################

export const fetchLineChartData = async (year = 2025) => {
  try {
    const res = await axiosInstance.get(
      `/payroll-dashboard/linechart?year=${year}`
    );
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching line chart data:", error);
    throw error;
  }
};

export const fetchDoughnutChartData = async () => {
  try {
    const res = await axiosInstance.get(`/payroll-dashboard/doughnut`);
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching doughnut chart data:", error);
    throw error;
  }
};

export const fetchPayrollList = async () => {
  try {
    const res = await axiosInstance.get(`/payroll-dashboard/list`);
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching payroll list:", error);
    throw error;
  }
};

// Manage Payroll #############################################################

export async function fetchAllPayroll(month, year) {
  const response = await axiosInstance.get(
    `/admin/payroll/getpayroll?month=${month}&year=${year}`
  );
  return response.data?.data || [];
}

export async function fetchAllocatedDepartments(employeeId) {
  const response = await axiosInstance.get(
    `/superadmin/departmentAlocated/${employeeId}`
  );
  return response.data?.departmentAlocated || [];
}

export async function addPayroll(month, year) {
  const response = await axiosInstance.post(
    `/admin/payroll/addpayroll?month=${month}&year=${year}`
  );
  return response.data;
}

export async function getAdminStats() {
  const response = await axiosInstance.get("/admin/stats");
  return response.data;
}

export async function updatePayroll(payrollId, updates) {
  const response = await axiosInstance.put(
    `/admin/payroll/update/${payrollId}`,
    updates
  );
  return response.data;
}

// ✅ Fetch Payroll Data by Employee ID, Month & Year
export async function getPayrollById(employeeId, month, year) {
  try {
    const response = await axiosInstance.get(`/admin/payroll/${employeeId}`, {
      params: { month, year },
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch payroll data.",
    };
  }
}

// ✅ Update ONLY Deduction and Final Salary by Employee ID, Month & Year
export async function updatePayrollDeductionAndSalary(
  employeeId,
  month,
  year,
  deduction,
  finalSalary
) {
  try {
    const response = await axiosInstance.put(
      `/admin/payroll/update/${employeeId}`,
      {
        month,
        year,
        deduction,
        finalSalary,
      }
    );

    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update payroll data.",
    };
  }
}

// ✅ Fetch Payroll Summary for a given month & year
export async function getPayrollSummary(month, year) {
  try {
    const response = await axiosInstance.get("/admin/payroll/count/payroll", {
      params: { month, year },
    });

    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch payroll summary.",
    };
  }
}

// Manage Claims #############################################################

export async function fetchAllRequests() {
  const response = await axiosInstance.get(
    "/superadmin/companysettings/requests"
  );
  return response.data?.data || [];
}

export async function deleteRequests(id) {
  try {
    const response = await axiosInstance.delete(
      `/superadmin/companysettings/requests/${id}`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Error deleting request:", error);
    throw new Error("Failed to delete the request.");
  }
}

export async function getDepartment() {
  try {
    const response = await axiosInstance.get(`/superadmin/departments`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error deleting request:", error);
    throw new Error("Failed to delete the request.");
  }
}
export async function getPayrollCount() {
  try {
    const response = await axiosInstance.get(`/superadmin/departments`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error deleting request:", error);
    throw new Error("Failed to delete the request.");
  }
}

//

export const updateHikeRequest = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/request/hike/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating hike request:", error);
    throw error;
  }
};

export const updateLoanRequest = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/request/loan/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating loan request:", error);
    throw error;
  }
};

// payrollService.js (or a similar file where your API calls live)

// requestController.js

export const updateReimbursementRequest = async (req, res) => {
  try {
    const updateData = req.body;

    // Find and update only if the request type is "Reimbursement"
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: req.params.id, type: "Reimbursement" },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Reimbursement request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating reimbursement request:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export async function updateAdvanceRequest(id, data) {
  try {
    // Call the route you already created: /v1/request/advance/:id
    const response = await axiosInstance.put(`/v1/request/advance/${id}`, data);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error updating Advance request:", error);
    throw new Error("Failed to update the Advance request.");
  }
}
