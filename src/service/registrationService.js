import axiosInstance from './axiosInstance';

export const submitQualifications = async (empid, qualifications) => {
  const url = `/registration/qualifications/${empid}`; // keep relative for axiosInstance

  try {
    const response = await axiosInstance.post(url, { qualifications });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error submitting qualifications:', error?.response || error.message);
    return {
      success: false,
      error: error?.response?.data?.message || 'Something went wrong. Please try again.',
    };
  }
};




export const setPasswordRequest = async (token, password) => {
  try {
    const res = await axiosInstance.post(`/registration/set-password/${token}`, { password });
    return { success: true, data: res.data };
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.validation?.body?.message ||
      'Something went wrong.';

    return { success: false, message };
  }
};
