import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { menuItems } from "../../config/menuConfig";
import useAuthStore from "../../store/store"; // we'll read from Zustand directly

export default function Sidebar({ onSectionSelect }) {
  // Read from Zustand
  const permissions = useAuthStore((state) => state.permissions);

  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Filter menu items once we have the final `permissions` from store
    filterMenuItems();
  }, [permissions]);

  const filterMenuItems = () => {
    if (!permissions || permissions.length === 0) {
      setFilteredMenuItems([]);
      return;
    }
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

        // For multiline HTML tooltips in react-tooltip
        const tooltipHtml = `
          <div style="font-weight: bold;">${item.name}</div>
          <div>${item.tooltip || ""}</div>
        `;
        return (
          <button
            key={index}
            onClick={() => handleSidebarItemClick(item)}
            data-tooltip-id="sidebar-tooltip"
            data-tooltip-html={tooltipHtml}
            className={`p-1 rounded-lg transition-colors w-full flex justify-center  ${
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
      <Tooltip
        id="sidebar-tooltip"
        place="right"
        effect="solid"
        multiline={true}
        style={{ maxWidth: "200px", marginTop: "-0px" }}
      />
    </div>
  );
}
