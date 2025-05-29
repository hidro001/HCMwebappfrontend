import { create } from 'zustand';
import axiosInstance from '../service/axiosInstance';
import { toast } from 'react-hot-toast';

const useEmployeeStore = create((set) => ({
  nodes: [],
  edges: [],
  loading: false,

  fetchEmployees: async () => {
    set({ loading: true });

    try {
      const response = await axiosInstance.get('/user/get-all');
      const result = response.data;

      if (result?.success && Array.isArray(result.data)) {
        const mappedNodes = [];
        const generatedEdges = [];
        const employeeMap = {};

        result.data.forEach((employee) => {
          employeeMap[employee._id] = { ...employee, children: [] };
        });

        result.data.forEach((employee) => {
          const assignedManagers = employee.assigned_to || [];
          const managersList =
            assignedManagers.length > 0
              ? assignedManagers
                  .map((m) => `${m.first_Name || ''} ${m.last_Name || ''}`.trim())
                  .join(', ')
              : 'No Manager';

          employeeMap[employee._id] = {
            ...employeeMap[employee._id],
            data: {
              label: `${employee.first_Name || ''} ${employee.last_Name || ''}`.trim(),
              managers: managersList,
              role: employee.user_Role,
              emp_id: employee.employee_Id,
              img: employee.user_Avatar || 'https://via.placeholder.com/100',
            },
          };

          if (assignedManagers.length > 0) {
            assignedManagers.forEach((manager) => {
              if (employeeMap[manager._id]) {
                employeeMap[manager._id].children.push(employee._id);
                generatedEdges.push({
                  id: `e-${manager._id}-${employee._id}`,
                  source: manager._id,
                  target: employee._id,
                  type: 'smoothstep',
                  animated: true,
                });
              }
            });
          }
        });

        const generateNodes = (parentId, xPos = 0, yPos = 0) => {
          const parent = employeeMap[parentId];
          const children = parent.children;
          const childGap = 500;
          const verticalGap = 150;

          mappedNodes.push({
            id: parentId,
            data: parent.data,
            position: { x: xPos, y: yPos },
            style: {
              width: 200,
              height: 100,
              backgroundColor: '#e7f2fb',
              color: 'black',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '10px',
              fontWeight: 'bold',
              fontFamily: "'Arial', sans-serif",
              transition: 'transform 0.3s ease',
            },
          });

          let xOffset = xPos - ((children.length - 1) * childGap) / 2;

          children.forEach((childId, index) => {
            generateNodes(childId, xOffset + index * childGap, yPos + verticalGap);
          });
        };

        const rootEmployee = result.data.find(
          (employee) => !employee.assigned_to || employee.assigned_to.length === 0
        );

        if (rootEmployee) {
          generateNodes(rootEmployee._id);
        }

        set({ nodes: mappedNodes, edges: generatedEdges });
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