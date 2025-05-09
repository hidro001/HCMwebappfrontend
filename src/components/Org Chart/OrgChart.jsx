import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import useEmployeeStore from '../../store/orgStore';

const OrgChart = () => {
  const { nodes, edges, fetchEmployees, loading } = useEmployeeStore();
  const [adjustedNodes, setAdjustedNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    setAdjustedNodes(nodes);
  }, [nodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const closeInfo = () => {
    setSelectedNode(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <ReactFlow
        nodes={adjustedNodes}
        edges={edges}
        onNodeClick={onNodeClick}
        fitView
        style={{ background: '#000' }}
      >
        <MiniMap />
        <Controls />
        <Background color="#ddd" gap={16} />
      </ReactFlow>

      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            width: 300,
            padding: '1rem',
            background: 'black',
            border: '1px solid #ddd',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          <button
            onClick={closeInfo}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              border: 'none',
              background: 'transparent',
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          <h3>{selectedNode.data.label}</h3>
          <p><strong>Department:</strong> {selectedNode.data.label}</p>
          <p><strong>Role:</strong> {selectedNode.data.role}</p>
        </div>
      )}
    </div>
  );
};

export default OrgChart;


