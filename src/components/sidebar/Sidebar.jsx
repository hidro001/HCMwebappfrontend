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

  console.log(actualCollapsed)

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
      className={`bg-bg-sidebar h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden sidebar-shadow ${
        actualCollapsed ? "w-[6%]" : "w-[15%]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     
      <nav className=" overflow-y-auto overflow-x-hidden sidebar-scrollbar">
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
                ${actualCollapsed ? "justify-center" : "mx-4 hover:bg-[#E7E7E7]"}
                ${
                  actualCollapsed && active
                    ? "text-black font-semibold"
                    : !actualCollapsed && active
                    ? "text-black font-semibold bg-[#E7E7E7]"
                    : "text-gray-700 hover:bg-[#E7E7E7]"
                }
              `}
            >

              <motion.div
                whileHover={item.iconAnimation}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: active ? 'none' : 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                className={`text-xl p-2  rounded-md ${
                   actualCollapsed && active
                    ? "bg-[#E7E7E7]"
                    : !actualCollapsed && active ? 'bg-white'
                    : "bg-white inset-shadow-sm inset-shadow-indigo-500"
                }`}
              >
                {item.icon}
              </motion.div>
              <span
                className={`text-sm whitespace-nowrap transition-opacity duration-300 truncate max-w-[150px] ${
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
