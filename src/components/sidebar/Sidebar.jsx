

// src/components/Sidebar/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { menuItems } from "../../config/menuConfig"; // <-- import from shared file
import { fetchPermissions } from "../../service/service";
import useAuthStore from "../../store/store";

const Sidebar = ({ onSectionSelect }) => {
  const [permissions, setPermissions] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const empId = useAuthStore((state) => state.employeeId);

  // We can read the current route to know which item is "active"
  const location = useLocation();
  const currentPath = location.pathname; // e.g. "/dashboard/engagement-feed"

  useEffect(() => {
    fetchPermission();
  }, []);

  const fetchPermission = async () => {
    try {
      const data = await fetchPermissions(empId);
      setPermissions(data.permissions);
    } catch (err) {
      console.log(err, "error to fetch employee permissions");
    }
  };

  useEffect(() => {
    if (permissions.length > 0) {
      filterMenuItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions]);

  const filterMenuItems = () => {
    const filtered = menuItems
      .map((item) => {
        const filteredOptions = item.options.filter((option) =>
          permissions.includes(option.permission)
        );
        return { ...item, options: filteredOptions };
      })
      .filter((item) => item.options.length > 0);
    setFilteredMenuItems(filtered);
  };

  // We'll determine if the *current route* matches any of an item's sub-links
  const isItemActive = (item) => {
    // If *any* of the item's options has link = currentPath, or a "startsWith" match
    return item.options.some((opt) => currentPath === opt.link);
  };

  const handleSidebarItemClick = (item) => {
    // If you want to automatically navigate to the first sub-route
    // or do something else, call onSectionSelect:
    onSectionSelect(item);
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 
      border-r border-gray-500 
      w-16  
      flex-shrink-0 
      z-50 
      flex flex-col items-center py-4 space-y-6 
      h-screen overflow-y-auto hide-scrollbar">
      {filteredMenuItems.map((item, index) => {
        const active = isItemActive(item);
        return (
          <button
            key={index}
            onClick={() => handleSidebarItemClick(item)}
            className={`
              p-2 rounded-lg transition-colors w-full flex justify-center
              ${
                active
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }
            `}
          >
            <motion.div
              className={`text-xl ${item.color}`}
              whileHover={item.iconAnimation}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
