import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance'; // Your existing axios setup
import { toast } from 'react-hot-toast';

const useEmployeeStore = create((set) => ({
  nodes: [],
  clinks: [],
  loading: false,

  fetchEmployees: async () => {
    set({ loading: true });

    try {
      const response = await axiosInstance.get('/superadmin/employees');
      const result = response.data;

      if (result?.success && Array.isArray(result.data)) {
        const mappedNodes = [];
        const generatedClinks = [];

        result.data.forEach((employee) => {
          const assignedManagers = employee.assigned_to || [];
          const primaryParent = assignedManagers[0]?._id || null;

          // Create a comma-separated list of all managers for display inside the node
          const managersList =
            assignedManagers.length > 0
              ? assignedManagers
                  .map((m) => {
                    const firstName = m.first_Name || '';
                    const lastName = m.last_Name || '';
                    const fullName = `${firstName} ${lastName}`.trim();
                    return fullName || m._id; // fallback to manager ID if no name
                  })
                  .join(', ')
              : 'No Manager';

          mappedNodes.push({
            id: employee._id,
            pid: primaryParent,
            name:
              `${employee.first_Name || ''} ${
                employee.last_Name || ''
              }`.trim() || 'No Name',
            title: employee.designation || employee.department || 'No Title',
            department: employee.department || 'No Department',
            role: employee.user_Role || 'No Role',
            emp_id: employee.employee_Id || 'No Employee ID',
            img: employee.user_Avatar || 'https://via.placeholder.com/100',
            managers: managersList, // Used to display all managers inside the node
          });

          // Add clinks for additional managers beyond the first one
          if (assignedManagers.length > 1) {
            assignedManagers.forEach((parent) => {
              if (parent._id !== primaryParent) {
                generatedClinks.push({
                  from: parent._id,
                  to: employee._id,
                  template: 'simple', // dotted line
                });
              }
            });
          }
        });

        set({ nodes: mappedNodes, clinks: generatedClinks });
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

export default useEmployeeStore;
