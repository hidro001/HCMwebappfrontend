


import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
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
  FiEye,
  FiBriefcase,
  FiHome,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import useEmployeeStore from "../../store/orgStore";
import { toast } from "react-hot-toast";
// Make sure this import path is correct for your project structure
import EmployeeCard from "./EmployeeCard";

const lineColorsLight = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
const lineColorsDark = ["#60a5fa", "#a78bfa", "#22d3ee", "#34d399", "#fbbf24", "#f87171"];

// Optimized ChartNode component with memoization
const ChartNode = memo(({
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
  const [imageError, setImageError] = useState(false);

  // Memoize size calculations
  const nodeSize = useMemo(() => {
    if (isRoot) return "w-80 h-[120px]";
    if (level <= 1) return "w-72 h-[110px]";
    if (level <= 2) return "w-64 h-[100px]";
    return "w-56 h-[90px]";
  }, [isRoot, level]);

  const avatarSize = useMemo(() => {
    if (isRoot) return "w-14 h-14";
    if (level <= 1) return "w-12 h-12";
    if (level <= 2) return "w-10 h-10";
    return "w-8 h-8";
  }, [isRoot, level]);

  const padding = useMemo(() => {
    if (isRoot) return "px-5 py-4 pb-8 pr-10";
    if (level <= 1) return "px-4 py-3 pb-8 pr-10";
    return "px-3 py-3 pb-8 pr-10";
  }, [isRoot, level]);

  // Optimized handlers
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    onToggle();
  }, [onToggle]);

  const handleViewDetails = useCallback((e) => {
    e.stopPropagation();
    onViewDetails();
  }, [onViewDetails]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <div
      className={`${nodeSize} ${padding} bg-white dark:bg-gray-800 rounded-xl 
                  shadow-lg border border-gray-200 dark:border-gray-700 
                  transition-all duration-200 relative overflow-visible group mb-6 flex flex-col
                  hover:shadow-xl hover:-translate-y-1`}
      style={{
        borderLeftColor: hoverColor,
        borderLeftWidth: '4px'
      }}
    >
      {/* Simplified view details button */}
      <button
        onClick={handleViewDetails}
        className="absolute top-3 right-3 w-8 h-8 bg-gray-100 dark:bg-gray-700
                   rounded-lg shadow-sm border border-gray-200 dark:border-gray-600
                   flex items-center justify-center z-20 transition-all duration-200
                   hover:shadow-md hover:scale-105 active:scale-95"
        style={{ color: hoverColor }}
        title="View Details"
      >
        <FiEye className="w-4 h-4" />
      </button>

      <div className="relative z-10 flex items-start space-x-3 h-full">
        {/* Avatar */}
        <div className="relative flex-shrink-0 mt-1">
          <div className={`${avatarSize} rounded-lg overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600 shadow-sm`}>
            {!imageError ? (
              <img
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={node.avatar}
                alt={node.name}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <FiUsers className="w-4 h-4 text-gray-400" />
              </div>
            )}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
          </div>

          {/* Simplified status indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2 py-1">
          <div className="flex items-center space-x-2">
            <h3
              className={`font-semibold text-gray-900 dark:text-white truncate ${
                isRoot ? "text-lg" : level <= 1 ? "text-base" : "text-sm"
              }`}
            >
              {node.name}
            </h3>
            {isRoot && (
              <HiOutlineSparkles className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            )}
          </div>

          <div className="space-y-1.5">
            {/* <div className="flex items-center space-x-2">
              <FiBriefcase className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <p className={`text-gray-700 dark:text-gray-300 truncate ${
                isRoot ? "text-sm" : "text-xs"
              }`}>
                {node.title}
              </p>
            </div> */}

            <div className="flex items-center space-x-2">
              <FiHome className="w-3 h-3 flex-shrink-0" style={{ color: hoverColor }} />
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
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

      {/* Simplified expand/collapse button */}
      {hasChildren && (
        <button
          className="absolute -bottom-3 px-3 py-1 
                     bg-white dark:bg-gray-800 border-2 text-xs font-medium rounded-full 
                     shadow-md transition-all duration-200 flex items-center justify-center space-x-1
                     z-20 min-w-[70px] left-1/2 -translate-x-1/2
                     hover:shadow-lg active:scale-95"
          style={{
            borderColor: hoverColor,
            color: hoverColor,
          }}
          onClick={handleToggle}
        >
          {expanded ? (
            <>
              <FiChevronUp className="w-3 h-3" />
              <span>Hide</span>
            </>
          ) : (
            <>
              <span>{node.children.length}</span>
              <FiChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
});

ChartNode.displayName = 'ChartNode';

// Main component with performance optimizations
const DynamicOrgChart = () => {
  const { orgData, fetchEmployees, loading } = useEmployeeStore();
  const [expandedNodes, setExpandedNodes] = useState({});
  const [emplId, setEmplId] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Throttled fetch to prevent multiple calls
  useEffect(() => {
    let timeoutId;
    const throttledFetch = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchEmployees().catch(() => toast.error("Unable to fetch data"));
      }, 100);
    };
    
    throttledFetch();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchEmployees]);

  // Optimized dark mode observer
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Memoized auto-expand logic
  const initialExpandedNodes = useMemo(() => {
    if (!orgData) return {};
    
    const autoExpand = (node, level = 0, maxLevel = 2) => {
      if (level >= maxLevel || !node.children?.length) return {};
      let expansions = { [node.id]: { expanded: true, level } };
      node.children.forEach((child) => {
        expansions = {
          ...expansions,
          ...autoExpand(child, level + 1, maxLevel),
        };
      });
      return expansions;
    };
    
    return autoExpand(orgData);
  }, [orgData]);

  // Set initial expanded nodes only once
  useEffect(() => {
    setExpandedNodes(initialExpandedNodes);
  }, [initialExpandedNodes]);

  const activeColors = useMemo(() => 
    isDarkMode ? lineColorsDark : lineColorsLight, 
    [isDarkMode]
  );

  // Optimized toggle function
  const toggleNode = useCallback((id, parentId, level) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = { ...prev };
      
      // Remove child nodes efficiently
      if (prev[id]) {
        delete newExpandedNodes[id];
      } else {
        newExpandedNodes[id] = { expanded: true, level, parentId };
      }
      
      return newExpandedNodes;
    });
  }, []);

  const openEmployeeCard = useCallback((id) => {
    setEmplId(id);
    setShowCard(true);
  }, []);

  const closeEmployeeCard = useCallback(() => {
    setShowCard(false);
    setEmplId(null);
  }, []);

  // Memoized tree rendering with depth limiting
  const renderTreeNodes = useCallback((node, level = 1, parentId = null) => {
    // Limit depth to prevent excessive rendering
    if (level > 200) return null;
    
    const color = activeColors[level % activeColors.length];
    
    return (
      <TreeNode
        key={node.id}
        label={
          <div className="flex justify-center ">
            <ChartNode
              node={node}
              onToggle={() => toggleNode(node.id, parentId, level)}
              onViewDetails={() => openEmployeeCard(node.id)}
              hasChildren={!!node.children?.length}
              expanded={!!expandedNodes[node.id]}
              hoverColor={color}
              level={level}
            />
          </div>
        }
        lineColor={color}
      >
        {expandedNodes[node.id]?.expanded &&
          node.children?.slice(0, 200).map((child) => // Limit children to prevent lag
            renderTreeNodes(child, level + 1, node.id)
          )}
      </TreeNode>
    );
  }, [activeColors, expandedNodes, toggleNode, openEmployeeCard]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Loading state with simplified styling
  if (loading || !orgData) {
    return (
      <div className="flex items-center justify-center  bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading Organization Chart...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative shadow-lg dark:shadow-xl rounded-xl min-w-full bg-white dark:bg-gray-900  h-[calc(100vh-190px)] ">
      <TransformWrapper
        initialScale={0.8}
        minScale={0.3}
        maxScale={3}
        centerOnInit
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="flex items-center justify-center relative min-w-full">
            {/* Simplified Control Panel */}
            <div className="absolute top-4 left-4 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => zoomIn()}
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FiZoomIn size={16} />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FiZoomOut size={16} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="w-10 h-10 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FiRotateCcw size={16} />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FiMaximize size={16} />
                </button>
              </div>
            </div>

            {/* Employee Card Panel */}
            {emplId && showCard && (
              <div className="absolute top-4 right-4 z-30">
                <EmployeeCard
                  id={emplId}
                  closeCard={closeEmployeeCard}
                />
              </div>
            )}

            <TransformComponent wrapperClass="cursor-grab active:cursor-grabbing min-w-full ">
              <div className=" min-w-full flex items-center justify-center py-12 ">
                <div className="flex flex-col items-center">
                  <Tree
                    lineWidth="3px"
                    lineColor={activeColors[0]}
                    lineBorderRadius="8px"
                    lineHeight="40px"
                    label={
                      <div className="flex justify-center">
                        <ChartNode
                          node={orgData}
                          onToggle={() => toggleNode(orgData.id, null, 0)}
                          onViewDetails={() => openEmployeeCard(orgData.id)}
                          expanded={!!expandedNodes[orgData.id]}
                          hasChildren={!!orgData.children?.length}
                          hoverColor={activeColors[0]}
                          level={0}
                          isRoot={true}
                        />
                      </div>
                    }
                  >
                    {expandedNodes[orgData.id]?.expanded &&
                      orgData.children?.slice(0, 10).map((child) =>
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

export default DynamicOrgChart;