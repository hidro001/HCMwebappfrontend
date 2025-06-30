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
// import { renderHelpSection } from "../../config/HelpConfig";

// const SubMenuTabs = ({ activeSection, filteredSubOptions ,helpKey,  }) => {
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

//   // Handle wheel event for horizontal scrolling
//   const handleWheel = (e) => {
//     if (scrollContainerRef.current && e.deltaY !== 0) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollLeft += e.deltaY;
//       checkScrollButtons();
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 5);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
//       window.addEventListener('resize', checkScrollButtons);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         scrollContainer.removeEventListener('wheel', handleWheel);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3">
//       {/* Left scroll button - always visible on small screens */}
//       <button
//         onClick={() => scroll('left')}
//         className={`
//           absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//           bg-gradient-to-r from-gray-50 via-gray-50 to-transparent
//           dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//           transition-opacity duration-300
//           ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//         `}
//         aria-label="Scroll left"
//       >
//         <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//           <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//         </div>
//       </button>

//       {/* Right scroll button - always visible on small screens */}
//       <button
//         onClick={() => scroll('right')}
//         className={`
//           absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//           bg-gradient-to-l from-gray-50 via-gray-50 to-transparent
//           dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//           transition-opacity duration-300
//           ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//         `}
//         aria-label="Scroll right"
//       >
//         <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//           <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//         </div>
//       </button>

//       {/* Main tabs container - now with touch scrolling and wheel scrolling */}
//       <div
//         ref={scrollContainerRef}
//         className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
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
//                 relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
//                 transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
//                 ${
//                   isActive
//                     ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                     : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                 }
//               `}
//             >
//               {isActive && (
//                 <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
//               )}
//               <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
//               {(isHovered && !isActive) && (
//                 <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
//               )}

//               {/* Glow effect for active tab */}
//               {isActive && (
//                 <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//               )}
//             </button>
//           );
//         })}
//       </div>
//               {helpKey && (
//           <div className="absolute top-full right-6 z-10">
//             {renderHelpSection(helpKey)}
//           </div>
//         )}
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
// import { renderHelpSection } from "../../config/HelpConfig";

// const SubMenuTabs = ({ activeSection, filteredSubOptions, helpKey }) => {
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

//   // Handle wheel event for horizontal scrolling
//   const handleWheel = (e) => {
//     if (scrollContainerRef.current && e.deltaY !== 0) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollLeft += e.deltaY;
//       checkScrollButtons();
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 5);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
//       window.addEventListener('resize', checkScrollButtons);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         scrollContainer.removeEventListener('wheel', handleWheel);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     // FIXED: Added relative positioning wrapper to contain the help section
//     <div className="relative">
//       <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3">
//         {/* Left scroll button */}
//         <button
//           onClick={() => scroll('left')}
//           className={`
//             absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//             bg-gradient-to-r from-gray-50 via-gray-50 to-transparent
//             dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//             transition-opacity duration-300
//             ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//           `}
//           aria-label="Scroll left"
//         >
//           <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//             <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//           </div>
//         </button>

//         {/* Right scroll button */}
//         <button
//           onClick={() => scroll('right')}
//           className={`
//             absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//             bg-gradient-to-l from-gray-50 via-gray-50 to-transparent
//             dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//             transition-opacity duration-300
//             ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//           `}
//           aria-label="Scroll right"
//         >
//           <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//             <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//           </div>
//         </button>

//         {/* Main tabs container */}
//         <div
//           ref={scrollContainerRef}
//           className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
//         >
//           {filteredSubOptions.map((option, idx) => {
//             const isActive = option.link === currentPath;
//             const isHovered = hoveredTab === idx;

//             return (
//               <button
//                 key={idx}
//                 onClick={() => handleTabClick(option)}
//                 onMouseEnter={() => setHoveredTab(idx)}
//                 onMouseLeave={() => setHoveredTab(null)}
//                 className={`
//                   relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
//                   transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
//                   ${
//                     isActive
//                       ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                       : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                   }
//                 `}
//               >
//                 {isActive && (
//                   <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
//                 )}
//                 <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
//                 {(isHovered && !isActive) && (
//                   <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
//                 )}

//                 {/* Glow effect for active tab */}
//                 {isActive && (
//                   <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* FIXED: Help section moved outside and with higher z-index */}
//       {helpKey && (
//         <div className="absolute top-full right-6 z-30 mt-1">
//           {renderHelpSection(helpKey)}
//         </div>
//       )}
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
// import { renderHelpSection } from "../../config/HelpConfig";

// const SubMenuTabs = ({ activeSection, filteredSubOptions, helpKey }) => {
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

//   // Handle wheel event for horizontal scrolling
//   const handleWheel = (e) => {
//     if (scrollContainerRef.current && e.deltaY !== 0) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollLeft += e.deltaY;
//       checkScrollButtons();
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 5);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
//       window.addEventListener('resize', checkScrollButtons);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         scrollContainer.removeEventListener('wheel', handleWheel);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative">
//       <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3 flex items-center">
//       {/* Submenu Tabs Container - 90% width */}
//       <div className="relative w-[90%] h-full overflow-hidden">
//         {/* Left scroll button */}
//         <button
//           onClick={() => scroll('left')}
//           className={`
//             absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//             bg-gradient-to-r from-gray-50 via-gray-50 to-transparent
//             dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//             transition-opacity duration-300
//             ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//           `}
//           aria-label="Scroll left"
//         >
//           <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//             <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//           </div>
//         </button>

//         {/* Right scroll button */}
//         <button
//           onClick={() => scroll('right')}
//           className={`
//             absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//             bg-gradient-to-l from-gray-50 via-gray-50 to-transparent
//             dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//             transition-opacity duration-300
//             ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//           `}
//           aria-label="Scroll right"
//         >
//           <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//             <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//           </div>
//         </button>

//         {/* Main tabs container */}
//         <div
//           ref={scrollContainerRef}
//           className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
//         >
//           {filteredSubOptions.map((option, idx) => {
//             const isActive = option.link === currentPath;
//             const isHovered = hoveredTab === idx;

//             return (
//               <button
//                 key={idx}
//                 onClick={() => handleTabClick(option)}
//                 onMouseEnter={() => setHoveredTab(idx)}
//                 onMouseLeave={() => setHoveredTab(null)}
//                 className={`
//                   relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
//                   transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
//                   ${
//                     isActive
//                       ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                       : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                   }
//                 `}
//               >
//                 {isActive && (
//                   <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
//                 )}
//                 <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
//                 {(isHovered && !isActive) && (
//                   <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
//                 )}

//                 {/* Glow effect for active tab */}
//                 {isActive && (
//                   <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Help Button Container - 10% width with dropdown support */}
//       {helpKey && (
//         <div className="relative w-[10%] h-full flex items-center justify-center border-l border-gray-200 dark:border-gray-700">
//           <div className="relative h-full flex items-center justify-center w-full">
//             {renderHelpSection(helpKey)}
//             {/* Dropdown content area - positioned outside the container */}
//           </div>
//         </div>
//       )}
//       </div>

//       {/* Dropdown content positioned outside the main container */}
//       {helpKey && (
//         <div className="absolute top-full right-0 z-50 w-auto min-w-[200px]">
//           {/* This div will contain any dropdown content from renderHelpSection */}

//         </div>
//       )}
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
// import { renderHelpSection } from "../../config/HelpConfig";
// import { FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';

// const SubMenuTabs = ({ activeSection, filteredSubOptions, helpKey }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const scrollContainerRef = useRef(null);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const [isHelpOpen, setIsHelpOpen] = useState(false);

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   const toggleHelp = () => {
//     setIsHelpOpen(!isHelpOpen);
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

//   // Handle wheel event for horizontal scrolling
//   const handleWheel = (e) => {
//     if (scrollContainerRef.current && e.deltaY !== 0) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollLeft += e.deltaY;
//       checkScrollButtons();
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 5);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
//       window.addEventListener('resize', checkScrollButtons);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         scrollContainer.removeEventListener('wheel', handleWheel);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   // Close help dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isHelpOpen && !event.target.closest('.help-dropdown-container')) {
//         setIsHelpOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isHelpOpen]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative">
//       <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3 flex items-center">
//         {/* Submenu Tabs Container - 90% width */}
//         <div className="relative w-[90%] h-full overflow-hidden">
//           {/* Left scroll button */}
//           <button
//             onClick={() => scroll('left')}
//             className={`
//               absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//               bg-gradient-to-r from-gray-50 via-gray-50 to-transparent
//               dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//               transition-opacity duration-300
//               ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//             aria-label="Scroll left"
//           >
//             <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//               <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//             </div>
//           </button>

//           {/* Right scroll button */}
//           <button
//             onClick={() => scroll('right')}
//             className={`
//               absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//               bg-gradient-to-l from-gray-50 via-gray-50 to-transparent
//               dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//               transition-opacity duration-300
//               ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//             aria-label="Scroll right"
//           >
//             <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//               <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//             </div>
//           </button>

//           {/* Main tabs container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
//           >
//             {filteredSubOptions.map((option, idx) => {
//               const isActive = option.link === currentPath;
//               const isHovered = hoveredTab === idx;

//               return (
//                 <button
//                   key={idx}
//                   onClick={() => handleTabClick(option)}
//                   onMouseEnter={() => setHoveredTab(idx)}
//                   onMouseLeave={() => setHoveredTab(null)}
//                   className={`
//                     relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
//                     transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
//                     ${
//                       isActive
//                         ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                         : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                     }
//                   `}
//                 >
//                   {isActive && (
//                     <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
//                   )}
//                   <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
//                   {(isHovered && !isActive) && (
//                     <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
//                   )}

//                   {/* Glow effect for active tab */}
//                   {isActive && (
//                     <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Help Button Container - 10% width */}
//         {helpKey && (
//           <div className="relative w-[10%] h-full flex items-center justify-center border-l border-gray-200 dark:border-gray-700 help-dropdown-container">
//             <button
//               onClick={toggleHelp}
//               className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
//             >
//               {isHelpOpen ? (
//                 <FaChevronUp className="text-xs" />
//               ) : (
//                 <FaChevronDown className="text-xs" />
//               )}
//               <span className="hidden sm:inline">Show Help</span>
//               <span className="sm:hidden">Help</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Help Dropdown Content */}
//       {helpKey && isHelpOpen && (
//         <div className="absolute top-full right-0 z-50 w-96 max-w-[90vw] mt-2 help-dropdown-container">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
//             {/* Close button */}
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
//                   <FaInfoCircle className="text-blue-600 dark:text-blue-400 text-lg" />
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-900 dark:text-white">
//                   Page Help
//                 </h4>
//               </div>
//               <button
//                 onClick={() => setIsHelpOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Help Content */}
//             <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
//               <p className="mb-4">
//                 This page provides helpful information and guidance for managing your tasks and workflow.
//               </p>
//               <div className="space-y-2">
//                 <h5 className="font-semibold text-gray-800 dark:text-gray-200">Quick Tips:</h5>
//                 <ul className="list-disc list-inside space-y-1 text-sm">
//                   <li>Use the tabs above to navigate between different sections</li>
//                   <li>Click on any tab to switch views quickly</li>
//                   <li>Use horizontal scroll or arrow buttons when tabs overflow</li>
//                   <li>This help section provides context-specific guidance</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
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
// import { helpConfigs } from "../../config/HelpConfig";
// import { FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';

// const SubMenuTabs = ({ activeSection, filteredSubOptions, helpKey }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const scrollContainerRef = useRef(null);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const [isHelpOpen, setIsHelpOpen] = useState(false);

//   // Get help configuration dynamically
//   const helpConfig = helpKey ? helpConfigs[helpKey] : null;
//   const HelpIcon = helpConfig?.icon || FaInfoCircle;

//   // Don't render if no valid help config found
//   if (helpKey && !helpConfig) {
//     console.warn(`Help configuration not found for key: ${helpKey}`);
//   }

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   const toggleHelp = () => {
//     setIsHelpOpen(!isHelpOpen);
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

//   // Handle wheel event for horizontal scrolling
//   const handleWheel = (e) => {
//     if (scrollContainerRef.current && e.deltaY !== 0) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollLeft += e.deltaY;
//       checkScrollButtons();
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 5);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
//       window.addEventListener('resize', checkScrollButtons);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         scrollContainer.removeEventListener('wheel', handleWheel);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   // Close help dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isHelpOpen && !event.target.closest('.help-dropdown-container')) {
//         setIsHelpOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isHelpOpen]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative">
//       <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3 flex items-center">
//         {/* Submenu Tabs Container - 90% width */}
//         <div className="relative w-[90%] h-full overflow-hidden">
//           {/* Left scroll button */}
//           <button
//             onClick={() => scroll('left')}
//             className={`
//               absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//               bg-gradient-to-r from-gray-50 via-gray-50 to-transparent
//               dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//               transition-opacity duration-300
//               ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//             aria-label="Scroll left"
//           >
//             <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//               <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//             </div>
//           </button>

//           {/* Right scroll button */}
//           <button
//             onClick={() => scroll('right')}
//             className={`
//               absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//               bg-gradient-to-l from-gray-50 via-gray-50 to-transparent
//               dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//               transition-opacity duration-300
//               ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//             aria-label="Scroll right"
//           >
//             <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//               <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//             </div>
//           </button>

//           {/* Main tabs container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
//           >
//             {filteredSubOptions.map((option, idx) => {
//               const isActive = option.link === currentPath;
//               const isHovered = hoveredTab === idx;

//               return (
//                 <button
//                   key={idx}
//                   onClick={() => handleTabClick(option)}
//                   onMouseEnter={() => setHoveredTab(idx)}
//                   onMouseLeave={() => setHoveredTab(null)}
//                   className={`
//                     relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
//                     transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
//                     ${
//                       isActive
//                         ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                         : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                     }
//                   `}
//                 >
//                   {isActive && (
//                     <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
//                   )}
//                   <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
//                   {(isHovered && !isActive) && (
//                     <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
//                   )}

//                   {/* Glow effect for active tab */}
//                   {isActive && (
//                     <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Help Button Container - 10% width */}
//         {helpKey && helpConfig && (
//           <div className="relative w-[10%] h-full flex items-center justify-center border-l border-gray-200 dark:border-gray-700 help-dropdown-container">
//             <button
//               onClick={toggleHelp}
//               className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
//             >
//               {isHelpOpen ? (
//                 <FaChevronUp className="text-xs" />
//               ) : (
//                 <FaChevronDown className="text-xs" />
//               )}
//               <span className="hidden sm:inline">Show Help</span>
//               <span className="sm:hidden">Help</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Help Dropdown Content */}
//       {helpKey && isHelpOpen && helpConfig && (
//         <div className="absolute top-full right-0 z-50 w-96 max-w-[90vw] mt-2 help-dropdown-container">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
//             {/* Close button */}
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
//                   <HelpIcon className="text-blue-600 dark:text-blue-400 text-lg" />
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-900 dark:text-white">
//                   {helpConfig.title}
//                 </h4>
//               </div>
//               <button
//                 onClick={() => setIsHelpOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Help Content */}
//             <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
//               <p className="mb-4">
//                 {helpConfig.description}
//               </p>

//               {/* Additional help tips based on the page type */}
//               <div className="space-y-2">
//                 <h5 className="font-semibold text-gray-800 dark:text-gray-200">Quick Tips:</h5>
//                 <ul className="list-disc list-inside space-y-1 text-sm">
//                   <li>Use the tabs above to navigate between different sections</li>
//                   <li>Click on any tab to switch views quickly</li>
//                   <li>Use horizontal scroll or arrow buttons when tabs overflow</li>
//                   {helpKey === 'allTickets' && (
//                     <>
//                       <li>Filter tickets by status, priority, or department</li>
//                       <li>Click on any ticket to view detailed information</li>
//                       <li>Use bulk actions for managing multiple tickets</li>
//                     </>
//                   )}
//                   {helpKey === 'allEmployees' && (
//                     <>
//                       <li>Search employees by name, department, or role</li>
//                       <li>Use filters to find specific employee groups</li>
//                       <li>Export employee data for reporting purposes</li>
//                     </>
//                   )}
//                   {helpKey === 'subordinatesEmployees' && (
//                     <>
//                       <li>Monitor your team's performance and status</li>
//                       <li>Assign tasks and track progress</li>
//                       <li>Review team member profiles and updates</li>
//                     </>
//                   )}
//                   {helpKey === 'analyticsDashboard' && (
//                     <>
//                       <li>Use date filters to customize report periods</li>
//                       <li>Export charts and data for presentations</li>
//                       <li>Set up automated report scheduling</li>
//                     </>
//                   )}
//                   {helpKey === 'systemSettings' && (
//                     <>
//                       <li>Changes are automatically saved</li>
//                       <li>Use the search function to find specific settings</li>
//                       <li>Configure user permissions and access levels</li>
//                     </>
//                   )}
//                   {/* Default tip for any other helpKey */}
//                   {!['allTickets', 'allEmployees', 'subordinatesEmployees', 'analyticsDashboard', 'systemSettings'].includes(helpKey) && (
//                     <li>This help section provides context-specific guidance for this page</li>
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
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
// import { renderHelpSection } from "../../config/HelpConfig";
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const SubMenuTabs = ({ activeSection, filteredSubOptions, helpKey }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const scrollContainerRef = useRef(null);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(false);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const [isHelpOpen, setIsHelpOpen] = useState(false);

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   const toggleHelp = () => {
//     setIsHelpOpen(!isHelpOpen);
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

//   // Handle wheel event for horizontal scrolling
//   const handleWheel = (e) => {
//     if (scrollContainerRef.current && e.deltaY !== 0) {
//       e.preventDefault();
//       scrollContainerRef.current.scrollLeft += e.deltaY;
//       checkScrollButtons();
//     }
//   };

//   // Check if scroll indicators should be shown
//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 5);
//       setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScrollButtons);
//       scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
//       window.addEventListener('resize', checkScrollButtons);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScrollButtons);
//         scrollContainer.removeEventListener('wheel', handleWheel);
//         window.removeEventListener('resize', checkScrollButtons);
//       }
//     };
//   }, [filteredSubOptions]);

//   // Close help dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isHelpOpen && !event.target.closest('.help-dropdown-container')) {
//         setIsHelpOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isHelpOpen]);

//   if (!activeSection || filteredSubOptions.length === 0) return null;

//   return (
//     <div className="relative">
//       <div className="relative w-full h-14 bg-white/95 dark:bg-black shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800 mt-3 flex items-center">
//         {/* Submenu Tabs Container - 90% width */}
//         <div className="relative w-[90%] h-full overflow-hidden">
//           {/* Left scroll button */}
//           <button
//             onClick={() => scroll('left')}
//             className={`
//               absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//               bg-gradient-to-r from-gray-50 via-gray-50 to-transparent
//               dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//               transition-opacity duration-300
//               ${showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//             aria-label="Scroll left"
//           >
//             <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//               <HiOutlineChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//             </div>
//           </button>

//           {/* Right scroll button */}
//           <button
//             onClick={() => scroll('right')}
//             className={`
//               absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10
//               bg-gradient-to-l from-gray-50 via-gray-50 to-transparent
//               dark:from-gray-950 dark:via-gray-950 dark:to-transparent
//               transition-opacity duration-300
//               ${showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
//             `}
//             aria-label="Scroll right"
//           >
//             <div className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md group hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
//               <HiOutlineChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
//             </div>
//           </button>

//           {/* Main tabs container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex items-center justify-start h-full px-6 overflow-x-auto hide-scrollbar scroll-smooth touch-pan-x"
//           >
//             {filteredSubOptions.map((option, idx) => {
//               const isActive = option.link === currentPath;
//               const isHovered = hoveredTab === idx;

//               return (
//                 <button
//                   key={idx}
//                   onClick={() => handleTabClick(option)}
//                   onMouseEnter={() => setHoveredTab(idx)}
//                   onMouseLeave={() => setHoveredTab(null)}
//                   className={`
//                     relative group flex items-center justify-center px-5 py-2 mx-1.5 text-sm font-medium
//                     transition-all duration-300 rounded-xl whitespace-nowrap flex-shrink-0
//                     ${
//                       isActive
//                         ? "text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg transform translate-y-[-2px]"
//                         : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm"
//                     }
//                   `}
//                 >
//                   {isActive && (
//                     <IoRocketOutline className="mr-2 w-4 h-4 flex-shrink-0" />
//                   )}
//                   <span className="truncate max-w-[150px] sm:max-w-[200px]">{option.name}</span>
//                   {(isHovered && !isActive) && (
//                     <IoSparklesOutline className="ml-2 w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
//                   )}

//                   {/* Glow effect for active tab */}
//                   {isActive && (
//                     <div className="absolute inset-0 -z-10 bg-blue-500 rounded-xl blur opacity-30 dark:opacity-40 animate-pulse-slow"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Help Button Container - 10% width */}
//         {helpKey && (
//           <div className="relative w-[10%] h-full flex items-center justify-center border-l border-gray-200 dark:border-gray-700 help-dropdown-container">
//             <button
//               onClick={toggleHelp}
//               className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95 shadow-sm"
//             >
//               {isHelpOpen ? (
//                 <FaChevronUp className="text-xs" />
//               ) : (
//                 <FaChevronDown className="text-xs" />
//               )}
//               <span className="hidden sm:inline">Show Help</span>
//               <span className="sm:hidden">Help</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Help Dropdown Content */}
//       {helpKey && isHelpOpen && (
//         <div className="absolute top-full right-0 z-50 w-96 max-w-[90vw] mt-2 help-dropdown-container">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
//             {/* Close button */}
//             <div className="flex justify-end p-2 border-b border-gray-200 dark:border-gray-700">
//               <button
//                 onClick={() => setIsHelpOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Render Help Section */}
//             <div className="help-section-container">
//               {renderHelpSection(helpKey)}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubMenuTabs;

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
        {/* Submenu Tabs Container - 90% width */}
        <div className="relative w-[88%] h-full overflow-hidden">
          {/* Left scroll button */}
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

          {/* Right scroll button */}
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

          {/* Main tabs container */}
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

        {/* Help Button Container - 10% width */}
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
