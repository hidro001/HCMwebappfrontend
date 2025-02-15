import axiosInstance from './axiosInstance';

export const fetchproductLense = async (empId) => {
  try {
    // Passing empId as a query parameter; adjust the URL as needed.
    const { data } = await axiosInstance.get(`/admin/productLenseService?empId=${empId}`);
    return data;
  } catch (error) {
    console.error('Error fetching product lense:', error);
    throw error;
  }
};

export const getSubordinate = async () => {
  try {
    const { data } = await axiosInstance.get('/admin/subordinates');
    return data;
  } catch (error) {
    console.error('Error fetching subordinates:', error);
    throw error;
  }
};
