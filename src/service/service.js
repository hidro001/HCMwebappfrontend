// src/services/authService.js
import axiosInstance from "./axiosInstance";

// Login function
export const login = async (employeeId, password) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      employee_Id: employeeId,
      password,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

// OTP Verification function
export const verifyOtp = async (employeeId, otp) => {
  try {
    const response = await axiosInstance.post("/user/verify-otp", {
      employee_Id: employeeId,
      otp,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "OTP verification failed");
    }
  } catch (error) {
    console.error("OTP verification error:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};

// Resend OTP function
export const resendOtp = async (employeeId) => {
  try {
    const response = await axiosInstance.post("/user/resend-otp", {
      employee_Id: employeeId,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Resend OTP failed");
    }
  } catch (error) {
    console.error("Resend OTP error:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to resend OTP");
  }
};

// Password Reset Request
export const passwordResetRequest = async (employeeId) => {
  try {
    const response = await axiosInstance.post("/auth/password-reset-request", {
      employee_Id: employeeId,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Password reset request failed");
    }
  } catch (error) {
    console.error("Password reset request error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to send password reset link"
    );
  }
};

// Fetch Company Info
export const fetchCompanyInfo = async () => {
  try {
    const response = await axiosInstance.get("/superadmin/info/getCompanyInfo");

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch company info");
    }
  } catch (error) {
    console.error("Fetch company info error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch company info"
    );
  }
};

// Reset Password function
export const resetPassword = async (
  resetToken,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", {
      resetToken,
      newPassword,
      confirmPassword,
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to reset password");
    }
  } catch (error) {
    console.error("Reset password error:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while resetting the password"
    );
  }
};


// Existing function: Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axiosInstance.put(
      `/notification/mark-as-read`,
      { notificationId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Adjust token retrieval as needed
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// New function: Fetch all notifications
export const fetchNotifications = async () => {
  try {
    const response = await axiosInstance.get("/notification");
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch notifications");
    }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Optional: Create a function to mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axiosInstance.put(
      `/notification/mark-all-as-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

