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

  forceRefresh: async () => {
    await useEmployeeStore.getState().fetchEmployees();
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
      isActive: emp.isActive,
      children: [],
      originalManagerId: emp.assigned_to?.[0]?._id || null
    };
  });
  flatData.forEach(emp => {
    if (emp.assigned_to && emp.assigned_to.length > 0) {
      emp.assigned_to.forEach(manager => {
        if (employeeMap[manager._id] && employeeMap[emp._id]) {
          employeeMap[manager._id].children.push(employeeMap[emp._id]);
        }
      });
    } else {
      root = employeeMap[emp._id];
    }
  });
  const findNextActiveManager = (nodeId, visited = new Set()) => {
    if (visited.has(nodeId)) return null;
    visited.add(nodeId);
    const node = employeeMap[nodeId];
    if (!node) return null;
    if (node.isActive) return node;
    const originalManager = flatData.find(emp =>
      emp.assigned_to?.some(manager => manager._id === nodeId)
    );
    if (originalManager?.assigned_to?.[0]?._id) {
      return findNextActiveManager(originalManager.assigned_to[0]._id, visited);
    }
    return null;
  };
  const reassignEmployeesToActiveManagers = (node, parentActiveNode = null) => {
    if (!node) return null;
    if (node.isActive === false) {
      const reassignedChildren = [];
      node.children.forEach(child => {
        const processedChild = reassignEmployeesToActiveManagers(child, parentActiveNode);
        if (processedChild) {
          reassignedChildren.push(processedChild);
        }
      });
      if (parentActiveNode && reassignedChildren.length > 0) {
        parentActiveNode.children.push(...reassignedChildren);
      }
      return parentActiveNode ? null : reassignedChildren;
    } else {
      const newChildren = [];
      node.children.forEach(child => {
        const processedChild = reassignEmployeesToActiveManagers(child, node);
        if (processedChild) {
          newChildren.push(processedChild);
        }
      });
      node.children = newChildren;
      return node;
    }
  };
  const cleanReassignment = (node) => {
    if (!node) return null;
    if (!node.isActive) {
      const collectActiveDescendants = (inactiveNode) => {
        const activeDescendants = [];
        const traverse = (currentNode) => {
          if (currentNode.isActive) {
            activeDescendants.push(currentNode);
          } else {
            currentNode.children.forEach(child => traverse(child));
          }
        };
        inactiveNode.children.forEach(child => traverse(child));
        return activeDescendants;
      };
      return collectActiveDescendants(node);
    } else {
      const processedChildren = [];
      node.children.forEach(child => {
        const result = cleanReassignment(child);
        if (Array.isArray(result)) {
          processedChildren.push(...result);
        } else if (result) {
          processedChildren.push(result);
        }
      });
      node.children = processedChildren;
      return node;
    }
  };
  const result = cleanReassignment(root);
  if (Array.isArray(result)) {
    return result.length === 1 ? result[0] : {
      id: 'virtual-root',
      name: 'Organization',
      title: 'Root',
      children: result,
      isActive: true
    };
  }
  return result;
};

export default useEmployeeStore;