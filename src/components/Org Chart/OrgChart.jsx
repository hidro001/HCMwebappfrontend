// import { useEffect, useState } from "react";
// import { Tree, TreeNode } from "react-organizational-chart";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiZoomIn,
//   FiZoomOut,
//   FiRotateCcw,
//   FiMaximize,
//   FiUsers,
//   FiChevronDown,
//   FiChevronUp,
//   FiMapPin,
//   FiMail,
//   FiBriefcase,
//   FiHome,
//   FiTarget,
//   FiEye,
// } from "react-icons/fi";
// import { HiOutlineSparkles } from "react-icons/hi";
// import useEmployeeStore from "../../store/orgStore";
// import { toast } from "react-hot-toast";
// import EmployeeCard from "./EmployeeCard";

// const lineColorsLight = [
//   "#3b82f6",
//   "#8b5cf6",
//   "#06b6d4",
//   "#10b981",
//   "#f59e0b",
//   "#ef4444",
//   "#6366f1",
//   "#14b8a6",
//   "#f97316",
//   "#84cc16",
//   "#ec4899",
//   "#8b5cf6",
// ];

// const lineColorsDark = [
//   "#60a5fa",
//   "#a78bfa",
//   "#22d3ee",
//   "#34d399",
//   "#fbbf24",
//   "#f87171",
//   "#818cf8",
//   "#2dd4bf",
//   "#fb923c",
//   "#a3e635",
//   "#f472b6",
//   "#c084fc",
// ];

// const DynamicOrgChart = () => {
//   const { orgData, fetchEmployees, loading } = useEmployeeStore();
//   const [expandedNodes, setExpandedNodes] = useState({});
//   const [emplId, setEmplId] = useState(null);
//   const [parentId, setParentlId] = useState({
//     currentId: null,
//     parentId: null,
//   });
//   const [showCard, setShowCard] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(
//     document.documentElement.classList.contains("dark")
//   );
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   useEffect(() => {
//     fetchEmployees().catch(() => toast.error("Unable to fetch data"));
//   }, [fetchEmployees]);

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setIsDarkMode(document.documentElement.classList.contains("dark"));
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (orgData) {
//       const autoExpand = (node, level = 0, maxLevel = 2) => {
//         if (level >= maxLevel || !node.children.length) return {};
//         let expansions = { [node.id]: { expanded: true, level } };
//         node.children.forEach((child) => {
//           expansions = {
//             ...expansions,
//             ...autoExpand(child, level + 1, maxLevel),
//           };
//         });
//         return expansions;
//       };
//       setExpandedNodes(autoExpand(orgData));
//     }
//   }, [orgData]);

//   const activeColors = isDarkMode ? lineColorsDark : lineColorsLight;

//   const toggleNode = (id, parentId, level) => {
//     setExpandedNodes((prev) => {
//       const newExpandedNodes = { ...prev };
//       Object.keys(newExpandedNodes).forEach((nodeId) => {
//         if (newExpandedNodes[nodeId]?.parentId === parentId && nodeId !== id) {
//           delete newExpandedNodes[nodeId];
//         }
//       });
//       if (prev[id]) delete newExpandedNodes[id];
//       else newExpandedNodes[id] = { expanded: true, level, parentId };

//       return newExpandedNodes;
//     });
//   };

//   const openEmployeeCard = (id, parentId) => {
//     setEmplId(id);
//     setShowCard(true);
//     setParentlId({ currentId: id, parentId });
//   };

//   const renderTreeNodes = (node, level = 1, parentId = null) => {
//     const color = activeColors[level % activeColors.length];
//     return (
//       <TreeNode
//         key={node.id}
//         label={
//           <div className="flex justify-center ">
//             <ChartNode
//               node={node}
//               onToggle={() =>
//                 node.children && toggleNode(node.id, parentId, level)
//               }
//               onViewDetails={() => openEmployeeCard(node.id, parentId)}
//               hasChildren={!!node.children.length}
//               expanded={!!expandedNodes[node.id]}
//               hoverColor={color}
//               parentId={parentId}
//               level={level}
//             />
//           </div>
//         }
//         lineColor={color}
//       >
//         {expandedNodes[node.id]?.expanded &&
//           node.children?.map((child) =>
//             renderTreeNodes(child, level + 1, node.id)
//           )}
//       </TreeNode>
//     );
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   if (loading || !orgData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
//         <motion.div
//           className="text-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <motion.div
//             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           />
//           <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
//             Loading Organization Chart...
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     // <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900  overflow-hidden relative border">
//     <div
//       className="  overflow-hidden relative  shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
//         dark:border dark:border-slate-800 rounded-2xl "
//     >
//       {/* Background decorative elements */}

//       <TransformWrapper
//         initialScale={0.8}
//         minScale={0.3}
//         maxScale={4}
//         centerOnInit
//       >
//         {({ zoomIn, zoomOut, resetTransform }) => (
//           <div className="flex items-center justify-center relative h-full">
//             {/* Control Panel */}
//             <motion.div
//               className="absolute top-6 left-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
//                          rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex flex-col space-y-3">
//                 {/* <motion.button 
//                   onClick={zoomIn}
//                   className="w-12 h-12 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
//                              text-white rounded-xl flex items-center justify-center shadow-lg
//                              hover:shadow-blue-500/25 dark:hover:shadow-blue-600/25 transition-all duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiZoomIn size={18} />
//                 </motion.button>
                
//                 <motion.button 
//                   onClick={zoomOut}
//                   className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 
//                              text-white rounded-xl flex items-center justify-center shadow-lg
//                              hover:shadow-emerald-500/25 dark:hover:shadow-emerald-600/25 transition-all duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiZoomOut size={18} />
//                 </motion.button>
                
//                 <motion.button 
//                   onClick={resetTransform}
//                   className="w-12 h-12 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 
//                              text-white rounded-xl flex items-center justify-center shadow-lg
//                              hover:shadow-purple-500/25 dark:hover:shadow-purple-600/25 transition-all duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiRotateCcw size={18} />
//                 </motion.button> */}

//                 <motion.button
//                   onClick={toggleFullscreen}
//                   className="w-12 h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 
//                              text-white rounded-xl flex items-center justify-center shadow-lg
//                              hover:shadow-orange-500/25 dark:hover:shadow-orange-600/25 transition-all duration-200"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiMaximize size={18} />
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* Employee Card Panel */}
//             <AnimatePresence>
//               {emplId && showCard && (
//                 <motion.div
//                   className="absolute top-6 right-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
//                              rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <EmployeeCard
//                     id={emplId}
//                     closeCard={() => setShowCard(false)}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <TransformComponent wrapperClass="cursor-grab active:cursor-grabbing">
//               <div className="min-h-screen min-w-full flex items-center justify-center py-16">
//                 <div className="flex flex-col items-center">
//                   <Tree
//                     lineWidth="4px"
//                     lineColor={activeColors[0]}
//                     lineBorderRadius="15px"
//                     lineHeight="50px"
//                     label={
//                       <div className="flex justify-center">
//                         <ChartNode
//                           node={orgData}
//                           onToggle={() => toggleNode(orgData.id, null, 0)}
//                           onViewDetails={() =>
//                             openEmployeeCard(orgData.id, null)
//                           }
//                           expanded={!!expandedNodes[orgData.id]}
//                           hasChildren={!!orgData.children.length}
//                           hoverColor={activeColors[0]}
//                           level={0}
//                           isRoot={true}
//                         />
//                       </div>
//                     }
//                   >
//                     {expandedNodes[orgData.id]?.expanded &&
//                       orgData.children.map((child) =>
//                         renderTreeNodes(child, 1, orgData.id)
//                       )}
//                   </Tree>
//                 </div>
//               </div>
//             </TransformComponent>
//           </div>
//         )}
//       </TransformWrapper>
//     </div>
//   );
// };

// const ChartNode = ({
//   node,
//   onToggle,
//   onViewDetails,
//   hasChildren,
//   expanded,
//   hoverColor,
//   level,
//   isRoot = false,
// }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const nodeVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 20 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//       },
//     },
//   };

//   const getNodeSize = () => {
//     if (isRoot) return "w-80 h-[140px]";
//     if (level <= 1) return "w-72 h-[120px]";
//     if (level <= 2) return "w-64 h-[110px]";
//     return "w-56 h-[100px]";
//   };

//   const getAvatarSize = () => {
//     if (isRoot) return "w-16 h-16";
//     if (level <= 1) return "w-14 h-14";
//     if (level <= 2) return "w-12 h-12";
//     return "w-10 h-10";
//   };

//   const getPadding = () => {
//     if (isRoot) return "px-6 py-4 pb-10 pr-12";
//     if (level <= 1) return "px-5 py-4 pb-10 pr-12";
//     return "px-4 py-3 pb-10 pr-12";
//   };

//   return (
//     <motion.div
//       variants={nodeVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover={{
//         scale: 1.02,
//         y: -2,
//         boxShadow: `0 20px 40px ${hoverColor}20`,
//       }}
//       className={`${getNodeSize()} ${getPadding()} bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl 
//                   shadow-xl border-2 border-gray-200/50 dark:border-gray-700/50 
//                   transition-all duration-300 relative overflow-visible group mb-8 flex flex-col`}
//       style={{
//         borderColor: hoverColor + "40",
//         background: `linear-gradient(135deg, ${
//           isRoot ? hoverColor + "08" : "transparent"
//         } 0%, transparent 100%)`,
//       }}
//     >
//       {/* Glassmorphism overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />

//       {/* Decorative corner element */}
//       <div
//         className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-20"
//         style={{ backgroundColor: hoverColor }}
//       />

//       {/* Eye Icon for viewing details */}
//       <motion.button
//         onClick={(e) => {
//           e.stopPropagation();
//           onViewDetails();
//         }}
//         className="absolute top-4 right-4 w-9 h-9 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm
//                    rounded-full shadow-lg border border-gray-200/50 dark:border-gray-600/50
//                    flex items-center justify-center z-20 transition-all duration-200
//                    hover:shadow-xl"
//         style={{
//           color: hoverColor,
//           borderColor: hoverColor + "40",
//         }}
//         whileHover={{
//           backgroundColor: hoverColor + "10",
//           scale: 1.1,
//         }}
//         whileTap={{ scale: 0.95 }}
//         title="View Details"
//       >
//         <FiEye className="w-4 h-4" />
//       </motion.button>

//       <div className="relative z-10 flex items-start space-x-4 h-full">
//         {/* Avatar with enhanced styling */}
//         <div className="relative flex-shrink-0 mt-1">
//           <motion.div
//             className={`${getAvatarSize()} rounded-2xl overflow-hidden ring-4 ring-white/50 dark:ring-gray-700/50 shadow-lg`}
//             whileHover={{ rotate: 2 }}
//           >
//             <img
//               className={`w-full h-full object-cover transition-opacity duration-300 ${
//                 imageLoaded ? "opacity-100" : "opacity-0"
//               }`}
//               src={node.avatar}
//               alt={node.name}
//               onLoad={() => setImageLoaded(true)}
//               onError={() => setImageLoaded(true)}
//             />
//             {!imageLoaded && (
//               <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
//                 <FiUsers className="w-6 h-6 text-gray-400" />
//               </div>
//             )}
//           </motion.div>

//           {/* Status indicator */}
//           <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg">
//             <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-50" />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 min-w-0 space-y-2.5 py-1">
//           <div className="flex items-center space-x-2">
//             <h3
//               className={`font-bold text-gray-900 dark:text-white truncate ${
//                 isRoot ? "text-lg" : level <= 1 ? "text-base" : "text-sm"
//               }`}
//             >
//               {node.name}
//             </h3>
//             {isRoot && (
//               <HiOutlineSparkles className="w-5 h-5 text-yellow-500 flex-shrink-0" />
//             )}
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center space-x-2">
//               <FiBriefcase className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
//               <p
//                 className={`text-gray-700 dark:text-gray-300 font-medium truncate ${
//                   isRoot ? "text-sm" : "text-xs"
//                 }`}
//               >
//                 {node.title}
//               </p>
//             </div>

//             <div className="flex items-center space-x-2">
//               <FiHome
//                 className="w-3 h-3 flex-shrink-0"
//                 style={{ color: hoverColor }}
//               />
//               <span
//                 className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-xs`}
//                 style={{
//                   backgroundColor: hoverColor + "20",
//                   color: hoverColor,
//                 }}
//               >
//                 {node.dept}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Expand/Collapse button - Fixed positioning */}
//       {hasChildren && (
//         <motion.button
//           className="absolute -bottom-4 px-3 py-1.5 
//                      bg-white dark:bg-gray-800 border-2 text-xs font-semibold rounded-full 
//                      shadow-lg transition-all duration-200 flex items-center justify-center space-x-1
//                      hover:shadow-xl z-20 min-w-[80px]"
//           style={{
//             borderColor: hoverColor,
//             color: hoverColor,
//             left: "50%",
//           }}
//           initial={{ x: "-50%" }}
//           whileHover={{
//             scale: 1.05,
//             y: -1,
//             x: "-50%",
//             transition: { duration: 0.2 },
//           }}
//           whileTap={{ scale: 0.95, x: "-50%" }}
//           onClick={(e) => {
//             e.stopPropagation();
//             onToggle();
//           }}
//         >
//           {expanded ? (
//             <>
//               <FiChevronUp className="w-3 h-3 flex-shrink-0" />
//               <span className="whitespace-nowrap">Hide</span>
//             </>
//           ) : (
//             <>
//               <span className="flex-shrink-0">{node.children.length}</span>
//               <FiChevronDown className="w-3 h-3 flex-shrink-0" />
//               <span className="whitespace-nowrap">Show</span>
//             </>
//           )}
//         </motion.button>
//       )}

//       {/* Hover glow effect */}
//       <div
//         className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//         style={{
//           boxShadow: `inset 0 0 0 1px ${hoverColor}40, 0 0 20px ${hoverColor}20`,
//         }}
//       />
//     </motion.div>
//   );
// };

// export default DynamicOrgChart;



import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  FiZoomIn,
  FiZoomOut,
  FiRotateCcw,
  FiMaximize,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiMail,
  FiBriefcase,
  FiHome,
  FiTarget,
  FiEye,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import useEmployeeStore from "../../store/orgStore";
import { toast } from "react-hot-toast";
import EmployeeCard from "./EmployeeCard";

const lineColorsLight = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#14b8a6",
  "#f97316",
  "#84cc16",
  "#ec4899",
  "#8b5cf6",
];

const lineColorsDark = [
  "#60a5fa",
  "#a78bfa",
  "#22d3ee",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#818cf8",
  "#2dd4bf",
  "#fb923c",
  "#a3e635",
  "#f472b6",
  "#c084fc",
];

const DynamicOrgChart = () => {
  const { orgData, fetchEmployees, loading } = useEmployeeStore();
  const [expandedNodes, setExpandedNodes] = useState({});
  const [emplId, setEmplId] = useState(null);
  const [parentId, setParentlId] = useState({
    currentId: null,
    parentId: null,
  });
  const [showCard, setShowCard] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    fetchEmployees().catch(() => toast.error("Unable to fetch data"));
  }, [fetchEmployees]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (orgData) {
      const autoExpand = (node, level = 0, maxLevel = 2) => {
        if (level >= maxLevel || !node.children.length) return {};
        let expansions = { [node.id]: { expanded: true, level } };
        node.children.forEach((child) => {
          expansions = {
            ...expansions,
            ...autoExpand(child, level + 1, maxLevel),
          };
        });
        return expansions;
      };
      setExpandedNodes(autoExpand(orgData));
    }
  }, [orgData]);

  const activeColors = isDarkMode ? lineColorsDark : lineColorsLight;

  const toggleNode = (id, parentId, level) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = { ...prev };
      Object.keys(newExpandedNodes).forEach((nodeId) => {
        if (newExpandedNodes[nodeId]?.parentId === parentId && nodeId !== id) {
          delete newExpandedNodes[nodeId];
        }
      });
      if (prev[id]) delete newExpandedNodes[id];
      else newExpandedNodes[id] = { expanded: true, level, parentId };

      return newExpandedNodes;
    });
  };

  const openEmployeeCard = (id, parentId) => {
    setEmplId(id);
    setShowCard(true);
    setParentlId({ currentId: id, parentId });
  };

  const renderTreeNodes = (node, level = 1, parentId = null) => {
    const color = activeColors[level % activeColors.length];
    return (
      <TreeNode
        key={node.id}
        label={
          <div className="flex justify-center ">
            <ChartNode
              node={node}
              onToggle={() =>
                node.children && toggleNode(node.id, parentId, level)
              }
              onViewDetails={() => openEmployeeCard(node.id, parentId)}
              hasChildren={!!node.children.length}
              expanded={!!expandedNodes[node.id]}
              hoverColor={color}
              parentId={parentId}
              level={level}
            />
          </div>
        }
        lineColor={color}
      >
        {expandedNodes[node.id]?.expanded &&
          node.children?.map((child) =>
            renderTreeNodes(child, level + 1, node.id)
          )}
      </TreeNode>
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (loading || !orgData) {
    return (
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Loading Organization Chart...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
        dark:border dark:border-slate-800 rounded-2xl min-w-full"
    >

      <TransformWrapper
        initialScale={0.8}
        minScale={0.3}
        maxScale={4}
        centerOnInit
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="flex items-center justify-center relative min-w-full ">
            {/* Control Panel */}
            <div
              className="absolute top-6 left-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
                         rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 "
            >
              <div className="flex flex-col space-y-3">
                <button
                  onClick={toggleFullscreen}
                  className="w-12 h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 
                             text-white rounded-xl flex items-center justify-center shadow-lg
                             hover:shadow-orange-500/25 dark:hover:shadow-orange-600/25 transition-all duration-200
                             hover:scale-105 active:scale-95"
                >
                  <FiMaximize size={18} />
                </button>
              </div>
            </div>

            {/* Employee Card Panel */}
            {emplId && showCard && (
              <div
                className="absolute top-6 right-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
                           rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <EmployeeCard
                  id={emplId}
                  closeCard={() => setShowCard(false)}
                />
              </div>
            )}

            <TransformComponent wrapperClass="cursor-grab active:cursor-grabbing   min-w-full">
              <div className="min-h-screen min-w-full flex items-center justify-center py-16">
                <div className="flex flex-col items-center">
                  <Tree
                    lineWidth="4px"
                    lineColor={activeColors[0]}
                    lineBorderRadius="15px"
                    lineHeight="50px"
                    label={
                      <div className="flex justify-center ">
                        <ChartNode
                          node={orgData}
                          onToggle={() => toggleNode(orgData.id, null, 0)}
                          onViewDetails={() =>
                            openEmployeeCard(orgData.id, null)
                          }
                          expanded={!!expandedNodes[orgData.id]}
                          hasChildren={!!orgData.children.length}
                          hoverColor={activeColors[0]}
                          level={0}
                          isRoot={true}
                        />
                      </div>
                    }
                  >
                    {expandedNodes[orgData.id]?.expanded &&
                      orgData.children.map((child) =>
                        renderTreeNodes(child, 1, orgData.id)
                      )}
                  </Tree>
                </div>
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

const ChartNode = ({
  node,
  onToggle,
  onViewDetails,
  hasChildren,
  expanded,
  hoverColor,
  level,
  isRoot = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getNodeSize = () => {
    if (isRoot) return "w-80 h-[140px]";
    if (level <= 1) return "w-72 h-[120px]";
    if (level <= 2) return "w-64 h-[110px]";
    return "w-56 h-[100px]";
  };

  const getAvatarSize = () => {
    if (isRoot) return "w-16 h-16";
    if (level <= 1) return "w-14 h-14";
    if (level <= 2) return "w-12 h-12";
    return "w-10 h-10";
  };

  const getPadding = () => {
    if (isRoot) return "px-6 py-4 pb-10 pr-12";
    if (level <= 1) return "px-5 py-4 pb-10 pr-12";
    return "px-4 py-3 pb-10 pr-12";
  };

  return (
    <div
      className={`${getNodeSize()} ${getPadding()} bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl 
                  shadow-xl border-2 border-gray-200/50 dark:border-gray-700/50 
                  transition-all duration-300 relative overflow-visible group mb-8 flex flex-col
                  hover:scale-[1.02] hover:-translate-y-0.5`}
      style={{
        borderColor: hoverColor + "40",
        background: `linear-gradient(135deg, ${
          isRoot ? hoverColor + "08" : "transparent"
        } 0%, transparent 100%)`,
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />

      {/* Decorative corner element */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: hoverColor }}
      />

      {/* Eye Icon for viewing details */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
        className="absolute top-4 right-4 w-9 h-9 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm
                   rounded-full shadow-lg border border-gray-200/50 dark:border-gray-600/50
                   flex items-center justify-center z-20 transition-all duration-200
                   hover:shadow-xl hover:scale-110 active:scale-95"
        style={{
          color: hoverColor,
          borderColor: hoverColor + "40",
        }}
        title="View Details"
      >
        <FiEye className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex items-start space-x-4 h-full">
        {/* Avatar with enhanced styling */}
        <div className="relative flex-shrink-0 mt-1">
          <div
            className={`${getAvatarSize()} rounded-2xl overflow-hidden ring-4 ring-white/50 dark:ring-gray-700/50 shadow-lg`}
          >
            <img
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={node.avatar}
              alt={node.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg">
            <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-50" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2.5 py-1">
          <div className="flex items-center space-x-2">
            <h3
              className={`font-bold text-gray-900 dark:text-white truncate ${
                isRoot ? "text-lg" : level <= 1 ? "text-base" : "text-sm"
              }`}
            >
              {node.name}
            </h3>
            {isRoot && (
              <HiOutlineSparkles className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FiBriefcase className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <p
                className={`text-gray-700 dark:text-gray-300 font-medium truncate ${
                  isRoot ? "text-sm" : "text-xs"
                }`}
              >
                {node.title}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <FiHome
                className="w-3 h-3 flex-shrink-0"
                style={{ color: hoverColor }}
              />
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-xs`}
                style={{
                  backgroundColor: hoverColor + "20",
                  color: hoverColor,
                }}
              >
                {node.dept}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse button - Fixed positioning */}
      {hasChildren && (
        <button
          className="absolute -bottom-4 px-3 py-1.5 
                     bg-white dark:bg-gray-800 border-2 text-xs font-semibold rounded-full 
                     shadow-lg transition-all duration-200 flex items-center justify-center space-x-1
                     hover:shadow-xl z-20 min-w-[80px] left-1/2 -translate-x-1/2
                     hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          style={{
            borderColor: hoverColor,
            color: hoverColor,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {expanded ? (
            <>
              <FiChevronUp className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Hide</span>
            </>
          ) : (
            <>
              <span className="flex-shrink-0">{node.children.length}</span>
              <FiChevronDown className="w-3 h-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Show</span>
            </>
          )}
        </button>
      )}

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${hoverColor}40, 0 0 20px ${hoverColor}20`,
        }}
      />
    </div>
  );
};

export default DynamicOrgChart;