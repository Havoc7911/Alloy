import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
} from 'reactflow';
import { observer } from 'mobx-react-lite';
import { graphStore } from '../../store/GraphStore';
import { uiStore } from '../../store/UIStore';
import 'reactflow/dist/style.css';
import './Canvas.css';

const Canvas: React.FC = observer(() => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync with MobX store
  React.useEffect(() => {
    setNodes(graphStore.nodes as Node[]);
  }, [graphStore.nodes, setNodes]);

  React.useEffect(() => {
    setEdges(graphStore.edges as Edge[]);
  }, [graphStore.edges, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        graphStore.addEdge({
          id: `edge-${connection.source}-${connection.target}`,
          source: connection.source,
          target: connection.target,
          sourceHandle: connection.sourceHandle || undefined,
          targetHandle: connection.targetHandle || undefined,
        });
      }
    },
    []
  );

  const onNodesDelete = useCallback((deleted: Node[]) => {
    deleted.forEach(node => graphStore.removeNode(node.id));
  }, []);

  const onEdgesDelete = useCallback((deleted: Edge[]) => {
    deleted.forEach(edge => graphStore.removeEdge(edge.id));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      graphStore.addNode(newNode);
    },
    []
  );

  return (
    <div className="canvas-container" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onDragOver={onDragOver}
        onDrop={onDrop}
        snapToGrid={uiStore.snapToGrid}
        snapGrid={[uiStore.gridSize, uiStore.gridSize]}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background
          variant={BackgroundVariant.Dots}
          gap={uiStore.gridSize}
          size={1}
          color={uiStore.theme === 'dark' ? '#333' : '#ddd'}
        />
        <Panel position="top-left">
          <div className="canvas-header">
            <h2>NodeFlow Canvas</h2>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
});

export default Canvas;
