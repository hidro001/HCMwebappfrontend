import { useEffect, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FaSearchPlus, FaSearchMinus, FaRedo } from 'react-icons/fa';
import useEmployeeStore from '../../store/orgStore';
import { toast } from 'react-hot-toast';
import EmployeeCard from './EmployeeCard';

const lineColorsLight = ['#064e3b', '#047857', '#059669', '#10b981', '#34d399', '#6ee7b7'];
const lineColorsDark = ['#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#064e3b', '#047857'];

const DynamicOrgChart = () => {
  const { orgData, fetchEmployees, loading } = useEmployeeStore();
  const [expandedNodes, setExpandedNodes] = useState({});
  const [emplId, setEmplId] = useState(null);
  const [parentId, setParentlId] = useState({ currentId: null, parentId: null });
  const [showCard, setShowCard] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    fetchEmployees().catch(() => toast.error('Unable to fetch data'));
  }, [fetchEmployees]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (orgData) {
      const autoExpand = (node, level = 0, maxLevel = 1) => {
        if (level >= maxLevel || !node.children.length) return {};
        let expansions = { [node.id]: { expanded: true, level } };
        node.children.forEach(child => {
          expansions = { ...expansions, ...autoExpand(child, level + 1, maxLevel) };
        });
        return expansions;
      };
      setExpandedNodes(autoExpand(orgData));
    }
  }, [orgData]);

  const activeColors = isDarkMode ? lineColorsDark : lineColorsLight;

  const toggleNode = (id, parentId, level) => {
    setExpandedNodes(prev => {
      const newExpandedNodes = { ...prev };
      Object.keys(newExpandedNodes).forEach(nodeId => {
        if (newExpandedNodes[nodeId]?.parentId === parentId && nodeId !== id) {
          delete newExpandedNodes[nodeId];
        }
      });
      if (prev[id]) delete newExpandedNodes[id];
      else newExpandedNodes[id] = { expanded: true, level, parentId };

      return newExpandedNodes;
    });
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
          <ChartNode
            node={node}
            onClick={() => node.children && toggleNode(node.id, parentId, level)}
            hasChildren={!!node.children.length}
            expanded={!!expandedNodes[node.id]}
            hoverColor={color}
            parentId={parentId}
          />
        }
        lineColor={color}
      >
        {expandedNodes[node.id]?.expanded &&
          node.children?.map(child => renderTreeNodes(child, level + 1, node.id))}
      </TreeNode>
    );
  };

  if (loading || !orgData)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-700 w-screen h-screen overflow-hidden relative">
      <TransformWrapper initialScale={0.8} minScale={0.4} maxScale={3} centerOnInit>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="flex items-center justify-center">
            <>
              <div className="absolute top-4 left-4 z-20 flex flex-col text-black dark:text-white gap-2 bg-white dark:bg-gray-600 p-2 shadow-md rounded-lg">
                <button onClick={zoomIn}><FaSearchPlus size={20} /></button>
                <button onClick={zoomOut}><FaSearchMinus size={20} /></button>
                <button onClick={resetTransform}><FaRedo size={20} /></button>
              </div>
              <div className='absolute top-4 right-4 z-20 flex flex-col gap-2'>
                {emplId && showCard &&
                  <EmployeeCard id={emplId} closeCard={() => setShowCard(false)} />}
              </div>
            </>
            <TransformComponent wrapperClass="cursor-grab active:cursor-grabbing">
              <div className="min-h-screen min-w-full flex items-center justify-center py-10">
                <Tree
                  lineWidth="3px"
                  lineColor={activeColors[0]}
                  lineBorderRadius="10px"
                  lineHeight="35px"
                  label={
                    <ChartNode
                      node={orgData}
                      onClick={() => toggleNode(orgData.id, null, 0)}
                      expanded={!!expandedNodes[orgData.id]}
                      hasChildren={!!orgData.children.length}
                      hoverColor={activeColors[0]}
                    />
                  }
                >
                  {expandedNodes[orgData.id]?.expanded &&
                    orgData.children.map(child => renderTreeNodes(child, 1, orgData.id))}
                </Tree>
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};


const ChartNode = ({ node, onClick, hasChildren, expanded, hoverColor,  }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-center
      cursor-pointer select-none w-[auto] px-4 py-3 bg-white dark:bg-gray-100 rounded-xl font-sans shadow-md border-2 border-gray-200 flex items-center space-x-3 relative 
      transition-shadow duration-300 hover:shadow-lg text-black
    "
     style={{ 
      '--hover-color': hoverColor,
        // '--background': parentId === node.id ? `${hoverColor}23` : 'transparent',
        
    }}
  >
    <img className="w-10 h-10 rounded-full object-cover" src={node.avatar } alt={node.name} />
    <div className="text-left">
      <div className="m-1 text-md font-bold " >{node.name}</div>
      <div className="text-sm mb-2 text-gray-800 font-semibold">{node.title}<span style={{ color: hoverColor}} className="font-bold ml-1 dark:font-green-900" >● {node.dept}</span></div>
    </div>
    {hasChildren && <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 px-2 py-0.5 bg-gray-100 border border-gray-700 text-xs text-black hover:text-white rounded-full hover:bg-gray-700 transition">{expanded ? 'Collapse ▲' : `${node.children.length} ▼`}</button>}
  </div>
);
const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
  div[style*="--hover-color"]:hover {
    shadow-color: var(--hover-color, #e2e8f0) !important;
    border-color: var(--hover-color, #94a3b8) !important;
   
  }
    

`);

export default DynamicOrgChart