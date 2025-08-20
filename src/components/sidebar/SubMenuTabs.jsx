import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoRocketOutline, IoSparklesOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { renderHelpSection } from "../../config/HelpConfig";
import { FaChevronDown, FaChevronUp, FaHireAHelper } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

const SubMenuTabs = ({ activeSection, filteredSubOptions, helpKey }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleTabClick = (option) => {
    navigate(option.link);
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  
  const handleWheel = (e) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
      checkScrollButtons();
    }
  };

  // Check if scroll indicators should be shown
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 5);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      window.addEventListener("resize", checkScrollButtons);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        scrollContainer.removeEventListener("wheel", handleWheel);
        window.removeEventListener("resize", checkScrollButtons);
      }
    };
  }, [filteredSubOptions]);

  // Close help dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isHelpOpen && !event.target.closest(".help-dropdown-container")) {
        setIsHelpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHelpOpen]);

  if (!activeSection || filteredSubOptions.length === 0) return null;

  return (
    <div className="relative">
      <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3 flex items-center">
        <div className="relative w-[88%] h-full overflow-hidden">
          <button
            onClick={() => scroll("left")}
            className={`
              absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
              bg-gradient-to-r from-gray-50 via-gray-50 to-transparent 
              dark:from-gray-950 dark:via-gray-950 dark:to-transparent
              transition-opacity duration-300
              ${
                showLeftScroll ? "opacity-100" : "opacity-0 pointer-events-none"
              }
            `}
            aria-label="Scroll left"
          >
            <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
              <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </button>
          <button
            onClick={() => scroll("right")}
            className={`
              absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
              bg-gradient-to-l from-gray-50 via-gray-50 to-transparent 
              dark:from-gray-950 dark:via-gray-950 dark:to-transparent
              transition-opacity duration-300
              ${
                showRightScroll
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
            `}
            aria-label="Scroll right"
          >
            <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
              <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </button>
          <div
            ref={scrollContainerRef}
            className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
          >
            {filteredSubOptions.map((option, idx) => {
              const isActive = option.link === currentPath;
              const isHovered = hoveredTab === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleTabClick(option)}
                  onMouseEnter={() => setHoveredTab(idx)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`
                    relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
                    transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
                    ${
                      isActive
                        ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
                        : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
                    }
                  `}
                >
                  {isActive && (
                    <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {option.name}
                  </span>
                  {isHovered && !isActive && (
                    <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
                  )}

                  {/* Glow effect for active tab */}
                  {isActive && (
                    <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {helpKey && (
          <div className="relative w-[12%] h-full flex items-center justify-center  border-gray-200 dark:border-gray-700 help-dropdown-container">
            <button
              onClick={toggleHelp}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
            >
              {isHelpOpen ? (
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
              )}
              <span className="hidden lg:inline">Show Help</span>
              {/* <span className="sm:hidden">Help</span> */}
              <FaHireAHelper className="lg:hidden text-lg " />
            </button>
          </div>
        )}
      </div>

      {/* Help Dropdown Content */}
      {helpKey && isHelpOpen && (
        <div className="absolute top-full right-0 z-50 w-96 max-w-[90vw] mt-2 help-dropdown-container ">
          <div className="shadow-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden rounded-xl  mr-7">
            {/* Render Help Section in dropdown mode */}
            {renderHelpSection(helpKey, true)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubMenuTabs;
