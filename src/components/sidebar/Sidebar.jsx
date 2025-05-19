import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuthStore from "../../store/store"; // Zustand store
// Adjust your icon imports here if needed
import { menuItems } from "../../config/menuConfig";

export default function Sidebar({ collapsed, onSectionSelect }) {
  const permissions = useAuthStore((state) => state.permissions);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const location = useLocation();
  const currentPath = location.pathname;

  const [hoverExpanded, setHoverExpanded] = useState(false);
  const actualCollapsed = collapsed && !hoverExpanded;


  useEffect(() => {
    filterMenuItems();
  }, [permissions]);

  const filterMenuItems = () => {
    if (!permissions || permissions.length === 0) {
      setFilteredMenuItems([]);
      return;
    }

    const filtered = menuItems
      .map((item) => {
        const filteredOptions = item.options?.filter((opt) =>
          permissions.includes(opt.permission)
        );
        return { ...item, options: filteredOptions };
      })
      .filter((item) => item.options?.length > 0);

    setFilteredMenuItems(filtered);
  };

  const isItemActive = (item) =>
    item.options?.some((opt) => currentPath === opt.link);

  const handleMouseEnter = () => {
    if (collapsed) setHoverExpanded(true);
  };

  const handleMouseLeave = () => {
    if (hoverExpanded) setHoverExpanded(false);
  };

  return (
    <div
      className={`bg-green-50 h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
        actualCollapsed ? "w-[6%]" : "w-[18%]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     
      <nav className="overflow-y-auto sidebar-scrollbar">
        {filteredMenuItems.map((item, index) => {
          const active = isItemActive(item);
          // const tooltipHtml = `
          //   <div style="font-weight: bold;">${item.name}</div>
          //   <div>${item.tooltip || ""}</div>
          // `;

          return (
           <button
  key={index}
  onClick={() => onSectionSelect(item)}
  // data-tooltip-id="sidebar-tooltip"
  // data-tooltip-html={tooltipHtml}
  className={`flex items-center gap-3 p-2 m-1 rounded-lg transition w-full
    ${actualCollapsed ? "justify-center" : "mx-4 hover:bg-green-100"}
    ${
      actualCollapsed && active
        ? "text-black font-semibold"
        : !actualCollapsed && active
        ? "text-black font-semibold bg-green-200"
        : "text-gray-700 hover:bg-green-200"
    }
  `}
>

              <motion.div
                whileHover={item.iconAnimation}
                transition={{ duration: 0.3 }}
                className={`text-xl p-2 rounded-md ${
                  active
                    ? "bg-green-200"
                    : "bg-white hover:bg-green-100 inset-shadow-gray-200"
                }`}
              >
                {item.icon}
              </motion.div>
              <span
                className={`text-sm whitespace-nowrap transition-opacity duration-300 ${
                  actualCollapsed ? "opacity-0 hidden" : "opacity-100"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
{/* 
      <Tooltip
        id="sidebar-tooltip"
        place="right"
        effect="solid"
        multiline={true}
        style={{ maxWidth: "200px", marginTop: "0px" }}
      /> */}
    </div>
  );
}
