// // components/SubMenuTabs.jsx
// import { useLocation, useNavigate } from "react-router-dom";

// const SubMenuTabs = ({ activeSection, filteredSubOptions }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div
//       className="
//         flex items-center
//         bg-gray-200 dark:bg-gray-950
//         border-b border-gray-300 dark:border-gray-700
//         backdrop-blur-sm
//         gap-2
//         overflow-x-auto
//         hide-scrollbar
//       "
//     >
//       {filteredSubOptions.map((option, idx) => {
//         const isActive = option.link === currentPath;
//         return (
//           <button
//             key={idx}
//             onClick={() => handleTabClick(option)}
//             className={`
//               relative px-4 py-2 mx-1 text-base font-bold
//               transition-colors duration-300
//               rounded-lg
//               ${
//                 isActive
//                   ? "text-green-600 dark:text-green-400 border-b-1 border-green-500"
//                   : "text-gray-600 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-300"
//               }
//             `}
//           >
//             {option.name}
//             {isActive && (
//               <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 dark:bg-green-300" />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default SubMenuTabs;

// components/SubMenuTabs.jsx


// import { useLocation, useNavigate } from "react-router-dom";
// import { 
//   FiArrowRight, 
//   FiChevronRight, 
//   FiChevronLeft 
// } from "react-icons/fi";
// import { useState, useRef, useEffect } from "react";

// const SubMenuTabs = ({ activeSection, filteredSubOptions }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const scrollContainerRef = useRef(null);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(false);

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -250 : 250;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 0);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       window.addEventListener('resize', checkScrollButtons);
//     }
    
//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative w-full h-14 bg-gray-50 dark:bg-gray-950 shadow-md   border-b border-gray-300 dark:border-gray-700
//        backdrop-blur-sm">
//       {/* Left scroll button */}
//       {showLeftScroll && (
//         <button 
//           onClick={() => scroll('left')} 
//           className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-10 
//                     bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"
//           aria-label="Scroll left"
//         >
//           <FiChevronLeft className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
//         </button>
//       )}
      
//       {/* Right scroll button */}
//       {showRightScroll && (
//         <button 
//           onClick={() => scroll('right')} 
//           className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-10 
//                     bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"
//           aria-label="Scroll right"
//         >
//           <FiChevronRight className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
//         </button>
//       )}
      
//       {/* Main tabs container */}
//       <div
//         ref={scrollContainerRef}
//         className="flex items-center h-full px-4 overflow-x-auto hide-scrollbar"
//       >
//         {filteredSubOptions.map((option, idx) => {
//           const isActive = option.link === currentPath;
//           return (
//             <button
//               key={idx}
//               onClick={() => handleTabClick(option)}
//               className={`
//                 relative px-6 py-2 mx-2 text-sm font-medium flex items-center transition-all duration-300
//                 ${
//                   isActive
//                     ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg transform scale-105"
//                     : "text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400"
//                 }
//               `}
//             >
//               {option.name}
//               {isActive && (
//                 <FiArrowRight className="ml-2 w-4 h-4 animate-pulse" />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SubMenuTabs;



// import { useLocation, useNavigate } from "react-router-dom";
// import { 
//   HiOutlineChevronLeft,
//   HiOutlineChevronRight
// } from "react-icons/hi";
// import { 
//   IoRocketOutline, 
//   IoSparklesOutline 
// } from "react-icons/io5";
// import { useState, useRef, useEffect } from "react";

// const SubMenuTabs = ({ activeSection, filteredSubOptions }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const scrollContainerRef = useRef(null);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -250 : 250;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 0);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       window.addEventListener('resize', checkScrollButtons);
//     }
    
//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative w-full h-14 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
//       {/* Left scroll button */}
//       {showLeftScroll && (
//         <button 
//           onClick={() => scroll('left')} 
//           className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 
//                     bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent
//                     transition-all duration-300 hover:bg-opacity-80"
//           aria-label="Scroll left"
//         >
//           <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//             <HiOutlineChevronLeft className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//           </div>
//         </button>
//       )}
      
//       {/* Right scroll button */}
//       {showRightScroll && (
//         <button 
//           onClick={() => scroll('right')} 
//           className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 
//                     bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent
//                     transition-all duration-300 hover:bg-opacity-80"
//           aria-label="Scroll right"
//         >
//           <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//             <HiOutlineChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//           </div>
//         </button>
//       )}
      
//       {/* Main tabs container */}
//       <div
//         ref={scrollContainerRef}
//         className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar"
//       >
//         {filteredSubOptions.map((option, idx) => {
//           const isActive = option.link === currentPath;
//           const isHovered = hoveredTab === idx;
          
//           return (
//             <button
//               key={idx}
//               onClick={() => handleTabClick(option)}
//               onMouseEnter={() => setHoveredTab(idx)}
//               onMouseLeave={() => setHoveredTab(null)}
//               className={`
//                 relative group flex items-center justify-center px-6 py-2 mx-2 text-sm font-medium 
//                 transition-all duration-300 rounded-xl
//                 ${
//                   isActive
//                     ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                     : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                 }
//               `}
//             >
//               {isActive && (
//                 <IoRocketOutline className="mr-2 w-4 h-4" />
//               )}
//               <span>{option.name}</span>
//               {/* {isActive && (
//                 <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white dark:bg-blue-400 rounded-full shadow-glow"></div>
//               )} */}
//               {(isHovered && !isActive) && (
//                 <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse" />
//               )}
              
//               {/* Glow effect for active tab */}
//               {isActive && (
//                 <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//               )}
//             </button>
//           );
//         })}
//       </div>
      
//       {/* Stylish dots decoration */}
//       {/* <div className="absolute bottom-0 left-0 w-full flex justify-center">
//         <div className="flex space-x-1 mb-1">
//           {[...Array(3)].map((_, i) => (
//             <div 
//               key={i} 
//               className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50"
//             ></div>
//           ))}
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default SubMenuTabs;


// components/SubMenuTabs.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { 
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from "react-icons/hi";
import { 
  IoRocketOutline, 
  IoSparklesOutline 
} from "react-icons/io5";
import { useState, useRef, useEffect } from "react";

const SubMenuTabs = ({ activeSection, filteredSubOptions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleTabClick = (option) => {
    navigate(option.link);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle wheel event for horizontal scrolling
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
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 5);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('resize', checkScrollButtons);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        scrollContainer.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', checkScrollButtons);
      }
    };
  }, [filteredSubOptions]);

  if (!activeSection || filteredSubOptions.length === 0) return null;

  return (
    <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      {/* Left scroll button - always visible on small screens */}
      <button 
        onClick={() => scroll('left')} 
        className={`
          absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
          bg-gradient-to-r from-gray-50 via-gray-50 to-transparent 
          dark:from-gray-950 dark:via-gray-950 dark:to-transparent
          transition-opacity duration-300
          ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll left"
      >
        <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
          <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
        </div>
      </button>
      
      {/* Right scroll button - always visible on small screens */}
      <button 
        onClick={() => scroll('right')} 
        className={`
          absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
          bg-gradient-to-l from-gray-50 via-gray-50 to-transparent 
          dark:from-gray-950 dark:via-gray-950 dark:to-transparent
          transition-opacity duration-300
          ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll right"
      >
        <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
          <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
        </div>
      </button>
      
      {/* Main tabs container - now with touch scrolling and wheel scrolling */}
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
              <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
              {(isHovered && !isActive) && (
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
  );
};

export default SubMenuTabs;
