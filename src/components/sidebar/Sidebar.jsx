import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { menuItems } from "../../config/menuConfig";
import { fetchPermissions } from "../../service/service";
import useAuthStore from "../../store/store";

export default function Sidebar({ onSectionSelect }) {
  const [permissions, setPermissions] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const empId = useAuthStore((state) => state.employeeId);
  const location = useLocation();
  const currentPath = location.pathname;

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

  const isItemActive = (item) => {
    return item.options.some((opt) => currentPath === opt.link);
  };

  const handleSidebarItemClick = (item) => {
    onSectionSelect(item);
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 border-r border-gray-500 w-16 flex-shrink-0 z-50 flex flex-col items-center py-4 space-y-6 h-screen overflow-y-auto hide-scrollbar">
      {filteredMenuItems.map((item, index) => {
        const active = isItemActive(item);
        return (
          <button
            key={index}
            onClick={() => handleSidebarItemClick(item)}
            className={`p-2 rounded-lg transition-colors w-full flex justify-center ${
              active
                ? "bg-gray-300 dark:bg-gray-700"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
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
}
