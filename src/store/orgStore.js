import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance.js';
import { toast } from 'react-hot-toast';

const useEmployeeStore = create((set) => ({
  orgData: null,
  loading: false,

  fetchEmployees: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/user/get-all');
      const result = response.data;

      if (result?.success && Array.isArray(result.data)) {
        const hierarchicalData = convertToTreeData(result.data);
        set({ orgData: hierarchicalData });
      } else {
        toast.error('Failed to fetch data');
      }
    } catch (error) {
      toast.error('Error fetching data');
      console.error('Error fetching employees:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

const convertToTreeData = (flatData) => {
  const employeeMap = {};
  let root = null;

  flatData.forEach(emp => {
    employeeMap[emp._id] = {
      id: emp._id,
      name: `${emp.first_Name} ${emp.last_Name}`,
      title: emp.designation,
      dept: emp.department,
      avatar: emp.user_Avatar,
      children: []
    };
  });

  flatData.forEach(emp => {
    if (emp.assigned_to && emp.assigned_to.length > 0) {
      emp.assigned_to.forEach(manager => {
        if (employeeMap[manager._id]) {
          employeeMap[manager._id].children.push(employeeMap[emp._id]);
        }
      });
    } else {
      root = employeeMap[emp._id];
    }
  });

  return root;
};

export default useEmployeeStore;